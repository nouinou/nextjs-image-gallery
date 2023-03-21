export default async function fetchImages(page, perPage, setPage, setImages, setHasMore, setError) {
  const fetchUrl = `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    });

    const data = await response.json();
    setImages((images) => [...images, ...data]);
    setHasMore(data.length > 0);
    setPage((current) => current + 1);
  } catch (error) {
    setError(true);
  }
}
