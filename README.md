# forkdummy

An app for controlling the forkdummy user

## What's the point of this?

Sometimes, you want to add a repository to GitHub, but you didn't make it, and you don't want GitHub to treat you as the original creator of the repository (counting its language use in your user statistics, etc).

If the original repo were on GitHub, you'd fork it from that repo, and you wouldn't have a problem: however, when the original user *isn't* on GitHub, you can use the [forkdummy user][] as the original owner for the repo. With the forkdummy user and its control panel, you can spin up new empty repositories you can fork (so GitHub will regard them as forks). The "upstream" activity doesn't really matter, beyond having something to point to in the network graph; you can overwrite the upstream repository's initial content in your fork with a `git push -f`.

[forkdummy user]: https://github.com/forkdummy

My original plan with is was for @forkdummy to just have [one repository](https://github.com/forkdummy/_) that all such dummied forks would derive from; however, I realized that GitHub *only lets users create one fork per repository per org/user*, meaning that this wouldn't work if you wanted *two* repositories with a dummied upstream (not to mention that one shared upstream for a lot of different fake-forks would make for a pretty wonky network graph).

As such, I wrote this small Node app to create repos under the forkdummy user with any given name, so they can be used as the upstream. (This also gives you a shared upstream name for any *other* users who would like to make a fake-fork of this offsite upstream.)

## Next steps

Right now, new repositories are created with an initialized empty README; I'd rather have them be created with [the emptiest commit ever](https://github.com/forkdummy/_/commit/08016095106ebe0cc225bd94686a464c11727db7), so nobody inadvertently derives anything from the repo's initial content.
