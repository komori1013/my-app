import { useState } from 'react';
import './App.css';

const today = new Date();
const formatted = today.toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type ButtonProps = {
  setShow: Function;
  ListBoxPlace: string;
  setListBoxPlace: Function;
};

function Button({ setShow, ListBoxPlace, setListBoxPlace }: ButtonProps) {
  return (
    <button className='button' onClick={() => { setShow(true); setListBoxPlace(ListBoxPlace) }}>+</button>
  )
};

type ModalProps = {
  show: boolean;
  setShow: Function;
  text: string;
  setText: Function;
  hPHI: Todo[];
  setHPHI: Function;
  lPHI: Todo[];
  setLPHI: Function;
  hPLI: Todo[];
  setHPLI: Function;
  lPLI: Todo[];
  setLPLI: Function;
  ListBoxPlace: string;
  deadLine: string;
  setDeadLine: Function;
};

function Modal({ ListBoxPlace, hPHI, setHPHI, lPHI, setLPHI, hPLI, setHPLI, lPLI, setLPLI, text, setText, show, setShow, deadLine, setDeadLine }: ModalProps) {
  if (show) {
    return (
      <div className="overlay">
        <div className="content">
          <h3>予定</h3>
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
          <input type="time" value={deadLine} onChange={(event) => setDeadLine(event.target.value)} />
          <input type="submit" value="送信" onClick={() => handleSubmit({ ListBoxPlace, hPHI, setHPHI, lPHI, setLPHI, hPLI, setHPLI, lPLI, setLPLI, text, setText, deadLine, setDeadLine})} />
          <p><button onClick={() => setShow(false)}>閉じる</button></p>
        </div>
      </div>
    )
  }
  else return null;
};

enum Area {
  HPHIPlACE = "HPHI",
  LPHIPlACE = "LPHI",
  HPLIPlACE = "HPLI",
  LPLIPlACE = "LPLI",
};

class Todo {
  id: number;
  text: string;
  deadLine: string;
  constructor(id: number, text: string, deadLine: string) {
    this.id = id;
    this.text = text;
    this.deadLine = deadLine;
  }
};

type HandleSubmitProps = {
  text: string;
  setText: Function;
  hPHI: Todo[];
  setHPHI: Function;
  lPHI: Todo[];
  setLPHI: Function;
  hPLI: Todo[];
  setHPLI: Function;
  lPLI: Todo[];
  setLPLI: Function;
  ListBoxPlace: string;
  deadLine: string;
  setDeadLine: Function;
};

function handleSubmit({ ListBoxPlace, hPHI, setHPHI, lPHI, setLPHI, hPLI, setHPLI, lPLI, setLPLI, text, setText, deadLine, setDeadLine}: HandleSubmitProps) {
  if (!text) return;
  if (ListBoxPlace === Area.HPHIPlACE) {
    const id: number = new Date().getTime();
    const newhPHI: Todo = {
      id: new Date().getTime(),
      text: text,
      deadLine: deadLine,
    }
    setHPHI({ [id]: newhPHI, ...hPHI });
    setText("");
    setDeadLine("");
  }
  else if (ListBoxPlace === Area.LPHIPlACE) {
    const id: number = new Date().getTime();
    const newlPHI: Todo = {
      id: new Date().getTime(),
      text: text,
      deadLine: deadLine,
    }
    setLPHI({ [id]: newlPHI, ...lPHI });
    setText("");
    setDeadLine("");
  }
  else if (ListBoxPlace === Area.HPLIPlACE) {
    const id: number = new Date().getTime();
    const newhPLI: Todo = {
      id: new Date().getTime(),
      text: text,
      deadLine: deadLine,
    }
    setHPLI({ [id]: newhPLI, ...hPLI });
    setText("");
    setDeadLine("");
  }
  else if (ListBoxPlace === Area.LPLIPlACE) {
    const id: number = new Date().getTime();
    const newlPLI: Todo = {
      id: new Date().getTime(),
      text: text,
      deadLine: deadLine,
    }
    setLPLI({ [id]: newlPLI, ...lPLI });
    setText("");
    setDeadLine("");
  }
};


