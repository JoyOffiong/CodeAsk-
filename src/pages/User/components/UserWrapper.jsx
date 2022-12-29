import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { dashboardTags } from "../../../Data/dashboardTags";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import { useAuth } from "../../../components/hooks/useAuth";
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { BsFillGeoAltFill } from "react-icons/bs";
import defaultUser from "../../../assets/profile/defaultUser.png";
import moment from "moment";
import Spinner from "../../../components/Spinner";
import ReactPaginate from "react-paginate";

export const UserWrapper = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userQuestion, setUserQuestion] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const itemsPerPage = 4;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const { auth, user } = useAuth();

  if (Number(user.id) === Number(id)) {
    navigate("/dashboard");
  }

  useEffect(() => {
    async function fetchProfile() {
      const res = await axiosPrivate.get(`users/${id}`);
      setCurrentUser(res.data);
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    async function fetchUserQuestions() {
      const res = await axiosPrivate.get(`questions/user/${id}`);
      setUserQuestion(res.data);
      setLoading(false);
    }

    fetchUserQuestions();
  }, [user]);

  useEffect(() => {
    async function fetchUserAnswers() {
      const res = await axiosPrivate.get(`answers/user/${user.id}`);
      setUserAnswer(res.data);
    }
    fetchUserAnswers();
  }, [user]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(userQuestion.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userQuestion.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, userQuestion]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userQuestion.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="user-details">
        <div className="user">
          <div className="profileImage">
            {currentUser.username ? (
              <img
                alt={`${currentUser.username}`}
                src={currentUser.profile_image}
              />
            ) : (
              <img src={defaultUser} alt="default Image for User" />
            )}
          </div>
          <div className="details">
            <h1 id="signed_name">{currentUser.username}</h1>
            <h3>{currentUser.stack ? currentUser.stack : "Developer"}</h3>
            <div className="icons">
              <div className="user-social-links">
                {currentUser.twitter_profile ? (
                  <a href={currentUser.twitter_profile} target="_blank">
                    {" "}
                    <IoLogoTwitter />
                  </a>
                ) : (
                  <a href="#">
                    {" "}
                    <IoLogoTwitter />
                  </a>
                )}

                {currentUser.github_profile ? (
                  <a href={currentUser.github_profile} target="_blank">
                    {" "}
                    <IoLogoGithub />
                  </a>
                ) : (
                  <a href="#">
                    {" "}
                    <IoLogoGithub />
                  </a>
                )}

                {currentUser.linkedin_profile ? (
                  <a href={currentUser.linkedin_profile} target="_blank">
                    {" "}
                    <IoLogoLinkedin />
                  </a>
                ) : (
                  <a href="#">
                    {" "}
                    <IoLogoLinkedin />
                  </a>
                )}
              </div>
              <div className="last-seen-location-container">
                <div className="last-seen">
                  <p>
                    Joined{" "}
                    {moment(currentUser.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                <div className="location">
                  <a href="#">
                    <BsFillGeoAltFill />
                  </a>
                  <p>
                    {" "}
                    {currentUser.user_location
                      ? currentUser.user_location
                      : "On Earth"}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-mainpage">
        <div className="stats-col">
          <h1>Stats</h1>
          <div className="stat-numbers">
            {/* <div className='answer'> */}
            <div>
              <h3>{userAnswer.length}</h3>
              <p>Answers</p>
            </div>
            <div className="question">
              <h3>{userQuestion.length}</h3>
              <p>Questions</p>
            </div>
          </div>
        </div>
        <div className="about-col">
          <h1>About</h1>
          <p>
            {currentUser.about
              ? currentUser.about
              : "Just another awesome developer"}
          </p>
          <div className="top-post">
            <div className="pre-list">
              <h1>Top posts</h1>
              <div className="pre-list-links">
                <NavLink to={""} className="pre-list-link">
                  Question
                </NavLink>
                {/* <NavLink to={"/dashboard"} className="pre-list-link">
                  All
                </NavLink> */}
                {/* <NavLink to={"/questions"} className="pre-list-link">
                  Questions
                </NavLink> */}
                {/* <NavLink to={"/ask-question"} className="pre-list-link">
                  Answers
                </NavLink> */}
              </div>
            </div>

            {isLoading ? (
              <Spinner></Spinner>
            ) : (
              <>
                <div className="question-lists">
                  {currentItems.map(({ id, title, createdAt }) => {
                    return (
                      <div key={id} className="question-list">
                        <Link to={`/answers/${id}`}>{title}</Link>
                        <Link to={""} href>
                          {moment(createdAt).format("ll")}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  className="userQuestionPagination"
                  pageClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkCLassName="page-num"
                  nextClassName="page-num"
                  activeLinkClassName="active"
                  disabledClassName="disable-pagination"
                  style={{ top: "10px" }}
                />
              </>
            )}
          </div>

          {/* <div className="top-post">
            <div className="pre-list">
              <h1>Top tags</h1>
            </div>
            <div className="question-lists">
              {dashboardTags.map(({ tagName, postNumber }) => {
                return (
                  <div className="question-list">
                    <a className="tags" href>
                      {tagName}
                    </a>
                    <a href>{postNumber}</a>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
