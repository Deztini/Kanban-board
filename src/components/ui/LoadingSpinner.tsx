import type { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <div className="flex justify-center items-center h-[30vh]">
      <div className="h-12 w-12 border-4 border-solid border-[#af74d7] rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
