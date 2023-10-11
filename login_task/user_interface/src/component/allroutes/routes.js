import { Route, Routes } from "react-router-dom"
import Login from "../login/login"
import AllUser from "../alluser"
import ResetPassword from "../resetpassword/resetpassword"
import PrivateRoute from "./privateroute"
import RegisterNewUser from "../register_newuser/register_newuser"
import { SubAdmin } from "../subadmin/subadmin"

const AllRoutes = () => {


    return (

        <>
            <Routes>

                <Route element={<PrivateRoute />}>
                    {/* <Route path="/alluser" element={<AllUser />} /> */}
                    <Route path= "/alluser" element={<SubAdmin/>}/>
                </Route>
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/" element={<Login />} />
                <Route path="/register_newuser" element={<RegisterNewUser/>}/>
            </Routes>

        </>
    )


}

export default AllRoutes