import React from 'react'
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';
import axios from 'axios';
import { updateUserInLocalStorage } from '../actions/auth';
import {loginUser} from '../redux/authSlice'


const StripeCallBack = () => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user && user.token) getUserStatus();
      }, [user]);

    const getUserStatus = async () => {
        try {
            const res = await getAccountStatus(user.token);
            console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
            updateUserInLocalStorage(res.data,()=>{
                dispatch(loginUser(res.data))
            })
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  )
}

export default StripeCallBack
