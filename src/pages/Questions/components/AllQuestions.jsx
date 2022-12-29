import { Link } from "react-router-dom";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useAuth } from "../../../components/hooks/useAuth";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import Nodata from "../../../components/NoData";
// import  cheerio from 'cheerio';

const AllQuestion = (props) => {
  const { datas, filterType, setData, searchType, setSearchType } = props;
  const { searchField } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchData, setSearchData] = useState(datas);
  const itemsPerPage = 4;

  // const [stackoverflowData, setStackoverflowData] = useState([]);

  // useEffect(() => {
  //   async function fetchStackoverflow() {
  //     const res = await axiosPrivate.get(`search/?q=${searchField}`);

  //     console.log(res.data);

  //     setData(res.data);
  //   }
  //   fetchStackoverflow();
  // }, [searchField]);

  useEffect(() => {
    if (searchField !== "") {
      setSearchData(
        datas.filter((data) => {
          return data.title.toLowerCase().includes(searchField.toLowerCase());
        })
      );
    } else {
      setSearchData(datas);
    }
  }, [datas, searchField]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(searchData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, datas, filterType, searchField]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems.stackOverflow === true ? (null
        // <div className="questions-wrapper">
        //   {currentItems.map(({ question, answer, stackOverflow }) => {
        //     return (
        //       <div className="questions" key={question}>
        //         <div className="question-box">
        //           <div className="question-content">
        //             <div className="question-statement">
        //               {/* <Link
        //                 key={id}
        //                 to={`/answers/${id}`}
        //                 className="question-content"
        //               > */}
        //               <p>{question}</p>
        //               {/* </Link> */}
        //             </div>

        //             <div className="question-box-tags">
        //               <p>
        //                 <span>{stackOverflow}</span>
        //               </p>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     );
        //   })}
        // </div>
      ) : (
        <div className="questions-wrapper">
          {currentItems.map(
            ({
              Comments,
              Tags,
              User,
              UserId,
              body,
              createdAt,
              id,
              title,
              Answers,
            }) => {
              return (
                <div className="questions" key={id}>
                  <div className="question-box">
                    <Link to={`/users/${UserId}`}>
                      <img src={User.profile_image} alt="avatar profile" />
                    </Link>

                    <div className="question-content">
                      <div className="question-statement">
                        <Link
                          key={id}
                          to={`/answers/${id}`}
                          className="question-content"
                        >
                          <p>{title}</p>
                        </Link>
                      </div>

                      <div className="question-box-tags">
                        {
                          <ul>
                            {Tags.map((tag, index) => {
                              return <li key={index}>{tag.name}</li>;
                            })}
                          </ul>
                        }
                        <p>
                          {`asked ${moment(createdAt).fromNow()} by `}

                          <span>{`@${User.username}`}</span>
                        </p>
                      </div>
                    </div>
                    <div className="views-answers">
                      <p>
                        <span>0</span> Views
                      </p>
                      <p>
                        <span>{Answers ? Answers.length : 0}</span> Answers
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
        pageClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkCLassName="page-num"
        nextClassName="page-num"
        activeLinkClassName="active"
        disabledClassName="disable-pagination"
      />
    </>
  );
};

export default AllQuestion;
