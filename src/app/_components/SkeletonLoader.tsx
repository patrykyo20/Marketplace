import React from 'react';
import { Skeleton } from "../_types/Loader";

function SkeletonLoader({ height, width }: Skeleton) {
  return (
    <div
      style={{ height: `${height}px`, width: `${width}px` }}
      className={`bg-slate-200 animate-pulse`}
    >

    </div>
  );
}

export default SkeletonLoader;
