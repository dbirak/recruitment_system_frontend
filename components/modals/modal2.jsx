const Modal2 = (props) => {
  const modalStyled = `m-5 p-7 bg-base-100 rounded-lg min-w-[420px] max-w-[850px] max-h-screen h-auto overflow-auto`;

  return (
    <div className="fixed bg-[#000000a6] z-50 w-screen h-screen inset-0 flex items-center justify-center">
      <div className={modalStyled}>{props.children}</div>
    </div>
  );
};

export default Modal2;
