import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Cart = () => {
    const [cart, setCart] = useState([
        { id: '1', name: 'Sản phẩm 1', price: 100000, quantity: 2 },
        { id: '2', name: 'Sản phẩm 2', price: 200000, quantity: 1 },
        { id: '3', name: 'Sản phẩm 3', price: 300000, quantity: 3 },
    ]);

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        Alert.alert('Thông báo', 'Số lượng không thể nhỏ hơn 1!');
                        return item;
                    }
                }
                return item;
            })
        );
    };

    const handleRemoveItem = (id) => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?', [
            {
                text: 'Hủy',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: () => {
                    setCart(prevCart => prevCart.filter(item => item.id !== id));
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.details}>
                            <Text style={styles.price}>{item.price} đ</Text>
                            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.subtotal}>Thành tiền: {item.price * item.quantity} đ</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Tổng tiền:</Text>
                <Text style={styles.total}>{total} đ</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    cartItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
    quantity: {
        fontSize: 16,
        color: '#555',
    },
    subtotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    totalContainer: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff5722', // Màu nổi bật cho tổng tiền
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Cart;
