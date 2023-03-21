import { Star, ArrowLeft, ArrowRight } from 'react-feather';
import styles from './Testemonial.module.css';

export default function Testimonial({ data }) {
  const { name, text, position, company, stars: starCount } = data;
  const quotedText = `"${text}"`;
  const stars = [];

  for (let index = 0; index < starCount; index++) {
    stars.push(
      <Star className={styles.star} key={index} size="16" color="#FFFFFF" fill="#FFFFFF" />,
    );
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
                  <ArrowLeft size="22" color="#FFF" />
                </div>

                <div className={styles.arrow}>
                  <ArrowRight size="22" color="#FFF" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
