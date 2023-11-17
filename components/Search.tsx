import React from "react";

function Search() {
  return (
    <div className="flex col-2 justify-start mb-2 mx-1">
      <div className="search-box me-4 col-12 ">
        <div className="position:relative mb-2 flex">
          <input
            type={"number"}
            className="border-dark"
            onChange={(e) => {}}
          />
          <i className="bx bx-search-alt search-icon " />
        </div>
      </div>
    </div>
  );
}

export default Search;
