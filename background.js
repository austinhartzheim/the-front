function logRequest(requestDetails) {
    console.log("Loading: " + requestDetails.url);
}

chrome.webRequest.onBeforeRequest.addListener(
    logRequest,
    {urls: ["<all_urls>"]}
);
