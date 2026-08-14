(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
    return Promise.resolve();
  }

  document.querySelectorAll(".prose pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "Copy";
    wrapper.appendChild(button);

    button.addEventListener("click", () => {
      copyText(code.innerText).then(() => {
        button.textContent = "Copied!";
        button.classList.add("is-copied");
        setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("is-copied");
        }, 1800);
      });
    });
  });
})();
