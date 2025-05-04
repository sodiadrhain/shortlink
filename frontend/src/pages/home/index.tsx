import LinkForm from '../../components/link/LinkForm';
import LinkList from '../../components/link/LinkList';
import { useSelector } from 'react-redux';
const Home = () => {
      const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <>
        <h2>Shorten a long link</h2>
        <LinkForm />
        <br/>
        { userInfo ? (<LinkList />) : (null)}     
    </>
  );
};

export default Home;