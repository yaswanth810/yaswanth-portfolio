import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success'
    ? 'border-accent-teal/50 bg-accent-teal/10'
    : 'border-red-400/50 bg-red-400/10';

  const textColor = type === 'success' ? 'text-accent-teal' : 'text-red-400';

  return (
    <div
      className={`fixed bottom-8 right-8 z-[9998] max-w-sm px-5 py-3 rounded-xl border backdrop-blur-md
                  font-mono text-sm transition-all duration-300
                  ${bg} ${textColor}
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {message}
    </div>
  );
};

export default Toast;
