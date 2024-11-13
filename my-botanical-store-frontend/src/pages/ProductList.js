import React, { Fragment, useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { CartContext } from '../pages/CartContext';
import { FavoritesContext } from '../pages/FavoritesContext';
import Modal from "react-modal";
import { Dropdown } from 'react-bootstrap';
import Slider from 'rc-slider';
import { useParams } from 'react-router-dom';

// Applique les styles de modal (requis par react-modal)
Modal.setAppElement("#root");

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { addFavorite, removeFavorite, favoriteCount } = useContext(FavoritesContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [displayedPlants, setDisplayedPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // État pour la catégorie sélectionnée



  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné pour afficher les détails
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

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

  // Fonction pour augmenter la quantité
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Fonction pour diminuer la quantité, sans qu'elle descende sous 1
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const [priceRange, setPriceRange] = useState([20, 80]); // Valeur de départ pour la plage de prix

  const handleSliderChange = (values) => {
      setPriceRange(values);
  };
  const [allProducts, setAllProducts] = useState([]); // Tous les produits
  const [setFilteredProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('/products'); // Appel API pour récupérer tous les produits
      setAllProducts(response.data);
      setFilteredProducts(response.data); // Initialiser les produits filtrés avec tous les produits
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };  
  const handleFilter = () => {
    const filtered = allProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  // Utiliser useEffect pour charger les produits au démarrage
  useEffect(() => {
    fetchAllProducts();
  }, []);

  
  return (
    <Fragment>
      <div id="pageWrapper">
        <Header />
        <main>
          {/* Affiche le nombre de favoris */}
          <div className="favorites-count">
            <span>{favoriteCount}</span>
          </div>
          <section className="introBannerHolder d-flex w-100 bgCover" style={{ backgroundImage: 'url("images/b-bg7.jpg")' }}>
            <div className="container">
              <div className="row">
                <div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
                  <h1 className="headingIV fwEbold playfair mb-4">Product List</h1>
                  <ul className="list-unstyled breadCrumbs d-flex justify-content-center">
                    <li className="mr-2"style={{ textDecoration: 'none' }}>Home</li>
                    <li className="mr-2">/</li>
                    <li className="active">Product</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <div className="twoColumns container pt-lg-23 pb-lg-20 pt-md-16 pb-md-4 pt-10 pb-4">
            <div className="row">
              <div className="col-12 col-lg-9 order-lg-3">
                <article id="content">
                <header className="show-head d-flex flex-wrap justify-content-between mb-7">
                    <ul className="list-unstyled viewFilterLinks d-flex flex-nowrap align-items-center">
                      <li className="mr-2"><a href="javascript:void(0);" className="active"><i className="fas fa-th-large"></i></a></li>
                      <li className="mr-2"><a href="javascript:void(0);"><i className="fas fa-list"></i></a></li>
                      <li className="mr-2">Showing {filteredProducts.length} results</li>
                    </ul>
                    

<div className="sortGroup">
    <div className="d-flex flex-nowrap align-items-center">
        <strong className="groupTitle me-2">Filtrage par:</strong>
        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
                {selectedCategory || 'Category'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategoryClick("Plantes d'Intérieur")}>Plantes d'Intérieur</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("Plantes Succulentes")}>Plantes Succulentes</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("Orchidées")}>Orchidées</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("Plantes Aromatiques")}>Plantes Aromatiques</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
</div>


                  </header>
                  <header className="show-head d-flex flex-wrap justify-content-between mb-7">
                    {/* Barre de tri */}
                  </header>
                  <div className="row">
                    {filteredProducts.map(product => (
                      <div className="col-12 col-sm-6 col-lg-4 featureCol mb-7" key={product._id}>
                        <div className="border">
                          <div className="imgHolder position-relative w-100 overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="img-fluid w-100"/>
                            <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                              <li className="mr-2 overflow-hidden">
                                <a
                                  href="javascript:void(0);"
                                  className={`icon-heart d-block ${isFavorite(product._id) ? 'active' : ''}`}
                                  onClick={() => toggleFavorite(product)}
                                  style={{ textDecoration: 'none' }}
                                ></a>
                              </li>
                              <li className="mr-2 overflow-hidden">
                                <a href="javascript:void(0);" className="icon-cart d-block" onClick={() => addToCart(product)} style={{ textDecoration: 'none' }}  ></a>
                              </li>
                              <li className="mr-2 overflow-hidden">
                                <a href="javascript:void(0);" className="icon-eye d-block" onClick={() => openProductModal(product)} style={{ textDecoration: 'none' }}  ></a>
                              </li>
                            </ul>
                          </div>
                          <div className="text-center py-5 px-4">
                            <span className="title d-block mb-2">
                              <a href="javascript:void(0); style={{ textDecoration: 'none' }}  ">{product.name}</a>
                            </span>
                            <span className="price d-block fwEbold">
                              <del>80.50 $</del>${product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
    
                </article>
              </div>
              <div className="col-12 col-lg-3 order-lg-1">
                {/* Sidebar */}
                <aside id="sidebar">
                <section className="widget overflow-hidden mb-9">
                    <form action="javascript:void(0);" >
                      <fieldset>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search product..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </fieldset>
                    </form>
                  </section>
                  {/* <section className="widget overflow-hidden mb-9">
								<h3 className="headingVII fwEbold text-uppercase mb-5">PRODUCT CATEGORIES</h3>
								<ul className="list-unstyled categoryList mb-0">
									<li className="mb-5 overflow-hidden"><a href="javascript:void(0);">Dried </a></li>
									<li className="mb-5 overflow-hidden"><a href="javascript:void(0);">Vegetables </a></li>
									<li className="mb-4 overflow-hidden"><a href="javascript:void(0);">Fruits </a></li>
									<li className="mb-5 overflow-hidden"><a href="javascript:void(0);">Juice </a></li>
								</ul>
							</section> */}
                        <section className="widget mb-4" style={{ maxWidth: '300px' }}>
        <h3 className="headingVII fwEbold text-uppercase mb-3">Filter by price</h3>

        <form
          action="javascript:void(0);"
          className="filter-ranger-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleFilter();
          }}
        >
          <div className="d-flex mb-3">
            <input
              type="number"
              className="form-control mr-2"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            
          </div>
         
        </form>
      </section>

        
                                    <section className="widget mb-9">
                                        <h3 className="headingVII fwEbold text-uppercase mb-6">top rate</h3>
                                        <ul className="list-unstyled recentListHolder mb-0 overflow-hidden">
                                            <li className="mb-6 d-flex flex-nowrap">
                                                <div className="alignleft">
                                                    <a href="#"><img src="images/img53.jpg" alt="image description" className="img-fluid"/></a>
                                                </div>
                                                <div className="description-wrap pl-1">
                                                    <h4 className="headingVII mb-1"><a href="#">Vitamin C face wash</a></h4>
                                                    <strong className="price fwEbold d-block;">21.00 $</strong>
                                                </div>
                                            </li>
                                            <li className="mb-6 d-flex flex-nowrap">
                                                <div className="alignleft">
                                                    <a href="#"><img src="images/img54.jpg" alt="image description" className="img-fluid"/></a>
                                                </div>
                                                <div className="description-wrap pl-1">
                                                    <h4 className="headingVII mb-1"><a href="#">Organic vegetables</a></h4>
                                                    <strong className="price fwEbold d-block;">21.00 $</strong>
                                                </div>
                                            </li>
                                            <li className="mb-6 d-flex flex-nowrap">
                                                <div className="alignleft">
                                                    <a href="#"><img src="images/img55.jpg" alt="image description" className="img-fluid"/></a>
                                                </div>
                                                <div className="description-wrap pl-1">
                                                    <h4 className="headingVII mb-1"><a href="#">Organic cabbage</a></h4>
                                                    <strong className="price fwEbold d-block;">21.00 $</strong>
                                                </div>
                                            </li>
                                            <li className="mb-6 d-flex flex-nowrap">
                                                <div className="alignleft">
                                                    <a href="#"><img src="images/img56.jpg" alt="image description" className="img-fluid"/></a>
                                                </div>
                                                <div className="description-wrap pl-1">
                                                    <h4 className="headingVII mb-1"><a href="#">Organic vegetables</a></h4>
                                                    <strong className="price fwEbold d-block;">21.00 $</strong>
                                                </div>
                                            </li>
                                            <li className="d-flex flex-nowrap">
                                                <div className="alignleft">
                                                    <a href="#"><img src="images/img57.jpg" alt="image description" className="img-fluid"/></a>
                                                </div>
                                                <div className="description-wrap pl-1">
                                                    <h4 className="headingVII mb-1"><a href="#">Vitamin C face wash</a></h4>
                                                    <strong className="price fwEbold d-block;">21.00 $</strong>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                    <section className="widget mb-9">
                                        <h3 className="headingVII fwEbold text-uppercase mb-5">product tags</h3>
                                        <ul className="list-unstyled tagNavList d-flex flex-wrap mb-0">
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Plant</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Floor</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Indoor</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Green</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Healthy</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Cactus</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">House plant</a></li>
                                            <li className="text-center"><a href="javascript:void(0);" className="md-round d-block">Office tree</a></li>
                                        </ul>
                                    </section>
                  

                  {/* Autres widgets */}
                </aside>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal pour les détails du produit */}
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
      
    </Fragment>
  );
}

export default ProductList;
