import type { FC } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle: string;
  width: string;
  height: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  width,
  height,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center py-8">
        <div
          className={`bg-[#121212] ${width} ${height} border-[#3E3A45] border-2 border-solid shadow-2xl rounded-2xl px-4 py-6 relative flex flex-col  `}
        >
          <h2 className="text-white text-center text-2xl mt-5 mb-2">{title}</h2>
          <h1 className="text-center text-[#ccc] text-xs mb-4">{subtitle}</h1>
          <div className="overflow-y-auto px-8 flex-1">{children}</div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-[#af74d7] cursor-pointer"
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
