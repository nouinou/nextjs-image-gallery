import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ThumbsUp } from 'react-feather';
import Image from 'next/image';
import styles from './ImageContainer.module.css';

export default function ImageContainer({ image }) {
  const { urls, user, alt_description: alt, id } = image;
  const [liked, setLiked] = useState(false);
  const { data } = useSession();

  const getKey = () => `${data.user.username}Likes`;

  const getStoredLikes = () => localStorage.getItem(getKey());

  const saveLikes = (likes) => {
    localStorage.setItem(getKey(), JSON.stringify(likes));
  };
  const getLikeSet = (storedLikes) => new Set(JSON.parse(storedLikes));

  const handleLikeClick = (imageId) => {
    const storedLikes = getStoredLikes();

    if (storedLikes) {
      const likesSet = getLikeSet(storedLikes);

      if (liked) {
        likesSet.delete(imageId);
      } else {
        likesSet.add(imageId);
      }
      saveLikes(Array.from(likesSet));
    } else {
      saveLikes([imageId]);
    }

    setLiked(!liked);
  };

  useEffect(() => {
    if (data) {
      const storedLikes = getStoredLikes();

      if (!storedLikes) {
        saveLikes([]);
      } else {
        const likesSet = getLikeSet(storedLikes);
        if (likesSet.has(id)) {
          setLiked(true);
        }
      }
    }
  }, [id, data]);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={urls.small}
        width="235"
        height="160"
        alt={alt || `Photo by ${user.name}`}
      />
      <div className={styles.footer}>
        <span className={styles.firstname}>{user.first_name}</span>
        <ThumbsUp
          className={styles.like}
          size="16"
          color="black"
          fill={liked ? 'black' : 'transparent'}
          onClick={() => handleLikeClick(id)}
        />
      </div>
    </div>
  );
}
