import React from 'react'
import { inject, observer } from 'mobx-react';

import OrderStore from '../stores/OrderStore';

interface Props {
    orderStore: OrderStore;
}


const Timeline: React.FC<Props> = inject("orderStore")(observer(({ orderStore }) => {

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