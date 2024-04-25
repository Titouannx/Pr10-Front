import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureItem from '../components/FeatureItem';
import Footer from '../components/Footer';
import iconChat from '../assets/icon-chat.png';
import iconMoney from '../assets/icon-money.png';
import iconSecurity from '../assets/icon-security.png';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from "../slices/auth";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <Header username={(user.firstName || '') + " " + (user.lastName || '')} />
        ) : (
          <Header />
      )}
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            icon={iconChat}
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            icon={iconMoney}
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            icon={iconSecurity}
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
