import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Word } from "../models/Word";

const WordDetails = () => {
  const { id } = useParams();
  const [word, setWord] = useState<Word | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/words/${id}`)
      .then((res) => res.json())
      .then((data) => setWord(data));
  }, [id]);

  // this part is used to fetch an image matching name/description of the word from Unsplash API
  useEffect(() => {
    if (word?.name) {
      const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

      fetch(`https://api.unsplash.com/search/photos?query=${word.name}&client_id=${ACCESS_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const exactMatch = data.results.find((img: {
              alt_description: string | null;
              description: string | null;
              urls: { regular: string };
            }) =>
              img.alt_description?.toLowerCase().includes(word.name.toLowerCase()) ||
              img.description?.toLowerCase().includes(word.name.toLowerCase())
            );

            const selected = exactMatch || data.results[0];
            setImageUrl(selected.urls.regular);
          }
        });
    }
  }, [word]);

  // additionally contains images and a small warning telling that the image may not match the word
  return (
    <div className="container mt-5 w-50 mx-auto text-center">
      <h2 className="mb-4">Word Details</h2>
      <p><strong>Name:</strong> {word?.name}</p>
      <p><strong>Description:</strong> {word?.description}</p>

    {imageUrl && (
      <>
        <img
          src={imageUrl}
          alt={word?.name}
          className="img-fluid my-4 rounded"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
        <div className="text-danger small d-flex align-items-center justify-content-center mb-3">
          <span
            style={{
              display: "inline-block",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#dc3545",
              color: "white",
              textAlign: "center",
              lineHeight: "18px",
              fontSize: "12px",
              marginRight: "6px",
            }}
          >
            !
          </span>
          Images may not precisely match the word or description.
        </div>
      </>
    )}

      <div className="d-flex justify-content-center gap-2 mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>← Back</button>
        <button className="btn btn-warning" onClick={() => navigate(`/edit-word/${id}`)}>Edit</button>
      </div>
    </div>
  );
};

export default WordDetails;
