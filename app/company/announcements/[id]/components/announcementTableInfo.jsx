import moment from "moment";

const AnnouncementTableInfo = (props) => {
  return (
    <div>
      <table className="table text-center">
        <tbody>
          {/* row 1 */}
          <tr>
            <th className="w-1/2">Nazwa stanowiska</th>
            <td>{props.announcement.name}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th className="w-1/2">Opis</th>
            <td>{props.announcement.description}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th className="w-1/2">Data zakończenia</th>
            <td>
              {moment
                .utc(props.announcement.data_zakonczenia)
                .format("DD.MM.YYYY")}
            </td>
          </tr>
          {/* row 4 */}
          <tr>
            <th className="w-1/2">Kategoria</th>
            <td>{props.announcement.category.category_name}</td>
          </tr>
          {/* row 5 */}
          <tr>
            <th className="w-1/2">Rodzaj umowy</th>
            <td>{props.announcement.contract.contract_name}</td>
          </tr>
          {/* row 6 */}
          <tr>
            <th className="w-1/2">Wymiar czasowy</th>
            <td>{props.announcement.work_time.work_time_name}</td>
          </tr>
          {/* row 7 */}
          <tr>
            <th className="w-1/2">Typ pracy</th>
            <td>{props.announcement.work_type.work_type_name}</td>
          </tr>
          {/* row 8 */}
          <tr>
            <th className="w-1/2">Wynagrodzenie</th>
            <td>
              {props.announcement.min_earn === null
                ? "Brak informacji"
                : props.announcement.max_earn === null
                ? props.announcement.min_earn +
                  " zł " +
                  props.announcement.earn_time.earn_time_name
                : props.announcement.min_earn +
                  " zł - " +
                  props.announcement.max_earn +
                  " zł " +
                  props.announcement.earn_time.earn_time_name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementTableInfo;
