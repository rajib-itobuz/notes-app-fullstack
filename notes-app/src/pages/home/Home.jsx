import React, { useEffect, useRef, useState } from 'react'
import { getUserToken } from '../../helper/storage/storeUserToken';
import Sidebar from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../helper/makeApiRequest';
import assets from '../../assets';
import './style.css'
import ShowNewModal from '../../components/modal/Modal';

const Home = () => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null)
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState("All")


    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add a note");
    const [modalNoteTitle, setModalNoteTitle] = useState("");
    const [modalNoteId, setModalNoteId] = useState("");
    const [modalNoteDesc, setModalNoteDesc] = useState("");


    async function getData() {
        const response = await makeApiRequest({
            method: 'get',
            token: token,
            url: "http://localhost:5000/get-all-notes"
        })

        setData(response.data.data)
    }

    async function addNote(title, description) {
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                title,
                description
            },
            url: "http://localhost:5000/add-note"
        })

        setShowModal(false);
        getData();
    }

    async function updateNote(title, description) {
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                title,
                description
            },
            url: `http://localhost:5000/update-note?id=${modalNoteId}`
        })

        setShowModal(false);
        getData();
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
        setToken(getUserToken());
        setEmail("adityanandi550@gmail.com");
    }, []);

    useEffect(() => {
        if (token && email)
            getData();
        else
            console.log("email & data not present");
    }, [token, email])

    return (
        <div className='d-flex flex-column vh-100 flex-sm-row overflow-y-hidden'>
            <Sidebar token={token} email={email} setFilter={setFilter} tags={["All", "Visible", "Latest", "Hidden"]} />
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