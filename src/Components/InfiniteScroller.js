import React, { useState, useRef, useCallback, lazy, useEffect } from "react";
import useCustomHook from "../hooks/useCustomHook";
const Post = lazy(() => import("./Post"));
const InfiniteScroller = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const limit =
    (window.innerHeight < 175 || window.innerWidth) < 175
      ? 2
      : Math.ceil(window.innerHeight / 175);
  const [scrollerMovement, setScrolling] = useState(false);
  const { isLoading, isError, error, results, hasNextPage } = useCustomHook(
    pageNumber,
    limit,
    scrollerMovement
  );
  useEffect(() => {
    if (pageNumber > 1 && scrollerMovement) {
      window.scroll({
        top: window.innerHeight / 3,
        left: 0,
        behavior: "instant",
      });
    }
  }, [scrollerMovement, pageNumber]);

  const ScrollDownObserver = useRef(null);
  const ScrollUpObserver = useRef(null);
  const ScrollUpObserverRef = useRef(null);
  useEffect(() => {
    //    if (isLoading) return;
    //   if(pageNumber===1)
    //   return;
    if (ScrollUpObserver.current) ScrollUpObserver.current.disconnect();
    ScrollUpObserver.current = new IntersectionObserver(
      (posts) => {
        if (posts[0].isIntersecting) {
          setScrolling(true);
          setPageNumber((prev) => prev - 1);
        }
      },
      { rootMargin: "50px 0px 0px 0px" }
    );
    if (ScrollUpObserverRef.current)
      ScrollUpObserver.current.unobserve(ScrollUpObserverRef.current);
    if (ScrollUpObserverRef.current) {
      ScrollUpObserver.current.observe(ScrollUpObserverRef.current);
    }
  }, []);

  const ScrollDownPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      //   if (ScrollDownObserver.current) ScrollDownObserver.current.disconnect();
      ScrollDownObserver.current = new IntersectionObserver(
        (posts) => {
          if (posts[0].isIntersecting && hasNextPage) {
            setScrolling(false);
            setPageNumber((prev) => prev + 1);
          }
        },
        { threshold: 0.1 }
      );
      if (post) {
        ScrollDownObserver.current.observe(post);
      }
    },
    [isLoading]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={ScrollDownPostRef} key={post.id} post={post} />;
    } else {
      return <Post key={post.id} post={post} />;
    }
  });

  return (
    <div className="container-fluid bg-info" style={{ overflowX: "hidden" }}>
      <div ref={ScrollUpObserverRef}></div>
      {content}
      {isLoading && (
        <div className="text-center">
          <img
            className="img-fluid height:auto text-center"
            src="../loading1.gif"
            alt="it is not present"
          />
        </div>
      )}
    </div>
  );
};
export default InfiniteScroller;
