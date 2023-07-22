const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-white text-2xl font-semibold mb-4 md:mb-0">Mirela Diniz Studio</div>
        <nav className="flex flex-col md:flex-row">
          <ul className="flex items-center justify-between">
            <li>
              <a href="/" className="text-white text-base md:text-xl font-semibold hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/servicos" className="text-white text-base md:text-xl font-semibold hover:text-gray-300 ml-8">Serviços</a>
            </li>
            <li>
              <a href="/contato" className="text-white text-base md:text-xl font-semibold hover:text-gray-300 ml-8">Contato</a>
            </li>
            <li>
              <a href="/agenda" className="text-white text-base md:text-xl font-semibold hover:text-gray-300 ml-8">Agenda</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
