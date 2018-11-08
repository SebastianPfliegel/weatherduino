import axios from "axios";

const temperatureVal = document.getElementById("temperatureVal");
const humidityVal = document.getElementById("humidityVal");
const lastUpdateVal = document.getElementById("lastUpdateVal");

function callAPI() {
    axios.get("http://localhost:5000/api/temperature")
    .then((res: any) => {
        const temp = res.data.temperature;
        const humid = res.data.humidity;
        const last = res.data.lastUpdate;
        temperatureVal.innerHTML = temp.toLocaleString("en") + "° C";
        humidityVal.innerHTML = humid.toLocaleString("en") + " %";
        lastUpdateVal.innerHTML = last.toLocaleString("en");
    });
}

callAPI();
setInterval(callAPI, 2000);
