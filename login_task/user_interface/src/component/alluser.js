import { useEffect, useState, useSyncExternalStore } from "react"
import Styled from "./alluser.module.css"
import axios from "axios"
import { Audio } from 'react-loader-spinner'
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"




const AllUser = () => {

  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState("ascending")
  const [data, setData] = useState([])
  const [ageFilter, setageFilter] = useState(16)
  const navigate = useNavigate("")

  const name = localStorage.getItem("user")
  console.log(name, "name is here")

  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
    navigate("/")

  }

  // console.log("agefilter here", ageFilter)


  useEffect(() => {
    getUsers()
    setLoading(true)

  }, [])


  const getUsers = async () => {
    let list = await axios.get("https://hub.dummyapis.com/employee?noofRecords=40&idStarts=1001")
    setData(list.data)
    setLoading(false)

  }


  const handleSorting = () => {

    const sortData = [...data]
    if (sorting === "ascending") {
      sortData.sort((a, b) => a.firstName.localeCompare(b.firstName))
      setSorting("descending")

    } else {
      sortData.sort((a, b) => b.firstName.localeCompare(a.firstName))
      setSorting("ascending")
    }
    setData(sortData)

  }

  const handleFilter = (e) => {
    setageFilter(e.target.value)
  }

  const filteredData = data.filter((elem) => elem.age > parseInt(ageFilter));




  return (

    <>

      <div className={Styled.navbar}>
        <p>Home</p>
        <p>About</p>
        <p>Welcome To  <span style={{color:"#FF8080" , fontWeight:"600"}}>{name}</span></p>
        <p onClick={logOut} className={Styled.logOut}>Logout</p>
      </div>

      <div>

        <div className={Styled.btncontroll}>
          <button className={Styled.btn_sorting} onClick={handleSorting}>
            {sorting === "ascending" ? "Ascending Order" : "Descending Order"}
          </button>

          <select value={ageFilter} onChange={handleFilter}>
            <option value="36">Greater than 36</option>
            <option value="40">Greater than 40</option>
            <option value="50">Greater than 50</option>
            <option value="60">Greater than 60</option>
          </select>

        </div>

        <table border={1}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Salary</th>

          </tr>

          <div className={Styled.loading_indicater}>
            {loading &&
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            }
          </div>

          {filteredData.map((elem, index) => {
            return (
              <tr key={index}>
                <td>{elem.id}</td>
                <td>{elem.firstName}</td>
                <td>{elem.email}</td>
                <td>{elem.age}</td>
                <td>{`${elem.salary}.00 per annum`}</td>

              </tr>
            )
          })}
        </table>




      </div>
    </>
  )

}

export default AllUser