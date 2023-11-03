"use strict";
const ApiKye = '102b3201a9b1e8c36ebaa10a28058604';
const txtText = document.querySelector('#txtText');
const Btn = document.querySelector('#Btn');
const txtTime = document.querySelector('#txtTime');
const temp = document.querySelector('#temp');
const txtTemp = document.querySelector('#txtTemp');
const moisture = document.querySelector('#moisture');
const tempMax = document.querySelector('#tempMax');
const tempMin = document.querySelector('#tempMin');
const imgCloud = document.querySelector('#imgCloud');
//this handles null values
if (!txtText || !Btn || !txtTime || !temp || !txtTemp || !moisture || !imgCloud || !tempMax || !tempMin) {
    throw new Error("Um ou mais elementos não foram encontrados no DOM.");
}
;
;
//  change data in the  dom
const dataScreen = (data) => {
    console.log(data);
    txtTime.textContent = `Tempo em ${data.name} - ${data.sys.country}`;
    temp.textContent = parseInt(data.main.temp) + '°C';
    txtTemp.textContent = `${data.weather[0].description}`;
    moisture.textContent = `Umidade: ${data.main.humidity}%`;
    tempMax.textContent = 'Max: ' + parseInt(data.main.temp_max) + '°C';
    tempMin.textContent = 'Min: ' + parseInt(data.main.temp_min) + '°C';
};
// 'promise' accessing the api - 'await' this to wait for the result- 
const getCity = async (city) => {
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKye}&lang=pt_br&units=metric`);
    try {
        const response = await fetch(url); // fetch requests HTTP in js
        if (response.ok) {
            const data = await response.json(); // file .json
            dataScreen(data); //  call function
        }
        else {
            alert('Digite uma Cidade válida!');
            console.log('Falha ao buscar dados da API');
        }
    }
    catch (error) {
        console.error('Um erro ocorrido:', error);
        alert('Digite uma Cidade válida!');
    }
};
// get value input - store in var city
const btnButton = () => {
    if (txtText && txtText.value) {
        const city = txtText.value;
        getCity(city);
        txtText.value = ''; //clear value input
    }
};
// click button
if (Btn) {
    Btn.addEventListener("click", btnButton);
}
;
