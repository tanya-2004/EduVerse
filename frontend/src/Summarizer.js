// /frontend/src/components/Summarizer.js
import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSummarize = async () => {
        if (!text) {
            setError('Please enter text to summarize');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/summarize', { text });
            setSummary(response.data.summary);
        } catch (err) {
            setError('Failed to get summary');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Text Summarizer</h2>
            <textarea
                value={text}
                onChange={handleTextChange}
                rows="6"
                cols="60"
                placeholder="Enter text to summarize..."
            />
            <br />
            <button onClick={handleSummarize} disabled={loading}>
                {loading ? 'Summarizing...' : 'Summarize'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && (
                <div>
                    <h3>Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default Summarizer;
