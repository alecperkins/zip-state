const ALL_ZIP_CODES = require('./data/full-mapping.json');
const ALTERNATE_LIST = require('./data/alt-mapping.json');
const zipState = require('../zip-state');

let successes = 0;
let errors = 0;


// Check chosen subset
const samples = {
    '00544': 'NY',
    '00612': 'PR',
    '07030': 'NJ',
    '10001-1234': 'NY',
    '10013': 'NY',
    '39152': 'MS',
    '56800': null,  // Unused range, not real
    '95193': 'CA',
    '81137': 'CO', // Predominantly CO but Census includes part of NM
    '83005': 'WY', // Not a real zip code but in used range
    'H3B 3A7': null, // Real but Canadian, not currently supported
    '': null,
};
Object.entries(samples).forEach(([zip, target]) => {
    const found = zipState(zip);
    if (found !== target) {
        console.log('test', zip, zip.slice(0,3), found, target);
        errors += 1;
    } else {
        successes += 1;
    }
});


// Check all known ZIP codes from database
Object.entries(ALL_ZIP_CODES).forEach(([target, zips]) => {
    zips.forEach((zip) => {
        const found = zipState(zip);
        if (found !== target) {
            console.log('test', zip, zip.slice(0,3), found, target);
            errors += 1;
        } else {
            successes += 1;
        }
    });
});


// Check all known ZIP codes from alternate data source
Object.entries(ALTERNATE_LIST).forEach(([target, zips]) => {
    zips.forEach((zip) => {
        const found = zipState(zip);
        if (found !== target) {
            console.log('test', zip, zip.slice(0,3), found, target);
            errors += 1;
        } else {
            successes += 1;
        }
    });
});

console.log({ successes, errors });
process.exit(errors > 0 ? 1 : 0);
