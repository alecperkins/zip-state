import zipState from '../../zip-state';

const samples = [
    '00544', // NY (IRS)
    '00612', // PR
    '07030', // NJ
    '10001-1234', // NY ZIP+4
    '39152', // MS
    '56800', // Unused range, not real
    '90210', // CA,
    'H3B 3A7', // Real but Canadian, not currently supported
];

samples.forEach((zip) => {
    const found_region = zipState(zip);
    console.log(`${ zip } -> ${ found_region }`);
});
