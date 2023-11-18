// CustomNodeLabel.js
import React from 'react';
import './CustomNodeLabel.css';

const CustomNodeLabel = ({ nodeData }) => {
  console.log('CustomNodeLabel nodeData:', nodeData);
  if (!nodeData) return null;

  return (
    <div className="custom-node-label" style={{ textAlign: 'center' }}>
      <h2>{nodeData.name}</h2>
      <p>{nodeData.role}</p>
      <p>{nodeData.employee_number}</p>
      {/* Add additional fields as needed */}
    </div>
  );
};

export default CustomNodeLabel;