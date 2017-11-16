import Router from 'vue-router';

window.fbAsyncInit = function() {
  FB.init({
    appId            : '138446110126260',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const TOKEN_EXPIRE = 'token_expire';
const USER_NAME = 'user_name';
const USER_PICTURE = 'user_picture';

var router = new Router({
   mode: 'history',
});

export function login() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  }, {scope: 'public_profile'});
}

function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  if (response.status == 'connected') {
    setTokens(response.authResponse);
    FB.api('/me', {fields: 'name,picture'}, function(response) {
      configureUser(response);
      router.go('/trip');
    });
  } else {
    FB.login(statusChangeCallback, {scope: 'public_profile, email'});
  }
}

function setTokens(authResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.accessToken);
  localStorage.setItem(ID_TOKEN_KEY, authResponse.userID);
  localStorage.setItem(TOKEN_EXPIRE, authResponse.expiresIn);
}

function configureUser(response) {
  console.log('Successful login for: ' + response.name);
  localStorage.setItem(USER_NAME, response.name);
  localStorage.setItem('response', response);
  localStorage.setItem(USER_PICTURE, response.picture.data.url);
}

export function logout() {
  clearTokens();
  FB.logout();
  router.go('/');
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUserName() {
  return localStorage.getItem(USER_NAME);
}

export function getUserPicture() {
  // console.log(localStorage.getItem('response'));
  // return localStorage.getItem('response');
  return localStorage.getItem(USER_PICTURE);
}

function getTokenExpirationDate() {
  return localStorage.getItem(TOKEN_EXPIRE);
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRE);
  localStorage.removeItem(USER_NAME);
}

export function isLoggedIn() {
  const accessToken = getAccessToken();
  // TODO: check isTokenExpired()
  return !!accessToken;
}

// TODO: bugged
function isTokenExpired() {
  const date = getTokenExpirationDate();
  const now = new Date();

  console.log(date + " now: " + now);
  return getTokenExpirationDate() < new Date();
}