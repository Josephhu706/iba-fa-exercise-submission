import React, { useState, useEffect, FormEvent } from "react";
import { csv, DSVRowArray } from "d3";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import Button from "@mui/material/Button";
import SearchResults from "./SearchResults";
import { SearchResult } from "../models/dataModels";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "&:hover label": {
    fontWeight: 700,
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const SearchInput = () => {
  const [sets, setSets] = useState<DSVRowArray>();
  const [themes, setThemes] = useState<DSVRowArray>();
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<SearchResult>();
  const [error, setError] = useState<string>("");
  useEffect(() => {
    csv("data/sets.csv").then((data) => setSets(data));
    csv("data/themes.csv").then((data) => {
      setThemes(data);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchLego = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sets && themes) {
      let searchIndex = sets.findIndex((row) => row.set_id == search);
      let setsResult = sets[searchIndex];
      if (setsResult) {
        let themeIndex = themes.findIndex(
          (row) => row.id == setsResult.theme_id
        );
        let themesResult = themes[themeIndex];
        setResult({
          themeName: themesResult.name,
          name: setsResult.name,
          year: setsResult.year,
          num_parts: setsResult.num_parts,
        });
      } else {
        setResult(undefined);
        setError("No Results Found");
      }
    }
    setSearch("");
  };
  return (
    <div className="searchSection">
      <form className="searchForm" onSubmit={searchLego}>
        <div className="formContents">
          <StyledTextField
            className="searchInput"
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleChange}
          />
          <Button
            className="searchButton"
            variant="contained"
            endIcon={<Search />}
            type="submit"
            size="large"
          >
            Search
          </Button>
        </div>
      </form>
      <div className="resultSection">
        {result ? (
          <SearchResults result={result}></SearchResults>
        ) : (
          <h3>{error}</h3>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
