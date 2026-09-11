# Plan: Terminal Theme for Umbraco 17

## Goal

Create a standalone Umbraco 17 Backoffice theme extension and a separate
Umbraco 17 test site beside it.

The theme should give the Umbraco Backoffice a developer-centric terminal
appearance:

- black / near-black backgrounds
- bright terminal green as the primary accent
- monospace typography
- hard, minimal borders
- restrained corner radii
- high contrast
- dense developer-tool feeling
- terminal / TUI influence
- subtle retro computing influence
- inspired by the visual character of Omarchy, but do not clone its website
  or assets

The result must use the supported Umbraco 17 theme extension system.

Do not use old AngularJS-era Umbraco extension patterns.

Do not use `package.manifest`.

---

# 1. Solution structure

Create this structure:

TerminalTheme/
├── TerminalTheme.slnx
├── TerminalTheme/
│   ├── TerminalTheme.csproj
│   ├── Client/
│   ├── wwwroot/
│   │   └── App_Plugins/
│   │       └── TerminalTheme/
│   │           ├── umbraco-package.json
│   │           └── terminal-theme.css
│   └── README.md
└── TerminalTheme.TestSite/
    ├── TerminalTheme.TestSite.csproj
    └── ...

The two projects must be siblings.

The test site must reference the extension project using a normal
ProjectReference.

Do not copy extension files manually into the test site.

Prefer `.slnx` for the solution.

---

# 2. Versions and prerequisites

Use:

- .NET 10
- latest stable Umbraco 17.x
- Node version supported by the selected Umbraco 17 release
- matching `Umbraco.Templates` version

IMPORTANT:

The Umbraco test site and extension template MUST use the same Umbraco
17.x version.

Determine the current latest stable Umbraco 17 version before scaffolding.

Do not use Umbraco 18 or preview packages.

Install the matching templates, conceptually:

    dotnet new install Umbraco.Templates::<UMBRACO_VERSION>

Then scaffold the extension using the official extension template:

    dotnet new umbraco-extension -n TerminalTheme

Do not include example extensions unless they are actually useful.

---

# 3. Create the test Umbraco site

Create:

    TerminalTheme.TestSite

using the Umbraco 17 template.

Configure it as a development/test installation.

Use SQLite so the repository requires no external database infrastructure.

Use unattended installation if supported by the current template.

Development credentials can be something explicitly test-only such as:

    admin@example.local
    TerminalTheme123!

Make it clear in README that these are local development credentials only.

Do not add a starter kit unless needed.

Make sure:

    dotnet run --project TerminalTheme.TestSite

can create/start the test installation without requiring SQL Server.

---

# 4. Connect the extension project

Add a ProjectReference from:

    TerminalTheme.TestSite

to:

    TerminalTheme

Use the static-web-assets behavior provided by the official Umbraco
extension template.

The extension project must remain independently packable as a NuGet
package later.

Verify that building the test site exposes the extension's assets beneath:

    /App_Plugins/TerminalTheme/

Do not create duplicate copies of those files in the test project.

---

# 5. Register a real Umbraco 17 theme

Create/register an Umbraco Package Manifest for the extension.

Use the current Umbraco 17 schema.

Conceptually the extension should resemble:

    {
      "$schema": "...",
      "id": "TerminalTheme",
      "name": "Terminal Theme",
      "version": "0.1.0",
      "extensions": [
        {
          "type": "theme",
          "alias": "TerminalTheme.Theme",
          "name": "Terminal",
          "css": "/App_Plugins/TerminalTheme/terminal-theme.css"
        }
      ]
    }

Verify the exact schema/properties against the installed Umbraco 17
packages rather than blindly copying this example.

The important architectural requirement is:

    type = "theme"

and it should load the theme stylesheet through the supported Umbraco
theme mechanism.

After startup the theme must appear in the user's Backoffice theme selector.

Do NOT implement the primary theme using a backofficeEntryPoint which
simply injects arbitrary CSS.

A backofficeEntryPoint may only be introduced later if something genuinely
cannot be accomplished by the theme API.

---

# 6. Design system

Do not immediately scatter literal colors throughout the stylesheet.

Start by defining our own small palette.

