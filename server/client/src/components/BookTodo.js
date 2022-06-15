import React, { Fragment, useState } from "react";


const BookTodo = ({f_id, f_cost, f_dep, f_arr, numSeats}) => {
    
   /* const [description, setDescription] = useState(flight.flight_id);*/
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [numPass,setNumPass] = useState(1);
    const [card,setCard] = useState("");
    const [names,setNames] = useState('');
    
    const submitForm = async(e) => {
        e.preventDefault();
        try{
            var finalCost = numPass*f_cost;
            const body = {name, email, phone, numPass, card, finalCost,f_id,f_cost,names};
            const postPurchaseInfo = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(body)
            });
        } catch (err) {
            console.error(err.message);
        }
    }
    const updateFlights = async(e) => {
        e.preventDefault();
        try {
            const body = {numPass, f_id};
            const updateSeats = await fetch("http://localhost:5000/todos" , {
                method: "PUT",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    const styles = {
        row:{
            marginLeft:2
        }
    };
    function reset() {
        setNumPass(1);
    }
    function setToZero () {
        if (numPass === 1){
            setNumPass(1);
        }
    }
    function setToFive (){
        if (numPass===numSeats){
            setNumPass(numPass);
        }
        if (numPass === 5){
            setNumPass(5);
        }
    }
    if (!f_id){
        return null;
    }
    
    return <Fragment>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${f_id}`}
    onClick={e=>reset()}>
    Book
    </button>
    <div class="modal" id={`id${f_id}`}>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Reserve Seats From {f_dep} to {f_arr}
                <p class="row" style={styles.row}>{numSeats} Seats Available</p>
                </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            <div class="modal-body">
            <div class="form-group">
                <label for="custName" class="control-label" value = "0">Name</label>
                <input type="text" className="form-control" placeholder = "Enter full name" 
                value = {name} onChange={e => setName(e.target.value)}
                id="custName"/>
            </div>
            <div class="form-group">
                <label for="custEmail" class="control-label">Email address</label>
                <input type="email" className="form-control" placeholder = "Enter email" id="custEmail"
                value = {email} onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label for="custPhone" class="control-label">Phone</label>
                <input type="number" className="form-control" placeholder = "Enter phone number"
                value = {phone} onChange={e => setPhone(e.target.value)}
                id="custPhone"/>
            </div>
            <div class="form-group">
                <label for="num" class="control-label">Number of Passengers:</label>
                <div class="form-group">
                <div class="card w-25 mx-auto">
                <div class="btn-group" role="group">
                <button type="button" class="btn btn-danger btn-sm" onClick={e=>{setNumPass(numPass-1);
                    setToZero()}}>-1</button>
                <div class="card-body">
                    <p class="card-text">{numPass}</p>
                </div>
                <button type="button" class="btn btn-success btn-sm" onClick={e=>{ setNumPass(numPass+1);
                    setToFive()}} >+1</button>
                </div>
                </div>
               {/*} <input type="number" className="form-control" placeholder = "1+" id="num"
                value = {numPass} onChange={e => setNumPass(e.target.value)} />*/}                
                </div>
            </div>
            <div class="form-group">
                <label for="passNames" class="control-label">Passenger Names</label>
                <input type="text" className="form-control" 
                placeholder = "Enter passenger names- Separate each person with a comma" id="passName"
                value = {names} onChange={e => {setNames(e.target.value)}}
                />
            </div>
            <div class="form-group">
                <label for="custPhone" class="control-label">Card Number</label>
                <input type="number" className="form-control" placeholder = "Enter card number" id="custCard"
                value = {card} onChange={e => {setCard(e.target.value)}}
                />
            </div>
            <div class="form-group">
                <label for="finalTotal" class="control-label">Final Total: ${numPass*f_cost}</label>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal"
                onClick = {e => {submitForm(e); updateFlights(e)}}
                >Book</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    </Fragment>

    };

    /*return <Fragment>
        <button className="btn btn-success" onClick={() => Book()}>Book</button>
    </Fragment>*/

    export default BookTodo;
