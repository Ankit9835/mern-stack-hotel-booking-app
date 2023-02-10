import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HotelEditForm from "../components/HotelEditForm";

const EditHotel = () => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [image,setImage] = useState("")
  const routeParams = useParams();
  const { user } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const { title, content, location, price, from, to, bed } = values;

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
    setValues({ ...values, ...response.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${response.data._id}`);
  };

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const handleImageChange = (e) => {
    console.log('image file',e.target.files[0])
    setImage(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let hotelData = new FormData();
      hotelData.append("title", title);
      hotelData.append("content", content);
      hotelData.append("location", location);
      image && hotelData.append("image", image);
      hotelData.append("price", price);
      hotelData.append("from", from);
      hotelData.append("to", to);
      hotelData.append("bed", bed);
      const response = await axios.put(
        `${process.env.REACT_APP_API}/update/hotel/${routeParams.hotelId}`,
        hotelData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("update hotel", response);
      toast.success('Hotel update successfully')
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
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
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