Suggested starting point:

    --terminal-bg:          #050806;
    --terminal-surface:     #080d09;
    --terminal-surface-2:   #0c140e;
    --terminal-surface-3:   #101a12;

    --terminal-border:      #193d25;
    --terminal-border-soft: #102b19;

    --terminal-text:        #d8fbe2;
    --terminal-text-muted:  #7fa98b;

    --terminal-green:       #39ff88;
    --terminal-green-soft:  #72ffa5;
    --terminal-green-dim:   #1ba653;

Do not treat these exact values as immutable.

Tune them visually while implementing.

Retain sensible semantic colors for:

- danger
- warnings
- informational messages
- success

Do NOT make every semantic state green.

Errors must still look like errors.

Warnings must still look like warnings.

---

# 7. Map the palette onto Umbraco/UUI tokens

Before writing broad selectors, inspect the CSS custom properties exposed by
the actual Umbraco 17 / Umbraco UI Library version being used.

Override supported UUI design tokens wherever possible.

This is very important.

Prefer:

    --uui-...

variables

over styling deep implementation details inside individual Web Components.

Create a clearly separated section in the CSS:

    /* -------------------------------------------------
       Terminal palette
       ------------------------------------------------- */

    /* -------------------------------------------------
       Umbraco / UUI token mapping
       ------------------------------------------------- */

    /* -------------------------------------------------
       Global typography
       ------------------------------------------------- */

    /* -------------------------------------------------
       Navigation
       ------------------------------------------------- */

    /* -------------------------------------------------
       Workspaces / panels
       ------------------------------------------------- */

    /* -------------------------------------------------
       Forms
       ------------------------------------------------- */

    /* -------------------------------------------------
       Tables / lists
       ------------------------------------------------- */

    /* -------------------------------------------------
       Modals / popovers
       ------------------------------------------------- */

    /* -------------------------------------------------
       Terminal details
       ------------------------------------------------- */

Do not invent UUI variable names.

Inspect the current UI library first.

---

# 8. Typography

Use a local/system monospace stack.

Do not download a Google Font or external font.

Use something along these lines:

    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    "Liberation Mono",
    monospace

The Backoffice should strongly feel like a developer application.

However:

- normal content must remain readable
- labels must not become excessively tiny
- long-form descriptions should remain comfortable to read
- do not transform all text to uppercase

Use uppercase and letter spacing selectively for things such as:

- small navigation labels
- metadata
- table headings
- badges
- section indicators

---

# 9. Overall visual language

Aim for something between:

- a modern terminal
- a TUI application
- Neovim
- btop
- a developer dashboard
- Omarchy

Avoid:

- glossy surfaces
- Material Design appearance
- large pill-shaped controls
- excessive shadows
- blurred glass
- colorful gradients
- giant corner radii
- generic SaaS aesthetics

Prefer:

- 1px borders
- square or slightly rounded controls
- very subtle shadows, if any
- layered black surfaces
- green focus indicators
- compact visual hierarchy
- sharp separators

The UI should feel deliberately engineered rather than decorated.

---

# 10. Backoffice shell

Theme the main Backoffice shell first.

Target:

- top/header area
- section navigation
- tree/navigation area
- main workspace
- context/sidebar surfaces

Desired appearance:

HEADER

    near black
    thin bottom border
    muted controls
    active/interactive elements use terminal green

NAVIGATION

    black background
    muted text
    selected section uses green
    avoid large filled rounded selection pills

TREE

    dark surface
    subtle indentation/separation
    selected node visibly green
    hover uses a restrained green-black surface

WORKSPACE

    dark background
    panels slightly lighter than main background
    thin green/dark-green separators

---

# 11. Cards and panels

Make standard Umbraco cards/panels feel closer to terminal panes.

Use:

- dark panel background
- thin border
- reduced radius
- minimal/no box shadow

A card should visually resemble a pane in a terminal multiplexer rather
than a floating Material card.

Do not alter layout dimensions aggressively.

This is a skin, not a redesign of Umbraco's information architecture.

---

# 12. Buttons

Primary button:

    green background
    near-black text
    strong contrast
    small radius

Hover:

    slightly brighter green

Active:

    slightly darker green

Secondary button:

    transparent/dark background
    green or muted border
    light text

Avoid turning destructive buttons green.

Danger buttons remain clearly red/danger styled.

Focus states must be extremely obvious.

---

# 13. Form controls

Theme:

- text inputs
- textareas
- selects
- toggles
- checkboxes
- radio buttons
- search controls
- picker controls where supported by UUI tokens

Desired appearance:

    near-black field
    visible dark-green border
    light text
    muted placeholder
    green caret
    bright green focus border/ring

