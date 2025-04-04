import { useEffect, useRef, useState } from "react";
import axios from "axios";

type Photo = {
  id: number;
  title: string;
  url: string;
};

const LIMIT = 20; // تعداد عکس در هر بار فچ

const LazyPhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchPhotos = async (pageNumber: number) => {
    const response = await axios.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${LIMIT}`
    );
    if (response.data.length === 0) {
      setHasMore(false);
    } else {
      setPhotos((prev) => [...prev, ...response.data]);
    }
  };

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} className=" flex items-center border w-[400px]"> 
          <img src='./vite.svg' alt={photo.title} className="w-[120px]" />
          <h4>{photo.title}</h4>
        </div>
      ))}
      
      {hasMore && <div ref={loaderRef}>در حال بارگذاری...</div>}
    </div>
  );
};

export default LazyPhotoGallery;