import 'antd/dist/antd.css';
import {Button, Checkbox, Form, Input} from 'antd';
import Head from "next/head";
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {Alert} from 'antd';


const Login = () => {
        const router = useRouter();
        const [token, setToken] = useState(null);
        const [showError, setShowError] = useState(false);
        useEffect(() => {
            const token = localStorage.getItem('token')
            if (!!token) router.push("/");
            setToken(token);
        }, []);

        if (token) return <div/>

        const onFinish = (values) => {
            fetch(`/api/auth/token`, {
                method: 'POST',
                body: JSON.stringify({email: values.email, password: values.password}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem("token", data.accessToken);
                        router.push("/")
                    } else {
                        setShowError(true);
                    }
                }).catch(error => {
                setShowError(true);
            })
        }

        const onClose = (e) => {
            setShowError(false)
        };
        return (
            <div className="container">
                <Head>
                    <title>Blog | Login</title>
                </Head>

                <main>
                    {showError && <Alert
                        banner
                        closable
                        message="Authentication error"
                        description="Email/password combination incorrect"
                        type="error"
                        onClose={onClose}
                        showIcon
                    />
                    }
                    <h1 style={{textAlign: "center", marginTop: 100}}>Login</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 8,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue="admin@dwm.com"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            initialValue="admin@dwm.com"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </main>
            </div>
        );
    }
;

export default Login;