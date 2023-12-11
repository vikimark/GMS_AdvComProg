const key = 'a27bee27-34ef-4cee-ad2f-6700693c53d7';

async function run(){
  const {city,state,country} = getPlace();
  // const city = "Nagoya";
  // const state = "Aichi";
  // const country = "Japan";

  // const {aqi,temperature,humidity,wind} = await getAirQuality({city,state,country});
  let aqi = 51
  let temperature = 10
  let humidity = 59
  let wind = 0.45
  displayAirQuality({city,state,country,aqi,temperature,humidity,wind});

  setAirColor(aqi);
}

function displayAirQuality({state,city,country,aqi,temperature,humidity,wind}){
  const cityElem = document.querySelector('.city');
  const stateCountry = document.querySelector('.state-country');
  const aqiElem = document.querySelector('.aqi > h1');
  const temperatureElem = document.querySelector('.temperature');
  const humidityElem = document.querySelector('.humidity');
  const windElem = document.querySelector('.wind');

  cityElem.innerText = city;
  stateCountry.innerText = `${state}, ${country}`;
  aqiElem.innerText = aqi;
  temperatureElem.innerText = `Temp: ${temperature}`;
  humidityElem.innerText = `Humidity: ${humidity}`;
  windElem.innerText = `Wind: ${wind} m/s`;
  
}

async function getAirQuality({city,state,country}){
  const response = await fetch(`
  https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${key}`);
  const {data :{current}}  = await response.json();
  const{pollution,weather} = current;
   return {
    aqi:pollution.aqius,
    temperature: weather.tp,
    humidity: weather.hu,
    wind:weather.ws
  };
}

function setAirColor(aqi){
  if(aqi<= 50){
    document.documentElement.style.setProperty(
      '--current-aqi-color','var(--good-aqi-color)'
    );
  }
  else if(aqi <= 100){
    document.documentElement.style.setProperty(
      '--current-aqi-color' , 'var(--medium-aqi-color)'
    );
  }
  else{
    document.documentElement.style.setProperty(
      '--current-aqi-color', 'var(--bad-aqi-color)'
    );
  }
}

function getPlace(){
  const places = document.getElementById('place').value; 
  const arr = places.split(" ");
  return{
    city: arr[0],
    state: arr[1],
    country: arr[2]
  };
}

(() => {
  // เริ่มเขียนโค้ด

  function genBg(){
    document.addEventListener("DOMContentLoaded", () => {
      const interBubble = document.querySelector(".interactive")
      let curX = 0
      let curY = 0
      let tgX = 0
      let tgY = 0
    
      function move() {
        curX += (tgX - curX) / 20
        curY += (tgY - curY) / 20
        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`
        requestAnimationFrame(() => {
          move()
        })
      }
    
      window.addEventListener("mousemove", event => {
        tgX = event.clientX
        tgY = event.clientY
      })
    
      move()
    })
  }
  // Todo
  // - Debug mode
  // - Morphing background
  // - Background changes according to weather (via ic of api)
  // - Drop down list to select country?
  // - add little more of animation
  run();
  genBg();
})();
