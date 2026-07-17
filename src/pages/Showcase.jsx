import React, { useState } from "react";
import { Button, ButtonSkeleton, Input, InputSkeleton, Select, SelectSkeleton } from "../components";

const Showcase = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        category: "",
        status: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-page-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink-black mb-8">
          Component Showcase
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Demonstration of Glitch Blog UI components following the Design System
        </p>

        {/* Form Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-ink-black mb-6">
            Interactive Components
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={formData.name === "" && !loading}
                helperText={formData.name === "" && !loading ? "This field is required" : ""}
              />
            </div>
            <div className="space-y-3">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={formData.email === "" && !loading}
                helperText={formData.email === "" && !loading ? "Please enter a valid email" : ""}
              />
            </div>
            <div className="space-y-3">
              <Select
                label="Category"
                options={["Web", "App", "AI", "Data", "Design", "Other"]}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                error={formData.category === "" && !loading}
                helperText={formData.category === "" && !loading ? "Please select a category" : ""}
              />
            </div>
            <div className="space-y-3">
              <Select
                label="Status"
                options={["Published", "draft", "Pending", "Archived"]}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                error={formData.status === "" && !loading}
                helperText={formData.status === "" && !loading ? "Please select a status" : ""}
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Submitting..." : "Submit Form"}
              </Button>
            </div>
          </form>
        </section>

        {/* Skeleton Loaders Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-ink-black mb-6">
            Loading States (Skeletons)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Input Skeleton</h3>
              <div className="space-y-4">
                <InputSkeleton className="w-full" />
                <InputSkeleton className="w-full" />
                <InputSkeleton className="w-full" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Select Skeleton</h3>
              <div className="space-y-4">
                <SelectSkeleton className="w-full" />
                <SelectSkeleton className="w-full" />
                <SelectSkeleton className="w-full" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Button Skeleton</h3>
              <div className="space-y-4">
                <ButtonSkeleton variant="primary" size="large" className="w-full" />
                <ButtonSkeleton variant="secondary" size="large" className="w-full" />
                <ButtonSkeleton variant="outline" size="large" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Component Variants Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-ink-black mb-6">
            Component Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Button Variants</h3>
              <div className="grid gap-3">
                <Button variant="primary" size="small">Primary Small</Button>
                <Button variant="primary" size="medium">Primary Medium</Button>
                <Button variant="primary" size="large">Primary Large</Button>

                <Button variant="secondary" size="small">Secondary Small</Button>
                <Button variant="secondary" size="medium">Secondary Medium</Button>
                <Button variant="secondary" size="large">Secondary Large</Button>

                <Button variant="outline" size="small">Outline Small</Button>
                <Button variant="outline" size="medium">Outline Medium</Button>
                <Button variant="outline" size="large">Outline Large</Button>

                <Button variant="ghost" size="small">Ghost Small</Button>
                <Button variant="ghost" size="medium">Ghost Medium</Button>
                <Button variant="ghost" size="large">Ghost Large</Button>

                <Button variant="danger" size="small">Danger Small</Button>
                <Button variant="danger" size="medium">Danger Medium</Button>
                <Button variant="danger" size="large">Danger Large</Button>

                <Button variant="success" size="small">Success Small</Button>
                <Button variant="success" size="medium">Success Medium</Button>
                <Button variant="success" size="large">Success Large</Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Input Variants</h3>
              <div className="space-y-4">
                <Input label="Default Input" placeholder="Default input" />
                <Input
                  label="Input with Error"
                  placeholder="Error state"
                  error
                  helperText="This is an error message"
                />
                <Input
                  label="Input with Helper Text"
                  placeholder="Helper text"
                  helperText="This is helpful information"
                />
                <Input
                  label="Disabled Input"
                  placeholder="Disabled input"
                  disabled
                />
                <Input
                  label="Input with Icon"
                  placeholder="With left icon"
                  leftIcon={<span className="text-glitch-magenta">👤</span>}
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink-black mb-4">Select Variants</h3>
              <div className="space-y-4">
                <Select
                  label="Default Select"
                  options={["Option 1", "Option 2", "Option 3"]}
                />
                <Select
                  label="Select with Error"
                  options={["Option 1", "Option 2", "Option 3"]}
                  error
                  helperText="Please make a selection"
                />
                <Select
                  label="Select with Helper Text"
                  options={["Option 1", "Option 2", "Option 3"]}
                  helperText="Choose an option from the list"
                />
                <Select
                  label="Disabled Select"
                  options={["Option 1", "Option 2", "Option 3"]}
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Design Tokens Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-ink-black mb-6">
            Design Tokens Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-[var(--radius-card)] border-2 border-border shadow-brutal">
              <h3 className="text-2xl font-bold text-ink-black mb-4">Color System</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-accent/20 rounded-[var(--radius-button)] flex items-center justify-center">
                    <span className="text-primary-accent">■</span>
                  </div>
                  <span className="font-mono text-primary-text">Primary Accent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface-hover rounded-[var(--radius-button)] flex items-center justify-center border border-border">
                    <span className="text-primary-text">■</span>
                  </div>
                  <span className="font-mono text-primary-text">Surface</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/20 rounded-[var(--radius-button)] flex items-center justify-center">
                    <span className="text-success">■</span>
                  </div>
                  <span className="font-mono text-primary-text">Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-danger/20 rounded-[var(--radius-button)] flex items-center justify-center">
                    <span className="text-danger">■</span>
                  </div>
                  <span className="font-mono text-primary-text">Danger</span>
                </div>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-[var(--radius-card)] border-2 border-border shadow-brutal">
              <h3 className="text-2xl font-bold text-ink-black mb-4">Spacing System (8pt Grid)</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">4px (spacing-4)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">8px (spacing-8)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">12px (spacing-12)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">16px (spacing-16)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">24px (spacing-24)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-primary-accent rounded-[var(--radius-input)] shrink-0" />
                  <span className="font-mono text-[12px] text-primary-text">32px (spacing-32)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Showcase;