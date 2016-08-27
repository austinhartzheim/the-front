var requestLog = [];

function logRequest(request) {
    console.log("TheFront Request: " + request.timeStamp.toString() + " " +
                request.type + " " + request.method + " " + request.url +
                "; Origin: " + request.originUrl);
    requestLog.push({
        ts: request.timeStamp,
        type: request.type,
        method: request.method,
        url: request.url,  // TODO: redact to hostname
        origin: request.originUrl  // TODO: redact to hostname
    });

    saveLog();
}

function saveLog() {
    chrome.storage.local.set({requestLog: requestLog});
}

function showLoggedData() {
    // Save log before trying to display data
    saveLog();
    
    chrome.tabs.create({
        "url": chrome.extension.getURL("views/view-data.html")
    });
}

chrome.webRequest.onBeforeRequest.addListener(
    logRequest,
    {urls: ["<all_urls>"]}
);


chrome.browserAction.onClicked.addListener(showLoggedData);

// Save request log when window closed
chrome.windows.onRemoved.addListener(function(windowId) {
    saveLog();
    console.log("Window closed: " + windowId.toString());
});
