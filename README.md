# ua-telegram-shield
*ALERT!!! We not supporting unlawful active attack or malware campaings that are causing technical harms. Use only for educational purposes. You can only try this prlatform on your own website!*

# Для кіберзахисників
1. Програми знаходяться в [релізах](https://github.com/buzzik/ua-telegram-shield/releases)
2. Вибираємо [найновший реліз](https://github.com/buzzik/ua-telegram-shield/releases/latest) і свою платформу
3. Скачуємо, розархівовуєм
4. Відкриваємо файл **.env** блокнотом
5. Iдем сюди [my.telegram.org](https://my.telegram.org/)
6. Авторизуетесь своїм аккаунтом *(або спеціально створеним)*
7. Потiм сюди [my.telegram.org/apps](https://my.telegram.org/apps)
![1647277810](https://user-images.githubusercontent.com/6613424/158256522-7378a6fa-ac27-432f-b1fc-24edc04783ad.png)
9. Заповнюєм, зберегаєм, копiюєм **api_id**  та **api_id**  до файлу **.env**, зберегаєм файл
![1647277855](https://user-images.githubusercontent.com/6613424/158256533-0e66b65b-f0e1-4e6d-8822-a9805b571bbc.png)
11. Запускаєм програму. Слiдкуєм за iнструкцiями в апцi

# Як то працює
На даний момент програма бере статичний список ватних паблiкiв та репортить їх по однiй с причин вказаных в файлi **data/report-messages/other.txt**
*(Причини краще додати свої, унiкальнi, на будь якiй мовi так буде бiльше сенсу)*.
Потiм чекає i робить то саме знову.

# Запуск без компiляцiї
1. Встановлюєм [Node.js](https://nodejs.org/en/) для вашої платформи
2. Робим:
```
git clone https://github.com/buzzik/ua-telegram-shield
cd ua-telegram-shield
npm i
```
3. Редактуєм **.env** файл так само як у гайдi вище
4. Запускаєм
```
npm start
```

