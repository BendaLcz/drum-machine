import './App.scss';
import './fonts.css';

import React from "react";

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      display: ""
    }
    
    this.displaySample = this.displaySample.bind(this);
  }
  
  displaySample (name) {
    this.setState({
      display: name
    })
  }
  
  render () {
    return (
      <div id="drum-machine">
        <div id="pad-board">
          {drumSamples.map((item, idx) => {
            return (
              <Drumpad
                id={drumSamples[idx].id}
                clip={drumSamples[idx].clip}
                src={drumSamples[idx].src}
                keyCode={drumSamples[idx].keyCode}
                displaySample={this.displaySample} />
            )})
          }
        </div>
        <div id="right-column">
          <div id="title">
            <i class="fab fa-free-code-camp"></i> FCC Drum Machine
          </div>
          <div id="display">
            <p>Sample:</p><br/>
            {this.state.display}
          </div>
          <div id="bottom-row">
            &copy; 2021 Libor Benda
          </div>
        </div>
      </div>
    );
  }
}

const inactive = {
  "box-shadow": "none"
}

const active = {
  "box-shadow": "0 0 10px #719ECE"
}

class Drumpad extends React.Component {
  constructor (props) {
    super (props);
    
    this.state = {
      buttonStatus: inactive
    }
    
    this.playSample = this.playSample.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  handleKeyPress (event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSample();
    }
  }
  
  playSample () {
    let sample = document.getElementById(this.props.id);
    sample.play();
    this.props.displaySample(this.props.clip);
    this.setState({
      buttonStatus: active
    })
    const resetState = () => {
      this.setState({
        buttonStatus: inactive
      });
    }
    setTimeout(resetState, 250);
  }
  
  render () {
    return (
      <button className="drum-pad" id={this.props.clip} onClick={this.playSample} onKeyPress={this.handleKeyPress} style={this.state.buttonStatus}>
        {this.props.id}
        <audio className="clip" id={this.props.id} src={this.props.src} />
      </button>
    )
  }
}

const drumSamples = [
  {
    "id": "Q",
    "keyCode": 81,
    "clip": "kick1",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/120[kb]basic-ekick.wav.mp3"
  },
  {
    "id": "W",
    "keyCode": 87,
    "clip": "kick2",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/26[kb]beautybass.wav.mp3"
  },
  {
    "id": "E",
    "keyCode": 69,
    "clip": "kick3",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/50[kb]baroque-kick.wav.mp3"
  },
  {
    "id": "A",
    "keyCode": 65,
    "clip": "snare1",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/38[kb]hrcsnare-10.wav.mp3"
  },
  {
    "id": "S",
    "keyCode": 83,
    "clip": "snare2",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/78[kb]high-reggae-snare.wav.mp3"
  },
  {
    "id": "D",
    "keyCode": 68,
    "clip": "snare3",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/27[kb]gatesnare.wav.mp3"
  },
  {
    "id": "Z",
    "keyCode": 90,
    "clip": "cymbal1",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Cymbals/104[kb]curiouscym1.wav.mp3"
  },
  {
    "id": "X",
    "keyCode": 88,
    "clip": "cymbal2",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Cymbals/120[kb]grungecymbal.wav.mp3"
  },
  {
    "id": "C",
    "keyCode": 67,
    "clip": "cymbal3",
    "src": "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Cymbals/82[kb]opencym.wav.mp3"
  }
]; 

export default App;
