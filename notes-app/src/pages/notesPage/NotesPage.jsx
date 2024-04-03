import { useOutletContext } from 'react-router';
import Note from '../../components/notes/Note';
import { useEffect, useState } from 'react';
import makeApiRequest from '../../helper/makeApiRequest';


const NotesPage = () => {

    const [data, filterCriteria, modelOpen, token, getData] = useOutletContext();

    const [selectedItems, setselectedItems] = useState([]);

    const checkboxClicked = (id) => {
        if (!selectedItems.includes(id)) {
            console.log(`add item`);
            setselectedItems([...selectedItems, id]);
        } else {
            console.log(`remove item`);
            const index = selectedItems.findIndex(item => item === id);
            setselectedItems(selectedItems.slice(0, index).concat(selectedItems.slice(index + 1)));
        }
    }

    useEffect(() => {
        setselectedItems([]);
    }, [filterCriteria])


    async function hideNotes() {
        if (selectedItems.length > 0) {
            const response = await makeApiRequest({
                method: 'post',
                token: token,
                body: {
                    itemIds: selectedItems
                },
                url: "https://notes-app-pkip.onrender.com/hide-notes"
            })
            setselectedItems([]);
            if (response.status < 400) {
                getData();
                showToast("Note Hidden successfully")

            } else {
                showToast("Can't hide Notes")
            }
        }
    }

    async function showNotes() {
        if (selectedItems.length > 0) {
            const response = await makeApiRequest({
                method: 'post',
                token: token,
                body: {
                    itemIds: selectedItems
                },
                url: "https://notes-app-pkip.onrender.com/show-notes"
            })
            setselectedItems([]);
            if (response.status < 400) {
                getData();
                showToast("Note unhide successfully")

            } else {
                showToast("Show notes failed")
            }
        }
    }

    async function deleteNotes() {
        if (selectedItems.length > 0) {
            const response = await makeApiRequest({
                method: 'post',
                token: token,
                body: {
                    itemIds: selectedItems
                },
                url: "https://notes-app-pkip.onrender.com/delete-notes"
            })
            setselectedItems([]);
            if (response.status < 400) {
                getData();
                showToast("Note deleted successfully")

            } else {
                showToast("Delete notes failed")
            }
        }
    }



    return (
        <div className='p-3 overflow-auto w-100'>
            <div className='d-flex flex-wrap gap-2 align-items-center flex-column flex-sm-row justify-content-sm-between '>
                <h2 className='flex-shrink-0 fs-3'>Your {filterCriteria} Notes</h2>
                <div className='ms-md-3 gap-1 d-flex flex-shrink-0'>
                    <button onClick={hideNotes} className='btn btn-dark'>Hide Notes</button>
                    <button onClick={showNotes} className='btn btn-dark'>Show Notes</button>
                    <button onClick={deleteNotes} className='btn btn-dark'>Delete Notes</button>
                </div>
            </div>
            <div className='d-flex mt-3 flex-row gap-2 flex-wrap'>
                {
                    data &&
                    data.filter(
                        (item) => {
                            if (filterCriteria === 'All' || filterCriteria === 'Latest')
                                return true;
                            else if (filterCriteria === 'Visible')
                                return !item.isHidden;
                            else if (filterCriteria === 'Hidden')
                                return item.isHidden;
                        }
                    ).sort((a, b) => {
                        if (filterCriteria === 'Latest') {
                            const aDate = new Date(a.updatedAt)
                            const bDate = new Date(b.updatedAt)

                            return bDate - aDate
                        }
                    }).map(
                        (item, index) => {
                            return <Note key={`note${filterCriteria}-item-${index}-${item.title}`} {...item} oncheckBoxclicked={checkboxClicked} openModal={modelOpen} />
                        })
                }
            </div>
        </div>
    )
}

export default NotesPage