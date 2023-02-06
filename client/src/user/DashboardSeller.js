import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import StripeConnected from "../components/StripeConnected";
import StripeUnConnected from "../components/StripeUnConnected";
 


const DashboardSeller = () => {
  const { user } = useSelector((state) => state.auth);
  const {loading,setLoading} = useState(false)

  const handleClick = async () => {
    try{
      let response = await createConnectAccount(user.token)
      console.log('response',response)
      window.location.href = response.data
    } catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
      <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {user &&
      user.user &&
      user.user.stripe_seller &&
      user.user.stripe_seller.charges_enabled ? (
        <StripeConnected />
      ) : (
        <StripeUnConnected  handleClick={handleClick}/>
      )}
    </>
  );
};

export default DashboardSeller;
