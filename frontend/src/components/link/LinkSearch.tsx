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

    const searchValue = e.target.value

    try { 
       const res = await fetchLinks({ q: searchValue }).unwrap()
       dispatch(setLinkData({ ...res }));
     } catch (err: any) {
       toast.error(err?.data?.message ?? err.error)
     }
  };

  return (
      <form className="form">
      <input type="text" id="search" placeholder="Search for links..." onChange={onChange} required/>
    </form>
)
}

export default LinkSearch;
