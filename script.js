const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const apikey = '38817cc6eeb839fd0c46aeae4b6cae58';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`).then(response =>response.json()).then(json => {

        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperatura = document.querySelector('.weather-box .temperature');
        const descricao = document.querySelector('.weather-box .description');
        const umidade = document.querySelector('.weather-details .humidity span');
        const vento = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'img/sol.png';
                break;
            case 'Rain':
                image.src = 'img/chuva.jpg';
                break;
            case 'Snow':
                image.src = 'img/neve.png';
                break;
            case 'Clouds':
                image.src = 'img/normal.png';
                break;
            case 'Haze':
                image.src = 'img/nuvem.png';
                break;
            default:
                image.style.display = "none";
            document.querySelector('.description').innerText = "Condição desconhecida";
        }
        
        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});