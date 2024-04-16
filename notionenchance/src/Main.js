
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {



    const onEditField = (field, value) => {
      onUpdateNote({
        ...activeNote,
        [field]: value,
        lastModified: Date.now(),
      });
    };
  
    const applyStyle = (style) => {
      const textarea = document.getElementById('body');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = activeNote.body;
      let beforeText = text.substring(0, start);
      let afterText = text.substring(end);
      let selectedText = text.substring(start, end);
  
      switch (style) {
        case 'bold':
          selectedText = `**${selectedText}**`;
          break;
        case 'italic':
          selectedText = `*${selectedText}*`;
          break;
        case 'strong':
          selectedText = `__${selectedText}__`;
          break;
        case 'bulletList':
          selectedText = `- ${selectedText}`;
          break;
        case 'H1':
          selectedText = `# ${selectedText}`;
          break;
        case 'H2':
          selectedText = `## ${selectedText}`;
          break;
        case 'H3':
          selectedText = `### ${selectedText}`;
          break;
        case 'H4':
          selectedText = `#### ${selectedText}`;
          break;
        case 'H5':
          selectedText = `##### ${selectedText}`;
          break;
        case 'H6':
          selectedText = `###### ${selectedText}`;
          break;
        default:
          break;
      }
  
      // Update the note body with the styled text
      onUpdateNote({
        ...activeNote,
        body: beforeText + selectedText + afterText,
        lastModified: Date.now(),
      });
      // Move cursor position appropriately
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + selectedText.length;
    };
  
    if (!activeNote) return <div className="no-active-note">No Active Note</div>;
  
    return (
      <div className="app-main">
            
        <div className="app-main-note-edit">
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
          />
          <div>
            {/* Heading Buttons */}
            {[...Array(6)].map((_, index) => (
              <button key={index} onClick={() => applyStyle(`H${index + 1}`)}>{`H${index + 1}`}</button>
            ))}
            <button onClick={() => applyStyle('bold')}>Bold</button>
            <button onClick={() => applyStyle('italic')}>Italic</button>
            <button onClick={() => applyStyle('strong')}>Strong</button>
            <button onClick={() => applyStyle('bulletList')}>List</button>
          </div>
          <textarea
            id="body"
            placeholder="Write ..
Select text to change text styles and headers...
                "
            value={activeNote.body}
            onChange={(e) => onEditField("body", e.target.value)}
          />
        </div>
        <div className="app-main-note-preview">
          <h1 className="preview-title">{activeNote.title}</h1>
          <ReactMarkdown className="markdown-preview">
            {activeNote.body}
          </ReactMarkdown>
        </div>
      </div>
    );
  };
  
  export default Main;
  