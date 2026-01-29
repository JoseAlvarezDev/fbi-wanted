import React, { useEffect, useState } from 'react';
import { fetchWantedList } from '../services/api';
import FugitiveCard from './FugitiveCard';
import SearchFilter from './SearchFilter';
import styles from './FugitiveList.module.css';

const FugitiveList = ({ onSelectFugitive }) => {
    const [fugitives, setFugitives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [fieldOffice, setFieldOffice] = useState('');

    useEffect(() => {
        const loadFugitives = async () => {
            try {
                setLoading(true);
                // Reset to page 1 if searching/filtering changed (handled by useEffect deps)
                // But we need to handle "load more" vs "new search" logic.
                // For simplicity, if page is 1, we overwrite. If >1, we append.

                const data = await fetchWantedList(page, searchQuery, fieldOffice);
                setFugitives(prev => page === 1 ? data.items : [...prev, ...data.items]);
            } catch (err) {
                console.error(err);
                setError('Failed to load archives. Connection secure?');
            } finally {
                setLoading(false);
            }
        };

        loadFugitives();
    }, [page, searchQuery, fieldOffice]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(1);
        setFugitives([]); // Clear current list to avoid confusion
    };

    const handleFilter = (office) => {
        setFieldOffice(office);
        setPage(1);
        setFugitives([]);
    };

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>ARCHIVE RECORDS</h2>
                <div className={styles.line}></div>
            </div>

            <SearchFilter onSearch={handleSearch} onFilterChange={handleFilter} />

            {fugitives.length === 0 && !loading ? (
                <div className={styles.emptyResults}>
                    NO MATCHING RECORDS FOUND IN THE ARCHIVES // SEARCH RE-INDEXING SUGGESTED
                </div>
            ) : (
                <div className={styles.grid}>
                    {fugitives.map(fugitive => (
                        <FugitiveCard
                            key={fugitive.uid}
                            fugitive={fugitive}
                            onClick={() => onSelectFugitive(fugitive)}
                        />
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <button
                    onClick={loadMore}
                    className={styles.loadMoreBtn}
                    disabled={loading}
                >
                    {loading ? 'ACCESSING DATABASE...' : 'LOAD MORE RECORDS'}
                </button>
            </div>
        </section>
    );
};

export default FugitiveList;
