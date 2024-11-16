import React, { Fragment,useEffect, useState, useContext} from "react";
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../components/Header";
import { Link } from "react-router-dom"; 
import Footer from "../components/Footer";
import axios from 'axios';
import { CartContext } from '../pages/CartContext';
import { FavoritesContext } from '../pages/FavoritesContext';
import Modal from "react-modal";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



 

function Home(){
	const [products, setProducts] = useState([]);
	const { addToCart } = useContext(CartContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [error, setError] = useState('');
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const { addFavorite, removeFavorite, favoriteCount } = useContext(FavoritesContext);
	const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
  
	const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné pour afficher les détails
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);
  
	const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/product"); // Redirige vers la page produit
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Vérifier l'environnement et choisir l'URL correcte
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/products' 
          : 'https://my-botanical-store-backend.vercel.app/products';

        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);  // Le tableau vide [] permet d'exécuter cet effet une seule fois au montage du composant.

  
	const filteredProducts = products.filter(product =>
	  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
	  (selectedCategory === "" || product.category === selectedCategory) &&
	  product.price >= minPrice && product.price <= maxPrice
	);
  
	const handleCategoryClick = (category) => {
	  setSelectedCategory(category);
	};
  
	const openProductModal = (product) => {
	  setSelectedProduct(product);
	  setIsModalOpen(true);
	};
  
	const closeProductModal = () => {
	  setSelectedProduct(null);
	  setIsModalOpen(false);
	};
  
	// Function to increase quantity
	const increaseQuantity = () => {
	  setQuantity((prevQuantity) => prevQuantity + 1);
	};
  
	// Function to decrease quantity, ensuring it doesn’t go below 1
	const decreaseQuantity = () => {
	  setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
	};
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
	  };

    return(
        <Fragment>
           <div id="pageWrapper">
	
		<Header />
		<main>
		<section className="bannerBlockHolder position-relative">
			<Slider {...settings}>
				<div>
				<div
					className="align w-100 d-flex align-items-center bgCover"
					style={{
						backgroundImage: 'url("images/b-bg4.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						minHeight: '100vh', // Assure une hauteur minimum de 100% de la hauteur de l'écran
					}}
					>
					

					<div className="container position-relative holder pt-xl-10">
					<div className="row">
						<div className="col-12 col-xl-7">
						<div className="txtwrap pr-xl-10">
							<span className="title d-block text-uppercase fwEbold position-relative pl-2 mb-md-5 mb-sm-3">Bienvenue à Botanical</span>
							<h1 className="fwEbold position-relative mb-md-7 mb-sm-4">Plantes d'intérieur <span className="text-break d-block">Le choix parfait.</span></h1>
							<p className="mb-md-15 mb-sm-10">
							Découvrez notre sélection de plantes d'intérieur soigneusement choisies pour apporter beauté et bien-être à votre espace. Chaque plante est une touche de verdure qui transforme votre maison en un véritable havre de paix.
							</p>						
							<Link
							to="/product"
							className="btn btnTheme btnShop fwEbold py-3 px-4"
							style={{
								backgroundColor: '#28a745',
								color: 'white',
								textDecoration: 'none',
								borderRadius: '40px'  // Bordure arrondie
							}}
							>
							Acheter maintenant <i className="fas fa-arrow-right ml-2"></i>
							</Link>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
				<div>
				<div
					className="align w-100 bgCover"
					style={{
						backgroundImage: 'url("images/b-bg5.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						minHeight: '100vh',
					}}
					>


					<div className="container position-relative holder pt-14">
					<div className="row">
						<div className="col-12 text-center">
						<div className="txtwrap pr-md-10">
							<h1 className="fwEbold position-relative mb-0">PLANTES NUTRITIVES</h1>
							<strong className="year d-block fwEbold mb-3">2024</strong>
							<span className="sub-title d-block text-uppercase mb-md-12 mb-6">BOUQUET OCCASIONNEL</span>
							<Link
							to="/product"
							className="btn btnTheme btnShop fwEbold py-3 px-4"
							style={{
								backgroundColor: '#28a745',
								color: 'white',
								textDecoration: 'none',
								borderRadius: '40px'  // Bordure arrondie
							}}
							>
							Acheter maintenant <i className="fas fa-arrow-right ml-2"></i>
							</Link>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
				
				
			</Slider>
			<div className="slickNavigatorsWrap">
				
			</div>
		</section>

		<div className="contactListBlock container overflow-hidden pt-xl-24 pb-xl-12 pt-lg-20 pb-lg-10 pt-md-16 pb-md-4 pt-10 pb-1">
				<div className="row">
					<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
						<div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
							<span className="icon icon-van"></span>
							<div className="alignLeft pl-2">
								<strong className="headingV fwEbold d-block mb-1">Livraison gratuite</strong>
								<p className="m-0">Pour les commandes supérieures à 100 $</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
						<div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
							<span className="icon icon-gift"></span>
							<div className="alignLeft pl-2">
								<strong className="headingV fwEbold d-block mb-1">Carte cadeau spéciale</strong>
								<p className="m-0">L'idée cadeau parfaite</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
						<div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-4 px-md-2 px-3 d-flex">
							<span className="icon icon-recycle"></span>
							<div className="alignLeft pl-2">
								<strong className="headingV fwEbold d-block mb-1">Retour & échange</strong>
								<p className="m-0">Retour gratuit sous 3 jours</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
						<div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
							<span className="icon icon-call"></span>
							<div className="alignLeft pl-2">
								<strong className="headingV fwEbold d-block mb-1">Support 24/7</strong>
								<p className="m-0">Support client</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container pt-xl-11 pb-xl-12 pt-lg-10 pb-lg-10 pt-md-8 pb-md-8 pt-5 pb-5">
    <div className="row">
        <div className="col-12">
            <blockquote className="quotationBlock text-center d-block m-0">
                <q className="d-block playfair mb-7">Nous expédions des plantes en pot saines directement à votre porte. Chaque plante est accompagnée d'instructions simples d'entretien rédigées par nos experts en plantes.</q>
                <cite className="d-block">
                    <img src="images/signature.png" alt="signature" className="img-fluid mb-6"/>
                    <span className="d-flex flex-nowrap align-items-center justify-content-center">
                        <strong className="fwEbold mr-1">Ndeye Ndour</strong>
                        <span className="text-uppercase fwEbold pt-1">- PDG</span>
                    </span>
                </cite>
            </blockquote>
        </div>
    </div>
</div>
<section className="featureSec container overflow-hidden pt-xl-12 pb-xl-9 pt-lg-10 pb-lg-4 pt-md-8 pb-md-2 pt-5">
    <div className="row">
        <header className="col-12 mainHeader mb-4 text-center">
            <h1 className="headingIV playfair fwEblod mb-4">Nouveautés</h1>
            <span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr"/></span>
            <p>Il existe de nombreuses variations de passages de lorem ipsum disponibles</p>
        </header>
    </div>
    <div className="row">
		{filteredProducts.slice(0, 3).map(product => (
			<div className="col-12 col-sm-6 col-lg-4 featureCol mb-7" key={product._id}>
			<div className="border">
				<div className="imgHolder position-relative w-100 overflow-hidden">
				<img src={product.imageUrl} alt={product.name} className="img-fluid w-100"/>
				<ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
				<li className="mr-2 overflow-hidden">
					<a
						href="#"
						className={`icon-heart d-block ${isFavorite(product._id) ? 'active' : ''}`}
						onClick={(event) => { event.preventDefault(); toggleFavorite(product); }}
					></a>
				</li>
				<li className="mr-2 overflow-hidden">
					<a href="#" className="icon-cart d-block" onClick={(event) => { event.preventDefault(); addToCart(product); }}></a>
				</li>
				<li className="mr-2 overflow-hidden">
					<a href="#" className="icon-eye d-block" onClick={(event) => { event.preventDefault(); openProductModal(product); }}></a>
				</li>
			</ul>

				</div>
				<div className="text-center py-5 px-4">
				<span className="title d-block mb-2">
					<a href="#">{product.name}</a>
				</span>
				<span className="price d-block fwEbold">
					<del>80.50 $</del>${product.price}
				</span>
				{/* Ajouter un bouton pour ouvrir le modal */}
				</div>
			</div>
			</div>
		))}
	</div>
		{selectedProduct && (
      <Modal
      isOpen={isModalOpen}
      onRequestClose={closeProductModal}
      contentLabel="Product Details"
      className="product-modal"
      overlayClassName="product-modal-overlay"
    >
      <div className="modal-header">
        <h2>{selectedProduct.name}</h2>
        <button onClick={closeProductModal}>Close</button>
      </div>
      <div className="modal-body">
        <div className="product-details">
          {/* Left side: Product Image */}
          <div className="product-image">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="img-fluid" />
          </div>
    
          {/* Right side: Product Info */}
          <div className="product-info">
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <span className="price">${selectedProduct.price}</span>
              <br />
            {/* Quantity Controls and Add to Cart Button */}
            <div className="quantity-controls">
              <div className="input-group">
                <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                <input type="text" className="form-control text-center" value={quantity} readOnly style={{ maxWidth: "50px" }} />
                <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
              </div>
              <button 
                className="btn btn-success btn-block mt-2"
                onClick={() => addToCart(selectedProduct, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    
        {/* Bottom: Similar Products */}
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="similar-products-list">
            {products
              .filter(p => p.category === selectedProduct.category && p._id !== selectedProduct._id)
              .map(product => (
                <div className="similar-product-card" key={product._id}>
                  <img src={product.imageUrl} alt={product.name} className="img-fluid" />
                  <h4>{product.name}</h4>
                  <span className="price">${product.price}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
    

)}


			</section>

			<div className="categorySecBlock overflow-hidden pt-xl-9 pb-xl-6 px-xl-17 px-0 pt-lg-10 pb-lg-4 pt-md-8 pb-md-2 pt-5">
				<div className="masonryHolder">
					<div className="grid-item mb-6 px-3">
						<div className="itemCol">
							<div className="position-relative">
								<img src="images/img21.jpg" alt="image description" className="img-fluid w-100"/>
								<div className="hoverTextBlock position-absolute">
									<h2 className="headingIV playfair fwEbold mb-3"><a href="#">Cactus Plant</a></h2>
									<span className="txt d-block">( 56 item )</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid-item mb-6 px-3">
						<div className="itemCol">
							<div className="position-relative">
								<img src="images/img22.jpg" alt="image description" className="img-fluid w-100"/>
								<div className="hoverTextBlock position-absolute">
									<h2 className="headingIV playfair fwEbold mb-3"><a href="#">Indoor Plant</a></h2>
									<span className="txt d-block">( 36 item )</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid-item grid-item2 mb-6 px-3">
						<div className="itemCol">
							<div className="position-relative">
								<img src="images/img23.jpg" alt="image description" className="img-fluid w-100"/>
								<div className="hoverTextBlock position-absolute">
									<h2 className="headingIV playfair fwEbold mb-3"><a href="#">Tropical Plant</a></h2>
									<span className="txt d-block">( 21 item )</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid-item grid-item2 mb-6 px-3">
						<div className="itemCol">
							<div className="position-relative">
								<img src="images/img24.jpg" alt="image description" className="img-fluid w-100"/>
								<div className="hoverTextBlock position-absolute">
									<h2 className="headingIV playfair fwEbold mb-3"><a href="#">Floor Plant</a></h2>
									<span className="txt d-block">( 18 item )</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid-item mb-6 px-3">
						<div className="itemCol">
							<div className="position-relative">
								<img src="images/img25.jpg" alt="image description" className="img-fluid w-100"/>
								<div className="hoverTextBlock position-absolute">
									<h2 className="headingIV playfair fwEbold mb-3"><a href="#">Table Plant</a></h2>
									<span className="txt d-block">( 36 item )</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="featureSec container overflow-hidden pt-xl-11 pb-xl-18 pt-lg-10 pb-lg-20 pt-md-8 pb-md-16 pt-5 pb-5">
				<div className="row">
				<header className="col-12 mainHeader mb-4 text-center">
					<h1 className="headingIV playfair fwEblod mb-4">Meilleures ventes</h1>
					<span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Bordure de l'en-tête" className="img-fluid img-bdr"/></span>
					<p>Il existe de nombreuses variations de passages de lorem ipsum disponibles</p>
				</header>

				</div>
				<div className="row">
		{filteredProducts.slice(0, 3).map(product => (
			<div className="col-12 col-sm-6 col-lg-4 featureCol mb-7" key={product._id}>
			<div className="border">
				<div className="imgHolder position-relative w-100 overflow-hidden">
				<img src={product.imageUrl} alt={product.name} className="img-fluid w-100"/>
				<ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
					<li className="mr-2 overflow-hidden">
					<a
						href="#"
						className={`icon-heart d-block ${isFavorite(product._id) ? 'active' : ''}`}
						onClick={() => toggleFavorite(product)}
					></a>
					</li>
					<li className="mr-2 overflow-hidden">
					<a href="#" className="icon-cart d-block" onClick={() => addToCart(product)}></a>
					</li>
					<li className="mr-2 overflow-hidden">
					<a href="#" className="icon-eye d-block" onClick={() => openProductModal(product)}></a>
					</li>
				</ul>
				</div>
				<div className="text-center py-5 px-4">
				<span className="title d-block mb-2">
					<a href="#">{product.name}</a>
				</span>
				<span className="price d-block fwEbold">
					<del>80.50 $</del>${product.price}
				</span>
				{/* Ajouter un bouton pour ouvrir le modal */}
				</div>
			</div>
			</div>
		))}
	</div>
			</section>
			<div className="container-fluid px-xl-20 px-lg-10">
      <section
        className="testimonailBlock bgCover py-xl-24 py-lg-20 py-md-16 py-10"
        style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }}
      >
        <header className="col-12 mainHeader mb-9 text-center">
          <h1 className="headingIV playfair fwEblod">Ce Que Disent Nos Clients</h1>
        </header>
        <div className="container">
          <div className="testimonailSlider overflow-hidden">
            <div>
              <div className="slide text-center mb-7">
                <span className="icon-qoute mb-2 d-block"></span>
                <p className="mb-7">
                  "J'ai acheté plusieurs plantes chez eux et je suis vraiment satisfait ! Les plantes sont
                  arrivées en parfait état, bien emballées et de très bonne qualité. De plus, l'équipe est
                  très réactive et les conseils sur l'entretien des plantes sont précieux. Je recommande
                  vivement !"
                </p>
                <strong className="title d-block fwEbold mb-1">Sophie Martin</strong>
                <span className="desination">Propriétaire - Jardin Secret</span>
              </div>
            </div>
            <div>
              <div className="slide text-center mb-7">
                <span className="icon-qoute mb-2 d-block"></span>
                <p className="mb-7">
                  "Une expérience d'achat en ligne parfaite ! Les plantes sont magnifiques, et la livraison
                  a été rapide. J'ai particulièrement apprécié les recommandations sur les meilleures
                  plantes pour mon appartement. Je reviendrai certainement pour de futurs achats."
                </p>
                <strong className="title d-block fwEblod mb-1">Antoine Dupuis</strong>
                <span className="desination">Blogueur - L'Art du Jardin</span>
              </div>
            </div>
            <div>
              <div className="slide text-center mb-7">
                <span className="icon-qoute mb-2 d-block"></span>
                <p className="mb-7">
                  "Je suis passionnée de plantes et j'ai trouvé ici tout ce que je cherchais ! Les plantes
                  sont en excellente santé, le service client est au top et les prix sont compétitifs. Je
                  suis ravie de mes achats et je recommande ce site à tous les amoureux des plantes."
                </p>
                <strong className="title d-block fwEblod mb-1">Claire Lemoine</strong>
                <span className="desination">Amatrice de plantes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
	  <br />
	  <br />

	  <div className="container-fluid px-xl-20 px-lg-14">
      <section 
        className="subscribeSecBlock bgCover col-12 pt-xl-24 pb-xl-12 pt-lg-20 pt-md-16 pt-10 pb-md-8 pb-5"
        style={{ backgroundColor: 'rgba(245, 245, 245, 0.9)' }}
      >
        <header className="col-12 mainHeader mb-sm-9 mb-6 text-center">
          <h1 className="headingIV playfair fwEbold mb-4">Subscribe Our Newsletter</h1>
          <span className="headerBorder d-block mb-md-5 mb-3">
            <img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr" />
          </span>
          <p className="mb-sm-6 mb-3">Enter your email address to join our mailing list and keep yourself updated.</p>
        </header>

		<div className="newsletter-input-container">
        <input
          type="email"
          placeholder="Enter your mail..."
          className="newsletter-input"
        />
		 <button className="newsletter-button" onClick={handleShopNowClick}>
          Acheter maintenant ➔
        </button>
      </div>
      </section>
    </div>
    </div>
			
</main>
<br />
<br />
<Footer />
			
</div>
</Fragment>
)
}

export default Home;