import React from 'react'
import { GetStaticProps } from 'next';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import OrderStore from '../stores/OrderStore';

interface Props {
    orderStore?: OrderStore;
    id?: number;
}

const UserProfile: React.FC<Props> = inject("orderStore")(observer(({ id, orderStore }) => {
    const appointementStore = orderStore!;
    const signIn = () => {
        const client = { name: "Sanya", phoneNumber: "06333333" }
        appointementStore.setClient(client)
        alert("done")
    }
    return (<>
        <div>{"user id:" + id}</div>
        <div>Hi, {appointementStore.client?.name}</div>
        <button onClick={() => signIn()}>SignIn</button>
    </>
    );
}))

export const getStaticProps: GetStaticProps = async (_) => {
    // ...

    return {
        props: {
            id: 5
        }
    }
}

export default UserProfile