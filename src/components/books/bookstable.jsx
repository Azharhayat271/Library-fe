import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Button, Modal, Input } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/book/getall')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const showDeleteConfirmation = (record) => {
    setDeleteConfirmationVisible(true);
    setSelectedBook(record);
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/book/remove/${selectedBook.ISBN}`)
      .then((response) => {
        message.success('Book deleted successfully');
        setBooks(books.filter((book) => book.ISBN !== selectedBook.ISBN));
        setDeleteConfirmationVisible(false);
      })
      .catch((error) => {
        message.error('Error deleting book');
        setDeleteConfirmationVisible(false);
      });
  };

  const columns = [
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      key: 'isbn',
    },
    {
      title: 'Book Name',
      dataIndex: 'title',
      key: 'bookName',
    },
    {
      title: 'Author Name',
      dataIndex: 'author',
      key: 'authorName',
    },
    {
      title: 'Copies',
      dataIndex: 'copies',
      key: 'copies',
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <DeleteOutlined onClick={() => showDeleteConfirmation(record)} />
          <span> | </span>
          {/* <EditOutlined onClick={() => handleEdit(record)} /> */}
          <Link to={`/books/edit/${record.ISBN}`}><EditOutlined /></Link>
        </span>
      ),
    },
  ];


  const handleEdit = (record) => {
    // Implement your edit logic here
    console.log('Edit book:', record);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.ISBN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Input.Search
        placeholder="Search by ISBN or Book Title"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />

      <Table dataSource={filteredBooks} columns={columns} loading={loading} rowKey="isbn" />

      <Modal
        title="Confirm Delete"
        visible={deleteConfirmationVisible}
        onOk={handleDelete}
        onCancel={cancelDelete}
        footer={[
          <Button key="cancel" onClick={cancelDelete}>
            Cancel
          </Button>,
          <Button key="action" type="default" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default BookTable;
