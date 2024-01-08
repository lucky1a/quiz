import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

import "../css/App.css"
import Toggle from './Toggle';


import GroupResult from './GroupResult';
import ShowQuestions from './ShowQuestions';


const Questions = React.memo(({ mcqData }) => {
    console.log('mcqData', mcqData)
    const [groupToggle, setGroupToggle] = useState(true);
    const [selectedOption, setSelectedOption] = useState(new Array(mcqData.length));
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    console.log('selectedOption', selectedOption)

    const handleSubmit = () => {
        let newScore = 0;
        selectedOption.forEach((option, index) => {
            if (option === mcqData[index].correct_answer) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setShowResults(true);
    };

    return (
        <div style={ { display: 'flex', justifyContent: 'space-between' } }>

            <Container style={ { maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' } }>

                { showResults && (
                    <div style={ { maxWidth: "100%", margin: "20px", padding: '20px', border: '1px solid black', textAlign: 'center' } }>
                        Your score: { score }/{ mcqData.length }
                    </div>
                ) }

                { showResults && (
                    <Toggle group={ groupToggle } setGroup={ setGroupToggle } />
                ) }

                { showResults && groupToggle && (
                    <GroupResult mcqData={ mcqData } selectedOption={ selectedOption } setSelectedOption={ setSelectedOption } showResults={ showResults } />
                ) }
                { (!showResults || !groupToggle) && (
                    <ShowQuestions mcqData={ mcqData } selectedOption={ selectedOption } setSelectedOption={ setSelectedOption } showResults={ showResults } />
                ) }



                { !showResults && (<Button onClick={ handleSubmit }>Submit</Button>) }
            </Container>
        </div>
    );
});

export default Questions;