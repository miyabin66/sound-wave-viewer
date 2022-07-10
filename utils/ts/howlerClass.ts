import { Howl } from "howler"

interface Main {
  sound: Howl
}

class Main {
  constructor() {
    this.sound = new Howl({
      src: ['/sound/sample.m4a']
    })
  }
}

export default Main
