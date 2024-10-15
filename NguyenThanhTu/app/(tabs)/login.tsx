import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username === '' || password === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập tên người dùng và mật khẩu!');
        } else {
            Alert.alert('Thông báo', 'Đăng nhập thành công!');
            router.navigate('/home');
        }
    };

    const handleSignup = () => {
        router.navigate('/register');
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg' }} // Đường dẫn đến logo của bạn
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signupText}>
                    Chưa có tài khoản? <Text style={styles.signupLink}>Đăng ký ngay</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
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
        color: '#333',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#333',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1E90FF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
});

export default Login;
