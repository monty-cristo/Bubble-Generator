const scoreDisplay = document.querySelector("#score")

const btnPause = document.querySelector("#pause")
const btnPlay = document.querySelector("#play")
const btnReset = document.querySelector("#reset")

let score = 0
let interval

btnPause.addEventListener("click", pause)
btnPlay.addEventListener("click", play)
btnReset.addEventListener("click", reset)

function play() {
  clearInterval(interval)

  interval = setInterval(() => {
    const bubble = document.createElement("span")
    bubble.classList.add("bubble")
    document.body.appendChild(bubble)

    // Using the new css typed object model instead of the old untyped one
    // https://developer.chrome.com/blog/cssom
    // It has quite a few benefits but browser support probably isn't there yet
    const size = CSS.vmax(Math.random() * 15 + 5)
    bubble.attributeStyleMap.set("width", size)
    bubble.attributeStyleMap.set("height", size)

    bubble.attributeStyleMap.set("bottom", CSS.percent(Math.random() * 20 + 5))
    bubble.attributeStyleMap.set("left", CSS.percent(Math.random() * 100))

    const plusMinus = Math.random() > 0.5 ? 1 : -1
    // Custom properties still have to use the string version which is kinda annoying
    bubble.attributeStyleMap.set("--x-translation", `${Math.random() * 100 * plusMinus}vw`)

    bubble.addEventListener("click", () => {
      score++
      scoreDisplay.textContent = score
      bubble.remove()
    })

    setTimeout(() => {
      bubble.remove()
    }, 8000)
  }, 300)
}


function pause() {
  clearInterval(interval)
}

function reset() {
  pause()
  score = 0
  scoreDisplay.textContent = score
}