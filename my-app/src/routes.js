import Add_EMIs from './components/Add_EMIs';
import Add_Expense from './components/Add_Expense';
import Add_Income from './components/Add_Income';
import Add_Saving from './components/Add_Savings';
import Add_Wishlist from './components/Add_Wishlist';
import Home from './components/Home';
import Login from './components/Login';
import User_dashboard from './components/User_dashboard';
import SignUp from './components/signUp';
import Report from './components/Report';


export const routes = [
    {path: "/", element:<Home/>},
    {path: "/Login",element:<Login/>},
    {path: "/SignUp",element: <SignUp/>},
    {path: "/user_dashboard",element: <User_dashboard/>},
    {path: "/add_income",element: <Add_Income />},
    {path: "/add_emis",element: <Add_EMIs />},
    {path: "/add_wishlist",element: <Add_Wishlist />},
    {path: "/add_expense",element: <Add_Expense />},
    {path: "/add_saving",element: <Add_Saving />},
    {path: "/report",element: <Report />}
]