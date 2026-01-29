import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import DangerCarousel from './components/DangerCarousel';
import IntelligenceTicker from './components/IntelligenceTicker';
import FugitiveList from './components/FugitiveList';
import DossierModal from './components/DossierModal';
import PrivacyModal from './components/PrivacyModal';
import styles from './App.module.css';

function App() {
  const [selectedFugitive, setSelectedFugitive] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className={styles.app}>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <ThreeBackground />
      <IntelligenceTicker />
      <div className={styles.heroContainer}>
        <Hero />
        <DangerCarousel onSelectFugitive={setSelectedFugitive} />
      </div>
      <main className={styles.mainContent}>
        <FugitiveList onSelectFugitive={setSelectedFugitive} />
      </main>

      {selectedFugitive && (
        <DossierModal
          fugitive={selectedFugitive}
          onClose={() => setSelectedFugitive(null)}
        />
      )}

      {showPrivacy && (
        <PrivacyModal onClose={() => setShowPrivacy(false)} />
      )}

      <footer className={styles.footer}>
        <div className={styles.disclaimer}>
          <p><strong>Official websites use .gov</strong></p>
          <p>A .gov website belongs to an official government organization in the United States.</p>
        </div>
        <div className={styles.legalLinks}>
          <button onClick={() => setShowPrivacy(true)} className={styles.privacyBtn}>
            PRIVACY & LEGAL NOTICE
          </button>
        </div>
        <p className={styles.status}>OFFICIAL FBI DATA • SECURE CONNECTION ESTABLISHED</p>
      </footer>
    </div>
  );
}

export default App;
