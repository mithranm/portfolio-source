import { Github, Linkedin, Mail } from 'lucide-react';
import Projects from './pages/Projects'


const Header = () => (
  <header className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">Mithran Mohanraj</h1>
      <p className="text-xl mb-4">GMU Computer Science, Senior, Graduating 2025</p>
      <div className="flex space-x-4">
        <a href="https://github.com/mithranm" className="hover:text-gray-300"><Github /></a>
        <a href="https://www.linkedin.com/in/mithran-mohanraj/" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
        <a href="mailto:mithran.mohanraj@gmail.com" className="hover:text-gray-300"><Mail /></a>
      </div>
    </div>
  </header>
);


const Footer = () => (
  <footer className="bg-gray-900 text-white py-4">
    <div className="container mx-auto px-4 text-center">
      <p>©Mithran Mohanraj {new Date().getFullYear()}</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default App;