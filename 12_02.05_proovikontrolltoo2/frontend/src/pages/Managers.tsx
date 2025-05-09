import { useEffect, useState } from "react";
import type { Word } from "../models/Word";

interface Manager {
  id: number;
  fullName: string;
}

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState<number | null>(null);
  const [managerWords, setManagerWords] = useState<Word[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/managers")
      .then((res) => res.json())
      .then((data) => setManagers(data));
  }, []);

  const fetchManagerWords = (managerId: number) => {
    setSelectedManagerId(managerId);
    fetch(`http://localhost:8080/managers/${managerId}/words`)
      .then((res) => res.json())
      .then((data) => setManagerWords(data));
  };

  const selectedManager = managers.find(m => m.id === selectedManagerId);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Managers</h2>

      <div className="d-flex justify-content-center">
        <ul className="list-group w-50 mb-4">
          {managers.map((manager) => (
            <li
              key={manager.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => fetchManagerWords(manager.id)}
            >
              {manager.fullName}
            </li>
          ))}
        </ul>
      </div>

      {selectedManagerId !== null && (
        <div className="w-50 mx-auto">
          <h4 className="mb-3 text-center">
            Words managed by {selectedManager?.fullName}
          </h4>
          <ul className="list-group">
            {managerWords.map((word) => (
              <li key={word.id} className="list-group-item">
                <a href={`/word/${word.id}`}><strong>{word.name}</strong></a>: {word.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Managers;
