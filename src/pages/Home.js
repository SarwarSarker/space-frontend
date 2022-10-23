import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import web from "../components/err.png";

export default function Home() {
  const [user, setUser] = useState({});
  const [cvalue, setCvalue] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(user);
  const initialvalues = {
    username: user.firstName || "",
    email: user.email || "",
    phone: "",
    profile: "",
    checked: [],
    biodata: "",
  };

  const SUPPORTED_FORMATS = ["application/pdf"];

  const validateSchema = Yup.object().shape({
    username: Yup.string()
      .required("Name is required")
      .min(6, "Name must be at least 6 characters")
      .max(20, "Name must not exceed 20 characters"),
    email: Yup.string().email().required("Email is Required"),
    phone: Yup.string().required("Phone is Required"),
    profile: Yup.string().required("Enter linkedin profile url"),
    biodata: Yup.mixed()
      .required("A file is required")
      .test("type", "We only supported pdf format", (value) => {
        return value && value.type === "application/pdf";
      }),
    checked: Yup.array().min(1, "Select atleast one option of your interest"),
  });

  const handlesubmit = async (formValue) => {
    try {
      await axios.post("http://localhost:3001/information/", formValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const codeUrl = new URL(window.location.href);
    const code = codeUrl.searchParams.get("code");
    getUserCredentials(code);
  }, []);

  const getUserCredentials = (code) => {
    console.log(code);
    axios
      .get(`http://localhost:3001/getUserCredentials?code=${code}`)
      .then((res) => {
        const user = res.data;
        setUser(user);
        setLoggedIn(true);
      });
  };
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT_API_URL}&scope=r_liteprofile%20r_emailaddress`;

  return (
    <>
      <div className="container py-5">
        <div className="text-center pb-5">
          <a href={url}>
            <button type="button" className="btn btn-danger fw-bolder">
              Apply with Linkedin
            </button>
          </a>
        </div>

        <div className="item-container">
          <div className="pt-5 px-5">
            <h4 className="text-danger">Apply for position</h4>
          </div>
          <div className="p-5">
            <Formik
              initialValues={initialvalues}
              validationSchema={validateSchema}
              onSubmit={handlesubmit}
              onChange={({ nextValues }) => {
                setCvalue(nextValues);
              }}
            >
              <Form encType="multipart/form-data">
                <div className="mb-4 row ">
                  <label className="col-sm-2 col-form-label position-relative subtilte">
                    Name
                    <span className="position-absolute text-danger star">
                      *
                    </span>
                  </label>

                  <div className="col-sm-10">
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Type your full name"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      className="text-danger fw-bolder"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 row ">
                  <label className="col-sm-2 col-form-label position-relative subtilte">
                    Email
                    <span className="position-absolute text-danger star">
                      *
                    </span>
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="email"
                      className="form-control "
                      placeholder="Type a valid email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-danger fw-bolder"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 row ">
                  <label className="col-sm-2 col-form-label position-relative subtilte">
                    Phone
                    <span className="position-absolute text-danger star">
                      *
                    </span>
                  </label>

                  <div className="col-sm-10">
                    <Field
                      type="tel"
                      className="form-control"
                      placeholder="Type a valid phone e.g: 01832567843"
                      name="phone"
                    />
                    <ErrorMessage
                      name="phone"
                      className="text-danger fw-bolder"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 row ">
                  <label className="col-sm-2 col-form-label position-relative subtilte">
                    Linkedin
                    <span className="position-absolute text-danger star">
                      *
                    </span>
                  </label>

                  <div className="col-sm-10">
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Type a valid linkedin profile"
                      name="profile"
                    />
                    <ErrorMessage
                      name="profile"
                      className="text-danger fw-bolder"
                      component="div"
                    />
                  </div>
                </div>

                <div className="subtilte position-relative">
                  Select your skills
                  <span className="position-absolute text-danger star">*</span>
                  <span className="subtext ms-4">
                    (you have to select a minimum of one skill submit)
                  </span>
                </div>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="d-flex flex-column justify-content-center"
                >
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="php"
                      className="me-2"
                    />
                    PHP
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="python"
                      className="me-2"
                    />
                    Python
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="sql"
                      className="me-2"
                    />
                    SQL
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="css"
                      className="me-2"
                    />
                    CSS
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="html"
                      className="me-2"
                    />
                    HTML5
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="javascript"
                      className="me-2"
                    />
                    Javascript
                  </label>
                  <label className="subtilte pt-2">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="react"
                      className="me-2"
                    />
                    React
                  </label>
                  <ErrorMessage
                    name="checked"
                    className="text-danger fw-bolder"
                    component="div"
                  />
                </div>
                <div className="mt-4 d-flex ">
                  <label className=" position-relative subtilte">
                    CV (pdf format) <br />
                    <span className="subtext">(File size limit is 2 mb)</span>
                    <span className="position-absolute text-danger star">
                      *
                    </span>
                  </label>

                  <div className="ms-4">
                    <Field type="file" className="" name="biodata" />
                    <ErrorMessage
                      name="biodata"
                      className="text-danger fw-bolder"
                      component="div"
                    />
                  </div>
                </div>

                <div className="text-center pt-5 pb-4">
                  <div className="bg-danger rounded-top mx-auto preview">
                    <button
                      type="button"
                      className="btn btn-danger border border-secondary px-5"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Modal */}

                  <div id="exampleModal" className="modal">
                    <div className="modal-dialog  modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body">
                          <button
                            type="button"
                            className="btn-close text-right"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                          <h4 className="py-3 text-danger">View Details</h4>
                          {cvalue.username}
                          <div className="row">
                            <div className="col-sm-5 border">
                              <div className="profile_item"></div>
                              <div className="">
                                <img
                                  src={web}
                                  alt="imag"
                                  className="profile_img"
                                />
                                <h6 className="pt-2">Mr.XYZ</h6>
                                <h6 className="">Software Engineer</h6>
                              </div>
                            </div>
                            <div className="col-sm-7 border p-3">
                              <h6>Selected skills</h6>
                              <div>
                                <p>1. php</p>
                                <p>2. python</p>
                                <p>3. css</p>
                              </div>
                            </div>
                          </div>

                          <h4 className="py-3 text-danger ">Uploaded CV</h4>

                          <button type="submit" className="btn btn-danger px-5">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-black-50 text-center">
                  All fields marked with a astersrik(
                  <span className="text-danger">*</span>) are mendatory.
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
