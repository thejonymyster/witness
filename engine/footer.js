let sens = document.getElementById('sens')
let volume = document.getElementById('volume')
let symboltheme = document.getElementById('symboltheme')
if (localStorage.sensitivity === undefined) localStorage.sensitivity = 0.7
sens.value = localStorage.sensitivity
sens.onchange = function() {
    localStorage.sensitivity = this.value
}
if (localStorage.volume === undefined) localStorage.volume = 0.12
volume.value = localStorage.volume
volume.onchange = function() {
    localStorage.volume = this.value
}
if (localStorage.symbolTheme !== undefined)
    symboltheme.value = localStorage.symbolTheme
else localStorage.symbolTheme = 'Canonical'
function changeTheme() {
    if (localStorage.symbolTheme == 'Canonical') localStorage.symbolTheme = 'Simplified'
    else localStorage.symbolTheme = 'Canonical'
    symboltheme.value = localStorage.symbolTheme
    reloadSymbolTheme()
}
if (localStorage.expandSettings === undefined) localStorage.expandSettings = "false"
if (localStorage.expandSettings == "false") {
    document.getElementById("header-expand").style.opacity = "0"
    document.getElementById("header-expand").style.height = "0px"
    document.getElementById("header-expand").style.display = "none"
} else {
    document.getElementById("header-expand").style.display = "block"
    document.getElementById("header-expand").style.opacity = "1"
    document.getElementById("header-expand").style.height = "180px"
}
let expandClickable = true;
function toggleExpand() {
    if (expandClickable) {
        if (localStorage.expandSettings == "true") localStorage.expandSettings = "false"
        else localStorage.expandSettings = "true" // i hate localstorage
        updateExpand(localStorage.expandSettings)
        expandClickable = false
        setTimeout(() => {
            expandClickable = true            
        }, 500);
    }
}
function updateExpand(tf) {
    document.getElementById("header-plus").className = tf == "false" ? "xi-plus" : "xi-minus"
    if (tf == "false") {
        document.getElementById("header-expand").style.opacity = "0"
        document.getElementById("header-expand").style.height = "0px"
        setTimeout(() => {
            document.getElementById("header-expand").style.display = "none"
        }, 500);
    } else {
        document.getElementById("header-expand").style.display = "block"
        setTimeout(() => {
            document.getElementById("header-expand").style.opacity = "1"
            document.getElementById("header-expand").style.height = "180px"
        }, 1);
    }
}

let loc = window.location.protocol + "//" + window.location.hostname;
let p = window.location.pathname.indexOf("witness");
if (p !== -1) loc += window.location.pathname.slice(0, p + "witness".length);
for (let el of Array.from(document.getElementsByClassName("changehref"))) {
    el.setAttribute("href", el.getAttribute("href").replace(/%%NAME%%/g, loc));
}
for (let el of Array.from(document.getElementsByClassName("changecontent"))) {
    el.setAttribute("content", el.getAttribute("content").replace(/%%NAME%%/g, loc));
}