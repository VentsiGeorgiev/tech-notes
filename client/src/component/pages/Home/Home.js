import { Header } from '../../shared';

function Home() {
    return (
        <>
            <Header />
            <main className='container'>
                <h1 className='techNotes'>Tech Notes</h1>
                <p>Ticket control system</p>
                <p>Version: 1.0.0</p>
            </main>
        </>
    );
}

export default Home;