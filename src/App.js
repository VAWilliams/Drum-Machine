import React from 'react';
import { Component } from 'react';
import './App.css';

const kit = [
  {
    title: "Heater 1",
    key: "q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  }, {
    title: "Heater 2",
    key: "w",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  }, {
  title: "Heater 3",
  key: "e",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  title: "Heater 4",
  key: "a",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  title: "Clap",
  key: "s",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  title: "Open HH",
  key: "d",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  title: "Kick n' Hat",
  key: "z",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  title: "Kick",
  key: "x",
  src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  title: "Closed HH",
  key: "c",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activatedPad: null
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    
    let multiplePads = kit.map(pad => {

      let { title, key, src } = pad;
      let upperKey = key.toUpperCase();
      let id = title.replace(/ /g, '_');

      return (
        <div id={id} class="drum-pad" key={key}>
          {upperKey}
          <audio id={upperKey} class="clip" src={src}/>
        </div>
      )

    });
    let { activatedPad } = this.state;


    return (
      <div id="drum-machine">
        <div id="pad" onClick={this.handleClick}>
          {multiplePads}
        </div>
        <div id="controls">
          <h1 id="display">
            {(activatedPad && activatedPad.title) || "Heater"}
          </h1>
        </div>
        
      </div>
    );
  }

  handleKeyDown(event) {
    let id = `${event.key.toUpperCase()}`;
    let audio = document.getElementById(id);
    if (!audio) return;
    let activatedPad = kit.find(
      pad => pad.src === audio.getAttribute('src')
    );
    this.setState({
      activatedPad: activatedPad
    });
    let parent = audio.parentElement
    parent.classList.add('drum-pad-hover');
    audio.currentTime = 0;
    audio.play();
    setTimeout(
      () => parent.classList.remove('drum-pad-hover'),
      100
    );
  }

  handleClick(event) {
    let pad = event.target;
    if (!pad) return;
    let audio = pad.children[0];
    if (!audio) return;
    let activatedPad = kit.find(
      pad => pad.src === audio.getAttribute('src')
    );
    this.setState({
      activatedPad: activatedPad
    });
    audio.currentTime = 0;
    audio.play();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    console.clear();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

}

export default App;
