import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import Input from './components/Input';
import Header from './components/Header';
import Forecast from './components/Forecast';

function App() {

	const [mode, setCurrentMode] = useState<boolean>(false);	
	const [city, setCity] = useState<string>("");


	let changeMode = () => {

		setCurrentMode(!mode);

	};
	
	let changeCity = (event: any) => {
	
		setCity(event);
	
	}

	return (

		<div className = {`h-screen relative z-0 ${ !mode ? 'bg-white [&_*]:border-black' : 'bg-[#092045] [&_*]:border-white text-white'}`}>

			<Header mode = {mode} changeMode = {changeMode} />
			<Input changeCity = {changeCity}/>
			<Forecast mode = {mode} city = {city}/> 
			
			<div className = "[&_p]:text-[140px]">
				<svg className = {`absolute top-[140px] left-[180px] z-[1] w-[260px] h-[260px] ${!mode ? 'visible' : 'invisible'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
				<svg className = {`absolute top-[600px] right-[150px] w-[260px] h-[260px] ${!mode ? 'visible' : 'invisible'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
				<p className = {`absolute top-[120px] left-[440px] max-[470px]:left-[60px] ${mode ? 'visible' : 'invisible'}`}>*</p>
				<p className = {`absolute top-[560px] left-[200px] ${mode ? 'visible' : 'invisible'}`}>*</p>
				<p className = {`absolute top-[200px] right-[200px] max-[800px]:top-[20px] ${mode ? 'visible' : 'invisible'}`}>*</p>
				<p className = {`absolute top-[740px] right-[400px] max-[470px]:right-[60px] ${mode ? 'visible' : 'invisible'}`}>*</p>
			</div>

		</div>

	);
}

export default App;
