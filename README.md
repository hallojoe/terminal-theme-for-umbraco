# Terminal Theme for Umbraco

Terminal Theme for Umbraco is a terminal-inspired, developer-focused Backoffice theme for Umbraco 17. It uses Umbraco's supported `theme` extension type and UUI design tokens—no legacy AngularJS patterns or runtime CSS injection.

## Highlights

- Near-black layered surfaces with a restrained terminal-green accent.
- Local/system monospace typography and compact, high-contrast controls.
- Semantic success, warning, error, and information states retained for usability.
- A CSS-only extension with no Node.js build or runtime JavaScript.

## Requirements

- .NET 10
- Umbraco 17.6.2

## Development

Restore and build the solution:

```sh
dotnet restore Casko.TerminalThemeForUmbraco.slnx
dotnet build Casko.TerminalThemeForUmbraco.slnx
```

Run the SQLite-backed test site:

```sh
dotnet run --project src/Casko.TerminalThemeForUmbraco.TestSite/Casko.TerminalThemeForUmbraco.TestSite.csproj
```

The test site uses unattended local-only credentials: `admin@example.local` / `TerminalTheme123!`. Do not reuse these credentials outside local development.

## Activate the theme

After signing in to the Umbraco Backoffice, open your user profile and select **Terminal** in the theme selector. The pre-authentication login page is intentionally not styled because user themes apply after authentication.

## Architecture

```text
umbraco-package.json (theme extension)
        |
terminal-theme.css
        |
Umbraco / UUI design tokens
        |
safe global component adjustments
```

The test site consumes the extension through a normal `ProjectReference`. Razor static web assets expose the manifest and stylesheet under `/App_Plugins/TerminalTheme/`; no files are copied into the test site.

## Package

Create the NuGet package with:

```sh
dotnet pack src/Casko.TerminalThemeForUmbraco/Casko.TerminalThemeForUmbraco.csproj
```

The package ID is `Casko.TerminalThemeForUmbraco` and includes this README plus its static Backoffice assets.
