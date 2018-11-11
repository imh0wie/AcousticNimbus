import React from "react";

const HiringInfoSection = () => {
    return (
        <div className="hiring-info">
            <div className="header">
                <p>Go Hiring - Meet the developer</p>
            </div>
            <ul>
                <li><a href="" onClick={(e) => e.preventDefault()}><i className="fas fa-user fa-2x"></i></a></li>
                <li><a href="https://www.linkedin.com/in/howie-chan/"><i className="fab fa-linkedin fa-2x"></i></a></li>
                <li><a href="https://github.com/h0wiechan/"><i className="fab fa-github fa-2x"></i></a></li>
                <li><a href="https://angel.co/h0wiechan"><i className="fab fa-angellist fa-2x"></i></a></li>
            </ul>
        </div>
    )
}

export default HiringInfoSection;