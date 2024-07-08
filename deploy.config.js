module.exports = {
    apps: [
      {
        name: 'jcwd030801-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 3081,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd030801.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwd030801-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 3181,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd030801.purwadhikabootcamp.com/apps/api',
      },
    ],
   };