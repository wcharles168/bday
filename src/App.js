import './App.css';
import {useState, useEffect} from 'react'
import {confetti} from './confetti.js'

function App() {
  const [currAge, setCurrAge] = useState(1);
  const [actualAge, setAge] = useState(0);
  const [done, setDone] = useState(false);
  const [timeout, updateTimeout] = useState(25);
  const [yearsLeft, setYears] = useState(0);
  const multiplier = 1.05;
  useEffect(() => {
    const today = new Date();
    var headerElement = document.getElementById('headerText');
    headerElement.innerHTML = "";
    if (today.getDate() == 24 && today.getMonth() + 1 == 12) {
      headerElement.innerHTML = "Today's a special day...";
    } else {
      headerElement.innerHTML = "Nothing special today :(";
    }
    console.log("setting age");
    setAge(today.getFullYear() - 1964);
    // console.log(today.getFullYear() - 1964);
    // writer(today.getFullYear() - 1964, 1, startingTimeout);
  }, []);

  useEffect(() => {
    console.log(timeout);
    if (actualAge > 0) {
      setTimeout(() => {
        if (currAge == actualAge && !done) {
          updateTimeout(5000);
          setCurrAge(currAge + 1);
        } else if (currAge < actualAge) {
          updateTimeout(multiplier*timeout);
          setCurrAge(currAge + 1);
        } else if (currAge > actualAge && !done) {
          setDone(true);
          updateTimeout(5000);
          setCurrAge(currAge - 1);
        }
      }, timeout);
      if (currAge == actualAge && done) {
        setYears(60 - actualAge);
        document.getElementById("retirement").hidden = false;
        confetti.start();
      }
    }
  }, [actualAge, currAge])
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="headerText"></h1>
        <img src="circle-cropped.png" className="App-logo" alt="logo" />
        <p>
          You are {currAge} years old!
        </p>
        <p id="retirement" hidden>
          {yearsLeft} years until retirement!!!
        </p>
      </header>
    </div>
  );
}

export default App;
