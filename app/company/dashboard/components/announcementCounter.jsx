const AnnouncementCounter = (props) => {
  return (
    <div>
      <table className="max-w-[1000px] table mx-auto mb-2">
        <tbody>
          <tr className="border-none">
            <td colSpan={3} className="text-center text-[23px] pb-6">
              <span className="font-semibold">Liczba ogłoszeń: </span>
              {props.statistics.announcement_count}
            </td>
          </tr>
          <tr>
            <td className="text-center w-1/3 border-r-2 border-dotted border-neutral text-green-800">
              <span className="font-semibold">Aktywne ogłoszenia</span>
              <div className="text-center text-[50px] font-semibold mt-6">
                {props.statistics.active_announcement_count}
              </div>
            </td>
            <td className="text-center w-1/3 border-r-2 border-dotted border-neutral text-yellow-800">
              <span className="font-semibold">W trakcie rekrutacji</span>
              <div className="text-center text-[50px] font-semibold mt-6">
                {props.statistics.in_announcement_count}
              </div>
            </td>
            <td className="text-center w-1/3 text-red-800">
              <span className="font-semibold">Zakończone ogłoszenia</span>
              <div className="text-center text-[50px] font-semibold mt-6">
                {props.statistics.end_announcement_count}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementCounter;
