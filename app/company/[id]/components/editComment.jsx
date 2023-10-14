"use client";

import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const EditComment = (props) => {
  const [rating, setRating] = useState(props.comment.rating);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    getValues,
  } = useForm();

  const styleTextareaCorrect =
    "textarea textarea-bordered h-[150px] text-[16px] w-full";
  const styleTextareaError =
    "textarea textarea-bordered h-[150px] text-[16px] w-full textarea-error text-error";

  const addComment = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .put("/user/company-profile/comment/" + props.comment.id, data)
        .then((res) => {
          props.reloadComments();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    data.rating = rating;
    data.company_id = props.id;

    addComment.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="card rounded-lg shadow-xl mb-4 w-[calc(100%-50px)] bg-base-100 mx-auto">
          <div className="card-body">
            <h2 className="card-title word-break block overflow-hidden">
              Edytuj swój komentarz
            </h2>
            <div className="flex items-center my-3">
              <div>
                <p className="me-3">Ocena: </p>
              </div>
              <div className="rating h-fit w-fit">
                <input
                  {...register("rating")}
                  onChange={() => setRating(1)}
                  value="1"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked={props.comment.rating === 1}
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(2)}
                  value="2"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked={props.comment.rating === 2}
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(3)}
                  value="3"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked={props.comment.rating === 3}
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(4)}
                  value="4"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked={props.comment.rating === 4}
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(5)}
                  value="5"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked={props.comment.rating === 5}
                />
              </div>
            </div>
            <textarea
              type="text"
              placeholder="Wpisz treść swojego komentarza"
              className={
                errors.komentarz ? styleTextareaError : styleTextareaCorrect
              }
              {...register("komentarz", {
                required: "Komentarz jest wymagany.",
                maxLength: {
                  value: 800,
                  message: "Komentarz jest zbyt długi.",
                },
              })}
              defaultValue={props.comment.comment}
            ></textarea>
            <label className="label">
              {errors.komentarz && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors.komentarz.message}
                </span>
              )}
            </label>

            <div className="ml-auto">
              {isLoading ? (
                <div className="flex">
                  <div className="grid items-center">
                    <button className="btn btn-base-100 w-[150px] me-4">
                      Anuluj
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-neutral w-[150px] btn-disabled"
                  >
                    <span className="loading loading-spinner"></span>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={props.closeEditComment}
                    className="btn btn-base-100 w-[150px] me-4"
                  >
                    Anuluj
                  </button>

                  <button type="submit" className="btn btn-neutral w-[150px]">
                    Edytuj
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
