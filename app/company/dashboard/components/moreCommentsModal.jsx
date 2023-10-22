import Loading from "@/components/loadings/loading";
import { axiosBase } from "@/utils/api/axios";
import { useState } from "react";
import { useMutation } from "react-query";
import CommentItem from "../../[id]/components/commentItem";
import { useEffect } from "react";
import Modal3 from "@/components/modals/modal3";

const MoreCommentsModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [isLoadingButton, setIsLoadingButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const reloadComments = () => {
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

  const showMoreComments = () => {
    setIsLoadingButton(true);
    getComments.mutate({ currentPage: currentPage });
  };

  const getComments = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post(
          "/company-profile/" +
            props.statistics.company_id +
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

  const closeMoreCommentsModal = () => {
    props.closeMoreCommentsModal();
  };

  return (
    <div>
      <Modal3>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5 break-words">
          Więcej opini
        </h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
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

        <button
          onClick={closeMoreCommentsModal}
          className="btn btn-neutral w-full rounded-none mt-7"
        >
          Zamknij
        </button>
      </Modal3>
    </div>
  );
};

export default MoreCommentsModal;
