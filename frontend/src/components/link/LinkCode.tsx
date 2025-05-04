/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDecodeMutation } from '../../slices/linkSlice';

const LinkCode = () => {
  const { code } = useParams();
  const [decode] = useDecodeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      decodeUrl();
    }
  }, [code]);

  const decodeUrl = async () => {
    try {
      const res = await decode({ shortLinkCode: code }).unwrap();
      window.location.replace(res.data.fullLink);
    } catch (err: any) {
      navigate('/');
      console.error(err);
    }
  };

  return "";
};

export default LinkCode;
