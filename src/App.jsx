import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import React from 'react'
import RecipeSearch from './components/RecipeSearch'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='/search' element={<JobsPage/>} />
      <Route path='/sort' element={<JobPage/>} /> 
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