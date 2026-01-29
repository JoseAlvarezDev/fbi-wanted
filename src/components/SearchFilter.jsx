import React, { useState } from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ onSearch, onFilter }) => {
    const [query, setQuery] = useState('');
    const [fieldOffice, setFieldOffice] = useState('');

    // Some FBI field offices for the dropdown
    const fieldOffices = [
        'Albany', 'Albuquerque', 'Anchorage', 'Atlanta', 'Baltimore', 'Birmingham', 'Boston', 'Buffalo',
        'Charlotte', 'Chicago', 'Cincinnati', 'Cleveland', 'Columbia', 'Dallas', 'Denver', 'Detroit',
        'El Paso', 'Honolulu', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Knoxville',
        'Las Vegas', 'Little Rock', 'Los Angeles', 'Louisville', 'Memphis', 'Miami', 'Milwaukee',
        'Minneapolis', 'Mobile', 'New Haven', 'New Orleans', 'New York', 'Newark', 'Norfolk',
        'Oklahoma City', 'Omaha', 'Philadelphia', 'Phoenix', 'Pittsburgh', 'Portland', 'Richmond',
        'Sacramento', 'Salt Lake City', 'San Antonio', 'San Diego', 'San Francisco', 'San Juan',
        'Seattle', 'Springfield', 'St. Louis', 'Tampa', 'Washington'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleFilterChange = (e) => {
        const val = e.target.value;
        setFieldOffice(val);
        onFilter(val);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="SEARCH DATABASE..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchBtn}>SEARCH</button>
            </form>

            <div className={styles.filterContainer}>
                <label className={styles.label}>FIELD OFFICE:</label>
                <select value={fieldOffice} onChange={handleFilterChange} className={styles.select}>
                    <option value="">ALL OFFICES</option>
                    {fieldOffices.map(office => (
                        <option key={office} value={office.toLowerCase().replace(' ', '')}>{office.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;
