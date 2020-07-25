var MongoClient = require('mongodb').MongoClient;
const event = require('../models/event-model');
var randomstring = require("randomstring");

module.exports = {
    createEvent: (req, res) => {
        MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
            if(err) throw err
            var startTime = req.body.startTime,
                endTime = req.body.endTime,
                date = req.body.eventDate,
                startHour = "",
                startMinute="",
                endHour = "",
                endMinute = "",
                year="",
                month="",
                day="";
            for(var i=0;i<2;i++) {
                if(date[0] == "/") {
                    break;
                } else {
                    month += date[0]
                }
                date = date.slice(1)
            }
            date = date.slice(1)
            month = parseInt(month)
            for(var i=0;i<2;i++) {
                if(date[0] == "/") {
                    break;
                } else {
                    day += date[0]
                }
                date = date.slice(1)
            }
            date = date.slice(1)
            day = parseInt(day)
            for(var i=0;i<4;i++) {
                if(date[0] == "/") {
                    break;
                } else {
                    year += date[0]
                }
                date = date.slice(1)
            }
            date = date.slice(1);
            year = parseInt(year);
            for(var i=0;i<2;i++) {
                if(startTime[0] == ":") {
                    break;
                } else {
                    startHour += startTime[0];
                }
                startTime = startTime.slice(1);
            }
            startTime = startTime.slice(1);
            startHour = parseInt(startHour);
            for(var i=0;i<2;i++) {
                if(startTime[0] == ":") {
                    break;
                } else {
                    startMinute += startTime[0]
                }
                startTime = startTime.slice(1)
            }
            startTime = startTime.slice(1);
            startMinute = parseInt(startMinute);
            if(req.body.endTime.length <= 0) {
                endHour = -1;
                endMinute = -1;
            } else {
                for(var i=0;i<2;i++) {
                    if(endTime[0] == ":") {
                        break;
                    } else {
                        endHour += endTime[0];
                    }
                    endTime = endTime.slice(1);
                }
                endTime = endTime.slice(1);
                endHour = parseInt(endHour);
                for(var i=0;i<2;i++) {
                    if(startTime[0] == ":") {
                        break;
                    } else {
                        endMinute += endTime[0]
                    }
                    endTime = endTime.slice(1)
                }
                endTime = endTime.slice(1);
                endMinute = parseInt(endMinute);
            }
            var myData = new event({
                eventID: randomstring.generate({length: 5, charset: 'numeric'}),
                eventName: req.body.eventName,
                startHour: startHour,
                startMinute: startMinute,
                endHour: endHour,
                endMinute: endMinute,
                day: day,
                month: month,
                year: year,
                startAMPM: req.body.startampm,
                endAMPM: req.body.endampm,
                eventDesc: req.body.eventDesc.replace(/(?:\r\n|\r|\n|")/g, '')
            });
            var db = client.db('application');
            db.collection('events').insertOne(myData);
      });
    },
    renderEventDashboard: (req, res) => {
      MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        var eventArray = [];
        db.collection('events').find().forEach(function(myDoc) {
            eventArray.push({eventID: myDoc.eventID, eventName: myDoc.eventName, startHour: myDoc.startHour, startMinute: myDoc.startMinute, endHour: myDoc.endHour, endMinute: myDoc.endMinute, day: myDoc.day, month: myDoc.month, year: myDoc.year, startAMPM: myDoc.startAMPM, endAMPM: myDoc.endAMPM, eventDesc: myDoc.eventDesc });
        }).then(() => {
            eventArray.sort(function(a, b) {
                return new Date(a.year,a.month-1,a.day,a.startHour,a.startMinute,0) - new Date(b.year,b.month-1,b.day,b.startHour,b.startMinute,0)
            });
            res.render('events-dashboard', { allEvents: JSON.stringify(eventArray) });
        })
      });
    },
    renderEventPage: (req, res) => {
      MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        var eventArray = [];
        db.collection('events').find().forEach(function(myDoc) {
            eventArray.push({eventID: myDoc.eventID, eventName: myDoc.eventName, startHour: myDoc.startHour, startMinute: myDoc.startMinute, endHour: myDoc.endHour, endMinute: myDoc.endMinute, day: myDoc.day, month: myDoc.month, year: myDoc.year, startAMPM: myDoc.startAMPM, endAMPM: myDoc.endAMPM, eventDesc: myDoc.eventDesc });
        }).then(() => {
            eventArray.sort(function(a, b) {
                return new Date(a.year,a.month-1,a.day,a.startHour,a.startMinute,0) - new Date(b.year,b.month-1,b.day,b.startHour,b.startMinute,0)
            });
            res.render('events', {allEvents: JSON.stringify(eventArray)});
        })
      });
    },
    renderEventEditor: (req, res) => {
      MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        db.collection('events').find().forEach(function(myDoc) {
            if(myDoc.eventID == req.params.eventID) {
                res.render('events-editor', {event: true, eventObj: JSON.stringify(myDoc)});
            }
        })
      });
    },
    editEvent: (req,res) => {
      MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        var startTime = req.body.startTime,
            endTime = req.body.endTime,
            date = req.body.eventDate,
            startHour = "",
            startMinute="",
            endHour = "",
            endMinute = "",
            year="",
            month="",
            day="";
        for(var i=0;i<2;i++) {
            if(date[0] == "/") {
                break;
            } else {
                month += date[0]
            }
            date = date.slice(1)
        }
        date = date.slice(1)
        month = parseInt(month)
        for(var i=0;i<2;i++) {
            if(date[0] == "/") {
                break;
            } else {
                day += date[0]
            }
            date = date.slice(1)
        }
        date = date.slice(1)
        day = parseInt(day)
        for(var i=0;i<4;i++) {
            if(date[0] == "/") {
                break;
            } else {
                year += date[0]
            }
            date = date.slice(1)
        }
        date = date.slice(1);
        year = parseInt(year);
        for(var i=0;i<2;i++) {
            if(startTime[0] == ":") {
                break;
            } else {
                startHour += startTime[0];
            }
            startTime = startTime.slice(1);
        }
        startTime = startTime.slice(1);
        startHour = parseInt(startHour);
        for(var i=0;i<2;i++) {
            if(startTime[0] == ":") {
                break;
            } else {
                startMinute += startTime[0]
            }
            startTime = startTime.slice(1)
        }
        startTime = startTime.slice(1);
        startMinute = parseInt(startMinute);
        
        if(req.body.endTime.length <= 0) {
            endHour = -1;
            endMinute = -1;
        } else {
            for(var i=0;i<2;i++) {
                if(endTime[0] == ":") {
                    break;
                } else {
                    endHour += endTime[0];
                }
                endTime = endTime.slice(1);
            }
            endTime = endTime.slice(1);
            endHour = parseInt(endHour);
            for(var i=0;i<2;i++) {
                if(startTime[0] == ":") {
                    break;
                } else {
                    endMinute += endTime[0]
                }
                endTime = endTime.slice(1)
            }
            endTime = endTime.slice(1);
            endMinute = parseInt(endMinute);
        }
        db.collection('events').updateOne({"eventID": req.params.eventID}, {"$set": {
            "eventName": req.body.eventName,
            "startHour": startHour,
            "startMinute": startMinute,
            "endHour": endHour,
            "endMinute": endMinute,
            "day": day,
            "month": month,
            "year": year,
            "startAMPM": req.body.startampm,
            "endAMPM": req.body.endampm,
            "eventDesc": req.body.eventDesc
        }});
      });
    },
    deleteEvent: (req,res) => {
        MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        db.collection('events').deleteOne({"eventID": req.params.eventID})
      });
    },
    checkExpired: () => {
        MongoClient.connect("mongodb://localhost:27017/application", function(err, client) {
        if (err) throw err
        var db = client.db('application');
        db.collection('events').find().forEach(function(myDoc) {
            if(myDoc.endHour == -1) {
                var date = new Date(myDoc.year,myDoc.month-1,myDoc.day,myDoc.startHour,myDoc.startMinute,0)
            } else {
                var date = new Date(myDoc.year,myDoc.month-1,myDoc.day,myDoc.endHour,myDoc.endMinute,0)
            }
            if((date - (Date.now() - 86400000)) < 0) {
                db.collection('events').deleteOne({"eventID": myDoc.eventID})
            }
        })
      });
    }
};