import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import { User } from '../models/User';
import '../styles/MainPage.css';

const MainPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users?page=${page}&size=5&sort=name,${sortOrder}`
        );
        const data = await response.json();
        setUsers(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [page, sortOrder]);

  return (
    <div className="main-wrapper">
      <h2 className="mb-3">Users</h2>
      <div className="mb-3" style={{ alignSelf: 'flex-end' }}>
        <Bootstrap.Button onClick={() => navigate('/new')}>Add User</Bootstrap.Button>
      </div>

      <Bootstrap.Table striped bordered hover responsive>
        <thead>
          <tr>
            <th
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{ cursor: 'pointer' }}
            >
              Name {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
                <Bootstrap.Button
                  variant="info"
                  size="sm"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  View
                </Bootstrap.Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Bootstrap.Table>

      <div className="d-flex justify-content-between mt-3" style={{ width: '100%' }}>
        <Bootstrap.Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </Bootstrap.Button>
        <span>Page {page + 1} of {totalPages}</span>
        <Bootstrap.Button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Bootstrap.Button>
      </div>
    </div>
  );
};

export default MainPage;
