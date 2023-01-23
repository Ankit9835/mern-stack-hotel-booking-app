import React from 'react'

const RegisterForm = ({handleSubmit,name,setName,email,setEmail,password,setPassword}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
         <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
         
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
         
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}

export default RegisterForm
