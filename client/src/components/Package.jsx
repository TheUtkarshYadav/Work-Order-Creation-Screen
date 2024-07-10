import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import initialData from '../data.js';

const App = () => {
  const [data, setData] = useState(initialData);
  const [expandedParents, setExpandedParents] = useState([]);
  const [expandedChildren, setExpandedChildren] = useState([]);

  // Function to toggle individual row selection
  const toggleRowSelection = (id) => {
    const newData = data.map((row) =>
      row.id === id ? { ...row, selected: !row.selected } : row
    );
    setData(newData);
  };

  // Function to toggle select all checkboxes
  const toggleSelectAll = () => {
    const newSelectAll = !data.every((row) => row.selected);
    const newData = data.map((row) => ({
      ...row,
      selected: newSelectAll,
      activities: row.activities.map((activity) => ({
        ...activity,
        selected: newSelectAll,
        items: activity.items.map((item) => ({
          ...item,
          selected: newSelectAll
        }))
      }))
    }));
    setData(newData);
  };

  // Function to toggle parent row expansion
  const toggleParentRows = (id) => {
    if (expandedParents.includes(id)) {
      setExpandedParents(expandedParents.filter((rowId) => rowId !== id));
    } else {
      setExpandedParents([...expandedParents, id]);
    }
  };

  // Function to toggle child row expansion
  const toggleChildRows = (parentId, childId) => {
    const key = `${parentId}-${childId}`;
    if (expandedChildren.includes(key)) {
      setExpandedChildren(expandedChildren.filter((rowKey) => rowKey !== key));
    } else {
      setExpandedChildren([...expandedChildren, key]);
    }
  };

  // Function to toggle activity selection
  const toggleActivitySelection = (packageId, activityId) => {
    const newData = data.map((row) => {
      if (row.id === packageId) {
        const newActivities = row.activities.map((activity) =>
          activity.id === activityId ? { ...activity, selected: !activity.selected } : activity
        );
        return { ...row, activities: newActivities };
      }
      return row;
    });
    setData(newData);
  };

  // Function to toggle item selection
  const toggleItemSelection = (packageId, activityId, itemId) => {
    const newData = data.map((row) => {
      if (row.id === packageId) {
        const newActivities = row.activities.map((activity) => {
          if (activity.id === activityId) {
            const newItems = activity.items.map((item) =>
              item.id === itemId ? { ...item, selected: !item.selected } : item
            );
            return { ...activity, items: newItems };
          }
          return activity;
        });
        return { ...row, activities: newActivities };
      }
      return row;
    });
    setData(newData);
  };

  // Determine if all checkboxes are checked
  const allSelected = data.length > 0 && 
                      data.every((row) => row.selected && 
                      row.activities.every((activity) => 
                      activity.selected && 
                      activity.items.every((item) => item.selected)));

  return (
    <div className="container mx-auto p-4">
      <table className="border min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-2 py-3 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-2 py-3 font-bold text-left text-xs text-gray-500 uppercase tracking-wider">Packages</th>
            <th className="px-2 py-3 font-bold text-left text-xs text-gray-500 uppercase tracking-wider">Rate <span className='lowercase italic'>(in sqft)</span></th>
            <th className="px-2 py-3 font-bold text-left text-xs text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3"></th> 
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <tr className="bg-white">
                <td className="px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    checked={row.selected}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                <td className="px-2 py-2 font-bold whitespace-nowrap">{row.package}</td>
                <td className="px-2 py-2 whitespace-nowrap">{row.rate}</td>
                <td className="px-2 py-2 whitespace-nowrap relative">
                  <span className="mr-2">{row.total}</span>
                </td>
                <td className="px-2 py-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleParentRows(row.id)}
                      className="text-teal-500 hover:text-teal-700 text-5xl" 
                      aria-label={expandedParents.includes(row.id) ? 'Collapse' : 'Expand'}
                    >
                      {expandedParents.includes(row.id) ? '-' : '+'}
                    </button>
                  </div>
                </td>
              </tr>
              {expandedParents.includes(row.id) && row.activities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <tr>
                    <td className="px-2 py-2 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={activity.selected}
                        onChange={() => toggleActivitySelection(row.id, activity.id)}
                      />
                    </td>
                    <td className="px-2 py-2 font-bold whitespace-nowrap">{activity.name}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{activity.rate}</td>
                    <td className="px-2 py-2 whitespace-nowrap relative">
                      <span className="mr-2">{activity.total}</span>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleChildRows(row.id, activity.id)}
                          className="text-teal-500 hover:text-teal-700 text-5xl" 
                          aria-label={expandedChildren.includes(`${row.id}-${activity.id}`) ? 'Collapse' : 'Expand'}
                        >
                          {expandedChildren.includes(`${row.id}-${activity.id}`) ? <IoIosArrowUp className='text-black text-lg'/> : <IoIosArrowDown className='text-black text-lg'/>}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedChildren.includes(`${row.id}-${activity.id}`) && activity.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-indigo-600"
                          checked={item.selected}
                          onChange={() => toggleItemSelection(row.id, activity.id, item.id)}
                        />
                      </td>
                      <td className="px-2 py-2 font-bold whitespace-nowrap">{item.name}</td>
                      <td className="px-2 py-2 whitespace-nowrap"></td> 
                      <td className="px-2 py-2 whitespace-nowrap"></td> 
                      <td className="px-2 py-2"></td> 
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
