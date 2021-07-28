import React, { useEffect, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function App() {
	/* info */
	const [weather, setWeather] = useState(null);
	const [input, setInput] = useState('');
	useEffect(() => {
		const location = axios
			.get(
				'https://api.weatherapi.com/v1/current.json?key=a465253bdfb8487f9e8155131212707&q=Zdarec&aqi=no',
			)
			.then(data => {
				setWeather(data.data);
				console.log(data.data);
			});
	}, []);
	const weatherInput = e => {
		setInput(e.target.value);
	};
	const searchWeather = () => {
		axios
			.get(
				`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`,
			)
			.then(data => {
				setWeather(data.data);
			})
			.catch(error => alert('Tuto obec neznám.\nUjistěte se, že zadáváte zahraniční obec v angličtině\na nepoužíváte háčky a čárky.'));
	};

	/* date */

	const dateMain = new Date();
	let day = dateMain.getDay();
	switch (day) {
		case 0:
			day = "Ne";
			break;
		case 1:
			day = "Po";
			break;
		case 2:
			day = "Út";
			break;
		case 3:
			day = "St";
			break;
		case 4:
			day = "Čt";
			break;
		case 5:
			day = "Pá";
			break;
		case 6:
			day = "So";
			break;
		default:
			break;
	}
	const date = dateMain.getDate();
	const month = 1 + dateMain.getMonth();
	const year = dateMain.getFullYear();
	let hours = dateMain.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = dateMain.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	const fullDate = day + " " + date + "." + month + "." + year + " " + hours + ":" + minutes 

	/* input */

	const onFocusFunction = (e) => {
		e.target.value = "";
	}

	return (
		<section>
			<div className="search">
				<input type="text" onChange={weatherInput} onFocus={onFocusFunction} />
				<FontAwesomeIcon onClick={searchWeather} icon={faSearch} className="icon" />
			</div>
			{weather && (
				<div className="info">
					<h1 className="name">{weather.location.name}</h1>
					<h6 className="date">{fullDate}</h6>
					<div className="flex">
						<img src={weather.current.condition.icon} className="icon" alt="" />
						<h3 className="temp">{weather.current.temp_c}°C</h3>
					</div>
					<h5 className="feelsLike">Pocitová teplota: {weather.current.feelslike_c}°C</h5>
					<div className="table">
						<h5 className="humidity">Vlhkost:<br />{weather.current.humidity} %</h5>
						<h5 className="uv">UV index:<br />{weather.current.uv}</h5>
					</div>
				</div>
			)}
		</section>
	);
}

export default App;
