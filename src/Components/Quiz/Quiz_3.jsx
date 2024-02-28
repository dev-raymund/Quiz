import React, { useState, useEffect } from 'react'
import './Quiz.css'
import { words } from '../../assets/quiz_data_3'

const Quiz_3 = () => {

    let [index, setIndex] = useState(0)
    let [word, setWord] = useState(words[index])
    let [answer, setAnswer] = useState(word.related) // Related answer
    let [userAnswer, setUserAnswer] = useState([])
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    function compareArrays(a, b) {

        if (a.length !== b.length) {
            return false
        }
    
        const sortedArray1 = a.slice().sort()
        const sortedArray2 = b.slice().sort()
    
        for (let i = 0; i < sortedArray1.length; i++) {
            if (sortedArray1[i] !== sortedArray2[i]) {
                return false
            }
        }
    
        return true
    }

    const next = () => {

        if(userAnswer.length >= answer.length) {

            if(compareArrays(answer, userAnswer)) {
                setScore(prev => prev + 1)
            }

            if(index === words.length - 1) {
                setResult(true)
                return 0
            }

            setUserAnswer([])

            setIndex(++index)
            setWord(words[index])

            const answerItems = document.querySelectorAll('.answer-item')

            answerItems.forEach((answerItem, index) => {
                answerItem.classList.remove("selected")
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setWord(words[0])
        setScore(0)
        setResult(false)
    }

    const populateAnswer = (e, word, index) => {

        const tempUserAnswer = [...userAnswer]

        if(e.target.classList.toggle("selected")) {
            tempUserAnswer.push(word)
        } else {

            if(tempUserAnswer.includes(word)) {
                tempUserAnswer.splice(tempUserAnswer.indexOf(word), 1)
            }
        }

        setUserAnswer(tempUserAnswer)
    }

    return (
        <div className='container pt-100 pb-100'>
            <div className='card'>
                <div className='card-header'>
                    <h1 className='text-black'>Quiz 3</h1>
                </div>
                <div className='card-body'>

                    {result 
                        ?
                            <div className='center-items'>
                                <h2>You Scored {score} out of {words.length}</h2>
                            </div> 
                        :
                            <div>
                                <h2 className='text-black'>
                                    {index + 1}. Select {word.related.length} word{word.related.length > 1 ? `s` : ``} related.
                                </h2>
                                <ul className='p-0 flex wrap'>
                                    {word.words.map((word, index) => 
                                        <li 
                                            className={`answer-item w-20`} 
                                            key={index}
                                            onClick={(e) => {populateAnswer(e, word, index)}}
                                        >
                                            {word}
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
                                    <p>Item {index + 1} of {words.length}</p>
                                </div>

                                <button onClick={next}>Next</button>
                            </div> 
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Quiz_3