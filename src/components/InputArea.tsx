import { useState } from "react"
import { useNavigate } from "react-router-dom"
const InputArea = () => {

    const navigate = useNavigate();
    const [speech, setSpeech] = useState("")

    const submitSpeech = () => {
        navigate("/speech", { state: { speech: speech } });
    }

    const handleText = (e: any) => {
        setSpeech(e.target.value);
    }

    return (
        <section id="input-section">
            <div className='text-container'>
                <textarea name="text" id="text"
                    placeholder='The bite of 87...'
                    onChange={handleText}
                >
                </textarea>
                <div className='choice-container'>
                    <label htmlFor="text" >Paste your speech</label>
                    <span style={{ fontSize: "small", margin: "1em" }}>or</span>
                    <button onClick={submitSpeech} id="upload-button">Upload File</button>
                </div>
            </div>
        </section>
    )

}

export default InputArea;

