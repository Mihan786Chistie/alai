import { useState } from "react";

interface SidebarProps {
  onSubmit: (sentences: string) => void;
  loading: boolean;
}

export default function Sidebar({ onSubmit, loading }: SidebarProps) {
  const [sentences, setSentences] = useState("");

  const handleSubmit = () => {
    onSubmit(sentences);
  };

  return (
    <div className="sidebar">
        <h3 style={{paddingTop: "40px"}}>Raw Content</h3>
      <textarea
        onChange={(e) => setSentences(e.target.value)}
        className="input-area"
        placeholder="Add your raw content here"
        value={sentences}
      />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "GET NEW OPTIONS"}
      </button>
    </div>
  );
}
