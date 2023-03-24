import { useState } from 'react';

export function useFetch() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = (url) => {
		setLoading(true);
		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				if (response['cod'] !== '404' && response['cod'] !== 401) {
					setData(response);
				}
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	return [{ data, error, loading }, fetchData];
}