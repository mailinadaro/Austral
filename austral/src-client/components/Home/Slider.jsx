import React, {useState, useEffect} from 'react'
import { motion, useAnimation} from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { useRouter } from "next/router";
import Image from "next/image"
import homeEs from "../../../public/locale/ES/home.json"
import homeEn from "../../../public/locale/EN/home.json"
import Redcar from "../../../public/assets/fleet/Chevrolet Prisma.webp"
import Gol from "../../../public/assets/fleet/Volkswagen Gol Trend.webp"

import HomeCar from "../../../public/assets/others/Persona disfrutando viaje en Bariloche.webp"
import Hexa from "../../../public/assets/svg/hexBorder.svg"
import styles from "../../../styles/Home/Slider.module.css"

function Slider () {
  const router = useRouter();
  const t = router.locale === "es" ? homeEs : homeEn;

  const { ref, inView} = useInView({threshold: 0.1}); 
  const animation = useAnimation()
  
  useEffect(() => {
    if(inView) {
      animation.start({
        x: 0,
        opacity: 1,
        transition :{
          delay: 0.2,
          duration: 2,
          ease: "easeOut"
        } 
      })
      } else {
        animation.start({
          x: 90, 
          opacity: 0,
          transition :{
            duration: 2,
            ease: "easeOut" }
        })
      }
  }, [inView])

  const [image, setImage] = useState(Redcar)
  const [selected, setSelected] = useState(0)


  const handleClick = () => {
    router.push("/fleet")
  }


  return (
    <section className={styles.section__container}>

      <Image  className={styles.first__hexa} src={Hexa} alt="icono de hexagono" width={100} height={100} />
      <Image className={styles.second__hexa} src={Hexa} alt="icono de hexagono" width={100} height={100} />
      
      <div ref={ref} className={styles.general__container}>
          <div className={styles.info__container}>
            <h2>{t.sliderfleet.ftitle}</h2>
            <p>{t.sliderfleet.ftext} <strong>{t.sliderfleet.fstrong}</strong></p>
            <button className={styles.info__btn} onClick={handleClick}>{t.sliderfleet.fbtn}</button>
          </div>
          
          <motion.div className={styles.image__container} animate={animation}>
            <Image src={HomeCar} alt="viaje en ruta por patagonia"  width={500} height={500} />
          </motion.div>
      </div>

        <div>
          <Image className={styles.slider__image} src={image} alt="modelos de la flota"  width={400} height={400} />
        </div>
        
        <div className={styles.slider__btnsContainer}>
          <button  aria-label="cambiar imagen" value={selected} className={selected === 0 ? styles.slider__btnselected : styles.slider__btn} onClick={() => {setImage(Redcar); setSelected(0)}}></button>
          <button aria-label="cambiar imagen" value={selected} className={selected === 1 ? styles.slider__btnselected : styles.slider__btn} onClick={() => {setImage(Gol); setSelected(1)}}></button>
        </div>

    </section>
  );
}

export default Slider;




