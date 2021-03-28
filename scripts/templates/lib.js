module.exports = function libTemplate ({ mapping, regions, exceptions }) {
    return `const mapping = new Uint8Array(${ JSON.stringify(mapping) });
const regions = ${ JSON.stringify(regions) };
const exceptions = ${ JSON.stringify(exceptions) };
return function zipState (zip) {
    let index;
    zip = zip.slice(0,5);
    if (exceptions[zip]) {
        index = exceptions[zip];
    } else {
        const prefix = parseInt(zip.slice(0,3));
        index = mapping[prefix];
    }
    return regions[index] || null;
};`;
}

module.exports.types = function typesTemplate () {
    return `declare function zipState (zip: string): string | null;
export default zipState;
`;
}
