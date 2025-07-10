import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function requireAuth(ComposedComponent)
{
    return function AuthenticatedRoute(props)
    {
        const navigate = useNavigate();

        const isAuthenticated = useSelector((state)=>{
            {return state.isLoggedIn}
        })

        useEffect(()=>{
            if(!isAuthenticated)
            {
                navigate("/")
            }
        },[navigate, isAuthenticated])

        return isAuthenticated ? <ComposedComponent {...props}/> : null
    }
} 


export default requireAuth;