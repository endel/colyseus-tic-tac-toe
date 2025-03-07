import * as PIXI from 'pixi.js'

import Application from '../Application'
import GameScreen from './GameScreen'

export default class TitleScreen extends PIXI.Container {

  constructor () {
    super()

    this.title = new PIXI.Sprite.fromImage("logo")
    this.title.pivot.x = this.title.width / 2
    this.addChild(this.title)

    this.instructionText = new PIXI.Text("touch to start", {
      font: "62px JennaSue",
      fill: 0x000,
      textAlign: 'center'
    })
    this.instructionText.pivot.x = this.instructionText.width / 2
    this.instructionText.pivot.y = this.instructionText.height / 2
    this.addChild(this.instructionText)

    this.colyseusLogo = new PIXI.Sprite.fromImage('colyseus')
    this.colyseusLogo.pivot.x = this.colyseusLogo.width / 2
    this.addChild(this.colyseusLogo)

    this.interactive = true
    this.once('click', this.startGame.bind(this))
    this.once('touchstart', this.startGame.bind(this))

    this.on('dispose', this.onDispose.bind(this))
  }

  transitionIn () {
    tweener.add(this.title).from({y: this.title.y - 10, alpha: 0}, 300, Tweener.ease.quadOut)
    tweener.add(this.colyseusLogo).from({ y: this.colyseusLogo.y + 10, alpha: 0 }, 300, Tweener.ease.quadOut)
    return tweener.add(this.instructionText).from({ alpha: 0 }, 300, Tweener.ease.quadOut)
  }

  transitionOut () {
    tweener.remove(this.title)
    tweener.remove(this.colyseusLogo)
    tweener.remove(this.instructionText)

    tweener.add(this.title).to({y: this.title.y - 10, alpha: 0}, 300, Tweener.ease.quintOut)
    tweener.add(this.colyseusLogo).to({ y: this.colyseusLogo.y + 10, alpha: 0 }, 300, Tweener.ease.quintOut)
    return tweener.add(this.instructionText).to({ alpha: 0 }, 300, Tweener.ease.quintOut)
  }

  startGame () {
    this.emit('goto', GameScreen)
  }

  onResize () {
    this.title.x = Application.WIDTH / 2;
    this.title.y = Application.MARGIN

    this.instructionText.x = Application.WIDTH / 2
    this.instructionText.y = Application.HEIGHT / 2 - this.instructionText.height / 3.8

    this.colyseusLogo.x = Application.WIDTH / 2
    this.colyseusLogo.y = Application.HEIGHT - this.colyseusLogo.height - Application.MARGIN
  }

  onDispose () {
    window.removeEventListener('resize', this.onResizeCallback)
  }

}




