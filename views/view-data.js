function loadDataFromStorage() {
    var logLength = 0;
    // chrome.storage.local.get("logLength", (res) => {var logLength = res;});
    chrome.storage.local.get("logLength", function(d) {
        console.log(d.logLength);
        console.log("Read data: " + d.logLength.toString());
        logLength = d.logLength;

        document.getElementById("logLength").value = d.logLength.toString();
    });
    console.log("Log length is: " + logLength.toString());

    // Load request log
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
