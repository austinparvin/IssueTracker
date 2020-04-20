docker build -t issuetracker-image .

docker tag issuetracker-image registry.heroku.com/sdg-issue-tracker/web

docker push registry.heroku.com/sdg-issue-tracker/web

heroku container:release web -a sdg-issue-tracker