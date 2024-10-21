import dotsImage from '../assets/little_dots.svg';
import logoFooter from '../assets/logo-footer.svg';
import '../styles/footer.css'; // Змінено шлях

const Footer = () => {
    return (
        <footer className="footer">
            <img className="dots_footer" src={dotsImage} alt="dots" />
            <img src={logoFooter} alt="logo" />
            <nav>
                <a href="https://www.trafalgar.com/en-eu">Company</a>
                <a href="https://www.google.com/maps">Region</a>
                <a href="https://t.me/Stanislav_Kovalchuk">Help</a>
            </nav>
        </footer>
    );
};

export default Footer;
