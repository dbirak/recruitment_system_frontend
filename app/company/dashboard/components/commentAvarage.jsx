import { AiFillStar } from "react-icons/ai";

const CommentAvarage = (props) => {
  return (
    <div>
      <div className="text-[23px]">
        <span className="font-semibold">Średnia ocen</span>
        <div className="h-[180px] grid items-center">
          <div className="flex text-yellow-600 h-fit justify-center my-auto">
            <div className="text-[35px] font-medium">
              {props.statistics.avarage_star} / 5.0
            </div>
            <div className="ms-5 text-[50px]">
              <AiFillStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentAvarage;
