import React from 'react'
import { AiFillAlert } from 'react-icons/ai';

import Layout from '../view/layout/Layout'
import styles from '../shared/styles/pages/Landing.module.scss'
import { WeekChart } from '../components/charts/WeekChart';
import { NextAvailableChart } from '../components/charts/NextAvailableChart';
import { WaterQuality } from '../components/charts/WaterQuality';
import { EnergyEfficient } from '../components/charts/EnergyEfficient';

const Landing: React.FC = () => {
    return (
        <Layout title="Landing page">
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 >Deep <b>Car</b> Wash</h1>
                    <p>Consectetur adipisicing elit. Repudiandae dicta voluptates dolorem sit facere similique modi nihil et consectetur provident!</p>
                </div>

                <div className={styles.charts}>
                    <div className={styles.week_chart}>
                        <h3>Average term availability</h3>
                        <WeekChart />
                    </div>
                    <div className={styles.next_available_chart}>
                        <h3>Next available term</h3>
                        <NextAvailableChart />
                    </div>
                    <div className={styles.next_available_chart}>
                        <h3>Energy efficiency</h3>
                        <EnergyEfficient />
                    </div>
                    <div className={styles.next_available_chart}>
                        <h3>Water quality</h3>
                        <WaterQuality />
                    </div>
                </div>
                <article className={styles.what_you_get} >
                    <div>
                        <h3>With deep Clean you get:</h3>
                        <ul>
                            <li>Praesent et tempus quam. In ante diam, placerat interdum auctor sit amet.</li>
                            <li>Cumque dicta reprehenderit sint nisi facere beatae non libero</li>
                            <li>Pellentesque eu lectus laoreet, tristique lacus et, consectetur magna.</li>
                            <li>Sed et diam purus. Vestibulum nec dolor sed odio interdum dictum.</li>
                        </ul>
                    </div>
                    <picture>
                        <AiFillAlert fontSize="10rem" />
                    </picture>
                </article>
            </div>


        </Layout>);
}

export default Landing;