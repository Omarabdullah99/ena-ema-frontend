import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectedUserDetails, selectLoggedInUser } from "../redux/features/UserSlice";


export function ProtectedAdmin({children}){
    const user=useSelector(selectLoggedInUser)
    // console.log('user',user)
    const userInfo= useSelector(selectedUserDetails)
    // console.log('userInfo',userInfo)
    if(!user){
        return <Navigate to={'/login'} replace="true"></Navigate>
    }

    if(userInfo && userInfo?.role !=='admin'){
        return <Navigate to='/' replace="true"></Navigate>
    }
    return children


}