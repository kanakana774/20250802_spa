import { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setnewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>("http://localhost:8080/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("API呼び出し失敗:", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    // タイトルが空の場合は何もしない
    if (newTodo.trim() === "") return;

    try {
      // POSTリクエストで新しいTodoを登録
      const response = await axios.post<Todo>("http://localhost:8080/todos", {
        title: newTodo,
      });
      // 成功した場合、既存のtodosリストに新しいTodoを追加
      setTodos([...todos, response.data]);
      // 入力フォームをクリア
      setnewTodo("");
    } catch (error) {
      console.error("Todoの登録に失敗しました:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo 一覧</h1>
      <input
        className="input-area"
        value={newTodo}
        onChange={(e) => setnewTodo(e.target.value)}
        placeholder="todoを入力"
      />
      <button className="margin-10px" onClick={handleAddTodo}>
        登録
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "⬜️"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
