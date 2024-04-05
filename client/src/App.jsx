import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      //const response = await fetch("http://localhost:5000/api");

      const response = await fetch("http://localhost:5000/api", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      console.log("hello");
      console.log(response.json());
      const json = await response.json();

      // if (response.ok) {
      //   setBackendData(json);
      //   console.log("response is ok");
      // } else {
      //   console.log("response is not ok");
      // }
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => {
          <p key={i}>{user}</p>;
        })
      )} */}
    </div>
  );
}

export default App;
