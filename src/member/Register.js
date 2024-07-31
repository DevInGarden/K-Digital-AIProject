import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Terms from './Terms'

export default function Register() {
    const navigate = useNavigate();
    const nameref = useRef(null);
    const phoneref = useRef(null);
    const idref = useRef(null);
    const pwdref = useRef(null);
    const roleref = useRef(null);
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSign = async () => {
        if (!nameref.current.value) {
            alert("Please enter your name");
            nameref.current.focus();
            return;
        }

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

        if (!idref.current.value) {
            alert("Please enter your id");
            idref.current.focus();
            return;
        }

        if (!pwdref.current.value) {
            alert("Please enter your password");
            pwdref.current.focus();
            return;
        }

        if (!agree) {
            alert('You must agree to the Terms and Conditions.');
            return;
        }

        const url = 'http://10.125.121.225:8080/signup';

        const payload = {
            userName: nameref.current.value,
            userPhoneNumber: phoneref.current.value,
            userLoginId: idref.current.value,
            userPw: pwdref.current.value,
            userRole: roleref.current.value
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.status === 'success') {
                console.log("성공", data.status);
                navigate('/login');
            } else {
                console.log("실패", data.status)
                console.log("실패", response)
                alert('Failed to register. There is a duplicate id, please re-enter it.');
                idref.current.value = "";
                idref.current.focus();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register. Please try again later.');
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-auto rounded-xl p-6 bg-slate-100">
                <IoMdArrowBack className='text-xl cursor-pointer' onClick={() => { navigate('/login') }} />
                <p className="text-2xl text-center font-bold mt-4">Create your free account</p>
                <div className='flex items-center justify-center mt-2'>
                    <p className="text-center text-gray-600">Already having an ID?</p>&nbsp;
                    <p onClick={() => navigate('/login')} className='text-blue-500 font-semibold cursor-pointer'>Login here</p>
                </div>
                <div className="flex flex-col mt-4 space-y-3">
                    <label className="text-gray-700 font-semibold">Your name</label>
                    <input type="text" placeholder="alex" className="rounded-md h-10 p-2" ref={nameref} />
                    <label className="text-gray-700 font-semibold">Your role</label>
                    <select className='rounded-md h-10 p-1' ref={roleref}>
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN" disabled>Admin</option>
                    </select>
                    <label className="text-gray-700 font-semibold">Your phone number</label>
                    <input type="tel" placeholder="010-0000-0000" className="mt-2 rounded-md h-10 p-2" ref={phoneref} maxLength={11} />
                    <label className="text-gray-700 font-semibold">Your id</label>
                    <input type="text" placeholder="abcde123" className='rounded-md h-10 p-2 mt-2' ref={idref}></input>
                    <label className="text-gray-700 font-semibold">Password</label>
                    <input type='password' placeholder=' ●●●●●●●●' className='rounded-md h-10 p-2 mt-2' ref={pwdref}></input>
                </div>
                <div className='mt-2'>
                    <input type='checkbox' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <label className='ml-2'>
                        I agree to the <span className='underline cursor-pointer' onClick={handleShowModal}>Terms and Conditions</span>
                    </label>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="submit" onClick={handleSign} className="bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-600">Sign in</button>
                </div>
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleModalClick}>
                        <div className="bg-white p-6 rounded-lg w-1/2">
                            <Terms />
                            <div className="flex justify-end">
                                <button onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
