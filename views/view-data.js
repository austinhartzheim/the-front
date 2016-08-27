function loadDataFromStorage() {
    chrome.storage.local.get("requestLog", function(d) {
        document.getElementById("requestLog").value = JSON.stringify(d.requestLog, null, 2);
    });
}

function downloadRequestLog() {
    chrome.storage.local.get("requestLog", function(d) {
        blob = new Blob([JSON.stringify(d, null, 2)], {type: "application/octet-stream"});
        url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: "request-log-" + new Date().toISOString() + ".json"
        });
    });
}

document.addEventListener("DOMContentLoaded", function(e) {
    loadDataFromStorage();

    document.getElementById("download-request-log").addEventListener("click", function(e) {
        downloadRequestLog();
    });
});
