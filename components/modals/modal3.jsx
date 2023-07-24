const Modal3 = (props) => {
  const modalStyled = `m-5 p-7 bg-base-100 rounded-lg xl:w-[1200px] lg:w-[1000px] md:w-[760px] sm:w-[640px] w-[430px] max-h-screen h-auto overflow-auto`;

  return (
    <div className="fixed bg-[#000000a6] z-50 w-screen h-screen inset-0 flex items-center justify-center">
      <div className={modalStyled}>{props.children}</div>
    </div>
  );
};

export default Modal3;
