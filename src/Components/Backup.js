import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Test() {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [option, setoption] = useState([]);
  const [score, setScore] = useState(0);
  const [marked, setMarked] = useState();
  const [markedArr, setMarkedArr] = useState([]);
  const [finish, setfinish] = useState(false);
  const [resetoption, setresetoption] = useState([]);
  let location = useLocation();

  const que = location.state.questions[count];
  const queArr = location.state.questions;

  // const abc = location.state;
  // useEffect(() => {
  //   localStorage.setload("queArr", JSON.stringify(load));
  // }, [load]);
  useEffect(
    () => {
      if (option && option.length) {
        localStorage.setItem("option", JSON.stringify(option));
      } else {
        if (localStorage.getItem("option"))
          setoption(JSON.parse(localStorage.getItem("option")));
      }
    },
    [option],
    [count]
  );

  useEffect(() => {
    let temp =
      option &&
      option.filter((q) => q.id === que._id)[0] &&
      option.filter((q) => q.id === que._id)[0].answerIndex;

    if (typeof temp === "object") setMarkedArr(temp);
    else setMarked(temp);
  }, [option, count]);

  let optionType = "radio";

  if (que.type) {
    optionType = "checkbox";
  }
  const inc = () => {
    if (queArr.length - 1 === count) {
      return;
    }
    setCount(count + 1);

    setMarkedArr([]);
    setMarked();
    localStorage.setItem("count", JSON.stringify(count));
  };

  const dec = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
    setMarkedArr([]);
    setMarked();
    localStorage.setItem("count", JSON.stringify(count));
  };

  function useClickHandler(event) {
    // console.log(event.target.value);
    // console.log(parseInt(event.target.id));
    // console.log(que.correctOptionIndex);

    // for array storing [0,1]
    let ansIndex;
    if (optionType === "checkbox") {
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

    console.log("setoption");
  }
  console.log(option);

  function usecheked() {
    setfinish(true);
    setScore((prev) => prev - prev);
    console.log(
      queArr.map((q) => [
        { id: q._id, correctOptionIndex: q.correctOptionIndex },
      ])
    );
    console.log(option);
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
    console.log("score", score);
  }
  useEffect(() => {
    if (finish) navigate("/Final", { state: score });
  }, [finish]);
  console.log("score", score);
  return (
    <div className="container">
      <div>
        <h1>My Interview Portal</h1>
        <div>
          <div className="heading" key={location.state.name}>
            {location.state.name}
          </div>
          <div className="quest">
            <ul>{que.questionText}</ul>

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
          </div>
          <button className="dec" onClick={dec}>
            prev
          </button>
          <button className="inc" onClick={inc}>
            next
          </button>
          <button onClick={usecheked}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default Test;
