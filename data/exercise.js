const exercise = require('./exercise.json');
const fs = require('fs');

let exercises = [];

for (let i = 0; i < exercise.length; i++) {
    const e = exercise[i];
    let _e = { image: [] };
    for (let j = 0; j < 5; j++) {
        if(e[`img${j}`]) {
            _e.image.push(e[`img${j}`]);
            delete e[`img${j}`];
        }
    }
    _e = { ...e, ..._e };
    exercises.push(_e);
}

fs.writeFileSync('./exercisev2.json', JSON.stringify(exercises, null, 2));