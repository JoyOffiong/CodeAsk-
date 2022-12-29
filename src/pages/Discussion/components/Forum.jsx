import React, { useState, useEffect } from "react";
import DiscussionModal from "./DiscussionModal";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import { useAuth } from "../../../components/hooks/useAuth";

const Forum = ({ setTopicId }) => {
  const axiosPrivate = useAxiosPrivate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { auth, user } = useAuth();

  const [currentUser, setCurrentUser] = useState([]);
  const [showModal, useShowModal] = useState(false);
  const [didPost, setDidPost] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchDiscussions() {
      const res = await axiosPrivate.get(`discussions`);
      setTopics(res.data);
      console.log(res.data);
    }

    fetchDiscussions();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didPost]);

  useEffect(() => {
    async function fetchProfile() {
      const res = await axiosPrivate.get(`users/${user.id}`);
      setCurrentUser(res.data);
      console.log(res.data);
    }

    fetchProfile();
  }, []);

  return (
    <div className="forum-wrapper">
      {currentUser.role === "admin" ? (
        <button
          className="addtopic-btn"
          onClick={() => {
            useShowModal(!showModal);
          }}
        >
          Add Topic
        </button>
       ) : null}
      {showModal ? (
        <DiscussionModal
          didPost={didPost}
          setDidPost={setDidPost}
          updateModal={useShowModal}
        ></DiscussionModal>
      ) : null}

      <div className="forum">
      <h4>Forums</h4>
    
        {isLoading ? (  
         
          <Spinner></Spinner> 
        ) : (
          <>
            
            {topics.map(({ id, topic, createdAt, User: { username } }) => {
              return (
                      
                <div
                  onClick={() => setTopicId(id)}
                  className="each-forum"
                  key={id}
                >
                  <p className="title">{topic}</p>
                  <div className="info">
                    <p className="time">
                      posted {moment(createdAt).fromNow()} by
                    </p>
                    <p className="user">@{username}</p>
                  </div>
                </div>
               
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Forum;
