import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { diffDays } from "../actions/hotel";
import HotelEditForm from "../components/HotelEditForm";
import moment from "moment";
import { stripeSessionId } from "../actions/stripe";
import {loadStripe} from '@stripe/stripe-js'



const ViewHotel = () => {
  const [hotel, setHotel] = useState({});
  const [image,setImage] = useState("")
  const navigate = useNavigate()
  const routeParams = useParams();
  const { user } = useSelector((state) => state.auth);
  console.log('user selector',user)
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  
  const loadSellerHotel = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/hotel/edit/${routeParams.hotelId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("edit hotel", response);
    setHotel(response.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${response.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault()
    if(!user.token){
      navigate('/login')
    }
   console.log('user token and params id', user.token, routeParams.hotelId)
   const response =  await stripeSessionId(user.token,routeParams.hotelId)
   console.log('stripe payment response',response)
   const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
   const success = await stripe.redirectToCheckout({
    sessionId:response.data.sessionId
   })
   if(success){
    console.log('success')
   }
  }

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const handleImageChange = (e) => {
    console.log('image file',e.target.files[0])
    setImage(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  

 
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
            >
              {user && user.token ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
