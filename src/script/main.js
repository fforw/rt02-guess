/** @jsx React.DOM */
"use strict";

var React = require("react/addons");

var GuessGame = React.createClass({

    propTypes: {
        max: React.PropTypes.number.isRequired
    },

    getInitialState: function ()
    {
        return {
            number: ((this.props.max + 1) * Math.random()) | 0,
            guess: ""
        }
    },

    handleChange: function(ev)
    {
        var value = this.refs.input.getDOMNode().value;

        var n = parseInt(value,10);

        if (n === n)
        {
            this.setState({
                guess: n
            })
        }
    },

    render: function ()
    {
        var toGuess = this.state.number;
        var guessed = this.state.guess;

        var message = "Enter number";
        var cls = null;

        if (typeof guessed === "number")
        {
            var won = toGuess === guessed;

            cls = won ? "win" : "fail";

            if (won)
            {
                message = "You win!";
            }
            else
            {
                if (toGuess > guessed)
                {
                    message = "Larger";
                }
                else
                {
                    message = "Smaller"
                }
            }
        }

        return (
            <div className="game">

                <h1>Guess The Number!</h1>

                <div className={ React.addons.classSet("msg", cls) }>
                    { message }
                </div>

                <input ref="input"
                    type="text"
                    autofocus="autofocus"
                    placeholder={ "Guess between 0 and " + this.props.max }
                    onChange={this.handleChange}
                    defaultValue="" />
            </div>
        );
    }
});


React.renderComponent(

    <GuessGame  max ={100}/>,

    document.getElementById("container")
);