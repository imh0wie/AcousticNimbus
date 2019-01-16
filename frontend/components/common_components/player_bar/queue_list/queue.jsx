import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { shuffleQueue } from "../../../../actions/queue_actions";
import { songsByCreationDate } from "../../../../util/song_api_util";
import { randomize } from "../../../../util/general_api_util";
import QueueItem from "./queue_item";

const msp = (state) => {
    // const queue = state.ui.queue;
    return {
        player: state.ui.player,
        queue: state.ui.queue,
        // queue: state.ui.player.shuffle ? queue.shuffled : queue.unshuffled,
    }
}

const mdp = (dispatch) => {
    return {
        shuffleQueue: () => dispatch(shuffleQueue()),
    }
}

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: null,
            loading: true,
        }
    }

    componentDidMount() {
        if (this.props.player.shuffle) {
            setTimeout(() => this.setState({
                queue: this.props.queue.shuffled,
                loading: false,
            }), 1000);
        } else {
            setTimeout(() => this.setState({
                queue: this.props.queue.unshuffled,
                loading: false,
            }), 1000);
        }
    }

    render() {
        if (this.state.loading || !this.state.queue) {
            return <img src={window.loadingPizza} className="loading"></img>
        } else {
            if (this.state.queue.length === 0) {
                return <p>There are no songs in the queue so far.</p>
            } else {
                debugger
                return (
                    <ul>
                        {this.state.queue.map((song, i) => {
                            return (
                                <QueueItem
                                key={i}
                                song={song}
                                />
                            );
                        }) }
                    </ul>
                );
            }
        }
    }
}

export default withRouter(connect(msp, mdp)(Queue));