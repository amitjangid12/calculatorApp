import { BsBackspaceFill } from 'react-icons/bs';
import { Button } from 'antd';
import React, { useState } from 'react';
import * as math from 'mathjs';

function Calculator() {
    const [input, setInput] = useState(0);
    const [size, setSize] = useState('30px');
    const backspace = <BsBackspaceFill style={{ display: 'block' }} /> || '\u2190';
    const numberButton = ['C', backspace,
        '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='
    ]

    const lastCharIsOperator = /[-+*/%]$/.test(input);
    const lastChar = /[-+*/]$/.test(input)
    const handleButtonPress = (value) => {

        if (/[/*%+-]/.test(value) && lastCharIsOperator) {
            setInput((prevInput) => prevInput.slice(0, -1, value));
        }

        input.length >= 10 ? setSize('20px') : setSize('30px')

        if (value === '=') {
            try {
                if (input) {
                    let expression = input;
                    if (lastChar) {
                        expression = expression.slice(0, -1);
                    }
                    expression = expression.replace(/%/g, '/100');
                    const result = math.evaluate(expression);
                    setInput(result.toString());
                }
            } catch (error) {
                setInput('Error');
            }
        }
        else if (value === '.') {
            // If a dot is pressed, check if it follows an operator and insert '0' if needed
            setInput((prevInput) => {
              const lastChar = prevInput.charAt(prevInput.length - 1);
              if (['+', '-', '*', '/'].includes(lastChar)) {
                return prevInput + '0' + value;
              } else {
                return prevInput + value;
              }
            });
          }  else if (value === 'C') {
            setInput(0);
        } else if (value === backspace) {

            input ? setInput(prevInput => prevInput.slice(0, -1)) : setInput(0)
        }

        else {
            if (input === 0) {
                setInput(`${value}`);
            } else if (input === lastCharIsOperator) {
                setInput(`${value}`);
            } else if (!lastCharIsOperator || (lastCharIsOperator && (/[1-9]/).test(value))) {
                setInput((prevInput) => prevInput + `${value}`);
            }
        }
    };

    return (
        <div className='calculator-outer'>
            <div className='calculator-inner'>
                <div className='screen-part'>
                    <div className='screen'>
                        <div style={{ textAlign: 'right', fontSize: size, }}  >{input}</div>
                    </div>
                </div>
                <div className='button-wraper'>
                    <div className='buttons'>
                        {numberButton.map(buttonName => (

                            <Button key={buttonName} className='button-count' onClick={() => handleButtonPress(buttonName)}>
                                {buttonName}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
