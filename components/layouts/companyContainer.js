const CompanyContainer = (props) => {
  return (
    <div className="z-10 py-7 pt-[80px] px-5 mx-auto">
      <div className="max-w-[1200px] mx-auto xl:ml-[18rem] 3xl:mx-auto">
        {props.children}
      </div>
    </div>
  );
};

export default CompanyContainer;
