import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams(); // Récupère l'ID du produit à partir de l'URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du produit');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!product) {
        return <div>Aucun produit trouvé.</div>;
    }

    return (
        <Fragment>
            <div className="product-detail">
                <h1>{product.name}</h1>
                <img src={product.imageUrl} alt={product.name} className="img-fluid" />
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Prix:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Catégorie:</strong> {product.category}</p>
                <p><strong>Stock disponible:</strong> {product.stock}</p>
            </div>
        </Fragment>
    );
}

export default ProductDetail;
