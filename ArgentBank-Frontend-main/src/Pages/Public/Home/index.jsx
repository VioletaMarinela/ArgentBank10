import React from 'react'

import Hero from '../../../components/Hero';
import Features from '../../../components/Features';

import './index.css';

const Home = () => {
    return (
        <>
            <section className='sectionAccueil'>
                <Hero />
                <Features />
            </section>
        </>
    )
}

export default Home