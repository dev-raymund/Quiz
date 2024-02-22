import React, { useState, useRef } from 'react'
import './Quiz.css'
import { questions } from '../../assets/quiz_data_1'

const Quiz_1 = () => {

    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(questions[index])
    let [answer, setAnswer] = useState(null)
    let [lock, setLock] = useState(false) // Lock answer after click
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)
    
    const checkAnswer = (e, option, index) => {

        if(lock === false) {
            if(question.answer === option) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong")
                setAnswer(question.answer)
                setLock(true)
            }
        }

    }

    const next = () => {
        if(lock === true) {

            if(index === questions.length - 1) {
                setResult(true)
                return 0
            }
            
            setIndex(++index)
            setQuestion(questions[index])
            setLock(false)

            const answerItems = document.querySelectorAll('.answer-item')

            answerItems.forEach((answerItem, index) => {
                answerItem.classList.remove('wrong')
                answerItem.classList.remove('correct')
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(questions[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

    return (
        <div className='container pt-100 pb-100'>
            <div className='card w-50'>

                <div className='card-header'>
                    <h1 className='text-black'>Quiz 1</h1>
                </div>

                <div className='card-body'>

                    {result 
                        ?
                            <div className='center-items'>
                                <h2>You Scored {score} out of {questions.length}</h2>
                            </div> 
                        :
                            <div>
                                <h2 className='text-black'>{index + 1}. {question.question}</h2>
                                <ul className='pl-20'>

                                    {question.options.map((option, index) => 
                                        <li 
                                            className={`answer-item text-black ${option === answer ? 'correct' : ''}`} 
                                            key={index} 
                                            onClick={(e) => {checkAnswer(e, option, index)}}
                                        >
                                            {option}
                                        </li>
                                    )}
                                </ul>
                            </div>
                    }

                    
                </div>

                <div className='card-footer'>
                    
                    {result
                        ?
                            <div className='flex flex-item-center flex-end'>
                                <button onClick={reset}>Reset</button>
                            </div>
                        :
                            <div className='flex flex-item-center flex-space-between'>
                                <div className='index'>
                                    <p>{index + 1} of {questions.length} questions</p>
                                </div>
        
                                <button onClick={next}>Next</button>
                            </div>    
                    }
                        
                </div>
            </div>
        </div>
    )
}

export default Quiz_1