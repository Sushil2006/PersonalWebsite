function logEvent(eventType, element) {
  const timestamp = new Date();
  const elementTag = element.tagName.toLowerCase();

  console.log(
    `Timestamp: ${timestamp}
Event Type: ${eventType}
Element Tag: ${elementTag}`
  );
}

["click", "input", "change"].forEach((eventType) => {
  document.addEventListener(
    eventType,
    (e) => {
      logEvent(eventType, e.target);
    },
    true
  );
});

function isLetter(char) {
  return /^[a-zA-Z]$/.test(char);
}

function submitText() {
  const userText = document.getElementById("userInput").value;
  let letters = 0,
    words = 0,
    spaces = 0,
    new_lines = 0,
    special_symbols = 0;

  let prev_type = 0;

  const pronouns = [
    "i",
    "me",
    "you",
    "he",
    "him",
    "she",
    "her",
    "it",
    "we",
    "us",
    "they",
    "them",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
    "mine",
    "yours",
    "hers",
    "ours",
    "theirs",
    "myself",
    "yourself",
    "himself",
    "herself",
    "itself",
    "ourselves",
    "yourselves",
    "themselves",
    "who",
    "whom",
    "whose",
    "which",
    "that",
  ];

  const prepositions = [
    "about",
    "above",
    "across",
    "after",
    "against",
    "along",
    "among",
    "around",
    "at",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "besides",
    "between",
    "beyond",
    "but",
    "by",
    "concerning",
    "despite",
    "down",
    "during",
    "except",
    "for",
    "from",
    "in",
    "inside",
    "into",
    "like",
    "near",
    "of",
    "off",
    "on",
    "onto",
    "opposite",
    "out",
    "outside",
    "over",
    "past",
    "regarding",
    "round",
    "since",
    "through",
    "throughout",
    "till",
    "to",
    "toward",
    "under",
    "underneath",
    "until",
    "up",
    "upon",
    "with",
    "within",
    "without",
  ];

  const articles = ["a", "an", "the"];

  let pronounsJson = {};
  let prepositionsJson = {};
  let articlesJson = {};
  let currWord = "";

  // assumption: anything that is not a letter (a-z or A-Z), space or newline is a special symbol (so numbers are also taken to be special symbols)
  for (let char of userText) {
    let curr_type = 0;

    if (isLetter(char)) {
      letters++;
      curr_type = 1;
    } else if (char == " ") {
      spaces++;
    } else if (char == "\n") {
      new_lines++;
    } else {
      special_symbols++;
      curr_type = 1;
    }

    if (curr_type == 1) {
      currWord += char;
    }

    if (curr_type == 1 && prev_type == 0) {
      words++;
    }
    if (curr_type == 0 && prev_type == 1) {
      currWord = currWord.toLowerCase();
      if (pronouns.includes(currWord)) {
        if (currWord in pronounsJson) {
          pronounsJson[currWord]++;
        } else {
          pronounsJson[currWord] = 1;
        }
      }
      if (prepositions.includes(currWord)) {
        if (currWord in prepositionsJson) {
          prepositionsJson[currWord]++;
        } else {
          prepositionsJson[currWord] = 1;
        }
      }
      if (articles.includes(currWord)) {
        if (currWord in articlesJson) {
          articlesJson[currWord]++;
        } else {
          articlesJson[currWord] = 1;
        }
      }
    }

    if (curr_type == 0) {
      currWord = "";
    }

    prev_type = curr_type;
  }

  if (prev_type == 1) {
    currWord = currWord.toLowerCase();
    if (pronouns.includes(currWord)) {
      if (currWord in pronounsJson) {
        pronounsJson[currWord]++;
      } else {
        pronounsJson[currWord] = 1;
      }
    }
    if (prepositions.includes(currWord)) {
      if (currWord in prepositionsJson) {
        prepositionsJson[currWord]++;
      } else {
        prepositionsJson[currWord] = 1;
      }
    }
    if (articles.includes(currWord)) {
      if (currWord in articlesJson) {
        articlesJson[currWord]++;
      } else {
        articlesJson[currWord] = 1;
      }
    }
  }

  data = {
    letters: letters,
    words: words,
    spaces: spaces,
    newlines: new_lines,
    "special symbols": special_symbols,
  };

  const output_field = document.getElementById("jsonOutput");
  output_field.innerHTML = "";

  const heading_elem = document.createElement("h3");
  heading_elem.textContent = "Generic Stats";
  output_field.appendChild(heading_elem);

  for (let key in data) {
    const p = document.createElement("p");
    p.textContent = `${key}: ${data[key]}`;
    output_field.appendChild(p);
  }

  const render = (dataJson, heading) => {
    if (Object.keys(dataJson).length !== 0) {
      const heading_elem = document.createElement("h3");
      heading_elem.textContent = heading;
      output_field.appendChild(heading_elem);

      for (let key in dataJson) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${dataJson[key]}`;
        output_field.appendChild(p);
      }
    }
  };

  render(pronounsJson, "Pronouns");
  render(prepositionsJson, "Prepositions");
  render(articlesJson, "Articles");
}
