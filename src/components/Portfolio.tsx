import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiMenu, FiX, FiMail, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { Sun, Moon } from "react-feather";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/devops-hero.jpg";
import cloudNetwork from "@/assets/cloud-network.jpg";

// Import data from separate files
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { personal } from "@/data/personal";

interface PortfolioProps {
  className?: string;
}

export default function Portfolio({ className }: PortfolioProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Theme: initialize from storage/system
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const enableDark = saved ? saved === "dark" : prefersDark;
      setIsDark(enableDark);
    } catch {}
  }, []);

  // Theme: apply class and persist
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  // Smooth scattered bubble click effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;

      // Create multiple scattered bubbles for better effect
        const bubbleCount = Math.floor(Math.random() * 3) + 2; // 2-4 bubbles
        
        for (let i = 0; i < bubbleCount; i++) {
          const bubble = document.createElement("div");
          bubble.className = "pointer-events-none absolute rounded-full z-50";
          
          const size = Math.floor(Math.random() * 15) + 8; // 8-22px
          const x = e.clientX;
          const y = e.clientY;
          
           const colors = [
            "rgba(255, 107, 107, 0.7)", // Red
            "rgba(54, 162, 235, 0.7)",  // Blue
            "rgba(255, 206, 84, 0.7)",  // Yellow
            "rgba(75, 192, 192, 0.7)",  // Teal
            "rgba(153, 102, 255, 0.7)", // Purple
            "rgba(255, 159, 64, 0.7)",  // Orange
            "rgba(199, 199, 199, 0.7)", // Grey
            "rgba(83, 102, 255, 0.7)",  // Indigo
            "rgba(255, 99, 132, 0.7)",  // Pink
            "rgba(54, 235, 162, 0.7)",  // Green
          ];
          
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${x - size / 2}px`;
          bubble.style.top = `${y - size / 2}px`;
          bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
          bubble.style.position = "fixed";
          bubble.style.opacity = "0.8";
          bubble.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        
        document.body.appendChild(bubble);
        
        // Animate bubble
        setTimeout(() => {
          bubble.style.opacity = "0";
          bubble.style.transform = `scale(2) translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
        }, 50);
        
        setTimeout(() => bubble.remove(), 850);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDark]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, any[]>, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className={`min-h-screen transition-smooth ${isDark ? 'bg-background text-foreground' : 'bg-white text-black'} ${className}`} data-theme={isDark ? 'dark' : 'light'}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              {personal.name} — {personal.title}
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {personal.navigation.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-smooth hover:text-primary capitalize ${
                    activeSection === section ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {section}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsDark(!isDark)}
                variant="outline"
                size="icon"
                className="hidden sm:inline-flex"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden"
              >
                <FiMenu />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-card shadow-elegant z-50 p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-lg">Menu</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiX />
              </Button>
            </div>
            
            <nav className="flex flex-col gap-4">
              {personal.navigation.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:text-primary transition-smooth capitalize"
                >
                  {section}
                </a>
              ))}
              
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  onClick={() => setIsDark(!isDark)}
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="about" className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {personal.subtitle}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {personal.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button variant="hero" size="lg" asChild>
                  <a href="#projects">View My Work</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Get In Touch</a>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={personal.social.github} target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${personal.email}`}>
                    <FiMail />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={heroImage} 
                  alt="DevOps workspace with multiple monitors showing code and infrastructure" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 gradient-hero opacity-20"></div>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Core Technologies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(Object.entries(skillsByCategory) as [string, any[]][]).map(([category, categorySkills]) => (
                <Card key={category} className="gradient-card hover-scale glow-on-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categorySkills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2">
                        {skill.name}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">
              Infrastructure and automation solutions I've architected and implemented
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-card hover-scale glow-on-hover transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge 
                        variant={project.status === "production" ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool, idx) => (
                        <Badge key={idx} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" asChild className="w-full">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiGithub />
                        View Source Code
                        <FiExternalLink className="ml-auto" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-xl text-muted-foreground">
              Building and scaling infrastructure across diverse environments
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="shadow-card hover-scale transition-smooth">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-xl">{exp.role}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="mt-2 sm:mt-0">
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    {exp.achievements && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                          Key Achievements
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary font-bold">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Let's Work Together</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Looking for <span className="text-primary font-semibold">DevOps expertise</span>? I specialize in building robust CI/CD pipelines, 
                scalable infrastructure, and modern web applications.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-primary text-xl">🚀</span>
                  <div>
                    <h4 className="font-semibold text-foreground">DevOps & Cloud Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">CI/CD pipelines, Kubernetes, Docker, Terraform, AWS/Azure cloud architecture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-primary text-xl">💻</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Modern Web Development</h4>
                    <p className="text-sm text-muted-foreground">React, TypeScript, Node.js, responsive designs, and seamless user experiences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-primary text-xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-foreground">End-to-End Deployment</h4>
                    <p className="text-sm text-muted-foreground">From code to production - automated testing, monitoring, and zero-downtime deployments</p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-card mb-8">
                {/* <img 
                  src={cloudNetwork} 
                  alt="Abstract cloud infrastructure network visualization" 
                  className="w-full h-48 object-cover"
                /> */}
                <div className="absolute inset-0 gradient-hero opacity-40"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary" />
                  <span>alex.rodriguez@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiLinkedin className="text-primary" />
                  <span>linkedin.com/in/alexrodriguez</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiGithub className="text-primary" />
                  <span>github.com/alexrodriguez</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    I typically respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Tell me about your project or infrastructure challenges..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 Masanta Mrutyunjay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
