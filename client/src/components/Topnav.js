import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const Topnav = () => {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  //console.log('topnav',user)
  return (
    <div>
     <ul className='display-flex'>
     {user && 
        <li>
           home
        </li>
     }
     {!user && 
      <>
         <li>
           register
        </li>
       <li>
         login
       </li>
      </>
     }
        
      
     
    </ul>
    </div>
  )
}

export default Topnav
