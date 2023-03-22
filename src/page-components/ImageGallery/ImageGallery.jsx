import { useState, useEffect, useRef, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageContainer from '@/components/ImageContainer/ImageContainer';
import fetchImages from './fetchImages';
import styles from './ImageGallery.module.css';

const GRID_GAP = 20;
const HIGHT_OF_IMAGE_CONTAINER = 180 + GRID_GAP;
const WIDTH_OF_IMAGE_CONTAINER = 235 + GRID_GAP;
const MAX_WIDTH_OF_MOBILE_BODY = 425;
const MIN_PER_PAGE = 10;

export default function ImageGallery() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const shouldFetch = useRef(true);
  const perPage = useRef(MIN_PER_PAGE);

  // calculate how many image it takes to fill the entire body
  const getImageCount = (bodyHeight, bodyWidth) =>
    (((bodyHeight / HIGHT_OF_IMAGE_CONTAINER) * bodyWidth) / WIDTH_OF_IMAGE_CONTAINER).toFixed(0);

  const getNumberOfInitialImages = useCallback(() => {
    const body = document.querySelector('body');
    const bodyRect = body.getBoundingClientRect();
    const bodyHeight = bodyRect.height;
    const bodyWidth = bodyRect.width;
    const container = document.querySelector('.container');
    const containerWidth = container.getBoundingClientRect().width;

    // if Mobile, render 10 images per page. Render enough images to fill the whole page otherwise.
    perPage.current =
      bodyWidth > MAX_WIDTH_OF_MOBILE_BODY
        ? getImageCount(bodyHeight, containerWidth)
        : MIN_PER_PAGE;
  }, []);

  useEffect(() => {
    // Finding out how many images shoud be rendered to fill the entire window
    getNumberOfInitialImages();

    // Avoid double calling the API caused by React.StrictMode in dev
    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchImages(page, perPage.current, setPage, setImages, setHasMore, setError);
    }
  }, [getNumberOfInitialImages, page]);

  return (
    <>
      {error && <p className="error-text">Something wrong happened.</p>}
      <InfiniteScroll
        className={styles.images}
        dataLength={images.length}
        next={() => fetchImages(page, perPage.current, setPage, setImages, setHasMore, setError)}
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
