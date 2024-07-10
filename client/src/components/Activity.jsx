import React, { useState, useEffect } from 'react';

const Activity = ({ selectAll }) => {
    const [selectedItems, setSelectedItems] = useState([false, false, false]);

    const handleSelectItem = (index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = !newSelectedItems[index];
        setSelectedItems(newSelectedItems);
    };

    useEffect(() => {
        setSelectedItems([selectAll, selectAll, selectAll]);
    }, [selectAll]);

    return (
        <div className="mt-4">
            {['Work Item 1', 'Work Item 2', 'Work Item 3'].map((item, index) => (
                <div key={index} className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        checked={selectedItems[index]}
                        onChange={() => handleSelectItem(index)}
                    />
                    <span className="ml-2">{item}</span>
                </div>
            ))}
        </div>
    );
};

export default Activity;
