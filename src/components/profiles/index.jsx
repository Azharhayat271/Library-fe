import React, { useEffect, useState } from 'react';
import { Card, Table, Modal, Button, Space, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileManagement = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState('activate');
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Add confirmDeleteVisible state
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    // Replace with your API endpoint
    axios.get('http://localhost:5000/signup/users')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showConfirmationModal = (user) => {
    setSelectedUser(user);
    setSelectedAction(user.status === 'active' ? 'deactivate' : 'activate');
    setVisible(true);
  };

  const showDeleteConfirmationModal = (user) => {
    setSelectedUser(user);
    setConfirmDeleteVisible(true); // Show the delete confirmation modal
  };

  const handleOk = () => {

    if (selectedUser.role === "admin") {
      message.error("Cannot Change the status of admin user.");
      setVisible(false);
      return;
    }
    if (selectedAction === 'activate' || selectedAction === 'deactivate') {
      const newStatus = selectedAction === 'activate' ? 'active' : 'inactive';
      const usernameToUpdate = selectedUser.username;

      axios.put(`http://localhost:5000/signup/updatestatus/${usernameToUpdate}`, {
        status: newStatus
      })
        .then((response) => {
          message.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
          fetchUserData();
        })
        .catch((error) => {
          message.error(`Error ${newStatus === 'active' ? 'activating' : 'deactivating'} user`);
          console.error(`Error ${newStatus === 'active' ? 'activating' : 'deactivating'} user: `, error);
        })
        .finally(() => {
          setVisible(false);
        });
    } else {
      setVisible(false);
    }
  };


  const handleDeleteUser = () => {
    const usernameToDelete = selectedUser.username;

    if (selectedUser.role === "admin") {
      message.error("Cannot delete an admin user.");
      setConfirmDeleteVisible(false);
      return;
    }

    // If the user is not an admin, proceed with the deletion
    axios.delete(`http://localhost:5000/signup/delete/${usernameToDelete}`)
      .then((response) => {
        message.success('User deleted successfully');
        console.log('User deleted successfully', response.data);
        fetchUserData();
      })
      .catch((error) => {
        message.error('Error deleting user');
        console.error('Error deleting user: ', error);
      })
      .finally(() => {
        setConfirmDeleteVisible(false);
      });
  };



  const handleCancel = () => {
    setVisible(false);
    setConfirmDeleteVisible(false); // Close both modals
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Role', // Add a new column for the role
      dataIndex: 'role', // Make sure this matches the key in your user data
      key: 'role',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => (
        record.status === 'active' ? 'Active' : 'Inactive'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button
            type="default"
            danger
            onClick={() => showConfirmationModal(record)}
          >
            Status
          </Button>
          <Button
            type="default"
            danger
            onClick={() => showDeleteConfirmationModal(record)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Profile Management" style={{ width: '100%', height: '100%' }} extra={<Button type="primary" danger onClick={handleClick}>Add User</Button>}>
        <Table
          dataSource={userData}
          columns={columns}
          loading={loading}
          rowKey="username"
          scroll={{ y: 'calc(100vh - 200px)' }}
        />
      </Card>

      <Modal
        title={selectedAction === 'activate' ? 'Confirm Activation' : 'Confirm Deactivation'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="action" type="default" onClick={handleOk}>
            {selectedAction === 'activate' ? 'Activate' : 'Deactivate'}
          </Button>,
        ]}
      >
        {selectedUser && (
          <p>
            Are you sure you want to {selectedAction === 'activate' ? 'activate' : 'deactivate'} the account for user: {selectedUser.username}?
          </p>
        )}
      </Modal>

      <Modal
        title="Confirm Deletion"
        visible={confirmDeleteVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="action" type="default" onClick={handleDeleteUser}>
            Delete
          </Button>,
        ]}
      >
        {selectedUser && (
          <p>
            Are you sure you want to delete the user: {selectedUser.username}?
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ProfileManagement;
