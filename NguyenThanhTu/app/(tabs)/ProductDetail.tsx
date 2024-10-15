import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';


const ProductDetail = () => {
    const product = {
        id: '1',
        name: 'Sản phẩm 1',
        price: 100000,
        description: 'Mô tả sản phẩm 1',
        image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0',
    };
    const router = useRouter();

    const handleAddToCart = () => {
        // Hàm thêm sản phẩm vào giỏ hàng
        console.log('Thêm sản phẩm vào giỏ hàng');
        router.navigate('/Cart');

    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.productInfo}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
            <Button title="Thêm vào giỏ hàng" onPress={handleAddToCart} color="#ff5722" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    price: {
        fontSize: 24,
        color: '#ff5722', // Màu sắc nổi bật cho giá
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
        lineHeight: 1.5, // Tăng khoảng cách giữa các dòng
    },
});

export default ProductDetail;
