import React, { useState, Fragment } from "react";
import MetaData from "../MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/complaints/${keyword}`);
    } else {
      history.push("/complaints");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Complaints -- HOME" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Complaints ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;