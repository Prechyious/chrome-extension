console.log("Hi, I have been injected whoopie!!!");

var recorder = null;
var recordedDataURL = null;

function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
                track.stop();
            }
        });
    };

    recorder.ondataavailable = function (event) {
        let recordedBlob = event.data;
        recordedDataURL = URL.createObjectURL(recordedBlob); // Convert Blob to Data URL

        // Send the Data URL to your server
        sendDataToServer(recordedDataURL);
    };
}

function sendDataToServer(dataURL) {
    fetch("https://video-uploader-3df06b651fde.herokuapp.com/api/video", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoDataURL: dataURL }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error uploading video:", error);
        });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "request_recording") {
        console.log("requesting recording");

        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: {
                    width: 9999999999,
                    height: 9999999999,
                },
            })
            .then((stream) => {
                onAccessApproved(stream);
            });
    }

    if (message.action === "stop_recording") {
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log("no recorder");

        recorder.stop();
    }
});
