import React from 'react'

import styles from '../styles/pages/Contact.module.scss';
import { FaYoutube, FaSkype, FaFacebook, FaEnvelope, FaPhone, FaMap } from 'react-icons/fa'
import { GoogleMap } from '../components/GoogleMap'

interface Props {
}

export const Contact: React.FC<Props> = () => {
    const contactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("we will contact you soon")
    }
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <div>
                    <FaYoutube fontSize="1.8rem" />
                </div>
                <div>
                    <FaSkype fontSize="1.8rem" />
                </div>
                <div>
                    <FaFacebook fontSize="1.8rem" />
                </div>
                <div>
                    <FaMap fontSize="1.8rem" />
                </div>
                <div>
                    <FaEnvelope fontSize="1.8rem" />
                </div>
                <div>
                    <FaPhone fontSize="1.8rem" />
                </div>
            </div >
            <div className={styles.contact_form}>
                <h3>
                    Write us
                    </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum quia eius corrupti eligendi quaerat blanditiis?</p>
                <form onSubmit={contactFormSubmit}>
                    <div>
                        <label>Full Name</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" />
                    </div>
                    <div>
                        <label>Phone number</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Phone number</label>
                        <textarea />
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