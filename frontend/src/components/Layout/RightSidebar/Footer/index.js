import styles from "./index.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.list}>
        {footerData.map((footerItemData, idx) => (
          <>
            <FooterItem {...footerItemData} />
            {idx + 1 !== footerData?.length && <p>&bull;</p>}
          </>
        ))}
      </nav>
    </div>
  );
};

const FooterItem = ({ text, href }) => (
  <Link passHref href={href}>
    <a>{text}</a>
  </Link>
);

const footerData = [
  { text: "About", href: "https://github.com/Just-Moh-it/SocioMat" },
  { text: "Help", href: "https://github.com/Just-Moh-it/SocioMat" },
  { text: "Terms", href: "https://github.com/Just-Moh-it/SocioMat" },
  { text: "Popular", href: "https://github.com/Just-Moh-it/SocioMat" },
  { text: "Language", href: "https://github.com/Just-Moh-it/SocioMat" },
];

export default Footer;
