import styles from './Navbar.module.css';
import {FaSearch} from 'react-icons/fa'
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.actionsContainer}>
                <FaSearch className={styles.searchIcon}/>
                <Link href="/"><span className={styles.home}>الرئيسية</span></Link>
            </div>
            <div className={styles.logoContainer}>
                شعاري
            </div>
        </div>
    </div>
  )
}

export default Navbar