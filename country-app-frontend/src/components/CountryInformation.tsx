import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { TCountryInformation } from '../types';
import dynamic from 'next/dynamic';
import Loading from './Loading';
interface CountryInformationProps {
  country: TCountryInformation | null;
  loading: boolean;
  error: string | null;
}

const Map = dynamic(() => import('../app/countries/[code]/map'), { ssr: false })

const CountryInformation = ({ country, loading, error }: CountryInformationProps) => {
  const theme = useTheme()
  const isMobile =  useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) return <Loading />;
  if (error) return <Typography>{error}</Typography>
  if (!country) return <Typography variant='h2' textAlign="center">Country information not found</Typography>

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh" width="100%">
      <Box display="flex">
        <img src={country?.countryFlag} width={150} alt="Country flag" />
        <Box ml={1}>
          <Typography variant='h1' sx={{ fontSize: { sm: 40, xs: 20 } }}>{country?.name} ({country?.code})</Typography>
          <Typography variant='subtitle1'>{country?.region}</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="center" mt={2} gap={4}>
        <Box display="flex" flexDirection="column" my={1}>
          <Typography sx={{ fontSize: { sm: 30, xs: 20 } }} textAlign="left" variant='h3'>Population over the years</Typography>
          <LineChart
            xAxis={[{ data: country?.countryPopulation?.map(population => population?.year) }]}
            series={[
              {
                data: country?.countryPopulation?.map(population => population?.value),
                showMark: ({ index }) => index % 10 === 0,
              },
            ]}
            width={350}
            height={400}
          />
        </Box>
        <Box width={350}>
          <Typography sx={{ fontSize: { sm: 30, xs: 20 } }} textAlign="left" variant='h3'>Borders</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {country?.borders.map((borderCountry) => <Link key={borderCountry.code} underline='none' color="inherit" href={`/countries/${borderCountry.code}`}>{borderCountry.country}</Link>)}
              </Box>
          <Map country={country} />
        </Box>
      </Box>

    </Box>
  );
};

export default CountryInformation;
