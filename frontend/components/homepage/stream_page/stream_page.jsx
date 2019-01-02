import React from "react";
import SongsList from "../../common_components/songs_list/songs_list";  

const StreamPage = () => {
  return (
    <div className="stream-page-container">
      <h4 className="header">Hear the latest posts from the people you are following: </h4>
      <SongsList  klass={"stream-page"}/>
    </div>
  );
}

export default StreamPage;
