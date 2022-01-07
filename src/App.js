import { useState } from 'react';
import './App.css';

import Checkbox from './components/Checkbox';

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandelText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <div>
        <input
          type="text"
          value={handelText}
          placeholder=""
          autoComplete="off"
          onChange={(e) => setHandelText(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => {
            if (handelText != null) {
              navigator.clipboard.writeText(handelText);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 2000);
            }
          }}
        >
          {copied ? 'copied' : 'Copy'}
        </button>
      </div>
      <br />
      <div>
        <label>Password length</label>
        <input
          type="number"
          id="length"
          min="4"
          max="20"
          value={passwordGen.length}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Include uppercase letters</label>
        <Checkbox
          value={passwordGen.uppercase}
          onChange={handleChangeUppercase}
        />
      </div>
      <br />
      <div>
        <label>Include lowercase letters</label>
        <Checkbox
          value={passwordGen.lowercase}
          onChange={handleChangeLowercase}
        />
      </div>
      <br />
      <div>
        <label>Include numbers</label>
        <Checkbox value={passwordGen.numbers} onChange={handleChangeNumbers} />
      </div>
      <br />
      <div>
        <label>Include symbols</label>
        <Checkbox value={passwordGen.symbols} onChange={handleChangeSymbols} />
      </div>
      <br />
      <div>
        <button onClick={generatePassword}>Generate password</button>
      </div>
    </div>
  );
}

export default App;
