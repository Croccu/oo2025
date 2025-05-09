import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Word } from "../models/Word";

const WordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${id}`)
      .then(res => res.json())
      .then(data => setWord(data));
  }, [id]);

  if (!word) return <div className="container mt-4">Loading...</div>;

return (
  <div className="container mt-5 w-50 mx-auto text-center">
    <h2 className="mb-4">Word Details</h2>
    <p><strong>Name:</strong> {word?.name}</p>
    <p><strong>Description:</strong> {word?.description}</p>

    <div className="d-flex justify-content-center gap-2 mt-4">
      <button className="btn btn-secondary" onClick={() => navigate("/")}>← Back</button>
      <button className="btn btn-warning" onClick={() => navigate(`/edit-word/${id}`)}>Edit</button>
    </div>
  </div>
);
};

export default WordDetail;
