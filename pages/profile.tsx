import React from 'react'
import { GetStaticProps } from 'next';

interface Props {
    id?: number;
}

const UserProfile: React.FC<Props> = ({ id }) => {
    return (
        <div>{"user id:" + id}</div>
    );
}

export const getStaticProps: GetStaticProps = async (_) => {
    // ...

    return {
        props: {
            id: 5
        }
    }
}

export default UserProfile