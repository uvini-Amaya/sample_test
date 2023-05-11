import React, {useEffect, useState} from "react";
import "../style.css";
import axios from "axios";
import {Button} from "react-bootstrap";
import Popup from 'reactjs-popup';

 function New() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [answer, setAnswer] = useState("");

     const [timeLeft, setTimeLeft] = useState(3600);
     const [questionCount, setQuestionCount] = useState(1);
     const [score, setScore] = useState(0);
     const [remainingTime, setRemainingTime] = useState(180);
     const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0);


    const correctAnswers = [];
    const wrongAnswers = [];
    let length = wrongAnswers.length;

    useEffect(() => {
        getData();
    }, [questionCount])

    const getData = () => {
        axios({
            method: 'get',
            url: 'https://marcconrad.com/uob/smile/api.php/',
        })
            .then(function (response) {
                setData(response.data);
                setAnswer(response.data.answer);
            }).catch(function (error) {
            console.log(error);
        });
    }

    function Submit(event) {
        event.preventDefault()


        if (value === answer) {

            alert("Right!");


        } else {
            alert("Wrong!");
        }

    }
        function Check(){
            for(let i=0;i<20;i++) {
                if (value === answer) {

                    correctAnswers.push();
                    console.log(correctAnswers.toString());

                } else {
                    wrongAnswers.push();
                    console.log(wrongAnswers.toString());
                    length = length + 1;
                }
            }
        }


        return (
            <div>
                <h1>Test</h1>
                <div>
                    <p>Answer:{data.solution}</p>
                    <img src={data.question}/>

                </div>
<form onSubmit={Submit} >

    <label>Enter the Answer</label>
    <input type="number" onChange={(v) => setAnswer(v.target.value)}/>
    <Button variant="warning" >Check Answer</Button>
</form>


                <Popup trigger=
                           {<Button variant="warning"> Finish </Button>}
                       position="right top">

                    <div>{length}</div>
                </Popup>

            </div>


        )
    }

     export default New;

