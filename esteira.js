Abaixo está um roteiro completo para uma apresentação acadêmica demonstrando GitHub Actions + CI/CD + Dependabot, 
  utilizando Node.js, JavaScript e VS Code.
  
Objetivo da Demonstração
Demonstrar:
Workflow acionado por push e pull_request.
Instalação automática de dependências.
Execução de Lint.
Execução de Testes Automatizados.
Exemplo de build aprovado.
Exemplo de build reprovado.
Pull Request bloqueado devido à falha do workflow.
Configuração do Dependabot.
Criação automática de PR de atualização de dependências.
Arquitetura da Demonstração
Plain Text
Desenvolvedor (VS Code)
│
▼
Git Push
│
▼
GitHub Repository
│
▼
GitHub Actions
├── npm install
├── ESLint
└── Jest Tests
│
├── Sucesso ✅
│ └─ Merge permitido
│
└── Falha ❌
└─ PR bloqueado
Passo 1 - Criar Projeto Node.js
No VS Code:
Shell
mkdir github-actions-demo
cd github-actions-demo
 
npm init -y
Passo 2 - Instalar Dependências
Shell
npm install
 
npm install --save-dev jest eslint
Estrutura Final
Plain Text
github-actions-demo
│
├── src
│ └── calculator.js
│
├── tests
│ └── calculator.test.js
│
├── .github
│ ├── workflows
│ │ └── ci.yml
│ │
│ └── dependabot.yml
│
├── .eslintrc.json
│
├── package.json
│
└── README.md
Passo 3 - Criar Código JavaScript
src/calculator.js
JavaScript
function sum(a, b) {
return a + b;
}
 
module.exports = { sum };
Passo 4 - Criar Teste Unitário
tests/calculator.test.js
JavaScript
const { sum } = require('../src/calculator');
 
test('Deve somar números corretamente', () => {
expect(sum(2, 3)).toBe(5);
});

Passo 5 - Configurar ESLint
.eslintrc.json
JSON
{

"env": {
"node": true,
"jest": true,
"es2021": true
},
"extends": "eslint:recommended"
}
Passo 6 - Atualizar package.json
Substitua a seção scripts por:
JSON
"scripts": {
"test": "jest",
"lint": "eslint ."
}
Exemplo:
JSON
{
"name": "github-actions-demo",
"version": "1.0.0",
"scripts": {
"test": "jest",
"lint": "eslint ."
}
}
Passo 7 - Criar Workflow GitHub Actions
Criar:
Plain Text

.github/workflows/ci.yml
Conteúdo:
YAML
name: CI Pipeline
 
on:
push:
branches:
- main
- develop
 
pull_request:
branches:
- main
 
jobs:
build:
 
runs-on: ubuntu-latest
 
strategy:
matrix:
node-version: [18.x]
 
steps:
 
- name: Checkout
uses: actions/checkout@v4
 
- name: Configurar Node.js
uses: actions/setup-node@v4
with:
node-version: ${{ matrix.node-version }}
 
- name: Instalar dependências
run: npm install
 
- name: Executar ESLint
run: npm run lint
 
- name: Executar Testes
run: npm test
Passo 8 - Primeiro Build de Sucesso
Executar:
Shell
git init
 
git add .
 
git commit -m "Primeiro workflow"
 
git branch -M main
 
git remote add origin URL_REPOSITORIO
 
git push -u origin main
Resultado esperado
GitHub → Actions
Plain Text
✅ CI Pipeline
 
✔ Checkout
✔ Setup Node
✔ npm install
✔ ESLint
✔ Tests
Slide: Build Aprovado
Mostrar captura da tela do GitHub:
Plain Text
Actions
 
CI Pipeline
 
✔ build
✔ Passed
 
Tempo: 18s
Explicação:
"Todo push dispara automaticamente uma validação de qualidade, garantindo que o código compile e os testes passem antes de chegar à branch principal."
Passo 9 - Gerar Falha no Teste
Altere:
JavaScript
function sum(a, b) {
return a - b;
}
Commit:
Shell
git add .
git commit -m "Inserindo erro proposital"
git push
Resultado
Plain Text
❌ Tests Failed
 
