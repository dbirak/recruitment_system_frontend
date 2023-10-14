import { axiosWithBearer } from "@/utils/api/axios";
import moment from "moment";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";

const CommentUserItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const destroyComment = useMutation({
    mutationFn: () => {
      axiosWithBearer
        .delete("/user/company-profile/comment/" + props.comment.id)
        .then((res) => {
          props.reloadComments();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const removeComment = () => {
    setIsLoading(true);

    destroyComment.mutate();
  };

  const showEditComment = () => {
    if (isLoading) return;

    props.showEditComment();
  };

  return (
    <div>
      <div>
        <div className="card rounded-lg shadow-xl mb-4 w-[calc(100%-50px)] bg-base-100 mx-auto">
          <div className="card-body">
            <h2 className="card-title word-break block overflow-hidden">
              {props.comment.user.name} {props.comment.user.surname}
            </h2>
            <p className="text-[14px]">
              Dodano:{" "}
              {moment.utc(props.comment.created_at).format("DD.MM.YYYY")}
            </p>
            <div className="flex items-center my-3">
              <div className="rating h-fit w-fit">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked={props.comment.rating === 1}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked={props.comment.rating === 2}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked={props.comment.rating === 3}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked={props.comment.rating === 4}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked={props.comment.rating === 5}
                />
              </div>
            </div>
            <p className="text-justify break-words">{props.comment.comment}</p>

            <div className="ml-0 flex">
              <button
                onClick={showEditComment}
                className="btn btn-ghost text-yellow-700 mx-auto w-[130px] flex items-center"
              >
                <div>
                  <FaEdit />
                </div>
                <div>Edytuj</div>
              </button>

              {isLoading ? (
                <button className="btn btn-ghost text-red-700 mx-auto w-[130px] flex items-center">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button
                  onClick={removeComment}
                  className="btn btn-ghost text-red-700 mx-auto w-[130px] flex items-center"
                >
                  <div>
                    <FaTrash />
                  </div>{" "}
                  <div>Usuń</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentUserItem;
