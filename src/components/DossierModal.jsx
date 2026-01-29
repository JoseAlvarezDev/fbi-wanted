import React, { useEffect } from 'react';
import styles from './DossierModal.module.css';

const DossierModal = ({ fugitive, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!fugitive) return null;

    const handleImageError = (e) => {
        e.target.src = '/logo.png';
        e.target.style.padding = '4rem';
        e.target.style.background = '#e8e4db';
    };

    const image = fugitive.images && fugitive.images[0] ? fugitive.images[0].original : '/logo.png';

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>X</button>

                <div className={styles.header}>
                    <h2 className={styles.title}>CLASSIFIED DOSSIER</h2>
                    <div className={styles.stamp}>
                        DANGER LEVEL: {fugitive.poster_classification === 'ten' ? 'CRITICAL' : 'HIGH'}
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.imageSection}>
                        <img src={image} alt={fugitive.title} className={styles.image} onError={handleImageError} />
                        <div className={styles.meta}>
                            <p><strong>DOB:</strong> {fugitive.dates_of_birth_used ? fugitive.dates_of_birth_used.join(', ') : 'Unknown'}</p>
                            <p><strong>Place of Birth:</strong> {fugitive.place_of_birth || 'Unknown'}</p>
                            <p><strong>Hair:</strong> {fugitive.hair || 'Unknown'}</p>
                            <p><strong>Eyes:</strong> {fugitive.eyes || 'Unknown'}</p>
                            <p><strong>Scars/Marks:</strong> {fugitive.scars_and_marks || 'None reported'}</p>
                            <hr className={styles.separator} />
                            <p><strong>Last Known Location:</strong> {fugitive.field_offices ? fugitive.field_offices.join(', ') : 'Unknown'}</p>
                            <p><strong>Record Modified:</strong> {fugitive.modified ? new Date(fugitive.modified).toLocaleDateString() : 'Unknown'}</p>
                        </div>
                    </div>

                    <div className={styles.detailsSection}>
                        <h3 className={styles.name}>{fugitive.title}</h3>
                        <p className={styles.aliased}><strong>ALIASES:</strong> {fugitive.aliases ? fugitive.aliases.join(', ') : 'None'}</p>

                        <div className={styles.section}>
                            <h4>WARNING / CAUTION</h4>
                            <p className={styles.caution}>{fugitive.caution || fugitive.warning_message || 'Consider armed and dangerous.'}</p>
                        </div>

                        {fugitive.remarks && (
                            <div className={styles.section}>
                                <h4>REMARKS</h4>
                                <div dangerouslySetInnerHTML={{ __html: fugitive.remarks }} />
                            </div>
                        )}

                        {fugitive.description && (
                            <div className={styles.section}>
                                <h4>DESCRIPTION</h4>
                                <p>{fugitive.description}</p>
                            </div>
                        )}

                        <a href={fugitive.url} target="_blank" rel="noopener noreferrer" className={styles.fbiLink}>
                            VIEW OFFICIAL FBI PAGE
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DossierModal;
