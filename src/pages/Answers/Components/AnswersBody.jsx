import React, { useState, useEffect } from "react";
// import { Editor } from "../../AskQuestions/components/Editor";
import { useParams } from "react-router-dom";

import AnswerActions from "./AnswerActions";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import Spinner from "../../../components/Spinner";
// import TurndownService from 'turndown';
import Parser from "html-react-parser";
import moment from "moment";
import { Question } from "./Question";
import { AnswerSection } from "./AnswerSection";
import { Editor } from "../../AskQuestions/components/Editor";
import { Answers } from "../Answers";

export function AnswersBody() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [formBody, setFormBody] = useState("");
  // const [value, setValue] = useState(formBody);
  const [answerId, setAnswerId] = useState("");
  const [button, setPostButton] = useState(true);
  const [ comment, setComment] = useState([]);
  // const navigate = useNavigate()

  // console.log(formBody)
  // console.log(typeof formBody)


  const { id } = useParams();
  console.log(id);
  // console.log(value)

  //fetchQuestions
  const fetchQuestion = async () => {
    const response = await axiosPrivate.get(`questions/${id}`);

    console.log(response.data)
  await setAnswers(response.data.Answers);
console.log(answers)
    setQuestion(response.data);
// 
    // setComment(response.data.Answers[answerId].Comments)
    console.log(comment
      )
   console.log(comment)
    setIsLoading(false);
    // setCommentSection(true)
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const answerSentValues = {
    QuestionId: id,
    content: formBody,
  };

  const handleFormBody = (html) => {
    setFormBody(html.replace(/<[^>]+>/g, '')
      );
  };
  //submit answer function
  async function handleSubmit() {
    const res = await axiosPrivate.post(`answers`, answerSentValues);

    console.log(res);

   await fetchQuestion();
    setFormBody("");
  }

  console.log(answerId);
  //update answer
  async function handleUpdate(answerId) {
    try {
      const response = await axiosPrivate.patch(`answers/${answerId}`, {
        content: formBody,
      });
      setFormBody(response);
      fetchQuestion();
      setPostButton(true);
    } catch (error) {}
  }

  return (
    <div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <>
          {/* Questions */}
          <Question question={question}/>

          <AnswerActions />

          <div>
            {/* Answers */}
            <AnswerSection
              answers={question.Answers}
              fetchQuestion={fetchQuestion}
              formBody={formBody}
              setFormBody={setFormBody}
             setAnswerId={setAnswerId}
              answerId={answerId}
            />
          </div>

          <br />
          <hr />

          <div>
            <Editor
              placeholder={"Enter your answers here...."}
              value={formBody}
              handleFormBody={handleFormBody}
              name="body"
              // dangerouslySetInnerHTML={{ __html: Parser(formBody) }}
            />
            
          </div>
          <button
            type="submit"
            className="btn postButton"
            onClick={() => (button ? handleSubmit() : handleUpdate(answerId))}
            // onClick={() => handleSubmit()}
          >
            {" "}

            {button?"POST":"UPDATE"}
          </button>

          {/* ANSWERS */}
        </>
      )}
    </div>
  );
}
