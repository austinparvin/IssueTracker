docker build -t IssueTracker-image .

docker tag IssueTracker-image registry.heroku.com/IssueTracker/web


docker push registry.heroku.com/IssueTracker/web

heroku container:release web -a IssueTracker