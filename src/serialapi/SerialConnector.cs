using Microsoft.Extensions.Configuration;
using serialapi.Models;
using System;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;

#if _WINDOWS
using System.IO.Ports;
#else
using RJCP.IO.Ports;
#endif

namespace serialapi
{
    public static class SerialConnector
    {
        //Configuration
        public static string SerialPortName { get; set; }

        public static SensorValues sensorValues { get; set; }
#if _WINDOWS
        public static SerialPort serialPort { get; set; }
#else
        public static SerialPortStream serialPort { get; set; }
#endif

        public static void ReadConfig(IConfiguration config)
        {
            SerialPortName = config["SerialPortName"];
        }
        public static void StartSerialMonitor()
        {
#if _WINDOWS
            serialPort = new SerialPort(SerialPortName);
#else
            serialPort = new SerialPortStream(SerialPortName);
#endif
            serialPort.BaudRate = 9600;
            serialPort.DataBits = 8;
            serialPort.Parity = Parity.None;
            serialPort.StopBits = StopBits.One;
            serialPort.Handshake = Handshake.None;
            serialPort.ReadTimeout = 10000;
            serialPort.NewLine = "\r\n";
            serialPort.DataReceived += SerialPortDataReceived;
            serialPort.Open();
        }

        private static void SerialPortDataReceived(object sender, SerialDataReceivedEventArgs e)
        {
#if _WINDOWS
            var port = (SerialPort)sender;
#else
            var port = (SerialPortStream)sender;
#endif

            string data = port.ReadLine();
            DateTime fetched = DateTime.Now;
            SensorValues sensor = DeserializeSensorValues(data);

            if(sensor != null)
            {
                sensor.lastUpdate = fetched;
                sensorValues = sensor;
            }
        }

        private static SensorValues DeserializeSensorValues(string jsonString)
        {
            SensorValues sensor = null;

            try
            {
                sensor = new SensorValues();
                MemoryStream stream = new MemoryStream(Encoding.ASCII.GetBytes(jsonString));
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(sensor.GetType());
                sensor = (SensorValues)serializer.ReadObject(stream);
                stream.Close();
            }
            catch
            {
                return null;
            }

            return sensor;
        }
    }
}