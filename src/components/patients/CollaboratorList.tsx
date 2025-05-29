import React from 'react';
import { Tooltip, Space, Tag } from 'antd';

interface CollaboratorListProps {
  collaborators: string;
  max?: number;
}

const CollaboratorList: React.FC<CollaboratorListProps> = ({ collaborators, max = 3 }) => {
  const collaboratorList = collaborators.split(', ');
  const visibleCollaborators = collaboratorList.slice(0, max);
  const remainingCount = collaboratorList.length - visibleCollaborators.length;

  return (
    <Space size={2} wrap style={{ display: 'flex', flexWrap: 'wrap' }}>
      {visibleCollaborators.map((collaborator, index) => (
        <Tooltip key={index} title={collaborator}>
          <Tag 
            style={{ 
              backgroundColor: '#f2f2f2', 
              color: '#333',
              borderRadius: '20px',
              margin: '0 4px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              boxShadow: 'none'
            }}
          >
            {formatCollaboratorName(collaborator)}
          </Tag>
        </Tooltip>
      ))}
      
      {remainingCount > 0 && (
        <Tooltip title={collaboratorList.slice(max).join(', ')}>
          <Tag 
            style={{ 
              backgroundColor: '#f2f2f2', 
              color: '#333',
              borderRadius: '20px',
              margin: '0 4px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              boxShadow: 'none'
            }}
          >
            +{remainingCount}
          </Tag>
        </Tooltip>
      )}
    </Space>
  );
};

const formatCollaboratorName = (name: string): string => {
  if (name.toLowerCase().includes('dr')) {
    const parts = name.split(' ');
    return 'DR ' + parts[parts.length - 1].toUpperCase();
  }
  
  if (name.includes(' ')) {
    const nameParts = name.split(' ');
    return nameParts.map(part => part[0].toUpperCase()).join('');
  }
  return name.substring(0, 2).toUpperCase();
};

export default CollaboratorList;
