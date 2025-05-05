import { useListMutation } from "../../slices/linkSlice";
import { setLinkData } from "../../slices/authenticated";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const LinkSearch = () => {
  const [fetchLinks] = useListMutation();
  const dispatch = useDispatch();

  const onChange = async (e: any) => {
    e.preventDefault();

    if (!e.target.value || e.target.value === '') {
        return;
      }

    try {
        let q
        if ((e.target.value ?? '').length > 3) {
            q = e.target.value
        } else {
            q = ''
        }
        const res = await fetchLinks({ q }).unwrap()
        localStorage.setItem('isSearch', 'true')
        dispatch(setLinkData({ ...res }));
     } catch (err: any) {
       toast.error(err?.data?.message ?? err.error)
     }
  };

  return (
      <form className="form">
      <input type="text" id="search" placeholder="Search with full url..." onChange={onChange} required/>
    </form>
)
}

export default LinkSearch;
