import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todo() {

    //states
    const [data, setData] = useState([]);
    const [inputBoxData, setInputBoxData] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [deleteTask, setDeleteTask] = useState(false);
    const [selectIndex, setSelectedIndex] = useState(null);
    const [validateInputBox, setValidateInputBox] = useState(false);
    const [selectedTask, setSelectedtask] = useState(true);
    const [completedTaskIndices, setCompletedTaskIndices] = useState([]);

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(data));


    }, [data])


    useEffect(() => {
        const savedItems = localStorage.getItem('task');
        if (savedItems) {
            setData(JSON.parse(savedItems));
        }
    }, []);

    //notifications
    const TaskAddednotify = () => toast("Task added successfully!");
    const TaskUndonotify = () => toast("Task deleted! You have 3 seconds to undo.");
    const TaskDeletenotify = () => toast("Task restored successfully!");




    //functions
    const handleChange = (value) => {
        setInputBoxData(value);
    };

    const handleKeyDown = (event) => {


        if (event.key == 'Enter') {

            if (inputBoxData == '') {

                setValidateInputBox(true);
                return;
            }
            else {
                setValidateInputBox(false);
            }
            setData([...data, inputBoxData]);
            TaskAddednotify();
            setInputBoxData('');
        }

    }
    const handleData = () => {
        if (inputBoxData == '') {
            setValidateInputBox(true);
            return;
        }
        else {
            setValidateInputBox(false);
        }

        if (editIndex !== null) {
            const updatedData = data.map((item, index) =>
                index === editIndex ? inputBoxData : item
            );
            setData(updatedData);
            setEditIndex(null);

        } else {
            setData([inputBoxData, ...data]);
            TaskAddednotify();

        }
        setInputBoxData('');
    };


    const timeouts = useRef({});

    const handleDelete = (index) => {
        TaskUndonotify()
        setSelectedIndex(index);

        const deleteTimeout = setTimeout(() => {

            let updatedData = data.filter((_, arrIndex) => index !== arrIndex);
            setData(updatedData);
            setSelectedIndex(null);
        }, 3000);

        timeouts.current[index] = deleteTimeout;
    };

    const handleUndo = (index) => {
        TaskDeletenotify();
        if (timeouts.current[index]) {
            clearTimeout(timeouts.current[index]);
            timeouts.current[index] = null;

        }
        setSelectedIndex(null);
    };

    const handleIconToggle = (index) => {
        setCompletedTaskIndices((prev) => {
            const updatedIndices = prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index];
                console.log(updatedIndices);
            if (updatedIndices.includes(index)) {
                setSelectedtask(false);
            }
            else{
                setSelectedtask(true);
            }
            return updatedIndices;
        });
    };
    useEffect(() => {
        console.log(selectedTask);
    }, [selectedTask]);

    const handleEdit = (index) => {
        setInputBoxData(data[index]);
        setEditIndex(index);
    };

    return (
        <div className='mt-5'>
            <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className='text-center mt-14 mb-14 text-white text-2xl'>TODO APPLICATON</h1>
            <div className=''>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-1 w-full">
                    <input
                        className={`rounded-sm border px-2 py-1 w-full max-w-xs sm:w-3/5 md:w-1/2 lg:w-2/5 
                        ${!validateInputBox ? 'border-blue-500' : 'border-red-500'} outline-0`}
                        value={inputBoxData}
                        placeholder="Enter your task"
                        onChange={(e) => handleChange(e.target.value)}
                        type="text"
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        className="w-full max-w-xs sm:w-auto bg-blue-500 py-1 px-3 rounded-sm font-bold text-white"
                        onClick={() => handleData()}
                    >
                        ADD
                    </button>
                </div>


                {validateInputBox ? <p className='text-center text-sm text-red-500'>Please add some text</p> : null}
            </div>
            <div className='flex justify-center mt-20'>

                {data.length === 0 ? (
                    <h1 className='text-white'>Your Task Will Appear Here</h1>
                ) : (
                    <ul className='w-full flex flex-col items-center'>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className='flex w-3/5 justify-between mb-3 border rounded-sm border-white px-3 py-2 items-center'
                            >

                                {completedTaskIndices.includes(index) ? <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIconToggle(index)} width={15} viewBox="0 0 512 512">
                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" fill='white' />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIconToggle(index)} width={15} viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" fill='white' /></svg>
                                }


                                <li className='list-none text-white ml-1  w-full'>{`${item}`}</li>

                                <div className='flex gap-2'>
                                    {!completedTaskIndices.includes(index) ? (
                                        <>
                                            <svg
                                                onClick={() => handleEdit(index)}
                                                width={15}
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 512 512'
                                                className='cursor-pointer'
                                            >
                                                <path d='M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z' fill='green' />
                                            </svg>

                                            {selectIndex === index ? (
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    onClick={() => handleUndo(index)}
                                                    width={15}
                                                    className='cursor-pointer'
                                                    viewBox='0 0 512 512'
                                                >
                                                    <path d='M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z' fill='red' />
                                                </svg>
                                            ) : (
                                                <svg
                                                    onClick={() => handleDelete(index)}
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={15}
                                                    viewBox='0 0 448 512'
                                                    className='cursor-pointer'
                                                >
                                                    <path d='M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z' fill='red' />
                                                </svg>
                                            )}
                                        </>
                                    ) : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={15}>/<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" fill='green' /></svg>}








                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}
