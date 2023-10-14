"use client";

import { useEffect, useState } from "react";
import AddComment from "./addComment";
import CommpentItem from "./commentItem";
import { axiosWithBearerOrBase } from "@/utils/api/axios";
import { useMutation, useQuery } from "react-query";
import Loading from "@/components/loadings/loading";
import { useRouter } from "next/navigation";
import CommentUserItem from "./commentUserItem";
import EditComment from "./editComment";
import { RiContactsBookLine } from "react-icons/ri";
import CommentItem from "./commentItem";

const Comments = (props) => {
  const router = useRouter();

  const [comments, setComments] = useState({});
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditComment, setIsEditComment] = useState(false);

  const [isLoadingButton, setIsLoadingButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const reloadComments = () => {
    setIsEditComment(false);
    setIsLoading(true);

    setComments({});
    setCurrentPage(1);
    setHasMore(true);
    setIsLoadingButton(true);

    getComments.mutate({ currentPage: 1 });
  };

  useEffect(() => {
    reloadComments();
  }, []);

  const getComments = useMutation({
    mutationFn: (data) => {
      axiosWithBearerOrBase
        .post(
          localStorage.getItem("token") || sessionStorage.getItem("token")
            ? "/user/company-profile/" +
                props.id +
                "/comment?page=" +
                data.currentPage
            : "/company-profile/" +
                props.id +
                "/comment?page=" +
                data.currentPage
        )
        .then((res) => {
          if (res.data.meta.last_page === res.data.meta.current_page)
            setHasMore(false);

          if (res.data.meta.current_page === 1) setComments(res.data.data);
          else {
            setComments((previousData) => previousData.concat(res.data.data));
          }
          setCurrentPage(res.data.meta.current_page + 1);

          setMeta(res.data.meta);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
          setIsLoadingButton(false);
        });
    },
  });

  const showEditComment = () => {
    setIsEditComment(true);
  };

  const closeEditComment = () => {
    setIsEditComment(false);
  };

  const showMoreComments = () => {
    setIsLoadingButton(true);
    getComments.mutate({ currentPage: currentPage });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!meta.info.can_send_comment && !meta.info.have_comment && (
            <div className="alert alert-neutral mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                <a
                  className="font-semibold link link-neutral"
                  onClick={() => router.push("/login")}
                >
                  Zaloguj się
                </a>{" "}
                aby dodać komentarz!
              </span>
            </div>
          )}
          {meta.info.can_send_comment && !meta.info.have_comment && (
            <AddComment id={props.id} reloadComments={reloadComments} />
          )}
          {!meta.info.can_send_comment &&
            meta.info.have_comment &&
            (isEditComment ? (
              <EditComment
                id={props.id}
                reloadComments={reloadComments}
                comment={meta.info.comment}
                closeEditComment={closeEditComment}
              />
            ) : (
              <CommentUserItem
                id={props.id}
                reloadComments={reloadComments}
                comment={meta.info.comment}
                showEditComment={showEditComment}
              />
            ))}

          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}

          {hasMore &&
            (isLoadingButton ? (
              <button className="btn btn-neutral block mx-auto mt-7 btn-disabled w-[130px]">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                onClick={showMoreComments}
                className="btn btn-neutral block mx-auto mt-7 w-[130px]"
              >
                Pokaż więcej
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
