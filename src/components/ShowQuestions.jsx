import React from 'react';
import Question from './Question';
import { useNavigate } from 'react-router-dom'


import "../css/App.css"
import { Modal, Button } from 'react-bootstrap';

const ShowQuestions = ({ mcqData, selectedOption, setSelectedOption, showResults }) => {
    if (mcqData.response_code === -1) {
        const navigate = useNavigate();

        return (
            <>
                <Modal show={ true } onHide={ () => {
                    navigate('/quiz/');
                } }>
                    <Modal.Header closeButton>
                        <Modal.Title> Data Error </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Don't try to access the url directly or don't refresh the page. <br />You will redirected to home page.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => {
                            navigate('/quiz/')
                        } }>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal >
            </>
        )
    }

    return (
        <>
            {
                mcqData.map((mcq, index) => (
                    <Question
                        key={ index }
                        question={ mcq }
                        index={ index }
                        selectedOption={ selectedOption }
                        setSelectedOption={ setSelectedOption }
                        showResults={ showResults }
                    />
                ))
            }
        </>
    )
}

export default ShowQuestions;
