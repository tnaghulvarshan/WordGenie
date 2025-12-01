import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.id || parsedUser._id;

        const res = await axios.get(`${process.env.REACT_APP_Backend_API}/request/history/${userId}`);
        setDrafts(res.data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // 👇 NEW DELETE FUNCTION
  const handleDelete = async (id) => {
    // 1. Ask for confirmation
    if (!window.confirm("Are you sure you want to delete this draft?")) return;

    try {
      // 2. Call Backend API
      await axios.delete(`${process.env.REACT_APP_Backend_API}/request/history/${id}`);

      // 3. Update UI immediately (Remove item from list without reloading)
      setDrafts(drafts.filter((item) => item._id !== id));
      
    } catch (error) {
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className='container  my-5 py-4'>
      <div className='w-75 mx-auto'>
        <h1 className="mb-4 text-center">My Drafts</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : drafts.length === 0 ? (
          <p className="text-center text-muted">No drafts found.</p>
        ) : (
          <div className='row g-3'>
            {drafts.map((item) => (
              <div key={item._id} className='col-md-4'>
                <div className='card h-100 p-3 shadow-sm'>
                  
                  <div className='d-flex justify-content-between mb-2'>
                    <span className='badge bg-primary'>{item.topic}</span>
                    <span className='badge bg-secondary'>{item.tone}</span>
                  </div>

                  <h5 className="fw-bold text-truncate">Subject: {item.subject}</h5>

                  <div className='mb-3 text-secondary small border rounded p-2 bg-light' style={{ height: '100px', overflowY: 'auto' }}>
                    {item.AIResponse}
                  </div>

                  <div className='d-flex justify-content-between align-items-center mt-auto'>
                    <small className="text-muted">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </small>
                    
                    <div>
                        {/* 👇 DELETE BUTTON */}
                        <button 
                            className='btn btn-outline-danger btn-sm me-2'
                            onClick={() => handleDelete(item._id)}
                        >
                            <i className="bi bi-trash"></i> Delete
                        </button>

                        <button 
                            className='btn btn-outline-primary btn-sm'
                            onClick={() => handleCopy(item.AIResponse)}
                        >
                            Copy
                        </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Drafts;