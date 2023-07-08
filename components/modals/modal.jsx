const Modal = (props) => {
  return (
    <div className="fixed bg-[#000000a6] z-50 w-screen h-screen inset-0 flex items-center justify-center">
      <div className="m-5 p-7 bg-base-100 rounded-lg w-full max-w-[500px] max-h-screen h-auto overflow-auto">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
