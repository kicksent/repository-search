import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"; // we need this to make JSX compile

type RepositoryDetailsProps = {
  item: any;
  onClose: Dispatch<SetStateAction<null>>;
};

export const RepositoryDetails = ({
  item,
  onClose,
}: RepositoryDetailsProps) => {
  return (
    <div>
      <h2>
        <b>Details Page for item {item.id} </b>
      </h2>
      <button onClick={() => onClose(null)}>Close details</button>

      <table>
        {Object.keys(item).map(function (key) {
          return (
            <tr>
              <td>{key}</td> <td>{item[key]?.toString()}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
