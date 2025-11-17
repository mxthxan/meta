import { Instagram, Users, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <section id="contact" className="relative py-24 px-4 overflow-hidden"></section>
      <div className="absolute inset-0">
        <div className="contact-glow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            Connect With Us
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            Have questions? We're here to help
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Coordinators - Top Row (3 people) */}
        <div className="flex justify-center gap-12 mb-16 flex-wrap">
          {/* Coordinator 1 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500 glow-icon mx-auto bg-gray-800">
                {/* Replace src with your ImageKit URL */}
                <img 
                  src="https://ik.imagekit.io/jacw2jgvs/Screenshot%202025-11-17%20114644.png" 
                  alt="Shahid Sharif B"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">Shahid Sharif B</h3>
            <p className="text-gray-400 text-sm mb-2"></p>
            <a
              href="tel:+917397234549"
              className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              +91 7397 234 549
            </a>
          </div>

          {/* Coordinator 2 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500 glow-icon mx-auto bg-gray-800">
                {/* Replace src with your ImageKit URL */}
                <img 
                  src="https://ik.imagekit.io/jacw2jgvs/Screenshot%202025-11-17%20115748.png" 
                  alt="Shrivarsa P"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">Shrivarsa P</h3>
            <p className="text-gray-400 text-sm mb-2"></p>
            <a
              href="tel:+919840223769"
              className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              +91 9840223769
            </a>
          </div>

          {/* Coordinator 3 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-500 glow-icon mx-auto bg-gray-800">
                {/* Replace src with your ImageKit URL */}
                <img 
                  src="https://ik.imagekit.io/jacw2jgvs/Screenshot%202025-11-17%20115940.png" 
                  alt="Sham K A"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">Sham K A</h3>
            <p className="text-gray-400 text-sm mb-2"></p>
            <a
              href="tel:+919566472012"
              className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              +91 9566472012
            </a>
          </div>
        </div>

        {/* Coordinators - Bottom Row (2 people) */}
        <div className="flex justify-center gap-16 mb-12 flex-wrap">
          {/* Coordinator 4 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-500 glow-icon mx-auto bg-gray-800">
                {/* Replace src with your ImageKit URL */}
                <img 
                  src="https://ik.imagekit.io/jacw2jgvs/IMG_20240519_150648315~2.jpg" 
                  alt="Mithran"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">Mithran</h3>
            <p className="text-gray-400 text-sm mb-2"></p>
            <a
              href="tel:+917358651427"
              className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              +91 7358651427
            </a>
          </div>

          {/* Coordinator 5 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="relative mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-500 glow-icon mx-auto bg-gray-800">
                {/* Replace src with your ImageKit URL */}
                <img 
                  src="https://ik.imagekit.io/jacw2jgvs/1732378724803.jpg" 
                  alt="Yogesh R"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">Yogesh R</h3>
            <p className="text-gray-400 text-sm mb-2"></p>
            <a
              href="tel:+91 90806 60903"
              className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
            >
              +91 90806 60903
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://chat.whatsapp.com/BLjcvxZE2bMFJIlOoAUPzR?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className="holographic-card p-6 hover:scale-105 transition-all duration-300 group text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 glow-icon group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-cyan-300 mb-2">WhatsApp Group</h4>
            <p className="text-gray-400 text-sm">Join our community</p>
          </a>

          <a
            href="https://www.instagram.com/metaverse.25/"
            target="_blank"
            rel="noopener noreferrer"
            className="holographic-card p-6 hover:scale-105 transition-all duration-300 group text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 glow-icon group-hover:scale-110 transition-transform duration-300">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-cyan-300 mb-2">Instagram</h4>
            <p className="text-gray-400 text-sm">Follow for updates</p>
          </a>

          <a
            href="https://forms.gle/gwkFuZXKHfLmxM4u5"
            target="_blank"
            rel="noopener noreferrer"
            className="holographic-card p-6 hover:scale-105 transition-all duration-300 group text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 glow-icon group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-cyan-300 mb-2">Register Now</h4>
            <p className="text-gray-400 text-sm">Secure your spot</p>
          </a>
        </div>

        <div className="mt-16 text-center">
          <div className="holographic-card p-8 inline-block max-w-2xl">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">Ready to Enter the MetaVerse?</h3>
            <p className="text-gray-300 mb-6">
              Join us for 24 hours of innovation, collaboration, and groundbreaking ideas
            </p>
            <a
              href="https://forms.gle/gwkFuZXKHfLmxM4u5"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-10 py-4 text-xl font-bold inline-block"
            >
              Register Your Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}