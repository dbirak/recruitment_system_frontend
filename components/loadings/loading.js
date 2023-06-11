import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-[#050e12ad] z-10">
      <div className="w-[80px] h-auto fixed left-[calc(50vw-40px)] top-[calc(50vh-40px)]">
        <img src="/loading/loading.gif" />
      </div>
    </div>
  );
};

export default Loading;
