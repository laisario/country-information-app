import { Country } from '../types';
import { Avatar, Box, Grid, Link, ListItemText, Typography } from '@mui/material';

interface CountryListProps {
  countries: Country[];
}

const CountryList = ({ countries }: CountryListProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={3} justifyContent="flex-start" alignItems="center" height="100vh" width="100%">
      <Typography variant='h1' sx={{ fontSize: { sm: 96, xs: 84 } }} fontSize={92}>Countries</Typography>

      <Grid container spacing={2} sx={{
        width: "80%",
        overflowY: 'auto',
        paddingRight: "10px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          marginLeft: 2,
          backgroundColor: "#f1f1f1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      }}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.countryCode}  sx={{ display: "flex", border: '2px solid black', borderRadius: 2, width: 50, p: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }}>
              <img src={`https://date.nager.at/images/circle-flags/flags/${country.countryCode.toLocaleLowerCase()}.svg`} />
            </Avatar>
            <Link color="inherit" ml={1} underline="none" href={`/countries/${country.countryCode}`} >
              <ListItemText primary={country.name} secondary={country.countryCode} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountryList;
