import Navigation from "./components/Navigation";
import { showAllItems } from "./firebase_setup/firebase"
import React, { useEffect } from "react";

function App() {

  return (<>
    <Navigation />
    <h1>Web Store App</h1>
    <button onClick={() => showAllItems()}>See all products</button>
    <div id='all-items-list'>
      
    </div>
    </>
  );
}

export default App;
