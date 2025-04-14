import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../assets/speech.css"
import React from "react";
import { Navigator } from "react-router-dom";

const SpeechHelper = () => {
    const location = useLocation();
    const [speech, setSpeech] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate("/")
            return;
        }
        const tempSpeech = location.state.speech;
        if (tempSpeech === "" || !tempSpeech) {
            navigate("/");
            return;
        }
        setSpeech(tempSpeech);
    }, [])

    return (
        <>
            {/* Speech Data */}
            <div id="info-section">
                <div className="info-container">
                    <div className="speech-info-container">
                        <div className="speech-label">Words</div>
                        <div className="speech-label">Characters</div>
                        <div className="speech-label">Estimated Time</div>
                        <div className="speech-data">{speech.split(" ").length}</div>
                        <div className="speech-data">{speech.length}</div>
                        <div className="speech-data">{Math.floor(speech.split(" ").length / 143)} minutes</div>
                    </div>
                </div>

            </div>
            <SpeechArea text={speech} />
        </>
    )
}

const Word = React.memo(({ word, shown }: { word: string, shown: boolean }) => {
    return (
        <>
            <span
                className={shown ? "word-shown" : "word-hidden"}
            >{word}</span>
            <span> </span>
        </>
    )
});

const enum memoryStages {
    STAGE_0 = 0,
    STAGE_1 = 1,
    STAGE_2 = 2,
    STAGE_3 = 3,
    STAGE_4 = 4,
    STAGE_5 = 5,
    STAGE_6 = 6
}

const stageLabels: Record<number, string> = {
    [memoryStages.STAGE_0]: "No Memory",
    [memoryStages.STAGE_1]: "Little Memory",
    [memoryStages.STAGE_2]: "Still Little",
    [memoryStages.STAGE_3]: "Some Memory",
    [memoryStages.STAGE_4]: "Almost Memorized",
    [memoryStages.STAGE_5]: "Confident",
    [memoryStages.STAGE_6]: "Memorized",
}

const cleanWord = (word: string) => {
    return word.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`”“~()]/g, "").replace(/\s{2,}/g, " ");
}

const removeDuplicateWords = (words: string[]) => {
    const usedWords: string[] = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i] === '\n') continue;
        if (!usedWords.includes(words[i])) {
            usedWords.push(words[i]);
        }
    }
    return usedWords;
}

const SpeechArea = ({ text }: { text: string }) => {
    const [keyWords, setKeyWords] = useState<string[]>([]);
    const [stage, setStage] = useState(memoryStages.STAGE_0);

    const splitParagraphs = useMemo(() => text.split("\n").filter(Boolean), [text]);
    const paragraphs = useMemo(() => {
        return splitParagraphs.map((splitParagraph) => splitParagraph.split(" "))
    }, [splitParagraphs])

    const [shownPragraphs, setShownPragraphs] = useState<boolean[]>([]);

    useEffect(() => {
        setShownPragraphs(Array(splitParagraphs.length).fill(true))
    }, [splitParagraphs])

    const shownWords: boolean[][] = useMemo(() => {
        return paragraphs.map((paragraph, i) => {
            if (shownPragraphs[i] == false) return Array(paragraph.length).fill(true);
            else return paragraph.map((word) => (!keyWords.includes(cleanWord(word))));
        })
    }, [keyWords, shownPragraphs])

    useEffect(() => {
        let wordsNested = paragraphs.filter((_, i) => shownPragraphs[i])
        let words = wordsNested.flat()
        let newKeyWords = removeDuplicateWords(words);
        const alg = (n: number) => {
            return n / 6;
        }
        newKeyWords = newKeyWords.filter(() => Math.random() <= alg(stage))
        newKeyWords = newKeyWords.map((word) => cleanWord(word))
        setKeyWords(newKeyWords);
    }, [stage])

    return (
        <>
            {/* inputs */}
            <label id="memory-stage" htmlFor="random-word-range">{stageLabels[stage]}</label>
            <input id="random-word-range" name="random-word-range" type="range"
                min={0} max={6} step={1} value={stage}
                onChange={(e) => setStage(Number(e.target.value))}
            />
            <h2>Hidden Words</h2>
            <div className="info-container">
                <div className="removed-words">
                    {stage === memoryStages.STAGE_0 ? (<div style={{ fontSize: "1.5em", color: "var(--border)" }}>Change Stage to add key words</div>) :
                        keyWords.map((word, i) => (
                            <div className="removed-word" key={i}>{word}</div>
                        ))
                    }
                </div>
            </div>
            <div id="speech-container">
                {paragraphs.map((paragraph, i) =>
                (
                    <div key={i} className="paragraph-container"
                        onClick={() => {
                            if (shownPragraphs[i] === false) {
                                const newShownList = Array(paragraphs.length).fill(false);
                                newShownList[i] = true;
                                setShownPragraphs(newShownList);
                            } else {
                                const newShownList = shownPragraphs.map((shown) => !shown);
                                newShownList[i] = true;
                                setShownPragraphs(newShownList);
                            }
                            setStage(memoryStages.STAGE_0);
                        }}
                    >
                        <p className={`paragraph ${shownPragraphs[i] ? "focused" : "unfocused"}`}>
                            {paragraph.map((word, j) => (
                                <Word key={j} word={word} shown={shownWords[i][j]}></Word>
                            ))}
                        </p>
                    </div>
                )
                )}
                {/* <SpeechText words={words} shownWords={shownWords} navigate={navigate} /> */}
            </div>
        </>
    )

}

export default SpeechHelper;