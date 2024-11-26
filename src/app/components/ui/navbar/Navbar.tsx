'use client';
import { usePathname, useRouter } from 'next/navigation';
import { SearchInput, Text } from '@/app/components';
import { Search } from 'lucide-react';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isInGameDetail = pathname.includes('/game/');

  return (
    <header className="bg-transparent w-full fixed top-0 left-0 px-8 py-[40px] z-50">
      <div
        onClick={() => {
          if (isInGameDetail) {
            router.back();
          } else {
            router.push('/');
          }
        }}
        className="text-red-800 text-3xl font-bold cursor-pointer"
      >
        <Text type="title" weight="bold" className="mb-6">
          {isInGameDetail ? 'Back' : 'Gaming Haven Z'}
        </Text>
      </div>
      <SearchInput
        prefix={<Search size={24} />}
        options={['Opción 1', 'Opción 2', 'Opción 3']}
        hideLabel
      />
    </header>
  );
};
