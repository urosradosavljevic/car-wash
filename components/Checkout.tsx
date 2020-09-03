import React from 'react'
import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router';

import OrderStore from '../stores/OrderStore';

interface Props {
    orderStore?: OrderStore;
    nextStep: () => void;
}

export const Checkout: React.FC<Props> = inject("orderStore")(observer(({ orderStore, nextStep }) => {
    const appointementStore = orderStore!
    const router = useRouter()

    const tryScheduling = (e: React.FormEvent) => {
        e.preventDefault();
        let success = true;
        nextStep();
        alert("Don't be late");
        if (success) router.push("/profile")
    }
    return (<>
        checkout
        {JSON.stringify(appointementStore.client, null, 2)}<br />
        {JSON.stringify(appointementStore.date, null, 2)}<br />
        {JSON.stringify(appointementStore.vehicle, null, 2)}<br />
        {JSON.stringify(appointementStore.treatment, null, 2)}<br />
        {JSON.stringify(appointementStore.startTime, null, 2)}<br />
        <button onClick={tryScheduling}></button>
    </>);
}))