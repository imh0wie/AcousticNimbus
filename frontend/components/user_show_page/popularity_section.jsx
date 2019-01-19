import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const msp = (state) => {
    return({
        follows: state.entities.follows,
        currentUserId: state.session.id,
    })
}

class PopularitySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFollow: Object.values(this.props.onPageArtist.attentions).find(follow => follow.followerId === this.props.currentUserId),
            followersCount: this.props.onPageArtist.followersCount,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.props.follows && nextProps.follows && nextProps.follows.interests) || (this.props.follows && Object.keys(this.props.follows.interests).length !== Object.keys(nextProps.follows.interests).length)) {
            this.setState({
                currentFollow: Object.values(nextProps.follows.interests).find(follow => follow.followedUserId === this.props.onPageArtist.id),
                followersCount: this.state.currentFollow ? this.state.followersCount - 1 : this.state.followersCount + 1,
            })
        }
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
    
    render() {
        return (
            <div className="popularity-section">
                <div className="data">
                    <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Followers</p>
                        <p className="number">{this.renderNumber(this.state.followersCount)}</p>
                    </Link>
                    <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Following</p>
                        <p className="number">{this.renderNumber(this.props.onPageArtist.followingsCount)}</p>
                    </Link>
                    <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Songs</p>
                        <p className="number">{this.renderNumber(this.props.onPageArtist.songsCount)}</p>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default withRouter(connect(msp, null)(PopularitySection));