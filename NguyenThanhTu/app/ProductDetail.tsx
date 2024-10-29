import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../service/ProductService';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await ProductService.getDetail(id);
                setProduct(result.product);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found.</div>;

    return (
        <div className="product-detail">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            {product.images && product.images.length > 0 && (
                <img
                    src={`http://localhost:8000/images/products/${product.images[0].thumbnail}`}
                    alt={product.name}
                />
            )}
            <p className="text-lg">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <button className="bg-blue-500 text-white py-2 px-4 mt-4">Add to Bag</button>
        </div>
    );
};

export default ProductDetail;
