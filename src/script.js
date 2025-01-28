function Calculator() {
  // State to manage the calculator's current value, total value, initial input state, and previous operator
  const [calc, setCalc] = React.useState({
    current: "0", // Current number being entered
    total: "0",   // Total value after performing operations
    isInitial: true, // Flag to indicate if it's the first input or the result of a calculation
    preOp: ""     // Previous operator used
  });

  // Handles input for number buttons
  function handleNumber(value) {
    let newValue = value;

    // Append the value to the current input if it's not the initial input
    if (!calc.isInitial) {
      newValue = calc.current + value;
    }

    // Update state with the new current value
    setCalc({ 
      current: newValue, 
      total: calc.total, 
      isInitial: false, 
      preOp: calc.preOp 
    });
  }

  // Handles input for operator buttons (+, -, *, /)
  function handleOperator(value) {
    // Perform the pending calculation and update state with the result
    const total = doCalculation();
    setCalc({
      current: total.toString(), // Show the result in the current display
      total: total.toString(),  // Set the result as the total
      isInitial: true,          // Mark the next input as initial
      preOp: value              // Store the selected operator for the next operation
    });
  }

  // Performs calculations based on the previous operator and current/total values
  function doCalculation() {
    let total = parseInt(calc.total); // Parse the total as an integer

    // Perform the appropriate calculation based on the previous operator
    switch (calc.preOp) {
      case "+":
        total += parseInt(calc.current);
        break;
      case "-":
        total -= parseInt(calc.current);
        break;
      case "*":
        total *= parseInt(calc.current);
        break;
      case "/":
        total /= parseInt(calc.current);
        break;
      default:
        // If no operator is set, use the current value as the total
        total = parseInt(calc.current);
    }
    return total; // Return the calculated total
  }

  // Renders the current value on the calculator display
  function renderDisplay() {
    return calc.current;
  }

  // Resets the calculator to its initial state
  function handleClear() {
    setCalc({
      current: "0",  // Reset current value to "0"
      total: "0",    // Reset total value to "0"
      isInitial: true, // Mark the calculator as in its initial state
      preOp: ""      // Clear the previous operator
    });
  }

  // Render the calculator UI
  return (
    <div className="calculator">
      {/* Display section */}
      <div className="display">{calc.current}</div>

      {/* Number buttons */}
      <CalcButton value="7" onClick={handleNumber} />
      <CalcButton value="8" onClick={handleNumber} />
      <CalcButton value="9" onClick={handleNumber} />
      <CalcButton className="operator" onClick={handleOperator} value="/" />

      <CalcButton value="4" onClick={handleNumber} />
      <CalcButton value="5" onClick={handleNumber} />
      <CalcButton value="6" onClick={handleNumber} />
      <CalcButton className="operator" onClick={handleOperator} value="*" />

      <CalcButton value="1" onClick={handleNumber} />
      <CalcButton value="2" onClick={handleNumber} />
      <CalcButton value="3" onClick={handleNumber} />
      <CalcButton className="operator" onClick={handleOperator} value="-" />

      {/* Clear, zero, equals, and addition operator buttons */}
      <CalcButton value="C" onClick={handleClear} />
      <CalcButton value="0" onClick={handleNumber} />
      <CalcButton value="=" onClick={handleOperator} />
      <CalcButton className="operator" value="+" onClick={handleOperator} />
    </div>
  );
}

// Reusable button component for calculator
function CalcButton(props) {
  return (
    <button 
      className={props.className} // Apply optional custom className
      onClick={() => props.onClick(props.value)} // Pass the button's value to its handler
    >
      {props.value} {/* Display the button's value */}
    </button>
  );
}

// Render the Calculator component into the DOM
ReactDOM.render(
  <div className="app-container">
    <Calculator />
  </div>,
  document.getElementById("root")
);
