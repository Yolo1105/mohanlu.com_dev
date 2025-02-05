import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import Head from 'next/head';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current?.focus();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.pathname !== '/') {
      setIsLoading(false);
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
      </Head>

      {isLoading ? (
        <Loading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div
          className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base main-content"
          style={{
            backgroundColor: '#3e3e42', // Explicitly set background to black
          }}
          onClick={onClickAnywhere}
        >
          <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
            <Component {...pageProps} inputRef={inputRef} />
          </main>
        </div>
      )}
    </>
  );
};

export default App;
