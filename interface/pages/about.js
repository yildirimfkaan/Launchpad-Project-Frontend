import Head from "next/head";


export default function About() {
    return (
        <>
        <Head>
            <title> About Page</title>
            <link rel="icon" href="/ibss.ico" />
        </Head>
       

            <h1 className="greencolor">
                About sayfası
            </h1>


        <style jsx>{`
        .greencolor {
          color: green;
        }
      `}</style>


        </>

    );
};

