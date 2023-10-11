import style from "./login.module.css"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Form from 'react-bootstrap/Form';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    console.log("here all data", data)


    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate("/alluser")
        }
    }, [])


    const handleLogin = async () => {

        if (!email || !password) {
            setError(true)
        }

        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password
            })
            const result = response.data
            console.log("result", result)
            if (result.auth) {
                localStorage.setItem("user", result.user.name)
                localStorage.setItem("auth", result.auth)
                navigate("/alluser")
            } else {
                toast.error("Your creadiential does not match")
            }

        } catch (error) {
            toast.error("sometghing went wrong")
        }

    }






    return (
        <>

            <div className={style.main_container}>

                {/* left container */}
                <ToastContainer />

                <div className={style.left_container}>
                    {/* <div></div> */}
                    <h1 className={style.welcome_back}>Welcome Back,</h1>
                    <p className={style.login_access}>Login to continue access pages</p>
                    <p className={style.lorem_text}>Lorem is great for that. With it installed in the code editor you are using, you can type “lorem” and then tab and it will expand into a paragraph of Lorem Ipsum placeholder text. But it can do more! You can control how much you get, place it within HTML structure as it expands, and get different bits of it in repeated elements.</p>
                </div>


                {/* right container */}

                <div className={style.right_container}>

                    <div className={style.logo}></div>

                    <h1 className={style.login_system}>Login System</h1>

                    <div>
                        <Form.Control type="email" placeholder="Enter your Email" value={email} onChange={((e) => setEmail(e.target.value))}  style={{width:"70%" , margin:"auto"}} />

                        {error && !email && <p className={style.warning_text}>Please enter Email Id</p>}
                    </div>  <br></br>

                    <div>
                        <Form.Control type="password" placeholder="Enter your Password" style={{width:"70%" , margin:"auto"}} value={password} onChange={((e) => setPassword(e.target.value))} />

                        {error && !password && <p className={style.warning_text}>Please enter Password</p>}

                    </div> <br></br>

                    <button className={style.loginbtn} onClick={handleLogin}>Login</button>

                    <Link className={style.forgetbtn} to="/resetPassword">Reset Password</Link>
                     {/* <Link className={style.forgetbtn} to="/register_newuser">Register New User</Link>  */}
                </div>
                
            </div>
        </>
    )


}

export default Login;