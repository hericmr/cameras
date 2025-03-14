import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';

function About() {
    const socialLinks = [
        {
            icon: <FaLinkedin className="w-6 h-6" />,
            href: "https://www.linkedin.com/in/h%C3%A9ric-moura-13ab002b3/",
            label: "LinkedIn",
            description: "Conecte-se comigo profissionalmente"
        },
        {
            icon: <FaGithub className="w-6 h-6" />,
            href: "https://github.com/hericmr",
            label: "GitHub",
            description: "Veja meus projetos e contribuições"
        },
        {
            icon: <FaGlobe className="w-6 h-6" />,
            href: "https://hericmr.github.io/me",
            label: "Portfólio",
            description: "Conheça mais sobre meu trabalho"
        },
        {
            icon: <FaEnvelope className="w-6 h-6" />,
            href: "mailto:heric.moura@unifesp.br",
            label: "Email",
            description: "heric.moura@unifesp.br"
        }
    ];

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-900 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-800">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
                        Sobre o Site
                    </h1>

                    <div className="space-y-6 text-gray-300">
                        <section className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Este site oferece uma visão ao vivo das câmeras de segurança da cidade de Santos, 
                                permitindo acompanhar condições de tráfego, clima e segurança pública em diferentes áreas. 
                                Desenvolvido para ser simples, acessível e eficiente, ele proporciona uma navegação 
                                intuitiva entre diversos pontos da cidade.
                            </p>

                            <div className="bg-gray-800 p-4 rounded-lg my-6 border border-gray-700">
                                <p className="text-lg leading-relaxed">
                                    Várias pessoas me perguntaram se eu "hackeei" as câmeras... a resposta é não! 
                                    Todos os links utilizados são públicos e não possuem restrições de acesso, como 
                                    senhas ou barreiras de segurança. Os dados das câmeras foram obtidos através de 
                                    requisições HTTPS, utilizando endpoints disponíveis na internet. Esse processo 
                                    foi realizado com automação e análise de tráfego usando Python.
                                </p>
                            </div>

                            <p className="text-lg leading-relaxed">
                                O objetivo deste projeto foi puramente educativo, permitindo que eu aprendesse a 
                                criar aplicativos com React e integrá-los a processos de automação com Python. 
                                Se você gostou e gostaria de discutir o código ou trocar ideias, entre em contato 
                                comigo através dos links abaixo:
                            </p>
                        </section>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? "_blank" : undefined}
                                    rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
                                >
                                    <div className="text-blue-400">
                                        {link.icon}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{link.label}</div>
                                        <div className="text-sm text-gray-400">{link.description}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
