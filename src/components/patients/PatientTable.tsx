import React, { useState, useRef, useEffect } from "react";
import { Button, Typography, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { Patient, PatientStatus, NotesStatus } from "../../types/patient";
import StatusTag from "../common/StatusTag";
import CollaboratorList from "./CollaboratorList";
import { VariableSizeList as List } from "react-window";
import "./PatientTable.css";

const { Text } = Typography;

interface PatientTableProps {
  data: Patient[];
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onDelete: (id: number) => Promise<boolean>;
  deleting: boolean;
}

const PatientTable: React.FC<PatientTableProps> = ({
  data,
  loading,
  hasNextPage,
  onLoadMore,
  onDelete,
  deleting,
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null);

  const showDeleteConfirm = (patientId: number) => {
    setPatientToDelete(patientId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (patientToDelete === null) return;

    try {
      const success = await onDelete(patientToDelete);

      if (success) {
        message.success(`Patient has been deleted successfully`);
      }

      setIsDeleteModalVisible(false);
      setPatientToDelete(null);
    } catch (error) {
      message.error("Failed to delete patient. Please try again.");
      console.error("Delete error:", error);
      setIsDeleteModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsDeleteModalVisible(false);
    setPatientToDelete(null);
  };

  const [tableHeight, setTableHeight] = useState(400);
  const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({});
  const listRef = useRef<List>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTableHeight = () => {
      if (tableContainerRef.current) {
        const height = window.innerHeight - 250;
        setTableHeight(Math.max(400, height));
      }
    };

    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);
    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  const getRowHeight = (index: number) => {
    return rowHeights[index] || 60;
  };

  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        const rowElements = document.querySelectorAll(".virtual-row");
        const newHeights: { [key: number]: number } = {};

        rowElements.forEach((el, i) => {
          newHeights[i] = el.getBoundingClientRect().height + 8;
        });

        setRowHeights(newHeights);
        listRef.current?.resetAfterIndex(0);
      }, 100);
    }
  }, [data.length]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const patient = data[index];
    if (!patient) return null;

    return (
      <div className="virtual-row" style={{ ...style, width: "100%" }}>
        <div
          className="ant-table-row"
          style={{ display: "flex", width: "100%" }}
        >
          <div
            className="ant-table-cell"
            style={{ flex: 2, padding: "16px 8px" }}
          >
            <Text strong>{patient.name}</Text>
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 2, padding: "16px 8px" }}
          >
            {new Date(patient.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px" }}
          >
            <StatusTag
              status={patient.status as PatientStatus}
              type="patient"
            />
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px" }}
          >
            <StatusTag
              status={patient.notes_status as NotesStatus}
              type="notes"
            />
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px" }}
          >
            <StatusTag status={"Completed" as NotesStatus} type="notes" />
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px" }}
          >
            {patient.room}
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 2, padding: "16px 8px" }}
          >
            <CollaboratorList collaborators={patient.collabrators} />
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px" }}
          >
            {patient.location}
          </div>

          <div
            className="ant-table-cell"
            style={{ flex: 1, padding: "16px 8px", textAlign: "center" }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(patient.id)}
              loading={deleting && patientToDelete === patient.id}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="patient-table-container" ref={tableContainerRef}>
      <Modal
        title="Delete Patient"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        okText="Delete"
        okButtonProps={{ danger: true, loading: deleting }}
        onCancel={handleModalCancel}
        cancelText="Cancel"
      >
        <Typography.Text>
          Are you sure you want to delete this patient? This action cannot be
          undone.
        </Typography.Text>
      </Modal>

      {data.length > 0 ? (
        <>
          <div
            className="ant-table-header"
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: "#fafafa",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div
              className="ant-table-cell"
              style={{ flex: 2, padding: "16px 8px", fontWeight: 600 }}
            >
              Patient's Name
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 2, padding: "16px 8px", fontWeight: 600 }}
            >
              Encounters Date
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 1, padding: "16px 8px", fontWeight: 600 }}
            >
              Status
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 1, padding: "16px 8px", fontWeight: 600 }}
            >
              Notes Status
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 1, padding: "16px 8px", fontWeight: 600 }}
            >
              Letters Status
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 1, padding: "16px 8px", fontWeight: 600 }}
            >
              Room/Provider
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 2, padding: "16px 8px", fontWeight: 600 }}
            >
              Collaborators
            </div>
            <div
              className="ant-table-cell"
              style={{ flex: 1, padding: "16px 8px", fontWeight: 600 }}
            >
              Location
            </div>
            <div
              className="ant-table-cell"
              style={{
                flex: 1,
                padding: "16px 8px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Actions
            </div>
          </div>

          <div style={{ height: tableHeight, width: "100%" }}>
            <List
              ref={listRef}
              height={tableHeight}
              width="100%"
              itemCount={data.length}
              itemSize={getRowHeight}
              overscanCount={5}
            >
              {Row}
            </List>
          </div>

          {hasNextPage && (
            <div
              style={{
                textAlign: "center",
                padding: "16px 0",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Button
                onClick={onLoadMore}
                loading={loading}
                type="primary"
                ghost
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "24px" }}>
          <Typography.Text type="secondary">
            {loading ? "Loading patients..." : "No patients found"}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
