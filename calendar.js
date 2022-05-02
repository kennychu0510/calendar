const dayjs = require('dayjs');
import "./calendar.css";
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const INITIAL_YEAR = dayjs().format('YYYY');
const INITIAL_MONTH = dayjs().format('M');

const daysOfWeekElement = document.querySelector('#days-of-week');

WEEKDAYS.forEach((weekday) => {
    const weekDayElement = document.createElement('li');
    daysOfWeekElement.appendChild(weekDayElement);
    weekDayElement.innerText = weekday;
});

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

let currentMonthDays = createDaysForCurrentMonth(INITIAL_YEAR, INITIAL_MONTH);
let previousMonthDays = createDaysForPreviousMonth(INITIAL_YEAR, INITIAL_MONTH);
let nextMonthDays = createDaysForNextMonth(INITIAL_YEAR, INITIAL_MONTH);

let days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index+1}`).format('YYYY-MM-DD'),
            daysOfMonth: index + 1,
            isCurrentMonth: true,
        };
    });
}

function getWeekday(date) {
    return dayjs(date).weekday();
}

// For creating the days shown for the previous month
function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;
    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date).subtract(visibleNumberOfDaysFromPreviousMonth, 'day').date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month()+1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format('YYYY-MM-DD'),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
        };
    });
}

// For creating the days shown for the next month
function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`);
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(`${year}-${Number(month)+1}-${index+1}`).format('YYYY-MM-DD'),
            dayOfMonth: index + 1,
            isCurrentMonth: false,
        };
    });
}

const calendarDaysElement = document.querySelector('#calendar-days');
removeAllDayElements(calendarDaysElement);

function appendDay(day, calendarDaysElement) {
    const dayElement = document.createElement('li');
    const dayElementClassList = dayElement.classList;

    dayElementClassList.add('calendar-day');

    const dayOfMonthElement = document.createElement('span');

    dayOfMonthElement.innerText = day.dayOfMonth;

    if (!day.isCurrentMonth) {
        dayElementClassList.add('calendar-day--not-current');
    }

    dayElement.appendChild(dayOfMonthElement);
    calendarDaysElement.appendChild(dayElement);

    if (day.date === TODAY) {
        dayElementClassList.add('calendar-day--today');
    }
}

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    document.querySelector('#selected-month').innerText = dayjs(new Date(year, month - 1)).format('MMMM YYYY');

    const calendarDaysElement = document.querySelector('#calendar-days');
    removeAllDayElements(calendarDaysElement);

    currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth(),
    );

    previousMonthDays = createDaysForPreviousMonth(year, month);
    nextMonthDays = createDaysForNextMonth(year, month);
    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    days.forEach(day => {
        appendDay(day, calendarDaysElement);
    });
}

function removeAllDayElements(calendarDaysElement) {
    let first = calendarDaysElement.firstElementChild;
    while (first) {
        first.remove();
        first = calendarDaysElement.firstElementChild
    }
}

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));

function initMonthSelectors() {
    document
        .getElementById("previous-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).subtract(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });


    document
        .getElementById("present-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });


    document
        .getElementById("next-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).add(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
        });
}

initMonthSelectors();


const TODAY = dayjs().format("YYYY-MM-DD");



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
