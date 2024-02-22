import React, { useState } from 'react'
import './Quiz.css'
import { sentences } from '../../assets/quiz_data_2'

const Quiz_2 = () => {

    let [index, setIndex] = useState(0)
    let [sentence, setSentence] = useState(sentences[index])
    let [answer, setAnswer] = useState(null)
    let [lock, setLock] = useState(false) // Lock answer after click
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    const explodedSentence = sentence.sentence.split(' ')
    const words = sentence.words
    const answerTemp = []

    const structuredSentence = () => {

        if (sentence.words && sentence.words.length > 0) {

            const replacedSentence = explodedSentence.map((word, index) => {
                if (sentence.words.includes(word.toLowerCase())) {
                    return <span className={`blank w-100 word item-${index}`} key={index}></span>
                } else {
                    return <span key={index}>{word} </span>
                }
            });
            return replacedSentence

        } else {
            return sentence
        }

    }

    const next = () => {

        setLock(true)

        if(sentence.answer === answerTemp) {
            setScore(prev => prev + 1)
        }

        if(index === sentences.length - 1) {
            setResult(true)
            return 0
        }

        setIndex(++index)
        setSentence(sentences[index])
        setLock(false)

        const answerItems = document.querySelectorAll('.word')

        answerItems.forEach((answerItem, index) => {
            answerItem.textContent = ''
        })
        
    }

    const reset = () => {
        setIndex(0)
        setSentence(sentences[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }


    const wordsBlankIndex = () => {
        return words.map(word => explodedSentence.indexOf(word));
    }

    const populateAnswer = (e, word) => {

        const inputValue = e.target.value - 1

        const wordIndex = wordsBlankIndex()[inputValue]

        console.log(wordsBlankIndex())

        if(undefined !== wordIndex) {

            if(answerTemp.includes(word)) {
                answerTemp.splice(answerTemp.indexOf(word), 1)
            }

            answerTemp.splice(inputValue, 0, word)

            document.querySelector(`.word.item-${wordIndex}`).textContent = word
        }
    }


    

    return (
        <div className='container pt-100 pb-100'>
            <div className='card'>
                <div className='card-header'>
                    <h1 className='text-black'>Quiz 2</h1>
                </div>
                <div className='card-body'>

                    {result 
                        ?
                            <div className='center-items'>
                                <h2>You Scored {score} out of {sentences.length}</h2>
                            </div> 
                        :
                            <div>
                                <h2 className='text-black'>{index + 1}. {structuredSentence()}.</h2>
                                <ul className='pl-20'>
                                    {sentence.words.map((word, index) => 
                                        <li 
                                            className={`word-item text-black`} 
                                            key={word}
                                        >
                                            <input 
                                                type='number' 
                                                className='word-item-input' 
                                                key={`word-item-${index}`}
                                                min={1} 
                                                onChange={(e) => {populateAnswer(e, word)}}
                                            /> {word}
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
                                    <p>{index + 1} of {sentences.length} sentences</p>
                                </div>

                                <button onClick={next}>Next</button>
                            </div> 
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Quiz_2