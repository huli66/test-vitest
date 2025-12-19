import type {FC} from "react";
import './style.css';

type Student = {
  id?: number;
  name?: string;
};
interface PropsType {
  stus: Student[];
}
const Results: FC<PropsType> = ({stus}) => {
  return (
    <div className="search">
      {!stus.length ? (
        <h1>No Data</h1>
      ) : (
        stus.map((stu: Student) => {
          return (
            <div key={stu.id}>
              <div className="info">
                <h1>{stu.name}</h1>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Results;
