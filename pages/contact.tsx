import React from 'react'

import { Layout } from '../view/layout/Layout'
import { Contact } from '../components/contact/Contact'

interface Props {
}

const ContactPage: React.FC<Props> = () => {
    return (
        <Layout title="Contact">
            <Contact />
        </Layout>
    )
}

export default ContactPage;