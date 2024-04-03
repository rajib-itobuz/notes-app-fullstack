import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../helper/makeApiRequest';
import assets from '../../assets';
import './style.css'
import ShowNewModal from '../../components/modal/Modal';
import { showToast } from '../../helper/toaster';

const Home = () => {
    const navig = useNavigate();
    const [data, setData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [email, setEmail] = useState(localStorage.getItem("email"))
    const [filter, setFilter] = useState("All")


    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add a note");
    const [modalNoteTitle, setModalNoteTitle] = useState("");
    const [modalNoteId, setModalNoteId] = useState("");
    const [modalNoteDesc, setModalNoteDesc] = useState("");

    function checkUserLoggedIn() {
        if (token && email) {
            getData();
        }
        else
            navig('/login')
    }

    async function getData() {
        const response = await makeApiRequest({
            method: 'get',
            token: token,
            url: "https://notes-app-pkip.onrender.com/get-all-notes"
        })
        setData(response.data.data)
    }
    const bgClasses = ['bg-danger-subtle', 'bg-info-subtle', 'bg-warning-subtle', 'bg-success-subtle'];

    async function addNote(title, description) {
        const randomColor = bgClasses[Math.floor(Math.random() * bgClasses.length)];
        // console.log(randomColor);
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                title,
                description,
                bgColor: randomColor,
            },
            url: "https://notes-app-pkip.onrender.com/add-note"
        })

        console.log(response);
        setShowModal(false);
        if (response.status < 400) {
            getData();
            showToast("Note added successfully")
        } else {
            showToast("Duplicate Note")
        }
    }

    async function updateNote(title, description) {
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                title,
                description
            },
            url: `https://notes-app-pkip.onrender.com/update-note?id=${modalNoteId}`
        })

        setShowModal(false);
        if (response.status < 400) {
            getData();
            showToast("Note updated successfully")

        } else {
            showToast("Note update Error")
        }
    }

    function onItemClicked(id, title, desc) {
        setModalTitle("Update item");
        setModalNoteId(id);
        setModalNoteTitle(title)
        setModalNoteDesc(desc)
        setShowModal(true);
    }

    function onPlusClicked() {
        setModalTitle("Add a note");
        setModalNoteTitle("");
        setModalNoteDesc("");
        setShowModal(true);
    }


    useEffect(() => {
        checkUserLoggedIn();
    }, [email, token]);

    return (
        <div className='d-flex flex-column vh-100 flex-md-row overflow-y-hidden'>
            <Sidebar token={token} email={email} setFilter={setFilter} filterCriteria={filter} tags={["All", "Visible", "Latest", "Hidden"]} />
            <Outlet context={[data, filter, onItemClicked, token, getData]} />
            <div role='button' className='position-fixed bg-danger plus-icon p-3 rounded-circle shadow-lg' onClick={onPlusClicked}>
                <img src={assets.addIcon} height={"40px"} width={"40px"} alt="plus" />
            </div>
            <ShowNewModal
                show={showModal}
                title={modalTitle}
                notetitle={modalNoteTitle}
                notedesc={modalNoteDesc}
                btnname={modalTitle === 'Update item' ? "Update" : "Add Note"}
                btnclicked={modalTitle === 'Update item' ? updateNote : addNote}
                onHide={() => setShowModal(false)}
            />
        </div>
    )
}

export default Home