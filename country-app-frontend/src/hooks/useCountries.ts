import { useEffect, useState } from 'react';
import axios from 'axios';
import { Country } from '../types';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = async () => {
        try {
            const res = await axios.get('http://localhost:4000/countries/');
            const countriesData = res.data
            setCountries(countriesData);
        } catch (err) {
            console.log(err)
            setError('Country request failure :(');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return { countries, loading, error };
};
