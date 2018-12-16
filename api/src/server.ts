import axios from "axios";
import config = require("config");
import express = require("express");
import serialport = require("serialport");

// Config & constants
const arduinoPort: string = config.get("arduino.port");
const arduinoBaudRate: number = config.has("arduino.baudRate") ? config.get("arduino.baudRate") : 9600;
const owmApiURL: string = "https://api.openweathermap.org/data/2.5/weather";
const owmApiCity: string = config.has("api.openWeatherMap.city") ? config.get("api.openWeatherMap.city") : "london";
const owmApiCountry: string = config.has("api.openWeatherMap.country") ? config.get("api.openWeatherMap.country") : "";
const owmApiKey: string = config.get("api.openWeatherMap.apiKey");

// Variables
const currIndoorTemp: number = null;
const currIndoorHumid: number = null;
let currOutdoorTemp: number = null;
let currOutdoorHumid: number = null;
let indoorValues = {
    humidity: currIndoorHumid,
    temperature: currIndoorTemp,
};
const outdoorValues = {
    humidity: currOutdoorHumid,
    temperature: currOutdoorTemp,
};
const apiInfo = {
    city: owmApiCity,
    country: owmApiCountry,
    name: "weatherduino_api",
    version: "0.1",
};

// Serial Port
const serialPort = new serialport(arduinoPort, {
    autoOpen: false,
    baudRate: arduinoBaudRate,
});
const parser = new serialport.parsers.Readline({
    delimiter: "\r\n",
    encoding: "ascii",
});
serialPort.pipe(parser);
parser.on("data", (data) => {
    indoorValues = JSON.parse(data);
});

// Open Weather Map API
function openWeatherMap() {
    let url: string = owmApiURL;
    url += "?q=" + owmApiCity + (owmApiCountry !== "" ? "," + owmApiCountry : "");
    url += "&units=metric";
    url += "&APPID=" + owmApiKey;
    axios.get(url)
        .then((res) => {
            currOutdoorTemp = res.data.main.temp;
            currOutdoorHumid = res.data.main.humidity;
            outdoorValues.humidity = currOutdoorHumid;
            outdoorValues.temperature = currOutdoorTemp;
        });
}

// Express server
const api = express();
const port: number = config.has("api.port") ? config.get("api.port") : 3000;

// Routes
api.get("/api", (req, res) => {
    res.json(apiInfo);
});
api.get("/weather", (req, res) => {
    res.json({ indoor: indoorValues, outdoor: outdoorValues });
});
api.get("/weather/indoor", (req, res) => {
    res.json(indoorValues);
});
api.get("/weather/outdoor", (req, res) => {
    res.json(outdoorValues);
});

// Launch
serialPort.open();
openWeatherMap();
setInterval(openWeatherMap, 60000);
api.listen(port);
