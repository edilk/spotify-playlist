import { useEffect, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { logout, token } from "./spotify/index";
import Root from "./components/root/Root";
import { Login } from "./components/login/Login";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";

function App() {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(token);

    const interval = setInterval(() => {
      setAccessToken(token);
    }, 59 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleLogout() {
    logout();
    setAccessToken('');
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Root /> }>
        <Route index element={ <Home onClick={handleLogout} /> } />
        <Route path="/search" element={ <Search />} />
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
