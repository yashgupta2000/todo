import React, { useState, useEffect } from 'react';

export default function Todo() {
    const [data, setData] = useState([]);
    const [inputBoxData, setInputBoxData] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(data));

        
    }, [data])


    useEffect(() => {
        const savedItems = localStorage.getItem('task');
        if (savedItems) {
            setData(JSON.parse(savedItems));
        }
    }, []);
    const handleChange = (value) => {
        setInputBoxData(value);
    };

    const handleData = () => {


        if (editIndex !== null) {
            const updatedData = data.map((item, index) =>
                index === editIndex ? inputBoxData : item
            );
            setData(updatedData);
            setEditIndex(null);

        } else {
            setData([inputBoxData, ...data]);

        }
        setInputBoxData('');
    };

    const handleDelete = (index) => {
        let updatedData = data.filter((item, arrIndex) => index !== arrIndex);
        setData(updatedData);
    };

    const handleEdit = (index) => {
        setInputBoxData(data[index]);
        setEditIndex(index);
    };

    return (
        <div className='mt-5'>
            <h1 className='text-center m-6 text-black text-lg'>TODO APPLICATON</h1>
            <div className='flex justify-center gap-1'>
                <input
                    className='border-blue-500 rounded-sm border px-1 w-2/5'
                    value={inputBoxData}
                    placeholder='Enter your task'
                    onChange={(e) => handleChange(e.target.value)}
                    type='text'
                />
                <button className='bg-blue-500 py-1 px-3 rounded-sm font-bold' onClick={handleData}>
                    ADD
                </button>
            </div>
            <div className='flex justify-center mt-20'>

                {data.length === 0 ? (
                    <h1>Your Task Will Appear Here</h1>
                ) : (
                    <ul className='w-full flex flex-col items-center'>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className='flex w-1/3 justify-between mb-3 bg-emerald-300 px-3 py-2 rounded-md items-center'
                            >
                                {/* Centering the li */}
                                <li className='list-none  w-full'>{`${index + 1}) ${item}`}</li>
                                <div className='flex gap-2'>
                                    <svg
                                        onClick={() => handleEdit(index)}
                                        width={15}
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 512 512'
                                        className='cursor-pointer'
                                    >
                                        <path d='M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z' />
                                    </svg>
                                    <svg
                                        onClick={() => handleDelete(index)}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width={15}
                                        viewBox='0 0 448 512'
                                        className='cursor-pointer'

                                    >
                                        <path d='M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z' />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}
