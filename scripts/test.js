const ALL_ZIP_CODES = require('./data/full-mapping.json');
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
    '83414': 'WY', // Actually WY but in the ID range
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


// Check using the ranges from https://en.wikipedia.org/wiki/List_of_ZIP_Code_prefixes
// (Not using the ranges for the real thing because the pre-expanded version compresses
// down smaller and requires less pre-work by the end user.)
const RANGES = require('./data/ranges.json');
function targetExceptions (zip, original_target) {
    // These are exceptions to the ranges that need to be explicitly remapped.
    const exceptions = {
        // '06390': 'NY', // CT range
        '73960': 'TX', // OK range
        '83414': 'WY', // ID range
        '96799': 'AS', // HI range
        '97003': 'AP', // OR range
    }
    return exceptions[zip] || original_target;
}
Object.entries(RANGES).forEach(([target, ranges]) => {
    ranges.forEach(([start, end]) => {
        start = parseInt(start) * 100;
        end = parseInt(end) * 100;
        for (let z = start; z <= end; z++) {
            let zip = z.toString();
            while (zip.length < 5) {
                zip = `0${ zip }`;
            }
            const _target = targetExceptions(zip, target);
            const found = zipState(zip);
            if (found && found.toString() !== _target) {
                console.log('test', zip, zip.slice(0,3), found, target);
                errors += 1;
            } else {
                successes += 1;
            }
        }
    })
});

console.log({ successes, errors });
process.exit(errors > 0 ? 1 : 0);
