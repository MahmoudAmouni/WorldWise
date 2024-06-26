import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const { cities, isLoading } = useCities()
   if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Click on the map and enter the cities u visited" />;



const countries = cities.reduce((acc, city) => {
    if(!acc.map((el)=>el.country).includes(city.country))
    return [...acc, {country: city.country,emoji: city.emoji}]
else 
    return acc;
},[])



  return (
    <ul className={styles.countryList}>
      {countries.map((country) => ( // Using return for JSX output
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;