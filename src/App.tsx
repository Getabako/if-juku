import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>if(塾)</h1>
        <p>プログラミング学習サイト</p>
      </header>
      <main>
        <section>
          <h2>About</h2>
          <p>if(塾)は、プログラミング学習を支援する塾です。</p>
        </section>
        <section>
          <h2>Services</h2>
          <ul>
            <li>プログラミング指導</li>
            <li>Minecraft教材</li>
            <li>個別指導</li>
          </ul>
        </section>
        <section>
          <h2>Contact</h2>
          <p>お問い合わせはこちらから</p>
        </section>
      </main>
    </div>
  );
}

export default App;