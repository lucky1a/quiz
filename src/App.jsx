import React, { useState, useEffect } from 'react';
import { Container, Table, Accordion, Form, Button, FormGroup, Card, ListGroup, NavDropdown } from 'react-bootstrap';
import axios from 'axios'

// import { decode as base64_decode } from 'base-64';
import { Buffer } from 'buffer';

// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './categories.json';
import quiz from './output.json';

import "./App.css"

function chunkArray(array, chunkSize) {
  let results = [];

  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }

  return results;
}

const Td = ({ item, selectedId, changeId }) => {
  return (
    <td
      key={ item.id }
      style={ { textAlign: 'center' } }
      className={ `justify-content-center ${selectedId === item.id ? 'selected' : ''}` }
      onClick={ () => changeId(item.id) }>
      { item.name }
    </td>
  )
}

function MyComponent({ selectedId, setSelectedId }) {
  console.log('dataasdasdsad', data)

  const handleClick = (string) => {
    setSelectedId(string);
  }

  return (
    <>

      {/* <Table bordered size="sm">
        { chunkArray(data, 4).map((chunk, index) => {
          return (<tr key={ index } className={ "row-height" }>
            { chunk.map((item) => <Td item={ item } selectedId={ selectedId } changeId={ setSelectedId } />
            )
            }
          </tr>)
        }) }
      </Table> */}

      {/* { selectedId && <p>Selected ID: { selectedId }</p> } */ }
      <Row>
        { data.map((item, index) => (
          <Col md={ 4 } sm={ 4 } key={ index } onClick={ () => handleClick(item.id) } className={ `border p-4 text-center ${item.id === selectedId ? 'highlight' : ''}` }>
            { item.name }
          </Col>
        )) }
      </Row>
      { selectedId && <p>Selected ID: { selectedId }</p> }


    </>
  );
}

function LoadingButton({ setQuiz }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://opentdb.com/api.php?amount=10&encode=base64');
        // setQuiz(response.data);
        setQuiz({ results: [{ question: "uwuwu==" }, { question: "quwjeqwiojeiojwoejo==" }] })
        return new Promise((resolve) => setTimeout(resolve, 3000));
        // return response;
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoading) {

      // fetchData().then(() => {
      //   console.log("done");
      // });
      // setLoading(false);

      axios.get('https://opentdb.com/api.php?amount=10&encode=base64')
        .then(response => {
          setQuiz(response.data);
          console.log('response.data', response.data)
          setLoading(false);
        })
    }

  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={ isLoading }
      onClick={ !isLoading ? handleClick : null }
    >
      { isLoading ? 'Loading…' : 'Click to load' }
    </Button>
  );
}

const App = () => {
  const [num, setNum] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedString, setSelectedString] = useState(null);

  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');

  const [quiz, setQuiz] = useState({ response_code: -1, results: [] });

  const handleChange = (event) => {
    const temp = event.target.value;
    setNum(temp);
    console.log('num', temp);
  }

  const handleSubmit = (event) => {
    const url = "https://opentdb.com/api.php";
    const a = num ? num : 10;
    const b = selectedId ? "&category=" + selectedId : "";
    const c = difficulty ? "&difficulty=" + difficulty : "";
    const d = type ? "&type=" + type : "";
    const query = url + "?amount=" + a + b + c + d + "&encode=base64";
    console.log('query', query)
  }


  return (
    <Container>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Number of Questions</Accordion.Header>
            <Accordion.Body>
              <Form.Control type="Number" max={ 50 } value={ num } onChange={ handleChange } />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>

              <MyComponent selectedId={ selectedString } setSelectedId={ setSelectedString } />

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Container>

      <Container>
        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Type</Accordion.Header>
            <Accordion.Body>
              <Table>
                <tr className='row-height'>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "easy" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("easy") }>
                    Easy
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "medium" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("medium") }>
                    Medium
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "hard" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("hard") }>
                    Hard
                  </td>
                </tr>
              </Table>
              <p>{ difficulty }</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container>
        <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Type</Accordion.Header>
            <Accordion.Body>
              <Table>
                <tr className='row-height'>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${type === "multiple" ? 'selected' : ''}` }
                    onClick={ () => setType("multiple") }>
                    Multiple Choice
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${type === "boolean" ? 'selected' : ''}` }
                    onClick={ () => setType("boolean") }>
                    True / False
                  </td>
                </tr>
              </Table>
              <p>{ type }</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={ handleSubmit }>
            Start Quiz
          </Button>
        </div>
      </Container>
      <LoadingButton setQuiz={ setQuiz } />

      <Container>
        { quiz.response_code === -1 ? <></> : <ShowQuiz quiz={ quiz } /> }
      </Container>
    </Container>

  )
}


