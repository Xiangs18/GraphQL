const timeslots=[{
    start_time: "9:00am",
    end_time: "9:30am"
    },{
    start_time: "9:30am",
    end_time: "10:00am"
    },{
    start_time: "10:00am",
    end_time: "10:30am"
    },{
    start_time: "10:30am",
    end_time: "11:00am"
    },{
    start_time: "11:00am",
    end_time: "11:30am"
    },{
    start_time: "11:30am",
    end_time: "12:00pm"
    },{
    start_time: "12:00pm",
    end_time: "0:30pm"
    },{
    start_time: "0:30pm",
    end_time: "1:00pm"
    },{
    start_time: "1:00pm",
    end_time: "1:30pm"
    },{
    start_time: "1:30pm",
    end_time: "2:00pm"
    },{
    start_time: "2:00pm",
    end_time: "2:30pm"
    },{
    start_time: "2:30pm",
    end_time: "3:00pm"
    },{
    start_time: "3:00pm",
    end_time: "3:30pm"
    },{
    start_time: "3:30pm",
    end_time: "4:00pm"
    },{
    start_time: "4:00pm",
    end_time: "4:30pm"
    },{
    start_time: "4:30pm",
    end_time: "5:00pm"
    }
]


const doctors =[{
    id: "doctor1",
    name: "Sijie",
    clinic_name: "Sijie's clinic",
    specialty: "a",
   },{
    id: "doctor2",
    name: "Sunny",
    clinic_name: "Sunny's clinic",
    specialty: "b",
}]

const patients =[{
    id: "patient1",
    name: "siquan",
    age: 12,
    email: "siquan@cmu.edu",
   },{
    id: "patient2",
    name: "mingren",
    age: 15,
    email: "mingren@cmu.edu",
}]

const appointments=[{
    id: "appointment1",
    doctor_name: "Sijie",
    time: timeslots[0],
    },{
    id: "appointment2",
    doctor_name: "Sijie",
    time: timeslots[1],
    },{
    id: "appointment3",
    doctor_name: "Sunny",
    time: timeslots[2],
    }
]

const events=[{
    id: "event1",
    doctor_name: "Sijie",
    patient_name: "siquan",
    time: timeslots[6],
    },{
    id: "event2",
    doctor_name: "Sijie",
    patient_name: "siquan",
    time: timeslots[7],
    },{
    id: "event3",
    doctor_name: "Sunny",
    patient_name: "mingren",
    time: timeslots[8],
    }
]

module.exports = {
    doctors,
    timeslots,
    appointments,
    patients,
    events
}