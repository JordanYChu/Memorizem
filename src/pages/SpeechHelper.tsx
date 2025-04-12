import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import "../assets/speech.css"

const SpeechHelper = () => {
    const location = useLocation() || {};
    // const { speech } = location.state;
    const speech = "Today, I____ want to talk to you about something so ordinary, so commonplace, that we often forget just how remarkable it is. It’s not flashy. It’s not exotic. You can find it at any grocery store, in school lunches, on teachers' desks, and in the pages of fairy tales. Yes, I’m talking about the humble apple.  At first glance, an apple might seem like just a snack — a round, red or green fruit that crunches when you bite into it. But behind that familiar skin lies a story of history, science, symbolism, and culture that’s as rich and flavorful as the fruit itself."
    return (
        <>
            <div>Word Count: {speech.split(" ").length}</div>
            <div>Number of Characters: {speech.length}</div>
            <div>Estimated Time: {speech.length * 2}</div>
            <div></div>
            <SpeechArea text={speech} />
        </>
    )
}

const SpeechArea = ({ text }: { text: string }) => {
    const [currentText, setCurrentText] = useState(text);
    const [keyWords, setKeyWords] = useState([""]);


    const words = useMemo(() => currentText.split(" "), [currentText]);
    // boolean array of words to be shown and not shown true: shown
    const shownWords = words.map((word) => !keyWords.includes(word.toLowerCase()));

    const changeText = () => {
        setKeyWords([...keyWords, "the".toLowerCase()]);
    }

    const Word = ({ i, children }: { i: number, children: any }) => {
        if (shownWords[i]) {
            return (<span key={i} className="word-shown"
                onClick={(e) => {
                    console.log("cookl");
                }}
            >{children} </span>)
        }
        return (<span key={i} onClick={(e) => {
            console.log("You can't touch me hah");
        }} className="word-shown">______</span>)
    }

    return (
        <>
            <button onClick={changeText}>Change the Text</button>
            <p>
                {words.map((word, i) => (
                    <Word key={i} i={i}>{word}</Word>
                ))}
            </p>
        </>
    )

}

export default SpeechHelper;