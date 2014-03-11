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
            number: 1 + (this.props.max * Math.random()) | 0,
            guess: ""
        }
    },

    handleChange: function(ev)
    {
        this.setState({
            guess: this.refs.input.getDOMNode().value
        });
    },

    render: function ()
    {
        var toGuess = this.state.number;
        var guessed = this.state.guess;

        var message = "Enter number";
        var cls = null;

        if (guessed)
        {
            var won = toGuess == guessed;

            cls = won ? "win" : "fail";

            if (won)
            {
                message = "You win!";
            }
            else
            {
                var n1 = +toGuess;
                var n2 = +guessed;

                if (n1 > n2)
                {
                    message = "Larger";
                }
                else if (n1 < n2)
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
                    placeholder={ "Guess between 1 and " + this.props.max }
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