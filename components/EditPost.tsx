import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditedPostProps, Values } from "@/types";

function EditPost({ postdata, editeToggle, editeModal }: EditedPostProps) {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const initialValues: Values = {
    title: postdata.title,
    body: postdata.body,
    userId: "",
  };
  console.log("initialValues", initialValues);

  // validate function
  const validate = (values: Values) => {
    const errors: Partial<Values> = {};
    if (!values.title && !initialValues.title) {
      errors.title = "this field is Required";
    }
    if (!values.body && !initialValues.body) {
      errors.body = "this field is Required";
    }
    return errors;
  };

  // submit function
  const onSubmit = (values: Values) => {
    console.log(errors);
    
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postdata.id}`, {
        body: JSON.stringify({
          title: values.title,
          body: values.body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        response && setIsSuccessful(true);
        setTimeout(() => (setIsSuccessful(false), editeToggle()), 2000);
      })
      .catch((error) => console.log(error));
  };

  const { handleChange, values, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validate: validate,
      onSubmit: onSubmit,
    });

  console.log("values", values);

  return (
    editeModal && (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={editeModal}
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <Formik
                  initialValues={initialValues}
                  validate={validate}
                  onSubmit={onSubmit}
                >
                  <form onSubmit={handleSubmit}>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                      Edite Post
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                      <div className="sm:col-span-8">
                        <div className="flex items-center mt-2">
                          <label
                            htmlFor="title"
                            className="block text-sm me-2 font-medium leading-6 text-gray-900"
                          >
                            Title :
                          </label>
                          <div className="w-[60%]   ">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="block w-full  border-0 bg-transparent px-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm "
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={initialValues.title}
                            />
                          </div>
                        </div>
                        <p className="text-red-400 ms-11">
                          {touched.title && errors?.title}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="body"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Post body :
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="body"
                          name="body"
                          className="block w-[80%] ms-10 me-4 rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={initialValues.body}
                        />
                        <p className="text-red-400 ms-11">
                          {touched.body && errors?.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            editeToggle();
                          }}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </Formik>
              </div>

              {isSuccessful ? (
                <div
                  className="alert alert-success  bg-green-400 p-2 m-2 text-white"
                  role="alert"
                >
                  Post Edited Successfully
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditPost;
