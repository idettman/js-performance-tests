const testData = (function() {
  const sourceData = [
    "prebid.org",
    "http://prebid.org/dev-docs/subjects?_d=1",
    "http://prebid.org/dev-docswwe44.sid9s,skjd/subjeczdakdjfs?_d=1",
    "http://prebid.org/dev-docs/subjects?_d=1&fii=39384djzdjdakjdJJd",
    "http://prebid.org/dev_docs/subjects#one",
    "https://www.prebid.com/foo/bar?one=two#foo-d"
  ];

  function rando(i) {
    let str = "";
    for (let i = 0; i < i.length; i++) {
      str += i.toString(10);
    }
    return str + i;
  }
  const testDataA = sourceData
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando))
    .concat(sourceData.map(rando));

  const testData = [];
  for (let i = 0; i < 10000; i++) {
    testData.push(testDataA);
  }

  return testData;
})();

const testFns = [
  function(testData) {
    function base64urlEncode(s) {
      return btoa(s)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }
    console.time("one");
    testData.map(i => base64urlEncode(i));
    console.timeEnd("one");
  },
  function(testData) {
    function encode(str) {
      const ENC = {
        "+": "-",
        "/": "_",
        "=": "."
      };
      return btoa(str).replace(/[+/=]/g, function(m) {
        return ENC[m];
      });
    }
    console.time("oneFixed");
    testData.map(i => encode(i));
    console.timeEnd("oneFixed");
  }
];

setTimeout(function() {
  setTimeout(function() {
    testFns[0](testData);
  }, 1000);

  setTimeout(function() {
    testFns[1](testData);
  }, 2000);

  setTimeout(function() {
    testFns[1](testData);
  }, 3000);

  setTimeout(function() {
    testFns[0](testData);
  }, 4000);
}, 1000);

setTimeout(function() {
  setTimeout(function() {
    testFns[0](testData);
  }, 1000);

  setTimeout(function() {
    testFns[1](testData);
  }, 2000);

  setTimeout(function() {
    testFns[1](testData);
  }, 3000);

  setTimeout(function() {
    testFns[0](testData);
  }, 4000);
}, 7000);
