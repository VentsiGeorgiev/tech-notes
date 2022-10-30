import { Outlet } from 'react-router';
import { Header } from '../../shared';

const DashLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
export default DashLayout;