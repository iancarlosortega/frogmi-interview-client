'use client';

import { useEffect, useRef, useState } from 'react';
import { ReloadIcon } from './icons/ReloadIcon';

interface Props {
	root?: HTMLElement;
	rootMargin?: string;
	fetchData: () => Promise<boolean>;
}

export const InfiniteScroll = ({
	root,
	rootMargin = '200px',
	fetchData,
}: Props) => {
	const observerRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isEndOfData, setIsEndOfData] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			) => {
				if (entries[0].isIntersecting && !isLoading && !isEndOfData) {
          setIsLoading(true);
					fetchData().then(hasMoreData => {
						setIsLoading(false);
						if (!hasMoreData) {
							setIsEndOfData(true);
							observer.unobserve(observerRef.current!);
						}
					});
				}
			},
			{
				root,
				rootMargin,
			}
		);
		if (observer && observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [isLoading, isEndOfData, fetchData, root, rootMargin]);

  const handleClick = () => {
    fetchData().then(hasMoreData => {
      if (!hasMoreData) {
        setIsEndOfData(true);
      }
    });
  };

	return <>
    {true && 
      <div className='w-full flex justify-center mb-12'>
        <button 
          className='border border-gray-300 bg-gray-100 rounded-md px-4 py-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out flex items-center gap-x-2' 
          onClick={handleClick}>
          Load more
          <ReloadIcon />
        </button>
      </div>
    }
    <div ref={observerRef} className='w-full'></div>
  </>;
};
