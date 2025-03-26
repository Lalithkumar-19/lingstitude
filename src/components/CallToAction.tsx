import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // dynamically update input value based on name attribute
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/user/registration", formData);
      if (res.status === 200) {
        toast({
          title: "Registration Successful",
          description: "You have successfully reserved your seat!",
        });
        setFormData({ fullName: "", email: "", phoneNumber: "" }); // Reset form on success
      } else {
        toast({
          title: "Registration Failed",
          description:
            res.data.msg || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Error",
        description: "Failed to register. Please try again later.",
      });
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-3xl bg-brand-600 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-brand-700 to-brand-500 clip-polygon"
            aria-hidden="true"
          ></div>
          <div className="absolute w-full h-full top-0 left-0 opacity-10">
            <div className="absolute top-0 left-[10%] w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 px-6 py-16 md:p-16 lg:p-20 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Ready to Advance Your Career with English?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-lg">
                  Join thousands of professionals who have accelerated their
                  careers with our specialized English communication programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/+9492022599"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-brand-700 hover:bg-white/90 font-medium"
                    >
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/+9492022599"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-brand-500 border-white text-white hover:bg-white/10 font-medium"
                    >
                      Book a Webinar
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg animate-fade-up [animation-delay:200ms]">
                <h3 className="text-xl font-semibold mb-4">
                  Want to Book Your Seat
                </h3>
                <p className="text-white/80 mb-6">
                  "English Communication Strategies for Job Interviews" &mdash;
                  Live session with career experts
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="sr-only" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-brand-700 hover:bg-white/90"
                  >
                    Reserve Your Seat
                  </Button>
                  <p className="text-xs text-white/60 text-center">
                    Limited spots available. We'll send you the details via
                    email.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
