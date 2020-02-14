import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import axios from "axios";
import { TweetBody } from "./components/tweet";

function App() {
  const [data, SetData] = useState([]);
  const [pull, SetPull] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await axios.get("https://randomuser.me/api/");

        SetData({
          users: [
            {
              name: apiResponse.data.results[0].name,
              image: apiResponse.data.results[0].picture.medium,
              tweet: apiResponse.data.results[0].email
            }
          ]
        });
      } catch (e) {
        console.log("Got an Error: ", e);
      }
    };
    fetchData();
  }, []);

  const handleRefresh = () => {
    return new Promise(async resolve => {
      await getUser();
      // setTimeout(resolve, 2000);
      resolve();
    });
  };

  const getUser = async () => {
    try {
      const apiResponse = await axios.get("https://randomuser.me/api/");

      SetData({
        users: [
          ...data.users,
          {
            name: apiResponse.data.results[0].name,
            image: apiResponse.data.results[0].picture.medium,
            tweet: apiResponse.data.results[0].email
          }
        ]
      });
    } catch (e) {
      console.log("Got an Error: ", e);
    }
  };

  const Items = () => {
    if (data.users && data.users.length) {
      let items = data.users.map((user, index) => {
        let name = `${user.name.first} ${user.name.last}`;
        let handle = `@${user.name.first}${user.name.last}`;
        let image = user.image;
        let tweet = user.tweet;
        return <TweetBody key={index} name={name} handle={handle} image={image} tweet={tweet}></TweetBody>;
      });
      return <div className="main-body">{items}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={500}
        onRefresh={handleRefresh}
        triggerHeight={100}
        backgroundColor="black"
        startInvisible={true}>
        <div>
          <Items />
        </div>
      </PullToRefresh>
    </div>
  );
}

export default App;
