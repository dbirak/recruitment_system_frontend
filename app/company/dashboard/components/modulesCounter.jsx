const ModulesCounter = (props) => {
  return (
    <div>
      <div className="text-[23px]">
        <table className="max-w-[1000px] table mx-auto mb-2">
          <tbody>
            <tr className="border-none">
              <td colSpan={3} className="text-center text-[23px] pb-6">
                <span className="font-semibold">Liczba modułów: </span>
                {props.statistics.modules_count}
              </td>
            </tr>
            <tr>
              <td className="text-center w-1/3 border-r-2 border-dotted border-neutral text-violet-800">
                <span className="font-semibold">Testy</span>
                <div className="text-center text-[50px] font-semibold mt-6">
                  {props.statistics.tests_count}
                </div>
              </td>
              <td className="text-center w-1/3 border-r-2 border-dotted border-neutral text-purple-800">
                <span className="font-semibold">Pytania otwarte</span>
                <div className="text-center text-[50px] font-semibold mt-6">
                  {props.statistics.open_tasks_count}
                </div>
              </td>
              <td className="text-center w-1/3 text-fuchsia-800">
                <span className="font-semibold">Przesyłanie plików</span>
                <div className="text-center text-[50px] font-semibold mt-6">
                  {props.statistics.file_tasks_count}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModulesCounter;
