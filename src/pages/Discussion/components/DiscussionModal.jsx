import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscussionModal = ({ updateModal, setDidPost, didPost }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [discussionTopic, setDiscussionTopic] = useState("");

  const notifyError = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleChange = (event) => {
    setDiscussionTopic(event.target.value);
  };

  const handlePostDiscussion = () => {
    const databaseDiscussionTopic = {
      topic: discussionTopic,
    };

    try {
      axiosPrivate
        .post(`discussions`, databaseDiscussionTopic)
        .then((response) => {
          console.log(response);
          updateModal(false);
          setDidPost(!didPost);
          navigate("/discuss");
        })
        .catch((err) => {
          notifyError("DIscussion Topic not posted");
        });
    } catch (error) {
      notifyError("DIscussion Topic not postedd");
    } finally {
      // run always
    }
  };

  return (
    <div className="discussion-background">
      <div className="discussion-modal">
        <div>
          <div className="title">
            <h4>Topic</h4>
            <AiOutlineClose
              onClick={() => {
                updateModal(false);
              }}
            ></AiOutlineClose>
          </div>
          <p>Enter a new forum topic</p>

          <input
            type="text"
            name=""
            id=""
            value={discussionTopic}
            onChange={handleChange}
            placeholder="e.g Beginner Questions"
          />
        </div>
        <button onClick={handlePostDiscussion}>POST</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DiscussionModal;
