import React, { useContext } from 'react'
import { OrderStoreContext } from '../stores/OrderStore';

interface Props {
}

const Timeline: React.FC<Props> = () => {

    const counterStore = useContext(OrderStoreContext)
    return (
        <div className="timeline">
            timeline: {counterStore.date.getDate()}
        </div>
    );
}

export default Timeline;