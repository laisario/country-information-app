import { useState, useEffect } from 'react';
import axios from 'axios';
import { TCountryInformation } from '../types';

export const useCountryInformation = (code: string) => {
    const [country, setCountry] = useState<TCountryInformation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCountryDetails = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/countries/${code}`)
          const coutryInfo = res?.data
          setCountry(coutryInfo);
        } catch (err) {
          setError('Fail retrieve country information :(');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCountryDetails();
    }, [code]);
  
    return { country, loading, error };
  };