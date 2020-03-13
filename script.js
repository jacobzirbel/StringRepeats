function start() {
  let input = "";
  let output = "";
  function inputArray() {
    return buildInputArray(input);
  }

  submit();
  function submit() {
    input = document.getElementById("input").value;
    output = sort(inputArray());
    console.log(output);

    var formattedData = JSON.stringify(output, null, "\t");
    $("#output").text(formattedData);

    // document.getElementById("output").textContent = JSON.stringify(output);
  }
  function sort(inputArray) {
    let s = new Date();
    let ret = [];
    let match = true;
    let obj = {};
    for (let i = 1; match; i++) {
      console.log(i);
      let before = ret.length;
      let phrasesOfiLength = getPhrases(i, inputArray);
      let matches = comparePhrases(phrasesOfiLength);

      // add matches of length i to final
      for (let i = 0; i < matches.length; i++) {
        ret.push(matches[i]);
      }

      matches.forEach(e => {
        let c = 0;
        phrasesOfiLength.forEach(ee => {
          if (e == ee) {
            c++;
          }
        });
        obj[e] = c;
      });

      //only continue if there is a new match
      let after = ret.length;
      if (after === before) {
        match = false;
      }
    }

    let finalResults = cleanUpResults(ret);
    let e = new Date();
    console.log(e, s, e - s);
    return obj;
  }
  function getPhrases(n, array) {
    // returns all sets of words with n words
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      let str = "";
      let add = true;
      for (let j = 0; j < n; j++) {
        if (array[i + j]) {
          str += array[i + j] + " ";
        } else {
          add = false;
        }
      }
      if (add) {
        ret.push(str);
      }
    }
    return ret;
  }
  function comparePhrases(array) {
    // returns array of phrases that match (of certain length)
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      if (contains(array, array[i], i)) {
        ret.push(array[i]);
      }
    }
    return ret;
  }
  function contains(array, element, index) {
    // does array contain element after index
    for (let i = index + 1; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
  }
  function buildInputArray(input) {
    input = input.toUpperCase();
    input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
    input = input.replace(/[\n]/g, " ");
    input = input.replace(/\s{2,}/g, " ");
    input = input.split(" ");
    input = input.filter(e => e);
    return input;
  }

  function getCounts(array) {
    var counts = {};
    array.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }

  function cleanUpResults(array) {
    let uniques = getUnique(array);
    uniques.sort(function(a, b) {
      return a.length - b.length;
    });
    let final = removePartials(uniques);
    final.sort(function(a, b) {
      return b.length - a.length;
    });
    return final;
  }
  function removePartials(array) {
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      let include = true;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j].includes(array[i])) {
          include = false;
          break;
        }
      }
      if (include) {
        ret.push(array[i]);
      }
    }
    return ret;
  }

  function getUnique(array) {
    var uniqueArray = [];
    for (i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
}
