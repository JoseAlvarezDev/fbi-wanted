import React, { useState, useEffect, useRef } from 'react';
import { fetchTenMostWanted } from '../services/api';
import styles from './DangerCarousel.module.css';

const DangerCarousel = ({ onSelectFugitive }) => {
    const [fugitives, setFugitives] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        const loadTenMostWanted = async () => {
            try {
                console.log("Fetching Ten Most Wanted...");
                const data = await fetchTenMostWanted();
                console.log("Danger Carousel Data:", data);
                if (data.items) {
                    setFugitives(data.items);
                }
            } catch (error) {
                console.error("Failed to load danger carousel:", error);
            } finally {
                setLoading(false);
            }
        };
        loadTenMostWanted();
    }, []);

    useEffect(() => {
        resetTimeout();
        if (fugitives.length > 0) {
            timeoutRef.current = setTimeout(
                () => setCurrentIndex((prevIndex) => (prevIndex + 1) % fugitives.length),
                5000
            );
        }

        return () => {
            resetTimeout();
        };
    }, [currentIndex, fugitives]);

    const handleImageError = (e) => {
        e.target.src = `${import.meta.env.BASE_URL}logo.png`;
        e.target.style.padding = '4rem';
        e.target.style.background = '#000';
    };

    if (loading) return <div className={styles.loading}>SCANNING PRIORITY DATABASE...</div>;
    if (fugitives.length === 0) return <div className={styles.empty}>DATABASE OFFLINE or NO TOP PRIORITY TARGETS FOUND</div>;

    const currentFugitive = fugitives[currentIndex];

    // Improved image selection
    const images = currentFugitive.images || [];
    const image = images[0] ? (images[0].original || images[0].large || images[0].thumb) : '/placeholder_fugitive.png';

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <span className={styles.priority}>TOP PRIORITY</span>
                <h2 className={styles.title}>TEN MOST WANTED</h2>
            </div>

            <div className={styles.carousel}>
                <div
                    className={styles.slide}
                    onClick={() => onSelectFugitive(currentFugitive)}
                >
                    <div className={styles.imageWrapper}>
                        <img
                            src={image}
                            alt={currentFugitive.title}
                            className={styles.image}
                            onError={handleImageError}
                        />
                        <div className={styles.scanline}></div>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.badge}>DANGEROUS</div>
                        <h3 className={styles.name}>{currentFugitive.title}</h3>
                        <p className={styles.reward}>{currentFugitive.reward_text || 'REWARD FOR INFORMATION'}</p>
                        <button className={styles.actionBtn}>OPEN ARCHIVE</button>
                    </div>
                </div>

                <div className={styles.indicators}>
                    {fugitives.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DangerCarousel;
