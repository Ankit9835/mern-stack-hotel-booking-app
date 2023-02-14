import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { stripeSuccessRequest } from '../actions/stripe';
import axios  from 'axios';

const StripeSuccess = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const routeParams = useParams();
    const id = routeParams.hotelId

    const getData = async () => {
      try {
        console.log('id',id)
        const response = await axios.post(`${process.env.REACT_APP_API}/stripe-success`,{hotelId:id},{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        })
        console.log('stripe issue',response)
        if(response){
          navigate('/dashboard')
        } else {
          navigate('/stripe/cancel')
        }
      } catch (error) {
        console.log(error)
      }
       
    }

    useEffect(() => {
      getData()
      console.log('hotel id', routeParams.hotelId)
    },[routeParams.hotelId])

    return (
        <div className="container">
          <div className="col">
            <h2 className="text-center p-5">Payment success - {routeParams.hotelId}</h2>
          </div>
        </div>
      );
}

export default StripeSuccess
