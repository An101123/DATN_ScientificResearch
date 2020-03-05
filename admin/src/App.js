import React, { Component } from 'react';
import './App.css';
import Accordion from "./components/Accordion";
import TestForm from "./components/TestForm";
import Menu from "./components/Menu";
import { Button } from 'reactstrap';
import TestColor from "./components/TestColor";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Accordion heading="Bấm vào đây" content="Chúc mừng sinh nhật mèoooo" />
        <TestForm />
        <Menu heading="Menu" content="Đây là menu nhưng không biết làm như nào nè" />
        <Button color="red">success</Button>
        <TestColor />
      </div>

    );
  }
}

export default App;
