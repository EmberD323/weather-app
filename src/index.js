import "./styles.css";
getGiphy("satellite");
async function getWeather(location) {
    //add error try/catch
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+location+'?key=MC32YEM9W6SMEHEPB9U6HG3DR'
        , {mode: 'cors'})
    const weatherData = await response.json();
    const placeName = weatherData.address;
    const conditions = weatherData.currentConditions.conditions;
    const time = weatherData.currentConditions.datetime;
    const temp = weatherData.currentConditions.temp;
    const feelsLike = weatherData.currentConditions.feelslike;
    const thisWeather = {placeName,conditions,time,temp,feelsLike};
    displayWeather(thisWeather);

}

function getLocation(){
    let choosenLocation = document.querySelector("#location")
    return choosenLocation.value;
}

function toCelcius(farenheitTemp){
    return (((farenheitTemp-32) * (5/9)).toFixed(1))

}
function displayWeather(weatherInfo){
    let locationContainer = document.querySelector(".location>.result");
    locationContainer.textContent = weatherInfo.placeName;

    let timeContainer = document.querySelector(".time>.result");
    timeContainer.textContent = weatherInfo.time;

    let conditionsContainer = document.querySelector(".conditions>.result");
    conditionsContainer.textContent = weatherInfo.conditions;

    let tempContainer = document.querySelector(".temp>.result");
    tempContainer.textContent = weatherInfo.temp + " F / " + toCelcius(weatherInfo.temp)+ " C";

    let feelsLikeContainer = document.querySelector(".feelsLike>.result");
    feelsLikeContainer.textContent = weatherInfo.feelsLike + " F / " + toCelcius(weatherInfo.feelsLike)+ " C";
    
    getGiphy(weatherInfo.conditions);

};
;
let submit = document.querySelector("button");
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    let location = getLocation();
    getWeather(location);
    let form = document.querySelector("form");
    form.reset();
})



function getGiphy(keyword){
    let img = document.querySelector(".gifContainer>img")
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=yEyFT2P5leqvdblSmyHURHg6jVrDRuIH&s='+keyword, {
        mode: 'cors'})
        .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            img.src =response.data.images.original.url;
          });
    
}

