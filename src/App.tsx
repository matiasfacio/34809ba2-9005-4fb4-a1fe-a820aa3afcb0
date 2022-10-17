import "./App.css";
import { Events } from "./component/events/Events";
import Header from "./component/header/Header";
import NavBar from "./component/navbar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="page-container">
        <Header />
        <Events />
      </div>
    </div>
  );
}

export default App;
