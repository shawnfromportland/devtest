import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const TECHNICAL_CHANGELOG_PATH = path.join(__dirname, '..', 'docs', 'ai', 'technical_changelog.md');

interface Args {
  contentFile?: string;
  performAmend?: boolean;
}

const parseArgs = (): Args => {
  const args: Args = { performAmend: false };
  const cliArgs = process.argv.slice(2);
  for (let i = 0; i < cliArgs.length; i++) {
    if (cliArgs[i] === '--contentFile' && i + 1 < cliArgs.length) {
      args.contentFile = cliArgs[i + 1];
      i++; 
    } else if (cliArgs[i] === '--perform-amend') {
      args.performAmend = true;
    } else {
      console.warn(`Unknown argument: ${cliArgs[i]}`);
    }
  }
  if (!args.contentFile) {
    console.error('Error: --contentFile argument is required, specifying the path to the Markdown content.');
    console.log('Usage: ts-node scripts/update-technical-changelog.ts --contentFile <path_to_markdown_file>');
    process.exit(1);
  }
  return args;
};

const readContentFromFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read content from file: ${filePath}`, error);
    process.exit(1);
  }
}

const updateChangelogFile = (newEntryContent: string): void => {
  try {
    // Format the new entry with date
    const entryLines = newEntryContent.trimEnd().split('\n');
    const titleLine = entryLines[0];
    if (titleLine && titleLine.startsWith('### ')) {
      const titleText = titleLine.substring(4); // Get text after '### '
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      entryLines[0] = `### (${currentDate}) ${titleText}`;
    }
    // Add a blank line after the current entry for better separation.
    const newEntryFormatted = entryLines.join('\n') + '\n\n';

    let existingContent = '';
    if (fs.existsSync(TECHNICAL_CHANGELOG_PATH)) {
      existingContent = fs.readFileSync(TECHNICAL_CHANGELOG_PATH, 'utf-8');
    }

    // Prepend the new entry.
    const updatedContent = newEntryFormatted + existingContent;

    // Write the updated content, ensuring the file ends with a single newline.
    fs.writeFileSync(TECHNICAL_CHANGELOG_PATH, updatedContent.trimEnd() + '\n', 'utf-8');
    console.log('Technical changelog file updated successfully.');
  } catch (error) {
    console.error('Failed to update technical changelog file:', error);
    process.exit(1);
  }
};

const amendCommit = (): void => {
  try {
    console.log('Staging updated technical changelog...');
    execSync(`git add ${TECHNICAL_CHANGELOG_PATH}`, { stdio: 'inherit' });
    console.log('Amending commit...');
    execSync('git commit --amend --no-edit', { stdio: 'inherit' });
    console.log('Commit amended successfully.');
  } catch (error) {
    console.error('Failed to amend commit:', error);
    process.exit(1);
  }
};

const main = () => {
  const args = parseArgs();
  const newEntryMarkdown = readContentFromFile(args.contentFile!);

  console.log('Starting technical changelog update process...');
  updateChangelogFile(newEntryMarkdown);

  // Delete the temporary content file after its content has been used
  try {
    fs.unlinkSync(args.contentFile!);
    console.log(`Successfully deleted temporary file: ${args.contentFile!}`);
  } catch (error) {
    console.warn(`Warning: Failed to delete temporary file ${args.contentFile!}:`, error);
    // Continue even if deletion fails, as the main operations might have succeeded
  }

  if (args.performAmend) {
    amendCommit();
  }
  console.log('Technical changelog update process completed.');
};

main(); 
