# 💜 Книжки 💜

Самостоятелна версия на библиотеката. Работи без Claude и офлайн. Всичко се пази само на устройството.

## 1. Вземи данните от Claude
В сегашния app: Настройки → Резервно копие → **Пълно копие (.zip)**. Запази файла на телефона.

## 2. Качи app-а в GitHub Pages
```
cd knizhki
git init -b main
git add .
git commit -m "Knizhki"
gh repo create knizhki --public --source=. --push
```
После в GitHub: repo → Settings → Pages → Source: **Deploy from a branch** → Branch: **main**, папка **/ (root)** → Save.
След минута app-ът е на `https://ТВОЕТО-ИМЕ.github.io/knizhki/`.

В repo-то има само кода. Книги, оценки и снимки там няма.

## 3. Сложи го на телефона
- iPhone: отвори адреса в Safari → Share → Add to Home Screen.
- Android: отвори адреса в Chrome → меню → Install app / Add to Home screen.

Иконата и името „💜 Книжки 💜“ идват сами.

## 4. Върни данните
Отвори app-а **от иконата** (на iPhone това е отделно място от Safari) → Настройки → **Възстанови от пълно копие** → избери zip файла → „Да, възстанови“.

## Важно
- Данните са само в телефона. Тегли „Пълно копие (.zip)“ редовно; без него смяна на телефона или изчистване на данните на браузъра ги изтрива.
- Двете версии не се синхронизират. След преместването ползвай само тази.
- При нова версия на index.html увеличи `VERSION` в sw.js и качи пак (`git add . && git commit -m update && git push`).