const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');

const arrayOfThemes = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
  { name: 'Auto', icon: '⚙️' },
  // { name: 'Blue', icon: '🟦' }, //Add your own themes!
];

//Modifies the html root element
function modifyDOM(theme) {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}

const UWU = () => {
  const [mode, setMode] = useState(getPreferredTheme());

  useEffect(() => {
    if (IS_SERVER) return;
    modifyDOM(mode);
  }, []);

  function getPreferredTheme() {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function setPreferredTheme(theme) {
    modifyDOM(theme)

    localStorage.setItem('theme', theme);
    setMode(theme);
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const questions = mixAndShuffle(quiz.results);
  console.log('questions', questions);
  return (

    <>
      <NavDropdown
        title={
          <>
            {
              arrayOfThemes.find((theme) => theme.name.toLowerCase() === mode)
                ?.icon
            }{ ' ' }
          </>
        }
      >
        { arrayOfThemes.map((theme) => {
          const active = mode === theme.name.toLowerCase();
          return (
            <NavDropdown.Item
              key={ theme.name }
              className={ active ? 'active' : '' }
              onClick={ () => {
                setPreferredTheme(theme.name.toLocaleLowerCase());
              } }
            >
              { ' ' }
              { theme.icon } { theme.name } { active ? '✔️' : '' }
            </NavDropdown.Item>
          );
        }) }
      </NavDropdown>

      <Questions mcqData={ questions } />
    </>



  );
}

function shuffle(array) {
  console.log('array', array)
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
  console.log('array', array)

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

const Question = ({ question, index, selectedOption, setSelectedOption, showResults }) => {
  const handleSelect = (item) => {
    const newSelectedOption = [...selectedOption];
    newSelectedOption[index] = item;
    setSelectedOption(newSelectedOption);
  };

  return (
    <Card key={ index } style={ { width: '80%', borderRadius: '15px', margin: '1rem' } }>
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

const Questions = ({ mcqData }) => {
  const [selectedOption, setSelectedOption] = useState(new Array(mcqData.length));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

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
    <div style={ { display: 'flex' } }>
      <Container style={ { maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } }>
        { mcqData.map((mcq, index) => (
          <Question
            key={ index }
            question={ mcq }
            index={ index }
            selectedOption={ selectedOption }
            setSelectedOption={ setSelectedOption }
            showResults={ showResults }
          />
        )) }
        <Button onClick={ handleSubmit }>Submit</Button>
      </Container>
      { showResults && (
        <div style={ { position: 'fixed', top: 0, right: 0, padding: '10px' } }>
          <p>Your score: { score }/{ mcqData.length }</p>
        </div>
      ) }
    </div>
  );
};

const ShowQuiz = React.memo(({ quiz }) => {
  console.log('quiz', quiz)
  if (!quiz.results) {
    return "";
  }
  return (
    <>
      {
        quiz.results.map((question) => {
          return (
            <p>{ base64_decode(question.question) }</p>
            // <p>{ question.question }</p>
          )
        })
      }
    </>
  )
});
export default UWU;
