import { useOutletContext } from 'react-router';
import Note from '../../components/notes/Note';
import { useEffect, useState } from 'react';
import makeApiRequest from '../../helper/makeApiRequest';


const NotesPage = () => {

    const [data, filterCriteria, modelOpen, token, getData] = useOutletContext();
    const bgClasses = ['bg-danger-subtle', 'bg-info-subtle', 'bg-warning-subtle', 'bg-success-subtle'];

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
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                itemIds: selectedItems
            },
            url: "http://localhost:5000/hide-notes"
        })
        getData();
    }

    async function showNotes() {
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                itemIds: selectedItems
            },
            url: "http://localhost:5000/show-notes"
        })
        getData();
    }

    async function deleteNotes() {
        const response = await makeApiRequest({
            method: 'post',
            token: token,
            body: {
                itemIds: selectedItems
            },
            url: "http://localhost:5000/delete-notes"
        })
        getData();
    }



    return (
        <div className='p-3 overflow-auto'>
            <div className='d-flex gap-2 align-items-center flex-column flex-flex-sm-row '>
                <h2>Your {filterCriteria} Notes</h2>
                <div className='ms-md-3 gap-1 d-flex'>
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
                            const random = Math.floor(Math.random() * bgClasses.length);
                            return <Note key={`note${filterCriteria}-item-${index}-${item.title}`} {...item} bgColor={'bg-danger-subtle'} oncheckBoxclicked={checkboxClicked} openModal={modelOpen} />
                        })
                }
            </div>
        </div>
    )
}

export default NotesPage