import React from "react";

const TweetBox = props => {
  return <div className="tweet-body">{props.children}</div>;
};

const Image = props => {
  return <img src={props.image} alt="Logo" className="picture"></img>;
};

const Name = props => {
  return <div className="name">{props.name}</div>;
};

const Handle = props => {
  return <div className="handle">{props.handle}</div>;
};

const Tweet = props => {
  return <div className="tweet">{props.tweet}</div>;
};

const TweetBody = props => {
  return (
    <TweetBox>
      <div className="inner-body">
        <Image image={props.image} />
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}></Name>
            <Handle handle={props.handle}></Handle>
          </div>
          <Tweet tweet={props.tweet}></Tweet>
        </div>
      </div>
    </TweetBox>
  );
};

export { TweetBody };
