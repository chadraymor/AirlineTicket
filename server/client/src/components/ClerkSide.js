import React, {useEffect, useState} from "react";
import ListExtra from "./ListExtra";
import ListPass from "./ListPass";

const { Fragment } = require("react");
const ClerkSide = () => {

    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            getTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
    <Fragment>
        <div class="form-group row">
            <div class="col-md-6">
                <ListPass />
            </div>
            <div class="col-md-6">
                <ListExtra />
            </div>
        </div>
    </Fragment>)}

export default ClerkSide;