import { MapPin, Calendar, Clock } from 'lucide-react';

export default function VenueSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <section id="venue" className="relative py-24 px-4 overflow-hidden"></section>
      <div className="absolute inset-0 opacity-10">
        <div className="map-grid" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            Venue & Details
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            Join us at the heart of innovation
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="holographic-card p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 glow-icon">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">Location</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Mohamed Sathak AJ College of Engineering<br />
                    #34, Rajiv Gandhi Road (OMR), IT Highway<br />
                    Siruseri, Egattur, Chennai-603103
                  </p>
                </div>
              </div>
            </div>

            <div className="holographic-card p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 glow-icon">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">Date</h3>
                  <p className="text-gray-300 text-lg">
                    November 24-25, 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="holographic-card p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0 glow-icon">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">Duration</h3>
                  <p className="text-gray-300 text-lg">
                    24 Hours Non-Stop<br />
                    <span className="text-sm text-gray-400">9:00 AM Day 1 (Nov 24) to 1:00 PM Day 2 (Nov 25)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="holographic-card p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
              <p className="text-center text-cyan-300 font-semibold">
                Free Wi-Fi • Power Backup • Food & Refreshments Included
              </p>
            </div>
          </div>

          <div className="holographic-card p-2 overflow-hidden">
            <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123456789!2d80.123456789!3d12.87654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259af8e491f67%3A0x8829ba17b5e252c8!2sMohamed%20Sathak%20AJ%20College%20of%20Engineering%2C%20Egattur%2C%20Chennai!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              <div className="absolute inset-0 pointer-events-none border-2 border-cyan-500/30 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/search/Mohamed+Sathak+AJ+College+of+Engineering+Egattur+Chennai"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button px-8 py-4 text-lg font-bold inline-block"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
