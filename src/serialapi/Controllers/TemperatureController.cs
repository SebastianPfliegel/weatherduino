using serialapi;
using serialapi.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace serialapi.Controllers
{
    [Route("api/[controller]")]
    public class TemperatureController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSensorValues()
        {
            if(SerialConnector.sensorValues == null)
            {
                return NoContent();
            }

            object result = new JsonResult(SerialConnector.sensorValues).Value;

            return Ok(result);
        }
    }
}