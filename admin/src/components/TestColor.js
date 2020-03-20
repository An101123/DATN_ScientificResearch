import React, { Component } from 'react';

class TestColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 1964,
            favoritecolor: "red"
        };
    }

    changeColor = () => {
        if (this.state.favoritecolor === "red") {
            this.setState({ favoritecolor: "blue" });
        } else {
            this.setState({ favoritecolor: "red" });
        }
    };

    changeColor2 = () => {
        return {
            color: this.state.favoritecolor
        };
    };

    render() {
        return (
            <form className="app">
                <h1>My {this.state.brand}</h1>
                <p>
                    It is a {this.state.color} {this.state.model} from {this.state.year}.
          </p>
                <h1 style={this.changeColor2()}>
                    My Favorite Color is {" "}
                    <span>{this.state.favoritecolor}</span>
                </h1>
                <button type="button" onClick={this.changeColor}>
                    Change color
                </button>

            </form>
        );
    }
}

export default TestColor;
