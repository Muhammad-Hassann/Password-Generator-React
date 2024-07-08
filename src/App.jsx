import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let charSet = "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) charSet += "0123456789";
    if (symbol) charSet += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      pass += charSet[randomIndex];
    }

    setPassword(pass);
  }, [length, number, uppercase, symbol, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, number, uppercase, symbol, generatePassword]);

  const passwordRef = useRef(null);
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="image">
            <img src="/password.png" alt="" />
          </div>
          <h1>Password Generator</h1>
          <div className="input">
            <input type="text" 
            readOnly 
            value={password}
            ref={passwordRef}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(password);
                passwordRef.current?.select()
              }}
            >
              Copy
            </button>
          </div>
          <div className="range">
            <label htmlFor="length">Password length: {length}</label>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div class="options">
            <div class="option-item">
              <label htmlFor="uppercase">Uppercase</label>
              <input
                type="checkbox"
                id="uppercase"
                onChange={(e) => setUppercase(e.target.checked)}
              />
            </div>
            <div class="option-item">
              <label htmlFor="number">Numbers</label>
              <input
                type="checkbox"
                id="number"
                onChange={(e) => setNumber(e.target.checked)}
              />
            </div>
            <div class="option-item">
              <label htmlFor="symbol">Symbols</label>
              <input
                type="checkbox"
                id="symbol"
                onChange={(e) => setSymbol(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
