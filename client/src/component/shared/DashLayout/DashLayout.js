import { Outlet } from 'react-router';

const DashLayout = () => {
    return (
        <>
            <p>Dashboard header</p>
            <Outlet />
            <p>Dashboard footer</p>
        </>
    );
};
export default DashLayout;