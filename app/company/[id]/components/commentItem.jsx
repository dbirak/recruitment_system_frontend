"use client";

import moment from "moment";
import { useState } from "react";

const CommentItem = (props) => {
  const [rating, setRating] = useState(props.comment.rating);

  return (
    <div>
      <div className="card rounded-lg shadow-xl mb-4 w-[calc(100%-50px)] bg-base-100 mx-auto">
        <div className="card-body">
          <h2 className="card-title word-break block overflow-hidden">
            {props.comment.user.name} {props.comment.user.surname}
          </h2>
          <p className="text-[14px]">
            Dodano: {moment.utc(props.comment.created_at).format("DD.MM.YYYY")}
          </p>
          <div className="flex items-center my-3">
            <div className="rating h-fit w-fit">
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                defaultChecked={rating === 1}
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                defaultChecked={rating === 2}
              />
              <input
                type="radio"
                name="rating-3"
                className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                defaultChecked={rating === 3}
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                defaultChecked={rating === 4}
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                defaultChecked={rating === 5}
              />
            </div>
          </div>
          <p className="text-justify break-words">{props.comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
