const colors = require('colors')

let args = (process.argv.slice(2))
let interval = []

const createArr = (min, max) => {
    if (!isNaN(min) && !isNaN(max) && min !== '' && max !== '') {
        for (min; min <= max; min++) {
            interval.push(Number.parseInt(min));
        }
    } else {
        console.log(colors.red("Введенные значения не являются числом"))
    }

}

createArr(args[0], args[1])

let count = 0

interval.forEach((i) => {
    if (count === 0 && i % 1 === 0) {
        count++
        console.log(colors.green(i))
    } else if (count === 1 && i % 1 === 0) {
        count++
        console.log(colors.yellow(i))
    } else if (count === 2 && i % 1 === 0) {
        count = 0
        console.log(colors.red(i))
    } else {
        console.log(colors.red('Что-то пошло не так'))
    }
})
