import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../models/User';
import * as Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    website: '',
    address: { street: '', suite: '', city: '', zipcode: '' },
    company: { name: '', catchPhrase: '', bs: '' }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8080/users/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setUser((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith('company.')) {
      const key = name.split('.')[1];
      setUser((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (res.ok) navigate('/');
    else alert('Failed to update user');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <label>Name</label>
          <input className="form-control" name="name" value={user.name} onChange={handleChange} />
          <label>Username</label>
          <input className="form-control" name="username" value={user.username} onChange={handleChange} />
          <label>Email</label>
          <input className="form-control" name="email" value={user.email} onChange={handleChange} />
          <label>Password</label>
          <input className="form-control" name="password" value={user.password} onChange={handleChange} />
          <label>Phone</label>
          <input className="form-control" name="phone" value={user.phone} onChange={handleChange} />
          <label>Website</label>
          <input className="form-control" name="website" value={user.website} onChange={handleChange} />
        </div>

        <div style={{ flex: 1 }}>
          <h5>Address</h5>
          <label>Street</label>
          <input className="form-control" name="address.street" value={user.address.street} onChange={handleChange} />
          <label>Suite</label>
          <input className="form-control" name="address.suite" value={user.address.suite} onChange={handleChange} />
          <label>City</label>
          <input className="form-control" name="address.city" value={user.address.city} onChange={handleChange} />
          <label>Zipcode</label>
          <input className="form-control" name="address.zipcode" value={user.address.zipcode} onChange={handleChange} />

          <h5>Company</h5>
          <label>Name</label>
          <input className="form-control" name="company.name" value={user.company.name} onChange={handleChange} />
          <label>Catch Phrase</label>
          <input className="form-control" name="company.catchPhrase" value={user.company.catchPhrase} onChange={handleChange} />
          <label>BS</label>
          <input className="form-control" name="company.bs" value={user.company.bs} onChange={handleChange} />
        </div>

        <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
          <Bootstrap.Button type="submit">Update User</Bootstrap.Button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
