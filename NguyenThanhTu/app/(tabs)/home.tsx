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
        const fetchData = async () => {
            try {
                const productResult = await ProductService.getList();
                const bannerResult = await BannerService.getList();
                setProducts(productResult.products || []);
                setBanners(bannerResult.banner || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleGoToCart = () => {
        router.navigate('/Cart');
    };

    const handleProductDetail = (product) => {
        router.navigate('ProductDetail', { id: product.id });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
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
    bannerContainer: {
        height: 200,
        marginBottom: 20,
    },
    bannerWrapper: {
        width: 300,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
