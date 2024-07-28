import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout.JSX';
import SearchPage from './pages/SearchPage.JSX';
import NutritionPage from './pages/NutritionPage.jsx';
import NotFoundPage from './pages/NotFoundPage';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/sort' element={<NutritionPage/>} /> 
      <Route path='*' element={<NotFoundPage/>} />
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <RecipeSearch />
    </div>
  )
}


const App = () => {

  return <RouterProvider router={router} />;
};
 export default App;