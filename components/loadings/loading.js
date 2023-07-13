import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-[90px] left-[calc(50vw-40px)] top-[calc(50vh-40px)]">
      <img src="/loading/loading.gif" className="mx-auto m-8 w-[90px] h-auto" />
    </div>
  );
};

export default Loading;
