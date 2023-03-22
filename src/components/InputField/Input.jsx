import styles from './Input.module.css';

export default function Input({ name, type, placeholder, required, register }) {
  return (
    <label htmlFor={name} className={styles.label}>
      <span className="capitalized">{name}</span>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
        {...register(name)}
      />
    </label>
  );
}
