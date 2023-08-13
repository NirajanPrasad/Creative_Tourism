import React, { useState } from "react";
import "./App.css";

import { PreLoader } from "./Components/index.js";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PreLoader setLoading={setLoading} />}
      {!loading && (
        <main>
          <h1>Welcome To HomePage</h1>
        </main>
      )}
    </>
  );
}

export default App;
