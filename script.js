stringRepeat = {
  input: "",
  get inputArray() {
    return this.buildInputArray(this.input);
  },
  output: "",
  submit() {
    debugger;
    this.input = document.getElementById("input").value;
    this.output = this.sort(this.inputArray);
    console.log(this.output);
    document.getElementById("output").textContent = this.output;
  },
  sort(inputArray) {
    debugger;
    let ret = [];
    let match = true;
    let obj = {};
    for (let i = 1; match; i++) {
      let before = ret.length;
      let phrasesOfiLength = this.getPhrases(i, inputArray);
      let matches = this.comparePhrases(phrasesOfiLength);

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
    console.log(obj);
    let finalResults = this.cleanUpResults(ret);
    return finalResults;
  },
  getPhrases(n, array) {
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
  },
  comparePhrases(array) {
    // returns array of phrases that match (of certain length)
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      if (contains(array, array[i], i)) {
        ret.push(array[i]);
      }
    }
    return ret;
  },
  contains(array, element, index) {
    // does array contain element after index
    for (let i = index + 1; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
  },
  buildInputArray(input) {
    input = input.toUpperCase();
    input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"\[\]]/g, "");
    input = input.replace(/[\n]/g, " ");
    input = input.replace(/\s{2,}/g, " ");
    input = input.split(" ");
    input = input.filter(e => e);
    return input;
  },

  getCounts(array) {
    var counts = {};
    array.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  },

  cleanUpResults(array) {
    let uniques = this.getUnique(array);
    uniques.sort(function(a, b) {
      return a.length - b.length;
    });
    let final = this.removePartials(uniques);
    final.sort(function(a, b) {
      return b.length - a.length;
    });
    return final;
  },

  removePartials(array) {
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
  },

  getUnique(array) {
    var uniqueArray = [];
    for (i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
};
