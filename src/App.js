import Navigation from "./components/Navigation";
import { showAllItems } from "./firebase_setup/firebase"
import React, { useEffect } from "react";

function App() {

  return (<>
    <Navigation />
    <main id='store'>
      <h1>Web Store App</h1>
      <button id='showAll' onClick={() => showAllItems()}>See all products</button>
      <p id='addToCartMessage'></p>
      <div id='all-items-list'>

      </div>
    </main>
  </>
  );
}

export default App;
