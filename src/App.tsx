import './App.css'
import { NavLink, Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Speeches from './pages/Speeches'
import './assets/nav.css'

function App() {
    return (
        <>
            <BrowserRouter>
                <nav>
                    <img id="logo" src="../public/logo.png" alt='logo'></img>
                    <ul>
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/speeches"}>Speeches</NavLink>
                        </li>
                    </ul>

                </nav>
                <Routes>
                    <Route path="/" element={< Home />}></Route>
                    <Route path="/speeches" element={<Speeches />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
