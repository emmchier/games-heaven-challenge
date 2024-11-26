'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { TabItem } from './TabItem';

interface TabProps {
  tabList: { label: string }[];
  fullWidth?: boolean;
  onTabChange?: (index: number) => void;
}

export const Tab: React.FC<TabProps> = ({
  tabList,
  fullWidth = false,
  onTabChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <ul
      className={clsx(
        'flex',
        fullWidth ? 'justify-between w-full' : 'space-x-0',
        'items-stretch',
      )}
      style={{ height: '64px' }}
    >
      {tabList.map((tab, index) => (
        <TabItem
          key={tab.label}
          label={tab.label}
          isActive={activeIndex === index}
          onClick={() => handleTabChange(index)}
        />
      ))}
    </ul>
  );
};
