import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/nav.css'
import NavBar from './components/NavBar'
import Home from './pages/home';
import Speeches from './pages/Speeches';
import SpeechHelper from './pages/SpeechHelper';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={< Home />}></Route>
                <Route path="/speeches" element={<Speeches />}></Route>
                <Route path="/speech" element={<SpeechHelper />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
