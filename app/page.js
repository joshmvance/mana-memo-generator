'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    company: '',
    product: '',
    market: '',
    traction: '',
    team: '',
    round: ''
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePrompt = () => {
    return `You're an expert venture analyst. write one short paragraph describing the company

Use the inputs below:
- Company: ${form.company}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = generatePrompt();

    const res = await fetch("/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  }),
});

    const data = await res.json();
    setOutput(data.choices?.[0]?.message?.content || 'No response');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Investment Memo Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block font-semibold capitalize">{key}</label>
            <textarea
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={key === 'excitement' ? 4 : 2}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Generate Memo'}
        </button>
      </form>
      {output && (
        <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          <h2 className="text-xl font-bold mb-2">Generated Memo</h2>
          {output}
        </div>
      )}
    </div>
  );
}