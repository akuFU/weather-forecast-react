import React from "react";
import { useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";

export default function Input(props: any) {

	const [search, setSearch] = useState(null);

	const REACT_APP_YOUR_RAPID_API_KEY = async () => {

		let res = await fetch("/api");	
		let data = await res.json();

		return data.rapid;

	}

	const loadOptions = async (inputValue: any) => {
	
		let res = await fetch("/api");
		let data = await res.json();
		const REACT_APP_YOUR_RAPID_API_KEY = data.rapid;

		let geoApiOptions = {
			method: "GET",
				headers: {
					"X-RapidAPI-Key": `${REACT_APP_YOUR_RAPID_API_KEY}`,
					"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
				},
		};
		
		return fetch(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
			
				return {
						options: response.data.map((city: any) => {

							return {
								value: `${city.latitude} ${city.longitude}`,
								label: `${city.name}`,
							};
					
						}),
				};
					
			});
	};
	
	const handleOnChange = (searchData: any) => {
		props.changeCity(searchData.label);
		setSearch(searchData);
	};

	return (

		<div className = "flex justify-center mt-[100px] [&_*]:border-black [&_*]:text-black">
			
			<AsyncPaginate
				className = "relative z-[11] w-[300px] border-2 border-black rounded-[0px]"
				placeholder="Enter city name"
				debounceTimeout={600}
				value={search}
				onChange={handleOnChange}
				loadOptions={loadOptions}
			/>
		
		</div>

	);

}
