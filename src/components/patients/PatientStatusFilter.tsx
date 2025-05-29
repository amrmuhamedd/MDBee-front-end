import React from 'react';
import { Select, Space, Typography } from 'antd';
import type { PatientStatus } from '../../types/patient';

const { Option } = Select;
const { Text } = Typography;

interface PatientStatusFilterProps {
  value?: PatientStatus;
  onChange: (value?: PatientStatus) => void;
}

const PatientStatusFilter: React.FC<PatientStatusFilterProps> = ({ value, onChange }) => {
  const statuses: PatientStatus[] = ['Active', 'Discharged', 'Pending', 'In Progress', 'Ready'];

  return (
    <Space>
      <Text strong>Status:</Text>
      <Select
        placeholder="Filter by status"
        style={{ width: 150 }}
        allowClear
        value={value}
        onChange={onChange}
      >
        {statuses.map(status => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default PatientStatusFilter;
