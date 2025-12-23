import Head from "next/head";
import "../app/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>LearnBetter – Masters in Computer Science</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
