import "../styles/global.css";
import NextHead from "next/head";

const Application = ({ Component, pageProps }) => {
  return (
    <>
      <NextHead>
        <>
          <title>Sudoku</title>{" "}
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_PREFIX}/favicon.ico`}
          />
        </>
      </NextHead>
      <Component {...pageProps} />
    </>
  );
};

export default Application;
