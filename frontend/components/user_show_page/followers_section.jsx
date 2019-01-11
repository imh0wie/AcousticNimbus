import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import BubblesList from "../common_components/bubbles_list/bubbles_list";

const msp = (state) => {
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        follows: state.entities.follows,
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    })
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
    }

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

export default withRouter(connect(msp, null)(FollowersSection))