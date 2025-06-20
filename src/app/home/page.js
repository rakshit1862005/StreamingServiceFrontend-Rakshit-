'use client';
import { useEffect, useState } from 'react';
import Banner from '../Banner';
import Card from '../Card';
import Overlay from '../Overlay';
import Sidebar from '../Sidebar';

export default function Home() {
  const [bannerData, setBannerData] = useState(null);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      const res = await fetch('https://upnextbackend.up.railway.app/getrecbanner');
      const data = await res.json();
      setBannerData(data.BannerData);
    }
    fetchBanner();
  }, []);

  useEffect(() => {
    async function fetchCards() {
      const urls = [
        'https://upnextbackend.up.railway.app/getrec1',
        'https://upnextbackend.up.railway.app/getrec2',
        'https://upnextbackend.up.railway.app/getrec3',
        'https://upnextbackend.up.railway.app/getrec4',
        'https://upnextbackend.up.railway.app/getrec5',
        'https://upnextbackend.up.railway.app/getrec6'
      ];

      let allCards = {};
      for (const url of urls) {
        const res = await fetch(url);
        const data = await res.json();
        allCards = { ...allCards, ...data };
      }

      setCards(allCards);
      setLoading(false);
    }

    fetchCards();
  }, []);

  return (
    <>
      <Sidebar />

      {/* Banner */}
      {bannerData && (
        <Banner
          bannerdata={bannerData.bannerdetail}
          banlogo={bannerData.logo}
          banneridx={bannerData.bannerindex}
        />
      )}

      {/* Cards */}
      {loading ? (
        <div className="loadingimg">
          <img src="/assets/Images/loading.gif" />
        </div>
      ) : (
        Object.entries(cards).map(([key, val]) => (
          <Card key={key} movielist={val.data} title={val.acardname} />
        ))
      )}

      <Overlay />
    </>
  );
}
