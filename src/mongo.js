// import mongoose from 'mongoose';


// // if (process.argv.length < 3) {
// //     console.log('give password as argument')
// //     process.exit(1)
// // }

// const password = "Y1Qr36WZ3zYb2Y35"

// const url =
//     `mongodb+srv://notLucky:${password}@cluster0.3udo78v.mongodb.net/?retryWrites=true&w=majority`


// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'wowo',
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// import axios from "axios";
// import fs from 'fs';

// // Replace 'your_api_endpoint' with the actual endpoint you want to call
// axios.get('https://opentdb.com/api.php?amount=10&encode=base64')
//   .then(response => {
//     // Convert the JSON object to a string
//     const data = JSON.stringify(response.data, null, 2);

//     // Write the string to a file
//     fs.writeFile('output.json', data, (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('Data written to file');
//       }
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

import quiz from './output.json' assert { type: 'json' };
import categories from './categories.json' assert { type: 'json' };

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// console.log('data', categories)
// console.log('quiz', quiz)
console.log(shuffle(quiz.results[0].incorrect_answers.concat(quiz.results[0].correct_answer)))