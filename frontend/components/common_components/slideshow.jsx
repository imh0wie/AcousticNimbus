import React from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
 
class Slideshow extends React.Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={window.carousel1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={window.carousel2} />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>
        );
    }
}
 
export default Slideshow;
 
// Don't forget to include the css in your page
 
// Using webpack
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
 
// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>