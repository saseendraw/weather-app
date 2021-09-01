const request = require("postman-request");



const geoCode = (address, callback) => {

    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic2FzZWVuZHJhIiwiYSI6ImNrczdsbDNybjFyemYzMXBpZHZrNjFrZGsifQ.ZfU6RKT9Unyu4Ooy_Fr7mg";

    request({url : geoURL, json : true},(error,response) => {

    if(error){
        callback("There is an error..", undefined);
    }else if(response.body.features.length === 0){
        callback("Location not found, please check",undefined);
    }else{

   const data = {
     latitude :  response.body.features[0].center[1],
     longitude : response.body.features[0].center[0],
     location : response.body.features[0].place_name
   }

   callback(undefined, data);
    }


    }
    );


};

module.exports = geoCode;