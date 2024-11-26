'use client';

import clsx from 'clsx';

interface TabItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <li
      className={clsx(
        'flex items-center justify-center h-full cursor-pointer text-lg font-semibold',
        isActive
          ? 'bg-[#ECECF4] border-b-4 border-[#22223C] text-[#22223C]'
          : 'bg-transparent border-b-4 border-transparent text-[#22223C]',
        'transition-colors duration-300',
      )}
      onClick={onClick}
      style={{ width: '100%', height: '64px' }} // Hace que ocupe el ancho completo
    >
      {label}
    </li>
  );
};
