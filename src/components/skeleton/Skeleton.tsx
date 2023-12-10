import React from 'react';
import Skeleton from 'react-loading-skeleton';

export function SkeletonProduct() {
  return (
    <div className="p-5  shadow-md rounded-md relative bg-white ">
      <Skeleton height="190px" />
      <div className="pt-2 ">
        <Skeleton
          height={'20px'}
          count={2}
        />

        <div className="flex flex-row justify-between items-center">
          <div>
            <Skeleton
              width={'80px'}
              className="mt-2"
            />

            <Skeleton width={'70px'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategory() {
  return (
    <div className="p-5 text-center">
      <div className="flex">
        <Skeleton
          width={'100px'}
          height={'100px'}
        />
      </div>

      <div className="pt-2 h-[40px]">
        <Skeleton width={'50px'} />
      </div>
    </div>
  );
}

export function SkeletonOrder() {
  return (
    <>
      <tr className="text-center py-3">
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
      </tr>
    </>
  );
}
