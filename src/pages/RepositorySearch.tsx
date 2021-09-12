import React, { useState } from "react"; // we need this to make JSX compile
import { Search } from "../components/Search";

type RepositorySearch = {};

export const RepositorySearch = ({}: RepositorySearch) => {
  const [input, setInput] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event?.target.value);
  };

  return (
    <div>
      <Search input={input} onChangeInput={handleChangeInput} />
    </div>
  );
};
