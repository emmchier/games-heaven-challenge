'use client';
import { usePathname, useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isInGameDetail = pathname.includes('/game/');

  return (
    <nav className="bg-transparent h-[144px] w-full fixed top-0 left-0 flex items-center justify-between px-8 z-50">
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
        {isInGameDetail ? 'Back' : 'Gaming Haven Z'}
      </div>
    </nav>
  );
};
