// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useURLPosition from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  
  function Form() {
    const [lat,lng] = useURLPosition();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isloading , setIsLoading] = useState(false)
    const [emoji,setEmoji] = useState("");
    const [geoError, setGeoError] = useState("")
    const {createCity} = useCities();
    const navigate =useNavigate()
    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
  useEffect(()=>{
    async function fetchingData(){
      try{
        setIsLoading(true)
        setGeoError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
         const data =await res.json()
         if(!data.countryCode){
          throw new Error("This location is not a country choose something else 👀")
         }
          setCityName(data.city)
          setCountry(data.countryName)
          setEmoji(convertToEmoji(data.countryCode))
        
        
    }catch(e){
        setGeoError(e.message)
    }finally{
setIsLoading(false)
    }
    }
    fetchingData();
  },[lat,lng])



  



  function handleSubmit(e){

    e.preventDefault();
if(!cityName || !date)return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position :{lat , lng }
  }
  console.log(newCity)
  createCity(newCity)
navigate("/app/cities")
}
 
if(geoError)return <Message message={geoError} />
if(!lat && !lng)return <Message message="Start by clicking on the map" />


  return (
    <>
    {isloading ? <Spinner />
    : <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          /> */}
          <DatePicker  id="cityName" 
          onChange={(date) => setDate(date)} 
          selected={date}
          dateFormat="yyyy-MM-dd"
          />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSubmit}>Add</Button>
        <Button type="back" onClick={(e)=> {
            e.preventDefault();
            navigate(-1)}}>&larr; Back
    </Button>
      </div>
    </form>}
          </>
  );
}

export default Form;
