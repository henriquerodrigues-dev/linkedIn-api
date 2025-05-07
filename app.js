const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const axios = require('axios');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Obtém as credenciais do arquivo .env
const {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  CALLBACK_URL,
  SESSION_SECRET
} = process.env;

// Configuração da estratégia LinkedIn com passport
passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_CLIENT_ID,
  clientSecret: LINKEDIN_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: ['r_basicprofile', 'email'] 
},
  function (accessToken, refreshToken, profile, done) {
    console.log('Profile:', profile);
    return done(null, { profile, accessToken });
  }
));

// Serializar e desserializar o usuário
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Configuração da sessão no Express
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Inicializar o Passport
app.use(passport.initialize());
app.use(passport.session());

// Rota de login
app.get('/auth/linkedin', passport.authenticate('linkedin'));

// Rota de callback após a autorização do LinkedIn
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), function (req, res) {
  // Aqui, o token de acesso e os dados do usuário estão disponíveis
  console.log('Acesso autorizado!');
  console.log('Token de Acesso:', req.user.accessToken); // Exibe o token de acesso
  
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ error: 'Token de acesso não encontrado.' });
  }

  res.send(`Bem-vindo ${req.user.profile.displayName}, seu token de acesso é: ${req.user.accessToken}`);
});

// Rota para obter o perfil do LinkedIn
app.get('/profile', (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
  }

  // Fazendo a requisição para obter o perfil
  axios.get('https://api.linkedin.com/v2/me', {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0'
    }
  })
    .then(response => {
      res.json(response.data); // Retorna o JSON completo do perfil
    })
    .catch(error => {
      console.error('Erro ao buscar o perfil:', error.response ? error.response.data : error);
      res.status(500).json({ error: 'Erro ao buscar o perfil.', details: error.response ? error.response.data : error });
    });
});

// Rota para obter os compartilhamentos (posts)
app.get('/shares', (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
  }

  // Fazendo a requisição para obter os compartilhamentos
  axios.get('https://api.linkedin.com/v2/shares', {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0'
    }
  })
    .then(response => {
      res.json(response.data); // Retorna os dados completos dos compartilhamentos
    })
    .catch(error => {
      console.error('Erro ao buscar os posts:', error.response ? error.response.data : error);
      res.status(500).json({ error: 'Erro ao buscar os posts.', details: error.response ? error.response.data : error });
    });
});

// Rota para exibir as rotas em uma página HTML
app.get('/routes', (req, res) => {
  const routes = [
    { method: 'GET', route: '/auth/linkedin', description: 'Inicia o login no LinkedIn' },
    { method: 'GET', route: '/auth/linkedin/callback', description: 'Callback após a autorização do LinkedIn' },
    { method: 'GET', route: '/profile', description: 'Obtém o perfil do LinkedIn do usuário autenticado' },
    { method: 'GET', route: '/shares', description: 'Obtém os compartilhamentos/posts do LinkedIn' },
  ];

  let routesHtml = '<h1>Listagem de Rotas</h1><ul>';
  routes.forEach(route => {
    routesHtml += `
      <li><strong>${route.method}</strong> - <a href="${route.route}">${route.route}</a>: ${route.description}</li>
    `;
  });
  routesHtml += '</ul>';

  res.send(routesHtml);
});

// Inicia o servidor Express na porta 3000
app.listen(3000, () => {
  console.log('App rodando na porta 3000');
});
