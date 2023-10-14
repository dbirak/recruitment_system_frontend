"use client";

import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const AddComment = (props) => {
  const [rating, setRating] = useState(3);
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
        .post("/user/company-profile/comment", data)
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
              Dodaj swój komentarz
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
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(2)}
                  value="2"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(3)}
                  value="3"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                  defaultChecked
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(4)}
                  value="4"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
                />
                <input
                  {...register("rating")}
                  onChange={() => setRating(5)}
                  value="5"
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400"
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
                <button
                  type="submit"
                  className="btn btn-neutral w-[150px] btn-disabled"
                >
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button type="submit" className="btn btn-neutral w-[150px]">
                  Dodaj
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
