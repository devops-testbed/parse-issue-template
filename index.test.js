const assert = require('assert');
const parse = require('./parse');

describe('parse', () => {
  it('should return an empty object when given an empty string', () => {
    const input = '';
    const expectedOutput = {};
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should parse a single section with no checkboxes', () => {
    const input = '### Section Title\n\nThis is the content of the section.';
    const expectedOutput = {
      sectionTitle: 'This is the content of the section.'
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should parse a single section with checkboxes', () => {
    const input = '### Section Title\n\n- [X] Item 1\n- [ ] Item 2\n- [X] Item 3\n';
    const expectedOutput = {
      sectionTitle: [
        { item: 'Item 1', selected: true },
        { item: 'Item 2', selected: false },
        { item: 'Item 3', selected: true }
      ]
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should parse multiple sections with and without checkboxes', () => {
    const input = '### Section 1\n\nThis is the content of section 1.\n\n### Section 2\n\n- [ ] Item 1\n- [X] Item 2\n\n### Section 3\n\nThis is the content of section 3.';
    const expectedOutput = {
      section1: 'This is the content of section 1.',
      section2: [
        { item: 'Item 1', selected: false },
        { item: 'Item 2', selected: true }
      ],
      section3: 'This is the content of section 3.'
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should handle section titles with special characters', () => {
    const input = '### Section Title with Special Characters!?\n\nThis is the content of the section.';
    const expectedOutput = {
      sectionTitleWithSpecialCharacters: 'This is the content of the section.'
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should handle checkbox items with special characters', () => {
    const input = '### Section Title\n\n- [X] Item with special characters: !@#$%^&*\n- [ ] Another item\n';
    const expectedOutput = {
      sectionTitle: [
        { item: 'Item with special characters: !@#$%^&*', selected: true },
        { item: 'Another item', selected: false }
      ]
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });

  it('should handle complex body', () => {
    const input = `
    ### Issue Title
    
    Issue title here
    
    ### Issue Description
    
    Issue Desscription in markdown
    
    ### Priority
    
    Medium
    
    ### Affected Versions
    
    - [X] Version 1.0
    - [X] Version 1.1
    - [ ] Version 1.2
    
    ### Steps to Reproduce
    
    step1 step2
    
    ### Expected Behavior
    
    expected behaviour in markdown
    
    ### Actual Behavior
    
    Actual behaviour in markdown
    
    ### Additional Information
    
    screenshots logs etc
    `;
    const expectedOutput = {
      issueTitle: 'Issue title here',
      issueDescription: 'Issue Desscription in markdown',
      priority: 'Medium',
      affectedVersions: [
        { item: 'Version 1.0', selected: true },
        { item: 'Version 1.1', selected: true },
        { item: 'Version 1.2', selected: false }
      ],
      stepsToReproduce: 'step1 step2',
      expectedBehavior: 'expected behaviour in markdown',
      actualBehavior: 'Actual behaviour in markdown',
      additionalInformation: 'screenshots logs etc'
    };
    assert.deepStrictEqual(parse(input), expectedOutput);
  });
});
