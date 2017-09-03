/* Get our elements */

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

/* Build out functions */

// function togglePlay() {
//   if (video.paused) {
//     video.play()
//   } else {
//     video.pause()
//   }
// }

// function togglePlay() {
//   const method = video.paused ? 'play' : 'pause'
//   video[method]()
// }

function togglePlay() {
  video[video.paused ? 'play' : 'pause']()
}

function updateButton() {
  // const icon = this.paused ? '►' : '❚ ❚'
  // toggle.textContent = icon
  toggle.textContent = this.paused ? '►' : '❚ ❚'
  // console.log('Update the button')
}

function skip() {
  // console.log('Skipping!')
  // console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip) //parseFloat converts a string to number
}

function handleRangeUpdate() {
  video[this.name] = this.value // key value pair eg { volume: 0.6 }
  // console.log(this.name)
  // console.log(this.value)
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(event) {
  const scrubTime = event.offsetX / progress.offsetWidth * video.duration
  video.currentTime = scrubTime
  // console.log(event)
  // console.log(event.offsetX)
  // console.log(progress.offsetWidth)
  // console.log(video.duration)
  // console.log(event.offsetX / progress.offsetWidth * video.duration)
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress) // timeupdate or progress

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
// progress.addEventListener('mousemove', scrub)

// progress.addEventListener('mousemove', () => {
//   if (mousedown) {
//     scrub()
//   }
// })

progress.addEventListener('mousemove', event => mousedown && scrub(event)) // if user mouse is down, move onto executing scrub

progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
