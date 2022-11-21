const { v4: uuid } = require('uuid');

module.exports.date = new Date();

module.exports.days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

module.exports.months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

module.exports.toDos = [
    {
        id: uuid(),
        date: new Date(),
        task: 'Buy Pizza on the way to work!',
        time: '12:00',
        description: 'test description here'
    },
    {
        id: uuid(),
        date: new Date(),
        task: '10AM meeting',
        time: '07:00',
        description: 'test description here'
    },
    {
        id: uuid(),
        date: new Date(),
        task: 'Work Lunch with the dudes',
        time: '10:00',
        description: 'test description here'
    }
    
]