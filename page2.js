const audioContext = new AudioContext();

const TRACK_LIST = [
  {
    id: 1,
    src: "./audios/new-wave-kit.ogg",
    title: "New Wave Kit"
  },
  {
    id: 2,
    src: "./audios/synth-organ.ogg",
    title: "Synth Organ"
  }
];

function AudioPage() {
  const [file, setFile] = React.useState('');

  const audio = new Audio(file);
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);

  const handleTrackChange = (file) => {
    audio.pause();
    setFile(file);
  };

  React.useEffect(() => {
    if(file){
      audio.play()
    }
  }, [file]); 

  return (
    <>
      <div className="site-header">
        <a href="index.html" className="header-nav_left">
          &lt; Post
        </a>
        Cool Audio
      </div>
      <div className="body-description">
        Neat Audio Player, click on the desired track to start playing!
      </div>
      <div className="site-body-page2">
        <div className="body-audio-table">
          <table className="body-table">
            <thead>
              <tr>
                <th>Track List</th>
              </tr>
            </thead>
            <tbody>
            { TRACK_LIST.map((track) => (
                <tr key={track.id}>
                  <td onClick={() => handleTrackChange(track.src)}>
                    {track.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="body-media-info">
          Now playing: {file}
        </div>
        <div className="body-media-controller">
          <button
            className="play"
            onClick={() => {
              if (audioContext.state === 'suspended') {
                audioContext.resume();
              }
              audio.play();
            }}
          >
            Play
          </button>
          <button
            className="pause"
            onClick={() => {
              audio.pause();
            }}
          >
            Pause
          </button>
          <button
            className="stop"
            onClick={() => {
              audio.pause();
              audio.currentTime = 0;
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
}

const domContainer = document.querySelector('#page2');
const root = ReactDOM.createRoot(domContainer);
root.render(<AudioPage />);