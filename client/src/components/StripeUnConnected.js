import React from 'react'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
  } from '@ant-design/icons';


const StripeUnConnected = ({handleClick}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
               Setup Payouts
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripeUnConnected
