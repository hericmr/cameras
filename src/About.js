import React from 'react';

function About() {
    return (
        <div className="max-w-4xl mx-auto p-6"><center>
            <h1 className="text-3xl font-bold text-center mb-4">Sobre o Site</h1>
            <p className="text-lg leading-relaxed text-gray-200 mb-4">
                Este site oferece uma visão ao vivo das câmeras de segurança da cidade de Santos, permitindo acompanhar condições de tráfego, clima e segurança pública em diferentes áreas. Desenvolvido para ser simples, acessível e eficiente, ele proporciona uma navegação intuitiva entre diversos pontos da cidade.
            </p>
            <p className="text-lg leading-relaxed text-gray-200 mb-4">
                Várias pessoas me perguntaram se eu "hackeei" as câmeras... a resposta é não! Todos os links utilizados são públicos e não possuem restrições de acesso, como senhas ou barreiras de segurança.                Os dados das câmeras foram obtidos através de requisições HTTPS, utilizando endpoints disponíveis na internet. Esse processo foi realizado com automação e análise de tráfego usando Python.
            </p>
            <p className="text-lg leading-relaxed text-gray-200 mb-4">
                O objetivo deste projeto foi puramente educativo, permitindo que eu aprendesse a criar aplicativos com React e integrá-los a processos de automação com Python. Se você gostou e gostaria de discutir o código ou trocar ideias, entre em contato comigo pelo e-mail:
            </p>
            <p className="text-lg font-semibold text-gray-200">
                <a href="mailto:heric.moura@unifesp.br" className="text-blue-600 hover:underline">heric.moura@unifesp.br</a>
            </p>
            <p className="text-lg leading-relaxed text-gray-200 mb-4">
                Você também pode me encontrar no LinkedIn ou explorar meu portfólio pessoal:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700">
                <li>
                    <a href="https://www.linkedin.com/in/h%C3%A9ric-moura-13ab002b3/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Meu LinkedIn
                    </a>
                </li>
                <li>
                    <a href="https://github.com/hericmr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="https://hericmr.github.io/me" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Portifólio
                    </a>
                </li>
                
            </ul></center>
        </div>
    );
}

export default About;
