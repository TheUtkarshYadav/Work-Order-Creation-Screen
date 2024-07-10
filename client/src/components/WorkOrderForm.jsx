import React from 'react';

const WorkOrderForm = () => {
    return (
        <form className="my-4 p-4 border rounded">
            <div>
                <label className="block text-sm font-medium text-gray-700">Work Order Name</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Save</button>
        </form>
    );
};

export default WorkOrderForm;
