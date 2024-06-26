import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';


function CityList() {
  const { cities, isLoading } = useCities()
  
 
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Click on the map and enter the cities u visited" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => ( // Using return for JSX output
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;