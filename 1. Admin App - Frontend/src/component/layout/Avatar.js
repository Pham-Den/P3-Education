import styles from "./Avatar.module.scss";

const Avatar = ({ src = "/img/avatar-admin.jpg", className }) => {
  return <img className={styles.avatar + " " + className} src={src}></img>;
};

export default Avatar;
