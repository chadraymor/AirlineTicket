import React, { Fragment, useEffect, useState } from "react";

const ListPass = () => {

    const [todos, setTables] = useState([]);
    const getTables = async e => {
        try{
            const response = await fetch("http://localhost:5000/todos/tf");
            const jsonData = await response.json();
            
            console.log(jsonData)
            setTables(jsonData);
        }catch (err){
            console.error(err.message);
        }
    }
    
    useEffect(()=>{
        getTables();
    }, []);
    return <Fragment><button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#myModal">
    Passengers
  </button>
  
  <div class="modal" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
  
        <div class="modal-header">
          <h4 class="modal-title">Passengers</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">
            <table class="table">
                <thead>
                <tr>
                    <th>Flight ID</th>
                    <th>Ticket Number</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(ticket_flights => (
                    <tr>
                            <td>{ticket_flights.flight_id}</td>
                            <td>{ticket_flights.ticket_no} </td>
                            <td>{ticket_flights.passenger_name}</td>
                            <td>{ticket_flights.phone}</td>
                            <td>{ticket_flights.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
  
      </div>
    </div>
  </div></Fragment>;
};

export default ListPass;