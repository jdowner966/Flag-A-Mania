// script.js file
document.addEventListener("DOMContentLoaded", function () {

    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        console.log("Camera access granted:", stream);
    })
    .catch((error) => {
        console.error("Camera access error:", error.name, error.message);
    });

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        var vidDiv = document.getElementById("video");
            if (vidDiv.hasChildNodes()){
                while (vidDiv.hasChildNodes()) {
                    //remove content from hint area
                    vidDiv.removeChild(vidDiv.lastChild);
                }
                };
        vidDiv.innerHTML = decodeText;
        console.log("Scanned Result:", decodeResult);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbox: 250 }
    );

    

    htmlscanner.render(onScanSuccess);
});

});
