import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/create_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        props.showAlert("Account created Successfully","success")
        // // Save the auth token and redirect
        // localStorage.setItem('token', json.token); 
        // console.log('Token stored in localStorage:', json.token);

        navigate('/login');

    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
}
  const onChange = (e)=>{

    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
                <div className="mb-3 my-4">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" value={credentials.name} required minLength={3} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} required  onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} required minLength={5} onChange={onChange} name="password" id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
