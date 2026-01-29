const API_BASE_URL = 'https://api.fbi.gov/wanted/v1/list';

export const fetchWantedList = async (page = 1, query = '', fieldOffice = '') => {
    try {
        const params = new URLSearchParams({
            page: page,
            title: query,
            field_offices: fieldOffice
        });
        // Remove empty params
        if (!query) params.delete('title');
        if (!fieldOffice) params.delete('field_offices');

        const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wanted list:', error);
        throw error;
    }
};
export const fetchTenMostWanted = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}?poster_classification=ten`);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ten most wanted:', error);
        throw error;
    }
};
export const fetchCyberWarrants = async () => {
    try {
        // We use a general search for 'cyber' which captures 'Cyber's Most Wanted' and related items
        const response = await fetch(`${API_BASE_URL}?poster_classification=default&pageSize=12&title=cyber`);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cyber warrants:', error);
        throw error;
    }
};
