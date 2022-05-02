// CLOCK WIDGET

function updateTime() {
    const today = new Date();
    // Clock widget
    const secondsRatio = today.getSeconds() / 60;
    const minutesRatio = (secondsRatio + today.getMinutes()) / 60;
    const hourRatio = (minutesRatio + today.getHours()) / 12;

    const hourHand = document.querySelector('.hand.hour');
    const minuteHand = document.querySelector('.hand.minute');
    const secondHand = document.querySelector('.hand.second');

    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hourRatio);
}

updateTime();

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

setInterval(updateTime, 1000);

const today = new Date();
let year = today.getFullYear()
let month = today.getMonth();
let day = today.getDate();

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1);
}

function generateCalendarDays(daysInMonth, firstDayOfMonth = 0) {
    for (let i = 0; i < firstDayOfMonth; i++){
        const calendarDay = document.createElement('li')
        calendarDay.classList.add('prev-calendar-day')
        calendarDay.dataset.day = i
        const spanDay = document.createElement('span')
        calendarDay.appendChild(spanDay)
        daysContainer.appendChild(calendarDay)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const calendarDay = document.createElement('li')
        calendarDay.classList.add('calendar-day')
        calendarDay.dataset.day = i
        const spanDay = document.createElement('span')
        spanDay.textContent = i
        calendarDay.appendChild(spanDay)
        daysContainer.appendChild(calendarDay)
    }
}

function highlightCalendarDay(day) {
    daysContainer.querySelector(`li[data-day="${day}"]`).classList.add('selectedDay')
}

/* QUERY SELECTORS */
const selectedMonth = document.querySelector('#selected-month')
const daysContainer = document.querySelector('#calendar-days')
const prevMonthBtn = document.querySelector('#previous-month-selector')
const nextMonthBtn = document.querySelector('#next-month-selector')
const todayBtn = document.querySelector('#present-month-selector')

// console.log({year, month, day})
// console.log(daysInMonth(month, year))
// console.log(DAYS[getFirstDayOfMonth(month, year).getDay()])


todayBtn.addEventListener('click', ()=> {
    daysContainer.innerHTML = ''
    year = today.getFullYear()
    month = today.getMonth();
    selectedMonth.textContent = `${MONTHS[month]} ${year}`
    const offsetDays = DAYS.indexOf(DAYS[getFirstDayOfMonth(month, year).getDay()])
    generateCalendarDays(daysInMonth(month, year), offsetDays)
    highlightCalendarDay(day)
})

nextMonthBtn.addEventListener('click', ()=> {
    daysContainer.innerHTML = ''
    month++
    if (month === 12) {
        month = 0;
        year++
    }

    selectedMonth.textContent = `${MONTHS[month]} ${year}`
    const offsetDays = DAYS.indexOf(DAYS[getFirstDayOfMonth(month, year).getDay()])
    generateCalendarDays(daysInMonth(month, year), offsetDays)
})

prevMonthBtn.addEventListener('click', () => {
    daysContainer.innerHTML = ''
    month--
    if (month < 0) {
        month = 12;
        year--
    }

    selectedMonth.textContent = `${MONTHS[month]} ${year}`
    const offsetDays = DAYS.indexOf(DAYS[getFirstDayOfMonth(month, year).getDay()])
    generateCalendarDays(daysInMonth(month, year), offsetDays)
})

/* Set up calendar as today */
selectedMonth.textContent = `${MONTHS[month]} ${year}`
const offsetDays = DAYS.indexOf(DAYS[getFirstDayOfMonth(month, year).getDay()])
generateCalendarDays(daysInMonth(month, year), offsetDays)
highlightCalendarDay(day)
