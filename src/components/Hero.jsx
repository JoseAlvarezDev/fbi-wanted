import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.branding}>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="FBI Logo" className={styles.logo} />
                </div>
                <h1 className={styles.title}>WANTED</h1>
                <h2 className={styles.subtitle}>THE ARCHIVES</h2>
                <p className={styles.description}>Access the Federal Bureau of Investigation's most wanted fugitives database.</p>
                <div className={styles.scrollIndicator}>


                    <div className={styles.wheel}></div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
