const Footer = () => {
  return <footer className="bg-[#0D4DA1] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl text-white font-semibold mb-2">
              CDTM Hacks 2025
            </h3>
            <p className="text-sm text-white"></p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="text-lg text-white font-medium mb-2">Contact</h4>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="mailto:hacks@cdtm.com" className="hover:underline">hacks@cdtm.com</a>
                </li>
                
                <li>Arcisstraße 21, 80333 Munich</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-blue-700 text-center text-sm text-blue-200 flex flex-col items-center">
          <p className="mb-2 text-white inline-flex items-center">
            © {new Date().getFullYear()} CDTM. Build using{" "}
            <a href="https://www.lovable.dev" target="_blank" className="inline h-[1em] ml-1 pb-px" rel="noopener noreferrer">
              <img src="/images/light_modified.svg" alt="Beer" className="h-[1em] pb-px" />
            </a>
            , beer & brezn.
          </p>
          <div>
            <a href="https://cdtm.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white underline">
              Privacy Policy
            </a>
            <a href="https://cdtm.com/legal" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white underline ml-2">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
