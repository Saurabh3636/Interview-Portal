import React from "react";

function One() {
  return (
    <div class="container">
      <div class="row">
        <h1>My Interview Portal</h1>
        <div class="col">
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>No of Questions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{post && post.tests.map((tname) => tname.name)}</td> */}
                <td>10</td>
                <td>{/* <button>START TEST</button> */}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default One;
