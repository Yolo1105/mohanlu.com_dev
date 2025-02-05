type QueueItem = () => Promise<void>

export default class Typewriter {
  #queue: QueueItem[] = []
  #element: HTMLElement
  #loop: boolean
  #typingSpeed: number
  #deletingSpeed: number

  constructor(parent: HTMLElement, { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}) {
    this.#element = document.createElement("div")
    this.#element.style.display = "inline"
    parent.appendChild(this.#element)
    this.#loop = loop
    this.#typingSpeed = typingSpeed
    this.#deletingSpeed = deletingSpeed

    const style = document.createElement("style")
    style.textContent = `
      @keyframes blink {
        0% { opacity: 0 }
        50% { opacity: 1 }
        100% { opacity: 0 }
      }
      .typewriter-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background-color: currentColor;
        margin-left: 2px;
        animation: blink 0.7s infinite;
      }
    `
    document.head.appendChild(style)
  }

  typeString(string: string, speed?: number) {
    this.#addToQueue((resolve) => {
      if (speed === 0) {
        // Instant typing
        this.#element.innerHTML += string
        resolve()
      } else {
        let i = 0
        const interval = setInterval(() => {
          if (i < string.length) {
            this.#element.innerHTML += string[i]
            i++
          } else {
            clearInterval(interval)
            resolve()
          }
        }, speed || this.#typingSpeed)
      }
    })

    return this
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      let i = 0
      const interval = setInterval(() => {
        if (i < number) {
          this.#element.innerHTML = this.#element.innerHTML.slice(0, -1)
          i++
        } else {
          clearInterval(interval)
          resolve()
        }
      }, this.#deletingSpeed)
    })

    return this
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      const interval = setInterval(() => {
        if (this.#element.innerHTML.length > 0) {
          this.#element.innerHTML = this.#element.innerHTML.slice(0, -1)
        } else {
          clearInterval(interval)
          resolve()
        }
      }, deleteSpeed)
    })

    return this
  }

  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      setTimeout(resolve, duration)
    })

    return this
  }

  async start() {
    let cb = this.#queue.shift()
    while (cb != null) {
      await cb()
      if (this.#loop) this.#queue.push(cb)
      cb = this.#queue.shift()
    }

    return this
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => new Promise(cb))
  }

  newLine() {
    this.#addToQueue((resolve) => {
      this.#element.innerHTML += "<br>"
      resolve()
    })

    return this
  }
}

