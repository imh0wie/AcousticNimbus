import React from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
 
class Slideshow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.klass === "banner") {
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
        } else {
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
                                <img src={window.linkedin} className="logo"></img>
                                <img src={window.github} className="logo"></img>
                            </div>
                            <img src={window.angellist} className="logo"/>
                        </div>
                    </div>
                </Carousel>
            );
        }
    }
}
 
export default Slideshow;
 
// Don't forget to include the css in your page
 
// Using webpack
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
 
// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>