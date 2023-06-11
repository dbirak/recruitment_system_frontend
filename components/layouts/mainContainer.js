const MainContainer = (props) => {
  return (
    <div className="max-w-[1200px] py-7 pt-[80px] px-5 mx-auto">
      {props.children}
    </div>
  );
};

export default MainContainer;
