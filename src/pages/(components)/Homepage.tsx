import Mainlayouts from "@/pages/layouts/Homelayouts";
import Head from "next/head";
import React from "react";
import Hero from "./Hero";
import Platformfeatures from "./Platformfeatures";

const Homepage = () => {
  return (
    <Mainlayouts>
      <Head>
        <title>FinTribe</title>
      </Head>
      <section>
        <Hero />
      </section>
      <section>
        <Platformfeatures />
      </section>
    </Mainlayouts>
  );
};

export default Homepage;
