import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <button
      onClick={handleBack}
      className="group flex items-center gap-2 transition-all duration-200"
      style={{
        position: 'fixed',
        top: '52px',
        left: '24px',
        zIndex: 60,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '8px 14px',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(217,31,38,0.12)';
        e.currentTarget.style.borderColor = 'rgba(217,31,38,0.35)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
      aria-label="Go back"
    >
      <ArrowLeft
        size={14}
        className="text-soft-grey group-hover:text-primary-red transition-colors duration-200 group-hover:-translate-x-0.5 transition-transform"
      />
      <span className="text-soft-grey group-hover:text-text-white transition-colors duration-200 text-xs font-medium uppercase tracking-widest">
        Back
      </span>
    </button>
  );
}
