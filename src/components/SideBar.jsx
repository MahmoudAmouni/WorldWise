/* eslint-disable no-unused-vars */
import AppNav from './AppNav'
import Logo from '../pages/Logo';
import style from './SideBar.module.css'
import { Outlet } from 'react-router';

function SideBar() {
    
    return (
        <div className={style.sidebar}>
             <Logo />
            <AppNav />
            <Outlet />
            <footer className={style.footer}>
                <p className={style.copyright}>&copy;{new Date().getFullYear()} by WorldWise Inc. </p>
            </footer> 
          
        </div>
    );
}

export default SideBar;