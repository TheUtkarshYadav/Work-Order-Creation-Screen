import React from 'react';
import WorkOrderForm from './WorkOrderForm.jsx';
import Package from './Package.jsx';

const Overview = () => {
    return (
        <div>
            <WorkOrderForm />
            <div className="mt-4">
                <Package />
            </div>
        </div>
    );
};

export default Overview;