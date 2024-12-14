import React from 'react';
import { datasFeatures } from '../Assets/Data/datasFeatures.jsx';

import '../Assets/css/Features.css';

const Features = () => {

    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {
                datasFeatures.map((item, index) => {
                    return (
                        <div className="feature-item" key={'bank' + index}>
                            <img src={item.icon} alt="Icon" className="feature-icon" />
                            <h3 className="feature-item-title">{item.title}</h3>
                            <p>{item.paragraph}</p>
                        </div>
                    )
                })
            }
        </section>
    );
};

export default Features;