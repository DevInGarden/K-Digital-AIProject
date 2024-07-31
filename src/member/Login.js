import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { useRecoilState } from 'recoil';
import { inout } from '../RecoilAtom'
import { jwtDecode } from 'jwt-decode';
import { GiWaterSplash } from "react-icons/gi";


export default function Login() {
    const navigate = useNavigate();
    const idref = useRef(null);
    const pwdref = useRef(null);
    const [log, setLog] = useRecoilState(inout)

    const handleLogin = async () => {
        if (!idref.current.value) {
            alert("Please enter your id")
            idref.current.focus()
            return;
        }
        if (!pwdref.current.value) {
            alert("Please enter your password")
            pwdref.current.focus()
            return;
        }

        const payload = {
            userLoginId: idref.current.value,
            userPw: pwdref.current.value
        }

        const url = 'http://10.125.121.225:8080/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json();
            console.log("data", response)

            const token = response.headers.get('Authorization');
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role
            const id = decodedToken.username


            if (data.status === 'success') {
                localStorage.setItem("id", id);
                localStorage.setItem("token", token);
                localStorage.setItem("role", role)

                navigate('/');
                setLog("Logout")
            } else if (data.status === 'noid') {
                alert("ID does not exist");
                idref.current.value = "";
                pwdref.current.value = "";
                idref.current.focus();
            }
            else {
                alert('Failed to login. Please try again.');
                pwdref.current.value = "";
                pwdref.current.focus();
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className=' w-96 h-100 bg-slate-100 rounded-xl p-6'>
                <div className='flex justify-end'>
                    <MdHome className='text-xl cursor-pointer' onClick={() => { navigate('/') }} />
                </div>
                <div className='flex justify-center'>
                    <GiWaterSplash className='text-3xl' />&nbsp;
                    <p className='text-2xl font-semibold'>H<sub>2</sub><span className='text-sky-400'>O</span>ptimizer</p>
                </div>
                <p className='text-xl text-center font-semibold mt-3'>Sign in to your account</p>
                <div className="flex flex-col mt-6">
                    <label className="text-gray-700 font-semibold">Your id</label>
                    <input type="text" placeholder="abcde123" className="mt-2 rounded-md h-10 p-2" ref={idref} />
                </div>
                <div className='flex flex-col mt-2'>
                    <label className="text-gray-700 font-semibold">Password</label>
                    <input type='password' placeholder=' ●●●●●●●●' className='rounded-md h-10 p-2 mt-2' ref={pwdref}></input>
                </div>
                <div className='flex justify-end mt-3'>
                    <p onClick={() => navigate('/forgot')} className='text-blue-600 font-semibold cursor-pointer'>Forgot password?</p>
                </div>
                <div className='flex justify-center mt-4'>
                    <button type='submit' onClick={handleLogin} className='bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-600'>Log in to your account</button>
                </div>
                <div className='flex justify-center mt-4'>
                    <p onClick={() => navigate('/register')} className='text-blue-600 font-semibold cursor-pointer'>Don't have an account</p>
                </div>
            </div>
        </div>
    )
}
