import React from 'react'

import OrderStore from '../shared/stores/OrderStore'
import UIStore from '../shared/stores/UIStore'
import Layout from '../view/layout/Layout'
import { Contact } from '../components/contact/Contact'

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