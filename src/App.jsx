import { useRef } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  let [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) {
      str += "0123456789";
    }
    if (char) {
      str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    }
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      newPassword += str[randomIndex];
    }
    console.log(newPassword);
    return setPassword(newPassword);
  }, [password, length, numbers, char]);

  useEffect(() => {
    generatePassword();
  }, [setPassword, length, numbers, char]);

  const handleRangeChange = (event) => {
    setLength(event.target.value);
  };

  const copytext = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="w-6/12 bg-slate-50 p-4 rounded-lg">
          <h1 className="text-center text-4xl font-bold font-sans">
            Password Generator
          </h1>
          <div className="flex w-full items-center space-x-2 mt-8">
            <input
              className="flex h-10 w-9/12 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Password"
              readOnly="True"
              value={password}
              ref={passwordRef}
            />
            <button
              type="button"
              className="rounded-md w-3/12 flex justify-center bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={copytext}
            >
              Copy
              <span className="px-2 material-symbols-outlined text-sm">
                file_copy
              </span>
            </button>
          </div>
          <div className="flex w-full items-center space-x-8 mt-8">
            <div className="flex items-center">
              <input
                id="default-range"
                type="range"
                min="6"
                max="30"
                value={length}
                onChange={handleRangeChange}
                className="w-60 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mr-4"
              />
              <label
                htmlFor="default-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password Length {length}
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value={numbers}
                onChange={() => {
                  setNumbers((prev) => !prev);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Numbers
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value={char}
                onChange={() => {
                  setChar((prev) => !prev);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Special Charactors
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
