import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { shuffleQueue, removeSongFromQueue } from "../../../../actions/queue_actions";
import QueueItem from "./queue_item";

const msp = (state) => {
    return {
        player: state.ui.player,
        queue: state.ui.queue,
        currentSong: state.ui.currentSong,
    }
}

const mdp = (dispatch) => {
    return {
        shuffleQueue: () => dispatch(shuffleQueue()),
        removeSongFromQueue: (song) => dispatch(removeSongFromQueue(song)),
    }
}

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: null,
            loading: true,
            isShuffled: false,
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

    componentWillReceiveProps(nextProps) {
        if (this.props.player.shuffle !== nextProps.player.shuffle) {
            if (nextProps.player.shuffle) {
                this.props.shuffleQueue();
                this.setState({
                    isShuffled: true,
                    loading: true,
                })
            } else {
                this.setState({
                    loading: true,
                })
                setTimeout(() => this.setState({
                    queue: nextProps.queue.unshuffled,
                    loading: false,
                }), 1000)
            }
        }
        if (this.state.isShuffled) {
            setTimeout(() => this.setState({
                queue: nextProps.queue.shuffled,
                isShuffled: false,
                loading: false,
            }), 1000);
        }
        if (this.props.queue && nextProps.queue && this.props.queue.shuffled.length !== nextProps.queue.shuffled.length) {
            this.setState({
                queue: nextProps.player.shuffle ? nextProps.queue.shuffled : nextProps.queue.unshuffled,
            })
        }
    }

    render() {
        if (this.state.loading || !this.state.queue) {
            return <img src={window.loadingPizza} className="loading"></img>
        } else {
            if (this.state.queue.length === 0) {
                return <p>There are no songs in the queue so far.</p>
            } else {
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