import axios from "axios"
import { toast } from "react-toastify"

export const createConnectAccount = async (token) => {
     const res = await axios.post(
        `${process.env.REACT_APP_API}/connect-with-stripe`,
         {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
}