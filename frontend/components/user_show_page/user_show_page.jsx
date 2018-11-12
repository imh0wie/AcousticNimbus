import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchFollows } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
import Slideshow from "../common_components/slideshow"
import Navbar from "../common_components/navbar";
import SocialElements from "../common_components/social_elements";
import SongsList from "../common_components/songs_list/songs_list";
import PopularitySection from "./popularity_section";
import LikesSection from "../common_components/likes_section";
import FollowersSection from "./followers_section";
import HiringInfoSection from "../common_components/hiring_info_section";

const msp = (state, ownProps) => {
    return ({
        onPageArtist: state.entities.users[parseInt(ownProps.match.params.userId)],
    });
};
  
const mdp = (dispatch) => {
    return ({
        fetchFollows: () => dispatch(fetchFollows()),
        fetchUsers: () => dispatch(fetchUsers()),
    });
};

class UserShowPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers().then(this.props.fetchFollows()); // for banner showing first
    }

    render() {
        if (this.props.onPageArtist) {
            return (
                <div className="user-show-page">
                    <Slideshow klass="user-show-page" />
                    <div className="bar">
                        <Navbar klass="user-show-page" />
                        <SocialElements klass="user-show-page" />
                    </div>
                    <div className="content">
                        <div className="songs-list">
                            <SongsList  klass="user-show-page" />
                        </div>
                        <div className="sidebar">
                            <PopularitySection />
                            <LikesSection klass="user-show-page"/>
                            <FollowersSection />
                            <HiringInfoSection />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <img src={window.loading5} className="user-show-loading"></img>
        }
        
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));