Expected: 5
Received: -1
Slide: Build Falhando
Exemplo da mensagem:
Plain Text
FAIL tests/calculator.test.js
 
Expected: 5
Received: -1
Explique:
O GitHub Actions interrompe a pipeline quando encontra uma falha nos testes, impedindo que código defeituoso avance para produção.
Passo 10 - Demonstrar Pull Request Bloqueado
Criar branch:
Shell
git checkout -b feature/login
Alterar código para manter erro.
Enviar:
Shell
git push origin feature/login
Abrir Pull Request.
No GitHub:
Plain Text

Some checks were not successful
 
❌ CI Pipeline
 
Merge blocked
Habilitando Branch Protection
GitHub:
Plain Text
Settings
→ Branches
→ Add Rule
Configure:
Plain Text
Branch: main
 
☑ Require a pull request before merging
 
☑ Require status checks to pass
 
CI Pipeline
Resultado mostrado no slide
Plain Text
Merge blocked
 
Required check "CI Pipeline" failed
Mensagem para apresentação:
A proteção da branch garante que apenas código validado pelos testes automatizados possa ser integrado à branch principal.
Passo 11 - Configurar Dependabot
Criar:
Plain Text
.github/dependabot.yml
Código:
YAML
version: 2
 
updates:
- package-ecosystem: "npm"
directory: "/"
schedule:
interval: "daily"
 
open-pull-requests-limit: 5
 
labels:
- dependencies
- security
Commit:
Shell
git add .
git commit -m "Configuração Dependabot"
git push
Como Forçar um PR do Dependabot
Instalar versão antiga:
Shell
npm install lodash@4.17.15
Commit:
Shell
git add .
git commit -m "Dependência vulnerável"
git push
Depois de algumas horas:
GitHub criará automaticamente:
Plain Text
Dependabot
 
Bump lodash from 4.17.15 to 4.17.21
Exemplo de Pull Request Automático
Plain Text
dependabot/npm_and_yarn/lodash-4.17.21
 
Open
 
This update fixes:
- Command Injection
- Prototype Pollution
Exemplo de Alerta de Segurança
GitHub Security:
Plain Text
1 Vulnerability Detected
 
Moderate Severity
 
lodash
Slide sobre Dependabot
Antes
Plain Text
lodash 4.17.15
Depois
Plain Text
lodash 4.17.21
Benefício
Plain Text
✔ Correção automática
✔ Atualização contínua
✔ Menos vulnerabilidades
✔ Menor esforço manual
Roteiro de Demonstração (10 minutos)
Minuto 1
Apresentar o projeto Node.js.
Minuto 2
Mostrar estrutura do repositório.
Minuto 3
Apresentar workflow YAML.
Minuto 4
Executar push.
Minuto 5
Mostrar build aprovado.
Minuto 6
Inserir erro proposital.
Minuto 7
Mostrar pipeline falhando.
Minuto 8
Abrir Pull Request bloqueado.
Minuto 9
Mostrar Branch Protection.
Minuto 10
Mostrar Dependabot criando atualização automática.
Conclusão para o Slide Final
GitHub Actions automatiza a validação de código por meio da execução de testes e verificações de qualidade a cada alteração 
  realizada. Em conjunto com a proteção de branches, impede a integração de código defeituoso. Já o Dependabot monitora 
    continuamente as dependências do projeto, identificando vulnerabilidades e criando Pull Requests automáticos para atualização, 
      fortalecendo a segurança e a confiabilidade do desenvolvimento contínuo.
As respostas referenciarão Integração contínua
devSecOpsdevSecOpsIntegração contínua
O git init do passo 8 deve ser feito em qual diretório?
O comando git init deve ser executado na pasta raiz do projeto, ou seja, dentro do diretório onde estão o package.json, a pasta src e a pasta .github.
Exemplo:

