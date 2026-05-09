import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalShellProps {
  children: ReactNode;
  maxWidth?: string;
  onClose: () => void;
}

export function ModalShell({
  children,
  maxWidth = 'max-w-4xl',
  onClose
}: ModalShellProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full relative max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
