import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const Todo = () => {
  const [todoList, settodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    settodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white place-self-center w-11/12 max-w-md p-7 h-[550px] rounded-xl">
        <div className='bg-slate-300 flex items-center mt-7 gap-2 rounded-3xl h-14 w-fullscreen'>
          <img className='w-8' src={todo_icon} alt="todo icon" />
          <h1 className='flex items-center text-3xl font-semibold text-black'>TO-Do List</h1>
        </div>
        <div className='flex items-center my-4 bg-gray-400 rounded-full'>
          <input
            ref={inputRef}
            className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-black'
            type="text"
            placeholder='ADD YOUR TASK'
          />
          <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium cursor-pointer'>ADD+</button>
        </div>
        <div>
          {todoList.map((item, index) => {
            return (
              <Todoitems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete} // Corrected to isComplete
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
