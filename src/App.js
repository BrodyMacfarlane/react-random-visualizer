import React, { Component } from 'react';
import logo from './logo.svg';
import audio from './audio.mp3';
import play from './play.svg';
import pause from './pause.svg';


class App extends Component {
  constructor(){
    super()
    this.state = {
      isPlaying: false,
      lowFreq: null,
      medFreq: null,
      highFreq: null
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.getFreq = this.getFreq.bind(this)
    this.handleInterval = this.handleInterval.bind(this)
  }

  componentDidMount(){
    // var ctx = new AudioContext();
    // var audioSrc = ctx.createMediaElementSource(this.song);
    // var analyser = ctx.createAnalyser();
    // audioSrc.connect(analyser);
    // audioSrc.connect(ctx.destination);
    // var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
    // function renderFrame() {
    //   setTimeout(function(){
    //     requestAnimationFrame(renderFrame);
    //     analyser.getByteFrequencyData(frequencyData);
    //     console.log(frequencyData[0])
    //     // this.setState({
    //     //   lowFreq: frequencyData[0],
    //     //   medFreq: frequencyData[500],
    //     //   highFreq: frequencyData[1000]
    //     // })
    //   }, 200)
    // }
    // renderFrame();
  }

  getFreq(){
    if(this.state.lowFreq === null){
      function randGen255(){
        return Math.floor(Math.random() * 255)
      }
      let rand1 = randGen255()
      let rand2 = randGen255()
      let rand3 = randGen255()
      this.setState({
        lowFreq: rand1,
        medFreq: rand2,
        highFreq: rand3
      })
    }
    else {
      function addorsub(){
        return Math.floor(Math.random() * 2)
      }
      let mod1 = addorsub() ? Math.floor(Math.random() * 25) : 0 - Math.floor(Math.random() * 25)
      let mod2 = addorsub() ? Math.floor(Math.random() * 25) : 0 - Math.floor(Math.random() * 25)
      let mod3 = addorsub() ? Math.floor(Math.random() * 25) : 0 - Math.floor(Math.random() * 25)
      this.setState({
        lowFreq: this.state.lowFreq + mod1,
        medFreq: this.state.medFreq + mod2,
        highFreq: this.state.highFreq + mod3
      })
    }
    console.log(this.state.lowFreq)
    console.log(this.state.medFreq)
    console.log(this.state.highFreq)
  }

  handlePlay(){
    this.setState({isPlaying: true})
    this.song.play()
    this.handleInterval(this.getFreq)
  }

  handleInterval(fn){
    window.internval = setInterval(function(){
      fn()
    }, 200)
    console.log(this.state.isPlaying)
  }

  handlePause(){
    this.setState({isPlaying: false})
    this.song.pause()
    clearInterval(window.internval)
  }

  render() {
    return (
      <div className="App">
        <div className="audio-container">
          <audio ref={(song) => {this.song = song }} src={audio}></audio>
          <div className="button-container">
            <button className={this.state.isPlaying ? "no-play-button" : "play-button"} onClick={this.handlePlay}>
              <img className="sound-img play-img" src={play}/>
            </button>
            <button className={this.state.isPlaying ? "pause-button" : "no-pause-button"} onClick={this.handlePause}>
              <img className="sound-img pause-img" src={pause}/>
            </button>
          </div>
          <div className="freqs">
            <div ref="lowFreq" style={{height: this.state.lowFreq}} className="freq"></div>
            <div ref="medFreq" style={{height: this.state.medFreq}} className="freq"></div>
            <div ref="highFreq" style={{height: this.state.highFreq}} className="freq"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
