import { useState, useEffect } from 'react';

export default function Forecast(props: any) {

	const [coord, setCoord] = useState(<span>Loading...</span>);
	const [weatherData, setData] = useState<any>();
	const [metric, setMetric] = useState<string>("metric");


	function renderInfo(data: any, location: string) {
		
		let icon = <svg className = "inline w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M144 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C70.2 332.6 64 349.5 64 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM32 112C32 50.2 82.1 0 144 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S0 447.5 0 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM192 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V112c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg>;
		let degrees: string = '\u2103';
		
		if (metric != "metric") degrees = degrees = '\u2109';
		
		if ((data.main.temp < 12 && metric == "metric") || (data.main.temp < 56 && metric != "metric")) icon = <svg className = "inline w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.3-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>;

		let forecast: any = {Current: `${data.main.temp}`, Min: `${data.main.temp_min}`, Max: `${data.main.temp_max}`, Feels: `${data.main.feels_like}`};
		setData(Object.keys(forecast).map((key, index) => 
			<div className = "flex justify-between gap-[10px] border-b-2 m-4">
				<p>{key}:</p>
				<p>{icon}{forecast[key]}{degrees}</p>
			</div>));
		setCoord(<p className = "text-center">Weather at {location}:</p>);
	
	}

	useEffect(() => {
	
		setCoord(<p className = "text-center">Loading...</p>);	
		
		setData(<div></div>);

		fetch("/api") 
		.then((res) => res.json())
		.then((data) => {		

			console.log(data);
			const REACT_APP_YOUR_WEATHER_API_KEY = data.weather;
	
			if (props.city == "") {

				navigator.geolocation.getCurrentPosition(async (position) => {
					
					let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${REACT_APP_YOUR_WEATHER_API_KEY}&units=${metric}`)
					let data = await res.json();
					renderInfo(data, "your current location");

				}, (err) => console.log(err));
				
			} else {
			
				const fetchData = async () => {
				
					let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${REACT_APP_YOUR_WEATHER_API_KEY}&units=${metric}`)	
					let data = await res.json();
					renderInfo(data, props.city);
			
				};
				
				fetchData();
			}

		});

	}, [metric, props.city]);

	return (

		<div className = "relative z-[10] mt-[60px]">

			<div className = "flex justify-center">
			
				<div className = {`border-2 rounded-xl px-2 ${props.mode ? 'bg-transparent' : 'bg-white'}`}>
					<span onClick = {() => setMetric("metric")} className = {metric != "metric" ? 'underline hover:cursor-pointer' : 'disabled'}>&#8451;</span>
					/
					<span onClick = {() => setMetric("imperial")} className = {metric == "metric" ? 'underline hover:cursor-pointer' : 'disabled'}>&#8457;</span>
				</div>
				
			</div>

			<div className = "flex justify-center mt-[20px]">
			
				<div className = {`border-2 border-black rounded-xl p-4 ${props.mode ? 'bg-transparent [&_*]:fill-white' : 'bg-white [&_*]:fill-black'}`}>

					{coord}
					<div>
						{weatherData}
					</div>

				</div>
				
			</div>
		
		</div>

	);

}
