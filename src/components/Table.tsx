import React, { useCallback, useState } from "react"; // we need this to make JSX compile
import { useHistory } from "react-router";
import { Item } from "../components/Search";
import { RepositoryDetails } from "../pages/RepositoryDetails";

type TableProps = { items: Item[]; desiredCols: string[] };

export const Table = ({ items, desiredCols }: TableProps) => {
  const [input, setInput] = useState("");
  const [currentItem, setCurrentItem] = useState(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event?.target.value);
  };

  let history = useHistory();

  const displayItemDetails = (item: any) => {
    if (item) setCurrentItem(item);
    else setCurrentItem(null);
  };

  return (
    <>
      {currentItem ? (
        <RepositoryDetails item={currentItem} onClose={setCurrentItem} />
      ) : (
        items && (
          <table>
            <tr>
              {desiredCols.map((col) => {
                return (
                  <>
                    <td>
                      <b>{col}</b>
                    </td>
                  </>
                );
              })}
            </tr>
            {items.map((item: any) => {
              return (
                <tr>
                  {desiredCols.map((col) => {
                    if (col === "details") {
                      return (
                        <>
                          <td>
                            <button onClick={() => displayItemDetails(item)}>
                              View Details
                            </button>
                          </td>
                        </>
                      );
                    }
                    if (col === "url") {
                      return (
                        <>
                          <td>
                            <a href={item[col]}>{item[col]}</a>
                          </td>
                        </>
                      );
                    }
                    return (
                      <>
                        <td>{item[col]}</td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        )
      )}
    </>
  );
};
