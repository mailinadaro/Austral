import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image';
import LogoNavBar from "../../public/assets/others/logoNavBar.png"
import Es from "../../public/assets/icons/lang-es.png"
import En from "../../public/assets/icons/lang-en.png"
import navEs from "../../public/locale/ES/navbar.json"
import navEn from "../../public/locale/EN/navbar.json"
import styles from "../../styles/NavBar.module.css"


export const NavBar = () => {
  const router = useRouter();
  const t = router.locale === "es" ? navEs : navEn;

  const [lang, setLang] = useState(Es);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState("/");
  const [activePage, setActivePage] = useState(false);

  useEffect(() => {
    setCurrentPage(router.pathname); 
    setActivePage(true);
  }, [router.pathname]); 

  
  const handleNavToggle = () => {
    setIsActive((current) => !current);
  };

  const handleChange = ({target})=> {  
    const {value} = target
    router.push(router.pathname, router.pathname, {
      locale : value
    })
    setLang(lang === Es ? En : Es);
  }

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 500);
}





  return (
    <header className={styles.nav__container} >
      
      <Link href="/"><Image className={styles.logo} src={LogoNavBar} alt="Logo Austral Rental" width={200} height={67} priority /></Link>

      
       {isActive && <div className={styles.navBar}></div>}
      <button onClick={handleNavToggle} className={isActive ? [styles.nav_toggle, styles.nav_open].join(" ") : styles.nav_toggle} aria-label="toggle navigation">
        <span className={isActive ? [styles.hamburger, styles.nav_open].join(" ") : styles.hamburger}></span>
      </button>

      <nav id="nav" className={isActive ? [styles.nav, styles.nav_open].join(" ") : [styles.nav, styles.nav_close].join(" ")} aria-label="main navigation">
        <ul className={styles.nav__list}>
          <li>
            <Link className={currentPage === "/" ? styles.current_nav_item : styles.notcurrent_nav_item}
            href="/" onClick={handleLinkClick} aria-label="home" >
              <span>{t.home}</span> 
            </Link>
          </li>
          {isActive && <div className={styles.line}></div>}
          <li >
            <Link className={currentPage === "/booking" ? styles.current_nav_item : styles.notcurrent_nav_item} href="https://austral.rentlynetwork.com/elegi-tu-auto?commercialAgreementCode&customPromotionId&dateFrom=08-03-2023&dateTo=10-03-2023&driverAge&dropOffEndpoint=austral&dropOffId=1&hourFrom=15%3A15&hourTo=15%3A15&ilimitedKm=true&onlyFullAvailability=false&pickUpEndpoint=austral&pickUpId=1&promotionCode" onClick={handleLinkClick} aria-label="booking">
              <span>{t.booking}</span>
            </Link>
          </li>
          {isActive && <div className={styles.line}></div>}
          <li >
            <Link className={currentPage === "/fleet" ? styles.current_nav_item : styles.notcurrent_nav_item} href="/fleet" onClick={handleLinkClick} aria-label="fleet">
              <span>{t.fleet}</span>
            </Link>
          </li>
          {isActive && <div className={styles.line}></div>}
          <li >
            <Link className={currentPage === "/services" ? styles.current_nav_item : styles.notcurrent_nav_item} href="/services"  onClick={handleLinkClick} aria-label="services">
              <span >{t.services}</span>
            </Link>
          </li>
          {isActive && <div className={styles.line}></div>}
          <li >
            <Link className={currentPage === "/contact" ? styles.current_nav_item : styles.notcurrent_nav_item} href="/contact" onClick={handleLinkClick} aria-label="contact">
              <span>{t.contact}</span>
            </Link>
          </li>
          {isActive && <div className={styles.line}></div>}
          <li className={styles.nav__langItem} aria-label="language">
            <Image src={lang} alt="icono de banderas de paises" width={30} height={30} />
            <select  onClick={handleLinkClick}  onChange={handleChange}>
              <option value="es">ES</option>
              <option value ="en">EN</option>
            </select>
          </li> 
          </ul>
        </nav>
    </header>
  
  )
}
