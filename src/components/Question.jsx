import { Card, ListGroup } from 'react-bootstrap';

import { Buffer } from 'buffer';

import "../css/App.css"

const Question = ({ question, index, selectedOption, setSelectedOption, showResults }) => {
    const handleSelect = (item) => {
        const newSelectedOption = [...selectedOption];
        newSelectedOption[index] = item;
        setSelectedOption(newSelectedOption);
    };
    console.log('question', question)

    return (

        <Card key={ index } style={ { width: '90%', borderRadius: '15px', margin: '1rem', boxShadow: showResults && selectedOption[index] !== question.correct_answer ? '0 0 10px red' : '' } }>
            <Card.Header style={ { borderRadius: '15px 15px 0 0' } }>Category: { Buffer.from(question.category, 'base64').toString('utf-8') }</Card.Header>
            <Card.Body>
                <Card.Title style={ { margin: '10px 0px 20px 15px' } }>{ "Question " + (index + 1) + ": " + Buffer.from(question.question, 'base64').toString('utf-8') }</Card.Title>
                <ListGroup>
                    { question.options.map((item, itemIndex) => {
                        const isSelected = selectedOption[index] === item;
                        let allowChange = true;
                        let variant = '';
                        if (showResults) {
                            allowChange = false;
                            if (item === question.correct_answer) {
                                variant = 'success';
                            } else if (isSelected && item !== question.correct_answer) {
                                variant = 'danger';
                            }
                        } else {
                            variant = isSelected ? "primary" : "";
                        }
                        return (
                            <ListGroup.Item
                                key={ itemIndex }
                                variant={ variant }
                                style={ { borderRadius: '15px', cursor: 'pointer' } }
                                onClick={ allowChange ? () => handleSelect(item) : () => { } }
                            >
                                { Buffer.from(item, 'base64').toString('utf-8') }
                            </ListGroup.Item>
                        )
                    }) }
                </ListGroup>
            </Card.Body>
        </Card>
    );
};


export default Question;