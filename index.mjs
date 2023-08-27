import {parse} from 'csv-parse';
import fs from 'fs';

const habitablePlanets = [];

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
            habitablePlanets.push(planet)
        }
    })
    .on('error', (error) => {
        console.error(error)
    })
    .on('end', () => {
        console.log('Potentially habitable planets', habitablePlanets.map(planet => {
            return ({
                name: planet?.kepler_name
            })
        }))
        console.log(`# of planets: ${habitablePlanets.length}`)
    })


// parser.on()