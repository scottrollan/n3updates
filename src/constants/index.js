const sanityClient = require('@sanity/client');
export const Client = sanityClient({
  projectId: 'ogg4t6rs',
  dataset: 'production',
  token: process.env.REACT_APP_API_KEY,
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});
