import { Outlet } from 'react-router';
import { Header } from '../../shared';

const DashLayout = () => {
    return (
        <>
            <Header />
            <section className='container'>
                <Outlet />
            </section>
        </>
    );
};
export default DashLayout;