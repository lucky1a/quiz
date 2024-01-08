import { useState } from 'react';
import { Container, Accordion, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../categories.json';


import LoadingButton from './LoadingButton.jsx';

import "../css/App.css"

import { useNavigate } from 'react-router-dom'

function Category({ selectedId, setSelectedId }) {
    console.log('dataasdasdsad', data)

    const handleClick = (string) => {
        setSelectedId(string);
    }

    return (
        <>

            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
                <Row className='mx-auto'>
                    { data.map((item, index) => (
                        <Col style={ { borderRadius: '15px', cursor: 'pointer' } } lg={ 4 } md={ 6 } sm={ 12 } key={ index } onClick={ () => handleClick(item.id) } className={ `border p-4 text-center align-middle ${item.id === selectedId ? 'selected' : ''}` }>
                            { item.name }
                        </Col>
                    )) }
                </Row>
            </Accordion.Body>

            {/* { selectedId && <p>Selected ID: { selectedId }</p> } */ }
        </>
    );
}

const NoQuestions = ({ num, handleChange }) => {
    return (
        <>
            <Accordion.Header>Number of Questions</Accordion.Header>
            <Accordion.Body>
                <div className='my-2'>Max 50</div>
                <Form.Control type="Number" value={ num } onChange={ handleChange } />
            </Accordion.Body>
        </>
    );
}

const Difficulty = ({ difficulty, setDifficulty }) => {
    return (
        <>
            <Accordion.Header>Difficulty</Accordion.Header>
            <Accordion.Body>

                <Row>
                    { ['Easy', 'Medium', 'Hard'].map((item, index) => {
                        return (<Col style={ { borderRadius: '15px', cursor: 'pointer' } } md={ 4 } sm={ 12 } key={ index } onClick={ () => setDifficulty(item.toLowerCase()) } className={ `border p-4 text-center align-middle ${item.toLowerCase() === difficulty ? 'selected' : ''}` }>
                            { item }
                        </Col>);
                    }) }
                </Row>
                {/* <p>{ difficulty }</p> */ }

            </Accordion.Body>
        </>
    )
}

const Type = ({ type, setType }) => {
    return (
        <>
            <Accordion.Header>Type</Accordion.Header>
            <Accordion.Body>

                <Row>
                    { [{ string: 'Multiple Choice', id: 'multiple' }, { string: 'True / False', id: 'boolean' }].map((item, index) => {
                        return (<Col style={ { borderRadius: '15px', cursor: 'pointer' } } md={ 6 } sm={ 12 } key={ index } onClick={ () => setType(item.id) } className={ `border p-4 text-center align-middle ${item.id === type ? 'selected' : ''}` }>
                            { item.string }
                        </Col>);
                    }) }
                </Row>
                {/* <p>{ type }</p> */ }
            </Accordion.Body>
        </>
    )
}

export const QuizForm = () => {
    // console.log('uwuwuwuwuwuwu', "uwuwuwuwuwuwu")
    const navigate = useNavigate();
    const [num, setNum] = useState('');
    const [selectedString, setSelectedString] = useState(null);

    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');

    // const [quiz, setQuiz] = useState({ response_code: -1, results: [] });

    const handleChange = (event) => {
        const temp = event.target.value;
        setNum(temp);
        console.log('num', temp);
    }

    return (<>
        <Container>
            <Accordion>
                <Accordion.Item eventKey="0">

                    <NoQuestions num={ num } handleChange={ handleChange } />

                </Accordion.Item>
            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="1">

                    <Category selectedId={ selectedString } setSelectedId={ setSelectedString } />

                </Accordion.Item>

            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="2">

                    <Difficulty difficulty={ difficulty } setDifficulty={ setDifficulty } />

                </Accordion.Item>
            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="3">

                    <Type type={ type } setType={ setType } />

                </Accordion.Item>
            </Accordion>

            <div className="d-grid gap-2">
                <LoadingButton num={ num } selectedString={ selectedString } type={ type } difficulty={ difficulty } navigate={ navigate } />
            </div>

        </Container>
    </>
    )


}

export default QuizForm;