import styles from './topnav.module.css';

const TopNav: React.FC = ():JSX.Element => {

    return (
        <div className={styles.container}>
            <div className={styles.topnav}>
                <div className={styles.heading}><p>Free shipping, 30-day return or refund guarantee. </p></div>
                <div className={styles.innerPortion}>
                    <p>SIGN IN</p>
                    <p>FAQS</p>
                </div>

            </div>
        </div>
    )
}
export default TopNav;