import React from "react";
import { ResultProps } from "../models/dataModels";

const SearchResults = (props: ResultProps) => {
  return (
    <div className="resultComponent">
      <h3>Lego Set Found</h3>
      <div className="resultsSection">
        <div className="searchResults">
          <div>
            <ul className="resultFields">
              <li>Name:</li>
              <li>Year Released:</li>
              <li>Theme Name:</li>
              <li>Number of Parts:</li>
            </ul>
          </div>
          <div>
            <ul className="resultInfo">
              <li>{props.result.name}</li>
              <li>{props.result.year}</li>
              <li>{props.result.themeName}</li>
              <li>{props.result.num_parts}</li>
            </ul>
          </div>
        </div>
        </div>
    </div>
  );
};

export default SearchResults;
