import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import arrowUp from "../../../assets/ANSWER PAGE ICONS/arrow-up.png";
import arrowDown from "../../../assets/ANSWER PAGE ICONS/arrow-down.png";
import star from "../../../assets/ANSWER PAGE ICONS/star.png";
// import { AnswerComment } from "./AnswerComment";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import greyBadge from "../../../assets/ANSWER PAGE ICONS/greyBadge.png";


export function AnswerSection({
  answers,
  fetchQuestion,
  answerId,
  setFormBody,
  setAnswerId,
  formBody,
}) {
  console.log(answers);
  const axiosPrivate = useAxiosPrivate();
  const [textArea, setTextArea] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [upVotes, setUpVotes] = useState(0);
  // const [voteState, setVoteState] = useState(false);
  const [downVotes, setDownVotes] = useState(0);
  const [postButton, setPostButton]= useState(true);
  const [badge, setBadge]= useState(true)

  //delete answer
  async function handleDelete(id) {
    try {
      const res = await axiosPrivate.delete(`answers/${id}`);
      console.log(res);
      fetchQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  //edit answer
  async function handleEdit(id) {
    let aboutToUpdate = await axiosPrivate.get(`answers/${id}`);

    console.log(aboutToUpdate.data.content);
    // console.log(formBody)
    setFormBody(aboutToUpdate.data.content);

    console.log(formBody);
    setAnswerId(id);
    console.log(answerId);
    setPostButton(false);
  }

  const handleShowTextArea = () => {
    setTextArea(!textArea);
  };

  useEffect(() => {
    fetchQuestion();
  }, [badge]);

  //addComment
  async function addComment(id) {
    try {
      const commentContent = await axiosPrivate.post(
        `/answers/comments?answerId=${id}`,
        { comment: textValue }
      );

      setTextArea(false);
      fetchQuestion();
    } catch (error) {}
  }

  //delete Comment
  async function handleCommentDelete(id) {
    const del = await axiosPrivate.delete(`comments/${id}`);
    fetchQuestion();
  }

  //edit Comment
  async function editComment(id) {
    const edit = await axiosPrivate.get(`comments/${id}`);
    setTextArea(true);
    setTextValue(edit.data.comment);
    setPostButton(false);
  }

  //updateComment
  async function updateComment(id) {
    try {
      const commentUpdate = await axiosPrivate.patch(`comments/${id}`, {
        comment: textValue,
      });
      setTextValue(commentUpdate);
      console.log(commentUpdate);
      setTextArea(false);
      fetchQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  //handleChange on textarea
  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  //handleUpVotes
  const handleUpVotes = async (id) => {
    try {
      const upVote = await axiosPrivate.patch(`answers/${id}/upvote`);
      setUpVotes(upVotes + 1);
      // setVoteState(!voteState)
      // setDisabled(true)
      fetchQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  //handleDownVotes
  const handleDownVotes = async (id) => {
    try {
      const downVote = await axiosPrivate.patch(`answers/${id}/downvote`);
      console.log(downVote);
      console.log(downVote.data);
      setDownVotes(downVotes - 1);
      //  setDisabled(true)
      //  setVoteState(!voteState)
      fetchQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  const approvedBadge= async (id)=>{
try {
  const accepted = await axiosPrivate.patch(`answers/${id}/accepted`)
  // console.log(accepted)
  console.log(id)
  setBadge(!badge)
} catch (error) {
  console.log(error)
}

   
  
  }

  return (
    <>
      <div>
        <h1 className="heading">Answers</h1>
      </div>
      <ul className="answerswrap">
        {answers.map((answer) => {
          // const { id, content, upvotes, downvotes, createdAt, User } = answer;
          console.log(answer.Comments);
          return (
            <div>
              <li
                key={answer.id}
                className="answersLi"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="answersblock">
                  <div
                    className="content"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p

                      // dangerouslySetInnerHTML={{ __html: Parser(content) }}
                      >
                        {answer.content}
                      </p>
                    </div>
                  </div>

                  <div className="commentblock">
                    <p style={{ textDecoration: "underline" }}>Comment</p>

                    <div className="answerer">
                      <div className="questionAnswer">
                        <div className="votes">
                          <span
                            style={{ fontSize: "15px", paddingRight: "2px" }}
                          >
                            {answer.upvotes}
                          </span>
                          <button
                            // disabled={disabled}
                            onClick={() => {
                              handleUpVotes(answer.id);
                            }}
                            style={{
                              marginRight: "10px",
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <img src={arrowUp} alt="" />
                          </button>

                          <span
                            style={{ fontSize: "15px", paddingRight: "2px" }}
                          >
                            {answer.downvotes}
                          </span>
                          <button
                            //  disabled={disabled}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleDownVotes(answer.id);
                            }}
                          >
                            <img src={arrowDown} alt="" />
                          </button>
                        </div>

                        <span
                          className="star"
                          onClick={() =>
                            approvedBadge(answer.id)}
                        >
                          {/* {" "} */}

                          {answer.accepted !== true ? (
                            <img
                              style={{ width: "35px" }}
                              src={greyBadge}
                              alt=""
                            />
                          ) : (
                            <img src={star} alt="" />
                          )}
                        </span>

                        <div className="commentor">
                          <p style={{ fontSize: "14px" }}>
                            answered {moment(answer.createdAt).fromNow()}
                          </p>

                          <div className="commentorinfo">
                            <img
                              src={answer.User.profile_image}
                              alt="image of commentator"
                            />
                            <span className="user">
                              {" "}
                              @{answer.User.username}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            handleDelete(answer.id);
                          }}
                          className="btn delBtn"
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            handleEdit(answer.id);
                          }}
                          className="btn delBtn"
                          style={{ cursor: "pointer" }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* //COMMENT sECTION */}

              <ul className="comment-section" style={{ marginTop: "30px" }}>
                {answer.Comments.map((comment) => {
                  console.log(comment);
                  return (
                    <li
                      className="commentLi"
                      key={comment.id}
                      style={{
                        backgroundColor: "transparent",
                        marginTop: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="commentsDetails"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <p>
                              {comment.comment} -
                              <span className="user" style={{ padding: "2px" }}>
                                {" "}
                                @{comment.User.username}
                              </span>{" "}
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: "right", marginTop: "30px" }}>
                          <button
                            className=" btn editBtn"
                            style={{ padding: "2px", cursor: "pointer" }}
                            onClick={() => {
                              editComment(comment.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className=" btn delBtn"
                            style={{ padding: "2px", cursor: "pointer" }}
                            onClick={() => {
                              handleCommentDelete(comment.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <hr
                        style={{
                          width: "500px",
                          alignSelf: "right",
                          marginLeft: "200px",
                        }}
                      />
                    </li>
                  );
                })}
              </ul>

              {/* // ) :  */}
              {/* // <AnswerComment answers={answer} fetchQuestion={fetchQuestion} /> */}
              {/* //  null}  */}

              <div>
                <button className=" btn" onClick={handleShowTextArea}>
                  Add Comment
                </button>

                {textArea ? (
                  <div>
                    <textarea
                      type="textarea"
                      rows="4"
                      placeholder="Comments"
                      name="text"
                      value={textValue}
                      onChange={handleChange}
                    />
                    {answer.Comments.map((comment) => {
                      return (
                        <button
                          className="btn"
                          type="submit"
                          style={{
                            padding: "3px",
                            alignContent: "right",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            postButton
                              ? addComment(answer.id)
                              : updateComment(comment.id)
                          }
                        >
                          {postButton ? "Post" : "Update"}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <hr className="horizontal-line" />
              {/* 
              <AnswerTextArea
                // value={value}
                // handleChange={handleChange}
                // setAnswerId={setAnswerId}
                answerId={answerId}
                fetchQuestion={fetchQuestion}
                setTextArea={setTextArea}
                id={answer.id}
              /> */}
            </div>
          );
        })}
      </ul>
    </>
  );
}
