import { useCallback, useEffect, useRef, useState } from "react";
import type { Word } from "../models/Word";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const loadWords = useCallback(() => {
    fetch(`http://localhost:8080/words?page=${page}&size=${size}&sort=${sortOrder}`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data.content);
        setTotalPages(data.totalPages);
      });
  }, [page, size, sortOrder]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setPage(0);
  };

  const addWord = () => {
    const newWord = {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === undefined && json.status === undefined) {
          loadWords();
          toast.success("Word added!");
          nameRef.current!.value = "";
          descriptionRef.current!.value = "";
        } else {
          toast.error(json.message || "Failed to add word");
        }
      });
  };

  return (
  <div className="container mt-4">
    <h2 className="text-center mb-4">Words</h2>

    <div className="d-flex justify-content-center mb-3 flex-wrap gap-2 align-items-center">
      <button className="btn btn-light" onClick={() => handleSortChange("asc")}>Sort A-Z</button>
      <button className="btn btn-light" onClick={() => handleSortChange("desc")}>Sort Z-A</button>

      <select
        className="form-select w-auto"
        value={size}
        onChange={(e) => {
          setSize(Number(e.target.value));
          setPage(0);
        }}
      >
        <option value={5}>Show 5</option>
        <option value={10}>Show 10</option>
        <option value={20}>Show 20</option>
      </select>

      <span>Page {page + 1} of {totalPages}</span>
    </div>

    <div className="d-flex justify-content-center">
      <ul className="list-group w-50">
        {words.map((word) => (
          <li key={word.id} className="list-group-item">
            <a href={`/word/${word.id}`}>{word.name}</a>
          </li>
        ))}
      </ul>
    </div>

    <div className="d-flex justify-content-center mt-3 gap-2">
      <button className="btn btn-secondary" disabled={page <= 0} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button className="btn btn-secondary" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>

    <div className="mt-5 w-50 mx-auto">
      <h4 className="mb-3 text-center">Add a new word</h4>
      <input ref={nameRef} type="text" className="form-control mb-2" placeholder="Word name" />
      <input ref={descriptionRef} type="text" className="form-control mb-3" placeholder="Description" />
      <div className="text-center">
        <button className="btn btn-primary" onClick={addWord}>Add word</button>
      </div>
    </div>

    <ToastContainer />
  </div>
);
};

export default MainPage;
