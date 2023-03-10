import React, { useState, useEffect } from "react";
import AllQuestion from "./AllQuestions";
import Spinner from "../../../components/Spinner";
import NoData from "../../../components/NoData";
import baseURL from "../../../components/baseURL.js";
// import { useAuth } from "../../../components/hooks/useAuth";

const filters = [
  { id: 0, filter: "Newest" },
  { id: 1, filter: "Unanswered" },
  { id: 2, filter: "Answered" },
];

const QuestionBody = () => {
  const [isLoading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [searchType, setSearchType] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      setData([]);
    
      async function fetchQuestions() {
        const res = await baseURL.get(`questions/${filterType}`);

        setData(res.data);
        setLoading(false);
      }

      fetchQuestions();
    } catch (err) {
      console.log(err);
    }
  }, [filterType, setData]);

  const [isActive, setIsActive] = useState(0);

  const searchNow = () => {
    setSearchType(!searchType)
  }

  const filterFunction = (id) => {
    if (id === 0) {
      setFilterType("");
    } else if (id === 1) {
      setFilterType("unanswered");
    } else if (id === 2) {
      setFilterType("answered");
    }
    setIsActive(id);
  };

  return (
    <div>
      <div className="question-page" id="questionPage">
        <div className="question-top-navbar">
          <ul>
            {filters.map(({ id, filter }) => {
              return (
                <li key={id}>
                  <button
                    className={isActive === id ? "active" : ""}
                    onClick={() => filterFunction(id)}
                  >
                    {filter}
                  </button>
                </li>
              );
            })}
            {/* <li onClick={()=>searchNow()}>Search Now</li> */}
          </ul>
        </div>

        {isLoading ? (
          <Spinner></Spinner>
        ) : data.length === 0 ? (
          <NoData />
        ) : (
          <AllQuestion filterType={filterType} datas={data} setData={setData} searchType={searchType} setSearchType={setSearchType}/>
        )}
      </div>
    </div>
  );
};

export default QuestionBody;
