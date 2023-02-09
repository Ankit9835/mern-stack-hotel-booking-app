//import { diffDays } from "../actions/hotel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { diffDays } from "../actions/hotel";
import { currencyFormatter } from "../actions/stripe";


const SmallCard = ({title,location,price,content,bed,from,to,_id,image, owner = false, showMoreViewButton = true}) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {image && image.contentType ? 
                <img
                src={`${process.env.REACT_APP_API}/hotel/image/${_id}`}
                alt="default hotel image"
                className="card-image img img-fluid"
              />
              :
              <img
              src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
              alt="default hotel image"
              className="card-image img img-fluid"
            />
          }
            
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: price,
                    currency: "inr",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{location}</p>
              <p className="card-text">{`${content.substring(1, 200)}...`}</p>
              <p className="card-text">
              <span className="float-right text-primary">
                   {diffDays(from, to)}
                  {diffDays(from,to) <= 1 ? ' day' : ' days'}
             </span>
              </p>
              <p className="card-text">{bed} bed</p>
              <p className="card-text">
                Available from {new Date(from).toLocaleDateString()}
              </p>
              
              <div className="d-flex justify-content-between h4">
                {showMoreViewButton && 
                  <>
                       <button
                      onClick={() => navigate(`/hotel/${_id}`)}
                      className="btn btn-primary"
                    >
                      Show more
                    </button>
                  </>
                }
               
                {owner && 
                <>
                   <Link to={`/hotel/edit/${_id}`}>
                   <EditOutlined className="text-warning" />
                   </Link>
                    <DeleteOutlined
                      className="text-danger"
                     />
                </>
                 
                }
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
