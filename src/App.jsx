import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

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

const App = () => {

  return <RouterProvider router={router} />;
};
 export default App;