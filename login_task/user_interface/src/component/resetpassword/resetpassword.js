import { useState } from "react"
import Styled from "./resetpassword.module.css"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState([])
    const [error, setError] = useState(false)


    const resetPassword = async () => {

        if (!email || !password) {
            setError(true)
        } else {
            
            try {
                const responce = await axios.post("http://localhost:5000/update_credential/65200b10c8758019d7ad3b7d", {
                    email,
                    password
                })
                const result = responce.status;
                console.log("change password", result)
                setEmail("")
                setPassword("")

                if (result == 200) {
                    toast.success("Your Password Successfully changed")

                } else {
                    toast.error("Something went wrong")
                }

            } catch (error) {
                console.log("something went wrong", error)

            }
        }

    }

    console.log("all data here", data)


    return (

        <>

            <div className={Styled.main_container}>
                <ToastContainer />

                {/* left container */}

                <div className={Styled.left_container}>
                    {/* <div></div> */}
                    <h1 className={Styled.welcome_back}>Welcome Back,</h1>
                    <p className={Styled.login_access}>Reset Your Credentials</p>
                    <p className={Styled.lorem_text}>Lorem is great for that. With it installed in the code editor you are using, you can type “lorem” and then tab and it will expand into a paragraph of Lorem Ipsum placeholder text. But it can do more! You can control how much you get, place it within HTML structure as it expands, and get different bits of it in repeated elements.</p>
                </div>


                {/* right container */}

                <div className={Styled.right_container}>

                    <div className={Styled.logo}></div>

                    <h1 className={Styled.login_system}>Reset Password</h1>


                    <div>
                        <input placeholder="Enter your Email" type="email" value={email} onChange={((e) => setEmail(e.target.value))} />
                        {error && !email && <p className={Styled.warning_text}>Please enter Email Id</p>}
                    </div>

                    <div>
                        <input placeholder="Enter your new Password" type="password" value={password} onChange={((e) => setPassword(e.target.value))} />
                        {error && !password && <p className={Styled.warning_text}>Please enter  new Password</p>}
                    </div>

                    <button className={Styled.forgetbtn} to="/resetPassword" onClick={resetPassword}>Reset Password</button>
                    <Link className={Styled.forgetbtn} to="/">Back To Login</Link>





                </div>



            </div>
        </>
    )


}

export default ResetPassword