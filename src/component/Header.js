import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { inout } from '../RecoilAtom';
import { GiWaterSplash } from "react-icons/gi";
import { FcBusinessman } from "react-icons/fc";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const name = useRecoilValue(inout);
    const log = useRecoilValue(inout);
    const [logout, setLogout] = useRecoilState(inout);
    const id = localStorage.getItem('id');
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!id)
            setLogout('Login / Join');
        else
            setLogout("Logout");
    }, [id]);

    const handleLoginClick = () => {
        if (log === 'Login / Join') {
            navigate('/login');
        } else if (log === 'Logout') {
            localStorage.clear();
            setLogout('Login / Join');
            navigate('/');
        }
    };

    const handleClick = (text) => {
        if (text === "stat") {
            if (role === "MEMBER") {
                navigate(`/${text}`);
            } else if (role === "ADMIN") {
                navigate(`/${text}`);
            } else if (role === null) {
                alert("Access denied. Please log in.")
                navigate("/login")
            }
        } else if (text === "manage" || text === "elec") {
            // if (role === "MEMBER") {
            //     alert("Access denied.")
            //     navigate("/")
            // } else if (role === "ADMIN") {
            //     navigate(`/${text}`);
            // } else if (role === null) {
            //     alert("Access denied. Please log in.")
            //     navigate("/login")
            // }

            if (role === null) {
                alert("Access denied. Please log in.")
                navigate("/login")
            } else
                navigate(`/${text}`);
        }
    }

    return (
        <div className="bg-white w-full flex justify-between items-center h-20 p-4 border">
            <div className='flex text-4xl font-semibold items-center w-1/6 justify-start'>
                <div className='flex items-center text-black cursor-pointer group' onClick={() => { navigate("/") }}>
                    <GiWaterSplash className='inline transition duration-300 group-hover:text-blue-500' />
                    <span className='text-xl ml-2 font-bold'>H<sub>2</sub><span className='text-sky-400'>O</span>ptimizer</span>
                </div>
            </div>
            <div className='flex items-center space-x-10 w-2/3 justify-center'>
                <div className={`text-lg font-semibold transition duration-300 cursor-pointer ${location.pathname === '/stat' ? 'text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleClick('stat')}>Statistics</div>
                <div className={`text-lg font-semibold transition duration-300 cursor-pointer ${location.pathname === '/elec' ? 'text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleClick('elec')}>Electricity</div>
                <div className={`text-lg font-semibold transition duration-300 cursor-pointer ${location.pathname === '/manage' ? 'text-blue-500' : 'hover:text-blue-500'}`} onClick={() => handleClick('manage')}>Management</div>
            </div>
            <div className='w-1/6 text-lg flex justify-end items-center space-x-4'>
                {id && <div className='flex items-center space-x-1'>
                    <div className='text-2xl'><FcBusinessman /></div>
                    <div className='font-semibold'>{id}</div>
                </div>}
                <div className='font-semibold cursor-pointer hover:text-blue-500 transition duration-300' onClick={handleLoginClick}>{name}</div>
            </div>
        </div>
    )
}
