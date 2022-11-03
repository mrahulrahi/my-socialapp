import { useEffect, useState } from "react";
import "./app.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";
import profile from "./img/user.svg";
import person from "./img/person.svg";
import pass from "./img/lock.svg";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div>
      {user ? (
        <div className="container">
          <>
            <Navbar socket={socket} />
            {posts.map((post) => (
              <Card key={post.id} post={post} socket={socket} user={user} />
            ))}
            <span className="username">{user}</span>
          </>
        </div>
      ) : (
        <div className="login-container">
          <div>
            <div className="img-container">
              <img src={profile} alt="profile" className="profile" />
            </div>
            <div>
              <div>
                <img src={person} alt="username" className="user-name" />
                <input
                  type="text"
                  placeholder="Username"
                  className="name input"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="pass" />
                <input
                  type="password"
                  placeholder="Password"
                  className="name input"
                />
              </div>
              <div className="link">
                <span>
                  <input
                    className="check"
                    type="checkbox"
                    name="RememberMe"
                  ></input>
                  <label> Remember me</label>
                </span>
                <a href="google.com">Forgot Password?</a>
              </div>
            </div>
            <button onClick={() => setUser(username)} className="login-btn">
              LOGIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
