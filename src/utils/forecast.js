const request = require("postman-request");


const foreCast = (latitude, longitude, callback) =>{

    
const weatherURL = "http://api.weatherstack.com/current?access_key=108e7cb643d7ac67772af03cdaab483b&query="+latitude+","+longitude;

request({url : weatherURL,json : true},(error,response)=>{
    
    if(error){
        callback("There is an error..",undefined);
    }else if(response.body.error){
        callback("Invalide location, please check..",undefined);
    }else{
        
        const weather = response.body;
        
        const report = "Temperature is : "+ weather.current.temperature + 
                        " but its feels like : "+ weather.current.feelslike;

        callback(undefined,report);
    
    }
    
});



}




module.exports = foreCast;