import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUser, emptyIndividualUser } from "../../actions/user_actions";
import { emptyLikes } from "../../actions/like_actions";
import { emptyFollows } from "../../actions/follow_actions";
import { emptyComments } from "../../actions/comment_actions";
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
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        likes: state.entities.likes,
        follows: state.entities.follows,
        users: users,
        onPageArtistId: onPageArtistId,
        onPageArtist: users.individualUser ? users.individualUser[onPageArtistId] : null,
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    });
};
  
const mdp = (dispatch) => {
    return ({
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        emptyIndividualUser: (defaultState) => dispatch(emptyIndividualUser(defaultState)),
        emptyLikes: (state) => dispatch(emptyLikes(state)),
        emptyFollows: (state) => dispatch(emptyFollows(state)),
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
        this.props.fetchUser(this.props.onPageArtistId);
        this.setState({
            loading: false,
        });
    }

    componentWillUnmount() {
        const defaultState = {
            // randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
            individualUser: null,
            [this.props.currentUserId]: this.props.currentUser,
            // followersOfSpecificUser: this.props.users && this.props.users.followersOfSpecificUser ? this.props.users.followersOfSpecificUser : null,
            // likersOfSpecificSong: this.props.users && this.props.users.likersOfSpecificSong ? this.props.users.likersOfSpecificSong : null,
        };
        this.props.emptyIndividualUser(defaultState);
        if (this.props.likes) this.props.emptyLikes(null);
        if (this.props.follows) this.props.emptyFollows(null);
        if (this.props.comments) this.props.emptyComments(null);
    }

    render() {
        if (this.state.loading || !this.props.onPageArtist) { // || !this.props.songs) {
            return <img src={window.loadingPizza} className="user-show-loading"></img>
        } else {
            return (
                <div className="user-show-page">
                    <Slideshow klass="user-show-page" onPageArtist={this.props.onPageArtist}/>
                    <div className="bar">
                        <Navbar klass="user-show-page" onPageArtistId={this.props.onPageArtistId}/>
                        <SocialElements klass="user-show-page" onPageArtistId={this.props.onPageArtistId}/>
                    </div>
                    <div className="content">
                        <div className="songs-list">
                            <SongsList klass="user-show-page" onPageArtist={this.props.onPageArtist}/>
                        </div>
                        <div className="sidebar">
                            <PopularitySection onPageArtist={this.props.onPageArtist}/>
                            <LikesSection klass="user-show-page" onPageArtist={this.props.onPageArtist} onPageArtistId={this.props.onPageArtistId}/>
                            <FollowersSection onPageArtist={this.props.onPageArtist} onPageArtistId={this.props.onPageArtistId}/>
                            <HiringInfoSection />
                        </div>
                    </div>
                </div>
            );
        } 
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));