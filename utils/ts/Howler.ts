import { Howl, Howler } from "howler"

export class Sound {
  private static _instance: Sound
  private _sound: Howl
  private _playingSound: number | undefined
  private _analyserNode: AnalyserNode | null
  private _freqs: Uint8Array | null
  private _gainNode: GainNode | null

  constructor() {
    this._sound = new Howl({
      src: ['/sound/sample.m4a'],
      volume: 0.15,
    })
    this._analyserNode = null
    this._freqs = null
    this._gainNode = null
  }

  // インスタンス取得
  public static get instance() {
    if (!this._instance) {
      this._instance = new Sound()
    }

    return this._instance
  }

  public playAudioHandler() {
    if (this._sound.playing()) {
      this.stopAudio();
    } else {
      this.playAudio();
    }
  }

  private playAudio() {
    this._initAudioVisualizer();
    this._sound.load();
    this._playingSound = this._sound.play();
    this._drowAudioVisualizer();
  }

  private stopAudio() {
    this._sound.pause(this._playingSound);
    this._playingSound = undefined
  }

  private _initAudioVisualizer() {
    this._analyserNode = Howler.ctx.createAnalyser();
    this._freqs = new Uint8Array(this._analyserNode.frequencyBinCount);
    //ボリュームコントローラ
    this._gainNode = Howler.ctx.createGain();
    this._gainNode.gain.setValueAtTime(1, Howler.ctx.currentTime);
    //各ノードをつなぐ
    Howler.masterGain.connect(this._analyserNode);
    this._analyserNode.connect(this._gainNode);
    this._gainNode.connect(Howler.ctx.destination);
  }

  private _drowAudioVisualizer() {
    if (!this._analyserNode || !this._freqs) return

    // 0~1 0に近い方が描画がスムーズになる
    this._analyserNode.smoothingTimeConstant = 0.1;
    // FFTサイズ
    this._analyserNode.fftSize = 1024;
    // 周波数領域の波形データを引数の配列に格納する
    this._analyserNode.getByteFrequencyData(this._freqs);
  }
}
