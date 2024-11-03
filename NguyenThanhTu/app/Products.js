import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Products = () => {
    const route = useRoute();
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cart, setCart] = useState([]); // Local cart state
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postSuccess, setPostSuccess] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/product/show/${id}`);
                setProduct(response.data.product);
                if (response.data.product.images.length > 0) {
                    setSelectedImage(response.data.product.images[0].thumbnail);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Error fetching product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToBag = () => {
        setIsAdding(true);
        const newItem = {
            id: product.id,
            name: product.name,
            quantity,
            image: selectedImage,
            price: product.price,
            totalPrice: (product.price * quantity).toLocaleString('vi-VN'),
        };
        setCart(prevCart => [...prevCart, newItem]);
        Alert.alert('Success', 'Product added to bag successfully!');
        setIsAdding(false);
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    if (loading) return <Text style={styles.loading}>Loading...</Text>;
    if (error) return <Text style={styles.error}>{error}</Text>;
    if (!product) return <Text style={styles.error}>No product found.</Text>;

    const priceToUse = product.price_sale > 0 ? product.price_sale : product.price;
    const totalPrice = (priceToUse * quantity).toLocaleString('vi-VN');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.selectedImageContainer}>
                {selectedImage && (
                    <Image
                        source={{ uri: `http://localhost:8000/images/product/${selectedImage}` }}
                        style={styles.selectedImage}
                    />
                )}
            </View>
            <View style={styles.imageContainer}>
                {product.images.map((image, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedImage(image.thumbnail)}>
                        <Image
                            source={{ uri: `http://localhost:8000/images/product/${image.thumbnail}` }}
                            style={[styles.image, selectedImage === image.thumbnail && styles.selectedImageBorder]}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}><strong>Name:</strong> {product.name}</Text>
                <Text style={styles.detailText}><strong>Price:</strong> {product.price.toLocaleString('vi-VN')} ₫</Text>
                {product.price_sale > 0 && (
                    <Text style={styles.salePrice}><strong>Sale Price:</strong> {product.price_sale.toLocaleString('vi-VN')} ₫</Text>
                )}
                <Text style={styles.detailText}><strong>Total Price:</strong> {totalPrice} ₫</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailText}><strong>Description:</strong> {product.description}</Text>
            <TouchableOpacity
                onPress={addToBag}
                style={[styles.addButton, isAdding && styles.disabledButton]}
                disabled={isAdding}
            >
                <Text style={styles.addButtonText}>{isAdding ? 'Adding...' : 'Add to Bag'}</Text>
            </TouchableOpacity>

            {/* Post Creation Form */}
            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>Create a New Post</Text>
                <TextInput
                    placeholder="Post Title"
                    value={postTitle}
                    onChangeText={setPostTitle}
                    style={styles.input}
                    required
                />
                <TextInput
                    placeholder="Post Content"
                    value={postContent}
                    onChangeText={setPostContent}
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={3}
                    required
                />
                <TouchableOpacity onPress={() => {/* Handle post creation */ }} style={styles.postButton}>
                    <Text style={styles.postButtonText}>Create Post</Text>
                </TouchableOpacity>
                {postSuccess && <Text style={styles.successMessage}>{postSuccess}</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    selectedImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 30,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedImageBorder: {
        borderWidth: 2,
        borderColor: 'blue',
    },
    details: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    salePrice: {
        fontSize: 16,
        color: 'red',
        marginBottom: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 20,
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
    cartContainer: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartEmpty: {
        color: 'gray',
        textAlign: 'center',
    },
    postContainer: {
        marginTop: 30,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        height: 60,
    },
    postButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    postButtonText: {
        color: 'white',
        fontSize: 16,
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
    },
    cartItem: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Products;
