const { GraphQLError } = require('graphql');
const db = require('./db');

function randomIDGenerator() {
    return Math.floor(Math.random() * 100);       
  }

const Query = {
    doctorByName: (root,args,context,info) => { 
        return db.doctors.find(doctor => doctor.name === args.name);
    },
    appointmentByDoctorName: (root, args, context, info) => {
        return db.appointments.filter(appointment => appointment.doctor_name === args.doctor_name);
    }
}

const Mutation = {
    createDoctor:(root,args,context,info) => {
        if (db.doctors.find(doctor => doctor.name === args.name)) {
            throw new GraphQLError("Doctor is already existed", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }
        var newId = "doctor" + (db.doctors.length + 1);
        var e = {
            id: newId,
            name: args.name,
            clinic_name: args.clinic_name,
            specialty: args.specialty};
        db.doctors.push(e);
        return e;
    },

    createPatient:(root,args,context,info) => {
        if (db.patients.find(patient => patient.name === args.name)) {
            throw new GraphQLError("Patient is already existed", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }
        var newId = "patient" + (db.patients.length + 1);
        var e = {
            id: newId,
            name: args.name,
            age: args.age,
            email: args.email};
        db.patients.push(e);
        return e;
    },

    createTimeslot:(root,args,context,info) => {
        if (db.timeslots.find(timeslot => timeslot.start_time === args.start_time &&
                                          timeslot.end_time === args.end_time )) {
            var e = {
                start_time: args.start_time,
                end_time: args.end_time
            };                
            return e;
        } else {
            throw new GraphQLError("30 minute slots from 9am to 5pm only", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }
    },

    createAppointment:(root,args,context,info) => {
        if (db.appointments.find(appointment => appointment.doctor_name === args.doctor_name &&
                                                appointment.time.start_time === args.time.start_time &&
                                                appointment.time.end_time === args.time.end_time)) {
            throw new GraphQLError("Appointment is already existed", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }

        if (db.doctors.find(doctor => doctor.name === args.doctor_name) === undefined) {
                throw new GraphQLError("Such Doctor does not exist", {
                    extensions: {
                        code: "BAD_REQUEST",
                },
            });
        }

        if (db.timeslots.find(timeslot => timeslot.start_time === args.time.start_time &&
                                          timeslot.end_time === args.time.end_time )) {

            var new_id = "appointment" + randomIDGenerator();
            while (db.appointments.find(appointment => appointment.id === new_id)) {
                new_id = "appointment" + randomIDGenerator();
            }         
            var e = {
                id: new_id,
                doctor_name: args.doctor_name,
                time: args.time
            }
            db.appointments.push(e);
            return e;
        } 
        throw new GraphQLError("30 minute slots from 9am to 5pm only", {
            extensions: {
                code: "BAD_REQUEST",
            },
        });
    },

    deleteAppointment:(root,args,context,info) => {
        for (let idx = 0; idx < db.appointments.length; idx++) {
            if (db.appointments[idx].doctor_name === args.doctor_name &&
                db.appointments[idx].time.start_time === args.time.start_time &&
                db.appointments[idx].time.end_time === args.time.end_time) {
                    let res = db.appointments[idx];
                    db.appointments.splice(idx, 1);
                    return res;
                }
        }
        throw new GraphQLError("Appointment does not exist", {
            extensions: {
                code: "BAD_REQUEST",
            },
        });
    },

    createEvent:(root,args,context,info) => {
        if (db.events.find(event => event.patient_name === args.patient_name &&
                                    event.time.start_time === args.time.start_time &&
                                    event.time.end_time === args.time.end_time)) {
            throw new GraphQLError("Each patient cannot book 2 different events at same timelsot", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }

        if (db.doctors.find(doctor => doctor.name === args.doctor_name) === undefined) {
            throw new GraphQLError("Such Doctor does not exist", {
                 extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }

        if (db.patients.find(patient => patient.name === args.patient_name) === undefined) {
            throw new GraphQLError("Such Patient does not exist", {
                extensions: {
                    code: "BAD_REQUEST",
                },
            });
        }

        if (db.timeslots.find(timeslot => timeslot.start_time === args.time.start_time &&
                                          timeslot.end_time === args.time.end_time )) {

            var new_id = "event" + randomIDGenerator();
            while (db.events.find(event => event.id === new_id)) {
                new_id = "event" + randomIDGenerator();
            }         
            var e = {
                id: new_id,
                doctor_name: args.doctor_name,
                patient_name: args.patient_name,
                time: args.time
            }
            db.events.push(e);
            return e;
        } 
        throw new GraphQLError("30 minute slots from 9am to 5pm only", {
            extensions: {
                code: "BAD_REQUEST",
            },
        });
    },

    deleteEvent:(root,args,context,info) => {
        for (let idx = 0; idx < db.events.length; idx++) {
            if (db.events[idx].patient_name === args.patient_name &&
                db.events[idx].time.start_time === args.time.start_time &&
                db.events[idx].time.end_time === args.time.end_time) {
                    let res = db.events[idx];
                    db.events.splice(idx, 1);
                    return res;
                }
        }
        throw new GraphQLError("Event does not exist", {
            extensions: {
                code: "BAD_REQUEST",
            },
        });
    },

    updateEvent:(root,args,context,info) => {
        for (let idx = 0; idx < db.events.length; idx++) {
            if (db.events[idx].doctor_name === args.doctor_name &&
                db.events[idx].time.start_time === args.time.start_time &&
                db.events[idx].time.end_time === args.time.end_time) {
                    db.events[idx].patient_name = args.new_patient_name
                    return db.events[idx];
                }
        }
        throw new GraphQLError("Event does not exist", {
            extensions: {
                code: "BAD_REQUEST",
            },
        });
    }
}
    

module.exports = {
    Query,
    Mutation
}