

const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("#location");
const messege1 = document.querySelector(".messege-1");
const messege2 = document.querySelector(".messege-2");

weatherForm.addEventListener("submit" , (event)=>{
    event.preventDefault();

    const location = locationInput.value;

    messege1.textContent = "Loading...";
    messege2.textContent = "";
    messege1.classList.remove("error");

    if (location.length === 0){
        messege1.textContent = "please provide an address";
        messege1.classList.add("error");
    }else {
        fetch("http://localhost:3000/weather?address=" +location).then( (response) => {

            response.json().then((data)=> {
                if(data.error){
                    messege1.textContent = data.error;
                    messege1.classList.add("error");
                }else {
                    messege1.textContent =data.location;
                    messege2.textContent =data.forecast;
                }
            });
    
        } );
    }

    
    
})