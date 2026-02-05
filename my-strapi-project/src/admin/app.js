const config = {
  locales: [
    'en', // keep English
  ],

  head: {
    title: 'Honeshwar Store',
    meta: [
      {
        name: 'description',
        content: 'CMS for Honeshwar Store website',
      },
    ],
  },

  auth: {
    logo: null, // or '/logo.png'
  },

  menu: {
    logo: null, // or '/logo.png'
  },

  tutorials: false,
  notifications: {
    releases: false,
  },
};

const bootstrap = () => {
  console.log('Admin panel loaded');
};

export default {
  config,
  bootstrap,
};
