# ZIP-State

![npm package](https://img.shields.io/npm/v/zip-state) ![CC0-1.0 license](https://img.shields.io/npm/l/zip-state) ![test status](https://github.com/alecperkins/zip-state/actions/workflows/node.js.yml/badge.svg)


`zip-state` is a lightweight mapping of USPS-defined ZIP Codes to their assigned regions. Given a 5- or 9-digit ZIP Code, `zip-state` will return the USPS abbreviation for the corresponding region. It is well suited for quick real-time checking of user address input and validating the most significant digits of the ZIP code.

For example, the user enters `WI` for their region but `63005` for their ZIP Code (belonging to `MO`) instead of `53005`, the discrepancy can be instantly detected.

[See an in-browser example](https://alecperkins.net/zip-state).

Every real ZIP Code will work. However, it is not a comprehensive listing. In most cases it will not check the complete input, only the first three digits that form the prefix. If that prefix range is in-use, non-existent ZIP Codes may still return that region. For example, `83005` will match Wyoming (`830` prefix), even though that specific ZIP Code does not (currently) exist. It also currently does not support Canadian or other non-US postal codes. See _Alternatives_ below for other options.

**Note:** this is using the _USPS mapping_ and is based on how ZIPs are used for [US mail routing and delivery](https://pe.usps.com/Archive/HTML/DMMArchive20050106/print/L002.htm). The USPS does not define geographic boundaries for ZIP Codes. The region found will not necessarily match how the US Census Bureau uses ZIP Codes for their ZIP Code Tabulation Areas, or correspond to actual geographic location. Particularly, some ZCTAs cross state lines, eg `81137`. This library may be helpful for rough geographic validation, but should not be relied on for precise geolocation. Check out the tests for some [fun exceptions](https://github.com/alecperkins/zip-state/blob/44d43f3895f8672d002c30a2db702fd8fd0bc0ef/scripts/test.js#L9-L23) to the assignments.


## Installation

`npm install --save zip-state`

and include as a JavaScript or TypeScript module (types included):

```typescript
import zipState from 'zip-state';
```

…or a CommonJS module:

```javascript
const zipState = require('zip-state');
```

Or use the file directly in markup using the [unpkg CDN](https://unpkg.com/):

```html
<script src="https://unpkg.com/zip-state"></script>
```


## Usage

Pass the ZIP code to the function and get back the two-digit region abbreviation as a string, or `null` if no match.

```javascript
const region = zipState('10001');
// region === 'NY';
```

```javascript
const region = zipState('56800');
// region === null;
```


ZIP+4 will also work:

```javascript
const region = zipState('10001-1234');
// region === 'NY'
```

## Author

Alec Perkins, https://alecperkins.net


## License

The packaged mapping and lookup function code, and published build tooling, is licensed under the Creative Commons “CC0 1.0 Universal” license.

See `./LICENSE` for more information.


### Acknowledgements

Assembled ZIP Code data is derived from the [database](http://federalgovernmentzipcodes.us) provided by [Daniel. S. Coven](https://www.linkedin.com/in/daniel-s-coven-56273411b):

> Coven, D. S., (2012). Free Zipcode Database: Unique Zipcode [data file]. Retrieved from http://federalgovernmentzipcodes.us 

The assignments themselves are a product of the United States Postal Service, with which this project has no affiliation.


## Alternatives

zip-state’s focus is bundle size and specific usecase, trading 100% comprehensiveness for tiny footprint but still handling all real ZIPs. zip-state is about 5 KB uncompressed, 1 KB compressed. Many of the alternatives are several MB in size, or do not include support for regions other than the 50 states and DC.

For comprehensive lookup, Canada support, and geographic mapping, check out [`zipcodes`](https://www.npmjs.com/package/zipcodes).

For reverse geocoding, try [`us-zips`](https://www.npmjs.com/package/us-zips) or [`zipsearch`](https://www.npmjs.com/package/zipsearch).

