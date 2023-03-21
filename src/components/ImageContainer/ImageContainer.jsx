import Image from 'next/image';
import styles from './ImageContainer.module.css';

export default function ImageContainer({ image }) {
  const { urls, user, alt_description: alt } = image;

  return (
    <div>
      <Image
        className={styles.image}
        src={urls.small}
        width="235"
        height="160"
        alt={alt || `Photo by ${user.name}`}
      />
      <span className={styles.firstname}>{user.first_name}</span>
    </div>
  );
}
