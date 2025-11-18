import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaVideo } from 'react-icons/fa';
import cameras from '../assets/cameras.json';
import { formatCurrentDate } from '../utils/dateFormatter';

function About() {
    const totalCameras = Object.keys(cameras).length;
    const currentDate = formatCurrentDate();
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
                        {/* Estatísticas */}
                        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-gray-700 mb-6">
                            <div className="flex items-center justify-center space-x-4">
                                <FaVideo className="text-blue-400 text-3xl" />
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">{totalCameras}</div>
                                    <div className="text-sm text-gray-300 mt-1">Câmeras Disponíveis</div>
                                    <div className="text-xs text-gray-400 mt-2">{currentDate}</div>
                                </div>
                            </div>
                        </div>

                        <section className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Este site oferece uma visão ao vivo das câmeras de segurança da cidade de Santos, 
                                permitindo acompanhar condições de tráfego, clima e segurança pública em diferentes áreas. 
                                Desenvolvido para ser simples, acessível e eficiente, ele proporciona uma navegação 
                                intuitiva entre diversos pontos da cidade. Atualmente, o sistema monitora <strong className="text-white">{totalCameras} câmeras</strong> em tempo real ({currentDate}).
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
