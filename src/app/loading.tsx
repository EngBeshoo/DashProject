'use client';

import { CirclesWithBar } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#01245E"
        innerCircleColor="#01245E"
        barColor="#01245E"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}