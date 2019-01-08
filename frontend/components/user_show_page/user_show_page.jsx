import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUser, emptyIndividualUser } from "../../actions/user_actions";
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
        follows: state.entities.follows,
        users: users,
        onPageArtistId: onPageArtistId,
        onPageArtist: users.individualUser ? users.individualUser[onPageArtistId] : null,
        currentUserId: currentUserId,
        currentUser: state.entities.users[currentUserId],
    });
};
  
const mdp = (dispatch) => {
    return ({
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        emptyIndividualUser: (defaultState) => dispatch(emptyIndividualUser(defaultState)),
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
            randomThree: this.props.users.randomThreeUser,
            [this.props.currentUserId]: this.props.currentUser,
            individualUser: null,
        }
        this.props.emptyIndividualUser(defaultState);
        this.props.fetchUser(this.props.onPageArtistId);
        this.setState({
            loading: false,
        });
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
                        <SocialElements klass="user-show-page"/>
                    </div>
                    <div className="content">
                        <div className="songs-list">
                            <SongsList klass="user-show-page" onPageArtist={this.props.onPageArtist}/>
                        </div>
                        <div className="sidebar">
                            <PopularitySection onPageArtist={this.props.onPageArtist}/>
                            <LikesSection klass="user-show-page" onPageArtistId={this.props.onPageArtistId}/>
                            <FollowersSection onPageArtist={this.props.onPageArtist}/>
                            <HiringInfoSection />
                        </div>
                    </div>
                </div>
            );
        } 
    }
}

export default withRouter(connect(msp, mdp)(UserShowPage));