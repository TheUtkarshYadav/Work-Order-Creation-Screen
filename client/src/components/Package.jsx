import React, { useState } from 'react';
import Activity from './Activity';

const Package = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const handleExpandCollapse = () => setExpanded(!expanded);
    const handleSelectAll = () => setSelectAll(!selectAll);

    return (
        <div className="border p-4 mt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Civil 1</h3>
                <div>
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    <button className="ml-2" onClick={handleExpandCollapse}>
                        {expanded ? '-' : '+'}
                    </button>
                </div>
            </div>
            {expanded && <Activity selectAll={selectAll} />}
        </div>
    );
};

export default Package;
