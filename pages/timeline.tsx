import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import Router from 'next/router'

import OrderStore from '../stores/OrderStore';

interface Props {
    orderStore: OrderStore;
}


const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

    // if (typeof window !== "undefined") {
    //     if (orderStore.date === undefined) {
    //         console.log("***********")
    //         Router.push('/')
    //     }
    // }

    console.log("***********")
    useEffect(() => {
        if (orderStore.date === undefined) {
            Router.push('/')
        }
    });
    useEffect(() => {
        if (orderStore.date === undefined) {
            Router.push('/')
        }
    })

    return (
        <div className="timeline">
            datum: {orderStore.date!.getDate()}
            mesec: {orderStore.date!.getMonth() + 1}
        </div>
    );
}))

export const getInitialProps = () => {

}

export default Timeline;