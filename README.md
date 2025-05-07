<h1>🚀 Integração com LinkedIn usando Node.js + Express</h1>

<p>Este é um projeto Node.js utilizando Express para autenticação com o LinkedIn via OAuth 2.0 e para consumo da API da plataforma. Ele permite autenticação de usuários, consulta de perfil, postagens (<code>UGC Posts</code>) e compartilhamentos (<code>Shares</code>).</p>

<h2>📦 Bibliotecas utilizadas</h2>

<ul>
  <li><a href="https://www.npmjs.com/package/express">express</a> – Framework para servidor HTTP</li>
  <li><a href="https://www.npmjs.com/package/passport">passport</a> – Middleware de autenticação</li>
  <li><a href="https://www.npmjs.com/package/passport-linkedin-oauth2">passport-linkedin-oauth2</a> – Estratégia do LinkedIn para Passport</li>
  <li><a href="https://www.npmjs.com/package/express-session">express-session</a> – Gerenciamento de sessão</li>
  <li><a href="https://www.npmjs.com/package/axios">axios</a> – Cliente HTTP para chamadas à API do LinkedIn</li>
  <li><a href="https://www.npmjs.com/package/dotenv">dotenv</a> – Carregamento de variáveis de ambiente</li>
</ul>

<h2>🔧 Instalação</h2>

<ol>
  <li>Clone o repositório:<br/>
    <pre><code>git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio</code></pre>
  </li>

  <li>Instale as dependências:<br/>
    <pre><code>npm install</code></pre>
  </li>

  <li>Crie um arquivo <code>.env</code> com as seguintes variáveis:<br/>
    <pre><code>LINKEDIN_CLIENT_ID=SuaClientIdAqui
LINKEDIN_CLIENT_SECRET=SeuClientSecretAqui
CALLBACK_URL=http://localhost:3000/auth/linkedin/callback
SESSION_SECRET=uma_chave_secreta</code></pre>
  </li>

  <li>Inicie o servidor:<br/>
    <pre><code>node app.js</code></pre>
  </li>
</ol>

<h2>🌐 Endpoints disponíveis</h2>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>GET</td><td><code>/</code></td><td>Página com listagem de rotas</td></tr>
    <tr><td>GET</td><td><code>/auth/linkedin</code></td><td>Inicia login com o LinkedIn</td></tr>
    <tr><td>GET</td><td><code>/auth/linkedin/callback</code></td><td>Callback após autorização</td></tr>
    <tr><td>GET</td><td><code>/profile</code></td><td>Retorna dados do perfil autenticado</td></tr>
    <tr><td>GET</td><td><code>/profileSummary</code></td><td>Retorna nome, título e foto do perfil</td></tr>
    <tr><td>GET</td><td><code>/getPosts</code></td><td>Retorna os posts (UGC Posts) do usuário</td></tr>
    <tr><td>GET</td><td><code>/allPosts</code></td><td>Retorna todos os compartilhamentos (Shares)</td></tr>
  </tbody>
</table>

<h2>🛑 Observações</h2>

<ul>
  <li>As <strong>chaves de API</strong> (Client ID e Secret) <strong>não devem ser expostas</strong>. Mantenha o arquivo <code>.env</code> fora do versionamento (<code>.gitignore</code>).</li>
  <li>A API do LinkedIn exige permissões específicas para acessar alguns dados. Verifique se sua aplicação foi aprovada e tem os escopos corretos.</li>
</ul>

<p>Feito por <a href="https://github.com/henriquerodrigues-dev">Henrique Rodrigues</a></p>
