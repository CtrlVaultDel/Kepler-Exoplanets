import {parse} from 'csv-parse';
import fs from 'fs';

const results = [];

const parser = parse({
    columns: true,
    delimiter: ',',
    comment: '#'
})

function isHabitible(planet){
    return planet?.koi_disposition === 'CONFIRMED' 
    && planet?.koi_insol > 0.36 
    && planet?.koi_insol < 1.11 
    && planet?.koi_prad < 1.6;
}

fs.createReadStream('./data/kepler_data.csv')
    // .pipe connects readable stream source to writable stream destination
    .pipe(parser)
    .on('data', (planet) => {
        if(isHabitible(planet)){
            results.push(planet)
        }
    })
    .on('error', (error) => {
        console.error(error)
    })
    .on('end', () => {
        console.log('results', results)
        console.log(`Potentially habitible planets: ${results.length}`)
    })


// parser.on()