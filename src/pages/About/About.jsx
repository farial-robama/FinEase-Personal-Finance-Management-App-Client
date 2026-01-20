import React from "react";
import { Link } from "react-router";
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Get detailed insights into your spending patterns with interactive charts and reports.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and stored securely. We never share your information.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "Track your transactions instantly and see your financial status update in real-time.",
    },
    {
      icon: Award,
      title: "Goal Tracking",
      description:
        "Set financial goals and monitor your progress with our intuitive tracking system.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Transactions Tracked" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8/5", label: "User Rating" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "10+ years in fintech",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Former Google engineer",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Product design expert",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      bio: "Full-stack specialist",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower individuals to take control of their financial future through simple, intuitive tools that make money management accessible to everyone.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A world where everyone has the knowledge and tools to achieve financial wellness and make informed decisions about their money.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Transparency, security, and user-centricity guide everything we do. We believe in building trust through honest communication and reliable service.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              About FinEase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make personal finance management simple,
              powerful, and accessible to everyone. Your financial wellness is
              our priority.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
                >
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl w-fit mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose FinEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your
              finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-white rounded-xl shadow-md">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to your financial success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-100"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              FinEase was born from a simple observation: managing personal
              finances shouldn't be complicated. In 2020, our founders realized
              that existing finance tools were either too complex for everyday
              users or too simplistic to be truly useful.
            </p>
            <p>
              We set out to create something different—a platform that combines
              powerful analytics with an intuitive interface. After two years of
              development and feedback from thousands of beta users, FinEase
              launched in 2022.
            </p>
            <p>
              Today, we're proud to serve over 10,000 users worldwide, helping
              them track expenses, set goals, and achieve financial wellness.
              But we're just getting started—our roadmap includes AI-powered
              insights, investment tracking, and collaborative budgeting
              features.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already managing their money smarter
            with FinEase
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            {/* <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              View Dashboard
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;