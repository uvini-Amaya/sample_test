import React from "react";
import "../style.css";
import img1 from "../../Images/img1.jpg";
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
function Homepage(){
    return(
        <div>
            <h2>Welcome</h2>
            <img src={img1}></img>
            <br/>
            <br/>
            <div><Button variant="success"><Link to={'/new1'}>Test</Link></Button></div>

        </div>
    )
}
export default Homepage;