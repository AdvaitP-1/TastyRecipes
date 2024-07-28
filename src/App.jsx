import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout.JSX';
import RecipeSearch from './components/RecipeSearch';

import NotFoundPage from './pages/NotFoundPage';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='/search' element={<RecipeSearch/>} />/
      <Route path='*' element={<NotFoundPage/>} />
    </Route>
  )
);



const App = () => {

  return <RouterProvider router={router} />;
};
 export default App;