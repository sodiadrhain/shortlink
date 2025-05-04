/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { isValidUrl } from '../../utils/string.util';
import { useEncodeMutation, useListMutation } from '../../slices/linkSlice';
import { setLinkData } from "../../slices/authenticated";

const LinkForm = () => {
  const [link, setLink] = useState('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate()
  const [encode, { isLoading }] = useEncodeMutation()
  const params = new URLSearchParams(window.location.search);
  const paramsLink: string = params.get('link') as string
  const [fetchLinks] = useListMutation();
  const dispatch = useDispatch();
  const [urlLink, setUrlLink] = useState(false);

  const encodeUrl = async () => {
    // if (paramsLink === '') {
    //   setLink(paramsLink)
    // }

    if (!link) {
      return;
    }

    if (!isValidUrl(link)) {
      toast.error('Please enter a valid url')
      return;
    }

    if (!userInfo) {
      navigate(`/login?link=${link}`)
      return;
    }

    try { 
      const res = await encode({ link }).unwrap()
      const links = await fetchLinks({}).unwrap();
      dispatch(setLinkData({ ...links }));
      if (paramsLink) {
        setUrlLink(true)
      }
      toast.success(res?.message)
      setLink('')
    } catch (err: any) {
      toast.error(err?.data?.message ?? err.error)
    }
  }
  
  useEffect(() => {
    if (paramsLink && !urlLink) {
      setLink(paramsLink)
      encodeUrl()
    }
  }, [link])

  const onSubmit = (e: any) => {
    e.preventDefault();
    encodeUrl();
  };

  return (
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="link"
          id="link"
          placeholder="https://example.com/my-long-url"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className="btn btn-dark btn-block">
            Shorten link
        </button>
      </form>
  );
};

export default LinkForm;