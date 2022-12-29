import { Editor } from "./Editor";
import React, { useState, useEffect } from "react";
import moment from "moment";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";

function ThreadContent({ topic, topicId, reload, setReload }) {
  const axiosPrivate = useAxiosPrivate();
  const [reply, setReply] = useState("");

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  //Will chnage later just to refect reply every two minutes
  setTimeout(() => {
    setReload(!reload);
  }, 2000);

  const handlePostReply = () => {
    const databaseReply = {
      DiscussionId: topicId,
      content: reply,
    };

    try {
      axiosPrivate
        .post(`discussions/reply`, databaseReply)
        .then((response) => {
          console.log(response);
          setReply("");
          setReload(!reload);
        })
        .catch((err) => {});
    } catch (error) {
    } finally {
      // run always
    }
  };

  return (
    <div className="thread">
      <div>
        <h4>Thread</h4>
        <div className="each-thread">
          <div className="img">
            <img src={topic.User.profile_image} alt={topic.User.username} />
          </div>
          <div className="info">
            <p className="user">{topic.User.username}</p>
            <p className="date">
              {moment(topic.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p className="topic">{topic.topic}</p>
          </div>
        </div>

        {topic.Discussion_replies.length === 0 ? null : (
          //  <div className="hr-lines">
          <p className="each-thread-reply">
            {topic.Discussion_replies.length}
            {topic.Discussion_replies.length <= 1 ? " reply" : " replies"}
          </p>
          // </div>
        )}

        {topic.Discussion_replies.map(({ id, content, userId, User, createdAt }) => {
          return (
            <div key={id} className="solution-wrapper">
              <div className="img"><img src={User.profile_image} alt /></div>
              <div>
                <div className="solution-info">
                  <h5>{User.username}</h5>
                  <p> {moment(createdAt).fromNow()}</p>
                </div>
                <div className="solution-brief">
                  <p>{content}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="textbox-wrapper">
          <textarea
            className="reply-textbox"
            name="text"
            id=""
            cols="30"
            rows="10"
            value={reply}
            onChange={handleChange}
          ></textarea>
          <button className="reply-textbox-btn" onClick={handlePostReply}>
            POST
          </button>
        </div>
        {/* <Editor placeholder={"Enter text here..."} /> */}
      </div>
    </div>
  );
}

export default ThreadContent;
