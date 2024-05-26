import './App.css';
import ExpenseChart from './components/ExpenseChart'
import Form from './components/Form';
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";

function App() {

  return (
    <div>
      <header className="app-header min-h-[14vh] px-auto">
        <p>
          Expense Tracker
        </p>
      </header>
      <div className="grid grid-cols-2 px-20 py-10 gap-10">
        <ExpenseChart />
        <Form />
      </div>
      <BigTranscript placement="top"/>
      <PushToTalkButton placement="bottom" captureKey=" "/>
      <IntroPopup />
    </div>
  );
}

export default App;
