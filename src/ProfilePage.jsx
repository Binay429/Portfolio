import React, { useState } from "react";
import profilePhoto from "./profilePhoto.jpg";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaDownload,
  FaCode,
  FaServer,
  FaTools,
} from "react-icons/fa"; 

import { jsPDF } from "jspdf";

const skillsData = {
  frontend: [
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "Next.js", level: 70 },
    { name: "CSS", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 70 },
    { name: "Express.js", level: 65 },
  ],
  tools: [
    { name: "Git/GitHub", level: 85 },
    { name: "Figma", level: 70 },
  ],
};

const projectsData = [
  {
    title: "Portfolio Website",
    image: "https://via.placeholder.com/400x200?text=Portfolio",
    description:
      "A modern portfolio site with animations, profile, and projects.",
    tech: ["React", "CSS", "Figma"],
    link: "https://www.figma.com/design/BT4312vjMAELGLz7s57Wyu/Portfolio-Design--Community-?m=auto&t=y8rZ0RUepyVkQrnJ-6",
  },
  {
    title: "Easy Pay",
    image: "https://via.placeholder.com/400x200?text=Easy+Pay",
    description: "Web site design of Easy pay.",
    tech: ["Figma,html,css"],
    link: "https://www.figma.com/design/XyqrdFXF9sI3b7ReW675je/Binay_Chaudhary?m=auto&t=y8rZ0RUepyVkQrnJ-6",
  },
  {
    title: "Smart Monitoring System",
    image: "https://via.placeholder.com/400x200?text=Tinkercard",
    description:
      "Monitors if there is pollution in the air, it checks temperature, humidity, and air quality.",
    tech: ["Tinkercard"],
    link: "https://www.tinkercad.com/things/h7NlOyc6hn5-air-quality-monitoring-system",
  },
];

