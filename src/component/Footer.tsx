import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <hr className={styles.hrline} />
      <div className={styles.links}>
        <table>
          <tbody>
            <tr>
              <td>FOLLOW US</td>
              <td>INFO</td>
              <td>YOU DISCOVER</td>
            </tr>
            <tr>
              <td>
                <Link href="https://example.com/page4">Facebook</Link>
              </td>
              <td>
                <Link href="https://example.com/page5">Who we are</Link>
              </td>
              <td>
                <Link href="https://example.com/page6">Create a blog</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://example.com/page7">Instagram</Link>
              </td>
              <td>
                <Link href="https://example.com/page8">Log in</Link>
              </td>
              <td>
                <Link href="https://example.com/page9">Latest Recipes</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://example.com/page10">TikTok</Link>
              </td>
              <td>
                <Link href="https://example.com/page11">Sign in</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://example.com/page13">YouTube</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default Footer;
