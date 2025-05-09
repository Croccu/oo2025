import { useEffect, useState } from 'react';
import type { Word } from '../models/Word';

const MainPage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const loadWords = () => {
    fetch('http://localhost:8080/words')
      .then(res => res.json())
      .then(data => setWords(data))
      .catch(err => console.error('Failed to fetch words:', err));
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8080/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    })
      .then(res => {
        if (res.ok) {
          setName('');
          setDescription('');
          loadWords();
        }
      })
      .catch(err => console.error('Failed to add word:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Words</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Word name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Word</button>
      </form>

      <ul className="list-group">
        {words.map((word) => (
          <li key={word.id} className="list-group-item">
            {word.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
