import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/signUp';

export const routes = [
    {path: "/", element:<Home/>},
    {path: "/Login",element:<Login/>},
    {path: "/SignUp",element: <SignUp/>}
]