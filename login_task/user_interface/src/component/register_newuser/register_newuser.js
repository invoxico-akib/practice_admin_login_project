import styled from "./register_newuser.module.css"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"
import axios from "axios"
const RegisterNewUser = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    console.log("useState set here", { name, email, password })


    const handleRegister = async () => {

        if (!name || !email || !password) {
            setError(true)

        } else {

            try {
                const responce = await axios.post("http://localhost:5000/newuser", {
                    name,
                    email,
                    password
                })

                const result = responce.status



                if (result === 200) {
                    toast.success("Congratulation You are Register Successfully our Database")
                    setName("")
                    setEmail("");
                    setPassword("")

                } else {
                    toast.error("Something went wrong ! please try again later")
                }

            } catch (error) {
                console.log("here is your error", error)
                toast.error("Something went wrong ! please try again later")

            }

        }

    }


    return (

        <>

            <div className={styled.main_container}>

                {/* left container */}
                <ToastContainer />

                <div className={styled.left_container}>
                    {/* <div></div> */}
                    <h1 className={styled.welcome_back}>Welcome Back,</h1>
                    <p className={styled.login_access}>Register New User</p>
                    <p className={styled.lorem_text}>Lorem is great for that. With it installed in the code editor you are using, you can type “lorem” and then tab and it will expand into a paragraph of Lorem Ipsum placeholder text. But it can do more! You can control how much you get, place it within HTML structure as it expands, and get different bits of it in repeated elements.</p>
                </div>


                {/* right container */}

                <div className={styled.right_container}>

                    <div className={styled.logo}></div>

                    <h1 className={styled.login_system}>Register New User</h1>

                    <div>
                        <input placeholder="Enter your Name" type="text" value={name} onChange={((e) => setName(e.target.value))} />

                        {error && !name && <p className={styled.warning_text}>Please enter Full Name</p>}
                    </div>

                    <div>
                        <input placeholder="Enter your Email" type="email" value={email} onChange={((e) => setEmail(e.target.value))} />

                        {error && !email && <p className={styled.warning_text}>Please enter Email Id</p>}
                    </div>

                    <div>
                        <input placeholder="Enter your Password" type="password" value={password} onChange={((e) => setPassword(e.target.value))} />
                        {error && !password && <p className={styled.warning_text}>Please enter Password</p>}

                    </div>

                    <button className={styled.loginbtn} onClick={handleRegister}>Register New User</button>
                    <Link className={styled.loginbtn} to="/">Back To Login</Link>

                </div>



            </div>

        </>
    )




}

export default RegisterNewUser