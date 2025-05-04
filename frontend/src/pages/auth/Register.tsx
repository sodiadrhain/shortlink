import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from "../../slices/authSlice"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
      if (userInfo) {
        navigate("/")
      }
    }, [navigate, userInfo])


      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');


    const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await register({ email, password, name }).unwrap()
      toast.success('Registration successful')
      navigate("/login")
    } catch (err: any) {
      toast.error(err?.data?.message ?? err.error)
    }
  }

    return (
 <>
        <h2>Register</h2>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-dark btn-block">
              Register
          </button>
        </form>
 </>
    );
  };
    
    export default Register
    