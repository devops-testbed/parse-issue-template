let parse = function (body) {
  const toCamelCase = (str) => str.replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '');
 
 // Use regular expression to format input string with two newline characters between each line and remove leading and trailing whitespace from each line.
  const regex = /^\s*(.*)\s*$/gm;
  const replacement = "\n\n$1";
  body = body.replace(regex, replacement);

  const sections = body.match(/### .+?\n\n.+?(?=\n###|$)/gs) || [];

  return sections.reduce((acc, section) => {
    const keyMatch = section.match(/### (.+?)\n/);
    const key = keyMatch ? toCamelCase(keyMatch[1]) : '';

    const hasCheckboxes = section.includes('[X]') || section.includes('[ ]');
    if (hasCheckboxes) {
      const items = section.match(/- \[[X ]\] .+\n/g) || [];
      acc[key] = items.map(s => ({
        item: s.match(/- \[[X ]\] (.+)/)[1],
        selected: s.includes('[X]')
      }));
    } else {
      acc[key] = section.replace(/### .+?\n\n/, '').trim();
    }
    return acc;
  }, {});
};

module.exports = parse;
