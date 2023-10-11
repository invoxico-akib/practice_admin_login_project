import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import axios from "axios"
import { FaBeer } from 'react-icons/fa'
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import CreateSubAdmin from "./create_subadmin_modal"
import DeleteSubAdmin from "./deletesubadmin"

export const SubAdmin = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("all data receive here", data)
    useEffect(() => {
        getSubadmin()
        setLoading(true)
    }, [])


    const getSubadmin = async () => {
        const result = await axios.get("http://localhost:5000/subadmins")
        setData(result.data)
        setLoading(false)
    }


    return (

        <>
            <Navbar />

            <CreateSubAdmin refetch={getSubadmin} />

            {loading ? <div>......loading</div>
                :

                <table border="1">
                    <tr>
                        <th>S.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    {data.map((elem, index) => {
                        return (

                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{elem.first_name}</td>
                                <td>{elem.last_name}</td>
                                <td>{elem.email_id}</td>
                                <td>{elem.password}</td>
                                <td>{elem.createdAt}</td>
                                <td>{elem.status}</td>
                                <td style={{ cursor: "pointer" }}> <AiOutlineEdit />  &nbsp; <DeleteSubAdmin id={elem._id} refetch={getSubadmin} /></td>
                            </tr>
                        )

                    })}
                </table>
            }
        </>
    )
}





