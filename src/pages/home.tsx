import '../assets/home.css'
import InputArea from '../components/InputArea';

const Home = () => {
    return (
        <>
            <section id="welcome-section">
                <h1>Memoriz
                    <span style={{ color: "var(--border)" }}>
                        '
                    </span>
                    <span style={{ color: "var(--text)" }}>
                        em
                    </span>
                </h1>
                <h2>Quickly memorize any speech</h2>

            </section>
            <InputArea />
        </>
    )
}

export default Home;