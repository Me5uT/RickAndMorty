/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SearchInput } from "./components/SearchInput";

const App: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 33px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchInput />
    </div>
  );
};

export default App;
