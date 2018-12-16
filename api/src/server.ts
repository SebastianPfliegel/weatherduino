import config = require("config");
import express = require("express");
import serialport = require("serialport");

const api = express();
const port: number = config.has("api.port") ? config.get("api.port") : 3000;
const apiInfo = {
    name: "weatherduino_api",
    version: "0.1",
};

api.get("/api", (req, res) => {
    res.json(apiInfo);
});

api.get("/weather", (req, res) => {
    res.json(["x"]);
});

api.get("/weather/indoor", (req, res) => {
    res.json(["y"]);
});

api.get("/weather/outdoor", (req, res) => {
    res.json(["z"]);
});

api.listen(port);
