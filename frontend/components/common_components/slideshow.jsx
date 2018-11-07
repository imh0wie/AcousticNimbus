import React from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.min.css';
import { randomize } from "../../util/general_api_util";
import { Carousel } from 'react-responsive-carousel';
 
class Slideshow extends React.Component {
    constructor(props) {
        super(props);
        this.userBanners = [window.user_banner1, window.user_banner2];
        this.songBanners = [window.song_banner1, window.song_banner2];
    }

    randomUserBanner() {
        return randomize(this.userBanners)[0];
    }

    render() {
        switch (this.props.klass) {
            case "banner":
                return (
                    <Carousel className="carousel"
                        infiniteLoop autoPlay
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        swipable={true}
                        interval={6000}
                    >
                        <div>
                            <img src={window.carousel1} />
                            <div className="message">
                                <h1>Discover more with AcousticNimbus Go+</h1>
                                <h2>AcousticNimbus Go+ lets you listen offline, ad-free, with over 150 million tracks — and growing.</h2>
                                <div className="buttons">
                                    <button>Learn More</button>
                                    <button className="free-trial">Try It Free for 30 years</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={window.carousel2} />
                            <div className="message">
                                <h1>What's next in music is first on AcousticNimbus</h1>
                                <h2>Upload your first track and begin your journey. AcousticNimbus gives you space to create, find your fans, and connect with other artists.</h2>
                                <button className="button">Start uploading today</button>
                            </div>
                        </div>
                    </Carousel>
                );
            case "ad":
                return (
                    <Carousel className="ad"
                        infiniteLoop autoPlay
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        swipable={true}
                        interval={8000}
                    >
                        <div>
                            <img src={window.ad1} />
                            <div className="ad1">
                                <p>Looking for a Software Engineer?</p>
                            </div>
                        </div>
                        <div>
                            <img src={window.ad2} />
                            <div className="logos">
                                <div className="upper">
                                    <a href="https://www.linkedin.com/in/howie-chan"><img src={window.linkedin} className="logo"></img></a>
                                    <a href="https://github.com/h0wiechan"><img src={window.github} className="logo"></img></a>
                                </div>
                                <a href="https://angel.co/h0wiechan"><img src={window.angellist} className="logo"/></a>
                            </div>
                        </div>
                    </Carousel>
                );
            case "user-show-page":
            debugger
                return (
                    <Carousel className="banner-container"
                        autoPlay={false}
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        showIndicators={false}
                        swipable={false}
                    >
                        <div className="banner">
                            <img src={this.randomUserBanner()} />
                            <div className="artist-info-container">
                                <img src={this.props.onPageArtist.imageURL ? this.props.onPageArtist.imageURL : window.user_dp} ></img>
                                <div className="artist-info">
                                    <p className="username">{this.props.onPageArtist.username}</p>
                                    <p>{this.props.onPageArtist.name}</p>
                                    <p>{this.props.onPageArtist.location}</p>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                );
            default:
                break;
        }
    }
}
 
export default Slideshow;
 
// Don't forget to include the css in your page
 
// Using webpack
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
 
// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>