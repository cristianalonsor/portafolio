import { useEffect, useRef, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, show, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const onCloseRef = useRef(onClose);
  const durationRef = useRef(duration);

  useEffect(() => {
    onCloseRef.current = onClose;
    durationRef.current = duration;
  });

  useEffect(() => {
    if (!show) return;

    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onCloseRef.current(), 300);
    }, durationRef.current);
    return () => {
      clearTimeout(timer);
      setVisible(false);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-dark border border-teal/30 rounded-lg px-6 py-3 shadow-lg shadow-teal/10 flex items-center gap-3">
        <span className="text-teal font-grotesk text-xl">~</span>
        <span className="text-white font-grotesk font-semibold">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onCloseRef.current(), 300);
          }}
          className="text-muted hover:text-white transition-colors ml-2 text-sm leading-none cursor-pointer"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
