// Module 9, Task 1

const parser = new DOMParser();

let xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

let xmlDOM = parser.parseFromString(xmlString, 'text/xml');

let studentNodes = xmlDOM.querySelectorAll('student');

let result = {
    list: []
};

studentNodes.forEach(elem => {
    let firstNameNode = elem.querySelector('first');

    let secondNameNode = elem.querySelector('second');

    let ageNode = elem.querySelector('age');

    let profNode = elem.querySelector('prof');

    let langAttr = getLang();

    function getLang () {
        let nameNode = elem.querySelector('name');
        if (nameNode !== null) {
            return nameNode.getAttribute('lang');
        }
    }

    result.list.push({
        name: [firstNameNode.textContent, secondNameNode.textContent].join(' '),
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
        lang: langAttr,
    })
})

console.log(result)
