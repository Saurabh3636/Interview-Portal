import React, { useState, useEffect } from "react";
import axios from "axios";
function Three() {
  const [post, setpost] = useState();
  useEffect(() => {
    axios
      .get(" http://interviewapi.stgbuild.com/getQuizData")
      .then((response) => {
        setpost(response.data);
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{post && post.tests.map((tid) => tid._id)}</h1>
      <h1>{post && post.tests.map((tname) => tname.name)}</h1>
      <h1>{post && post.tests.map((i) => <p>{i.questions.length}</p>)}</h1>
    </div>
  );
}

export default Three;
