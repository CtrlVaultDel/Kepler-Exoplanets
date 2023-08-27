import {parse} from 'csv-parse';
import fs from 'fs';

const results = [];

fs.createReadStream('./data/kepler_data.csv')
    // .pipe connects readable stream source to writable stream destination
    .pipe(parse({
        columns: true,
        delimiter: ',',
        comment: '#'
    }))
    .on('data', (data) => {
        results.push(data)
    })
    .on('error', (error) => {
        console.error(error)
    })
    .on('end', () => {
        console.log('results', results[0])
        console.log('Finished reading file')
    })


// parser.on()