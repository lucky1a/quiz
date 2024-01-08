import { useState } from 'react';
import { QuizContext } from './components/QuizContext.jsx';

import "./css/App.css"
import Header from './components/Header.jsx';

import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'

import Quiz from './Quiz.jsx'
import QuizForm from './components/QuizForm.jsx';

const Home = () => {
    const [quiz, setQuiz] = useState({ response_code: -1, results: [] });

    return (

        <QuizContext.Provider value={ { quiz, setQuiz } }>
            <Header />
            <Router>
                <Routes>

                    <Route exact path="/quiz" element={ <QuizForm /> }>
                    </Route>

                    <Route path="/quiz/:quizId" element={ <Quiz /> }>
                    </Route>
                </Routes>
            </Router>
        </QuizContext.Provider>
    )
}

export default Home;