import { useEffect, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { token } from "./spotify/index";
import Root from "./components/root/Root";
import { Login } from "./components/login/Login";

function App() {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(token);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Root /> }>

      </Route>
    )
  )

  return (
    <>
      { accessToken ? 
      (<RouterProvider router={router}></RouterProvider>) : 
      (<Login />)}
    </>
  );
}

export default App;
