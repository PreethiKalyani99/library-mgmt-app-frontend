import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProp {
    component: ReactNode
    allowedRoles?: string[]
}

interface JwtPayload {
    role: string
}
const PrivateRoute = ({ component, allowedRoles }: PrivateRouteProp) => {
    const navigate = useNavigate()
    const token = Cookies.get("token")
    
    useEffect(() => {
        if(!token){
            navigate('/')
            return
        }
        const { role } = jwtDecode(token) as JwtPayload

        if(allowedRoles && !allowedRoles.includes(role)){
            navigate('/home')
            return
        }
    }, [token, allowedRoles, navigate])


    return <>{component}</>
}

export default PrivateRoute