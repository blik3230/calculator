import React, {Component} from 'react';

import './App.css';

const actionFunctions = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

class App extends Component {
    static propTypes = {};

    state = {
        action: '=',
        display: '0',
        inputValue: '',
        memorizedValue: '',
    };

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        const key = e.key;
        const digitPattern = /\d/;

        if(digitPattern.test(key)) {
            this.inputDigit(key);
            return;
        }

        switch(key) {
            case '+':
            case '-':
            case '*':
            case '/':
                this.setAction(key);
                break;
            case '=':
            case 'Enter':
                this.showResult();
                break;
            default:
                return;
        }
    };

    setAction = (action) => {
        const {
            action: prevAction,
            inputValue: prevInputValue
        } = this.state;

        const isDoubleAction = prevAction !== '=' && prevInputValue === '';
        const isSimpleAction = prevAction === '=' && prevInputValue !== '';
        const isActionAfterEqual = prevAction === '=' && prevInputValue === '';

        if(isSimpleAction) {
            this.setState({
                action,
                display: action,
                inputValue: '',
                memorizedValue: this.state.inputValue
            });
            return;
        }

        if(isDoubleAction || isActionAfterEqual) {
            this.setState({
                action,
                display: action
            });
        }

    };

    getResult = () => {
        const {
            inputValue,
            memorizedValue,
            action
        } = this.state;

        const operandA = +memorizedValue;
        const operandB = +inputValue;

        return actionFunctions[action](operandA, operandB);
    };

    inputDigit = (digit) => {
        const {
            memorizedValue: prevMemorizedValue,
            inputValue: prevInputValue,
            action: prevAction,
        } = this.state;

        const isAfterEqualInput = prevAction === '=' && prevMemorizedValue !== '';
        const inputValue = prevInputValue === '0'? digit: prevInputValue + digit;

        if(isAfterEqualInput) {
            this.setState({
                inputValue,
                display: inputValue,
                memorizedValue: ''
            });
        } else {
            this.setState({
                inputValue,
                display: inputValue
            })
        }
    };

    showResult = () => {
        const {
            action: prevAction,
            inputValue: prevInputValue,
            memorizedValue: prevMemorizedValue
        } = this.state;

        const isNotAllowEqual = prevAction === '=' || prevInputValue === '' || prevMemorizedValue === '';

        if(isNotAllowEqual) {
            return;
        }

        const result = this.getResult();

        this.setState({
            action: '=',
            inputValue: '',
            display: result,
            memorizedValue: result,
        });
    };

    render() {
        return (
            <div className="calculator">
                <div className="display"> {this.state.display}</div>
                <div className="buttons">
                    <button onClick={() => {this.inputDigit(0)}}>0</button>
                    <button onClick={() => {this.inputDigit(1)}}>1</button>
                    <button onClick={() => {this.inputDigit(2)}}>2</button>
                    <button onClick={() => {this.inputDigit(3)}}>3</button>
                    <button onClick={() => {this.inputDigit(4)}}>4</button>
                    <button onClick={() => {this.inputDigit(5)}}>5</button>
                    <button onClick={() => {this.inputDigit(6)}}>6</button>
                    <button onClick={() => {this.inputDigit(7)}}>7</button>
                    <button onClick={() => {this.inputDigit(8)}}>8</button>
                    <button onClick={() => {this.inputDigit(9)}}>9</button>

                    <button onClick={() => {this.setAction('+')}}>+</button>
                    <button onClick={() => {this.setAction('-')}}>-</button>
                    <button onClick={() => {this.setAction('*')}}>*</button>
                    <button onClick={() => {this.setAction('/')}}>%</button>
                    <button onClick={this.showResult}>=</button>
                </div>
            </div>
        );
    }
}

export default App;
/*
Question De scription
Create a basic calculator using React. Your app should have below mentioned functionality.

    Add
Subtract
Multiply
Divide
Tasks:
    Present all digits(0 to 9) and five symbols (*, %, +, -, =) and a display area (No need to write fancy CSS).

Allow all four operations to happen. A user should be able to use the last result with a variable "_" (underscore).

    Allow the user to use both keyboard and onscreen fields.

    For simplicity, you can clear the screen once the user presses a symbol.

    Eg:

User presses 1123 (Display area shows 1123)

User presses * (Display area now only shows *)

User presses 0 (Display area now only shows 0)

User presses enter or = symbol (Display area now shows 0)

This complete one cycle.

    In the next cycle user selects _ + 3 (Display area should now show 3)

In the next cycle user selects _ * 4 (Display area should now show 12)

Note: User need not focus on the display for the calculator to work. Eveything should work even without touching the mouse.


    */
