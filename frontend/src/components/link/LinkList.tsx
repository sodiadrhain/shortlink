/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useListMutation } from "../../slices/linkSlice";
import { setLinkData } from "../../slices/authenticated";
import { useEffect, useState } from "react";
import Loader from "../layout/loader/Loader";
import LinkSearch from "./LinkSearch";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const LinkList = () => {
  const { linkData } = useSelector((state: any) => state.auth);
  const [fetchLinks, { isLoading: isLoadingLinks }] = useListMutation();
  const dispatch = useDispatch();
  const domain = window.location.origin;

  const [currentPage, setCurrentPage] = useState(1);

  const loadLinks = async (page = 1) => {
    try {
      const links = await fetchLinks({ page }).unwrap();
      dispatch(setLinkData({ ...links }));
      localStorage.setItem("isSearch", "");
    } catch (error) {
      console.error("Failed to fetch links:", error);
    }
  };

  useEffect(() => {
    loadLinks(currentPage);
  }, [fetchLinks, currentPage]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link.");
    }
  };

  const totalPages = linkData.pagination.total;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {isLoadingLinks ? (
        <Loader />
      ) : linkData.data.length === 0 && localStorage.getItem("isSearch") ? (
        <>
          <LinkSearch />
          <div style={{ textAlign: "center" }}>
            <br />
            <br /> No results found
          </div>
        </>
      ) : linkData.data.length === 0 && !localStorage.getItem("isSearch") ? (
        ""
      ) : (
        <>
          <LinkSearch />
          <table>
            <thead>
              <tr>
                <th>Short Link</th>
                <th>Original Link</th>
                <th>Stats</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {linkData.data.map((link: any) => {
                const shortUrl = `${domain}/${link.shortLinkCode}`;
                return (
                  <tr key={link.id}>
                    <td data-label="shortLinkCode">
                    <span>{shortUrl}</span>
                      <button
                        onClick={() => handleCopy(shortUrl)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                        aria-label="Copy short link"
                      >
                        <FiCopy />
                      </button>
                    </td>
                    <td data-label="fullLink">
                     {link.fullLink}
                    </td>
                    <td data-label="stats">{link.stats}</td>
                    <td data-label="createdAt">
                      {new Date(link.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{cursor: 'pointer'}}>
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{cursor: 'pointer'}}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LinkList;
