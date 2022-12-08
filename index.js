let employees=  [];
let createEmployeeRecord = field =>{
    return {
        firstName: field[0],
        familyName: field[1],
        title: field[2],
        payPerHour: field[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = employeeData => {
    return employeeData.map(function(field){
        return createEmployeeRecord(field)
    })
}

const timeInEvents = []
let createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const timeOutEvents = []
let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let workingHours =[]
let hoursWorkedOnDate = (employee, requiredDate) => {
    let inEvent = employee.timeInEvents.find( e => {return e.date === requiredDate})

    let outEvent = employee.timeOutEvents.find( e => {return e.date === requiredDate})

        return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = (employee, requiredDate) => {
    let wage = hoursWorkedOnDate(employee, requiredDate)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = employee => {
    let eligibleDates = employee.timeInEvents.map(e => {
        return e.date
    })

    let payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(rec => {
    return rec.firstName === firstName
  })
}

let calculatePayroll = arrayOfEmployeeRecords => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => {
        return memo + allWagesFor(rec)
    }, 0)
}

