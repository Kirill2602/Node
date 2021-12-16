// ========================= Задание № 1 ====================================

// console.log('Record 1');
//
// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3'); // в методичке console написано с русской буквой "С"
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
//
// console.log('Record 5');
//
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

// Record 1, Record 5, Record 6, Record 2, Record 3, Record 4

// ==================================== Задание № 2 ===========================================

// Формат вводимых значений 11-11-11-1111 hour-day-month-year
const moment = require("moment");
const EventEmitter = require('events');
const emitter = new EventEmitter();

const args = process.argv.slice(2);
let date = args[0];

if (!date) {
    console.log('Укажите дату и время');
    return;
} else {
    date = date.split('-');
}


date = new Date(date[3], date[2] - 1, date[1], date[0]);
let time = date.getTime();
const delay = 1000;

if (isNaN(time)) {
    console.log('Укажите дату в правильном формате!');
    return;
}

let payload = null;
let flag = true;
const run = async () => {
    let currentTime = new Date().getTime();
    if (flag) {
        let diffTime = time - currentTime;
        let duration = moment.duration(diffTime, 'milliseconds');
        payload = `${duration._data.years} years, ${duration._data.months} months, ${duration._data.days} days, ${duration._data.hours} hours, ${duration._data.minutes} minutes, ${duration._data.seconds} seconds`;
        if (duration <= 0) {
            payload = 'END!';
            flag = false;
        }
    } else {
        return;
    }

    emitter.emit('dataOutput', payload);
    await new Promise(resolve => setTimeout(resolve, delay));
    await run();
}

class Handler {
    static dataOutput(payload) {
        console.log('Отсчет: ', payload);
    }

    static err() {
        emitter.emit('error', 'Что-то пошло не так!')
    }
}

emitter.on('dataOutput', Handler.dataOutput);
emitter.on('err', console.log)

run();