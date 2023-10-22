const CommentRatingCounter = (props) => {
  return (
    <div>
      <div className="text-[23px] mb-8">
        <span className="font-semibold">Liczba wszystkich opini: </span>
        {props.statistics.comments_counter}
      </div>
      <div>
        <div className="flex justify-around w-full mb-2">
          <div>
            <div className="rating h-fit w-fit grid items-center">
              <div>
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked
                />
              </div>
            </div>
          </div>
          <div className="text-[17px]">
            Liczba opini: {props.statistics.five_star_comments_count}
          </div>
        </div>
        <div className="flex justify-around w-full mb-2">
          <div>
            <div className="rating h-fit w-fit grid items-center">
              <div>
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
          <div className="text-[17px]">
            Liczba opini: {props.statistics.four_star_comments_count}
          </div>
        </div>
        <div className="flex justify-around w-full mb-2">
          <div>
            <div className="rating h-fit w-fit grid items-center">
              <div>
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
          <div className="text-[17px]">
            Liczba opini: {props.statistics.three_star_comments_count}
          </div>
        </div>
        <div className="flex justify-around w-full mb-2">
          <div>
            <div className="rating h-fit w-fit grid items-center">
              <div>
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
          <div className="text-[17px]">
            Liczba opini: {props.statistics.two_star_comments_count}
          </div>
        </div>
        <div className="flex justify-around w-full">
          <div>
            <div className="rating h-fit w-fit grid items-center">
              <div>
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 rating-xs h-[17px] bg-orange-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
          <div className="text-[17px]">
            Liczba opini: {props.statistics.one_star_comments_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentRatingCounter;
