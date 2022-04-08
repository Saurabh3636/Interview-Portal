import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Test() {
  let navigate = useNavigate();
  let count = 0;
  //const [count, setCount] = useState(0);
  const [option, setoption] = useState([]);
  const [score, setScore] = useState(0);
  const [marked, setMarked] = useState();
  const [markedArr, setMarkedArr] = useState([]);
  const [finish, setfinish] = useState(false);
  const [resetoption, setresetoption] = useState([]);
  let location = useLocation();
  const lead = JSON.parse(localStorage.getItem("count"));
  if (lead) {
    count = lead;
  }

  const que = location.state.questions[count];
  const queArr = location.state.questions;
  const qid = que._id;
  // const abc = location.state;

  useEffect(() => {
    if (option && option.length) {
      localStorage.setItem("option", JSON.stringify(option));
    } else {
      if (localStorage.getItem("option"))
        setoption(JSON.parse(localStorage.getItem("option")));
    }
  }, [option]);

  useEffect(() => {
    let temp =
      option &&
      option.filter((q) => q.id === que._id)[0] &&
      option.filter((q) => q.id === que._id)[0].answerIndex;

    if (typeof temp === "object") setMarkedArr(temp);
    else setMarked(temp);
    console.log(count);
  }, [option, count]);

  useEffect(() => {
    navigate(`/Test/${location.state._id}/${qid}`, { state: location.state });
  }, [count]);

  let optionType = "radio";

  if (que.type) {
    optionType = "checkbox";
  }
  const inc = () => {
    console.log("count value", count);
    if (queArr.length - 1 === count) {
      return;
    }
    count = count + 1;
    localStorage.setItem("count", JSON.stringify(count));
    setMarkedArr([]);
    setMarked();
  };

  const dec = () => {
    if (count === 0) {
      return;
    }
    count = count - 1;
    localStorage.setItem("count", JSON.stringify(count));
    setMarkedArr([]);
    setMarked();
  };

  function useClickHandler(event) {
    // console.log(event.target.value);
    // console.log(parseInt(event.target.id));
    // console.log(que.correctOptionIndex);

    // for array storing [0,1]
    let ansIndex;
    if (optionType === "checkbox") {
      // here id=position of option
      if (resetoption.includes(parseInt(event.target.id))) {
        setresetoption(
          resetoption.filter((op) => op !== parseInt(event.target.id))
        );
        ansIndex = resetoption.filter((op) => op !== parseInt(event.target.id));
      } else {
        setresetoption((prevContact) => [
          ...prevContact,
          parseInt(event.target.id),
        ]);
        ansIndex = [...resetoption, parseInt(event.target.id)];
      }
    } else {
      ansIndex = parseInt(event.target.id);
    }

    let flag = false;

    for (let i = 0; i < option.length; i++) {
      if (option[i].id === que._id) {
        flag = true;
        console.log("found");
      }
    }

    if (flag)
      setoption(
        option.map((op) =>
          op.id === que._id
            ? { id: que._id, answerIndex: ansIndex }
            : { id: op.id, answerIndex: op.answerIndex }
        )
      );
    else
      setoption([
        ...option,
        {
          id: que._id,
          answerIndex: ansIndex,
        },
      ]);
  }

  function usecheked() {
    setfinish(true);
    // setScore((prev) => prev - prev);
    console.log(
      queArr.map((q) => [
        { id: q._id, correctOptionIndex: q.correctOptionIndex },
      ])
    );

    for (let i = 0; i < option.length; i++) {
      for (let j = 0; j < queArr.length; j++) {
        if (queArr[j]._id === option[i].id) {
          if (typeof option[i].answerIndex === "object")
            if (
              JSON.stringify(option[i].answerIndex.sort()) ===
              JSON.stringify(queArr[j].correctOptionIndex)
            )
              setScore((prev) => prev + 1);
          if (queArr[j].correctOptionIndex == option[i].answerIndex)
            setScore((prev) => prev + 1);
        }
      }
    }
    console.log(score);
    localStorage.removeItem("count");
  }
  useEffect(() => {
    if (finish) navigate("/Final", { state: score });
  }, [finish]);
  return (
    <div className="container">
      <div>
        <h1>My Interview Portal</h1>
        <div>
          <div className="heading" key={location.state.name}>
            {location.state.name}
          </div>
          <div className="quest">
            <ul>
              {count + 1 + " )"}
              {que.questionText}
            </ul>

            {que.options.map((q, i) => (
              <div key={q}>
                <label>
                  {optionType === "checkbox" ? (
                    <input
                      type={optionType}
                      name=" "
                      id={i}
                      value={q}
                      checked={markedArr && markedArr.includes(i)}
                      onChange={useClickHandler}
                    />
                  ) : (
                    <input
                      type={optionType}
                      name=" "
                      id={i}
                      value={q}
                      checked={marked === i}
                      onChange={useClickHandler}
                    />
                  )}

                  {q}
                </label>
              </div>
            ))}
            <button className="dec" onClick={dec}>
              prev
            </button>
            <button className="inc" onClick={inc}>
              next
            </button>

            <button className="submitbtn" onClick={usecheked}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
