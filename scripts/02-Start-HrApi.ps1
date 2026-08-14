<#
.SYNOPSIS
    Serves scripts/02-employees.csv as a tiny REST API (Contoso People).

.DESCRIPTION
    Lab 02 optional. Reloads the CSV on every request.

    GET /health
    GET /employees
    GET /employees/{employeeId}

    Binds to 127.0.0.1 so it does not need elevation. Saviynt in the cloud
    cannot reach this URL — use it to inspect JSON on the host only.

.PARAMETER CsvPath
    Defaults to 02-employees.csv next to this script.

.PARAMETER Port
    TCP port. Default 8080.
#>

param(
    [string]$CsvPath = (Join-Path $PSScriptRoot "02-employees.csv"),
    [int]$Port = 8080
)

if (-not (Test-Path -LiteralPath $CsvPath)) {
    throw "CSV not found: $CsvPath"
}

$prefix = "http://127.0.0.1:$Port/"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
}
catch {
    throw "Could not listen on $prefix. $_"
}

Write-Host "Contoso People API listening on $prefix" -ForegroundColor Green
Write-Host "CSV: $CsvPath" -ForegroundColor Cyan
Write-Host "GET /health   GET /employees   GET /employees/{id}" -ForegroundColor Cyan
Write-Host "Saviynt cannot reach this. Ctrl+C to stop.`n"

function Read-Employees {
    Import-Csv -LiteralPath $CsvPath
}

function Send-Json {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [int]$StatusCode,
        $Body
    )
    $json = $Body | ConvertTo-Json -Depth 6
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $Response.StatusCode = $StatusCode
    $Response.ContentType = "application/json; charset=utf-8"
    $Response.ContentLength64 = $bytes.Length
    $Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $Response.OutputStream.Close()
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $path = $request.Url.AbsolutePath.TrimEnd('/').ToLowerInvariant()
        if ([string]::IsNullOrWhiteSpace($path)) { $path = "/" }

        Write-Host ("{0:HH:mm:ss} {1} {2}" -f (Get-Date), $request.HttpMethod, $request.Url.PathAndQuery)

        try {
            if ($request.HttpMethod -ne "GET") {
                Send-Json -Response $response -StatusCode 405 -Body @{ error = "GET only" }
                continue
            }

            switch -Regex ($path) {
                '^/health$' {
                    Send-Json -Response $response -StatusCode 200 -Body @{
                        status = "ok"
                        source = "02-employees.csv"
                        count  = @(Read-Employees).Count
                    }
                }
                '^/employees$' {
                    Send-Json -Response $response -StatusCode 200 -Body @(Read-Employees)
                }
                '^/employees/([^/]+)$' {
                    $id = $Matches[1]
                    $row = Read-Employees | Where-Object { $_.employeeId -eq $id }
                    if ($null -eq $row) {
                        Send-Json -Response $response -StatusCode 404 -Body @{ error = "not found"; employeeId = $id }
                    }
                    else {
                        Send-Json -Response $response -StatusCode 200 -Body $row
                    }
                }
                default {
                    Send-Json -Response $response -StatusCode 404 -Body @{
                        error = "unknown path"
                        try   = @("/health", "/employees", "/employees/10001")
                    }
                }
            }
        }
        catch {
            Send-Json -Response $response -StatusCode 500 -Body @{ error = "$_" }
        }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
