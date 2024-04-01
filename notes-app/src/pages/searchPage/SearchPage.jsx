import React from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import Note from '../../components/notes/Note';
// import { URLSearchParams } from 'url';

const SearchPage = () => {
    const [data, filterCriteria, modalOpen] = useOutletContext();
    const params = (() => { return new URLSearchParams(useLocation().search).get("q") })();

    return (
        <div className='p-3 w-100'>
            <h2>Search results for : {params}</h2>
            <div className='d-flex flex-row gap-2 flex-wrap'>
                {
                    data &&
                    data.filter(
                        (item) => item.title.includes(params))
                        .map(
                            (item, index) => {
                                // const random = Math.floor(Math.random() * bgClasses.length);
                                return <Note key={`searchitem-${index}-${item.title}`} {...item} bgColor={'bg-warning-subtle'} openModal={modalOpen} />
                            })
                }
            </div>
        </div>
    )
}

export default SearchPage