import userEvent from "@testing-library/user-event";
import React from "react";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
// import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/hooks/useAuth";
import { useEffect } from "react";

export function AnswerComment({ answers, fetchQuestion }) {
  console.log(answers);
  const axiosPrivate = useAxiosPrivate();

  // const { reRender } = useAuth();

  useEffect(() => {
    fetchQuestion();
  }, []);

  // delete Comment
  async function handleDelete(id) {
    const del = await axiosPrivate.delete(`comments/${id}`);
    console.log(del);
    fetchQuestion();
  }
  const { User, comment, id } = answers;
  return (
    <>
      <ul className="comment-section" style={{ marginTop: "30px" }}>
        <li
          className="commentLi"
          key={id}
          style={{
            backgroundColor: "transparent",
            marginTop: "0px",
            marginBottom: "0px",
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
              <p>{comment}</p>
            </div>

            <div className="commentorinfo">
              <img src={User.profile_image} alt="image of commentator" />
              <span className="user" style={{ padding: "2px" }}>
                {" "}
                @{User.username}
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: "30px" }}>
            <button className=" btn editBtn" style={{ padding: "2px" }}>
              Edit
            </button>
            <button
              className=" btn delBtn"
              style={{ padding: "2px" }}
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </button>
          </div>

          <hr className="horizontal-line" />
        </li>
      </ul>
    </>
  );
}
