import axios from 'axios';

export default async function fetchImages(page, perPage, setPage, setImages, setHasMore, setError) {
  const url = `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`;

  try {
    const response = await axios({
      url,
      method: 'get',
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    });

    setImages((images) => [...images, ...response.data]);
    setHasMore(response.data.length > 0);
    setPage((current) => current + 1);
  } catch (error) {
    setError(true);
  }
}
