import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout'; // Import the MainLayout component

import RecipeSearch from './pages/RecipeSearch';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='/search' element={<RecipeSearch/>} />/
      
    </Route>
  )
);



const App = () => {

  return <RouterProvider router={router} />;
};
 export default App;