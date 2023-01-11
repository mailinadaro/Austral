import HomeBooking from "./HomeBooking"
import Experiences  from "./Experiences"
import Slider from "./Slider"
import React, {useEffect} from 'react'
import { useRouter } from "next/router";
import {motion, useAnimation} from 'framer-motion'
import homeEs from "../../../public/locale/ES/home.json"
import homeEn from "../../../public/locale/EN/home.json"
import Image from 'next/image'
import HomeRoute from '../../assets/home4.jpg'
import styles from "../../../styles/Home/Home.module.css"
import { useInView } from 'react-intersection-observer';

function Home () {
  const router = useRouter();
  const t = router.locale === "es" ? homeEs : homeEn;

  const { ref, inView, entries } = useInView({threshold: 0.2});
  const animation = useAnimation()

  useEffect(() => {
    if(inView) {
      animation.start({
        x: 0,
        opacity: 1,
        transition: {
          type:"string",
          duration: 1, 
          bounce: 0.3}
      })
    } 
    if(!inView){
      animation.start({
        x: '-1000vw',
      })
    }
    console.log(inView)
  }, [inView])

  return (
    <div className={styles.main} >
     <HomeBooking/>
     <Slider/>
     <section ref={ref} className={styles.section__container}>  
    
      <motion.div animate={animation} className={styles.image__container}>
        <Image src={HomeRoute} alt="ruta hacia el horizonte" width={250} height={500} />
      </motion.div>
     
      <div>
        <h2>{t.about.atitle}</h2>
        <p>{t.about.atext} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, officiis! Eius adipisci tempora nobis, amet reprehenderit, vitae, culpa aspernatur sed minima nemo autem? Libero earum alias dignissimos cum repellat esse ea error non dolorem assumenda. Illum, cumque sapiente dicta vero, in quis fuga amet enim ab magnam aliquam, distinctio reiciendis.</p>
        <div> 
          <h3>1980</h3>
          <div className={styles.line}></div>
          <h3>2023</h3>
        </ div>
      </div>
    </section>
     <Experiences/>
    </div>
  )
}

export default Home;

