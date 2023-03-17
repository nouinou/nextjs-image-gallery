import { UisStar } from '@iconscout/react-unicons-solid';
import { UilArrowRight, UilArrowLeft } from '@iconscout/react-unicons';
import styles from './Testemonial.module.css';

export default function Testimonial({ data }) {
  const { name, text, position, company, stars: starCount } = data;
  const quotedText = `"${text}"`;
  const stars = [];

  for (let index = 0; index < starCount; index++) {
    stars.push(<UisStar className={styles.star} key={index} size="16" color="#FFF" />);
  }

  return (
    <>
      <div className={styles.glass} />

      <div className={styles.container}>
        <div className={styles.background} />

        <div className={styles.content}>
          <span className={styles.text}>{quotedText}</span>
          <div className={styles.info}>
            <div className={styles.author}>
              <h2 className={styles.name}>{name}</h2>
              <strong>{position}</strong>
              <span>{company}</span>
            </div>

            <div className={styles.right}>
              <div className={styles.stars}>{stars}</div>

              <div className={styles.navigation}>
                <div className={styles.arrow}>
                  <UilArrowLeft size="26" color="#FFF" />
                </div>

                <div className={styles.arrow}>
                  <UilArrowRight size="26" color="#FFF" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
