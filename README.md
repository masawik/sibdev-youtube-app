# тестовое задание для SibDev

**[DEMO](https://masawik.github.io/sibdev-youtube-app/)**

- логин: root
- пароль: toor

задеплоеное на github pages приложение отличается тем, что использует
```javascript
<HashRouter>
```
вместо
```javascript
<BrowserRouter>
```
---
## Суть задания
+ [ТЗ](https://github.com/masawik/sibdev-youtube-app/blob/main/%D1%82%D0%B7.md)
+ [макет Figma](https://www.figma.com/file/3tuDzbglJS6JUCGTtdOood/Sibdev-YouTube-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%E2%80%94-%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-Copy)
</br>немного дополнил проект не по тз, добавив алерты при ошибках api и при сохранении записей
---

- импровизированная БД пользователей лежит в src > redux > api > fakeServer > [users.json](https://github.com/masawik/sibdev-youtube-app/blob/main/src/redux/api/fakeServer/users.json)
- все данные о записях и пользователях которым они принадлежат хранятся в localStorage

---
Использовано:
  * react
  * react-router-dom
  * redux
  * redux-thunk
  * ant.design
  * axios

для соответствия макету перегрузил некоторые стили antd. [antdOverload.GLOBAL.css](https://github.com/masawik/sibdev-youtube-app/blob/main/src/globalCss/antdOverload.GLOBAL.css)

---

### как заводить:
- положить свой [YouTube API KEY](https://console.developers.google.com/apis/) в константу YOUTUBE_API_KEY в файле src > redux > api > [youtubeAPI.ts](https://github.com/masawik/sibdev-youtube-app/blob/main/src/redux/api/youtubeAPI.ts)
- запустить сервер
```javascript
npm run start
```

p.s. пофиксил некоторые баги уже после дедлайна. исправленный вариант в [соседней ветке](https://github.com/masawik/sibdev-youtube-app/tree/afterDeadline)
</br>
p.p.s. до сегодняшнего дня (19.02.2021) в репозитории отсутствовал файл react-app-env.d.ts изза чего typeScript ругался на css модули и не компилировал проект 😬😬😬 положил файл в основную ветку после дедлайна.
