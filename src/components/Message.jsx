import styles from "./Message.module.css";

function Message({ message, color }) {
  return (
    <p className={`${styles.message} ${color === "error" ? styles.error : ""}`}>
      <span role="img" aria-label="wave">👋</span> {message}
    </p>
  );
}

export default Message;
