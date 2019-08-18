import React from 'react';
import './index.css';

function RadarComponent() {
    return (
        <div className="la-ball-scale la-dark">
            <div />
        </div>
    );
}

export const Radar = React.memo(RadarComponent);