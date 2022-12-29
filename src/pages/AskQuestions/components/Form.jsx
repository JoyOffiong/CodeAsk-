import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "./Editor";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertArray } from "./convert";
import { IoCloseSharp } from "react-icons/io5";

const Form = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [formBody, setFormBody] = useState("");
  const [postButton, setPostButton] = useState(true);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tagSearchField, setTagSearchField] = useState(false);

  const notifyError = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [formValue, setformValue] = useState({
    title: "",
    tags: "",
  });

  useEffect(() => {
    if (tags.length >= 5) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [tags]);

  const removeTags = (tag) => {
    let newTags = tags.filter((eachTag) => eachTag !== tag);
    setTags([...newTags]);
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormBody = (html) => {
    setFormBody(html);
  };

  const addTags = (event) => {
    if (event.key === "Enter") {
      setTags([...tags, event.target.value]);

      setformValue({
        ...formValue,
        [event.target.name]: "",
      });
    }

    setTagSearchField(event.target.value);
  };

  const addSuggestedTags = (tag) => {
    setTags([...tags, tag]);
    formValue.tags = "";
  };

  useEffect(() => {
    let tagFilterValue = formValue.tags;

    try {
      axiosPrivate
        .get(`tags`)
        .then((response) => {
          let newAllTags = response.data.filter(
            (eachTag) => !tags.includes(eachTag.name)
          );

          newAllTags = newAllTags.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(tagFilterValue.toLowerCase()) !==
              -1
            );
          });

          setAllTags([...newAllTags]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      // always run
    }
    // };
  }, [tags, tagSearchField]);

  const handleSubmit = (event) => {
    if (formValue.title === "" || formBody === "" || tags === []) {
      notifyError("Fill all fields");
    } else {
      event.preventDefault();
      setPostButton(false);

      const databaseFormValue = {
        title: formValue.title,
        body: formBody,
        tags: convertArray(tags),
      };

      // console.log(databaseFormValue);

      try {
        axiosPrivate
          .post(`questions`, databaseFormValue)
          .then((response) => {
            console.log(response);
            navigate("/questions");
          })
          .catch((err) => {
            notifyError("Question not submitted");
          });
      } catch (err) {
        if (!err.response) {
          notifyError("no server response");
        } else if (err.response.status === 400) {
          notifyError(err.response.data.message);
        } else if (err.response.status === 409) {
          notifyError(err.response.data.message);
        } else if (err.response.status === 401) {
          notifyError(err.response.data.message);
        } else {
          notifyError("Question not submitted");
        }
      }finally {
        setPostButton(true);
      }
    }
  };

  return (
    <>
      <section className="askquestion-main">
        <div className="title">
          <h5>Title</h5>
          <p>Ask your question as directly as possible</p>
          <input
            type="text"
            placeholder="e.g Is there a way to get version from package.json in nodejs code?"
            name="title"
            value={formValue.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="body">
          <h5>Body</h5>
          <p>
            Include more details about your question to provide more context
            (can include code snippets)
          </p>
          <Editor
            placeholder={"Enter more informaion about question..."}
            value={formBody}
            handleFormBody={handleFormBody}
            name="body"
          />
        </div>

        <div className="tags">
          <h5>Tags</h5>
          <p>Add up to 5 tags to describe what your question is about</p>
          {isDisabled ? null : (
            <input
              type="text"
              name="tags"
              placeholder="e.g javascript web html "
              value={formValue.tags}
              onChange={handleChange}
              onKeyUp={addTags}
              // onClick={getTags}
              disabled={isDisabled}
              required
            />
          )}
          {formValue.tags === "" ? null : (
            <div className="suggest-tags">
              {allTags.slice(0, 4).map((tag) => {
                return (
                  <div key={tag.id} onClick={() => addSuggestedTags(tag.name)}>
                    {tag.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="selectedTags-container">
          {tags.map((tag, index) => {
            return (
              <div className="selected-tags" key={index}>
                {tag}{" "}
                <span
                  className="remove-selectedtags"
                  onClick={() => removeTags(tag)}
                >
                  <IoCloseSharp />
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <button
        className="askquestion-button"
        onClick={handleSubmit}
        disabled={postButton ? false : true}
      >
        POST QUESTION
      </button>
      <ToastContainer />
    </>
  );
};

export default Form;
