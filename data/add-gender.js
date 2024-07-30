const fs = require('fs');
const exercises = require('./exercisev2.json');

const getRandomGenderArray = () => {
    const options = [
      ["male"],
      ["female"],
      ["male", "female"]
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

exercises.forEach((exercise) => {
    exercise.for = getRandomGenderArray();
});

fs.writeFile('exercise-v3.json', JSON.stringify(exercises, null, 2), 'utf8', writeErr => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
    } else {
      console.log('File successfully updated with gender field.');
    }
  });