import React, { useEffect } from 'react';
import styles from './PrivacyModal.module.css';

const PrivacyModal = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>X</button>

                <div className={styles.header}>
                    <h2 className={styles.title}>LEGAL ARCHIVE // PRIVACY NOTICE</h2>
                    <div className={styles.stamp}>APPROVED FOR PUBLIC ACCESS</div>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3>1. DATA SOURCE & USAGE</h3>
                        <p>This application serves as a visual interface for the Federal Bureau of Investigation (FBI) Wanted API. All information regarding fugitives, including names, images, and specific details, is sourced directly from official public records provided by the FBI.</p>
                    </div>

                    <div className={styles.section}>
                        <h3>2. PERSONAL DATA COLLECTION</h3>
                        <p>We do not collect, store, or process any personal identification information (PII) from users. This application does not require registration, use tracking cookies, or maintain user logs of any kind.</p>
                    </div>

                    <div className={styles.section}>
                        <h3>3. INTENDED PURPOSE</h3>
                        <p>This platform is intended for informational and educational purposes only. Users are encouraged to verify all information through official government channels (FBI.gov) before taking any action.</p>
                    </div>

                    <div className={styles.section}>
                        <h3>4. EXTERNAL LINKS</h3>
                        <p>Clicking on "View Official Page" will redirect you to external government websites. We are not responsible for the privacy practices or content of these third-party platforms.</p>
                    </div>

                    <div className={styles.footerNote}>
                        <p>LAST REVIEW: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
