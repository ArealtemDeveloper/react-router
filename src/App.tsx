import { Route, Routes } from 'react-router';
import './App.css';

import { INITIAL_ROUTES } from './constants';
import { AuthProvider } from './context/AuthProvider';

import MainPage from './pages/Main';
import CategoryPage from './pages/Category';
import DetailPage from './pages/Detail';
import DefaultLayout from './layout/default/DefaultLayout';
import NotFound from './pages/NotFound';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import LoginPage from './pages/Login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
            <Route element={<DefaultLayout/>}>
              <Route 
                path={INITIAL_ROUTES.main} 
                element={ <MainPage/> }
              />
              <Route 
                path={INITIAL_ROUTES.category} 
                element={ <PrivateRoute><CategoryPage/></PrivateRoute> }
              />
              <Route 
                path={INITIAL_ROUTES.detail} 
                element={<PrivateRoute><DetailPage/></PrivateRoute>}
              />
              <Route 
                path={INITIAL_ROUTES.notFound} 
                element={<NotFound/>}
              />
            </Route>

            <Route
                path={INITIAL_ROUTES.login}
                element={<LoginPage/>}
            />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
