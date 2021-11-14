export {
  getPhases
};

import word2case from "word2case/lib/index";

const types = [
  "textfield-widget",
  "textarea-widget",
  "select-widget",
  "carry-forward",
  "equation-widget",
  "pc-draw-arrow",
  "pc-molecule-viewer"
];

const options = {
  styleMap: [
    "p[style-name='Checklist'] => ul.chklist > li:fresh",
    "p[style-name='MultipleChoice'] => ul.mchoice > li:fresh",
    "p[style-name='Component'] => div.component:fresh"
  ]
};

function liInputs(doc, listItems, type, name, value) {
  for (let li of listItems) {
    var choiceName = type == "checkbox" ? name + "." + value : name;
    var input = doc.createElement("input");
    input.type = type;
    input.name = name;
    input.value = choiceName;
    li.insertBefore(input, li.firstChild);
  }
}

// insert input checkboxes or radio buttons
function transformLists(doc, qtype, type, prefix) {
  for (let list of doc.getElementsByTagName("ul")) {
    var q = 1;
    if (list.className === qtype) {
      liInputs(doc, list.getElementsByTagName("li"), type, prefix, q++);
    }
  }
}

// remove extra paragraphs from table cells
function transformTables(doc) {
  for (let td of doc.getElementsByTagName("li")) {
    for (let p of td.getElementsByTagName("p")) {
      while (p.firstChild) {
        var child = p.firstChild;
        p.removeChild(child);
        p.parentElement.appendChild(child);
      }
      p.parentElement.removeChild(p);
    }
  }
}

function removeEmptyParagraphs(doc) {
  for (let p of doc.getElementsByTagName("p")) {
    if (!p.firstChild) {
      p.parentElement.removeChild(p);
    }
  }
}

var cid = 1;
var errors = "";
function transformComponents(doc) {
  var components = {};
  for (let div of doc.getElementsByTagName("div")) {
    if (div.className === "component") {
      div.id = `cid${cid++}`;
      var type = div.textContent.toLowerCase().trim();
      if (types.includes(type)) {
        components[div.id] = type;
        while (div.firstChild) {
          div.removeChild(div.firstChild);
        }
      } else if (type.length == 0) {
        errors += "Missing component type.<br />";
      } else errors += `${type} is not a component type.<br />`;
    }
  }
  for (let math of doc.getElementsByTagName("math")) {
    math.id = `cid${cid++}`;
    math.className = "component";
    components[math.id] = "equation-widget";
  }
  return components;
}

// remove <head></head><body> and </body>
function trimHTML(doc) {
  let str = doc.documentElement.innerHTML;
  return str.substring(19, str.length - 7);
}

function transformPhase(title, id, html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  transformLists(doc, "mchoice", "radio", "mc");
  transformLists(doc, "chklist", "checkbox", "cl");
  transformTables(doc);
  removeEmptyParagraphs(doc);
  var comp = transformComponents(doc);
  return {
    title: title,
    id: id,
    submit: "Submit",
    widgets: comp,
    content: trimHTML(doc)
  };
}

function buildPhases(caseHtml) {
  var phases = [];
  var pid = 0;
  caseHtml.split("<p><page /></p>").forEach(html =>
    phases.push(transformPhase(`phase${pid + 1}`, pid++, html))
  );
  return phases;
}

function getPhases(buffer, err) {
  return word2case.convertToHtml({arrayBuffer: buffer}, options)
    .then(result => {
      if (errors.length == 0) {
        err.style.visibility = "hidden";
        return buildPhases(result.value);
      } else {
        err.innerHTML = `<p>Correct the following:</p><p>${errors}</p>`;
        return null;
      };
    });
  }
