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
      dataArr: []
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  componentDidMount(){
    var ctx = new AudioContext();
    var audioSrc = ctx.createMediaElementSource(this.song);
    var analyser = ctx.createAnalyser();
    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
    this.renderFrame = () => {
      requestAnimationFrame(this.renderFrame);
      analyser.getByteFrequencyData(frequencyData);
      this.setState({dataArr: frequencyData})
    }
    this.renderFrame()
  }


  handlePlay(){
    this.setState({isPlaying: true})
    this.song.play()
  }

  handlePause(){
    this.setState({isPlaying: false})
    this.song.pause()
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
            <div ref="lowFreq" style={{height: this.state.dataArr[0] + 10}} className="freq"></div>
            <div ref="medFreq" style={{height: this.state.dataArr[300] + 10}} className="freq"></div>
            <div ref="highFreq" style={{height: this.state.dataArr[600] + 10}} className="freq"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
