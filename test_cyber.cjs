const https = require('https');

const testCyber = () => {
    return new Promise((resolve) => {
        // Testing common cyber related keywords
        const url = `https://api.fbi.gov/wanted/v1/list?pageSize=100`;
        console.log(`Searching for Cyber classification in first 100 items...`);

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const cyberItems = json.items.filter(item =>
                        item.poster_classification === 'cyber' ||
                        (item.subjects && item.subjects.some(s => s.toLowerCase().includes('cyber'))) ||
                        item.title.toLowerCase().includes('cyber')
                    );

                    console.log(`Found ${cyberItems.length} potential cyber items.`);
                    if (cyberItems.length > 0) {
                        console.log('Classifications found:', [...new Set(cyberItems.map(i => i.poster_classification))]);
                        console.log('Subjects found:', [...new Set(cyberItems.flatMap(i => i.subjects || []))]);
                    }

                    // Also test direct filter
                    https.get('https://api.fbi.gov/wanted/v1/list?person_classification=cyber', options, (res2) => {
                        let data2 = '';
                        res2.on('data', d => data2 += d);
                        res2.on('end', () => {
                            const json2 = JSON.parse(data2);
                            console.log(`Direct filter 'person_classification=cyber' total: ${json2.total}`);
                            resolve(true);
                        });
                    });
                } catch (e) {
                    console.error('Error:', e.message);
                    resolve(false);
                }
            });
        });
    });
};

testCyber();
