
##### Перед началом использования:
- `npm install`
- `git config core.hooksPath git-hooks`

##### При добавлении новых лэндингов:
Папки в корне репозиотрия должны полностью совпадать с доменом, на котором этот лэндинг будет отрабатывать, т.е. иметь вид `example.tele2.ru`
Внутри `example.tele2.ru` должна содержаться папка `src`, в которой хранятся исходники. Эта папка должна как минимум содержать файл `index.html`

Для минификации js и css в репо используется сборщик parcel. Он запускается скриптом на хук `git-precommit`. Скрипт пробегает по всем папкам, кроме `node_modules` и `git-hooks`, удаляет из них все файлы (только файлы, папки оставляет), после чего запускает сборку для каждой папки.