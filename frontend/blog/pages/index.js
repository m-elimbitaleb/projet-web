import Head from 'next/head'
import 'antd/dist/antd.css';
import {Layout, Menu, Space,} from "antd";
import LastArticles from "../components/last-articles";
import CategoriesWithCount from "../components/categories-with-count";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const {Header, Content, Footer} = Layout;


export default function Home() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) router.push("/login");
        setToken(token);
    }, []);

    if (!token) return <div/>

    const goToHome = () => {
        router.push("/");
    }
    const logout = () => {
        router.push("/logout");
    }
    return (
        <div className="container">
            <Head>
                <title>Blog</title>
            </Head>

            <main>
                <Layout>
                    <Header className="header">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                        >
                            <Menu.Item onClick={goToHome}>Home</Menu.Item>
                            <Menu.Item onClick={logout}><span style={{color: "red"}}>Logout</span></Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', marginTop: 5}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                            <Space direction="vertical">
                                <CategoriesWithCount/>
                                <LastArticles/>
                            </Space>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>&copy; 2022 Blog</Footer>
                </Layout>
            </main>
        </div>
    )
}
