import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';

import { Provider } from 'react-redux';
import store from '../store/index';
import Head from 'next/head';
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Suspense>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <title>Sports Coaching App | The Grind | Hong Kong</title>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="robots" content="noarchive" />
                </Head>
                <DefaultLayout>
                    <Component {...pageProps} />
                </DefaultLayout>
            </Suspense>
        </Provider>
    );
}
