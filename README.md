# WeatherDuino

Small indoor weather station based on Arduino

[![Build Status](https://travis-ci.org/SebastianPfliegel/weatherduino.svg?branch=master)](https://travis-ci.org/SebastianPfliegel/weatherduino)

-------------------------

## Project

This is a short sample project done quick by popular demand of my colleagues in the office. It consists of three components:

1. `Arduino` Nano + DHT22 Temperature/Humidity sensor
2. `Node/Express` RESTful API as provider of the indoor sensor values
3. `Electron` app as consumer of the JSON API
