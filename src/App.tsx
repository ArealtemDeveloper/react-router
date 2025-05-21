import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import { INITIAL_ROUTES } from './constants';
import { AuthProvider } from './context/AuthProvider';

import DefaultLayout from './layout/default/DefaultLayout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import VLoader from './components/VLoader/VLoader';

const MainPage = lazy(() => import('./pages/Main'));
const CategoryPage = lazy(() => import('./pages/Category'));
const DetailPage = lazy(() => import('./pages/Detail'));
const LoginPage = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));


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
                element={
                  <Suspense fallback={<VLoader/>}>
                    <LoginPage/>
                  </Suspense>
              }
            />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
