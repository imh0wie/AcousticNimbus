import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs } from "../../actions/song_actions";
import { songsOf } from "../../util/song_api_util";
import { followersOf, followedUsersOf } from "../../util/follow_api_util";
import { isEmpty } from "../../util/general_api_util";

const msp = (state, ownProps) => {
    const onPageArtistId = parseInt(ownProps.match.params.userId);
    const follows = state.entities.follows;
    const users = state.entities.users;
    return ({
        songs: state.entities.songs,
        follows: state.entities.follows,
        currentSongs: songsOf(onPageArtistId, state.entities.songs),
        currentFollowers: followersOf(onPageArtistId, follows, users),
        currentFollowings: followedUsersOf(onPageArtistId, follows, users),
    });
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
    })
}

class PopularitySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchSongs();
        this.setState({
            loading: false,
        })
    }

    renderNumber(num) {
        if (num < 1000) {
            return num.toString();
        } else if (num < 10000) {
            return `${Math.floor(num / 1000).toString()},${Math.floor(num % 1000).toString()}`;
        } else if (num < 1000000){
            const integer = Math.floor(num / 1000);
            const decimal = Math.floor((Math.floor(num % 1000) - Math.floor(num % 100)) / 100);
            const number = decimal === 0 ? `${integer} K`: `${integer}.${decimal} K`;
            return number;
        } else if (num < 1000000000){
            const integer = Math.floor(num / 1000000);
            const decimal = Math.floor((Math.floor(num % 1000000) - Math.floor(num % 100000)) / 100000);
            const number = decimal === 0 ? `${integer} M`: `${integer}.${decimal} M`;
            return number;
        }
    }
    
    render () {
        if (this.state.loading) {
            return (
                <div className="popularity-section">
                    <img src={window.loadingPizza} className="loading"></img>
                </div>
            );
        }
        return (
            <div className="popularity-section">
               <div className="data">
                   <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Followers</p>
                        <p className="number">{isEmpty(this.props.follows) ? 0 : this.renderNumber(this.props.currentFollowers.length)}</p>
                   </Link>
                   <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Following</p>
                        <p className="number">{isEmpty(this.props.follows) ? 0 : this.renderNumber(this.props.currentFollowings.length)}</p>
                   </Link>
                   <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Songs</p>
                        <p className="number">{isEmpty(this.props.songs) ? 0 : this.renderNumber(this.props.currentSongs.length)}</p>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(PopularitySection))