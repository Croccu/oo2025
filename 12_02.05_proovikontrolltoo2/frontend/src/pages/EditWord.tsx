import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditWord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/words/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch word');
        return res.json();
      })
      .then((data) => {
        if (nameRef.current) nameRef.current.value = data.name;
        if (descriptionRef.current) descriptionRef.current.value = data.description;
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedWord = {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
    };

    fetch(`http://localhost:8080/words/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWord),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update word');
        return res.json();
      })
      .then(() => {
        navigate(`/word/${id}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Word</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            placeholder="Word name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            ref={descriptionRef}
            type="text"
            className="form-control"
            placeholder="Description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditWord;
