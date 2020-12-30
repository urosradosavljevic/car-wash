import React from 'react'
import GoogleMapReact from 'google-map-react';

export const GoogleMap: React.FC = () => {
    return (<div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={{
                lat: 59.95,
                lng: 30.33
            }}
            defaultZoom={3}
        />
    </div>);
}