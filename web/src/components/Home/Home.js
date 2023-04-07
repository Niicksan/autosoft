import './Home.scss';
import home from "./images/home.svg";

import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <section id="header" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="text-holder">
                        <h1>
                            Развийте бизнеса си с
                            <strong className="brand-name"> AutoSoft</strong>
                        </h1>
                        <h2>
                            Регистрирай се напълно безплатно
                        </h2>
                        <div>
                            <Link to="/auth/register" className="btn-get-started ">
                                Започни сега
                            </Link>
                        </div>
                    </div>

                    <div className="header-image">
                        <img src={home} className="img-fluid animated" alt="Home Img" />
                    </div>
                </div>
            </div>
        </section>
    );
};