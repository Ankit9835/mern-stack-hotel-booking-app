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

  export const getAccountBalance = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const currencyFormatter = (data) => {
    return (data.amount).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  }

  export const payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const stripeSessionId = async (token,hotelId) => 
  await axios.post(`${process.env.REACT_APP_API}/session-id`,
  {hotelId},
  {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  )

