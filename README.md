# LM Vision Monorepo

## Запуск проекта:

Фронтенд:

```
npm i
npm start
```

Параллельно в другом терминале запускай бэк:

```
node src/backend.js
```

Создай файл `.env` по примеру `.env.example`. Возьми бесплатный SMTP сервер, я брал https://www.mailersend.com/.

## Добавляем продукты и услуги

Файлы `src/data/products.json` и `src/data/services.json` не требует дополнительных пояснений. Указывать названия картинок (с расширением). Картинки класть в `src/assets/img/products`
