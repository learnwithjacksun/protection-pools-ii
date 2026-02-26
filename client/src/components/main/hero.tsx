import { Link } from "react-router-dom";
import { TrendingUp, Shield, Zap, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-70px)] md:py-[70px] py-[50px] flex items-center md:justify-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/qM1NDpjy/hero.jpg"
          alt="Betting Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        {/* Additional red accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent" />
      </div>

      {/* Content - Centered with proper spacing for 70px header */}
      <div className="relative z-10 w-full main pt-[70px] -mt-[35px]">
        <div className=" text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/10">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="text-sm font-space font-semibold text-red-400">
              Secure Betting Protection
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-space font-extrabold text-white leading-tight">
            Protect Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
              Bets
            </span>
            <br />
            Win with Confidence
          </h1>

          {/* Subheadline */}
          <p className="md:text-lg text-sm text-white/90 max-w-2xl font-sans leading-relaxed">
            Join thousands of smart bettors who protect their stakes with our
            innovative protection pools. Secure your wins, minimize your risks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              to="/register"
              className="btn btn-primary text-base h-12 md:w-[200px] w-full rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg shadow-red-600/30"
            >
              Get Started
            </Link>
            <Link
              to="/bets"
              className="btn text-base h-12 md:w-[200px] w-full rounded-lg border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
            >
              View Bets
            </Link>
          </div>

          {/* Stats/Features */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10">
            <div className="space-y-2">
              <div className="flex items-center w-6 h-6 justify-center gap-2 text-red-500">
                <Shield size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-space font-bold text-white">100%</div>
              <div className="text-sm text-gray-200 font-sans">Protected</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center w-6 h-6 justify-center gap-2 text-red-500">
                <TrendingUp size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-space font-bold text-white">24/7</div>
              <div className="text-sm text-gray-200 font-sans">Active Pools</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center w-6 h-6 justify-center gap-2 text-red-500">
                <Users size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-space font-bold text-white">10K+</div>
              <div className="text-sm text-gray-200 font-sans">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center w-6 h-6 justify-center gap-2 text-red-500">
                <Zap size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-space font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-100 font-sans">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </section>
  );
}
