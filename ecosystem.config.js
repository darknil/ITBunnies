export default {
  apps: [
    {
      name: 'ITBunnies', // Имя приложения
      script: 'server.js', // Точка входа в приложение (обычно это файл в директории `build` или `start` если у вас TypeScript)
      cwd: './build', // Рабочая директория приложения
      instances: 'max', // Количество инстанций (можно использовать 'max' для кластерного режима)
      exec_mode: 'cluster', // Режим выполнения: 'cluster' или 'fork'
      watch: false, // Включение или отключение режима наблюдения за файлами
      env: {
        NODE_ENV: 'production', // Переменная окружения для продакшн
        PORT: 3000, // Порт, на котором запускается приложение
        HOST: 'localhost',
        LOG_LEVEL: 'info',
        APP_KEY: 'JKOryIPeW3cz7_ZZxMKG6K4IzfzU0R1P',
        SESSION_DRIVER: 'cookie',
        TZ: 'UTC', // Часовой пояс
      },
    },
  ],
}
