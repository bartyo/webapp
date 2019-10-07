# Contributing to this project

If you are reading this, there's a big chance you want to contribute as a developer and you are not very experienced. A **Great Advice** is: read everything before you start doing anything. If you have any questions file an issue [here](https://github.com/ProjSante/webapp/issues/new?assignees=&labels=&template=bug_report.md&title=%5B+%3Abug%3A+%5D+-+) and try to explain with as much details as you can.

## Feature Request

> Do you want the project to :sparkles:? Fill in a feature request so we can make it even more awesome :rocket:

* Just before you do it, checkout if it does not already exist.

Go to [Get Started](https://github.com/ProjSante/webapp/issues/new/choose) on Feature request.


## Bug Repport

> Is there any issues whe using our product? File a :bug: repport so we can fix it :clap:

* Just before you do it, checkout if it does not already exist.

Choose [Get Started](https://github.com/ProjSante/webapp/issues/new/choose) on **Bug repport** and detail as much as you can the problem so we're able to reproduce it.


## Developer
> Want to contribute to Open Source SW? That's great :raised_hands: help is always welcome.

0. Before anything, make sure you read the :books: (
[Readme](https://github.com/ProjSante/webapp),
[Code of Conduct](https://github.com/ProjSante/webapp/blob/develop/CODE_OF_CONDUCT.md) and
[Contributing]()) before everything.

1. Ways you can contribute:
- Request a feature and ask if you could work on it;
- Go through our [issues](https://github.com/ProjSante/webapp/issues) and check if there's something that appeals to you

#### Before You Contribute

Just **before** you pull up your sleeves and do your magic, checkout in the issue's comments if someone is already working on it. If not, say you would like to take a shot. You can allways ask us for some tips before starting.

> Your First Code Contribution? In the [issues](https://github.com/ProjSante/webapp/issues) tab search for `help-wanted` or `good-first-issue`

#### Working

##### Make a copy and start working

1. Fork our repository
2. Create a local copy
```sh
$ git clone git@github.com/<your_github_user>/webapp
```
3. `cd` into `webapp`
4. Set up new remote, so you can `fetch` modifications from it. Other people will be woring in the same project, so before you submit your changes you must be sure to update your local version.
```sh
$ git remote add upstream git@github.com:ProjSante/webapp.git
```
	1. Checkout if it worked `$ git remote -v`. You must see (at least) `origin` your github repo and `upstream` the original project repo

##### Working on it
> If you have any trouble here just submit your first issue

1. Make sure you have the tools:
	1. [node](https://nodejs.org/en/download/), you can check by doing `$ node -v`
2. We use [gitflow](https://nvie.com/posts/a-successful-git-branching-model/) so each work has its own branch
	1. Make sure you're up-to-date
	```sh
	$ git checkout master
	```
	2. Our most updated branch is develop, so you need to update your github repo wit it
	```sh
	$ git pull upstream develop && git push origin master
	```
	3. Create your branch
	```sh
	$ git checkout -b feature/my-feature
	```
3. Make logical commit blocks.
	1. If along the way you stumble in somethign wrong, do NOT change it, Instead, submit an issue
	2. Work in one logical problem
	3. Stage the files
	```sh
	$ git add <files-you-changed>
	```
	4. Commit with a **meaningfull** message
	```sh
	$ git commit -m "That message"
	```
4. Let's say, in the mean time others have contributed to this project. So, you need to update you files, with those updates. So, before you make a pull request
```sh
# Make sure your upstream points to git@github.com:ProjSante/webapp.git
$ git remote -v
# If not
$ git remote add upstream git@github.com:ProjSante/webapp.git
# (upstream) git@github.com:ProjSante/webapp.git (fetch/pull)
$ git pull upstream
```
5. Push modifications to your Github repo
```sh
# Resolve the conflicts, then push to your github branch
$ git push origin feature/my-feature
```
6. Then open a Pull Request. Go to your fork of the project `github.com/<your_github_user>/webapp` and smash that green button.

#### When You Finish :arrow_right: Pull Request Template

You're almost done. Please, follow the steps below to submit your pull request

1. The contents of your pull request (contribution)
	1. The pull request must only do one thing. To contribute to other changes, you must submit a different pull request.
	2. Link to the issue describing the bug that you're fixing (in the issues).
	3. Description of the change
2. Make sure to do a `pull` / `fetch` to get the lattest changes
3. `push` us your modifications



