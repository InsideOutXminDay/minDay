import '../../styles/Auth/Modal.css';
export default function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;
  return (
    <article className="modal-view" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-text">{content}</span>
        <button className="modal-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </article>
  );
}
