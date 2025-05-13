import { Route, Routes } from 'react-router';
import './App.css';

import { INITIAL_ROUTES } from './constants';

import MainPage from './pages/Main';
import CategoryPage from './pages/Category';
import DetailPage from './pages/Detail';
import DefaultLayout from './layout/default/DefaultLayout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route element={<DefaultLayout/>}>
              <Route path={INITIAL_ROUTES.main} element={ <MainPage/> }/>
              <Route path={INITIAL_ROUTES.category} element={ <CategoryPage/> }/>
              <Route path={INITIAL_ROUTES.detail} element={<DetailPage />}/>
              <Route path={INITIAL_ROUTES.notFound} element= {<NotFound/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
