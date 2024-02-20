import React, { useState, useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {

    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false) // Lock answer after click
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    let option_1 = useRef(null)
    let option_2 = useRef(null)
    let option_3 = useRef(null)
    let option_4 = useRef(null)

    let option_array = [
        option_1,
        option_2,
        option_3,
        option_4
    ]

    const checkAnswer = (e, ans) => {
        if(lock === false) {
            if(question.answer === ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true)
                option_array[question.answer - 1].current.classList.add("correct")
            }
        }
    }

    const next = () => {
        if(lock === true) {

            if(index === data.length - 1) {
                setResult(true)
                return 0
            }
            
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
        
            {result 
                ? <div></div> 
                : <div>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={option_1} onClick={(e) => {checkAnswer(e, 1)}}>{question.opttion_1}</li>
                        <li ref={option_2} onClick={(e) => {checkAnswer(e, 2)}}>{question.opttion_2}</li>
                        <li ref={option_3} onClick={(e) => {checkAnswer(e, 3)}}>{question.opttion_3}</li>
                        <li ref={option_4} onClick={(e) => {checkAnswer(e, 4)}}>{question.opttion_4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </div>}

            {result 
                ? <div>
                        <h2>You Scored {score} out of {data.length}</h2>
                        <button onClick={reset}>Reset</button>
                    </div> 
                : <div></div>}
        </div>
    )
}

export default Quiz