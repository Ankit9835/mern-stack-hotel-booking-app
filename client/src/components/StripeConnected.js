import React from 'react'
import { Link } from 'react-router-dom'


const StripeConnected = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StripeConnected
