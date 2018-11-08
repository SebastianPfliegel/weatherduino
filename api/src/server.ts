import express = require("express");
import serialport = require("serialport");

const api = express();
const port: number = 3000;

api.listen(port);
