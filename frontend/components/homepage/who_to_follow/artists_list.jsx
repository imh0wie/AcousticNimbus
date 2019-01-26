import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchRandomThreeUsers, emptyRandomThreeUsers } from "../../../actions/user_actions";
import { suggestedArtists } from "../../../util/user_api_util";
import ArtistsListItem from "./artists_list_item";

const msp = (state) => {
    const follows = state.entities.follows;
    const users = state.entities.users;
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        follows: follows,
        users: users,
        randomThree: suggestedArtists(users.randomThree),
        currentUserId: currentUserId,
        currentUser: users[currentUserId],
    });
}

const mdp = (dispatch) => {
    return ({
        fetchRandomThreeUsers: (currentUserId) => dispatch(fetchRandomThreeUsers(currentUserId)),
        emptyRandomThreeUsers: (state) => dispatch(emptyRandomThreeUsers(state)),
    });
}

class ArtistsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            randomThree: null,
            defaultState: {
                randomThree: null,
                [this.props.currentUserId]: this.props.currentUser,
            },
        };
    }

    componentDidMount() {
        this.props.fetchRandomThreeUsers(this.props.currentUserId);
        
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.users.randomThree && nextProps.users.randomThree) {
            this.setState({
                loading: false,
                randomThree: Object.values(nextProps.users.randomThree),
            })
        } else if (this.props.users.randomThree && !nextProps.users.randomThree) {
            this.setState({
                loading: true,
            });
            this.props.fetchRandomThreeUsers(this.props.currentUserId);
        } else if ((!this.props.follows && nextProps.follows) || (this.props.follows && nextProps.follows && Object.values(this.props.follows.interests).length !== Object.values(nextProps.follows.interests).length)) {
            this.props.emptyRandomThreeUsers(this.state.defaultState);
        }
    }

    componentWillUnmount() {
        this.props.emptyRandomThreeUsers(this.state.defaultState);
    }



    render() {
        if (this.state.loading || !this.state.randomThree) {
            return (
                <img src={window.loadingPizza} className="loading"></img>
            );
        } else {
            if (this.state.randomThree.length === 0) {
                return (
                    <div className="error-message">
                        <h4>We cannot recommend you any users because:</h4>
                        <p>1) you have followed all users on Acoustic Nimbus; OR</p>
                        <p>2) our site sucks and you are the only user...</p>
                    </div>
                );
            } else {
                return (
                    <ul>
                        {this.state.randomThree.map((artist) => {
                            return (
                                <ArtistsListItem 
                                    key={artist.id}
                                    artist={artist} 
                                />
                            );
                        })}
                    </ul>
                )
            }
        }
    } 
}

export default withRouter(connect(msp, mdp)(ArtistsList));