Shell
mkdir github-actions-demo
cd github-actions-demo
Após criar os arquivos do projeto:
Plain Text
github-actions-demo
│
├── .github
│ ├── workflows
│ │ └── ci.yml
│ └── dependabot.yml
│
├── src
│ └── calculator.js
│
├── tests
│ └── calculator.test.js
│
├── package.json
└── .eslintrc.json
Execute:
Shell
git init
O terminal deve estar posicionado em:
Shell
github-actions-demo/
Verifique com:
Shell
pwd
(Linux/Mac)
ou
BAT
cd
(Windows)
Depois do git init, a sequência será:
Shell
git init
 
git add .
 
git commit -m "Primeiro workflow"
 
git branch -M main
 
git remote add origin https://github.com/seu-usuario/github-actions-demo.git
 
git push -u origin main
Para a sua apresentação de GitHub Actions e DevSecOps, recomendo mostrar no VS Code que o arquivo .git foi criado na raiz do
  projeto após o git init, pois isso ajuda a explicar que o Git passa a monitorar todos os arquivos do projeto a partir daquele 
  diretório. Essa demonstração se encaixa bem antes do passo de envio para o GitHub.
Fontes utilizadas: devSecOps e devSecOps
Fontes
devSecOpsdevSecOpsIntegração contínuaHhttps://eslint.org/docs/latest/use/configure/migration-guideHhttps://eslint.org/chat/help+2
No passo 8 aparece esse erro: npm run lint shell: /usr/bin/bash -e {0}

 

 > teste-ci@1.0.0 lint

 > eslint .

 

 

 Oops! Something went wrong! :(

 

 ESLint: 10.14.0

 

 ESLint couldn't find an eslint.config.* file.

 

 From ESLint v9.0.0, the default configuration file is now eslint.config.*.

 If you are using a .eslintrc.* file, please follow the migrati
on guide

 to update your configuration file to the new format:

 

 

 

 If you still have problems after following the migration guide, please stop by

  to chat with the team.

 

 Error: Process completed with exit code 2.

 0s 0s 0s 0s

O erro não está no GitHub Actions. O problema é que você criou um arquivo .eslintrc.json, mas a versão instalada no runner é o ESLint 9 ou superior, 
  que passou a exigir eslint.config.js (Flat Config). O lint é uma das verificações executadas pelo pipeline de CI.
Solução mais rápida para sua apresentação
Substitua o arquivo:
Plain Text

.eslintrc.json
por:
Plain Text
eslint.config.js
Conteúdo:

JavaScript
module.exports = [
{
files: ["**/*.js"],
languageOptions: {
ecmaVersion: "latest",
sourceType: "commonjs"
},
rules: {
}
}
];
Instale o ESLint corretamente
No terminal:
Shell
npm install --save-dev eslint
Verifique se o package.json possui:
JSON
"scripts": {
"lint": "eslint .",
"test": "jest"
}
Teste localmente antes do push
Execute:
Shell
npm run lint
Resultado esperado:
Plain Text
> eslint .
Sem erros.
Depois:
Shell
npm test
Resultado:
Plain Text
PASS tests/calculator.test.js
Alternativa mais simples para a demonstração
Como o objetivo da sua apresentação é demonstrar o GitHub Actions, você pode substituir temporariamente o ESLint por um 
  script simples de lint, exatamente como descrito no material da demonstração.
Crie:
Plain Text
scripts/lint.js
JavaScript
console.log("Executando verificação de lint...");
process.exit(0);
No package.json:
JSON
"scripts": {
"lint": "node ./scripts/lint.js",
"test": "jest"
}
Assim o passo de lint sempre passa e você consegue focar na demonstração de:
Build passando ✅
Build falhando ❌
Pull Request bloqueado 🔒
Dependabot 🤖
conforme o roteiro do seu trabalho.
O que eu recomendo
Para uma apresentação acadêmica de 10 minutos, use a solução do scripts/lint.js. Ela é mais estável e evita problemas de
  compatibilidade entre versões do ESLint no GitHub Runner. Depois que toda a pipeline estiver funcionando, você pode trocar 
    para o ESLint real se o professor exigir análise estática de código.
