import React, { Fragment, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";



function Contact(){
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  // Fonction de validation
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{10}$/;

    // Validation du nom
    if (formData.name.trim().length < 3) {
      newErrors.name = "Le nom doit comporter au moins 3 caractères.";
    }

    // Validation de l'email
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
    }

    // Validation du téléphone
    if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = "Le numéro de téléphone doit contenir 10 chiffres.";
    }

    // Validation du message
    if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit comporter au moins 10 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion du changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Votre message a été envoyé avec succès !");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Réinitialiser le formulaire
      setErrors({});
    }
  };
    return(
        <Fragment>
             <div id="pageWrapper">
                <Header />

                <main>
      {/* Intro Banner Holder */}
      <section
        className="introBannerHolder d-flex w-100 bgCover"
        style={{ backgroundImage: 'url("images/b-bg7.jpg")'}}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
              <h1 className="headingIV fwEbold playfair mb-4">Contact</h1>
              <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                <li className="mr-2">
                  <a href="/">Home</a>
                </li>
                <li className="mr-2">/</li>
                <li className="active">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="contactSec container pt-xl-24 pb-xl-23 py-lg-20 pt-md-16 pb-md-10 pt-10 pb-0">
        <div className="row">
          <div className="col-12">
            <ul className="list-unstyled contactListHolder mb-0 d-flex flex-wrap text-center">
              <li className="mb-lg-0 mb-6">
                <span className="icon d-block mx-auto bg-lightGray py-4 mb-4">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <strong className="title text-uppercase playfair mb-5 d-block">Adresse</strong>
                <address className="mb-0">
                  Rufisque - Dakar
                  <span className="d-block"> Senegal </span>
                </address>
              </li>
              <li className="mb-lg-0 mb-6">
                <span className="icon d-block mx-auto bg-lightGray py-4 mb-3">
                  <i className="fas fa-headphones"></i>
                </span>
                <strong className="title text-uppercase playfair mb-5 d-block">Telephone</strong>
                <a href="tel:84123456789" className="d-block">
                  (+221) - 77 - 297 - 70 - 43
                </a>
                <a href="tel:84321654987" className="d-block">
                  (+221) - 75 - 641 - 03 - 61
                </a>
              </li>
              <li className="mb-lg-0 mb-6">
                <span className="icon d-block mx-auto bg-lightGray py-5 mb-3">
                  <i className="fas fa-envelope"></i>
                </span>
                <strong className="title text-uppercase playfair mb-5 d-block">Email</strong>
                <a href="mailto:Two-support@Two.lnk" className="d-block">Two-support@Two.lnk</a>
                <a href="mailto:info@Two.lnk" className="d-block">info@Two.lnk</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      {/* Map Holder */}
      
     
    <br/>
    <br/>
    <section className="contactSecBlock container py-10">
      <div className="row">
        <header className="col-12 mainHeader mb-10 text-center">
          <h1 className="headingIV playfair fwEblod mb-7">Contactez-Nous</h1>
          <p>
            Si vous avez des questions ou des commentaires, n'hésitez pas à nous
            contacter. Remplissez le formulaire ci-dessous et nous vous répondrons
            dans les plus brefs délais.
          </p>
        </header>
      </div>

      <div className="row">
        <div className="col-12">
          <form className="contactForm" onSubmit={handleSubmit} noValidate>
            <div className="d-flex flex-wrap row1 mb-md-1">
              {/* Champ Nom */}
              <div className="form-group coll mb-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Votre nom *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Champ Email */}
              <div className="form-group coll mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Votre email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Champ Téléphone */}
              <div className="form-group coll mb-5">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Numéro de téléphone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>

            {/* Champ Message */}
            <div className="form-group w-100 mb-6">
              <textarea
                id="message"
                name="message"
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                placeholder="Votre message *"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
            </div>

            {/* Bouton Envoyer */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btnTheme btnShop md-round fwEbold text-white py-3 px-4 py-md-3 px-md-4"
              >
                Envoyer le Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
      
    </main>
    </div>
    <Footer />
        </Fragment>
    )
}

export default Contact;