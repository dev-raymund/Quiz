import React, { useState, useEffect } from 'react'
import './Quiz.css'
import { sentences } from '../../assets/quiz_data_2'

const Quiz_2 = () => {

    let [index, setIndex] = useState(0)
    let [sentence, setSentence] = useState(sentences[index].split(' '))
    let [words, setWords] = useState([])
    let [answer, setAnswer] = useState([]) // Answer in the sentence
    let [userAnswer, setUserAnswer] = useState([])
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    // Returns a half random item in array
    const getRandomItems = (array) => {

        const countItems = ((array.length / 2) > 9) ? 9 : array.length / 2 // not exceed to 9
        const randomItems = []
    
        for (let i = 0; i < countItems; i++) {
            const randomIndex = Math.floor(Math.random() * array.length)

            if(!randomItems.includes(array[randomIndex])) {
                randomItems.push(array[randomIndex])
            }
        }
        return randomItems
    }

    const compareArrays = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    const mapItemsInArray = (array, items) => {
        return items.map(item => array.indexOf(item));
    }

    const sortNumbers = (array) => {
        return array.sort((a, b) => {
            return a - b
        })
    }

    const next = () => {

        if(userAnswer.length > 0) {
            if(compareArrays(answer, userAnswer)) {
                setScore(prev => prev + 1)
            }
    
            if(index === sentences.length - 1) {
                setResult(true)
                return 0
            }
    
            setIndex(++index)
            setSentence(sentences[index].split(' '))
            setWords(getRandomItems(sentence))
    
            const answerItems = document.querySelectorAll('.word')
    
            answerItems.forEach((answerItem, index) => {
                answerItem.textContent = ''
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setSentence(sentences[0].split(' '))
        setScore(0)
        setResult(false)
    }

    const structuredSentence = () => {

        if (words && words.length > 0) {

            const checkedWords = []

            return sentence.map((word, index) => {

                if(checkedWords.includes(word)) {

                    return <span key={index}>{word} </span>

                } else {

                    checkedWords.push(word)

                    if (words.includes(word)) {
                        return <span className={`blank w-100 word item-${index}`} key={index}></span>
                    } else {
                        return <span key={index}>{word} </span>
                    }
                }

            })

        }
    }

    const populateAnswer = (e, word) => {

        const wordIndex = mapItemsInArray(sentence, words)

        if(undefined !== wordIndex) {

            const inputValue = e.target.value - 1

            const tempUserAnswer = [...userAnswer]

            if(tempUserAnswer.includes(word)) {
                tempUserAnswer.splice(tempUserAnswer.indexOf(word), 1)
            }
            tempUserAnswer.splice(inputValue, 0, word)

            setUserAnswer(tempUserAnswer)

            sortNumbers(wordIndex)
            setAnswer(wordIndex.map(i => sentence[i]))

            const checkSpan = document.querySelector(`.word.item-${wordIndex[inputValue]}`)
            if(checkSpan) {
                checkSpan.textContent = word
            }
        }
    }

    useEffect(() => {
        setWords(getRandomItems(sentence))
    }, [sentence])

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
                                    {words.map((word, index) => 
                                        <li 
                                            className={`word-item text-black flex gap-10`} 
                                            key={word}
                                        >
                                            <input 
                                                type='number' 
                                                className='word-item-input' 
                                                key={`word-item-${index}`}
                                                min={1} 
                                                onKeyDown={(e) => {
                                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={(e) => {populateAnswer(e, word)}}
                                            />
                                            <p>{word}</p>
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
                                    <p>Item {index + 1} of {sentences.length}</p>
                                </div>

                                <button onClick={next}>Next</button>
                            </div> 
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default Quiz_2