import React, { useEffect, useState } from 'react';
import { fetchWantedList } from '../services/api';
import styles from './IntelligenceTicker.module.css';

const IntelligenceTicker = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                // Fetch the first page to get recent items
                const data = await fetchWantedList(1);
                const newAlerts = data.items.slice(0, 10).map(item => ({
                    id: item.uid,
                    text: `NEW RECORD ADDED: ${item.title.toUpperCase()} // STATUS: AT LARGE // FIELD OFFICE: ${item.field_offices?.[0]?.toUpperCase() || 'UNKNOWN'}`,
                    reward: item.reward_text ? `REWARD: ${item.reward_text.toUpperCase()}` : null
                }));
                setAlerts(newAlerts);
            } catch (error) {
                console.error("Failed to load ticker alerts", error);
                setAlerts([{ id: 'err', text: "DATABASE SYNC ERROR // OFFLINE MODE ACTIVE // RE-ESTABLISHING CONNECTION..." }]);
            } finally {
                setLoading(false);
            }
        };

        loadAlerts();
    }, []);

    if (loading) return null;

    return (
        <div className={styles.tickerContainer}>
            <div className={styles.tickerWrapper}>
                <div className={styles.tickerContent}>
                    <span className={styles.liveIndicator}>● LIVE</span>
                    {alerts.concat(alerts).map((alert, index) => (
                        <span key={`${alert.id}-${index}`} className={styles.tickerItem}>
                            <span className={styles.bullet}>[!]</span> {alert.text} {alert.reward && <span className={styles.reward}>{alert.reward}</span>}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntelligenceTicker;
