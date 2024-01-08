import { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'

// import LoadingButton from './LoadingButton';
import { QuizContext } from './QuizContext';

import { v4 as uuidv4 } from 'uuid';

import "../css/App.css"

function shuffle(array) {
    // console.log('array', array)
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
    // console.log('array', array)

    return array;
}


const mixAndShuffle = (questions) => {
    questions = questions.map(question => {
        const combinedOptions = question.incorrect_answers.concat([question.correct_answer]);
        // console.log('temp', combinedOptions, typeof(combinedOptions), combinedOptions.length)
        const shuffledOptions = shuffle(combinedOptions);
        return { ...question, options: shuffledOptions };
    })

    return questions;
};

// const questions = mixAndShuffle(quiz.results);


function LoadingButton({ num, selectedString, difficulty, type, navigate }) {
    const { setQuiz } = useContext(QuizContext);
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState({});

    const handleClose = () => setShow(false);

    useEffect(() => {
        const numNum = Number(num);
        if (num && numNum < 1 || numNum > 50) {
            setModal({ title: 'Validation Error', message: 'Number of questions must be between 1 and 50.' });
            setShow(true);
            setLoading(false);
            return;
        }
        // console.log('"VALID"', numNum);
        // setLoading(false);
        // return;
        console.log('"called"', "called")
        const url = "https://opentdb.com/api.php";
        const a = num ? num : 10;
        const b = selectedString ? "&category=" + selectedString : "";
        const c = difficulty ? "&difficulty=" + difficulty : "";
        const d = type ? "&type=" + type : "";
        const query = url + "?amount=" + a + b + c + d + "&encode=base64";
        console.log('query', query)

        // if (isLoading) {
        //     setQuiz(mixAndShuffle(quiz));
        //     setLoading(false)
        //     const quizId = uuidv4();
        //     navigate(`/quiz/${quizId}`);
        // }
        // return;

        if (isLoading) {
            axios.get(query)
                .then(response => {
                    const quiz = mixAndShuffle(response.data.results);
                    setQuiz(quiz);
                    console.log('response.data', quiz)
                    setLoading(false);

                    function sleepFor(sleepDuration) {
                        var now = new Date().getTime();
                        while (new Date().getTime() < now + sleepDuration) { /* Do nothing */ }
                    }

                    sleepFor(3);

                    const quizId = uuidv4();
                    navigate(`/quiz/${quizId}`);
                }).catch(error => {
                    console.error('Error fetching quiz data:', error);
                    setModal({ title: 'API Error', message: error.message });
                    setShow(true);
                    setLoading(false);
                });
        }

    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <>
            <Button
                variant="primary"
                disabled={ isLoading }
                onClick={ !isLoading ? handleClick : null }
            >
                { isLoading ? 'Loading…' : 'Submit' }
            </Button>

            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title> { modal.title } </Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modal.message }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoadingButton