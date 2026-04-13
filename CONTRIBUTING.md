
# Contributing

Thank you for your interest in contributing!

## Before You Start

If you plan to make major changes (especially new features or design changes), please open an issue or discussion before starting work. This helps ensure your effort aligns with the project's direction.

## Submitting Code

Please keep each pull request focused on a single purpose. Avoid mixing unrelated changes in one PR, as this can make reviewing and merging code more difficult.

Please use the [Conventional Commits](https://www.conventionalcommits.org/) format for your commit messages whenever possible. This keeps our history clear and consistent.

Before submitting code, please run the appropriate commands to check for errors, format your code, and run tests.

```bash
pnpm check
pnpm format
pnpm lint
pnpm test
```

## Pull Request Checklist

Before submitting a Pull Request, please ensure you have completed the following steps:

- [ ] I have read the `CONTRIBUTING.md` document.
- [ ] I have formatted my code using Biome (`pnpm format`).
- [ ] My code passes all tests (`pnpm test`) and type-checks (`pnpm check`).
- [ ] I have used Semantic Commit Messages.
- [ ] My changes do not break existing accessibility rules (a11y).

## Style Guide
- **Indentation:** Use space-based indentation for Astro/Svelte, and tab-based for plain markdown where applicable (following Biome defaults).
- **Naming Conventions:** Use `camelCase` for variables and `PascalCase` for Components.
- **Tailwind:** Keep utilities grouped and prefer using scoped `@apply` in UI files for heavy, repeated component classes rather than immensely long class strings.