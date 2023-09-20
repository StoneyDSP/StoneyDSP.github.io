/*
 *  /MathJax-v2/extensions/TeX/AMSmath.js
 *
 *  Copyright (c) 2009-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/AMSmath"] = {
  version: "2.7.9",
  number: 0,
  startNumber: 0,
  IDs: {},
  eqIDs: {},
  labels: {},
  eqlabels: {},
  refs: []
};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
  var b = MathJax.ElementJax.mml
    , h = MathJax.InputJax.TeX
    , g = MathJax.Extension["TeX/AMSmath"];
  var d = h.Definitions
    , f = h.Stack.Item
    , a = h.config.equationNumbers;
  var c = function(k) {
      var n = [];
      for (var l = 0, j = k.length; l < j; l++) {
          n[l] = h.Parse.prototype.Em(k[l])
      }
      return n.join(" ")
  };
  var e = (document.getElementsByTagName("base").length === 0) ? "" : String(document.location).replace(/#.*$/, "");
  d.Add({
      mathchar0mo: {
          iiiint: ["2A0C", {
              texClass: b.TEXCLASS.OP
          }]
      },
      macros: {
          mathring: ["Accent", "2DA"],
          nobreakspace: "Tilde",
          negmedspace: ["Spacer", b.LENGTH.NEGATIVEMEDIUMMATHSPACE],
          negthickspace: ["Spacer", b.LENGTH.NEGATIVETHICKMATHSPACE],
          idotsint: ["MultiIntegral", "\\int\\cdots\\int"],
          dddot: ["Accent", "20DB"],
          ddddot: ["Accent", "20DC"],
          sideset: ["Macro", "\\mathop{\\mathop{\\rlap{\\phantom{#3}}}\\nolimits#1\\!\\mathop{#3}\\nolimits#2}", 3],
          boxed: ["Macro", "\\fbox{$\\displaystyle{#1}$}", 1],
          tag: "HandleTag",
          notag: "HandleNoTag",
          label: "HandleLabel",
          ref: "HandleRef",
          eqref: ["HandleRef", true],
          substack: ["Macro", "\\begin{subarray}{c}#1\\end{subarray}", 1],
          injlim: ["NamedOp", "inj&thinsp;lim"],
          projlim: ["NamedOp", "proj&thinsp;lim"],
          varliminf: ["Macro", "\\mathop{\\underline{\\mmlToken{mi}{lim}}}"],
          varlimsup: ["Macro", "\\mathop{\\overline{\\mmlToken{mi}{lim}}}"],
          varinjlim: ["Macro", "\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}}}"],
          varprojlim: ["Macro", "\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}}}"],
          DeclareMathOperator: "HandleDeclareOp",
          operatorname: "HandleOperatorName",
          SkipLimits: "SkipLimits",
          genfrac: "Genfrac",
          frac: ["Genfrac", "", "", "", ""],
          tfrac: ["Genfrac", "", "", "", 1],
          dfrac: ["Genfrac", "", "", "", 0],
          binom: ["Genfrac", "(", ")", "0", ""],
          tbinom: ["Genfrac", "(", ")", "0", 1],
          dbinom: ["Genfrac", "(", ")", "0", 0],
          cfrac: "CFrac",
          shoveleft: ["HandleShove", b.ALIGN.LEFT],
          shoveright: ["HandleShove", b.ALIGN.RIGHT],
          xrightarrow: ["xArrow", 8594, 5, 6],
          xleftarrow: ["xArrow", 8592, 7, 3]
      },
      environment: {
          align: ["AMSarray", null, true, true, "rlrlrlrlrlrl", c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0])],
          "align*": ["AMSarray", null, false, true, "rlrlrlrlrlrl", c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0])],
          multline: ["Multline", null, true],
          "multline*": ["Multline", null, false],
          split: ["AMSarray", null, false, false, "rl", c([0])],
          gather: ["AMSarray", null, true, true, "c"],
          "gather*": ["AMSarray", null, false, true, "c"],
          alignat: ["AlignAt", null, true, true],
          "alignat*": ["AlignAt", null, false, true],
          alignedat: ["AlignAt", null, false, false],
          aligned: ["AlignedAMSArray", null, null, null, "rlrlrlrlrlrl", c([0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0]), ".5em", "D"],
          gathered: ["AlignedAMSArray", null, null, null, "c", null, ".5em", "D"],
          subarray: ["Array", null, null, null, null, c([0]), "0.1em", "S", 1],
          smallmatrix: ["Array", null, null, null, "c", c([1 / 3]), ".2em", "S", 1],
          equation: ["EquationBegin", "Equation", true],
          "equation*": ["EquationBegin", "EquationStar", false],
          eqnarray: ["AMSarray", null, true, true, "rcl", "0 " + b.LENGTH.THICKMATHSPACE, ".5em"],
          "eqnarray*": ["AMSarray", null, false, true, "rcl", "0 " + b.LENGTH.THICKMATHSPACE, ".5em"]
      },
      delimiter: {
          "\\lvert": ["007C", {
              texClass: b.TEXCLASS.OPEN
          }],
          "\\rvert": ["007C", {
              texClass: b.TEXCLASS.CLOSE
          }],
          "\\lVert": ["2016", {
              texClass: b.TEXCLASS.OPEN
          }],
          "\\rVert": ["2016", {
              texClass: b.TEXCLASS.CLOSE
          }]
      }
  }, null, true);
  h.Parse.Augment({
      HandleTag: function(k) {
          var m = this.GetStar();
          var j = this.trimSpaces(this.GetArgument(k))
            , i = j;
          if (!m) {
              j = a.formatTag(j)
          }
          var l = this.stack.global;
          l.tagID = i;
          if (l.notags) {
              h.Error(["CommandNotAllowedInEnv", "%1 not allowed in %2 environment", k, l.notags])
          }
          if (l.tag) {
              h.Error(["MultipleCommand", "Multiple %1", k])
          }
          l.tag = b.mtd.apply(b, this.InternalMath(j)).With({
              id: a.formatID(i)
          })
      },
      HandleNoTag: function(i) {
          if (this.stack.global.tag) {
              delete this.stack.global.tag
          }
          this.stack.global.notag = true
      },
      HandleLabel: function(j) {
          var k = this.stack.global
            , i = this.GetArgument(j);
          if (i === "") {
              return
          }
          if (!g.refUpdate) {
              if (k.label) {
                  h.Error(["MultipleCommand", "Multiple %1", j])
              }
              k.label = i;
              if (g.labels[i] || g.eqlabels[i]) {
                  h.Error(["MultipleLabel", "Label '%1' multiply defined", i])
              }
              g.eqlabels[i] = {
                  tag: "???",
                  id: ""
              }
          }
      },
      HandleRef: function(k, m) {
          var j = this.GetArgument(k);
          var l = g.labels[j] || g.eqlabels[j];
          if (!l) {
              l = {
                  tag: "???",
                  id: ""
              };
              g.badref = !g.refUpdate
          }
          var i = l.tag;
          if (m) {
              i = a.formatTag(i)
          }
          this.Push(b.mrow.apply(b, this.InternalMath(i)).With({
              href: a.formatURL(l.id, e),
              "class": "MathJax_ref"
          }))
      },
      HandleDeclareOp: function(j) {
          var i = (this.GetStar() ? "" : "\\nolimits\\SkipLimits");
          var k = this.trimSpaces(this.GetArgument(j));
          if (k.charAt(0) == "\\") {
              k = k.substr(1)
          }
          var l = this.GetArgument(j);
          if (!l.match(/\\text/)) {
              l = l.replace(/\*/g, "\\text{*}").replace(/-/g, "\\text{-}")
          }
          this.setDef(k, ["Macro", "\\mathop{\\rm " + l + "}" + i])
      },
      HandleOperatorName: function(j) {
          var i = (this.GetStar() ? "" : "\\nolimits\\SkipLimits");
          var k = this.trimSpaces(this.GetArgument(j));
          if (!k.match(/\\text/)) {
              k = k.replace(/\*/g, "\\text{*}").replace(/-/g, "\\text{-}")
          }
          this.string = "\\mathop{\\rm " + k + "}" + i + " " + this.string.slice(this.i);
          this.i = 0
      },
      SkipLimits: function(j) {
          var l = this.GetNext()
            , k = this.i;
          if (l === "\\" && ++this.i && this.GetCS() !== "limits") {
              this.i = k
          }
      },
      HandleShove: function(j, i) {
          var k = this.stack.Top();
          if (k.type !== "multline") {
              h.Error(["CommandInMultline", "%1 can only appear within the multline environment", j])
          }
          if (k.data.length) {
              h.Error(["CommandAtTheBeginingOfLine", "%1 must come at the beginning of the line", j])
          }
          k.data.shove = i
      },
      CFrac: function(l) {
          var i = this.trimSpaces(this.GetBrackets(l, ""))
            , k = this.GetArgument(l)
            , m = this.GetArgument(l);
          var j = b.mfrac(h.Parse("\\strut\\textstyle{" + k + "}", this.stack.env).mml(), h.Parse("\\strut\\textstyle{" + m + "}", this.stack.env).mml());
          i = ({
              l: b.ALIGN.LEFT,
              r: b.ALIGN.RIGHT,
              "": ""
          })[i];
          if (i == null) {
              h.Error(["IllegalAlign", "Illegal alignment specified in %1", l])
          }
          if (i) {
              j.numalign = j.denomalign = i
          }
          this.Push(j)
      },
      Genfrac: function(j, l, q, n, i) {
          if (l == null) {
              l = this.GetDelimiterArg(j)
          }
          if (q == null) {
              q = this.GetDelimiterArg(j)
          }
          if (n == null) {
              n = this.GetArgument(j)
          }
          if (i == null) {
              i = this.trimSpaces(this.GetArgument(j))
          }
          var m = this.ParseArg(j);
          var p = this.ParseArg(j);
          var k = b.mfrac(m, p);
          if (n !== "") {
              k.linethickness = n
          }
          if (l || q) {
              k = h.fixedFence(l, k.With({
                  texWithDelims: true
              }), q)
          }
          if (i !== "") {
              var o = (["D", "T", "S", "SS"])[i];
              if (o == null) {
                  h.Error(["BadMathStyleFor", "Bad math style for %1", j])
              }
              k = b.mstyle(k);
              if (o === "D") {
                  k.displaystyle = true;
                  k.scriptlevel = 0
              } else {
                  k.displaystyle = false;
                  k.scriptlevel = i - 1
              }
          }
          this.Push(k)
      },
      Multline: function(j, i) {
          this.Push(j);
          this.checkEqnEnv();
          return f.multline(i, this.stack).With({
              arraydef: {
                  displaystyle: true,
                  rowspacing: ".5em",
                  width: h.config.MultLineWidth,
                  columnwidth: "100%",
                  side: h.config.TagSide,
                  minlabelspacing: h.config.TagIndent
              }
          })
      },
      AMSarray: function(k, j, i, m, l) {
          this.Push(k);
          if (i) {
              this.checkEqnEnv()
          }
          m = m.replace(/[^clr]/g, "").split("").join(" ");
          m = m.replace(/l/g, "left").replace(/r/g, "right").replace(/c/g, "center");
          return f.AMSarray(k.name, j, i, this.stack).With({
              arraydef: {
                  displaystyle: true,
                  rowspacing: ".5em",
                  columnalign: m,
                  columnspacing: (l || "1em"),
                  rowspacing: "3pt",
                  side: h.config.TagSide,
                  minlabelspacing: h.config.TagIndent
              }
          })
      },
      AlignedAMSArray: function(i) {
          var j = this.GetBrackets("\\begin{" + i.name + "}");
          return this.setArrayAlign(this.AMSarray.apply(this, arguments), j)
      },
      AlignAt: function(l, j, i) {
          var q, k, p = "", o = [];
          if (!i) {
              k = this.GetBrackets("\\begin{" + l.name + "}")
          }
          q = this.GetArgument("\\begin{" + l.name + "}");
          if (q.match(/[^0-9]/)) {
              h.Error(["PositiveIntegerArg", "Argument to %1 must me a positive integer", "\\begin{" + l.name + "}"])
          }
          while (q > 0) {
              p += "rl";
              o.push("0em 0em");
              q--
          }
          o = o.join(" ");
          if (i) {
              return this.AMSarray(l, j, i, p, o)
          }
          var m = this.AMSarray(l, j, i, p, o);
          return this.setArrayAlign(m, k)
      },
      EquationBegin: function(i, j) {
          this.checkEqnEnv();
          this.stack.global.forcetag = (j && a.autoNumber !== "none");
          return i
      },
      EquationStar: function(i, j) {
          this.stack.global.tagged = true;
          return j
      },
      checkEqnEnv: function() {
          if (this.stack.global.eqnenv) {
              h.Error(["ErroneousNestingEq", "Erroneous nesting of equation structures"])
          }
          this.stack.global.eqnenv = true
      },
      MultiIntegral: function(j, m) {
          var l = this.GetNext();
          if (l === "\\") {
              var k = this.i;
              l = this.GetArgument(j);
              this.i = k;
              if (l === "\\limits") {
                  if (j === "\\idotsint") {
                      m = "\\!\\!\\mathop{\\,\\," + m + "}"
                  } else {
                      m = "\\!\\!\\!\\mathop{\\,\\,\\," + m + "}"
                  }
              }
          }
          this.string = m + " " + this.string.slice(this.i);
          this.i = 0
      },
      xArrow: function(k, o, n, i) {
          var m = {
              width: "+" + (n + i) + "mu",
              lspace: n + "mu"
          };
          var p = this.GetBrackets(k)
            , q = this.ParseArg(k);
          var s = b.mo(b.chars(String.fromCharCode(o))).With({
              stretchy: true,
              texClass: b.TEXCLASS.REL
          });
          var j = b.munderover(s);
          j.SetData(j.over, b.mpadded(q).With(m).With({
              voffset: ".15em"
          }));
          if (p) {
              p = h.Parse(p, this.stack.env).mml();
              j.SetData(j.under, b.mpadded(p).With(m).With({
                  voffset: "-.24em"
              }))
          }
          this.Push(j.With({
              subsupOK: true
          }))
      },
      GetDelimiterArg: function(i) {
          var j = this.trimSpaces(this.GetArgument(i));
          if (j == "") {
              return null
          }
          if (j in d.delimiter) {
              return j
          }
          h.Error(["MissingOrUnrecognizedDelim", "Missing or unrecognized delimiter for %1", i])
      },
      GetStar: function() {
          var i = (this.GetNext() === "*");
          if (i) {
              this.i++
          }
          return i
      }
  });
  f.Augment({
      autoTag: function() {
          var j = this.global;
          if (!j.notag) {
              g.number++;
              j.tagID = a.formatNumber(g.number.toString());
              var i = h.Parse("\\text{" + a.formatTag(j.tagID) + "}", {}).mml();
              j.tag = b.mtd(i).With({
                  id: a.formatID(j.tagID)
              })
          }
      },
      getTag: function() {
          var m = this.global
            , k = m.tag;
          m.tagged = true;
          if (m.label) {
              if (a.useLabelIds) {
                  k.id = a.formatID(m.label)
              }
              g.eqlabels[m.label] = {
                  tag: m.tagID,
                  id: k.id
              }
          }
          if (document.getElementById(k.id) || g.IDs[k.id] || g.eqIDs[k.id]) {
              var l = 0, j;
              do {
                  l++;
                  j = k.id + "_" + l
              } while (document.getElementById(j) || g.IDs[j] || g.eqIDs[j]);
              k.id = j;
              if (m.label) {
                  g.eqlabels[m.label].id = j
              }
          }
          g.eqIDs[k.id] = 1;
          this.clearTag();
          return k
      },
      clearTag: function() {
          var i = this.global;
          delete i.tag;
          delete i.tagID;
          delete i.label
      },
      fixInitialMO: function(l) {
          for (var k = 0, j = l.length; k < j; k++) {
              if (l[k] && (l[k].type !== "mspace" && (l[k].type !== "texatom" || (l[k].data[0] && l[k].data[0].data.length)))) {
                  if (l[k].isEmbellished() || (l[k].type === "texatom" && l[k].texClass === b.TEXCLASS.REL)) {
                      l.unshift(b.mi())
                  }
                  break
              }
          }
      }
  });
  f.multline = f.array.Subclass({
      type: "multline",
      Init: function(j, i) {
          this.SUPER(arguments).Init.apply(this);
          this.numbered = (j && a.autoNumber !== "none");
          this.save = {
              notag: i.global.notag
          };
          i.global.tagged = !j && !i.global.forcetag
      },
      EndEntry: function() {
          if (this.table.length) {
              this.fixInitialMO(this.data)
          }
          var i = b.mtd.apply(b, this.data);
          if (this.data.shove) {
              i.columnalign = this.data.shove
          }
          this.row.push(i);
          this.data = []
      },
      EndRow: function() {
          if (this.row.length != 1) {
              h.Error(["MultlineRowsOneCol", "The rows within the %1 environment must have exactly one column", "multline"])
          }
          this.table.push(this.row);
          this.row = []
      },
      EndTable: function() {
          this.SUPER(arguments).EndTable.call(this);
          if (this.table.length) {
              var k = this.table.length - 1, n, l = -1;
              if (!this.table[0][0].columnalign) {
                  this.table[0][0].columnalign = b.ALIGN.LEFT
              }
              if (!this.table[k][0].columnalign) {
                  this.table[k][0].columnalign = b.ALIGN.RIGHT
              }
              if (!this.global.tag && this.numbered) {
                  this.autoTag()
              }
              if (this.global.tag && !this.global.notags) {
                  l = (this.arraydef.side === "left" ? 0 : this.table.length - 1);
                  this.table[l] = [this.getTag()].concat(this.table[l])
              }
              for (n = 0,
              k = this.table.length; n < k; n++) {
                  var j = (n === l ? b.mlabeledtr : b.mtr);
                  this.table[n] = j.apply(b, this.table[n])
              }
          }
          this.global.notag = this.save.notag
      }
  });
  f.AMSarray = f.array.Subclass({
      type: "AMSarray",
      Init: function(l, k, j, i) {
          this.SUPER(arguments).Init.apply(this);
          this.numbered = (k && a.autoNumber !== "none");
          this.save = {
              notags: i.global.notags,
              notag: i.global.notag
          };
          i.global.notags = (j ? null : l);
          i.global.tagged = !k && j && !i.global.forcetag
      },
      EndEntry: function() {
          if (this.row.length % 2 === 1) {
              this.fixInitialMO(this.data)
          }
          this.row.push(b.mtd.apply(b, this.data));
          this.data = []
      },
      EndRow: function() {
          var i = b.mtr;
          if (!this.global.tag && this.numbered) {
              this.autoTag()
          }
          if (!this.global.notags) {
              if (this.global.tag) {
                  this.row = [this.getTag()].concat(this.row);
                  i = b.mlabeledtr
              } else {
                  this.clearTag()
              }
          }
          if (this.numbered) {
              delete this.global.notag
          }
          this.table.push(i.apply(b, this.row));
          this.row = []
      },
      EndTable: function() {
          this.SUPER(arguments).EndTable.call(this);
          this.global.notags = this.save.notags;
          this.global.notag = this.save.notag
      }
  });
  f.start.Augment({
      oldCheckItem: f.start.prototype.checkItem,
      checkItem: function(k) {
          if (k.type === "stop") {
              var i = this.mmlData()
                , j = this.global;
              if (g.display && !j.tag && !j.tagged && !j.isInner && (a.autoNumber === "all" || j.forcetag)) {
                  this.autoTag()
              }
              if (j.tag) {
                  var m = [this.getTag(), b.mtd(i)];
                  var l = {
                      side: h.config.TagSide,
                      minlabelspacing: h.config.TagIndent,
                      displaystyle: "inherit"
                  };
                  i = b.mtable(b.mlabeledtr.apply(b, m)).With(l)
              }
              return f.mml(i)
          }
          return this.oldCheckItem.call(this, k)
      }
  });
  h.prefilterHooks.Add(function(i) {
      g.display = i.display;
      g.number = g.startNumber;
      g.eqlabels = {};
      g.eqIDs = {};
      g.badref = false;
      if (g.refUpdate) {
          g.number = i.script.MathJax.startNumber
      }
  });
  h.postfilterHooks.Add(function(i) {
      i.script.MathJax.startNumber = g.startNumber;
      g.startNumber = g.number;
      MathJax.Hub.Insert(g.IDs, g.eqIDs);
      MathJax.Hub.Insert(g.labels, g.eqlabels);
      if (g.badref && !i.math.texError) {
          g.refs.push(i.script)
      }
  }, 100);
  MathJax.Hub.Register.MessageHook("Begin Math Input", function() {
      g.refs = [];
      g.refUpdate = false
  });
  MathJax.Hub.Register.MessageHook("End Math Input", function(l) {
      if (g.refs.length) {
          g.refUpdate = true;
          for (var k = 0, j = g.refs.length; k < j; k++) {
              g.refs[k].MathJax.state = MathJax.ElementJax.STATE.UPDATE
          }
          return MathJax.Hub.processInput({
              scripts: g.refs,
              start: new Date().getTime(),
              i: 0,
              j: 0,
              jax: {},
              jaxIDs: []
          })
      }
      return null
  });
  h.resetEquationNumbers = function(j, i) {
      g.startNumber = (j || 0);
      if (!i) {
          g.labels = {};
          g.IDs = {}
      }
  }
  ;
  MathJax.Hub.Startup.signal.Post("TeX AMSmath Ready")
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMSmath.js");