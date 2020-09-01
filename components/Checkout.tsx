import React from 'react'
import { inject, observer } from 'mobx-react'
import OrderStore from '../stores/OrderStore';

interface Props {
    orderStore?: OrderStore;
}

export const Checkout: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {
    const appointementStore = orderStore!
    return (<>
        checkout
        {JSON.stringify(appointementStore.client, null, 2)}<br />
        {JSON.stringify(appointementStore.date, null, 2)}<br />
        {JSON.stringify(appointementStore.vehicle, null, 2)}<br />
        {JSON.stringify(appointementStore.treatment, null, 2)}<br />
        {JSON.stringify(appointementStore.startTime, null, 2)}<br />
    </>);
}))