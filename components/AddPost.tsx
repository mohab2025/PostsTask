"use client";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Values } from "@/types";

const AddPost: any = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const initialValues: Values = { title: "", body: "", userId: "" };

  // validate function
  const validate = (values: Values) => {
    const errors: Partial<Values> = {};
    if (!values.title) {
      errors.title = "this field is Required";
    }
    if (!values.body) {
      errors.body = "this field is Required";
    }
    return errors;
  };

  // submit function
  const onSubmit = (values: Values) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        body: JSON.stringify({
          title: values.title,
          body: values.body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => (console.log(response), setIsSuccessful(true)))
      .catch((error) => console.log(error));
  };

  const { handleChange, values, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validate: validate,
      onSubmit: onSubmit,
    });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
              Add Post
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
              <div className="sm:col-span-4">
                <div className="flex items-center mt-2">
                  <label
                    htmlFor="title"
                    className="block text-sm me-2 font-medium leading-6 text-gray-900"
                  >
                    Title :
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent px-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                  onChange={handleChange}
                  id="body"
                  name="body"
                  className="block w-full ms-10 rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-400 ms-11">{touched.body && errors?.body}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </Formik>
        {isSuccessful ? (
          <div
            style={{ marginTop: "5px" }}
            className="alert alert-success  bg-green-400 p-4 text-white"
            role="alert"
          >
            Post Added Successfully
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AddPost;
