import React, { Fragment, useEffect, useState } from "react";

const ListExtra = () => {

    const [todos, setTables] = useState([]);

    const getTables = async () => {
        try{
            const response = await fetch("http://localhost:5000/todos");
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
    return <Fragment><button type="button" class="btn btn-info" data-toggle="modal" data-target="#mModal">
    Info
  </button>
  
  <div class="modal" id="mModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
  
        <div class="modal-header">
          <h4 class="modal-title">Info</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">
            <table class="table">
                <thead>
                <tr>
                    <th>Flight ID</th>
                    <th>Movie</th>
                    <th>Meal</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(flights => (
                    <tr>
                          <td>{flights.flight_id}</td>
                          <td>{flights.movie}</td>
                          <td>{flights.meal}</td>   
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

export default ListExtra