Focus styling should evoke an active terminal cursor without being gimmicky.

Do not reduce accessibility.

---

# 14. Tables and collection views

These are important for the developer-centric visual language.

Style tables/list views with:

- dark rows
- subtle row separators
- slightly brighter header
- compact typography
- monospace text where sensible
- green hover/focus state
- restrained alternating surfaces only if useful

Headers may use:

    uppercase
    slightly increased letter-spacing

Avoid turning the entire table green.

---

# 15. Tabs

Tabs should look like terminal/editor tabs rather than browser pills.

Preferred treatment:

Inactive:

    dark background
    muted text

Active:

    brighter text
    green underline OR top border
    slightly different dark surface

Avoid large rounded tab pills.

---

# 16. Modals, menus and popovers

Ensure:

- modal surfaces use the same dark palette
- menus do not fall back to white
- dropdowns remain readable
- context menus look consistent
- overlay backgrounds remain visually clear
- focus remains obvious

These components are especially important because an otherwise-dark theme
looks unfinished when menus suddenly appear white.

---

# 17. Statuses and notifications

Preserve semantic meaning.

Examples:

SUCCESS
    green

WARNING
    yellow/orange

ERROR
    red

INFORMATION
    blue/cyan

Do not globally map all UUI status colors onto terminal green.

The terminal aesthetic must not compromise UX semantics.

---

# 18. Icons

Icons should normally inherit foreground color.

Use:

    muted foreground

for inactive icons and:

    terminal green

for active/selected/focused icons.

Avoid glowing every icon.

---

# 19. Terminal-inspired details

Add a small amount of personality without turning Umbraco into a novelty UI.

Possible details:

### Selection

Use a green-tinted text selection.

### Scrollbars

Where global styling is safe:

- dark track
- dark-green thumb
- brighter green thumb on hover

### Focus

Green focus outline similar to a terminal cursor.

### Borders

Pane separators should evoke tmux/btop.

### Prompt-like details

Only where achievable cleanly and without changing Umbraco markup.

For example, a subtle `>` or `$` motif may be considered for selected
navigation areas using CSS pseudo-elements.

Do NOT add prompt characters everywhere.

### Scanlines

Do not add full-screen CRT scanlines.

This needs to remain a professional Backoffice.

---

# 20. Border radius

Reduce the default visual softness.

Where supported by UUI tokens, make radii relatively small:

    roughly 2px - 4px

Do not force `border-radius: 0` indiscriminately.

Controls must continue to look intentional and usable.

---

# 21. Shadow DOM considerations

Remember that Umbraco 17 is built heavily with Web Components.

Do not attempt increasingly brittle selectors simply to pierce component
internals.

Order of preference:

1. supported Umbraco/UUI CSS custom properties
2. inherited CSS properties
3. documented `part` selectors
4. safe top-level selectors
5. very targeted workarounds only as a last resort

If a component cannot reasonably be themed because its internals are
encapsulated, document that limitation instead of adding fragile hacks.

---

# 22. Do not modify Umbraco source

The theme must work entirely as an extension.

Do not:

- edit files from the Umbraco NuGet package
- modify Backoffice source
- replace built-in components
- fork Umbraco
- patch generated files

The test site should be disposable.

The theme project is the product.

---

# 23. Test areas

After the initial styling works, inspect as much of the standard
Backoffice as possible.

At minimum validate:

## Login

The normal user theme may not apply to the pre-authentication login UI.

Do not hack the login page merely to make it match.

Document this separately if the supported theme mechanism only starts after
authentication.

## Content

Test:

- content tree
- document editor
- workspace tabs
- save/publish actions
- text fields
- textareas
- toggles
- pickers
- validation errors

## Media

Test:

- media tree
- media collection
- upload UI
- media picker
- image preview areas

Do not tint actual media/images green.

## Settings

Test:

- trees
- list views
- document types
- data types
- editors

## Users

Test:

- user list
- profile modal
- theme selector

## Search

Test:

- global search
- result lists

## Dialogs

Test:

- modal
- confirmation dialog
- dropdown
- context menu
- notifications

---

# 24. Accessibility

Do not sacrifice accessibility for aesthetics.

Check:

- text contrast
- muted text contrast
- button contrast
- input boundaries
- focus visibility
- hover versus selected state
- disabled controls
- error state
- warning state

Bright green on pure black can become visually exhausting.

