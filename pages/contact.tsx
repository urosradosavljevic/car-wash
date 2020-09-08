import React from 'react'

import OrderStore from '../stores/OrderStore'
import UIStore from '../stores/UIStore'
import Layout from '../components/Layout'
import { Contact } from '../components/Contact'

interface Props {
    orderStore?: OrderStore;
    uiStore?: UIStore;
}

const ContactPage: React.FC<Props> = () => {
    return (
        <Layout title="Contact">
            <Contact />
        </Layout>
    )
}

export default ContactPage;