import * as envs from '../../env.json';

export const environment = {
  production: false,
  apiUrl: envs.apiUrl,
  apiKey: envs.apiKey,
  signUpUrl: envs.firebaseAuthRestSignup.replace('$key', envs.apiKey)
}
