import { useState } from "react"
import { useNavigate } from "react-router-dom"
const InputArea = () => {

    const navigate = useNavigate();
    const [speech, setSpeech] = useState("")
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();

            reader.onload = (event) => {
                setSpeech(event.target.result);
            };

            reader.readAsText(file);
        } else {
            alert("Please select a .txt file.");
        }
    }
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();

            reader.onload = (event) => {
                setSpeech(event.target.result);
            };

            reader.readAsText(file);
        } else {
            alert("Please select a .txt file.");
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault(); // Needed to allow dropping
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };


    const submitSpeech = () => {
        if (!speech || speech === "") return;
        navigate("/speech", { state: { speech: speech } });
    }

    const handleText = (e: any) => {
        setSpeech(e.target.value);
    }

    return (
        <section id="input-section"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className='text-container'>
                <textarea name="text" id="text"
                    placeholder='The bite of 87...'
                    onChange={handleText}
                    value={speech}
                >
                </textarea>
                <div className='choice-container'
                    style={{ opacity: speech === "" ? "1" : "0" }}
                >
                    <label id="copy-label" htmlFor="text" >Paste your speech</label>
                    <div style={{ textAlign: "center", display: "block", fontSize: "small", margin: "1em" }}>or</div>
                    <input type="file" id="upload-button" onChange={handleFileChange} />
                </div>
            </div>
            <button id="submit-speech" onClick={submitSpeech}>Start</button>
        </section >
    )

}

export default InputArea;

