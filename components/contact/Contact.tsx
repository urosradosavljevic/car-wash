import React from 'react'

import styles from './Contact.module.scss';
import { FaYoutube, FaSkype, FaEnvelope, FaPhone } from 'react-icons/fa'
import { GoogleMap } from '../GoogleMap'

interface Props {
}

export const Contact: React.FC<Props> = () => {
    const contactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Thank you for your feedback, we will contact you soon!")
    }

    return (
        <div className={styles.container}>

            <div className={styles.social}>

                <div>
                    <a href="https://www.youtube.com/" target="_blank" rel="norefer" >
                        <FaYoutube fontSize="1.8rem" />
                    </a>
                </div>

                <div>
                    <a href="skype:uros.radosavljevic?chat">
                        <FaSkype fontSize="1.8rem" />
                    </a>
                </div>

                <div>
                    <a href="mailto:urosradosavljevic.apps@gmail.com">
                        <FaEnvelope fontSize="1.8rem" />
                    </a>
                </div>

                <div>
                    <a href="tel: +381.63.336.595">
                        <FaPhone fontSize="1.8rem" />
                    </a>
                </div>

            </div >

            <div className={styles.contact_form}>

                <h2>Write us</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum quia eius corrupti eligendi quaerat blanditiis?</p>

                <form onSubmit={contactFormSubmit}>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input id="name" type="text" />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone number</label>
                        <input id="phone" type="text" />
                    </div>

                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" />
                    </div>

                    <button type="submit" className={styles.send_btn} >Send</button>

                </form>
            </div >

            <div className={styles.map}>
                <GoogleMap />
            </div >
        </div >
    )
}