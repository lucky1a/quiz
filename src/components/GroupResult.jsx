import Question from './Question';

import "../css/App.css"

const GroupResult = ({ mcqData, selectedOption, setSelectedOption, showResults }) => {
    console.log('mcqData', mcqData)
    const correctAnswerArray = []
    const wronfAnswerArray = []

    for (let i = 0; i < selectedOption.length; ++i) {
        if (selectedOption[i] !== mcqData[i].correct_answer) {
            wronfAnswerArray.push([i, mcqData[i]])
        } else {
            correctAnswerArray.push([i, mcqData[i]])
        }
    }
    console.log('newArray', correctAnswerArray);
    return (
        <>
            {
                wronfAnswerArray.map((question) => (
                    <Question
                        key={ question[0] }
                        question={ question[1] }
                        index={ question[0] }
                        selectedOption={ selectedOption }
                        setSelectedOption={ setSelectedOption }
                        showResults={ showResults }
                    />
                ))
            }

            {
                correctAnswerArray.map((question) => (
                    <Question
                        key={ question[0] }
                        question={ question[1] }
                        index={ question[0] }
                        selectedOption={ selectedOption }
                        setSelectedOption={ setSelectedOption }
                        showResults={ showResults }
                    />
                ))
            }

        </>
    )
}

export default GroupResult;