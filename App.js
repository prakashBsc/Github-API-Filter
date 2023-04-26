import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import  Followercard from "./components/Followerscard/Followercard.js";
import Repocard from "./components/Followerscard/Repocard/Repocard";

const App = () => {
  const [userName, setUserName] = useState("");
  const [ProfileInfo, setProfileInfo] = useState("");
  const [followersData, setFollowersData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [SelectedNav, setSelectedNav] = useState(1);

  const getUserInfo = async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}`
    );
    setProfileInfo(data);
  };
  const getFollowersInfo = async () => {
      const { data } = await axios.get(
        `https://api.github.com/users/${userName}/followers`
      );
      setFollowersData(data);
  };
  const getReposInfo = async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}/repos`
    );
    setRepos(data);
};
  useEffect(() => {
    if (userName) {
      if (SelectedNav === 1) {
        getUserInfo();
      } else if (SelectedNav === 2) {
        getFollowersInfo();
      }else  if (SelectedNav === 3){
        getReposInfo();
      }
    }
  }, [SelectedNav]);
  console.log(ProfileInfo, followersData , repos);

  return (
    <div>
      <div className="app-input">
        <h1>Github User Info</h1>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <br />
        <br />
        <button onClick={getUserInfo}>Search</button>
      </div>
      <nav>
        <ul>
          <li
            className={SelectedNav === 1 ? "navActive" : undefined}
            onClick={() => setSelectedNav(1)}
          >
            {" "}
            Profile
          </li>

          <li
            className={SelectedNav === 2 ? "navActive" : ""}
            onClick={() => setSelectedNav(2)}
          >
            Followers
          </li>

          <li
            className={SelectedNav === 3 ? "navActive" : ""}
            onClick={() => setSelectedNav(3)}
          >
            Repos
          </li>
        </ul>
      </nav>
      <div className="app__container">
        {SelectedNav === 1 ? (
          ProfileInfo !== "" ? (
            <div className="app-profile">
              <img src={ProfileInfo?.avatar_url} alt=""></img>
              <h2>
                {ProfileInfo.name === null ? (
                  "No profile Name available"
                ) : (
                  <a
                    href={ProfileInfo.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ProfileInfo.name}
                  </a>
                )}
              </h2>
              <p>{ProfileInfo?.bio}</p>
            </div>
          ) : (
            <h3>Please enter a username</h3>
          )
        ) : null}
        {SelectedNav === 2
          ? followersData.map((follower) => {
              return <Followercard key={follower.id} {...follower} />;
            })
          : null}
        {SelectedNav === 3 ? repos.map((repo) => {
              return <Repocard  key={repo.id} {...repo} />;
            }) : null}
      </div>
    </div>
  );
};

export default App;
