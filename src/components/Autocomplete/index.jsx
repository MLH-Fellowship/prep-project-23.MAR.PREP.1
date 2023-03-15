import { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useFetch } from '../../hooks/useFetch';

const Autocomplete = ({ setCity, }) => {
	const [locations, setLocations] = useState([]);

	const [{ data }, fetchData] = useFetch();

	const fetchAutocompleteResults = (city) => {
		if (city) {
			fetchData(`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${city}&limit=4&types=city&apiKey=${process.env.REACT_APP_HERE_APIKEY ?? "qzkvZ4js7O3nkPGhWfuB-yafLEPBq_WKDQxCekeuW44"}`);
		}
	};

	useEffect(() => {
		let cleanedLocations = [];
		if (data?.items) {
			let i = 0;
			cleanedLocations = data.items.map((item) => {
				return { id: i++, name: item.address.label };
			});
		}
		setLocations(cleanedLocations);
	}, [data]);

	const searchAutocomplete = (city) => {
		fetchAutocompleteResults(city);
	};

	const handleSelect = (label) => {
		let city = label.name.split(',')[0];
		setCity(city);
	};

	const searchBarStyling = {
		width: 400,
		margin: '0',
		fontSize: '5.5rem',
		zIndex: 999,
	};

  const inputStyling = {
    borderRadius: '4px',
  }

	return (
		<div style={searchBarStyling}>
			<ReactSearchAutocomplete
				items={locations}
				onSearch={(city) => {
					searchAutocomplete(city);
				}}
        styling={inputStyling}
				onSelect={(label) => {
					handleSelect(label);
				}}
				autoFocus
				placeholder="Enter a city"
			/>
		</div>
	);
};

export default Autocomplete;
