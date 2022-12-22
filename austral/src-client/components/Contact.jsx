import React, {useState} from 'react'
import Link from "next/link"
import { IconContext } from "react-icons";
import {BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import  validate  from '../controllers/contactValidate';
import styles from "../../styles/Contact.module.css"
import sendDataForm from '../controllers/sendDataForm';

function Contact() {

  const dataInput={
    lastName: "",
    phone: "",
    email : "",
    message: "",
    }


  const [input, setInput]= useState(dataInput)
  const [error, setError] = useState(dataInput)

  const handleChange = ({target})=>{
    const {name, value} = target;
    setInput({...input, [name]: value});
    setError(validate({...input, [name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.values(error).length !== 0){
      alert("Some fiels are empthy. Please complete.")
    }
    try {
     await sendDataForm(input)
     setInput(dataInput);
     alert("Message send succesfully!")
   } catch (error) {
    alert("Error in send message. Try again.")
   }
  }

  return (
    <>
      <h1>CONTACTO</h1>
    <div className={styles.general__container}>
      <div className={styles.info__container}>
        <h2>ESCRIBINOS</h2>
        <p>Si tienes alguna duda, comunicate con nosotros telefonicamente o deja tu mesnaje en este apartado para que nos comuniquemos a la brevedad.</p>
        <IconContext.Provider value={{ color: "black", size: "1.5em" }}> 
          <Link className={styles.info_link}  href="https://api.whatsapp.com/send/?phone=549 294 424 2615&text&type=phone_number&app_absent=0" target={"_blank"}>
              <BsWhatsapp className={styles.info_link_ico} />
             <p>+549 294 424 2615</p>
          </Link>

          <Link className={styles.info_link} href="mailto:info@australrentacar.ar">
            <SiGmail className={styles.info_link_ico} />
            <p> info@australrentacar.ar</p>
          </Link>

          <Link  className={styles.info_link} href="https://www.facebook.com/australrentacar" target={"_blank"}>
                <BsFacebook className={styles.info_link_ico} />
                <p>australrentacar.ar</p>
          </Link>
          <Link className={styles.info_link} href="https://www.instagram.com/australrentacar" target={"_blank"}>
                <BsInstagram className={styles.info_link_ico} />
                <p>australrentacar.ar</p>
          </Link>
          </IconContext.Provider>
      </div>

      <form onSubmit={handleSubmit} className={styles.form__container} autoComplete="on"  >
        <label>Apellido</label>
        <input className={styles.form__input} type="text" name="lastName" value={input.lastName} onChange={handleChange} required/>
        {error.lastName && ( <p className={styles.form__input_error}>{error.lastName}</p>)}

        <label>Telefono</label>
        <input className={styles.form__input}  type="text" name="phone" value={input.phone} onChange={handleChange} required/>
        {error.phone && ( <p className={styles.form__input_error}>{error.phone}</p>)}

        <label>E-mail</label>
        <input className={styles.form__input}  type="email" name="email" value={input.email} onChange={handleChange} required/>
        {error.email && ( <p className={styles.form__input_error}>{error.email}</p>)}

        <label>Mensaje</label>
        <textarea className={styles.form__message} name="message" value={input.message}  onChange={handleChange} required></textarea>
        {error.message && ( <p className={styles.form__input_error}>{error.message}</p>)}

        <button type ="submit" className={styles.form__btn} disabled={Object.values(error).length !== 0}>Enviar</button>
      </form>
    </div>
    </>
  )
}

export default Contact