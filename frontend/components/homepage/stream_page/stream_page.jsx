import React from "react";
import StreamList from "./stream_list/stream_list";

const StreamPage = () => {
  return (
    <div className="stream-page-container">
      <h4 className="header">Hear the latest posts from the people you are following: </h4>
      <StreamList />
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default StreamPage;
