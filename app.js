//importing express.js
const express = require("express");
// https module - a native module
const https = require("https");
// body-parser module to display the body of post
const bodyParser = require("body-parser");
const { builtinModules } = require("module");


const app = express();

app.use(bodyParser.urlencoded({extended: true})); //necessary code for bodyParser

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});



app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "api key from openweather";
    const unit = "metric"


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode); //  we can use response.statusCode to get status code


        response.on("data", function(data){
            const weatherData = JSON.parse(data)  // converting hexadecimal data into JSON  format
            console.log(weatherData);
            const temp = weatherData.main.temp  // creating a object temp and getting desired data from data
            const weatherDescription = weatherData.weather[0].description // getting hold description data
            const icon = weatherData.weather[0].icon // getting hold to the icon name ex.10d for rain from data
            const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png" //getting image as per weather condition
            // Now as we have fetched the info from external server 
            // Now we will give response to our user's browser
            // We can have only one response.send but multiple res.write
            
            res.write("<div><h1>The weather is currently " + weatherDescription + " for " + query + ".</h1></div>")
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>")
            res.write("<img src =" + imageURL + ">");
            res.send()

            


        })

    } )

});
    
    
    


// });













app.listen(3000, function(){
    console.log("Server started on port 3000.")
});