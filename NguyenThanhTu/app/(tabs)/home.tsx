<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
    const [products] = useState([
        { id: '1', name: 'Sản phẩm 1', price: 100000, description: 'Mô tả sản phẩm 1', image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' },
        { id: '2', name: 'Sản phẩm 2', price: 200000, description: 'Mô tả sản phẩm 2', image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' },
        { id: '3', name: 'Sản phẩm 3', price: 300000, description: 'Mô tả sản phẩm 3', image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' },
        { id: '4', name: 'Sản phẩm 4', price: 400000, description: 'Mô tả sản phẩm 4', image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' },
        { id: '5', name: 'Sản phẩm 5', price: 500000, description: 'Mô tả sản phẩm 5', image: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Hàm điều hướng tới giỏ hàng
=======
import BannerService from '@/service/BannerService';
import ProductService from '@/service/ProductService';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await ProductService.getList();
                setProducts(result.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchBanners = async () => {
            try {
                const result = await BannerService.getList();
                setBanners(result.banner || []);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchProducts();
        fetchBanners();
    }, []);

>>>>>>> a481397 (asdasd)
    const handleGoToCart = () => {
        router.navigate('/Cart');
    };

<<<<<<< HEAD
    // Hàm điều hướng tới trang chi tiết sản phẩm
    const handleProductDetail = (product) => {
        router.navigate('/ProductDetail', { product });
    };

    // Lọc sản phẩm theo từ khóa tìm kiếm
=======
    const handleProductDetail = (product) => {
        router.navigate('ProductDetail', { id: product.id });
    };

>>>>>>> a481397 (asdasd)
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
<<<<<<< HEAD
            {/* Thanh tìm kiếm */}
=======
>>>>>>> a481397 (asdasd)
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={handleGoToCart}>
                    <Ionicons name="cart-outline" size={32} color="black" />
                </TouchableOpacity>
            </View>
<<<<<<< HEAD
            {/* Banner */}
            <Image
                source={{ uri: 'https://th.bing.com/th/id/R.5c693d6249eb21b8cc10ec0bb25a48db?rik=rbfEu5oKE5rB9Q&pid=ImgRaw&r=0' }}
                style={styles.banner}
            />
            {/* Tiêu đề */}
            <Text style={styles.title}>Danh sách sản phẩm</Text>

            {/* Danh sách sản phẩm */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleProductDetail(item)}>
                        <View style={styles.product}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price} đ</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
=======

            {/* Banner Slider */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.bannerContainer}
            >
                {banners.map((banner) => (
                    <Pressable key={banner.id} style={styles.bannerWrapper}>
                        <Image
                            source={{ uri: `http://localhost:8000/images/banner/${banner.image}` }}
                            style={styles.banner}
                            resizeMode="cover"
                        />
                    </Pressable>
                ))}
            </ScrollView>


            <Text style={styles.title}>Danh sách sản phẩm</Text>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const imageUrl = `http://localhost:8000/images/product/${item.images[0].thumbnail}`;
                    return (
                        <TouchableOpacity onPress={() => handleProductDetail(item)}>
                            <View style={styles.product}>
                                <Image source={{ uri: imageUrl }} style={styles.image} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productPrice}>{item.price} đ</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
>>>>>>> a481397 (asdasd)
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
<<<<<<< HEAD
    banner: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
=======
    bannerContainer: {
        height: 200,
        marginBottom: 20,
    },
    bannerWrapper: {
        width: 300, // Each banner takes the full width of the viewport
        height: '100%',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    banner: {
        width: '100%', // Fill the wrapper
        height: '100%', // Fill the wrapper
        borderRadius: 10,
        padding: 10
>>>>>>> a481397 (asdasd)
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    product: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
    },
});

export default Home;
