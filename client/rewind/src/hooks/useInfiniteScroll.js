import React from "react";

function useInfiniteScroll({ onLoadMore, isLoading, hasMore }) {
    const boundaryRef = React.useRef();
    const onLoadMoreRef = React.useRef();
    onLoadMoreRef.current = onLoadMore;

    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((element) => {
                    if (element.isIntersecting) {
                        onLoadMoreRef.current();
                    }
                });
            },
            { rootMargin: "100px" }
        );
        if (boundaryRef.current && !isLoading && hasMore) {
            intersectionObserver.observe(boundaryRef.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [isLoading, hasMore]);

    return boundaryRef;
}

export { useInfiniteScroll };
