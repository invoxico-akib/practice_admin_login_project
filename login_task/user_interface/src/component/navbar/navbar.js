import Styled from "./navbar.module.css"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
   const navigate = useNavigate()

  const name = localStorage.getItem("user")
  console.log(name, "name is here")

  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
    navigate("/")

  }


    return (
        <>
            <div className={Styled.navbar}>
                <p>Home</p>
                <p>About</p>
                <p>Welcome </p>
                <p onClick={logOut} className={Styled.logout}>Logout</p>
            </div>
        </>
    )
}

export default Navbar