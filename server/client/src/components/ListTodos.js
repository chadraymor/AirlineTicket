import React, {Fragment, useEffect, useState} from "react";
import BookTodo from "./BookTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);


    return <Fragment>
    <h1 className ="text-center mt-5">Airline Reservation</h1>
    <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Departure Airport</th>
        <th>Arrival Airport</th>
        <th>Departure Time</th>
        <th>Arrival Time</th>
        <th>Seats Available</th>
        <th>Cost</th>
        <th>Book Seats</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(flight => (
          <tr key={flight.flight_id}>
              <td>{flight.departure_airport}</td>
              <td>{flight.arrival_airport}</td>
              <td>{flight.scheduled_departure} </td>
              <td>{flight.scheduled_arrival}</td>
              <td>{flight.seats_available}</td>
              <td>${flight.cost}</td>
              <td>
                <BookTodo f_id={flight.flight_id} f_cost={flight.cost} f_dep={flight.departure_airport}
                f_arr={flight.arrival_airport} numSeats={flight.seats_available}/>
              </td>
          </tr>
      ))}
    </tbody>
  </table>
  </Fragment>;
};
export default ListTodos;