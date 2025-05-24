# Technical Changelog
This changelog tracks significant technical changes, architectural decisions, and contributions to the project.
Each entry should be linked to the relevant commit for easy reference.

---
### (2025-05-24) refactor: Remove commit hash linking from technical changelog titles
- Modified `devtest/scripts/update-technical-changelog.ts` in the `updateChangelogFile` function:
    - Removed logic for fetching GitHub repository URL and commit hash.
    - Simplified changelog entry titles to `### (YYYY-MM-DD) Commit Title Text`, removing the hyperlink.
- This change avoids a two-step commit amend process previously considered for accurate hash linking, simplifying the script and preventing multiple commits for a single changelog update.
### (2025-05-24) [feat: Implement detailed technical changelog entries](https://github.com/shawnfromportland/devtest/commit/701d72ef59a1a113e0df153040ed8cc84f52c11c)
- Modified `devtest/package.json` to remove `echo` commands from `git:commit` and `git:commit:push` scripts. These scripts no longer write to `scripts/.tmp_changelog_content.md`.
- Updated `devtest/.cursor/rules/git_workflow_rules.mdc` to instruct the AI (me) to:
    - Generate a conventional commit message.
    - Compile a list of significant changes from the session as bullet points.
    - Format the message and bullet points into a markdown block.
    - Write this markdown block to `scripts/.tmp_changelog_content.md` *before* invoking the npm commit scripts.
### (2025-05-24) [fix: Ensure changelog script in devtest handles --perform-amend correctly](https://github.com/shawnfromportland/devtest/commit/b310aa79d06c8976ce3be9f7584959289c7d4df6)
### (2025-05-24) [refactor: Dynamically determine GitHub repo URL in changelog script](https://github.com/shawnfromportland/devtest/commit/def493954f42a55497a3db2ea690c41bb1a0dd31)
### (2025-05-24) [feat: Add git:push script and update workflow rules](https://github.com/shawnfromportland/anytime/commit/aa041859f9e072bf69f4bdff42eb32e26f40c30d)
### (2025-05-24) [refactor: Make technical changelog commit amendment conditional](https://github.com/shawnfromportland/anytime/commit/444368afe9397fdcef6b1e0586adaf1df1c17645)
### (2025-05-24) [refactor: Update git workflow scripts and rules](https://github.com/shawnfromportland/anytime/commit/c5beace2099ee67670273c8846e73152da26d0d2)
### (2025-05-24) [feat: Update AI persona and user preferences](https://github.com/shawnfromportland/anytime/commit/58131c530ec2305447420249ea750146fc226b58)
### (2025-05-24) [fix: Create technical_changelog.md if not exists](https://github.com/shawnfromportland/anytime/commit/df18df430444425ce67807d2c8b1e1c5a7b1da80)
