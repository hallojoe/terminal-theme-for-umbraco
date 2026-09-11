# GitHub Actions

`ci-build.yml` restores, builds, and packs the solution for pushes and pull requests targeting `develop` or `main`. The resulting NuGet package is retained as a workflow artifact.

`publish-packages.yml` runs when a GitHub Release is published. It derives the NuGet version from a `v`-prefixed release tag, publishes the package to GitHub Packages using the workflow `GITHUB_TOKEN`, and publishes it to NuGet.org using the repository secret `NUGET_TOKEN`.

Stable release tags must target `main`; prerelease tags (for example, `v0.2.0-beta.1`) must target a branch other than `main`.
