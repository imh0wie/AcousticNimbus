import React from "react";
import { Link, withRouter } from "react-router-dom";

class PopularitySection extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <div className="popularity-section">
                <div className="data">
                    <Link to="" onClick={(e) => e.preventDefault()}>
                        <p className="type">Followers</p>
                        <p className="number">{this.renderNumber(this.props.onPageArtist.followersCount)}</p>
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

export default withRouter(PopularitySection);