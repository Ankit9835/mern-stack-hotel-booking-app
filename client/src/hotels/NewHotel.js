import { useState } from "react";
import { toast } from "react-toastify";
import HotelForm from "../components/HotelForm";
import { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";


const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  // countries: ["au"],
};




const NewHotel = () => {
  const {user} = useSelector((state) => state.auth)
  const inputRef = useRef();
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  // const handlePlaceChanged = () => { 
  
  //   const [ place ] = inputRef.current.getPlaces();
  //   if(place) { 
  //       console.log(place.formatted_address)
  //       console.log(place.geometry.location.lat())
  //       console.log(place.geometry.location.lng())
  //   } 
  // }
  const [preview,setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")

  const { title, content, location, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
    let hotelData = new FormData()
    hotelData.append('title', title)
    hotelData.append('content', content)
    hotelData.append('location', location)
    image && hotelData.append('image', image)
    hotelData.append('price', price)
    hotelData.append('from', from)
    hotelData.append('to', to)
    hotelData.append('bed', bed)
    const res = await createHotel(user.token,hotelData)
    console.log('create hotel response',res)
    console.log('hotel data', [...hotelData])
    toast.success('Hotel created successfully')
    } catch(error){
      console.log(error)
      toast.error(error.response.data.err)
    }
    //
  };

  const handleImageChange = (e) => {
    setValues({...values, [e.target.name]: e.target.files[0]})
    setPreview(URL.createObjectURL(e.target.files[0]))
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              title={title}
              content={content}
              location={location}
              image={image}
              price={price}
              from={from}
              to={to}
              bed={bed}
              preview={preview}
              setValues={setValues}
              values={values}
            />
          
          </div>
          <div className="col-md-2">
             <pre>{JSON.stringify(values, null, 4)}</pre>
             <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
