import React from 'react'

import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';

import '../../Assets/css/Home.css';

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