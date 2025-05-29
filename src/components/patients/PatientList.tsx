import React, { useState } from 'react';
import { Card, Space, Typography, Row, Col, Alert } from 'antd';
import { usePatients } from '../../hooks/usePatients';
import PatientTable from './PatientTable';
import PatientStatusFilter from './PatientStatusFilter';
import type { PatientStatus } from '../../types/patient';

const { Title } = Typography;

const PatientList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<PatientStatus | undefined>(undefined);
  
  const {
    patients,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    filterByStatus,
    deletePatient,
    deleting,
  } = usePatients(10);

  const handleStatusChange = (status?: PatientStatus) => {
    setStatusFilter(status);
    filterByStatus(status);
  };

  return (
    <Card style={{ width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>Patient List</Title>
          </Col>
          <Col>
            <PatientStatusFilter 
              value={statusFilter} 
              onChange={handleStatusChange} 
            />
          </Col>
        </Row>

        {error && (
          <Alert
            message="Error"
            description="Failed to load patient data. Please try again later."
            type="error"
            showIcon
          />
        )}

        <PatientTable
          data={patients}
          loading={loading}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
          onDelete={deletePatient}
          deleting={deleting}
        />
      </Space>
    </Card>
  );
};

export default PatientList;
