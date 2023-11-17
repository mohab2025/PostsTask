"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import Pagination from "./Pagination";
import Search from "./Search";
import { CommentType, PostBody } from "@/types";
import EditPost from "./EditPost";

export default function Posts() {
  let url = "https://jsonplaceholder.typicode.com/";

  const [allPosts, setAllPosts] = useState<PostBody[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  // Edite modal
  const [editeModal, setEditeModal] = useState(false);
  const [postdata, setPostData] = useState<PostBody>({title:"", body:""});
  // Pagination
  const totalPages: number = allPosts.length / 20;
  const [posts, setPosts] = useState<PostBody[]>([...allPosts]);
  const [count, setCount] = useState<number>();
  let dynamicposts: PostBody[] = [];

  useEffect(() => {
    axios
      .get(
        searchValue ? url + "posts" + "?userId=" + searchValue : url + "posts"
      )
      .then((response) => {
        changeTableData(response.data, 0);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(url + "comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchValue]);

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const editeToggle = () => {
    setEditeModal(!editeModal);
  };

  // Pagination
  const changeTableData = (postsData: PostBody[], count: number) => {
    setAllPosts(postsData);
    setCount(count);
  };

  useEffect(() => {
    for (let i = count ? count : 0; i < allPosts.length; i++) {
      dynamicposts.length < 20 && dynamicposts.push(allPosts[i]);
    }
    setPosts(dynamicposts);
  }, [count, allPosts]);

  // search function
  const searchFunction = (value: string) => {
    setTimeout(() => {
      setSearchValue(value);
    }, 750);
  };

  return (
    <div className="w-[80%] ">
      <div className="mt-6 mb-3 flex items-center justify-between  gap-x-6  ">
        {/* UserId filter  */}
        <div>
          <input
            type="number"
            placeholder="UserId"
            className="border-dark border-stone-100 rounded-5 p-2 ms-3 rounded-2xl"
            onChange={(e) => {
              searchFunction(e.target.value);
            }}
          />
        </div>
        {/* add Post */}

        <Link href={"/addPost"}>
          <button className="focus:outline-none text-white bg-[#556ee6] hover:bg-blue-500   rounded-lg text-sm px-3 py-2 me-2 mb-2">
            + add Post
          </button>
        </Link>
      </div>
      {/* Posts Data table */}
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">Id</th>
            <th className="px-6 py-3 text-center">Title</th>
            <th className="px-6 py-3 text-center">UserId</th>
            <th className="px-6 py-3 text-center">Num.Comments</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(
            (post, index) =>
              index < 20 && (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4 text-center">{post.id}</td>
                  <td className="w-4 p-4 text-center">{post.title}</td>
                  <td className="w-4 p-4 text-center">{post.userId}</td>
                  <td className="w-4 p-4 text-center">
                    {
                      comments.filter((comment) => comment.postId === post.id)
                        .length
                    }
                  </td>
                  <td className="w-4 p-4 text-center">
                    <button
                      className="focus:outline-none text-white bg-[#34c38f] hover:bg-[#15d891]  rounded-lg text-sm px-3 py-2 me-2 mb-2"
                      onClick={() => {
                        setPostData(post);
                        editeToggle()
                      }}
                    >
                      Edite
                    </button>
                    <button
                      className="focus:outline-none text-white bg-[#f46a6a] hover:bg-red-500   font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2  "
                      onClick={() => {
                   
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {/* delete Modal */}
      <DeletePost
        postId={postId}
        deleteModal={deleteModal}
        deleteToggle={deleteToggle}
      />
      {/* Edite Modal */}
      <EditPost
        postdata={postdata}
        editeModal={editeModal}
        editeToggle={editeToggle}
      />
      {/* Pagination */}
      <Pagination totalPages={totalPages} setCount={setCount} />
    </div>
  );
}
