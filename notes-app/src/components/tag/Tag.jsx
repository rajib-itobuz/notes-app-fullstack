import React from 'react'

const Tag = ({ tag, updateFilter }) => {
    return (
        <div role='button' onClick={() => updateFilter(tag)} className='p-1 px-4 ps-0 font-16 rounded-md-pill  w-fit '>{tag}</div>
    )
}

export default Tag