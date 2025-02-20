import "./App.css";
import GridLayout from "./GridLayout";
import Footer from "./Footer";
import Interface from "./Interface";

function App() {
  return (
    <>
      <div className="wrapper">
        <Interface />

        <GridLayout />
      </div>
      <Footer />
    </>
  );
}

export default App;