const socials = [
  { icon: <FaGithub />, url: "https://github.com/Binay429" },
  { icon: <FaTwitter />, url: "https://twitter.com/Binay429" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/binay-chaudhary-" },
  { icon: <FaEnvelope />, url: "mailto:binay@example.com" },
];

export default function ProfilePage() {
  const [dark, setDark] = useState(true);
  const [profileImg, setProfileImg] = useState(null);

  const themeBg = dark ? "#18122B" : "#f6f6f6";
  const themeText = dark ? "#fff" : "#222";
  const themeAccent = dark ? "#6C63FF" : "#6C63FF";

  const categoryIcons = {
    frontend: <FaCode />,
    backend: <FaServer />,
    tools: <FaTools />,
  };

  // Handle profile upload
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImg(reader.result);
    reader.readAsDataURL(file);
  };

  // Simple form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (You can connect this to EmailJS or backend)");
  };

  // Dynamic PDF Resume download
  const downloadResume = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Binay Chaudhary", 20, 20);
    doc.setFontSize(16);
    doc.text(
      "Aspiring web designer with a passion for front-end development and UI/UX design.",
      20,
      40
    );

    doc.text("Skills:", 20, 60);
    let y = 70;
    Object.entries(skillsData).forEach(([category, skills]) => {
      doc.text(`${category.toUpperCase()}:`, 20, y);
      y += 10;
      skills.forEach((s) => {
        doc.text(`• ${s.name} (${s.level}%)`, 30, y);
        y += 10;
      });
    });

    doc.text("Experience:", 20, y + 10);
    doc.text(
      "Freelance Web Designer – Self-initiated projects in 2023 – Present",
      30,
      y + 20
    );

    doc.save("Binay_Chaudhary_Resume.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeBg,
        color: themeText,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          background: themeAccent,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Portfolio</div>
        <nav>
          <a href="#about" style={{ margin: "0 1rem", color: themeText }}>
            About
          </a>
          <a href="#skills" style={{ margin: "0 1rem", color: themeText }}>
            Skills
          </a>
          <a href="#projects" style={{ margin: "0 1rem", color: themeText }}>
            Projects
          </a>
          <a href="#experience" style={{ margin: "0 1rem", color: themeText }}>
            Experience
          </a>
          <a href="#contact" style={{ margin: "0 1rem", color: themeText }}>
            Contact
          </a>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
          style={{
            background: "none",
            border: "none",
            color: themeText,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      {/* About Section */}
      <section
        id="about"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          padding: "4rem 2rem",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 35px rgba(0,0,0,0.3)",
            border: `4px solid ${themeAccent}`,
            position: "relative",
          }}
        >
          <img
            src={profileImg || profilePhoto}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </div>

        {/* About Text */}
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Hi, I'm{" "}
            <span style={{ color: themeAccent, fontWeight: "bold" }}>
              Binay Chaudhary
            </span>
          </h1>
          <h3 style={{ marginBottom: "1rem", opacity: 0.9 }}>
            Full Stack Developer
          </h3>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            Hi, I’m Binay Chaudhary, a passionate Web Developer who loves
            turning ideas into interactive, user-friendly digital experiences.
            I specialize in building responsive websites and modern web
            applications using JavaScript, React, and Node.js, with a strong
            focus on clean code, performance, and scalability.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="#projects"
              style={{
                padding: "0.8rem 1.5rem",
                background: themeAccent,
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              View My Projects
            </a>
            <a
              href="#contact"
              style={{
                padding: "0.8rem 1.5rem",
                border: `2px solid ${themeAccent}`,
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: "bold",
                color: themeAccent,
                background: "transparent",
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ maxWidth: 900, margin: "3rem auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>⚡ Skills</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              style={{
                background: dark
                  ? "linear-gradient(135deg, #2a2344, #1b1532)"
                  : "#fff",
                padding: "1.5rem",
                borderRadius: 16,
                boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                {categoryIcons[category]} {category.toUpperCase()}
              </h3>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>{s.name}</span>
                    <span>{s.level}%</span>
                  </div>
                  <div
                    style={{
                      background: dark ? "#302b50" : "#eee",
                      borderRadius: 8,
                      height: 10,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${s.level}%`,
                        background:
                          "linear-gradient(90deg, #6C63FF, #8A79FF, #B49CFF)",
                        height: "100%",
                        transition: "width 0.7s ease-in-out",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ maxWidth: 900, margin: "2rem auto" }}>
        <h2 style={{ textAlign: "center" }}>Projects</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {projectsData.map((p, i) => (
            <div
              key={i}
              style={{
                width: 300,
                background: dark ? "#28243d" : "#fff",
                padding: "1rem",
                borderRadius: 12,
                boxShadow: "0 4px 20px #0002",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Tech: {p.tech.join(", ")}
              </p>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  background: themeAccent,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 700, margin: "2rem auto" }}>
        <h2 style={{ textAlign: "center" }}>Experience </h2>
        <div>
          <h3>Web Developer </h3>
          <p style={{ fontSize: "0.95rem" }}>
            Freelance Web Designer – Self-initiated projects in 2023 – Present.
            Designed and developed responsive websites using HTML, CSS, and
            JavaScript. Built 3 portfolio websites for personal practice,
            focusing on UI/UX design principles. Created layouts and graphics
            using Figma.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          maxWidth: 700,
          margin: "3rem auto",
          padding: "2rem",
          background: dark ? "#28243d" : "#fff",
          borderRadius: 12,
          boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Let’s Connect 🚀
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            style={{
              padding: "0.8rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={{
              padding: "0.8rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="Your Message"
            required
            rows="5"
            style={{
              padding: "0.8rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              background: themeAccent,
              color: themeText,
              padding: "0.8rem",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.2rem",
            marginTop: "2rem",
          }}
        >
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1.6rem",
                color: dark ? "#fff" : "#222",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {s.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          marginTop: "2rem",
          fontSize: "0.9rem",
        }}
      >
        © 2025 | Built with ❤️ using React
      </footer>
    </div>
  );
}
