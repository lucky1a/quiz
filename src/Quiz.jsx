import { useContext } from 'react';
import { QuizContext } from './components/QuizContext';
// import quiz from './output.json'
import Questions from './components/Questions'

import "./css/App.css"


const Quiz = () => {
  const { quiz } = useContext(QuizContext);
  // console.log('quiz', quiz)
  return (
    <>
      <Questions mcqData={ quiz } />
    </>
  );
}

export default Quiz;
