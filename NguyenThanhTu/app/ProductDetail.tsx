import ProductService from '@/service/ProductService';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ProductDetail = () => {
    const route = useRoute();
    const { id } = route.params || {};
    const [products, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await ProductService.getProductById(id);
                setProduct(result.products);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!products) {
        return <Text>Loading product...</Text>;
    }
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: `http://localhost:8000/images/product/${product.images[0].thumbnail}` }} style={styles.image} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{products.name}</Text>
                <Text style={styles.productPrice}>{products.price} đ</Text>
                <Text style={styles.productDescription}>{products.description}</Text>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    productDetails: {
        marginTop: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 20,
        color: '#888',
    },
    productDescription: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default ProductDetail;
