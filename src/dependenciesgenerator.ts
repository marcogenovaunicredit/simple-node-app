import * as fs from 'fs';
import * as path from 'path';

/* 
 * Used this approach to skip the limit on the srcDir of the tsconfig. The package.json file is not available in the source directory
 */
fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (error, data) => {
  if (!error) {
    var packageStructure: any = JSON.parse(data);
    let content: string = `# Dependencies\n`;
    content += `<ol>\n`

    for (var propertyName in packageStructure.dependencies) {
      content += `<li>${propertyName} : ${packageStructure.dependencies[propertyName]}</li>\n`;
    }

    content += `</ol>\n\n`
    content += `Come [back](README.md)\n`
    fs.writeFileSync(path.join(__dirname, '../dependencies.md'), content);
  }
});


