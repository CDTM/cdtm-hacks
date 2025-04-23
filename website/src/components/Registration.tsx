import React, { useState } from "react";
import { toast } from "sonner";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    teamPreference: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Registration submitted!", {
      description: "We'll be in touch soon. Check your email for confirmation.",
      duration: 5000,
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      experience: "",
      teamPreference: "",
    });
  };

  return (
    <section id="register" className="section-transition bg-springGray">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-springBlue mb-12">Register</h2>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-springBlue/5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="form-label">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>
                  Select your experience level
                </option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="teamPreference" className="form-label">
                Team Preference
              </label>
              <select
                id="teamPreference"
                name="teamPreference"
                value={formData.teamPreference}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>
                  Select your team preference
                </option>
                <option value="create">Create a new team</option>
                <option value="join">Join an existing team</option>
                <option value="either">Either option is fine</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-springBlue hover:bg-springBlue/90 text-white font-medium rounded-md shadow-sm transition-colors duration-200 btn-hover-effect"
            >
              Register for the Hackathon
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-springText/80">
            By registering, you agree to the event's terms and conditions.
            Registration closes one week before the event.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
