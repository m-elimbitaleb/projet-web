import 'antd/dist/antd.css';
import Head from "next/head";
import {useRouter} from 'next/router';
import {useEffect} from "react";


const Logout = () => {
        const router = useRouter();

        useEffect(() => {
            localStorage.removeItem('token')
            router.push("/login");
        }, []);


        return (
            <div className="container">
                <Head>
                    <title>Blog | Logging out</title>
                </Head>

                <main>
                    <h4 style={{textAlign: "center", marginTop: 100, color: "red"}}>Logging out...</h4>
                </main>
            </div>
        );
    }
;

export default Logout;