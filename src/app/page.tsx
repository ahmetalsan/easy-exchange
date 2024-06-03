import Image from 'next/image'

import Button from '@/component/button/Button'
import Card from '@/component/card/Card'
import ConvertFund from '@/component/convert-fund/ConvertFund'

import styles from './page.module.scss'

const HomePage = () => (
  <main className={styles.main}>
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/assets/images/logo.svg"
          alt="Easy Exchange Logo"
          width={260}
          height={35}
          priority
          className={styles.logo}
        />
        <Button type="button" disabled>
          Login
        </Button>
      </header>
      <div className={styles.hero}>
        <div className={styles.textSection}>
          <div className={styles.title}>Exchange your money</div>
          <div className={styles.subTitle}>Easily, Quickly And</div>
          <div className={styles.subTitle}>Securely</div>
          <div className={styles.description}>
            Best source for currency conversion, sending money
            <br />
            online and tracking exchange rates. Live tracking and
            <br /> notifications + flexible delivery and payment options.
          </div>
          <Button color="secondary" variant="outlined" size="large" disabled>
            Exchange Fund
          </Button>
        </div>
        <div className={styles.imageSection}>
          <Image
            src="/assets/images/hero.svg"
            alt="Easy Exchange Logo"
            width={292}
            height={367}
            priority
            className={styles.image}
          />
        </div>
      </div>
    </div>
    <div className={styles.features}>
      <Card
        image="/assets/images/feature-1.svg"
        title="SECURE"
        description="Send money online fast, secure and easy. Live tracking and notifications + flexible delivery and payment options."
      />
      <Card
        image="/assets/images/feature-2.svg"
        title="EASY ACCESSIBLE"
        description="Create a chart for any currency pair in the world to see their currency history. These currency charts use live mid-market rates, are easy to use, and are very reliable."
      />
      <Card
        image="/assets/images/feature-3.svg"
        title="FAST AND RELIABLE"
        description="Need to know when a currency hits a specific rate? The Xe Rate Alerts will let you know when the rate you need is triggered on your selected currency pairs."
      />
    </div>
    <ConvertFund />
  </main>
)

export default HomePage
