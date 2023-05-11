import React, {useEffect, useState} from "react";
import "../style.css";
import axios from "axios";
import {Button} from "react-bootstrap";
import Popup from 'reactjs-popup';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

function New1() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [solution, setSolution] = useState("");

    const [timeLeft, setTimeLeft] = useState(3600);
    const [questionCount, setQuestionCount] = useState(1);
    const [score, setScore] = useState(0);
    const [remainingTime, setRemainingTime] = useState(20);
    const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0);


    const navigate=useNavigate();

    useEffect(() => {
        getData();
        timeLefter();
    }, [questionCount]);

    const getData = () => {
        axios({
            method: 'get',
            url: 'https://marcconrad.com/uob/smile/api.php/',
        })
            .then(function (response) {
                setData(response.data);
                setSolution(response.data.solution);
            }).catch(function (error) {
            console.log(error);
        });

    }


    useEffect(()=>{
        const timer=setInterval(()=>{
            setRemainingTime(prevRemainingTime=>prevRemainingTime-1);
        },1000);
        return()=>clearInterval(timer);
    },[currentQuestionIndex]);


    //function to be used if time rus over,go to the next question.
    useEffect(()=>{
        if(remainingTime==0){
            handleNextQuestion();
            setQuestionCount(questionCount+1);

            //both time ran over and this is the last question
            if(questionCount==20){
                navigate('/home');
                if(score>=15){
                    Swal.fire({
                        icon:'success',
                        title:'Hello',
                        text:'You have passed with a score of'+score+'/20'
                    })
                    navigate('/home');
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Sorry',
                        text:'You have got only '+score+'out of 20.Try Again'
                    })
                    navigate('/home');
                }
            }
        }
    });

    //changes what would happen,when go to next question
    function handleNextQuestion(){
        setCurrentQuestionIndex(prevQuestionIndex=>prevQuestionIndex+1);
        setRemainingTime(20);
        while(questionCount<20){
            setQuestionCount(questionCount+1);
        }

    }

    function handleAnswerSubmit(){
        handleNextQuestion();
    }



    function Submit(event) {
        event.preventDefault();
        const result = changeAnswer();

        if (result=='correct') {
            setScore(score+1);
        }
        if(questionCount==20){
            if(score>=15){
                Swal.fire({
                    icon:'success',
                    title:'Hello',
                    text:'You have passed with a score of'+score+'/20'
                }).then(()=>navigate('/home'));
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Sorry',
                    text:'You have got only '+score+'out of 20.Try Again'
                }).then(()=>navigate('/home'));
            }
        }
        else {
            setQuestionCount(questionCount+1);
            handleNextQuestion();
        }
        setValue('');

    }
    function changeAnswer(){
        const userAnswerInt=parseInt(value);
        const ApiSolution=parseInt(solution);

        if(userAnswerInt==ApiSolution){
            return'Correct';
        }else{
            return 'Wrong';
        }
    }

    const timeLefter=()=>{
        if(timeLeft==20){
            alert("Only twenty seconds are lef for You!");
        }
    }

    return (
        <div >
            <h1>Test</h1>
            <div>
                <p><b>Question Number : {questionCount}/20</b></p>
                <p><b>Remaining Time : {remainingTime}sec</b></p>
                <img src={data.question} alt={`Question ${questionCount}`}/>

            </div>
            <form onSubmit={Submit} >

                <label>
                    Enter the Answer
                    <input type="text" onChange={(event) => setValue(event.target.value)} required/>
                </label>

                 <Button variant="warning" onClick={handleAnswerSubmit} >Submit</Button>
            </form>


        </div>


    )
}

export default New1;











