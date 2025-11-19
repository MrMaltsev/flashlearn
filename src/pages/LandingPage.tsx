import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Check, Brain, Zap, Trophy, Mail, MapPin, Phone } from "lucide-react";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "features", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "-100px" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {},
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-gray-900 mb-6">
              Master Anything with{" "}
              <span className="text-orange-500">FlashLearn</span>
            </h1>
            <p className="text-gray-600 mb-8">
              The smartest way to learn and retain information. Create flashcards, track your progress, and achieve your educational goals faster than ever.
            </p>
            <div className="flex gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-6">
                Get Started Free
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701576766277-c6160505581d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYyOTk5NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student learning"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl w-full">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">About FlashLearn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the way people learn by combining proven study techniques with modern technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759984782199-a4f6d1b6054e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBkZXNrfGVufDF8fHx8MTc2Mjk2NTI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Online education"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="space-y-6"
            >
              <motion.div {...fadeInUp}>
                <h3 className="text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To make learning accessible, effective, and enjoyable for everyone. We believe that with the right tools, anyone can master any subject.
                </p>
              </motion.div>

              <motion.div {...fadeInUp} className="space-y-4">
                {[
                  "Scientifically-proven learning methods",
                  "Personalized study plans",
                  "Progress tracking and analytics",
                  "Collaborative learning features"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center py-20 px-6 bg-white">
        <div className="max-w-7xl w-full">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to supercharge your learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "Smart Flashcards",
                description: "AI-powered flashcards that adapt to your learning style and pace"
              },
              {
                icon: Zap,
                title: "Spaced Repetition",
                description: "Optimize retention with scientifically-backed spaced repetition algorithms"
              },
              {
                icon: Trophy,
                title: "Track Progress",
                description: "Visualize your learning journey with detailed analytics and achievements"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow border-orange-100">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600783355700-5d2424dc013e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeWluZyUyMGJvb2tzJTIwY29mZmVlfGVufDF8fHx8MTc2MzA1NDUxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Studying"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-transparent flex items-center">
              <div className="text-white p-12 max-w-xl">
                <h3 className="text-white mb-4">Study Smarter, Not Harder</h3>
                <p className="text-white/90 mb-6">
                  Our platform is designed to maximize your learning efficiency, helping you achieve better results in less time.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl w-full">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                features: [
                  "Up to 50 flashcards",
                  "Basic spaced repetition",
                  "Mobile app access",
                  "Community support"
                ]
              },
              {
                name: "Pro",
                price: "$9",
                popular: true,
                features: [
                  "Unlimited flashcards",
                  "Advanced algorithms",
                  "Progress analytics",
                  "Priority support",
                  "Collaboration tools"
                ]
              },
              {
                name: "Team",
                price: "$29",
                features: [
                  "Everything in Pro",
                  "Team management",
                  "Shared decks",
                  "Admin dashboard",
                  "Dedicated support"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className={`p-8 h-full relative ${
                  plan.popular ? "border-orange-500 border-2 shadow-xl" : "border-gray-200"
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    plan.popular 
                      ? "bg-orange-500 hover:bg-orange-600" 
                      : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                  }`}>
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-6 bg-white">
        <div className="max-w-7xl w-full">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjI5NjUxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="space-y-8"
            >
              <motion.div {...fadeInUp} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">support@flashlearn.com</p>
                  <p className="text-gray-600">hello@flashlearn.com</p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri 9am-6pm EST</p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Learning Street</p>
                  <p className="text-gray-600">San Francisco, CA 94102</p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto px-8 py-6">
                  Send Message
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 FlashLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
