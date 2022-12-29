import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validationSchema from './validationEditDetails';

const UpdateUserDetails = ({ setShowEditDetails, userId }) => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState({});
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const notifyError = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleShowDetails = () => {
    setShowEditDetails(false);
  };

  useEffect(() => {
    async function fetchProfile() {
      const res = await axiosPrivate.get(`users/${userId}`);
      setUserData(res.data);
      setReady(true);
    }

    fetchProfile();
  }, [ready]);

  return (
    <>
      {ready ? (
        <section className="editdetails-wrapper">
          <div className="editdetails">
            <div className="editdetails-headers">
              <p>Edit Details</p>
              <div onClick={handleShowDetails}>
                <AiOutlineClose />
              </div>
            </div>
            <div className="edit-form">
              <Formik
                initialValues={{
                  name: `${userData.username}`,
                  about: `${userData.about || ""}`,
                  location: `${userData.user_location  || ""}`,
                  stack: `${userData.stack  || ""}`,
                  twitter: `${userData.twitter_profile  || ""}`,
                  linkedin: `${userData.linkedin_profile  || ""}`,
                  github: `${userData.github_profile  || ""}`,
                }}
                validationSchema={validationSchema}


                onSubmit={async (values, { setSubmitting }) => {
                  const {
                    name,
                    about,
                    location,
                    stack,
                    twitter,
                    linkedin,
                    github,
                  } = values;
                  setSubmitting(true);
                 

                  try {
                  const response = await axiosPrivate.patch(`users/${userId}`, {
                      "username" : name,
                      "about" : about,
                      "user_location" : location,
                      "stack" : stack,
                      "twitter_profile" : twitter,
                      "linkedin_profile" : linkedin,
                      "github_profile" : github,
                    });

                     console.log(response.data)
                     setShowEditDetails(false);
                     navigate("/dashboard");
                    

                  } catch (err) {
                    console.log(err.response)
                    if (!err.response) {
                      notifyError("no server response");
                    } else if (err.response.status === 400) {
                      notifyError(err.response.data.message);
                    } else if (err.response.status === 409) {
                      notifyError(err.response.data.message);
                    } else if (err.response.status === 401) {
                      notifyError(err.response.data.message);
                    } else {
                      notifyError("User Details update failed");
                    }
                  }
                 
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <>
                    <form action="">
                      {/* UserName */}
                      <div className="form-wrapper">
                        <label htmlFor="name">Username</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your username"
                          onChange={handleChange}
                          value={values.name}
                        />

                        {errors.name && touched.name && (
                          <p className="asterik"> {errors.name}</p>
                        )}
                      </div>

                      {/* about */}
                      <div className="form-wrapper">
                        <label htmlFor="about">About</label>

                        <textarea
                          rows={4}
                          className="signup-input"
                          type="text"
                          id="about"
                          name="about"
                          placeholder="I'm a developer from ..."
                          onChange={handleChange}
                          value={values.about}
                        />

                        {errors.about && touched.about && (
                          <p className="asterik"> {errors.about}</p>
                        )}
                      </div>

                      {/* location */}
                      <div className="form-wrapper">
                        <label htmlFor="location">Location</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="location"
                          name="location"
                          placeholder="Lagos, Nigeria"
                          onChange={handleChange}
                          value={values.location}
                        />

                        {errors.location && touched.location && (
                          <p className="asterik"> {errors.location}</p>
                        )}
                      </div>

                      {/* stack */}
                      <div className="form-wrapper">
                        <label htmlFor="stack">Stack</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="stack"
                          name="stack"
                          placeholder="React"
                          onChange={handleChange}
                          value={values.stack}
                        />

                        {errors.stack && touched.stack && (
                          <p className="asterik"> {errors.stack}</p>
                        )}
                      </div>

                      {/* twitter */}
                      <div className="form-wrapper">
                        <label htmlFor="twitter">Twitter</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="twitter"
                          name="twitter"
                          placeholder="https://twitter.com/johndoe"
                          onChange={handleChange}
                          value={values.twitter}
                        />

                        {errors.twitter && touched.twitter && (
                          <p className="asterik"> {errors.twitter}</p>
                        )}
                      </div>

                      {/* LinkedIn*/}
                      <div className="form-wrapper">
                        <label htmlFor="linkedin">LinkedIn</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          placeholder="https://www.linkedin.com/in/johndoe"
                          onChange={handleChange}
                          value={values.linkedin}
                        />

                        {errors.linkedin && touched.linkedin && (
                          <p className="asterik"> {errors.linkedin}</p>
                        )}
                      </div>

                      {/* github */}
                      <div className="form-wrapper">
                        <label htmlFor="github">Github</label>

                        <input
                          className="signup-input"
                          type="text"
                          id="github"
                          name="github"
                          placeholder="https://github.com/codeask"
                          onChange={handleChange}
                          value={values.github}
                        />

                        {errors.github && touched.github && (
                          <p className="asterik"> {errors.github}</p>
                        )}
                      </div>

                    </form>

                    <div className="editdetails-buttons">
                      {/* <button onClick={() => resetForm()}>Reset</button> */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </section>
      ) : null}
       <ToastContainer />
    </>
  );
};

export default UpdateUserDetails;
