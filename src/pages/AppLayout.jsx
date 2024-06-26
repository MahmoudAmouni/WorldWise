/* eslint-disable no-unused-vars */
import SideBar from "../components/SideBar";
import styles from './AppLayout.module.css'
import Map from "../components/Map";
import User from "../components/User";

import { useAuth } from "../contexts/fakeAuthContext";
function AppLayout() {
    const {isAuthinecated} = useAuth();

    if(isAuthinecated){
        return(
            <div className={styles.app}>
                <SideBar />
                <Map />
                <User />
            </div>
            )
    }
    return (
        <div className={styles.app}>
            <SideBar />
            <Map />
            
        </div>
    );
}

export default AppLayout;