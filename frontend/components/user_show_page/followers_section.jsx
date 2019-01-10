import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchFollowersOfSpecificUser, emptyFollowersOfSpecificUser } from "../../actions/user_actions";
import { followsOf } from "../../util/follow_api_util";
import BubblesList from "../common_components/bubbles_list/bubbles_list";

// const msp = (state, ownProps) => {
//     return ({
//         currentFollows: followsOf(parseInt(ownProps.match.params.userId), state.entities.follows), 
//         // not grabbing followers directly for transition between header and content (loading)
//     });
// }

// const FollowersSection = (props) => {
//     return (
//         <div className="followers-section">
//             <div className="header">
//                 <p><i className="fas fa-user"></i> {props.currentFollows ? props.currentFollows.length : "0"} {(!props.currentFollows || !(props.currentFollows.length > 1)) ? "follower" : "followers"}</p>
//                 <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
//             </div>
//             <BubblesList klass="user-show-page" items={Object.values(props.onPageArtist.followers)} />
//         </div>
//     );
// }
const msp = (state) => {
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        follows: state.entities.follows,
        followers: users && users.followersOfSpecificUser ? Object.values(users.followersOfSpecificUser) : null,
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    })
}

const mdp = (dispatch) => {
    return {
        fetchFollowersOfSpecificUser: (userId) => dispatch(fetchFollowersOfSpecificUser(userId)),
        emptyFollowersOfSpecificUser: (defaultState) => dispatch(emptyFollowersOfSpecificUser(defaultState)),
    };
}
class FollowersSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            followers: Object.values(this.props.onPageArtist.followers),
            followed: this.props.onPageArtist.attentions[this.props.currentUserId] ? true : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if ((!this.props.follows && nextProps.follows.interests) || (this.props.follows && nextProps.follows && Object.keys(this.props.follows.interests).length !== Object.keys(nextProps.follows.interests).length)) {
            if (this.state.followed) {
                debugger
                const idx = this.state.followers.findIndex(follower => follower.id === this.props.currentUserId);
                this.setState({
                    followers: this.state.followers.length === 1 ? [] : this.state.followers.slice(0, idx).concat(this.state.followers.slice(idx + 1)),
                    followed: !this.state.followed,
                });
            } else {
                debugger
                this.setState({
                    followers: this.state.followers.concat([this.props.currentUser]),
                    followed: !this.state.followed,
                });
            }
        } 
        // if (!this.state.loading && nextProps.follows.interests) {
        //     debugger
        //     this.props.fetchFollowersOfSpecificUser(this.props.onPageArtistId);
        //     this.setState({
        //         loading: true,
        //     });
        //     debugger
        // } else if (this.state.loading && nextProps.users && nextProps.users.followersOfSpecificUser) {
        //     debugger
        //     this.setState({
        //         loading: false,
        //         followers: Object.values(nextProps.users.followersOfSpecificUser),
        //     })
        // }
    }

    
    // componentDidMount() {
    //     const defaultState = {
    //         randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
    //         [this.props.currentUserId]: this.props.currentUser,
    //         individualUser: null,
    //         followersOfSpecificUser: this.props.users && this.prop.users.followersOfSpecificUser ? this.prop.users.followersOfSpecificUser : null,
    //         likersOfSpecificSong: this.props.users && this.props.users.likersOfSpecificSong ? this.props.users.likersOfSpecificSong : null,
    //     };
    //     this.props.emptyFollowersOfSpecificUser(defaultState);
    //     // this.setState({
    //     //     counter: this.state.counter + 1,
    //     // })
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (this.state.loading && nextProps.followers && Object.keys(nextProps.followers).includes("followersOfSpecificUser") && !nextProps.followers.followersOfSpecificUser) {
    //         this.props.fetchFollowersOfSpecificUser(this.props.onPageArtistId);
    //     } else if (this.state.loading && nextProps.followers.followersOfSpecificUser) {
    //         this.setState({
    //             loading: false,
    //             followers: Object.values(nextProps.followers.followersOfSpecificUser),
    //         })
    //     } else if (!this.props.follows && nextProps.follows.interests) {
    //         const defaultState = {
    //             randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
    //             [this.props.currentUserId]: this.props.currentUser,
    //             individualUser: null,
    //             followersOfSpecificUser: this.props.users && this.prop.users.followersOfSpecificUser ? this.prop.users.followersOfSpecificUser : null,
    //             likersOfSpecificSong: this.props.users && this.props.users.likersOfSpecificSong ? this.props.users.likersOfSpecificSong : null,
    //         };
    //         this.props.emptyFollowersOfSpecificUser(defaultState);
    //         this.setState({
    //             loading: true,
    //         });
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (this.state.loading && nextProps.followers && Object.keys(nextProps.followers).includes("followersOfSpecificUser") && !nextProps.followers.followersOfSpecificUser) {
    //         this.props.fetchFollowersOfSpecificUser(this.props.onPageArtistId);
    //     } else if (this.state.loading && nextProps.followers.followersOfSpecificUser) {
    //         this.setState({
    //             loading: false,
    //             followers: Object.values(nextProps.followers.followersOfSpecificUser),
    //         })
    //     } else if (!this.props.follows && nextProps.follows.interests) {
    //         const defaultState = {
    //             randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
    //             [this.props.currentUserId]: this.props.currentUser,
    //             individualUser: null,
    //             followersOfSpecificUser: this.props.users && this.prop.users.followersOfSpecificUser ? this.prop.users.followersOfSpecificUser : null,
    //             likersOfSpecificSong: this.props.users && this.props.users.likersOfSpecificSong ? this.props.users.likersOfSpecificSong : null,
    //         };
    //         this.props.emptyFollowersOfSpecificUser(defaultState);
    //         this.setState({
    //             loading: true,
    //         });
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if ((!this.props.follows && nextProps.follows) || (this.props.follows && nextProps.follows && Object.keys(this.props.follows.interests) !== Object.keys(nextProps.follows)) {
    //     }
    //     if (this.counter === 1) {
    //         c
    //         this.counter += 1;
    //     } else if (this.counter === 2 && nextProps.users.followersOfSpecificUser) {
    //         this.setState({
    //             loading: false,
    //             followers: Object.values(nextProps.users.followersOfSpecificUser),
    //         })
    //         this.counter += 1;
    //     } else if (this.counter % 3 === 0 && ((!this.props.follows && nextProps.follows) || (this.props.follows && nextProps.follows && Object.keys(this.props.follows.interests).length !== Object.keys(nextProps.follows.interests).length))) {
    //         this.setState({
    //             loading: true,
    //         });
    //         this.props.emptyFollowersOfSpecificUser(this.defaultState);
    //         this.counter += 1;
    //     } else if (this.counter % 3 === 1) {
    //         this.props.fetchFollowersOfSpecificUser(this.props.onPageArtistId);
    //         this.counter += 1;
    //     } else if (this.counter % 3 === 2) {
    //         this.setState({
    //             loading: false,
    //             followers: Object.values(nextProps.users.followersOfSpecificUser),
    //         });
    //         this.counter += 1;
    //     // }
    // }
    renderList() {
        if (this.state.loading || !this.state.followers) {
            return <img src={window.loadingPizza} className="loading-sm"></img>;
        } else {
            return <BubblesList klass="user-show-page" items={this.state.followers}/>;
        }
    }

    render() {
        return (
            <div className="followers-section">
                <div className="header">
                    <p><i className="fas fa-user"></i> {this.state.followers ? this.state.followers.length : "0"} {(!this.state.followers || !(this.state.followers.length > 1)) ? "follower" : "followers"}</p>
                    <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
                </div>
                {this.renderList()}
            </div>
        );
    }

}

export default withRouter(connect(msp, mdp)(FollowersSection))