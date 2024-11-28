import React from 'react';
import './Portifolio.css';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import headerImage from './assets/header-image.jpg'; // Caminho corrigido para a imagem
import './Header.css';

export function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">Bem-vindo ao PinkPixel</h1>
                <p className="header-description">Explore as últimas novidades e tendências do mundo da Tecnologia</p>
            </div>
        </header>
    );
}

const Portifolio = () => {
    const socialLinks = [
        { href: 'https://www.linkedin.com/in/seu-perfil', icon: <FaLinkedin />, label: 'LinkedIn' },
        { href: 'https://github.com/seu-usuario', icon: <FaGithub />, label: 'GitHub' },
        { href: 'https://instagram.com/seu-perfil', icon: <FaInstagram />, label: 'Instagram' },
        { href: 'mailto:seu-email@example.com', icon: <FaEnvelope />, label: 'E-mail' },
    ];

    const projects = [
        { title: 'Projeto 1', description: 'Descrição do projeto 1', link: '#' },
        { title: 'Projeto 2', description: 'Descrição do projeto 2', link: '#' },
        { title: 'Projeto 3', description: 'Descrição do projeto 3', link: '#' },
    ];

    return (
        <div className="portfolio-page">
            {/* Seção de Introdução */}
            <header className="portfolio-header">
                <img src={headerImage} alt="Imagem do cabeçalho" className="header-image" />
                <div className="header-text">
                    <h1>Maiara Abreu da Silva</h1>
                    <p>
                        Estudante de Analise e Desenvolvimento de Sistemas, trainee de suporte Técnico
                    </p>
                    <p>
                        Completamente sem experiência na área da tecnologia, começou esta faculdade na esperança de ficar rica. 
                        Estas esperanças estão à beira da morte após receber seu primeiro salário como Trainee de suporte Técnico.
                    </p>
                </div>
            </header>

            {/* Projetos em Destaque */}
            <section className="portfolio-projects">
                <h2>Meus Projetos</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Ver Projeto
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Links de Redes Sociais */}
            <footer className="portfolio-footer">
                <h2>Conecte-se comigo</h2>
                <div className="social-links">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default Portifolio;
