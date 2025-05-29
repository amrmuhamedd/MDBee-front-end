import React from 'react';
import { Tag } from 'antd';
import type { NotesStatus, PatientStatus } from '../../types/patient';

interface StatusTagProps {
  status: PatientStatus | NotesStatus;
  type: 'patient' | 'notes';
}

const StatusTag: React.FC<StatusTagProps> = ({ status, type }) => {
  const getColor = (): string => {
    if (type === 'patient') {
      switch (status) {
        case 'Active':
          return 'green';
        case 'Discharged':
          return 'red';
        case 'Pending':
          return 'orange';
        case 'In Progress':
          return 'blue';
        case 'Ready':
          return 'cyan';
        default:
          return 'default';
      }
    } else {
      // Notes status
      switch (status) {
        case 'Completed':
          return 'green';
        case 'Incomplete':
          return 'red';
        case 'Pending':
          return 'orange';
        case '1/2 Copied':
          return 'purple';
        case 'Not Started':
          return 'gray';
        case 'Not Required':
          return 'default';
        default:
          return 'default';
      }
    }
  };

  return (
    <Tag color={getColor()}>
      {status}
    </Tag>
  );
};

export default StatusTag;
