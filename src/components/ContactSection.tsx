import { Phone, Instagram, Users as UsersIcon, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
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

        {/* TODO: Add coordinator details below - Replace placeholder data with actual coordinator information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Coordinator 1 - Add details here */}
          <div className="holographic-card p-8 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-icon group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300">Coordinator Name 1</h3>
                <p className="text-gray-400 text-sm">Role/Title</p>
              </div>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors block mb-2"
            >
              +91 XXXXXXXXXX
            </a>
            <p className="text-gray-400">Description/Responsibilities</p>
          </div>

          {/* Coordinator 2 - Add details here */}
          <div className="holographic-card p-8 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center glow-icon group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300">Coordinator Name 2</h3>
                <p className="text-gray-400 text-sm">Role/Title</p>
              </div>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors block mb-2"
            >
              +91 XXXXXXXXXX
            </a>
            <p className="text-gray-400">Description/Responsibilities</p>
          </div>

          {/* Coordinator 3 - Add details here */}
          <div className="holographic-card p-8 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center glow-icon group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300">Coordinator Name 3</h3>
                <p className="text-gray-400 text-sm">Role/Title</p>
              </div>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors block mb-2"
            >
              +91 XXXXXXXXXX
            </a>
            <p className="text-gray-400">Description/Responsibilities</p>
          </div>

          {/* Coordinator 4 - Add details here */}
          <div className="holographic-card p-8 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center glow-icon group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300">Coordinator Name 4</h3>
                <p className="text-gray-400 text-sm">Role/Title</p>
              </div>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors block mb-2"
            >
              +91 XXXXXXXXXX
            </a>
            <p className="text-gray-400">Description/Responsibilities</p>
          </div>

          {/* Coordinator 5 - Add details here */}
          <div className="holographic-card p-8 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center glow-icon group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300">Coordinator Name 5</h3>
                <p className="text-gray-400 text-sm">Role/Title</p>
              </div>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors block mb-2"
            >
              +91 XXXXXXXXXX
            </a>
            <p className="text-gray-400">Description/Responsibilities</p>
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
              <UsersIcon className="w-6 h-6 text-white" />
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
