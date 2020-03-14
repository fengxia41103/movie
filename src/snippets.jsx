import React, { Component } from "react";
import classNames from "classnames";
import { randomId } from "./helper.jsx";
import {random, different} from "lodash";
import {DebounceInput} from 'react-debounce-input';
import { Button, Jumbotron } from "react-bootstrap";

class SnippetQuizGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      part_1: null,
      part_2: null,
      answer: "",
      youAnswer: "",
      matched: false
    }

    //binding
    this.makeUpTheRiddle = this.makeUpTheRiddle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  makeUpTheRiddle() {
    // break up to an array
    const words = this.props.line.split(" ");

    // randomly select two indexes, but can't be the whole thing!
    // _.random is inclusive.
    const index_1 = random(0, words.length/2);
    const index_2 = random(words.length/2, words.length);
    const start = index_1 > index_2 ? index_2 : index_1;
    const end = index_1 > index_2 ? index_1 : index_2;

    // save to state
    this.setState({
      part_1: words.slice(0, start).join(" "),
      part_2: words.slice(end, words.length).join(" "),
      answer: words.slice(start, end),
      yourAnswer: ""
    });

  }

  componentWillMount() {
    // must use WillMount
    this.makeUpTheRiddle();
  }

  handleChange(event) {
    const userInput = event.target.value.split(" ");
    const diff = difference(userInput, this.state.answer);
    const matched = userInput.length === this.state.answer.length && diff.length === 0;

    this.setState({
      yourAnswer: event.target.value,
      matched: matched
    });
  }

  render() {
    const index = this.props.index + 1;
    let match = "";

    if (this.state.matched){
      match = (
        <i className="fa fa-thumbs-o-up"></i>
      );
    } else{
      if (this.state.yourAnswer.length>1){
        match =(
          <i className="fa fa-thumbs-o-down"></i>
        );
      }
    }

    return (
      <div className="row">
        <div className="col l2 m2 s12">
          <h5>
            Snippet #{index}
            <span className="right">
              {match}
            </span>
          </h5>
        </div>

        <div className="col l8 m8 s12">
          <p>
            {this.state.part_1}

            <DebounceInput
              className="input-field"
              debounceTimeout={300}
              value={this.state.yourAnswer}
              onChange={this.handleChange} />
            {this.state.part_2}
          </p>

          <p>
            <HintBox clues={this.state.answer} />
          </p>
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
        <div>
          <Button
            variant="info"
            className="myhighlight col l6 m6 s12"
            onClick={this.onNext}>
            <i className="fa fa-book"></i>
            CLUE
            <span className="right">
              {whatIsLeft} words remaining
            </span>
          </Button>

          <Button variant="info"
                  className="col l2 m2 s12"
                  onClick={this.onReset}>
            Play again
          </Button>
        </div>

        <p className="col s12 myhighlight">
          { hints }
        </p>
      </div>
    )
  }
}


class SnippetsBox extends Component {
  render() {
    // nothing to display
    if (this.props.snippets.length<1) return null;

    const snippets = this.props.snippets.map((s, index, arrayObj) => {
      return (
        <SnippetQuizGame
          index={index}
          line={s} />
      )
    });


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
            <Button variant="primary">Let's start</Button>
          </p>
        </Jumbotron>

        <div>
          {snippets}
        </div>
      </div>
    )
  }
}

export default SnippetsBox;
