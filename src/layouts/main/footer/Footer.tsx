import useResponsive from 'src/hooks/useResponsive';
import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Footer() {
  const IsMup = useResponsive('up', 'sm');

  return (
    <div className="w-full bg-blue-300">
      <div className=" sticky px-[1/3] min-h-20 py-4 top-0 z-[20] flex w-full items-center justify-between border-gray-500">
        <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
          {IsMup ? <Desktop /> : <Mobile />}
        </div>
      </div>
    </div>
  );
}
