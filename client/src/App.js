import { Routes, Route } from 'react-router-dom';
import { Home, Login, Dashboard, PersistLogin, UsersList, NotesList } from './component/pages';
import { DashLayout } from './component/shared';
import RequireAuth from './utils/RequireAuth';
import { ROLES } from './utils/roles';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                    <Route path="dashboard" element={<DashLayout />}>

                        <Route index element={<Dashboard />} />

                        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                            <Route path="users">
                                <Route index element={<UsersList />} />
                            </Route>
                        </Route>

                        <Route path="notes">
                            <Route index element={<NotesList />} />
                        </Route>

                    </Route>{/* End Dashboard */}
                </Route>

            </Route>

        </Routes>
    );
}

export default App;