function TaskBox({ Todos, setTodos, isOpen, setIsOpen }: { Todos: Todo[]; setTodos: Function; isOpen: boolean; setIsOpen: Function}) {
  return (
    <ul>
      {Object.values(Todos).map(todo => {
        return (
          <li key={todo.id}>
            <button className="margin" onClick={()=> setIsOpen(true)}>←</button>
            <input className="margin" type="text" value={todo.text} />
            <input className="margin" type="time" value={todo.deadLine}/>
            <button className="margin" onClick={() => editTodo(Todos, setTodos, todo.id, prompt("new Text:"), prompt('New deadline:'))}>編集</button>
            <button className="margin" onClick={() => deleteTodo(Todos, setTodos, todo.id)}>削除</button>
          </li>
        )
      })}
    </ul>
  )
};

function SetTimeModal({isOpen, setIsOpen}:{isOpen: boolean; setIsOpen: Function}) {
  if(isOpen){
  return (
  <div className="overlay">
  <div className="content">
  <h3>内容記入</h3>
  <input type="text"/>
  <button onClick={() => setIsOpen(false)}>閉じる</button>
  </div>
  </div>
)}
else return null;
};



const editTodo = (Todos: {}, setTodos: Function, id: number, newText: string | null, newDeadLine: string | null) => {
  setTodos({ ...Todos, [id]: { id: id, text: newText, deadLine: newDeadLine } });
};

const deleteTodo = (Todos: {}, setTodos: Function, id: number) => {
  /*const {[id]: {}, ...rest} = Todos;
  setHPHI(Todos);
  */
  setTodos({ ...Todos, [id]: {} });
};

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [hPHI, setHPHI] = useState([]);
  const [hPLI, setHPLI] = useState([]);
  const [lPHI, setLPHI] = useState([]);
  const [lPLI, setLPLI] = useState([]);
  const [ListBoxPlace, setListBoxPlace] = useState<string>("");
  const [deadLine, setDeadLine] = useState<string>("");

  return (
    <>
      <h2>{formatted}</h2>
      <body className='container'>
        <div className='left-container'>
          <h2>TodoBoard</h2>
          <table className='table'>
          <tr>
          <th className='time-width'>時間</th>
          <th className='todo-width'>内容</th>
          </tr>
          <tr>
            <td>8:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>9:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>10:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>11:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>12:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>13:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>14:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>15:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>16:00</td>
            <td>予定</td>
          </tr>
          <tr>
            <td>17:00</td>
            <td>予定</td>
          </tr>
          </table>
        </div>

        <div className='right-container'>
          <h2>TodoList</h2>
          <div className='right-high-container'>
            <Modal ListBoxPlace={ListBoxPlace} hPHI={hPHI} setHPHI={setHPHI} lPHI={lPHI} setLPHI={setLPHI} hPLI={hPLI} setHPLI={setHPLI} lPLI={lPLI} setLPLI={setLPLI} text={text} setText={setText} show={show} setShow={setShow} deadLine={deadLine} setDeadLine={setDeadLine}/>
            <SetTimeModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className='box1'>重要度 高 / 優先度 高
              <Button setShow={setShow} ListBoxPlace={"HPHI"} setListBoxPlace={setListBoxPlace} />
              <TaskBox Todos={hPHI} setTodos={setHPHI} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
            <div className='box2'>重要度 低 / 優先度 高
              <Button setShow={setShow} ListBoxPlace={"HPLI"} setListBoxPlace={setListBoxPlace} />
              <TaskBox Todos={hPLI} setTodos={setHPLI} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
          </div>
          <div className='right-row-container'>
            <div className='box3'>重要度 高 / 優先度 低
              <Button setShow={setShow} ListBoxPlace={"LPHI"} setListBoxPlace={setListBoxPlace} />
              <TaskBox Todos={lPHI} setTodos={setLPHI} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
            <div className='box4'>重要度 低 / 優先度 低
              <Button setShow={setShow} ListBoxPlace={"LPLI"} setListBoxPlace={setListBoxPlace} />
              <TaskBox Todos={lPLI} setTodos={setLPLI} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
