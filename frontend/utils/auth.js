import Router from 'vue-router';
import * as api from './api';


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
const USER_EMAIL = 'user_email';
const PROFILE_THUMBNAIL = 'profile_thumbnail';

const FB_SCOPE = 'public_profile, email';

var router = new Router({
   mode: 'history',
});

export function login() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  }, {scope: FB_SCOPE});
}

function statusChangeCallback(response) {
  if (response.status == 'connected') {
    setTokens(response.authResponse);
    FB.api('/me', {fields: 'name,picture,email'}, function(response) {
      configureUser(response);
      const userInfo = {
        id: localStorage[ID_TOKEN_KEY],
        email: localStorage[USER_EMAIL],
        name: localStorage[USER_NAME],
        picture: localStorage[PROFILE_THUMBNAIL],
      };
      api.updateUser(userInfo);
      router.go('/trip');
    });
  } else {
    FB.login(statusChangeCallback, {scope: FB_SCOPE});
  }
}

function setTokens(authResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.accessToken);
  localStorage.setItem(ID_TOKEN_KEY, authResponse.userID);
  localStorage.setItem(TOKEN_EXPIRE, authResponse.expiresIn);
}

function configureUser(response) {
  console.log("Login response: " + response);
  localStorage.setItem(USER_NAME, response.name);
  localStorage.setItem(USER_EMAIL, response.email);
  localStorage.setItem(PROFILE_THUMBNAIL, response.picture.data.url);
}

export function logout() {
  // FIXME: logout isn't working so clear the tokens regardless of whether the callback is triggered
  clearTokens();
  router.go('/');
  FB.logout(function(response) {
    console.log("Lougout response: " + response);
    clearTokens();
    router.go('/');
  });
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

export function getUserEmail() {
  return localStorage.getItem(USER_EMAIL);
}

export function getProfileThumbnailUrl() {
  return localStorage.getItem(PROFILE_THUMBNAIL);
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
