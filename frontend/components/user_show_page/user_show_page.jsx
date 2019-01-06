import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSongsOf, emptySongsOfSpecificUser } from "../../actions/song_actions";
import { fetchFollows } from "../../actions/follow_actions";
import { fetchUser, fetchUsers } from "../../actions/user_actions";
import Slideshow from "../common_components/slideshow"
import Navbar from "../common_components/navbar";
import SocialElements from "../common_components/social_elements";
import SongsList from "../common_components/songs_list/songs_list";
import PopularitySection from "./popularity_section";
import LikesSection from "../common_components/likes_section";
import FollowersSection from "./followers_section";
import HiringInfoSection from "../common_components/hiring_info_section";

const msp = (state, ownProps) => {
    const users = state.entities.users;
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    return ({
        songs: state.entities.songs,
        follows: state.entities.follows,
        users: users,
        onPageArtistId: onPageArtistId,
        onPageArtist: users[onPageArtistId]
    });
};
  
const mdp = (dispatch) => {
    return ({
        fetchSongsOf: (userId) => dispatch(fetchSongsOf(userId)),
        fetchFollows: () => dispatch(fetchFollows()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        emptySongsOfSpecificUser: (userId) => dispatch(emptySongsOfSpecificUser(userId))
    });
};

class UserShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const defaultState = {
            followedSongs: this.props.songs ? this.props.songs.followedSongs : null,
            likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
        }
        this.props.emptySongsOfSpecificUser(defaultState);
        this.props.fetchUser(this.props.onPageArtistId);
        this.props.fetchSongsOf(this.props.onPageArtistId);
        // if (Object.keys(this.props.users).length === 1 || !this.props.users) this.props.fetchUsers();
        // if (!this.props.follows) this.props.fetchFollows();
        // this.props.fetchUsers().then(this.props.fetchFollows()); // for banner showing first
        this.setState({
            loading: false,
        });
    }

    render() {
        if (this.state.loading || !this.props.songs || !this.props.onPageArtist) {
            return <img src={window.loadingPizza} className="user-show-loading"></img>
        } else {
            return (
                <div className="user-show-page">
                    <Slideshow klass="user-show-page" onPageArtist={this.props.onPageArtist} />
                    <div className="bar">
                        <Navbar klass="user-show-page" onPageArtistId={this.props.onPageArtistId} />
                        <SocialElements klass="user-show-page" />
                    </div>
                    <div className="content">
                        <div className="songs-list">
                            <SongsList klass="user-show-page" />
                        </div>
                        <div className="sidebar">
                            {/* <PopularitySection /> */}
                            {/* <LikesSection klass="user-show-page"/> */}
                            {/* <FollowersSection /> */}
                            {/* <HiringInfoSection /> */}
                        </div>
                    </div>
                </div>
            );
        } 
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));