import { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    //   const [quiz, setQuiz] = useState(null);
    const [quiz, setQuiz] = useState({ response_code: -1, results: [] });


    return (
        <QuizContext.Provider value={ { quiz, setQuiz } }>
            { children }
        </QuizContext.Provider>
    );
};