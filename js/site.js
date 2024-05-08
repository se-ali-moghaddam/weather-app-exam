const timeZone = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const tempDeg = document.querySelector('.temperature .degree');
const tempUnit = document.querySelector('.temperature .degree-section span');
const tempDesc = document.querySelector('.temperature-description');

const getLocation = async () => (await fetch('http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone')).json();
const getWeatherInfo = async (lon, lat) => 
    (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`)).json();

window.addEventListener('load', async () => {
    getLocation().then(locData => {
        timeZone.textContent = locData.timezone;

        getWeatherInfo(locData.lat, locData.lon).then(weData => {
            icon.innerHTML = `<img src="icons/${getIcon(weData.weather[0].main)}"></img>`;
            tempDesc.textContent = weData.weather[0].description;

            tempDeg.textContent = Math.floor(weData.main.temp);
            tempUnit.textContent = 'K';

            tempDeg.addEventListener('click', () => {
                if(tempUnit.textContent === 'K'){
                    tempDeg.textContent = getTemp(weData.main.temp).far;
                    tempUnit.textContent = 'F';
                }else if(tempUnit.textContent === 'F'){
                    tempDeg.textContent = getTemp(weData.main.temp).can;
                    tempUnit.textContent = 'C';
                }else{
                    tempDeg.textContent = Math.floor(weData.main.temp);
                    tempUnit.textContent = 'K';
                }
            })
        })
    })
});

function getIcon(weatherMain){
    switch(weatherMain){
        case 'Atmosphere':
            return `${weatherMain}.png`;
        case 'Clear':{
            let nowHour = new Date().getHours();
            if(nowHour <= 6 && nowHour >= 19)
                return `${weatherMain}-Night.svg`;
            
            return `${weatherMain}-Day.svg`;
        }
        case 'Clouds':
            return `${weatherMain}.svg`;
        case 'Drizzle':
            return `${weatherMain}.svg`;
        case 'Rain':
            return `${weatherMain}.svg`;
        case 'Snow':
            return `${weatherMain}.svg`;
        case 'Thunderstorm':
            return `${weatherMain}.svg`;
    }
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}