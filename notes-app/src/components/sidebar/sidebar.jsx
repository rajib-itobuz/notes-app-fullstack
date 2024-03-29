import React from 'react'
import './style.css'
import assets from '../../assets'
import Tag from '../tag/Tag'
import { useNavigate } from 'react-router'

const Sidebar = ({ token, email, tags, setFilter }) => {
    const navig = useNavigate();
    const redirectOnChange = (e) => {
        if (e.target.value !== "") {
            navig(`/search?q=${e.target.value}`)
        } else {
            e.target.blur();
            navig('/')
        }
    }


    const updateFilter = (tag) => {
        setFilter(tag);
    }

    return (
        <div className='sidebar flex-shrink-0 w-100 bg-black text-white p-4'>
            <div className='d-flex gap-2 align-items-center'>
                <img src={assets.userIcon} alt="user" className='userImg rounded-circle bg-danger-subtle p-2' />
                <div className="text-truncate">
                    <h4 className='font-16'>{token}</h4>
                    <h5 className='font-12'>{email}</h5>
                </div>
            </div>

            <div className='sidebar-sticky'>
                <input type="search" placeholder='Search here' className='mt-3 text-white w-100 ' onChange={redirectOnChange} />

                <div className='d-flex pt-2 flex-row flex-md-column gap-1'>
                    {
                        tags.map((tag, index) => <Tag tag={tag} key={index} updateFilter={updateFilter} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar