'use client'
import { useParams } from 'next/navigation';
import CountryInformation from '../../../components/CountryInformation';
import { useCountryInformation } from '@/hooks/useCountriesDetails';

const CountryPage = () => {
  const params = useParams<{ code: string; }>()

  const { country, loading, error } = useCountryInformation(params?.code);

  return <CountryInformation country={country} loading={loading} error={error} />;
};

export default CountryPage;
