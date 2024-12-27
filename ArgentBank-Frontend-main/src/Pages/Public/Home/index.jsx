import React from 'react'

import Hero from '../../../components/Hero';
import Features from '../../../components/Features';


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