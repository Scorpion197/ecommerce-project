import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';


interface LayoutProps{
    children?:ReactNode;
}
const Layout = ({children}:LayoutProps) => {
  return (
    <div className={styles.cotainer}>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout