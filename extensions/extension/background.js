chrome.browserAction.onClicked.addListener((tab) => {
    var xhr = new XMLHttpRequest()
    var urlSplited = tab.url.split( '/' )
    if (urlSplited.length > 2) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                chrome.browserAction.disable(tab.id)
            }
        }
        xhr.open("GET", "https://luxeach.tk/php/save-new-page.php?url=" + tab.url, true)
        xhr.send()
    }
})