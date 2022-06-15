const express = require("express")
const app = express()
const cors = require("cors");
const pool = require("./db");
const fs = require('fs');

const sstartT = "BEGIN TRANSACTION"
const sendT = "COMMIT TRANSACTION;"

//middleware
app.use(cors())
app.use(express.json()); //req.body

app.get("/todos", async(req,res) => {
    try {
        
        const q = "SELECT flight_id, departure_airport, arrival_airport,\
        scheduled_departure::date, scheduled_arrival::date, seats_available, cost, movie, meal FROM Z3LMPV.flights\
        WHERE seats_available > 0 ORDER BY departure_airport"
        const startT = await pool.query(sstartT);
        const allTodos = await pool.query(q);
        const endT = await pool.query(sendT);
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/todos/tf", async(req,res) => {
    try {
        const q = "SELECT flight_id, ticket_no, passenger_name, email, phone FROM Z3LMPV.ticket_flights ORDER BY flight_id"
        const startT = await pool.query(sstartT);
        const lPass = await pool.query(q);
        const endT = await pool.query(sendT);
        res.json(lPass.rows)
    } catch (err) {
        console.error(err.message);
    }
})

function incBookRef(index) {
    var newChar = bref.charCodeAt(index)+1;
    if (newChar === 58){
        newChar = 65
    }
    else if (newChar === 91){
        newChar = 48;
        incBookRef(index-1);
    }
    var numRight = bref.length-index-1 
    bref = bref.substr(0,index)+String.fromCharCode(newChar)+bref.substr(index+1,numRight);
}
var bref = '000000'
var numPass;
function incTicketNo(index) {
    var newChar = tno.charCodeAt(index)+1;
    if (newChar === 58){
        newChar = 65
    }
    else if (newChar === 91){
        newChar = 48;
        incTicketNo(index-1);
    }
    var numRight = tno.length-index-1 
    tno = tno.substr(0,index)+String.fromCharCode(newChar)+tno.substr(index+1,numRight);
}
var tno = '0000000000000'
//insert customer, bookings, ticket, ticketFlight
app.post("/todos", async(req,res) => {
    try {
        name = req.body.name;
        email = req.body.email;
        phone = req.body.phone;
        numPass = req.body.numPass;
        card = req.body.card;
        fCost = req.body.finalCost;
        /*above variables are for customer/booking info, below are for ticket/ticket_flights*/
        names = req.body.names;
        id = req.body.f_id;
        ticketCost = req.body.f_cost;
        var namesArr = names.split(',');
        const startT = await pool.query("START TRANSACTION");
        const newCustomer = await pool.query("INSERT INTO Z3LMPV.customer (customer_name,email,phone,cardno)\
        VALUES($1,$2,$3,$4)",[name,email,phone,card]);
        const newBooking = await pool.query("INSERT INTO Z3LMPV.bookings (book_ref,book_date,total_amount,\
        num_passengers) VALUES($1,CURRENT_TIMESTAMP,$2,$3)",[bref,fCost,numPass]);
        const ticket1 = await pool.query("INSERT INTO Z3LMPV.ticket (ticket_no,book_ref,passenger_name)\
        VALUES($1,$2,$3)",[tno,bref,namesArr[0]]);
        const ticketFlights1 = await pool.query("INSERT INTO Z3LMPV.ticket_flights (ticket_no,flight_id,passenger_name,\
        email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)",[tno,id,namesArr[0],email,phone,ticketCost]);
        incTicketNo(12);
        if (numPass > 1){
            const ticket2 = await pool.query("INSERT INTO Z3LMPV.ticket (ticket_no,book_ref,passenger_name)\
            VALUES($1,$2,$3)",[tno,bref,namesArr[1]]);
            const ticketFlights2 = await pool.query("INSERT INTO Z3LMPV.ticket_flights (ticket_no,flight_id,passenger_name,\
            email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)",[tno,id,namesArr[1],email,phone,ticketCost]);
            incTicketNo(12);
        }
        if (numPass > 2){
            const ticket3 = await pool.query("INSERT INTO Z3LMPV.ticket (ticket_no,book_ref,passenger_name)\
            VALUES($1,$2,$3)",[tno,bref,namesArr[2]]);
            const ticketFlights3 = await pool.query("INSERT INTO Z3LMPV.ticket_flights (ticket_no,flight_id,passenger_name,\
            email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)",[tno,id,namesArr[2],email,phone,ticketCost]);
            incTicketNo(12);
            }
        if (numPass > 3){
            const ticket4 = await pool.query("INSERT INTO Z3LMPV.ticket (ticket_no,book_ref,passenger_name)\
            VALUES($1,$2,$3)",[tno,bref,namesArr[3]]);
            const ticketFlights4 = await pool.query("INSERT INTO Z3LMPV.ticket_flights (ticket_no,flight_id,passenger_name,\
            email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)",[tno,id,namesArr[3],email,phone,ticketCost]);
            incTicketNo(12);
        }
        if (numPass > 4){
            const ticket5 = await pool.query("INSERT INTO Z3LMPV.ticket (ticket_no,book_ref,passenger_name)\
            VALUES($1,$2,$3)",[tno,bref,namesArr[4]]);
            const ticketFlights5 = await pool.query("INSERT INTO Z3LMPV.ticket_flights (ticket_no,flight_id,passenger_name,\
            email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)",[tno,id,namesArr[4],email,phone,ticketCost]);
            incTicketNo(12);
            }
        const comT = await pool.query("COMMIT TRANSACTION;");
        incBookRef(5);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todos
app.put("/todos", async(req,res) => {
    try {
        numPass = req.body.numPass;
        id = req.body.f_id;
        const startT = await pool.query("START TRANSACTION");
        const updateAvail = await pool.query("UPDATE Z3LMPV.flights SET seats_available=seats_available-$1\
         WHERE flight_id = $2",[numPass,id]);
         const updateBooked = await pool.query("UPDATE Z3LMPV.flights SET seats_booked=seats_booked+$1\
         WHERE flight_id = $2",[numPass,id]);
        const comT = await pool.query("COMMIT TRANSACTION;");
    }
    catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})