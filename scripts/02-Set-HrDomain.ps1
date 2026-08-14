<#
.SYNOPSIS
    Rewrites Contoso People email suffixes to your Entra tenant domain.

.DESCRIPTION
    Lab 02. The shipped CSV uses @lab.onmicrosoft.com as a dummy suffix.
    Saviynt will use email as the Entra UPN, so the domain must be the
    verified onmicrosoft.com prefix from Lab 01.

    Re-run anytime. Only the part after @ changes.

.PARAMETER TenantDomain
    Example: contosoiga2026.onmicrosoft.com

.PARAMETER CsvPath
    Defaults to 02-employees.csv next to this script.

.EXAMPLE
    .\02-Set-HrDomain.ps1 -TenantDomain "contosoiga2026.onmicrosoft.com"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$TenantDomain,

    [string]$CsvPath = (Join-Path $PSScriptRoot "02-employees.csv")
)

$TenantDomain = $TenantDomain.Trim().TrimStart("@")
if ($TenantDomain -notmatch '^[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?\.onmicrosoft\.com$') {
    throw "TenantDomain must look like 'yourprefix.onmicrosoft.com'. Got '$TenantDomain'."
}

if (-not (Test-Path -LiteralPath $CsvPath)) {
    throw "CSV not found: $CsvPath"
}

$rows = @(Import-Csv -LiteralPath $CsvPath)
if ($rows.Count -eq 0) {
    throw "CSV is empty: $CsvPath"
}

foreach ($row in $rows) {
    $local = ($row.email -split "@")[0]
    $row.email = "$local@$TenantDomain"
}

$rows | Export-Csv -LiteralPath $CsvPath -NoTypeInformation -Encoding UTF8

Write-Host "Wrote $($rows.Count) emails as *@$TenantDomain" -ForegroundColor Green
$rows | Select-Object employeeId, firstName, lastName, email, department, status |
    Format-Table -AutoSize
