import React from 'react';
import '../css/Animation.css';

const Background = () => {

    return (
        <div style={{position: "fixed"}} className="ocean">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
        </div>
    );
}
export default Background;