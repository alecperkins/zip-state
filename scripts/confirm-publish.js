const target = require('../zip-state/package.json');
process.stdout.write(`\n\nReview the pack readout above, then confirm publish of ${ target.name }@${ target.version } by typing the package name:\n> `);
process.stdin.on('data', (data) => {
    if (data.toString().trim() === target.name) {
        process.exit(0);
    } else {
        process.stdout.write(`'${ data }' does not match '${ target.name }, aborting!'`);
        process.exit(1);
    }
});

