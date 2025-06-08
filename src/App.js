// import React from "react";
// import "./App.scss";
// import Main from "./containers/Main";

// function App() {
//   return (
//     <div>
//       <Main />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import AIAvatar from "./pages/AIAvatar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/ai-avatar" component={AIAvatar} />
      </Switch>
    </Router>
  );
}

export default App;