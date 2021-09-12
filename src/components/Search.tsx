import { useCallback, useEffect, useState } from "react"; // we need this to make JSX compile
import { githubApiClient } from "../clients/githubSearchApi";
import debounce from "lodash.debounce";
import { useHistory } from "react-router-dom";
import { Table } from "./Table";

type SearchProps = {
  input: string;
  onChangeInput: (event: any) => void;
};

export interface Item {
  id: string;
  forks: string;
}

export const Search = ({ input, onChangeInput }: SearchProps) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [starSort, setStarSort] = useState(false);
  const [language, setLanguage] = useState("");

  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const result: any = await githubApiClient.getSearchResults(
        input,
        starSort,
        language
      );
      console.log(result);
      setCount(result?.total_count);
      setItems(result?.items);
    };
    fetchData();
  }, [input, starSort, language]);

  const debouncedChangeHandler = useCallback(debounce(onChangeInput, 300), []);

  const desiredCols = [
    "id",
    "forks",
    "stargazers_count",
    "watchers_count",
    "url",
    "details",
    "language",
  ];

  return (
    <div>
      <div className="searchInput">
        <h2>Searching for {input}</h2>
        <input
          type="text"
          placeholder="search..."
          onChange={debouncedChangeHandler}
        />
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          value={"starSort"}
          checked={starSort}
          onChange={() => setStarSort(!starSort)}
        />
        <label htmlFor={"starSort"}>Sort by Stars</label>
      </div>
      <div className="radio-container">
        <div className="radio">
          <label>
            <input
              type="radio"
              value="option1"
              checked={language === "python"}
              onClick={() => setLanguage("python")}
            />
            python
          </label>
          <label>
            <input
              type="radio"
              value="option2"
              checked={language === "js"}
              onClick={() => setLanguage("js")}
            />
            js
          </label>
          <label>
            <input
              type="radio"
              value="option3"
              checked={language === "assembly"}
              onClick={() => setLanguage("assembly")}
            />
            assembly
          </label>
        </div>
      </div>

      {items && (
        <p>
          Displaying first <b>{items.length}</b> results...
        </p>
      )}
      <p>
        Sorting by <b>{starSort ? "stars" : "best(default)"}</b>
      </p>
      <p>
        Total results count: <b>{count ? count : 0}</b>
      </p>
      <Table items={items} desiredCols={desiredCols} />
    </div>
  );
};
