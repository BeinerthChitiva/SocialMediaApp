import {Outlet, Navigate} from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from "react";

const ProtectedRoutes = () => {
    const {user} = useContext(AuthContext)

    return(
        user ? <Navigate to ="/" />: <Outlet/>
    )
}

export default ProtectedRoutes