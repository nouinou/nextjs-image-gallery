import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageContainer from '@/components/ImageContainer/ImageContainer';
import fetchImages from './fetchImages';
import styles from './ImageGallery.module.css';

const HIGHT_OF_IMAGE_CONTAINER = 180;
const WIDTH_OF_IMAGE_CONTAINER = 235;
const MAX_WIDTH_OF_MOBILE_CONTAINER = 425;
const MIN_IMAGE_FETCHING = 10;

export default function ImageGallery() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const shouldFetch = useRef(true);
  let perPage = 10;

  // calculate how many image it takes to fill the entire body
  const getImageCount = (bodyHeight, bodyWidth) =>
    (((bodyHeight / HIGHT_OF_IMAGE_CONTAINER) * bodyWidth) / WIDTH_OF_IMAGE_CONTAINER).toFixed(0);

  const getNumberOfInitialImages = () => {
    const body = document.querySelector('body');
    const bodyRect = body.getBoundingClientRect();

    // if first page on desktop, render images to fill the whole page. Render 10 otherwise
    perPage =
      bodyRect.width > MAX_WIDTH_OF_MOBILE_CONTAINER && page === 1
        ? getImageCount(bodyRect.height, bodyRect.width)
        : MIN_IMAGE_FETCHING;
  };

  useEffect(() => {
    // Finding out how many images shoud be rendered to fill the entire window
    getNumberOfInitialImages();

    // Avoid double calling the API caused by React.StrictMode in dev
    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchImages(page, perPage, setPage, setImages, setHasMore, setError);
    }
  }, [page]);

  return (
    <>
      {error && <p className="error-text">Something wrong happened.</p>}
      <InfiniteScroll
        className={styles.images}
        dataLength={images.length}
        next={() => fetchImages(page, perPage, setPage, setImages, setHasMore, setError)}
        hasMore={hasMore}
        loader={!error && <span className={styles.loading} />}
      >
        {images.map((image) => (
          <ImageContainer key={image.id + Math.random()} className={styles.image} image={image} />
        ))}
      </InfiniteScroll>
    </>
  );
}
