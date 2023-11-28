import { useState } from "react"
import "./App.css"
import FileUploadDownload from "./components/FileUploadDownload"

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (username && password) {
      if (username === "dewansh.dt@gmail.com" && password === "root")
        setLoggedIn(true)
      else alert("Username or password incorrect")

      setUsername("")
      setPassword("")
    } else {
      alert("Please enter a username and a password.")
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUsername("")
    setPassword("")
  }

  return (
    <>
      {isLoggedIn ? (
        <FileUploadDownload handleLogout={handleLogout} />
      ) : (
        <div className="container login">
          <div className="login-component">
            <h6>Login</h6>
            <div>
              <input
                type="email"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin}>Login</button>
          </div>
          <h5>
            Remote<strong>NAS</strong>
          </h5>
        </div>
      )}
    </>
  )
}

export default App
