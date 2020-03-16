import React, { Component } from "react";
import classNames from "classnames";
import {random, different} from "lodash";
import {DebounceInput} from 'react-debounce-input';
import { Button, Jumbotron } from "react-bootstrap";
import {dictHasNoValues} from "./helper.jsx";

class SnippetQuizGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: "",
      matched: false
    }

    //binding
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const userInput = event.target.value.split(" ");
    const diff = difference(userInput, this.props.answer);
    const matched = userInput.length === this.props.answer.length && diff.length === 0;

    this.setState({
      userAnswer: event.target.value,
      matched: matched
    });
  }

  render() {
    // nothing to display
    if (this.props.index === null) return null;

    let match = "";
    if (this.state.matched){
      match = (
        <i className="fa fa-thumbs-o-up"></i>
      );
    } else{

      if (this.state.userAnswer.length>1){
        match =(
          <i className="fa fa-thumbs-o-down"></i>
        );
      }
    }

    return (
      <div className="row">
        <div className="col l2 m2 s12">
          <h5>
            Snippet #{this.props.index+1}
            <span className="right">
              {match}
            </span>
          </h5>
        </div>

        <div className="col l8 m8 s12">
          {this.props.part1}

          <DebounceInput
            className="input-field"
            debounceTimeout={300}
            value={this.state.userAnswer}
            onChange={this.handleChange} />
          {this.props.part2}

          <HintBox clues={this.props.answer} />
        </div>
      </div>
    );
  }
}

class HintBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onIndex: 0
    }

    this.onNext = this.onNext.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onReset(){
    // reset the game
    this.setState({
      onIndex: 0
    })
  }

  onNext() {
    this.setState({
      onIndex: Math.min(this.state.onIndex + 1, this.props.clues.length)
    });
  }

  render() {
    // hint string
    const hints = this.props.clues.slice(0, this.state.onIndex).join(" / ");
    let whatIsLeft = this.props.clues.length-this.state.onIndex;

    if (whatIsLeft===0){
      whatIsLeft = "Uh oh, no more >_<"
    }
    return (
      <div>
        <Button className="myhighlight col l6 m6 s12"
                onClick={this.onNext}>
          <i className="fa fa-book"></i>
          CLUE
        </Button>

        <Button className="col l6 m6 s12"
                onClick={this.onReset}>
          Play again
        </Button>
        <p className="myhint">
          {whatIsLeft} hints left
        </p>

        <p className="myhighlight">
          { hints }
        </p>
      </div>
    )
  }
}


class SnippetsBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      onIndex: null,
      part_1: null,
      part_2: null,
      answer: [],
    }

    // binding
    this.onNext = this.onNext.bind(this);
    this.makeUpTheRiddle = this.makeUpTheRiddle.bind(this);
  }

  onNext(){
    let next = this.state.onIndex + 1;
    if (next === this.props.snippets.length){
      // rotate back to beginning
      next = 0;
    }

    // update index
    this.setState({
      onIndex: next
    })

    // update game content
    this.makeUpTheRiddle(this.props.snippets[next]);
  }

  makeUpTheRiddle(line) {
    // break up to an array
    const words = line.split(" ");

    // randomly select two indexes, but can't be the whole thing!
    // _.random is inclusive.
    const index_1 = random(0, words.length/2);
    const index_2 = random(words.length/2, words.length);
    const start = index_1 > index_2 ? index_2 : index_1;
    const end = index_1 > index_2 ? index_1 : index_2;

    const part_1 = words.slice(0, start).join(" ");
    const part_2 = words.slice(end, words.length).join(" ");
    const answer = words.slice(start, end);

    // save to state
    this.setState({
      part_1: part_1,
      part_2: part_2,
      answer: answer
    });
  }


  render() {
    // nothing to display
    if (this.props.snippets.length<1) return null;

    const snippet = this.props.snippets[this.state.onIndex];
    return (
      <div>
        <Jumbotron>
          <h1>You are my No. 1 Fan</h1>
          <p>
            Want to test out your knowledge of this movie!? Try to fill in
            the missing words for these snippets. You can use the CLUE
            button for help, or the TELL ME if you are really stuck.
          </p>
          <p>
            <Button onClick={this.onNext}>Play the game</Button>
          </p>
        </Jumbotron>

        <SnippetQuizGame
          index={this.state.onIndex}
          line={snippet}
          part1={this.state.part_1}
          part2={this.state.part_2}
          answer={this.state.answer} />
      </div>
    )
  }
}

export default SnippetsBox;
