import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <section className="container top">
                <div className="about">
                    <h4>Информация</h4>
                    <ul>
                        <a href="/about-us">
                            <li><i className="fa fas fa-info-circle"></i>За нас</li>
                        </a>
                        <a href="/contact-us">
                            <li><i className="fa fas fa-question-circle"></i>Помощ</li>
                        </a>
                    </ul>
                </div>

                <div className="social">
                    <h4>Последвайте ни</h4>
                    <ul>
                        <a href="https://www.instagram.com/" className="instagram">
                            <li><i className="fa fab fa-instagram instagram"></i>Instagram</li>
                        </a>
                        <a href="https://twitter.com/" className="twitter">
                            <li><i className="fa fab fa-twitter twitter"></i>Twitter</li>
                        </a>
                        <a href="https://facebook.com" className="facebook">
                            <li><i className="fa fab fa-facebook-square facebook"></i>Facebook</li>
                        </a>
                    </ul>
                </div>

                <div className="contact">
                    <h4>Връзка с нас</h4>
                    <ul>
                        <li><i className="fa fas fa-envelope"></i>Емейл: petfind@me.bg</li>
                        <li><i className="fa fa-solid fa-phone"></i>Телефон: 0888888888</li>
                        <li><i className="fa fas fa-map-marker-alt"></i>Адрес: София бул. Академик 57</li>
                    </ul>
                </div>
            </section>

            <section className="bottom">
                <p>&#169; AutoSoft All Rights Reserved {new Date().getFullYear()}</p>
            </section>
        </footer>
    );
};