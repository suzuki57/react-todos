import { React, useState } from "react";
import { InputTodo } from "./component/InputTodo";
import { IncompleteTodos } from "./component/IncompleteTodos";
import { CompleteTodos } from "./component/CompleteTodos";
import "./styles.css";

export const App = () => {
  // 初期値
  const [todoText, settodoText] = useState("");
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);
  // テキストBOXに入力できるようにする
  const onChangeTodoText = (event) => settodoText(event.target.value);
  // 追加ボタン押下
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setincompleteTodos(newTodos);
    settodoText("");
  };

  // 削除ボタン押下
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setincompleteTodos(newTodos);
  };

  // 完了ボタン押下
  const onClickComplete = (index) => {
    // 未完了部分
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // 完了部分
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setincompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos);
  };

  // 戻すボタン押下
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCompleteTodos);
    setincompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個までだよー！</p>
      )}

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
