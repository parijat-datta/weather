//Selecting Elements
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");


//App Data

const weather={};
weather.temperature={

    unit:"celcius"
}

//APP constants and VARS

const KELVIN=273;
//API Key

const key="920d117a02f486de1b4c6d5734a86ef0"; 

//Getting USER LOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser Does not Support GeoLocation</p>";
}

//Setting User Location

function setPosition(position){

    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude, longitude);

}

//Showing Error

function showError(error){

    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`;

}



function getWeather(latitude, longitude){

    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);


    fetch (api)
    .then(function(response){
        let data=response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value=Math.floor(data.main.temp-KELVIN);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
    })
    .then(function(){

        displayWeather();
    })
}



function displayWeather(){
    iconElement.innerHTML=  `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;


}



//C to F conversion 

function celciusToFarenhite(temperature){
    return (temperature*9/5)+32;
  
}

tempElement.addEventListener('click',function(){

    if (weather.temperature.value===undefined)return;
    
   if(weather.temperature.unit==="celcius"){
    let farenhite=celciusToFarenhite(weather.temperature.value);
    farenhite=Math.floor(farenhite);
    tempElement.innerHTML=`${farenhite}°<span>F</span>`;
    weather.temperature.unit="Farenhite";

}
else{
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit="Celcius";
}





});
