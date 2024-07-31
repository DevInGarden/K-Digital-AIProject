import React, { useRef, useState } from 'react';
import { IoKeyOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
    const navigate = useNavigate();
    const phoneref = useRef(null);
    const idref = useRef(null);
    const pwd1ref = useRef(null);
    const pwd2ref = useRef(null);
    const numref = useRef(null);
    const [send, setSend] = useState(false);
    const [check, setCheck] = useState(false);
    const [okid, setOkid] = useState(false);
    const [noid, setNoid] = useState(false);

    const handleSendphone = async () => {
        if (!phoneref.current.value) {
            alert("Please enter your phone number");
            phoneref.current.focus();
            return;
        }

        if (isNaN(phoneref.current.value)) {
            alert("Please enter numbers only for your phone number");
            phoneref.current.focus();
            return;
        }

        // setSend(true);
        const phone = phoneref.current.value;
        const url = `http://10.125.121.225:8080/checkphone?phoneNumber=${phone}`;

        try {
            const response = await fetch(url)
            const data = await response.json();

            if (data.status === 'success') {
                setSend(true);
            } else if (data.status === "nophone") {
                alert("Phone number does not exist");
                phoneref.current.focus();
            } else {
                alert('No registered phone number.');
                phoneref.current.value = "";
                phoneref.current.focus();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send phone number. Please try again later.');
        }
    };

    const handlecheck = async () => {
        if (!numref.current.value) {
            alert("Please enter your Authentication number");
            numref.current.focus();
            return;
        }

        if (isNaN(numref.current.value)) {
            alert("Please enter numbers only for Authentication number");
            numref.current.focus();
            return;
        }

        // setCheck(true);
        const num = numref.current.value
        const url = `http://10.125.121.225:8080/checknum?num=${num}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'success') {
                setCheck(true);
            } else {
                alert('Authentication failed. Please re-enter.');
                numref.current.value = "";
                numref.current.focus();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to check number. Please try again later.');
        }
    };

    const handleid = async () => {
        const url = 'http://10.125.121.225:8080/checkid';

        const payload = {
            userPhoneNumber: phoneref.current.value,
            userLoginId: idref.current.value
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            console.log("data1", data)
            if (data.status === "success") {
                setOkid(true)
                setNoid(false)
            } else {
                setNoid(true)
                setOkid(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = async () => {
        if (!idref.current.value) {
            alert("Please enter your id");
            idref.current.focus();
            return;
        }

        if (!pwd1ref.current.value) {
            alert("Please enter your new password");
            pwd1ref.current.focus();
            return;
        }

        if (!pwd2ref.current.value) {
            alert("Please enter your new password again");
            pwd2ref.current.focus();
            return;
        }

        if (pwd1ref.current.value !== pwd2ref.current.value) {
            alert("Passwords do not match. Please enter them again.");
            pwd1ref.current.value = '';
            pwd2ref.current.value = '';
            pwd1ref.current.focus();
            return;
        }

        if (!okid && noid) {
            alert("Registered ID not found. Please enter again.");
            idref.current.value = '';
            idref.current.focus();
            return;
        }

        const url = 'http://10.125.121.225:8080/reset';

        const payload = {
            userLoginId: idref.current.value,
            userPw: pwd1ref.current.value
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.status === 'success') {
                navigate('/login');
            } else {
                alert('Failed to reset password. You have entered the wrong id.');
                idref.current.focus();
                pwd1ref.current.value = '';
                pwd2ref.current.value = '';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to reset password. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-auto rounded-xl p-6 bg-slate-100">
                <IoMdArrowBack className='text-xl cursor-pointer' onClick={() => navigate('/login')} />
                <div className="flex justify-center">
                    <IoKeyOutline className="text-4xl text-black" />
                </div>
                <p className="text-2xl text-center font-bold mt-4">Forgot password?</p>
                <p className="text-center text-gray-600 mt-2">Don't worry, we'll reset your password.</p>
                <div className="flex flex-col mt-4 space-y-3">
                    <label className="text-gray-700 font-semibold">Phone number</label>
                    <div>
                        <input type="tel" placeholder="010-0000-0000" className="rounded-md h-10 p-2 w-60" ref={phoneref} disabled={send} maxLength={11} />
                        <button type='button' className='bg-blue-500 rounded-xl w-1/5 ml-2 text-white h-10' onClick={handleSendphone} disabled={send}>Send</button>
                    </div>
                    {send && (
                        <div className='mt-2 space-y-3'>
                            <label className="text-gray-700 font-semibold">Authentication number</label>
                            <div className='flex items-center'>
                                <input type="text" placeholder='1234' className='rounded-md h-10 p-2 w-60' ref={numref} disabled={check} maxLength={4} />
                                <button type='button' className='bg-blue-500 rounded-xl w-1/5 ml-2 text-white h-10' onClick={handlecheck} disabled={check}>Check</button>
                            </div>
                        </div>
                    )}
                </div>
                {check && (
                    <>
                        <div className='flex flex-col mt-2 space-y-3'>
                            <label className="text-gray-700 font-semibold">Your id</label>
                            <input type='text' placeholder='abcde123' className='rounded-md h-10 p-2' ref={idref} onBlur={handleid} />
                            {okid && <p className="text-sm text-green-400">This ID is registered.</p>}
                            {noid && <p className="text-sm text-red-600">This ID is not registered.</p>}
                        </div>
                        <div className='flex flex-col mt-2 space-y-3'>
                            <label className="text-gray-700 font-semibold">New password</label>
                            <input type='password' placeholder='●●●●●●●●' className='rounded-md h-10 p-2' ref={pwd1ref} />
                        </div>
                        <div className='flex flex-col mt-2 space-y-3'>
                            <label className="text-gray-700 font-semibold">Confirm new password</label>
                            <input type='password' placeholder='●●●●●●●●' className='rounded-md h-10 p-2' ref={pwd2ref} />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button type="submit" onClick={handleReset} className="bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-600">Reset password</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
