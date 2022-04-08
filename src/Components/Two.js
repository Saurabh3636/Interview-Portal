import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Two() {
  let navigate = useNavigate();
  const [post, setpost] = useState();
  useEffect(() => {
    axios
      .get("http://interviewapi.stgbuild.com/getQuizData")
      .then((response) => {
        setpost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(post);

  return (
    <div className="main">
      <h1>My Interview Portal</h1>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Test</th>
                <th>No of Questions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {post &&
                post.tests.map((tname) => (
                  <tr key={tname.name}>
                    <td>{tname.name}</td>

                    <td>{tname.questions.length}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/Test/${tname._id}`, { state: tname });
                        }}
                      >
                        start test
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Two;
