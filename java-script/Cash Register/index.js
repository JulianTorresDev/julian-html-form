function checkCashRegister(price, cash, cid) {
    var change = cash - price; //change due
    let totalCash = 0; //variable to hold total cash in register
    let cidReverse = [...cid].reverse(); 
    let temp = []; //temp arr to hold each chnage from currency unit
    let cashValue = {  //object to show base currency unit values
      "PENNY": 0.01, 
      "NICKEL": 0.05, 
      "DIME": 0.1, 
      "QUARTER": 0.25, 
      "ONE": 1, 
      "FIVE": 5, 
      "TEN": 10, 
      "TWENTY": 20, 
      "ONE HUNDRED": 100
      }
      
    let changeDue = {  //object with status & change to be returned  
      status: '',
      change: []
    }
    
    cid.forEach(element => {  //get total cash in register
      totalCash += element[1];
    });
    totalCash = parseFloat(totalCash.toFixed(2)) //2 decimal places
  
    //function to check if currency unit can offset some change
    function cashUnit(unit, index) { //unit param-> reference cashValue obj and index param-> reference cid unit amount
      let unitTotal = cidReverse[index][1]; //get currency unit total from cid
      let amount = Math.floor(change / cashValue[unit]) * cashValue[unit]; //check max possible amount that can be offset from change
      if (unitTotal > 0) { //check if some change can be paid from this unit
        if (unitTotal >= amount) { //indicates there's enough unitTotal to offset max possible amount 
          change -= amount; //subtract amount taken from change
          change = parseFloat(change.toFixed(2));
          return amount; //amount taken from this unit
        }
        else {  //Not enough unitTotal, hence use all 
          change -= unitTotal; //subtract unitTotal from change since all unitTotal was used
          change = parseFloat(change.toFixed(2));
          return unitTotal;
        }
      }
      else { 
        return 0;
      }
    }
    
    function getChange() {
      let changeOwed = cash - price; 
      for (let [index, value] of cidReverse.entries())  {
        let changeGotten = cashUnit(value[0], index);
        if (changeGotten > 0) { 
          temp.push([value[0], changeGotten]);
        }
        if (change === 0) {break;} 
      }
      if (totalCash < changeOwed || change !== 0) {
          changeDue.status = "INSUFFICIENT_FUNDS";
      }
      else if (totalCash == changeOwed) {
          changeDue.status = "CLOSED";
          changeDue.change = [...cid];
      }
      else {
        changeDue.status = "OPEN";
        changeDue.change = [...temp];
      }
    }
    
    getChange(); 
    return changeDue;
  }
  
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
      // Change code below this line
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
      // Change code above this line
    }
    // Change code below this line
  reset() {
      this.setState({
        count: 0
      });
    }
    increment() {
      this.setState(state => ({
        count: state.count + 1
      }));
    }
    decrement() {
      this.setState(state => ({
        count: state.count - 1
      }));
    }
  
    // Change code above this line
    render() {
      return (
        <div>
          <button className='inc' onClick={this.increment}>Increment!</button>
          <button className='dec' onClick={this.decrement}>Decrement!</button>
          <button className='reset' onClick={this.reset}>Reset</button>
          <h1>Current Count: {this.state.count}</h1>
        </div>
      );
    }
  };