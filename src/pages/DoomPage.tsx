
const DoomPage: React.FC = () => {
  return (
    <div className="doom-page"><h1 className="article-title">Play Doom</h1>
      <iframe
        src="https://grahamthe.dev/demos/doom/"
        width="100%"
        height="600"
        title="Play the game Doom"
        style={{
          border: "none",
          borderRadius: "8px",
          background: "black",
        }}
      ></iframe>
      </div>
      
  );
}

export default DoomPage;
