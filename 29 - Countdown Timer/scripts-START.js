let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const showStopButton = document.querySelector('.hideButton')

function timer(seconds) {
	// this doesn't work because setInterval stops/pauses
	// when you click away from the page
	// setInterval(function() {
	// 	seconds--
	// }, 1000)

	// clear any existing timers
	clearInterval(countdown)

	const now = Date.now()
	const then = now + seconds * 1000
	// console.log({ now, then })
	displayTimeLeft(seconds)
	displayEndTime(then)
	showStopButton.classList.remove('hideButton')

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000)
		// check if we should stop it!
		if (secondsLeft < 0) {
			clearInterval(countdown)
			return
		}
		// display it
		// console.log(secondsLeft)
		displayTimeLeft(secondsLeft)
	}, 1000)
}

function displayTimeLeft(seconds) {
	// console.log(seconds)
	const minutes = Math.floor(seconds / 60)
	const remainderSeconds = seconds % 60
	// console.log({ minutes, remainderSeconds })
	const display = `${minutes}:${remainderSeconds < 10
		? '0'
		: ''}${remainderSeconds}`
	document.title = display
	timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp)
	const hour = end.getHours()
	const adjustedHour = hour > 12 ? hour - 12 : hour
	const minutes = end.getMinutes()
	// endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
	// endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10
		? '0'
		: ''}${minutes}`
}

function startTimer() {
	// console.log(this)
	// console.log(this.dataset)
	// console.log(this.dataset.time)
	const seconds = parseInt(this.dataset.time)
	// console.log(seconds)
	timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

// form and input with "name" attributes can be accessed directly
// don't need to use document.querySelector

document.customForm.addEventListener('submit', function(event) {
	event.preventDefault()
	const mins = this.minutes.value
	console.log(mins)
	timer(mins * 60)
	this.reset()
})

function stopClock() {
	clearInterval(countdown)
}
