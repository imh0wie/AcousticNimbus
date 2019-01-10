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
    return ({
        followers: users && users.followersOfSpecificUser ? Object.values(users.followersOfSpecificUser) : null,
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
            loading: true,
        }
    }

    componentDidMount() {
        this.defaultState = {
            randomThree: this.props.users && this.props.users.randomThree ? this.props.users.randomThree : null,
            [this.props.currentUserId]: this.props.currentUser,
            individualUser: null,
            followersOfSpecificUser: this.props.users && this.prop.users.followersOfSpecificUser ? this.prop.users.followersOfSpecificUser : null,
            likersOfSpecificSong: this.props.users && this.props.users.likersOfSpecificSong ? this.props.users.likersOfSpecificSong : null,
        };
        this.promisfy(() => this.props.emptyFollowersOfSpecificUser(this.defaultState)).then(() => {
            this.props.fetchFollowersOfSpecificUser(this.props.onPageArtistId).then(() => {
                this.setState({
                    loading: false,
                });
            })    
        });
        // this.setState({
        //     counter: this.state.counter + 1,
        // })
    }

    promisfy(callback) {
        return new Promise(() => {
            callback();
        })
    }

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

    render() {
        if (this.state.loading || !this.props.followers) {
            return <img src={window.loadingPizza} className="loading-sm"></img>;
        } else {
            return (
                <div className="followers-section">
                    <div className="header">
                        <p><i className="fas fa-user"></i> {this.props.followers ? this.props.followers.length : "0"} {(!this.props.followers || !(this.props.followers.length > 1)) ? "follower" : "followers"}</p>
                        <Link to="" onClick={(e) => e.preventDefault()}>View all</Link>
                    </div>
                    <BubblesList klass="user-show-page" items={this.props.followers} />
                </div>
            );
        }
    }

}

export default withRouter(connect(msp, mdp)(FollowersSection))