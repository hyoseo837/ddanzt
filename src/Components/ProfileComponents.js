import styles from "../css/profileComponents.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faInstagramSquare,
    faGithubSquare,
    faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";

const ProfileComponents = () => {
    return (
        <footer className={styles["myFooter"]}>
            <div>
                <p className={styles["footerTitle"]}>More Games</p>
                <span style={{ fontSize: "13px" }}>not ready!</span>
                <ul></ul>
            </div>
            <div>
                <p className={styles["footerTitle"]}>About me</p>
                <ul className={styles["aboutMeRow"]}>
                    <li className={styles["aboutMeItems"]}>Profile</li>
                    <li className={styles["aboutMeItems"]}>Projects</li>
                    <li className={styles["aboutMeItems"]}>Blog</li>
                </ul>
            </div>
            <div>
                <p className={styles["footerTitle"]}>Contact me</p>
                <ul className={styles["iconsRow"]}>
                    <a
                        className={styles["socialIcon"]}
                        href="https://www.linkedin.com/in/hyoseo-lee-564b95246/"
                    >
                        <FontAwesomeIcon size="xl" icon={faLinkedin} />
                    </a>
                    <a
                        className={styles["socialIcon"]}
                        href="https://www.instagram.com/hyoseo837/"
                    >
                        <FontAwesomeIcon size="xl" icon={faInstagramSquare} />
                    </a>
                    <a
                        className={styles["socialIcon"]}
                        href="https://github.com/hyoseo837"
                    >
                        <FontAwesomeIcon size="xl" icon={faGithubSquare} />
                    </a>
                    <a
                        className={styles["socialIcon"]}
                        href="https://www.facebook.com/profile.php?id=100022962826682"
                    >
                        <FontAwesomeIcon size="xl" icon={faFacebookSquare} />
                    </a>
                </ul>
            </div>
        </footer>
    );
};

export default ProfileComponents;
