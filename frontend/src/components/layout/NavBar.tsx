import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import { useLogoutMutation } from '../../slices/authSlice';
import { logout } from '../../slices/authenticated';

const Navbar = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
      <Link to="/"><i className="fa fa-link" aria-hidden="true"></i> ShortLink</Link>
      </h1>
      <ul>
        {userInfo ? (
          <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandler} className='btn btn-link btn-dark'>
             Logout 
            </button>
          </li>
            </>
        ) : (
          <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;