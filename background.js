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

    console.log("Log length is: " + requestLog.length.toString());
    chrome.storage.local.set({logLength: requestLog.length});
}

function showLoggedData() {
    chrome.tabs.create({
        "url": chrome.extension.getURL("views/view-data.html")
    });
}

chrome.webRequest.onBeforeRequest.addListener(
    logRequest,
    {urls: ["<all_urls>"]}
);


chrome.browserAction.onClicked.addListener(showLoggedData);
