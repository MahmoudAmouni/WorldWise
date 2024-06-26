import { useEffect } from "react";
import { useAuth } from "../contexts/fakeAuthContext";
import { useNavigate } from "react-router";

function Protected({children}) {
const navigate = useNavigate();
    const {isAuthinecated} = useAuth();
    useEffect(()=>{
     if(!isAuthinecated)
        navigate("/")
    },[isAuthinecated,navigate])

return children
}

export default Protected;