import React, { Component } from "react";
import StarRatings from "react-star-ratings";

export default class starRating extends Component {
  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  render() {
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="blue"
        changeRating={this.changeRating}
        numberOfStars={6}
        name="rating"
      />
    );
  }
}
