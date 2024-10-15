import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        router.navigate('/login'); // Điều hướng đến trang đăng nhập
    };

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu không khớp!');
        } else {
            // Xử lý đăng ký tại đây
            Alert.alert('Thông báo', 'Đăng ký thành công!');
            router.navigate('/login');

        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg' }} // Đường dẫn đến logo của bạn
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Đăng ký</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} onPress={handleLogin}>
                    <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    logo: {
        width: 100,  // Kích thước chiều rộng của logo
        height: 100, // Kích thước chiều cao của logo
        marginBottom: 20, // Khoảng cách giữa logo và tiêu đề
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e63946',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#e63946',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#1d3557',
        fontSize: 16,
    },
});

export default Signup;
