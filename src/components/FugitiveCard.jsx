import React from 'react';
import styles from './FugitiveCard.module.css';

const FugitiveCard = ({ fugitive, onClick }) => {
    // Determine the accent color based on status or arbitrary logic
    // Default image if none provided
    // Improved image selection logic
    const handleImageError = (e) => {
        e.target.src = '/logo.png';
        e.target.style.padding = '2rem';
        e.target.style.background = 'rgba(0,0,0,0.5)';
    };

    const image = fugitive.images && fugitive.images[0] ? fugitive.images[0].thumb : '/logo.png';

    const extractAmount = (text) => {
        if (!text) return null;
        // Regex to capture the $ amount and optionally the words million/billion/thousand that follow
        const match = text.match(/\$[0-9,.]+(\s*(million|billion|thousand|millón|mil))?/i);
        return match ? match[0] : null;
    };

    const amount = extractAmount(fugitive.reward_text);

    const handleShare = (e) => {
        e.stopPropagation();
        const shareData = {
            title: `WANTED: ${fugitive.title}`,
            text: `Help the FBI find ${fugitive.title}. Reward: ${fugitive.reward_text || 'Information wanted.'}`,
            url: fugitive.url || window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
            alert('Enlace copiado al portapapeles');
        }
    };

    const lastSeen = fugitive.field_offices && fugitive.field_offices[0]
        ? fugitive.field_offices[0].toUpperCase()
        : 'UNKNOWN';

    const lastUpdated = fugitive.modified
        ? new Date(fugitive.modified).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        : 'UNKNOWN';

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={fugitive.title}
                    className={styles.image}
                    loading="lazy"
                    onError={handleImageError}
                />
                <button className={styles.shareBtn} onClick={handleShare} title="Share Dossier">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                </button>
                <div className={styles.overlay}>
                    <button className={styles.detailsBtn}>VIEW DOSSIER</button>
                </div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{fugitive.title}</h3>

                <div className={styles.metaRow}>
                    <span className={styles.category}>{fugitive.subjects && fugitive.subjects[0]}</span>
                </div>

                <div className={styles.lastSeenContainer}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>LAST SEEN:</span>
                        <span className={styles.metaValue}>{lastSeen}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>UPDATED:</span>
                        <span className={styles.metaValue}>{lastUpdated}</span>
                    </div>
                </div>

                {amount ? (
                    <div className={styles.rewardContainer}>
                        <span className={styles.rewardBlink}>REWARD: {amount}</span>
                    </div>
                ) : (
                    <div className={styles.noReward}>REWARD: INFO ONLY</div>
                )}
            </div>
        </div>
    );
};

export default FugitiveCard;
