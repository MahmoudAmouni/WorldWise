/* eslint-disable no-unused-vars */
import PageNav from "../components/PageNAv";
import styles from "./Login.module.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/fakeAuthContext";
import Button from "../components/Button";
import Message from "../components/Message";
export default function Login() {
// PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {isAuthinecated,login} = useAuth();
  const navigate =useNavigate();
  const [rej,setRej]= useState(false)
  

  useEffect(() => {
if(isAuthinecated === true)
  navigate("/app")
  },[isAuthinecated,navigate])

  
  function handleClick(e){
    e.preventDefault();
    login(email,password)
    setRej(true)
      
    
    

  }

  

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleClick}>Login</Button>
         {rej && <Message color={"error"} message={"Login deniad check ur email or ur password"}/>}
        </div>
      </form>
    </main>
  );
}
