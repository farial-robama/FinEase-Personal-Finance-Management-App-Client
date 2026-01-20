import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@finease.com",
      link: "mailto:support@finease.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Finance Street, San Francisco, CA",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 9AM - 6PM PST",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key} is required`;
        valid = false;
      }
    });

    if (!valid) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    // Simulate sending
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we’ll get back to
            you as soon as possible.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              ✅ Message Sent!
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for contacting us. We’ll respond shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-purple-200"
                    }`}
                    disabled={isSubmitting}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-purple-200"
                    }`}
                    disabled={isSubmitting}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-purple-200"
                    }`}
                    disabled={isSubmitting}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-purple-200"
                    }`}
                    disabled={isSubmitting}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
