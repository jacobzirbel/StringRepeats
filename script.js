function start() {
  let input = "";
  let output = "";
  function inputArray() {
    return buildInputArray(input);
  }

  submit();
  function submit() {
    console.time("submit");
    input = document.getElementById("input").value;
    output = sort(inputArray());
    console.log(output);
    console.log("keys", Object.keys(output).length);
    var formattedData = JSON.stringify(output, null, "\t");
    $("#output").text(formattedData);
    console.timeEnd("submit");
    // document.getElementById("output").textContent = JSON.stringify(output);
  }
  function sort(inputArray) {
    let ret = [];
    let prevIs = [];
    let match = true;
    let obj = {};
    for (let i = 1; match; i++) {
      console.log(i);
      let before = ret.length;
      let phrasesOfiLength = getPhrases(i, inputArray);
      let matches = comparePhrases(phrasesOfiLength, prevIs);
      prevIs = matches.pop();
      // add matches of length i to final
      for (let i = 0; i < matches.length; i++) {
        ret.push(matches[i]);
      }
      console.time("count");
      matches.forEach(e => {
        let c = 0;
        phrasesOfiLength.forEach(ee => {
          if (e == ee) {
            c++;
          }
        });
        obj[e] = c;
      });
      console.timeEnd("count");
      //only continue if there is a new match
      let after = ret.length;
      if (after === before) {
        match = false;
      }
    }
    //let finalResults = cleanUpResults(ret);
    return obj;
  }
  function getPhrases(n, array) {
    // returns all sets of words with n words
    console.time("getPhrases" + n.toString());
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
    console.timeEnd("getPhrases" + n.toString());
    return ret;
  }
  function comparePhrases(array, prevIs) {
    // returns array of phrases that match (of certain length)
    let l = array.length;
    console.time("comparePhrases" + l.toString());
    let ret = [];
    let is = [];
    if (prevIs.length === 0) {
      for (let i = 0; i < array.length; i++) {
        if (contains(array, array[i], i)) {
          ret.push(array[i]);
          is.push(i);
        }
      }
    } else {
      prevIs.forEach(e => {
        let match = true;
        for (let i = e; match; i++) {
          if (contains(array, array[i], i)) {
            ret.push(array[i]);
            is.push(i);
          } else {
            match = false;
          }
        }
      });
    }

    ret.push(is);
    console.time("filter");
    array = array.filter(e => {
      is.includes(array.indexOf(e));
    });
    console.timeEnd("filter");
    console.timeEnd("comparePhrases" + l.toString());
    return ret;
  }
  function contains(array, element, index) {
    // does array contain element after index
    for (let i = index + 1; i < array.length; i++) {
      if (array[i].length === element.length) {
        if (array[i] === element) {
          return true;
        }
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
    console.time("count");
    var counts = {};
    array.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });
    console.timeEnd("count");
    return counts;
  }

  function cleanUpResults(array) {
    console.time("clean");
    let uniques = getUnique(array);
    uniques.sort(function(a, b) {
      return a.length - b.length;
    });
    let final = removePartials(uniques);
    final.sort(function(a, b) {
      return b.length - a.length;
    });
    console.timeEnd("clean");
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
    console.time("getUnique");
    var uniqueArray = [];
    for (i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    console.timeEnd("getUnique");

    return uniqueArray;
  }
}
