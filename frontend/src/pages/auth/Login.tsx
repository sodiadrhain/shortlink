import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from "../../slices/authSlice"
import { setCredentials } from "../../slices/authenticated"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state: any) => state.auth)
    const params = new URLSearchParams(window.location.search);
    const routeLink = params.get('link') ? `/?link=${params.get('link')}` : '/'

    useEffect(() => {
      if (userInfo && !routeLink) {
        navigate("/")
      }
    }, [navigate, userInfo, routeLink])


      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');


    const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Login successful')

      navigate(routeLink)
    } catch (err: any) {
      toast.error(err?.data?.message ?? err.error)
    }
  }

    return (
 <>
        <h2>Login</h2>
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
              Login
          </button>
        </form>
 </>
    );
  };
    
    export default Login
    