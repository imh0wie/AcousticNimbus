import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";
import Navbar from "../common_components/navbar";
import UploadForm from "./upload_form";
import SongsEditPage from "./songs_edit_page/songs_edit_page";

const SongsMgmtPage = () => {
  return (
    <div className="songs-mgmt-page">
      <Navbar klass="songs-mgmt-page"/>
      <Switch>
        <ProtectedRoute exact path="/upload" component={UploadForm} />
        <ProtectedRoute exact path="/you/songs" component={SongsEditPage} />
      </Switch>
    </div>
  );
};

export default withRouter(SongsMgmtPage);