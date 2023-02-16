import type { NextPage } from "next";
import Head from "next/head";
import CaptionModal from "../components/CaptionModal";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ImageGeneratedModal from "../components/ImageGeneratedModal";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />
      {/* Modal */}
      <Modal />
      <ImageGeneratedModal />
      <CaptionModal />
    </div>
  );
};

export default Home;
