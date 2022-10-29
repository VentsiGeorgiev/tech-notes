import { Routes, Route } from 'react-router-dom';
import { Home, Login, Dashboard, PersistLogin } from './component/pages';
import { DashLayout } from './component/shared';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PersistLogin />}>
                <Route path="dashboard" element={<DashLayout />}>

                    <Route index element={<Dashboard />} />

                </Route>{/* End Dashboard */}
            </Route>

        </Routes>
    );
}

export default App;