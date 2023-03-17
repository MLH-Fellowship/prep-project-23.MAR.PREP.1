import { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useFetch } from '../../hooks/useFetch';

const Autocomplete = ({ setCity }) => {
	const [locations, setLocations] = useState([]);

	const [{ data }, fetchData] = useFetch();

	const fetchAutocompleteResults = (city) => {
		if (city) {
			fetchData(`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${city}&limit=4&types=city&apiKey=${process.env.REACT_APP_HERE_APIKEY}`);
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
		const city = label.name.split(',')[0];
		setCity(city);
	};
  
  const inputStyling = {
    borderRadius: '4px',
  }

	return (
		<div className="search-bar-container" >
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