Use the brightest green primarily for:

- active states
- primary actions
- selected items
- focus
- small accents

Use softer green-white for normal foreground text.

---

# 25. Theme stylesheet quality

Keep `terminal-theme.css` organized and documented.

Avoid:

    !important

unless absolutely necessary.

If `!important` is required, add a comment explaining why and which
Umbraco/UUI behavior requires it.

Do not use generated CSS frameworks.

There is no need for Tailwind, Bootstrap or similar.

This theme should primarily be a small, deliberate CSS package.

---

# 26. Client project

The official extension template may create a Client/Vite setup.

Retain it if it is part of the supported extension build pipeline.

However, this package is primarily a CSS theme.

Do not create Lit components or TypeScript code merely because the template
supports them.

Remove unused example code.

The final extension should contain the minimum runtime code necessary.

If the theme can be implemented with:

    umbraco-package.json
    terminal-theme.css

then prefer that.

Keep Vite/build infrastructure only when it contributes to proper packaging
or future maintainability.

---

# 27. README

Create a useful README in the extension project.

Document:

## Purpose

Terminal-inspired developer theme for the Umbraco 17 Backoffice.

## Development

How to restore/build:

    dotnet restore
    dotnet build

If npm is required:

    npm install
    npm run build

Explain exactly when it is required.

## Running test site

Give the exact command:

    dotnet run --project TerminalTheme.TestSite

## Activating the theme

Explain where in the Umbraco Backoffice user profile the theme can be
selected.

## Architecture

Explain:

    Umbraco theme manifest
        ↓
    terminal-theme.css
        ↓
    Umbraco/UUI design tokens
        ↓
    small number of safe component-specific adjustments

## Packaging

Explain how to create the extension NuGet package:

    dotnet pack TerminalTheme/TerminalTheme.csproj

---

# 28. Repository hygiene

Add appropriate `.gitignore`.

Do not commit:

- bin/
- obj/
- node_modules/
- generated temporary files
- SQLite WAL/SHM files if inappropriate
- test-site logs

Decide whether the test SQLite database itself should be committed.

Prefer that the site can recreate itself and therefore keep local database
state out of source control.

---

# 29. Build validation

Before considering the task complete, run:

    dotnet restore
    dotnet build

Then build client assets if required.

Run the test site.

Verify that:

1. Umbraco starts.
2. The test site references the extension project.
3. The extension assets resolve correctly.
4. The package is registered.
5. "Terminal" appears in the Umbraco theme selector.
6. Selecting Terminal immediately changes the Backoffice.
7. No JavaScript errors appear in the browser console.
8. No 404s occur for theme assets.
9. Default Umbraco theme can still be selected.
10. Restarting Umbraco does not break the selected theme.

Also run:

    dotnet pack TerminalTheme/TerminalTheme.csproj

and verify the NuGet package contains the required static assets.

---

# 30. Visual acceptance criteria

The finished theme should make an immediate visual impression.

When looking at a screenshot of the Content section, it should be obvious
that this is not standard Umbraco.

It should communicate:

    developer
    terminal
    code
    technical
    focused
    minimal
    fast

The overall palette should appear approximately:

    █████████  near-black main background
    █████████  slightly lighter surfaces
    ─────────  dark green pane borders
    > active   bright terminal green
      normal   soft green-white foreground
      muted    desaturated green-gray

Do not make it look like a "Matrix" novelty theme.

Think:

    professional developer workstation

rather than:

    hacker movie.

---

# 31. First iteration scope

For the FIRST iteration, focus exclusively on a convincing, complete
Backoffice skin.

Do not add:

- custom dashboards
- custom editors
- custom menu items
- command palettes
- terminal emulators
- animations
- sound
- custom API endpoints
- custom content functionality

Those can be considered later.

First prove that the native Umbraco 17 theme extension system can produce
an excellent developer-centric skin.

---

# 32. Deliverables

At completion I expect:

1. `TerminalTheme.slnx`
2. working `TerminalTheme.TestSite`
3. working `TerminalTheme` extension project
4. project reference between them
5. selectable Umbraco 17 theme
6. `terminal-theme.css`
7. `umbraco-package.json`
8. README with development instructions
9. successful `dotnet build`
10. successful `dotnet pack`
11. no browser console errors caused by the extension

Keep the implementation simple.

Use supported Umbraco 17 APIs first.

Avoid brittle DOM hacks.

Make the CSS itself the star of the project.