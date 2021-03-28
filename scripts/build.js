const fs = require('fs');
const path = require('path');
const umdTemplate = require('./templates/umd.js');
const libTemplate = require('./templates/lib.js');
const ALL_ZIP_CODES = require('./data/full-mapping.json');

const major_regions = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NV','NH','NJ','NM','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY','DC','GU','PR','VI'];
const data_regions = Object.keys(ALL_ZIP_CODES);
const minor_regions = data_regions.filter(r => !major_regions.includes(r));

const regions = [
    null,               // Put at the beginning so 0 index is null, and exceptions[zip] will never be 0
    ...major_regions,   // Major regions generally are bigger so put them first to minimize exceptions
    ...minor_regions,
];

const mapping = new Array(1000);
mapping.fill(0);

regions.slice(1).forEach((region) => {
    ALL_ZIP_CODES[region].forEach((zip) => {
        const prefix_num = parseInt(zip.slice(0,3), 10);
        if (!mapping[prefix_num]) {
            mapping[prefix_num] = regions.indexOf(region);
        }
    });
});

const exceptions = {};
Object.entries(ALL_ZIP_CODES).forEach(([region, zips]) => {
    zips.forEach((zip) => {
        const prefix_num = parseInt(zip.slice(0,3), 10);
        if (regions[mapping[prefix_num]] !== region) {
            exceptions[zip] = regions.indexOf(region);
        }
    });
});

const actual_zips = new Set();
Object.entries(ALL_ZIP_CODES).forEach(([region, zips]) => {
    zips.forEach((zip) => {
        actual_zips.add(parseInt(zip));
    });
});
const non_existent = new Set();
for (let i = 0; i < 100000; i++) {
    if (!actual_zips.has(i)) {
        non_existent.add(i);
    }
}


const files = {};

files['README.md'] = fs.readFileSync(path.join(__dirname, '..', 'README.md'));
files['LICENSE'] = fs.readFileSync(path.join(__dirname, '..', 'LICENSE'));

const package_content = require(path.join(__dirname, '..', 'package.json'));
delete package_content.scripts;
delete package_content.devDependencies;
delete package_content.private;
delete package_content.engines;
files['package.json'] = JSON.stringify(package_content, null, 4);

files['zip-state.js'] = umdTemplate({
    header: `/* ${ package_content.name }@${ package_content.version } ${ package_content.license } ${ package_content.homepage } */`,
    name: 'zipState',
    code: libTemplate({ mapping, regions, exceptions }),
});

files['zip-state.d.ts'] = libTemplate.types();


const build_dir = path.join(__dirname, '..', 'zip-state');
if (fs.existsSync(build_dir)) {
    fs.rmSync(build_dir, { recursive: true, force: true });
}
fs.mkdirSync(build_dir);
Object.entries(files).forEach(([name, content]) => {
    fs.writeFileSync(
        path.join(build_dir, name),
        content,
    );
});
