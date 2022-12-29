import React, { useState } from "react";
import { axiosPrivate } from "../../../components/baseURL";


export function AnswerTextArea({id, fetchQuestion}) {


  console.log(id)
  const handleShowTextArea = () => {
    setTextArea(!textArea);
  };


  const [textValue, setTextValue] = useState("");
  
  const [textArea, setTextArea] = useState(false);
  async function addComment() {
    try {

      const commentContent = await axiosPrivate.post(
        `/answers/comments?answerId=${id}`, {comment:textValue}
      );
      console.log(commentContent);

      setTextArea(false);
      fetchQuestion()
    } catch (error) {}
  }
  const handleChange = (e) => {
    setTextValue(e.target.value);
    // console.log(textValue)
  };
  return (
    <>

    

      <div>
        <button className=" btn" onClick={handleShowTextArea}>
          Comment
        </button>

      {textArea?
        <div>

        <textarea
          type="textarea"
          rows="4"
          placeholder="Comments"
          name="text"
          value={textValue}
          onChange={handleChange}
        />
        <button
          className="btn"
          type="submit"
          style={{ padding: "3px" }}
          onClick={()=>addComment(id)}
        >
          Post
        </button>
        </div>:null}
       
      </div>
    </>
  );
}
