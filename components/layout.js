import Link from 'next/link'
import Head from 'next/head';
import classes from './Layout.module.css';
export default function Layout({
                                   children,
                                   title = 'Rick and Morty',
                               }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" type="image/png" href="/images/favicon.png"/>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <header className={classes.header}>
                <nav>
                    <Link href="/">
                        <a>
                        <img src="/images/header.png" alt="" className={classes.header__img}/>
                        </a>
                    </Link>
                </nav>
            </header>

            {children}

            <footer>{'I`m here to stay'}</footer>
        </div>
    )
}