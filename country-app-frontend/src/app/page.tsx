
'use client';
import { useCountries } from '../hooks/useCountries';
import CountryList from '../components/CountryList';
import Loading from '@/components/Loading';

const Home = () => {
  const { countries, loading, error } = useCountries();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return <CountryList countries={countries} />;
};

export default Home;