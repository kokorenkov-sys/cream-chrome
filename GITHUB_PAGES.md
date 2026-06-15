# GitHub Pages deploy

Сайт подготовлен для публикации из папки `docs`.

## Вариант через интерфейс GitHub

1. Создайте репозиторий на GitHub.
2. Загрузите в него содержимое проекта, включая папку `docs`.
3. Откройте `Settings` -> `Pages`.
4. В блоке `Build and deployment` выберите:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/docs`
5. Нажмите `Save`.

После публикации сайт будет доступен по адресу вида:

`https://USERNAME.github.io/REPOSITORY/`

## Важно

Файл `docs/.nojekyll` нужен, чтобы GitHub Pages отдавал сайт как обычную статику.
