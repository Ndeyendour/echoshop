import React, { Fragment} from "react";
import { Link } from "react-router-dom"; // Importez le composant Link

function Footer(){
    return(
        <Fragment>
            <footer>
                <aside className="footerHolder overflow-hidden bg-lightGray pt-xl-23 pb-xl-8 pt-lg-10 pb-lg-8 pt-md-12 pb-md-8 pt-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-4 mb-lg-0 mb-4">
                                <h3 className="headingVI fwEbold text-uppercase mb-7">Contactez-nous</h3>
                                <ul className="list-unstyled footerContactList mb-3">
                                    <li className="mb-3 d-flex flex-nowrap pr-xl-20 pr-0"><span className="icon icon-place mr-3"></span> <address className="fwEbold m-0">Adresse : Rufisque, DAKAR, 012 Sedima.</address></li>
                                    <li className="mb-3 d-flex flex-nowrap"><span className="icon icon-phone mr-3"></span> <span className="leftAlign">Téléphone : <a href="#">(+221) 77 297 70 43</a></span></li>
                                    <li className="email d-flex flex-nowrap"><span className="icon icon-email mr-2"></span> <span className="leftAlign">Email :  <a href="#">mybotanical@gmail.com</a></span></li>
                                </ul>
                                <ul className="list-unstyled followSocailNetwork d-flex flex-nowrap">
                                    <li className="fwEbold mr-xl-11 mr-md-8 mr-3">Suivez-nous :</li>
                                    <li className="mr-xl-6 mr-md-5 mr-2"><a href="#" className="fab fa-facebook-f"></a></li>
                                    <li className="mr-xl-6 mr-md-5 mr-2"><a href="#" className="fab fa-twitter"></a></li>
                                    <li className="mr-xl-6 mr-md-5 mr-2"><a href="#" className="fab fa-pinterest"></a></li>
                                    <li className="mr-2"><a href="#" className="fab fa-google-plus-g"></a></li>
                                </ul>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 pl-xl-14 mb-lg-0 mb-4">
                                <h3 className="headingVI fwEbold text-uppercase mb-6">Informations</h3>
                                <ul className="list-unstyled footerNavList">
                                    <li className="mb-1"><a href="#">Nouveaux produits</a></li>
                                    <li className="mb-2"><a href="#">Meilleures ventes</a></li>
                                    <li className="mb-2"><a href="#">Notre blog</a></li>
                                    <li className="mb-2"><a href="#">À propos de notre boutique</a></li>
                                    <li><a href="#">Politique de confidentialité</a></li>
                                </ul>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 pl-xl-12 mb-lg-0 mb-4">
                                <h3 className="headingVI fwEbold text-uppercase mb-7">Mon compte</h3>
                                <ul className="list-unstyled footerNavList">
                                    <li className="mb-1"><a href="#">Mon compte</a></li>
                                    <li className="mb-2"><a href="#">Réductions</a></li>
                                    <li className="mb-2"><a href="#">Historique des commandes</a></li>
                                    <li><a href="#">Informations personnelles</a></li>
                                </ul>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-2 pl-xl-18 mb-lg-0 mb-4">
                                <h3 className="headingVI fwEbold text-uppercase mb-5">PRODUITS</h3>
                                <ul className="list-unstyled footerNavList">
                                    <li className="mb-2"><a href="#">Livraison</a></li>
                                    <li className="mb-2"><a href="#">Mentions légales</a></li>
                                    <li className="mb-2"><a href="#">Baisse des prix</a></li>
                                    <li className="mb-2"><a href="#">Nouveaux produits</a></li>
                                    <li><a href="#">Meilleures ventes</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                <div id="footer" className="overflow-hidden bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 copyRightHolder v-II text-center pt-md-3 pb-md-4 py-2">
                                <p className="mb-0"> <a href="#">@copyright- botanic </a> -2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer;
