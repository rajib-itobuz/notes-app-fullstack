import React from 'react'

const Tag = ({ tag, updateFilter, isActive = false }) => {
    return (
        <div role='button' onClick={() => updateFilter(tag)} className={`p-1 px-4 ps-0 font-16 rounded-md-pill w-fit text-secondary ${isActive ? 'text-white' : ''}`}>{tag}</div>
    )
}

export default Tag