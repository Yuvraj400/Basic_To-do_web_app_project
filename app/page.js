"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function Home() {
  const [Todo, setTodo] = useState({Task:"", iscompleted: false})
  const [Todos, setTodos] = useState([])


  const AddTask = ()=>{
    console.log("inside add task")
    setTodos([...Todos, {id:uuidv4(), ...Todo }])
    console.log(Todos)
  }
  const handelchange = (e)=>{
      setTodo({...Todo, Task: e.target.value})
    console.log(Todo)
  }
  
  const handeldelet = (id ,e)=>{
    const newTodos = Todos.filter(item =>{
      return item.id != id;
    });
    setTodos(newTodos)
  }

  

  const handelcomplete =(e)=>{
    const id  = e
    const index = Todos.findIndex(item =>{
      return item.id === id;
    })

    let newTodos = [...Todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    console.log(newTodos[index].iscompleted)
  }

  const hendaledit = (id, e)=>{
    let t = Todos.find(index => index.id === id)
    setTodo(t)
  }



  return (
    <>
    <div className="border-2 h-screen w-full border-black flex flex-col justify-center items-center text-black gap-3">
        <div className="bg-white text-center w-[50%] rounded-md">Add Task</div>
      <div className="bg-purple-500 h-1/4 w-[50%] rounded-b-4xl">
      <input value={Todo.Task} name="Task" id="Task" type="text" placeholder="Text area" className="bg-white rounded-md ml-6 mt-5 w-[50%] h-1/2 text-center text-gray-400" onChange={handelchange}/>
      <button className="text-white bg-purple-600 px-4 rounded-3xl ml-50 w-40 h-15 cursor-pointer hover:bg-purple-400" onClick={()=>{AddTask()}} disabled={Todo.Task < 3}>Add Task</button>
      </div>
      <div className="border border-black w-[50%] h-1/2 overflow-y-auto rounded-4xl bg-gray-300 relative">
      <div className="border border-black h-10 rounded-t-4xl bg-blue-500 flex justify-center items-center sticky top-0 z-20"> 
        <div className="text-white text-3xl ">Todo</div>
      </div>
        {Todos.map((item, index)=>{
          return <div className="flex mt-2 border border-t-white" key={index}>

          <div className="flex ">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-400 text-zinc-900 font-bold mx-3">{index}</div>
        <div className={item.iscompleted?"line-through w-auto h-10 flex-wrap flex items-center justify-center":" w-auto h-10 flex-wrap flex items-center justify-center"}>{item.Task}</div>
      </div>
      <input type="checkbox" name={item.id} value={item.iscompleted} onClick={()=>{handelcomplete(item.id)}} className="absolute right-21 size-9 " />
      <button className="bg-white w-10 absolute right-10 size-9 rounded-md border cursor-pointer hover:bg-gray-200 " onClick={()=>{hendaledit(item.id)}}>Edit</button>
      <Image width={20} height={20} src="/delete.png" className="absolute right-0 size-9 bg-white border border-gray-400 rounded-sm hover:bg-gray-200 cursor-pointer" alt="Delete icon" onClick={()=>{handeldelet(item.id);}} />
      </div>
})}
      </div>
    </div>
    </>
  );
}
