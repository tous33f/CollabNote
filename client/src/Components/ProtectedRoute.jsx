
import { Navigate, useLocation } from 'react-router'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners'
import { fetchUser } from '../features/userSlice';

function ProtectedRoute({children}) {

    let dispatch=useDispatch()
    let user=useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(fetchUser())
    },[])

    const location=useLocation()
    
    return (
        user?.loading?
        (<div className='flex min-h-screen justify-center items-center bg-gray-50' >
            <MoonLoader size={100} color='#378fe9' />
        </div>)
        :
        (user ? <>{children}</> : <Navigate to="/" state={{path: location.pathname}} replace />) 
    )
}

export default ProtectedRoute