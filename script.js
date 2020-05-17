`use strict`
let navToday = document.querySelector('.nav__today'),
upperContent = document.querySelector('.upper-content'),
weekForecast = document.querySelector('.week-forecast'),
realFeel = document.querySelector('#realfeel'),
weatherName = document.querySelector('.upper-content__name'),
mainPhoto = document.querySelector('.upper-content__photo'),
day = document.getElementById('day'),
month = document.getElementById('month'),
year = document.getElementById('year'),
time = document.getElementById('time'),
sunrise = document.getElementById('sunrise'),
sunset = document.getElementById('sunset'),
duration = document.getElementById('duration'),
search = document.querySelector('.head__search__text'),
windTemp = document.querySelector('#wind-time'),
windSpeed = document.querySelector('#wind-speed');
    function getCurCoords () {
                navigator.geolocation.getCurrentPosition(async function(position){
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    console.log(lon);
                    console.log(lat);
                    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=30.47321059&appid=525fc01a5e5733b7b550f58ae0ea169f`;
                    let response =  await fetch(url);
                    let json = await response.json();
                    console.log(json)
                    let curTemp = json.main.temp-273.15;
                    let curRealFeel = json.main.feels_like-273.15;
                    let curWeatherName = json.weather[0].main;
                    console.log(curTemp);
                    let curTempField = document.querySelector('.upper-content__degree');
                    curTempField.innerText = Math.round(curTemp);
                    realfeel.innerText = Math.round(curRealFeel);
                    weatherName.innerText = curWeatherName;
                    let photoCode = json.weather[0].icon;
                    console.log(photoCode)
                    mainPhoto.setAttribute('src', 'http://openweathermap.org/img/w/' + photoCode + '.png');

                    let curWindTemp = json.wind.deg + ' degrees';
                    let curWindSpeed = json.wind.speed + ' m/s';
                    windTemp.innerText = curWindTemp;
                    windSpeed.innerText = curWindSpeed;

                    let curSunset = json.sys.sunset;
                    let setDate = new Date(curSunset * 1000);
                    let setHours = setDate.getHours();
                    let setMinutes = "0" + setDate.getMinutes();
                    let setSeconds = "0" + setDate.getSeconds();
                    let setFormattedTime = setHours + ':' + setMinutes.substr(-2) + ':' + setSeconds.substr(-2);

                    let curSunrise = json.sys.sunrise;
                    let riseDate = new Date(curSunrise * 1000);
                    let riseHours = riseDate.getHours();
                    let riseMinutes = "0" + riseDate.getMinutes();
                    let riseSeconds = "0" + riseDate.getSeconds();
                    let riseFormattedTime = riseHours + ':' + riseMinutes.substr(-2) + ':' + riseSeconds.substr(-2);
                    sunrise.innerText = riseFormattedTime;
                    sunset.innerText = setFormattedTime;

                    let curLocation = json.name;
                    search.setAttribute('placeholder', `${curLocation}`)

                    let today = new Date();
                    let date = Date().split(' ');
                    console.log(date);
                    day.innerText = today.getDate();
                    month.innerText = today.getMonth()+1;
                    year.innerText = date[3];
                    time.innerText = date[4];
                    setInterval(() => {
                        let date = Date().split(' ');
                        time.innerText = date[4];}, 1000);
                });

                
    };
    
   
    
    getCurCoords();
    
    



    



    




