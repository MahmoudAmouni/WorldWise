/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css'; // Adjust path if needed
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/usegeolocation';
import Button from './Button'

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40,0]); 
  const {
    isLoading,
    position: geoPosition,
    error,
    getPosition
  } = useGeolocation();


   const [searchParams] = useSearchParams();
  let mapLat = searchParams.get("lat");
  let mapLng = searchParams.get("lng");
  
  useEffect(() => {
  
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat,mapLng]);
  
  useEffect(()=>{
    if(geoPosition){
      setMapPosition([geoPosition.lat, geoPosition.lng]);
    }
  },[geoPosition]);

  return (
    <div className={styles.mapContainer}>
      <h1>MAP</h1>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
          {!geoPosition && <Button  type="position" onClick={getPosition} >
            {isLoading ? "loading...": "Get Your Position"}
           </Button>}
        <ChangeMarker position={mapPosition} />
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position)
  return null;
}

function ChangeMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);

  return null;
}

function DetectClick(){
   const navigate = useNavigate();
   let i ;
   let k;
  useMapEvents({
    click : (e) => {navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
   

    }
    
  })
}

export default Map;
