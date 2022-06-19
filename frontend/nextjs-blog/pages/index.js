import Head from 'next/head'
import 'antd/dist/antd.css';
import {Layout, Menu, Space,} from "antd";
import LastArticles from "../components/last-articles";
import CategoriesWithCount from "../components/categories-with-count";

const {Header, Content, Footer} = Layout;


export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Blog</title>
            </Head>

            <main>
                <Layout>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <div style={{
                            height: 32,
                            width: 100,
                            margin: 16,
                            background: "rgba(255, 255, 255, 0.2)"
                        }}/>
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
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
