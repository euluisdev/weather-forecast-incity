const ApiKye: string = '102b3201a9b1e8c36ebaa10a28058604';

const txtText: HTMLInputElement | null = document.querySelector('#txtText');
const Btn: HTMLButtonElement | null = document.querySelector('#Btn');
const txtTime: HTMLElement | null = document.querySelector('#txtTime');
const temp: HTMLElement | null = document.querySelector('#temp');
const txtTemp: HTMLElement | null = document.querySelector('#txtTemp');
const moisture: HTMLElement | null = document.querySelector('#moisture');
const tempMax: HTMLElement | null = document.querySelector('#tempMax');
const tempMin: HTMLElement | null = document.querySelector('#tempMin');
const imgCloud: HTMLElement | null = document.querySelector('#imgCloud');

//this handles null values
if (!txtText || !Btn || !txtTime || !temp || !txtTemp || !moisture || !imgCloud || !tempMax || !tempMin) {
    throw new Error("Um ou mais elementos não foram encontrados no DOM.");
};

// interface created to handle  data of the API 
interface WeatherData {
    name: string;
    sys: {
        country: string
    }
    main: {
        temp: string,
        humidity: string,
        temp_max: string,
        temp_min: string
    };
    weather: { //this defines an array of objects  in the interface
        description: string
    }[];
};

//  change data in the  dom
const dataScreen = (data: WeatherData): void => {
    console.log(data)
    txtTime.textContent = `Tempo em ${data.name} - ${data.sys.country}`
    temp.textContent = parseInt(data.main.temp) + '°C';
    txtTemp.textContent = `${data.weather[0].description}`;
    moisture.textContent = `Umidade: ${data.main.humidity}%`;
    tempMax.textContent = 'Max: ' + parseInt(data.main.temp_max) + '°C';
    tempMin.textContent = 'Min: ' + parseInt(data.main.temp_min) + '°C';

};

// 'promise' accessing the api - 'await' this to wait for the result- 
const getCity = async (city: string): Promise<void> => {
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKye}&lang=pt_br&units=metric`);

    try {
        const response = await fetch(url); // fetch requests HTTP in js

        if (response.ok) {
            const data: WeatherData = await response.json()  // file .json
            dataScreen(data);  //  call function
        } else {
            alert('Digite uma Cidade válida!');
            console.log('Falha ao buscar dados da API');
        }

    } catch (error) {
        console.error('Um erro ocorrido:', error);
        alert('Digite uma Cidade válida!');
    }
};

// get value input - store in var city
const btnButton = (): void => {
    if (txtText && txtText.value) {
    const city: string = txtText.value;

    getCity(city);
    txtText.value = '';  //clear value input
    }
};

// click button
if (Btn) {
    Btn.addEventListener("click", btnButton);
};