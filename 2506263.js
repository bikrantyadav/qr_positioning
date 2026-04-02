const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        { fps: 15, qrbox: 250 },
        function (text) {
            console.log("Scanned:", text);

            try {
                const place = JSON.parse(text); // ✅ use place

                document.getElementById("placeName").innerText =
                    "Name: " + place.name;

                document.getElementById("placeLat").innerText =
                    "Latitude: " + place.latitude;

                document.getElementById("placeLng").innerText =
                    "Longitude: " + place.longitude;

            } catch (e) {
                alert("Invalid QR format!");
                console.error(e);
            }

            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}
