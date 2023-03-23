import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState("");
  const [listItem, setListItem] = useState([]);
  const [updateText, setUpdateText] = useState("");
  const [isUpdating, setIsUpdating] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/task", {
        task: item,
      });
      setListItem((prev) => [...prev, res.data]);
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/task/${id}`);
      const newListItems = listItem.filter((item) => item._id != id);
      setListItem(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/task/${isUpdating}`,
        { task: updateText }
      );
      console.log(res.data);
      const updatedItemIndex = listItem.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItem[updatedItemIndex].task = updateText);
      setUpdateText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/tasks");
        setListItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);

  const updateForm = () => (
    <form
      className='flex justify-between w-full'
      onSubmit={(e) => {
        updateItem(e);
      }}>
      <input
        type='text'
        placeholder='New Text'
        className='w-[80%] rounded-lg border-[#eee] p-2 outline-none'
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
      />
      <button
        className='bg-[rgb(153,50,204)] text-white cursor-pointer border-none p-2 rounded-lg'
        type='submit'>
        Update
      </button>
    </form>
  );

  return (
    <div className='flex flex-col items-center bg-[#fff] w-[500px] mt-[50px] mb-[50px] mx-auto p-[10px] rounded-lg'>
      <div className=' bg-gray-600/20 h-full w-full rounded-xl shadow-xl'>
        <h1 className='text-center text-4xl p-4 font-bold'>Todo List</h1>
        <form
          className='flex justify-center items-center w-full mb-3 gap-3 p-4'
          onSubmit={(e) => addItem(e)}>
          <input
            className='p-2.5 w-[85%] border-[#eee] rounded-lg focus:outline-none'
            type='text'
            placeholder='Add Todo Task'
            onChange={(e) => {
              setItem(e.target.value);
            }}
            value={item}
          />
          <button
            className='bg-[#008080] text-[#fff] border-none rounded-lg cursor-pointer p-2.5 focus:outline-none'
            type='submit'>
            Add
          </button>
        </form>
        <div className='flex flex-col w-full p-4 '>
          {listItem.map((item) => (
            <div className='flex justify-between items-center mb-2.5'>
              {isUpdating === item._id ? (
                updateForm()
              ) : (
                <>
                  <p className='w-[60%] text-lg ml-4' key={item._id}>
                    {item.task}
                  </p>
                  <button
                    className='border-none p-2 rounded-lg cursor-pointer bg-[rgb(218,165,32)] text-white'
                    onClick={() => {
                      setIsUpdating(item._id);
                    }}>
                    Update
                  </button>
                  <button
                    className='border-none p-2 rounded-lg cursor-pointer bg-red-600 text-white'
                    onClick={() => deleteItem(item._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
