import React, { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';

const SplashScreen = ({ onFinish }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(onFinish, 1000); // Wait for fade animation to finish
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`${styles.splash} ${isFading ? styles.fadeOut : ''}`}>
            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="FBI Logo" className={styles.logo} />
                    <div className={styles.scanner}></div>
                </div>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingText}>INITIALIZING SECURE ARCHIVES</div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>
                </div>
            </div>
            <div className={styles.background}></div>
        </div>
    );
};

export default SplashScreen;
