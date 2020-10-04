const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3592fbbb4f55dcd8b702a27ff54753ba&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const description  = weatherData.weather[0].description;

      const temp = weatherData.main.temp;

      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(description);
      res.write("<h1>The Temperature is " + temp + "degree Celcius</h1>");
      res.write("<h3>The weather is currently " + description + "</h3>");

      res.write("<img src = "+iconUrl+">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server running on port 3000");
});
