// EmployeeList.js

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  // Define columns for DataGrid
  const columns = [
    // ... Define columns with sort and filter properties
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        onRowClick={(rowData) => onEdit(rowData)}
      />
    </div>
  );
};
