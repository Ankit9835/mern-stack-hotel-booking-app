import axios from "axios"
import { toast } from "react-toastify"

export const createConnectAccount = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/connect-with-stripe`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const getAccountStatus = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
