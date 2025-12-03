import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="lg:ml-64 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-white font-bold">W</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                WinMix TipsterHub
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Az AI-alapú futball predikciós platform, amely segít megalapozott
              döntéseket hozni a mérkőzések kimenetelével kapcsolatban. Valós idejű
              elemzés, magas pontosság, és soha nem látott megbízhatóság.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Gyors linkek</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/predictions"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Predikciók
                </Link>
              </li>
              <li>
                <Link
                  to="/matches"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Mérkőzések
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Csapatok
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Jogi információk</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-slate-400">
                  Adatvédelmi tájékoztató
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Felhasználási feltételek
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Süti beállítások
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Kapcsolat
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
            <p>© 2024 WinMix TipsterHub. Minden jog fenntartva.</p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
