const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");
const { response } = require("express");

//Get express server
const app = express();

const port = process.env.PORT || 3000;

console.log(process.env.PORT);

//set express server to use the hbs view engine  
app.set("view engine", "hbs");

//register the view path and hbs path
const publicDirectoryPath = path.join(__dirname , "../public");
const viewPath = path.join(__dirname , "../templates/views");
const partiaslPath = path.join(__dirname , "../templates/partials");

app.set("views", viewPath);
hbs.registerPartials(partiaslPath);
 

//registering the static file path
app.use(express.static(publicDirectoryPath));


const auther = "saseendra";

app.get("/" , ( req , res)=>{
    res.render("index" , {
        title : "Weather",
        Name : auther
    });
});


app.get("/about" , (req , res) => {
    res.render("about",{
        title : "About page",
        Name : auther
    })
});


app.get("/help" , (req , res) => {
    res.render("help" , {
        title : "Help page",
        Name : auther
    })
});

app.get("/weather" , (req , res) => {
  
  
    if (!req.query.address){
        return res.send({
            error : "you must provide an address"
        });
    }


    geocode(req.query.address , (error , response)=> {
        if(error){
            return res.send({
                error : error
            });
        }
    
    
    forecast(response.latitude , response.longitude , (error , forecastData)=> {
        if (error){
            return res.send({
                error : error
                
            });
        }
        
        res.send({
            forecast : forecastData,
            location : response.location,
            address : req.query.address
            });
        });
    });
});

app.get("/products" , (req , res) => {
    
    console.log(req.query.search);
    
    res.send({
        products : []
    })
})



app.get("*" , (req , res) =>{
    res.render("404" , {
        title : "404",
        error : "Page not found",
        Name : auther
    })
});

app.listen(port, () => {
    console.log("server is running");
});