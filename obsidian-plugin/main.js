var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/defuddle/dist/index.full.js
var require_index_full = __commonJS({
  "node_modules/defuddle/dist/index.full.js"(exports, module2) {
    !(function(e, t) {
      "object" == typeof exports && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Defuddle = t() : e.Defuddle = t();
    })(Object("undefined" != typeof self ? self : exports), (() => (() => {
      var e = { 354(e2) {
        var t2;
        t2 = () => (() => {
          var e3 = { 4582: (e4, t4) => {
            "use strict";
            function r3(e5, t5) {
              return void 0 === t5 && (t5 = Object), t5 && "function" == typeof t5.freeze ? t5.freeze(e5) : e5;
            }
            var n3 = r3({ HTML: "text/html", isHTML: function(e5) {
              return e5 === n3.HTML;
            }, XML_APPLICATION: "application/xml", XML_TEXT: "text/xml", XML_XHTML_APPLICATION: "application/xhtml+xml", XML_SVG_IMAGE: "image/svg+xml" }), o = r3({ HTML: "http://www.w3.org/1999/xhtml", isHTML: function(e5) {
              return e5 === o.HTML;
            }, SVG: "http://www.w3.org/2000/svg", XML: "http://www.w3.org/XML/1998/namespace", XMLNS: "http://www.w3.org/2000/xmlns/" });
            t4.assign = function(e5, t5) {
              if (null === e5 || "object" != typeof e5) throw new TypeError("target is not an object");
              for (var r4 in t5) Object.prototype.hasOwnProperty.call(t5, r4) && (e5[r4] = t5[r4]);
              return e5;
            }, t4.find = function(e5, t5, r4) {
              if (void 0 === r4 && (r4 = Array.prototype), e5 && "function" == typeof r4.find) return r4.find.call(e5, t5);
              for (var n4 = 0; n4 < e5.length; n4++) if (Object.prototype.hasOwnProperty.call(e5, n4)) {
                var o2 = e5[n4];
                if (t5.call(void 0, o2, n4, e5)) return o2;
              }
            }, t4.freeze = r3, t4.MIME_TYPE = n3, t4.NAMESPACE = o;
          }, 5752: (e4, t4, r3) => {
            var n3 = r3(4582), o = r3(4722), a = r3(6559), i = r3(4466), s = o.DOMImplementation, l = n3.NAMESPACE, c = i.ParseError, u = i.XMLReader;
            function d(e5) {
              return e5.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
            }
            function h(e5) {
              this.options = e5 || { locator: {} };
            }
            function m() {
              this.cdata = false;
            }
            function p(e5, t5) {
              t5.lineNumber = e5.lineNumber, t5.columnNumber = e5.columnNumber;
            }
            function f(e5) {
              if (e5) return "\n@" + (e5.systemId || "") + "#[line:" + e5.lineNumber + ",col:" + e5.columnNumber + "]";
            }
            function g(e5, t5, r4) {
              return "string" == typeof e5 ? e5.substr(t5, r4) : e5.length >= t5 + r4 || t5 ? new java.lang.String(e5, t5, r4) + "" : e5;
            }
            function b(e5, t5) {
              e5.currentElement ? e5.currentElement.appendChild(t5) : e5.doc.appendChild(t5);
            }
            h.prototype.parseFromString = function(e5, t5) {
              var r4 = this.options, n4 = new u(), o2 = r4.domBuilder || new m(), i2 = r4.errorHandler, s2 = r4.locator, c2 = r4.xmlns || {}, h2 = /\/x?html?$/.test(t5), p2 = h2 ? a.HTML_ENTITIES : a.XML_ENTITIES;
              s2 && o2.setDocumentLocator(s2), n4.errorHandler = (function(e6, t6, r5) {
                if (!e6) {
                  if (t6 instanceof m) return t6;
                  e6 = t6;
                }
                var n5 = {}, o3 = e6 instanceof Function;
                function a2(t7) {
                  var a3 = e6[t7];
                  !a3 && o3 && (a3 = 2 == e6.length ? function(r6) {
                    e6(t7, r6);
                  } : e6), n5[t7] = a3 && function(e7) {
                    a3("[xmldom " + t7 + "]	" + e7 + f(r5));
                  } || function() {
                  };
                }
                return r5 = r5 || {}, a2("warning"), a2("error"), a2("fatalError"), n5;
              })(i2, o2, s2), n4.domBuilder = r4.domBuilder || o2, h2 && (c2[""] = l.HTML), c2.xml = c2.xml || l.XML;
              var g2 = r4.normalizeLineEndings || d;
              return e5 && "string" == typeof e5 ? n4.parse(g2(e5), c2, p2) : n4.errorHandler.error("invalid doc source"), o2.doc;
            }, m.prototype = { startDocument: function() {
              this.doc = new s().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
            }, startElement: function(e5, t5, r4, n4) {
              var o2 = this.doc, a2 = o2.createElementNS(e5, r4 || t5), i2 = n4.length;
              b(this, a2), this.currentElement = a2, this.locator && p(this.locator, a2);
              for (var s2 = 0; s2 < i2; s2++) {
                e5 = n4.getURI(s2);
                var l2 = n4.getValue(s2), c2 = (r4 = n4.getQName(s2), o2.createAttributeNS(e5, r4));
                this.locator && p(n4.getLocator(s2), c2), c2.value = c2.nodeValue = l2, a2.setAttributeNode(c2);
              }
            }, endElement: function(e5, t5, r4) {
              var n4 = this.currentElement;
              n4.tagName, this.currentElement = n4.parentNode;
            }, startPrefixMapping: function(e5, t5) {
            }, endPrefixMapping: function(e5) {
            }, processingInstruction: function(e5, t5) {
              var r4 = this.doc.createProcessingInstruction(e5, t5);
              this.locator && p(this.locator, r4), b(this, r4);
            }, ignorableWhitespace: function(e5, t5, r4) {
            }, characters: function(e5, t5, r4) {
              if (e5 = g.apply(this, arguments)) {
                if (this.cdata) var n4 = this.doc.createCDATASection(e5);
                else n4 = this.doc.createTextNode(e5);
                this.currentElement ? this.currentElement.appendChild(n4) : /^\s*$/.test(e5) && this.doc.appendChild(n4), this.locator && p(this.locator, n4);
              }
            }, skippedEntity: function(e5) {
            }, endDocument: function() {
              this.doc.normalize();
            }, setDocumentLocator: function(e5) {
              (this.locator = e5) && (e5.lineNumber = 0);
            }, comment: function(e5, t5, r4) {
              e5 = g.apply(this, arguments);
              var n4 = this.doc.createComment(e5);
              this.locator && p(this.locator, n4), b(this, n4);
            }, startCDATA: function() {
              this.cdata = true;
            }, endCDATA: function() {
              this.cdata = false;
            }, startDTD: function(e5, t5, r4) {
              var n4 = this.doc.implementation;
              if (n4 && n4.createDocumentType) {
                var o2 = n4.createDocumentType(e5, t5, r4);
                this.locator && p(this.locator, o2), b(this, o2), this.doc.doctype = o2;
              }
            }, warning: function(e5) {
              console.warn("[xmldom warning]	" + e5, f(this.locator));
            }, error: function(e5) {
              console.error("[xmldom error]	" + e5, f(this.locator));
            }, fatalError: function(e5) {
              throw new c(e5, this.locator);
            } }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, (function(e5) {
              m.prototype[e5] = function() {
                return null;
              };
            })), t4.DOMParser = h;
          }, 4722: (e4, t4, r3) => {
            var n3 = r3(4582), o = n3.find, a = n3.NAMESPACE;
            function i(e5) {
              return "" !== e5;
            }
            function s(e5, t5) {
              return e5.hasOwnProperty(t5) || (e5[t5] = true), e5;
            }
            function l(e5) {
              if (!e5) return [];
              var t5 = (function(e6) {
                return e6 ? e6.split(/[\t\n\f\r ]+/).filter(i) : [];
              })(e5);
              return Object.keys(t5.reduce(s, {}));
            }
            function c(e5, t5) {
              for (var r4 in e5) Object.prototype.hasOwnProperty.call(e5, r4) && (t5[r4] = e5[r4]);
            }
            function u(e5, t5) {
              var r4 = e5.prototype;
              if (!(r4 instanceof t5)) {
                let n5 = function() {
                };
                var n4 = n5;
                n5.prototype = t5.prototype, c(r4, n5 = new n5()), e5.prototype = r4 = n5;
              }
              r4.constructor != e5 && ("function" != typeof e5 && console.error("unknown Class:" + e5), r4.constructor = e5);
            }
            var d = {}, h = d.ELEMENT_NODE = 1, m = d.ATTRIBUTE_NODE = 2, p = d.TEXT_NODE = 3, f = d.CDATA_SECTION_NODE = 4, g = d.ENTITY_REFERENCE_NODE = 5, b = d.ENTITY_NODE = 6, x = d.PROCESSING_INSTRUCTION_NODE = 7, y = d.COMMENT_NODE = 8, v = d.DOCUMENT_NODE = 9, w = d.DOCUMENT_TYPE_NODE = 10, A = d.DOCUMENT_FRAGMENT_NODE = 11, C = d.NOTATION_NODE = 12, E = {}, S = {}, _ = (E.INDEX_SIZE_ERR = (S[1] = "Index size error", 1), E.DOMSTRING_SIZE_ERR = (S[2] = "DOMString size error", 2), E.HIERARCHY_REQUEST_ERR = (S[3] = "Hierarchy request error", 3)), T = (E.WRONG_DOCUMENT_ERR = (S[4] = "Wrong document", 4), E.INVALID_CHARACTER_ERR = (S[5] = "Invalid character", 5), E.NO_DATA_ALLOWED_ERR = (S[6] = "No data allowed", 6), E.NO_MODIFICATION_ALLOWED_ERR = (S[7] = "No modification allowed", 7), E.NOT_FOUND_ERR = (S[8] = "Not found", 8)), q = (E.NOT_SUPPORTED_ERR = (S[9] = "Not supported", 9), E.INUSE_ATTRIBUTE_ERR = (S[10] = "Attribute in use", 10));
            function k(e5, t5) {
              if (t5 instanceof Error) var r4 = t5;
              else r4 = this, Error.call(this, S[e5]), this.message = S[e5], Error.captureStackTrace && Error.captureStackTrace(this, k);
              return r4.code = e5, t5 && (this.message = this.message + ": " + t5), r4;
            }
            function N() {
            }
            function L(e5, t5) {
              this._node = e5, this._refresh = t5, O(this);
            }
            function O(e5) {
              var t5 = e5._node._inc || e5._node.ownerDocument._inc;
              if (e5._inc !== t5) {
                var r4 = e5._refresh(e5._node);
                if (xe(e5, "length", r4.length), !e5.$$length || r4.length < e5.$$length) for (var n4 = r4.length; n4 in e5; n4++) Object.prototype.hasOwnProperty.call(e5, n4) && delete e5[n4];
                c(r4, e5), e5._inc = t5;
              }
            }
            function M() {
            }
            function D(e5, t5) {
              for (var r4 = e5.length; r4--; ) if (e5[r4] === t5) return r4;
            }
            function B(e5, t5, r4, n4) {
              if (n4 ? t5[D(t5, n4)] = r4 : t5[t5.length++] = r4, e5) {
                r4.ownerElement = e5;
                var o2 = e5.ownerDocument;
                o2 && (n4 && z(o2, e5, n4), (function(e6, t6, r5) {
                  e6 && e6._inc++, r5.namespaceURI === a.XMLNS && (t6._nsMap[r5.prefix ? r5.localName : ""] = r5.value);
                })(o2, e5, r4));
              }
            }
            function $(e5, t5, r4) {
              var n4 = D(t5, r4);
              if (!(n4 >= 0)) throw new k(T, new Error(e5.tagName + "@" + r4));
              for (var o2 = t5.length - 1; n4 < o2; ) t5[n4] = t5[++n4];
              if (t5.length = o2, e5) {
                var a2 = e5.ownerDocument;
                a2 && (z(a2, e5, r4), r4.ownerElement = null);
              }
            }
            function I() {
            }
            function R() {
            }
            function P(e5) {
              return ("<" == e5 ? "&lt;" : ">" == e5 && "&gt;") || "&" == e5 && "&amp;" || '"' == e5 && "&quot;" || "&#" + e5.charCodeAt() + ";";
            }
            function F(e5, t5) {
              if (t5(e5)) return true;
              if (e5 = e5.firstChild) do {
                if (F(e5, t5)) return true;
              } while (e5 = e5.nextSibling);
            }
            function j() {
              this.ownerDocument = this;
            }
            function z(e5, t5, r4, n4) {
              e5 && e5._inc++, r4.namespaceURI === a.XMLNS && delete t5._nsMap[r4.prefix ? r4.localName : ""];
            }
            function H(e5, t5, r4) {
              if (e5 && e5._inc) {
                e5._inc++;
                var n4 = t5.childNodes;
                if (r4) n4[n4.length++] = r4;
                else {
                  for (var o2 = t5.firstChild, a2 = 0; o2; ) n4[a2++] = o2, o2 = o2.nextSibling;
                  n4.length = a2, delete n4[n4.length];
                }
              }
            }
            function U(e5, t5) {
              var r4 = t5.previousSibling, n4 = t5.nextSibling;
              return r4 ? r4.nextSibling = n4 : e5.firstChild = n4, n4 ? n4.previousSibling = r4 : e5.lastChild = r4, t5.parentNode = null, t5.previousSibling = null, t5.nextSibling = null, H(e5.ownerDocument, e5), t5;
            }
            function G(e5) {
              return e5 && e5.nodeType === R.DOCUMENT_TYPE_NODE;
            }
            function W(e5) {
              return e5 && e5.nodeType === R.ELEMENT_NODE;
            }
            function V(e5) {
              return e5 && e5.nodeType === R.TEXT_NODE;
            }
            function X(e5, t5) {
              var r4 = e5.childNodes || [];
              if (o(r4, W) || G(t5)) return false;
              var n4 = o(r4, G);
              return !(t5 && n4 && r4.indexOf(n4) > r4.indexOf(t5));
            }
            function J(e5, t5) {
              var r4 = e5.childNodes || [];
              if (o(r4, (function(e6) {
                return W(e6) && e6 !== t5;
              }))) return false;
              var n4 = o(r4, G);
              return !(t5 && n4 && r4.indexOf(n4) > r4.indexOf(t5));
            }
            function Z(e5, t5, r4) {
              var n4 = e5.childNodes || [], a2 = t5.childNodes || [];
              if (t5.nodeType === R.DOCUMENT_FRAGMENT_NODE) {
                var i2 = a2.filter(W);
                if (i2.length > 1 || o(a2, V)) throw new k(_, "More than one element or text in fragment");
                if (1 === i2.length && !X(e5, r4)) throw new k(_, "Element in fragment can not be inserted before doctype");
              }
              if (W(t5) && !X(e5, r4)) throw new k(_, "Only one element can be added and only after doctype");
              if (G(t5)) {
                if (o(n4, G)) throw new k(_, "Only one doctype is allowed");
                var s2 = o(n4, W);
                if (r4 && n4.indexOf(s2) < n4.indexOf(r4)) throw new k(_, "Doctype can only be inserted before an element");
                if (!r4 && s2) throw new k(_, "Doctype can not be appended since element is present");
              }
            }
            function Y(e5, t5, r4) {
              var n4 = e5.childNodes || [], a2 = t5.childNodes || [];
              if (t5.nodeType === R.DOCUMENT_FRAGMENT_NODE) {
                var i2 = a2.filter(W);
                if (i2.length > 1 || o(a2, V)) throw new k(_, "More than one element or text in fragment");
                if (1 === i2.length && !J(e5, r4)) throw new k(_, "Element in fragment can not be inserted before doctype");
              }
              if (W(t5) && !J(e5, r4)) throw new k(_, "Only one element can be added and only after doctype");
              if (G(t5)) {
                if (o(n4, (function(e6) {
                  return G(e6) && e6 !== r4;
                }))) throw new k(_, "Only one doctype is allowed");
                var s2 = o(n4, W);
                if (r4 && n4.indexOf(s2) < n4.indexOf(r4)) throw new k(_, "Doctype can only be inserted before an element");
              }
            }
            function K(e5, t5, r4, n4) {
              (function(e6, t6, r5) {
                if (!(function(e7) {
                  return e7 && (e7.nodeType === R.DOCUMENT_NODE || e7.nodeType === R.DOCUMENT_FRAGMENT_NODE || e7.nodeType === R.ELEMENT_NODE);
                })(e6)) throw new k(_, "Unexpected parent node type " + e6.nodeType);
                if (r5 && r5.parentNode !== e6) throw new k(T, "child not in parent");
                if (!(function(e7) {
                  return e7 && (W(e7) || V(e7) || G(e7) || e7.nodeType === R.DOCUMENT_FRAGMENT_NODE || e7.nodeType === R.COMMENT_NODE || e7.nodeType === R.PROCESSING_INSTRUCTION_NODE);
                })(t6) || G(t6) && e6.nodeType !== R.DOCUMENT_NODE) throw new k(_, "Unexpected node type " + t6.nodeType + " for parent node type " + e6.nodeType);
              })(e5, t5, r4), e5.nodeType === R.DOCUMENT_NODE && (n4 || Z)(e5, t5, r4);
              var o2 = t5.parentNode;
              if (o2 && o2.removeChild(t5), t5.nodeType === A) {
                var a2 = t5.firstChild;
                if (null == a2) return t5;
                var i2 = t5.lastChild;
              } else a2 = i2 = t5;
              var s2 = r4 ? r4.previousSibling : e5.lastChild;
              a2.previousSibling = s2, i2.nextSibling = r4, s2 ? s2.nextSibling = a2 : e5.firstChild = a2, null == r4 ? e5.lastChild = i2 : r4.previousSibling = i2;
              do {
                a2.parentNode = e5;
              } while (a2 !== i2 && (a2 = a2.nextSibling));
              return H(e5.ownerDocument || e5, e5), t5.nodeType == A && (t5.firstChild = t5.lastChild = null), t5;
            }
            function Q() {
              this._nsMap = {};
            }
            function ee() {
            }
            function te() {
            }
            function re() {
            }
            function ne() {
            }
            function oe() {
            }
            function ae() {
            }
            function ie() {
            }
            function se() {
            }
            function le() {
            }
            function ce() {
            }
            function ue() {
            }
            function de() {
            }
            function he(e5, t5) {
              var r4 = [], n4 = 9 == this.nodeType && this.documentElement || this, o2 = n4.prefix, a2 = n4.namespaceURI;
              if (a2 && null == o2 && null == (o2 = n4.lookupPrefix(a2))) var i2 = [{ namespace: a2, prefix: null }];
              return fe(this, r4, e5, t5, i2), r4.join("");
            }
            function me(e5, t5, r4) {
              var n4 = e5.prefix || "", o2 = e5.namespaceURI;
              if (!o2) return false;
              if ("xml" === n4 && o2 === a.XML || o2 === a.XMLNS) return false;
              for (var i2 = r4.length; i2--; ) {
                var s2 = r4[i2];
                if (s2.prefix === n4) return s2.namespace !== o2;
              }
              return true;
            }
            function pe(e5, t5, r4) {
              e5.push(" ", t5, '="', r4.replace(/[<>&"\t\n\r]/g, P), '"');
            }
            function fe(e5, t5, r4, n4, o2) {
              if (o2 || (o2 = []), n4) {
                if (!(e5 = n4(e5))) return;
                if ("string" == typeof e5) return void t5.push(e5);
              }
              switch (e5.nodeType) {
                case h:
                  var i2 = e5.attributes, s2 = i2.length, l2 = e5.firstChild, c2 = e5.tagName, u2 = c2;
                  if (!(r4 = a.isHTML(e5.namespaceURI) || r4) && !e5.prefix && e5.namespaceURI) {
                    for (var d2, b2 = 0; b2 < i2.length; b2++) if ("xmlns" === i2.item(b2).name) {
                      d2 = i2.item(b2).value;
                      break;
                    }
                    if (!d2) {
                      for (var C2 = o2.length - 1; C2 >= 0; C2--) if ("" === (E2 = o2[C2]).prefix && E2.namespace === e5.namespaceURI) {
                        d2 = E2.namespace;
                        break;
                      }
                    }
                    if (d2 !== e5.namespaceURI) for (C2 = o2.length - 1; C2 >= 0; C2--) {
                      var E2;
                      if ((E2 = o2[C2]).namespace === e5.namespaceURI) {
                        E2.prefix && (u2 = E2.prefix + ":" + c2);
                        break;
                      }
                    }
                  }
                  t5.push("<", u2);
                  for (var S2 = 0; S2 < s2; S2++) "xmlns" == (_2 = i2.item(S2)).prefix ? o2.push({ prefix: _2.localName, namespace: _2.value }) : "xmlns" == _2.nodeName && o2.push({ prefix: "", namespace: _2.value });
                  for (S2 = 0; S2 < s2; S2++) {
                    var _2, T2, q2;
                    me(_2 = i2.item(S2), 0, o2) && (pe(t5, (T2 = _2.prefix || "") ? "xmlns:" + T2 : "xmlns", q2 = _2.namespaceURI), o2.push({ prefix: T2, namespace: q2 })), fe(_2, t5, r4, n4, o2);
                  }
                  if (c2 === u2 && me(e5, 0, o2) && (pe(t5, (T2 = e5.prefix || "") ? "xmlns:" + T2 : "xmlns", q2 = e5.namespaceURI), o2.push({ prefix: T2, namespace: q2 })), l2 || r4 && !/^(?:meta|link|img|br|hr|input)$/i.test(c2)) {
                    if (t5.push(">"), r4 && /^script$/i.test(c2)) for (; l2; ) l2.data ? t5.push(l2.data) : fe(l2, t5, r4, n4, o2.slice()), l2 = l2.nextSibling;
                    else for (; l2; ) fe(l2, t5, r4, n4, o2.slice()), l2 = l2.nextSibling;
                    t5.push("</", u2, ">");
                  } else t5.push("/>");
                  return;
                case v:
                case A:
                  for (l2 = e5.firstChild; l2; ) fe(l2, t5, r4, n4, o2.slice()), l2 = l2.nextSibling;
                  return;
                case m:
                  return pe(t5, e5.name, e5.value);
                case p:
                  return t5.push(e5.data.replace(/[<&>]/g, P));
                case f:
                  return t5.push("<![CDATA[", e5.data, "]]>");
                case y:
                  return t5.push("<!--", e5.data, "-->");
                case w:
                  var k2 = e5.publicId, N2 = e5.systemId;
                  if (t5.push("<!DOCTYPE ", e5.name), k2) t5.push(" PUBLIC ", k2), N2 && "." != N2 && t5.push(" ", N2), t5.push(">");
                  else if (N2 && "." != N2) t5.push(" SYSTEM ", N2, ">");
                  else {
                    var L2 = e5.internalSubset;
                    L2 && t5.push(" [", L2, "]"), t5.push(">");
                  }
                  return;
                case x:
                  return t5.push("<?", e5.target, " ", e5.data, "?>");
                case g:
                  return t5.push("&", e5.nodeName, ";");
                default:
                  t5.push("??", e5.nodeName);
              }
            }
            function ge(e5, t5, r4) {
              var n4;
              switch (t5.nodeType) {
                case h:
                  (n4 = t5.cloneNode(false)).ownerDocument = e5;
                case A:
                  break;
                case m:
                  r4 = true;
              }
              if (n4 || (n4 = t5.cloneNode(false)), n4.ownerDocument = e5, n4.parentNode = null, r4) for (var o2 = t5.firstChild; o2; ) n4.appendChild(ge(e5, o2, r4)), o2 = o2.nextSibling;
              return n4;
            }
            function be(e5, t5, r4) {
              var n4 = new t5.constructor();
              for (var o2 in t5) if (Object.prototype.hasOwnProperty.call(t5, o2)) {
                var a2 = t5[o2];
                "object" != typeof a2 && a2 != n4[o2] && (n4[o2] = a2);
              }
              switch (t5.childNodes && (n4.childNodes = new N()), n4.ownerDocument = e5, n4.nodeType) {
                case h:
                  var i2 = t5.attributes, s2 = n4.attributes = new M(), l2 = i2.length;
                  s2._ownerElement = n4;
                  for (var c2 = 0; c2 < l2; c2++) n4.setAttributeNode(be(e5, i2.item(c2), true));
                  break;
                case m:
                  r4 = true;
              }
              if (r4) for (var u2 = t5.firstChild; u2; ) n4.appendChild(be(e5, u2, r4)), u2 = u2.nextSibling;
              return n4;
            }
            function xe(e5, t5, r4) {
              e5[t5] = r4;
            }
            E.INVALID_STATE_ERR = (S[11] = "Invalid state", 11), E.SYNTAX_ERR = (S[12] = "Syntax error", 12), E.INVALID_MODIFICATION_ERR = (S[13] = "Invalid modification", 13), E.NAMESPACE_ERR = (S[14] = "Invalid namespace", 14), E.INVALID_ACCESS_ERR = (S[15] = "Invalid access", 15), k.prototype = Error.prototype, c(E, k), N.prototype = { length: 0, item: function(e5) {
              return e5 >= 0 && e5 < this.length ? this[e5] : null;
            }, toString: function(e5, t5) {
              for (var r4 = [], n4 = 0; n4 < this.length; n4++) fe(this[n4], r4, e5, t5);
              return r4.join("");
            }, filter: function(e5) {
              return Array.prototype.filter.call(this, e5);
            }, indexOf: function(e5) {
              return Array.prototype.indexOf.call(this, e5);
            } }, L.prototype.item = function(e5) {
              return O(this), this[e5] || null;
            }, u(L, N), M.prototype = { length: 0, item: N.prototype.item, getNamedItem: function(e5) {
              for (var t5 = this.length; t5--; ) {
                var r4 = this[t5];
                if (r4.nodeName == e5) return r4;
              }
            }, setNamedItem: function(e5) {
              var t5 = e5.ownerElement;
              if (t5 && t5 != this._ownerElement) throw new k(q);
              var r4 = this.getNamedItem(e5.nodeName);
              return B(this._ownerElement, this, e5, r4), r4;
            }, setNamedItemNS: function(e5) {
              var t5, r4 = e5.ownerElement;
              if (r4 && r4 != this._ownerElement) throw new k(q);
              return t5 = this.getNamedItemNS(e5.namespaceURI, e5.localName), B(this._ownerElement, this, e5, t5), t5;
            }, removeNamedItem: function(e5) {
              var t5 = this.getNamedItem(e5);
              return $(this._ownerElement, this, t5), t5;
            }, removeNamedItemNS: function(e5, t5) {
              var r4 = this.getNamedItemNS(e5, t5);
              return $(this._ownerElement, this, r4), r4;
            }, getNamedItemNS: function(e5, t5) {
              for (var r4 = this.length; r4--; ) {
                var n4 = this[r4];
                if (n4.localName == t5 && n4.namespaceURI == e5) return n4;
              }
              return null;
            } }, I.prototype = { hasFeature: function(e5, t5) {
              return true;
            }, createDocument: function(e5, t5, r4) {
              var n4 = new j();
              if (n4.implementation = this, n4.childNodes = new N(), n4.doctype = r4 || null, r4 && n4.appendChild(r4), t5) {
                var o2 = n4.createElementNS(e5, t5);
                n4.appendChild(o2);
              }
              return n4;
            }, createDocumentType: function(e5, t5, r4) {
              var n4 = new ae();
              return n4.name = e5, n4.nodeName = e5, n4.publicId = t5 || "", n4.systemId = r4 || "", n4;
            } }, R.prototype = { firstChild: null, lastChild: null, previousSibling: null, nextSibling: null, attributes: null, parentNode: null, childNodes: null, ownerDocument: null, nodeValue: null, namespaceURI: null, prefix: null, localName: null, insertBefore: function(e5, t5) {
              return K(this, e5, t5);
            }, replaceChild: function(e5, t5) {
              K(this, e5, t5, Y), t5 && this.removeChild(t5);
            }, removeChild: function(e5) {
              return U(this, e5);
            }, appendChild: function(e5) {
              return this.insertBefore(e5, null);
            }, hasChildNodes: function() {
              return null != this.firstChild;
            }, cloneNode: function(e5) {
              return be(this.ownerDocument || this, this, e5);
            }, normalize: function() {
              for (var e5 = this.firstChild; e5; ) {
                var t5 = e5.nextSibling;
                t5 && t5.nodeType == p && e5.nodeType == p ? (this.removeChild(t5), e5.appendData(t5.data)) : (e5.normalize(), e5 = t5);
              }
            }, isSupported: function(e5, t5) {
              return this.ownerDocument.implementation.hasFeature(e5, t5);
            }, hasAttributes: function() {
              return this.attributes.length > 0;
            }, lookupPrefix: function(e5) {
              for (var t5 = this; t5; ) {
                var r4 = t5._nsMap;
                if (r4) {
                  for (var n4 in r4) if (Object.prototype.hasOwnProperty.call(r4, n4) && r4[n4] === e5) return n4;
                }
                t5 = t5.nodeType == m ? t5.ownerDocument : t5.parentNode;
              }
              return null;
            }, lookupNamespaceURI: function(e5) {
              for (var t5 = this; t5; ) {
                var r4 = t5._nsMap;
                if (r4 && Object.prototype.hasOwnProperty.call(r4, e5)) return r4[e5];
                t5 = t5.nodeType == m ? t5.ownerDocument : t5.parentNode;
              }
              return null;
            }, isDefaultNamespace: function(e5) {
              return null == this.lookupPrefix(e5);
            } }, c(d, R), c(d, R.prototype), j.prototype = { nodeName: "#document", nodeType: v, doctype: null, documentElement: null, _inc: 1, insertBefore: function(e5, t5) {
              if (e5.nodeType == A) {
                for (var r4 = e5.firstChild; r4; ) {
                  var n4 = r4.nextSibling;
                  this.insertBefore(r4, t5), r4 = n4;
                }
                return e5;
              }
              return K(this, e5, t5), e5.ownerDocument = this, null === this.documentElement && e5.nodeType === h && (this.documentElement = e5), e5;
            }, removeChild: function(e5) {
              return this.documentElement == e5 && (this.documentElement = null), U(this, e5);
            }, replaceChild: function(e5, t5) {
              K(this, e5, t5, Y), e5.ownerDocument = this, t5 && this.removeChild(t5), W(e5) && (this.documentElement = e5);
            }, importNode: function(e5, t5) {
              return ge(this, e5, t5);
            }, getElementById: function(e5) {
              var t5 = null;
              return F(this.documentElement, (function(r4) {
                if (r4.nodeType == h && r4.getAttribute("id") == e5) return t5 = r4, true;
              })), t5;
            }, getElementsByClassName: function(e5) {
              var t5 = l(e5);
              return new L(this, (function(r4) {
                var n4 = [];
                return t5.length > 0 && F(r4.documentElement, (function(o2) {
                  if (o2 !== r4 && o2.nodeType === h) {
                    var a2 = o2.getAttribute("class");
                    if (a2) {
                      var i2 = e5 === a2;
                      if (!i2) {
                        var s2 = l(a2);
                        i2 = t5.every((c2 = s2, function(e6) {
                          return c2 && -1 !== c2.indexOf(e6);
                        }));
                      }
                      i2 && n4.push(o2);
                    }
                  }
                  var c2;
                })), n4;
              }));
            }, createElement: function(e5) {
              var t5 = new Q();
              return t5.ownerDocument = this, t5.nodeName = e5, t5.tagName = e5, t5.localName = e5, t5.childNodes = new N(), (t5.attributes = new M())._ownerElement = t5, t5;
            }, createDocumentFragment: function() {
              var e5 = new ce();
              return e5.ownerDocument = this, e5.childNodes = new N(), e5;
            }, createTextNode: function(e5) {
              var t5 = new re();
              return t5.ownerDocument = this, t5.appendData(e5), t5;
            }, createComment: function(e5) {
              var t5 = new ne();
              return t5.ownerDocument = this, t5.appendData(e5), t5;
            }, createCDATASection: function(e5) {
              var t5 = new oe();
              return t5.ownerDocument = this, t5.appendData(e5), t5;
            }, createProcessingInstruction: function(e5, t5) {
              var r4 = new ue();
              return r4.ownerDocument = this, r4.tagName = r4.nodeName = r4.target = e5, r4.nodeValue = r4.data = t5, r4;
            }, createAttribute: function(e5) {
              var t5 = new ee();
              return t5.ownerDocument = this, t5.name = e5, t5.nodeName = e5, t5.localName = e5, t5.specified = true, t5;
            }, createEntityReference: function(e5) {
              var t5 = new le();
              return t5.ownerDocument = this, t5.nodeName = e5, t5;
            }, createElementNS: function(e5, t5) {
              var r4 = new Q(), n4 = t5.split(":"), o2 = r4.attributes = new M();
              return r4.childNodes = new N(), r4.ownerDocument = this, r4.nodeName = t5, r4.tagName = t5, r4.namespaceURI = e5, 2 == n4.length ? (r4.prefix = n4[0], r4.localName = n4[1]) : r4.localName = t5, o2._ownerElement = r4, r4;
            }, createAttributeNS: function(e5, t5) {
              var r4 = new ee(), n4 = t5.split(":");
              return r4.ownerDocument = this, r4.nodeName = t5, r4.name = t5, r4.namespaceURI = e5, r4.specified = true, 2 == n4.length ? (r4.prefix = n4[0], r4.localName = n4[1]) : r4.localName = t5, r4;
            } }, u(j, R), Q.prototype = { nodeType: h, hasAttribute: function(e5) {
              return null != this.getAttributeNode(e5);
            }, getAttribute: function(e5) {
              var t5 = this.getAttributeNode(e5);
              return t5 && t5.value || "";
            }, getAttributeNode: function(e5) {
              return this.attributes.getNamedItem(e5);
            }, setAttribute: function(e5, t5) {
              var r4 = this.ownerDocument.createAttribute(e5);
              r4.value = r4.nodeValue = "" + t5, this.setAttributeNode(r4);
            }, removeAttribute: function(e5) {
              var t5 = this.getAttributeNode(e5);
              t5 && this.removeAttributeNode(t5);
            }, appendChild: function(e5) {
              return e5.nodeType === A ? this.insertBefore(e5, null) : (function(e6, t5) {
                return t5.parentNode && t5.parentNode.removeChild(t5), t5.parentNode = e6, t5.previousSibling = e6.lastChild, t5.nextSibling = null, t5.previousSibling ? t5.previousSibling.nextSibling = t5 : e6.firstChild = t5, e6.lastChild = t5, H(e6.ownerDocument, e6, t5), t5;
              })(this, e5);
            }, setAttributeNode: function(e5) {
              return this.attributes.setNamedItem(e5);
            }, setAttributeNodeNS: function(e5) {
              return this.attributes.setNamedItemNS(e5);
            }, removeAttributeNode: function(e5) {
              return this.attributes.removeNamedItem(e5.nodeName);
            }, removeAttributeNS: function(e5, t5) {
              var r4 = this.getAttributeNodeNS(e5, t5);
              r4 && this.removeAttributeNode(r4);
            }, hasAttributeNS: function(e5, t5) {
              return null != this.getAttributeNodeNS(e5, t5);
            }, getAttributeNS: function(e5, t5) {
              var r4 = this.getAttributeNodeNS(e5, t5);
              return r4 && r4.value || "";
            }, setAttributeNS: function(e5, t5, r4) {
              var n4 = this.ownerDocument.createAttributeNS(e5, t5);
              n4.value = n4.nodeValue = "" + r4, this.setAttributeNode(n4);
            }, getAttributeNodeNS: function(e5, t5) {
              return this.attributes.getNamedItemNS(e5, t5);
            }, getElementsByTagName: function(e5) {
              return new L(this, (function(t5) {
                var r4 = [];
                return F(t5, (function(n4) {
                  n4 === t5 || n4.nodeType != h || "*" !== e5 && n4.tagName != e5 || r4.push(n4);
                })), r4;
              }));
            }, getElementsByTagNameNS: function(e5, t5) {
              return new L(this, (function(r4) {
                var n4 = [];
                return F(r4, (function(o2) {
                  o2 === r4 || o2.nodeType !== h || "*" !== e5 && o2.namespaceURI !== e5 || "*" !== t5 && o2.localName != t5 || n4.push(o2);
                })), n4;
              }));
            } }, j.prototype.getElementsByTagName = Q.prototype.getElementsByTagName, j.prototype.getElementsByTagNameNS = Q.prototype.getElementsByTagNameNS, u(Q, R), ee.prototype.nodeType = m, u(ee, R), te.prototype = { data: "", substringData: function(e5, t5) {
              return this.data.substring(e5, e5 + t5);
            }, appendData: function(e5) {
              e5 = this.data + e5, this.nodeValue = this.data = e5, this.length = e5.length;
            }, insertData: function(e5, t5) {
              this.replaceData(e5, 0, t5);
            }, appendChild: function(e5) {
              throw new Error(S[_]);
            }, deleteData: function(e5, t5) {
              this.replaceData(e5, t5, "");
            }, replaceData: function(e5, t5, r4) {
              r4 = this.data.substring(0, e5) + r4 + this.data.substring(e5 + t5), this.nodeValue = this.data = r4, this.length = r4.length;
            } }, u(te, R), re.prototype = { nodeName: "#text", nodeType: p, splitText: function(e5) {
              var t5 = this.data, r4 = t5.substring(e5);
              t5 = t5.substring(0, e5), this.data = this.nodeValue = t5, this.length = t5.length;
              var n4 = this.ownerDocument.createTextNode(r4);
              return this.parentNode && this.parentNode.insertBefore(n4, this.nextSibling), n4;
            } }, u(re, te), ne.prototype = { nodeName: "#comment", nodeType: y }, u(ne, te), oe.prototype = { nodeName: "#cdata-section", nodeType: f }, u(oe, te), ae.prototype.nodeType = w, u(ae, R), ie.prototype.nodeType = C, u(ie, R), se.prototype.nodeType = b, u(se, R), le.prototype.nodeType = g, u(le, R), ce.prototype.nodeName = "#document-fragment", ce.prototype.nodeType = A, u(ce, R), ue.prototype.nodeType = x, u(ue, R), de.prototype.serializeToString = function(e5, t5, r4) {
              return he.call(e5, t5, r4);
            }, R.prototype.toString = he;
            try {
              if (Object.defineProperty) {
                let ye2 = function(e5) {
                  switch (e5.nodeType) {
                    case h:
                    case A:
                      var t5 = [];
                      for (e5 = e5.firstChild; e5; ) 7 !== e5.nodeType && 8 !== e5.nodeType && t5.push(ye2(e5)), e5 = e5.nextSibling;
                      return t5.join("");
                    default:
                      return e5.nodeValue;
                  }
                };
                var ye = ye2;
                Object.defineProperty(L.prototype, "length", { get: function() {
                  return O(this), this.$$length;
                } }), Object.defineProperty(R.prototype, "textContent", { get: function() {
                  return ye2(this);
                }, set: function(e5) {
                  switch (this.nodeType) {
                    case h:
                    case A:
                      for (; this.firstChild; ) this.removeChild(this.firstChild);
                      (e5 || String(e5)) && this.appendChild(this.ownerDocument.createTextNode(e5));
                      break;
                    default:
                      this.data = e5, this.value = e5, this.nodeValue = e5;
                  }
                } }), xe = function(e5, t5, r4) {
                  e5["$$" + t5] = r4;
                };
              }
            } catch (ve) {
            }
            t4.DocumentType = ae, t4.DOMException = k, t4.DOMImplementation = I, t4.Element = Q, t4.Node = R, t4.NodeList = N, t4.XMLSerializer = de;
          }, 6559: (e4, t4, r3) => {
            "use strict";
            var n3 = r3(4582).freeze;
            t4.XML_ENTITIES = n3({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' }), t4.HTML_ENTITIES = n3({ Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", AMP: "&", amp: "&", And: "\u2A53", and: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", ap: "\u2248", apacir: "\u2A6F", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", Barwed: "\u2306", barwed: "\u2305", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", Because: "\u2235", because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxDL: "\u2557", boxDl: "\u2556", boxdL: "\u2555", boxdl: "\u2510", boxDR: "\u2554", boxDr: "\u2553", boxdR: "\u2552", boxdr: "\u250C", boxH: "\u2550", boxh: "\u2500", boxHD: "\u2566", boxHd: "\u2564", boxhD: "\u2565", boxhd: "\u252C", boxHU: "\u2569", boxHu: "\u2567", boxhU: "\u2568", boxhu: "\u2534", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxUL: "\u255D", boxUl: "\u255C", boxuL: "\u255B", boxul: "\u2518", boxUR: "\u255A", boxUr: "\u2559", boxuR: "\u2558", boxur: "\u2514", boxV: "\u2551", boxv: "\u2502", boxVH: "\u256C", boxVh: "\u256B", boxvH: "\u256A", boxvh: "\u253C", boxVL: "\u2563", boxVl: "\u2562", boxvL: "\u2561", boxvl: "\u2524", boxVR: "\u2560", boxVr: "\u255F", boxvR: "\u255E", boxvr: "\u251C", bprime: "\u2035", Breve: "\u02D8", breve: "\u02D8", brvbar: "\xA6", Bscr: "\u212C", bscr: "\u{1D4B7}", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", Cap: "\u22D2", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", CenterDot: "\xB7", centerdot: "\xB7", Cfr: "\u212D", cfr: "\u{1D520}", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", cir: "\u25CB", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", Colon: "\u2237", colon: ":", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", Conint: "\u222F", conint: "\u222E", ContourIntegral: "\u222E", Copf: "\u2102", copf: "\u{1D554}", coprod: "\u2210", Coproduct: "\u2210", COPY: "\xA9", copy: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", Cross: "\u2A2F", cross: "\u2717", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", Cup: "\u22D3", cup: "\u222A", cupbrcap: "\u2A48", CupCap: "\u224D", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", Dagger: "\u2021", dagger: "\u2020", daleth: "\u2138", Darr: "\u21A1", dArr: "\u21D3", darr: "\u2193", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", DD: "\u2145", dd: "\u2146", ddagger: "\u2021", ddarr: "\u21CA", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", Diamond: "\u22C4", diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrow: "\u2193", Downarrow: "\u21D3", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", ecir: "\u2256", Ecirc: "\xCA", ecirc: "\xEA", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", eDot: "\u2251", edot: "\u0117", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp: "\u2003", emsp13: "\u2004", emsp14: "\u2005", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", Escr: "\u2130", escr: "\u212F", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", ExponentialE: "\u2147", exponentiale: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", ForAll: "\u2200", forall: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", Fscr: "\u2131", fscr: "\u{1D4BB}", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", gE: "\u2267", ge: "\u2265", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", Gg: "\u22D9", gg: "\u226B", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gl: "\u2277", gla: "\u2AA5", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gnE: "\u2269", gne: "\u2A88", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", Gt: "\u226B", GT: ">", gt: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", hArr: "\u21D4", harr: "\u2194", harrcir: "\u2948", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", Hfr: "\u210C", hfr: "\u{1D525}", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", Hopf: "\u210D", hopf: "\u{1D559}", horbar: "\u2015", HorizontalLine: "\u2500", Hscr: "\u210B", hscr: "\u{1D4BD}", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", Ifr: "\u2111", ifr: "\u{1D526}", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Im: "\u2111", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", Int: "\u222C", int: "\u222B", intcal: "\u22BA", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", Iscr: "\u2110", iscr: "\u{1D4BE}", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", Lang: "\u27EA", lang: "\u27E8", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", Larr: "\u219E", lArr: "\u21D0", larr: "\u2190", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", lAtail: "\u291B", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lBarr: "\u290E", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", lE: "\u2266", le: "\u2264", LeftAngleBracket: "\u27E8", LeftArrow: "\u2190", Leftarrow: "\u21D0", leftarrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", Ll: "\u22D8", ll: "\u226A", llarr: "\u21C7", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lnE: "\u2268", lne: "\u2A87", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftarrow: "\u27F5", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longleftrightarrow: "\u27F7", longmapsto: "\u27FC", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", longrightarrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", Lscr: "\u2112", lscr: "\u{1D4C1}", Lsh: "\u21B0", lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", Lt: "\u226A", LT: "<", lt: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", Mscr: "\u2133", mscr: "\u{1D4C2}", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", ne: "\u2260", nearhk: "\u2924", neArr: "\u21D7", nearr: "\u2197", nearrow: "\u2197", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nhArr: "\u21CE", nharr: "\u21AE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlArr: "\u21CD", nlarr: "\u219A", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nLeftarrow: "\u21CD", nleftarrow: "\u219A", nLeftrightarrow: "\u21CE", nleftrightarrow: "\u21AE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", Nopf: "\u2115", nopf: "\u{1D55F}", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrArr: "\u21CF", nrarr: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nRightarrow: "\u21CF", nrightarrow: "\u219B", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nVDash: "\u22AF", nVdash: "\u22AE", nvDash: "\u22AD", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwArr: "\u21D6", nwarr: "\u2196", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", ocir: "\u229A", Ocirc: "\xD4", ocirc: "\xF4", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", Or: "\u2A54", or: "\u2228", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", Otimes: "\u2A37", otimes: "\u2297", otimesas: "\u2A36", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", Popf: "\u2119", popf: "\u{1D561}", pound: "\xA3", Pr: "\u2ABB", pr: "\u227A", prap: "\u2AB7", prcue: "\u227C", prE: "\u2AB3", pre: "\u2AAF", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", Prime: "\u2033", prime: "\u2032", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportion: "\u2237", Proportional: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", Qopf: "\u211A", qopf: "\u{1D562}", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", QUOT: '"', quot: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", Rang: "\u27EB", rang: "\u27E9", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", Rarr: "\u21A0", rArr: "\u21D2", rarr: "\u2192", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", rAtail: "\u291C", ratail: "\u291A", ratio: "\u2236", rationals: "\u211A", RBarr: "\u2910", rBarr: "\u290F", rbarr: "\u290D", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", Re: "\u211C", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", REG: "\xAE", reg: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", Rfr: "\u211C", rfr: "\u{1D52F}", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrow: "\u2192", Rightarrow: "\u21D2", rightarrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", Ropf: "\u211D", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", Rscr: "\u211B", rscr: "\u{1D4C7}", Rsh: "\u21B1", rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", Sc: "\u2ABC", sc: "\u227B", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", sccue: "\u227D", scE: "\u2AB4", sce: "\u2AB0", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", searhk: "\u2925", seArr: "\u21D8", searr: "\u2198", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", Square: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", Sub: "\u22D0", sub: "\u2282", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", Subset: "\u22D0", subset: "\u2282", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", Sum: "\u2211", sum: "\u2211", sung: "\u266A", Sup: "\u22D1", sup: "\u2283", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", Supset: "\u22D1", supset: "\u2283", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swArr: "\u21D9", swarr: "\u2199", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", Therefore: "\u2234", therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", thinsp: "\u2009", ThinSpace: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", Tilde: "\u223C", tilde: "\u02DC", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", TRADE: "\u2122", trade: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", Uarr: "\u219F", uArr: "\u21D1", uarr: "\u2191", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrow: "\u2191", Uparrow: "\u21D1", uparrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", UpDownArrow: "\u2195", Updownarrow: "\u21D5", updownarrow: "\u2195", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", Upsi: "\u03D2", upsi: "\u03C5", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTee: "\u22A5", UpTeeArrow: "\u21A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", vArr: "\u21D5", varr: "\u2195", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", Vbar: "\u2AEB", vBar: "\u2AE8", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", VDash: "\u22AB", Vdash: "\u22A9", vDash: "\u22A8", vdash: "\u22A2", Vdashl: "\u2AE6", Vee: "\u22C1", vee: "\u2228", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", Verbar: "\u2016", verbar: "|", Vert: "\u2016", vert: "|", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", Wedge: "\u22C0", wedge: "\u2227", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xhArr: "\u27FA", xharr: "\u27F7", Xi: "\u039E", xi: "\u03BE", xlArr: "\u27F8", xlarr: "\u27F5", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrArr: "\u27F9", xrarr: "\u27F6", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", Yuml: "\u0178", yuml: "\xFF", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", Zfr: "\u2128", zfr: "\u{1D537}", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", Zopf: "\u2124", zopf: "\u{1D56B}", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" }), t4.entityMap = t4.HTML_ENTITIES;
          }, 8978: (e4, t4, r3) => {
            var n3 = r3(4722);
            t4.DOMImplementation = n3.DOMImplementation, t4.XMLSerializer = n3.XMLSerializer, t4.DOMParser = r3(5752).DOMParser;
          }, 4466: (e4, t4, r3) => {
            var n3 = r3(4582).NAMESPACE, o = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, a = new RegExp("[\\-\\.0-9" + o.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), i = new RegExp("^" + o.source + a.source + "*(?::" + o.source + a.source + "*)?$");
            function s(e5, t5) {
              this.message = e5, this.locator = t5, Error.captureStackTrace && Error.captureStackTrace(this, s);
            }
            function l() {
            }
            function c(e5, t5) {
              return t5.lineNumber = e5.lineNumber, t5.columnNumber = e5.columnNumber, t5;
            }
            function u(e5, t5, r4, o2, a2, i2) {
              function s2(e6, t6, n4) {
                r4.attributeNames.hasOwnProperty(e6) && i2.fatalError("Attribute " + e6 + " redefined"), r4.addValue(e6, t6.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, a2), n4);
              }
              for (var l2, c2 = ++t5, u2 = 0; ; ) {
                var d2 = e5.charAt(c2);
                switch (d2) {
                  case "=":
                    if (1 === u2) l2 = e5.slice(t5, c2), u2 = 3;
                    else {
                      if (2 !== u2) throw new Error("attribute equal must after attrName");
                      u2 = 3;
                    }
                    break;
                  case "'":
                  case '"':
                    if (3 === u2 || 1 === u2) {
                      if (1 === u2 && (i2.warning('attribute value must after "="'), l2 = e5.slice(t5, c2)), t5 = c2 + 1, !((c2 = e5.indexOf(d2, t5)) > 0)) throw new Error("attribute value no end '" + d2 + "' match");
                      s2(l2, h2 = e5.slice(t5, c2), t5 - 1), u2 = 5;
                    } else {
                      if (4 != u2) throw new Error('attribute value must after "="');
                      s2(l2, h2 = e5.slice(t5, c2), t5), i2.warning('attribute "' + l2 + '" missed start quot(' + d2 + ")!!"), t5 = c2 + 1, u2 = 5;
                    }
                    break;
                  case "/":
                    switch (u2) {
                      case 0:
                        r4.setTagName(e5.slice(t5, c2));
                      case 5:
                      case 6:
                      case 7:
                        u2 = 7, r4.closed = true;
                      case 4:
                      case 1:
                        break;
                      case 2:
                        r4.closed = true;
                        break;
                      default:
                        throw new Error("attribute invalid close char('/')");
                    }
                    break;
                  case "":
                    return i2.error("unexpected end of input"), 0 == u2 && r4.setTagName(e5.slice(t5, c2)), c2;
                  case ">":
                    switch (u2) {
                      case 0:
                        r4.setTagName(e5.slice(t5, c2));
                      case 5:
                      case 6:
                      case 7:
                        break;
                      case 4:
                      case 1:
                        "/" === (h2 = e5.slice(t5, c2)).slice(-1) && (r4.closed = true, h2 = h2.slice(0, -1));
                      case 2:
                        2 === u2 && (h2 = l2), 4 == u2 ? (i2.warning('attribute "' + h2 + '" missed quot(")!'), s2(l2, h2, t5)) : (n3.isHTML(o2[""]) && h2.match(/^(?:disabled|checked|selected)$/i) || i2.warning('attribute "' + h2 + '" missed value!! "' + h2 + '" instead!!'), s2(h2, h2, t5));
                        break;
                      case 3:
                        throw new Error("attribute value missed!!");
                    }
                    return c2;
                  case "\x80":
                    d2 = " ";
                  default:
                    if (d2 <= " ") switch (u2) {
                      case 0:
                        r4.setTagName(e5.slice(t5, c2)), u2 = 6;
                        break;
                      case 1:
                        l2 = e5.slice(t5, c2), u2 = 2;
                        break;
                      case 4:
                        var h2 = e5.slice(t5, c2);
                        i2.warning('attribute "' + h2 + '" missed quot(")!!'), s2(l2, h2, t5);
                      case 5:
                        u2 = 6;
                    }
                    else switch (u2) {
                      case 2:
                        r4.tagName, n3.isHTML(o2[""]) && l2.match(/^(?:disabled|checked|selected)$/i) || i2.warning('attribute "' + l2 + '" missed value!! "' + l2 + '" instead2!!'), s2(l2, l2, t5), t5 = c2, u2 = 1;
                        break;
                      case 5:
                        i2.warning('attribute space is required"' + l2 + '"!!');
                      case 6:
                        u2 = 1, t5 = c2;
                        break;
                      case 3:
                        u2 = 4, t5 = c2;
                        break;
                      case 7:
                        throw new Error("elements closed character '/' and '>' must be connected to");
                    }
                }
                c2++;
              }
            }
            function d(e5, t5, r4) {
              for (var o2 = e5.tagName, a2 = null, i2 = e5.length; i2--; ) {
                var s2 = e5[i2], l2 = s2.qName, c2 = s2.value;
                if ((m2 = l2.indexOf(":")) > 0) var u2 = s2.prefix = l2.slice(0, m2), d2 = l2.slice(m2 + 1), h2 = "xmlns" === u2 && d2;
                else d2 = l2, u2 = null, h2 = "xmlns" === l2 && "";
                s2.localName = d2, false !== h2 && (null == a2 && (a2 = {}, p(r4, r4 = {})), r4[h2] = a2[h2] = c2, s2.uri = n3.XMLNS, t5.startPrefixMapping(h2, c2));
              }
              for (i2 = e5.length; i2--; ) (u2 = (s2 = e5[i2]).prefix) && ("xml" === u2 && (s2.uri = n3.XML), "xmlns" !== u2 && (s2.uri = r4[u2 || ""]));
              var m2;
              (m2 = o2.indexOf(":")) > 0 ? (u2 = e5.prefix = o2.slice(0, m2), d2 = e5.localName = o2.slice(m2 + 1)) : (u2 = null, d2 = e5.localName = o2);
              var f2 = e5.uri = r4[u2 || ""];
              if (t5.startElement(f2, d2, o2, e5), !e5.closed) return e5.currentNSMap = r4, e5.localNSMap = a2, true;
              if (t5.endElement(f2, d2, o2), a2) for (u2 in a2) Object.prototype.hasOwnProperty.call(a2, u2) && t5.endPrefixMapping(u2);
            }
            function h(e5, t5, r4, n4, o2) {
              if (/^(?:script|textarea)$/i.test(r4)) {
                var a2 = e5.indexOf("</" + r4 + ">", t5), i2 = e5.substring(t5 + 1, a2);
                if (/[&<]/.test(i2)) return /^script$/i.test(r4) ? (o2.characters(i2, 0, i2.length), a2) : (i2 = i2.replace(/&#?\w+;/g, n4), o2.characters(i2, 0, i2.length), a2);
              }
              return t5 + 1;
            }
            function m(e5, t5, r4, n4) {
              var o2 = n4[r4];
              return null == o2 && ((o2 = e5.lastIndexOf("</" + r4 + ">")) < t5 && (o2 = e5.lastIndexOf("</" + r4)), n4[r4] = o2), o2 < t5;
            }
            function p(e5, t5) {
              for (var r4 in e5) Object.prototype.hasOwnProperty.call(e5, r4) && (t5[r4] = e5[r4]);
            }
            function f(e5, t5, r4, n4) {
              if ("-" === e5.charAt(t5 + 2)) return "-" === e5.charAt(t5 + 3) ? (o2 = e5.indexOf("-->", t5 + 4)) > t5 ? (r4.comment(e5, t5 + 4, o2 - t5 - 4), o2 + 3) : (n4.error("Unclosed comment"), -1) : -1;
              if ("CDATA[" == e5.substr(t5 + 3, 6)) {
                var o2 = e5.indexOf("]]>", t5 + 9);
                return r4.startCDATA(), r4.characters(e5, t5 + 9, o2 - t5 - 9), r4.endCDATA(), o2 + 3;
              }
              var a2 = (function(e6, t6) {
                var r5, n5 = [], o3 = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                for (o3.lastIndex = t6, o3.exec(e6); r5 = o3.exec(e6); ) if (n5.push(r5), r5[1]) return n5;
              })(e5, t5), i2 = a2.length;
              if (i2 > 1 && /!doctype/i.test(a2[0][0])) {
                var s2 = a2[1][0], l2 = false, c2 = false;
                i2 > 3 && (/^public$/i.test(a2[2][0]) ? (l2 = a2[3][0], c2 = i2 > 4 && a2[4][0]) : /^system$/i.test(a2[2][0]) && (c2 = a2[3][0]));
                var u2 = a2[i2 - 1];
                return r4.startDTD(s2, l2, c2), r4.endDTD(), u2.index + u2[0].length;
              }
              return -1;
            }
            function g(e5, t5, r4) {
              var n4 = e5.indexOf("?>", t5);
              if (n4) {
                var o2 = e5.substring(t5, n4).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                return o2 ? (o2[0].length, r4.processingInstruction(o2[1], o2[2]), n4 + 2) : -1;
              }
              return -1;
            }
            function b() {
              this.attributeNames = {};
            }
            s.prototype = new Error(), s.prototype.name = s.name, l.prototype = { parse: function(e5, t5, r4) {
              var o2 = this.domBuilder;
              o2.startDocument(), p(t5, t5 = {}), (function(e6, t6, r5, o3, a2) {
                function i2(e7) {
                  var t7 = e7.slice(1, -1);
                  return Object.hasOwnProperty.call(r5, t7) ? r5[t7] : "#" === t7.charAt(0) ? (function(e8) {
                    if (e8 > 65535) {
                      var t8 = 55296 + ((e8 -= 65536) >> 10), r6 = 56320 + (1023 & e8);
                      return String.fromCharCode(t8, r6);
                    }
                    return String.fromCharCode(e8);
                  })(parseInt(t7.substr(1).replace("x", "0x"))) : (a2.error("entity not found:" + e7), e7);
                }
                function l2(t7) {
                  if (t7 > E) {
                    var r6 = e6.substring(E, t7).replace(/&#?\w+;/g, i2);
                    w && p2(E), o3.characters(r6, 0, t7 - E), E = t7;
                  }
                }
                function p2(t7, r6) {
                  for (; t7 >= y && (r6 = v.exec(e6)); ) x = r6.index, y = x + r6[0].length, w.lineNumber++;
                  w.columnNumber = t7 - x + 1;
                }
                for (var x = 0, y = 0, v = /.*(?:\r\n?|\n)|.*$/g, w = o3.locator, A = [{ currentNSMap: t6 }], C = {}, E = 0; ; ) {
                  try {
                    var S = e6.indexOf("<", E);
                    if (S < 0) {
                      if (!e6.substr(E).match(/^\s*$/)) {
                        var _ = o3.doc, T = _.createTextNode(e6.substr(E));
                        _.appendChild(T), o3.currentElement = T;
                      }
                      return;
                    }
                    switch (S > E && l2(S), e6.charAt(S + 1)) {
                      case "/":
                        var q = e6.indexOf(">", S + 3), k = e6.substring(S + 2, q).replace(/[ \t\n\r]+$/g, ""), N = A.pop();
                        q < 0 ? (k = e6.substring(S + 2).replace(/[\s<].*/, ""), a2.error("end tag name: " + k + " is not complete:" + N.tagName), q = S + 1 + k.length) : k.match(/\s</) && (k = k.replace(/[\s<].*/, ""), a2.error("end tag name: " + k + " maybe not complete"), q = S + 1 + k.length);
                        var L = N.localNSMap, O = N.tagName == k;
                        if (O || N.tagName && N.tagName.toLowerCase() == k.toLowerCase()) {
                          if (o3.endElement(N.uri, N.localName, k), L) for (var M in L) Object.prototype.hasOwnProperty.call(L, M) && o3.endPrefixMapping(M);
                          O || a2.fatalError("end tag name: " + k + " is not match the current start tagName:" + N.tagName);
                        } else A.push(N);
                        q++;
                        break;
                      case "?":
                        w && p2(S), q = g(e6, S, o3);
                        break;
                      case "!":
                        w && p2(S), q = f(e6, S, o3, a2);
                        break;
                      default:
                        w && p2(S);
                        var D = new b(), B = A[A.length - 1].currentNSMap, $ = (q = u(e6, S, D, B, i2, a2), D.length);
                        if (!D.closed && m(e6, q, D.tagName, C) && (D.closed = true, r5.nbsp || a2.warning("unclosed xml attribute")), w && $) {
                          for (var I = c(w, {}), R = 0; R < $; R++) {
                            var P = D[R];
                            p2(P.offset), P.locator = c(w, {});
                          }
                          o3.locator = I, d(D, o3, B) && A.push(D), o3.locator = w;
                        } else d(D, o3, B) && A.push(D);
                        n3.isHTML(D.uri) && !D.closed ? q = h(e6, q, D.tagName, i2, o3) : q++;
                    }
                  } catch (e7) {
                    if (e7 instanceof s) throw e7;
                    a2.error("element parse error: " + e7), q = -1;
                  }
                  q > E ? E = q : l2(Math.max(S, E) + 1);
                }
              })(e5, t5, r4, o2, this.errorHandler), o2.endDocument();
            } }, b.prototype = { setTagName: function(e5) {
              if (!i.test(e5)) throw new Error("invalid tagName:" + e5);
              this.tagName = e5;
            }, addValue: function(e5, t5, r4) {
              if (!i.test(e5)) throw new Error("invalid attribute:" + e5);
              this.attributeNames[e5] = this.length, this[this.length++] = { qName: e5, value: t5, offset: r4 };
            }, length: 0, getLocalName: function(e5) {
              return this[e5].localName;
            }, getLocator: function(e5) {
              return this[e5].locator;
            }, getQName: function(e5) {
              return this[e5].qName;
            }, getURI: function(e5) {
              return this[e5].uri;
            }, getValue: function(e5) {
              return this[e5].value;
            } }, t4.XMLReader = l, t4.ParseError = s;
          }, 8917: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.InvalidNumberOfChildrenError = void 0;
            var n3 = r3(6200);
            Object.defineProperty(t4, "InvalidNumberOfChildrenError", { enumerable: true, get: function() {
              return n3.InvalidNumberOfChildrenError;
            } });
          }, 6200: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.InvalidNumberOfChildrenError = void 0;
            class r3 extends Error {
              constructor(e5, t5, r4, n3 = "exactly") {
                super(`${e5} tag must have ${n3} ${t5} children. It's actually ${r4}`), this.name = "InvalidNumberOfChildrenError";
              }
            }
            t4.InvalidNumberOfChildrenError = r3;
          }, 4279: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__exportStar || function(e5, t5) {
              for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || n3(t5, e5, r4);
            };
            Object.defineProperty(t4, "__esModule", { value: true }), o(r3(828), t4), o(r3(5975), t4), o(r3(799), t4), o(r3(2424), t4);
          }, 5975: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.JoinWithManySeparators = void 0;
            class r3 {
              constructor(e5) {
                this._separators = e5;
              }
              static join(e5, t5, n3 = "") {
                const o = t5.length > 0 ? t5 : void 0 !== n3 ? [n3] : [];
                return new r3(o)._join(e5);
              }
              _join(e5) {
                return e5.reduce(((e6, t5, r4, n3) => e6 + t5 + (r4 === n3.length - 1 ? "" : this._get(r4))), "");
              }
              _get(e5) {
                return this._separators[e5] ? this._separators[e5] : this._separators[this._separators.length - 1];
              }
            }
            t4.JoinWithManySeparators = r3;
          }, 799: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.mathMLElementToLaTeXConverter = void 0;
            const n3 = r3(5443);
            t4.mathMLElementToLaTeXConverter = (e5) => new n3.MathMLElementToLatexConverterAdapter(e5).toLatexConverter();
          }, 2424: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.normalizeWhiteSpaces = void 0, t4.normalizeWhiteSpaces = (e5) => e5.replace(/\s+/g, " ");
          }, 7192: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.BracketWrapper = void 0;
            const n3 = r3(1855);
            t4.BracketWrapper = class {
              constructor() {
                this._open = "{", this._close = "}";
              }
              wrap(e5) {
                return new n3.Wrapper(this._open, this._close).wrap(e5);
              }
            };
          }, 5025: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.GenericWrapper = void 0;
            const n3 = r3(1855);
            t4.GenericWrapper = class {
              constructor(e5, t5) {
                this._open = "\\left" + e5, this._close = "\\right" + t5;
              }
              wrap(e5) {
                return new n3.Wrapper(this._open, this._close).wrap(e5);
              }
            };
          }, 828: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.GenericWrapper = t4.ParenthesisWrapper = t4.BracketWrapper = void 0;
            var n3 = r3(7192);
            Object.defineProperty(t4, "BracketWrapper", { enumerable: true, get: function() {
              return n3.BracketWrapper;
            } });
            var o = r3(1168);
            Object.defineProperty(t4, "ParenthesisWrapper", { enumerable: true, get: function() {
              return o.ParenthesisWrapper;
            } });
            var a = r3(5025);
            Object.defineProperty(t4, "GenericWrapper", { enumerable: true, get: function() {
              return a.GenericWrapper;
            } });
          }, 1168: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.ParenthesisWrapper = void 0;
            const n3 = r3(1855);
            t4.ParenthesisWrapper = class {
              constructor() {
                this._open = "\\left(", this._close = "\\right)";
              }
              wrap(e5) {
                return new n3.Wrapper(this._open, this._close).wrap(e5);
              }
              wrapIfMoreThanOneChar(e5) {
                return e5.length <= 1 ? e5 : this.wrap(e5);
              }
            };
          }, 1855: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.Wrapper = void 0, t4.Wrapper = class {
              constructor(e5, t5) {
                this._open = e5, this._close = t5;
              }
              wrap(e5) {
                return this._open + e5 + this._close;
              }
            };
          }, 2697: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.VoidMathMLElement = void 0, t4.VoidMathMLElement = class {
              constructor() {
                this.name = "void", this.value = "", this.children = [], this.attributes = {};
              }
            };
          }, 4760: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.GenericSpacingWrapper = void 0;
            const n3 = r3(4279);
            t4.GenericSpacingWrapper = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return this._mathmlElement.children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" ");
              }
            };
          }, 9376: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.GenericUnderOver = void 0;
            const n3 = r3(799), o = r3(8917), a = r3(472);
            t4.GenericUnderOver = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (2 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 2, r4);
                const a2 = (0, n3.mathMLElementToLaTeXConverter)(t5[0]).convert(), i2 = (0, n3.mathMLElementToLaTeXConverter)(t5[1]).convert();
                return this._applyCommand(a2, i2);
              }
              _applyCommand(e5, t5) {
                const r4 = this._mathmlElement.name.match(/under/) ? s.Under : s.Over;
                return new i(r4).apply(e5, t5);
              }
            };
            class i {
              constructor(e5) {
                this._type = e5;
              }
              apply(e5, t5) {
                return a.latexAccents.includes(t5) ? `${t5}{${e5}}` : `${this._defaultCommand}{${t5}}{${e5}}`;
              }
              get _defaultCommand() {
                return this._type === s.Under ? "\\underset" : "\\overset";
              }
            }
            var s;
            !(function(e5) {
              e5[e5.Under = 0] = "Under", e5[e5.Over = 1] = "Over";
            })(s || (s = {}));
          }, 6959: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.Void = t4.MSpace = t4.MRow = t4.GenericUnderOver = t4.GenericSpacingWrapper = t4.MTr = t4.MTable = t4.MUnderover = t4.MText = t4.MMultiscripts = t4.MSubsup = t4.MSub = t4.MSup = t4.MPhantom = t4.MError = t4.MEnclose = t4.MAction = t4.MRoot = t4.MFrac = t4.MFenced = t4.MSqrt = t4.MN = t4.MO = t4.MI = t4.Math = void 0;
            var n3 = r3(393);
            Object.defineProperty(t4, "Math", { enumerable: true, get: function() {
              return n3.Math;
            } });
            var o = r3(7037);
            Object.defineProperty(t4, "MI", { enumerable: true, get: function() {
              return o.MI;
            } });
            var a = r3(3487);
            Object.defineProperty(t4, "MO", { enumerable: true, get: function() {
              return a.MO;
            } });
            var i = r3(4464);
            Object.defineProperty(t4, "MN", { enumerable: true, get: function() {
              return i.MN;
            } });
            var s = r3(8686);
            Object.defineProperty(t4, "MSqrt", { enumerable: true, get: function() {
              return s.MSqrt;
            } });
            var l = r3(9511);
            Object.defineProperty(t4, "MFenced", { enumerable: true, get: function() {
              return l.MFenced;
            } });
            var c = r3(6440);
            Object.defineProperty(t4, "MFrac", { enumerable: true, get: function() {
              return c.MFrac;
            } });
            var u = r3(6052);
            Object.defineProperty(t4, "MRoot", { enumerable: true, get: function() {
              return u.MRoot;
            } });
            var d = r3(1678);
            Object.defineProperty(t4, "MAction", { enumerable: true, get: function() {
              return d.MAction;
            } });
            var h = r3(2631);
            Object.defineProperty(t4, "MEnclose", { enumerable: true, get: function() {
              return h.MEnclose;
            } });
            var m = r3(1840);
            Object.defineProperty(t4, "MError", { enumerable: true, get: function() {
              return m.MError;
            } });
            var p = r3(7443);
            Object.defineProperty(t4, "MPhantom", { enumerable: true, get: function() {
              return p.MPhantom;
            } });
            var f = r3(6926);
            Object.defineProperty(t4, "MSup", { enumerable: true, get: function() {
              return f.MSup;
            } });
            var g = r3(2564);
            Object.defineProperty(t4, "MSub", { enumerable: true, get: function() {
              return g.MSub;
            } });
            var b = r3(1358);
            Object.defineProperty(t4, "MSubsup", { enumerable: true, get: function() {
              return b.MSubsup;
            } });
            var x = r3(8303);
            Object.defineProperty(t4, "MMultiscripts", { enumerable: true, get: function() {
              return x.MMultiscripts;
            } });
            var y = r3(3951);
            Object.defineProperty(t4, "MText", { enumerable: true, get: function() {
              return y.MText;
            } });
            var v = r3(1222);
            Object.defineProperty(t4, "MUnderover", { enumerable: true, get: function() {
              return v.MUnderover;
            } });
            var w = r3(2350);
            Object.defineProperty(t4, "MTable", { enumerable: true, get: function() {
              return w.MTable;
            } });
            var A = r3(1586);
            Object.defineProperty(t4, "MTr", { enumerable: true, get: function() {
              return A.MTr;
            } });
            var C = r3(4760);
            Object.defineProperty(t4, "GenericSpacingWrapper", { enumerable: true, get: function() {
              return C.GenericSpacingWrapper;
            } });
            var E = r3(9376);
            Object.defineProperty(t4, "GenericUnderOver", { enumerable: true, get: function() {
              return E.GenericUnderOver;
            } });
            var S = r3(6346);
            Object.defineProperty(t4, "MRow", { enumerable: true, get: function() {
              return S.MRow;
            } });
            var _ = r3(3700);
            Object.defineProperty(t4, "MSpace", { enumerable: true, get: function() {
              return _.MSpace;
            } });
            var T = r3(9165);
            Object.defineProperty(t4, "Void", { enumerable: true, get: function() {
              return T.Void;
            } });
          }, 1678: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MAction = void 0;
            const n3 = r3(799);
            t4.MAction = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { children: e5 } = this._mathmlElement;
                return this._isToggle() ? e5.map(((e6) => (0, n3.mathMLElementToLaTeXConverter)(e6))).map(((e6) => e6.convert())).join(" \\Longrightarrow ") : (0, n3.mathMLElementToLaTeXConverter)(e5[0]).convert();
              }
              _isToggle() {
                const { actiontype: e5 } = this._mathmlElement.attributes;
                return "toggle" === e5 || !e5;
              }
            };
          }, 393: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.Math = void 0;
            const n3 = r3(799), o = r3(2424);
            t4.Math = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const e5 = this._mathmlElement.children.map(((e6) => (0, n3.mathMLElementToLaTeXConverter)(e6))).map(((e6) => e6.convert())).join(" ");
                return (0, o.normalizeWhiteSpaces)(e5);
              }
            };
          }, 2631: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MEnclose = void 0;
            const n3 = r3(799);
            t4.MEnclose = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const e5 = this._mathmlElement.children.map(((e6) => (0, n3.mathMLElementToLaTeXConverter)(e6))).map(((e6) => e6.convert())).join(" ");
                return "actuarial" === this._notation ? `\\overline{\\left.${e5}\\right|}` : "radical" === this._notation ? `\\sqrt{${e5}}` : ["box", "roundedbox", "circle"].includes(this._notation) ? `\\boxed{${e5}}` : "left" === this._notation ? `\\left|${e5}` : "right" === this._notation ? `${e5}\\right|` : "top" === this._notation ? `\\overline{${e5}}` : "bottom" === this._notation ? `\\underline{${e5}}` : "updiagonalstrike" === this._notation ? `\\cancel{${e5}}` : "downdiagonalstrike" === this._notation ? `\\bcancel{${e5}}` : "updiagonalarrow" === this._notation ? `\\cancelto{}{${e5}}` : ["verticalstrike", "horizontalstrike"].includes(this._notation) ? `\\hcancel{${e5}}` : "madruwb" === this._notation ? `\\underline{${e5}\\right|}` : "phasorangle" === this._notation ? `{\\angle \\underline{${e5}}}` : `\\overline{\\left.\\right)${e5}}`;
              }
              get _notation() {
                return this._mathmlElement.attributes.notation || "longdiv";
              }
            };
          }, 1840: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MError = void 0;
            const n3 = r3(799);
            t4.MError = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return `\\color{red}{${this._mathmlElement.children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" ")}}`;
              }
            };
          }, 9511: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MFenced = void 0;
            const n3 = r3(799), o = r3(4279);
            t4.MFenced = class {
              constructor(e5) {
                this._mathmlElement = e5, this.open = this._mathmlElement.attributes.open || "", this.close = this._mathmlElement.attributes.close || "";
              }
              convert() {
                const e5 = this._mathmlElement.children.map(((e6) => (0, n3.mathMLElementToLaTeXConverter)(e6))).map(((e6) => e6.convert()));
                if (this._isThereRelativeOfName(this._mathmlElement.children, "mtable")) return new i(this.open, this.close).apply(e5);
                const t5 = this._mathmlElement.attributes.separators, r4 = void 0 !== t5, o2 = t5 ? Array.from(t5) : [], s2 = r4 ? "" : ",";
                return new a(this.open, this.close, o2, s2).apply(e5);
              }
              _isThereRelativeOfName(e5, t5) {
                return e5.some(((e6) => e6.name === t5 || this._isThereRelativeOfName(e6.children, t5)));
              }
            };
            class a {
              constructor(e5, t5, r4, n4) {
                this.separators = r4, this.defaultSeparator = n4, this.open = e5 || "(", this.close = t5 || ")";
              }
              apply(e5) {
                const t5 = o.JoinWithManySeparators.join(e5, this.separators, this.defaultSeparator);
                return new o.GenericWrapper(this.open, this.close).wrap(t5);
              }
            }
            class i {
              constructor(e5, t5) {
                this._genericCommand = "matrix", this.separators = new s(e5, t5);
              }
              apply(e5) {
                const t5 = this._command, r4 = `\\begin{${t5}}
${e5.join("")}
\\end{${t5}}`;
                return t5 === this._genericCommand ? this.separators.wrap(r4) : r4;
              }
              get _command() {
                return this.separators.areParentheses() ? "pmatrix" : this.separators.areSquareBrackets() ? "bmatrix" : this.separators.areBrackets() ? "Bmatrix" : this.separators.areDivides() ? "vmatrix" : this.separators.areParallels() ? "Vmatrix" : this.separators.areNotEqual() ? this._genericCommand : "bmatrix";
              }
            }
            class s {
              constructor(e5, t5) {
                this.open = e5, this.close = t5;
              }
              wrap(e5) {
                return new o.GenericWrapper(this.open, this.close).wrap(e5);
              }
              areParentheses() {
                return this._compare("(", ")");
              }
              areSquareBrackets() {
                return this._compare("[", "]");
              }
              areBrackets() {
                return this._compare("{", "}");
              }
              areDivides() {
                return this._compare("|", "|");
              }
              areParallels() {
                return this._compare("||", "||");
              }
              areNotEqual() {
                return this.open !== this.close;
              }
              _compare(e5, t5) {
                return this.open === e5 && this.close === t5;
              }
            }
          }, 6440: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MFrac = void 0;
            const n3 = r3(8917), o = r3(4279);
            t4.MFrac = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { children: e5, name: t5 } = this._mathmlElement, r4 = e5.length;
                if (2 !== r4) throw new n3.InvalidNumberOfChildrenError(t5, 2, r4);
                const a = (0, o.mathMLElementToLaTeXConverter)(e5[0]).convert(), i = (0, o.mathMLElementToLaTeXConverter)(e5[1]).convert();
                return this._isBevelled() ? `${this._wrapIfMoreThanOneChar(a)}/${this._wrapIfMoreThanOneChar(i)}` : `\\frac{${a}}{${i}}`;
              }
              _wrapIfMoreThanOneChar(e5) {
                return new o.ParenthesisWrapper().wrapIfMoreThanOneChar(e5);
              }
              _isBevelled() {
                return !!this._mathmlElement.attributes.bevelled;
              }
            };
          }, 7037: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MI = void 0;
            const n3 = r3(4279), o = r3(5406), a = r3(6122);
            t4.MI = class {
              constructor(e5) {
                this.utf8Converter = new a.HashUTF8ToLtXConverter(), this._mathmlElement = e5;
              }
              convert() {
                const e5 = (0, n3.normalizeWhiteSpaces)(this._mathmlElement.value);
                if (" " === e5) return i.apply(e5);
                const t5 = e5.trim(), r4 = i.apply(t5), o2 = this.utf8Converter.convert(r4);
                return o2 !== r4 ? o2 : this.wrapInMathVariant(r4, this.getMathVariant(this._mathmlElement.attributes));
              }
              getMathVariant(e5) {
                if (e5 && e5.mathvariant) return e5.mathvariant;
              }
              wrapInMathVariant(e5, t5) {
                switch (t5) {
                  case "bold":
                    return `\\mathbf{${e5}}`;
                  case "italic":
                    return `\\mathit{${e5}}`;
                  case "bold-italic":
                    return `\\mathbf{\\mathit{${e5}}}`;
                  case "double-struck":
                    return `\\mathbb{${e5}}`;
                  case "bold-fraktur":
                    return `\\mathbf{\\mathfrak{${e5}}}`;
                  case "script":
                    return `\\mathcal{${e5}}`;
                  case "bold-script":
                    return `\\mathbf{\\mathcal{${e5}}}`;
                  case "fraktur":
                    return `\\mathfrak{${e5}}`;
                  case "sans-serif":
                    return `\\mathsf{${e5}}`;
                  case "bold-sans-serif":
                    return `\\mathbf{\\mathsf{${e5}}}`;
                  case "sans-serif-italic":
                    return `\\mathsf{\\mathit{${e5}}}`;
                  case "sans-serif-bold-italic":
                    return `\\mathbf{\\mathsf{\\mathit{${e5}}}}`;
                  case "monospace":
                    return `\\mathtt{${e5}}`;
                  default:
                    return e5;
                }
              }
            };
            class i {
              constructor(e5) {
                this._value = e5;
              }
              static apply(e5) {
                return new i(e5)._apply();
              }
              _apply() {
                return this._findByCharacter() || this._findByGlyph() || this._findByNumber() || new a.HashUTF8ToLtXConverter().convert(this._value);
              }
              _findByCharacter() {
                return o.allMathSymbolsByChar[this._value];
              }
              _findByGlyph() {
                return o.allMathSymbolsByGlyph[this._value];
              }
              _findByNumber() {
                return o.mathNumberByGlyph[this._value];
              }
            }
          }, 8303: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MMultiscripts = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MMultiscripts = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (r4 < 3) throw new o.InvalidNumberOfChildrenError(e5, 3, r4, "at least");
                const a = (0, n3.mathMLElementToLaTeXConverter)(t5[0]).convert();
                return this._prescriptLatex() + this._wrapInParenthesisIfThereIsSpace(a) + this._postscriptLatex();
              }
              _prescriptLatex() {
                const { children: e5 } = this._mathmlElement;
                let t5, r4;
                if (this._isPrescripts(e5[1])) t5 = e5[2], r4 = e5[3];
                else {
                  if (!this._isPrescripts(e5[3])) return "";
                  t5 = e5[4], r4 = e5[5];
                }
                return `\\_{${(0, n3.mathMLElementToLaTeXConverter)(t5).convert()}}^{${(0, n3.mathMLElementToLaTeXConverter)(r4).convert()}}`;
              }
              _postscriptLatex() {
                const { children: e5 } = this._mathmlElement;
                if (this._isPrescripts(e5[1])) return "";
                const t5 = e5[1], r4 = e5[2];
                return `_{${(0, n3.mathMLElementToLaTeXConverter)(t5).convert()}}^{${(0, n3.mathMLElementToLaTeXConverter)(r4).convert()}}`;
              }
              _wrapInParenthesisIfThereIsSpace(e5) {
                return e5.match(/\s+/g) ? new n3.ParenthesisWrapper().wrap(e5) : e5;
              }
              _isPrescripts(e5) {
                return "mprescripts" === (null == e5 ? void 0 : e5.name);
              }
            };
          }, 4464: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MN = void 0;
            const n3 = r3(4279), o = r3(5406);
            t4.MN = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const e5 = (0, n3.normalizeWhiteSpaces)(this._mathmlElement.value).trim();
                return o.mathNumberByGlyph[e5] || e5;
              }
            };
          }, 3487: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MO = void 0;
            const n3 = r3(4279), o = r3(5406);
            t4.MO = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const e5 = (0, n3.normalizeWhiteSpaces)(this._mathmlElement.value).trim();
                return a.operate(e5);
              }
            };
            class a {
              constructor(e5) {
                this._value = e5;
              }
              static operate(e5) {
                return new a(e5)._operate();
              }
              _operate() {
                return this._findByCharacter() || this._findByGlyph() || this._findByNumber() || new o.HashUTF8ToLtXConverter().convert(this._value);
              }
              _findByCharacter() {
                return o.allMathOperatorsByChar[this._value];
              }
              _findByGlyph() {
                return o.allMathOperatorsByGlyph[this._value];
              }
              _findByNumber() {
                return o.mathNumberByGlyph[this._value];
              }
            }
          }, 7443: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MPhantom = void 0, t4.MPhantom = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return "";
              }
            };
          }, 6052: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MRoot = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MRoot = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (2 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 2, r4);
                const a = (0, n3.mathMLElementToLaTeXConverter)(t5[0]).convert();
                return `\\sqrt[${(0, n3.mathMLElementToLaTeXConverter)(t5[1]).convert()}]{${a}}`;
              }
            };
          }, 6346: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MRow = void 0;
            const n3 = r3(4279);
            t4.MRow = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return this._isLinearSystemPattern() ? this._convertAsLinearSystem() : this._mathmlElement.children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" ");
              }
              _isLinearSystemPattern() {
                const { children: e5 } = this._mathmlElement;
                if (3 !== e5.length) return false;
                const t5 = e5[0], r4 = "mo" === t5.name && "{" === t5.value.trim(), n4 = "mtable" === e5[1].name, o = e5[2], a = "mo" === o.name && "" === o.value.trim();
                return r4 && n4 && a;
              }
              _convertAsLinearSystem() {
                return `\\begin{cases} ${this._mathmlElement.children[1].children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" \\\\ ")} \\end{cases}`;
              }
            };
          }, 3700: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MSpace = void 0, t4.MSpace = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { linebreak: e5 } = this._mathmlElement.attributes;
                return "newline" === e5 ? " \\\\ " : " ";
              }
            };
          }, 8686: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MSqrt = void 0;
            const n3 = r3(4279);
            t4.MSqrt = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return `\\sqrt{${this._mathmlElement.children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" ")}}`;
              }
            };
          }, 2564: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MSub = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MSub = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (2 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 2, r4);
                const n4 = t5[0], a = t5[1];
                return `${this._handleBaseChild(n4)}_${this._handleSubscriptChild(a)}`;
              }
              _handleBaseChild(e5) {
                const t5 = e5.children, r4 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return t5.length <= 1 ? r4 : new n3.ParenthesisWrapper().wrapIfMoreThanOneChar(r4);
              }
              _handleSubscriptChild(e5) {
                const t5 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return new n3.BracketWrapper().wrap(t5);
              }
            };
          }, 1358: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MSubsup = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MSubsup = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (3 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 3, r4);
                const n4 = t5[0], a = t5[1], i = t5[2];
                return `${this._handleBaseChild(n4)}_${this._handleSubscriptChild(a)}^${this._handleSuperscriptChild(i)}`;
              }
              _handleBaseChild(e5) {
                const t5 = e5.children, r4 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return t5.length <= 1 ? r4 : new n3.ParenthesisWrapper().wrapIfMoreThanOneChar(r4);
              }
              _handleSubscriptChild(e5) {
                const t5 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return new n3.BracketWrapper().wrap(t5);
              }
              _handleSuperscriptChild(e5) {
                const t5 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return new n3.BracketWrapper().wrap(t5);
              }
            };
          }, 6926: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MSup = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MSup = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (2 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 2, r4);
                const n4 = t5[0], a = t5[1];
                return `${this._handleBaseChild(n4)}^${this._handleExponentChild(a)}`;
              }
              _handleBaseChild(e5) {
                const t5 = e5.children, r4 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return t5.length <= 1 ? r4 : new n3.ParenthesisWrapper().wrapIfMoreThanOneChar(r4);
              }
              _handleExponentChild(e5) {
                const t5 = (0, n3.mathMLElementToLaTeXConverter)(e5).convert();
                return new n3.BracketWrapper().wrap(t5);
              }
            };
          }, 2350: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MTable = void 0;
            const n3 = r3(4279);
            t4.MTable = class {
              constructor(e5) {
                this._mathmlElement = e5, this._addFlagRecursiveIfName(this._mathmlElement.children, "mtable", "innerTable");
              }
              convert() {
                const e5 = this._mathmlElement.children.map(((e6) => (0, n3.mathMLElementToLaTeXConverter)(e6))).map(((e6) => e6.convert())).join(" \\\\\n");
                return this._hasFlag("innerTable") ? this._wrap(e5) : e5;
              }
              _wrap(e5) {
                return `\\begin{matrix}${e5}\\end{matrix}`;
              }
              _addFlagRecursiveIfName(e5, t5, r4) {
                e5.forEach(((e6) => {
                  e6.name === t5 && (e6.attributes[r4] = r4), this._addFlagRecursiveIfName(e6.children, t5, r4);
                }));
              }
              _hasFlag(e5) {
                return !!this._mathmlElement.attributes[e5];
              }
            };
          }, 3951: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MText = void 0;
            const n3 = r3(7037);
            t4.MText = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { attributes: e5, value: t5 } = this._mathmlElement;
                return [...t5].map(((e6) => /^[a-zA-Z0-9]$/.test(e6) || " " === e6 ? { value: e6, isAlphanumeric: true } : { value: e6, isAlphanumeric: false })).reduce(((e6, t6) => {
                  if (t6.isAlphanumeric) {
                    const r4 = e6[e6.length - 1];
                    if (r4 && r4.isAlphanumeric) return r4.value += t6.value, e6;
                  }
                  return [...e6, t6];
                }), []).map(((t6) => t6.isAlphanumeric ? new o(e5.mathvariant).apply(t6.value) : new n3.MI({ name: "mi", attributes: {}, children: [], value: t6.value }).convert())).join("");
              }
            };
            class o {
              constructor(e5) {
                this._mathvariant = e5 || "normal";
              }
              apply(e5) {
                return this._commands.reduce(((t5, r4, n4) => 0 === n4 ? `${r4}{${e5}}` : `${r4}{${t5}}`), "");
              }
              get _commands() {
                switch (this._mathvariant) {
                  case "bold":
                    return ["\\textbf"];
                  case "italic":
                    return ["\\textit"];
                  case "bold-italic":
                    return ["\\textit", "\\textbf"];
                  case "double-struck":
                    return ["\\mathbb"];
                  case "monospace":
                    return ["\\mathtt"];
                  case "bold-fraktur":
                  case "fraktur":
                    return ["\\mathfrak"];
                  default:
                    return ["\\text"];
                }
              }
            }
          }, 1586: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MTr = void 0;
            const n3 = r3(4279);
            t4.MTr = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return this._mathmlElement.children.map(((e5) => (0, n3.mathMLElementToLaTeXConverter)(e5))).map(((e5) => e5.convert())).join(" & ");
              }
            };
          }, 1222: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MUnderover = void 0;
            const n3 = r3(4279), o = r3(8917);
            t4.MUnderover = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                const { name: e5, children: t5 } = this._mathmlElement, r4 = t5.length;
                if (3 !== r4) throw new o.InvalidNumberOfChildrenError(e5, 3, r4);
                return `${(0, n3.mathMLElementToLaTeXConverter)(t5[0]).convert()}_{${(0, n3.mathMLElementToLaTeXConverter)(t5[1]).convert()}}^{${(0, n3.mathMLElementToLaTeXConverter)(t5[2]).convert()}}`;
              }
            };
          }, 9165: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.Void = void 0, t4.Void = class {
              constructor(e5) {
                this._mathmlElement = e5;
              }
              convert() {
                return "";
              }
            };
          }, 5443: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__setModuleDefault || (Object.create ? function(e5, t5) {
              Object.defineProperty(e5, "default", { enumerable: true, value: t5 });
            } : function(e5, t5) {
              e5.default = t5;
            }), a = this && this.__importStar || function(e5) {
              if (e5 && e5.__esModule) return e5;
              var t5 = {};
              if (null != e5) for (var r4 in e5) "default" !== r4 && Object.prototype.hasOwnProperty.call(e5, r4) && n3(t5, e5, r4);
              return o(t5, e5), t5;
            };
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MathMLElementToLatexConverterAdapter = void 0;
            const i = a(r3(6959)), s = r3(2697);
            t4.MathMLElementToLatexConverterAdapter = class {
              constructor(e5) {
                this._mathMLElement = null != e5 ? e5 : new s.VoidMathMLElement();
              }
              toLatexConverter() {
                const { name: e5 } = this._mathMLElement;
                return new (l[e5] || i.GenericSpacingWrapper)(this._mathMLElement);
              }
            };
            const l = { math: i.Math, mi: i.MI, mo: i.MO, mn: i.MN, msqrt: i.MSqrt, mfenced: i.MFenced, mfrac: i.MFrac, mroot: i.MRoot, maction: i.MAction, menclose: i.MEnclose, merror: i.MError, mphantom: i.MPhantom, msup: i.MSup, msub: i.MSub, msubsup: i.MSubsup, mmultiscripts: i.MMultiscripts, mtext: i.MText, munderover: i.MUnderover, mtable: i.MTable, mtr: i.MTr, mover: i.GenericUnderOver, munder: i.GenericUnderOver, mrow: i.MRow, mspace: i.MSpace, mpadded: i.GenericSpacingWrapper, void: i.Void };
          }, 5243: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.ErrorHandler = void 0, t4.ErrorHandler = class {
              constructor() {
                this._errors = [], this.errorLocator = {};
              }
              fixError(e5, t5) {
                return this._isMissingAttributeValueError(t5) ? (this._errors.push(t5), this._fixMissingAttribute(t5, e5)) : e5;
              }
              isThereAnyErrors() {
                return this._errors.length > 0;
              }
              cleanErrors() {
                this._errors = [];
              }
              _fixMissingAttribute(e5, t5) {
                const r3 = e5.split('"')[1];
                if (r3) return t5.replace(this._matchMissingValueForAttribute(r3), "");
                for (; this._mathGenericMissingValue().exec(t5); ) t5 = t5.replace(this._mathGenericMissingValue(), "$1$3");
                return t5;
              }
              _matchMissingValueForAttribute(e5) {
                return new RegExp(`(${e5}=(?!("|')))|(${e5}(?!("|')))`, "gm");
              }
              _mathGenericMissingValue() {
                return /(\<.* )(\w+=(?!\"|\'))(.*\>)/gm;
              }
              _isMissingAttributeValueError(e5) {
                return !!e5.includes("attribute") && !!e5.includes("missed") || e5.includes("attribute value missed");
              }
            };
          }, 9208: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__exportStar || function(e5, t5) {
              for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || n3(t5, e5, r4);
            };
            Object.defineProperty(t4, "__esModule", { value: true }), o(r3(9548), t4), o(r3(5243), t4), o(r3(1101), t4);
          }, 1101: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.ElementsToMathMLAdapter = void 0, t4.ElementsToMathMLAdapter = class {
              convert(e5) {
                return e5.filter(((e6) => void 0 !== e6.tagName)).map(((e6) => this._convertElement(e6)));
              }
              _convertElement(e5) {
                return { name: e5.tagName, attributes: this._convertElementAttributes(e5.attributes), value: this._hasElementChild(e5) ? "" : e5.textContent || "", children: this._hasElementChild(e5) ? this.convert(Array.from(e5.childNodes)) : [] };
              }
              _convertElementAttributes(e5) {
                return Array.from(e5).reduce(((e6, t5) => Object.assign({ [t5.nodeName]: t5.nodeValue === t5.nodeName ? "" : t5.nodeValue }, e6)), {});
              }
              _hasElementChild(e5) {
                const t5 = e5.childNodes;
                return !!t5 && 0 !== t5.length && this._isThereAnyNoTextNode(t5);
              }
              _isThereAnyNoTextNode(e5) {
                return Array.from(e5).some(((e6) => "#text" !== e6.nodeName));
              }
            };
          }, 9548: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__importDefault || function(e5) {
              return e5 && e5.__esModule ? e5 : { default: e5 };
            };
            Object.defineProperty(t4, "__esModule", { value: true }), t4.XmlToMathMLAdapter = void 0;
            const o = n3(r3(8978));
            t4.XmlToMathMLAdapter = class {
              constructor(e5, t5) {
                this._xml = "", this._elementsConvertor = e5, this._errorHandler = t5, this._xmlDOM = new o.default.DOMParser({ locator: this._errorHandler.errorLocator, errorHandler: this._fixError.bind(this) });
              }
              convert(e5) {
                return this._xml = this._removeLineBreaks(e5), this._xml = this._removeMsWordPrefixes(this._xml), this._elementsConvertor.convert(this._mathMLElements);
              }
              _fixError(e5) {
                this._xml = this._errorHandler.fixError(this._xml, e5);
              }
              _removeLineBreaks(e5) {
                return e5.replace(/\n|\r\n|\r/g, "");
              }
              _removeMsWordPrefixes(e5) {
                return e5.replace(/mml:/g, "");
              }
              get _mathMLElements() {
                let e5 = this._xmlDOM.parseFromString(this._xml).getElementsByTagName("math");
                return this._errorHandler.isThereAnyErrors() && (this._errorHandler.cleanErrors(), e5 = this._xmlDOM.parseFromString(this._xml).getElementsByTagName("math")), Array.from(e5);
              }
            };
          }, 7941: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__exportStar || function(e5, t5) {
              for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || n3(t5, e5, r4);
            };
            Object.defineProperty(t4, "__esModule", { value: true }), o(r3(8585), t4);
          }, 8585: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.makeToMathElementsConverter = void 0;
            const n3 = r3(9208);
            t4.makeToMathElementsConverter = () => {
              const e5 = new n3.ElementsToMathMLAdapter(), t5 = new n3.ErrorHandler();
              return new n3.XmlToMathMLAdapter(e5, t5);
            };
          }, 8672: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__exportStar || function(e5, t5) {
              for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || n3(t5, e5, r4);
            };
            Object.defineProperty(t4, "__esModule", { value: true }), o(r3(3798), t4);
          }, 3798: (e4, t4, r3) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.MathMLToLaTeX = void 0;
            const n3 = r3(5443), o = r3(7941);
            t4.MathMLToLaTeX = class {
              static convert(e5) {
                return (0, o.makeToMathElementsConverter)().convert(e5).map(((e6) => new n3.MathMLElementToLatexConverterAdapter(e6).toLatexConverter())).map(((e6) => e6.convert())).join("").trim();
              }
            };
          }, 2965: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.allMathOperatorsByChar = void 0, t4.allMathOperatorsByChar = { _: "\\underline", "&#x23E1;": "\\underbrace", "&#x23E0;": "\\overbrace", "&#x23DF;": "\\underbrace", "&#x23DE;": "\\overbrace", "&#x23DD;": "\\underbrace", "&#x23DC;": "\\overbrace", "&#x23B5;": "\\underbrace", "&#x23B4;": "\\overbrace", "&#x20DC;": "\\square", "&#x20DB;": "\\square", "&#x2064;": "", "&#x2057;": "''''", "&#x203E;": "\\bar", "&#x2037;": "```", "&#x2036;": "``", "&#x2035;": "`", "&#x2034;": "'''", "&#x2033;": "''", "&#x201F;": "``", "&#x201E;": ",,", "&#x201B;": "`", "&#x201A;": ",", "&#x302;": "\\hat", "&#x2F7;": "\\sim", "&#x2DD;": "\\sim", "&#x2DC;": "\\sim", "&#x2DA;": "\\circ", "&#x2D9;": "\\cdot", "&#x2D8;": "", "&#x2CD;": "\\_", "&#x2CB;": "\u02CB", "&#x2CA;": "\u02CA", "&#x2C9;": "\u02C9", "&#x2C7;": "", "&#x2C6;": "\\hat", "&#xBA;": "o", "&#xB9;": "1", "&#xB8;": "\xB8", "&#xB4;": "\xB4", "&#xB3;": "3", "&#xB2;": "2", "&#xB0;": "\\circ", "&#xAF;": "\\bar", "&#xAA;": "a", "&#xA8;": "\\cdot\\cdot", "~": "\\sim", "`": "`", "^": "\\hat", "--": "--", "++": "++", "&amp;": "\\&", "&#x2061;": "", "&#x221C;": "\\sqrt[4]{}", "&#x221B;": "\\sqrt[3]{}", "&#x221A;": "\\sqrt{}", "&#x2146;": "d", "&#x2145;": "\\mathbb{D}", "?": "?", "@": "@", "//": "//", "!!": "!!", "!": "!", "&#x266F;": "\\#", "&#x266E;": "", "&#x266D;": "", "&#x2032;": "'", "&lt;>": "<>", "**": "\\star\\star", "&#x2207;": "\\nabla", "&#x2202;": "\\partial", "&#x2299;": "\\bigodot", "&#xAC;": "\\neg", "&#x2222;": "\\measuredangle", "&#x2221;": "\\measuredangle", "&#x2220;": "\\angle", "&#xF7;": "\\div", "/": "/", "&#x2216;": "\\backslash", "\\": "\\backslash", "%": "\\%", "&#x2297;": "\\bigotimes", "&#xB7;": "\\cdot", "&#x2A3F;": "\\coprod", "&#x2A2F;": "\\times", "&#x22C5;": "\\cdot", "&#x22A1;": "\\boxdot", "&#x22A0;": "\\boxtimes", "&#x2062;": "", "&#x2043;": "-", "&#x2022;": "\\cdot", "&#xD7;": "\\times", ".": ".", "*": "\\star", "&#x222A;": "\\cup", "&#x2229;": "\\cap", "&#x2210;": "\\coprod", "&#x220F;": "\\prod", "&#x2240;": "", "&#x2AFF;": "", "&#x2AFC;": "\\mid\\mid\\mid", "&#x2A09;": "\\times", "&#x2A08;": "", "&#x2A07;": "", "&#x2A06;": "\\sqcup", "&#x2A05;": "\\sqcap", "&#x2A02;": "\\otimes", "&#x2A00;": "\\odot", "&#x22C2;": "\\cap", "&#x22C1;": "\\vee", "&#x22C0;": "\\wedge", "&#x2A04;": "\\uplus", "&#x2A03;": "\\cup", "&#x22C3;": "\\cup", "&#x2A1C;": "\\underline{\\int}", "&#x2A1B;": "\\overline{\\int}", "&#x2A1A;": "\\int", "&#x2A19;": "\\int", "&#x2A18;": "\\int", "&#x2A17;": "\\int", "&#x2A16;": "\\oint", "&#x2A15;": "\\oint", "&#x2A14;": "\\int", "&#x2A13;": "\\int", "&#x2A12;": "\\int", "&#x2A11;": "\\int", "&#x2A10;": "\\int", "&#x2A0F;": "\\bcancel{\\int}", "&#x2A0E;": "", "&#x2A0D;": "\\hcancel{\\int}", "&#x2A0C;": "\\iiiint", "&#x2233;": "\\oint", "&#x2232;": "\\oint", "&#x2231;": "\\int", "&#x2230;": "\\oiint", "&#x222F;": "\\oiint", "&#x222E;": "\\oint", "&#x222B;": "\\int", "&#x2A01;": "\\oplus", "&#x2298;": "\\oslash", "&#x2296;": "\\ominus", "&#x2295;": "\\oplus", "&#x222D;": "\\iiint", "&#x222C;": "\\iint", "&#x2A0B;": "", "&#x2A0A;": "", "&#x2211;": "\\sum", "&#x229F;": "\\boxminus", "&#x229E;": "\\boxplus", "&#x2214;": "\\dot{+}", "&#x2213;": "+-", "&#x2212;": "-", "&#xB1;": "\\pm", "-": "-", "+": "+", "&#x2B46;": "\\Rrightarrow", "&#x2B45;": "\\Lleftarrow", "&#x29F4;": ":\\rightarrow", "&#x29EF;": "", "&#x29DF;": "\\bullet-\\bullet", "&#x299F;": "\\angle", "&#x299E;": "\\measuredangle", "&#x299D;": "\\measuredangle", "&#x299C;": "\\perp", "&#x299B;": "\\measuredangle", "&#x299A;": "", "&#x2999;": "\\vdots", "&#x297F;": "", "&#x297E;": "", "&#x297D;": "\\prec", "&#x297C;": "\\succ", "&#x297B;": "\\underset{\\rightarrow}{\\supset}", "&#x297A;": "", "&#x2979;": "\\underset{\\rightarrow}{\\subset}", "&#x2978;": "\\underset{\\rightarrow}{>}", "&#x2977;": "", "&#x2976;": "\\underset{\\leftarrow}{<}", "&#x2975;": "\\underset{\\approx}{\\rightarrow}", "&#x2974;": "\\underset{\\sim}{\\rightarrow}", "&#x2973;": "\\underset{\\sim}{\\leftarrow}", "&#x2972;": "\\overset{\\sim}{\\rightarrow}", "&#x2971;": "\\overset{=}{\\rightarrow}", "&#x2970;": "", "&#x296F;": "", "&#x296E;": "", "&#x296D;": "\\overline{\\rightharpoondown}", "&#x296C;": "\\underline{\\rightharpoonup}", "&#x296B;": "\\overline{\\leftharpoondown}", "&#x296A;": "\\underline{\\leftharpoonup}", "&#x2969;": "\\rightleftharpoons", "&#x2968;": "\\rightleftharpoons", "&#x2967;": "\\rightleftharpoons", "&#x2966;": "\\rightleftharpoons", "&#x2965;": "\\Downarrow", "&#x2964;": "\\Rightarrow", "&#x2963;": "\\Uparrow", "&#x2962;": "\\Leftarrow", "&#x2961;": "\\downarrow", "&#x2960;": "\\uparrow", "&#x295F;": "\\rightarrow", "&#x295E;": "\\leftarrow", "&#x295D;": "\\downarrow", "&#x295C;": "\\uparrow", "&#x295B;": "\\rightarrow", "&#x295A;": "\\leftarrow", "&#x2959;": "\\downarrow", "&#x2958;": "\\uparrow", "&#x2957;": "\\rightarrow", "&#x2956;": "\\leftarrow", "&#x2955;": "\\downarrow", "&#x2954;": "\\uparrow", "&#x2953;": "\\rightarrow", "&#x2952;": "\\leftarrow", "&#x2951;": "\\updownarrow", "&#x2950;": "\\leftrightarrow", "&#x294F;": "\\updownarrow", "&#x294E;": "\\leftrightarrow", "&#x294D;": "\\updownarrow", "&#x294C;": "\\updownarrow", "&#x294B;": "\\leftrightarrow", "&#x294A;": "\\leftrightarrow", "&#x2949;": "", "&#x2948;": "\\leftrightarrow", "&#x2947;": "\\nrightarrow", "&#x2946;": "", "&#x2945;": "", "&#x2944;": "\\rightleftarrows", "&#x2943;": "\\leftrightarrows", "&#x2942;": "\\rightleftarrows", "&#x2941;": "\\circlearrowright", "&#x2940;": "\\circlearrowleft", "&#x293F;": "\\rightarrow", "&#x293E;": "\\leftarrow", "&#x293D;": "", "&#x293C;": "", "&#x293B;": "", "&#x293A;": "", "&#x2939;": "", "&#x2938;": "", "&#x2937;": "\\Rsh", "&#x2936;": "\\Lsh", "&#x2935;": "\\downarrow", "&#x2934;": "\\uparrow", "&#x2933;": "\\leadsto", "&#x2932;": "", "&#x2931;": "", "&#x2930;": "", "&#x292F;": "", "&#x292E;": "", "&#x292D;": "", "&#x292C;": "\\times", "&#x292B;": "\\times", "&#x292A;": "", "&#x2929;": "", "&#x2928;": "", "&#x2927;": "", "&#x2926;": "", "&#x2925;": "", "&#x2924;": "", "&#x2923;": "", "&#x2922;": "", "&#x2921;": "", "&#x2920;": "\\mapsto\\cdot", "&#x291F;": "\\cdot\\leftarrow", "&#x291E;": "\\rightarrow\\cdot", "&#x291D;": "\\leftarrow", "&#x291C;": "\\rightarrow", "&#x291B;": "\\leftarrow", "&#x291A;": "\\rightarrow", "&#x2919;": "\\leftarrow", "&#x2918;": "\\rightarrow", "&#x2917;": "\\rightarrow", "&#x2916;": "\\rightarrow", "&#x2915;": "\\rightarrow", "&#x2914;": "\\rightarrow", "&#x2913;": "\\downarrow", "&#x2912;": "\\uparrow", "&#x2911;": "\\rightarrow", "&#x2910;": "\\rightarrow", "&#x290F;": "\\rightarrow", "&#x290E;": "\\leftarrow", "&#x290D;": "\\rightarrow", "&#x290C;": "\\leftarrow", "&#x290B;": "\\Downarrow", "&#x290A;": "\\Uparrow", "&#x2909;": "\\uparrow", "&#x2908;": "\\downarrow", "&#x2907;": "\\Rightarrow", "&#x2906;": "\\Leftarrow", "&#x2905;": "\\mapsto", "&#x2904;": "\\nLeftrightarrow", "&#x2903;": "\\nRightarrow", "&#x2902;": "\\nLeftarrow", "&#x2901;": "\\rightsquigarrow", "&#x2900;": "\\rightsquigarrow", "&#x27FF;": "\\rightsquigarrow", "&#x27FE;": "\\Rightarrow", "&#x27FD;": "\\Leftarrow", "&#x27FC;": "\\mapsto", "&#x27FB;": "\\leftarrow", "&#x27FA;": "\\Longleftrightarrow", "&#x27F9;": "\\Longrightarrow", "&#x27F8;": "\\Longleftarrow", "&#x27F7;": "\\leftrightarrow", "&#x27F6;": "\\rightarrow", "&#x27F5;": "\\leftarrow", "&#x27F1;": "\\Downarrow", "&#x27F0;": "\\Uparrow", "&#x22B8;": "\\rightarrow", "&#x21FF;": "\\leftrightarrow", "&#x21FE;": "\\rightarrow", "&#x21FD;": "\\leftarrow", "&#x21FC;": "\\nleftrightarrow", "&#x21FB;": "\\nrightarrow", "&#x21FA;": "\\nleftarrow", "&#x21F9;": "\\nleftrightarrow", "&#x21F8;": "\\nrightarrow", "&#x21F7;": "\\nleftarrow", "&#x21F6;": "\\Rrightarrow", "&#x21F5;": "", "&#x21F4;": "\\rightarrow", "&#x21F3;": "\\Updownarrow", "&#x21F2;": "\\searrow", "&#x21F1;": "\\nwarrow", "&#x21F0;": "\\Leftarrow", "&#x21EF;": "\\Uparrow", "&#x21EE;": "\\Uparrow", "&#x21ED;": "\\Uparrow", "&#x21EC;": "\\Uparrow", "&#x21EB;": "\\Uparrow", "&#x21EA;": "\\Uparrow", "&#x21E9;": "\\Downarrow", "&#x21E8;": "\\Rightarrow", "&#x21E7;": "\\Uparrow", "&#x21E6;": "\\Leftarrow", "&#x21E5;": "\\rightarrow", "&#x21E4;": "\\leftarrow", "&#x21E3;": "\\downarrow", "&#x21E2;": "\\rightarrow", "&#x21E1;": "\\uparrow", "&#x21E0;": "\\leftarrow", "&#x21DF;": "\\downarrow", "&#x21DE;": "\\uparrow", "&#x21DD;": "\\rightsquigarrow", "&#x21DC;": "\\leftarrow", "&#x21DB;": "\\Rrightarrow", "&#x21DA;": "\\Lleftarrow", "&#x21D9;": "\\swarrow", "&#x21D8;": "\\searrow", "&#x21D7;": "\\nearrow", "&#x21D6;": "\\nwarrow", "&#x21D5;": "\\Updownarrow", "&#x21D4;": "\\Leftrightarrow", "&#x21D3;": "\\Downarrow", "&#x21D2;": "\\Rightarrow", "&#x21D1;": "\\Uparrow", "&#x21D0;": "\\Leftarrow", "&#x21CF;": "\\nRightarrow", "&#x21CE;": "\\nLeftrightarrow", "&#x21CD;": "\\nLeftarrow", "&#x21CC;": "\\rightleftharpoons", "&#x21CB;": "\\leftrightharpoons", "&#x21CA;": "\\downdownarrows", "&#x21C9;": "\\rightrightarrows", "&#x21C8;": "\\upuparrows", "&#x21C7;": "\\leftleftarrows", "&#x21C6;": "\\leftrightarrows", "&#x21C5;": "", "&#x21C4;": "\\rightleftarrows", "&#x21C3;": "\\downharpoonleft", "&#x21C2;": "\\downharpoonright", "&#x21C1;": "\\rightharpoondown", "&#x21C0;": "\\rightharpoonup", "&#x21BF;": "\\upharpoonleft", "&#x21BE;": "\\upharpoonright", "&#x21BD;": "\\leftharpoondown", "&#x21BC;": "\\leftharpoonup", "&#x21BB;": "\\circlearrowright", "&#x21BA;": "\\circlearrowleft", "&#x21B9;": "\\leftrightarrows", "&#x21B8;": "\\overline{\\nwarrow}", "&#x21B7;": "\\curvearrowright", "&#x21B6;": "\\curvearrowleft", "&#x21B5;": "\\swarrow", "&#x21B4;": "\\searrow", "&#x21B3;": "\\Rsh", "&#x21B2;": "\\Lsh", "&#x21B1;": "\\Rsh", "&#x21B0;": "\\Lsh", "&#x21AF;": "\\swarrow", "&#x21AE;": "", "&#x21AD;": "\\leftrightsquigarrow", "&#x21AC;": "\\looparrowright", "&#x21AB;": "\\looparrowleft", "&#x21AA;": "\\hookrightarrow", "&#x21A9;": "\\hookleftarrow", "&#x21A8;": "\\underline{\\updownarrow}", "&#x21A7;": "\\downarrow", "&#x21A6;": "\\rightarrowtail", "&#x21A5;": "\\uparrow", "&#x21A4;": "\\leftarrowtail", "&#x21A3;": "\\rightarrowtail", "&#x21A2;": "\\leftarrowtail", "&#x21A1;": "\\downarrow", "&#x21A0;": "\\twoheadrightarrow", "&#x219F;": "\\uparrow", "&#x219E;": "\\twoheadleftarrow", "&#x219D;": "\\nearrow", "&#x219C;": "\\nwarrow", "&#x219B;": "", "&#x219A;": "", "&#x2199;": "\\swarrow", "&#x2198;": "\\searrow", "&#x2197;": "\\nearrow", "&#x2196;": "\\nwarrow", "&#x2195;": "\\updownarrow", "&#x2194;": "\\leftrightarrow", "&#x2193;": "\\downarrow", "&#x2192;": "\\rightarrow", "&#x2191;": "\\uparrow", "&#x2190;": "\\leftarrow", "|||": "\\left|||\\right.", "||": "\\left||\\right.", "|": "\\left|\\right.", "&#x2AFE;": "", "&#x2AFD;": "//", "&#x2AFB;": "///", "&#x2AFA;": "", "&#x2AF9;": "", "&#x2AF8;": "", "&#x2AF7;": "", "&#x2AF6;": "\\vdots", "&#x2AF5;": "", "&#x2AF4;": "", "&#x2AF3;": "", "&#x2AF2;": "\\nparallel", "&#x2AF1;": "", "&#x2AF0;": "", "&#x2AEF;": "", "&#x2AEE;": "\\bcancel{\\mid}", "&#x2AED;": "", "&#x2AEC;": "", "&#x2AEB;": "", "&#x2AEA;": "", "&#x2AE9;": "", "&#x2AE8;": "\\underline{\\perp}", "&#x2AE7;": "\\overline{\\top}", "&#x2AE6;": "", "&#x2AE5;": "", "&#x2AE4;": "", "&#x2AE3;": "", "&#x2AE2;": "", "&#x2AE1;": "", "&#x2AE0;": "\\perp", "&#x2ADF;": "\\top", "&#x2ADE;": "\\dashv", "&#x2ADD;&#x338;": "", "&#x2ADD;": "", "&#x2ADB;": "\\pitchfork", "&#x2ADA;": "", "&#x2AD9;": "", "&#x2AD8;": "", "&#x2AD7;": "", "&#x2AD6;": "", "&#x2AD5;": "", "&#x2AD4;": "", "&#x2AD3;": "", "&#x2AD2;": "", "&#x2AD1;": "", "&#x2AD0;": "", "&#x2ACF;": "", "&#x2ACE;": "", "&#x2ACD;": "", "&#x2ACC;": "\\underset{\\neq}{\\supset}", "&#x2ACB;": "\\underset{\\neq}{\\subset}", "&#x2ACA;": "\\underset{\\approx}{\\supset}", "&#x2AC9;": "\\underset{\\approx}{\\subset}", "&#x2AC8;": "\\underset{\\sim}{\\supset}", "&#x2AC7;": "\\underset{\\sim}{\\subset}", "&#x2AC6;": "\\supseteqq", "&#x2AC5;": "\\subseteqq", "&#x2AC4;": "\\dot{\\supseteq}", "&#x2AC3;": "\\dot{\\subseteq}", "&#x2AC2;": "\\underset{\\times}{\\supset}", "&#x2AC1;": "\\underset{\\times}{\\subset}", "&#x2AC0;": "\\underset{+}{\\supset}", "&#x2ABF;": "\\underset{+}{\\subset}", "&#x2ABE;": "", "&#x2ABD;": "", "&#x2ABC;": "\\gg ", "&#x2ABB;": "\\ll", "&#x2ABA;": "\\underset{\\cancel{\\approx}}{\\succ}", "&#x2AB9;": "\\underset{\\cancel{\\approx}}{\\prec}", "&#x2AB8;": "\\underset{\\approx}{\\succ}", "&#x2AB7;": "\\underset{\\approx}{\\prec}", "&#x2AB6;": "\\underset{\\cancel{=}}{\\succ}", "&#x2AB5;": "\\underset{\\cancel{=}}{\\prec}", "&#x2AB4;": "\\underset{=}{\\succ}", "&#x2AB3;": "\\underset{=}{\\prec}", "&#x2AB2;": "", "&#x2AB1;": "", "&#x2AAE;": "", "&#x2AAD;": "\\underline{\\hcancel{>}}", "&#x2AAC;": "\\underline{\\hcancel{>}}", "&#x2AAB;": "\\hcancel{>}", "&#x2AAA;": "\\hcancel{<}", "&#x2AA9;": "", "&#x2AA8;": "", "&#x2AA7;": "\\vartriangleright", "&#x2AA6;": "\\vartriangleleft", "&#x2AA5;": "><", "&#x2AA4;": "><", "&#x2AA3;": "\\underline{\\ll}", "&#x2AA2;&#x338;": "\\cancel{\\gg}", "&#x2AA2;": "\\gg", "&#x2AA1;&#x338;": "\\cancel{\\ll}", "&#x2AA1;": "\\ll", "&#x2AA0;": "\\overset{\\sim}{\\geqq}", "&#x2A9F;": "\\overset{\\sim}{\\leqq}", "&#x2A9E;": "\\overset{\\sim}{>}", "&#x2A9D;": "\\overset{\\sim}{<}", "&#x2A9C;": "", "&#x2A9B;": "", "&#x2A9A;": "\\overset{=}{>}", "&#x2A99;": "\\overset{=}{<}", "&#x2A98;": "", "&#x2A97;": "", "&#x2A96;": "", "&#x2A95;": "", "&#x2A94;": "", "&#x2A93;": "", "&#x2A92;": "\\underset{=}{\\gtrless}", "&#x2A91;": "\\underset{=}{\\lessgtr}", "&#x2A90;": "\\underset{<}{\\gtrsim}", "&#x2A8F;": "\\underset{>}{\\lesssim}", "&#x2A8E;": "\\underset{\\simeq}{>}", "&#x2A8D;": "\\underset{\\simeq}{<}", "&#x2A8C;": "\\gtreqqless", "&#x2A8B;": "\\lesseqqgtr", "&#x2A8A;": "\\underset{\\cancel{\\approx}}{>}", "&#x2A89;": "\\underset{\\approx}{<}", "&#x2A86;": "\\underset{\\approx}{>}", "&#x2A85;": "\\underset{\\approx}{<}", "&#x2A84;": "", "&#x2A83;": "", "&#x2A82;": "", "&#x2A81;": "", "&#x2A80;": "", "&#x2A7F;": "", "&#x2A7E;&#x338;": "\\bcancel{\\geq}", "&#x2A7E;": "\\geq", "&#x2A7D;&#x338;": "\\bcancel{\\leq}", "&#x2A7D;": "\\leq", "&#x2A7C;": "", "&#x2A7B;": "", "&#x2A7A;": "", "&#x2A79;": "", "&#x2A78;": "\\overset{\\dots}{\\equiv}", "&#x2A77;": "", "&#x2A76;": "===", "&#x2A75;": "==", "&#x2A74;": "::=", "&#x2A73;": "", "&#x2A72;": "\\underset{=}{+}", "&#x2A71;": "\\overset{=}{+}", "&#x2A70;": "\\overset{\\approx}{=}", "&#x2A6F;": "\\overset{\\wedge}{=}", "&#x2A6E;": "\\overset{*}{=}", "&#x2A6D;": "\\dot{\\approx}", "&#x2A6C;": "", "&#x2A6B;": "", "&#x2A6A;": "\\dot{\\sim}", "&#x2A69;": "", "&#x2A68;": "", "&#x2A67;": "\\dot{\\equiv}", "&#x2A66;": "\\underset{\\cdot}{=}", "&#x2A65;": "", "&#x2A64;": "", "&#x2A63;": "\\underset{=}{\\vee}", "&#x2A62;": "\\overset{=}{\\vee}", "&#x2A61;": "ul(vv)", "&#x2A60;": "\\underset{=}{\\wedge}", "&#x2A5F;": "\\underline{\\wedge}", "&#x2A5E;": "\\overset{=}{\\wedge}", "&#x2A5D;": "\\hcancel{\\vee}", "&#x2A5C;": "\\hcancel{\\wedge}", "&#x2A5B;": "", "&#x2A5A;": "", "&#x2A59;": "", "&#x2A58;": "\\vee", "&#x2A57;": "\\wedge", "&#x2A56;": "", "&#x2A55;": "", "&#x2A54;": "", "&#x2A53;": "", "&#x2A52;": "\\dot{\\vee}", "&#x2A51;": "\\dot{\\wedge}", "&#x2A50;": "", "&#x2A4F;": "", "&#x2A4E;": "", "&#x2A4D;": "\\overline{\\cap}", "&#x2A4C;": "\\overline{\\cup}", "&#x2A4B;": "", "&#x2A4A;": "", "&#x2A49;": "", "&#x2A48;": "", "&#x2A47;": "", "&#x2A46;": "", "&#x2A45;": "", "&#x2A44;": "", "&#x2A43;": "\\overline{\\cap}", "&#x2A42;": "\\overline{\\cup}", "&#x2A41;": "", "&#x2A40;": "", "&#x2A3E;": "", "&#x2A3D;": "\\llcorner", "&#x2A3C;": "\\lrcorner", "&#x2A3B;": "", "&#x2A3A;": "", "&#x2A39;": "", "&#x2A38;": "", "&#x2A37;": "", "&#x2A36;": "\\hat{\\otimes}", "&#x2A35;": "", "&#x2A34;": "", "&#x2A33;": "", "&#x2A32;": "\\underline{\\times}", "&#x2A31;": "\\underline{\\times}", "&#x2A30;": "\\dot{\\times}", "&#x2A2E;": "", "&#x2A2D;": "", "&#x2A2C;": "", "&#x2A2B;": "", "&#x2A2A;": "", "&#x2A29;": "", "&#x2A28;": "", "&#x2A27;": "", "&#x2A26;": "\\underset{\\sim}{+}", "&#x2A25;": "\\underset{\\circ}{+}", "&#x2A24;": "\\overset{\\sim}{+}", "&#x2A23;": "\\hat{+}", "&#x2A22;": "\\dot{+}", "&#x2A21;": "\\upharpoonright", "&#x2A20;": ">>", "&#x2A1F;": "", "&#x2A1E;": "\\triangleleft", "&#x2A1D;": "\\bowtie", "&#x29FF;": "", "&#x29FE;": "+", "&#x29FB;": "\\hcancel{|||}", "&#x29FA;": "\\hcancel{||}", "&#x29F9;": "\\backslash", "&#x29F8;": "/", "&#x29F7;": "hcancel{\backslash}", "&#x29F6;": "", "&#x29F5;": "\\backslash", "&#x29F2;": "\\Phi", "&#x29F1;": "", "&#x29F0;": "", "&#x29EE;": "", "&#x29ED;": "", "&#x29EC;": "", "&#x29EB;": "\\lozenge", "&#x29EA;": "", "&#x29E9;": "", "&#x29E8;": "", "&#x29E7;": "\\ddagger", "&#x29E2;": "\\sqcup\\sqcup", "&#x29E1;": "", "&#x29E0;": "\\square", "&#x29DE;": "", "&#x29DD;": "", "&#x29DC;": "", "&#x29DB;": "\\{\\{", "&#x29D9;": "\\{", "&#x29D8;": "\\}", "&#x29D7;": "", "&#x29D6;": "", "&#x29D5;": "\\bowtie", "&#x29D4;": "\\bowtie", "&#x29D3;": "\\bowtie", "&#x29D2;": "\\bowtie", "&#x29D1;": "\\bowtie", "&#x29D0;&#x338;": "| \\not\\triangleright", "&#x29D0;": "| \\triangleright", "&#x29CF;&#x338;": "\\not\\triangleleft |", "&#x29CF;": "\\triangleleft |", "&#x29CE;": "", "&#x29CD;": "\\triangle", "&#x29CC;": "", "&#x29CB;": "\\underline{\\triangle}", "&#x29CA;": "\\dot{\\triangle}", "&#x29C9;": "", "&#x29C8;": "\\boxed{\\circ}", "&#x29C7;": "\\boxed{\\circ}", "&#x29C6;": "\\boxed{\\rightarrow}", "&#x29C5;": "\\bcancel{\\square}", "&#x29C4;": "\\cancel{\\square}", "&#x29C3;": "\\odot", "&#x29C2;": "\\odot", "&#x29BF;": "\\odot", "&#x29BE;": "\\odot", "&#x29BD;": "\\varnothing", "&#x29BC;": "\\oplus", "&#x29BB;": "\\otimes", "&#x29BA;": "", "&#x29B9;": "\\varnothing", "&#x29B8;": "\\varnothing", "&#x29B7;": "\\ominus", "&#x29B6;": "\\ominus", "&#x29B5;": "\\ominus", "&#x29B4;": "\\vec{\\varnothing}", "&#x29B3;": "\\vec{\\varnothing}", "&#x29B2;": "\\dot{\\varnothing}", "&#x29B1;": "\\overline{\\varnothing}", "&#x29B0;": "\\varnothing", "&#x29AF;": "", "&#x29AE;": "", "&#x29AD;": "", "&#x29AC;": "", "&#x29AB;": "", "&#x29AA;": "", "&#x29A9;": "", "&#x29A8;": "", "&#x29A7;": "", "&#x29A6;": "", "&#x29A5;": "", "&#x29A4;": "", "&#x29A3;": "", "&#x29A2;": "", "&#x29A1;": "\\not\\lor", "&#x29A0;": "\\bcancel{>}", "&#x2982;": ":", "&#x2981;": "\\circ", "&#x2758;": "|", "&#x25B2;": "\\bigtriangleup", "&#x22FF;": "\\Epsilon", "&#x22FE;": "\\overline{\\ni}", "&#x22FD;": "\\overline{\\ni}", "&#x22FC;": "\\in", "&#x22FB;": "\\in", "&#x22FA;": "\\in", "&#x22F9;": "\\underline{\\in}", "&#x22F8;": "\\underline{\\in}", "&#x22F7;": "\\overline{\\in}", "&#x22F6;": "\\overline{\\in}", "&#x22F5;": "\\dot{\\in}", "&#x22F4;": "\\in", "&#x22F3;": "\\in", "&#x22F2;": "\\in", "&#x22F0;": "\\ddots", "&#x22E9;": "\\underset{\\sim}{\\succ}", "&#x22E8;": "\\underset{\\sim}{\\prec}", "&#x22E7;": "\\underset{\\not\\sim}{>}", "&#x22E6;": "\\underset{\\not\\sim}{<}", "&#x22E5;": "\\not\\sqsupseteq", "&#x22E4;": "\\not\\sqsubseteq", "&#x22E3;": "\\not\\sqsupseteq", "&#x22E2;": "\\not\\sqsubseteq", "&#x22E1;": "\\nsucc", "&#x22E0;": "\\nprec", "&#x22DF;": "\\succ", "&#x22DE;": "\\prec", "&#x22DD;": "\\overline{>}", "&#x22DC;": "\\overline{<}", "&#x22DB;": "\\underset{>}{\\leq}", "&#x22DA;": "\\underset{<}{\\geq}", "&#x22D5;": "\\#", "&#x22D3;": "\\cup", "&#x22D2;": "\\cap", "&#x22D1;": "\\supset", "&#x22D0;": "\\subset", "&#x22CF;": "\\wedge", "&#x22CE;": "\\vee", "&#x22CD;": "\\simeq", "&#x22C8;": "\\bowtie", "&#x22C7;": "\\ast", "&#x22C6;": "\\star", "&#x22C4;": "\\diamond", "&#x22BF;": "\\triangle", "&#x22BE;": "\\measuredangle", "&#x22BD;": "\\overline{\\lor}", "&#x22BC;": "\\overline{\\land}", "&#x22BB;": "\\underline{\\lor}", "&#x22BA;": "\\top", "&#x22B9;": "", "&#x22B7;": "\\circ\\multimap", "&#x22B6;": "\\circ\\multimap", "&#x22B3;": "\\triangleright", "&#x22B2;": "\\triangleleft", "&#x22B1;": "\\succ", "&#x22B0;": "\\prec", "&#x22AB;": "|\\models", "&#x22AA;": "|\\models", "&#x22A7;": "\\models", "&#x22A6;": "\\vdash", "&#x229D;": "\\ominus", "&#x229C;": "\\ominus", "&#x229B;": "\\odot", "&#x229A;": "\\odot", "&#x2294;": "\\sqcup", "&#x2293;": "\\sqcap", "&#x2292;": "\\sqsupseteq", "&#x2291;": "\\sqsubseteq", "&#x2290;&#x338;": "\\not\\sqsupset", "&#x2290;": "\\sqsupset", "&#x228F;&#x338;": "\\not\\sqsubset", "&#x228F;": "\\sqsubset", "&#x228E;": "\\cup", "&#x228D;": "\\cup", "&#x228C;": "\\cup", "&#x227F;&#x338;": "\\not\\succsim", "&#x227F;": "\\succsim", "&#x227E;": "\\precsim", "&#x2279;": "\\not\\overset{>}{<}", "&#x2278;": "\\not\\overset{>}{<}", "&#x2277;": "\\overset{>}{<}", "&#x2276;": "\\overset{<}{>}", "&#x2275;": "\\not\\geg", "&#x2274;": "\\not\\leq", "&#x2273;": "\\geg", "&#x2272;": "\\leq", "&#x226C;": "", "&#x2267;": "\\geg", "&#x2266;&#x338;": "\\not\\leq", "&#x2266;": "\\leq", "&#x2263;": "\\overset{=}{=} ", "&#x225E;": "\\overset{m}{=} ", "&#x225D;": "\\overset{def}{=}", "&#x2258;": "=", "&#x2256;": "=", "&#x2255;": "=:", "&#x2253;": "\\doteq", "&#x2252;": "\\doteq", "&#x2251;": "\\doteq", "&#x2250;": "\\doteq", "&#x224F;&#x338;": "", "&#x224F;": "", "&#x224E;&#x338;": "", "&#x224E;": "", "&#x224C;": "\\approx", "&#x224B;": "\\approx", "&#x224A;": "\\approx", "&#x2242;&#x338;": "\\neq", "&#x2242;": "=", "&#x223F;": "\\sim", "&#x223E;": "\\infty", "&#x223D;&#x331;": "\\sim", "&#x223D;": "\\sim", "&#x223B;": "\\sim", "&#x223A;": ":-:", "&#x2239;": "-:", "&#x2238;": "\\bot", "&#x2237;": "::", "&#x2236;": ":", "&#x2223;": "|", "&#x221F;": "\\llcorner", "&#x2219;": "\\cdot", "&#x2218;": "\\circ", "&#x2217;": "*", "&#x2215;": "/", "&#x220E;": "\\square", "&#x220D;": "\\ni", "&#x220A;": "\\in", "&#x2206;": "\\Delta", "&#x2044;": "/", "&#x2AB0;&#x338;": "\\nsucceq", "&#x2AB0;": "\\succeq", "&#x2AAF;&#x338;": "\\npreceq", "&#x2AAF;": "\\preceq", "&#x2A88;": "\\ngeqslant", "&#x2A87;": "\\nleqslant", "&#x29F3;": "\\Phi", "&#x29E6;": "\\models", "&#x29E5;": "\\not\\equiv", "&#x29E4;": "\\approx\\neq", "&#x29E3;": "\\neq", "&#x29C1;": "\\circle", "&#x29C0;": "\\circle", "&#x25E6;": "\\circle", "&#x25D7;": "\\circle", "&#x25D6;": "\\circle", "&#x25CF;": "\\circle", "&#x25CE;": "\\circledcirc", "&#x25CD;": "\\circledcirc", "&#x25CC;": "\\circledcirc", "&#x25C9;": "\\circledcirc", "&#x25C8;": "\\diamond", "&#x25C7;": "\\diamond", "&#x25C6;": "\\diamond", "&#x25C5;": "\\triangleleft", "&#x25C4;": "\\triangleleft", "&#x25C3;": "\\triangleleft", "&#x25C2;": "\\triangleleft", "&#x25C1;": "\\triangleleft", "&#x25C0;": "\\triangleleft", "&#x25BF;": "\\triangledown", "&#x25BE;": "\\triangledown", "&#x25BD;": "\\triangledown", "&#x25BC;": "\\triangledown", "&#x25B9;": "\\triangleright", "&#x25B8;": "\\triangleright", "&#x25B7;": "\\triangleright", "&#x25B6;": "\\triangleright", "&#x25B5;": "\\triangle", "&#x25B4;": "\\triangle", "&#x25B3;": "\\triangle", "&#x25B1;": "\\square", "&#x25B0;": "\\square", "&#x25AF;": "\\square", "&#x25AE;": "\\square", "&#x25AD;": "\\square", "&#x25AB;": "\\square", "&#x25AA;": "\\square", "&#x25A1;": "\\square", "&#x25A0;": "\\square", "&#x22ED;": "\\not\\triangleright", "&#x22EC;": "\\not\\triangleleft", "&#x22EB;": "\\not\\triangleright", "&#x22EA;": "\\not\\triangleleft", "&#x22D9;": "\\ggg", "&#x22D8;": "\\lll", "&#x22D7;": "*>", "&#x22D6;": "<*", "&#x22D4;": "\\pitchfork", "&#x22CC;": "", "&#x22CB;": "", "&#x22CA;": "\\rtimes", "&#x22C9;": "\\ltimes", "&#x22B5;": "\\triangleright", "&#x22B4;": "", "&#x22A5;": "\\bot", "&#x2281;": "\\nsucc", "&#x2280;": "\\preceq", "&#x227D;": "\\succeq", "&#x227C;": "\\preceq", "&#x227B;": "\\succ", "&#x227A;": "\\prec", "&#x2271;": "\\geq/", "&#x2270;": "\\leq/", "&#x226D;": "\\neq", "&#x226B;&#x338;": "\\not\\gg", "&#x226B;": "\\gg", "&#x226A;&#x338;": "\\not\\ll", "&#x226A;": "\\ll", "&#x2269;": "\\ngeqslant", "&#x2268;": "\\nleqslant", "&#x2261;": "\\equiv", "&#x225F;": "\\doteq", "&#x225C;": "\\triangleq", "&#x225B;": "\\doteq", "&#x225A;": "\\triangleq", "&#x2259;": "\\triangleq", "&#x2257;": "\\doteq", "&#x2254;": ":=", "&#x224D;": "\\asymp", "&#x2247;": "\\ncong", "&#x2246;": "\\ncong", "&#x2245;": "\\cong", "&#x2244;": "\\not\\simeq", "&#x2243;": "\\simeq", "&#x2241;": "\\not\\sim", "&#x2226;": "\\not\\parallel", "&#x2225;": "\\parallel", "&#x2224;": "\\not|", "&#x221D;": "\\propto", "==": "==", "=": "=", ":=": ":=", "/=": "=", "-=": "-=", "+=": "+=", "*=": "*=", "!=": "!=", "&#x2260;": "\\neq", "&#x2262;": "\\equiv /", "&#x2249;": "\\approx /", "&#x223C;": "sim", "&#x2248;": "\\approx", "&#x226E;": "</", "&lt;": "<", "&#x226F;": ">/", ">=": ">=", ">": ">", "&#x2265;": "\\geq", "&#x2264;": "\\leq", "&lt;=": "<=", "&#x228B;": "\\supsetneq", "&#x228A;": "\\subsetneq", "&#x2289;": "\\nsupseteq", "&#x2288;": "\\nsubseteq", "&#x2287;": "\\supseteq", "&#x2286;": "\\subseteq", "&#x2285;": "\\not\\supset", "&#x2284;": "\\not\\subset", "&#x2283;&#x20D2;": "\\supset |", "&#x2283;": "\\supset", "&#x2282;&#x20D2;": "\\subset |", "&#x2282;": "\\subset", "&#x220C;": "\\not\\in", "&#x2209;": "\\notin", "&#x2208;": "\\in", "&#x2201;": "C", "&#x2204;": "\\nexists", "&#x2203;": "\\exists", "&#x2200;": "\\forall", "&#x2227;": "\\land", "&amp;&amp;": "\\&\\&", "&#x2228;": "\\lor", "&#x22AF;": "\\cancel{\\vDash}", "&#x22AE;": "\\cancel{\\Vdash}", "&#x22AD;": "\\nvDash", "&#x22AC;": "\\nvDash", "&#x22A9;": "\\Vdash", "&#x22A8;": "\\vDash", "&#x22A4;": "\\top", "&#x22A3;": "\\dashv", "&#x22A2;": "\\vdash", "&#x220B;": "\\ni", "&#x22F1;": "\\ddots", "&#x22EF;": "\\hdots", "&#x22EE;": "\\vdots", "&#x2026;": "\\hdots", "&#x3F6;": "\\ni", ":": ":", "...": "\\cdots", "..": "..", "->": "->", "&#x2235;": "\\because", "&#x2234;": "\\therefore ", "&#x2063;": "", ",": ",", ";": ";", "&#x29FD;": "\\}", "&#x29FC;": "\\{", "&#x2998;": "\\]", "&#x2997;": "\\[", "&#x2996;": "\\ll", "&#x2995;": "\\gg", "&#x2994;": "\\gg", "&#x2993;": "\\ll", "&#x2992;": "\\gg", "&#x2991;": "\\ll", "&#x2990;": "\\]", "&#x298F;": "\\]", "&#x298E;": "\\]", "&#x298D;": "\\[", "&#x298C;": "\\[", "&#x298B;": "\\]", "&#x298A;": "\\triangleright", "&#x2989;": "\\triangleleft", "&#x2988;": "|\\)", "&#x2987;": "\\(|", "&#x2986;": "|\\)", "&#x2985;": "\\(\\(", "&#x2984;": "|\\}", "&#x2983;": "\\{|", "&#x2980;": "\\||", "&#x27EF;": "\\left. \\right]", "&#x27EE;": "\\left[ \\right.", "&#x27ED;": "\\left. \\right]]", "&#x27EC;": "\\left[[ \\right.", "&#x27EB;": "\\gg", "&#x27EA;": "\\ll", "&#x27E9;": "\\rangle", "&#x27E8;": "\\langle", "&#x27E7;": "\\left. \\right]]", "&#x27E6;": "\\left[[ \\right.", "&#x2773;": "\\left.\\right)", "&#x2772;": "\\left(\\right.", "&#x232A;": "\\rangle", "&#x2329;": "\\langle", "&#x230B;": "\\rfloor", "&#x230A;": "\\lfloor", "&#x2309;": "\\rceil", "&#x2308;": "\\lceil", "&#x2016;": "\\parallel", "}": "\\left.\\right}", "{": "\\left{\\right.", "]": "\\left]\\right.", "[": "\\left[\\right.", ")": "\\left.\\right)", "(": "\\left(\\right.", "&#x201D;": '"', "&#x201C;": "``", "&#x2019;": "'", "&#x2018;": "`", "%CE%B1": "\\alpha", "%CE%B2": "\\beta", "%CE%B3": "\\gamma", "%CE%93": "\\Gamma", "%CE%B4": "\\delta", "%CE%94": "\\Delta", "%CF%B5": "\\epsilon", "%CE%B6": "\\zeta", "%CE%B7": "\\eta", "%CE%B8": "\\theta", "%CE%98": "\\Theta", "%CE%B9": "\\iota", "%CE%BA": "\\kappa", "%CE%BB": "\\lambda", "%CE%BC": "\\mu", "%CE%BD": "\\nu", "%CE%BF": "\\omicron", "%CF%80": "\\pi", "%CE%A0": "\\Pi", "%CF%81": "\\pho", "%CF%83": "\\sigma", "%CE%A3": "\\Sigma", "%CF%84": "\\tau", "%CF%85": "\\upsilon", "%CE%A5": "\\Upsilon", "%CF%95": "\\phi", "%CE%A6": "\\Phi", "%CF%87": "\\chi", "%CF%88": "\\psi", "%CE%A8": "\\Psi", "%CF%89": "\\omega", "%CE%A9": "\\Omega" };
          }, 9039: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.allMathOperatorsByGlyph = void 0, t4.allMathOperatorsByGlyph = { _: "\\underline", "\u23E1": "\\underbrace", "\u23E0": "\\overbrace", "\u23DF": "\\underbrace", "\u23DE": "\\overbrace", "\u23DD": "\\underbrace", "\u23DC": "\\overbrace", "\u23B5": "\\underbrace", "\u23B4": "\\overbrace", "\u20DC": "\\square", "\u20DB": "\\square", "\u2064": "", "\u2057": "''''", "\u203E": "\\overline", "\u2037": "```", "\u2036": "``", "\u2035": "`", "\u2034": "'''", "\u2033": "''", "\u201F": "``", "\u201E": ",,", "\u201B": "`", "\u201A": ",", "^": "\\hat", "\u02F7": "\\sim", "\u02DD": "\\sim", "\u02DC": "\\sim", "\u02DA": "\\circ", "\u02D9": "\\cdot", "\u02D8": " ", "\u02CD": "\\_", "\u02CB": "\u02CB", "\u02CA": "\u02CA", "\u02C9": "\u02C9", "\u02C7": "", "\u02C6": "\\hat", \u00BA: "o", "\xB9": "1", "\xB8": ",", "\xB4": "\xB4", "\xB3": "3", "\xB2": "2", "\xB0": "\\circ", "\xAF": "\\bar", \u00AA: "a", "\u219B": "\\nrightarrow", "\xA8": "\\cdot\\cdot", "~": "\\sim", "`": "`", "--": "--", "++": "++", "&": "\\&", "\u221C": "\\sqrt[4]{}", "\u221B": "\\sqrt[3]{}", "\u221A": "\\sqrt{}", "\u2146": "d", "\u2145": "\\mathbb{D}", "?": "?", "@": "@", "//": "//", "!!": "!!", "!": "!", "\u266F": "\\#", "\u266E": "", "\u266D": "", "\u2032": "'", "<>": "<>", "**": "\\star\\star", "\u2207": "\\nabla", "\u2202": "\\partial", "\u2299": "\\bigodot", "\xAC": "\\neg", "\u2222": "\\measuredangle", "\u2221": "\\measuredangle", "\u2220": "\\angle", "\xF7": "\\div", "/": "/", "\u2216": "\\backslash", "\\": "\\backslash", "%": "\\%", "\u2297": "\\bigotimes", "\xB7": "\\cdot", "\u2A3F": "\\coprod", "\u2A2F": "\\times", "\u22C5": "\\cdot", "\u22A1": "\\boxdot", "\u22A0": "\\boxtimes", "\u2062": "", "\u2043": "-", "\u2022": "\\cdot", ".": ".", "*": "\\star", "\u222A": "\\cup", "\u2229": "\\cap", "\u2210": "\\coprod", "\u220F": "\\prod", "\u2240": "", "\u2AFF": "", "\u2AFC": "\\mid\\mid\\mid", "\u2A09": "\\times", "\u2A08": "", "\u2A07": "", "\u2A06": "\\sqcup", "\u2A05": "\\sqcap", "\u2A02": "\\otimes", "\u2A00": "\\odot", "\u22C2": "\\cap", "\u22C1": "\\vee", "\u22C0": "\\wedge", "\u2A04": "\\uplus", "\u2A03": "\\cup", "\u22C3": "\\cup", "\u2A1C": "\\underline{\\int}", "\u2A1B": "\\overline{\\int}", "\u2A1A": "\\int", "\u2A19": "\\int", "\u2A18": "\\int", "\u2A17": "\\int", "\u2A16": "\\oint", "\u2A15": "\\oint", "\u2A14": "\\int", "\u2A13": "\\int", "\u2A12": "\\int", "\u2A11": "\\int", "\u2A10": "\\int", "\u2A0F": "\\bcancel{\\int}", "\u2A0E": "", "\u2A0D": "\\hcancel{\\int}", "\u2A0C": "\\iiiint", "\u2233": "\\oint", "\u2232": "\\oint", "\u2231": "\\int", "\u2230": "\\oiint", "\u222F": "\\oiint", "\u222E": "\\oint", "\u222B": "\\int", "\u2A01": "\\oplus", "\u2298": "\\oslash", "\u2296": "\\ominus", "\u2295": "\\oplus", "\u222D": "\\iiint", "\u222C": "\\iint", "\u2A0B": "", "\u2A0A": "", "\u2211": "\\sum", "\u229F": "\\boxminus", "\u229E": "\\boxplus", "\u2214": "\\dot{+}", "\u2213": "+-", "\u2212": "-", "\xB1": "\\pm", "-": "-", "+": "+", "\u2B46": "\\Rrightarrow", "\u2B45": "\\Lleftarrow", "\u29F4": ":\\rightarrow", "\u29EF": "", "\u29DF": "\\bullet-\\bullet", "\u299F": "\\angle", "\u299E": "\\measuredangle", "\u299D": "\\measuredangle", "\u299C": "\\perp", "\u299B": "\\measuredangle", "\u299A": "", "\u2999": "\\vdots", "\u297F": "", "\u297E": "", "\u297D": "\\prec", "\u297C": "\\succ", "\u297B": "\\underset{\\rightarrow}{\\supset}", "\u297A": "", "\u2979": "\\underset{\\rightarrow}{\\subset}", "\u2978": "\\underset{\\rightarrow}{>}", "\u2977": "", "\u2976": "\\underset{\\leftarrow}{<}", "\u2975": "\\underset{\\approx}{\\rightarrow}", "\u2974": "\\underset{\\sim}{\\rightarrow}", "\u2973": "\\underset{\\sim}{\\leftarrow}", "\u2972": "\\overset{\\sim}{\\rightarrow}", "\u2971": "\\overset{=}{\\rightarrow}", "\u2970": "", "\u296F": "", "\u296E": "", "\u296D": "\\overline{\\rightharpoondown}", "\u296C": "\\underline{\\rightharpoonup}", "\u296B": "\\overline{\\leftharpoondown}", "\u296A": "\\underline{\\leftharpoonup}", "\u2969": "\\rightleftharpoons", "\u2968": "\\rightleftharpoons", "\u2967": "\\rightleftharpoons", "\u2966": "\\rightleftharpoons", "\u2965": "\\Downarrow", "\u2964": "\\Rightarrow", "\u2963": "\\Uparrow", "\u2962": "\\Leftarrow", "\u2961": "\\downarrow", "\u2960": "\\uparrow", "\u295F": "\\rightarrow", "\u295E": "\\leftarrow", "\u295D": "\\downarrow", "\u295C": "\\uparrow", "\u295B": "\\rightarrow", "\u295A": "\\leftarrow", "\u2959": "\\downarrow", "\u2958": "\\uparrow", "\u2957": "\\rightarrow", "\u2956": "\\leftarrow", "\u2955": "\\downarrow", "\u2954": "\\uparrow", "\u2953": "\\rightarrow", "\u2952": "\\leftarrow", "\u2951": "\\updownarrow", "\u2950": "\\leftrightarrow", "\u294F": "\\updownarrow", "\u294E": "\\leftrightarrow", "\u294D": "\\updownarrow", "\u294C": "\\updownarrow", "\u294B": "\\leftrightarrow", "\u294A": "\\leftrightarrow", "\u2949": "", "\u2948": "\\leftrightarrow", "\u2947": "\\nrightarrow", "\u2946": "", "\u2945": "", "\u2944": "\\rightleftarrows", "\u2943": "\\leftrightarrows", "\u2942": "\\rightleftarrows", "\u2941": "\\circlearrowright", "\u2940": "\\circlearrowleft", "\u293F": "\\rightarrow", "\u293E": "\\leftarrow", "\u293D": "\\leftarrow", "\u293C": "\\rightarrow", "\u293B": "\\rightarrow", "\u293A": "\\leftarrow", "\u2939": "\\downarrow", "\u2938": "\\downarrow", "\u2937": "\\Rsh", "\u2936": "\\Lsh", "\u2935": "\\downarrow", "\u2934": "\\uparrow", "\u2933": "\\rightarrow", "\u2932": "\\leftarrow", "\u2931": " ", "\u2930": " ", "\u292F": " ", "\u292E": " ", "\u292D": " ", "\u292C": "\\times", "\u292B": "\\times", "\u292A": " ", "\u2929": " ", "\u2928": " ", "\u2927": " ", "\u2926": " ", "\u2925": " ", "\u2924": " ", "\u2923": " ", "\u2922": " ", "\u2921": " ", "\u2920": "\\mapsto\\cdot", "\u291F": "\\cdot\\leftarrow", "\u291E": "\\rightarrow\\cdot", "\u291D": "\\leftarrow", "\u291C": "\\rightarrow", "\u291B": "\\leftarrow", "\u291A": "\\rightarrow", "\u2919": "\\leftarrow", "\u2918": "\\rightarrow", "\u2917": "\\rightarrow", "\u2916": "\\rightarrow", "\u2915": "\\rightarrow", "\u2914": "\\rightarrow", "\u2913": "\\downarrow", "\u2912": "\\uparrow", "\u2911": "\\rightarrow", "\u2910": "\\rightarrow", "\u290F": "\\rightarrow", "\u290E": "\\leftarrow", "\u290D": "\\rightarrow", "\u290C": "\\leftarrow", "\u290B": "\\Downarrow", "\u290A": "\\Uparrow", "\u2909": "\\uparrow", "\u2908": "\\downarrow", "\u2907": "\\Rightarrow", "\u2906": "\\Leftarrow", "\u2905": "\\mapsto", "\u2904": "\\nLeftrightarrow", "\u2903": "\\nRightarrow", "\u2902": "\\nLeftarrow", "\u2901": "\\rightsquigarrow", "\u2900": "\\rightsquigarrow", "\u27FF": "\\rightsquigarrow", "\u27FE": "\\Rightarrow", "\u27FD": "\\Leftarrow", "\u27FC": "\\mapsto", "\u27FB": "\\leftarrow", "\u27FA": "\\Longleftrightarrow", "\u27F9": "\\Longrightarrow", "\u27F8": "\\Longleftarrow", "\u27F7": "\\leftrightarrow", "\u27F6": "\\rightarrow", "\u27F5": "\\leftarrow", "\u27F1": "\\Downarrow", "\u27F0": "\\Uparrow", "\u22B8": "\\rightarrow", "\u21FF": "\\leftrightarrow", "\u21FE": "\\rightarrow", "\u21FD": "\\leftarrow", "\u21FC": "\\nleftrightarrow", "\u21FB": "\\nrightarrow", "\u21FA": "\\nleftarrow", "\u21F9": "\\nleftrightarrow", "\u21F8": "\\nrightarrow", "\u21F7": "\\nleftarrow", "\u21F6": "\\Rrightarrow", "\u21F5": "", "\u21F4": "\\rightarrow", "\u21F3": "\\Updownarrow", "\u21F2": "\\searrow", "\u21F1": "\\nwarrow", "\u21F0": "\\Leftarrow", "\u21EF": "\\Uparrow", "\u21EE": "\\Uparrow", "\u21ED": "\\Uparrow", "\u21EC": "\\Uparrow", "\u21EB": "\\Uparrow", "\u21EA": "\\Uparrow", "\u21E9": "\\Downarrow", "\u21E8": "\\Rightarrow", "\u21E7": "\\Uparrow", "\u21E6": "\\Leftarrow", "\u21E5": "\\rightarrow", "\u21E4": "\\leftarrow", "\u21E3": "\\downarrow", "\u21E2": "\\rightarrow", "\u21E1": "\\uparrow", "\u21E0": "\\leftarrow", "\u21DF": "\\downarrow", "\u21DE": "\\uparrow", "\u21DD": "\\rightsquigarrow", "\u21DC": "\\leftarrow", "\u21DB": "\\Rrightarrow", "\u21DA": "\\Lleftarrow", "\u21D9": "\\swarrow", "\u21D8": "\\searrow", "\u21D7": "\\nearrow", "\u21D6": "\\nwarrow", "\u21D5": "\\Updownarrow", "\u21D4": "\\Leftrightarrow", "\u21D3": "\\Downarrow", "\u21D2": "\\Rightarrow", "\u21D1": "\\Uparrow", "\u21D0": "\\Leftarrow", "\u21CF": "\\nRightarrow", "\u21CE": "\\nLeftrightarrow", "\u21CD": "\\nLeftarrow", "\u21CC": "\\rightleftharpoons", "\u21CB": "\\leftrightharpoons", "\u21CA": "\\downdownarrows", "\u21C9": "\\rightrightarrows", "\u21C8": "\\upuparrows", "\u21C7": "\\leftleftarrows", "\u21C6": "\\leftrightarrows", "\u21C5": "", "\u21C4": "\\rightleftarrows", "\u21C3": "\\downharpoonleft", "\u21C2": "\\downharpoonright", "\u21C1": "\\rightharpoondown", "\u21C0": "\\rightharpoonup", "\u21BF": "\\upharpoonleft", "\u21BE": "\\upharpoonright", "\u21BD": "\\leftharpoondown", "\u21BC": "\\leftharpoonup", "\u21BB": "\\circlearrowright", "\u21BA": "\\circlearrowleft", "\u21B9": "\\leftrightarrows", "\u21B8": "\\overline{\\nwarrow}", "\u21B7": "\\curvearrowright", "\u21B6": "\\curvearrowleft", "\u21B5": "\\swarrow", "\u21B4": "\\searrow", "\u21B3": "\\Rsh", "\u21B2": "\\Lsh", "\u21B1": "\\Rsh", "\u21B0": "\\Lsh", "\u21AF": "\\swarrow", "\u21AE": "", "\u21AD": "\\leftrightsquigarrow", "\u21AC": "\\looparrowright", "\u21AB": "\\looparrowleft", "\u21AA": "\\hookrightarrow", "\u21A9": "\\hookleftarrow", "\u21A8": "\\underline{\\updownarrow}", "\u21A7": "\\downarrow", "\u21A6": "\\rightarrowtail", "\u21A5": "\\uparrow", "\u21A4": "\\leftarrowtail", "\u21A3": "\\rightarrowtail", "\u21A2": "\\leftarrowtail", "\u21A1": "\\downarrow", "\u21A0": "\\twoheadrightarrow", "\u219F": "\\uparrow", "\u219E": "\\twoheadleftarrow", "\u219D": "\\nearrow", "\u219C": "\\nwarrow", "\u219A": "", "\u2199": "\\swarrow", "\u2198": "\\searrow", "\u2197": "\\nearrow", "\u2196": "\\nwarrow", "\u2195": "\\updownarrow", "\u2194": "\\leftrightarrow", "\u2193": "\\downarrow", "\u2192": "\\rightarrow", "\u2191": "\\uparrow", "\u2190": "\\leftarrow", "|||": "\\left|||\\right.", "||": "\\left||\\right.", "|": "\\mid", "\u2AFE": "", "\u2AFD": "//", "\u2AFB": "///", "\u2AFA": "", "\u2AF9": "", "\u2AF8": "", "\u2AF7": "", "\u2AF6": "\\vdots", "\u2AF5": "", "\u2AF4": "", "\u2AF3": "", "\u2AF2": "\\nparallel", "\u2AF1": "", "\u2AF0": "", "\u2AEF": "", "\u2AEE": "\\bcancel{\\mid}", "\u2AED": "", "\u2AEC": "", "\u2AEB": "", "\u2AEA": "", "\u2AE9": "", "\u2AE8": "\\underline{\\perp}", "\u2AE7": "\\overline{\\top}", "\u2AE6": "", "\u2AE5": "", "\u2AE4": "", "\u2AE3": "", "\u2AE2": "", "\u2AE1": "", "\u2AE0": "\\perp", "\u2ADF": "\\top", "\u2ADE": "\\dashv", "\u2ADD\u0338": "", "\u2ADD": "", "\u2ADB": "\\pitchfork", "\u2ADA": "", "\u2AD9": "", "\u2AD8": "", "\u2AD7": "", "\u2AD6": "", "\u2AD5": "", "\u2AD4": "", "\u2AD3": "", "\u2AD2": "", "\u2AD1": "", "\u2AD0": "", "\u2ACF": "", "\u2ACE": "", "\u2ACD": "", "\u2ACC": "\\underset{\\neq}{\\supset}", "\u2ACB": "\\underset{\\neq}{\\subset}", "\u2ACA": "\\underset{\\approx}{\\supset}", "\u2AC9": "\\underset{\\approx}{\\subset}", "\u2AC8": "\\underset{\\sim}{\\supset}", "\u2AC7": "\\underset{\\sim}{\\subset}", "\u2AC6": "\\supseteqq", "\u2AC5": "\\subseteqq", "\u2AC4": "\\dot{\\supseteq}", "\u2AC3": "\\dot{\\subseteq}", "\u2AC2": "\\underset{\\times}{\\supset}", "\u2AC1": "\\underset{\\times}{\\subset}", "\u2AC0": "\\underset{+}{\\supset}", "\u2ABF": "\\underset{+}{\\subset}", "\u2ABE": "", "\u2ABD": "", "\u2ABC": "\\gg ", "\u2ABB": "\\ll", "\u2ABA": "\\underset{\\cancel{\\approx}}{\\succ}", "\u2AB9": "\\underset{\\cancel{\\approx}}{\\prec}", "\u2AB8": "\\underset{\\approx}{\\succ}", "\u2AB7": "\\underset{\\approx}{\\prec}", "\u2AB6": "\\underset{\\cancel{=}}{\\succ}", "\u2AB5": "\\underset{\\cancel{=}}{\\prec}", "\u2AB4": "\\underset{=}{\\succ}", "\u2AB3": "\\underset{=}{\\prec}", "\u2AB2": "", "\u2AB1": "", "\u2AAE": "", "\u2AAD": "\\underline{\\hcancel{>}}", "\u2AAC": "\\underline{\\hcancel{>}}", "\u2AAB": "\\hcancel{>}", "\u2AAA": "\\hcancel{<}", "\u2AA9": "", "\u2AA8": "", "\u2AA7": "\\vartriangleright", "\u2AA6": "\\vartriangleleft", "\u2AA5": "><", "\u2AA4": "><", "\u2AA3": "\\underline{\\ll}", "\u2AA2\u0338": "\\cancel{\\gg}", "\u2AA2": "\\gg", "\u2AA1\u0338": "\\cancel{\\ll}", "\u2AA1": "\\ll", "\u2AA0": "\\overset{\\sim}{\\geqq}", "\u2A9F": "\\overset{\\sim}{\\leqq}", "\u2A9E": "\\overset{\\sim}{>}", "\u2A9D": "\\overset{\\sim}{<}", "\u2A9C": "", "\u2A9B": "", "\u2A9A": "\\overset{=}{>}", "\u2A99": "\\overset{=}{<}", "\u2A98": "", "\u2A97": "", "\u2A96": "", "\u2A95": "", "\u2A94": "", "\u2A93": "", "\u2A92": "\\underset{=}{\\gtrless}", "\u2A91": "\\underset{=}{\\lessgtr}", "\u2A90": "\\underset{<}{\\gtrsim}", "\u2A8F": "\\underset{>}{\\lesssim}", "\u2A8E": "\\underset{\\simeq}{>}", "\u2A8D": "\\underset{\\simeq}{<}", "\u2A8C": "\\gtreqqless", "\u2A8B": "\\lesseqqgtr", "\u2A8A": "\\underset{\\cancel{\\approx}}{>}", "\u2A89": "\\underset{\\approx}{<}", "\u2A86": "\\underset{\\approx}{>}", "\u2A85": "\\underset{\\approx}{<}", "\u2A84": "", "\u2A83": "", "\u2A82": "", "\u2A81": "", "\u2A80": "", "\u2A7F": "", "\u2A7E\u0338": "\\bcancel{\\geq}", "\u2A7E": "\\geq", "\u2A7D\u0338": "\\bcancel{\\leq}", "\u2A7D": "\\leq", "\u2A7C": "", "\u2A7B": "", "\u2A7A": "", "\u2A79": "", "\u2A78": "\\overset{\\dots}{\\equiv}", "\u2A77": "", "\u2A76": "===", "\u2A75": "==", "\u2A74": "::=", "\u2A73": "", "\u2A72": "\\underset{=}{+}", "\u2A71": "\\overset{=}{+}", "\u2A70": "\\overset{\\approx}{=}", "\u2A6F": "\\overset{\\wedge}{=}", "\u2A6E": "\\overset{*}{=}", "\u2A6D": "\\dot{\\approx}", "\u2A6C": "", "\u2A6B": "", "\u2A6A": "\\dot{\\sim}", "\u2A69": "", "\u2A68": "", "\u2A67": "\\dot{\\equiv}", "\u2A66": "\\underset{\\cdot}{=}", "\u2A65": "", "\u2A64": "", "\u2A63": "\\underset{=}{\\vee}", "\u2A62": "\\overset{=}{\\vee}", "\u2A61": "ul(vv)", "\u2A60": "\\underset{=}{\\wedge}", "\u2A5F": "\\underline{\\wedge}", "\u2A5E": "\\overset{=}{\\wedge}", "\u2A5D": "\\hcancel{\\vee}", "\u2A5C": "\\hcancel{\\wedge}", "\u2A5B": "", "\u2A5A": "", "\u2A59": "", "\u2A58": "\\vee", "\u2A57": "\\wedge", "\u2A56": "", "\u2A55": "", "\u2A54": "", "\u2A53": "", "\u2A52": "\\dot{\\vee}", "\u2A51": "\\dot{\\wedge}", "\u2A50": "", "\u2A4F": "", "\u2A4E": "", "\u2A4D": "\\overline{\\cap}", "\u2A4C": "\\overline{\\cup}", "\u2A4B": "", "\u2A4A": "", "\u2A49": "", "\u2A48": "", "\u2A47": "", "\u2A46": "", "\u2A45": "", "\u2A44": "", "\u2A43": "\\overline{\\cap}", "\u2A42": "\\overline{\\cup}", "\u2A41": "", "\u2A40": "", "\u2A3E": "", "\u2A3D": "\\llcorner", "\u2A3C": "\\lrcorner", "\u2A3B": "", "\u2A3A": "", "\u2A39": "", "\u2A38": "", "\u2A37": "", "\u2A36": "\\hat{\\otimes}", "\u2A35": "", "\u2A34": "", "\u2A33": "", "\u2A32": "\\underline{\\times}", "\u2A31": "\\underline{\\times}", "\u2A30": "\\dot{\\times}", "\u2A2E": "\\bigodot", "\u2A2D": "\\bigodot", "\u2A2C": "", "\u2A2B": "", "\u2A2A": "", "\u2A29": "", "\u2A28": "", "\u2A27": "", "\u25FB": "\\Box", "\u2A26": "\\underset{\\sim}{+}", "\u2A25": "\\underset{\\circ}{+}", "\u2A24": "\\overset{\\sim}{+}", "\u2A23": "\\hat{+}", "\u2A22": "\\dot{+}", "\u2A21": "\\upharpoonright", "\u2A20": ">>", "\u2A1F": "", "\u2A1E": "\\triangleleft", "\u2A1D": "\\bowtie", "\u29FF": "", "\u29FE": "+", "\u29FB": "\\hcancel{|||}", "\u29FA": "\\hcancel{||}", "\u29F9": "\\backslash", "\u29F8": "/", "\u29F7": "hcancel{\backslash}", "\u29F6": "", "\u29F5": "\\backslash", "\u29F2": "\\Phi", "\u29F1": "", "\u29F0": "", "\u29EE": "", "\u29ED": "", "\u29EC": "", "\u29EB": "\\lozenge", "\u29EA": "", "\u29E9": "", "\u29E8": "", "\u29E7": "\\ddagger", "\u29E2": "\\sqcup\\sqcup", "\u29E1": "", "\u29E0": "\\square", "\u29DE": "", "\u29DD": "", "\u29DC": "", "\u29DB": "\\{\\{", "\u29D9": "\\{", "\u29D8": "\\}", "\u29D7": "", "\u29D6": "", "\u29D5": "\\bowtie", "\u29D4": "\\bowtie", "\u29D3": "\\bowtie", "\u29D2": "\\bowtie", "\u29D1": "\\bowtie", "\u29D0\u0338": "| \\not\\triangleright", "\u29D0": "| \\triangleright", "\u29CF\u0338": "\\not\\triangleleft |", "\u29CF": "\\triangleleft |", "\u29CE": "", "\u29CD": "\\triangle", "\u29CC": "", "\u29CB": "\\underline{\\triangle}", "\u29CA": "\\dot{\\triangle}", "\u29C9": "", "\u29C8": "\\boxed{\\circ}", "\u29C7": "\\boxed{\\circ}", "\u29C6": "\\boxed{\\rightarrow}", "\u29C5": "\\bcancel{\\square}", "\u29C4": "\\cancel{\\square}", "\u29C3": "\\odot", "\u29C2": "\\odot", "\u29BF": "\\odot", "\u29BE": "\\odot", "\u29BD": "\\varnothing", "\u29BC": "\\oplus", "\u29BB": "\\otimes", "\u29BA": "", "\u29B9": "\\varnothing", "\u29B8": "\\varnothing", "\u29B7": "\\ominus", "\u29B6": "\\ominus", "\u29B5": "\\ominus", "\u29B4": "\\vec{\\varnothing}", "\u29B3": "\\vec{\\varnothing}", "\u29B2": "\\dot{\\varnothing}", "\u29B1": "\\overline{\\varnothing}", "\u29B0": "\\varnothing", "\u29AF": "\\measuredangle", "\u29AE": "\\measuredangle", "\u29AD": "\\measuredangle", "\u29AC": "\\measuredangle", "\u29AB": "\\measuredangle", "\u29AA": "\\measuredangle", "\u29A9": "\\measuredangle", "\u29A8": "\\measuredangle", "\u29A7": "", "\u29A6": "", "\u29A5": "", "\u29A4": "", "\u29A3": "\\ulcorner", "\u29A2": "\\measuredangle", "\u29A1": "\\not\\lor", "\u29A0": "\\bcancel{>}", "\u2982": ":", "\u2981": "\\cdot", "\u2758": "\\mid", "\u25B2": "\\bigtriangleup", "\u22FF": "\\Epsilon", "\u22FE": "\\overline{\\ni}", "\u22FD": "\\overline{\\ni}", "\u22FC": "\\in", "\u22FB": "\\in", "\u22FA": "\\in", "\u22F9": "\\underline{\\in}", "\u22F8": "\\underline{\\in}", "\u22F7": "\\overline{\\in}", "\u22F6": "\\overline{\\in}", "\u22F5": "\\dot{\\in}", "\u22F4": "\\in", "\u22F3": "\\in", "\u22F2": "\\in", "\u22F0": "\\ddots", "\u0589": ":", "\u22E9": "\\underset{\\sim}{\\succ}", "\u22E8": "\\underset{\\sim}{\\prec}", "\u22E7": "\\underset{\\not\\sim}{>}", "\u22E6": "\\underset{\\not\\sim}{<}", "\u22E5": "\\not\\sqsupseteq", "\u22E4": "\\not\\sqsubseteq", "\u22E3": "\\not\\sqsupseteq", "\u22E2": "\\not\\sqsubseteq", "\u22E1": "\\nsucc", "\u22E0": "\\nprec", "\u22DF": "\\succ", "\u22DE": "\\prec", "\u22DD": "\\overline{>}", "\u22DC": "\\overline{<}", "\u22DB": "\\underset{>}{\\leq}", "\u22DA": "\\underset{<}{\\geq}", "\u22D5": "\\#", "\u22D3": "\\cup", "\u22D2": "\\cap", "\u22D1": "\\supset", "\u22D0": "\\subset", "\u22CF": "\\wedge", "\u22CE": "\\vee", "\u22CD": "\\simeq", "\u22C8": "\\Join", "\u22C7": "\\ast", "\u22C6": "\\star", "\u22C4": "\\diamond", "\u22BF": "\\triangle", "\u22BE": "\\measuredangle", "\u22BD": "\\overline{\\lor}", "\u22BC": "\\overline{\\land}", "\u22BB": "\\underline{\\lor}", "\u22BA": "\\top", \u571F: "\\pm", \u5341: "+", "\u22B9": "", "\u22B7": "\\circ\\multimap", "\u22B6": "\\circ\\multimap", "\u22B3": "\\triangleright", "\u22B2": "\\triangleleft", "\u22B1": "\\succ", "\u22B0": "\\prec", "\u22AB": "|\\models", "\u22AA": "|\\models", "\u22A7": "\\models", "\u22A6": "\\vdash", "\u229D": "\\ominus", "\u229C": "\\ominus", "\u229B": "\\odot", "\u229A": "\\odot", "\u2294": "\\sqcup", "\u2293": "\\sqcap", "\u2292": "\\sqsupseteq", "\u2291": "\\sqsubseteq", "\u2290\u0338": "\\not\\sqsupset", "\u2290": "\\sqsupset", "\u228F\u0338": "\\not\\sqsubset", "\u228F": "\\sqsubset", "\u228E": "\\cup", "\u228D": "\\cup", "\u228C": "\\cup", "\u227F\u0338": "\\not\\succsim", "\u227F": "\\succsim", "\u227E": "\\precsim", "\u2279": "\\not\\overset{>}{<}", "\u2278": "\\not\\overset{>}{<}", "\u2277": "\\overset{>}{<}", "\u2276": "\\overset{<}{>}", "\u2275": "\\not\\geg", "\u2274": "\\not\\leq", "\u2273": "\\geg", "\u2272": "\\leq", "\u226C": "", "\u2267": "\\geg", "\u2266\u0338": "\\not\\leq", "\u2266": "\\leq", "\u2263": "\\overset{=}{=} ", "\u225E": "\\overset{m}{=} ", "\u225D": "\\overset{def}{=}", "\u2258": "=", "\u2256": "=", "\u2255": "=:", "\u2253": "\\doteq", "\u2252": "\\doteq", "\u2251": "\\doteq", "\u2250": "\\doteq", "\u224F\u0338": "", "\u224F": "", "\u224E\u0338": "", "\u224E": "", "\u224C": "\\approx", "\u224B": "\\approx", "\u224A": "\\approx", "\u2242\u0338": "\\neq", "\u2242": "=", "\u223F": "\\sim", "\u223E": "\\infty", "\u223D\u0331": "\\sim", "\u223D": "\\sim", "\u223B": "\\sim", "\u223A": ":-:", "\u2239": "-:", "\u2238": "\\bot", "\u2237": "::", "\u2236": ":", "\u2223": "\\mid", "\u221F": "\\llcorner", "\u2218": "\\circ", "\u2217": "*", "\u2215": "/", "\u220E": "\\square", "\u220D": "\\ni", "\u220A": "\\in", "\u2206": "\\Delta", "\u2044": "/", "\u2AB0\u0338": "\\nsucceq", "\u2AB0": "\\succeq", "\u2AAF\u0338": "\\npreceq", "\u2AAF": "\\preceq", "\u2A88": "\\ngeqslant", "\u2A87": "\\nleqslant", "\u29F3": "\\Phi", "\u29E6": "\\models", "\u29E5": "\\not\\equiv", "\u29E4": "\\approx\\neq", "\u29E3": "\\neq", "\u29C1": "\\circle", "\u29C0": "\\circle", "\u25E6": "\\circle", "\u25D7": "\\circle", "\u25D6": "\\circle", "\u25CF": "\\circle", "\u25CE": "\\circledcirc", "\u25CD": "\\circledcirc", "\u25CC": "\\circledcirc", "\u25C9": "\\circledcirc", "\u25C8": "\\diamond", "\u25C7": "\\diamond", "\u25C6": "\\diamond", "\u25C5": "\\triangleleft", "\u25C4": "\\triangleleft", "\u25C3": "\\triangleleft", "\u25C2": "\\triangleleft", "\u25C1": "\\triangleleft", "\u25C0": "\\triangleleft", "\u25BF": "\\triangledown", "\u25BE": "\\triangledown", "\u25BD": "\\triangledown", "\u25BC": "\\triangledown", "\u25B9": "\\triangleright", "\u25B8": "\\triangleright", "\u25B7": "\\triangleright", "\u25B6": "\\triangleright", "\u25B5": "\\triangle", "\u25B4": "\\triangle", "\u25B3": "\\triangle", "\u25B1": "\\square", "\u25B0": "\\blacksquare", "\u25AF": "\\square", "\u25AE": "\\blacksquare", "\u25AD": "\\square", "\u25AB": "\\square", "\u25AA": "\\square", "\u25A1": "\\square", "\u25A0": "\\blacksquare", "\u22ED": "\\not\\triangleright", "\u22EC": "\\not\\triangleleft", "\u22EB": "\\not\\triangleright", "\u22EA": "\\not\\triangleleft", "\u22D9": "\\ggg", "\u22D8": "\\lll", "\u22D7": "*>", "\u22D6": "<*", "\u22D4": "\\pitchfork", "\u22CC": "", "\u22CB": "\\bowtie", "\u22CA": "\\ltimes", "\u22C9": "\\rtimes", "\u22B5": "\\triangleright", "\\triangleleft": "", "\u22A5": "\\bot", "\u2281": "\\nsucc", "\u2280": "\\preceq", "\u227D": "\\succeq", "\u227C": "\\preceq", "\u227B": "\\succ", "\u227A": "\\prec", "\u2271": "\\geq/", "\u2270": "\\leq/", "\u226D": "\\neq", "\u226B\u0338": "\\not\\gg", "\u226B": "\\gg", "\u226A\u0338": "\\not\\ll", "\u226A": "\\ll", "\u2269": "\\ngeqslant", "\u2268": "\\nleqslant", "\u2261": "\\equiv", "\u225F": "\\doteq", "\u225C": "\\triangleq", "\u225B": "\\doteq", "\u225A": "\\triangleq", "\u2259": "\\triangleq", "\u2257": "\\doteq", "\u2254": ":=", "\u224D": "\\asymp", "\u2247": "\\ncong", "\u2246": "\\ncong", "\u2245": "\\cong", "\u2244": "\\not\\simeq", "\u2243": "\\simeq", "\u2241": "\\not\\sim", "\u2226": "\\not\\parallel", "\u2225": "\\parallel", "\u2224": "\\not|", "\u221D": "\\propto", "==": "==", "=": "=", ":=": ":=", "/=": "=", "-=": "-=", "+=": "+=", "*=": "*=", "!=": "!=", "\u2260": "\\neq", "\u2262": "\\equiv /", "\u2249": "\\approx /", "\u223C": "sim", "\u2248": "\\approx", "\u226E": "</", "<": "<", "\u226F": ">/", ">=": ">=", ">": ">", "\u2265": "\\geq", "\u2264": "\\leq", "<=": "<=", "\u228B": "\\supsetneq", "\u228A": "\\subsetneq", "\u2289": "\\nsupseteq", "\u2288": "\\nsubseteq", "\u2287": "\\supseteq", "\u2286": "\\subseteq", "\u2285": "\\not\\supset", "\u2284": "\\not\\subset", "\u2283\u20D2": "\\supset |", "\u2283": "\\supset", "\u2282\u20D2": "\\subset |", "\u2282": "\\subset", "\u220C": "\\not\\in", "\u2209": "\\notin", "\u2208": "\\in", "\u2201": "C", "\u2204": "\\nexists", "\u2203": "\\exists", "\u2200": "\\forall", "\u2227": "\\land", "&&": "\\&\\&", "\u2228": "\\lor", "\u22AF": "\\cancel{\\vDash}", "\u22AE": "\\cancel{\\Vdash}", "\u22AD": "\\nvDash", "\u22AC": "\\nvDash", "\u22A9": "\\Vdash", "\u22A8": "\\vDash", "\u22A4": "\\top", "\u22A3": "\\dashv", "\u22A2": "\\vdash", "\u220B": "\\ni", "\u22F1": "\\ddots", "\u22EF": "\\hdots", "\u22EE": "\\vdots", "\u03F6": "\\ni", ":": ":", "...": "\\cdots", "..": "..", "->": "->", "\u2235": "\\because", "\u2234": "\\therefore ", "\u2063": "\\llbracket", ",": ",", ";": ";", "\u29FD": "\\}", "\u29FC": "\\{", "\u2998": "\\]", "\u2997": "\\[", "\u2996": "\\ll", "\u2995": "\\gg", "\u2994": "\\gg", "\u2993": "\\ll", "\u2992": "\\gg", "\u2991": "\\ll", "\u2990": "\\]", "\u298F": "\\]", "\u298E": "\\]", "\u298D": "\\[", "\u298C": "\\[", "\u298B": "\\]", "\u298A": "\\triangleright", "\u2989": "\\triangleleft", "\u2988": "|\\)", "\u2987": "\\(|", "\u2986": "|\\)", "\u2985": "\\(\\(", "\u2984": "|\\}", "\u2983": "\\{|", "\u2980": "\\||", "\u27EF": "\\left. \\right]", "\u27EE": "\\left[ \\right.", "\u27ED": "\\left. \\right]]", "\u27EC": "\\left[[ \\right.", "\u27EB": "\\gg", "\u27EA": "\\ll", "\u27E7": "\\)|", "\u27E6": "\\(|", "\u2773": "\\left.\\right)", "\u2772": "\\left(\\right.", "\u232A": "\\rangle", "\u2329": "\\langle", "\u230B": "\\rfloor", "\u230A": "\\lfloor", "\u2309": "\\rceil", "\u2308": "\\lceil", "\u2016": "\\parallel", "}": "\\left.\\right}", "{": "\\left{\\right.", "]": "\\left]\\right.", "[": "\\left[\\right.", ")": "\\left.\\right)", "(": "\\left(\\right.", "\u201D": '\\"', "\u201C": "\\text{``}", "\u2019": "'", "\u2018": "`", \u03B1: "\\alpha", \u03B2: "\\beta", \u03B3: "\\gamma", \u0393: "\\Gamma", \u03B4: "\\delta", \u0394: "\\Delta", "\u03F5": "\\epsilon", \u03B6: "\\zeta", \u03B7: "\\eta", \u03B8: "\\theta", \u0398: "\\Theta", \u03B9: "\\iota", \u03BA: "\\kappa", \u03BB: "\\lambda", \u03BD: "\\nu", \u03BF: "\\omicron", \u03C0: "\\pi", \u03A0: "\\Pi", \u03C1: "\\rho", \u03C3: "\\sigma", \u03A3: "\\Sigma", \u03C4: "\\tau", \u03C5: "\\upsilon", \u03A5: "\\Upsilon", \u03D5: "\\phi", \u03A6: "\\Phi", \u03C7: "\\chi", \u03C8: "\\psi", \u03A8: "\\Psi", \u03C9: "\\omega", \u03A9: "\\Omega", \u2126: "\\Omega", "\u2205": "\\emptyset", "\u27F2": "\\circlearrowleft", "\u27F3": "\\circlearrowright", "\xD7": "\\times", "\xBD": "\\dfrac{1}{2}", \u03BC: "\\mu", \u04E8: "\\theta", "\u2713": "\\checkmark", "\u27E9": "\\rangle", "\u27E8": "\\langle", "\xBC": "\\dfrac{1}{4}", "\u2026": "\\ldots", \u210F: "\\hbar", \u211C: "\\mathfrak{R}", \u0472: "\\theta", \u00D8: "\\emptyset", \u03F1: "\\varrho", \u0444: "\\phi", \u2107: "\\varepsilon", T: "T", "\u2219": "\\cdot", \u03A1: "P", "\u221E": "\\infty", \u1401: "\\nabla", \u019E: "\\eta", "\u207A": "^{+}", "\u207B": "^{-}", "\u207C": "^{=}", "\u207D": "^{(}", "\u207E": "^{)}", "\u3017": "\\)|", "\u3016": "\\langle", "\u037E": ";", "\u0D66": "\\circ", "\u2534": "\\perp", "\u2715": "\\times", "\u23BB": "-", "\xBB": "\\gg", "\u2B06": "\\uparrow", "\u2B07": "\\downarrow", "\u2B05": "\\leftarrow", "\u27A1": "\\rightarrow", "\u23BC": "-", "\u239C": "\\mid", "\u23A5": "\\mid", \u0127: "\\hbar", "\u2B95": "\\rightarrow", "\u30FB": "\\cdot", "\xA6": "\\mid", "\xA3": "\\pounds", "\xA5": "\\yen", "\u2717": "\\times", "\u2714": "\\checkmark", \u207F: "^{n}", "\xAB": "\\ll", \u0E40: "\\prime", "\u2020": "\\dagger", "\u2502": "\\mid", $: "\\$", "#": "\\#", "\u2103": "\\text{\\textdegree C}", "\u2109": "\\text{\\textdegree F}", "\u2588": "\\blacksquare", "\u2127": "\\mho", "\u2147": "\\text{e}", \u027C: "r", "\u2021": "\\ddagger", \u1F31: "i", \u03D2: "\\Upsilon", "\u{1D6FF}": "\\delta", "\u02F3": "\\cdot", \u0473: "\\theta", "\u{1D719}": "\\phi", \u041F: "\\prod", \u043E: "o", \u0452: "\\hbar", "\u0245": "\\Lambda", "\u0964": "\\mid", "\u20AC": "\\euro", \u1FE1: "\\bar{u}", \u03C6: "\\varphi", "\u023C": "c", "\u{1D7AE}": "\\epsilon", \u03A7: "\\mathsf{X}", "\u2099": "_{n}" };
          }, 8249: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.allMathSymbolsByChar = void 0, t4.allMathSymbolsByChar = { "&#xA0;": "\\textrm{ }", "&#x2203;": "\\exists", "&#x2200;": "\\forall", "&#x21D4;": "\\iff", "&#x21D2;": "=>", "&#xAC;": "\\neg", "&#x2124;": "\\mathbb{Z}", "&#x211D;": "\\mathbb{R}", "&#x211A;": "\\mathbb{Q}", "&#x2115;": "\\mathbb{N}", "&#x2102;": "CC", "&#x25A1;": "\\square", "&#x22C4;": "\\diamond", "&#x25B3;": "\\triangle", "&#x2322;": "\\frown", "&#x2220;": "\\angle", "&#x22F1;": "\\ddots", "&#x22EE;": "\\vdots", "&#x2235;": "\\because", "&#x2234;": "\\therefore", "&#x2135;": "\\aleph", "&#x2205;": "\\oslash", "&#xB1;": "\\pm", "&#x2207;": "\\nabla", "&#x2202;": "\\partial", "&#x222E;": "\\oint", "&#x222B;": "\\int", "&#x22C3;": "\\cup", "&#x222A;": "\\cup", "&#x22C2;": "\\cap", "&#x2229;": "\\cap", "&#x22C1;": "\\vee", "&#x2228;": "\\vee", "&#x22C0;": "\\wedge", "&#x2227;": "\\wedge", "&#x220F;": "\\prod", "&#x2211;": "\\sum", "&#x2299;": "\\bigodot", "&#x2297;": "\\bigoplus", "&#x2295;": "o+", "&#x2218;": "@", "&#x22C8;": "\\bowtie", "&#x22CA;": "\\rtimes", "&#x22C9;": "\\ltimes", "&#xF7;": "\\div", "&#xD7;": "\\times", "\\": "\\backslash", "&#x22C6;": "\\star", "&#x2217;": "\\star", "&#x22C5;": "\\cdot", "&#x3A9;": "\\Omega", "&#x3C9;": "\\omega", "&#x3A8;": "\\Psi", "&#x3C8;": "\\psi", "&#x3C7;": "\\chi", "&#x3C6;": "\\varphi", "&#x3A6;": "\\Phi", "&#x3D5;": "\\phi", "&#x3C5;": "\\upsilon", "&#x3C4;": "\\tau", "&#x3A3;": "\\Sigma", "&#x3C3;": "\\sigma", "&#x3C1;": "\\rho", "&#x3A0;": "\\Pi", "&#x3C0;": "\\pi", "&#x39E;": "\\Xi", "&#x3BE;": "\\xi", "&#x3BD;": "\\nu", "&#x3BC;": "\\mu", "&#x39B;": "\\Lambda", "&#x3BB;": "\\lambda", "&#x3BA;": "\\kappa", "&#x3B9;": "\\iota", "&#x3D1;": "\\vartheta", "&#x398;": "\\Theta", "&#x3B8;": "\\theta", "&#x3B7;": "\\eta", "&#x3B6;": "\\zeta", "&#x25B;": "\\varepsilon", "&#x3B5;": "\\epsilon", "&#x394;": "\\Delta", "&#x3B4;": "\\delta", "&#x393;": "\\Gamma", "&#x3B3;": "\\gamma", "&#x3B2;": "\\beta", "&#x3B1;": "\\alpha", "&#x221E;": "\\infty", "\u202C": "\\text{\\textdir TRT}", "\u200E": "\\text{\\textdir LTR}" };
          }, 8171: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.allMathSymbolsByGlyph = void 0, t4.allMathSymbolsByGlyph = { " ": "\\textrm{ }", "\u2203": "\\exists", "\u2200": "\\forall", "\u21D4": "\\iff", "\u21D2": "\\Rightarrow", "\xAC": "\\neg", "\u25A1": "\\square", "\u22C4": "\\diamond", "\u25B3": "\\triangle", "\u2322": "\\frown", "\u2220": "\\angle", "\u22F1": "\\ddots", "\u22EE": "\\vdots", "\u2235": "\\because", "\u2234": "\\therefore", \u2135: "\\aleph", "\u2205": "\\emptyset", "\xB1": "\\pm", "\u2207": "\\nabla", "\u2202": "\\partial", "\u222E": "\\oint", "\u222B": "\\int", "\u22C3": "\\cup", "\u222A": "\\cup", "\u22C2": "\\cap", "\u2229": "\\cap", "\u22C1": "\\vee", "\u2228": "\\vee", "\u22C0": "\\wedge", "\u2227": "\\wedge", "\u220F": "\\prod", "\u2211": "\\sum", "\u2299": "\\bigodot", "\u2297": "\\bigoplus", "\u2295": "o+", "\u2218": "@", "\u22C8": "\\bowtie", "\u22CA": "\\rtimes", "\u22C9": "\\ltimes", "\xF7": "\\div", "\xD7": "\\times", "\\": "\\backslash", "\u22C6": "\\star", "\u2217": "\\star", "\u22C5": "\\cdot", \u03A9: "\\Omega", \u03C9: "\\omega", \u03A8: "\\Psi", \u03C8: "\\psi", \u03C7: "\\chi", \u03C6: "\\varphi", \u03A6: "\\Phi", \u03D5: "\\phi", \u03C5: "\\upsilon", \u03C4: "\\tau", \u03A3: "\\Sigma", \u03C3: "\\sigma", \u03C1: "\\rho", \u03A0: "\\Pi", \u03C0: "\\pi", \u039E: "\\Xi", \u03BE: "\\xi", \u03BD: "\\nu", \u03BC: "\\mu", \u039B: "\\Lambda", \u03BB: "\\lambda", \u03BA: "\\kappa", \u03B9: "\\iota", \u03D1: "\\vartheta", \u0398: "\\Theta", \u03B8: "\\theta", \u03B7: "\\eta", \u03B6: "\\zeta", \u025B: "\\varepsilon", \u03B5: "\\epsilon", \u0394: "\\Delta", \u03B4: "\\delta", \u0393: "\\Gamma", \u03B3: "\\gamma", \u03B2: "\\beta", \u03B1: "\\alpha", "\u221E": "\\infty", "\u03F5": "\\epsilon", \u00B5: "\\mu", "\xB2": "^{2}", \u0131: "\\imath", "\u220E": "\\blacksquare", \u0E21: "\\mathbf{m}", \u2126: "\\Omega", "\u27F2": "\\circlearrowleft", "\u27F3": "\\circlearrowright", \u0924: " ", "\xA5": "\\yen", "\u207D": "^{(}", "\u207E": "^{)}", \u00DF: "\\ss", \u040B: "\\hbar", "\u29B5": "\\ominus", "\u22BF": "\\bigtriangleup", "\u219B'": "\\nrightarrow", "\u2020": "\\dagger", \u0E40: "\\prime", \u767D: " ", "\u2FF1": " ", \u2138: "\\wp", \uD4F0: " ", \u207F: "^{n}", "\u2714": "\\checkmark", "\u2717": "\\times", "\xBD": "\\dfrac{1}{2}", \u04E8: "\\theta", "\u2713": "\\checkmark", "\u27E9": "\\rangle", "\u27E8": "\\langle", "\u2329": "\\langle", "\xBC": "\\dfrac{1}{4}", "\u2026": "\\ldots", \u210F: "\\hbar", \u211C: "\\mathfrak{R}", \u0472: "\\theta", \u00D8: "\\emptyset", \u03F1: "\\varrho", \u0444: "\\phi", T: "T", "\u2219": "\\cdot", \u03A1: "P", \u1401: "\\nabla", \u019E: "\\eta", \u0263: "\\gamma", \u045B: "\\hbar", \u0190: "\\varepsilon", "\u2145": "\\_{D}", "\u{1D706}": "\\lambda", "\u3017": "\\rangle", "\u3016": "\\langle", "\u037E": ";", "\u{1D465}": "x", "\u{1D466}": "y", "\u{1D467}": "z", "\u{1D456}": "i", "\u{1D457}": "j", "\u{1D458}": "k", "\u{1D45A}": "m", "\u{1D452}": "e", "\u{1D45F}": "r", \u0273: "\\eta", "\u{1D6FD}": "\\beta", "\u2375": "\\omega", "\u2118": "\\wp", "\u{1D70B}": "\\pi", \u0404: "\\epsilon", \u0454: "\\epsilon", "\u{1D700}": "\\epsilon", \u043F: "\\pi", \u039D: "\\nu", \u0275: "\\theta", "\u{1D713}": "\\psi", "\u03F4": "\\theta", \u0278: "\\phi", "\u04F6": "\\Gamma", \u026D: "\\ell", \u028B: "\\upsilon", "\u{1D6DF}": "\\varphi", "\u236C": "\\theta", \u0424: "\\Phi", "\u{1D711}": "\\varphi", "\u2148": "i", \u03BF: "o", \u01A1: "o", \u0192: "f", "\u2374": "\\rho", "\u{1F1FD}": "x", "\u{1D45D}": "p", "\u{1D45E}": "q", "\u{1D460}": "s", "\u{1D461}": "t", "\u{1D462}": "u", "\u{1D463}": "v", "\u{1D464}": "w", "\u{1D44E}": "a", "\u{1D44F}": "b", "\u{1D450}": "c", "\u{1D451}": "d", "\u{1D453}": "f", "\u{1D454}": "g", "\u{1D459}": "l", "\u{1D45B}": "n", "\u{1D45C}": "o", "\u{1D500}": "w", "\u{1D69F}": "v", \u1E41: "m", "\u0D66": "\\circ", "\u2534": "\\perp", "\u2715": "\\times", "\u2223": "\\mid", \u0553: "\\Phi", "\u239C": "\\mid", \u0127: "\\hbar", \u1348: " ", "\u29A8": "\\llbracket", \u1EBF: "\\hat{e}", "\xA2": "\\cent", "\u2939": "\\downarrow", "\u2938": "\\downarrow", "\u2937": "\\Rsh", "\u2936": "\\Lsh", "\u2935": "\\downarrow", "\u2934": "\\uparrow", "\u2933": "\\rightarrow", "|": "\\mid", "\u23A5": "\\mid", "\u2665": "\\heartsuit", \u041E: "0", \u03A5: "Y", \u0445: "x", "\u{1D4CF}": "z", "\u{1D4CE}": "y", "\u{1D4CD}": "x", \u0440: "p", \u0430: "a", "\xA3": "\\pounds", m: "m", "\u{1D6B5}": "\\Xi", "\u24EA": "\\textcircled{0}", "\u2460": "\\textcircled{1}", "\u2461": "\\textcircled{2}", "\u2462": "\\textcircled{3}", "\u2463": "\\textcircled{4}", "\u2464": "\\textcircled{5}", "\u2465": "\\textcircled{6}", "\u2466": "\\textcircled{7}", "\u2467": "\\textcircled{8}", "\u2468": "\\textcircled{9}", "\u2469": "\\textcircled{10}", "\u246A": "\\textcircled{11}", "\u246B": "\\textcircled{12}", "\u246C": "\\textcircled{13}", "\u246D": "\\textcircled{14}", "\u246E": "\\textcircled{15}", "\u246F": "\\textcircled{16}", "\u2470": "\\textcircled{17}", "\u2471": "\\textcircled{18}", "\u2472": "\\textcircled{19}", "\u2473": "\\textcircled{20}", "\u3251": "\\textcircled{21}", "\u3252": "\\textcircled{22}", "\u3253": "\\textcircled{23}", "\u3254": "\\textcircled{24}", "\u3255": "\\textcircled{25}", "\u3256": "\\textcircled{26}", "\u3257": "\\textcircled{27}", "\u3258": "\\textcircled{28}", "\u3259": "\\textcircled{29}", "\u325A": "\\textcircled{30}", "\u325B": "\\textcircled{31}", "\u325C": "\\textcircled{32}", "\u325D": "\\textcircled{33}", "\u325E": "\\textcircled{34}", "\u325F": "\\textcircled{35}", "\u32B1": "\\textcircled{36}", "\u32B2": "\\textcircled{37}", "\u32B3": "\\textcircled{38}", "\u32B4": "\\textcircled{39}", "\u32B5": "\\textcircled{40}", "\u32B6": "\\textcircled{41}", "\u32B7": "\\textcircled{42}", "\u32B8": "\\textcircled{43}", "\u32B9": "\\textcircled{44}", "\u32BA": "\\textcircled{45}", "\u32BB": "\\textcircled{46}", "\u32BC": "\\textcircled{47}", "\u32BD": "\\textcircled{48}", "\u32BE": "\\textcircled{49}", "\u32BF": "\\textcircled{50}", "&": "\\&", "\u2016": "\\parallel", "%": "\\%", "\u201C": "\\text{``}", $: "\\$", "#": "\\#", "\u2103": "\\text{\\textdegree C}", "\u2109": "\\text{\\textdegree F}", "\u2588": "\\blacksquare", "\u2127": "\\mho", "\u230B": "\\rfloor", "\u230A": "\\lfloor", "\u2309": "\\rceil", "\u2308": "\\lceil", \u2107: "\\varepsilon", "\u2147": "\\text{e}", \u027C: "r", "\u219B": "\\nrightarrow", "\u02C6": "\\hat{}", "\u203E": "\\overline", "\u2192": "\\rightarrow", "\u2021": "\\ddagger", "\u30FB": "\\cdot", "\u25B1": "\\square", "\u2206": "\\Delta", \u1F31: "i", "\u2221": "\\angle", \u03D2: "\\Upsilon", "\u2193": "\\downarrow", "\u2191": "\\uparrow", "\xBB": "\\gg", "\u22A4": "\\top", "\u29F8": "/", "\u{1D6FF}": "\\delta", "\u02F3": "\\cdot", "\u0589": ":", "\u29AA": "\\measuredangle", "\u29A9": "\\measuredangle", "\u29AB": "\\measuredangle", "\u2981": "\\cdot", \u0473: "\\theta", "\u29A2": "\\measuredangle", "\xB8": ",", "\u23BB": "\\overline", "\u27E6": "\\llbracket", "\u{1D719}": "\\phi", \u041F: "\\prod", \u043E: "o", "\u2248": "\\approx", "\u2264": "\\leq", \u0452: "\\hbar", "\u0245": "\\Lambda", \u571F: "\\pm", "\u23BC": "-", \u5341: "+", "\u2260": "\\neq", "\u2190": "\\leftarrow", "\u0964": "\\mid", "\u20AC": "\\euro", "\u02D8": " ", \u1FE1: "\\bar{u}", "\u2225": "\\parallel", "\u2194": "\\leftrightarrow", "\u221A": "\\sqrt{}", "\u023C": "c", "\u{1D7AE}": "\\epsilon", "\xB7": "\\cdot", "\u29AC": "\\measuredangle", "\u29AE": "\\measuredangle", "\u29AD": "\\measuredangle", "\xAB": "\\ll", \u03A7: "\\mathsf{X}", "\u2502": "\\mid", "\u232A": "\\rangle", "\u2099": "_{n}", "\u25AB": "\\square", "\u25CF": "\\circle", "\u201D": '\\"' };
          }, 5406: function(e4, t4, r3) {
            "use strict";
            var n3 = this && this.__createBinding || (Object.create ? function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4);
              var o2 = Object.getOwnPropertyDescriptor(t5, r4);
              o2 && !("get" in o2 ? !t5.__esModule : o2.writable || o2.configurable) || (o2 = { enumerable: true, get: function() {
                return t5[r4];
              } }), Object.defineProperty(e5, n4, o2);
            } : function(e5, t5, r4, n4) {
              void 0 === n4 && (n4 = r4), e5[n4] = t5[r4];
            }), o = this && this.__exportStar || function(e5, t5) {
              for (var r4 in e5) "default" === r4 || Object.prototype.hasOwnProperty.call(t5, r4) || n3(t5, e5, r4);
            };
            Object.defineProperty(t4, "__esModule", { value: true }), o(r3(2965), t4), o(r3(9039), t4), o(r3(8249), t4), o(r3(8171), t4), o(r3(472), t4), o(r3(4320), t4), o(r3(6122), t4);
          }, 472: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.latexAccents = void 0, t4.latexAccents = ["\\hat", "\\bar", "\\underbrace", "\\overbrace"];
          }, 4320: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.mathNumberByGlyph = void 0, t4.mathNumberByGlyph = { "\u2080": "_{0}", "\u2081": "_{1}", "\u2082": "_{2}", "\u2083": "_{3}", "\u2084": "_{4}", "\u2085": "_{5}", "\u2086": "_{6}", "\u2087": "_{7}", "\u2088": "_{8}", "\u2089": "_{9}", "\u2070": "^{0}", "\xB9": "^{1}", "\xB2": "^{2}", "\xB3": "^{3}", "\u2074": "^{4}", "\u2075": "^{5}", "\u2076": "^{6}", "\u2077": "^{7}", "\u2078": "^{8}", "\u2079": "^{9}", \u207F: "^{n}", "\u2099": "_{n}", "\u24EA": "\\textcircled{0}", "\u2460": "\\textcircled{1}", "\u2461": "\\textcircled{2}", "\u2462": "\\textcircled{3}", "\u2463": "\\textcircled{4}", "\u2464": "\\textcircled{5}", "\u2465": "\\textcircled{6}", "\u2466": "\\textcircled{7}", "\u2467": "\\textcircled{8}", "\u2468": "\\textcircled{9}", "\u2469": "\\textcircled{10}", "\u246A": "\\textcircled{11}", "\u246B": "\\textcircled{12}", "\u246C": "\\textcircled{13}", "\u246D": "\\textcircled{14}", "\u246E": "\\textcircled{15}", "\u246F": "\\textcircled{16}", "\u2470": "\\textcircled{17}", "\u2471": "\\textcircled{18}", "\u2472": "\\textcircled{19}", "\u2473": "\\textcircled{20}", "\u3251": "\\textcircled{21}", "\u3252": "\\textcircled{22}", "\u3253": "\\textcircled{23}", "\u3254": "\\textcircled{24}", "\u3255": "\\textcircled{25}", "\u3256": "\\textcircled{26}", "\u3257": "\\textcircled{27}", "\u3258": "\\textcircled{28}", "\u3259": "\\textcircled{29}", "\u325A": "\\textcircled{30}", "\u325B": "\\textcircled{31}", "\u325C": "\\textcircled{32}", "\u325D": "\\textcircled{33}", "\u325E": "\\textcircled{34}", "\u325F": "\\textcircled{35}", "\u32B1": "\\textcircled{36}", "\u32B2": "\\textcircled{37}", "\u32B3": "\\textcircled{38}", "\u32B4": "\\textcircled{39}", "\u32B5": "\\textcircled{40}", "\u32B6": "\\textcircled{41}", "\u32B7": "\\textcircled{42}", "\u32B8": "\\textcircled{43}", "\u32B9": "\\textcircled{44}", "\u32BA": "\\textcircled{45}", "\u32BB": "\\textcircled{46}", "\u32BC": "\\textcircled{47}", "\u32BD": "\\textcircled{48}", "\u32BE": "\\textcircled{49}", "\u32BF": "\\textcircled{50}", "\xBD": "\\dfrac{1}{2}", "\u2153": "\\dfrac{1}{3}", "\u2154": "\\dfrac{2}{3}", "\xBC": "\\dfrac{1}{4}", "\xBE": "\\dfrac{3}{4}", "\u2155": "\\dfrac{1}{5}", "\u2156": "\\dfrac{2}{5}", "\u2157": "\\dfrac{3}{5}", "\u2158": "\\dfrac{4}{5}", "\u2159": "\\dfrac{1}{6}", "\u215A": "\\dfrac{5}{6}", "\u2150": "\\dfrac{1}{7}", "\u215B": "\\dfrac{1}{8}", "\u215C": "\\dfrac{3}{8}", "\u215D": "\\dfrac{5}{8}", "\u215E": "\\dfrac{7}{8}", "\u2151": "\\dfrac{1}{9}", "\u2152": "\\dfrac{1}{10}" };
          }, 6122: (e4, t4) => {
            "use strict";
            Object.defineProperty(t4, "__esModule", { value: true }), t4.HashUTF8ToLtXConverter = void 0, t4.HashUTF8ToLtXConverter = class {
              convert(e5) {
                if (e5.match(/[a-z0-9]/i)) return e5;
                const t5 = r3[e5];
                return t5 ? this.convertAccentCharToLtX(t5) || e5 : this.convertSpecialCharToLtX(e5) || e5;
              }
              convertAccentCharToLtX(e5) {
                const { char: t5, accent: r4 } = e5, o2 = n3[r4];
                return o2 ? `\\${o2}{${t5}}` : null;
              }
              convertSpecialCharToLtX(e5) {
                const t5 = o[e5];
                if (!t5) return null;
                const { letter: r4, fontCmd: n4 } = t5;
                return `\\${n4}{${r4}}`;
              }
            };
            const r3 = { \u00E1: { char: "a", accent: "\xB4" }, \u00E0: { char: "a", accent: "`" }, \u00E2: { char: "a", accent: "^" }, \u00E3: { char: "a", accent: "~" }, \u00E4: { char: "a", accent: "\xA8" }, \u00E5: { char: "a", accent: "\u02DA" }, \u0105: { char: "a", accent: "\u02D9" }, \u0103: { char: "a", accent: "\u02D8" }, \u01CE: { char: "a", accent: "\u02C7" }, \u01DF: { char: "a", accent: "\u02C6" }, \u01FB: { char: "a", accent: "\u02D9" }, \u01E1: { char: "a", accent: "-" }, \u0101: { char: "a", accent: "-" }, \u00E9: { char: "e", accent: "\xB4" }, \u00E8: { char: "e", accent: "`" }, \u00EA: { char: "e", accent: "^" }, \u00EB: { char: "e", accent: "\xA8" }, \u0119: { char: "e", accent: "\u02D9" }, \u011B: { char: "e", accent: "\u02C7" }, \u0207: { char: "i", accent: "^" }, \u0451: { char: "e", accent: "\xA8" }, \u0113: { char: "e", accent: "-" }, \u00ED: { char: "i", accent: "\xB4" }, \u00EC: { char: "i", accent: "`" }, \u00EE: { char: "i", accent: "^" }, \u00EF: { char: "i", accent: "\xA8" }, \u012F: { char: "i", accent: "\u02D9" }, \u01D0: { char: "i", accent: "\u02C7" }, \u0209: { char: "i", accent: "`" }, \u020B: { char: "i", accent: "\xA8" }, \u012B: { char: "i", accent: "-" }, \u00F3: { char: "o", accent: "\xB4" }, \u00F2: { char: "o", accent: "`" }, \u00F4: { char: "o", accent: "^" }, \u00F5: { char: "o", accent: "~" }, \u00F6: { char: "o", accent: "\xA8" }, \u0151: { char: "o", accent: "\u02DD" }, \u01D2: { char: "o", accent: "\u02C7" }, \u020D: { char: "o", accent: "`" }, \u020F: { char: "o", accent: "\xA8" }, \u022B: { char: "o", accent: "\u02D8" }, \u022D: { char: "o", accent: "\u02DD" }, \u022F: { char: "o", accent: "\u02D9" }, \u014D: { char: "o", accent: "-" }, \u00FA: { char: "u", accent: "\xB4" }, \u00F9: { char: "u", accent: "`" }, \u00FB: { char: "u", accent: "^" }, \u00FC: { char: "u", accent: "\xA8" }, \u0171: { char: "u", accent: "\u02DD" }, \u01D4: { char: "u", accent: "\u02C7" }, \u01D6: { char: "u", accent: "\xA8" }, \u01D8: { char: "u", accent: "\xA8" }, \u01DA: { char: "u", accent: "\xA8" }, \u01DC: { char: "u", accent: "\xA8" }, \u0215: { char: "u", accent: "`" }, \u0217: { char: "u", accent: "\xA8" }, \u016B: { char: "u", accent: "-" }, \u00FD: { char: "y", accent: "\xB4" }, \u1EF3: { char: "y", accent: "`" }, \u0177: { char: "y", accent: "^" }, \u00FF: { char: "y", accent: "\xA8" }, \u0233: { char: "y", accent: "-" }, \u00C1: { char: "A", accent: "\xB4" }, \u00C0: { char: "A", accent: "`" }, \u00C2: { char: "A", accent: "^" }, \u00C3: { char: "A", accent: "~" }, \u00C4: { char: "A", accent: "\xA8" }, \u00C5: { char: "A", accent: "\u02DA" }, \u212B: { char: "A", accent: "\u02DA" }, \u0226: { char: "A", accent: "\u02D9" }, \u0102: { char: "A", accent: "\u02D8" }, \u01CD: { char: "A", accent: "\u02C7" }, \u01DE: { char: "A", accent: "\u02DD" }, \u01FA: { char: "A", accent: "\u02DA" }, \u01E0: { char: "A", accent: "-" }, \u0100: { char: "A", accent: "-" }, \u00C9: { char: "E", accent: "\xB4" }, \u00C8: { char: "E", accent: "`" }, \u0116: { char: "E", accent: "\u02D9" }, \u00CA: { char: "E", accent: "^" }, \u00CB: { char: "E", accent: "\xA8" }, \u011A: { char: "E", accent: "\u02C7" }, \u0204: { char: "E", accent: "`" }, \u0206: { char: "E", accent: "\xA8" }, \u0112: { char: "E", accent: "-" }, \u00CD: { char: "I", accent: "\xB4" }, \u00CC: { char: "I", accent: "`" }, \u00CE: { char: "I", accent: "^" }, \u00CF: { char: "I", accent: "\xA8" }, \u012C: { char: "I", accent: "\u02D8" }, \u01CF: { char: "I", accent: "\u02C7" }, \u0208: { char: "I", accent: "`" }, \u020A: { char: "I", accent: "\xA8" }, \u012A: { char: "I", accent: "-" }, \u00D3: { char: "O", accent: "\xB4" }, \u00D2: { char: "O", accent: "`" }, \u00D4: { char: "O", accent: "^" }, \u00D5: { char: "O", accent: "~" }, \u00D6: { char: "O", accent: "\xA8" }, \u0150: { char: "O", accent: "\u02DD" }, \u01D1: { char: "O", accent: "\u02C7" }, \u020C: { char: "O", accent: "`" }, \u020E: { char: "O", accent: "\xA8" }, \u022A: { char: "O", accent: "\u02D8" }, \u022C: { char: "O", accent: "\u02DD" }, \u022E: { char: "O", accent: "\u02D9" }, \u014C: { char: "O", accent: "-" }, \u00DA: { char: "U", accent: "\xB4" }, \u00D9: { char: "U", accent: "`" }, \u00DB: { char: "U", accent: "^" }, \u00DC: { char: "U", accent: "\xA8" }, \u0170: { char: "U", accent: "\u02DD" }, \u01D3: { char: "U", accent: "\u02C7" }, \u01D5: { char: "U", accent: "\xA8" }, \u0214: { char: "U", accent: "`" }, \u0216: { char: "U", accent: "\xA8" }, \u016A: { char: "U", accent: "-" }, \u00DD: { char: "Y", accent: "\xB4" }, \u1EF2: { char: "Y", accent: "`" }, \u0176: { char: "Y", accent: "^" }, \u0178: { char: "Y", accent: "\xA8" }, \u0232: { char: "Y", accent: "-" }, \u00F1: { char: "n", accent: "~" }, \u00D1: { char: "N", accent: "~" }, \u00E7: { char: "c", accent: "\u02D9" }, \u00C7: { char: "C", accent: "\u02D9" }, \u1E7D: { char: "v", accent: "~" }, \u1E7C: { char: "V", accent: "~" }, \u0135: { char: "j", accent: "^" }, \u0134: { char: "J", accent: "^" }, \u017A: { char: "z", accent: "\xB4" }, \u0179: { char: "Z", accent: "\xB4" }, \u017B: { char: "Z", accent: "^" }, \u017C: { char: "z", accent: "^" }, \u017D: { char: "Z", accent: "\u02C7" }, \u017E: { char: "z", accent: "\u02C7" }, \u1E91: { char: "z", accent: "\u02C6" } }, n3 = { "\xB4": "acute", "`": "grave", "^": "hat", "~": "tilde", "\xA8": "ddot", "\u02DA": "mathring", "\u02D8": "breve", "\u02C7": "check", "\u02DD": "H", "\u02D9": "dot", "-": "bar", "\u02C6": "hat", "\u02DC": "tilde" }, o = { "\u{1D400}": { letter: "A", fontCmd: "mathbf" }, "\u{1D401}": { letter: "B", fontCmd: "mathbf" }, "\u{1D402}": { letter: "C", fontCmd: "mathbf" }, "\u{1D403}": { letter: "D", fontCmd: "mathbf" }, "\u{1D404}": { letter: "E", fontCmd: "mathbf" }, \u0395: { letter: "E", fontCmd: "mathbf" }, "\u{1D405}": { letter: "F", fontCmd: "mathbf" }, "\u{1D406}": { letter: "G", fontCmd: "mathbf" }, "\u{1D407}": { letter: "H", fontCmd: "mathbf" }, "\u{1D408}": { letter: "I", fontCmd: "mathbf" }, "\u{1D409}": { letter: "J", fontCmd: "mathbf" }, "\u{1D40A}": { letter: "K", fontCmd: "mathbf" }, "\u{1D40B}": { letter: "L", fontCmd: "mathbf" }, "\u{1D40C}": { letter: "M", fontCmd: "mathbf" }, "\u{1D40D}": { letter: "N", fontCmd: "mathbf" }, "\u{1D40E}": { letter: "O", fontCmd: "mathbf" }, "\u{1D40F}": { letter: "P", fontCmd: "mathbf" }, "\u{1D410}": { letter: "Q", fontCmd: "mathbf" }, "\u{1D411}": { letter: "R", fontCmd: "mathbf" }, "\u{1D412}": { letter: "S", fontCmd: "mathbf" }, "\u{1D413}": { letter: "T", fontCmd: "mathbf" }, "\u{1D414}": { letter: "U", fontCmd: "mathbf" }, "\u{1D415}": { letter: "V", fontCmd: "mathbf" }, "\u{1D416}": { letter: "W", fontCmd: "mathbf" }, "\u{1D417}": { letter: "X", fontCmd: "mathbf" }, "\u{1D786}": { letter: "X", fontCmd: "mathbf" }, "\u{1D418}": { letter: "Y", fontCmd: "mathbf" }, "\u{1D419}": { letter: "Z", fontCmd: "mathbf" }, "\u{1D7CE}": { letter: "0", fontCmd: "mathbf" }, "\u{1D7CF}": { letter: "1", fontCmd: "mathbf" }, "\u{1D7D0}": { letter: "2", fontCmd: "mathbf" }, "\u{1D7D1}": { letter: "3", fontCmd: "mathbf" }, "\u{1D7D2}": { letter: "4", fontCmd: "mathbf" }, "\u{1D7D3}": { letter: "5", fontCmd: "mathbf" }, "\u{1D7D4}": { letter: "6", fontCmd: "mathbf" }, "\u{1D7D5}": { letter: "7", fontCmd: "mathbf" }, "\u{1D7D6}": { letter: "8", fontCmd: "mathbf" }, "\u{1D7D7}": { letter: "9", fontCmd: "mathbf" }, "\u{1D434}": { letter: "A", fontCmd: "mathit" }, "\u{1D435}": { letter: "B", fontCmd: "mathit" }, "\u{1D436}": { letter: "C", fontCmd: "mathit" }, "\u{1D437}": { letter: "D", fontCmd: "mathit" }, "\u{1D438}": { letter: "E", fontCmd: "mathit" }, "\u{1D439}": { letter: "F", fontCmd: "mathit" }, "\u{1D43A}": { letter: "G", fontCmd: "mathit" }, "\u{1D43B}": { letter: "H", fontCmd: "mathit" }, "\u{1D43C}": { letter: "I", fontCmd: "mathit" }, \u0399: { letter: "I", fontCmd: "mathit" }, "\u{1D43D}": { letter: "J", fontCmd: "mathit" }, "\u{1D43E}": { letter: "K", fontCmd: "mathit" }, "\u{1D43F}": { letter: "L", fontCmd: "mathit" }, "\u{1D440}": { letter: "M", fontCmd: "mathit" }, "\u{1D441}": { letter: "N", fontCmd: "mathit" }, "\u{1D442}": { letter: "O", fontCmd: "mathit" }, "\u{1D443}": { letter: "P", fontCmd: "mathit" }, "\u{1D444}": { letter: "Q", fontCmd: "mathit" }, "\u{1D445}": { letter: "R", fontCmd: "mathit" }, "\u{1D446}": { letter: "S", fontCmd: "mathit" }, "\u{1D447}": { letter: "T", fontCmd: "mathit" }, "\u{1D448}": { letter: "U", fontCmd: "mathit" }, "\u{1D449}": { letter: "V", fontCmd: "mathit" }, "\u{1D44A}": { letter: "W", fontCmd: "mathit" }, "\u{1D44B}": { letter: "X", fontCmd: "mathit" }, "\u{1D44C}": { letter: "Y", fontCmd: "mathit" }, "\u{1D44D}": { letter: "Z", fontCmd: "mathit" }, "\u{1D538}": { letter: "A", fontCmd: "mathbb" }, "\u{1D539}": { letter: "B", fontCmd: "mathbb" }, \u2102: { letter: "C", fontCmd: "mathbb" }, "\u{1D53B}": { letter: "D", fontCmd: "mathbb" }, "\u{1D53C}": { letter: "E", fontCmd: "mathbb" }, "\u{1D53D}": { letter: "F", fontCmd: "mathbb" }, "\u{1D53E}": { letter: "G", fontCmd: "mathbb" }, \u210D: { letter: "H", fontCmd: "mathbb" }, "\u{1D540}": { letter: "I", fontCmd: "mathbb" }, "\u{1D541}": { letter: "J", fontCmd: "mathbb" }, "\u{1D542}": { letter: "K", fontCmd: "mathbb" }, "\u{1D543}": { letter: "L", fontCmd: "mathbb" }, "\u{1D544}": { letter: "M", fontCmd: "mathbb" }, \u2115: { letter: "N", fontCmd: "mathbb" }, "\u{1D546}": { letter: "O", fontCmd: "mathbb" }, \u2119: { letter: "P", fontCmd: "mathbb" }, \u211A: { letter: "Q", fontCmd: "mathbb" }, \u211D: { letter: "R", fontCmd: "mathbb" }, "\u{1D54A}": { letter: "S", fontCmd: "mathbb" }, "\u{1D54B}": { letter: "T", fontCmd: "mathbb" }, "\u{1D54C}": { letter: "U", fontCmd: "mathbb" }, "\u{1D54D}": { letter: "V", fontCmd: "mathbb" }, "\u{1D54E}": { letter: "W", fontCmd: "mathbb" }, "\u{1D54F}": { letter: "X", fontCmd: "mathbb" }, "\u{1D550}": { letter: "Y", fontCmd: "mathbb" }, \u2124: { letter: "Z", fontCmd: "mathbb" }, "\u{1D7D8}": { letter: "0", fontCmd: "mathbb" }, "\u{1D7D9}": { letter: "1", fontCmd: "mathbb" }, "\u{1D7DA}": { letter: "2", fontCmd: "mathbb" }, "\u{1D7DB}": { letter: "3", fontCmd: "mathbb" }, "\u{1D7DC}": { letter: "4", fontCmd: "mathbb" }, "\u{1D7DD}": { letter: "5", fontCmd: "mathbb" }, "\u{1D7DE}": { letter: "6", fontCmd: "mathbb" }, "\u{1D7DF}": { letter: "7", fontCmd: "mathbb" }, "\u{1D7E0}": { letter: "8", fontCmd: "mathbb" }, "\u{1D7E1}": { letter: "9", fontCmd: "mathbb" }, "\u{1D49C}": { letter: "A", fontCmd: "mathcal" }, "\u{1D4D0}": { letter: "A", fontCmd: "mathcal" }, \u212C: { letter: "B", fontCmd: "mathcal" }, "\u{1D49E}": { letter: "C", fontCmd: "mathcal" }, "\u{1D49F}": { letter: "D", fontCmd: "mathcal" }, "\u{1D4D3}": { letter: "D", fontCmd: "mathcal" }, \u2130: { letter: "E", fontCmd: "mathcal" }, \u2131: { letter: "F", fontCmd: "mathcal" }, "\u{1D4D5}": { letter: "F", fontCmd: "mathcal" }, "\u{1D4A2}": { letter: "G", fontCmd: "mathcal" }, \u210B: { letter: "H", fontCmd: "mathcal" }, \u2110: { letter: "I", fontCmd: "mathcal" }, "\u{1D4A5}": { letter: "J", fontCmd: "mathcal" }, "\u{1D4A6}": { letter: "K", fontCmd: "mathcal" }, \u2112: { letter: "L", fontCmd: "mathcal" }, "\u{1D4DB}": { letter: "L", fontCmd: "mathcal" }, \u2133: { letter: "M", fontCmd: "mathcal" }, "\u{1D4A9}": { letter: "N", fontCmd: "mathcal" }, "\u{1D4AA}": { letter: "O", fontCmd: "mathcal" }, "\u{1D4DE}": { letter: "O", fontCmd: "mathcal" }, "\u{1D4AB}": { letter: "P", fontCmd: "mathcal" }, "\u{1D4AC}": { letter: "Q", fontCmd: "mathcal" }, \u211B: { letter: "R", fontCmd: "mathcal" }, "\u{1D57D}": { letter: "R", fontCmd: "mathcal" }, "\u211F": { letter: "R", fontCmd: "mathcal" }, "\u{1D4AE}": { letter: "S", fontCmd: "mathcal" }, "\u{1D4AF}": { letter: "T", fontCmd: "mathcal" }, "\u{1D4B0}": { letter: "U", fontCmd: "mathcal" }, "\u{1D4B1}": { letter: "V", fontCmd: "mathcal" }, "\u{1D4B2}": { letter: "W", fontCmd: "mathcal" }, "\u{1D4B3}": { letter: "X", fontCmd: "mathcal" }, "\u{1D4B4}": { letter: "Y", fontCmd: "mathcal" }, "\u{1D4B5}": { letter: "Z", fontCmd: "mathcal" }, "\u{1D504}": { letter: "A", fontCmd: "mathfrak" }, "\u{1D505}": { letter: "B", fontCmd: "mathfrak" }, \u212D: { letter: "C", fontCmd: "mathfrak" }, "\u{1D507}": { letter: "D", fontCmd: "mathfrak" }, "\u{1D508}": { letter: "E", fontCmd: "mathfrak" }, "\u{1D509}": { letter: "F", fontCmd: "mathfrak" }, "\u{1D50A}": { letter: "G", fontCmd: "mathfrak" }, \u210C: { letter: "H", fontCmd: "mathfrak" }, \u2111: { letter: "I", fontCmd: "mathfrak" }, "\u{1D50D}": { letter: "J", fontCmd: "mathfrak" }, "\u{1D50E}": { letter: "K", fontCmd: "mathfrak" }, "\u{1D50F}": { letter: "L", fontCmd: "mathfrak" }, "\u{1D510}": { letter: "M", fontCmd: "mathfrak" }, "\u{1D511}": { letter: "N", fontCmd: "mathfrak" }, "\u{1D512}": { letter: "O", fontCmd: "mathfrak" }, "\u{1D513}": { letter: "P", fontCmd: "mathfrak" }, "\u{1D514}": { letter: "Q", fontCmd: "mathfrak" }, \u211C: { letter: "R", fontCmd: "mathfrak" }, "\u{1D516}": { letter: "S", fontCmd: "mathfrak" }, "\u{1D517}": { letter: "T", fontCmd: "mathfrak" }, "\u{1D518}": { letter: "U", fontCmd: "mathfrak" }, "\u{1D519}": { letter: "V", fontCmd: "mathfrak" }, "\u{1D51A}": { letter: "W", fontCmd: "mathfrak" }, "\u{1D51B}": { letter: "X", fontCmd: "mathfrak" }, "\u{1D51C}": { letter: "Y", fontCmd: "mathfrak" }, \u2128: { letter: "Z", fontCmd: "mathfrak" }, "\u{1D5A0}": { letter: "A", fontCmd: "mathsf" }, \u0391: { letter: "A", fontCmd: "mathsf" }, "\u{1D5A1}": { letter: "B", fontCmd: "mathsf" }, \u0392: { letter: "B", fontCmd: "mathsf" }, "\u{1D5A2}": { letter: "C", fontCmd: "mathsf" }, "\u{1D5A3}": { letter: "D", fontCmd: "mathsf" }, "\u{1D5A4}": { letter: "E", fontCmd: "mathsf" }, "\u{1D5A5}": { letter: "F", fontCmd: "mathsf" }, "\u{1D5A6}": { letter: "G", fontCmd: "mathsf" }, "\u{1D5A7}": { letter: "H", fontCmd: "mathsf" }, "\u{1D5A8}": { letter: "I", fontCmd: "mathsf" }, "\u{1D5A9}": { letter: "J", fontCmd: "mathsf" }, "\u0237": { letter: "J", fontCmd: "mathsf" }, "\u{1D5AA}": { letter: "K", fontCmd: "mathsf" }, \u039A: { letter: "K", fontCmd: "mathsf" }, "\u{1D5AB}": { letter: "L", fontCmd: "mathsf" }, "\u{1D5AC}": { letter: "M", fontCmd: "mathsf" }, "\u{1D5AD}": { letter: "N", fontCmd: "mathsf" }, "\u{1D5AE}": { letter: "O", fontCmd: "mathsf" }, "\u{1D5AF}": { letter: "P", fontCmd: "mathsf" }, "\u{1D5B0}": { letter: "Q", fontCmd: "mathsf" }, "\u{1D5B1}": { letter: "R", fontCmd: "mathsf" }, "\u{1D5B2}": { letter: "S", fontCmd: "mathsf" }, "\u{1D5B3}": { letter: "T", fontCmd: "mathsf" }, "\u{1D5B4}": { letter: "U", fontCmd: "mathsf" }, "\u{1D5B5}": { letter: "V", fontCmd: "mathsf" }, "\u{1D5B6}": { letter: "W", fontCmd: "mathsf" }, "\u{1D5B7}": { letter: "X", fontCmd: "mathsf" }, \u03A7: { letter: "X", fontCmd: "mathsf" }, "\u{1D5B8}": { letter: "Y", fontCmd: "mathsf" }, "\u{1D5B9}": { letter: "Z", fontCmd: "mathsf" }, "\u{1D6A8}": { letter: "A", fontCmd: "mathtt" }, "\u{1D6A9}": { letter: "B", fontCmd: "mathtt" }, "\u{1D6AA}": { letter: "\\Gamma", fontCmd: "mathtt" }, "\u{1D6AB}": { letter: "\\Delta", fontCmd: "mathtt" }, "\u{1D6AC}": { letter: "E", fontCmd: "mathtt" }, "\u{1D6AD}": { letter: "F", fontCmd: "mathtt" }, "\u{1D6AE}": { letter: "G", fontCmd: "mathtt" }, "\u{1D6AF}": { letter: "\\Theta", fontCmd: "mathtt" }, "\u{1D6B0}": { letter: "I", fontCmd: "mathtt" }, "\u{1D6B1}": { letter: "J", fontCmd: "mathtt" }, "\u{1D6B2}": { letter: "\\Lambda", fontCmd: "mathtt" }, "\u{1D6B3}": { letter: "L", fontCmd: "mathtt" }, "\u{1D6B4}": { letter: "M", fontCmd: "mathtt" }, "\u{1D6B5}": { letter: "\\Pi", fontCmd: "mathtt" }, "\u{1D6B6}": { letter: "O", fontCmd: "mathtt" }, "\u{1D6B7}": { letter: "\\Pi", fontCmd: "mathtt" }, "\u{1D6B8}": { letter: "Q", fontCmd: "mathtt" }, "\u{1D6B9}": { letter: "R", fontCmd: "mathtt" }, "\u{1D6BA}": { letter: "S", fontCmd: "mathtt" }, "\u{1D6BB}": { letter: "T", fontCmd: "mathtt" }, "\u{1D6BC}": { letter: "U", fontCmd: "mathtt" }, "\u{1D6BD}": { letter: "\\Phi", fontCmd: "mathtt" }, "\u{1D6BE}": { letter: "W", fontCmd: "mathtt" }, "\u{1D6BF}": { letter: "\\Psi", fontCmd: "mathtt" }, "\u{1D6C0}": { letter: "\\Omega", fontCmd: "mathtt" } };
          } }, t3 = {};
          function r2(n3) {
            var o = t3[n3];
            if (void 0 !== o) return o.exports;
            var a = t3[n3] = { exports: {} };
            return e3[n3].call(a.exports, a, a.exports, r2), a.exports;
          }
          var n2 = {};
          return (() => {
            "use strict";
            var e4 = n2;
            Object.defineProperty(e4, "__esModule", { value: true }), e4.MathMLToLaTeX = void 0;
            var t4 = r2(8672);
            Object.defineProperty(e4, "MathMLToLaTeX", { enumerable: true, get: function() {
              return t4.MathMLToLaTeX;
            } });
          })(), n2;
        })(), e2.exports = t2();
      }, 640(e2, t2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ALLOWED_ATTRIBUTES_DEBUG = t2.ALLOWED_ATTRIBUTES = t2.ALLOWED_EMPTY_ELEMENTS = t2.FOOTNOTE_LIST_SELECTORS = t2.FOOTNOTE_INLINE_REFERENCES = t2.TEST_ATTRIBUTES_SELECTOR = t2.PARTIAL_SELECTORS_REGEX = t2.PARTIAL_SELECTORS = t2.TEST_ATTRIBUTES = t2.EXACT_SELECTORS_JOINED = t2.EXACT_SELECTORS = t2.HIDDEN_EXACT_SKIP_SELECTOR = t2.HIDDEN_EXACT_SELECTOR = t2.HIDDEN_EXACT_SELECTORS = t2.HIDDEN_EXACT_SKIP_SELECTORS = t2.INLINE_ELEMENTS = t2.PRESERVE_ELEMENTS = t2.BLOCK_ELEMENTS_SET = t2.BLOCK_ELEMENTS_SELECTOR = t2.BLOCK_ELEMENTS = t2.MOBILE_WIDTH = t2.ENTRY_POINT_ELEMENTS = void 0, t2.ENTRY_POINT_ELEMENTS = ["#post", ".post-content", ".post-body", ".article-content", "#article-content", ".article_post", ".article-wrapper", ".entry-content", ".content-article", ".instapaper_body", ".post", ".markdown-body", "article", '[role="article"]', "main", '[role="main"]', "#content", "body"], t2.MOBILE_WIDTH = 600, t2.BLOCK_ELEMENTS = ["div", "section", "article", "main", "aside", "header", "footer", "nav", "content"], t2.BLOCK_ELEMENTS_SELECTOR = t2.BLOCK_ELEMENTS.join(","), t2.BLOCK_ELEMENTS_SET = new Set(t2.BLOCK_ELEMENTS), t2.PRESERVE_ELEMENTS = /* @__PURE__ */ new Set(["pre", "code", "table", "thead", "tbody", "tr", "td", "th", "ul", "ol", "li", "dl", "dt", "dd", "figure", "figcaption", "picture", "details", "summary", "blockquote", "form", "fieldset"]), t2.INLINE_ELEMENTS = /* @__PURE__ */ new Set(["a", "span", "strong", "em", "i", "b", "u", "code", "br", "small", "sub", "sup", "mark", "date", "del", "ins", "q", "abbr", "cite", "relative-time", "time", "font"]), t2.HIDDEN_EXACT_SKIP_SELECTORS = ["[hidden]", '[aria-hidden="true"]', ".hidden", ".invisible"], t2.HIDDEN_EXACT_SELECTORS = t2.HIDDEN_EXACT_SKIP_SELECTORS.map(((e3) => '[aria-hidden="true"]' === e3 ? '[aria-hidden="true"]:not([class*="math"])' : e3)), t2.HIDDEN_EXACT_SELECTOR = t2.HIDDEN_EXACT_SELECTORS.join(","), t2.HIDDEN_EXACT_SKIP_SELECTOR = t2.HIDDEN_EXACT_SKIP_SELECTORS.join(","), t2.EXACT_SELECTORS = ["noscript", 'script:not([type^="math/"])', "style", "meta", "link", '.ad:not([class*="gradient"])', '[class^="ad-" i]', '[class$="-ad" i]', '[id^="ad-" i]', '[id$="-ad" i]', '[role="banner" i]', '[alt*="advert" i]', ".promo", ".Promo", "#barrier-page", ".alert", '[id="comments" i]', '[id="comment" i]', 'div[class*="cover-"]', 'div[id*="cover-"]', "header", ".header:not(.banner)", "#header", "#Header", "#banner", "#Banner", "nav", ".navigation", "#navigation", '[role="navigation" i]', '[role="dialog" i]', '[role*="complementary" i]', '[class*="pagination" i]', ".menu", "#siteSub", ".previous", ".author", ".Author", '[class$="_bio"]', "#categories", ".contributor", ".date", "#date", "[data-date]", ".entry-meta", ".meta", ".tags", "#tags", ".toc", ".Toc", "#toc", ".headline", "#headline", "#title", "#Title", "#articleTag", '[href*="/tag/"]', '[href*="/tags/"]', '[href*="/author/"]', '[href*="/author?"]', '[href$="/author"]', 'a[href*="copyright.com"]', 'a[href*="google.com/preferences"]', '[href*="#toc"]', '[href="#top"]', '[href="#Top"]', '[href="#page-header"]', '[href="#content"]', '[href="#site-content"]', '[href="#main-content"]', '[href^="#main"]', '[src*="author"]', "footer", ".aside", 'aside:not([class*="callout"])', "button", "canvas", "date", "dialog", "fieldset", "form", 'input:not([type="checkbox"])', "label", "option", "select", '[role="listbox"]', '[role="option"]', "textarea", ...t2.HIDDEN_EXACT_SELECTORS, "instaread-player", 'iframe:not([src*="youtube"]):not([src*="youtu.be"]):not([src*="vimeo"]):not([src*="twitter"]):not([src*="x.com"]):not([src*="datawrapper"])', '[class="logo" i]', "#logo", "#Logo", "#newsletter", "#Newsletter", ".subscribe", ".noprint", '[data-print-layout="hide" i]', '[data-block="donotprint" i]', '[class*="clickable-icon" i]', 'li span[class*="ltx_tag" i][class*="ltx_tag_item" i]', 'a[href^="#"][class*="anchor" i]', 'a[href^="#"][class*="ref" i]:not(.ltx_ref)', '[data-container*="most-viewed" i]', ".sidebar", ".Sidebar", "#sidebar", "#Sidebar", "#side-bar", "#sitesub", '[data-link-name*="skip" i]', '[aria-label*="skip" i]', ".copyright", "#copyright", ".licensebox", "#page-info", "#rss", "#feed", ".gutter", "#primaryaudio", "#NYT_ABOVE_MAIN_CONTENT_REGION", '[data-testid="photoviewer-children-figure"] > span', "table.infobox", '[data-optimizely="related-articles-section" i]', '[data-orientation="vertical"]', ".gh-header-sticky", '[data-testid="issue-metadata-sticky"]'], t2.EXACT_SELECTORS_JOINED = t2.EXACT_SELECTORS.join(","), t2.TEST_ATTRIBUTES = ["class", "id", "data-test", "data-testid", "data-test-id", "data-qa", "data-cy"], t2.PARTIAL_SELECTORS = ["a-statement", "access-wall", "activitypub", "actioncall", "addcomment", "addtoany", "advert", "adlayout", "ad-tldr", "ad-placement", "ads-container", "_ad_", "AdBlock_", "AdUnit", "after_content", "after_main_article", "afterpost", "allterms", "-alert-", "alert-box", "_archive", "around-the-web", "aroundpages", "article-author", "article-badges", "article-banner", "article-bottom-section", "article-bottom", "article-category", "article-card", "article-citation", "article__copy", "article_date", "article-date", "article-end ", "article_header", "article-header", "article__header", "article__hero", "article__info", "article-info", "article-meta", "article_meta", "article__meta", "articlename", "article-subject", "article_subject", "article-snippet", "article-separator", "article--share", "article--topics", "articletags", "article-tags", "article_tags", "articletitle", "article-title", "article_title", "articletopics", "article-topics", "article-actions", "article--lede", "articlewell", "associated-people", "audio-card", "author-bio", "author-box", "author-info", "author_info", "authorm", "author-mini-bio", "author-name", "author-publish-info", "authored-by", "avatar", "back-to-top", "backlink_container", "backlinks-section", "bio-block", "biobox", "blog-pager", "bookmark-", "-bookmark", "bottominfo", "bottomnav", "bottom-of-article", "bottom-wrapper", "brand-bar", "bcrumb", "breadcrumb", "brdcrumb", "button-wrapper", "buttons-container", "btn-", "-btn", "byline", "captcha", "card-text", "card-media", "card-post", "carouselcontainer", "carousel-container", "cat_header", "catlinks", "_categories", "card-author", "card-content", "chapter-list", "collections", "comments", "commentbox", "comment-button", "commentcomp", "comment-content", "comment-count", "comment-form", "comment-number", "comment-respond", "comment-thread", "comment-wrap", "complementary", "consent", "contact-", "content-card", "content-topics", "contentpromo", "context-bar", "context-widget", "core-collateral", "cover-image", "cover-photo", "cover-wrap", "created-date", "creative-commons_", "c-subscribe", "_cta", "-cta", "cta-", "cta_", "current-issue", "custom-list-number", "dateline", "dateheader", "date-header", "date-pub", "disclaimer", "disclosure", "discussion", "discuss_", "-dismiss", "disqus", "donate", "donation", "dropdown", "element-invisible", "eletters", "emailsignup", "emoji-bar", "engagement-widget", "enhancement-", "entry-author-info", "entry-categories", "entry-date", "entry-title", "entry-utility", "-error", "error-", "eyebrow", "expand-reduce", "external-anchor", "externallinkembedwrapper", "extra-services", "extra-title", "facebook", "fancy-box", "favorite", "featured-content", "feature_feed", "feedback", "feed-links", "field-site-sections", "fixheader", "floating-vid", "follower", "footer", "footnote-back", "footnoteback", "form-group", "for-you", "frontmatter", "further-reading", "fullbleedheader", "gallery-count", "gated-", "gh-feed", "gist-meta", "goog-", "graph-view", "hamburger", "header_logo", "header-logo", "header-pattern", "hero-list", "hide-for-print", "hide-print", "hide-when-no-script", "hidden-print", "hidden-sidenote", "hidden-accessibility", "infoline", "inline-topic", "instacartIntegration", "interlude", "interaction", "itemendrow", "intro-date", "invisible", "jp-no-solution", "jp-relatedposts", "jswarning", "js-warning", "jumplink", "jumpto", "jump-to-", "js-skip-to-content", "keepreading", "keep-reading", "keep_reading", "keyword_wrap", "kicker", "labstab", "-labels", "language-name", "lastupdated", "latest-content", "-ledes-", "-license", "license-", "lightbox-popup", "like-button", "link-box", "links-grid", "links-title", "listing-dynamic-terms", "list-tags", "listinks", "loading", "loa-info", "logo_container", "ltx_role_refnum", "ltx_tag_bibitem", "ltx_error", "masthead", "marketing", "media-inquiry", "-menu", "menu-", "metadata", "meta-date", "meta-row", "might-like", "minibio", "more-about", "mod-paywall", "_modal", "-modal", "more-", "morenews", "morestories", "more_wrapper", "most-read", "move-helper", "mw-editsection", "mw-cite-backlink", "mw-indicators", "mw-jump-link", "nav-", "nav_", "navigation-post", "next-", "newsgallery", "news-story-title", "newsletter_", "newsletterbanner", "newslettercontainer", "newsletter-form", "newsletter-signup", "newslettersignup", "newsletterwidget", "newsletterwrapper", "not-found", "notessection", "nomobile", "noprint", "open-slideshow", "originally-published", "other-blogs", "outline-view", "pagehead", "page-header", "page-title", "paywall_message", "-partners", "permission-", "plea", "popular", "popup_links", "pop_stories", "pop-up", "post-author", "post-bottom", "post__category", "postcomment", "postdate", "post-date", "post_date", "post-details", "post-feeds", "postinfo", "post-info", "post_info", "post-inline-date", "post-links", "postlist", "post_list", "post_meta", "post-meta", "postmeta", "post_more", "postnavi", "post-navigation", "postpath", "post-preview", "postsnippet", "post_snippet", "post-snippet", "post-subject", "posttax", "post-tax", "post_tax", "posttag", "post_tag", "post-tag", "post_time", "posttitle", "post-title", "post_title", "post__title", "post-ufi-button", "prev-post", "prevnext", "prev_next", "prev-next", "previousnext", "press-inquiries", "print-none", "print-header", "print:hidden", "privacy-notice", "privacy-settings", "profile", "promo_article", "promo-bar", "promo-box", "pubdate", "pub_date", "pub-date", "publish_date", "publish-date", "publication-date", "publicationName", "qr-code", "qr_code", "quick_up", "_rail", "ratingssection", "read_also", "readmore", "read-next", "read_next", "read_time", "read-time", "reading_time", "reading-time", "reading-list", "recent-", "recent-articles", "recentpost", "recent_post", "recent-post", "recommend", "redirectedfrom", "recirc", "register", "related", "relevant", "reversefootnote", "robots-nocontent", "_rss", "rss-link", "screen-reader-text", "scroll_to", "scroll-to", "_search", "-search", "section-nav", "series-banner", "share-box", "sharedaddy", "share-icons", "sharelinks", "share-post", "share-print", "share-section", "shariff-", "show-for-print", "sidebartitle", "sidebar-content", "sidebar-wrapper", "sideitems", "sidebar-author", "sidebar-item", "side-box", "side-logo", "sign-in-gate", "similar-", "similar_", "similars-", "site-index", "site-header", "siteheader", "site-logo", "site-name", "site-wordpress", "skip-content", "skip-to-content", "skip-link", "c-skip-link", "_skip-link", "-slider", "slug-wrap", "social-author", "social-shar", "social-date", "speechify-ignore", "speedbump", "sponsor", "springercitation", "sr-only", "_stats", "story-date", "story-navigation", "storyreadtime", "storysmall", "storypublishdate", "subject-label", "subhead", "submenu", "-subscribe-", "subscriber-drive", "subscription-", "_tags", "tags__item", "tag_list", "taxonomy", "table-of-contents", "tabs-", "terminaltout", "time-rubric", "timestamp", "time-read", "time-to-read", "tip_off", "tiptout", "-tout-", "toc-container", "toggle-caption", "tooltip-content", "topbar", "topic-authors", "topic-footer", "topic-list", "topic-subnav", "top-wrapper", "tree-item", "trending", "trust-feat", "trust-badge", "trust-project", "twitter", "u-hide", "upsell", "viewbottom", "yarpp-related", "visually-hidden", "welcomebox", "widget_pages"], t2.PARTIAL_SELECTORS_REGEX = new RegExp(t2.PARTIAL_SELECTORS.join("|"), "i"), t2.TEST_ATTRIBUTES_SELECTOR = t2.TEST_ATTRIBUTES.map(((e3) => `[${e3}]`)).join(","), t2.FOOTNOTE_INLINE_REFERENCES = ["sup.reference", "cite.ltx_cite", 'sup[id^="fnr"]', 'span[id^="fnr"]', 'span[class*="footnote_ref"]', 'span[class*="footnote-ref"]', "span.footnote-link", "a.citation", 'a[id^="ref-link"]', 'a[href^="#fn"]', 'a[href^="#cite"]', 'a[href^="#reference"]', 'a[href^="#footnote"]', 'a[href^="#r"]', 'a[href^="#b"]', 'a[href*="cite_note"]', 'a[href*="cite_ref"]', "a.footnote-anchor", "span.footnote-hovercard-target a", 'a[role="doc-biblioref"]', 'a[id^="fnref"]', 'a[id^="ref-link"]', "sup.footnoteref"].join(","), t2.FOOTNOTE_LIST_SELECTORS = ["div.footnote ol", "div.footnotes ol", 'div[role="doc-endnotes"]', 'div[role="doc-footnotes"]', "ol.footnotes-list", "ol.footnotes", "ol.references", 'ol[class*="article-references"]', "section.footnotes ol", 'section[role="doc-endnotes"]', 'section[role="doc-footnotes"]', 'section[role="doc-bibliography"]', "ul.footnotes-list", "ul.ltx_biblist", 'div.footnote[data-component-name="FootnoteToDOM"]', "div.footnotes-footer"].join(","), t2.ALLOWED_EMPTY_ELEMENTS = /* @__PURE__ */ new Set(["area", "audio", "base", "br", "circle", "col", "defs", "ellipse", "embed", "figure", "g", "hr", "iframe", "img", "input", "line", "link", "mask", "meta", "object", "param", "path", "pattern", "picture", "polygon", "polyline", "rect", "source", "stop", "svg", "td", "th", "track", "use", "video", "wbr"]), t2.ALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["alt", "allow", "allowfullscreen", "aria-label", "checked", "colspan", "controls", "data-latex", "data-src", "data-srcset", "data-callout", "data-lang", "dir", "display", "frameborder", "headers", "height", "href", "kind", "label", "lang", "role", "rowspan", "src", "srclang", "srcset", "title", "type", "width", "accent", "accentunder", "align", "columnalign", "columnlines", "columnspacing", "columnspan", "data-mjx-texclass", "depth", "displaystyle", "fence", "frame", "framespacing", "linethickness", "lspace", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "scriptlevel", "separator", "stretchy", "symmetric", "voffset", "xmlns"]), t2.ALLOWED_ATTRIBUTES_DEBUG = /* @__PURE__ */ new Set(["class", "id"]);
      }, 628(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__awaiter || function(e3, t3, r3, n3) {
          return new (r3 || (r3 = Promise))((function(o2, a2) {
            function i2(e4) {
              try {
                l2(n3.next(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function s2(e4) {
              try {
                l2(n3.throw(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function l2(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i2, s2);
            }
            l2((n3 = n3.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.Defuddle = void 0;
        const o = r2(608), a = r2(917), i = r2(640), s = r2(840), l = r2(610), c = r2(968), u = r2(552), d = r2(639), h = /* @__PURE__ */ new Set(["title", "author", "published", "site", "description", "image", "language"]), m = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}/i, p = /\d+\s*min(?:ute)?s?\s+read\b/i, f = [/^This (?:article|story|piece) (?:appeared|was published|originally appeared) in\b/i, /^A version of this (?:article|story) (?:appeared|was published) in\b/i, /^Originally (?:published|appeared) (?:in|on|at)\b/i], g = [/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/gi, /\b\d+(?:st|nd|rd|th)?\b/g, /\bmin(?:ute)?s?\b/gi, /\bread\b/gi, /[|\xb7\u2022\u2014\u2013\-,.\s]/g];
        t2.Defuddle = class {
          constructor(e3, t3 = {}) {
            this._schemaOrgData = void 0, this._schemaOrgExtracted = false, this.doc = e3, this.options = t3, this.debug = t3.debug || false;
          }
          getSchemaOrgData() {
            return this._schemaOrgExtracted || (this._schemaOrgData = this._extractSchemaOrgData(this.doc), this._schemaOrgExtracted = true), this._schemaOrgData;
          }
          parse() {
            let e3 = this.parseInternal();
            if (e3.wordCount < 200) {
              this._log("Initial parse returned very little content, trying again");
              const t4 = this.parseInternal({ removePartialSelectors: false });
              t4.wordCount > 2 * e3.wordCount && (this._log("Retry produced more content"), e3 = t4);
            }
            if (e3.wordCount < 50) {
              this._log("Still very little content, retrying without hidden-element removal");
              const t4 = this.parseInternal({ removeHiddenElements: false });
              t4.wordCount > 2 * e3.wordCount && (this._log("Hidden-element retry produced more content"), e3 = t4);
              const r3 = this.findLargestHiddenContentSelector();
              if (r3) {
                this._log("Retrying with hidden content selector:", r3);
                const t5 = this.parseInternal({ removeHiddenElements: false, removePartialSelectors: false, contentSelector: r3 });
                (t5.wordCount > e3.wordCount || t5.wordCount > Math.max(20, 0.7 * e3.wordCount) && t5.content.length < e3.content.length) && (this._log("Hidden-selector retry produced better focused content"), e3 = t5);
              }
            }
            if (e3.wordCount < 50) {
              this._log("Still very little content, retrying without scoring/partial selectors (possible index page)");
              const t4 = this.parseInternal({ removeLowScoring: false, removePartialSelectors: false, removeContentPatterns: false });
              t4.wordCount > e3.wordCount && (this._log("Index page retry produced more content"), e3 = t4);
            }
            this._stripUnsafeElements();
            const t3 = this._getSchemaText(e3.schemaOrgData);
            if (t3 && this.countHtmlWords(t3) > e3.wordCount) {
              const r3 = this._findContentBySchemaText(t3);
              r3 ? (this._log("Found DOM content matching schema.org text"), e3.content = r3, e3.wordCount = this.countHtmlWords(r3)) : (this._log("Using schema.org text as content (DOM element not found)"), e3.content = t3, e3.wordCount = this.countHtmlWords(t3));
            }
            return e3;
          }
          _getSchemaText(e3) {
            if (!e3) return "";
            const t3 = Array.isArray(e3) ? e3 : [e3];
            for (const e4 of t3) {
              if ((null == e4 ? void 0 : e4.text) && "string" == typeof e4.text) return e4.text;
              if ((null == e4 ? void 0 : e4.articleBody) && "string" == typeof e4.articleBody) return e4.articleBody;
            }
            return "";
          }
          _stripUnsafeElements() {
            const e3 = this.doc.body;
            if (!e3) return;
            const t3 = e3.querySelectorAll('script:not([type^="math/"]), style, noscript, frame, frameset, object, embed, applet, base');
            for (const e4 of t3) e4.remove();
            const r3 = e3.querySelectorAll("*");
            for (const e4 of r3) for (const t4 of Array.from(e4.attributes)) {
              const r4 = t4.name.toLowerCase();
              (r4.startsWith("on") || "srcdoc" === r4 || ["href", "src", "action", "formaction", "xlink:href"].includes(r4) && (0, d.isDangerousUrl)(t4.value)) && e4.removeAttribute(t4.name);
            }
          }
          _findContentBySchemaText(e3) {
            var t3;
            const r3 = this.doc.body;
            if (!r3) return "";
            const n3 = ((null === (t3 = e3.split(/\n\s*\n/)[0]) || void 0 === t3 ? void 0 : t3.trim()) || "").substring(0, 100).trim();
            if (!n3) return "";
            const o2 = this.countHtmlWords(e3);
            let a2 = null, i2 = 1 / 0;
            const s2 = r3.querySelectorAll("*");
            for (const e4 of s2) {
              const t4 = e4.textContent || "";
              if (!t4.includes(n3)) continue;
              const r4 = (0, u.countWords)(t4);
              r4 >= 0.8 * o2 && r4 < i2 && (i2 = r4, a2 = e4);
            }
            if (!a2) return "";
            let l2 = "", c2 = "";
            const h2 = a2.parentElement;
            if (h2 && h2 !== r3) {
              const e4 = h2.querySelectorAll("img");
              let t4 = null, r4 = 0;
              for (const n4 of e4) {
                if (a2.contains(n4)) continue;
                const e5 = parseInt(n4.getAttribute("width") || "0", 10) * parseInt(n4.getAttribute("height") || "0", 10);
                e5 > r4 && (r4 = e5, t4 = n4);
              }
              if (t4) {
                l2 = this._getLargestImageSrc(t4), c2 = t4.getAttribute("alt") || "";
                try {
                  const e5 = this.options.url || this.doc.URL;
                  e5 && (l2 = new URL(l2, e5).href);
                } catch (e5) {
                }
              }
            }
            this.resolveRelativeUrls(a2);
            let m2 = (0, d.serializeHTML)(a2);
            if (l2) {
              const e4 = this.doc.createElement("img");
              e4.setAttribute("src", l2), e4.setAttribute("alt", c2), m2 += e4.outerHTML;
            }
            return m2;
          }
          findLargestHiddenContentSelector() {
            const e3 = this.doc.body;
            if (!e3) return;
            const t3 = Array.from(e3.querySelectorAll(i.HIDDEN_EXACT_SKIP_SELECTOR)).filter(((e4) => !(e4.getAttribute("class") || "").includes("math")));
            let r3 = null, n3 = 0;
            for (const e4 of t3) {
              const t4 = (0, u.countWords)(e4.textContent || "");
              t4 > n3 && (r3 = e4, n3 = t4);
            }
            return !r3 || n3 < 30 ? void 0 : this.getElementSelector(r3);
          }
          _getLargestImageSrc(e3) {
            const t3 = e3.getAttribute("srcset") || "";
            if (!t3) return e3.getAttribute("src") || "";
            const r3 = /(.+?)\s+(\d+(?:\.\d+)?)w/g;
            let n3, o2 = "", a2 = 0, i2 = 0;
            for (; null !== (n3 = r3.exec(t3)); ) {
              let e4 = n3[1].trim();
              i2 > 0 && (e4 = e4.replace(/^,\s*/, "")), i2 = r3.lastIndex;
              const t4 = parseFloat(n3[2]);
              e4 && t4 > a2 && (a2 = t4, o2 = e4);
            }
            let s2 = o2 || e3.getAttribute("src") || "";
            return s2 = s2.replace(/,w_\d+/g, "").replace(/,c_\w+/g, ""), s2;
          }
          parseAsync() {
            return n2(this, void 0, void 0, (function* () {
              var e3;
              if (false !== this.options.useAsync) {
                const e4 = yield this.tryAsyncExtractor(a.ExtractorRegistry.findPreferredAsyncExtractor.bind(a.ExtractorRegistry));
                if (e4) return e4;
              }
              const t3 = this.parse();
              return t3.wordCount > 0 || false === this.options.useAsync ? t3 : null !== (e3 = yield this.tryAsyncExtractor(a.ExtractorRegistry.findAsyncExtractor.bind(a.ExtractorRegistry))) && void 0 !== e3 ? e3 : t3;
            }));
          }
          fetchAsyncVariables() {
            return n2(this, void 0, void 0, (function* () {
              if (false === this.options.useAsync) return null;
              try {
                const e3 = this.options.url || this.doc.URL, t3 = this.getSchemaOrgData(), r3 = a.ExtractorRegistry.findPreferredAsyncExtractor(this.doc, e3, t3);
                if (r3) {
                  const e4 = yield r3.extractAsync();
                  return this.getExtractorVariables(e4.variables) || null;
                }
              } catch (e3) {
                console.error("Defuddle", "Error fetching async variables:", e3);
              }
              return null;
            }));
          }
          tryAsyncExtractor(e3) {
            return n2(this, void 0, void 0, (function* () {
              try {
                const t3 = this.options.url || this.doc.URL, r3 = this.getSchemaOrgData(), n3 = e3(this.doc, t3, r3);
                if (n3) {
                  const e4 = Date.now(), t4 = yield n3.extractAsync(), a2 = this._collectMetaTags(), i2 = o.MetadataExtractor.extract(this.doc, r3, a2);
                  return this.buildExtractorResponse(t4, i2, e4, n3, a2);
                }
              } catch (e4) {
                console.error("Defuddle", "Error in async extraction:", e4);
              }
              return null;
            }));
          }
          parseInternal(e3 = {}) {
            var t3;
            const r3 = Date.now();
            if (!this.doc.documentElement) {
              const e4 = this.options.url || "";
              return { content: "", title: "", description: "", domain: e4 ? new URL(e4).hostname : "", favicon: "", image: "", language: "", parseTime: Date.now() - r3, published: "", author: "", site: "", schemaOrgData: null, wordCount: 0 };
            }
            const n3 = Object.assign(Object.assign({ removeExactSelectors: true, removePartialSelectors: true, removeHiddenElements: true, removeLowScoring: true, removeSmallImages: true, removeContentPatterns: true, standardize: true }, this.options), e3), i2 = [], u2 = this.getSchemaOrgData();
            this._metaTags || (this._metaTags = this._collectMetaTags());
            const h2 = this._metaTags;
            this._metadata || (this._metadata = o.MetadataExtractor.extract(this.doc, u2, h2));
            const m2 = this._metadata;
            n3.removeImages && this.removeImages(this.doc);
            try {
              const e4 = n3.url || this.doc.URL, o2 = a.ExtractorRegistry.findExtractor(this.doc, e4, u2);
              if (o2 && o2.canExtract()) {
                const e5 = o2.extract();
                return this.buildExtractorResponse(e5, m2, r3, o2, h2);
              }
              this._mobileStyles || (this._mobileStyles = this._evaluateMediaQueries(this.doc));
              const p2 = this._mobileStyles;
              this._smallImages || (this._smallImages = this.findSmallImages(this.doc));
              const f2 = this._smallImages, g2 = this.doc.cloneNode(true);
              null === (t3 = g2.body) || void 0 === t3 || t3.normalize(), this.flattenShadowRoots(this.doc, g2), this.resolveStreamedContent(g2), this.applyMobileStyles(g2, p2);
              let b = null;
              if (n3.contentSelector && (b = g2.querySelector(n3.contentSelector), this._log("Using contentSelector:", n3.contentSelector, b ? "found" : "not found")), b || (b = this.findMainContent(g2)), !b) {
                const e5 = this.doc.body ? this.resolveContentUrls((0, d.serializeHTML)(this.doc.body)) : "", t4 = Date.now();
                return Object.assign(Object.assign({ content: e5 }, m2), { wordCount: this.countHtmlWords(e5), parseTime: Math.round(t4 - r3), metaTags: h2 });
              }
              n3.standardize && (0, l.standardizeFootnotes)(b), n3.removeSmallImages && this.removeSmallImages(g2, f2), n3.removeHiddenElements && this.removeHiddenElements(g2, i2), n3.removeLowScoring && c.ContentScorer.scoreAndRemove(g2, this.debug, i2, b), (n3.removeExactSelectors || n3.removePartialSelectors) && this.removeBySelector(g2, n3.removeExactSelectors, n3.removePartialSelectors, b, i2, false === n3.removeHiddenElements), n3.removeContentPatterns && b && this.removeByContentPattern(b, this.debug ? i2 : void 0), n3.standardize && (0, s.standardizeContent)(b, m2, this.doc, this.debug), this.resolveRelativeUrls(b);
              const x = b.outerHTML, y = Date.now(), v = Object.assign(Object.assign({ content: x }, m2), { wordCount: this.countHtmlWords(x), parseTime: Math.round(y - r3), metaTags: h2 });
              return this.debug && (v.debug = { contentSelector: this.getElementSelector(b), removals: i2 }), v;
            } catch (e4) {
              console.error("Defuddle", "Error processing document:", e4);
              const t4 = this.doc.body ? this.resolveContentUrls((0, d.serializeHTML)(this.doc.body)) : "", n4 = Date.now();
              return Object.assign(Object.assign({ content: t4 }, m2), { wordCount: this.countHtmlWords(t4), parseTime: Math.round(n4 - r3), metaTags: h2 });
            }
          }
          countHtmlWords(e3) {
            const t3 = e3.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#\d+;/g, " ").replace(/&\w+;/g, " ");
            return (0, u.countWords)(t3);
          }
          _log(...e3) {
            this.debug && console.log("Defuddle:", ...e3);
          }
          _evaluateMediaQueries(e3) {
            const t3 = [], r3 = /max-width[^:]*:\s*(\d+)/;
            try {
              if (!e3.styleSheets) return t3;
              const n3 = Array.from(e3.styleSheets).filter(((e4) => {
                try {
                  return e4.cssRules, true;
                } catch (e5) {
                  return e5 instanceof DOMException && e5.name, false;
                }
              }));
              n3.flatMap(((e4) => {
                try {
                  return "undefined" == typeof CSSMediaRule ? [] : Array.from(e4.cssRules).filter(((e5) => e5 instanceof CSSMediaRule && e5.conditionText.includes("max-width")));
                } catch (e5) {
                  return this.debug && console.warn("Defuddle: Failed to process stylesheet:", e5), [];
                }
              })).forEach(((e4) => {
                const n4 = e4.conditionText.match(r3);
                if (n4) {
                  const r4 = parseInt(n4[1]);
                  if (i.MOBILE_WIDTH <= r4) {
                    Array.from(e4.cssRules).filter(((e5) => e5 instanceof CSSStyleRule)).forEach(((e5) => {
                      try {
                        t3.push({ selector: e5.selectorText, styles: e5.style.cssText });
                      } catch (e6) {
                        this.debug && console.warn("Defuddle: Failed to process CSS rule:", e6);
                      }
                    }));
                  }
                }
              }));
            } catch (e4) {
              console.error("Defuddle: Error evaluating media queries:", e4);
            }
            return t3;
          }
          applyMobileStyles(e3, t3) {
            t3.forEach((({ selector: t4, styles: r3 }) => {
              try {
                e3.querySelectorAll(t4).forEach(((e4) => {
                  e4.setAttribute("style", (e4.getAttribute("style") || "") + r3);
                }));
              } catch (e4) {
                console.error("Defuddle", "Error applying styles for selector:", t4, e4);
              }
            }));
          }
          removeImages(e3) {
            const t3 = e3.getElementsByTagName("img");
            Array.from(t3).forEach(((e4) => {
              e4.remove();
            }));
          }
          removeHiddenElements(e3, t3) {
            let r3 = 0;
            const n3 = /* @__PURE__ */ new Map(), o2 = /(?:^|;\s*)(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0)(?:\s*;|\s*$)/i, a2 = e3.defaultView, i2 = "undefined" != typeof window && a2 === window, s2 = e3.querySelectorAll("*");
            for (const e4 of s2) {
              if (e4.querySelector("math, [data-mathml], .katex-mathml") || "math" === e4.tagName.toLowerCase()) continue;
              const t4 = e4.getAttribute("style");
              if (t4 && o2.test(t4)) {
                const o3 = t4.includes("display") ? "display:none" : t4.includes("visibility") ? "visibility:hidden" : "opacity:0";
                n3.set(e4, o3), r3++;
                continue;
              }
              if (i2) try {
                const t5 = a2.getComputedStyle(e4);
                let o3 = "";
                if ("none" === t5.display ? o3 = "display:none" : "hidden" === t5.visibility ? o3 = "visibility:hidden" : "0" === t5.opacity && (o3 = "opacity:0"), o3) {
                  n3.set(e4, o3), r3++;
                  continue;
                }
              } catch (e5) {
              }
              const s3 = e4.getAttribute("class") || "";
              if (s3) {
                const t5 = s3.split(/\s+/);
                for (const o3 of t5) if ("hidden" === o3 || o3.endsWith(":hidden") || "invisible" === o3 || o3.endsWith(":invisible")) {
                  n3.set(e4, `class:${o3}`), r3++;
                  break;
                }
              }
            }
            n3.forEach(((e4, r4) => {
              this.debug && t3 && t3.push({ step: "removeHiddenElements", reason: e4, text: (0, u.textPreview)(r4) }), r4.remove();
            })), this._log("Removed hidden elements:", r3);
          }
          removeBySelector(e3, t3 = true, r3 = true, n3, o2, a2 = false) {
            const s2 = Date.now();
            let l2 = 0, c2 = 0;
            const d2 = /* @__PURE__ */ new Map();
            if (t3) {
              e3.querySelectorAll(i.EXACT_SELECTORS_JOINED).forEach(((e4) => {
                if (null == e4 ? void 0 : e4.parentNode) {
                  if (a2) {
                    const t4 = e4.closest(i.HIDDEN_EXACT_SKIP_SELECTOR), r4 = (e4.getAttribute("role") || "").toLowerCase();
                    if (e4.matches(i.HIDDEN_EXACT_SELECTOR) || t4 && "dialog" === r4) return;
                  }
                  if (e4.closest("pre, code")) return;
                  d2.set(e4, { type: "exact" }), l2++;
                }
              }));
            }
            if (r3) {
              const t4 = this.debug ? i.PARTIAL_SELECTORS.map(((e4) => ({ pattern: e4, regex: new RegExp(e4, "i") }))) : null;
              e3.querySelectorAll(i.TEST_ATTRIBUTES_SELECTOR).forEach(((e4) => {
                var r4;
                if (d2.has(e4)) return;
                const n4 = e4.tagName;
                if ("CODE" === n4 || "PRE" === n4 || e4.querySelector("pre")) return;
                const o3 = i.TEST_ATTRIBUTES.map(((t5) => "class" === t5 ? e4.className && "string" == typeof e4.className ? e4.className : "" : "id" === t5 ? e4.id || "" : e4.getAttribute(t5) || "")).join(" ").toLowerCase();
                if (o3.trim() && i.PARTIAL_SELECTORS_REGEX.test(o3)) {
                  const n5 = t4 ? null === (r4 = t4.find(((e5) => e5.regex.test(o3)))) || void 0 === r4 ? void 0 : r4.pattern : void 0;
                  d2.set(e4, { type: "partial", selector: n5 }), c2++;
                }
              }));
            }
            d2.forEach((({ type: e4, selector: t4 }, r4) => {
              if (!(n3 && r4.contains(n3) || "A" === r4.tagName && r4.closest("h1, h2, h3, h4, h5, h6"))) {
                try {
                  if (r4.matches(i.FOOTNOTE_LIST_SELECTORS) || r4.querySelector(i.FOOTNOTE_LIST_SELECTORS)) return;
                  const e5 = r4.parentElement;
                  if (e5 && e5.matches(i.FOOTNOTE_LIST_SELECTORS)) return;
                } catch (e5) {
                }
                this.debug && o2 && o2.push({ step: "removeBySelector", selector: "exact" === e4 ? "exact" : t4, reason: "exact" === e4 ? "exact selector match" : `partial match: ${t4}`, text: (0, u.textPreview)(r4) }), r4.remove();
              }
            }));
            const h2 = Date.now();
            this._log("Removed clutter elements:", { exactSelectors: l2, partialSelectors: c2, total: d2.size, processingTime: `${(h2 - s2).toFixed(2)}ms` });
          }
          findSmallImages(e3) {
            var t3, r3;
            const n3 = /* @__PURE__ */ new Set();
            let o2 = 0;
            const a2 = e3.querySelectorAll("img, svg"), i2 = e3.defaultView, s2 = "undefined" != typeof window && i2 === window;
            for (const e4 of a2) {
              const a3 = parseInt(e4.getAttribute("width") || "0"), l2 = parseInt(e4.getAttribute("height") || "0"), c2 = e4.getAttribute("style") || "", u2 = parseInt((null === (t3 = c2.match(/width\s*:\s*(\d+)/)) || void 0 === t3 ? void 0 : t3[1]) || "0"), d2 = parseInt((null === (r3 = c2.match(/height\s*:\s*(\d+)/)) || void 0 === r3 ? void 0 : r3[1]) || "0");
              let h2 = 0, m2 = 0;
              if (s2) {
                try {
                  const t4 = i2.getComputedStyle(e4);
                  h2 = parseInt(t4.width) || 0, m2 = parseInt(t4.height) || 0;
                } catch (e5) {
                }
                try {
                  const t4 = e4.getBoundingClientRect();
                  t4.width > 0 && (h2 = h2 || t4.width), t4.height > 0 && (m2 = m2 || t4.height);
                } catch (e5) {
                }
              }
              const p2 = [a3, u2, h2].filter(((e5) => e5 > 0)), f2 = [l2, d2, m2].filter(((e5) => e5 > 0));
              if (p2.length > 0 && f2.length > 0) {
                const t4 = Math.min(...p2), r4 = Math.min(...f2);
                if (t4 < 33 || r4 < 33) {
                  const t5 = this.getElementIdentifier(e4);
                  t5 && (n3.add(t5), o2++);
                }
              }
            }
            return this._log("Found small elements:", o2), n3;
          }
          removeSmallImages(e3, t3) {
            let r3 = 0;
            ["img", "svg"].forEach(((n3) => {
              const o2 = e3.getElementsByTagName(n3);
              Array.from(o2).forEach(((e4) => {
                const n4 = this.getElementIdentifier(e4);
                n4 && t3.has(n4) && (e4.remove(), r3++);
              }));
            })), this._log("Removed small elements:", r3);
          }
          getElementIdentifier(e3) {
            if ("img" === e3.tagName.toLowerCase()) {
              const t4 = e3.getAttribute("data-src");
              if (t4) return `src:${t4}`;
              const r4 = e3.getAttribute("src") || "", n4 = e3.getAttribute("srcset") || "", o2 = e3.getAttribute("data-srcset");
              if (r4) return `src:${r4}`;
              if (n4) return `srcset:${n4}`;
              if (o2) return `srcset:${o2}`;
            }
            const t3 = e3.id || "", r3 = e3.className || "", n3 = "svg" === e3.tagName.toLowerCase() && e3.getAttribute("viewBox") || "";
            return t3 ? `id:${t3}` : n3 ? `viewBox:${n3}` : r3 ? `class:${r3}` : null;
          }
          findMainContent(e3) {
            const t3 = [];
            if (i.ENTRY_POINT_ELEMENTS.forEach(((r4, n4) => {
              e3.querySelectorAll(r4).forEach(((e4) => {
                let r5 = 40 * (i.ENTRY_POINT_ELEMENTS.length - n4);
                r5 += c.ContentScorer.scoreElement(e4), t3.push({ element: e4, score: r5, selectorIndex: n4 });
              }));
            })), 0 === t3.length) return this.findContentByScoring(e3);
            if (t3.sort(((e4, t4) => t4.score - e4.score)), this.debug && this._log("Content candidates:", t3.map(((e4) => ({ element: e4.element.tagName, selector: this.getElementSelector(e4.element), score: e4.score })))), 1 === t3.length && "body" === t3[0].element.tagName.toLowerCase()) {
              const t4 = this.findTableBasedContent(e3);
              if (t4) return t4;
            }
            const r3 = t3[0];
            let n3 = r3;
            for (let e4 = 1; e4 < t3.length; e4++) {
              const o2 = t3[e4], a2 = (0, u.countWords)(o2.element.textContent || "");
              if (o2.selectorIndex < n3.selectorIndex && n3.element.contains(o2.element) && a2 > 50) {
                let e5 = 0;
                for (const n4 of t3) if (n4.selectorIndex === o2.selectorIndex && r3.element.contains(n4.element) && ++e5 > 1) break;
                if (e5 > 1) continue;
                n3 = o2;
              }
            }
            return n3 !== r3 ? n3.element : r3.element;
          }
          findTableBasedContent(e3) {
            if (!Array.from(e3.getElementsByTagName("table")).some(((e4) => {
              var t4;
              const r3 = parseInt(e4.getAttribute("width") || "0"), n3 = this.getComputedStyle(e4);
              return r3 > 400 || (null === (t4 = null == n3 ? void 0 : n3.width) || void 0 === t4 ? void 0 : t4.includes("px")) && parseInt(n3.width) > 400 || "center" === e4.getAttribute("align") || (e4.className || "").toLowerCase().includes("content") || (e4.className || "").toLowerCase().includes("article");
            }))) return null;
            const t3 = Array.from(e3.getElementsByTagName("td"));
            return c.ContentScorer.findBestElement(t3);
          }
          findContentByScoring(e3) {
            const t3 = [];
            return e3.querySelectorAll(i.BLOCK_ELEMENTS_SELECTOR).forEach(((e4) => {
              const r3 = c.ContentScorer.scoreElement(e4);
              r3 > 0 && t3.push({ score: r3, element: e4 });
            })), t3.length > 0 ? t3.sort(((e4, t4) => t4.score - e4.score))[0].element : null;
          }
          getElementSelector(e3) {
            const t3 = [];
            let r3 = e3;
            for (; r3 && r3 !== this.doc.documentElement; ) {
              let e4 = r3.tagName.toLowerCase();
              r3.id ? e4 += "#" + r3.id : r3.className && "string" == typeof r3.className && (e4 += "." + r3.className.trim().split(/\s+/).join(".")), t3.unshift(e4), r3 = r3.parentElement;
            }
            return t3.join(" > ");
          }
          getComputedStyle(e3) {
            return (0, u.getComputedStyle)(e3);
          }
          resolveRelativeUrls(e3) {
            const t3 = this.options.url || this.doc.URL;
            if (!t3) return;
            const r3 = (e4) => {
              const r4 = e4.trim().replace(/^\\?["']+/, "").replace(/\\?["']+$/, "");
              try {
                return new URL(r4, t3).href;
              } catch (t4) {
                return r4 || e4;
              }
            };
            e3.querySelectorAll("[href]").forEach(((e4) => {
              const t4 = e4.getAttribute("href");
              t4 && e4.setAttribute("href", r3(t4));
            })), e3.querySelectorAll("[src]").forEach(((e4) => {
              const t4 = e4.getAttribute("src");
              t4 && e4.setAttribute("src", r3(t4));
            })), e3.querySelectorAll("[srcset]").forEach(((e4) => {
              const t4 = e4.getAttribute("srcset");
              if (t4) {
                const n3 = /(.+?)\s+(\d+(?:\.\d+)?[wx])/g, o2 = [];
                let a2, i2 = 0;
                for (; null !== (a2 = n3.exec(t4)); ) {
                  let e5 = a2[1].trim();
                  i2 > 0 && (e5 = e5.replace(/^,\s*/, "")), i2 = n3.lastIndex, o2.push(`${r3(e5)} ${a2[2]}`);
                }
                if (o2.length > 0) e4.setAttribute("srcset", o2.join(", "));
                else {
                  const n4 = t4.split(",").map(((e5) => {
                    const t5 = e5.trim().split(/\s+/);
                    return t5[0] && (t5[0] = r3(t5[0])), t5.join(" ");
                  })).join(", ");
                  e4.setAttribute("srcset", n4);
                }
              }
            })), e3.querySelectorAll("[poster]").forEach(((e4) => {
              const t4 = e4.getAttribute("poster");
              t4 && e4.setAttribute("poster", r3(t4));
            }));
          }
          flattenShadowRoots(e3, t3) {
            var r3, n3, o2;
            if (!e3.body || !t3.body) return;
            const a2 = Array.from(e3.body.querySelectorAll("*")), i2 = a2.find(((e4) => e4.shadowRoot));
            if (!i2) return;
            const s2 = Array.from(t3.body.querySelectorAll("*"));
            if ((null !== (o2 = null === (n3 = null === (r3 = i2.shadowRoot) || void 0 === r3 ? void 0 : r3.childNodes) || void 0 === n3 ? void 0 : n3.length) && void 0 !== o2 ? o2 : 0) > 0) for (let e4 = a2.length - 1; e4 >= 0; e4--) {
              const r4 = a2[e4];
              if (!r4.shadowRoot) continue;
              const n4 = s2[e4];
              if (!n4) continue;
              const o3 = r4.shadowRoot.innerHTML;
              o3.length > 0 && this.replaceShadowHost(n4, o3, t3);
            }
            else {
              const e4 = [];
              for (let t4 = 0; t4 < a2.length; t4++) {
                const r4 = a2[t4], n4 = r4.getAttribute("data-defuddle-shadow");
                if (!n4) continue;
                const o3 = s2[t4];
                o3 && (e4.push({ cloneEl: o3, html: n4 }), r4.removeAttribute("data-defuddle-shadow"), o3.removeAttribute("data-defuddle-shadow"));
              }
              for (const { cloneEl: r4, html: n4 } of e4) this.replaceShadowHost(r4, n4, t3);
            }
          }
          resolveStreamedContent(e3) {
            const t3 = e3.querySelectorAll("script"), r3 = [], n3 = /\$RC\("(B:\d+)","(S:\d+)"\)/g;
            for (const e4 of t3) {
              const t4 = e4.textContent || "";
              if (!t4.includes("$RC(")) continue;
              let o3;
              for (n3.lastIndex = 0; null !== (o3 = n3.exec(t4)); ) r3.push({ templateId: o3[1], contentId: o3[2] });
            }
            if (0 === r3.length) return;
            let o2 = 0;
            for (const { templateId: t4, contentId: n4 } of r3) {
              const r4 = e3.getElementById(t4), a2 = e3.getElementById(n4);
              if (!r4 || !a2) continue;
              const i2 = r4.parentNode;
              if (!i2) continue;
              let s2 = r4.nextSibling, l2 = false;
              for (; s2; ) {
                const e4 = s2.nextSibling;
                if (8 === s2.nodeType && "/$" === s2.data) {
                  s2.remove(), l2 = true;
                  break;
                }
                s2.remove(), s2 = e4;
              }
              if (l2) {
                for (; a2.firstChild; ) i2.insertBefore(a2.firstChild, r4);
                r4.remove(), a2.remove(), o2++;
              }
            }
            o2 > 0 && this._log("Resolved streamed content:", o2, "suspense boundaries");
          }
          replaceShadowHost(e3, t3, r3) {
            var n3;
            const o2 = (0, d.parseHTML)(r3, t3);
            if (e3.tagName.includes("-")) {
              const t4 = r3.createElement("div");
              t4.appendChild(o2), null === (n3 = e3.parentNode) || void 0 === n3 || n3.replaceChild(t4, e3);
            } else e3.textContent = "", e3.appendChild(o2);
          }
          resolveContentUrls(e3) {
            if (!(this.options.url || this.doc.URL)) return e3;
            const t3 = this.doc.createElement("div");
            return t3.appendChild((0, d.parseHTML)(this.doc, e3)), this.resolveRelativeUrls(t3), (0, d.serializeHTML)(t3);
          }
          _extractSchemaOrgData(e3) {
            const t3 = e3.querySelectorAll('script[type="application/ld+json"]'), r3 = [];
            t3.forEach(((e4) => {
              let t4 = e4.textContent || "";
              try {
                t4 = t4.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "").replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").replace(/^\s*(\*\/|\/\*)\s*|\s*(\*\/|\/\*)\s*$/g, "").trim();
                const e5 = JSON.parse(t4);
                e5["@graph"] && Array.isArray(e5["@graph"]) ? r3.push(...e5["@graph"]) : r3.push(e5);
              } catch (e5) {
                console.error("Defuddle: Error parsing schema.org data:", e5), this.debug && console.error("Defuddle: Problematic JSON content:", t4);
              }
            }));
            const n3 = (e4) => {
              if ("string" == typeof e4) return this._decodeHTMLEntities(e4);
              if (Array.isArray(e4)) return e4.map(n3);
              if ("object" == typeof e4 && null !== e4) {
                const t4 = {};
                for (const r4 in e4) Object.prototype.hasOwnProperty.call(e4, r4) && (t4[r4] = n3(e4[r4]));
                return t4;
              }
              return e4;
            };
            return r3.map(n3);
          }
          _collectMetaTags() {
            const e3 = [];
            return this.doc.querySelectorAll("meta").forEach(((t3) => {
              const r3 = t3.getAttribute("name"), n3 = t3.getAttribute("property");
              let o2 = t3.getAttribute("content");
              o2 && e3.push({ name: r3, property: n3, content: this._decodeHTMLEntities(o2) });
            })), e3;
          }
          _decodeHTMLEntities(e3) {
            return (0, d.decodeHTMLEntities)(this.doc, e3);
          }
          buildExtractorResponse(e3, t3, r3, n3, o2) {
            var a2, i2, s2, l2, c2;
            const u2 = this.resolveContentUrls(e3.contentHtml), d2 = this.getExtractorVariables(e3.variables);
            return Object.assign({ content: u2, title: (null === (a2 = e3.variables) || void 0 === a2 ? void 0 : a2.title) || t3.title, description: t3.description, domain: t3.domain, favicon: t3.favicon, image: t3.image, language: (null === (i2 = e3.variables) || void 0 === i2 ? void 0 : i2.language) || t3.language, published: (null === (s2 = e3.variables) || void 0 === s2 ? void 0 : s2.published) || t3.published, author: (null === (l2 = e3.variables) || void 0 === l2 ? void 0 : l2.author) || t3.author, site: (null === (c2 = e3.variables) || void 0 === c2 ? void 0 : c2.site) || t3.site, schemaOrgData: t3.schemaOrgData, wordCount: this.countHtmlWords(e3.contentHtml), parseTime: Math.round(Date.now() - r3), extractorType: n3.constructor.name.replace("Extractor", "").toLowerCase(), metaTags: o2 }, d2 ? { variables: d2 } : {});
          }
          getExtractorVariables(e3) {
            if (!e3) return;
            const t3 = {};
            let r3 = false;
            for (const [n3, o2] of Object.entries(e3)) h.has(n3) || (t3[n3] = o2, r3 = true);
            return r3 ? t3 : void 0;
          }
          removeByContentPattern(e3, t3) {
            var r3, n3, o2, a2, i2, s2;
            const l2 = Array.from(e3.querySelectorAll("p, span, div, time"));
            for (const e4 of l2) {
              if (!e4.parentNode) continue;
              if (e4.closest("pre") || e4.closest("code")) continue;
              const n4 = (null === (r3 = e4.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
              if ((0, u.countWords)(n4) <= 15 && m.test(n4) && p.test(n4) && 0 === e4.querySelectorAll("p, div, section, article").length) {
                let r4 = n4;
                for (const e5 of g) r4 = r4.replace(e5, "");
                if (r4.trim().length > 0) continue;
                this.debug && t3 && t3.push({ step: "removeByContentPattern", reason: "read time metadata", text: (0, u.textPreview)(e4) }), e4.remove();
              }
            }
            const c2 = Array.from(e3.querySelectorAll("time")), d2 = e3.textContent || "";
            for (const r4 of c2) {
              if (!r4.parentNode) continue;
              let i3 = r4, s3 = (null === (n3 = i3.textContent) || void 0 === n3 ? void 0 : n3.trim()) || "";
              for (; i3.parentElement && i3.parentElement !== e3; ) {
                const e4 = i3.parentElement.tagName.toLowerCase(), t4 = (null === (o2 = i3.parentElement.textContent) || void 0 === o2 ? void 0 : o2.trim()) || "";
                if ("p" === e4 && t4 === s3) {
                  i3 = i3.parentElement;
                  break;
                }
                if (!["i", "em", "span", "b", "strong", "small"].includes(e4) || t4 !== s3) break;
                i3 = i3.parentElement, s3 = t4;
              }
              const l3 = (null === (a2 = i3.textContent) || void 0 === a2 ? void 0 : a2.trim()) || "";
              if ((0, u.countWords)(l3) > 10) continue;
              const c3 = d2.indexOf(l3), h3 = d2.length - (c3 + l3.length);
              c3 > 200 && h3 > 200 || (this.debug && t3 && t3.push({ step: "removeByContentPattern", reason: "boundary date element", text: (0, u.textPreview)(i3) }), i3.remove());
            }
            const h2 = this.options.url || this.doc.URL || "";
            let b = "";
            try {
              b = new URL(h2).pathname;
            } catch (e4) {
            }
            if (b) {
              const r4 = e3.querySelectorAll("div, span, p");
              for (const e4 of r4) {
                if (!e4.parentNode) continue;
                const r5 = (null === (i2 = e4.textContent) || void 0 === i2 ? void 0 : i2.trim()) || "";
                if ((0, u.countWords)(r5) > 10) continue;
                if (e4.querySelectorAll("p, div, section, article").length > 0) continue;
                const n4 = e4.querySelector("a[href]");
                if (n4) try {
                  const r6 = new URL(n4.getAttribute("href") || "", h2).pathname;
                  "/" !== r6 && r6 !== b && b.startsWith(r6) && (this.debug && t3 && t3.push({ step: "removeByContentPattern", reason: "section breadcrumb", text: (0, u.textPreview)(e4) }), e4.remove());
                } catch (e5) {
                }
              }
            }
            const x = e3.textContent || "", y = e3.querySelectorAll("p, div, span, section");
            for (const r4 of y) {
              if (!r4.parentNode) continue;
              const n4 = (null === (s2 = r4.textContent) || void 0 === s2 ? void 0 : s2.trim()) || "", o3 = (0, u.countWords)(n4);
              if (!(o3 > 50 || o3 < 3)) {
                for (const o4 of f) if (o4.test(n4)) {
                  let n5 = r4;
                  for (; n5.parentElement && n5.parentElement !== e3 && !n5.nextElementSibling; ) n5 = n5.parentElement;
                  const o5 = n5.textContent || "";
                  if (x.indexOf(o5) < 200) continue;
                  const a3 = [];
                  let i3 = n5.parentElement;
                  for (; i3 && i3 !== e3; ) a3.push(i3), i3 = i3.parentElement;
                  this.removeTrailingSiblings(n5, true, t3);
                  for (const e4 of a3) this.removeTrailingSiblings(e4, false, t3);
                  return;
                }
              }
            }
          }
          removeTrailingSiblings(e3, t3, r3) {
            let n3 = e3.nextElementSibling;
            for (; n3; ) {
              const e4 = n3.nextElementSibling;
              this.debug && r3 && r3.push({ step: "removeByContentPattern", reason: "trailing non-content", text: (0, u.textPreview)(n3) }), n3.remove(), n3 = e4;
            }
            t3 && (this.debug && r3 && r3.push({ step: "removeByContentPattern", reason: "boilerplate text", text: (0, u.textPreview)(e3) }), e3.remove());
          }
        };
      }, 754(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.codeBlockRules = void 0;
        const n2 = r2(552), o = [/^language-(\w+)$/, /^lang-(\w+)$/, /^(\w+)-code$/, /^code-(\w+)$/, /^syntax-(\w+)$/, /^code-snippet__(\w+)$/, /^highlight-(\w+)$/, /^(\w+)-snippet$/, /(?:^|\s)(?:language|lang|brush|syntax)-(\w+)(?:\s|$)/i], a = /* @__PURE__ */ new Set(["abap", "actionscript", "ada", "adoc", "agda", "antlr4", "applescript", "arduino", "armasm", "asciidoc", "aspnet", "atom", "bash", "batch", "c", "clojure", "cmake", "cobol", "coffeescript", "cpp", "c++", "crystal", "csharp", "cs", "dart", "django", "dockerfile", "dotnet", "elixir", "elm", "erlang", "fortran", "fsharp", "gdscript", "gitignore", "glsl", "golang", "gradle", "graphql", "groovy", "haskell", "hs", "haxe", "hlsl", "html", "idris", "java", "javascript", "js", "jsx", "jsdoc", "json", "jsonp", "julia", "kotlin", "latex", "lean", "lean4", "lisp", "elisp", "livescript", "lua", "makefile", "markdown", "md", "markup", "masm", "mathml", "matlab", "mongodb", "mysql", "nasm", "nginx", "nim", "nix", "objc", "ocaml", "pascal", "perl", "php", "postgresql", "powershell", "prolog", "puppet", "python", "regex", "rss", "ruby", "rb", "rust", "scala", "scheme", "shell", "sh", "solidity", "sparql", "sql", "ssml", "svg", "swift", "tcl", "terraform", "tex", "toml", "typescript", "ts", "tsx", "unrealscript", "verilog", "vhdl", "webassembly", "wasm", "xml", "yaml", "yml", "zig"]);
        t2.codeBlockRules = [{ selector: ["pre", 'div[class*="prismjs"]', ".syntaxhighlighter", ".highlight", ".highlight-source", ".wp-block-syntaxhighlighter-code", ".wp-block-code", 'div[class*="language-"]', "code.hl.block"].join(", "), element: "pre", transform: (e3, t3) => {
          if (!((e4) => "classList" in e4 && "getAttribute" in e4 && "querySelector" in e4)(e3)) return e3;
          const r3 = (e4) => {
            var t4;
            const r4 = e4.getAttribute("data-lang") || e4.getAttribute("data-language") || e4.getAttribute("language");
            if (r4) return r4.toLowerCase();
            const n3 = Array.from(e4.classList || []);
            if (null === (t4 = e4.classList) || void 0 === t4 ? void 0 : t4.contains("syntaxhighlighter")) {
              const e5 = n3.find(((e6) => !["syntaxhighlighter", "nogutter"].includes(e6)));
              if (e5 && a.has(e5.toLowerCase())) return e5.toLowerCase();
            }
            for (const e5 of n3) for (const t5 of o) {
              const r5 = e5.toLowerCase().match(t5);
              if (r5 && r5[1] && a.has(r5[1].toLowerCase())) return r5[1].toLowerCase();
            }
            for (const e5 of n3) if (a.has(e5.toLowerCase())) return e5.toLowerCase();
            return "";
          };
          let i = "", s = e3;
          for (; s && !i; ) {
            i = r3(s);
            const e4 = s.querySelector("code");
            !i && e4 && (i = r3(e4)), s = s.parentElement;
          }
          const l = (e4) => {
            var t4;
            if ((0, n2.isTextNode)(e4)) return (null === (t4 = e4.parentElement) || void 0 === t4 ? void 0 : t4.querySelector("[data-line], .line")) && !(e4.textContent || "").trim() ? "" : e4.textContent || "";
            let r4 = "";
            if ((0, n2.isElement)(e4)) {
              if (e4.matches(".hover-info, .hover-container")) return "";
              if ("BR" === e4.tagName) return "\n";
              if (e4.matches('div[class*="line"], span[class*="line"], .ec-line, [data-line-number], [data-line]')) {
                const t5 = e4.querySelector('.code, .content, [class*="code-"], [class*="content-"]');
                if (t5) return (t5.textContent || "") + "\n";
                const r5 = e4.querySelector('.line-number, .gutter, [class*="line-number"], [class*="gutter"]');
                if (r5) {
                  return Array.from(e4.childNodes).filter(((e5) => !r5.contains(e5))).map(((e5) => l(e5))).join("") + "\n";
                }
                return e4.textContent + "\n";
              }
              e4.childNodes.forEach(((e5) => {
                r4 += l(e5);
              }));
            }
            return r4;
          };
          let c = "";
          e3.matches(".syntaxhighlighter, .wp-block-syntaxhighlighter-code") && (c = ((e4) => {
            const t4 = e4.querySelector(".syntaxhighlighter table .code .container");
            if (t4) return Array.from(t4.children).map(((e5) => {
              const t5 = Array.from(e5.querySelectorAll("code")).map(((e6) => {
                var t6;
                let r5 = e6.textContent || "";
                return (null === (t6 = e6.classList) || void 0 === t6 ? void 0 : t6.contains("spaces")) && (r5 = " ".repeat(r5.length)), r5;
              })).join("");
              return t5 || e5.textContent || "";
            })).join("\n");
            const r4 = e4.querySelectorAll(".code .line");
            return r4.length > 0 ? Array.from(r4).map(((e5) => {
              const t5 = Array.from(e5.querySelectorAll("code")).map(((e6) => e6.textContent || "")).join("");
              return t5 || e5.textContent || "";
            })).join("\n") : "";
          })(e3)), c || (c = l(e3));
          c = e3.matches("code.hl.block") ? c.replace(/^[ \t]+|[ \t]+$/g, "").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/^\n+/, "") : c.replace(/^\s+|\s+$/g, "").replace(/\t/g, "    ").replace(/\n{3,}/g, "\n\n").replace(/\u00a0/g, " ").replace(/^\n+/, "").replace(/\n+$/, "");
          let u = e3;
          for (let t4 = 0; t4 < 3 && u; t4++) {
            const t5 = u.parentElement;
            if (!t5 || "BODY" === t5.tagName) break;
            const r4 = Array.from(t5.children);
            for (const t6 of r4) {
              if (t6.contains(e3)) continue;
              const r5 = t6.tagName;
              if ("DIV" !== r5 && "SPAN" !== r5) continue;
              const o2 = (t6.textContent || "").trim();
              (0, n2.countWords)(o2) <= 5 && !t6.querySelector("pre, code, img, table, h1, h2, h3, h4, h5, h6, p, blockquote, ul, ol") && t6.remove();
            }
            u = t5;
          }
          const d = t3.createElement("pre");
          e3.matches("code.hl.block, pre.hl.lean.lean-output") && d.setAttribute("data-verso-code", "true");
          const h = t3.createElement("code");
          return i && (h.setAttribute("data-lang", i), h.setAttribute("class", `language-${i}`)), h.textContent = c, d.appendChild(h), d;
        } }];
      }, 610(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.standardizeFootnotes = function(e3) {
          const t3 = e3.ownerDocument;
          if (!t3) return void console.warn("standardizeFootnotes: No document available");
          new a(t3).standardizeFootnotes(e3);
        };
        const n2 = r2(640), o = r2(639);
        class a {
          constructor(e3) {
            this.genericContainer = null, this.doc = e3;
          }
          createFootnoteItem(e3, t3, r3) {
            const n3 = "string" == typeof t3 ? this.doc : t3.ownerDocument, a2 = n3.createElement("li");
            if (a2.className = "footnote", a2.id = `fn:${e3}`, "string" == typeof t3) {
              const e4 = n3.createElement("p");
              e4.appendChild((0, o.parseHTML)(n3, t3)), a2.appendChild(e4);
            } else {
              const e4 = Array.from(t3.querySelectorAll("p"));
              if (0 === e4.length) {
                const e5 = n3.createElement("p");
                (0, o.transferContent)(t3, e5), this.removeBackrefs(e5), a2.appendChild(e5);
              } else e4.forEach(((e5) => {
                const t4 = n3.createElement("p");
                (0, o.transferContent)(e5, t4), this.removeBackrefs(t4), a2.appendChild(t4);
              }));
            }
            const i = a2.querySelector("p:last-of-type") || a2;
            return r3.forEach(((e4, t4) => {
              const o2 = n3.createElement("a");
              o2.href = `#${e4}`, o2.title = "return to article", o2.className = "footnote-backref", o2.textContent = "\u21A9", t4 < r3.length - 1 && (o2.textContent += " "), i.appendChild(o2);
            })), a2;
          }
          collectFootnotes(e3) {
            const t3 = {};
            let r3 = 1;
            const a2 = /* @__PURE__ */ new Set();
            if (e3.querySelectorAll(n2.FOOTNOTE_LIST_SELECTORS).forEach(((n3) => {
              if (n3.matches("div.footnotes-footer")) {
                return void n3.querySelectorAll("div.footnote-footer").forEach(((n4) => {
                  const i = (n4.id || "").match(/^footnote-(\d+)$/);
                  if (i) {
                    const s = i[1];
                    if (!a2.has(s)) {
                      const i2 = n4.cloneNode(true), l = i2.querySelector("a");
                      l && l.remove();
                      let c = (0, o.serializeHTML)(i2);
                      c = c.replace(/^\s*\.\s*/, "");
                      const u = e3.ownerDocument.createElement("div");
                      u.appendChild((0, o.parseHTML)(e3.ownerDocument, c.trim())), t3[r3] = { content: u, originalId: s, refs: [] }, a2.add(s), r3++;
                    }
                  }
                }));
              }
              if (n3.matches('div.footnote[data-component-name="FootnoteToDOM"]')) {
                const e4 = n3.querySelector("a.footnote-number"), o2 = n3.querySelector(".footnote-content");
                if (e4 && o2) {
                  const n4 = e4.id.replace("footnote-", "").toLowerCase();
                  n4 && !a2.has(n4) && (t3[r3] = { content: o2, originalId: n4, refs: [] }, a2.add(n4), r3++);
                }
                return;
              }
              n3.querySelectorAll('li, div[role="listitem"]').forEach(((e4) => {
                var n4, o2, i, s;
                let l = "", c = null;
                const u = e4.querySelector(".citations");
                if (null === (n4 = null == u ? void 0 : u.id) || void 0 === n4 ? void 0 : n4.toLowerCase().startsWith("r")) {
                  l = u.id.toLowerCase();
                  const e5 = u.querySelector(".citation-content");
                  e5 && (c = e5);
                } else {
                  if (e4.id.toLowerCase().startsWith("bib.bib")) l = e4.id.replace("bib.bib", "").toLowerCase();
                  else if (e4.id.toLowerCase().startsWith("fn:")) l = e4.id.replace("fn:", "").toLowerCase();
                  else if (e4.id.toLowerCase().startsWith("fn")) l = e4.id.replace("fn", "").toLowerCase();
                  else if (e4.hasAttribute("data-counter")) l = (null === (i = null === (o2 = e4.getAttribute("data-counter")) || void 0 === o2 ? void 0 : o2.replace(/\.$/, "")) || void 0 === i ? void 0 : i.toLowerCase()) || "";
                  else {
                    const t4 = null === (s = e4.id.split("/").pop()) || void 0 === s ? void 0 : s.match(/cite_note-(.+)/);
                    l = t4 ? t4[1].toLowerCase() : e4.id.toLowerCase();
                  }
                  c = e4;
                }
                l && !a2.has(l) && (t3[r3] = { content: c || e4, originalId: l, refs: [] }, a2.add(l), r3++);
              }));
            })), 1 === r3) {
              const n3 = /* @__PURE__ */ new Map();
              if (e3.querySelectorAll('a[href*="#"]').forEach(((e4) => {
                var t4, r4;
                const o2 = null === (t4 = (e4.getAttribute("href") || "").split("#").pop()) || void 0 === t4 ? void 0 : t4.toLowerCase();
                if (!o2) return;
                const a3 = (null === (r4 = e4.textContent) || void 0 === r4 ? void 0 : r4.trim()) || "";
                if (!/^\[?\(?\d{1,4}\)?\]?$/.test(a3)) return;
                const i = e4.parentElement;
                if (!i) return;
                const s = i.tagName.toLowerCase();
                "sup" !== s && "span" !== s && "a" !== e4.tagName.toLowerCase() || (n3.has(o2) || n3.set(o2, []), n3.get(o2).push(e4));
              })), n3.size >= 2) {
                const o2 = new Set(n3.keys()), i = e3.querySelectorAll("div, section, aside, footer");
                let s = null, l = 0;
                if (i.forEach(((t4) => {
                  if (t4 === e3) return;
                  const r4 = t4.querySelectorAll("p[id], li[id], div[id]");
                  let n4 = 0;
                  r4.forEach(((e4) => {
                    o2.has(e4.id.toLowerCase()) && n4++;
                  })), n4 >= 2 && n4 >= l && (l = n4, s = t4);
                })), s) {
                  const n4 = s.querySelectorAll("p[id], li[id], div[id]"), i2 = [];
                  n4.forEach(((e4) => {
                    o2.has(e4.id.toLowerCase()) && i2.push(e4);
                  })), i2.forEach(((n5) => {
                    const o3 = n5.id.toLowerCase();
                    if (a2.has(o3)) return;
                    const i3 = e3.ownerDocument.createElement("div"), s2 = n5.cloneNode(true), l2 = s2.childNodes[0];
                    l2 && 3 === l2.nodeType && (l2.textContent = l2.textContent.replace(/^\d+\.\s*/, "")), i3.appendChild(s2);
                    let c = n5.nextElementSibling;
                    for (; c && !c.id; ) {
                      const e4 = c.cloneNode(true);
                      i3.appendChild(e4), c = c.nextElementSibling;
                    }
                    t3[r3] = { content: i3, originalId: o3, refs: [] }, a2.add(o3), r3++;
                  })), this.genericContainer = s;
                }
              }
            }
            return t3;
          }
          removeBackrefs(e3) {
            for (e3.querySelectorAll("a").forEach(((e4) => {
              var t3, r3;
              const n3 = (null === (t3 = e4.textContent) || void 0 === t3 ? void 0 : t3.trim().replace(/\uFE0E|\uFE0F/g, "")) || "";
              (/^[\u21A9\u21A5\u2191\u21B5\u2934\u2935\u23CE]+$/.test(n3) || (null === (r3 = e4.classList) || void 0 === r3 ? void 0 : r3.contains("footnote-backref"))) && e4.remove();
            })); e3.lastChild && 3 === e3.lastChild.nodeType; ) {
              const t3 = e3.lastChild.textContent;
              if (!/^[\s,.;]*$/.test(t3)) break;
              e3.lastChild.remove();
            }
          }
          findOuterFootnoteContainer(e3) {
            let t3 = e3, r3 = e3.parentElement;
            for (; r3 && ("span" === r3.tagName.toLowerCase() || "sup" === r3.tagName.toLowerCase()); ) t3 = r3, r3 = r3.parentElement;
            return t3;
          }
          createFootnoteReference(e3, t3) {
            const r3 = this.doc.createElement("sup");
            r3.id = t3;
            const n3 = this.doc.createElement("a");
            return n3.href = `#fn:${e3}`, n3.textContent = e3, r3.appendChild(n3), r3;
          }
          collectInlineSidenotes(e3) {
            const t3 = {}, r3 = e3.querySelectorAll("span.footnote-container, span.sidenote-container");
            if (0 === r3.length) return t3;
            let n3 = 1;
            return r3.forEach(((e4) => {
              const r4 = e4.querySelector("span.footnote, span.sidenote");
              if (!r4) return;
              const o2 = r4.cloneNode(true);
              t3[n3] = { content: o2, originalId: String(n3), refs: [`fnref:${n3}`] };
              const a2 = this.createFootnoteReference(String(n3), `fnref:${n3}`);
              e4.replaceWith(a2), n3++;
            })), t3;
          }
          standardizeFootnotes(e3) {
            const t3 = this.collectInlineSidenotes(e3), r3 = this.collectFootnotes(e3), o2 = e3.querySelectorAll(n2.FOOTNOTE_INLINE_REFERENCES), a2 = /* @__PURE__ */ new Map();
            o2.forEach(((e4) => {
              var t4, n3, o3, i2;
              if (!e4 || !e4.parentNode) return;
              let s2 = "", l2 = "";
              if (e4.matches("sup.footnoteref")) {
                const t5 = e4.querySelector('a[id^="footnoteref-"]');
                if (t5) {
                  const e5 = (t5.id || "").match(/^footnoteref-(\d+)$/);
                  e5 && (s2 = e5[1]);
                }
              } else if (e4.matches('a[id^="ref-link"]')) s2 = (null === (t4 = e4.textContent) || void 0 === t4 ? void 0 : t4.trim()) || "";
              else if (e4.matches('a[role="doc-biblioref"]')) {
                const t5 = e4.getAttribute("data-xml-rid");
                if (t5) s2 = t5;
                else {
                  const t6 = e4.getAttribute("href");
                  (null == t6 ? void 0 : t6.startsWith("#core-R")) && (s2 = t6.replace("#core-", ""));
                }
              } else if (e4.matches("a.footnote-anchor, span.footnote-hovercard-target a")) {
                const t5 = (null === (n3 = e4.id) || void 0 === n3 ? void 0 : n3.replace("footnote-anchor-", "")) || "";
                t5 && (s2 = t5.toLowerCase());
              } else if (e4.matches("cite.ltx_cite")) {
                const t5 = Array.from(e4.querySelectorAll("a"));
                if (t5.length > 0) {
                  const n4 = [];
                  if (t5.forEach(((e5) => {
                    var t6;
                    const o4 = e5.getAttribute("href");
                    if (!o4) return;
                    const a3 = null === (t6 = o4.split("/").pop()) || void 0 === t6 ? void 0 : t6.match(/bib\.bib(\d+)/);
                    if (!a3) return;
                    const i3 = a3[1].toLowerCase(), s3 = Object.entries(r3).find((([e6, t7]) => t7.originalId === i3));
                    if (!s3) return;
                    const [l3, c2] = s3, u = c2.refs.length > 0 ? `fnref:${l3}-${c2.refs.length + 1}` : `fnref:${l3}`;
                    c2.refs.push(u), n4.push(this.createFootnoteReference(l3, u));
                  })), n4.length > 0) {
                    const t6 = this.findOuterFootnoteContainer(e4), r4 = e4.ownerDocument.createDocumentFragment();
                    return n4.forEach(((t7, n5) => {
                      n5 > 0 && r4.appendChild(e4.ownerDocument.createTextNode(" ")), r4.appendChild(t7);
                    })), void t6.replaceWith(r4);
                  }
                }
              } else if (e4.matches("sup.reference")) {
                const t5 = e4.querySelectorAll("a");
                Array.from(t5).forEach(((e5) => {
                  var t6;
                  const r4 = e5.getAttribute("href");
                  if (r4) {
                    const e6 = null === (t6 = r4.split("/").pop()) || void 0 === t6 ? void 0 : t6.match(/(?:cite_note|cite_ref)-(.+)/);
                    e6 && (s2 = e6[1].toLowerCase());
                  }
                }));
              } else if (e4.matches('sup[id^="fnref:"]')) s2 = e4.id.replace("fnref:", "").toLowerCase();
              else if (e4.matches('sup[id^="fnr"]')) s2 = e4.id.replace("fnr", "").toLowerCase();
              else if (e4.matches("span.footnote-reference")) s2 = e4.getAttribute("data-footnote-id") || "", !s2 && (null === (o3 = e4.id) || void 0 === o3 ? void 0 : o3.startsWith("fnref")) && (s2 = e4.id.replace("fnref", "").toLowerCase());
              else if (e4.matches("span.footnote-link")) s2 = e4.getAttribute("data-footnote-id") || "", l2 = e4.getAttribute("data-footnote-content") || "";
              else if (e4.matches("a.citation")) s2 = (null === (i2 = e4.textContent) || void 0 === i2 ? void 0 : i2.trim()) || "", l2 = e4.getAttribute("href") || "";
              else if (e4.matches('a[id^="fnref"]')) s2 = e4.id.replace("fnref", "").toLowerCase();
              else {
                const t5 = e4.getAttribute("href");
                if (t5) {
                  const e5 = t5.replace(/^[#]/, "");
                  s2 = e5.toLowerCase();
                }
              }
              if (s2) {
                const t5 = Object.entries(r3).find((([e5, t6]) => t6.originalId === s2.toLowerCase()));
                if (t5) {
                  const [r4, n4] = t5, o4 = n4.refs.length > 0 ? `fnref:${r4}-${n4.refs.length + 1}` : `fnref:${r4}`;
                  n4.refs.push(o4);
                  const i3 = this.findOuterFootnoteContainer(e4);
                  if ("sup" === i3.tagName.toLowerCase()) {
                    a2.has(i3) || a2.set(i3, []);
                    a2.get(i3).push(this.createFootnoteReference(r4, o4));
                  } else i3.replaceWith(this.createFootnoteReference(r4, o4));
                }
              }
            }));
            const i = Object.entries(r3).filter((([e4, t4]) => 0 === t4.refs.length));
            if (i.length > 0) {
              const t4 = /* @__PURE__ */ new Map(), n3 = /* @__PURE__ */ new Map();
              i.forEach((([e4, r4]) => {
                t4.set(r4.originalId, [e4, r4]), n3.set(e4, [e4, r4]);
              }));
              e3.querySelectorAll('a[href*="#"]').forEach(((e4) => {
                var r4, n4;
                if (!e4.parentNode) return;
                if (e4.closest('[id^="fnref:"]')) return;
                if (e4.closest("#footnotes")) return;
                if (this.genericContainer && this.genericContainer.contains(e4)) return;
                const o3 = null === (r4 = (e4.getAttribute("href") || "").split("#").pop()) || void 0 === r4 ? void 0 : r4.toLowerCase();
                if (!o3) return;
                const a3 = t4.get(o3);
                if (!a3) return;
                const i2 = (null === (n4 = e4.textContent) || void 0 === n4 ? void 0 : n4.trim()) || "";
                if (!/^[\[\(]?\d{1,4}[\]\)]?$/.test(i2)) return;
                const [s2, l2] = a3, c2 = l2.refs.length > 0 ? `fnref:${s2}-${l2.refs.length + 1}` : `fnref:${s2}`;
                l2.refs.push(c2);
                this.findOuterFootnoteContainer(e4).replaceWith(this.createFootnoteReference(s2, c2));
              }));
              if (Object.entries(r3).filter((([e4, t5]) => 0 === t5.refs.length)).length > 0) {
                e3.querySelectorAll("sup, span.footnote-ref").forEach(((e4) => {
                  var r4, o3;
                  if (!e4.parentNode) return;
                  if (null === (r4 = e4.id) || void 0 === r4 ? void 0 : r4.startsWith("fnref:")) return;
                  if (e4.closest("#footnotes")) return;
                  const a3 = ((null === (o3 = e4.textContent) || void 0 === o3 ? void 0 : o3.trim()) || "").match(/^[\[\(]?(\d{1,4})[\]\)]?$/);
                  if (!a3) return;
                  const i2 = a3[1], s2 = n3.get(i2) || t4.get(i2);
                  if (!s2) return;
                  const [l2, c2] = s2;
                  if (c2.refs.length > 0) return;
                  const u = `fnref:${l2}`;
                  c2.refs.push(u);
                  this.findOuterFootnoteContainer(e4).replaceWith(this.createFootnoteReference(l2, u));
                }));
              }
            }
            a2.forEach(((e4, t4) => {
              if (e4.length > 0) {
                const r4 = this.doc.createDocumentFragment();
                e4.forEach(((e5) => {
                  const t5 = e5.querySelector("a");
                  if (t5) {
                    const n3 = this.doc.createElement("sup");
                    n3.id = e5.id, n3.appendChild(t5.cloneNode(true)), r4.appendChild(n3);
                  }
                })), t4.replaceWith(r4);
              }
            }));
            const s = this.doc.createElement("div");
            s.id = "footnotes";
            const l = this.doc.createElement("ol"), c = Object.assign(Object.assign({}, t3), r3);
            Object.entries(c).forEach((([e4, t4]) => {
              const r4 = this.createFootnoteItem(parseInt(e4), t4.content, t4.refs);
              l.appendChild(r4);
            }));
            e3.querySelectorAll(n2.FOOTNOTE_LIST_SELECTORS).forEach(((e4) => e4.remove())), this.genericContainer && this.genericContainer.parentNode && this.genericContainer.remove(), l.children.length > 0 && (s.appendChild(l), e3.appendChild(s));
          }
        }
      }, 864(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.headingRules = void 0;
        const n2 = r2(640);
        function o(e3) {
          if ("a" !== e3.tagName.toLowerCase()) return false;
          const t3 = e3.getAttribute("href") || "", r3 = (e3.getAttribute("title") || "").toLowerCase(), n3 = (e3.getAttribute("class") || "").toLowerCase(), o2 = (e3.textContent || "").trim();
          return !(!t3.startsWith("#") && !t3.includes("#")) || (!!r3.includes("permalink") || (!!(n3.includes("permalink") || n3.includes("heading-anchor") || n3.includes("anchor-link")) || !!/^[#\xb6\xa7\ud83d\udd17]$/.test(o2)));
        }
        t2.headingRules = [{ selector: "h1, h2, h3, h4, h5, h6", element: "keep", transform: (e3) => {
          var t3;
          const r3 = e3.ownerDocument;
          if (!r3) return console.warn("No document available"), e3;
          const a = r3.createElement(e3.tagName);
          Array.from(e3.attributes).forEach(((e4) => {
            n2.ALLOWED_ATTRIBUTES.has(e4.name) && a.setAttribute(e4.name, e4.value);
          }));
          const i = e3.cloneNode(true), s = /* @__PURE__ */ new Map(), l = [];
          Array.from(i.querySelectorAll("*")).forEach(((e4) => {
            var t4, r4, n3, a2;
            if (!(function(e5) {
              const t5 = e5.tagName.toLowerCase();
              return "button" === t5 || !("a" !== t5 || !o(e5)) || !(!e5.classList.contains("anchor") && !e5.classList.contains("permalink-widget")) || !("span" !== t5 && "div" !== t5 || !Array.from(e5.querySelectorAll("a")).some(((e6) => o(e6))));
            })(e4)) return;
            s.set(e4, (null === (t4 = e4.textContent) || void 0 === t4 ? void 0 : t4.trim()) || "");
            const c2 = e4.parentElement;
            c2 && c2 !== i && (null === (r4 = c2.textContent) || void 0 === r4 ? void 0 : r4.trim()) === (null === (n3 = e4.textContent) || void 0 === n3 ? void 0 : n3.trim()) && s.set(c2, (null === (a2 = e4.textContent) || void 0 === a2 ? void 0 : a2.trim()) || ""), l.push(e4);
          })), l.forEach(((e4) => e4.remove()));
          let c = (null === (t3 = i.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "";
          return !c && s.size > 0 && (c = Array.from(s.values())[0]), a.textContent = c, a;
        } }];
      }, 649(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.imageRules = void 0;
        const n2 = r2(552), o = r2(639), a = /^data:image\/([^;]+);base64,/, i = /\.(jpg|jpeg|png|webp)\s+\d/, s = /^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/, l = /\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i, c = /\s(\d+)w/, u = /dpr=(\d+(?:\.\d+)?)/, d = /^([^\s]+)/, h = /^[\w\-\.\/\\]+\.(jpg|jpeg|png|gif|webp|svg)$/i, m = /^\d{4}-\d{2}-\d{2}$/;
        function p(e3, t3, r3) {
          const a2 = r3.createElement("figure");
          a2.appendChild(e3.cloneNode(true));
          const i2 = r3.createElement("figcaption"), s2 = (function(e4) {
            const t4 = [], r4 = /* @__PURE__ */ new Set(), a3 = (e5) => {
              var o2;
              if ((0, n2.isTextNode)(e5)) {
                const n3 = (null === (o2 = e5.textContent) || void 0 === o2 ? void 0 : o2.trim()) || "";
                n3 && !r4.has(n3) && (t4.push(n3), r4.add(n3));
              } else if ((0, n2.isElement)(e5)) {
                const t5 = e5.childNodes;
                for (let e6 = 0; e6 < t5.length; e6++) a3(t5[e6]);
              }
            }, i3 = e4.childNodes;
            for (let e5 = 0; e5 < i3.length; e5++) a3(i3[e5]);
            if (t4.length > 0) return t4.join(" ");
            return (0, o.serializeHTML)(e4);
          })(t3);
          return i2.appendChild((0, o.parseHTML)(r3, s2)), a2.appendChild(i2), a2;
        }
        function f(e3, t3) {
          t3.setAttribute("srcset", e3);
          const r3 = T(e3);
          r3 && y(r3) && t3.setAttribute("src", r3);
        }
        function g(e3, t3, r3) {
          for (let n3 = 0; n3 < e3.attributes.length; n3++) {
            const o2 = e3.attributes[n3];
            r3.includes(o2.name) || t3.setAttribute(o2.name, o2.value);
          }
        }
        function b(e3) {
          const t3 = e3.match(a);
          if (!t3) return false;
          if ("svg+xml" === t3[1]) return false;
          const r3 = t3[0].length;
          return e3.length - r3 < 133;
        }
        function x(e3) {
          return e3.startsWith("data:image/svg+xml");
        }
        function y(e3) {
          return !e3.startsWith("data:") && (!(!e3 || "" === e3.trim()) && (l.test(e3) || e3.includes("image") || e3.includes("img") || e3.includes("photo")));
        }
        function v(e3) {
          if (w(e3)) return true;
          return e3.querySelectorAll("img, video, picture, source").length > 0;
        }
        function w(e3) {
          const t3 = e3.tagName.toLowerCase();
          return "img" === t3 || "video" === t3 || "picture" === t3 || "source" === t3;
        }
        function A(e3) {
          if (w(e3)) return e3;
          const t3 = e3.querySelectorAll("picture");
          if (t3.length > 0) return t3[0];
          const r3 = e3.querySelectorAll("img"), n3 = [];
          for (let e4 = 0; e4 < r3.length; e4++) {
            const t4 = r3[e4], o3 = t4.getAttribute("src") || "", a3 = t4.getAttribute("alt") || "";
            o3.includes("data:image/svg+xml") || (b(o3) || !a3.trim() && r3.length > 1 || n3.push(t4));
          }
          if (n3.length > 0) return n3[0];
          const o2 = e3.querySelectorAll("video");
          if (o2.length > 0) return o2[0];
          const a2 = e3.querySelectorAll("source");
          if (a2.length > 0) return a2[0];
          const i2 = e3.querySelectorAll("img, picture, source, video");
          return i2.length > 0 ? i2[0] : null;
        }
        function C(e3) {
          var t3, r3, n3, o2;
          const a2 = e3.querySelector("figcaption");
          if (a2) return a2;
          const i2 = /* @__PURE__ */ new Set(), s2 = ['[class*="caption"]', '[class*="description"]', '[class*="alt"]', '[class*="title"]', '[class*="credit"]', '[class*="text"]', '[class*="post-thumbnail-text"]', '[class*="image-caption"]', '[class*="photo-caption"]', "[aria-label]", "[title]"].join(", "), l2 = e3.querySelectorAll(s2);
          for (let e4 = 0; e4 < l2.length; e4++) {
            const r4 = l2[e4];
            if (w(r4)) continue;
            const n4 = null === (t3 = r4.textContent) || void 0 === t3 ? void 0 : t3.trim();
            if (n4 && n4.length > 0 && !i2.has(n4)) return i2.add(n4), r4;
          }
          const c2 = e3.querySelector("img");
          if (c2 && c2.hasAttribute("alt")) {
            const t4 = c2.getAttribute("alt");
            if (t4 && t4.trim().length > 0) {
              const r4 = e3.ownerDocument.createElement("div");
              return r4.textContent = t4, r4;
            }
          }
          if (e3.parentElement) {
            const t4 = e3.parentElement.children;
            for (let n4 = 0; n4 < t4.length; n4++) {
              const o3 = t4[n4];
              if (o3 === e3) continue;
              if (Array.from(o3.classList).some(((e4) => e4.includes("caption") || e4.includes("credit") || e4.includes("text") || e4.includes("description")))) {
                const e4 = null === (r3 = o3.textContent) || void 0 === r3 ? void 0 : r3.trim();
                if (e4 && e4.length > 0) return o3;
              }
            }
          }
          const u2 = e3.querySelectorAll("img");
          for (let e4 = 0; e4 < u2.length; e4++) {
            const t4 = u2[e4];
            if (!t4.parentElement) continue;
            let r4 = t4.nextElementSibling;
            for (; r4; ) {
              if (["EM", "STRONG", "SPAN", "I", "B", "SMALL", "CITE"].includes(r4.tagName)) {
                const e5 = null === (n3 = r4.textContent) || void 0 === n3 ? void 0 : n3.trim();
                if (e5 && e5.length > 0) return r4;
              }
              r4 = r4.nextElementSibling;
            }
          }
          for (let e4 = 0; e4 < u2.length; e4++) {
            const t4 = u2[e4], r4 = t4.parentElement;
            if (!r4) continue;
            const n4 = r4.querySelectorAll("em, strong, span, i, b, small, cite");
            for (let e5 = 0; e5 < n4.length; e5++) {
              const r5 = n4[e5];
              if (r5 === t4) continue;
              const a3 = null === (o2 = r5.textContent) || void 0 === o2 ? void 0 : o2.trim();
              if (a3 && a3.length > 0) return r5;
            }
          }
          return null;
        }
        function E(e3) {
          var t3;
          const r3 = (null === (t3 = e3.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "";
          return !(r3.length < 10 || r3.startsWith("http://") || r3.startsWith("https://")) && (!h.test(r3) && (!r3.match(/^\d+$/) && !m.test(r3)));
        }
        function S(e3, t3) {
          const r3 = e3.tagName.toLowerCase();
          if ("img" === r3) return _(e3, t3);
          if ("picture" === r3) {
            const r4 = e3.querySelector("img");
            return r4 ? _(r4, t3) : e3.cloneNode(true);
          }
          return "source" === r3 ? (function(e4, t4) {
            const r4 = t4.createElement("img"), n3 = e4.getAttribute("srcset");
            n3 && f(n3, r4);
            const o2 = e4.parentElement;
            if (o2) {
              const e5 = o2.querySelectorAll("img"), t5 = [];
              for (let r5 = 0; r5 < e5.length; r5++) {
                const n4 = e5[r5], o3 = n4.getAttribute("src") || "";
                b(o3) || x(o3) || "" === o3 || t5.push(n4);
              }
              if (t5.length > 0) {
                if (g(t5[0], r4, ["src", "srcset"]), !r4.hasAttribute("src") || !y(r4.getAttribute("src") || "")) {
                  const e6 = t5[0].getAttribute("src");
                  e6 && y(e6) && r4.setAttribute("src", e6);
                }
              } else {
                const e6 = o2.querySelector("img[data-src]");
                if (e6 && (g(e6, r4, ["src", "srcset"]), !r4.hasAttribute("src") || !y(r4.getAttribute("src") || ""))) {
                  const t6 = e6.getAttribute("data-src");
                  t6 && y(t6) && r4.setAttribute("src", t6);
                }
              }
            }
            return r4;
          })(e3, t3) : e3.cloneNode(true);
        }
        function _(e3, t3) {
          const r3 = e3.getAttribute("src") || "";
          if (b(r3) || x(r3)) {
            const r4 = e3.parentElement;
            if (r4) {
              const n3 = r4.querySelectorAll("source"), o2 = [];
              for (let e4 = 0; e4 < n3.length; e4++) {
                const t4 = n3[e4];
                t4.hasAttribute("data-srcset") && "" !== t4.getAttribute("data-srcset") && o2.push(t4);
              }
              if (o2.length > 0) {
                const r5 = t3.createElement("img"), n4 = e3.getAttribute("data-src");
                return n4 && !x(n4) && r5.setAttribute("src", n4), g(e3, r5, ["src"]), r5;
              }
            }
          }
          return e3.cloneNode(true);
        }
        function T(e3) {
          if (!e3 || !e3.trim()) return null;
          const t3 = e3.trim(), r3 = /(.+?)\s+(\d+(?:\.\d+)?[wx])/g;
          let n3, o2 = 0;
          for (; null !== (n3 = r3.exec(t3)); ) {
            let e4 = n3[1].trim();
            if (o2 > 0 && (e4 = e4.replace(/^,\s*/, "")), o2 = r3.lastIndex, e4 && !x(e4)) return e4;
          }
          const a2 = t3.match(d);
          return a2 && a2[1] && !x(a2[1]) ? a2[1] : null;
        }
        function q(e3) {
          if (0 === e3.length) return null;
          if (1 === e3.length) return e3[0];
          for (let t4 = 0; t4 < e3.length; t4++) if (!e3[t4].hasAttribute("media")) return e3[t4];
          let t3 = null, r3 = 0;
          for (let n3 = 0; n3 < e3.length; n3++) {
            const o2 = e3[n3], a2 = o2.getAttribute("srcset");
            if (!a2) continue;
            const i2 = a2.match(c), s2 = a2.match(u);
            if (i2 && i2[1]) {
              const e4 = parseInt(i2[1], 10) * (s2 ? parseFloat(s2[1]) : 1);
              e4 > r3 && (r3 = e4, t3 = o2);
            }
          }
          return t3 || e3[0];
        }
        t2.imageRules = [{ selector: "picture", element: "picture", transform: (e3, t3) => {
          const r3 = e3.querySelectorAll("source"), n3 = e3.querySelector("img");
          if (!n3) {
            console.warn("Picture element without img fallback:", e3.outerHTML);
            const n4 = q(r3);
            if (n4) {
              const r4 = n4.getAttribute("srcset");
              if (r4) {
                const n5 = t3.createElement("img");
                return f(r4, n5), e3.replaceChildren(n5), e3;
              }
            }
            return e3;
          }
          let o2 = null, a2 = null;
          if (r3.length > 0) {
            const e4 = q(r3);
            e4 && (o2 = e4.getAttribute("srcset"), o2 && (a2 = T(o2)));
          }
          if (o2 && n3.setAttribute("srcset", o2), a2 && y(a2)) n3.setAttribute("src", a2);
          else if (!n3.hasAttribute("src") || !y(n3.getAttribute("src") || "")) {
            const e4 = T(n3.getAttribute("srcset") || o2 || "");
            e4 && y(e4) && n3.setAttribute("src", e4);
          }
          return r3.forEach(((e4) => e4.remove())), e3;
        } }, { selector: "uni-image-full-width", element: "figure", transform: (e3, t3) => {
          var r3;
          const n3 = t3.createElement("figure"), a2 = t3.createElement("img"), i2 = e3.querySelector("img");
          if (!i2) return console.warn("uni-image-full-width without img:", e3.outerHTML), n3;
          let s2 = i2.getAttribute("src");
          const l2 = i2.getAttribute("data-loading");
          if (l2) try {
            const e4 = JSON.parse(l2);
            e4.desktop && y(e4.desktop) && (s2 = e4.desktop);
          } catch (e4) {
            console.warn("Failed to parse data-loading attribute:", l2, e4);
          }
          if (!s2 || !y(s2)) return console.warn("Could not find valid src for uni-image-full-width:", e3.outerHTML), n3;
          a2.setAttribute("src", s2);
          let c2 = i2.getAttribute("alt");
          c2 || (c2 = e3.getAttribute("alt-text")), c2 && a2.setAttribute("alt", c2), n3.appendChild(a2);
          const u2 = e3.querySelector("figcaption");
          if (u2) {
            const e4 = null === (r3 = u2.textContent) || void 0 === r3 ? void 0 : r3.trim();
            if (e4 && e4.length > 5) {
              const r4 = t3.createElement("figcaption"), a3 = u2.querySelector(".rich-text p");
              a3 ? (0, o.transferContent)(a3, r4) : r4.textContent = e4, n3.appendChild(r4);
            }
          }
          return n3;
        } }, { selector: 'img[data-src], img[data-srcset], img[loading="lazy"], img.lazy, img.lazyload', element: "img", transform: (e3, t3) => {
          const r3 = e3.getAttribute("src") || "", n3 = (function(e4) {
            if (e4.hasAttribute("data-src") || e4.hasAttribute("data-srcset")) return true;
            for (let t4 = 0; t4 < e4.attributes.length; t4++) {
              const r4 = e4.attributes[t4];
              if ("src" !== r4.name) {
                if (r4.name.startsWith("data-") && /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(r4.value)) return true;
                if (/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(r4.value)) return true;
              }
            }
            return false;
          })(e3);
          b(r3) && n3 && e3.removeAttribute("src");
          const o2 = e3.getAttribute("data-src");
          o2 && !e3.getAttribute("src") && e3.setAttribute("src", o2);
          const a2 = e3.getAttribute("data-srcset");
          a2 && !e3.getAttribute("srcset") && e3.setAttribute("srcset", a2);
          for (let t4 = 0; t4 < e3.attributes.length; t4++) {
            const r4 = e3.attributes[t4];
            if ("src" === r4.name || "srcset" === r4.name || "alt" === r4.name) continue;
            const n4 = r4.value.charAt(0);
            "{" !== n4 && "[" !== n4 && (i.test(r4.value) ? e3.setAttribute("srcset", r4.value) : s.test(r4.value) && e3.setAttribute("src", r4.value));
          }
          return e3.classList.remove("lazy", "lazyload"), e3.removeAttribute("data-ll-status"), e3.removeAttribute("data-src"), e3.removeAttribute("data-srcset"), e3.removeAttribute("loading"), e3;
        } }, { selector: "span:has(img)", element: "span", transform: (e3, t3) => {
          try {
            if (!v(e3)) return e3;
            const r3 = A(e3);
            if (!r3) return e3;
            const n3 = C(e3), o2 = S(r3, t3);
            if (n3 && E(n3)) {
              const e4 = p(o2, n3, t3);
              return n3.parentNode && n3.parentNode.removeChild(n3), e4;
            }
            return o2;
          } catch (t4) {
            return console.warn("Error processing span with image:", t4), e3;
          }
        } }, { selector: 'figure, p:has([class*="caption"])', element: "figure", transform: (e3, t3) => {
          try {
            if (!v(e3)) return e3;
            const r3 = A(e3);
            if (!r3) return e3;
            const n3 = C(e3);
            if (n3 && E(n3)) {
              const o2 = A(e3);
              let a2;
              return o2 ? a2 = o2 : (console.warn("Figure rule couldn't find current image element in:", e3.outerHTML), a2 = S(r3, t3)), p(a2, n3, t3);
            }
            return e3;
          } catch (t4) {
            return console.warn("Error processing complex image element:", t4), e3;
          }
        } }];
      }, 282(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.mathSelectors = t2.isBlockDisplay = t2.getBasicLatexFromElement = t2.getMathMLFromElement = void 0;
        const n2 = r2(639);
        t2.getMathMLFromElement = (e3) => {
          if ("math" === e3.tagName.toLowerCase()) {
            const t4 = "block" === e3.getAttribute("display");
            return { mathml: e3.outerHTML, latex: e3.getAttribute("alttext") || null, isBlock: t4 };
          }
          const t3 = e3.getAttribute("data-mathml");
          if (t3) {
            const r4 = e3.ownerDocument || document, o2 = (0, n2.parseHTML)(r4, t3).querySelector("math");
            if (o2) {
              const e4 = "block" === o2.getAttribute("display");
              return { mathml: o2.outerHTML, latex: o2.getAttribute("alttext") || null, isBlock: e4 };
            }
          }
          const r3 = e3.querySelector(".MJX_Assistive_MathML, mjx-assistive-mml");
          if (r3) {
            const e4 = r3.querySelector("math");
            if (e4) {
              const t4 = e4.getAttribute("display"), n3 = r3.getAttribute("display"), o2 = "block" === t4 || "block" === n3;
              return { mathml: e4.outerHTML, latex: e4.getAttribute("alttext") || null, isBlock: o2 };
            }
          }
          const o = e3.querySelector(".katex-mathml math");
          return o ? { mathml: o.outerHTML, latex: null, isBlock: false } : null;
        };
        t2.getBasicLatexFromElement = (e3) => {
          var t3, r3, n3;
          const o = e3.getAttribute("data-latex");
          if (o) return o;
          if ("img" === e3.tagName.toLowerCase() && e3.classList.contains("latex")) {
            const t4 = e3.getAttribute("alt");
            if (t4) return t4;
            const r4 = e3.getAttribute("src");
            if (r4) {
              const e4 = r4.match(/latex\.php\?latex=([^&]+)/);
              if (e4) return decodeURIComponent(e4[1]).replace(/\+/g, " ").replace(/%5C/g, "\\");
            }
          }
          const a = e3.querySelector('annotation[encoding="application/x-tex"]');
          if (null == a ? void 0 : a.textContent) return a.textContent.trim();
          if (e3.matches(".katex")) {
            const t4 = e3.querySelector('.katex-mathml annotation[encoding="application/x-tex"]');
            if (null == t4 ? void 0 : t4.textContent) return t4.textContent.trim();
          }
          if (e3.matches('script[type="math/tex"]') || e3.matches('script[type="math/tex; mode=display"]')) return (null === (t3 = e3.textContent) || void 0 === t3 ? void 0 : t3.trim()) || null;
          if (e3.parentElement) {
            const t4 = e3.parentElement.querySelector('script[type="math/tex"], script[type="math/tex; mode=display"]');
            if (t4) return (null === (r3 = t4.textContent) || void 0 === r3 ? void 0 : r3.trim()) || null;
          }
          return "math" === e3.tagName.toLowerCase() && (null === (n3 = e3.textContent) || void 0 === n3 ? void 0 : n3.trim()) ? e3.textContent.trim() : e3.getAttribute("alt") || null;
        };
        t2.isBlockDisplay = (e3) => {
          if ("block" === e3.getAttribute("display")) return true;
          const t3 = e3.className.toLowerCase();
          if (t3.includes("display") || t3.includes("block")) return true;
          if (e3.closest('.katex-display, .MathJax_Display, [data-display="block"]')) return true;
          const r3 = e3.previousElementSibling;
          if ("p" === (null == r3 ? void 0 : r3.tagName.toLowerCase())) return true;
          if (e3.matches(".mwe-math-fallback-image-display")) return true;
          if (e3.matches(".katex")) return null !== e3.closest(".katex-display");
          if (e3.hasAttribute("display")) return "true" === e3.getAttribute("display");
          if (e3.matches('script[type="math/tex; mode=display"]')) return true;
          if (e3.hasAttribute("display")) return "true" === e3.getAttribute("display");
          const n3 = e3.closest("[display]");
          return !!n3 && "true" === n3.getAttribute("display");
        }, t2.mathSelectors = ['img.latex[src*="latex.php"]', "span.MathJax", "mjx-container", 'script[type="math/tex"]', 'script[type="math/tex; mode=display"]', '.MathJax_Preview + script[type="math/tex"]', ".MathJax_Display", ".MathJax_SVG", ".MathJax_MathML", ".mwe-math-element", ".mwe-math-fallback-image-inline", ".mwe-math-fallback-image-display", ".mwe-math-mathml-inline", ".mwe-math-mathml-display", ".katex", ".katex-display", ".katex-mathml", ".katex-html", "[data-katex]", 'script[type="math/katex"]', "math", "[data-math]", "[data-latex]", "[data-tex]", 'script[type^="math/"]', 'annotation[encoding="application/x-tex"]'].join(",");
      }, 974(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.mathRules = t2.createCleanMathEl = t2.getLatexFromElement = void 0;
        const o = r2(354), a = n2(r2(914)), i = r2(282), s = r2(639);
        t2.getLatexFromElement = (e3) => {
          const t3 = (0, i.getBasicLatexFromElement)(e3);
          if (t3) return t3;
          const r3 = (0, i.getMathMLFromElement)(e3);
          if (null == r3 ? void 0 : r3.mathml) try {
            return o.MathMLToLaTeX.convert(r3.mathml);
          } catch (e4) {
            console.warn("Failed to convert MathML to LaTeX:", e4);
          }
          return null;
        };
        t2.createCleanMathEl = (e3, t3, r3, n3) => {
          const o2 = n3.createElement("math");
          if (o2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), o2.setAttribute("display", r3 ? "block" : "inline"), o2.setAttribute("data-latex", t3 || ""), null == e3 ? void 0 : e3.mathml) {
            const t4 = (0, s.parseHTML)(n3, e3.mathml).querySelector("math");
            t4 && (0, s.transferContent)(t4, o2);
          } else if (t3) try {
            const e4 = a.default.renderToString(t3, { displayMode: r3, throwOnError: false }), i2 = (0, s.parseHTML)(n3, e4).querySelector("math");
            if (i2) for (; i2.firstChild; ) o2.appendChild(i2.firstChild);
            else o2.textContent = t3;
          } catch (e4) {
            console.warn("Failed to convert LaTeX to MathML:", e4), o2.textContent = t3;
          }
          return o2;
        }, t2.mathRules = [{ selector: i.mathSelectors, element: "math", transform: (e3) => {
          if (!("classList" in e3) || !("getAttribute" in e3) || !("querySelector" in e3)) return e3;
          const r3 = (0, i.getMathMLFromElement)(e3), n3 = (0, t2.getLatexFromElement)(e3), o2 = (0, i.isBlockDisplay)(e3), a2 = (0, t2.createCleanMathEl)(r3, n3, o2, e3.ownerDocument);
          if (e3.parentElement && !e3.matches('script[type^="math/"]')) {
            e3.parentElement.querySelectorAll('script[type^="math/"], .MathJax_Preview, script[type="text/javascript"][src*="mathjax"], script[type="text/javascript"][src*="katex"]').forEach(((e4) => e4.remove()));
          }
          return a2;
        } }];
      }, 917(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ExtractorRegistry = void 0;
        const n2 = r2(959), o = r2(248), a = r2(64), i = r2(258), s = r2(458), l = r2(632), c = r2(397), u = r2(20), d = r2(732), h = r2(588), m = r2(666);
        class p {
          static initialize() {
            this.register({ patterns: ["x.com", "twitter.com"], extractor: a.XArticleExtractor }), this.register({ patterns: ["twitter.com", /\/x\.com\/.*/], extractor: o.TwitterExtractor }), this.register({ patterns: ["x.com", "twitter.com"], extractor: m.XOembedExtractor }), this.register({ patterns: ["reddit.com", "old.reddit.com", "new.reddit.com", /^https:\/\/[^\/]+\.reddit\.com/], extractor: n2.RedditExtractor }), this.register({ patterns: ["youtube.com", "youtu.be", /youtube\.com\/watch\?v=.*/, /youtu\.be\/.*/], extractor: i.YoutubeExtractor }), this.register({ patterns: [/news\.ycombinator\.com\/item\?id=.*/], extractor: s.HackerNewsExtractor }), this.register({ patterns: [/^https?:\/\/chatgpt\.com\/(c|share)\/.*/], extractor: l.ChatGPTExtractor }), this.register({ patterns: ["claude.ai", /^https?:\/\/claude\.ai\/(chat|share)\/.*/], extractor: c.ClaudeExtractor }), this.register({ patterns: [/^https?:\/\/grok\.com\/(chat|share)(\/.*)?$/], extractor: u.GrokExtractor }), this.register({ patterns: [/^https?:\/\/gemini\.google\.com\/app\/.*/], extractor: d.GeminiExtractor }), this.register({ patterns: ["github.com", /^https?:\/\/github\.com\/.*/], extractor: h.GitHubExtractor });
          }
          static register(e3) {
            this.mappings.push(e3);
          }
          static findExtractor(e3, t3, r3) {
            return this.findByPredicate(e3, t3, r3, ((e4) => e4.canExtract()));
          }
          static findAsyncExtractor(e3, t3, r3) {
            return this.findByPredicate(e3, t3, r3, ((e4) => e4.canExtractAsync()));
          }
          static findPreferredAsyncExtractor(e3, t3, r3) {
            return this.findByPredicate(e3, t3, r3, ((e4) => e4.canExtractAsync() && e4.prefersAsync()));
          }
          static findByPredicate(e3, t3, r3, n3) {
            try {
              const o2 = new URL(t3).hostname;
              for (const { patterns: a2, extractor: i2 } of this.mappings) {
                if (a2.some(((e4) => e4 instanceof RegExp ? e4.test(t3) : o2.includes(e4)))) {
                  const o3 = new i2(e3, t3, r3);
                  if (n3(o3)) return o3;
                }
              }
              return null;
            } catch (e4) {
              return console.error("Error finding extractor:", e4), null;
            }
          }
        }
        t2.ExtractorRegistry = p, p.mappings = [], p.initialize();
      }, 279(e2, t2) {
        "use strict";
        var r2 = this && this.__awaiter || function(e3, t3, r3, n2) {
          return new (r3 || (r3 = Promise))((function(o, a) {
            function i(e4) {
              try {
                l(n2.next(e4));
              } catch (e5) {
                a(e5);
              }
            }
            function s(e4) {
              try {
                l(n2.throw(e4));
              } catch (e5) {
                a(e5);
              }
            }
            function l(e4) {
              var t4;
              e4.done ? o(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i, s);
            }
            l((n2 = n2.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.BaseExtractor = void 0;
        t2.BaseExtractor = class {
          constructor(e3, t3, r3) {
            this.document = e3, this.url = t3, this.schemaOrgData = r3;
          }
          canExtractAsync() {
            return false;
          }
          prefersAsync() {
            return false;
          }
          extractAsync() {
            return r2(this, void 0, void 0, (function* () {
              return this.extract();
            }));
          }
        };
      }, 181(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ConversationExtractor = void 0;
        const n2 = r2(279), o = r2(628), a = r2(639);
        class i extends n2.BaseExtractor {
          getFootnotes() {
            return [];
          }
          extract() {
            var e3;
            const t3 = this.extractMessages(), r3 = this.getMetadata(), n3 = this.getFootnotes(), i2 = this.createContentHtml(t3, n3), s = this.document.implementation.createHTMLDocument(), l = s.createElement("article");
            l.appendChild((0, a.parseHTML)(s, i2)), s.body.appendChild(l);
            const c = new o.Defuddle(s).parse(), u = c.content;
            return { content: u, contentHtml: u, extractedContent: { messageCount: t3.length.toString() }, variables: { title: r3.title || "Conversation", site: r3.site, description: r3.description || `${r3.site} conversation with ${t3.length} messages`, wordCount: (null === (e3 = c.wordCount) || void 0 === e3 ? void 0 : e3.toString()) || "" } };
          }
          createContentHtml(e3, t3) {
            return `${e3.map(((t4, r3) => {
              const n3 = t4.timestamp ? `<div class="message-timestamp">${t4.timestamp}</div>` : "", o2 = /<p[^>]*>[\s\S]*?<\/p>/i.test(t4.content) ? t4.content : `<p>${t4.content}</p>`, a2 = t4.metadata ? Object.entries(t4.metadata).map((([e4, t5]) => `data-${e4}="${t5}"`)).join(" ") : "";
              return `
			<div class="message message-${t4.author.toLowerCase()}" ${a2}>
				<div class="message-header">
					<p class="message-author"><strong>${t4.author}</strong></p>
					${n3}
				</div>
				<div class="message-content">
					${o2}
				</div>
			</div>${r3 < e3.length - 1 ? "\n<hr>" : ""}`;
            })).join("\n").trim()}
${t3.length > 0 ? `
			<div id="footnotes">
				<ol>
					${t3.map(((e4, t4) => `
						<li class="footnote" id="fn:${t4 + 1}">
							<p>
								<a href="${e4.url}" target="_blank">${e4.text}</a>&nbsp;<a href="#fnref:${t4 + 1}" class="footnote-backref">\u21A9</a>
							</p>
						</li>
					`)).join("")}
				</ol>
			</div>` : ""}`.trim();
          }
        }
        t2.ConversationExtractor = i;
      }, 632(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ChatGPTExtractor = void 0;
        const n2 = r2(181), o = r2(639);
        class a extends n2.ConversationExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.cachedMessages = null, this.articles = e3.querySelectorAll('article[data-testid^="conversation-turn-"]'), this.footnotes = [], this.footnoteCounter = 0;
          }
          canExtract() {
            return !!this.articles && this.articles.length > 0;
          }
          extractMessages() {
            if (this.cachedMessages) return this.cachedMessages;
            const e3 = [];
            return this.footnotes = [], this.footnoteCounter = 0, this.articles ? (this.articles.forEach(((t3) => {
              var r3, n3;
              const a2 = t3.querySelector("h5.sr-only, h6.sr-only"), i = (null === (n3 = null === (r3 = null == a2 ? void 0 : a2.textContent) || void 0 === r3 ? void 0 : r3.trim()) || void 0 === n3 ? void 0 : n3.replace(/:\s*$/, "")) || "";
              let s = "";
              const l = t3.getAttribute("data-message-author-role");
              l && (s = l);
              let c = (0, o.serializeHTML)(t3);
              c = c.replace(/\u200B/g, "");
              const u = this.document.createElement("div");
              u.appendChild((0, o.parseHTML)(this.document, c)), u.querySelectorAll('h5.sr-only, h6.sr-only, span[data-state="closed"]').forEach(((e4) => e4.remove())), c = (0, o.serializeHTML)(u);
              c = c.replace(/(&ZeroWidthSpace;)?(<span[^>]*?>\s*<a(?=[^>]*?href="([^"]+)")(?=[^>]*?target="_blank")(?=[^>]*?rel="noopener")[^>]*?>[\s\S]*?<\/a>\s*<\/span>)/gi, ((e4, t4, r4, n4) => {
                let o2 = "", a3 = "";
                try {
                  o2 = new URL(n4).hostname.replace(/^www\./, "");
                  const e5 = n4.split("#:~:text=");
                  if (e5.length > 1) {
                    a3 = decodeURIComponent(e5[1]), a3 = a3.replace(/%2C/g, ",");
                    const t5 = a3.split(",");
                    a3 = t5.length > 1 && t5[0].trim() ? ` \u2014 ${t5[0].trim()}...` : t5[0].trim() ? ` \u2014 ${a3.trim()}` : "";
                  }
                } catch (e5) {
                  console.error(`Failed to parse URL: ${n4}`, e5), o2 = n4;
                }
                let i2, s2 = this.footnotes.findIndex(((e5) => e5.url === n4));
                return -1 === s2 ? (this.footnoteCounter++, i2 = this.footnoteCounter, this.footnotes.push({ url: n4, text: `<a href="${n4}">${o2}</a>${a3}` })) : i2 = s2 + 1, `<sup id="fnref:${i2}"><a href="#fn:${i2}">${i2}</a></sup>`;
              })), c = c.replace(/<p[^>]*>\s*<\/p>/g, ""), e3.push({ author: i, content: c.trim(), metadata: { role: s || "unknown" } });
            })), this.cachedMessages = e3, e3) : e3;
          }
          getFootnotes() {
            return this.footnotes;
          }
          getMetadata() {
            const e3 = this.getTitle(), t3 = this.extractMessages();
            return { title: e3, site: "ChatGPT", url: this.url, messageCount: t3.length, description: `ChatGPT conversation with ${t3.length} messages` };
          }
          getTitle() {
            var e3, t3, r3;
            const n3 = null === (e3 = this.document.title) || void 0 === e3 ? void 0 : e3.trim();
            if (n3 && "ChatGPT" !== n3) return n3;
            const o2 = null === (r3 = null === (t3 = this.articles) || void 0 === t3 ? void 0 : t3.item(0)) || void 0 === r3 ? void 0 : r3.querySelector(".text-message");
            if (o2) {
              const e4 = o2.textContent || "";
              return e4.length > 50 ? e4.slice(0, 50) + "..." : e4;
            }
            return "ChatGPT Conversation";
          }
        }
        t2.ChatGPTExtractor = a;
      }, 397(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ClaudeExtractor = void 0;
        const n2 = r2(181), o = r2(639);
        class a extends n2.ConversationExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.articles = e3.querySelectorAll('div[data-testid="user-message"], div[data-testid="assistant-message"], div.font-claude-response');
          }
          canExtract() {
            return !!this.articles && this.articles.length > 0;
          }
          extractMessages() {
            const e3 = [];
            return this.articles ? (this.articles.forEach(((t3) => {
              let r3, n3;
              if (t3.hasAttribute("data-testid")) {
                if ("user-message" !== t3.getAttribute("data-testid")) return;
                r3 = "you", n3 = (0, o.serializeHTML)(t3);
              } else {
                if (!t3.classList.contains("font-claude-response")) return;
                {
                  r3 = "assistant";
                  const e4 = t3.querySelector(".standard-markdown") || t3;
                  n3 = (0, o.serializeHTML)(e4);
                }
              }
              n3 && (n3 = n3.replace(/\u200B/g, "").replace(/<p[^>]*>\s*<\/p>/g, ""), e3.push({ author: "you" === r3 ? "You" : "Claude", content: n3.trim(), metadata: { role: r3 } }));
            })), e3) : e3;
          }
          getMetadata() {
            const e3 = this.getTitle(), t3 = this.extractMessages();
            return { title: e3, site: "Claude", url: this.url, messageCount: t3.length, description: `Claude conversation with ${t3.length} messages` };
          }
          getTitle() {
            var e3, t3, r3, n3, o2;
            const a2 = null === (e3 = this.document.title) || void 0 === e3 ? void 0 : e3.trim();
            if (a2 && "Claude" !== a2) return a2.replace(/ - Claude$/, "");
            const i = null === (r3 = null === (t3 = this.document.querySelector("header .font-tiempos")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim();
            if (i) return i;
            const s = null === (o2 = null === (n3 = this.articles) || void 0 === n3 ? void 0 : n3.item(0)) || void 0 === o2 ? void 0 : o2.querySelector('[data-testid="user-message"]');
            if (s) {
              const e4 = s.textContent || "";
              return e4.length > 50 ? e4.slice(0, 50) + "..." : e4;
            }
            return "Claude Conversation";
          }
        }
        t2.ClaudeExtractor = a;
      }, 732(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.GeminiExtractor = void 0;
        const n2 = r2(181), o = r2(639);
        class a extends n2.ConversationExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.messageCount = null, this.conversationContainers = e3.querySelectorAll("div.conversation-container"), this.footnotes = [];
          }
          canExtract() {
            return !!this.conversationContainers && this.conversationContainers.length > 0;
          }
          extractMessages() {
            this.messageCount = 0;
            const e3 = [];
            return this.conversationContainers ? (this.extractSources(), this.conversationContainers.forEach(((t3) => {
              const r3 = t3.querySelector("user-query");
              if (r3) {
                const t4 = r3.querySelector(".query-text");
                if (t4) {
                  const r4 = (0, o.serializeHTML)(t4);
                  e3.push({ author: "You", content: r4.trim(), metadata: { role: "user" } });
                }
              }
              const n3 = t3.querySelector("model-response");
              if (n3) {
                const t4 = n3.querySelector(".model-response-text .markdown"), r4 = n3.querySelector("#extended-response-markdown-content") || t4;
                if (r4) {
                  let t5 = (0, o.serializeHTML)(r4);
                  const n4 = this.document.createElement("div");
                  n4.appendChild((0, o.parseHTML)(this.document, t5)), n4.querySelectorAll(".table-content").forEach(((e4) => {
                    e4.classList.remove("table-content");
                  })), t5 = (0, o.serializeHTML)(n4), e3.push({ author: "Gemini", content: t5.trim(), metadata: { role: "assistant" } });
                }
              }
            })), this.messageCount = e3.length, e3) : e3;
          }
          extractSources() {
            const e3 = this.document.querySelectorAll("browse-item");
            e3 && e3.length > 0 && e3.forEach(((e4) => {
              var t3, r3, n3, o2;
              const a2 = e4.querySelector("a");
              if (a2 instanceof HTMLAnchorElement) {
                const e5 = a2.href, i = (null === (r3 = null === (t3 = a2.querySelector(".domain")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "", s = (null === (o2 = null === (n3 = a2.querySelector(".title")) || void 0 === n3 ? void 0 : n3.textContent) || void 0 === o2 ? void 0 : o2.trim()) || "";
                e5 && (i || s) && this.footnotes.push({ url: e5, text: s ? `${i}: ${s}` : i });
              }
            }));
          }
          getFootnotes() {
            return this.footnotes;
          }
          getMetadata() {
            var e3;
            const t3 = this.getTitle(), r3 = null !== (e3 = this.messageCount) && void 0 !== e3 ? e3 : this.extractMessages().length;
            return { title: t3, site: "Gemini", url: this.url, messageCount: r3, description: `Gemini conversation with ${r3} messages` };
          }
          getTitle() {
            var e3, t3, r3, n3, o2;
            const a2 = null === (e3 = this.document.title) || void 0 === e3 ? void 0 : e3.trim();
            if (a2 && "Gemini" !== a2 && !a2.includes("Gemini")) return a2;
            const i = null === (r3 = null === (t3 = this.document.querySelector(".title-text")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim();
            if (i) return i;
            const s = null === (o2 = null === (n3 = this.conversationContainers) || void 0 === n3 ? void 0 : n3.item(0)) || void 0 === o2 ? void 0 : o2.querySelector(".query-text");
            if (s) {
              const e4 = s.textContent || "";
              return e4.length > 50 ? e4.slice(0, 50) + "..." : e4;
            }
            return "Gemini Conversation";
          }
        }
        t2.GeminiExtractor = a;
      }, 588(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.GitHubExtractor = void 0;
        const n2 = r2(279), o = r2(639), a = r2(77);
        class i extends n2.BaseExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.isIssue = /\/issues\/\d+/.test(t3), this.isPR = /\/pull\/\d+/.test(t3);
          }
          canExtract() {
            return !!['meta[name="expected-hostname"][content="github.com"]', 'meta[name="octolytics-url"]', 'meta[name="github-keyboard-shortcuts"]', ".js-header-wrapper", "#js-repo-pjax-container"].some(((e3) => null !== this.document.querySelector(e3))) && (this.isIssue ? ['[data-testid="issue-metadata-sticky"]', '[data-testid="issue-title"]'].some(((e3) => null !== this.document.querySelector(e3))) : !!this.isPR && [".pull-discussion-timeline", ".discussion-timeline", ".gh-header-title", ".js-issue-title"].some(((e3) => null !== this.document.querySelector(e3))));
          }
          extract() {
            const e3 = this.extractRepoInfo(), t3 = this.extractNumber(), r3 = this.isPR ? "pull" : "issue", n3 = this.isPR ? this.getPRBody() : null, { content: o2, author: a2, published: i2 } = this.isPR ? this.getPRContent(n3) : this.getIssueContent(), s = this.isPR ? this.extractPRComments(n3) : this.extractComments(), l = this.createContentHtml(o2, s);
            return { content: l, contentHtml: l, extractedContent: { type: r3, number: t3, repository: e3.repo, owner: e3.owner }, variables: { title: this.document.title, author: a2, published: i2, site: `GitHub - ${e3.owner}/${e3.repo}`, description: this.createDescription(l) } };
          }
          createContentHtml(e3, t3) {
            return (0, a.buildContentHtml)("github", e3, t3);
          }
          getIssueContent() {
            const e3 = this.document.querySelector('[data-testid="issue-viewer-issue-container"]');
            if (!e3) return { content: "", author: "", published: "" };
            const t3 = this.extractAuthor(e3, ['a[data-testid="issue-body-header-author"]', ".IssueBodyHeaderAuthor-module__authorLoginLink--_S7aT", ".ActivityHeader-module__AuthorLink--iofTU", 'a[href*="/users/"][data-hovercard-url*="/users/"]', 'a[aria-label*="profile"]']), r3 = e3.querySelector("relative-time"), n3 = (null == r3 ? void 0 : r3.getAttribute("datetime")) || "", o2 = e3.querySelector('[data-testid="issue-body-viewer"] .markdown-body');
            if (!o2) return { content: "", author: t3, published: n3 };
            return { content: this.cleanBodyContent(o2), author: t3, published: n3 };
          }
          extractComments() {
            const e3 = Array.from(this.document.querySelectorAll("[data-wrapper-timeline-id]")), t3 = /* @__PURE__ */ new Set(), r3 = [];
            for (const n3 of e3) {
              const e4 = n3.querySelector(".react-issue-comment");
              if (!e4) continue;
              const o2 = n3.getAttribute("data-wrapper-timeline-id");
              if (!o2 || t3.has(o2)) continue;
              t3.add(o2);
              const a2 = this.extractAuthor(e4, [".ActivityHeader-module__AuthorLink--iofTU", 'a[data-testid="avatar-link"]', 'a[href^="/"][data-hovercard-url*="/users/"]']), i2 = e4.querySelector("relative-time"), s = (null == i2 ? void 0 : i2.getAttribute("datetime")) || "", l = s ? new Date(s).toISOString().split("T")[0] : "", c = e4.querySelector(".markdown-body");
              if (!c) continue;
              const u = this.cleanBodyContent(c);
              u && r3.push({ author: a2, date: l, content: u });
            }
            return (0, a.buildCommentTree)(r3);
          }
          getPRBody() {
            return this.document.querySelector('[id^="pullrequest-"]') || this.document.querySelector(".timeline-comment");
          }
          getPRContent(e3) {
            var t3;
            const r3 = (null == e3 ? void 0 : e3.querySelector(".comment-body.markdown-body")) || this.document.querySelector(".comment-body.markdown-body"), n3 = r3 ? this.cleanBodyContent(r3) : "", o2 = (null == e3 ? void 0 : e3.querySelector(".author")) || this.document.querySelector(".gh-header-meta .author"), a2 = (null === (t3 = null == o2 ? void 0 : o2.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "", i2 = null == e3 ? void 0 : e3.querySelector("relative-time");
            return { content: n3, author: a2, published: (null == i2 ? void 0 : i2.getAttribute("datetime")) || "" };
          }
          extractPRComments(e3) {
            var t3;
            const r3 = Array.from(this.document.querySelectorAll(".timeline-comment, .review-comment")), n3 = [];
            for (const o2 of r3) {
              if (e3 && (o2 === e3 || e3.contains(o2))) continue;
              const r4 = o2.querySelector(".author"), a2 = (null === (t3 = null == r4 ? void 0 : r4.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "", i2 = o2.querySelector("relative-time"), s = (null == i2 ? void 0 : i2.getAttribute("datetime")) || "", l = s ? new Date(s).toISOString().split("T")[0] : "", c = o2.querySelector(".comment-body.markdown-body");
              if (!c) continue;
              const u = this.cleanBodyContent(c);
              u && n3.push({ author: a2, date: l, content: u });
            }
            return (0, a.buildCommentTree)(n3);
          }
          extractAuthor(e3, t3) {
            for (const r3 of t3) {
              const t4 = e3.querySelector(r3);
              if (t4) {
                const e4 = t4.getAttribute("href");
                if (e4) {
                  if (e4.startsWith("/")) return e4.substring(1);
                  if (e4.includes("github.com/")) {
                    const t5 = e4.match(/github\.com\/([^\/\?#]+)/);
                    if (t5 && t5[1]) return t5[1];
                  }
                }
              }
            }
            return "Unknown";
          }
          cleanBodyContent(e3) {
            const t3 = e3.cloneNode(true);
            return t3.querySelectorAll('button, [data-testid*="button"], [data-testid*="menu"]').forEach(((e4) => e4.remove())), t3.querySelectorAll(".js-clipboard-copy, .zeroclipboard-container").forEach(((e4) => e4.remove())), t3.querySelectorAll('div.highlight[class*="highlight-source-"] pre, div.highlight pre').forEach(((e4) => {
              const t4 = e4.parentElement;
              if (!t4) return;
              const r3 = t4.className.match(/highlight-source-(\w+)/), n3 = (null == r3 ? void 0 : r3[1]) || "", o2 = t4.getAttribute("data-snippet-clipboard-copy-content") || e4.textContent || "", a2 = this.document.createElement("code");
              n3 && (a2.setAttribute("class", `language-${n3}`), a2.setAttribute("data-lang", n3)), a2.textContent = o2;
              const i2 = this.document.createElement("pre");
              i2.appendChild(a2), t4.replaceWith(i2);
            })), (0, o.serializeHTML)(t3).trim();
          }
          extractNumber() {
            var e3;
            const t3 = this.url.match(/\/(issues|pull)\/(\d+)/);
            if (t3) return t3[2];
            const r3 = this.document.querySelector("h1"), n3 = null === (e3 = null == r3 ? void 0 : r3.textContent) || void 0 === e3 ? void 0 : e3.match(/#(\d+)/);
            return n3 ? n3[1] : "";
          }
          extractRepoInfo() {
            const e3 = this.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
            if (e3) return { owner: e3[1], repo: e3[2] };
            const t3 = this.document.title.match(/([^\/\s]+)\/([^\/\s]+)/);
            return t3 ? { owner: t3[1], repo: t3[2] } : { owner: "", repo: "" };
          }
          createDescription(e3) {
            var t3;
            if (!e3) return "";
            const r3 = this.document.createElement("div");
            return r3.appendChild((0, o.parseHTML)(this.document, e3)), (null === (t3 = r3.textContent) || void 0 === t3 ? void 0 : t3.trim().slice(0, 140).replace(/\s+/g, " ")) || "";
          }
        }
        t2.GitHubExtractor = i;
      }, 20(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.GrokExtractor = void 0;
        const n2 = r2(181), o = r2(639);
        class a extends n2.ConversationExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.messageContainerSelector = ".relative.group.flex.flex-col.justify-center.w-full", this.messageBubbles = e3.querySelectorAll(this.messageContainerSelector), this.footnotes = [], this.footnoteCounter = 0;
          }
          canExtract() {
            return !!this.messageBubbles && this.messageBubbles.length > 0;
          }
          extractMessages() {
            const e3 = [];
            return this.footnotes = [], this.footnoteCounter = 0, this.messageBubbles && 0 !== this.messageBubbles.length ? (this.messageBubbles.forEach(((t3) => {
              var r3;
              const n3 = t3.classList.contains("items-end"), a2 = t3.classList.contains("items-start");
              if (!n3 && !a2) return;
              const i = t3.querySelector(".message-bubble");
              if (!i) return;
              let s = "", l = "", c = "";
              if (n3) s = i.textContent || "", l = "user", c = "You";
              else if (a2) {
                l = "assistant", c = "Grok";
                const e4 = i.cloneNode(true);
                null === (r3 = e4.querySelector(".relative.border.border-border-l1.bg-surface-base")) || void 0 === r3 || r3.remove(), s = (0, o.serializeHTML)(e4), s = this.processFootnotes(s);
              }
              s.trim() && e3.push({ author: c, content: s.trim(), metadata: { role: l } });
            })), e3) : e3;
          }
          getFootnotes() {
            return this.footnotes;
          }
          getMetadata() {
            var e3;
            const t3 = this.getTitle(), r3 = (null === (e3 = this.messageBubbles) || void 0 === e3 ? void 0 : e3.length) || 0;
            return { title: t3, site: "Grok", url: this.url, messageCount: r3, description: `Grok conversation with ${r3} messages` };
          }
          getTitle() {
            var e3, t3;
            const r3 = null === (e3 = this.document.title) || void 0 === e3 ? void 0 : e3.trim();
            if (r3 && "Grok" !== r3 && !r3.startsWith("Grok by ")) return r3.replace(/\s-\s*Grok$/, "").trim();
            const n3 = this.document.querySelector(`${this.messageContainerSelector}.items-end`);
            if (n3) {
              const e4 = n3.querySelector(".message-bubble");
              if (e4) {
                const r4 = (null === (t3 = e4.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "";
                return r4.length > 50 ? r4.slice(0, 50) + "..." : r4;
              }
            }
            return "Grok Conversation";
          }
          processFootnotes(e3) {
            return e3.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, ((e4, t3, r3) => {
              if (!t3 || t3.startsWith("#") || !t3.match(/^https?:\/\//i)) return e4;
              let n3;
              if (this.footnotes.find(((e5) => e5.url === t3))) n3 = this.footnotes.findIndex(((e5) => e5.url === t3)) + 1;
              else {
                this.footnoteCounter++, n3 = this.footnoteCounter;
                let e5 = t3;
                try {
                  const r4 = new URL(t3).hostname.replace(/^www\./, "");
                  e5 = `<a href="${t3}" target="_blank" rel="noopener noreferrer">${r4}</a>`;
                } catch (r4) {
                  e5 = `<a href="${t3}" target="_blank" rel="noopener noreferrer">${t3}</a>`, console.warn(`GrokExtractor: Could not parse URL for footnote: ${t3}`);
                }
                this.footnotes.push({ url: t3, text: e5 });
              }
              return `${r3}<sup id="fnref:${n3}" class="footnote-ref"><a href="#fn:${n3}" class="footnote-link">${n3}</a></sup>`;
            }));
          }
        }
        t2.GrokExtractor = a;
      }, 458(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.HackerNewsExtractor = void 0;
        const n2 = r2(279), o = r2(639), a = r2(77);
        class i extends n2.BaseExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.mainPost = e3.querySelector(".fatitem"), this.isCommentPage = this.detectCommentPage(), this.mainComment = this.isCommentPage ? this.findMainComment() : null;
          }
          detectCommentPage() {
            var e3, t3;
            return !!(null === (e3 = this.mainPost) || void 0 === e3 ? void 0 : e3.querySelector(".onstory")) && !(null === (t3 = this.mainPost) || void 0 === t3 ? void 0 : t3.querySelector(".titleline"));
          }
          findMainComment() {
            var e3;
            return (null === (e3 = this.mainPost) || void 0 === e3 ? void 0 : e3.querySelector("tr.athing")) || null;
          }
          canExtract() {
            return !!this.mainPost;
          }
          extract() {
            const e3 = this.getPostContent(), t3 = this.extractComments(), r3 = this.createContentHtml(e3, t3), n3 = this.getPostTitle(), o2 = this.getPostAuthor(), a2 = this.createDescription(), i2 = this.getPostDate();
            return { content: r3, contentHtml: r3, extractedContent: { postId: this.getPostId(), postAuthor: o2 }, variables: { title: n3, author: o2, site: "Hacker News", description: a2, published: i2 } };
          }
          createContentHtml(e3, t3) {
            return (0, a.buildContentHtml)("hackernews", e3, t3);
          }
          getPostContent() {
            var e3, t3, r3, n3;
            if (!this.mainPost) return "";
            if (this.isCommentPage && this.mainComment) {
              const n4 = (null === (e3 = this.mainComment.querySelector(".hnuser")) || void 0 === e3 ? void 0 : e3.textContent) || "[deleted]", i3 = this.mainComment.querySelector(".commtext"), s2 = i3 ? (0, o.serializeHTML)(i3) : "", l2 = this.mainComment.querySelector(".age"), c2 = ((null == l2 ? void 0 : l2.getAttribute("title")) || "").split("T")[0] || "", u = (null === (r3 = null === (t3 = this.mainComment.querySelector(".score")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
              return (0, a.buildComment)({ author: n4, date: c2, content: s2, score: u || void 0 });
            }
            const i2 = this.mainPost.querySelector("tr.athing"), s = (null == i2 || i2.nextElementSibling, (null === (n3 = null == i2 ? void 0 : i2.querySelector(".titleline a")) || void 0 === n3 ? void 0 : n3.getAttribute("href")) || "");
            let l = "";
            s && (l += `<p><a href="${s}" target="_blank">${s}</a></p>`);
            const c = this.mainPost.querySelector(".toptext");
            return c && (l += `<div class="post-text">${(0, o.serializeHTML)(c)}</div>`), l;
          }
          extractComments() {
            const e3 = Array.from(this.document.querySelectorAll("tr.comtr"));
            return this.processComments(e3);
          }
          processComments(e3) {
            var t3, r3, n3, i2;
            const s = [], l = /* @__PURE__ */ new Set();
            for (const a2 of e3) {
              const e4 = a2.getAttribute("id");
              if (!e4 || l.has(e4)) continue;
              l.add(e4);
              const c = (null === (t3 = a2.querySelector(".ind img")) || void 0 === t3 ? void 0 : t3.getAttribute("width")) || "0", u = parseInt(c) / 40, d = a2.querySelector(".commtext"), h = (null === (r3 = a2.querySelector(".hnuser")) || void 0 === r3 ? void 0 : r3.textContent) || "[deleted]", m = a2.querySelector(".age"), p = (null === (i2 = null === (n3 = a2.querySelector(".score")) || void 0 === n3 ? void 0 : n3.textContent) || void 0 === i2 ? void 0 : i2.trim()) || "";
              if (!d) continue;
              const f = `https://news.ycombinator.com/item?id=${e4}`, g = ((null == m ? void 0 : m.getAttribute("title")) || "").split("T")[0] || "";
              s.push({ author: h, date: g, content: (0, o.serializeHTML)(d), depth: u, score: p || void 0, url: f });
            }
            return (0, a.buildCommentTree)(s);
          }
          getPostId() {
            const e3 = this.url.match(/id=(\d+)/);
            return (null == e3 ? void 0 : e3[1]) || "";
          }
          getPostTitle() {
            var e3, t3, r3, n3, o2;
            if (this.isCommentPage && this.mainComment) {
              const r4 = (null === (e3 = this.mainComment.querySelector(".hnuser")) || void 0 === e3 ? void 0 : e3.textContent) || "[deleted]", n4 = (null === (t3 = this.mainComment.querySelector(".commtext")) || void 0 === t3 ? void 0 : t3.textContent) || "";
              return `Comment by ${r4}: ${n4.trim().slice(0, 50) + (n4.length > 50 ? "..." : "")}`;
            }
            return (null === (o2 = null === (n3 = null === (r3 = this.mainPost) || void 0 === r3 ? void 0 : r3.querySelector(".titleline")) || void 0 === n3 ? void 0 : n3.textContent) || void 0 === o2 ? void 0 : o2.trim()) || "";
          }
          getPostAuthor() {
            var e3, t3, r3;
            return (null === (r3 = null === (t3 = null === (e3 = this.mainPost) || void 0 === e3 ? void 0 : e3.querySelector(".hnuser")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
          }
          createDescription() {
            const e3 = this.getPostTitle(), t3 = this.getPostAuthor();
            return this.isCommentPage ? `Comment by ${t3} on Hacker News` : `${e3} - by ${t3} on Hacker News`;
          }
          getPostDate() {
            if (!this.mainPost) return "";
            const e3 = this.mainPost.querySelector(".age");
            return ((null == e3 ? void 0 : e3.getAttribute("title")) || "").split("T")[0] || "";
          }
        }
        t2.HackerNewsExtractor = i;
      }, 959(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__awaiter || function(e3, t3, r3, n3) {
          return new (r3 || (r3 = Promise))((function(o2, a2) {
            function i2(e4) {
              try {
                l(n3.next(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function s2(e4) {
              try {
                l(n3.throw(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function l(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i2, s2);
            }
            l((n3 = n3.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.RedditExtractor = void 0;
        const o = r2(279), a = r2(639), i = r2(77);
        class s extends o.BaseExtractor {
          constructor(e3, t3) {
            super(e3, t3), this.shredditPost = e3.querySelector("shreddit-post"), this.isOldReddit = !!e3.querySelector(".thing.link");
          }
          canExtract() {
            return !!this.shredditPost || this.isOldReddit;
          }
          canExtractAsync() {
            return this.isCommentsPage() && !this.isOldReddit;
          }
          isCommentsPage() {
            return /\/r\/.+\/comments\//.test(this.url);
          }
          extractAsync() {
            return n2(this, void 0, void 0, (function* () {
              var e3, t3;
              const r3 = new URL(this.url);
              r3.hostname = "old.reddit.com";
              const n3 = yield fetch(r3.toString(), { headers: { "User-Agent": "Mozilla/5.0 (compatible; Defuddle/1.0)" } });
              if (!n3.ok) throw new Error(`Failed to fetch old.reddit.com: ${n3.status}`);
              const o2 = yield n3.text(), a2 = null !== (t3 = null === (e3 = this.document.defaultView) || void 0 === e3 ? void 0 : e3.DOMParser) && void 0 !== t3 ? t3 : "undefined" != typeof DOMParser ? DOMParser : null;
              if (!a2) throw new Error("DOMParser is not available in this environment");
              const i2 = new a2().parseFromString(o2, "text/html");
              return this.extractOldReddit(i2);
            }));
          }
          extract() {
            var e3, t3;
            if (this.isOldReddit) return this.extractOldReddit(this.document);
            const r3 = this.document.querySelectorAll("shreddit-comment").length > 0;
            if (this.isCommentsPage() && !r3) return { content: "", contentHtml: "" };
            const n3 = this.getPostContent(), o2 = this.extractComments(), a2 = this.createContentHtml(n3, o2), i2 = (null === (t3 = null === (e3 = this.document.querySelector("h1")) || void 0 === e3 ? void 0 : e3.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "", s2 = this.getSubreddit(), l = this.getPostAuthor(), c = this.createDescription(n3);
            return { content: a2, contentHtml: a2, extractedContent: { postId: this.getPostId(), subreddit: s2, postAuthor: l }, variables: { title: i2, author: l, site: `r/${s2}`, description: c } };
          }
          extractOldReddit(e3) {
            var t3, r3;
            const n3 = e3.querySelector(".thing.link"), o2 = (null === (r3 = null === (t3 = null == n3 ? void 0 : n3.querySelector("a.title")) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "", s2 = (null == n3 ? void 0 : n3.getAttribute("data-author")) || "", l = (null == n3 ? void 0 : n3.getAttribute("data-subreddit")) || "", c = null == n3 ? void 0 : n3.querySelector(".usertext-body .md"), u = c ? (0, a.serializeHTML)(c) : "", d = e3.querySelector(".commentarea .sitetable"), h = d ? this.collectOldRedditComments(d) : [], m = h.length > 0 ? (0, i.buildCommentTree)(h) : "", p = this.createContentHtml(u, m), f = this.createDescription(u);
            return { content: p, contentHtml: p, extractedContent: { postId: this.getPostId(), subreddit: l, postAuthor: s2 }, variables: { title: o2, author: s2, site: `r/${l}`, description: f } };
          }
          getPostContent() {
            var e3, t3, r3;
            const n3 = null === (e3 = this.shredditPost) || void 0 === e3 ? void 0 : e3.querySelector('[slot="text-body"]');
            return (n3 ? (0, a.serializeHTML)(n3) : "") + ((null === (r3 = null === (t3 = this.shredditPost) || void 0 === t3 ? void 0 : t3.querySelector("#post-image")) || void 0 === r3 ? void 0 : r3.outerHTML) || "");
          }
          createContentHtml(e3, t3) {
            return (0, i.buildContentHtml)("reddit", e3, t3);
          }
          extractComments() {
            const e3 = Array.from(this.document.querySelectorAll("shreddit-comment"));
            return this.processComments(e3);
          }
          getPostId() {
            const e3 = this.url.match(/comments\/([a-zA-Z0-9]+)/);
            return (null == e3 ? void 0 : e3[1]) || "";
          }
          getSubreddit() {
            const e3 = this.url.match(/\/r\/([^/]+)/);
            return (null == e3 ? void 0 : e3[1]) || "";
          }
          getPostAuthor() {
            var e3;
            return (null === (e3 = this.shredditPost) || void 0 === e3 ? void 0 : e3.getAttribute("author")) || "";
          }
          createDescription(e3) {
            var t3;
            if (!e3) return "";
            const r3 = this.document.createElement("div");
            return r3.appendChild((0, a.parseHTML)(this.document, e3)), (null === (t3 = r3.textContent) || void 0 === t3 ? void 0 : t3.trim().slice(0, 140).replace(/\s+/g, " ")) || "";
          }
          collectOldRedditComments(e3, t3 = 0) {
            var r3, n3;
            const o2 = [], i2 = Array.from(e3.querySelectorAll(":scope > .thing.comment"));
            for (const e4 of i2) {
              const i3 = e4.getAttribute("data-author") || "", s2 = e4.getAttribute("data-permalink") || "", l = (null === (n3 = null === (r3 = e4.querySelector(".entry .tagline .score.unvoted")) || void 0 === r3 ? void 0 : r3.textContent) || void 0 === n3 ? void 0 : n3.trim()) || "", c = e4.querySelector(".entry .tagline time[datetime]"), u = (null == c ? void 0 : c.getAttribute("datetime")) || "", d = u ? new Date(u).toISOString().split("T")[0] : "", h = e4.querySelector(".entry .usertext-body .md"), m = h ? (0, a.serializeHTML)(h) : "";
              o2.push({ author: i3, date: d, content: m, depth: t3, score: l || void 0, url: s2 ? `https://reddit.com${s2}` : void 0 });
              const p = e4.querySelector(".child > .sitetable");
              p && o2.push(...this.collectOldRedditComments(p, t3 + 1));
            }
            return o2;
          }
          processComments(e3) {
            var t3;
            const r3 = [];
            for (const n3 of e3) {
              const e4 = parseInt(n3.getAttribute("depth") || "0"), o2 = n3.getAttribute("author") || "", i2 = n3.getAttribute("score") || "0", s2 = n3.getAttribute("permalink") || "", l = n3.querySelector('[slot="comment"]'), c = l ? (0, a.serializeHTML)(l) : "", u = n3.getAttribute("created") || (null === (t3 = n3.querySelector("time")) || void 0 === t3 ? void 0 : t3.getAttribute("datetime")) || "", d = u ? new Date(u).toISOString().split("T")[0] : "";
              r3.push({ author: o2, date: d, content: c, depth: e4, score: `${i2} points`, url: s2 ? `https://reddit.com${s2}` : void 0 });
            }
            return (0, i.buildCommentTree)(r3);
          }
        }
        t2.RedditExtractor = s;
      }, 248(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.TwitterExtractor = void 0;
        const n2 = r2(279), o = r2(639);
        class a extends n2.BaseExtractor {
          constructor(e3, t3) {
            var r3;
            super(e3, t3), this.mainTweet = null, this.threadTweets = [];
            const n3 = e3.querySelector('[aria-label="Timeline: Conversation"]');
            if (!n3) {
              const t4 = e3.querySelector('article[data-testid="tweet"]');
              return void (t4 && (this.mainTweet = t4));
            }
            let o2 = Array.from(n3.querySelectorAll('article[data-testid="tweet"]'));
            const a2 = null === (r3 = n3.querySelector("section, h2")) || void 0 === r3 ? void 0 : r3.parentElement;
            if (a2) {
              const e4 = o2.findIndex(((e5) => a2.compareDocumentPosition(e5) & Node.DOCUMENT_POSITION_FOLLOWING));
              -1 !== e4 && (o2 = o2.slice(0, e4));
            }
            this.mainTweet = o2[0] || null, this.threadTweets = o2.slice(1);
          }
          canExtract() {
            return !!this.mainTweet;
          }
          extract() {
            const e3 = this.extractTweet(this.mainTweet), t3 = this.threadTweets.map(((e4) => this.extractTweet(e4))).join("\n<hr>\n"), r3 = `
			<div class="tweet-thread">
				<div class="main-tweet">
					${e3}
				</div>
				${t3 ? `
					<hr>
					<div class="thread-tweets">
						${t3}
					</div>
				` : ""}
			</div>
		`.trim(), n3 = this.getTweetId(), o2 = this.getTweetAuthor();
            return { content: r3, contentHtml: r3, extractedContent: { tweetId: n3, tweetAuthor: o2 }, variables: { title: `Thread by ${o2}`, author: o2, site: "X (Twitter)", description: this.createDescription(this.mainTweet) } };
          }
          formatTweetText(e3) {
            if (!e3) return "";
            const t3 = this.document.createElement("div");
            t3.appendChild((0, o.parseHTML)(this.document, e3)), t3.querySelectorAll("a").forEach(((e4) => {
              var t4;
              const r3 = (null === (t4 = e4.textContent) || void 0 === t4 ? void 0 : t4.trim()) || "";
              e4.replaceWith(r3);
            })), t3.querySelectorAll("span, div").forEach(((e4) => {
              e4.replaceWith(...Array.from(e4.childNodes));
            }));
            return (0, o.serializeHTML)(t3).split("\n").map(((e4) => e4.trim())).filter(((e4) => e4)).map(((e4) => `<p>${e4}</p>`)).join("\n");
          }
          extractTweet(e3) {
            var t3, r3;
            if (!e3) return "";
            const n3 = e3.cloneNode(true);
            n3.querySelectorAll('img[src*="/emoji/"]').forEach(((e4) => {
              if ("img" === e4.tagName.toLowerCase() && e4.getAttribute("alt")) {
                const t4 = e4.getAttribute("alt");
                t4 && e4.replaceWith(t4);
              }
            }));
            const a2 = n3.querySelector('[data-testid="tweetText"]'), i = a2 ? (0, o.serializeHTML)(a2) : "", s = this.formatTweetText(i), l = this.extractImages(e3), c = this.extractUserInfo(e3), u = null === (r3 = null === (t3 = e3.querySelector('[aria-labelledby*="id__"]')) || void 0 === t3 ? void 0 : t3.querySelector('[data-testid="User-Name"]')) || void 0 === r3 ? void 0 : r3.closest('[aria-labelledby*="id__"]'), d = u ? this.extractTweet(u) : "";
            return `
			<div class="tweet">
				<div class="tweet-header">
					<span class="tweet-author"><strong>${c.fullName}</strong> <span class="tweet-handle">${c.handle}</span></span>
					${c.date ? `<a href="${c.permalink}" class="tweet-date">${c.date}</a>` : ""}
				</div>
				${s ? `<div class="tweet-text">${s}</div>` : ""}
				${l.length ? `
					<div class="tweet-media">
						${l.join("\n")}
					</div>
				` : ""}
				${d ? `
					<blockquote class="quoted-tweet">
						${d}
					</blockquote>
				` : ""}
			</div>
		`.trim();
          }
          extractUserInfo(e3) {
            var t3, r3, n3, o2, a2, i, s, l, c;
            const u = e3.querySelector('[data-testid="User-Name"]');
            if (!u) return { fullName: "", handle: "", date: "", permalink: "" };
            const d = u.querySelectorAll("a");
            let h = (null === (r3 = null === (t3 = null == d ? void 0 : d[0]) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "", m = (null === (o2 = null === (n3 = null == d ? void 0 : d[1]) || void 0 === n3 ? void 0 : n3.textContent) || void 0 === o2 ? void 0 : o2.trim()) || "";
            h && m || (h = (null === (i = null === (a2 = u.querySelector('span[style*="color: rgb(15, 20, 25)"] span')) || void 0 === a2 ? void 0 : a2.textContent) || void 0 === i ? void 0 : i.trim()) || "", m = (null === (l = null === (s = u.querySelector('span[style*="color: rgb(83, 100, 113)"]')) || void 0 === s ? void 0 : s.textContent) || void 0 === l ? void 0 : l.trim()) || "");
            const p = e3.querySelector("time"), f = (null == p ? void 0 : p.getAttribute("datetime")) || "";
            return { fullName: h, handle: m, date: f ? new Date(f).toISOString().split("T")[0] : "", permalink: (null === (c = null == p ? void 0 : p.closest("a")) || void 0 === c ? void 0 : c.href) || "" };
          }
          extractImages(e3) {
            var t3, r3;
            const n3 = ['[data-testid="tweetPhoto"]', '[data-testid="tweet-image"]', 'img[src*="media"]'], o2 = [], a2 = null === (r3 = null === (t3 = e3.querySelector('[aria-labelledby*="id__"]')) || void 0 === t3 ? void 0 : t3.querySelector('[data-testid="User-Name"]')) || void 0 === r3 ? void 0 : r3.closest('[aria-labelledby*="id__"]');
            for (const t4 of n3) {
              e3.querySelectorAll(t4).forEach(((e4) => {
                var t5, r4;
                if (!(null == a2 ? void 0 : a2.contains(e4)) && "img" === e4.tagName.toLowerCase() && e4.getAttribute("alt")) {
                  const n4 = (null === (t5 = e4.getAttribute("src")) || void 0 === t5 ? void 0 : t5.replace(/&name=\w+$/, "&name=large")) || "", a3 = (null === (r4 = e4.getAttribute("alt")) || void 0 === r4 ? void 0 : r4.replace(/\s+/g, " ").trim()) || "";
                  o2.push(`<img src="${n4}" alt="${a3}" />`);
                }
              }));
            }
            return o2;
          }
          getTweetId() {
            const e3 = this.url.match(/status\/(\d+)/);
            return (null == e3 ? void 0 : e3[1]) || "";
          }
          getTweetAuthor() {
            var e3, t3, r3;
            const n3 = null === (e3 = this.mainTweet) || void 0 === e3 ? void 0 : e3.querySelector('[data-testid="User-Name"]'), o2 = null == n3 ? void 0 : n3.querySelectorAll("a"), a2 = (null === (r3 = null === (t3 = null == o2 ? void 0 : o2[1]) || void 0 === t3 ? void 0 : t3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
            return a2.startsWith("@") ? a2 : `@${a2}`;
          }
          createDescription(e3) {
            var t3;
            if (!e3) return "";
            return ((null === (t3 = e3.querySelector('[data-testid="tweetText"]')) || void 0 === t3 ? void 0 : t3.textContent) || "").trim().slice(0, 140).replace(/\s+/g, " ");
          }
        }
        t2.TwitterExtractor = a;
      }, 64(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.XArticleExtractor = void 0;
        const n2 = r2(279), o = r2(639), a = '[data-testid="twitterArticleRichTextView"]', i = '[data-testid="twitter-article-title"]', s = '[itemprop="author"]', l = 'meta[itemprop="name"]', c = 'meta[itemprop="additionalName"]', u = '[data-testid="tweetPhoto"] img', d = ".longform-unstyled, .public-DraftStyleDefault-block", h = 'span[style*="font-weight: bold"]', m = "[data-offset-key]", p = '[data-testid="simpleTweet"]', f = '[data-testid="tweetText"]', g = '[data-testid="User-Name"]', b = '[data-testid="markdown-code-block"]';
        class x extends n2.BaseExtractor {
          constructor(e3, t3, r3) {
            super(e3, t3, r3), this.articleContainer = e3.querySelector(a);
          }
          canExtract() {
            return !!this.articleContainer;
          }
          extract() {
            const e3 = this.extractTitle(), t3 = this.extractAuthor(), r3 = this.extractContent(), n3 = this.createDescription();
            return { content: r3, contentHtml: r3, extractedContent: { articleId: this.getArticleId() }, variables: { title: e3, author: t3, site: "X (Twitter)", description: n3 } };
          }
          extractTitle() {
            var e3;
            const t3 = this.document.querySelector(i);
            return (null === (e3 = null == t3 ? void 0 : t3.textContent) || void 0 === e3 ? void 0 : e3.trim()) || "Untitled X Article";
          }
          extractAuthor() {
            var e3, t3;
            const r3 = this.document.querySelector(s);
            if (!r3) return this.getAuthorFromUrl();
            const n3 = null === (e3 = r3.querySelector(l)) || void 0 === e3 ? void 0 : e3.getAttribute("content"), o2 = null === (t3 = r3.querySelector(c)) || void 0 === t3 ? void 0 : t3.getAttribute("content");
            return n3 && o2 ? `${n3} (@${o2})` : n3 || o2 || this.getAuthorFromUrl();
          }
          getAuthorFromUrl() {
            const e3 = this.url.match(/\/([a-zA-Z][a-zA-Z0-9_]{0,14})\/article\/\d+/);
            return e3 ? `@${e3[1]}` : this.getAuthorFromOgTitle();
          }
          getAuthorFromOgTitle() {
            var e3;
            const t3 = ((null === (e3 = this.document.querySelector('meta[property="og:title"]')) || void 0 === e3 ? void 0 : e3.getAttribute("content")) || "").match(/^(?:\(\d+\)\s+)?(.+?)\s+on\s+X\s*:/);
            return t3 ? t3[1].trim() : "Unknown";
          }
          getArticleId() {
            const e3 = this.url.match(/article\/(\d+)/);
            return e3 ? e3[1] : "";
          }
          extractContent() {
            if (!this.articleContainer) return "";
            const e3 = this.articleContainer.cloneNode(true);
            return this.cleanContent(e3), `<article class="x-article">${(0, o.serializeHTML)(e3)}</article>`;
          }
          cleanContent(e3) {
            const t3 = e3.ownerDocument || this.document;
            this.convertEmbeddedTweets(e3, t3), this.convertCodeBlocks(e3, t3), this.convertHeaders(e3, t3), this.unwrapLinkedImages(e3, t3), this.upgradeImageQuality(e3), this.convertBoldSpans(e3, t3), this.convertDraftParagraphs(e3, t3), this.removeDraftAttributes(e3);
          }
          convertEmbeddedTweets(e3, t3) {
            e3.querySelectorAll(p).forEach(((e4) => {
              var r3, n3, o2, a2, i2;
              const s2 = t3.createElement("blockquote");
              s2.className = "embedded-tweet";
              const l2 = e4.querySelector(g), c2 = null == l2 ? void 0 : l2.querySelectorAll("a"), u2 = (null === (n3 = null === (r3 = null == c2 ? void 0 : c2[0]) || void 0 === r3 ? void 0 : r3.textContent) || void 0 === n3 ? void 0 : n3.trim()) || "", d2 = (null === (a2 = null === (o2 = null == c2 ? void 0 : c2[1]) || void 0 === o2 ? void 0 : o2.textContent) || void 0 === a2 ? void 0 : a2.trim()) || "", h2 = e4.querySelector(f), m2 = (null === (i2 = null == h2 ? void 0 : h2.textContent) || void 0 === i2 ? void 0 : i2.trim()) || "";
              if (u2 || d2) {
                const e5 = t3.createElement("cite");
                e5.textContent = d2 ? `${u2} ${d2}` : u2, s2.appendChild(e5);
              }
              if (m2) {
                const e5 = t3.createElement("p");
                e5.textContent = m2, s2.appendChild(e5);
              }
              e4.replaceWith(s2);
            }));
          }
          convertCodeBlocks(e3, t3) {
            e3.querySelectorAll(b).forEach(((e4) => {
              var r3;
              const n3 = e4.querySelector("pre"), o2 = e4.querySelector("code");
              if (!n3 || !o2) return;
              let a2 = "";
              const i2 = o2.className.match(/language-(\w+)/);
              if (i2) a2 = i2[1];
              else {
                const t4 = e4.querySelector("span");
                a2 = (null === (r3 = null == t4 ? void 0 : t4.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
              }
              const s2 = t3.createElement("pre"), l2 = t3.createElement("code");
              a2 && (l2.setAttribute("data-lang", a2), l2.className = `language-${a2}`), l2.textContent = o2.textContent || "", s2.appendChild(l2), e4.replaceWith(s2);
            }));
          }
          convertHeaders(e3, t3) {
            e3.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(((e4) => {
              var r3;
              const n3 = e4.tagName.toLowerCase(), o2 = (null === (r3 = e4.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "";
              if (!o2) return;
              const a2 = t3.createElement(n3);
              a2.textContent = o2, e4.replaceWith(a2);
            }));
          }
          unwrapLinkedImages(e3, t3) {
            e3.querySelectorAll(u).forEach(((r3) => {
              var n3;
              const o2 = r3.closest("a");
              if (!o2 || !e3.contains(o2)) return;
              let a2 = r3.getAttribute("src") || "";
              const i2 = (null === (n3 = r3.getAttribute("alt")) || void 0 === n3 ? void 0 : n3.replace(/\s+/g, " ").trim()) || "Image";
              a2 = a2.includes("&name=") ? a2.replace(/&name=\w+/, "&name=large") : a2.includes("?") ? `${a2}&name=large` : `${a2}?name=large`;
              const s2 = t3.createElement("img");
              s2.setAttribute("src", a2), s2.setAttribute("alt", i2), o2.replaceWith(s2);
            }));
          }
          upgradeImageQuality(e3) {
            e3.querySelectorAll(u).forEach(((e4) => {
              const t3 = e4.getAttribute("src");
              t3 && (t3.includes("&name=") ? e4.setAttribute("src", t3.replace(/&name=\w+/, "&name=large")) : t3.includes("?") ? e4.setAttribute("src", `${t3}&name=large`) : e4.setAttribute("src", `${t3}?name=large`));
            }));
          }
          convertDraftParagraphs(e3, t3) {
            e3.querySelectorAll(d).forEach(((e4) => {
              const r3 = t3.createElement("p"), n3 = (e5) => {
                if (3 === e5.nodeType) r3.appendChild(t3.createTextNode(e5.textContent || ""));
                else if (1 === e5.nodeType) {
                  const o2 = e5, a2 = o2.tagName.toLowerCase();
                  if ("strong" === a2) {
                    const e6 = t3.createElement("strong");
                    e6.textContent = o2.textContent || "", r3.appendChild(e6);
                  } else if ("a" === a2) {
                    const e6 = t3.createElement("a");
                    e6.setAttribute("href", o2.getAttribute("href") || ""), e6.textContent = o2.textContent || "", r3.appendChild(e6);
                  } else if ("code" === a2) {
                    const e6 = t3.createElement("code");
                    e6.textContent = o2.textContent || "", r3.appendChild(e6);
                  } else o2.childNodes.forEach(((e6) => n3(e6)));
                }
              };
              e4.childNodes.forEach(((e5) => n3(e5))), e4.replaceWith(r3);
            }));
          }
          convertBoldSpans(e3, t3) {
            e3.querySelectorAll(h).forEach(((e4) => {
              const r3 = t3.createElement("strong");
              r3.textContent = e4.textContent || "", e4.replaceWith(r3);
            }));
          }
          removeDraftAttributes(e3) {
            e3.querySelectorAll(m).forEach(((e4) => {
              e4.removeAttribute("data-offset-key");
            }));
          }
          createDescription() {
            var e3, t3;
            const r3 = (null === (t3 = null === (e3 = this.articleContainer) || void 0 === e3 ? void 0 : e3.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "";
            return r3.slice(0, 140) + (r3.length > 140 ? "..." : "");
          }
        }
        t2.XArticleExtractor = x;
      }, 666(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__awaiter || function(e3, t3, r3, n3) {
          return new (r3 || (r3 = Promise))((function(o2, a2) {
            function i2(e4) {
              try {
                l(n3.next(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function s(e4) {
              try {
                l(n3.throw(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function l(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i2, s);
            }
            l((n3 = n3.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.XOembedExtractor = void 0;
        const o = r2(279), a = r2(639);
        class i extends o.BaseExtractor {
          canExtract() {
            return false;
          }
          extract() {
            return { content: "", contentHtml: "" };
          }
          canExtractAsync() {
            return /\/(status|article)\/\d+/.test(this.url);
          }
          extractAsync() {
            return n2(this, void 0, void 0, (function* () {
              const e3 = yield this.tryExtractFxTwitter();
              return e3 || this.extractOembed();
            }));
          }
          extractOembed() {
            return n2(this, void 0, void 0, (function* () {
              var e3;
              const t3 = `https://publish.twitter.com/oembed?url=${encodeURIComponent(this.url)}&omit_script=true`, r3 = yield fetch(t3);
              if (!r3.ok) throw new Error(`oEmbed request failed: ${r3.status}`);
              const n3 = yield r3.json(), o2 = this.document.createElement("div");
              o2.appendChild((0, a.parseHTML)(this.document, n3.html));
              const i2 = o2.querySelector("blockquote"), s = (null == i2 ? void 0 : i2.querySelectorAll("p")) || [], l = Array.from(s).map(((e4) => `<p>${(0, a.serializeHTML)(e4)}</p>`)).join("\n"), c = n3.author_url ? `@${n3.author_url.split("/").pop()}` : "", u = null == i2 ? void 0 : i2.querySelector("a:last-child"), d = (null === (e3 = null == u ? void 0 : u.textContent) || void 0 === e3 ? void 0 : e3.trim()) || "", h = (null == u ? void 0 : u.getAttribute("href")) || this.url, m = (0, a.escapeHtml)(n3.author_name), p = (0, a.escapeHtml)(c), f = (0, a.escapeHtml)(d), g = (0, a.escapeHtml)(h), b = `
			<div class="tweet-thread">
				<div class="main-tweet">
					<div class="tweet">
						<div class="tweet-header">
							<span class="tweet-author"><strong>${m}</strong> <span class="tweet-handle">${p}</span></span>
							${d ? `<a href="${g}" class="tweet-date">${f}</a>` : ""}
						</div>
						${l ? `<div class="tweet-text">${l}</div>` : ""}
					</div>
				</div>
			</div>
		`.trim();
              return { content: b, contentHtml: b, variables: { title: `Post by ${c || n3.author_name}`, author: c || n3.author_name, site: "X (Twitter)" } };
            }));
          }
          tryExtractFxTwitter() {
            return n2(this, void 0, void 0, (function* () {
              var e3, t3;
              const r3 = this.url.match(/\/([a-zA-Z][a-zA-Z0-9_]{0,14})\/(status|article)\/(\d+)/);
              if (!r3) return null;
              try {
                const n3 = yield this.fetchFxTwitter(r3[1], r3[3]);
                return (null === (e3 = n3.tweet) || void 0 === e3 ? void 0 : e3.article) ? this.buildArticleResult(n3) : (null === (t3 = n3.tweet) || void 0 === t3 ? void 0 : t3.text) ? this.buildTweetResult(n3) : null;
              } catch (e4) {
                return null;
              }
            }));
          }
          fetchFxTwitter(e3, t3) {
            return n2(this, void 0, void 0, (function* () {
              const r3 = `https://api.fxtwitter.com/${e3}/status/${t3}`, n3 = yield fetch(r3, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Defuddle/1.0; +https://defuddle.md)" } });
              if (!n3.ok) throw new Error(`FxTwitter API request failed: ${n3.status}`);
              return n3.json();
            }));
          }
          buildArticleResult(e3) {
            const t3 = e3.tweet.article, { blocks: r3, entityMap: n3 } = t3.content, o2 = this.renderArticle(r3, n3, t3.cover_media), a2 = `@${e3.tweet.author.screen_name}`;
            return { content: o2, contentHtml: o2, variables: { title: t3.title, author: a2, site: "X (Twitter)", description: t3.preview_text } };
          }
          buildTweetResult(e3) {
            const t3 = e3.tweet, r3 = `@${t3.author.screen_name}`, n3 = this.renderTweet(t3);
            return { content: n3, contentHtml: n3, variables: { title: `Post by ${r3}`, author: r3, site: "X (Twitter)" } };
          }
          renderTweet(e3) {
            var t3, r3, n3;
            const o2 = (null === (t3 = e3.raw_text) || void 0 === t3 ? void 0 : t3.text) || e3.text, i2 = ((null === (r3 = e3.raw_text) || void 0 === r3 ? void 0 : r3.facets) || []).filter(((e4) => "media" !== e4.type)), s = o2.split(/\n\n+/);
            let l = 0;
            const c = [];
            for (const e4 of s) {
              const t4 = o2.indexOf(e4, l), r4 = t4 + e4.length;
              l = r4;
              const n4 = e4.trimStart().startsWith(">");
              let a2 = n4 ? e4.trimStart().slice(1).trimStart() : e4;
              const s2 = n4 ? t4 + (e4.length - e4.trimStart().length) + 1 + (e4.trimStart().slice(1).length - e4.trimStart().slice(1).trimStart().length) : t4, u2 = this.applyFacets(a2, s2, r4, i2).replace(/\n/g, "<br>");
              n4 ? c.push(`<blockquote><p>${u2}</p></blockquote>`) : u2.trim() && c.push(`<p>${u2}</p>`);
            }
            if (null === (n3 = e3.media) || void 0 === n3 ? void 0 : n3.photos) for (const t4 of e3.media.photos) c.push(`<img src="${(0, a.escapeHtml)(t4.url)}" alt="">`);
            const u = (0, a.escapeHtml)(`@${e3.author.screen_name}`);
            return `<div class="tweet-thread"><div class="main-tweet"><div class="tweet"><div class="tweet-header"><span class="tweet-author"><strong>${(0, a.escapeHtml)(e3.author.name)}</strong> <span class="tweet-handle">${u}</span></span></div><div class="tweet-text">${c.join("\n")}</div></div></div></div>`;
          }
          applyMarkers(e3, t3) {
            if (0 === t3.length) return (0, a.escapeHtml)(e3);
            t3.sort(((e4, t4) => e4.offset !== t4.offset ? e4.offset - t4.offset : "close" === e4.type && "open" === t4.type ? -1 : "open" === e4.type && "close" === t4.type ? 1 : 0));
            let r3 = "", n3 = 0;
            for (const o2 of t3) o2.offset > n3 && (r3 += (0, a.escapeHtml)(e3.slice(n3, o2.offset))), r3 += o2.tag, n3 = o2.offset;
            return n3 < e3.length && (r3 += (0, a.escapeHtml)(e3.slice(n3))), r3;
          }
          applyFacets(e3, t3, r3, n3) {
            const o2 = [];
            for (const i2 of n3) {
              const [n4, s] = i2.indices;
              if (s <= t3 || n4 >= r3) continue;
              const l = Math.max(0, n4 - t3), c = Math.min(e3.length, s - t3);
              if ("italic" === i2.type) o2.push({ offset: l, type: "open", tag: "<em>" }), o2.push({ offset: c, type: "close", tag: "</em>" });
              else if ("mention" === i2.type && i2.text) {
                const e4 = `https://x.com/${(0, a.escapeHtml)(i2.text)}`;
                o2.push({ offset: l, type: "open", tag: `<a href="${e4}">` }), o2.push({ offset: c, type: "close", tag: "</a>" });
              } else if ("url" === i2.type && i2.original) {
                const e4 = (0, a.escapeHtml)(i2.original);
                o2.push({ offset: l, type: "open", tag: `<a href="${e4}">` }), o2.push({ offset: c, type: "close", tag: "</a>" });
              }
            }
            return this.applyMarkers(e3, o2);
          }
          renderArticle(e3, t3, r3) {
            var n3;
            const o2 = [];
            (null === (n3 = null == r3 ? void 0 : r3.media_info) || void 0 === n3 ? void 0 : n3.original_img_url) && o2.push(`<img src="${(0, a.escapeHtml)(r3.media_info.original_img_url)}" alt="Cover image">`);
            let i2 = 0;
            for (; i2 < e3.length; ) {
              const r4 = e3[i2];
              if ("unordered-list-item" === r4.type) {
                const r5 = [];
                for (; i2 < e3.length && "unordered-list-item" === e3[i2].type; ) r5.push(`<li>${this.renderInlineContent(e3[i2], t3)}</li>`), i2++;
                o2.push(`<ul>${r5.join("")}</ul>`);
                continue;
              }
              const n4 = this.renderBlock(r4, t3);
              n4 && o2.push(n4), i2++;
            }
            return `<article class="x-article">${o2.join("")}</article>`;
          }
          renderBlock(e3, t3) {
            switch (e3.type) {
              case "unstyled":
              default:
                return e3.text.trim() ? `<p>${this.renderInlineContent(e3, t3)}</p>` : "";
              case "header-two":
                return `<h2>${this.renderInlineContent(e3, t3)}</h2>`;
              case "header-three":
                return `<h3>${this.renderInlineContent(e3, t3)}</h3>`;
              case "atomic":
                return this.renderAtomicBlock(e3, t3);
            }
          }
          renderAtomicBlock(e3, t3) {
            if (0 === e3.entityRanges.length) return "";
            const r3 = t3.find(((t4) => t4.key === String(e3.entityRanges[0].key)));
            if (!r3) return "";
            const n3 = r3.value;
            switch (n3.type) {
              case "MEDIA": {
                const e4 = n3.data.caption;
                return e4 ? `<figure><figcaption>${(0, a.escapeHtml)(e4)}</figcaption></figure>` : "";
              }
              case "MARKDOWN": {
                const e4 = n3.data.markdown || "", t4 = e4.match(/^```(\w*)\n([\s\S]*?)\n?```$/);
                if (t4) {
                  const e5 = t4[1], r4 = t4[2];
                  return `<pre><code${e5 ? ` class="language-${(0, a.escapeHtml)(e5)}" data-lang="${(0, a.escapeHtml)(e5)}"` : ""}>${(0, a.escapeHtml)(r4)}</code></pre>`;
                }
                return `<pre><code>${(0, a.escapeHtml)(e4)}</code></pre>`;
              }
              default:
                return "";
            }
          }
          renderInlineContent(e3, t3) {
            var r3, n3;
            const o2 = e3.text;
            if (!o2) return "";
            const i2 = [];
            for (const t4 of e3.inlineStyleRanges) "Bold" === t4.style && (i2.push({ offset: t4.offset, type: "open", tag: "<strong>" }), i2.push({ offset: t4.offset + t4.length, type: "close", tag: "</strong>" }));
            for (const r4 of e3.entityRanges) {
              const e4 = t3.find(((e5) => e5.key === String(r4.key)));
              if ("LINK" === (null == e4 ? void 0 : e4.value.type) && e4.value.data.url) {
                const t4 = (0, a.escapeHtml)(e4.value.data.url);
                i2.push({ offset: r4.offset, type: "open", tag: `<a href="${t4}">` }), i2.push({ offset: r4.offset + r4.length, type: "close", tag: "</a>" });
              }
            }
            if (null === (r3 = e3.data) || void 0 === r3 ? void 0 : r3.mentions) for (const t4 of e3.data.mentions) {
              const e4 = `https://x.com/${(0, a.escapeHtml)(t4.text)}`;
              i2.push({ offset: t4.fromIndex, type: "open", tag: `<a href="${e4}">` }), i2.push({ offset: t4.toIndex, type: "close", tag: "</a>" });
            }
            if (null === (n3 = e3.data) || void 0 === n3 ? void 0 : n3.urls) for (const t4 of e3.data.urls) {
              const e4 = (0, a.escapeHtml)(t4.text);
              i2.push({ offset: t4.fromIndex, type: "open", tag: `<a href="${e4}">` }), i2.push({ offset: t4.toIndex, type: "close", tag: "</a>" });
            }
            return this.applyMarkers(o2, i2);
          }
        }
        t2.XOembedExtractor = i;
      }, 258(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__awaiter || function(e3, t3, r3, n3) {
          return new (r3 || (r3 = Promise))((function(o2, a2) {
            function i2(e4) {
              try {
                l2(n3.next(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function s2(e4) {
              try {
                l2(n3.throw(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function l2(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i2, s2);
            }
            l2((n3 = n3.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.YoutubeExtractor = void 0;
        const o = r2(279), a = r2(552), i = r2(497), s = /[.!?]["'\u2019\u201D)]*\s*$/, l = /\?["'\u2019\u201D)]*\s*$/, c = "20.10.38", u = { client: { clientName: "ANDROID", clientVersion: c } }, d = `com.google.android.youtube/${c} (Linux; U; Android 14)`, h = { client: { clientName: "WEB", clientVersion: "2.20240101.00.00" } };
        class m extends o.BaseExtractor {
          constructor(e3, t3, r3) {
            super(e3, t3, r3), this.inlineJsonCache = /* @__PURE__ */ new Map(), this.videoElement = e3.querySelector("video"), this.schemaOrgData = r3;
          }
          canExtract() {
            return true;
          }
          canExtractAsync() {
            return true;
          }
          prefersAsync() {
            return true;
          }
          extract() {
            return this.buildResult(this.extractTranscriptFromExistingDom());
          }
          extractAsync() {
            return n2(this, void 0, void 0, (function* () {
              const e3 = this.extractTranscriptFromExistingDom() || (yield this.fetchTranscript()) || (yield this.extractTranscriptFromOpenedDom());
              return this.buildResult(e3);
            }));
          }
          getCaptionTracks(e3) {
            var t3, r3;
            const n3 = null === (r3 = null === (t3 = null == e3 ? void 0 : e3.captions) || void 0 === t3 ? void 0 : t3.playerCaptionsTracklistRenderer) || void 0 === r3 ? void 0 : r3.captionTracks;
            return Array.isArray(n3) ? n3 : [];
          }
          pickCaptionTrack(e3) {
            return e3.find(((e4) => "en" === e4.languageCode)) || e3[0];
          }
          getTrackDisplayName(e3) {
            var t3, r3, n3;
            return (null === (t3 = null == e3 ? void 0 : e3.name) || void 0 === t3 ? void 0 : t3.simpleText) || (null === (n3 = null === (r3 = null == e3 ? void 0 : e3.name) || void 0 === r3 ? void 0 : r3.runs) || void 0 === n3 ? void 0 : n3.map(((e4) => (null == e4 ? void 0 : e4.text) || "")).join("").trim()) || "";
          }
          normalizeLanguageLabel(e3) {
            return e3.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim().toLocaleLowerCase();
          }
          getTranscriptLanguageCodeFromDom() {
            var e3;
            const t3 = this.document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"] #footer yt-sort-filter-sub-menu-renderer yt-dropdown-menu button'), r3 = null === (e3 = null == t3 ? void 0 : t3.textContent) || void 0 === e3 ? void 0 : e3.trim(), n3 = this.getCaptionTracks(this.parseInlineJson("ytInitialPlayerResponse")), o2 = this.pickCaptionTrack(n3);
            if (!r3) return (null == o2 ? void 0 : o2.languageCode) || "en";
            const a2 = this.normalizeLanguageLabel(r3), i2 = n3.find(((e4) => this.normalizeLanguageLabel(this.getTrackDisplayName(e4)) === a2));
            return (null == i2 ? void 0 : i2.languageCode) || (null == o2 ? void 0 : o2.languageCode) || "en";
          }
          getInlineChapters() {
            const e3 = this.parseInlineJson("ytInitialData");
            if (!e3) return [];
            const t3 = this.extractChaptersFromPlayerBar(e3);
            return t3.length > 0 ? t3 : this.extractChaptersFromEngagementPanels(e3);
          }
          getTranscriptContainer() {
            return this.document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"] #segments-container');
          }
          buildTranscriptFromContainer(e3, t3) {
            if (0 === e3.children.length) return;
            const r3 = e3.querySelectorAll("ytd-transcript-segment-renderer");
            if (0 === r3.length) return;
            const n3 = [];
            for (const e4 of Array.from(r3)) {
              const t4 = e4.querySelector(".segment-timestamp"), r4 = e4.querySelector(".segment-text");
              if (!t4 || !r4) continue;
              const o3 = (t4.textContent || "").trim(), a3 = (r4.textContent || "").trim();
              if (!a3) continue;
              const i2 = this.parseTimestamp(o3);
              null !== i2 && n3.push({ start: i2, text: a3 });
            }
            if (0 === n3.length) return;
            const o2 = this.groupTranscriptSegments(n3), { html: a2, text: s2 } = (0, i.buildTranscript)("youtube", o2, t3);
            return { html: a2, text: s2, languageCode: this.getTranscriptLanguageCodeFromDom() };
          }
          extractTranscriptFromExistingDom() {
            try {
              const e3 = this.getTranscriptContainer();
              if (!e3) return;
              return this.buildTranscriptFromContainer(e3, this.getInlineChapters());
            } catch (e3) {
              return void console.error("YoutubeExtractor: failed to extract transcript from existing DOM", e3);
            }
          }
          canOpenTranscriptPanel() {
            var e3;
            return "function" == typeof (null === (e3 = this.document.defaultView) || void 0 === e3 ? void 0 : e3.MutationObserver);
          }
          buildResult(e3) {
            const t3 = this.getVideoData(), r3 = this.getChannelName(t3), n3 = t3.description || "", o2 = this.formatDescription(n3);
            let a2 = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.getVideoId()}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>${o2}`;
            (null == e3 ? void 0 : e3.html) && (a2 += e3.html);
            const i2 = { title: t3.name || "", author: r3, site: "YouTube", image: Array.isArray(t3.thumbnailUrl) && t3.thumbnailUrl[0] || "", published: t3.uploadDate, description: n3.slice(0, 200).trim() };
            return (null == e3 ? void 0 : e3.text) && (i2.transcript = e3.text), (null == e3 ? void 0 : e3.languageCode) && (i2.language = e3.languageCode), { content: a2, contentHtml: a2, extractedContent: { videoId: this.getVideoId(), author: r3 }, variables: i2 };
          }
          formatDescription(e3) {
            return `<p>${e3.replace(/\n/g, "<br>")}</p>`;
          }
          getVideoData() {
            if (!this.schemaOrgData) return {};
            return (Array.isArray(this.schemaOrgData) ? this.schemaOrgData.find(((e3) => "VideoObject" === e3["@type"])) : "VideoObject" === this.schemaOrgData["@type"] ? this.schemaOrgData : null) || {};
          }
          getChannelName(e3) {
            const t3 = this.getChannelNameFromDom();
            if (t3) return t3;
            const r3 = this.getChannelNameFromPlayerResponse();
            return r3 || ((null == e3 ? void 0 : e3.author) || "");
          }
          getChannelNameFromDom() {
            var e3;
            const t3 = ['ytd-video-owner-renderer #channel-name a[href^="/@"]', '#owner-name a[href^="/@"]'];
            for (const r3 of t3) {
              const t4 = this.document.querySelector(r3), n3 = null === (e3 = null == t4 ? void 0 : t4.textContent) || void 0 === e3 ? void 0 : e3.trim();
              if (n3) return n3;
            }
            return this.getChannelNameFromMicrodata();
          }
          getChannelNameFromMicrodata() {
            var e3;
            const t3 = this.document.querySelector('[itemprop="author"]');
            if (!t3) return "";
            const r3 = t3.querySelector('meta[itemprop="name"]');
            if (null == r3 ? void 0 : r3.getAttribute("content")) return r3.getAttribute("content").trim();
            const n3 = t3.querySelector('link[itemprop="name"]');
            if (null == n3 ? void 0 : n3.getAttribute("content")) return n3.getAttribute("content").trim();
            const o2 = t3.querySelector('[itemprop="name"], a, span');
            return (null === (e3 = null == o2 ? void 0 : o2.textContent) || void 0 === e3 ? void 0 : e3.trim()) || "";
          }
          getChannelNameFromPlayerResponse() {
            var e3, t3, r3, n3;
            const o2 = this.parseInlineJson("ytInitialPlayerResponse");
            if (!o2) return "";
            const a2 = (null === (e3 = null == o2 ? void 0 : o2.videoDetails) || void 0 === e3 ? void 0 : e3.author) || (null === (t3 = null == o2 ? void 0 : o2.videoDetails) || void 0 === t3 ? void 0 : t3.ownerChannelName);
            if (a2) return a2;
            return (null === (n3 = null === (r3 = null == o2 ? void 0 : o2.microformat) || void 0 === r3 ? void 0 : r3.playerMicroformatRenderer) || void 0 === n3 ? void 0 : n3.ownerChannelName) || "";
          }
          parseInlineJson(e3) {
            if (this.inlineJsonCache.has(e3)) return this.inlineJsonCache.get(e3);
            const t3 = Array.from(this.document.querySelectorAll("script"));
            for (const r3 of t3) {
              const t4 = r3.textContent || "";
              if (!t4.includes(e3)) continue;
              const n3 = t4.indexOf("{", t4.indexOf(e3));
              if (-1 === n3) continue;
              let o2 = 0;
              for (let r4 = n3; r4 < t4.length; r4++) {
                const a2 = t4[r4];
                if ("{" === a2) o2 += 1;
                else if ("}" === a2 && (o2 -= 1, 0 === o2)) {
                  const o3 = t4.slice(n3, r4 + 1);
                  try {
                    const t5 = JSON.parse(o3);
                    return this.inlineJsonCache.set(e3, t5), t5;
                  } catch (e4) {
                    console.error("YoutubeExtractor: failed to parse inline JSON", e4);
                    break;
                  }
                }
              }
            }
            return null;
          }
          fetchTranscript() {
            return n2(this, void 0, void 0, (function* () {
              try {
                const e3 = this.getVideoId();
                if (!e3) return;
                const [t3, r3] = yield Promise.all([this.fetchPlayerData(e3), this.fetchChapters(e3)]);
                if (!t3) return;
                const n3 = this.getCaptionTracks(t3);
                if (0 === n3.length) return;
                const o2 = this.pickCaptionTrack(n3);
                if (!(null == o2 ? void 0 : o2.baseUrl)) return;
                try {
                  if (!new URL(o2.baseUrl).hostname.endsWith(".youtube.com")) return;
                } catch (e4) {
                  return;
                }
                const a2 = yield fetch(o2.baseUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
                if (!a2.ok) return;
                let i2;
                try {
                  i2 = yield a2.text();
                } catch (e4) {
                  return void console.error("YoutubeExtractor: response.text() failed:", e4);
                }
                if (!i2) return;
                return this.parseTranscriptXml(i2, o2.languageCode || "en", r3);
              } catch (e3) {
                return void console.error("YoutubeExtractor: failed to fetch transcript", e3);
              }
            }));
          }
          waitForTranscriptContainer() {
            return n2(this, void 0, void 0, (function* () {
              return new Promise(((e3) => {
                let t3 = 0;
                const r3 = () => {
                  const n3 = this.getTranscriptContainer();
                  n3 && n3.children.length > 0 ? e3(n3) : t3++ < 20 ? setTimeout(r3, 250) : e3(null);
                };
                r3();
              }));
            }));
          }
          extractTranscriptFromOpenedDom() {
            return n2(this, void 0, void 0, (function* () {
              try {
                if (!this.canOpenTranscriptPanel()) return;
                const e3 = this.document.querySelector("ytd-video-description-transcript-section-renderer button");
                if (!e3) return;
                e3.click();
                const t3 = yield this.waitForTranscriptContainer();
                if (!t3) return;
                const r3 = this.getVideoId(), n3 = r3 ? yield this.fetchChapters(r3) : this.getInlineChapters();
                return this.buildTranscriptFromContainer(t3, n3);
              } catch (e3) {
                return void console.error("YoutubeExtractor: failed to extract transcript from opened DOM", e3);
              }
            }));
          }
          fetchPlayerData(e3) {
            return n2(this, void 0, void 0, (function* () {
              try {
                const t4 = yield fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": d }, body: JSON.stringify({ context: u, videoId: e3 }) });
                if (t4.ok) {
                  const e4 = yield t4.json();
                  if (this.getCaptionTracks(e4).length > 0) return e4;
                }
              } catch (e4) {
              }
              const t3 = this.parseInlineJson("ytInitialPlayerResponse");
              if (this.getCaptionTracks(t3).length > 0) return t3;
            }));
          }
          fetchChapters(e3) {
            return n2(this, void 0, void 0, (function* () {
              const t3 = this.getInlineChapters();
              if (t3.length > 0) return t3;
              try {
                const t4 = yield fetch("https://www.youtube.com/youtubei/v1/next?prettyPrint=false", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ context: h, videoId: e3 }) });
                if (!t4.ok) return [];
                const r3 = yield t4.json(), n3 = this.extractChaptersFromPlayerBar(r3);
                return n3.length > 0 ? n3 : this.extractChaptersFromEngagementPanels(r3);
              } catch (e4) {
                return [];
              }
            }));
          }
          extractChaptersFromPlayerBar(e3) {
            var t3, r3, n3, o2, a2, i2, s2, l2;
            const c2 = [], u2 = null === (i2 = null === (a2 = null === (o2 = null === (n3 = null === (r3 = null === (t3 = null == e3 ? void 0 : e3.playerOverlays) || void 0 === t3 ? void 0 : t3.playerOverlayRenderer) || void 0 === r3 ? void 0 : r3.decoratedPlayerBarRenderer) || void 0 === n3 ? void 0 : n3.decoratedPlayerBarRenderer) || void 0 === o2 ? void 0 : o2.playerBar) || void 0 === a2 ? void 0 : a2.multiMarkersPlayerBarRenderer) || void 0 === i2 ? void 0 : i2.markersMap;
            if (!Array.isArray(u2)) return c2;
            for (const e4 of u2) {
              const t4 = null === (s2 = null == e4 ? void 0 : e4.value) || void 0 === s2 ? void 0 : s2.chapters;
              if (Array.isArray(t4)) for (const e5 of t4) {
                const t5 = null == e5 ? void 0 : e5.chapterRenderer;
                if (!t5) continue;
                const r4 = (null === (l2 = t5.title) || void 0 === l2 ? void 0 : l2.simpleText) || "", n4 = t5.timeRangeStartMillis;
                r4 && "number" == typeof n4 && c2.push({ title: r4, start: n4 / 1e3 });
              }
            }
            return c2;
          }
          extractChaptersFromEngagementPanels(e3) {
            var t3, r3, n3, o2;
            const a2 = [], i2 = null == e3 ? void 0 : e3.engagementPanels;
            if (!Array.isArray(i2)) return a2;
            for (const e4 of i2) {
              const i3 = null === (t3 = null == e4 ? void 0 : e4.engagementPanelSectionListRenderer) || void 0 === t3 ? void 0 : t3.content, s2 = null === (r3 = null == i3 ? void 0 : i3.macroMarkersListRenderer) || void 0 === r3 ? void 0 : r3.contents;
              if (Array.isArray(s2)) for (const e5 of s2) {
                const t4 = null == e5 ? void 0 : e5.macroMarkersListItemRenderer;
                if (!t4) continue;
                const r4 = (null === (n3 = t4.title) || void 0 === n3 ? void 0 : n3.simpleText) || "", i4 = (null === (o2 = t4.timeDescription) || void 0 === o2 ? void 0 : o2.simpleText) || "";
                if (!r4 || !i4) continue;
                const s3 = this.parseTimestamp(i4);
                null !== s3 && a2.push({ title: r4, start: s3 });
              }
            }
            return a2;
          }
          parseTimestamp(e3) {
            const t3 = e3.split(":").map(Number);
            return t3.some(isNaN) ? null : 3 === t3.length ? 3600 * t3[0] + 60 * t3[1] + t3[2] : 2 === t3.length ? 60 * t3[0] + t3[1] : null;
          }
          parseTranscriptXml(e3, t3, r3 = []) {
            const n3 = [], o2 = /<p\s+t="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
            let a2;
            for (; null !== (a2 = o2.exec(e3)); ) {
              const e4 = parseInt(a2[1], 10), t4 = a2[2];
              let r4 = "";
              const o3 = /<s[^>]*>([^<]*)<\/s>/g;
              let i2;
              for (; null !== (i2 = o3.exec(t4)); ) r4 += i2[1];
              r4 || (r4 = t4.replace(/<[^>]+>/g, "")), r4 = this.decodeEntities(r4), r4.trim() && n3.push({ start: e4 / 1e3, text: r4.trim() });
            }
            if (0 === n3.length) {
              const t4 = /<text\s+start="([^"]*)"[^>]*>([\s\S]*?)<\/text>/g;
              for (; null !== (a2 = t4.exec(e3)); ) {
                const e4 = parseFloat(a2[1]);
                let t5 = this.decodeEntities(a2[2].replace(/<[^>]+>/g, ""));
                t5.trim() && n3.push({ start: e4, text: t5.trim() });
              }
            }
            if (0 === n3.length) return;
            const s2 = this.groupTranscriptSegments(n3), { html: l2, text: c2 } = (0, i.buildTranscript)("youtube", s2, r3);
            return { html: l2, text: c2, languageCode: t3 };
          }
          decodeEntities(e3) {
            return e3.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&#x([0-9a-fA-F]+);/g, ((e4, t3) => String.fromCodePoint(parseInt(t3, 16)))).replace(/&#(\d+);/g, ((e4, t3) => String.fromCodePoint(parseInt(t3, 10))));
          }
          getVideoId() {
            const e3 = new URL(this.url);
            return "youtu.be" === e3.hostname ? e3.pathname.slice(1) : new URLSearchParams(e3.search).get("v") || "";
          }
          groupTranscriptSegments(e3) {
            if (0 === e3.length) return [];
            return e3.some(((e4) => /^>>/.test(e4.text))) ? this.groupBySpeaker(e3) : this.groupBySentence(e3);
          }
          groupBySpeaker(e3) {
            const t3 = [];
            let r3 = null, n3 = -1, o2 = "";
            for (const a3 of e3) {
              const e4 = /^>>/.test(a3.text), i2 = a3.text.replace(/^>>\s*/, "").replace(/^-\s+/, ""), l2 = /,\s*$/.test(o2), c2 = (s.test(o2) || !o2) && !l2;
              e4 && c2 ? (r3 && t3.push(r3), n3 = (n3 + 1) % 2, r3 = { start: a3.start, segments: [{ start: a3.start, text: i2 }], speakerChange: true, speaker: n3 }) : (r3 || (r3 = { start: a3.start, segments: [], speakerChange: false }), r3.segments.push({ start: a3.start, text: i2 })), o2 = i2;
            }
            r3 && t3.push(r3), this.splitAffirmativeTurns(t3);
            const a2 = [];
            for (const e4 of t3) {
              const t4 = void 0 === e4.speaker ? this.groupBySentence(e4.segments) : this.mergeSentenceGroupsWithinTurn(this.groupBySentence(e4.segments));
              for (let r4 = 0; r4 < t4.length; r4++) a2.push(Object.assign(Object.assign({}, t4[r4]), { speakerChange: 0 === r4 && e4.speakerChange, speaker: e4.speaker }));
            }
            return a2;
          }
          splitAffirmativeTurns(e3) {
            const t3 = /^(mhm|yeah|yes|yep|right|okay|ok|absolutely|sure|exactly|uh-huh|mm-hmm)[.!,]?\s+/i;
            for (let r3 = 0; r3 < e3.length; r3++) {
              const n3 = e3[r3];
              if (void 0 === n3.speaker || 0 === n3.segments.length) continue;
              const o2 = n3.segments[0], i2 = t3.exec(o2.text);
              if (!i2) continue;
              if (/,\s*$/.test(i2[0])) continue;
              const s2 = o2.text.slice(i2[0].length).trim(), l2 = n3.segments.slice(1);
              if ((0, a.countWords)(s2) + l2.reduce(((e4, t4) => e4 + (0, a.countWords)(t4.text)), 0) < 30) continue;
              const c2 = i2[0].trimEnd(), u2 = s2 ? [{ start: o2.start, text: s2 }, ...l2] : l2, d2 = { start: n3.start, segments: [{ start: o2.start, text: c2 }], speakerChange: n3.speakerChange, speaker: n3.speaker }, h2 = { start: u2[0].start, segments: u2, speakerChange: true, speaker: 0 === n3.speaker ? 1 : 0 };
              e3.splice(r3, 1, d2, h2), r3++;
            }
          }
          mergeSentenceGroupsWithinTurn(e3) {
            if (e3.length <= 1) return e3;
            const t3 = [];
            let r3 = Object.assign({}, e3[0]), n3 = true;
            for (let o2 = 1; o2 < e3.length; o2++) {
              const a2 = e3[o2];
              this.shouldMergeSentenceGroups(r3, a2, n3) ? r3.text = `${r3.text} ${a2.text}` : (t3.push(r3), r3 = Object.assign({}, a2), n3 = false);
            }
            return t3.push(r3), t3;
          }
          shouldMergeSentenceGroups(e3, t3, r3) {
            const n3 = (0, a.countWords)(e3.text), o2 = (0, a.countWords)(t3.text);
            return !this.isShortStandaloneUtterance(e3.text, n3) && !this.isShortStandaloneUtterance(t3.text, o2) && (!(r3 && n3 < 8) && (!l.test(e3.text) && !l.test(t3.text) && (!(n3 + o2 > 80) && !(t3.start - e3.start > 45))));
          }
          isShortStandaloneUtterance(e3, t3) {
            const r3 = null != t3 ? t3 : (0, a.countWords)(e3);
            return r3 > 0 && r3 <= 3 && s.test(e3);
          }
          groupBySentence(e3) {
            const t3 = [];
            let r3 = "", n3 = 0, o2 = 0;
            const a2 = () => {
              r3.trim() && (t3.push({ start: n3, text: r3.trim(), speakerChange: false }), r3 = "");
            };
            for (const t4 of e3) r3 && t4.start - o2 > 20 && a2(), r3 || (n3 = t4.start), r3 += (r3 ? " " : "") + t4.text, o2 = t4.start, s.test(t4.text) && a2();
            return a2(), t3;
          }
        }
        t2.YoutubeExtractor = m;
      }, 98(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__awaiter || function(e3, t3, r3, n3) {
          return new (r3 || (r3 = Promise))((function(o2, a2) {
            function i2(e4) {
              try {
                l(n3.next(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function s(e4) {
              try {
                l(n3.throw(e4));
              } catch (e5) {
                a2(e5);
              }
            }
            function l(e4) {
              var t4;
              e4.done ? o2(e4.value) : (t4 = e4.value, t4 instanceof r3 ? t4 : new r3((function(e5) {
                e5(t4);
              }))).then(i2, s);
            }
            l((n3 = n3.apply(e3, t3 || [])).next());
          }));
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.createMarkdownContent = void 0;
        const o = r2(628), a = r2(76);
        Object.defineProperty(t2, "createMarkdownContent", { enumerable: true, get: function() {
          return a.createMarkdownContent;
        } });
        class i {
          constructor(e3, t3 = {}) {
            this.defuddle = new o.Defuddle(e3, t3), this.options = t3;
          }
          parse() {
            var e3;
            const t3 = this.defuddle.parse();
            return (0, a.toMarkdown)(t3, this.options, null !== (e3 = this.options.url) && void 0 !== e3 ? e3 : ""), t3;
          }
          parseAsync() {
            return n2(this, void 0, void 0, (function* () {
              var e3;
              const t3 = yield this.defuddle.parseAsync();
              return (0, a.toMarkdown)(t3, this.options, null !== (e3 = this.options.url) && void 0 !== e3 ? e3 : ""), t3;
            }));
          }
        }
        i.createMarkdownContent = a.createMarkdownContent, t2.default = i;
      }, 76(e2, t2, r2) {
        "use strict";
        var n2 = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(t2, "__esModule", { value: true }), t2.isGenericElement = s, t2.asGenericElement = l, t2.createMarkdownContent = c, t2.toMarkdown = function(e3, t3, r3) {
          t3.markdown ? e3.content = c(e3.content, r3) : t3.separateMarkdown && (e3.contentMarkdown = c(e3.content, r3));
        };
        const o = n2(r2(431)), a = r2(552), i = r2(639);
        function s(e3) {
          return null !== e3 && "object" == typeof e3 && "getAttribute" in e3;
        }
        function l(e3) {
          return e3;
        }
        function c(e3, t3) {
          const r3 = {}, n3 = new o.default({ headingStyle: "atx", hr: "---", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "*", preformattedCode: true });
          function l2(e4) {
            let t4 = e4.getAttribute("data-latex"), r4 = e4.getAttribute("alttext");
            return t4 ? t4.trim() : r4 ? r4.trim() : "";
          }
          n3.addRule("table", { filter: "table", replacement: function(e4, t4) {
            var r4, o2;
            if (!s(t4)) return e4;
            if ((null === (r4 = t4.classList) || void 0 === r4 ? void 0 : r4.contains("ltx_equation")) || (null === (o2 = t4.classList) || void 0 === o2 ? void 0 : o2.contains("ltx_eqn_table"))) return (function(e5) {
              const t5 = e5.querySelectorAll("math[alttext]");
              return 0 === t5.length ? "" : Array.from(t5).map(((e6) => {
                const t6 = e6.getAttribute("alttext");
                if (t6) {
                  return null !== e6.closest(".ltx_eqn_inline") ? `$${t6.trim()}$` : `
$$
${t6.trim()}
$$`;
                }
                return "";
              })).join("\n\n");
            })(t4);
            const l3 = null !== t4.querySelector("table"), c2 = Array.from(t4.querySelectorAll("td, th")).filter(((e5) => (0, i.isDirectTableChild)(e5, t4)));
            if (l3 || c2.length <= 1) {
              const e5 = Array.from(t4.querySelectorAll("tr")).filter(((e6) => (0, i.isDirectTableChild)(e6, t4))), r5 = e5.map(((e6) => c2.filter(((t5) => t5.parentNode === e6)).length));
              if (e5.length > 0 && 1 === new Set(r5).size && r5[0] <= 1) return "\n\n" + n3.turndown(c2.map(((e6) => (0, i.serializeHTML)(e6))).join("")) + "\n\n";
            }
            if (Array.from(t4.querySelectorAll("td, th")).some(((e5) => s(e5) && (e5.hasAttribute("colspan") || e5.hasAttribute("rowspan"))))) {
              return "\n\n" + (function(e5) {
                const t5 = ["src", "href", "style", "align", "width", "height", "rowspan", "colspan", "bgcolor", "scope", "valign", "headers"], r5 = (e6) => {
                  Array.from(e6.attributes).forEach(((r6) => {
                    t5.includes(r6.name) || e6.removeAttribute(r6.name);
                  })), e6.childNodes.forEach(((e7) => {
                    (0, a.isElement)(e7) && r5(e7);
                  }));
                }, n4 = e5.cloneNode(true);
                return r5(n4), n4.outerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
              })(t4) + "\n\n";
            }
            const u = t4, d = (u.rows && u.rows.length > 0 ? Array.from(u.rows) : Array.from(t4.querySelectorAll("tr")).filter(((e5) => (0, i.isDirectTableChild)(e5, t4)))).map(((e5) => `| ${(e5.cells && e5.cells.length > 0 ? Array.from(e5.cells) : Array.from(e5.querySelectorAll("td, th")).filter(((t5) => t5.parentNode === e5))).map(((e6) => {
              let t5 = n3.turndown((0, i.serializeHTML)(e6)).replace(/\n/g, " ").trim();
              return t5 = t5.replace(/\|/g, "\\|"), t5;
            })).join(" | ")} |`));
            if (!d.length) return e4;
            const h = `| ${Array(d[0].split("|").length - 2).fill("---").join(" | ")} |`;
            return `

${[d[0], h, ...d.slice(1)].join("\n")}

`;
          } }), n3.remove(["style", "script"]), n3.keep(["iframe", "video", "audio", "sup", "sub", "svg", "math"]), n3.remove(["button"]), n3.addRule("list", { filter: ["ul", "ol"], replacement: function(e4, t4) {
            e4 = e4.trim();
            const r4 = t4;
            return (!(r4.parentNode && ("UL" === r4.parentNode.nodeName || "OL" === r4.parentNode.nodeName)) ? "\n" : "") + e4 + "\n";
          } }), n3.addRule("listItem", { filter: "li", replacement: function(e4, t4, r4) {
            var n4;
            if (!s(t4)) return e4;
            const o2 = null === (n4 = t4.classList) || void 0 === n4 ? void 0 : n4.contains("task-list-item"), a2 = t4.querySelector('input[type="checkbox"]');
            let i2 = "";
            o2 && a2 && s(a2) && (e4 = e4.replace(/<input[^>]*>/, ""), i2 = a2.getAttribute("checked") ? "[x] " : "[ ] "), e4 = e4.replace(/\n+$/, "").split("\n").filter(((e5) => e5.length > 0)).join("\n	");
            let l3 = r4.bulletListMarker + " ", c2 = t4.parentNode, u = 0, d = t4.parentNode;
            for (; d && s(d); ) {
              if ("UL" === d.nodeName || "OL" === d.nodeName) u++;
              else if ("LI" !== d.nodeName) break;
              d = d.parentNode;
            }
            const h = Math.max(0, u - 1);
            if (l3 = "	".repeat(h) + l3, c2 && s(c2) && "OL" === c2.nodeName) {
              let e5 = c2.getAttribute("start"), r5 = 1;
              const n5 = Array.from(c2.children || []);
              for (let e6 = 0; e6 < n5.length; e6++) if (n5[e6] === t4) {
                r5 = e6 + 1;
                break;
              }
              l3 = "	".repeat(u - 1) + (e5 ? Number(e5) + r5 - 1 : r5) + ". ";
            }
            return l3 + i2 + e4.trim() + (t4.nextSibling && !/\n$/.test(e4) ? "\n" : "");
          } }), n3.addRule("figure", { filter: "figure", replacement: function(e4, t4) {
            var r4;
            if (!s(t4)) return e4;
            const o2 = t4.querySelector("img"), a2 = t4.querySelector("figcaption");
            if (!o2 || !s(o2)) return e4;
            const c2 = o2.getAttribute("alt") || "", u = o2.getAttribute("src") || "";
            let d = "";
            if (a2 && s(a2)) {
              const e5 = a2.querySelector(".ltx_tag_figure"), o3 = e5 && s(e5) ? null === (r4 = e5.textContent) || void 0 === r4 ? void 0 : r4.trim() : "";
              let c3 = (0, i.serializeHTML)(a2);
              const u2 = t4.ownerDocument;
              c3 = c3.replace(/<math.*?>(.*?)<\/math>/g, ((e6, t5, r5, n4) => {
                let o4 = "";
                if (u2) {
                  const t6 = (0, i.parseHTML)(u2, e6).querySelector("math");
                  o4 = t6 && s(t6) ? l2(t6) : "";
                }
                const a3 = n4[r5 - 1] || "", c4 = n4[r5 + e6.length] || "", d2 = 0 === r5 || /\s/.test(a3), h = r5 + e6.length === n4.length || /\s/.test(c4);
                return `${d2 || /[\s$]/.test(a3) ? "" : " "}$${o4}$${h || /[\s$]/.test(c4) ? "" : " "}`;
              }));
              d = `${o3} ${n3.turndown(c3)}`.trim();
            }
            return d = d.replace(/\[([^\]]+)\]\(([^)]+)\)/g, ((e5, t5, r5) => `[${t5}](${r5})`)), `![${c2}](${u})

${d}

`;
          } }), n3.addRule("embedToMarkdown", { filter: function(e4) {
            if (!s(e4)) return false;
            const t4 = e4.getAttribute("src");
            return !(!t4 || !t4.match(/(?:youtube\.com|youtube-nocookie\.com|youtu\.be)/) && !t4.match(/(?:twitter\.com|x\.com)/));
          }, replacement: function(e4, t4) {
            if (!s(t4)) return e4;
            const r4 = t4.getAttribute("src");
            if (r4) {
              const e5 = r4.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)\/(?:embed\/|watch\?v=)?([a-zA-Z0-9_-]+)/);
              if (e5 && e5[1]) return `
![](https://www.youtube.com/watch?v=${e5[1]})
`;
              const t5 = r4.match(/(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^/]+)\/status\/([0-9]+)/);
              if (t5) return `
![](https://x.com/${t5[1]}/status/${t5[2]})
`;
              const n4 = r4.match(/(?:https?:\/\/)?(?:platform\.)?twitter\.com\/embed\/Tweet\.html\?.*?id=([0-9]+)/);
              if (n4) return `
![](https://x.com/i/status/${n4[1]})
`;
            }
            return e4;
          } }), n3.addRule("highlight", { filter: "mark", replacement: function(e4) {
            return "==" + e4 + "==";
          } }), n3.addRule("strikethrough", { filter: (e4) => "DEL" === e4.nodeName || "S" === e4.nodeName || "STRIKE" === e4.nodeName, replacement: function(e4) {
            return "~~" + e4 + "~~";
          } }), n3.addRule("complexLinkStructure", { filter: function(e4, t4) {
            return "A" === e4.nodeName && e4.childNodes.length > 1 && Array.from(e4.childNodes).some(((e5) => ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e5.nodeName)));
          }, replacement: function(e4, t4, r4) {
            if (!s(t4)) return e4;
            const o2 = t4.getAttribute("href"), a2 = t4.getAttribute("title"), l3 = t4.querySelector("h1, h2, h3, h4, h5, h6"), c2 = l3 ? n3.turndown(l3.outerHTML) : "";
            l3 && l3.remove();
            let u = `${c2}

${n3.turndown((0, i.serializeHTML)(t4))}

`;
            return o2 && (u += `[View original](${o2})`, a2 && (u += ` "${a2}"`)), u;
          } }), n3.addRule("arXivEnumerate", { filter: (e4) => {
            var t4, r4;
            return "OL" === e4.nodeName && s(e4) && null !== (r4 = null === (t4 = e4.classList) || void 0 === t4 ? void 0 : t4.contains("ltx_enumerate")) && void 0 !== r4 && r4;
          }, replacement: function(e4, t4) {
            if (!s(t4)) return e4;
            return "\n\n" + Array.from(t4.children || []).map(((e5, t5) => {
              if (s(e5)) {
                const r4 = ((0, i.serializeHTML)(e5) || "").replace(/^<span class="ltx_tag ltx_tag_item">\d+\.<\/span>\s*/, "");
                return `${t5 + 1}. ${n3.turndown(r4)}`;
              }
              return "";
            })).join("\n\n") + "\n\n";
          } }), n3.addRule("citations", { filter: (e4) => {
            if (s(e4)) {
              const t4 = e4.getAttribute("id");
              return "SUP" === e4.nodeName && null !== t4 && t4.startsWith("fnref:");
            }
            return false;
          }, replacement: (e4, t4) => {
            if (s(t4)) {
              const e5 = t4.getAttribute("id");
              if ("SUP" === t4.nodeName && null !== e5 && e5.startsWith("fnref:")) {
                return `[^${e5.replace("fnref:", "").split("-")[0]}]`;
              }
            }
            return e4;
          } }), n3.addRule("footnotesList", { filter: (e4) => {
            if (s(e4)) {
              const t4 = e4.parentNode;
              return "OL" === e4.nodeName && null !== t4 && s(t4) && "footnotes" === t4.getAttribute("id");
            }
            return false;
          }, replacement: (e4, t4) => {
            if (!s(t4)) return e4;
            return "\n\n" + Array.from(t4.children || []).map(((e5) => {
              var t5, r4;
              let o2;
              if (s(e5)) {
                const a2 = e5.getAttribute("id");
                if (null !== a2) if (a2.startsWith("fn:")) o2 = a2.replace("fn:", "");
                else {
                  const e6 = null === (t5 = a2.split("/").pop()) || void 0 === t5 ? void 0 : t5.match(/cite_note-(.+)/);
                  o2 = e6 ? e6[1] : a2;
                }
                const l3 = e5.querySelector("sup");
                l3 && s(l3) && (null === (r4 = l3.textContent) || void 0 === r4 ? void 0 : r4.trim()) === o2 && l3.remove();
                const c2 = n3.turndown((0, i.serializeHTML)(e5)).replace(/\s*\u21a9\ufe0e$/, "").trim();
                return `[^${null == o2 ? void 0 : o2.toLowerCase()}]: ${c2}`;
              }
              return "";
            })).join("\n\n") + "\n\n";
          } }), n3.addRule("removals", { filter: function(e4) {
            var t4, r4;
            return !!s(e4) && (!!(null === (t4 = e4.getAttribute("href")) || void 0 === t4 ? void 0 : t4.includes("#fnref")) || !!(null === (r4 = e4.classList) || void 0 === r4 ? void 0 : r4.contains("footnote-backref")));
          }, replacement: function(e4, t4) {
            return "";
          } }), n3.addRule("handleTextNodesInTables", { filter: function(e4) {
            return (0, a.isTextNode)(e4) && null !== e4.parentNode && "TD" === e4.parentNode.nodeName;
          }, replacement: function(e4) {
            return e4;
          } }), n3.addRule("preformattedCode", { filter: (e4) => "PRE" === e4.nodeName, replacement: (e4, t4) => {
            var r4, n4;
            if (!s(t4)) return e4;
            const o2 = t4.querySelector("code");
            if (!o2 || !s(o2)) return e4;
            return `
\`\`\`${o2.getAttribute("data-lang") || o2.getAttribute("data-language") || (null === (n4 = null === (r4 = o2.getAttribute("class")) || void 0 === r4 ? void 0 : r4.match(/language-(\w+)/)) || void 0 === n4 ? void 0 : n4[1]) || t4.getAttribute("data-language") || ""}
${(o2.textContent || "").trim().replace(/`/g, "\\`")}
\`\`\`
`;
          } }), n3.addRule("math", { filter: (e4) => {
            var t4, r4, n4;
            return "math" === e4.nodeName.toLowerCase() || s(e4) && ((null === (t4 = e4.classList) || void 0 === t4 ? void 0 : t4.contains("mwe-math-element")) || (null === (r4 = e4.classList) || void 0 === r4 ? void 0 : r4.contains("mwe-math-fallback-image-inline")) || (null === (n4 = e4.classList) || void 0 === n4 ? void 0 : n4.contains("mwe-math-fallback-image-display")));
          }, replacement: (e4, t4) => {
            var r4, n4, o2, i2, c2, u;
            if (!s(t4)) return e4;
            let d = l2(t4);
            d = d.trim();
            if (!("function" == typeof t4.closest && null !== t4.closest("table")) && ("block" === t4.getAttribute("display") || (null === (r4 = t4.classList) || void 0 === r4 ? void 0 : r4.contains("mwe-math-fallback-image-display")) || t4.parentNode && s(t4.parentNode) && (null === (n4 = t4.parentNode.classList) || void 0 === n4 ? void 0 : n4.contains("mwe-math-element")) && t4.parentNode.previousSibling && s(t4.parentNode.previousSibling) && "p" === t4.parentNode.previousSibling.nodeName.toLowerCase())) return `
$$
${d}
$$
`;
            {
              const e5 = t4.previousSibling, r5 = t4.nextSibling, n5 = e5 && s(e5) && (null === (o2 = e5.textContent) || void 0 === o2 ? void 0 : o2.slice(-1)) || "", l3 = r5 && s(r5) && (null === (i2 = r5.textContent) || void 0 === i2 ? void 0 : i2[0]) || "", h = !e5 || (0, a.isTextNode)(e5) && "" === (null === (c2 = e5.textContent) || void 0 === c2 ? void 0 : c2.trim()), m = !r5 || (0, a.isTextNode)(r5) && "" === (null === (u = r5.textContent) || void 0 === u ? void 0 : u.trim());
              return `${h || !n5 || /[\s$]/.test(n5) ? "" : " "}$${d}$${m || !l3 || /[\s$]/.test(l3) ? "" : " "}`;
            }
          } }), n3.addRule("katex", { filter: (e4) => {
            var t4, r4;
            return s(e4) && ((null === (t4 = e4.classList) || void 0 === t4 ? void 0 : t4.contains("math")) || (null === (r4 = e4.classList) || void 0 === r4 ? void 0 : r4.contains("katex")));
          }, replacement: (e4, t4) => {
            var r4, n4;
            if (!s(t4)) return e4;
            let o2 = t4.getAttribute("data-latex");
            if (!o2) {
              const e5 = t4.querySelector('.katex-mathml annotation[encoding="application/x-tex"]');
              o2 = e5 && s(e5) && e5.textContent || "";
            }
            o2 || (o2 = (null === (r4 = t4.textContent) || void 0 === r4 ? void 0 : r4.trim()) || "");
            const a2 = t4.querySelector(".katex-mathml math");
            return (null === (n4 = t4.classList) || void 0 === n4 ? void 0 : n4.contains("math-inline")) || a2 && s(a2) && "block" !== a2.getAttribute("display") ? `$${o2}$` : `
$$
${o2}
$$
`;
          } }), n3.addRule("callout", { filter: (e4) => {
            var t4;
            return "div" === e4.nodeName.toLowerCase() && s(e4) && (null === (t4 = e4.classList) || void 0 === t4 ? void 0 : t4.contains("markdown-alert"));
          }, replacement: (e4, t4) => {
            if (!s(t4)) return e4;
            const r4 = Array.from(t4.classList ? Object.keys(t4.classList) : []).find(((e5) => e5.startsWith("markdown-alert-") && "markdown-alert" !== e5)), n4 = r4 ? r4.replace("markdown-alert-", "").toUpperCase() : "NOTE", o2 = t4.querySelector(".markdown-alert-title"), a2 = t4.querySelector("p:not(.markdown-alert-title)");
            let i2 = e4;
            return o2 && s(o2) && o2.textContent && (i2 = a2 && s(a2) ? a2.textContent || "" : e4.replace(o2.textContent, "")), `
> [!${n4}]
> ${i2.trim().replace(/\n/g, "\n> ")}
`;
          } }), n3.addRule("calloutAside", { filter: (e4) => "BLOCKQUOTE" === e4.nodeName && s(e4) && !!e4.getAttribute("data-callout"), replacement: (e4, t4) => {
            if (!s(t4)) return e4;
            const r4 = t4.getAttribute("data-callout") || "note", n4 = r4.charAt(0).toUpperCase() + r4.slice(1);
            return `
> [!${r4}] ${n4}
${e4.trim().split("\n").map(((e5) => `> ${e5}`)).join("\n")}
`;
          } });
          try {
            let t4 = n3.turndown(e3);
            const o2 = t4.match(/^# .+\n+/);
            if (o2 && (t4 = t4.slice(o2[0].length)), t4 = t4.replace(/\n*(?<!!)\[]\([^)]+\)\n*/g, ""), t4 = t4.replace(/!(?=!\[|\[!\[)/g, "! "), t4 = t4.replace(/\n{3,}/g, "\n\n"), Object.keys(r3).length > 0) {
              t4 += "\n\n---\n\n";
              for (const [e4, n4] of Object.entries(r3)) t4 += `[^${e4}]: ${n4}

`;
            }
            return t4.trim();
          } catch (t4) {
            return console.error("Error converting HTML to Markdown:", t4), console.log("Problematic content:", e3.substring(0, 1e3) + "..."), `Partial conversion completed with errors. Original HTML:

${e3}`;
          }
        }
      }, 608(e2, t2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.MetadataExtractor = void 0;
        class r2 {
          static extract(e3, t3, r3) {
            var n2, o;
            let a = "", i = "";
            try {
              if (i = (null === (n2 = e3.location) || void 0 === n2 ? void 0 : n2.href) || "", i || (i = this.getMetaContent(r3, "property", "og:url") || this.getMetaContent(r3, "property", "twitter:url") || this.getSchemaProperty(t3, "url") || this.getSchemaProperty(t3, "mainEntityOfPage.url") || this.getSchemaProperty(t3, "mainEntity.url") || this.getSchemaProperty(t3, "WebSite.url") || (null === (o = e3.querySelector('link[rel="canonical"]')) || void 0 === o ? void 0 : o.getAttribute("href")) || ""), i) try {
                a = new URL(i).hostname.replace(/^www\./, "");
              } catch (e4) {
                console.warn("Failed to parse URL:", e4);
              }
            } catch (t4) {
              const r4 = e3.querySelector("base[href]");
              if (r4) try {
                i = r4.getAttribute("href") || "", a = new URL(i).hostname.replace(/^www\./, "");
              } catch (e4) {
                console.warn("Failed to parse base URL:", e4);
              }
            }
            return { title: this.getTitle(e3, t3, r3), description: this.getDescription(e3, t3, r3), domain: a, favicon: this.getFavicon(e3, i, r3), image: this.getImage(e3, t3, r3), language: this.getLanguage(e3, t3, r3), published: this.getPublished(e3, t3, r3), author: this.getAuthor(e3, t3, r3), site: this.getSite(e3, t3, r3), schemaOrgData: t3, wordCount: 0, parseTime: 0 };
          }
          static getAuthor(e3, t3, r3) {
            var n2, o;
            let a;
            if (a = this.getMetaContent(r3, "name", "sailthru.author") || this.getMetaContent(r3, "property", "author") || this.getMetaContent(r3, "name", "author") || this.getMetaContent(r3, "name", "byl") || this.getMetaContent(r3, "name", "authorList"), a) return a;
            let i = this.getMetaContents(r3, "name", "citation_author");
            if (0 === i.length && (i = this.getMetaContents(r3, "property", "dc.creator")), i.length > 0) return a = i.map(((e4) => {
              if (!e4.includes(",")) return e4.trim();
              const t4 = /(.*),\s(.*)/.exec(e4);
              return t4 && 3 === t4.length ? `${t4[2]} ${t4[1]}` : e4.trim();
            })).join(", "), a;
            let s = this.getSchemaProperty(t3, "author.name") || this.getSchemaProperty(t3, "author.[].name");
            if (s) {
              const e4 = s.split(",").map(((e5) => e5.trim().replace(/,$/, "").trim())).filter(Boolean);
              if (e4.length > 0) {
                let t4 = [...new Set(e4)];
                return t4.length > 10 && (t4 = t4.slice(0, 10)), t4.join(", ");
              }
            }
            const l = [], c = [{ selector: '[itemprop="author"]' }, { selector: ".author", maxMatches: 3 }, { selector: '[href*="/author/"]', maxMatches: 3 }, { selector: ".authors a", maxMatches: 3 }];
            for (const { selector: t4, maxMatches: r4 } of c) {
              const n3 = e3.querySelectorAll(t4);
              r4 && n3.length > r4 || n3.forEach(((e4) => {
                var t5;
                (t5 = e4.textContent) && t5.split(",").forEach(((e5) => {
                  const t6 = e5.trim().replace(/,$/, "").trim(), r5 = t6.toLowerCase();
                  t6 && "author" !== r5 && "authors" !== r5 && l.push(t6);
                }));
              }));
            }
            if (l.length > 0) {
              let e4 = [...new Set(l.map(((e5) => e5.trim())).filter(Boolean))];
              if (e4.length > 0) return e4.length > 10 && (e4 = e4.slice(0, 10)), e4.join(", ");
            }
            const u = e3.querySelector("h1");
            if (u) {
              let e4 = u.nextElementSibling;
              for (let t5 = 0; t5 < 3 && e4; t5++) {
                const t6 = (null === (n2 = e4.textContent) || void 0 === n2 ? void 0 : n2.trim()) || "";
                if (this.parseDateText(t6)) {
                  const t7 = e4.querySelectorAll("a");
                  for (const e5 of t7) {
                    const t8 = ((null === (o = e5.textContent) || void 0 === o ? void 0 : o.trim()) || "").replace(/\u00a0/g, " ");
                    if (t8.length > 0 && t8.length < 100 && !this.parseDateText(t8)) return t8;
                  }
                }
                e4 = e4.nextElementSibling;
              }
              let t4 = u;
              for (let e5 = 0; e5 < 3 && t4; e5++) {
                let e6 = t4.previousElementSibling;
                for (let t5 = 0; t5 < 3 && e6; t5++) {
                  const t6 = this.extractByline(e6);
                  if (t6) return t6;
                  e6 = e6.previousElementSibling;
                }
                e6 = t4.nextElementSibling;
                for (let t5 = 0; t5 < 3 && e6; t5++) {
                  const t6 = this.extractByline(e6);
                  if (t6) return t6;
                  e6 = e6.nextElementSibling;
                }
                t4 = t4.parentElement;
              }
            }
            return this.getSiteName(t3, r3);
          }
          static extractByline(e3) {
            var t3;
            const r3 = [e3, ...e3.querySelectorAll("p, span, address")];
            for (const e4 of r3) {
              const r4 = ((null === (t3 = e4.textContent) || void 0 === t3 ? void 0 : t3.trim()) || "").replace(/\u00a0/g, " ");
              if (r4.length > 0 && r4.length < 50) {
                const e5 = r4.match(/^By\s+([A-Z].+)$/i);
                if (e5) return e5[1].trim();
              }
            }
            return null;
          }
          static getSiteName(e3, t3) {
            return this.getSchemaProperty(e3, "publisher.name") || this.getMetaContent(t3, "property", "og:site_name") || this.getSchemaProperty(e3, "WebSite.name") || this.getSchemaProperty(e3, "sourceOrganization.name") || this.getMetaContent(t3, "name", "copyright") || this.getSchemaProperty(e3, "copyrightHolder.name") || this.getSchemaProperty(e3, "isPartOf.name") || this.getMetaContent(t3, "name", "application-name") || "";
          }
          static getSite(e3, t3, r3) {
            return this.getSiteName(t3, r3) || this.getAuthor(e3, t3, r3) || "";
          }
          static getTitle(e3, t3, r3) {
            var n2, o;
            const a = this.getMetaContent(r3, "property", "og:title") || this.getMetaContent(r3, "name", "twitter:title") || this.getSchemaProperty(t3, "headline") || this.getMetaContent(r3, "name", "title") || this.getMetaContent(r3, "name", "sailthru.title") || (null === (o = null === (n2 = e3.querySelector("title")) || void 0 === n2 ? void 0 : n2.textContent) || void 0 === o ? void 0 : o.trim()) || "";
            return this.cleanTitle(a, this.getSite(e3, t3, r3));
          }
          static cleanTitle(e3, t3) {
            if (!e3 || !t3) return e3;
            const r3 = t3.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n2 = [`\\s*[\\|\\-\u2013\u2014]\\s*${r3}\\s*$`, `^\\s*${r3}\\s*[\\|\\-\u2013\u2014]\\s*`];
            for (const t4 of n2) {
              const r4 = new RegExp(t4, "i");
              if (r4.test(e3)) {
                e3 = e3.replace(r4, "");
                break;
              }
            }
            return e3.trim();
          }
          static getDescription(e3, t3, r3) {
            return this.getMetaContent(r3, "name", "description") || this.getMetaContent(r3, "property", "description") || this.getMetaContent(r3, "property", "og:description") || this.getSchemaProperty(t3, "description") || this.getMetaContent(r3, "name", "twitter:description") || this.getMetaContent(r3, "name", "sailthru.description") || "";
          }
          static getImage(e3, t3, r3) {
            return this.getMetaContent(r3, "property", "og:image") || this.getMetaContent(r3, "name", "twitter:image") || this.getSchemaProperty(t3, "image.url") || this.getMetaContent(r3, "name", "sailthru.image.full") || "";
          }
          static getLanguage(e3, t3, r3) {
            var n2, o, a, i;
            const s = null === (o = null === (n2 = e3.documentElement) || void 0 === n2 ? void 0 : n2.getAttribute("lang")) || void 0 === o ? void 0 : o.trim();
            if (s) return this.normalizeLangCode(s);
            const l = this.getMetaContent(r3, "name", "content-language") || this.getMetaContent(r3, "property", "og:locale");
            if (l) return this.normalizeLangCode(l);
            const c = null === (i = null === (a = e3.querySelector('meta[http-equiv="Content-Language" i]')) || void 0 === a ? void 0 : a.getAttribute("content")) || void 0 === i ? void 0 : i.trim();
            if (c) return this.normalizeLangCode(c);
            const u = this.getSchemaProperty(t3, "inLanguage");
            return u ? this.normalizeLangCode(u) : "";
          }
          static normalizeLangCode(e3) {
            return e3.replace(/_/g, "-");
          }
          static getFavicon(e3, t3, r3) {
            var n2, o;
            const a = this.getMetaContent(r3, "property", "og:image:favicon");
            if (a) return a;
            const i = null === (n2 = e3.querySelector("link[rel='icon']")) || void 0 === n2 ? void 0 : n2.getAttribute("href");
            if (i) return i;
            const s = null === (o = e3.querySelector("link[rel='shortcut icon']")) || void 0 === o ? void 0 : o.getAttribute("href");
            if (s) return s;
            if (t3 && /^https?:\/\//.test(t3)) try {
              return new URL("/favicon.ico", t3).href;
            } catch (e4) {
            }
            return "";
          }
          static getPublished(e3, t3, r3) {
            var n2, o, a;
            const i = this.getSchemaProperty(t3, "datePublished") || this.getMetaContent(r3, "name", "publishDate") || this.getMetaContent(r3, "property", "article:published_time") || (null === (o = null === (n2 = e3.querySelector('abbr[itemprop="datePublished"]')) || void 0 === n2 ? void 0 : n2.title) || void 0 === o ? void 0 : o.trim()) || this.getTimeElement(e3) || this.getMetaContent(r3, "name", "sailthru.date");
            if (i) return i;
            const s = e3.querySelector("h1");
            if (s) {
              let e4 = s.nextElementSibling;
              for (let t4 = 0; t4 < 3 && e4; t4++) {
                const t5 = this.parseDateText((null === (a = e4.textContent) || void 0 === a ? void 0 : a.trim()) || "");
                if (t5) return t5;
                e4 = e4.nextElementSibling;
              }
            }
            return "";
          }
          static getMetaContent(e3, t3, r3) {
            var n2;
            return null !== (n2 = this.getMetaContents(e3, t3, r3)[0]) && void 0 !== n2 ? n2 : "";
          }
          static getMetaContents(e3, t3, r3) {
            return e3.filter(((e4) => {
              const n2 = "name" === t3 ? e4.name : e4.property;
              return (null == n2 ? void 0 : n2.toLowerCase()) === r3.toLowerCase();
            })).map(((e4) => {
              var t4, r4;
              return null !== (r4 = null === (t4 = e4.content) || void 0 === t4 ? void 0 : t4.trim()) && void 0 !== r4 ? r4 : "";
            }));
          }
          static getTimeElement(e3) {
            var t3, r3, n2, o;
            const a = Array.from(e3.querySelectorAll("time"))[0];
            return a && null !== (o = null !== (r3 = null === (t3 = a.getAttribute("datetime")) || void 0 === t3 ? void 0 : t3.trim()) && void 0 !== r3 ? r3 : null === (n2 = a.textContent) || void 0 === n2 ? void 0 : n2.trim()) && void 0 !== o ? o : "";
          }
          static parseDateText(e3) {
            let t3 = e3.match(/\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/i);
            if (t3) {
              const e4 = t3[1].padStart(2, "0"), r3 = this.MONTH_MAP[t3[2].toLowerCase()];
              return `${t3[3]}-${r3}-${e4}T00:00:00+00:00`;
            }
            if (t3 = e3.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/i), t3) {
              const e4 = this.MONTH_MAP[t3[1].toLowerCase()], r3 = t3[2].padStart(2, "0");
              return `${t3[3]}-${e4}-${r3}T00:00:00+00:00`;
            }
            return "";
          }
          static getSchemaProperty(e3, t3, r3 = "") {
            if (!e3) return r3;
            const n2 = (e4, t4, r4, o = true) => {
              if ("string" == typeof e4) return 0 === t4.length ? [e4] : [];
              if (!e4 || "object" != typeof e4) return [];
              if (Array.isArray(e4)) {
                const a2 = t4[0];
                if (/^\[\d+\]$/.test(a2)) {
                  const i2 = parseInt(a2.slice(1, -1));
                  return e4[i2] ? n2(e4[i2], t4.slice(1), r4, o) : [];
                }
                return 0 === t4.length && e4.every(((e5) => "string" == typeof e5 || "number" == typeof e5)) ? e4.map(String) : e4.flatMap(((e5) => n2(e5, t4, r4, o)));
              }
              const [a, ...i] = t4;
              if (!a) return "string" == typeof e4 ? [e4] : "object" == typeof e4 && e4.name ? [e4.name] : [];
              if (e4.hasOwnProperty(a)) return n2(e4[a], i, r4 ? `${r4}.${a}` : a, true);
              if (!o) {
                const o2 = [];
                for (const a2 in e4) if ("object" == typeof e4[a2]) {
                  const i2 = n2(e4[a2], t4, r4 ? `${r4}.${a2}` : a2, false);
                  o2.push(...i2);
                }
                if (o2.length > 0) return o2;
              }
              return [];
            };
            try {
              let o = n2(e3, t3.split("."), "", true);
              0 === o.length && (o = n2(e3, t3.split("."), "", false));
              return o.length > 0 ? o.filter(Boolean).join(", ") : r3;
            } catch (e4) {
              return console.error(`Error in getSchemaProperty for ${t3}:`, e4), r3;
            }
          }
        }
        t2.MetadataExtractor = r2, r2.MONTH_MAP = { january: "01", february: "02", march: "03", april: "04", may: "05", june: "06", july: "07", august: "08", september: "09", october: "10", november: "11", december: "12" };
      }, 968(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.ContentScorer = void 0;
        const n2 = r2(640), o = r2(552), a = ["admonition", "article", "content", "entry", "image", "img", "font", "figure", "figcaption", "pre", "main", "post", "story", "table"], i = ["advertisement", "all rights reserved", "banner", "cookie", "comments", "copyright", "follow me", "follow us", "footer", "header", "homepage", "login", "menu", "more articles", "more like this", "most read", "nav", "navigation", "newsletter", "popular", "privacy", "recommended", "register", "related", "responses", "share", "sidebar", "sign in", "sign up", "signup", "social", "sponsored", "subscribe", "terms", "trending"], s = /\b(linkedin\.com\/(in|company)\/|twitter\.com\/(?!intent\b)\w|x\.com\/(?!intent\b)\w|facebook\.com\/(?!share\b)\w|instagram\.com\/\w|threads\.net\/\w|mastodon\.\w)/i, l = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}/i, c = /\bBy\s+[A-Z]/, u = i.map(((e3) => new RegExp(`\\b${e3.replace(/\s+/g, "\\s+")}\\b`))), d = new RegExp(i.map(((e3) => e3.replace(/\s+/g, "\\s+"))).join("|"), "i"), h = ["advert", "ad-", "ads", "banner", "cookie", "copyright", "footer", "header", "homepage", "menu", "nav", "newsletter", "popular", "privacy", "recommended", "related", "rights", "share", "sidebar", "social", "sponsored", "subscribe", "terms", "trending", "widget"];
        class m {
          constructor(e3, t3 = false) {
            this.doc = e3, this.debug = t3;
          }
          static scoreElement(e3) {
            let t3 = 0;
            const r3 = e3.textContent || "", a2 = (0, o.countWords)(r3);
            t3 += a2;
            t3 += 10 * e3.getElementsByTagName("p").length;
            t3 += r3.split(/,/).length - 1;
            t3 -= 3 * (e3.getElementsByTagName("img").length / (a2 || 1));
            try {
              const r4 = e3.getAttribute("style") || "", n3 = e3.getAttribute("align") || "";
              (r4.includes("float: right") || r4.includes("text-align: right") || "right" === n3) && (t3 += 5);
            } catch (e4) {
            }
            /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/i.test(r3) && (t3 += 10);
            /\b(?:by|written by|author:)\s+[A-Za-z\s]+\b/i.test(r3) && (t3 += 10);
            const i2 = e3.className.toLowerCase();
            (i2.includes("content") || i2.includes("article") || i2.includes("post")) && (t3 += 15);
            e3.querySelector(n2.FOOTNOTE_INLINE_REFERENCES) && (t3 += 10);
            e3.querySelector(n2.FOOTNOTE_LIST_SELECTORS) && (t3 += 10);
            if (t3 -= 5 * e3.getElementsByTagName("table").length, "td" === e3.tagName.toLowerCase()) {
              const r4 = e3.closest("table");
              if (r4) {
                const n3 = parseInt(r4.getAttribute("width") || "0"), o2 = r4.getAttribute("align") || "", a3 = r4.className.toLowerCase();
                if (n3 > 400 || "center" === o2 || a3.includes("content") || a3.includes("article")) {
                  const n4 = Array.from(r4.getElementsByTagName("td")), o3 = n4.indexOf(e3);
                  o3 > 0 && o3 < n4.length - 1 && (t3 += 10);
                }
              }
            }
            const s2 = e3.getElementsByTagName("a");
            let l2 = 0;
            for (let e4 = 0; e4 < s2.length; e4++) l2 += (s2[e4].textContent || "").length;
            const c2 = r3.length || 1;
            return t3 *= 1 - Math.min(l2 / c2, 0.5), t3;
          }
          static findBestElement(e3, t3 = 50) {
            let r3 = null, n3 = 0;
            return e3.forEach(((e4) => {
              const t4 = this.scoreElement(e4);
              t4 > n3 && (n3 = t4, r3 = e4);
            })), n3 > t3 ? r3 : null;
          }
          static scoreAndRemove(e3, t3 = false, r3, a2) {
            const i2 = Date.now(), s2 = /* @__PURE__ */ new Map();
            Array.from(e3.querySelectorAll(n2.BLOCK_ELEMENTS_SELECTOR)).forEach(((e4) => {
              if (s2.has(e4)) return;
              if (a2 && e4.contains(a2)) return;
              if (e4.closest("pre")) return;
              if (m.isLikelyContent(e4)) return;
              const t4 = m.scoreNonContentBlock(e4);
              t4 < 0 && s2.set(e4, t4);
            })), s2.forEach(((e4, n3) => {
              t3 && r3 && r3.push({ step: "scoreAndRemove", reason: `score: ${e4}`, text: (0, o.textPreview)(n3) }), n3.remove();
            }));
            const l2 = Date.now();
            t3 && console.log("Defuddle", "Removed non-content blocks:", { count: s2.size, processingTime: `${(l2 - i2).toFixed(2)}ms` });
          }
          static isLikelyContent(e3) {
            const t3 = e3.getAttribute("role");
            if (t3 && ["article", "main", "contentinfo"].includes(t3)) return true;
            const r3 = e3.className.toLowerCase(), n3 = e3.id.toLowerCase();
            for (const e4 of a) if (r3.includes(e4) || n3.includes(e4)) return true;
            if (e3.querySelector("pre, table")) return true;
            const i2 = e3.textContent || "", l2 = (0, o.countWords)(i2);
            if (l2 < 1e3) {
              const t4 = e3.querySelectorAll("h1, h2, h3, h4, h5, h6");
              let r4 = false;
              for (let e4 = 0; e4 < t4.length; e4++) {
                const n4 = (t4[e4].textContent || "").toLowerCase().trim();
                if (d.test(n4)) {
                  r4 = true;
                  break;
                }
              }
              if (r4) {
                if (l2 < 200) return false;
                if (e3.getElementsByTagName("a").length / (l2 || 1) > 0.2) return false;
              }
            }
            if (m.isCardGrid(e3, l2)) return false;
            if (l2 < 80) {
              const t4 = e3.getElementsByTagName("a");
              for (let e4 = 0; e4 < t4.length; e4++) {
                const r4 = (t4[e4].getAttribute("href") || "").toLowerCase();
                if (s.test(r4)) return false;
              }
            }
            const c2 = e3.getElementsByTagName("p").length + e3.getElementsByTagName("li").length;
            if (l2 > 50 && c2 > 1) return true;
            if (l2 > 100) return true;
            if (l2 > 30 && c2 > 0) return true;
            if (l2 >= 10 && /[.?!]/.test(i2)) {
              if (e3.getElementsByTagName("a").length / l2 < 0.1) return true;
            }
            return false;
          }
          static scoreNonContentBlock(e3) {
            try {
              if (e3.matches(n2.FOOTNOTE_LIST_SELECTORS) || e3.querySelector(n2.FOOTNOTE_LIST_SELECTORS) || e3.closest(n2.FOOTNOTE_LIST_SELECTORS)) return 0;
            } catch (e4) {
            }
            let t3 = 0;
            const r3 = e3.textContent || "", a2 = (0, o.countWords)(r3);
            if (a2 < 3) return 0;
            t3 += r3.split(/,/).length - 1;
            const i2 = r3.toLowerCase();
            let d2 = 0;
            for (const e4 of u) e4.test(i2) && d2++;
            t3 -= 10 * d2;
            const p = e3.getElementsByTagName("a"), f = p.length;
            if (f / (a2 || 1) > 0.5 && (t3 -= 15), f > 1 && a2 < 80) {
              let e4 = 0;
              for (let t4 = 0; t4 < p.length; t4++) e4 += (p[t4].textContent || "").length;
              const n3 = r3.length;
              n3 > 0 && e4 / n3 > 0.8 && (t3 -= 15);
            }
            const g = e3.getElementsByTagName("ul").length + e3.getElementsByTagName("ol").length;
            if (g > 0 && f > 3 * g && (t3 -= 10), a2 < 80) {
              const r4 = e3.getElementsByTagName("a");
              for (let e4 = 0; e4 < r4.length; e4++) {
                const n3 = (r4[e4].getAttribute("href") || "").toLowerCase();
                if (s.test(n3)) {
                  t3 -= 15;
                  break;
                }
              }
            }
            a2 < 15 && c.test(r3) && l.test(r3) && (t3 -= 10), m.isCardGrid(e3, a2) && (t3 -= 15);
            const b = e3.className.toLowerCase(), x = e3.id.toLowerCase();
            for (const e4 of h) (b.includes(e4) || x.includes(e4)) && (t3 -= 8);
            return t3;
          }
          static isCardGrid(e3, t3) {
            if (t3 < 3 || t3 >= 500) return false;
            const r3 = e3.querySelectorAll("h2, h3, h4");
            if (r3.length < 3) return false;
            if (e3.querySelectorAll("img").length < 2) return false;
            let n3 = 0;
            for (let e4 = 0; e4 < r3.length; e4++) n3 += (0, o.countWords)(r3[e4].textContent || "");
            return (t3 - n3) / r3.length < 20;
          }
        }
        t2.ContentScorer = m;
      }, 840(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.standardizeContent = function(e3, t3, r3, o2 = false) {
          if (u = o2, (function(e4) {
            const t4 = (e5) => {
              if ((0, l.isElement)(e5)) {
                const t5 = e5.tagName.toLowerCase();
                if ("pre" === t5 || "code" === t5) return;
              }
              if ((0, l.isTextNode)(e5)) {
                const t5 = e5.textContent || "", r4 = t5.replace(/\xA0/g, " ");
                r4 !== t5 && (e5.textContent = r4);
              }
              e5.hasChildNodes() && Array.from(e5.childNodes).forEach(t4);
            };
            t4(e4);
          })(e3), (function(e4) {
            var t4;
            let r4 = 0;
            const n3 = e4.ownerDocument.createTreeWalker(e4, 128), o3 = [];
            for (; n3.nextNode(); ) o3.push(n3.currentNode);
            for (const e5 of o3) null === (t4 = e5.parentNode) || void 0 === t4 || t4.removeChild(e5), r4++;
            (0, l.logDebug)(u, "Removed HTML comments:", r4);
          })(e3), (function(e4, t4, r4) {
            const o3 = (e5) => e5.replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim().toLowerCase(), a2 = e4.getElementsByTagName("h1");
            Array.from(a2).forEach(((e5) => {
              var t5;
              const o4 = r4.createElement("h2");
              (0, c.transferContent)(e5, o4), Array.from(e5.attributes).forEach(((e6) => {
                n2.ALLOWED_ATTRIBUTES.has(e6.name) && o4.setAttribute(e6.name, e6.value);
              })), null === (t5 = e5.parentNode) || void 0 === t5 || t5.replaceChild(o4, e5);
            }));
            const i2 = e4.getElementsByTagName("h2");
            if (i2.length > 0) {
              const e5 = i2[0], r5 = o3(e5.textContent || ""), n3 = o3(t4);
              n3 && n3 === r5 && e5.remove();
            }
          })(e3, t3.title, r3), (function(e4, t4) {
            var r4;
            const n3 = Array.from(e4.querySelectorAll("code"));
            for (const e5 of n3) {
              if (e5.closest("pre")) continue;
              const n4 = e5.getAttribute("style") || "";
              if (!/white-space\s*:\s*pre/.test(n4)) continue;
              const o3 = t4.createElement("pre");
              null === (r4 = e5.parentNode) || void 0 === r4 || r4.insertBefore(o3, e5), o3.appendChild(e5);
            }
          })(e3, r3), (function(e4, t4) {
            let r4 = 0;
            d.forEach(((n3) => {
              let o3;
              try {
                o3 = e4.querySelectorAll(n3.selector);
              } catch (e5) {
                return;
              }
              o3.forEach(((e5) => {
                if (n3.transform) {
                  const o4 = n3.transform(e5, t4);
                  e5.replaceWith(o4), r4++;
                }
              }));
            }));
            Array.from(e4.querySelectorAll("table.ltx_equation, table.ltx_eqn_table, table.ltx_equationgroup")).forEach(((e5) => {
              const n3 = e5.querySelectorAll("math");
              if (0 === n3.length) return;
              const o3 = t4.createDocumentFragment();
              n3.forEach(((r5) => {
                var n4;
                const a2 = r5.getAttribute("alttext"), i2 = r5.querySelector('annotation[encoding="application/x-tex"]'), s2 = a2 || (null === (n4 = null == i2 ? void 0 : i2.textContent) || void 0 === n4 ? void 0 : n4.trim()) || "";
                if (!s2) return;
                const l2 = "block" === r5.getAttribute("display") || e5.classList.contains("ltx_equation") || e5.classList.contains("ltx_equationgroup"), c2 = t4.createElement("math");
                c2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), c2.setAttribute("display", l2 ? "block" : "inline"), c2.setAttribute("data-latex", s2), c2.textContent = s2, o3.appendChild(c2);
              })), o3.childNodes.length > 0 && (e5.replaceWith(o3), r4++);
            }));
            Array.from(e4.querySelectorAll("span.ltx_note_outer")).forEach(((e5) => {
              e5.remove(), r4++;
            }));
            Array.from(e4.querySelectorAll("a.ltx_ref")).forEach(((e5) => {
              if (e5.querySelector("span.ltx_ref_tag, span.ltx_text.ltx_ref_tag")) {
                const n3 = t4.createTextNode(e5.textContent || "");
                e5.replaceWith(n3), r4++;
              }
            }));
            Array.from(e4.querySelectorAll("table")).forEach(((e5) => {
              if (!e5.parentNode) return;
              const n3 = Array.from(e5.querySelectorAll("td, th")).filter(((t5) => (0, c.isDirectTableChild)(t5, e5)));
              if (n3.some(((e6) => "TH" === e6.tagName))) return;
              const o3 = Array.from(e5.querySelectorAll("tr")).filter(((t5) => (0, c.isDirectTableChild)(t5, e5)));
              if (0 === o3.length) return;
              if (!o3.every(((e6) => n3.filter(((t5) => t5.parentNode === e6)).length <= 1))) return;
              const a2 = t4.createDocumentFragment();
              n3.forEach(((e6) => {
                for (; e6.firstChild; ) a2.appendChild(e6.firstChild);
              })), e5.replaceWith(a2), r4++;
            }));
            e4.querySelectorAll("lite-youtube").forEach(((e5) => {
              const n3 = e5.getAttribute("videoid");
              if (!n3) return;
              const o3 = t4.createElement("iframe");
              o3.width = "560", o3.height = "315", o3.src = `https://www.youtube.com/embed/${n3}`, o3.title = e5.getAttribute("videotitle") || "YouTube video player", o3.frameBorder = "0", o3.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", o3.setAttribute("allowfullscreen", ""), e5.replaceWith(o3), r4++;
            })), (0, l.logDebug)(u, "Converted embedded elements:", r4), (function(e5) {
              var t5;
              const r5 = (e6) => {
                let t6 = null;
                for (const r6 of e6.children) {
                  if ("code" !== r6.tagName.toLowerCase()) return null;
                  if (t6) return null;
                  t6 = r6;
                }
                return t6;
              }, n3 = (e6) => {
                var t6;
                const r6 = (e6.getAttribute("data-lang") || "").toLowerCase();
                if (r6) return r6;
                const n4 = (e6.getAttribute("class") || "").match(/(?:^|\s)language-([a-z0-9_+-]+)(?:\s|$)/i);
                return (null === (t6 = null == n4 ? void 0 : n4[1]) || void 0 === t6 ? void 0 : t6.toLowerCase()) || "";
              }, o3 = e5.querySelectorAll('pre[data-verso-code="true"]'), a2 = /* @__PURE__ */ new Set();
              for (const e6 of o3) {
                const t6 = e6.parentElement;
                t6 && a2.add(t6);
              }
              for (const e6 of a2) {
                const o4 = Array.from(e6.childNodes);
                for (let e7 = 0; e7 < o4.length; e7++) {
                  const a3 = o4[e7];
                  if (!(0, l.isElement)(a3) || "pre" !== a3.tagName.toLowerCase()) continue;
                  if ("true" !== a3.getAttribute("data-verso-code")) continue;
                  const i2 = r5(a3);
                  if (!i2) continue;
                  const s2 = n3(i2);
                  if ("lean" !== s2 && "lean4" !== s2) continue;
                  const c2 = [{ pre: a3, code: i2 }], u2 = [];
                  let d2 = e7 + 1;
                  for (; d2 < o4.length; ) {
                    const e8 = o4[d2];
                    if ((0, l.isTextNode)(e8) && !(e8.textContent || "").trim()) {
                      u2.push(e8), d2++;
                      continue;
                    }
                    if (!(0, l.isElement)(e8) || "pre" !== e8.tagName.toLowerCase()) break;
                    const t6 = e8;
                    if ("true" !== t6.getAttribute("data-verso-code")) break;
                    const a4 = r5(t6);
                    if (!a4 || n3(a4) !== s2) break;
                    c2.push({ pre: t6, code: a4 }), d2++;
                  }
                  if (c2.length <= 1) continue;
                  const h2 = c2.map((({ code: e8 }) => (e8.textContent || "").replace(/\r?\n$/, ""))).join("\n").replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "");
                  i2.textContent = h2;
                  for (let e8 = 1; e8 < c2.length; e8++) c2[e8].pre.remove();
                  for (const e8 of u2) null === (t5 = e8.parentNode) || void 0 === t5 || t5.removeChild(e8);
                  e7 = d2 - 1;
                }
              }
            })(e4);
          })(e3, r3), o2) m(e3, o2), h(e3), p(e3), (0, l.logDebug)(u, "Debug mode: Skipping div flattening to preserve structure");
          else {
            g(e3, r3), m(e3, o2), (function(e4) {
              const t4 = Array.from(e4.querySelectorAll("span")).reverse();
              let r4 = 0;
              for (const e5 of t4) {
                if (!e5.parentNode) continue;
                if (e5.attributes.length > 0) continue;
                const t5 = e5.parentNode;
                if (t5) {
                  for (; e5.firstChild; ) t5.insertBefore(e5.firstChild, e5);
                  e5.remove(), r4++;
                }
              }
              r4 > 0 && e4.normalize();
              (0, l.logDebug)(u, "Unwrapped bare spans:", r4);
            })(e3);
            Array.from(e3.querySelectorAll('a[href^="javascript:"]')).forEach(((e4) => {
              for (var t4; e4.firstChild; ) null === (t4 = e4.parentNode) || void 0 === t4 || t4.insertBefore(e4.firstChild, e4);
              e4.remove();
            }));
            Array.from(e3.querySelectorAll('a[href^="#"]')).forEach(((e4) => {
              var t4;
              if (e4.querySelector("h1, h2, h3, h4, h5, h6")) {
                for (; e4.firstChild; ) null === (t4 = e4.parentNode) || void 0 === t4 || t4.insertBefore(e4.firstChild, e4);
                e4.remove();
              }
            })), e3.querySelectorAll("object, embed, applet").forEach(((e4) => e4.remove())), (function(e4) {
              let t4 = 0;
              const r4 = (e5) => {
                var t5;
                if (n2.ALLOWED_EMPTY_ELEMENTS.has(e5.tagName.toLowerCase())) return false;
                if ("DIV" === e5.tagName) {
                  const r6 = e5.children;
                  if (r6.length > 0) {
                    let e6 = true;
                    for (let n3 = 0; n3 < r6.length; n3++) {
                      const o5 = r6[n3];
                      if ("SPAN" !== o5.tagName) {
                        e6 = false;
                        break;
                      }
                      const a2 = (null === (t5 = o5.textContent) || void 0 === t5 ? void 0 : t5.trim()) || "";
                      if ("," !== a2 && "" !== a2 && " " !== a2) {
                        e6 = false;
                        break;
                      }
                    }
                    if (e6) return true;
                  }
                }
                const r5 = e5.textContent || "";
                if (r5.trim().length > 0 || r5.includes("\xA0")) return false;
                if (!e5.hasChildNodes()) return true;
                const o4 = e5.childNodes;
                for (let e6 = 0; e6 < o4.length; e6++) {
                  const t6 = o4[e6];
                  if (!(0, l.isTextNode)(t6)) return false;
                  const r6 = t6.textContent || "";
                  if (r6.trim().length > 0 || r6.includes("\xA0")) return false;
                }
                return true;
              }, o3 = Array.from(e4.querySelectorAll("*")).reverse();
              for (const e5 of o3) e5.parentNode && r4(e5) && (e5.remove(), t4++);
              (0, l.logDebug)(u, "Removed empty elements:", t4);
            })(e3), h(e3), (function(e4) {
              for (; ; ) {
                let t4 = e4.firstChild;
                for (; t4 && (0, l.isTextNode)(t4) && !(t4.textContent || "").trim(); ) t4 = t4.nextSibling;
                if (!t4 || !(0, l.isElement)(t4) || "hr" !== t4.tagName.toLowerCase()) break;
                t4.remove();
              }
              for (; ; ) {
                let t4 = e4.lastChild;
                for (; t4 && (0, l.isTextNode)(t4) && !(t4.textContent || "").trim(); ) t4 = t4.previousSibling;
                if (!t4 || !(0, l.isElement)(t4) || "hr" !== t4.tagName.toLowerCase()) break;
                t4.remove();
              }
            })(e3), g(e3, r3), p(e3), (function(e4, t4) {
              let r4 = 0;
              const o3 = Date.now(), a2 = (e5) => {
                var t5;
                if ((0, l.isElement)(e5)) {
                  const t6 = e5.tagName.toLowerCase();
                  if ("pre" === t6 || "code" === t6) return;
                }
                if (Array.from(e5.childNodes).forEach(a2), (0, l.isTextNode)(e5)) {
                  const n3 = e5.textContent || "";
                  if (!n3 || /^[\u200C\u200B\u200D\u200E\u200F\uFEFF]*$/.test(n3)) null === (t5 = e5.parentNode) || void 0 === t5 || t5.removeChild(e5), r4++;
                  else {
                    const t6 = n3.replace(/[\n\r]+/g, " ").replace(/\t+/g, " ").replace(/ {2,}/g, " ").replace(/^[ ]+$/, " ").replace(/\s+([,.!?:;])/g, "$1").replace(/[\u200B\u200D\u200E\u200F\uFEFF]+/g, "").replace(/(?:\xA0){2,}/g, "\xA0");
                    t6 !== n3 && (e5.textContent = t6, r4 += n3.length - t6.length);
                  }
                }
              }, i2 = (e5) => {
                var o4;
                if (!(0, l.isElement)(e5)) return;
                const a3 = e5.tagName.toLowerCase();
                if ("pre" === a3 || "code" === a3) return;
                Array.from(e5.childNodes).filter(l.isElement).forEach(i2), e5.normalize();
                const s3 = "block" === (null === (o4 = (0, l.getComputedStyle)(e5)) || void 0 === o4 ? void 0 : o4.display), c2 = s3 ? /^[\n\r\t \u200C\u200B\u200D\u200E\u200F\uFEFF\xA0]*$/ : /^[\n\r\t\u200C\u200B\u200D\u200E\u200F\uFEFF]*$/;
                for (; e5.firstChild && (0, l.isTextNode)(e5.firstChild) && (e5.firstChild.textContent || "").match(c2); ) e5.removeChild(e5.firstChild), r4++;
                for (; e5.lastChild && (0, l.isTextNode)(e5.lastChild) && (e5.lastChild.textContent || "").match(c2); ) e5.removeChild(e5.lastChild), r4++;
                if (!s3 && n2.INLINE_ELEMENTS.has(a3) && e5.parentNode && (r4 += f(e5, t4, "leading"), r4 += f(e5, t4, "trailing")), !s3) {
                  const r5 = Array.from(e5.childNodes);
                  for (let n3 = 0; n3 < r5.length - 1; n3++) {
                    const o5 = r5[n3], a4 = r5[n3 + 1];
                    if ((0, l.isElement)(o5) || (0, l.isElement)(a4)) {
                      const r6 = a4.textContent || "", n4 = o5.textContent || "", i3 = r6.match(/^[,.!?:;)\]]/), s4 = n4.match(/[,.!?:;(\[]\s*$/), c3 = (0, l.isTextNode)(o5) && (o5.textContent || "").endsWith(" ") || (0, l.isTextNode)(a4) && (a4.textContent || "").startsWith(" ");
                      if (!i3 && !s4 && !c3) {
                        const r7 = t4.createTextNode(" ");
                        e5.insertBefore(r7, a4);
                      }
                    }
                  }
                }
              };
              a2(e4), i2(e4);
              const s2 = Date.now();
              (0, l.logDebug)(u, "Removed empty lines:", { charactersRemoved: r4, processingTime: `${(s2 - o3).toFixed(2)}ms` });
            })(e3, r3);
          }
        };
        const n2 = r2(640), o = r2(974), a = r2(754), i = r2(864), s = r2(649), l = r2(552), c = r2(639);
        let u = false;
        const d = [...o.mathRules, ...a.codeBlockRules, ...i.headingRules, ...s.imageRules, { selector: 'aside[class*="callout"]', element: "blockquote", transform: (e3, t3) => {
          const r3 = t3.createElement("blockquote"), n3 = Array.from(e3.classList).find(((e4) => e4.startsWith("callout-"))), o2 = n3 ? n3.replace("callout-", "") : "note";
          r3.setAttribute("data-callout", o2);
          const a2 = e3.querySelector(".callout-content");
          return (0, c.transferContent)(a2 || e3, r3), r3;
        } }, { selector: 'div[data-testid^="paragraph"], div[role="paragraph"]', element: "p", transform: (e3, t3) => {
          const r3 = t3.createElement("p");
          return (0, c.transferContent)(e3, r3), Array.from(e3.attributes).forEach(((e4) => {
            n2.ALLOWED_ATTRIBUTES.has(e4.name) && r3.setAttribute(e4.name, e4.value);
          })), r3;
        } }, { selector: 'div[role="list"]', element: "ul", transform: (e3, t3) => {
          var r3;
          const n3 = e3.querySelector('div[role="listitem"] .label'), o2 = ((null === (r3 = null == n3 ? void 0 : n3.textContent) || void 0 === r3 ? void 0 : r3.trim()) || "").match(/^\d+\)/), a2 = t3.createElement(o2 ? "ol" : "ul");
          return e3.querySelectorAll('div[role="listitem"]').forEach(((e4) => {
            const r4 = t3.createElement("li"), n4 = e4.querySelector(".content");
            if (n4) {
              n4.querySelectorAll('div[role="paragraph"]').forEach(((e5) => {
                const r5 = t3.createElement("p");
                (0, c.transferContent)(e5, r5), e5.replaceWith(r5);
              }));
              n4.querySelectorAll('div[role="list"]').forEach(((e5) => {
                var r5;
                const n5 = e5.querySelector('div[role="listitem"] .label'), o3 = ((null === (r5 = null == n5 ? void 0 : n5.textContent) || void 0 === r5 ? void 0 : r5.trim()) || "").match(/^\d+\)/), a3 = t3.createElement(o3 ? "ol" : "ul");
                e5.querySelectorAll('div[role="listitem"]').forEach(((e6) => {
                  const r6 = t3.createElement("li"), n6 = e6.querySelector(".content");
                  if (n6) {
                    n6.querySelectorAll('div[role="paragraph"]').forEach(((e7) => {
                      const r7 = t3.createElement("p");
                      (0, c.transferContent)(e7, r7), e7.replaceWith(r7);
                    })), (0, c.transferContent)(n6, r6);
                  }
                  a3.appendChild(r6);
                })), e5.replaceWith(a3);
              })), (0, c.transferContent)(n4, r4);
            }
            a2.appendChild(r4);
          })), a2;
        } }, { selector: 'div[role="listitem"]', element: "li", transform: (e3, t3) => {
          const r3 = e3.querySelector(".content");
          if (!r3) return e3;
          return r3.querySelectorAll('div[role="paragraph"]').forEach(((e4) => {
            const r4 = t3.createElement("p");
            (0, c.transferContent)(e4, r4), e4.replaceWith(r4);
          })), r3;
        } }];
        function h(e3) {
          let t3 = 0;
          const r3 = (t4) => {
            let n4 = "", o2 = t4.nextSibling;
            for (; o2; ) ((0, l.isTextNode)(o2) || (0, l.isElement)(o2)) && (n4 += o2.textContent || ""), o2 = o2.nextSibling;
            if (n4.trim()) return true;
            const a2 = t4.parentElement;
            return !(!a2 || a2 === e3) && r3(a2);
          }, n3 = Array.from(e3.querySelectorAll("h1, h2, h3, h4, h5, h6")).reverse();
          for (const e4 of n3) {
            if (r3(e4)) break;
            e4.remove(), t3++;
          }
          t3 > 0 && (0, l.logDebug)(u, "Removed trailing headings:", t3);
        }
        function m(e3, t3) {
          let r3 = 0;
          const o2 = (e4) => {
            if ("svg" === e4.tagName.toLowerCase() || "http://www.w3.org/2000/svg" === e4.namespaceURI) return;
            const o3 = Array.from(e4.attributes), a2 = e4.tagName.toLowerCase();
            o3.forEach(((o4) => {
              const i2 = o4.name.toLowerCase(), s2 = o4.value;
              "id" === i2 && (s2.startsWith("fnref:") || s2.startsWith("fn:") || "footnotes" === s2) || "class" === i2 && ("code" === a2 && s2.startsWith("language-") || "footnote-backref" === s2) || (t3 ? n2.ALLOWED_ATTRIBUTES.has(i2) || n2.ALLOWED_ATTRIBUTES_DEBUG.has(i2) || i2.startsWith("data-") || (e4.removeAttribute(o4.name), r3++) : n2.ALLOWED_ATTRIBUTES.has(i2) || (e4.removeAttribute(o4.name), r3++));
            }));
          };
          o2(e3), e3.querySelectorAll("*").forEach(o2), (0, l.logDebug)(u, "Stripped attributes:", r3);
        }
        function p(e3) {
          let t3 = 0;
          const r3 = Date.now(), n3 = Array.from(e3.getElementsByTagName("br"));
          let o2 = [];
          const a2 = () => {
            if (o2.length > 2) for (let e4 = 2; e4 < o2.length; e4++) o2[e4].remove(), t3++;
            o2 = [];
          };
          n3.forEach(((e4) => {
            var t4;
            let r4 = false;
            if (o2.length > 0) {
              const n4 = o2[o2.length - 1];
              let a3 = e4.previousSibling;
              for (; a3 && (0, l.isTextNode)(a3) && !(null === (t4 = a3.textContent) || void 0 === t4 ? void 0 : t4.trim()); ) a3 = a3.previousSibling;
              a3 === n4 && (r4 = true);
            }
            r4 ? o2.push(e4) : (a2(), o2 = [e4]);
          })), a2();
          const i2 = Date.now();
          (0, l.logDebug)(u, "Standardized br elements:", { removed: t3, processingTime: `${(i2 - r3).toFixed(2)}ms` });
        }
        function f(e3, t3, r3) {
          const n3 = "leading" === r3 ? e3.firstChild : e3.lastChild;
          if (!n3 || !(0, l.isTextNode)(n3)) return 0;
          const o2 = n3.textContent || "", a2 = "leading" === r3 ? o2.replace(/^\s+/, "") : o2.replace(/\s+$/, "");
          if (a2 === o2 || !e3.parentNode) return 0;
          n3.textContent = a2;
          const i2 = "leading" === r3 ? e3.previousSibling : e3.nextSibling;
          if (!(i2 && (0, l.isTextNode)(i2) && ("leading" === r3 ? (i2.textContent || "").endsWith(" ") : (i2.textContent || "").startsWith(" ")))) {
            const n4 = "leading" === r3 ? e3 : e3.nextSibling;
            e3.parentNode.insertBefore(t3.createTextNode(" "), n4);
          }
          return 1;
        }
        function g(e3, t3) {
          let r3 = 0;
          const o2 = Date.now();
          let a2 = true;
          function i2(e4) {
            var t4;
            for (const r4 of e4.childNodes) {
              if ((0, l.isTextNode)(r4) && (null === (t4 = r4.textContent) || void 0 === t4 ? void 0 : t4.trim())) return true;
              if ((0, l.isElement)(r4) && n2.INLINE_ELEMENTS.has(r4.nodeName.toLowerCase())) return true;
            }
            return false;
          }
          const s2 = (e4) => {
            const t4 = e4.tagName.toLowerCase();
            if (n2.PRESERVE_ELEMENTS.has(t4)) return true;
            const r4 = e4.getAttribute("role");
            if (r4 && ["article", "main", "navigation", "banner", "contentinfo"].includes(r4)) return true;
            const o3 = e4.className;
            if ("string" == typeof o3 && o3.toLowerCase().match(/(?:article|main|content|footnote|reference|bibliography)/)) return true;
            return !!Array.from(e4.children).some(((e5) => n2.PRESERVE_ELEMENTS.has(e5.tagName.toLowerCase()) || "article" === e5.getAttribute("role") || e5.className && "string" == typeof e5.className && e5.className.toLowerCase().match(/(?:article|main|content|footnote|reference|bibliography)/)));
          }, c2 = (e4) => {
            var t4;
            if (i2(e4)) return false;
            if (!(null === (t4 = e4.textContent) || void 0 === t4 ? void 0 : t4.trim())) return true;
            const r4 = Array.from(e4.children);
            if (0 === r4.length) return true;
            if (r4.every(((e5) => {
              const t5 = e5.tagName.toLowerCase();
              return n2.BLOCK_ELEMENTS_SET.has(t5) || "p" === t5 || "h1" === t5 || "h2" === t5 || "h3" === t5 || "h4" === t5 || "h5" === t5 || "h6" === t5 || "ul" === t5 || "ol" === t5 || "pre" === t5 || "blockquote" === t5 || "figure" === t5;
            }))) return true;
            const o3 = e4.className.toLowerCase();
            if (/(?:wrapper|container|layout|row|col|grid|flex|outer|inner|content-area)/i.test(o3)) return true;
            const a3 = Array.from(e4.childNodes).filter(((e5) => {
              var t5;
              return (0, l.isTextNode)(e5) && (null === (t5 = e5.textContent) || void 0 === t5 ? void 0 : t5.trim());
            }));
            if (0 === a3.length) return true;
            return !(!(r4.length > 0) || r4.some(((e5) => {
              const t5 = e5.tagName.toLowerCase();
              return n2.INLINE_ELEMENTS.has(t5);
            })));
          }, d2 = (o3) => {
            var a3, u2;
            if (!o3.parentNode || s2(o3)) return false;
            const d3 = o3.tagName.toLowerCase();
            if (!n2.ALLOWED_EMPTY_ELEMENTS.has(d3) && !o3.children.length && !(null === (a3 = o3.textContent) || void 0 === a3 ? void 0 : a3.trim())) return o3.remove(), r3++, true;
            if (o3.parentElement === e3) {
              const e4 = Array.from(o3.children);
              if (e4.length > 0 && !e4.some(((e5) => {
                const t4 = e5.tagName.toLowerCase();
                return n2.INLINE_ELEMENTS.has(t4);
              }))) {
                const e5 = t3.createDocumentFragment();
                for (; o3.firstChild; ) e5.appendChild(o3.firstChild);
                return o3.replaceWith(e5), r3++, true;
              }
            }
            if (c2(o3)) {
              if (!Array.from(o3.children).some(((e5) => {
                const t4 = e5.tagName.toLowerCase();
                return n2.INLINE_ELEMENTS.has(t4);
              }))) {
                const e5 = t3.createDocumentFragment();
                for (; o3.firstChild; ) e5.appendChild(o3.firstChild);
                return o3.replaceWith(e5), r3++, true;
              }
              const e4 = t3.createDocumentFragment();
              for (; o3.firstChild; ) e4.appendChild(o3.firstChild);
              return o3.replaceWith(e4), r3++, true;
            }
            const h3 = Array.from(o3.childNodes);
            if (h3.length > 0 && h3.every(((e4) => (0, l.isTextNode)(e4) || (0, l.isElement)(e4) && n2.INLINE_ELEMENTS.has(e4.nodeName.toLowerCase()))) && (null === (u2 = o3.textContent) || void 0 === u2 ? void 0 : u2.trim())) {
              const e4 = t3.createElement("p");
              for (; o3.firstChild; ) e4.appendChild(o3.firstChild);
              return o3.replaceWith(e4), r3++, true;
            }
            if (1 === o3.children.length) {
              const e4 = o3.firstElementChild, t4 = e4.tagName.toLowerCase();
              if (n2.BLOCK_ELEMENTS_SET.has(t4) && !s2(e4)) return o3.replaceWith(e4), r3++, true;
            }
            let m3 = 0, p3 = o3.parentElement;
            for (; p3; ) {
              const e4 = p3.tagName.toLowerCase();
              n2.BLOCK_ELEMENTS_SET.has(e4) && m3++, p3 = p3.parentElement;
            }
            if (m3 > 0 && !i2(o3)) {
              const e4 = t3.createDocumentFragment();
              for (; o3.firstChild; ) e4.appendChild(o3.firstChild);
              return o3.replaceWith(e4), r3++, true;
            }
            return false;
          }, h2 = () => {
            const t4 = Array.from(e3.children).filter(((e4) => n2.BLOCK_ELEMENTS_SET.has(e4.tagName.toLowerCase())));
            let r4 = false;
            return t4.forEach(((e4) => {
              d2(e4) && (r4 = true);
            })), r4;
          }, m2 = () => {
            const t4 = Array.from(e3.querySelectorAll(n2.BLOCK_ELEMENTS_SELECTOR)).sort(((e4, t5) => {
              const r5 = (e5) => {
                let t6 = 0, r6 = e5.parentElement;
                for (; r6; ) {
                  const e6 = r6.tagName.toLowerCase();
                  n2.BLOCK_ELEMENTS_SET.has(e6) && t6++, r6 = r6.parentElement;
                }
                return t6;
              };
              return r5(t5) - r5(e4);
            }));
            let r4 = false;
            return t4.forEach(((e4) => {
              d2(e4) && (r4 = true);
            })), r4;
          }, p2 = () => {
            const o3 = Array.from(e3.querySelectorAll(n2.BLOCK_ELEMENTS_SELECTOR));
            let a3 = false;
            return o3.forEach(((e4) => {
              const n3 = Array.from(e4.children);
              if (n3.length > 0 && n3.every(((e5) => "p" === e5.tagName.toLowerCase())) || !s2(e4) && c2(e4)) {
                const n4 = t3.createDocumentFragment();
                for (; e4.firstChild; ) n4.appendChild(e4.firstChild);
                e4.replaceWith(n4), r3++, a3 = true;
              }
            })), a3;
          };
          do {
            a2 = false, h2() && (a2 = true), m2() && (a2 = true), p2() && (a2 = true);
          } while (a2);
          const f2 = Date.now();
          (0, l.logDebug)(u, "Flattened wrapper elements:", { count: r3, processingTime: `${(f2 - o2).toFixed(2)}ms` });
        }
      }, 552(e2, t2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.isElement = function(e3) {
          return e3.nodeType === r2;
        }, t2.isTextNode = function(e3) {
          return e3.nodeType === n2;
        }, t2.isCommentNode = function(e3) {
          return e3.nodeType === o;
        }, t2.getComputedStyle = function(e3) {
          const t3 = a(e3.ownerDocument);
          return t3 ? t3.getComputedStyle(e3) : null;
        }, t2.getWindow = a, t2.textPreview = function(e3) {
          return (e3.textContent || "").trim().substring(0, 200);
        }, t2.logDebug = function(e3, t3, ...r3) {
          e3 && console.log("Defuddle:", t3, ...r3);
        }, t2.countWords = function(e3) {
          if (!e3) return 0;
          let t3 = 0, r3 = 0, n3 = false;
          for (let o2 = 0; o2 < e3.length; o2++) {
            const a2 = e3.charCodeAt(o2);
            a2 >= 12352 && a2 <= 12447 || a2 >= 12448 && a2 <= 12543 || a2 >= 13312 && a2 <= 19903 || a2 >= 19968 && a2 <= 40959 || a2 >= 63744 && a2 <= 64255 || a2 >= 44032 && a2 <= 55215 ? (t3++, n3 = false) : a2 <= 32 ? n3 = false : n3 || (r3++, n3 = true);
          }
          return t3 + r3;
        };
        const r2 = 1, n2 = 3, o = 8;
        function a(e3) {
          return e3.defaultView ? e3.defaultView : e3.ownerWindow ? e3.ownerWindow : e3.window ? e3.window : null;
        }
      }, 77(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.buildContentHtml = function(e3, t3, r3) {
          return `
		<div class="${e3} post">
			<div class="post-content">
				${t3}
			</div>
		</div>
		${r3 ? `
			<hr>
			<div class="${e3} comments">
				<h2>Comments</h2>
				${r3}
			</div>
		` : ""}
	`.trim();
        }, t2.buildCommentTree = function(e3) {
          var t3, r3, n3;
          const a = [], i = [];
          for (const s of e3) {
            const e4 = null !== (t3 = s.depth) && void 0 !== t3 ? t3 : 0;
            if (0 === e4) {
              for (; i.length > 0; ) a.push("</blockquote>"), i.pop();
              a.push("<blockquote>"), i.push(0);
            } else {
              if (e4 < (null !== (r3 = i[i.length - 1]) && void 0 !== r3 ? r3 : -1)) for (; i.length > 0 && i[i.length - 1] >= e4; ) a.push("</blockquote>"), i.pop();
              e4 > (null !== (n3 = i[i.length - 1]) && void 0 !== n3 ? n3 : -1) && (a.push("<blockquote>"), i.push(e4));
            }
            a.push(o(s));
          }
          for (; i.length > 0; ) a.push("</blockquote>"), i.pop();
          return a.join("");
        }, t2.buildComment = o;
        const n2 = r2(639);
        function o(e3) {
          const t3 = `<span class="comment-author"><strong>${(0, n2.escapeHtml)(e3.author)}</strong></span>`, r3 = e3.url && !(0, n2.isDangerousUrl)(e3.url) ? e3.url : "";
          return `<div class="comment">
	<div class="comment-metadata">
		${t3} \xB7 ${r3 ? `<a href="${(0, n2.escapeHtml)(r3)}" class="comment-link">${(0, n2.escapeHtml)(e3.date)}</a>` : `<span class="comment-date">${(0, n2.escapeHtml)(e3.date)}</span>`}${e3.score ? ` \xB7 <span class="comment-points">${(0, n2.escapeHtml)(e3.score)}</span>` : ""}
	</div>
	<div class="comment-content">${e3.content}</div>
</div>`;
        }
      }, 639(e2, t2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.transferContent = function(e3, t3) {
          if ("replaceChildren" in t3) t3.replaceChildren();
          else for (; t3.firstChild; ) t3.removeChild(t3.firstChild);
          for (; e3.firstChild; ) t3.appendChild(e3.firstChild);
        }, t2.serializeHTML = function(e3) {
          return e3.innerHTML;
        }, t2.decodeHTMLEntities = function(e3, t3) {
          const r2 = e3.createElement("textarea");
          return r2.innerHTML = t3, r2.value;
        }, t2.escapeHtml = function(e3) {
          return e3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        }, t2.isDangerousUrl = function(e3) {
          const t3 = e3.replace(/[\s\u0000-\u001F]+/g, "").toLowerCase();
          return t3.startsWith("javascript:") || t3.startsWith("data:text/html");
        }, t2.isDirectTableChild = function(e3, t3) {
          let r2 = e3.parentNode;
          for (; r2 && r2 !== t3; ) {
            if ("TABLE" === r2.nodeName) return false;
            r2 = r2.parentNode;
          }
          return r2 === t3;
        }, t2.parseHTML = function(e3, t3) {
          if (!t3) return e3.createDocumentFragment();
          const r2 = e3.createElement("template");
          if (r2.innerHTML = t3, r2.content) return r2.content;
          const n2 = e3.createElement("div");
          n2.innerHTML = t3;
          const o = e3.createDocumentFragment();
          for (; n2.firstChild; ) o.appendChild(n2.firstChild);
          return o;
        };
      }, 497(e2, t2, r2) {
        "use strict";
        Object.defineProperty(t2, "__esModule", { value: true }), t2.formatTimestamp = o, t2.buildTranscript = function(e3, t3, r3 = []) {
          const a = [...r3].sort(((e4, t4) => e4.start - t4.start));
          let i = 0;
          const s = [], l = [];
          for (const e4 of t3) {
            for (; i < a.length && a[i].start <= e4.start; ) {
              const e5 = a[i].title;
              s.push(`<h3>${(0, n2.escapeHtml)(e5)}</h3>`), l.length > 0 && l.push(""), l.push(`### ${e5}`), l.push(""), i++;
            }
            const t4 = o(e4.start), r4 = void 0 !== e4.speaker ? ` speaker-${e4.speaker}` : "", c = `<strong><span class="timestamp" data-timestamp="${e4.start}">${t4}</span></strong>`;
            s.push(`<p class="transcript-segment${r4}">${c} \xB7 ${(0, n2.escapeHtml)(e4.text)}</p>`), e4.speakerChange && l.length > 0 && l.push(""), l.push(`**${t4}** \xB7 ${e4.text}`);
          }
          return { html: `<div class="${e3} transcript">
<h2>Transcript</h2>
${s.join("\n")}
</div>`, text: l.join("\n") };
        };
        const n2 = r2(639);
        function o(e3) {
          const t3 = Math.floor(e3 / 3600), r3 = Math.floor(e3 % 3600 / 60), n3 = Math.floor(e3 % 60);
          return t3 > 0 ? `${t3}:${String(r3).padStart(2, "0")}:${String(n3).padStart(2, "0")}` : `${r3}:${String(n3).padStart(2, "0")}`;
        }
      }, 431(e2, t2, r2) {
        "use strict";
        function n2(e3, t3) {
          return Array(t3 + 1).join(e3);
        }
        r2.r(t2), r2.d(t2, { default: () => M });
        var o = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
        function a(e3) {
          return c(e3, o);
        }
        var i = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
        function s(e3) {
          return c(e3, i);
        }
        var l = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
        function c(e3, t3) {
          return t3.indexOf(e3.nodeName) >= 0;
        }
        function u(e3, t3) {
          return e3.getElementsByTagName && t3.some((function(t4) {
            return e3.getElementsByTagName(t4).length;
          }));
        }
        var d = {};
        function h(e3) {
          return e3 ? e3.replace(/(\n+\s*)+/g, "\n") : "";
        }
        function m(e3) {
          for (var t3 in this.options = e3, this._keep = [], this._remove = [], this.blankRule = { replacement: e3.blankReplacement }, this.keepReplacement = e3.keepReplacement, this.defaultRule = { replacement: e3.defaultReplacement }, this.array = [], e3.rules) this.array.push(e3.rules[t3]);
        }
        function p(e3, t3, r3) {
          for (var n3 = 0; n3 < e3.length; n3++) {
            var o2 = e3[n3];
            if (f(o2, t3, r3)) return o2;
          }
        }
        function f(e3, t3, r3) {
          var n3 = e3.filter;
          if ("string" == typeof n3) {
            if (n3 === t3.nodeName.toLowerCase()) return true;
          } else if (Array.isArray(n3)) {
            if (n3.indexOf(t3.nodeName.toLowerCase()) > -1) return true;
          } else {
            if ("function" != typeof n3) throw new TypeError("`filter` needs to be a string, array, or function");
            if (n3.call(e3, t3, r3)) return true;
          }
        }
        function g(e3) {
          var t3 = e3.nextSibling || e3.parentNode;
          return e3.parentNode.removeChild(e3), t3;
        }
        function b(e3, t3, r3) {
          return e3 && e3.parentNode === t3 || r3(t3) ? t3.nextSibling || t3.parentNode : t3.firstChild || t3.nextSibling || t3.parentNode;
        }
        d.paragraph = { filter: "p", replacement: function(e3) {
          return "\n\n" + e3 + "\n\n";
        } }, d.lineBreak = { filter: "br", replacement: function(e3, t3, r3) {
          return r3.br + "\n";
        } }, d.heading = { filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function(e3, t3, r3) {
          var o2 = Number(t3.nodeName.charAt(1));
          return "setext" === r3.headingStyle && o2 < 3 ? "\n\n" + e3 + "\n" + n2(1 === o2 ? "=" : "-", e3.length) + "\n\n" : "\n\n" + n2("#", o2) + " " + e3 + "\n\n";
        } }, d.blockquote = { filter: "blockquote", replacement: function(e3) {
          return "\n\n" + (e3 = (e3 = e3.replace(/^\n+|\n+$/g, "")).replace(/^/gm, "> ")) + "\n\n";
        } }, d.list = { filter: ["ul", "ol"], replacement: function(e3, t3) {
          var r3 = t3.parentNode;
          return "LI" === r3.nodeName && r3.lastElementChild === t3 ? "\n" + e3 : "\n\n" + e3 + "\n\n";
        } }, d.listItem = { filter: "li", replacement: function(e3, t3, r3) {
          e3 = e3.replace(/^\n+/, "").replace(/\n+$/, "\n").replace(/\n/gm, "\n    ");
          var n3 = r3.bulletListMarker + "   ", o2 = t3.parentNode;
          if ("OL" === o2.nodeName) {
            var a2 = o2.getAttribute("start"), i2 = Array.prototype.indexOf.call(o2.children, t3);
            n3 = (a2 ? Number(a2) + i2 : i2 + 1) + ".  ";
          }
          return n3 + e3 + (t3.nextSibling && !/\n$/.test(e3) ? "\n" : "");
        } }, d.indentedCodeBlock = { filter: function(e3, t3) {
          return "indented" === t3.codeBlockStyle && "PRE" === e3.nodeName && e3.firstChild && "CODE" === e3.firstChild.nodeName;
        }, replacement: function(e3, t3, r3) {
          return "\n\n    " + t3.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
        } }, d.fencedCodeBlock = { filter: function(e3, t3) {
          return "fenced" === t3.codeBlockStyle && "PRE" === e3.nodeName && e3.firstChild && "CODE" === e3.firstChild.nodeName;
        }, replacement: function(e3, t3, r3) {
          for (var o2, a2 = ((t3.firstChild.getAttribute("class") || "").match(/language-(\S+)/) || [null, ""])[1], i2 = t3.firstChild.textContent, s2 = r3.fence.charAt(0), l2 = 3, c2 = new RegExp("^" + s2 + "{3,}", "gm"); o2 = c2.exec(i2); ) o2[0].length >= l2 && (l2 = o2[0].length + 1);
          var u2 = n2(s2, l2);
          return "\n\n" + u2 + a2 + "\n" + i2.replace(/\n$/, "") + "\n" + u2 + "\n\n";
        } }, d.horizontalRule = { filter: "hr", replacement: function(e3, t3, r3) {
          return "\n\n" + r3.hr + "\n\n";
        } }, d.inlineLink = { filter: function(e3, t3) {
          return "inlined" === t3.linkStyle && "A" === e3.nodeName && e3.getAttribute("href");
        }, replacement: function(e3, t3) {
          var r3 = t3.getAttribute("href");
          r3 && (r3 = r3.replace(/([()])/g, "\\$1"));
          var n3 = h(t3.getAttribute("title"));
          return n3 && (n3 = ' "' + n3.replace(/"/g, '\\"') + '"'), "[" + e3 + "](" + r3 + n3 + ")";
        } }, d.referenceLink = { filter: function(e3, t3) {
          return "referenced" === t3.linkStyle && "A" === e3.nodeName && e3.getAttribute("href");
        }, replacement: function(e3, t3, r3) {
          var n3, o2, a2 = t3.getAttribute("href"), i2 = h(t3.getAttribute("title"));
          switch (i2 && (i2 = ' "' + i2 + '"'), r3.linkReferenceStyle) {
            case "collapsed":
              n3 = "[" + e3 + "][]", o2 = "[" + e3 + "]: " + a2 + i2;
              break;
            case "shortcut":
              n3 = "[" + e3 + "]", o2 = "[" + e3 + "]: " + a2 + i2;
              break;
            default:
              var s2 = this.references.length + 1;
              n3 = "[" + e3 + "][" + s2 + "]", o2 = "[" + s2 + "]: " + a2 + i2;
          }
          return this.references.push(o2), n3;
        }, references: [], append: function(e3) {
          var t3 = "";
          return this.references.length && (t3 = "\n\n" + this.references.join("\n") + "\n\n", this.references = []), t3;
        } }, d.emphasis = { filter: ["em", "i"], replacement: function(e3, t3, r3) {
          return e3.trim() ? r3.emDelimiter + e3 + r3.emDelimiter : "";
        } }, d.strong = { filter: ["strong", "b"], replacement: function(e3, t3, r3) {
          return e3.trim() ? r3.strongDelimiter + e3 + r3.strongDelimiter : "";
        } }, d.code = { filter: function(e3) {
          var t3 = e3.previousSibling || e3.nextSibling, r3 = "PRE" === e3.parentNode.nodeName && !t3;
          return "CODE" === e3.nodeName && !r3;
        }, replacement: function(e3) {
          if (!e3) return "";
          e3 = e3.replace(/\r?\n|\r/g, " ");
          for (var t3 = /^`|^ .*?[^ ].* $|`$/.test(e3) ? " " : "", r3 = "`", n3 = e3.match(/`+/gm) || []; -1 !== n3.indexOf(r3); ) r3 += "`";
          return r3 + t3 + e3 + t3 + r3;
        } }, d.image = { filter: "img", replacement: function(e3, t3) {
          var r3 = h(t3.getAttribute("alt")), n3 = t3.getAttribute("src") || "", o2 = h(t3.getAttribute("title"));
          return n3 ? "![" + r3 + "](" + n3 + (o2 ? ' "' + o2 + '"' : "") + ")" : "";
        } }, m.prototype = { add: function(e3, t3) {
          this.array.unshift(t3);
        }, keep: function(e3) {
          this._keep.unshift({ filter: e3, replacement: this.keepReplacement });
        }, remove: function(e3) {
          this._remove.unshift({ filter: e3, replacement: function() {
            return "";
          } });
        }, forNode: function(e3) {
          return e3.isBlank ? this.blankRule : (t3 = p(this.array, e3, this.options)) || (t3 = p(this._keep, e3, this.options)) || (t3 = p(this._remove, e3, this.options)) ? t3 : this.defaultRule;
          var t3;
        }, forEach: function(e3) {
          for (var t3 = 0; t3 < this.array.length; t3++) e3(this.array[t3], t3);
        } };
        var x = "undefined" != typeof window ? window : {};
        var y, v, w = (function() {
          var e3 = x.DOMParser, t3 = false;
          try {
            new e3().parseFromString("", "text/html") && (t3 = true);
          } catch (e4) {
          }
          return t3;
        })() ? x.DOMParser : (y = function() {
        }, (function() {
          var e3 = false;
          try {
            document.implementation.createHTMLDocument("").open();
          } catch (t3) {
            x.ActiveXObject && (e3 = true);
          }
          return e3;
        })() ? y.prototype.parseFromString = function(e3) {
          var t3 = new window.ActiveXObject("htmlfile");
          return t3.designMode = "on", t3.open(), t3.write(e3), t3.close(), t3;
        } : y.prototype.parseFromString = function(e3) {
          var t3 = document.implementation.createHTMLDocument("");
          return t3.open(), t3.write(e3), t3.close(), t3;
        }, y);
        function A(e3, t3) {
          var r3;
          "string" == typeof e3 ? r3 = (v = v || new w()).parseFromString('<x-turndown id="turndown-root">' + e3 + "</x-turndown>", "text/html").getElementById("turndown-root") : r3 = e3.cloneNode(true);
          return (function(e4) {
            var t4 = e4.element, r4 = e4.isBlock, n3 = e4.isVoid, o2 = e4.isPre || function(e5) {
              return "PRE" === e5.nodeName;
            };
            if (t4.firstChild && !o2(t4)) {
              for (var a2 = null, i2 = false, s2 = null, l2 = b(s2, t4, o2); l2 !== t4; ) {
                if (3 === l2.nodeType || 4 === l2.nodeType) {
                  var c2 = l2.data.replace(/[ \r\n\t]+/g, " ");
                  if (a2 && !/ $/.test(a2.data) || i2 || " " !== c2[0] || (c2 = c2.substr(1)), !c2) {
                    l2 = g(l2);
                    continue;
                  }
                  l2.data = c2, a2 = l2;
                } else {
                  if (1 !== l2.nodeType) {
                    l2 = g(l2);
                    continue;
                  }
                  r4(l2) || "BR" === l2.nodeName ? (a2 && (a2.data = a2.data.replace(/ $/, "")), a2 = null, i2 = false) : n3(l2) || o2(l2) ? (a2 = null, i2 = true) : a2 && (i2 = false);
                }
                var u2 = b(s2, l2, o2);
                s2 = l2, l2 = u2;
              }
              a2 && (a2.data = a2.data.replace(/ $/, ""), a2.data || g(a2));
            }
          })({ element: r3, isBlock: a, isVoid: s, isPre: t3.preformattedCode ? C : null }), r3;
        }
        function C(e3) {
          return "PRE" === e3.nodeName || "CODE" === e3.nodeName;
        }
        function E(e3, t3) {
          return e3.isBlock = a(e3), e3.isCode = "CODE" === e3.nodeName || e3.parentNode.isCode, e3.isBlank = (function(e4) {
            return !s(e4) && !(function(e5) {
              return c(e5, l);
            })(e4) && /^\s*$/i.test(e4.textContent) && !(function(e5) {
              return u(e5, i);
            })(e4) && !(function(e5) {
              return u(e5, l);
            })(e4);
          })(e3), e3.flankingWhitespace = (function(e4, t4) {
            if (e4.isBlock || t4.preformattedCode && e4.isCode) return { leading: "", trailing: "" };
            var r3 = (n3 = e4.textContent, o2 = n3.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/), { leading: o2[1], leadingAscii: o2[2], leadingNonAscii: o2[3], trailing: o2[4], trailingNonAscii: o2[5], trailingAscii: o2[6] });
            var n3, o2;
            r3.leadingAscii && S("left", e4, t4) && (r3.leading = r3.leadingNonAscii);
            r3.trailingAscii && S("right", e4, t4) && (r3.trailing = r3.trailingNonAscii);
            return { leading: r3.leading, trailing: r3.trailing };
          })(e3, t3), e3;
        }
        function S(e3, t3, r3) {
          var n3, o2, i2;
          return "left" === e3 ? (n3 = t3.previousSibling, o2 = / $/) : (n3 = t3.nextSibling, o2 = /^ /), n3 && (3 === n3.nodeType ? i2 = o2.test(n3.nodeValue) : r3.preformattedCode && "CODE" === n3.nodeName ? i2 = false : 1 !== n3.nodeType || a(n3) || (i2 = o2.test(n3.textContent))), i2;
        }
        var _ = Array.prototype.reduce, T = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
        function q(e3) {
          if (!(this instanceof q)) return new q(e3);
          var t3 = { rules: d, headingStyle: "setext", hr: "* * *", bulletListMarker: "*", codeBlockStyle: "indented", fence: "```", emDelimiter: "_", strongDelimiter: "**", linkStyle: "inlined", linkReferenceStyle: "full", br: "  ", preformattedCode: false, blankReplacement: function(e4, t4) {
            return t4.isBlock ? "\n\n" : "";
          }, keepReplacement: function(e4, t4) {
            return t4.isBlock ? "\n\n" + t4.outerHTML + "\n\n" : t4.outerHTML;
          }, defaultReplacement: function(e4, t4) {
            return t4.isBlock ? "\n\n" + e4 + "\n\n" : e4;
          } };
          this.options = (function(e4) {
            for (var t4 = 1; t4 < arguments.length; t4++) {
              var r3 = arguments[t4];
              for (var n3 in r3) r3.hasOwnProperty(n3) && (e4[n3] = r3[n3]);
            }
            return e4;
          })({}, t3, e3), this.rules = new m(this.options);
        }
        function k(e3) {
          var t3 = this;
          return _.call(e3.childNodes, (function(e4, r3) {
            var n3 = "";
            return 3 === (r3 = new E(r3, t3.options)).nodeType ? n3 = r3.isCode ? r3.nodeValue : t3.escape(r3.nodeValue) : 1 === r3.nodeType && (n3 = L.call(t3, r3)), O(e4, n3);
          }), "");
        }
        function N(e3) {
          var t3 = this;
          return this.rules.forEach((function(r3) {
            "function" == typeof r3.append && (e3 = O(e3, r3.append(t3.options)));
          })), e3.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
        }
        function L(e3) {
          var t3 = this.rules.forNode(e3), r3 = k.call(this, e3), n3 = e3.flankingWhitespace;
          return (n3.leading || n3.trailing) && (r3 = r3.trim()), n3.leading + t3.replacement(r3, e3, this.options) + n3.trailing;
        }
        function O(e3, t3) {
          var r3 = (function(e4) {
            for (var t4 = e4.length; t4 > 0 && "\n" === e4[t4 - 1]; ) t4--;
            return e4.substring(0, t4);
          })(e3), n3 = t3.replace(/^\n*/, ""), o2 = Math.max(e3.length - r3.length, t3.length - n3.length);
          return r3 + "\n\n".substring(0, o2) + n3;
        }
        q.prototype = { turndown: function(e3) {
          if (!(function(e4) {
            return null != e4 && ("string" == typeof e4 || e4.nodeType && (1 === e4.nodeType || 9 === e4.nodeType || 11 === e4.nodeType));
          })(e3)) throw new TypeError(e3 + " is not a string, or an element/document/fragment node.");
          if ("" === e3) return "";
          var t3 = k.call(this, new A(e3, this.options));
          return N.call(this, t3);
        }, use: function(e3) {
          if (Array.isArray(e3)) for (var t3 = 0; t3 < e3.length; t3++) this.use(e3[t3]);
          else {
            if ("function" != typeof e3) throw new TypeError("plugin must be a Function or an Array of Functions");
            e3(this);
          }
          return this;
        }, addRule: function(e3, t3) {
          return this.rules.add(e3, t3), this;
        }, keep: function(e3) {
          return this.rules.keep(e3), this;
        }, remove: function(e3) {
          return this.rules.remove(e3), this;
        }, escape: function(e3) {
          return T.reduce((function(e4, t3) {
            return e4.replace(t3[0], t3[1]);
          }), e3);
        } };
        const M = q;
      }, 914(e2) {
        "use strict";
        class t2 {
          constructor(e3, r3) {
            let n3, o2 = " " + e3;
            const a2 = r3 && r3.loc;
            if (a2 && a2.start <= a2.end) {
              const e4 = a2.lexer.input;
              n3 = a2.start;
              const t3 = a2.end;
              n3 === e4.length ? o2 += " at end of input: " : o2 += " at position " + (n3 + 1) + ": \n";
              const r4 = e4.slice(n3, t3).replace(/[^]/g, "$&\u0332");
              let i3, s2;
              i3 = n3 > 15 ? "\u2026" + e4.slice(n3 - 15, n3) : e4.slice(0, n3), s2 = t3 + 15 < e4.length ? e4.slice(t3, t3 + 15) + "\u2026" : e4.slice(t3), o2 += i3 + r4 + s2;
            }
            const i2 = new Error(o2);
            return i2.name = "ParseError", i2.__proto__ = t2.prototype, i2.position = n3, i2;
          }
        }
        t2.prototype.__proto__ = Error.prototype;
        const r2 = function(e3, t3) {
          return void 0 === e3 ? t3 : e3;
        }, n2 = /([A-Z])/g, o = function(e3) {
          return e3.replace(n2, "-$1").toLowerCase();
        }, a = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" }, i = /[&><"']/g;
        function s(e3) {
          return String(e3).replace(i, ((e4) => a[e4]));
        }
        const l = function(e3) {
          return "ordgroup" === e3.type || "color" === e3.type ? 1 === e3.body.length ? l(e3.body[0]) : e3 : "font" === e3.type ? l(e3.body) : e3;
        }, c = function(e3) {
          const t3 = l(e3);
          return "mathord" === t3.type || "textord" === t3.type || "atom" === t3.type;
        }, u = function(e3) {
          return +e3.toFixed(4);
        }, d = "aceg\u0131\u0237mnopqrsuvwxyz\u03B1\u03B3\u03B5\u03B7\u03B9\u03BA\u03BC\u03BD\u03BF\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C7\u03C9\u03D5\u{1D41A}\u{1D41C}\u{1D41E}\u{1D420}\u{1D426}\u{1D427}\u{1D428}\u{1D429}\u{1D42A}\u{1D42B}\u{1D42C}\u{1D42E}\u{1D42F}\u{1D430}\u{1D431}\u{1D432}\u{1D433}";
        class h {
          constructor(e3) {
            e3 = e3 || {}, this.displayMode = r2(e3.displayMode, false), this.annotate = r2(e3.annotate, false), this.leqno = r2(e3.leqno, false), this.throwOnError = r2(e3.throwOnError, false), this.errorColor = r2(e3.errorColor, "#b22222"), this.macros = e3.macros || {}, this.wrap = r2(e3.wrap, "none"), this.xml = r2(e3.xml, false), this.colorIsTextColor = r2(e3.colorIsTextColor, false), this.strict = r2(e3.strict, false), this.trust = r2(e3.trust, false), this.maxSize = void 0 === e3.maxSize ? [1 / 0, 1 / 0] : Array.isArray(e3.maxSize) ? e3.maxSize : [1 / 0, 1 / 0], this.maxExpand = Math.max(0, r2(e3.maxExpand, 1e3));
          }
          isTrusted(e3) {
            if (e3.url && !e3.protocol) {
              const t4 = (function(e4) {
                const t5 = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e4);
                return t5 ? ":" !== t5[2] ? null : /^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t5[1]) ? t5[1].toLowerCase() : null : "_relative";
              })(e3.url);
              if (null == t4) return false;
              e3.protocol = t4;
            }
            const t3 = "function" == typeof this.trust ? this.trust(e3) : this.trust;
            return Boolean(t3);
          }
        }
        const m = {}, p = {};
        function f({ type: e3, names: t3, props: r3, handler: n3, mathmlBuilder: o2 }) {
          const a2 = { type: e3, numArgs: r3.numArgs, argTypes: r3.argTypes, allowedInArgument: !!r3.allowedInArgument, allowedInText: !!r3.allowedInText, allowedInMath: void 0 === r3.allowedInMath || r3.allowedInMath, numOptionalArgs: r3.numOptionalArgs || 0, infix: !!r3.infix, primitive: !!r3.primitive, handler: n3 };
          for (let e4 = 0; e4 < t3.length; ++e4) m[t3[e4]] = a2;
          e3 && o2 && (p[e3] = o2);
        }
        function g({ type: e3, mathmlBuilder: t3 }) {
          f({ type: e3, names: [], props: { numArgs: 0 }, handler() {
            throw new Error("Should never be called.");
          }, mathmlBuilder: t3 });
        }
        const b = function(e3) {
          return "ordgroup" === e3.type && 1 === e3.body.length ? e3.body[0] : e3;
        }, x = function(e3) {
          return "ordgroup" === e3.type ? e3.body : [e3];
        };
        class y {
          constructor(e3) {
            this.children = e3, this.classes = [], this.style = {};
          }
          hasClass(e3) {
            return this.classes.includes(e3);
          }
          toNode() {
            const e3 = document.createDocumentFragment();
            for (let t3 = 0; t3 < this.children.length; t3++) e3.appendChild(this.children[t3].toNode());
            return e3;
          }
          toMarkup() {
            let e3 = "";
            for (let t3 = 0; t3 < this.children.length; t3++) e3 += this.children[t3].toMarkup();
            return e3;
          }
          toText() {
            return this.children.map(((e3) => e3.toText())).join("");
          }
        }
        const v = function(e3) {
          return e3.filter(((e4) => e4)).join(" ");
        }, w = function(e3, t3) {
          this.classes = e3 || [], this.attributes = {}, this.style = t3 || {};
        }, A = function(e3) {
          const t3 = document.createElement(e3);
          t3.className = v(this.classes);
          for (const e4 in this.style) Object.prototype.hasOwnProperty.call(this.style, e4) && (t3.style[e4] = this.style[e4]);
          for (const e4 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e4) && t3.setAttribute(e4, this.attributes[e4]);
          for (let e4 = 0; e4 < this.children.length; e4++) t3.appendChild(this.children[e4].toNode());
          return t3;
        }, C = function(e3) {
          let t3 = `<${e3}`;
          this.classes.length && (t3 += ` class="${s(v(this.classes))}"`);
          let r3 = "";
          for (const e4 in this.style) Object.prototype.hasOwnProperty.call(this.style, e4) && (r3 += `${o(e4)}:${this.style[e4]};`);
          r3 && (t3 += ` style="${r3}"`);
          for (const e4 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e4) && (t3 += ` ${e4}="${s(this.attributes[e4])}"`);
          t3 += ">";
          for (let e4 = 0; e4 < this.children.length; e4++) t3 += this.children[e4].toMarkup();
          return t3 += `</${e3}>`, t3;
        };
        class E {
          constructor(e3, t3, r3) {
            w.call(this, e3, r3), this.children = t3 || [];
          }
          setAttribute(e3, t3) {
            this.attributes[e3] = t3;
          }
          toNode() {
            return A.call(this, "span");
          }
          toMarkup() {
            return C.call(this, "span");
          }
        }
        let S = class {
          constructor(e3) {
            this.text = e3;
          }
          toNode() {
            return document.createTextNode(this.text);
          }
          toMarkup() {
            return s(this.text);
          }
        };
        class _ {
          constructor(e3, t3, r3) {
            this.href = e3, this.classes = t3, this.children = r3 || [];
          }
          toNode() {
            const e3 = document.createElement("a");
            e3.setAttribute("href", this.href), this.classes.length > 0 && (e3.className = v(this.classes));
            for (let t3 = 0; t3 < this.children.length; t3++) e3.appendChild(this.children[t3].toNode());
            return e3;
          }
          toMarkup() {
            let e3 = `<a href='${s(this.href)}'`;
            this.classes.length > 0 && (e3 += ` class="${s(v(this.classes))}"`), e3 += ">";
            for (let t3 = 0; t3 < this.children.length; t3++) e3 += this.children[t3].toMarkup();
            return e3 += "</a>", e3;
          }
        }
        class T {
          constructor(e3, t3, r3) {
            this.alt = t3, this.src = e3, this.classes = ["mord"], this.style = r3;
          }
          hasClass(e3) {
            return this.classes.includes(e3);
          }
          toNode() {
            const e3 = document.createElement("img");
            e3.src = this.src, e3.alt = this.alt, e3.className = "mord";
            for (const t3 in this.style) Object.prototype.hasOwnProperty.call(this.style, t3) && (e3.style[t3] = this.style[t3]);
            return e3;
          }
          toMarkup() {
            let e3 = `<img src='${this.src}' alt='${this.alt}'`, t3 = "";
            for (const e4 in this.style) Object.prototype.hasOwnProperty.call(this.style, e4) && (t3 += `${o(e4)}:${this.style[e4]};`);
            return t3 && (e3 += ` style="${s(t3)}"`), e3 += ">", e3;
          }
        }
        function q(e3) {
          return new y(e3);
        }
        class k {
          constructor(e3, t3, r3, n3) {
            this.type = e3, this.attributes = {}, this.children = t3 || [], this.classes = r3 || [], this.style = n3 || {}, this.label = "";
          }
          setAttribute(e3, t3) {
            this.attributes[e3] = t3;
          }
          getAttribute(e3) {
            return this.attributes[e3];
          }
          setLabel(e3) {
            this.label = e3;
          }
          toNode() {
            const e3 = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
            for (const t3 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t3) && e3.setAttribute(t3, this.attributes[t3]);
            this.classes.length > 0 && (e3.className = v(this.classes));
            for (const t3 in this.style) Object.prototype.hasOwnProperty.call(this.style, t3) && (e3.style[t3] = this.style[t3]);
            for (let t3 = 0; t3 < this.children.length; t3++) e3.appendChild(this.children[t3].toNode());
            return e3;
          }
          toMarkup() {
            let e3 = "<" + this.type;
            for (const t4 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t4) && (e3 += " " + t4 + '="', e3 += s(this.attributes[t4]), e3 += '"');
            this.classes.length > 0 && (e3 += ` class="${s(v(this.classes))}"`);
            let t3 = "";
            for (const e4 in this.style) Object.prototype.hasOwnProperty.call(this.style, e4) && (t3 += `${o(e4)}:${this.style[e4]};`);
            t3 && (e3 += ` style="${t3}"`), e3 += ">";
            for (let t4 = 0; t4 < this.children.length; t4++) e3 += this.children[t4].toMarkup();
            return e3 += "</" + this.type + ">", e3;
          }
          toText() {
            return this.children.map(((e3) => e3.toText())).join("");
          }
        }
        class N {
          constructor(e3) {
            this.text = e3;
          }
          toNode() {
            return document.createTextNode(this.text);
          }
          toMarkup() {
            return s(this.toText());
          }
          toText() {
            return this.text;
          }
        }
        const L = (e3) => {
          let t3;
          return 1 === e3.length && "mrow" === e3[0].type ? (t3 = e3.pop(), t3.type = "mstyle") : t3 = new k("mstyle", e3), t3;
        }, O = (e3) => {
          let t3 = 0;
          if (e3.body && Array.isArray(e3.body)) for (const r3 of e3.body) t3 += O(r3);
          else if (e3.body) t3 += O(e3.body);
          else if ("supsub" === e3.type) t3 += O(e3.base), e3.sub && (t3 += 0.7 * O(e3.sub)), e3.sup && (t3 += 0.7 * O(e3.sup));
          else if ("mathord" === e3.type || "textord" === e3.type) for (const r3 of e3.text.split("")) {
            const e4 = r3.codePointAt(0);
            t3 += 96 < e4 && e4 < 123 || 944 < e4 && e4 < 970 ? 0.56 : 47 < e4 && e4 < 58 ? 0.5 : 0.92;
          }
          else t3 += 1;
          return t3;
        }, M = { widehat: "^", widecheck: "\u02C7", widetilde: "~", wideparen: "\u23DC", utilde: "~", overleftarrow: "\u2190", underleftarrow: "\u2190", xleftarrow: "\u2190", overrightarrow: "\u2192", underrightarrow: "\u2192", xrightarrow: "\u2192", underbrace: "\u23DF", overbrace: "\u23DE", overbracket: "\u23B4", underbracket: "\u23B5", overgroup: "\u23E0", overparen: "\u23DC", undergroup: "\u23E1", underparen: "\u23DD", overleftrightarrow: "\u2194", underleftrightarrow: "\u2194", xleftrightarrow: "\u2194", Overrightarrow: "\u21D2", xRightarrow: "\u21D2", overleftharpoon: "\u21BC", xleftharpoonup: "\u21BC", overrightharpoon: "\u21C0", xrightharpoonup: "\u21C0", xLeftarrow: "\u21D0", xLeftrightarrow: "\u21D4", xhookleftarrow: "\u21A9", xhookrightarrow: "\u21AA", xmapsto: "\u21A6", xrightharpoondown: "\u21C1", xleftharpoondown: "\u21BD", xtwoheadleftarrow: "\u219E", xtwoheadrightarrow: "\u21A0", xlongequal: "=", xrightleftarrows: "\u21C4", xtofrom: "\u21C4", xleftrightharpoons: "\u21CB", xrightleftharpoons: "\u21CC", yields: "\u2192", yieldsLeft: "\u2190", mesomerism: "\u2194", longrightharpoonup: "\u21C0", longleftharpoondown: "\u21BD", eqrightharpoonup: "\u21C0", eqleftharpoondown: "\u21BD", "\\cdrightarrow": "\u2192", "\\cdleftarrow": "\u2190", "\\cdlongequal": "=", yieldsLeftRight: "\u21C4", chemequilibrium: "\u21CC" }, D = function(e3) {
          const t3 = new N(M[e3.slice(1)]), r3 = new k("mo", [t3]);
          return r3.setAttribute("stretchy", "true"), r3;
        }, B = ["\\widetilde", "\\widehat", "\\widecheck", "\\utilde"], $ = (e3) => {
          const t3 = D(e3.label);
          if (B.includes(e3.label)) {
            const r3 = O(e3.base);
            1 < r3 && r3 < 1.6 ? t3.classes.push("tml-crooked-2") : 1.6 <= r3 && r3 < 2.5 ? t3.classes.push("tml-crooked-3") : 2.5 <= r3 && t3.classes.push("tml-crooked-4");
          }
          return t3;
        }, I = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 }, R = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 }, P = { math: {}, text: {} };
        function F(e3, t3, r3, n3, o2) {
          P[e3][n3] = { group: t3, replace: r3 }, o2 && r3 && (P[e3][r3] = P[e3][n3]);
        }
        const j = "math", z = "text", H = "accent-token", U = "bin", G = "close", W = "inner", V = "mathord", X = "op-token", J = "open", Z = "punct", Y = "rel", K = "spacing", Q = "textord";
        F(j, Y, "\u2261", "\\equiv", true), F(j, Y, "\u227A", "\\prec", true), F(j, Y, "\u227B", "\\succ", true), F(j, Y, "\u223C", "\\sim", true), F(j, Y, "\u27C2", "\\perp", true), F(j, Y, "\u2AAF", "\\preceq", true), F(j, Y, "\u2AB0", "\\succeq", true), F(j, Y, "\u2243", "\\simeq", true), F(j, Y, "\u224C", "\\backcong", true), F(j, Y, "|", "\\mid", true), F(j, Y, "\u226A", "\\ll", true), F(j, Y, "\u226B", "\\gg", true), F(j, Y, "\u224D", "\\asymp", true), F(j, Y, "\u2225", "\\parallel"), F(j, Y, "\u2323", "\\smile", true), F(j, Y, "\u2291", "\\sqsubseteq", true), F(j, Y, "\u2292", "\\sqsupseteq", true), F(j, Y, "\u2250", "\\doteq", true), F(j, Y, "\u2322", "\\frown", true), F(j, Y, "\u220B", "\\ni", true), F(j, Y, "\u220C", "\\notni", true), F(j, Y, "\u221D", "\\propto", true), F(j, Y, "\u22A2", "\\vdash", true), F(j, Y, "\u22A3", "\\dashv", true), F(j, Y, "\u220B", "\\owns"), F(j, Y, "\u2258", "\\arceq", true), F(j, Y, "\u2259", "\\wedgeq", true), F(j, Y, "\u225A", "\\veeeq", true), F(j, Y, "\u225B", "\\stareq", true), F(j, Y, "\u225D", "\\eqdef", true), F(j, Y, "\u225E", "\\measeq", true), F(j, Y, "\u225F", "\\questeq", true), F(j, Y, "\u2260", "\\ne", true), F(j, Y, "\u2260", "\\neq"), F(j, Y, "\u2A75", "\\eqeq", true), F(j, Y, "\u2A76", "\\eqeqeq", true), F(j, Y, "\u2237", "\\dblcolon", true), F(j, Y, "\u2254", "\\coloneqq", true), F(j, Y, "\u2255", "\\eqqcolon", true), F(j, Y, "\u2239", "\\eqcolon", true), F(j, Y, "\u2A74", "\\Coloneqq", true), F(j, Z, ".", "\\ldotp"), F(j, Z, "\xB7", "\\cdotp"), F(j, Q, "#", "\\#"), F(z, Q, "#", "\\#"), F(j, Q, "&", "\\&"), F(z, Q, "&", "\\&"), F(j, Q, "\u2135", "\\aleph", true), F(j, Q, "\u2200", "\\forall", true), F(j, Q, "\u210F", "\\hbar", true), F(j, Q, "\u2203", "\\exists", true), F(j, U, "\u2207", "\\nabla", true), F(j, Q, "\u266D", "\\flat", true), F(j, Q, "\u2113", "\\ell", true), F(j, Q, "\u266E", "\\natural", true), F(j, Q, "\u212B", "\\Angstrom", true), F(z, Q, "\u212B", "\\Angstrom", true), F(j, Q, "\u2663", "\\clubsuit", true), F(j, Q, "\u2667", "\\varclubsuit", true), F(j, Q, "\u2118", "\\wp", true), F(j, Q, "\u266F", "\\sharp", true), F(j, Q, "\u2662", "\\diamondsuit", true), F(j, Q, "\u2666", "\\vardiamondsuit", true), F(j, Q, "\u211C", "\\Re", true), F(j, Q, "\u2661", "\\heartsuit", true), F(j, Q, "\u2665", "\\varheartsuit", true), F(j, Q, "\u2111", "\\Im", true), F(j, Q, "\u2660", "\\spadesuit", true), F(j, Q, "\u2664", "\\varspadesuit", true), F(j, Q, "\u2640", "\\female", true), F(j, Q, "\u2642", "\\male", true), F(j, Q, "\xA7", "\\S", true), F(z, Q, "\xA7", "\\S"), F(j, Q, "\xB6", "\\P", true), F(z, Q, "\xB6", "\\P"), F(z, Q, "\u263A", "\\smiley", true), F(j, Q, "\u263A", "\\smiley", true), F(j, Q, "\u2020", "\\dag"), F(z, Q, "\u2020", "\\dag"), F(z, Q, "\u2020", "\\textdagger"), F(j, Q, "\u2021", "\\ddag"), F(z, Q, "\u2021", "\\ddag"), F(z, Q, "\u2021", "\\textdaggerdbl"), F(j, G, "\u23B1", "\\rmoustache", true), F(j, J, "\u23B0", "\\lmoustache", true), F(j, G, "\u27EF", "\\rgroup", true), F(j, J, "\u27EE", "\\lgroup", true), F(j, U, "\u2213", "\\mp", true), F(j, U, "\u2296", "\\ominus", true), F(j, U, "\u228E", "\\uplus", true), F(j, U, "\u2293", "\\sqcap", true), F(j, U, "\u2217", "\\ast"), F(j, U, "\u2294", "\\sqcup", true), F(j, U, "\u25EF", "\\bigcirc", true), F(j, U, "\u2219", "\\bullet", true), F(j, U, "\u2021", "\\ddagger"), F(j, U, "\u2240", "\\wr", true), F(j, U, "\u2A3F", "\\amalg"), F(j, U, "&", "\\And"), F(j, U, "\u2AFD", "\\sslash", true), F(j, Y, "\u27F5", "\\longleftarrow", true), F(j, Y, "\u21D0", "\\Leftarrow", true), F(j, Y, "\u27F8", "\\Longleftarrow", true), F(j, Y, "\u27F6", "\\longrightarrow", true), F(j, Y, "\u21D2", "\\Rightarrow", true), F(j, Y, "\u27F9", "\\Longrightarrow", true), F(j, Y, "\u2194", "\\leftrightarrow", true), F(j, Y, "\u27F7", "\\longleftrightarrow", true), F(j, Y, "\u21D4", "\\Leftrightarrow", true), F(j, Y, "\u27FA", "\\Longleftrightarrow", true), F(j, Y, "\u21A4", "\\mapsfrom", true), F(j, Y, "\u21A6", "\\mapsto", true), F(j, Y, "\u27FC", "\\longmapsto", true), F(j, Y, "\u2197", "\\nearrow", true), F(j, Y, "\u21A9", "\\hookleftarrow", true), F(j, Y, "\u21AA", "\\hookrightarrow", true), F(j, Y, "\u2198", "\\searrow", true), F(j, Y, "\u21BC", "\\leftharpoonup", true), F(j, Y, "\u21C0", "\\rightharpoonup", true), F(j, Y, "\u2199", "\\swarrow", true), F(j, Y, "\u21BD", "\\leftharpoondown", true), F(j, Y, "\u21C1", "\\rightharpoondown", true), F(j, Y, "\u2196", "\\nwarrow", true), F(j, Y, "\u21CC", "\\rightleftharpoons", true), F(j, V, "\u21AF", "\\lightning", true), F(j, V, "\u220E", "\\QED", true), F(j, V, "\u2030", "\\permil", true), F(z, Q, "\u2030", "\\permil"), F(j, V, "\u2609", "\\astrosun", true), F(j, V, "\u263C", "\\sun", true), F(j, V, "\u263E", "\\leftmoon", true), F(j, V, "\u263D", "\\rightmoon", true), F(j, V, "\u2295", "\\Earth"), F(j, Y, "\u226E", "\\nless", true), F(j, Y, "\u2A87", "\\lneq", true), F(j, Y, "\u2268", "\\lneqq", true), F(j, Y, "\u2268\uFE00", "\\lvertneqq"), F(j, Y, "\u22E6", "\\lnsim", true), F(j, Y, "\u2A89", "\\lnapprox", true), F(j, Y, "\u2280", "\\nprec", true), F(j, Y, "\u22E0", "\\npreceq", true), F(j, Y, "\u22E8", "\\precnsim", true), F(j, Y, "\u2AB9", "\\precnapprox", true), F(j, Y, "\u2241", "\\nsim", true), F(j, Y, "\u2224", "\\nmid", true), F(j, Y, "\u2224", "\\nshortmid"), F(j, Y, "\u22AC", "\\nvdash", true), F(j, Y, "\u22AD", "\\nvDash", true), F(j, Y, "\u22EA", "\\ntriangleleft"), F(j, Y, "\u22EC", "\\ntrianglelefteq", true), F(j, Y, "\u2284", "\\nsubset", true), F(j, Y, "\u2285", "\\nsupset", true), F(j, Y, "\u228A", "\\subsetneq", true), F(j, Y, "\u228A\uFE00", "\\varsubsetneq"), F(j, Y, "\u2ACB", "\\subsetneqq", true), F(j, Y, "\u2ACB\uFE00", "\\varsubsetneqq"), F(j, Y, "\u226F", "\\ngtr", true), F(j, Y, "\u2A88", "\\gneq", true), F(j, Y, "\u2269", "\\gneqq", true), F(j, Y, "\u2269\uFE00", "\\gvertneqq"), F(j, Y, "\u22E7", "\\gnsim", true), F(j, Y, "\u2A8A", "\\gnapprox", true), F(j, Y, "\u2281", "\\nsucc", true), F(j, Y, "\u22E1", "\\nsucceq", true), F(j, Y, "\u22E9", "\\succnsim", true), F(j, Y, "\u2ABA", "\\succnapprox", true), F(j, Y, "\u2246", "\\ncong", true), F(j, Y, "\u2226", "\\nparallel", true), F(j, Y, "\u2226", "\\nshortparallel"), F(j, Y, "\u22AF", "\\nVDash", true), F(j, Y, "\u22EB", "\\ntriangleright"), F(j, Y, "\u22ED", "\\ntrianglerighteq", true), F(j, Y, "\u228B", "\\supsetneq", true), F(j, Y, "\u228B", "\\varsupsetneq"), F(j, Y, "\u2ACC", "\\supsetneqq", true), F(j, Y, "\u2ACC\uFE00", "\\varsupsetneqq"), F(j, Y, "\u22AE", "\\nVdash", true), F(j, Y, "\u2AB5", "\\precneqq", true), F(j, Y, "\u2AB6", "\\succneqq", true), F(j, U, "\u22B4", "\\unlhd"), F(j, U, "\u22B5", "\\unrhd"), F(j, Y, "\u219A", "\\nleftarrow", true), F(j, Y, "\u219B", "\\nrightarrow", true), F(j, Y, "\u21CD", "\\nLeftarrow", true), F(j, Y, "\u21CF", "\\nRightarrow", true), F(j, Y, "\u21AE", "\\nleftrightarrow", true), F(j, Y, "\u21CE", "\\nLeftrightarrow", true), F(j, Y, "\u25B3", "\\vartriangle"), F(j, Q, "\u210F", "\\hslash"), F(j, Q, "\u25BD", "\\triangledown"), F(j, Q, "\u25CA", "\\lozenge"), F(j, Q, "\u24C8", "\\circledS"), F(j, Q, "\xAE", "\\circledR", true), F(z, Q, "\xAE", "\\circledR"), F(z, Q, "\xAE", "\\textregistered"), F(j, Q, "\u2221", "\\measuredangle", true), F(j, Q, "\u2204", "\\nexists"), F(j, Q, "\u2127", "\\mho"), F(j, Q, "\u2132", "\\Finv", true), F(j, Q, "\u2141", "\\Game", true), F(j, Q, "\u2035", "\\backprime"), F(j, Q, "\u2036", "\\backdprime"), F(j, Q, "\u2037", "\\backtrprime"), F(j, Q, "\u25B2", "\\blacktriangle"), F(j, Q, "\u25BC", "\\blacktriangledown"), F(j, Q, "\u25A0", "\\blacksquare"), F(j, Q, "\u29EB", "\\blacklozenge"), F(j, Q, "\u2605", "\\bigstar"), F(j, Q, "\u2222", "\\sphericalangle", true), F(j, Q, "\u2201", "\\complement", true), F(j, Q, "\u2571", "\\diagup"), F(j, Q, "\u2572", "\\diagdown"), F(j, Q, "\u25A1", "\\square"), F(j, Q, "\u25A1", "\\Box"), F(j, Q, "\u25CA", "\\Diamond"), F(j, Q, "\xA5", "\\yen", true), F(z, Q, "\xA5", "\\yen", true), F(j, Q, "\u2713", "\\checkmark", true), F(z, Q, "\u2713", "\\checkmark"), F(j, Q, "\u2717", "\\ballotx", true), F(z, Q, "\u2717", "\\ballotx"), F(z, Q, "\u2022", "\\textbullet"), F(j, Q, "\u2136", "\\beth", true), F(j, Q, "\u2138", "\\daleth", true), F(j, Q, "\u2137", "\\gimel", true), F(j, Q, "\u03DD", "\\digamma", true), F(j, Q, "\u03F0", "\\varkappa"), F(j, J, "\u231C", "\\ulcorner", true), F(j, G, "\u231D", "\\urcorner", true), F(j, J, "\u231E", "\\llcorner", true), F(j, G, "\u231F", "\\lrcorner", true), F(j, Y, "\u2266", "\\leqq", true), F(j, Y, "\u2A7D", "\\leqslant", true), F(j, Y, "\u2A95", "\\eqslantless", true), F(j, Y, "\u2272", "\\lesssim", true), F(j, Y, "\u2A85", "\\lessapprox", true), F(j, Y, "\u224A", "\\approxeq", true), F(j, U, "\u22D6", "\\lessdot"), F(j, Y, "\u22D8", "\\lll", true), F(j, Y, "\u2276", "\\lessgtr", true), F(j, Y, "\u22DA", "\\lesseqgtr", true), F(j, Y, "\u2A8B", "\\lesseqqgtr", true), F(j, Y, "\u2251", "\\doteqdot"), F(j, Y, "\u2253", "\\risingdotseq", true), F(j, Y, "\u2252", "\\fallingdotseq", true), F(j, Y, "\u223D", "\\backsim", true), F(j, Y, "\u22CD", "\\backsimeq", true), F(j, Y, "\u2AC5", "\\subseteqq", true), F(j, Y, "\u22D0", "\\Subset", true), F(j, Y, "\u228F", "\\sqsubset", true), F(j, Y, "\u227C", "\\preccurlyeq", true), F(j, Y, "\u22DE", "\\curlyeqprec", true), F(j, Y, "\u227E", "\\precsim", true), F(j, Y, "\u2AB7", "\\precapprox", true), F(j, Y, "\u22B2", "\\vartriangleleft"), F(j, Y, "\u22B4", "\\trianglelefteq"), F(j, Y, "\u22A8", "\\vDash", true), F(j, Y, "\u22AB", "\\VDash", true), F(j, Y, "\u22AA", "\\Vvdash", true), F(j, Y, "\u2323", "\\smallsmile"), F(j, Y, "\u2322", "\\smallfrown"), F(j, Y, "\u224F", "\\bumpeq", true), F(j, Y, "\u224E", "\\Bumpeq", true), F(j, Y, "\u2267", "\\geqq", true), F(j, Y, "\u2A7E", "\\geqslant", true), F(j, Y, "\u2A96", "\\eqslantgtr", true), F(j, Y, "\u2273", "\\gtrsim", true), F(j, Y, "\u2A86", "\\gtrapprox", true), F(j, U, "\u22D7", "\\gtrdot"), F(j, Y, "\u22D9", "\\ggg", true), F(j, Y, "\u2277", "\\gtrless", true), F(j, Y, "\u22DB", "\\gtreqless", true), F(j, Y, "\u2A8C", "\\gtreqqless", true), F(j, Y, "\u2256", "\\eqcirc", true), F(j, Y, "\u2257", "\\circeq", true), F(j, Y, "\u225C", "\\triangleq", true), F(j, Y, "\u223C", "\\thicksim"), F(j, Y, "\u2248", "\\thickapprox"), F(j, Y, "\u2AC6", "\\supseteqq", true), F(j, Y, "\u22D1", "\\Supset", true), F(j, Y, "\u2290", "\\sqsupset", true), F(j, Y, "\u227D", "\\succcurlyeq", true), F(j, Y, "\u22DF", "\\curlyeqsucc", true), F(j, Y, "\u227F", "\\succsim", true), F(j, Y, "\u2AB8", "\\succapprox", true), F(j, Y, "\u22B3", "\\vartriangleright"), F(j, Y, "\u22B5", "\\trianglerighteq"), F(j, Y, "\u22A9", "\\Vdash", true), F(j, Y, "\u2223", "\\shortmid"), F(j, Y, "\u2225", "\\shortparallel"), F(j, Y, "\u226C", "\\between", true), F(j, Y, "\u22D4", "\\pitchfork", true), F(j, Y, "\u221D", "\\varpropto"), F(j, Y, "\u25C0", "\\blacktriangleleft"), F(j, Y, "\u2234", "\\therefore", true), F(j, Y, "\u220D", "\\backepsilon"), F(j, Y, "\u25B6", "\\blacktriangleright"), F(j, Y, "\u2235", "\\because", true), F(j, Y, "\u22D8", "\\llless"), F(j, Y, "\u22D9", "\\gggtr"), F(j, U, "\u22B2", "\\lhd"), F(j, U, "\u22B3", "\\rhd"), F(j, Y, "\u2242", "\\eqsim", true), F(j, Y, "\u2251", "\\Doteq", true), F(j, Y, "\u297D", "\\strictif", true), F(j, Y, "\u297C", "\\strictfi", true), F(j, U, "\u2214", "\\dotplus", true), F(j, U, "\u2216", "\\smallsetminus"), F(j, U, "\u22D2", "\\Cap", true), F(j, U, "\u22D3", "\\Cup", true), F(j, U, "\u2A5E", "\\doublebarwedge", true), F(j, U, "\u229F", "\\boxminus", true), F(j, U, "\u229E", "\\boxplus", true), F(j, U, "\u29C4", "\\boxslash", true), F(j, U, "\u22C7", "\\divideontimes", true), F(j, U, "\u22C9", "\\ltimes", true), F(j, U, "\u22CA", "\\rtimes", true), F(j, U, "\u22CB", "\\leftthreetimes", true), F(j, U, "\u22CC", "\\rightthreetimes", true), F(j, U, "\u22CF", "\\curlywedge", true), F(j, U, "\u22CE", "\\curlyvee", true), F(j, U, "\u229D", "\\circleddash", true), F(j, U, "\u229B", "\\circledast", true), F(j, U, "\u22BA", "\\intercal", true), F(j, U, "\u22D2", "\\doublecap"), F(j, U, "\u22D3", "\\doublecup"), F(j, U, "\u22A0", "\\boxtimes", true), F(j, U, "\u22C8", "\\bowtie", true), F(j, U, "\u22C8", "\\Join"), F(j, U, "\u27D5", "\\leftouterjoin", true), F(j, U, "\u27D6", "\\rightouterjoin", true), F(j, U, "\u27D7", "\\fullouterjoin", true), F(j, U, "\u2238", "\\dotminus", true), F(j, U, "\u27D1", "\\wedgedot", true), F(j, U, "\u27C7", "\\veedot", true), F(j, U, "\u2A62", "\\doublebarvee", true), F(j, U, "\u2A63", "\\veedoublebar", true), F(j, U, "\u2A5F", "\\wedgebar", true), F(j, U, "\u2A60", "\\wedgedoublebar", true), F(j, U, "\u2A54", "\\Vee", true), F(j, U, "\u2A53", "\\Wedge", true), F(j, U, "\u2A43", "\\barcap", true), F(j, U, "\u2A42", "\\barcup", true), F(j, U, "\u2A48", "\\capbarcup", true), F(j, U, "\u2A40", "\\capdot", true), F(j, U, "\u2A47", "\\capovercup", true), F(j, U, "\u2A46", "\\cupovercap", true), F(j, U, "\u2A4D", "\\closedvarcap", true), F(j, U, "\u2A4C", "\\closedvarcup", true), F(j, U, "\u2A2A", "\\minusdot", true), F(j, U, "\u2A2B", "\\minusfdots", true), F(j, U, "\u2A2C", "\\minusrdots", true), F(j, U, "\u22BB", "\\Xor", true), F(j, U, "\u22BC", "\\Nand", true), F(j, U, "\u22BD", "\\Nor", true), F(j, U, "\u22BD", "\\barvee"), F(j, U, "\u2AF4", "\\interleave", true), F(j, U, "\u29E2", "\\shuffle", true), F(j, U, "\u2AF6", "\\threedotcolon", true), F(j, U, "\u2982", "\\typecolon", true), F(j, U, "\u223E", "\\invlazys", true), F(j, U, "\u2A4B", "\\twocaps", true), F(j, U, "\u2A4A", "\\twocups", true), F(j, U, "\u2A4E", "\\Sqcap", true), F(j, U, "\u2A4F", "\\Sqcup", true), F(j, U, "\u2A56", "\\veeonvee", true), F(j, U, "\u2A55", "\\wedgeonwedge", true), F(j, U, "\u29D7", "\\blackhourglass", true), F(j, U, "\u29C6", "\\boxast", true), F(j, U, "\u29C8", "\\boxbox", true), F(j, U, "\u29C7", "\\boxcircle", true), F(j, U, "\u229C", "\\circledequal", true), F(j, U, "\u29B7", "\\circledparallel", true), F(j, U, "\u29B6", "\\circledvert", true), F(j, U, "\u29B5", "\\circlehbar", true), F(j, U, "\u27E1", "\\concavediamond", true), F(j, U, "\u27E2", "\\concavediamondtickleft", true), F(j, U, "\u27E3", "\\concavediamondtickright", true), F(j, U, "\u22C4", "\\diamond", true), F(j, U, "\u29D6", "\\hourglass", true), F(j, U, "\u27E0", "\\lozengeminus", true), F(j, U, "\u233D", "\\obar", true), F(j, U, "\u29B8", "\\obslash", true), F(j, U, "\u2A38", "\\odiv", true), F(j, U, "\u29C1", "\\ogreaterthan", true), F(j, U, "\u29C0", "\\olessthan", true), F(j, U, "\u29B9", "\\operp", true), F(j, U, "\u2A37", "\\Otimes", true), F(j, U, "\u2A36", "\\otimeshat", true), F(j, U, "\u22C6", "\\star", true), F(j, U, "\u25B3", "\\triangle", true), F(j, U, "\u2A3A", "\\triangleminus", true), F(j, U, "\u2A39", "\\triangleplus", true), F(j, U, "\u2A3B", "\\triangletimes", true), F(j, U, "\u27E4", "\\whitesquaretickleft", true), F(j, U, "\u27E5", "\\whitesquaretickright", true), F(j, U, "\u2A33", "\\smashtimes", true), F(j, Y, "\u21E2", "\\dashrightarrow", true), F(j, Y, "\u21E0", "\\dashleftarrow", true), F(j, Y, "\u21C7", "\\leftleftarrows", true), F(j, Y, "\u21C6", "\\leftrightarrows", true), F(j, Y, "\u21DA", "\\Lleftarrow", true), F(j, Y, "\u219E", "\\twoheadleftarrow", true), F(j, Y, "\u21A2", "\\leftarrowtail", true), F(j, Y, "\u21AB", "\\looparrowleft", true), F(j, Y, "\u21CB", "\\leftrightharpoons", true), F(j, Y, "\u21B6", "\\curvearrowleft", true), F(j, Y, "\u21BA", "\\circlearrowleft", true), F(j, Y, "\u21B0", "\\Lsh", true), F(j, Y, "\u21C8", "\\upuparrows", true), F(j, Y, "\u21BF", "\\upharpoonleft", true), F(j, Y, "\u21C3", "\\downharpoonleft", true), F(j, Y, "\u22B6", "\\origof", true), F(j, Y, "\u22B7", "\\imageof", true), F(j, Y, "\u22B8", "\\multimap", true), F(j, Y, "\u21AD", "\\leftrightsquigarrow", true), F(j, Y, "\u21C9", "\\rightrightarrows", true), F(j, Y, "\u21C4", "\\rightleftarrows", true), F(j, Y, "\u21A0", "\\twoheadrightarrow", true), F(j, Y, "\u21A3", "\\rightarrowtail", true), F(j, Y, "\u21AC", "\\looparrowright", true), F(j, Y, "\u21B7", "\\curvearrowright", true), F(j, Y, "\u21BB", "\\circlearrowright", true), F(j, Y, "\u21B1", "\\Rsh", true), F(j, Y, "\u21CA", "\\downdownarrows", true), F(j, Y, "\u21BE", "\\upharpoonright", true), F(j, Y, "\u21C2", "\\downharpoonright", true), F(j, Y, "\u21DD", "\\rightsquigarrow", true), F(j, Y, "\u21DD", "\\leadsto"), F(j, Y, "\u21DB", "\\Rrightarrow", true), F(j, Y, "\u21BE", "\\restriction"), F(j, Q, "\u2018", "`"), F(j, Q, "$", "\\$"), F(z, Q, "$", "\\$"), F(z, Q, "$", "\\textdollar"), F(j, Q, "\xA2", "\\cent"), F(z, Q, "\xA2", "\\cent"), F(j, Q, "%", "\\%"), F(z, Q, "%", "\\%"), F(j, Q, "_", "\\_"), F(z, Q, "_", "\\_"), F(z, Q, "_", "\\textunderscore"), F(z, Q, "\u2423", "\\textvisiblespace", true), F(j, Q, "\u2220", "\\angle", true), F(j, Q, "\u221E", "\\infty", true), F(j, Q, "\u2032", "\\prime"), F(j, Q, "\u2033", "\\dprime"), F(j, Q, "\u2034", "\\trprime"), F(j, Q, "\u2057", "\\qprime"), F(j, Q, "\u25B3", "\\triangle"), F(z, Q, "\u0391", "\\Alpha", true), F(z, Q, "\u0392", "\\Beta", true), F(z, Q, "\u0393", "\\Gamma", true), F(z, Q, "\u0394", "\\Delta", true), F(z, Q, "\u0395", "\\Epsilon", true), F(z, Q, "\u0396", "\\Zeta", true), F(z, Q, "\u0397", "\\Eta", true), F(z, Q, "\u0398", "\\Theta", true), F(z, Q, "\u0399", "\\Iota", true), F(z, Q, "\u039A", "\\Kappa", true), F(z, Q, "\u039B", "\\Lambda", true), F(z, Q, "\u039C", "\\Mu", true), F(z, Q, "\u039D", "\\Nu", true), F(z, Q, "\u039E", "\\Xi", true), F(z, Q, "\u039F", "\\Omicron", true), F(z, Q, "\u03A0", "\\Pi", true), F(z, Q, "\u03A1", "\\Rho", true), F(z, Q, "\u03A3", "\\Sigma", true), F(z, Q, "\u03A4", "\\Tau", true), F(z, Q, "\u03A5", "\\Upsilon", true), F(z, Q, "\u03A6", "\\Phi", true), F(z, Q, "\u03A7", "\\Chi", true), F(z, Q, "\u03A8", "\\Psi", true), F(z, Q, "\u03A9", "\\Omega", true), F(j, V, "\u0391", "\\Alpha", true), F(j, V, "\u0392", "\\Beta", true), F(j, V, "\u0393", "\\Gamma", true), F(j, V, "\u0394", "\\Delta", true), F(j, V, "\u0395", "\\Epsilon", true), F(j, V, "\u0396", "\\Zeta", true), F(j, V, "\u0397", "\\Eta", true), F(j, V, "\u0398", "\\Theta", true), F(j, V, "\u0399", "\\Iota", true), F(j, V, "\u039A", "\\Kappa", true), F(j, V, "\u039B", "\\Lambda", true), F(j, V, "\u039C", "\\Mu", true), F(j, V, "\u039D", "\\Nu", true), F(j, V, "\u039E", "\\Xi", true), F(j, V, "\u039F", "\\Omicron", true), F(j, V, "\u03A0", "\\Pi", true), F(j, V, "\u03A1", "\\Rho", true), F(j, V, "\u03A3", "\\Sigma", true), F(j, V, "\u03A4", "\\Tau", true), F(j, V, "\u03A5", "\\Upsilon", true), F(j, V, "\u03A6", "\\Phi", true), F(j, V, "\u03A7", "\\Chi", true), F(j, V, "\u03A8", "\\Psi", true), F(j, V, "\u03A9", "\\Omega", true), F(j, J, "\xAC", "\\neg", true), F(j, J, "\xAC", "\\lnot"), F(j, Q, "\u22A4", "\\top"), F(j, Q, "\u22A5", "\\bot"), F(j, Q, "\u2205", "\\emptyset"), F(j, Q, "\u2300", "\\varnothing"), F(j, V, "\u03B1", "\\alpha", true), F(j, V, "\u03B2", "\\beta", true), F(j, V, "\u03B3", "\\gamma", true), F(j, V, "\u03B4", "\\delta", true), F(j, V, "\u03F5", "\\epsilon", true), F(j, V, "\u03B6", "\\zeta", true), F(j, V, "\u03B7", "\\eta", true), F(j, V, "\u03B8", "\\theta", true), F(j, V, "\u03B9", "\\iota", true), F(j, V, "\u03BA", "\\kappa", true), F(j, V, "\u03BB", "\\lambda", true), F(j, V, "\u03BC", "\\mu", true), F(j, V, "\u03BD", "\\nu", true), F(j, V, "\u03BE", "\\xi", true), F(j, V, "\u03BF", "\\omicron", true), F(j, V, "\u03C0", "\\pi", true), F(j, V, "\u03C1", "\\rho", true), F(j, V, "\u03C3", "\\sigma", true), F(j, V, "\u03C4", "\\tau", true), F(j, V, "\u03C5", "\\upsilon", true), F(j, V, "\u03D5", "\\phi", true), F(j, V, "\u03C7", "\\chi", true), F(j, V, "\u03C8", "\\psi", true), F(j, V, "\u03C9", "\\omega", true), F(j, V, "\u03B5", "\\varepsilon", true), F(j, V, "\u03D1", "\\vartheta", true), F(j, V, "\u03D6", "\\varpi", true), F(j, V, "\u03F1", "\\varrho", true), F(j, V, "\u03C2", "\\varsigma", true), F(j, V, "\u03C6", "\\varphi", true), F(j, V, "\u03D8", "\\Coppa", true), F(j, V, "\u03D9", "\\coppa", true), F(j, V, "\u03D9", "\\varcoppa", true), F(j, V, "\u03DE", "\\Koppa", true), F(j, V, "\u03DF", "\\koppa", true), F(j, V, "\u03E0", "\\Sampi", true), F(j, V, "\u03E1", "\\sampi", true), F(j, V, "\u03DA", "\\Stigma", true), F(j, V, "\u03DB", "\\stigma", true), F(j, V, "\u2AEB", "\\Bot"), F(j, Q, "\xF0", "\\eth", true), F(z, Q, "\xF0", "\xF0"), F(j, Q, "\xC5", "\\AA"), F(z, Q, "\xC5", "\\AA", true), F(j, Q, "\xC6", "\\AE", true), F(z, Q, "\xC6", "\\AE", true), F(j, Q, "\xD0", "\\DH", true), F(z, Q, "\xD0", "\\DH", true), F(j, Q, "\xDE", "\\TH", true), F(z, Q, "\xDE", "\\TH", true), F(j, Q, "\xDF", "\\ss", true), F(z, Q, "\xDF", "\\ss", true), F(j, Q, "\xE5", "\\aa"), F(z, Q, "\xE5", "\\aa", true), F(j, Q, "\xE6", "\\ae", true), F(z, Q, "\xE6", "\\ae", true), F(j, Q, "\xF0", "\\dh"), F(z, Q, "\xF0", "\\dh", true), F(j, Q, "\xFE", "\\th", true), F(z, Q, "\xFE", "\\th", true), F(j, Q, "\u0110", "\\DJ", true), F(z, Q, "\u0110", "\\DJ", true), F(j, Q, "\u0111", "\\dj", true), F(z, Q, "\u0111", "\\dj", true), F(j, Q, "\u0141", "\\L", true), F(z, Q, "\u0141", "\\L", true), F(j, Q, "\u0141", "\\l", true), F(z, Q, "\u0141", "\\l", true), F(j, Q, "\u014A", "\\NG", true), F(z, Q, "\u014A", "\\NG", true), F(j, Q, "\u014B", "\\ng", true), F(z, Q, "\u014B", "\\ng", true), F(j, Q, "\u0152", "\\OE", true), F(z, Q, "\u0152", "\\OE", true), F(j, Q, "\u0153", "\\oe", true), F(z, Q, "\u0153", "\\oe", true), F(j, U, "\u2217", "\u2217", true), F(j, U, "+", "+"), F(j, U, "\u2217", "*"), F(j, U, "\u2044", "/", true), F(j, U, "\u2044", "\u2044"), F(j, U, "\u2212", "-", true), F(j, U, "\u22C5", "\\cdot", true), F(j, U, "\u2218", "\\circ", true), F(j, U, "\xF7", "\\div", true), F(j, U, "\xB1", "\\pm", true), F(j, U, "\xD7", "\\times", true), F(j, U, "\u2229", "\\cap", true), F(j, U, "\u222A", "\\cup", true), F(j, U, "\u2216", "\\setminus", true), F(j, U, "\u2227", "\\land"), F(j, U, "\u2228", "\\lor"), F(j, U, "\u2227", "\\wedge", true), F(j, U, "\u2228", "\\vee", true), F(j, J, "\u27E6", "\\llbracket", true), F(j, G, "\u27E7", "\\rrbracket", true), F(j, J, "\u27E8", "\\langle", true), F(j, J, "\u27EA", "\\lAngle", true), F(j, J, "\u2989", "\\llangle", true), F(j, J, "|", "\\lvert"), F(j, J, "\u2016", "\\lVert", true), F(j, Q, "!", "\\oc"), F(j, Q, "?", "\\wn"), F(j, Q, "\u2193", "\\shpos"), F(j, Q, "\u2195", "\\shift"), F(j, Q, "\u2191", "\\shneg"), F(j, G, "?", "?"), F(j, G, "!", "!"), F(j, G, "\u203C", "\u203C"), F(j, G, "\u27E9", "\\rangle", true), F(j, G, "\u27EB", "\\rAngle", true), F(j, G, "\u298A", "\\rrangle", true), F(j, G, "|", "\\rvert"), F(j, G, "\u2016", "\\rVert"), F(j, J, "\u2983", "\\lBrace", true), F(j, G, "\u2984", "\\rBrace", true), F(j, Y, "=", "\\equal", true), F(j, Y, ":", ":"), F(j, Y, "\u2248", "\\approx", true), F(j, Y, "\u2245", "\\cong", true), F(j, Y, "\u2265", "\\ge"), F(j, Y, "\u2265", "\\geq", true), F(j, Y, "\u2190", "\\gets"), F(j, Y, ">", "\\gt", true), F(j, Y, "\u2208", "\\in", true), F(j, Y, "\u2209", "\\notin", true), F(j, Y, "\uE020", "\\@not"), F(j, Y, "\u2282", "\\subset", true), F(j, Y, "\u2283", "\\supset", true), F(j, Y, "\u2286", "\\subseteq", true), F(j, Y, "\u2287", "\\supseteq", true), F(j, Y, "\u2288", "\\nsubseteq", true), F(j, Y, "\u2288", "\\nsubseteqq"), F(j, Y, "\u2289", "\\nsupseteq", true), F(j, Y, "\u2289", "\\nsupseteqq"), F(j, Y, "\u22A8", "\\models"), F(j, Y, "\u2190", "\\leftarrow", true), F(j, Y, "\u2264", "\\le"), F(j, Y, "\u2264", "\\leq", true), F(j, Y, "<", "\\lt", true), F(j, Y, "\u2192", "\\rightarrow", true), F(j, Y, "\u2192", "\\to"), F(j, Y, "\u2271", "\\ngeq", true), F(j, Y, "\u2271", "\\ngeqq"), F(j, Y, "\u2271", "\\ngeqslant"), F(j, Y, "\u2270", "\\nleq", true), F(j, Y, "\u2270", "\\nleqq"), F(j, Y, "\u2270", "\\nleqslant"), F(j, Y, "\u2AEB", "\\Perp", true), F(j, K, "\xA0", "\\ "), F(j, K, "\xA0", "\\space"), F(j, K, "\xA0", "\\nobreakspace"), F(z, K, "\xA0", "\\ "), F(z, K, "\xA0", " "), F(z, K, "\xA0", "\\space"), F(z, K, "\xA0", "\\nobreakspace"), F(j, K, null, "\\nobreak"), F(j, K, null, "\\allowbreak"), F(j, Z, ",", ","), F(z, Z, ":", ":"), F(j, Z, ";", ";"), F(j, U, "\u22BC", "\\barwedge"), F(j, U, "\u22BB", "\\veebar"), F(j, U, "\u2299", "\\odot", true), F(j, U, "\u2295\uFE0E", "\\oplus"), F(j, U, "\u2297", "\\otimes", true), F(j, Q, "\u2202", "\\partial", true), F(j, U, "\u2298", "\\oslash", true), F(j, U, "\u229A", "\\circledcirc", true), F(j, U, "\u22A1", "\\boxdot", true), F(j, U, "\u25B3", "\\bigtriangleup"), F(j, U, "\u25BD", "\\bigtriangledown"), F(j, U, "\u2020", "\\dagger"), F(j, U, "\u22C4", "\\diamond"), F(j, U, "\u25C3", "\\triangleleft"), F(j, U, "\u25B9", "\\triangleright"), F(j, J, "{", "\\{"), F(z, Q, "{", "\\{"), F(z, Q, "{", "\\textbraceleft"), F(j, G, "}", "\\}"), F(z, Q, "}", "\\}"), F(z, Q, "}", "\\textbraceright"), F(j, J, "{", "\\lbrace"), F(j, G, "}", "\\rbrace"), F(j, J, "[", "\\lbrack", true), F(z, Q, "[", "\\lbrack", true), F(j, G, "]", "\\rbrack", true), F(z, Q, "]", "\\rbrack", true), F(j, J, "(", "\\lparen", true), F(j, G, ")", "\\rparen", true), F(j, J, "\u2987", "\\llparenthesis", true), F(j, G, "\u2988", "\\rrparenthesis", true), F(z, Q, "<", "\\textless", true), F(z, Q, ">", "\\textgreater", true), F(j, J, "\u230A", "\\lfloor", true), F(j, G, "\u230B", "\\rfloor", true), F(j, J, "\u2308", "\\lceil", true), F(j, G, "\u2309", "\\rceil", true), F(j, Q, "\\", "\\backslash"), F(j, Q, "|", "|"), F(j, Q, "|", "\\vert"), F(z, Q, "|", "\\textbar", true), F(j, Q, "\u2016", "\\|"), F(j, Q, "\u2016", "\\Vert"), F(z, Q, "\u2016", "\\textbardbl"), F(z, Q, "~", "\\textasciitilde"), F(z, Q, "\\", "\\textbackslash"), F(z, Q, "^", "\\textasciicircum"), F(j, Y, "\u2191", "\\uparrow", true), F(j, Y, "\u21D1", "\\Uparrow", true), F(j, Y, "\u2193", "\\downarrow", true), F(j, Y, "\u21D3", "\\Downarrow", true), F(j, Y, "\u2195", "\\updownarrow", true), F(j, Y, "\u21D5", "\\Updownarrow", true), F(j, X, "\u2210", "\\coprod"), F(j, X, "\u22C1", "\\bigvee"), F(j, X, "\u22C0", "\\bigwedge"), F(j, X, "\u2A04", "\\biguplus"), F(j, X, "\u2A04", "\\bigcupplus"), F(j, X, "\u2A03", "\\bigcupdot"), F(j, X, "\u2A07", "\\bigdoublevee"), F(j, X, "\u2A08", "\\bigdoublewedge"), F(j, X, "\u22C2", "\\bigcap"), F(j, X, "\u22C3", "\\bigcup"), F(j, X, "\u222B", "\\int"), F(j, X, "\u222B", "\\intop"), F(j, X, "\u222C", "\\iint"), F(j, X, "\u222D", "\\iiint"), F(j, X, "\u220F", "\\prod"), F(j, X, "\u2211", "\\sum"), F(j, X, "\u2A02", "\\bigotimes"), F(j, X, "\u2A01", "\\bigoplus"), F(j, X, "\u2A00", "\\bigodot"), F(j, X, "\u2A09", "\\bigtimes"), F(j, X, "\u222E", "\\oint"), F(j, X, "\u222F", "\\oiint"), F(j, X, "\u2230", "\\oiiint"), F(j, X, "\u2231", "\\intclockwise"), F(j, X, "\u2232", "\\varointclockwise"), F(j, X, "\u2A0C", "\\iiiint"), F(j, X, "\u2A0D", "\\intbar"), F(j, X, "\u2A0E", "\\intBar"), F(j, X, "\u2A0F", "\\fint"), F(j, X, "\u2A12", "\\rppolint"), F(j, X, "\u2A13", "\\scpolint"), F(j, X, "\u2A15", "\\pointint"), F(j, X, "\u2A16", "\\sqint"), F(j, X, "\u2A17", "\\intlarhk"), F(j, X, "\u2A18", "\\intx"), F(j, X, "\u2A19", "\\intcap"), F(j, X, "\u2A1A", "\\intcup"), F(j, X, "\u2A05", "\\bigsqcap"), F(j, X, "\u2A06", "\\bigsqcup"), F(j, X, "\u222B", "\\smallint"), F(z, W, "\u2026", "\\textellipsis"), F(j, W, "\u2026", "\\mathellipsis"), F(z, W, "\u2026", "\\ldots", true), F(j, W, "\u2026", "\\ldots", true), F(j, W, "\u22F0", "\\iddots", true), F(j, W, "\u22EF", "\\@cdots", true), F(j, W, "\u22F1", "\\ddots", true), F(j, Q, "\u22EE", "\\varvdots"), F(z, Q, "\u22EE", "\\varvdots"), F(j, H, "\xB4", "\\acute"), F(j, H, "`", "\\grave"), F(j, H, "\xA8", "\\ddot"), F(j, H, "\u2026", "\\dddot"), F(j, H, "\u2026.", "\\ddddot"), F(j, H, "~", "\\tilde"), F(j, H, "\u203E", "\\bar"), F(j, H, "\u02D8", "\\breve"), F(j, H, "\u02C7", "\\check"), F(j, H, "^", "\\hat"), F(j, H, "\u2192", "\\vec"), F(j, H, "\u02D9", "\\dot"), F(j, H, "\u02DA", "\\mathring"), F(j, V, "\u0131", "\\imath", true), F(j, V, "\u0237", "\\jmath", true), F(j, Q, "\u0131", "\u0131"), F(j, Q, "\u0237", "\u0237"), F(z, Q, "\u0131", "\\i", true), F(z, Q, "\u0237", "\\j", true), F(z, Q, "\xF8", "\\o", true), F(j, V, "\xF8", "\\o", true), F(z, Q, "\xD8", "\\O", true), F(j, V, "\xD8", "\\O", true), F(z, H, "\u02CA", "\\'"), F(z, H, "\u02CB", "\\`"), F(z, H, "\u02C6", "\\^"), F(z, H, "~", "\\~"), F(z, H, "\u02C9", "\\="), F(z, H, "\u02D8", "\\u"), F(z, H, "\u02D9", "\\."), F(z, H, "\xB8", "\\c"), F(z, H, "\u02DA", "\\r"), F(z, H, "\u02C7", "\\v");
        F(z, H, "\xA8", '\\"'), F(z, H, "\u02DD", "\\H"), F(j, H, "\u02CA", "\\'"), F(j, H, "\u02CB", "\\`"), F(j, H, "\u02C6", "\\^"), F(j, H, "~", "\\~"), F(j, H, "\u02C9", "\\="), F(j, H, "\u02D8", "\\u"), F(j, H, "\u02D9", "\\."), F(j, H, "\xB8", "\\c"), F(j, H, "\u02DA", "\\r"), F(j, H, "\u02C7", "\\v"), F(j, H, "\xA8", '\\"'), F(j, H, "\u02DD", "\\H");
        const ee = { "--": true, "---": true, "``": true, "''": true };
        F(z, Q, "\u2013", "--", true), F(z, Q, "\u2013", "\\textendash"), F(z, Q, "\u2014", "---", true), F(z, Q, "\u2014", "\\textemdash"), F(z, Q, "\u2018", "`", true), F(z, Q, "\u2018", "\\textquoteleft"), F(z, Q, "\u2019", "'", true), F(z, Q, "\u2019", "\\textquoteright"), F(z, Q, "\u201C", "``", true), F(z, Q, "\u201C", "\\textquotedblleft"), F(z, Q, "\u201D", "''", true), F(z, Q, "\u201D", "\\textquotedblright"), F(j, Q, "\xB0", "\\degree", true), F(z, Q, "\xB0", "\\degree"), F(z, Q, "\xB0", "\\textdegree", true), F(j, Q, "\xA3", "\\pounds"), F(j, Q, "\xA3", "\\mathsterling", true), F(z, Q, "\xA3", "\\pounds"), F(z, Q, "\xA3", "\\textsterling", true), F(j, Q, "\u2720", "\\maltese"), F(z, Q, "\u2720", "\\maltese"), F(j, Q, "\u20AC", "\\euro", true), F(z, Q, "\u20AC", "\\euro", true), F(z, Q, "\u20AC", "\\texteuro"), F(j, Q, "\xA9", "\\copyright", true), F(z, Q, "\xA9", "\\textcopyright"), F(j, Q, "\u2300", "\\diameter", true), F(z, Q, "\u2300", "\\diameter"), F(j, Q, "\u{1D6E4}", "\\varGamma"), F(j, Q, "\u{1D6E5}", "\\varDelta"), F(j, Q, "\u{1D6E9}", "\\varTheta"), F(j, Q, "\u{1D6EC}", "\\varLambda"), F(j, Q, "\u{1D6EF}", "\\varXi"), F(j, Q, "\u{1D6F1}", "\\varPi"), F(j, Q, "\u{1D6F4}", "\\varSigma"), F(j, Q, "\u{1D6F6}", "\\varUpsilon"), F(j, Q, "\u{1D6F7}", "\\varPhi"), F(j, Q, "\u{1D6F9}", "\\varPsi"), F(j, Q, "\u{1D6FA}", "\\varOmega"), F(z, Q, "\u{1D6E4}", "\\varGamma"), F(z, Q, "\u{1D6E5}", "\\varDelta"), F(z, Q, "\u{1D6E9}", "\\varTheta"), F(z, Q, "\u{1D6EC}", "\\varLambda"), F(z, Q, "\u{1D6EF}", "\\varXi"), F(z, Q, "\u{1D6F1}", "\\varPi"), F(z, Q, "\u{1D6F4}", "\\varSigma"), F(z, Q, "\u{1D6F6}", "\\varUpsilon"), F(z, Q, "\u{1D6F7}", "\\varPhi"), F(z, Q, "\u{1D6F9}", "\\varPsi"), F(z, Q, "\u{1D6FA}", "\\varOmega");
        const te = '0123456789/@."';
        for (let e3 = 0; e3 < 14; e3++) {
          const t3 = te.charAt(e3);
          F(j, Q, t3, t3);
        }
        const re = '0123456789!@*()-=+";:?/.,';
        for (let e3 = 0; e3 < 25; e3++) {
          const t3 = re.charAt(e3);
          F(z, Q, t3, t3);
        }
        const ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let e3 = 0; e3 < 52; e3++) {
          const t3 = ne.charAt(e3);
          F(j, V, t3, t3), F(z, Q, t3, t3);
        }
        const oe = "\xC7\xD0\xDE\xE7\xFE\u2102\u210D\u2115\u2119\u211A\u211D\u2124\u210E\u210F\u210A\u210B\u210C\u2110\u2111\u2112\u2113\u2118\u211B\u211C\u212C\u2130\u2131\u2133\u212D\u2128";
        for (let e3 = 0; e3 < 30; e3++) {
          const t3 = oe.charAt(e3);
          F(j, V, t3, t3), F(z, Q, t3, t3);
        }
        let ae = "";
        for (let e3 = 0; e3 < 52; e3++) {
          ae = String.fromCharCode(55349, 56320 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56372 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56424 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56580 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56736 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56788 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56840 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56944 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 56632 + e3), F(j, V, ae, ae), F(z, Q, ae, ae);
          const t3 = ne.charAt(e3);
          ae = String.fromCharCode(55349, 56476 + e3), F(j, V, t3, ae), F(z, Q, t3, ae);
        }
        for (let e3 = 0; e3 < 10; e3++) ae = String.fromCharCode(55349, 57294 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 57314 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 57324 + e3), F(j, V, ae, ae), F(z, Q, ae, ae), ae = String.fromCharCode(55349, 57334 + e3), F(j, V, ae, ae), F(z, Q, ae, ae);
        const ie = function(e3, t3, r3) {
          return !P[t3][e3] || !P[t3][e3].replace || 55349 === e3.charCodeAt(0) || Object.prototype.hasOwnProperty.call(ee, e3) && r3 && (r3.fontFamily && "tt" === r3.fontFamily.slice(4, 6) || r3.font && "tt" === r3.font.slice(4, 6)) || (e3 = P[t3][e3].replace), new N(e3);
        }, se = (e3, t3) => {
          if (0 === e3.children.length || "mtext" !== e3.children[e3.children.length - 1].type) {
            const r3 = new k("mtext", [new N(t3.children[0].text)]);
            e3.children.push(r3);
          } else e3.children[e3.children.length - 1].children[0].text += t3.children[0].text;
        }, le = (e3) => {
          if ("mrow" !== e3.type && "mstyle" !== e3.type) return e3;
          if (0 === e3.children.length) return e3;
          const t3 = new k("mrow");
          for (let r3 = 0; r3 < e3.children.length; r3++) {
            const n3 = e3.children[r3];
            if ("mtext" === n3.type && 0 === Object.keys(n3.attributes).length) se(t3, n3);
            else if ("mrow" === n3.type) {
              let e4 = true;
              for (let t4 = 0; t4 < n3.children.length; t4++) {
                if ("mtext" !== n3.children[t4].type || 0 !== Object.keys(n3.attributes).length) {
                  e4 = false;
                  break;
                }
              }
              if (e4) for (let e5 = 0; e5 < n3.children.length; e5++) {
                const r4 = n3.children[e5];
                se(t3, r4);
              }
              else t3.children.push(n3);
            } else t3.children.push(n3);
          }
          for (let r3 = 0; r3 < t3.children.length; r3++) if ("mtext" === t3.children[r3].type) {
            const n3 = t3.children[r3];
            " " === n3.children[0].text.charAt(0) && (n3.children[0].text = "\xA0" + n3.children[0].text.slice(1));
            const o2 = n3.children[0].text.length;
            o2 > 0 && " " === n3.children[0].text.charAt(o2 - 1) && (n3.children[0].text = n3.children[0].text.slice(0, -1) + "\xA0");
            for (const [t4, r4] of Object.entries(e3.attributes)) n3.attributes[t4] = r4;
          }
          return 1 === t3.children.length && "mtext" === t3.children[0].type ? t3.children[0] : t3;
        }, ce = function(e3, t3 = false) {
          if (!(1 !== e3.length || e3[0] instanceof y)) return e3[0];
          if (!t3) {
            e3[0] instanceof k && "mo" === e3[0].type && !e3[0].attributes.fence && (e3[0].attributes.lspace = "0em", e3[0].attributes.rspace = "0em");
            const t4 = e3.length - 1;
            e3[t4] instanceof k && "mo" === e3[t4].type && !e3[t4].attributes.fence && (e3[t4].attributes.lspace = "0em", e3[t4].attributes.rspace = "0em");
          }
          return new k("mrow", e3);
        };
        function ue(e3) {
          if (!e3) return false;
          if ("mi" === e3.type && 1 === e3.children.length) {
            const t3 = e3.children[0];
            return t3 instanceof N && "." === t3.text;
          }
          if ("mtext" === e3.type && 1 === e3.children.length) {
            const t3 = e3.children[0];
            return t3 instanceof N && "\u2008" === t3.text;
          }
          if ("mo" === e3.type && 1 === e3.children.length && "true" === e3.getAttribute("separator") && "0em" === e3.getAttribute("lspace") && "0em" === e3.getAttribute("rspace")) {
            const t3 = e3.children[0];
            return t3 instanceof N && "," === t3.text;
          }
          return false;
        }
        const de = (e3, t3) => {
          const r3 = e3[t3], n3 = e3[t3 + 1];
          return "atom" === r3.type && "," === r3.text && r3.loc && n3.loc && r3.loc.end === n3.loc.start;
        }, he = (e3) => "atom" === e3.type && "rel" === e3.family || "mclass" === e3.type && "mrel" === e3.mclass, me = function(e3, t3, r3 = false) {
          if (!r3 && 1 === e3.length) {
            const r4 = fe(e3[0], t3);
            return r4 instanceof k && "mo" === r4.type && (r4.setAttribute("lspace", "0em"), r4.setAttribute("rspace", "0em")), [r4];
          }
          const n3 = [], o2 = [];
          let a2;
          for (let r4 = 0; r4 < e3.length; r4++) o2.push(fe(e3[r4], t3));
          for (let t4 = 0; t4 < o2.length; t4++) {
            const r4 = o2[t4];
            if (t4 < e3.length - 1 && he(e3[t4]) && he(e3[t4 + 1]) && r4.setAttribute("rspace", "0em"), t4 > 0 && he(e3[t4]) && he(e3[t4 - 1]) && r4.setAttribute("lspace", "0em"), "mn" === r4.type && a2 && "mn" === a2.type) a2.children.push(...r4.children);
            else if (ue(r4) && a2 && "mn" === a2.type) a2.children.push(...r4.children);
            else if (a2 && "mn" === a2.type && t4 < o2.length - 1 && "mn" === o2[t4 + 1].type && de(e3, t4)) a2.children.push(...r4.children);
            else {
              if ("mn" === r4.type && ue(a2)) r4.children = [...a2.children, ...r4.children], n3.pop();
              else if (("msup" === r4.type || "msub" === r4.type) && r4.children.length >= 1 && a2 && ("mn" === a2.type || ue(a2))) {
                const e4 = r4.children[0];
                e4 instanceof k && "mn" === e4.type && a2 && (e4.children = [...a2.children, ...e4.children], n3.pop());
              }
              n3.push(r4), a2 = r4;
            }
          }
          return n3;
        }, pe = function(e3, t3, r3 = false) {
          return ce(me(e3, t3, r3), r3);
        }, fe = function(e3, r3) {
          if (!e3) return new k("mrow");
          if (p[e3.type]) {
            return p[e3.type](e3, r3);
          }
          throw new t2("Got group of unknown type: '" + e3.type + "'");
        }, ge = (e3) => new k("mtd", [], [], { padding: "0", width: "50%" }), be = ["mrow", "mtd", "mtable", "mtr"], xe = (e3) => {
          for (const t3 of e3.children) if (t3.type && be.includes(t3.type)) {
            if (t3.classes && "tml-label" === t3.classes[0]) {
              return t3.label;
            }
            {
              const e4 = xe(t3);
              if (e4) return e4;
            }
          } else if (!t3.type) {
            const e4 = xe(t3);
            if (e4) return e4;
          }
        };
        function ye(e3, t3, r3, n3) {
          let o2 = null;
          1 === e3.length && "tag" === e3[0].type && (o2 = e3[0].tag, e3 = e3[0].body);
          const a2 = me(e3, r3);
          if (1 === a2.length && a2[0] instanceof _) return a2[0];
          const i2 = n3.displayMode || n3.annotate ? "none" : n3.wrap, s2 = 0 === a2.length ? null : a2[0];
          let l2 = 1 === a2.length && null === o2 && s2 instanceof k ? a2[0] : (function(e4, t4, r4) {
            const n4 = [];
            let o3 = [], a3 = [], i3 = 0, s3 = 0, l3 = 0;
            for (; s3 < e4.length; ) {
              for (; e4[s3] instanceof y; ) e4.splice(s3, 1, ...e4[s3].children);
              const r5 = e4[s3];
              if (r5.attributes && r5.attributes.linebreak && "newline" === r5.attributes.linebreak) {
                a3.length > 0 && o3.push(new k("mrow", a3)), o3.push(r5), a3 = [];
                const e5 = new k("mtd", o3);
                e5.style.textAlign = "left", n4.push(new k("mtr", [e5])), o3 = [], s3 += 1;
              } else {
                if (a3.push(r5), r5.type && "mo" === r5.type && 1 === r5.children.length && !Object.prototype.hasOwnProperty.call(r5.attributes, "movablelimits")) {
                  const n5 = r5.children[0].text;
                  if ("([{\u230A\u2308\u27E8\u27EE\u23B0\u27E6\u2983".indexOf(n5) > -1) l3 += 1;
                  else if (")]}\u230B\u2309\u27E9\u27EF\u23B1\u27E6\u2984".indexOf(n5) > -1) l3 -= 1;
                  else if (0 === l3 && "=" === t4 && "=" === n5) {
                    if (i3 += 1, i3 > 1) {
                      a3.pop();
                      const e5 = new k("mrow", a3);
                      o3.push(e5), a3 = [r5];
                    }
                  } else if (0 === l3 && "tex" === t4 && "\u2207" !== n5) {
                    const t5 = s3 < e4.length - 1 ? e4[s3 + 1] : null;
                    let r6 = true;
                    if (!t5 || "mtext" !== t5.type || !t5.attributes.linebreak || "nobreak" !== t5.attributes.linebreak) for (let t6 = s3 + 1; t6 < e4.length; t6++) {
                      const n6 = e4[t6];
                      if (!n6.type || "mspace" !== n6.type || n6.attributes.linebreak && "newline" === n6.attributes.linebreak) break;
                      a3.push(n6), s3 += 1, n6.attributes && n6.attributes.linebreak && "nobreak" === n6.attributes.linebreak && (r6 = false);
                    }
                    if (r6) {
                      const e5 = new k("mrow", a3);
                      o3.push(e5), a3 = [];
                    }
                  }
                }
                s3 += 1;
              }
            }
            if (a3.length > 0) {
              const e5 = new k("mrow", a3);
              o3.push(e5);
            }
            if (n4.length > 0) {
              const e5 = new k("mtd", o3);
              e5.style.textAlign = "left";
              const t5 = new k("mtr", [e5]);
              n4.push(t5);
              const a4 = new k("mtable", n4);
              return r4 || (a4.setAttribute("columnalign", "left"), a4.setAttribute("rowspacing", "0em")), a4;
            }
            return q(o3);
          })(a2, i2, n3.displayMode);
          if (o2 && (l2 = ((e4, t4, r4, n4) => {
            t4 = pe(t4[0].body, r4), (t4 = le(t4)).classes.push("tml-tag");
            const o3 = xe(e4);
            e4 = new k("mtd", [e4]);
            const a3 = [ge(), e4, ge()];
            a3[n4 ? 0 : 2].children.push(t4);
            const i3 = new k("mtr", a3, ["tml-tageqn"]);
            o3 && i3.setAttribute("id", o3);
            const s3 = new k("mtable", [i3]);
            return s3.style.width = "100%", s3.setAttribute("displaystyle", "true"), s3;
          })(l2, o2, r3, n3.leqno)), n3.annotate) {
            const e4 = new k("annotation", [new N(t3)]);
            e4.setAttribute("encoding", "application/x-tex"), l2 = new k("semantics", [l2, e4]);
          }
          const c2 = new k("math", [l2]);
          return n3.xml && c2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), n3.displayMode && (c2.setAttribute("display", "block"), c2.style.display = "block math", c2.classes = ["tml-display"]), c2;
        }
        const ve = (e3, t3) => {
          const r3 = e3.isStretchy ? $(e3) : new k("mo", [ie(e3.label, e3.mode)]);
          e3.isStretchy || r3.setAttribute("stretchy", "false"), "\\vec" !== e3.label && (r3.style.mathDepth = "0");
          const n3 = "\\c" === e3.label ? "munder" : "mover", o2 = Ae.has(e3.label);
          if ("mover" === n3 && "math" === e3.mode && !e3.isStretchy && e3.base.text && 1 === e3.base.text.length) {
            const t4 = e3.base.text, n4 = "\\vec" === e3.label, a2 = "\\vec" === n4 ? "-vec" : "";
            n4 && r3.classes.push("tml-vec");
            const i2 = n4 ? "-vec" : o2 ? "-acc" : "";
            "DHKLUcegorsuvxyz\u03A0\u03A5\u03A8\u03B1\u03B4\u03B7\u03B9\u03BC\u03BD\u03BF\u03C4\u03C5\u03C7\u03F5".indexOf(t4) > -1 ? (r3.classes.push(`chr-sml${a2}`), r3.classes.push(`wbk-sml${i2}`)) : "BCEGIMNOPQRSTXZlpqtw\u0393\u0398\u039E\u03A3\u03A6\u03A9\u03B2\u03B5\u03B6\u03B8\u03BE\u03C1\u03C2\u03C6\u03C8\u03D1\u03D5\u03F1".indexOf(t4) > -1 ? (r3.classes.push(`chr-med${a2}`), r3.classes.push(`wbk-med${i2}`)) : "AFJdf\u0394\u039B".indexOf(t4) > -1 ? (r3.classes.push(`chr-lrg${a2}`), r3.classes.push(`wbk-lrg${i2}`)) : n4 ? r3.classes.push("wbk-vec") : o2 && r3.classes.push("wbk-acc");
          } else o2 && r3.classes.push("wbk-acc");
          return new k(n3, [fe(e3.base, t3), r3]);
        }, we = /* @__PURE__ */ new Set(["\\acute", "\\check", "\\grave", "\\ddot", "\\dddot", "\\ddddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"]), Ae = /* @__PURE__ */ new Set(["\\acute", "\\bar", "\\breve", "\\check", "\\dot", "\\ddot", "\\grave", "\\hat", "\\mathring", "\\`", "\\'", "\\^", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"]), Ce = { "\\`": "\u0300", "\\'": "\u0301", "\\^": "\u0302", "\\~": "\u0303", "\\=": "\u0304", "\\u": "\u0306", "\\.": "\u0307", '\\"': "\u0308", "\\r": "\u030A", "\\H": "\u030B", "\\v": "\u030C", "\\c": "\u0327" };
        f({ type: "accent", names: ["\\acute", "\\grave", "\\ddot", "\\dddot", "\\ddddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\overparen", "\\widecheck", "\\widehat", "\\wideparen", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overleftharpoon", "\\overrightharpoon"], props: { numArgs: 1 }, handler: (e3, t3) => {
          const r3 = b(t3[0]), n3 = !we.has(e3.funcName);
          return { type: "accent", mode: e3.parser.mode, label: e3.funcName, isStretchy: n3, base: r3 };
        }, mathmlBuilder: ve }), f({ type: "accent", names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\c", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"], props: { numArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["primitive"] }, handler: (e3, t3) => {
          const r3 = b(t3[0]), n3 = e3.parser.mode;
          return "math" === n3 && e3.parser.settings.strict && console.log(`Temml parse error: Command ${e3.funcName} is invalid in math mode.`), "text" === n3 && r3.text && 1 === r3.text.length && e3.funcName in Ce && d.indexOf(r3.text) > -1 ? { type: "textord", mode: "text", text: r3.text + Ce[e3.funcName] } : "\\c" === e3.funcName && "text" === n3 && r3.text && 1 === r3.text.length ? { type: "textord", mode: "text", text: r3.text + "\u0327" } : { type: "accent", mode: n3, label: e3.funcName, isStretchy: false, base: r3 };
        }, mathmlBuilder: ve }), f({ type: "accentUnder", names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underparen", "\\utilde"], props: { numArgs: 1 }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = r3[0];
          return { type: "accentUnder", mode: e3.mode, label: t3, base: n3 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = $(e3);
          r3.style["math-depth"] = 0;
          return new k("munder", [fe(e3.base, t3), r3]);
        } });
        const Ee = { pt: 800 / 803, pc: 9600 / 803, dd: 1238 / 1157 * 800 / 803, cc: 12.792133216944668, nd: 685 / 642 * 800 / 803, nc: 1370 / 107 * 800 / 803, sp: 1 / 65536 * 800 / 803, mm: 25.4 / 72, cm: 2.54 / 72, in: 1 / 72, px: 96 / 72 }, Se = ["em", "ex", "mu", "pt", "mm", "cm", "in", "px", "bp", "pc", "dd", "cc", "nd", "nc", "sp"], _e = function(e3) {
          return "string" != typeof e3 && (e3 = e3.unit), Se.indexOf(e3) > -1;
        }, Te = (e3) => [1, 0.7, 0.5][Math.max(e3 - 1, 0)], qe = function(e3, r3) {
          let n3 = e3.number;
          if (r3.maxSize[0] < 0 && n3 > 0) return { number: 0, unit: "em" };
          const o2 = e3.unit;
          switch (o2) {
            case "mm":
            case "cm":
            case "in":
            case "px":
              return n3 * Ee[o2] > r3.maxSize[1] ? { number: r3.maxSize[1], unit: "pt" } : { number: n3, unit: o2 };
            case "em":
            case "ex":
              return "ex" === o2 && (n3 *= 0.431), n3 = Math.min(n3 / Te(r3.level), r3.maxSize[0]), { number: u(n3), unit: "em" };
            case "bp":
              return n3 > r3.maxSize[1] && (n3 = r3.maxSize[1]), { number: n3, unit: "pt" };
            case "pt":
            case "pc":
            case "dd":
            case "cc":
            case "nd":
            case "nc":
            case "sp":
              return n3 = Math.min(n3 * Ee[o2], r3.maxSize[1]), { number: u(n3), unit: "pt" };
            case "mu":
              return n3 = Math.min(n3 / 18, r3.maxSize[0]), { number: u(n3), unit: "em" };
            default:
              throw new t2("Invalid unit: '" + o2 + "'");
          }
        }, ke = (e3) => {
          const t3 = new k("mspace");
          return t3.setAttribute("width", e3 + "em"), t3;
        }, Ne = (e3, t3 = 0.3, r3 = 0, n3 = false) => {
          if (null == e3 && 0 === r3) return ke(t3);
          const o2 = e3 ? [e3] : [];
          if (0 !== t3 && o2.unshift(ke(t3)), r3 > 0 && o2.push(ke(r3)), n3) {
            const e4 = new k("mpadded", o2);
            return e4.setAttribute("height", "0.1px"), e4;
          }
          return new k("mrow", o2);
        }, Le = (e3, t3) => Number(e3) / Te(t3), Oe = (e3, t3, r3, n3) => {
          const o2 = D(e3), a2 = "eq" === e3.slice(1, 3), i2 = "x" === e3.charAt(1) ? "1.75" : "cd" === e3.slice(2, 4) ? "3.0" : a2 ? "1.0" : "2.0";
          o2.setAttribute("lspace", "0"), o2.setAttribute("rspace", a2 ? "0.5em" : "0");
          const s2 = n3.withLevel(n3.level < 2 ? 2 : 3), l2 = Le(i2, s2.level), c2 = Le(i2, 3), u2 = Ne(null, l2.toFixed(4), 0), d2 = Ne(null, c2.toFixed(4), 0), h2 = Le(a2 ? 0 : 0.3, s2.level).toFixed(4);
          let m2, p2;
          const f2 = t3 && t3.body && (t3.body.body || t3.body.length > 0);
          if (f2) {
            let r4 = fe(t3, s2);
            r4 = Ne(r4, h2, h2, "\\\\cdrightarrow" === e3 || "\\\\cdleftarrow" === e3), m2 = new k("mover", [r4, d2]);
          }
          const g2 = r3 && r3.body && (r3.body.body || r3.body.length > 0);
          if (g2) {
            let e4 = fe(r3, s2);
            e4 = Ne(e4, h2, h2), p2 = new k("munder", [e4, d2]);
          }
          let b2;
          return b2 = f2 || g2 ? f2 && g2 ? new k("munderover", [o2, p2, m2]) : f2 ? new k("mover", [o2, m2]) : new k("munder", [o2, p2]) : new k("mover", [o2, u2]), "3.0" === i2 && (b2.style.height = "1em"), b2.setAttribute("accent", "false"), b2;
        };
        f({ type: "xArrow", names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xleftrightharpoons", "\\xrightleftharpoons", "\\yields", "\\yieldsLeft", "\\mesomerism", "\\longrightharpoonup", "\\longleftharpoondown", "\\yieldsLeftRight", "\\chemequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"], props: { numArgs: 1, numOptionalArgs: 1 }, handler: ({ parser: e3, funcName: t3 }, r3, n3) => ({ type: "xArrow", mode: e3.mode, name: t3, body: r3[0], below: n3[0] }), mathmlBuilder(e3, t3) {
          const r3 = [Oe(e3.name, e3.body, e3.below, t3)];
          return r3.unshift(ke(0.2778)), r3.push(ke(0.2778)), new k("mrow", r3);
        } });
        const Me = { "\\equilibriumRight": ["\\longrightharpoonup", "\\eqleftharpoondown"], "\\equilibriumLeft": ["\\eqrightharpoonup", "\\longleftharpoondown"] };
        f({ type: "stackedArrow", names: ["\\equilibriumRight", "\\equilibriumLeft"], props: { numArgs: 1, numOptionalArgs: 1 }, handler({ parser: e3, funcName: t3 }, r3, n3) {
          const o2 = r3[0] ? { type: "hphantom", mode: e3.mode, body: r3[0] } : null, a2 = n3[0] ? { type: "hphantom", mode: e3.mode, body: n3[0] } : null;
          return { type: "stackedArrow", mode: e3.mode, name: t3, body: r3[0], upperArrowBelow: a2, lowerArrowBody: o2, below: n3[0] };
        }, mathmlBuilder(e3, t3) {
          const r3 = Me[e3.name][0], n3 = Me[e3.name][1], o2 = Oe(r3, e3.body, e3.upperArrowBelow, t3), a2 = Oe(n3, e3.lowerArrowBody, e3.below, t3);
          let i2;
          const s2 = new k("mpadded", [o2]);
          if (s2.setAttribute("voffset", "0.3em"), s2.setAttribute("height", "+0.3em"), s2.setAttribute("depth", "-0.3em"), "\\equilibriumLeft" === e3.name) {
            const e4 = new k("mpadded", [a2]);
            e4.setAttribute("width", "0.5em"), i2 = new k("mpadded", [ke(0.2778), e4, s2, ke(0.2778)]);
          } else s2.setAttribute("width", "\\equilibriumRight" === e3.name ? "0.5em" : "0"), i2 = new k("mpadded", [ke(0.2778), s2, a2, ke(0.2778)]);
          return i2.setAttribute("voffset", "-0.18em"), i2.setAttribute("height", "-0.18em"), i2.setAttribute("depth", "+0.18em"), i2;
        } });
        const De = {};
        function Be({ type: e3, names: t3, props: r3, handler: n3, mathmlBuilder: o2 }) {
          const a2 = { type: e3, numArgs: r3.numArgs || 0, allowedInText: false, numOptionalArgs: 0, handler: n3 };
          for (let e4 = 0; e4 < t3.length; ++e4) De[t3[e4]] = a2;
          o2 && (p[e3] = o2);
        }
        function $e(e3, t3) {
          if (!e3 || e3.type !== t3) throw new Error(`Expected node of type ${t3}, but got ` + (e3 ? `node of type ${e3.type}` : String(e3)));
          return e3;
        }
        function Ie(e3) {
          const t3 = Re(e3);
          if (!t3) throw new Error("Expected node of symbol group type, but got " + (e3 ? `node of type ${e3.type}` : String(e3)));
          return t3;
        }
        function Re(e3) {
          return e3 && ("atom" === e3.type || Object.prototype.hasOwnProperty.call(R, e3.type)) ? e3 : null;
        }
        const Pe = { ">": "\\\\cdrightarrow", "<": "\\\\cdleftarrow", "=": "\\\\cdlongequal", A: "\\uparrow", V: "\\downarrow", "|": "\\Vert", ".": "no arrow" }, Fe = (e3) => "textord" === e3.type && "@" === e3.text;
        function je(e3, t3, r3) {
          const n3 = Pe[e3];
          switch (n3) {
            case "\\\\cdrightarrow":
            case "\\\\cdleftarrow":
              return r3.callFunction(n3, [t3[0]], [t3[1]]);
            case "\\uparrow":
            case "\\downarrow": {
              const e4 = { type: "atom", text: n3, mode: "math", family: "rel" }, o2 = { type: "ordgroup", mode: "math", body: [r3.callFunction("\\\\cdleft", [t3[0]], []), r3.callFunction("\\Big", [e4], []), r3.callFunction("\\\\cdright", [t3[1]], [])], semisimple: true };
              return r3.callFunction("\\\\cdparent", [o2], []);
            }
            case "\\\\cdlongequal":
              return r3.callFunction("\\\\cdlongequal", [], []);
            case "\\Vert": {
              const e4 = { type: "textord", text: "\\Vert", mode: "math" };
              return r3.callFunction("\\Big", [e4], []);
            }
            default:
              return { type: "textord", text: " ", mode: "math" };
          }
        }
        f({ type: "cdlabel", names: ["\\\\cdleft", "\\\\cdright"], props: { numArgs: 1 }, handler: ({ parser: e3, funcName: t3 }, r3) => ({ type: "cdlabel", mode: e3.mode, side: t3.slice(4), label: r3[0] }), mathmlBuilder(e3, t3) {
          if (0 === e3.label.body.length) return new k("mrow", t3);
          const r3 = fe(e3.label, t3);
          "left" === e3.side && r3.classes.push("tml-shift-left");
          const n3 = new k("mtd", [r3]);
          n3.style.padding = "0";
          const o2 = new k("mtr", [n3]), a2 = new k("mtable", [o2]), i2 = new k("mpadded", [a2]);
          return i2.setAttribute("width", "0.1px"), i2.setAttribute("displaystyle", "false"), i2.setAttribute("scriptlevel", "1"), i2;
        } }), f({ type: "cdlabelparent", names: ["\\\\cdparent"], props: { numArgs: 1 }, handler: ({ parser: e3 }, t3) => ({ type: "cdlabelparent", mode: e3.mode, fragment: t3[0] }), mathmlBuilder: (e3, t3) => new k("mrow", [fe(e3.fragment, t3)]) });
        const ze = (e3) => ({ type: "ordgroup", mode: "math", body: e3, semisimple: true }), He = (e3, t3) => ({ type: t3, mode: "math", body: ze(e3) });
        class Ue {
          constructor(e3, t3, r3) {
            this.lexer = e3, this.start = t3, this.end = r3;
          }
          static range(e3, t3) {
            return t3 ? e3 && e3.loc && t3.loc && e3.loc.lexer === t3.loc.lexer ? new Ue(e3.loc.lexer, e3.loc.start, t3.loc.end) : null : e3 && e3.loc;
          }
        }
        class Ge {
          constructor(e3, t3) {
            this.text = e3, this.loc = t3;
          }
          range(e3, t3) {
            return new Ge(t3, Ue.range(this, e3));
          }
        }
        const We = 0, Ve = 1, Xe = 2, Je = 3, Ze = {};
        function Ye(e3, t3) {
          Ze[e3] = t3;
        }
        const Ke = Ze;
        Ye("\\noexpand", (function(e3) {
          const t3 = e3.popToken();
          return e3.isExpandable(t3.text) && (t3.noexpand = true, t3.treatAsRelax = true), { tokens: [t3], numArgs: 0 };
        })), Ye("\\expandafter", (function(e3) {
          const t3 = e3.popToken();
          return e3.expandOnce(true), { tokens: [t3], numArgs: 0 };
        })), Ye("\\@firstoftwo", (function(e3) {
          return { tokens: e3.consumeArgs(2)[0], numArgs: 0 };
        })), Ye("\\@secondoftwo", (function(e3) {
          return { tokens: e3.consumeArgs(2)[1], numArgs: 0 };
        })), Ye("\\@ifnextchar", (function(e3) {
          const t3 = e3.consumeArgs(3);
          e3.consumeSpaces();
          const r3 = e3.future();
          return 1 === t3[0].length && t3[0][0].text === r3.text ? { tokens: t3[1], numArgs: 0 } : { tokens: t3[2], numArgs: 0 };
        })), Ye("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"), Ye("\\TextOrMath", (function(e3) {
          const t3 = e3.consumeArgs(2);
          return "text" === e3.mode ? { tokens: t3[0], numArgs: 0 } : { tokens: t3[1], numArgs: 0 };
        }));
        const Qe = (e3) => {
          let t3 = "";
          for (let r3 = e3.length - 1; r3 > -1; r3--) t3 += e3[r3].text;
          return t3;
        }, et = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 }, tt = (e3) => {
          const t3 = e3.future().text;
          return "EOF" === t3 ? [null, ""] : [et[t3.charAt(0)], t3];
        }, rt = (e3, t3, r3) => {
          for (let n3 = 1; n3 < t3.length; n3++) {
            e3 *= r3, e3 += et[t3.charAt(n3)];
          }
          return e3;
        };
        function nt(e3) {
          const t3 = e3.consumeArgs(1)[0];
          let r3 = "", n3 = t3[t3.length - 1].loc.start;
          for (let e4 = t3.length - 1; e4 >= 0; e4--) {
            const o2 = t3[e4].loc.start;
            o2 > n3 && (r3 += " ", n3 = o2), r3 += t3[e4].text, n3 += t3[e4].text.length;
          }
          return r3;
        }
        Ye("\\char", (function(e3) {
          let r3, n3 = e3.popToken(), o2 = "";
          if ("'" === n3.text) r3 = 8, n3 = e3.popToken();
          else if ('"' === n3.text) r3 = 16, n3 = e3.popToken();
          else if ("`" === n3.text) if (n3 = e3.popToken(), "\\" === n3.text[0]) o2 = n3.text.charCodeAt(1);
          else {
            if ("EOF" === n3.text) throw new t2("\\char` missing argument");
            o2 = n3.text.charCodeAt(0);
          }
          else r3 = 10;
          if (r3) {
            let a2, i2 = n3.text;
            if (o2 = et[i2.charAt(0)], null == o2 || o2 >= r3) throw new t2(`Invalid base-${r3} digit ${n3.text}`);
            for (o2 = rt(o2, i2, r3), [a2, i2] = tt(e3); null != a2 && a2 < r3; ) o2 *= r3, o2 += a2, o2 = rt(o2, i2, r3), e3.popToken(), [a2, i2] = tt(e3);
          }
          return `\\@char{${o2}}`;
        })), Ye("\\surd", "\\sqrt{\\vphantom{|}}"), Ye("\u2295", "\\oplus"), Ye("\\long", ""), Ye("\\bgroup", "{"), Ye("\\egroup", "}"), Ye("~", "\\nobreakspace"), Ye("\\lq", "`"), Ye("\\rq", "'"), Ye("\\aa", "\\r a"), Ye("\\Bbbk", "\\Bbb{k}"), Ye("\\mathstrut", "\\vphantom{(}"), Ye("\\underbar", "\\underline{\\text{#1}}"), Ye("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}"), Ye("\u22EE", "\\vdots"), Ye("\\arraystretch", "1"), Ye("\\arraycolsep", "6pt"), Ye("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"), Ye("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;"), Ye("\\implies", "\\DOTSB\\;\\Longrightarrow\\;"), Ye("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
        const ot = { ",": "\\dotsc", "\\not": "\\dotsb", "+": "\\dotsb", "=": "\\dotsb", "<": "\\dotsb", ">": "\\dotsb", "-": "\\dotsb", "*": "\\dotsb", ":": "\\dotsb", "\\DOTSB": "\\dotsb", "\\coprod": "\\dotsb", "\\bigvee": "\\dotsb", "\\bigwedge": "\\dotsb", "\\biguplus": "\\dotsb", "\\bigcap": "\\dotsb", "\\bigcup": "\\dotsb", "\\prod": "\\dotsb", "\\sum": "\\dotsb", "\\bigotimes": "\\dotsb", "\\bigoplus": "\\dotsb", "\\bigodot": "\\dotsb", "\\bigsqcap": "\\dotsb", "\\bigsqcup": "\\dotsb", "\\bigtimes": "\\dotsb", "\\And": "\\dotsb", "\\longrightarrow": "\\dotsb", "\\Longrightarrow": "\\dotsb", "\\longleftarrow": "\\dotsb", "\\Longleftarrow": "\\dotsb", "\\longleftrightarrow": "\\dotsb", "\\Longleftrightarrow": "\\dotsb", "\\mapsto": "\\dotsb", "\\longmapsto": "\\dotsb", "\\hookrightarrow": "\\dotsb", "\\doteq": "\\dotsb", "\\mathbin": "\\dotsb", "\\mathrel": "\\dotsb", "\\relbar": "\\dotsb", "\\Relbar": "\\dotsb", "\\xrightarrow": "\\dotsb", "\\xleftarrow": "\\dotsb", "\\DOTSI": "\\dotsi", "\\int": "\\dotsi", "\\oint": "\\dotsi", "\\iint": "\\dotsi", "\\iiint": "\\dotsi", "\\iiiint": "\\dotsi", "\\DOTSX": "\\dotsx" };
        Ye("\\dots", (function(e3) {
          let t3 = "\\dotso";
          const r3 = e3.expandAfterFuture().text;
          return r3 in ot ? t3 = ot[r3] : ("\\not" === r3.slice(0, 4) || r3 in P.math && ["bin", "rel"].includes(P.math[r3].group)) && (t3 = "\\dotsb"), t3;
        }));
        const at = { ")": true, "]": true, "\\rbrack": true, "\\}": true, "\\rbrace": true, "\\rangle": true, "\\rceil": true, "\\rfloor": true, "\\rgroup": true, "\\rmoustache": true, "\\right": true, "\\bigr": true, "\\biggr": true, "\\Bigr": true, "\\Biggr": true, $: true, ";": true, ".": true, ",": true };
        Ye("\\dotso", (function(e3) {
          return e3.future().text in at ? "\\ldots\\," : "\\ldots";
        })), Ye("\\dotsc", (function(e3) {
          const t3 = e3.future().text;
          return t3 in at && "," !== t3 ? "\\ldots\\," : "\\ldots";
        })), Ye("\\cdots", (function(e3) {
          return e3.future().text in at ? "\\@cdots\\," : "\\@cdots";
        })), Ye("\\dotsb", "\\cdots"), Ye("\\dotsm", "\\cdots"), Ye("\\dotsi", "\\!\\cdots"), Ye("\\idotsint", "\\int\\!\\cdots\\!\\int"), Ye("\\dotsx", "\\ldots\\,"), Ye("\\DOTSI", "\\relax"), Ye("\\DOTSB", "\\relax"), Ye("\\DOTSX", "\\relax"), Ye("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"), Ye("\\,", "{\\tmspace+{3mu}{.1667em}}"), Ye("\\thinspace", "\\,"), Ye("\\>", "\\mskip{4mu}"), Ye("\\:", "{\\tmspace+{4mu}{.2222em}}"), Ye("\\medspace", "\\:"), Ye("\\;", "{\\tmspace+{5mu}{.2777em}}"), Ye("\\thickspace", "\\;"), Ye("\\!", "{\\tmspace-{3mu}{.1667em}}"), Ye("\\negthinspace", "\\!"), Ye("\\negmedspace", "{\\tmspace-{4mu}{.2222em}}"), Ye("\\negthickspace", "{\\tmspace-{5mu}{.277em}}"), Ye("\\enspace", "\\kern.5em "), Ye("\\enskip", "\\hskip.5em\\relax"), Ye("\\quad", "\\hskip1em\\relax"), Ye("\\qquad", "\\hskip2em\\relax"), Ye("\\AA", "\\TextOrMath{\\Angstrom}{\\mathring{A}}\\relax"), Ye("\\tag", "\\@ifstar\\tag@literal\\tag@paren"), Ye("\\tag@paren", "\\tag@literal{({#1})}"), Ye("\\tag@literal", ((e3) => {
          if (e3.macros.get("\\df@tag")) throw new t2("Multiple \\tag");
          return "\\gdef\\df@tag{\\text{#1}}";
        })), Ye("\\notag", "\\nonumber"), Ye("\\nonumber", "\\gdef\\@eqnsw{0}"), Ye("\\bmod", "\\mathbin{\\text{mod}}"), Ye("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"), Ye("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}"), Ye("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"), Ye("\\newline", "\\\\\\relax"), Ye("\\TeX", "\\textrm{T}\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125em\\textrm{X}"), Ye("\\LaTeX", "\\textrm{L}\\kern-.35em\\raisebox{0.2em}{\\scriptstyle A}\\kern-.15em\\TeX"), Ye("\\Temml", "\\textrm{T}\\kern-0.2em\\lower{0.2em}{\\textrm{E}}\\kern-0.08em{\\textrm{M}\\kern-0.08em\\raise{0.2em}\\textrm{M}\\kern-0.08em\\textrm{L}}"), Ye("\\hspace", "\\@ifstar\\@hspacer\\@hspace"), Ye("\\@hspace", "\\hskip #1\\relax"), Ye("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"), Ye("\\colon", '\\mathpunct{\\char"3a}'), Ye("\\prescript", "\\pres@cript{_{#1}^{#2}}{}{#3}"), Ye("\\ordinarycolon", '\\char"3a'), Ye("\\vcentcolon", "\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}}"), Ye("\\coloneq", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2212}'), Ye("\\Coloneq", '\\mathrel{\\char"2237\\char"2212}'), Ye("\\Eqqcolon", '\\mathrel{\\char"3d\\char"2237}'), Ye("\\Eqcolon", '\\mathrel{\\char"2212\\char"2237}'), Ye("\\colonapprox", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2248}'), Ye("\\Colonapprox", '\\mathrel{\\char"2237\\char"2248}'), Ye("\\colonsim", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}'), Ye("\\Colonsim", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}'), Ye("\\ratio", "\\vcentcolon"), Ye("\\coloncolon", "\\dblcolon"), Ye("\\colonequals", "\\coloneqq"), Ye("\\coloncolonequals", "\\Coloneqq"), Ye("\\equalscolon", "\\eqqcolon"), Ye("\\equalscoloncolon", "\\Eqqcolon"), Ye("\\colonminus", "\\coloneq"), Ye("\\coloncolonminus", "\\Coloneq"), Ye("\\minuscolon", "\\eqcolon"), Ye("\\minuscoloncolon", "\\Eqcolon"), Ye("\\coloncolonapprox", "\\Colonapprox"), Ye("\\coloncolonsim", "\\Colonsim"), Ye("\\notni", "\\mathrel{\\char`\u220C}"), Ye("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}"), Ye("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"), Ye("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}"), Ye("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}"), Ye("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{\\text{lim}}}"), Ye("\\varliminf", "\\DOTSB\\operatorname*{\\underline{\\text{lim}}}"), Ye("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{\\text{lim}}}"), Ye("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{\\text{lim}}}"), Ye("\\centerdot", "{\\medspace\\rule{0.167em}{0.189em}\\medspace}"), Ye("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}"), Ye("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}"), Ye("\\plim", "\\DOTSB\\operatorname*{plim}"), Ye("\\leftmodels", "\\mathop{\\reflectbox{$\\models$}}"), Ye("\\bra", "\\mathinner{\\langle{#1}|}"), Ye("\\ket", "\\mathinner{|{#1}\\rangle}"), Ye("\\braket", "\\mathinner{\\langle{#1}\\rangle}"), Ye("\\Bra", "\\left\\langle#1\\right|"), Ye("\\Ket", "\\left|#1\\right\\rangle");
        const it = (e3, t3) => {
          const r3 = `}\\,\\middle${"|" === t3[0] ? "\\vert" : "\\Vert"}\\,{`;
          return e3.slice(0, t3.index) + r3 + e3.slice(t3.index + t3[0].length);
        };
        Ye("\\Braket", (function(e3) {
          let t3 = nt(e3);
          const r3 = /\|\||\||\\\|/g;
          let n3;
          for (; null !== (n3 = r3.exec(t3)); ) t3 = it(t3, n3);
          return "\\left\\langle{" + t3 + "}\\right\\rangle";
        })), Ye("\\Set", (function(e3) {
          let t3 = nt(e3);
          const r3 = /\|\||\||\\\|/.exec(t3);
          return r3 && (t3 = it(t3, r3)), "\\left\\{\\:{" + t3 + "}\\:\\right\\}";
        })), Ye("\\set", (function(e3) {
          return "\\{{" + nt(e3).replace(/\|/, "}\\mid{") + "}\\}";
        })), Ye("\\angln", "{\\angl n}"), Ye("\\odv", "\\@ifstar\\odv@next\\odv@numerator"), Ye("\\odv@numerator", "\\frac{\\mathrm{d}#1}{\\mathrm{d}#2}"), Ye("\\odv@next", "\\frac{\\mathrm{d}}{\\mathrm{d}#2}#1"), Ye("\\pdv", "\\@ifstar\\pdv@next\\pdv@numerator");
        const st = (e3) => {
          const t3 = e3[0][0].text, r3 = Qe(e3[1]).split(","), n3 = String(r3.length), o2 = "1" === n3 ? "\\partial" : `\\partial^${n3}`;
          let a2 = "";
          return r3.map(((e4) => {
            a2 += "\\partial " + e4.trim() + "\\,";
          })), [t3, o2, a2.replace(/\\,$/, "")];
        };
        Ye("\\pdv@numerator", (function(e3) {
          const [t3, r3, n3] = st(e3.consumeArgs(2));
          return `\\frac{${r3} ${t3}}{${n3}}`;
        })), Ye("\\pdv@next", (function(e3) {
          const [t3, r3, n3] = st(e3.consumeArgs(2));
          return `\\frac{${r3}}{${n3}} ${t3}`;
        })), Ye("\\upalpha", "\\up@greek{\\alpha}"), Ye("\\upbeta", "\\up@greek{\\beta}"), Ye("\\upgamma", "\\up@greek{\\gamma}"), Ye("\\updelta", "\\up@greek{\\delta}"), Ye("\\upepsilon", "\\up@greek{\\epsilon}"), Ye("\\upzeta", "\\up@greek{\\zeta}"), Ye("\\upeta", "\\up@greek{\\eta}"), Ye("\\uptheta", "\\up@greek{\\theta}"), Ye("\\upiota", "\\up@greek{\\iota}"), Ye("\\upkappa", "\\up@greek{\\kappa}"), Ye("\\uplambda", "\\up@greek{\\lambda}"), Ye("\\upmu", "\\up@greek{\\mu}"), Ye("\\upnu", "\\up@greek{\\nu}"), Ye("\\upxi", "\\up@greek{\\xi}"), Ye("\\upomicron", "\\up@greek{\\omicron}"), Ye("\\uppi", "\\up@greek{\\pi}"), Ye("\\upalpha", "\\up@greek{\\alpha}"), Ye("\\uprho", "\\up@greek{\\rho}"), Ye("\\upsigma", "\\up@greek{\\sigma}"), Ye("\\uptau", "\\up@greek{\\tau}"), Ye("\\upupsilon", "\\up@greek{\\upsilon}"), Ye("\\upphi", "\\up@greek{\\phi}"), Ye("\\upchi", "\\up@greek{\\chi}"), Ye("\\uppsi", "\\up@greek{\\psi}"), Ye("\\upomega", "\\up@greek{\\omega}"), Ye("\\invamp", '\\mathbin{\\char"214b}'), Ye("\\parr", '\\mathbin{\\char"214b}'), Ye("\\with", '\\mathbin{\\char"26}'), Ye("\\multimapinv", '\\mathrel{\\char"27dc}'), Ye("\\multimapboth", '\\mathrel{\\char"29df}'), Ye("\\scoh", '{\\mkern5mu\\char"2322\\mkern5mu}'), Ye("\\sincoh", '{\\mkern5mu\\char"2323\\mkern5mu}'), Ye("\\coh", '{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2322}}}\n{\\smash{\\lower4mu{\\char"2323}}}\\mkern5mu}'), Ye("\\incoh", '{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2323}}}\n{\\smash{\\lower4mu{\\char"2322}}}\\mkern5mu}'), Ye("\\standardstate", "\\text{\\tiny\\char`\u29B5}"), Ye("\\ce", (function(e3) {
          return lt(e3.consumeArgs(1)[0], "ce");
        })), Ye("\\pu", (function(e3) {
          return lt(e3.consumeArgs(1)[0], "pu");
        })), Ye("\\uniDash", "{\\rule{0.672em}{0.06em}}"), Ye("\\triDash", "{\\rule{0.15em}{0.06em}\\kern2mu\\rule{0.15em}{0.06em}\\kern2mu\\rule{0.15em}{0.06em}}"), Ye("\\tripleDash", "\\kern0.075em\\raise0.25em{\\triDash}\\kern0.075em"), Ye("\\tripleDashOverLine", "\\kern0.075em\\mathrlap{\\raise0.125em{\\uniDash}}\\raise0.34em{\\triDash}\\kern0.075em"), Ye("\\tripleDashOverDoubleLine", "\\kern0.075em\\mathrlap{\\mathrlap{\\raise0.48em{\\triDash}}\\raise0.27em{\\uniDash}}{\\raise0.05em{\\uniDash}}\\kern0.075em"), Ye("\\tripleDashBetweenDoubleLine", "\\kern0.075em\\mathrlap{\\mathrlap{\\raise0.48em{\\uniDash}}\\raise0.27em{\\triDash}}{\\raise0.05em{\\uniDash}}\\kern0.075em");
        var lt = function(e3, t3) {
          for (var r3 = "", n3 = e3.length && e3[e3.length - 1].loc.start, o2 = e3.length - 1; o2 >= 0; o2--) e3[o2].loc.start > n3 && (r3 += " ", n3 = e3[o2].loc.start), r3 += e3[o2].text, n3 += e3[o2].text.length;
          return ut.go(ct.go(r3, t3));
        }, ct = { go: function(e3, t3) {
          if (!e3) return [];
          void 0 === t3 && (t3 = "ce");
          var r3, n3 = "0", o2 = {};
          o2.parenthesisLevel = 0, e3 = (e3 = (e3 = e3.replace(/\n/g, " ")).replace(/[\u2212\u2013\u2014\u2010]/g, "-")).replace(/[\u2026]/g, "...");
          for (var a2 = 10, i2 = []; ; ) {
            r3 !== e3 ? (a2 = 10, r3 = e3) : a2--;
            var s2 = ct.stateMachines[t3], l2 = s2.transitions[n3] || s2.transitions["*"];
            e: for (var c2 = 0; c2 < l2.length; c2++) {
              var u2 = ct.patterns.match_(l2[c2].pattern, e3);
              if (u2) {
                for (var d2 = l2[c2].task, h2 = 0; h2 < d2.action_.length; h2++) {
                  var m2;
                  if (s2.actions[d2.action_[h2].type_]) m2 = s2.actions[d2.action_[h2].type_](o2, u2.match_, d2.action_[h2].option);
                  else {
                    if (!ct.actions[d2.action_[h2].type_]) throw ["MhchemBugA", "mhchem bug A. Please report. (" + d2.action_[h2].type_ + ")"];
                    m2 = ct.actions[d2.action_[h2].type_](o2, u2.match_, d2.action_[h2].option);
                  }
                  ct.concatArray(i2, m2);
                }
                if (n3 = d2.nextState || n3, !(e3.length > 0)) return i2;
                if (d2.revisit || (e3 = u2.remainder), !d2.toContinue) break e;
              }
            }
            if (a2 <= 0) throw ["MhchemBugU", "mhchem bug U. Please report."];
          }
        }, concatArray: function(e3, t3) {
          if (t3) if (Array.isArray(t3)) for (var r3 = 0; r3 < t3.length; r3++) e3.push(t3[r3]);
          else e3.push(t3);
        }, patterns: { patterns: { empty: /^$/, else: /^./, else2: /^./, space: /^\s/, "space A": /^\s(?=[A-Z\\$])/, space$: /^\s$/, "a-z": /^[a-z]/, x: /^x/, x$: /^x$/, i$: /^i$/, letters: /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/, "\\greek": /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/, "one lowercase latin letter $": /^(?:([a-z])(?:$|[^a-zA-Z]))$/, "$one lowercase latin letter$ $": /^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/, "one lowercase greek letter $": /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/, digits: /^[0-9]+/, "-9.,9": /^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/, "-9.,9 no missing 0": /^[+\-]?[0-9]+(?:[.,][0-9]+)?/, "(-)(9.,9)(e)(99)": function(e3) {
          var t3 = e3.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:([eE]|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/);
          return t3 && t3[0] ? { match_: t3.splice(1), remainder: e3.substr(t3[0].length) } : null;
        }, "(-)(9)^(-9)": function(e3) {
          var t3 = e3.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/);
          return t3 && t3[0] ? { match_: t3.splice(1), remainder: e3.substr(t3[0].length) } : null;
        }, "state of aggregation $": function(e3) {
          var t3 = ct.patterns.findObserveGroups(e3, "", /^\([a-z]{1,3}(?=[\),])/, ")", "");
          if (t3 && t3.remainder.match(/^($|[\s,;\)\]\}])/)) return t3;
          var r3 = e3.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);
          return r3 ? { match_: r3[0], remainder: e3.substr(r3[0].length) } : null;
        }, "_{(state of aggregation)}$": /^_\{(\([a-z]{1,3}\))\}/, "{[(": /^(?:\\\{|\[|\()/, ")]}": /^(?:\)|\]|\\\})/, ", ": /^[,;]\s*/, ",": /^[,;]/, ".": /^[.]/, ". ": /^([.\u22C5\u00B7\u2022])\s*/, "...": /^\.\.\.(?=$|[^.])/, "* ": /^([*])\s*/, "^{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "^{", "", "", "}");
        }, "^($...$)": function(e3) {
          return ct.patterns.findObserveGroups(e3, "^", "$", "$", "");
        }, "^a": /^\^([0-9]+|[^\\_])/, "^\\x{}{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "^", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
        }, "^\\x{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "^", /^\\[a-zA-Z]+\{/, "}", "");
        }, "^\\x": /^\^(\\[a-zA-Z]+)\s*/, "^(-1)": /^\^(-?\d+)/, "'": /^'/, "_{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "_{", "", "", "}");
        }, "_($...$)": function(e3) {
          return ct.patterns.findObserveGroups(e3, "_", "$", "$", "");
        }, _9: /^_([+\-]?[0-9]+|[^\\])/, "_\\x{}{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "_", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
        }, "_\\x{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "_", /^\\[a-zA-Z]+\{/, "}", "");
        }, "_\\x": /^_(\\[a-zA-Z]+)\s*/, "^_": /^(?:\^(?=_)|\_(?=\^)|[\^_]$)/, "{}": /^\{\}/, "{...}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "", "{", "}", "");
        }, "{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "{", "", "", "}");
        }, "$...$": function(e3) {
          return ct.patterns.findObserveGroups(e3, "", "$", "$", "");
        }, "${(...)}$": function(e3) {
          return ct.patterns.findObserveGroups(e3, "${", "", "", "}$");
        }, "$(...)$": function(e3) {
          return ct.patterns.findObserveGroups(e3, "$", "", "", "$");
        }, "=<>": /^[=<>]/, "#": /^[#\u2261]/, "+": /^\+/, "-$": /^-(?=[\s_},;\]/]|$|\([a-z]+\))/, "-9": /^-(?=[0-9])/, "- orbital overlap": /^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/, "-": /^-/, "pm-operator": /^(?:\\pm|\$\\pm\$|\+-|\+\/-)/, operator: /^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/, arrowUpDown: /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/, "\\bond{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\bond{", "", "", "}");
        }, "->": /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/, CMT: /^[CMT](?=\[)/, "[(...)]": function(e3) {
          return ct.patterns.findObserveGroups(e3, "[", "", "", "]");
        }, "1st-level escape": /^(&|\\\\|\\hline)\s*/, "\\,": /^(?:\\[,\ ;:])/, "\\x{}{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
        }, "\\x{}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "", /^\\[a-zA-Z]+\{/, "}", "");
        }, "\\ca": /^\\ca(?:\s+|(?![a-zA-Z]))/, "\\x": /^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/, orbital: /^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/, others: /^[\/~|]/, "\\frac{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\frac{", "", "", "}", "{", "", "", "}");
        }, "\\overset{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\overset{", "", "", "}", "{", "", "", "}");
        }, "\\underset{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\underset{", "", "", "}", "{", "", "", "}");
        }, "\\underbrace{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\underbrace{", "", "", "}_", "{", "", "", "}");
        }, "\\color{(...)}0": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\color{", "", "", "}");
        }, "\\color{(...)}{(...)}1": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\color{", "", "", "}", "{", "", "", "}");
        }, "\\color(...){(...)}2": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\color", "\\", "", /^(?=\{)/, "{", "", "", "}");
        }, "\\ce{(...)}": function(e3) {
          return ct.patterns.findObserveGroups(e3, "\\ce{", "", "", "}");
        }, oxidation$: /^(?:[+-][IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/, "d-oxidation$": /^(?:[+-]?\s?[IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/, "roman numeral": /^[IVX]+/, "1/2$": /^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/, amount: function(e3) {
          var t3;
          if (t3 = e3.match(/^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/)) return { match_: t3[0], remainder: e3.substr(t3[0].length) };
          var r3 = ct.patterns.findObserveGroups(e3, "", "$", "$", "");
          return r3 && (t3 = r3.match_.match(/^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/)) ? { match_: t3[0], remainder: e3.substr(t3[0].length) } : null;
        }, amount2: function(e3) {
          return this.amount(e3);
        }, "(KV letters),": /^(?:[A-Z][a-z]{0,2}|i)(?=,)/, formula$: function(e3) {
          if (e3.match(/^\([a-z]+\)$/)) return null;
          var t3 = e3.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);
          return t3 ? { match_: t3[0], remainder: e3.substr(t3[0].length) } : null;
        }, uprightEntities: /^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/, "/": /^\s*(\/)\s*/, "//": /^\s*(\/\/)\s*/, "*": /^\s*[*.]\s*/ }, findObserveGroups: function(e3, t3, r3, n3, o2, a2, i2, s2, l2, c2) {
          var u2 = function(e4, t4) {
            if ("string" == typeof t4) return 0 !== e4.indexOf(t4) ? null : t4;
            var r4 = e4.match(t4);
            return r4 ? r4[0] : null;
          }, d2 = u2(e3, t3);
          if (null === d2) return null;
          if (e3 = e3.substr(d2.length), null === (d2 = u2(e3, r3))) return null;
          var h2 = (function(e4, t4, r4) {
            for (var n4 = 0; t4 < e4.length; ) {
              var o3 = e4.charAt(t4), a3 = u2(e4.substr(t4), r4);
              if (null !== a3 && 0 === n4) return { endMatchBegin: t4, endMatchEnd: t4 + a3.length };
              if ("{" === o3) n4++;
              else if ("}" === o3) {
                if (0 === n4) throw ["ExtraCloseMissingOpen", "Extra close brace or missing open brace"];
                n4--;
              }
              t4++;
            }
            return null;
          })(e3, d2.length, n3 || o2);
          if (null === h2) return null;
          var m2 = e3.substring(0, n3 ? h2.endMatchEnd : h2.endMatchBegin);
          if (a2 || i2) {
            var p2 = this.findObserveGroups(e3.substr(h2.endMatchEnd), a2, i2, s2, l2);
            if (null === p2) return null;
            var f2 = [m2, p2.match_];
            return { match_: c2 ? f2.join("") : f2, remainder: p2.remainder };
          }
          return { match_: m2, remainder: e3.substr(h2.endMatchEnd) };
        }, match_: function(e3, t3) {
          var r3 = ct.patterns.patterns[e3];
          if (void 0 === r3) throw ["MhchemBugP", "mhchem bug P. Please report. (" + e3 + ")"];
          if ("function" == typeof r3) return ct.patterns.patterns[e3](t3);
          var n3 = t3.match(r3);
          return n3 ? { match_: n3[2] ? [n3[1], n3[2]] : n3[1] ? n3[1] : n3[0], remainder: t3.substr(n3[0].length) } : null;
        } }, actions: { "a=": function(e3, t3) {
          e3.a = (e3.a || "") + t3;
        }, "b=": function(e3, t3) {
          e3.b = (e3.b || "") + t3;
        }, "p=": function(e3, t3) {
          e3.p = (e3.p || "") + t3;
        }, "o=": function(e3, t3) {
          e3.o = (e3.o || "") + t3;
        }, "q=": function(e3, t3) {
          e3.q = (e3.q || "") + t3;
        }, "d=": function(e3, t3) {
          e3.d = (e3.d || "") + t3;
        }, "rm=": function(e3, t3) {
          e3.rm = (e3.rm || "") + t3;
        }, "text=": function(e3, t3) {
          e3.text_ = (e3.text_ || "") + t3;
        }, insert: function(e3, t3, r3) {
          return { type_: r3 };
        }, "insert+p1": function(e3, t3, r3) {
          return { type_: r3, p1: t3 };
        }, "insert+p1+p2": function(e3, t3, r3) {
          return { type_: r3, p1: t3[0], p2: t3[1] };
        }, copy: function(e3, t3) {
          return t3;
        }, rm: function(e3, t3) {
          return { type_: "rm", p1: t3 || "" };
        }, text: function(e3, t3) {
          return ct.go(t3, "text");
        }, "{text}": function(e3, t3) {
          var r3 = ["{"];
          return ct.concatArray(r3, ct.go(t3, "text")), r3.push("}"), r3;
        }, "tex-math": function(e3, t3) {
          return ct.go(t3, "tex-math");
        }, "tex-math tight": function(e3, t3) {
          return ct.go(t3, "tex-math tight");
        }, bond: function(e3, t3, r3) {
          return { type_: "bond", kind_: r3 || t3 };
        }, "color0-output": function(e3, t3) {
          return { type_: "color0", color: t3[0] };
        }, ce: function(e3, t3) {
          return ct.go(t3);
        }, "1/2": function(e3, t3) {
          var r3 = [];
          t3.match(/^[+\-]/) && (r3.push(t3.substr(0, 1)), t3 = t3.substr(1));
          var n3 = t3.match(/^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/);
          return n3[1] = n3[1].replace(/\$/g, ""), r3.push({ type_: "frac", p1: n3[1], p2: n3[2] }), n3[3] && (n3[3] = n3[3].replace(/\$/g, ""), r3.push({ type_: "tex-math", p1: n3[3] })), r3;
        }, "9,9": function(e3, t3) {
          return ct.go(t3, "9,9");
        } }, createTransitions: function(e3) {
          var t3, r3, n3, o2, a2 = {};
          for (t3 in e3) for (r3 in e3[t3]) for (n3 = r3.split("|"), e3[t3][r3].stateArray = n3, o2 = 0; o2 < n3.length; o2++) a2[n3[o2]] = [];
          for (t3 in e3) for (r3 in e3[t3]) for (n3 = e3[t3][r3].stateArray || [], o2 = 0; o2 < n3.length; o2++) {
            var i2 = e3[t3][r3];
            if (i2.action_) {
              i2.action_ = [].concat(i2.action_);
              for (var s2 = 0; s2 < i2.action_.length; s2++) "string" == typeof i2.action_[s2] && (i2.action_[s2] = { type_: i2.action_[s2] });
            } else i2.action_ = [];
            for (var l2 = t3.split("|"), c2 = 0; c2 < l2.length; c2++) if ("*" === n3[o2]) for (var u2 in a2) a2[u2].push({ pattern: l2[c2], task: i2 });
            else a2[n3[o2]].push({ pattern: l2[c2], task: i2 });
          }
          return a2;
        }, stateMachines: {} };
        ct.stateMachines = { ce: { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, else: { "0|1|2": { action_: "beginsWithBond=false", revisit: true, toContinue: true } }, oxidation$: { 0: { action_: "oxidation-output" } }, CMT: { r: { action_: "rdt=", nextState: "rt" }, rd: { action_: "rqt=", nextState: "rdt" } }, arrowUpDown: { "0|1|2|as": { action_: ["sb=false", "output", "operator"], nextState: "1" } }, uprightEntities: { "0|1|2": { action_: ["o=", "output"], nextState: "1" } }, orbital: { "0|1|2|3": { action_: "o=", nextState: "o" } }, "->": { "0|1|2|3": { action_: "r=", nextState: "r" }, "a|as": { action_: ["output", "r="], nextState: "r" }, "*": { action_: ["output", "r="], nextState: "r" } }, "+": { o: { action_: "d= kv", nextState: "d" }, "d|D": { action_: "d=", nextState: "d" }, q: { action_: "d=", nextState: "qd" }, "qd|qD": { action_: "d=", nextState: "qd" }, dq: { action_: ["output", "d="], nextState: "d" }, 3: { action_: ["sb=false", "output", "operator"], nextState: "0" } }, amount: { "0|2": { action_: "a=", nextState: "a" } }, "pm-operator": { "0|1|2|a|as": { action_: ["sb=false", "output", { type_: "operator", option: "\\pm" }], nextState: "0" } }, operator: { "0|1|2|a|as": { action_: ["sb=false", "output", "operator"], nextState: "0" } }, "-$": { "o|q": { action_: ["charge or bond", "output"], nextState: "qd" }, d: { action_: "d=", nextState: "d" }, D: { action_: ["output", { type_: "bond", option: "-" }], nextState: "3" }, q: { action_: "d=", nextState: "qd" }, qd: { action_: "d=", nextState: "qd" }, "qD|dq": { action_: ["output", { type_: "bond", option: "-" }], nextState: "3" } }, "-9": { "3|o": { action_: ["output", { type_: "insert", option: "hyphen" }], nextState: "3" } }, "- orbital overlap": { o: { action_: ["output", { type_: "insert", option: "hyphen" }], nextState: "2" }, d: { action_: ["output", { type_: "insert", option: "hyphen" }], nextState: "2" } }, "-": { "0|1|2": { action_: [{ type_: "output", option: 1 }, "beginsWithBond=true", { type_: "bond", option: "-" }], nextState: "3" }, 3: { action_: { type_: "bond", option: "-" } }, a: { action_: ["output", { type_: "insert", option: "hyphen" }], nextState: "2" }, as: { action_: [{ type_: "output", option: 2 }, { type_: "bond", option: "-" }], nextState: "3" }, b: { action_: "b=" }, o: { action_: { type_: "- after o/d", option: false }, nextState: "2" }, q: { action_: { type_: "- after o/d", option: false }, nextState: "2" }, "d|qd|dq": { action_: { type_: "- after o/d", option: true }, nextState: "2" }, "D|qD|p": { action_: ["output", { type_: "bond", option: "-" }], nextState: "3" } }, amount2: { "1|3": { action_: "a=", nextState: "a" } }, letters: { "0|1|2|3|a|as|b|p|bp|o": { action_: "o=", nextState: "o" }, "q|dq": { action_: ["output", "o="], nextState: "o" }, "d|D|qd|qD": { action_: "o after d", nextState: "o" } }, digits: { o: { action_: "q=", nextState: "q" }, "d|D": { action_: "q=", nextState: "dq" }, q: { action_: ["output", "o="], nextState: "o" }, a: { action_: "o=", nextState: "o" } }, "space A": { "b|p|bp": {} }, space: { a: { nextState: "as" }, 0: { action_: "sb=false" }, "1|2": { action_: "sb=true" }, "r|rt|rd|rdt|rdq": { action_: "output", nextState: "0" }, "*": { action_: ["output", "sb=true"], nextState: "1" } }, "1st-level escape": { "1|2": { action_: ["output", { type_: "insert+p1", option: "1st-level escape" }] }, "*": { action_: ["output", { type_: "insert+p1", option: "1st-level escape" }], nextState: "0" } }, "[(...)]": { "r|rt": { action_: "rd=", nextState: "rd" }, "rd|rdt": { action_: "rq=", nextState: "rdq" } }, "...": { "o|d|D|dq|qd|qD": { action_: ["output", { type_: "bond", option: "..." }], nextState: "3" }, "*": { action_: [{ type_: "output", option: 1 }, { type_: "insert", option: "ellipsis" }], nextState: "1" } }, ". |* ": { "*": { action_: ["output", { type_: "insert", option: "addition compound" }], nextState: "1" } }, "state of aggregation $": { "*": { action_: ["output", "state of aggregation"], nextState: "1" } }, "{[(": { "a|as|o": { action_: ["o=", "output", "parenthesisLevel++"], nextState: "2" }, "0|1|2|3": { action_: ["o=", "output", "parenthesisLevel++"], nextState: "2" }, "*": { action_: ["output", "o=", "output", "parenthesisLevel++"], nextState: "2" } }, ")]}": { "0|1|2|3|b|p|bp|o": { action_: ["o=", "parenthesisLevel--"], nextState: "o" }, "a|as|d|D|q|qd|qD|dq": { action_: ["output", "o=", "parenthesisLevel--"], nextState: "o" } }, ", ": { "*": { action_: ["output", "comma"], nextState: "0" } }, "^_": { "*": {} }, "^{(...)}|^($...$)": { "0|1|2|as": { action_: "b=", nextState: "b" }, p: { action_: "b=", nextState: "bp" }, "3|o": { action_: "d= kv", nextState: "D" }, q: { action_: "d=", nextState: "qD" }, "d|D|qd|qD|dq": { action_: ["output", "d="], nextState: "D" } }, "^a|^\\x{}{}|^\\x{}|^\\x|'": { "0|1|2|as": { action_: "b=", nextState: "b" }, p: { action_: "b=", nextState: "bp" }, "3|o": { action_: "d= kv", nextState: "d" }, q: { action_: "d=", nextState: "qd" }, "d|qd|D|qD": { action_: "d=" }, dq: { action_: ["output", "d="], nextState: "d" } }, "_{(state of aggregation)}$": { "d|D|q|qd|qD|dq": { action_: ["output", "q="], nextState: "q" } }, "_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x": { "0|1|2|as": { action_: "p=", nextState: "p" }, b: { action_: "p=", nextState: "bp" }, "3|o": { action_: "q=", nextState: "q" }, "d|D": { action_: "q=", nextState: "dq" }, "q|qd|qD|dq": { action_: ["output", "q="], nextState: "q" } }, "=<>": { "0|1|2|3|a|as|o|q|d|D|qd|qD|dq": { action_: [{ type_: "output", option: 2 }, "bond"], nextState: "3" } }, "#": { "0|1|2|3|a|as|o": { action_: [{ type_: "output", option: 2 }, { type_: "bond", option: "#" }], nextState: "3" } }, "{}": { "*": { action_: { type_: "output", option: 1 }, nextState: "1" } }, "{...}": { "0|1|2|3|a|as|b|p|bp": { action_: "o=", nextState: "o" }, "o|d|D|q|qd|qD|dq": { action_: ["output", "o="], nextState: "o" } }, "$...$": { a: { action_: "a=" }, "0|1|2|3|as|b|p|bp|o": { action_: "o=", nextState: "o" }, "as|o": { action_: "o=" }, "q|d|D|qd|qD|dq": { action_: ["output", "o="], nextState: "o" } }, "\\bond{(...)}": { "*": { action_: [{ type_: "output", option: 2 }, "bond"], nextState: "3" } }, "\\frac{(...)}": { "*": { action_: [{ type_: "output", option: 1 }, "frac-output"], nextState: "3" } }, "\\overset{(...)}": { "*": { action_: [{ type_: "output", option: 2 }, "overset-output"], nextState: "3" } }, "\\underset{(...)}": { "*": { action_: [{ type_: "output", option: 2 }, "underset-output"], nextState: "3" } }, "\\underbrace{(...)}": { "*": { action_: [{ type_: "output", option: 2 }, "underbrace-output"], nextState: "3" } }, "\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": { action_: [{ type_: "output", option: 2 }, "color-output"], nextState: "3" } }, "\\color{(...)}0": { "*": { action_: [{ type_: "output", option: 2 }, "color0-output"] } }, "\\ce{(...)}": { "*": { action_: [{ type_: "output", option: 2 }, "ce"], nextState: "3" } }, "\\,": { "*": { action_: [{ type_: "output", option: 1 }, "copy"], nextState: "1" } }, "\\x{}{}|\\x{}|\\x": { "0|1|2|3|a|as|b|p|bp|o|c0": { action_: ["o=", "output"], nextState: "3" }, "*": { action_: ["output", "o=", "output"], nextState: "3" } }, others: { "*": { action_: [{ type_: "output", option: 1 }, "copy"], nextState: "3" } }, else2: { a: { action_: "a to o", nextState: "o", revisit: true }, as: { action_: ["output", "sb=true"], nextState: "1", revisit: true }, "r|rt|rd|rdt|rdq": { action_: ["output"], nextState: "0", revisit: true }, "*": { action_: ["output", "copy"], nextState: "3" } } }), actions: { "o after d": function(e3, t3) {
          var r3;
          if ((e3.d || "").match(/^[0-9]+$/)) {
            var n3 = e3.d;
            e3.d = void 0, r3 = this.output(e3), e3.b = n3;
          } else r3 = this.output(e3);
          return ct.actions["o="](e3, t3), r3;
        }, "d= kv": function(e3, t3) {
          e3.d = t3, e3.dType = "kv";
        }, "charge or bond": function(e3, t3) {
          if (e3.beginsWithBond) {
            var r3 = [];
            return ct.concatArray(r3, this.output(e3)), ct.concatArray(r3, ct.actions.bond(e3, t3, "-")), r3;
          }
          e3.d = t3;
        }, "- after o/d": function(e3, t3, r3) {
          var n3 = ct.patterns.match_("orbital", e3.o || ""), o2 = ct.patterns.match_("one lowercase greek letter $", e3.o || ""), a2 = ct.patterns.match_("one lowercase latin letter $", e3.o || ""), i2 = ct.patterns.match_("$one lowercase latin letter$ $", e3.o || ""), s2 = "-" === t3 && (n3 && "" === n3.remainder || o2 || a2 || i2);
          !s2 || e3.a || e3.b || e3.p || e3.d || e3.q || n3 || !a2 || (e3.o = "$" + e3.o + "$");
          var l2 = [];
          return s2 ? (ct.concatArray(l2, this.output(e3)), l2.push({ type_: "hyphen" })) : (n3 = ct.patterns.match_("digits", e3.d || ""), r3 && n3 && "" === n3.remainder ? (ct.concatArray(l2, ct.actions["d="](e3, t3)), ct.concatArray(l2, this.output(e3))) : (ct.concatArray(l2, this.output(e3)), ct.concatArray(l2, ct.actions.bond(e3, t3, "-")))), l2;
        }, "a to o": function(e3) {
          e3.o = e3.a, e3.a = void 0;
        }, "sb=true": function(e3) {
          e3.sb = true;
        }, "sb=false": function(e3) {
          e3.sb = false;
        }, "beginsWithBond=true": function(e3) {
          e3.beginsWithBond = true;
        }, "beginsWithBond=false": function(e3) {
          e3.beginsWithBond = false;
        }, "parenthesisLevel++": function(e3) {
          e3.parenthesisLevel++;
        }, "parenthesisLevel--": function(e3) {
          e3.parenthesisLevel--;
        }, "state of aggregation": function(e3, t3) {
          return { type_: "state of aggregation", p1: ct.go(t3, "o") };
        }, comma: function(e3, t3) {
          var r3 = t3.replace(/\s*$/, "");
          return r3 !== t3 && 0 === e3.parenthesisLevel ? { type_: "comma enumeration L", p1: r3 } : { type_: "comma enumeration M", p1: r3 };
        }, output: function(e3, t3, r3) {
          var n3, o2, a2;
          e3.r ? (o2 = "M" === e3.rdt ? ct.go(e3.rd, "tex-math") : "T" === e3.rdt ? [{ type_: "text", p1: e3.rd || "" }] : ct.go(e3.rd), a2 = "M" === e3.rqt ? ct.go(e3.rq, "tex-math") : "T" === e3.rqt ? [{ type_: "text", p1: e3.rq || "" }] : ct.go(e3.rq), n3 = { type_: "arrow", r: e3.r, rd: o2, rq: a2 }) : (n3 = [], (e3.a || e3.b || e3.p || e3.o || e3.q || e3.d || r3) && (e3.sb && n3.push({ type_: "entitySkip" }), e3.o || e3.q || e3.d || e3.b || e3.p || 2 === r3 ? e3.o || e3.q || e3.d || !e3.b && !e3.p ? e3.o && "kv" === e3.dType && ct.patterns.match_("d-oxidation$", e3.d || "") ? e3.dType = "oxidation" : e3.o && "kv" === e3.dType && !e3.q && (e3.dType = void 0) : (e3.o = e3.a, e3.d = e3.b, e3.q = e3.p, e3.a = e3.b = e3.p = void 0) : (e3.o = e3.a, e3.a = void 0), n3.push({ type_: "chemfive", a: ct.go(e3.a, "a"), b: ct.go(e3.b, "bd"), p: ct.go(e3.p, "pq"), o: ct.go(e3.o, "o"), q: ct.go(e3.q, "pq"), d: ct.go(e3.d, "oxidation" === e3.dType ? "oxidation" : "bd"), dType: e3.dType })));
          for (var i2 in e3) "parenthesisLevel" !== i2 && "beginsWithBond" !== i2 && delete e3[i2];
          return n3;
        }, "oxidation-output": function(e3, t3) {
          var r3 = ["{"];
          return ct.concatArray(r3, ct.go(t3, "oxidation")), r3.push("}"), r3;
        }, "frac-output": function(e3, t3) {
          return { type_: "frac-ce", p1: ct.go(t3[0]), p2: ct.go(t3[1]) };
        }, "overset-output": function(e3, t3) {
          return { type_: "overset", p1: ct.go(t3[0]), p2: ct.go(t3[1]) };
        }, "underset-output": function(e3, t3) {
          return { type_: "underset", p1: ct.go(t3[0]), p2: ct.go(t3[1]) };
        }, "underbrace-output": function(e3, t3) {
          return { type_: "underbrace", p1: ct.go(t3[0]), p2: ct.go(t3[1]) };
        }, "color-output": function(e3, t3) {
          return { type_: "color", color1: t3[0], color2: ct.go(t3[1]) };
        }, "r=": function(e3, t3) {
          e3.r = t3;
        }, "rdt=": function(e3, t3) {
          e3.rdt = t3;
        }, "rd=": function(e3, t3) {
          e3.rd = t3;
        }, "rqt=": function(e3, t3) {
          e3.rqt = t3;
        }, "rq=": function(e3, t3) {
          e3.rq = t3;
        }, operator: function(e3, t3, r3) {
          return { type_: "operator", kind_: r3 || t3 };
        } } }, a: { transitions: ct.createTransitions({ empty: { "*": {} }, "1/2$": { 0: { action_: "1/2" } }, else: { 0: { nextState: "1", revisit: true } }, "$(...)$": { "*": { action_: "tex-math tight", nextState: "1" } }, ",": { "*": { action_: { type_: "insert", option: "commaDecimal" } } }, else2: { "*": { action_: "copy" } } }), actions: {} }, o: { transitions: ct.createTransitions({ empty: { "*": {} }, "1/2$": { 0: { action_: "1/2" } }, else: { 0: { nextState: "1", revisit: true } }, letters: { "*": { action_: "rm" } }, "\\ca": { "*": { action_: { type_: "insert", option: "circa" } } }, "\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } }, "${(...)}$|$(...)$": { "*": { action_: "tex-math" } }, "{(...)}": { "*": { action_: "{text}" } }, else2: { "*": { action_: "copy" } } }), actions: {} }, text: { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, "{...}": { "*": { action_: "text=" } }, "${(...)}$|$(...)$": { "*": { action_: "tex-math" } }, "\\greek": { "*": { action_: ["output", "rm"] } }, "\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: ["output", "copy"] } }, else: { "*": { action_: "text=" } } }), actions: { output: function(e3) {
          if (e3.text_) {
            var t3 = { type_: "text", p1: e3.text_ };
            for (var r3 in e3) delete e3[r3];
            return t3;
          }
        } } }, pq: { transitions: ct.createTransitions({ empty: { "*": {} }, "state of aggregation $": { "*": { action_: "state of aggregation" } }, i$: { 0: { nextState: "!f", revisit: true } }, "(KV letters),": { 0: { action_: "rm", nextState: "0" } }, formula$: { 0: { nextState: "f", revisit: true } }, "1/2$": { 0: { action_: "1/2" } }, else: { 0: { nextState: "!f", revisit: true } }, "${(...)}$|$(...)$": { "*": { action_: "tex-math" } }, "{(...)}": { "*": { action_: "text" } }, "a-z": { f: { action_: "tex-math" } }, letters: { "*": { action_: "rm" } }, "-9.,9": { "*": { action_: "9,9" } }, ",": { "*": { action_: { type_: "insert+p1", option: "comma enumeration S" } } }, "\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": { action_: "color-output" } }, "\\color{(...)}0": { "*": { action_: "color0-output" } }, "\\ce{(...)}": { "*": { action_: "ce" } }, "\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } }, else2: { "*": { action_: "copy" } } }), actions: { "state of aggregation": function(e3, t3) {
          return { type_: "state of aggregation subscript", p1: ct.go(t3, "o") };
        }, "color-output": function(e3, t3) {
          return { type_: "color", color1: t3[0], color2: ct.go(t3[1], "pq") };
        } } }, bd: { transitions: ct.createTransitions({ empty: { "*": {} }, x$: { 0: { nextState: "!f", revisit: true } }, formula$: { 0: { nextState: "f", revisit: true } }, else: { 0: { nextState: "!f", revisit: true } }, "-9.,9 no missing 0": { "*": { action_: "9,9" } }, ".": { "*": { action_: { type_: "insert", option: "electron dot" } } }, "a-z": { f: { action_: "tex-math" } }, x: { "*": { action_: { type_: "insert", option: "KV x" } } }, letters: { "*": { action_: "rm" } }, "'": { "*": { action_: { type_: "insert", option: "prime" } } }, "${(...)}$|$(...)$": { "*": { action_: "tex-math" } }, "{(...)}": { "*": { action_: "text" } }, "\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": { action_: "color-output" } }, "\\color{(...)}0": { "*": { action_: "color0-output" } }, "\\ce{(...)}": { "*": { action_: "ce" } }, "\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } }, else2: { "*": { action_: "copy" } } }), actions: { "color-output": function(e3, t3) {
          return { type_: "color", color1: t3[0], color2: ct.go(t3[1], "bd") };
        } } }, oxidation: { transitions: ct.createTransitions({ empty: { "*": {} }, "roman numeral": { "*": { action_: "roman-numeral" } }, "${(...)}$|$(...)$": { "*": { action_: "tex-math" } }, else: { "*": { action_: "copy" } } }), actions: { "roman-numeral": function(e3, t3) {
          return { type_: "roman numeral", p1: t3 || "" };
        } } }, "tex-math": { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, "\\ce{(...)}": { "*": { action_: ["output", "ce"] } }, "{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } }, else: { "*": { action_: "o=" } } }), actions: { output: function(e3) {
          if (e3.o) {
            var t3 = { type_: "tex-math", p1: e3.o };
            for (var r3 in e3) delete e3[r3];
            return t3;
          }
        } } }, "tex-math tight": { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, "\\ce{(...)}": { "*": { action_: ["output", "ce"] } }, "{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } }, "-|+": { "*": { action_: "tight operator" } }, else: { "*": { action_: "o=" } } }), actions: { "tight operator": function(e3, t3) {
          e3.o = (e3.o || "") + "{" + t3 + "}";
        }, output: function(e3) {
          if (e3.o) {
            var t3 = { type_: "tex-math", p1: e3.o };
            for (var r3 in e3) delete e3[r3];
            return t3;
          }
        } } }, "9,9": { transitions: ct.createTransitions({ empty: { "*": {} }, ",": { "*": { action_: "comma" } }, else: { "*": { action_: "copy" } } }), actions: { comma: function() {
          return { type_: "commaDecimal" };
        } } }, pu: { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, space$: { "*": { action_: ["output", "space"] } }, "{[(|)]}": { "0|a": { action_: "copy" } }, "(-)(9)^(-9)": { 0: { action_: "number^", nextState: "a" } }, "(-)(9.,9)(e)(99)": { 0: { action_: "enumber", nextState: "a" } }, space: { "0|a": {} }, "pm-operator": { "0|a": { action_: { type_: "operator", option: "\\pm" }, nextState: "0" } }, operator: { "0|a": { action_: "copy", nextState: "0" } }, "//": { d: { action_: "o=", nextState: "/" } }, "/": { d: { action_: "o=", nextState: "/" } }, "{...}|else": { "0|d": { action_: "d=", nextState: "d" }, a: { action_: ["space", "d="], nextState: "d" }, "/|q": { action_: "q=", nextState: "q" } } }), actions: { enumber: function(e3, t3) {
          var r3 = [];
          return "+-" === t3[0] || "+/-" === t3[0] ? r3.push("\\pm ") : t3[0] && r3.push(t3[0]), t3[1] && (ct.concatArray(r3, ct.go(t3[1], "pu-9,9")), t3[2] && (t3[2].match(/[,.]/) ? ct.concatArray(r3, ct.go(t3[2], "pu-9,9")) : r3.push(t3[2])), t3[3] = t3[4] || t3[3], t3[3] && (t3[3] = t3[3].trim(), "e" === t3[3] || "*" === t3[3].substr(0, 1) ? r3.push({ type_: "cdot" }) : r3.push({ type_: "times" }))), t3[3] && r3.push("10^{" + t3[5] + "}"), r3;
        }, "number^": function(e3, t3) {
          var r3 = [];
          return "+-" === t3[0] || "+/-" === t3[0] ? r3.push("\\pm ") : t3[0] && r3.push(t3[0]), ct.concatArray(r3, ct.go(t3[1], "pu-9,9")), r3.push("^{" + t3[2] + "}"), r3;
        }, operator: function(e3, t3, r3) {
          return { type_: "operator", kind_: r3 || t3 };
        }, space: function() {
          return { type_: "pu-space-1" };
        }, output: function(e3) {
          var t3, r3 = ct.patterns.match_("{(...)}", e3.d || "");
          r3 && "" === r3.remainder && (e3.d = r3.match_);
          var n3 = ct.patterns.match_("{(...)}", e3.q || "");
          if (n3 && "" === n3.remainder && (e3.q = n3.match_), e3.d && (e3.d = e3.d.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C"), e3.d = e3.d.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F")), e3.q) {
            e3.q = e3.q.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C"), e3.q = e3.q.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
            var o2 = { d: ct.go(e3.d, "pu"), q: ct.go(e3.q, "pu") };
            "//" === e3.o ? t3 = { type_: "pu-frac", p1: o2.d, p2: o2.q } : (t3 = o2.d, o2.d.length > 1 || o2.q.length > 1 ? t3.push({ type_: " / " }) : t3.push({ type_: "/" }), ct.concatArray(t3, o2.q));
          } else t3 = ct.go(e3.d, "pu-2");
          for (var a2 in e3) delete e3[a2];
          return t3;
        } } }, "pu-2": { transitions: ct.createTransitions({ empty: { "*": { action_: "output" } }, "*": { "*": { action_: ["output", "cdot"], nextState: "0" } }, "\\x": { "*": { action_: "rm=" } }, space: { "*": { action_: ["output", "space"], nextState: "0" } }, "^{(...)}|^(-1)": { 1: { action_: "^(-1)" } }, "-9.,9": { 0: { action_: "rm=", nextState: "0" }, 1: { action_: "^(-1)", nextState: "0" } }, "{...}|else": { "*": { action_: "rm=", nextState: "1" } } }), actions: { cdot: function() {
          return { type_: "tight cdot" };
        }, "^(-1)": function(e3, t3) {
          e3.rm += "^{" + t3 + "}";
        }, space: function() {
          return { type_: "pu-space-2" };
        }, output: function(e3) {
          var t3 = [];
          if (e3.rm) {
            var r3 = ct.patterns.match_("{(...)}", e3.rm || "");
            t3 = r3 && "" === r3.remainder ? ct.go(r3.match_, "pu") : { type_: "rm", p1: e3.rm };
          }
          for (var n3 in e3) delete e3[n3];
          return t3;
        } } }, "pu-9,9": { transitions: ct.createTransitions({ empty: { 0: { action_: "output-0" }, o: { action_: "output-o" } }, ",": { 0: { action_: ["output-0", "comma"], nextState: "o" } }, ".": { 0: { action_: ["output-0", "copy"], nextState: "o" } }, else: { "*": { action_: "text=" } } }), actions: { comma: function() {
          return { type_: "commaDecimal" };
        }, "output-0": function(e3) {
          var t3 = [];
          if (e3.text_ = e3.text_ || "", e3.text_.length > 4) {
            var r3 = e3.text_.length % 3;
            0 === r3 && (r3 = 3);
            for (var n3 = e3.text_.length - 3; n3 > 0; n3 -= 3) t3.push(e3.text_.substr(n3, 3)), t3.push({ type_: "1000 separator" });
            t3.push(e3.text_.substr(0, r3)), t3.reverse();
          } else t3.push(e3.text_);
          for (var o2 in e3) delete e3[o2];
          return t3;
        }, "output-o": function(e3) {
          var t3 = [];
          if (e3.text_ = e3.text_ || "", e3.text_.length > 4) {
            for (var r3 = e3.text_.length - 3, n3 = 0; n3 < r3; n3 += 3) t3.push(e3.text_.substr(n3, 3)), t3.push({ type_: "1000 separator" });
            t3.push(e3.text_.substr(n3));
          } else t3.push(e3.text_);
          for (var o2 in e3) delete e3[o2];
          return t3;
        } } } };
        var ut = { go: function(e3, t3) {
          if (!e3) return "";
          for (var r3 = "", n3 = false, o2 = 0; o2 < e3.length; o2++) {
            var a2 = e3[o2];
            "string" == typeof a2 ? r3 += a2 : (r3 += ut._go2(a2), "1st-level escape" === a2.type_ && (n3 = true));
          }
          return t3 || n3 || !r3 || (r3 = "{" + r3 + "}"), r3;
        }, _goInner: function(e3) {
          return e3 ? ut.go(e3, true) : e3;
        }, _go2: function(e3) {
          var t3;
          switch (e3.type_) {
            case "chemfive":
              t3 = "";
              var r3 = { a: ut._goInner(e3.a), b: ut._goInner(e3.b), p: ut._goInner(e3.p), o: ut._goInner(e3.o), q: ut._goInner(e3.q), d: ut._goInner(e3.d) };
              r3.a && (r3.a.match(/^[+\-]/) && (r3.a = "{" + r3.a + "}"), t3 += r3.a + "\\,"), (r3.b || r3.p) && (t3 += "{\\vphantom{X}}", t3 += "^{\\hphantom{" + (r3.b || "") + "}}_{\\hphantom{" + (r3.p || "") + "}}", t3 += "{\\vphantom{X}}", t3 += "^{\\vphantom{2}\\mathllap{" + (r3.b || "") + "}}", t3 += "_{\\vphantom{2}\\mathllap{" + (r3.p || "") + "}}"), r3.o && (r3.o.match(/^[+\-]/) && (r3.o = "{" + r3.o + "}"), t3 += r3.o), "kv" === e3.dType ? ((r3.d || r3.q) && (t3 += "{\\vphantom{X}}"), r3.d && (t3 += "^{" + r3.d + "}"), r3.q && (t3 += "_{" + r3.q + "}")) : "oxidation" === e3.dType ? (r3.d && (t3 += "{\\vphantom{X}}", t3 += "^{" + r3.d + "}"), r3.q && (t3 += "{{}}", t3 += "_{" + r3.q + "}")) : (r3.q && (t3 += "{{}}", t3 += "_{" + r3.q + "}"), r3.d && (t3 += "{{}}", t3 += "^{" + r3.d + "}"));
              break;
            case "rm":
            case "roman numeral":
              t3 = "\\mathrm{" + e3.p1 + "}";
              break;
            case "text":
              e3.p1.match(/[\^_]/) ? (e3.p1 = e3.p1.replace(" ", "~").replace("-", "\\text{-}"), t3 = "\\mathrm{" + e3.p1 + "}") : t3 = "\\text{" + e3.p1 + "}";
              break;
            case "state of aggregation":
              t3 = "\\mskip2mu " + ut._goInner(e3.p1);
              break;
            case "state of aggregation subscript":
              t3 = "\\mskip1mu " + ut._goInner(e3.p1);
              break;
            case "bond":
              if (!(t3 = ut._getBond(e3.kind_))) throw ["MhchemErrorBond", "mhchem Error. Unknown bond type (" + e3.kind_ + ")"];
              break;
            case "frac":
              var n3 = "\\frac{" + e3.p1 + "}{" + e3.p2 + "}";
              t3 = "\\mathchoice{\\textstyle" + n3 + "}{" + n3 + "}{" + n3 + "}{" + n3 + "}";
              break;
            case "pu-frac":
              var o2 = "\\frac{" + ut._goInner(e3.p1) + "}{" + ut._goInner(e3.p2) + "}";
              t3 = "\\mathchoice{\\textstyle" + o2 + "}{" + o2 + "}{" + o2 + "}{" + o2 + "}";
              break;
            case "tex-math":
            case "1st-level escape":
              t3 = e3.p1 + " ";
              break;
            case "frac-ce":
              t3 = "\\frac{" + ut._goInner(e3.p1) + "}{" + ut._goInner(e3.p2) + "}";
              break;
            case "overset":
              t3 = "\\overset{" + ut._goInner(e3.p1) + "}{" + ut._goInner(e3.p2) + "}";
              break;
            case "underset":
              t3 = "\\underset{" + ut._goInner(e3.p1) + "}{" + ut._goInner(e3.p2) + "}";
              break;
            case "underbrace":
              t3 = "\\underbrace{" + ut._goInner(e3.p1) + "}_{" + ut._goInner(e3.p2) + "}";
              break;
            case "color":
              t3 = "{\\color{" + e3.color1 + "}{" + ut._goInner(e3.color2) + "}}";
              break;
            case "color0":
              t3 = "\\color{" + e3.color + "}";
              break;
            case "arrow":
              var a2 = { rd: ut._goInner(e3.rd), rq: ut._goInner(e3.rq) }, i2 = ut._getArrow(e3.r);
              a2.rq && (i2 += "[{\\rm " + a2.rq + "}]"), t3 = i2 += a2.rd ? "{\\rm " + a2.rd + "}" : "{}";
              break;
            case "operator":
              t3 = ut._getOperator(e3.kind_);
              break;
            case "space":
              t3 = " ";
              break;
            case "entitySkip":
            case "pu-space-1":
              t3 = "~";
              break;
            case "pu-space-2":
              t3 = "\\mkern3mu ";
              break;
            case "1000 separator":
              t3 = "\\mkern2mu ";
              break;
            case "commaDecimal":
              t3 = "{,}";
              break;
            case "comma enumeration L":
              t3 = "{" + e3.p1 + "}\\mkern6mu ";
              break;
            case "comma enumeration M":
              t3 = "{" + e3.p1 + "}\\mkern3mu ";
              break;
            case "comma enumeration S":
              t3 = "{" + e3.p1 + "}\\mkern1mu ";
              break;
            case "hyphen":
              t3 = "\\text{-}";
              break;
            case "addition compound":
              t3 = "\\,{\\cdot}\\,";
              break;
            case "electron dot":
              t3 = "\\mkern1mu \\text{\\textbullet}\\mkern1mu ";
              break;
            case "KV x":
              t3 = "{\\times}";
              break;
            case "prime":
              t3 = "\\prime ";
              break;
            case "cdot":
              t3 = "\\cdot ";
              break;
            case "tight cdot":
              t3 = "\\mkern1mu{\\cdot}\\mkern1mu ";
              break;
            case "times":
              t3 = "\\times ";
              break;
            case "circa":
              t3 = "{\\sim}";
              break;
            case "^":
              t3 = "uparrow";
              break;
            case "v":
              t3 = "downarrow";
              break;
            case "ellipsis":
              t3 = "\\ldots ";
              break;
            case "/":
              t3 = "/";
              break;
            case " / ":
              t3 = "\\,/\\,";
              break;
            default:
              throw ["MhchemBugT", "mhchem bug T. Please report."];
          }
          return t3;
        }, _getArrow: function(e3) {
          switch (e3) {
            case "->":
            case "\u2192":
            case "\u27F6":
              return "\\yields";
            case "<-":
              return "\\yieldsLeft";
            case "<->":
              return "\\mesomerism";
            case "<-->":
              return "\\yieldsLeftRight";
            case "<=>":
            case "\u21CC":
              return "\\chemequilibrium";
            case "<=>>":
              return "\\equilibriumRight";
            case "<<=>":
              return "\\equilibriumLeft";
            default:
              throw ["MhchemBugT", "mhchem bug T. Please report."];
          }
        }, _getBond: function(e3) {
          switch (e3) {
            case "-":
            case "1":
              return "{-}";
            case "=":
            case "2":
              return "{=}";
            case "#":
            case "3":
              return "{\\equiv}";
            case "~":
              return "{\\tripleDash}";
            case "~-":
              return "{\\tripleDashOverLine}";
            case "~=":
            case "~--":
              return "{\\tripleDashOverDoubleLine}";
            case "-~-":
              return "{\\tripleDashBetweenDoubleLine}";
            case "...":
              return "{{\\cdot}{\\cdot}{\\cdot}}";
            case "....":
              return "{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";
            case "->":
              return "{\\rightarrow}";
            case "<-":
              return "{\\leftarrow}";
            case "<":
              return "{<}";
            case ">":
              return "{>}";
            default:
              throw ["MhchemBugT", "mhchem bug T. Please report."];
          }
        }, _getOperator: function(e3) {
          switch (e3) {
            case "+":
              return " {}+{} ";
            case "-":
              return " {}-{} ";
            case "=":
              return " {}={} ";
            case "<":
              return " {}<{} ";
            case ">":
              return " {}>{} ";
            case "<<":
              return " {}\\ll{} ";
            case ">>":
              return " {}\\gg{} ";
            case "\\pm":
              return " {}\\pm{} ";
            case "\\approx":
            case "$\\approx$":
              return " {}\\approx{} ";
            case "v":
            case "(v)":
              return " \\downarrow{} ";
            case "^":
            case "(^)":
              return " \\uparrow{} ";
            default:
              throw ["MhchemBugT", "mhchem bug T. Please report."];
          }
        } };
        function dt(e3) {
          const t3 = [];
          e3.consumeSpaces();
          let r3 = e3.fetch().text;
          for ("\\relax" === r3 && (e3.consume(), e3.consumeSpaces(), r3 = e3.fetch().text); "\\hline" === r3 || "\\hdashline" === r3; ) e3.consume(), t3.push("\\hdashline" === r3), e3.consumeSpaces(), r3 = e3.fetch().text;
          return t3;
        }
        Ye("\\darr", "\\downarrow"), Ye("\\dArr", "\\Downarrow"), Ye("\\Darr", "\\Downarrow"), Ye("\\lang", "\\langle"), Ye("\\rang", "\\rangle"), Ye("\\uarr", "\\uparrow"), Ye("\\uArr", "\\Uparrow"), Ye("\\Uarr", "\\Uparrow"), Ye("\\N", "\\mathbb{N}"), Ye("\\R", "\\mathbb{R}"), Ye("\\Z", "\\mathbb{Z}"), Ye("\\alef", "\\aleph"), Ye("\\alefsym", "\\aleph"), Ye("\\bull", "\\bullet"), Ye("\\clubs", "\\clubsuit"), Ye("\\cnums", "\\mathbb{C}"), Ye("\\Complex", "\\mathbb{C}"), Ye("\\Dagger", "\\ddagger"), Ye("\\diamonds", "\\diamondsuit"), Ye("\\empty", "\\emptyset"), Ye("\\exist", "\\exists"), Ye("\\harr", "\\leftrightarrow"), Ye("\\hArr", "\\Leftrightarrow"), Ye("\\Harr", "\\Leftrightarrow"), Ye("\\hearts", "\\heartsuit"), Ye("\\image", "\\Im"), Ye("\\infin", "\\infty"), Ye("\\isin", "\\in"), Ye("\\larr", "\\leftarrow"), Ye("\\lArr", "\\Leftarrow"), Ye("\\Larr", "\\Leftarrow"), Ye("\\lrarr", "\\leftrightarrow"), Ye("\\lrArr", "\\Leftrightarrow"), Ye("\\Lrarr", "\\Leftrightarrow"), Ye("\\natnums", "\\mathbb{N}"), Ye("\\plusmn", "\\pm"), Ye("\\rarr", "\\rightarrow"), Ye("\\rArr", "\\Rightarrow"), Ye("\\Rarr", "\\Rightarrow"), Ye("\\real", "\\Re"), Ye("\\reals", "\\mathbb{R}"), Ye("\\Reals", "\\mathbb{R}"), Ye("\\sdot", "\\cdot"), Ye("\\sect", "\\S"), Ye("\\spades", "\\spadesuit"), Ye("\\sub", "\\subset"), Ye("\\sube", "\\subseteq"), Ye("\\supe", "\\supseteq"), Ye("\\thetasym", "\\vartheta"), Ye("\\weierp", "\\wp"), Ye("\\quantity", "{\\left\\{ #1 \\right\\}}"), Ye("\\qty", "{\\left\\{ #1 \\right\\}}"), Ye("\\pqty", "{\\left( #1 \\right)}"), Ye("\\bqty", "{\\left[ #1 \\right]}"), Ye("\\vqty", "{\\left\\vert #1 \\right\\vert}"), Ye("\\Bqty", "{\\left\\{ #1 \\right\\}}"), Ye("\\absolutevalue", "{\\left\\vert #1 \\right\\vert}"), Ye("\\abs", "{\\left\\vert #1 \\right\\vert}"), Ye("\\norm", "{\\left\\Vert #1 \\right\\Vert}"), Ye("\\evaluated", "{\\left.#1 \\right\\vert}"), Ye("\\eval", "{\\left.#1 \\right\\vert}"), Ye("\\order", "{\\mathcal{O} \\left( #1 \\right)}"), Ye("\\commutator", "{\\left[ #1 , #2 \\right]}"), Ye("\\comm", "{\\left[ #1 , #2 \\right]}"), Ye("\\anticommutator", "{\\left\\{ #1 , #2 \\right\\}}"), Ye("\\acomm", "{\\left\\{ #1 , #2 \\right\\}}"), Ye("\\poissonbracket", "{\\left\\{ #1 , #2 \\right\\}}"), Ye("\\pb", "{\\left\\{ #1 , #2 \\right\\}}"), Ye("\\vectorbold", "{\\boldsymbol{ #1 }}"), Ye("\\vb", "{\\boldsymbol{ #1 }}"), Ye("\\vectorarrow", "{\\vec{\\boldsymbol{ #1 }}}"), Ye("\\va", "{\\vec{\\boldsymbol{ #1 }}}"), Ye("\\vectorunit", "{{\\boldsymbol{\\hat{ #1 }}}}"), Ye("\\vu", "{{\\boldsymbol{\\hat{ #1 }}}}"), Ye("\\dotproduct", "\\mathbin{\\boldsymbol\\cdot}"), Ye("\\vdot", "{\\boldsymbol\\cdot}"), Ye("\\crossproduct", "\\mathbin{\\boldsymbol\\times}"), Ye("\\cross", "\\mathbin{\\boldsymbol\\times}"), Ye("\\cp", "\\mathbin{\\boldsymbol\\times}"), Ye("\\gradient", "{\\boldsymbol\\nabla}"), Ye("\\grad", "{\\boldsymbol\\nabla}"), Ye("\\divergence", "{\\grad\\vdot}"), Ye("\\curl", "{\\grad\\cross}"), Ye("\\laplacian", "\\nabla^2"), Ye("\\tr", "{\\operatorname{tr}}"), Ye("\\Tr", "{\\operatorname{Tr}}"), Ye("\\rank", "{\\operatorname{rank}}"), Ye("\\erf", "{\\operatorname{erf}}"), Ye("\\Res", "{\\operatorname{Res}}"), Ye("\\principalvalue", "{\\mathcal{P}}"), Ye("\\pv", "{\\mathcal{P}}"), Ye("\\PV", "{\\operatorname{P.V.}}"), Ye("\\qqtext", "{\\quad\\text{ #1 }\\quad}"), Ye("\\qq", "{\\quad\\text{ #1 }\\quad}"), Ye("\\qcomma", "{\\text{,}\\quad}"), Ye("\\qc", "{\\text{,}\\quad}"), Ye("\\qcc", "{\\quad\\text{c.c.}\\quad}"), Ye("\\qif", "{\\quad\\text{if}\\quad}"), Ye("\\qthen", "{\\quad\\text{then}\\quad}"), Ye("\\qelse", "{\\quad\\text{else}\\quad}"), Ye("\\qotherwise", "{\\quad\\text{otherwise}\\quad}"), Ye("\\qunless", "{\\quad\\text{unless}\\quad}"), Ye("\\qgiven", "{\\quad\\text{given}\\quad}"), Ye("\\qusing", "{\\quad\\text{using}\\quad}"), Ye("\\qassume", "{\\quad\\text{assume}\\quad}"), Ye("\\qsince", "{\\quad\\text{since}\\quad}"), Ye("\\qlet", "{\\quad\\text{let}\\quad}"), Ye("\\qfor", "{\\quad\\text{for}\\quad}"), Ye("\\qall", "{\\quad\\text{all}\\quad}"), Ye("\\qeven", "{\\quad\\text{even}\\quad}"), Ye("\\qodd", "{\\quad\\text{odd}\\quad}"), Ye("\\qinteger", "{\\quad\\text{integer}\\quad}"), Ye("\\qand", "{\\quad\\text{and}\\quad}"), Ye("\\qor", "{\\quad\\text{or}\\quad}"), Ye("\\qas", "{\\quad\\text{as}\\quad}"), Ye("\\qin", "{\\quad\\text{in}\\quad}"), Ye("\\differential", "{\\text{d}}"), Ye("\\dd", "{\\text{d}}"), Ye("\\derivative", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}"), Ye("\\dv", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}"), Ye("\\partialderivative", "{\\frac{\\partial{ #1 }}{\\partial{ #2 }}}"), Ye("\\variation", "{\\delta}"), Ye("\\var", "{\\delta}"), Ye("\\functionalderivative", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}"), Ye("\\fdv", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}"), Ye("\\innerproduct", "{\\left\\langle {#1} \\mid { #2} \\right\\rangle}"), Ye("\\outerproduct", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}"), Ye("\\dyad", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}"), Ye("\\ketbra", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}"), Ye("\\op", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}"), Ye("\\expectationvalue", "{\\left\\langle {#1 } \\right\\rangle}"), Ye("\\expval", "{\\left\\langle {#1 } \\right\\rangle}"), Ye("\\ev", "{\\left\\langle {#1 } \\right\\rangle}"), Ye("\\matrixelement", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}"), Ye("\\matrixel", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}"), Ye("\\mel", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}");
        const ht = (e3) => {
          if (!e3.parser.settings.displayMode) throw new t2(`{${e3.envName}} can be used only in display mode.`);
        }, mt = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/, pt = (e3) => {
          let t3 = e3.get("\\arraystretch");
          "string" != typeof t3 && (t3 = Qe(t3.tokens)), t3 = isNaN(t3) ? null : Number(t3);
          let r3 = e3.get("\\arraycolsep");
          "string" != typeof r3 && (r3 = Qe(r3.tokens));
          const n3 = mt.exec(r3);
          return [t3, n3 ? { number: +(n3[1] + n3[2]), unit: n3[3] } : null];
        }, ft = (e3) => {
          let r3 = "";
          for (let n3 = 0; n3 < e3.length; n3++) if ("label" === e3[n3].type) {
            if (r3) throw new t2("Multiple \\labels in one row");
            r3 = e3[n3].string;
          }
          return r3;
        };
        function gt(e3) {
          if (-1 === e3.indexOf("ed")) return -1 === e3.indexOf("*");
        }
        function bt(e3, { cols: r3, envClasses: n3, autoTag: o2, singleRow: a2, emptySingleRow: i2, maxNumCols: s2, leqno: l2, arraystretch: c2, arraycolsep: u2 }, d2) {
          const h2 = n3 && n3.includes("bordermatrix") ? "}" : "\\end";
          e3.gullet.beginGroup(), a2 || e3.gullet.macros.set("\\cr", "\\\\\\relax"), e3.gullet.beginGroup();
          let m2 = [];
          const p2 = [m2], f2 = [], g2 = [], b2 = [], x2 = null != o2 ? [] : void 0;
          function y2() {
            o2 && e3.gullet.macros.set("\\@eqnsw", "1", true);
          }
          function v2() {
            x2 && (e3.gullet.macros.get("\\df@tag") ? (x2.push(e3.subparse([new Ge("\\df@tag")])), e3.gullet.macros.set("\\df@tag", void 0, true)) : x2.push(Boolean(o2) && "1" === e3.gullet.macros.get("\\@eqnsw")));
          }
          for (y2(), b2.push(dt(e3)); ; ) {
            let r4 = e3.parseExpression(false, a2 ? "\\end" : "\\\\");
            e3.gullet.endGroup(), e3.gullet.beginGroup(), r4 = { type: "ordgroup", mode: e3.mode, body: r4, semisimple: true }, m2.push(r4);
            const o3 = e3.fetch().text;
            if ("&" === o3) {
              if (s2 && m2.length === s2) {
                if (!n3.includes("array")) throw new t2(2 === s2 ? "The split environment accepts no more than two columns" : "The equation environment accepts only one column", e3.nextToken);
                if (e3.settings.strict) throw new t2("Too few columns specified in the {array} column argument.", e3.nextToken);
              }
              e3.consume();
            } else {
              if (o3 === h2) {
                v2(), 1 === m2.length && 0 === r4.body.length && (p2.length > 1 || !i2) && p2.pop(), g2.push(ft(r4.body)), b2.length < p2.length + 1 && b2.push([]);
                break;
              }
              if ("\\\\" !== o3) throw new t2("Expected & or \\\\ or \\cr or " + h2, e3.nextToken);
              {
                let t3;
                e3.consume(), " " !== e3.gullet.future().text && (t3 = e3.parseSizeGroup(true)), f2.push(t3 ? t3.value : null), v2(), g2.push(ft(r4.body)), b2.push(dt(e3)), m2 = [], p2.push(m2), y2();
              }
            }
          }
          return e3.gullet.endGroup(), e3.gullet.endGroup(), { type: "array", mode: e3.mode, body: p2, cols: r3, rowGaps: f2, hLinesBeforeRow: b2, envClasses: n3, autoTag: o2, scriptLevel: d2, tags: x2, labels: g2, leqno: l2, arraystretch: c2, arraycolsep: u2 };
        }
        function xt(e3) {
          return "d" === e3.slice(0, 1) ? "display" : "text";
        }
        const yt = { c: "center ", l: "left ", r: "right " }, vt = (e3) => {
          const t3 = new k("mtd", []);
          return t3.style = { padding: "0", width: "50%" }, e3.envClasses.includes("multline") && (t3.style.width = "7.5%"), t3;
        }, wt = function(e3, t3) {
          const r3 = [], n3 = e3.body.length, o2 = e3.hLinesBeforeRow, a2 = e3.tags && e3.tags.some(((e4) => e4));
          for (let i3 = 0; i3 < n3; i3++) {
            const s3 = e3.body[i3], l3 = [], c2 = "text" === e3.scriptLevel ? Ve : "script" === e3.scriptLevel ? Xe : We;
            for (let r4 = 0; r4 < s3.length; r4++) {
              const o3 = new k("mtd", [fe(s3[r4], t3.withLevel(c2))]);
              if (e3.envClasses.includes("multline")) {
                const e4 = 0 === i3 ? "left" : i3 === n3 - 1 ? "right" : "center";
                "center" !== e4 && o3.classes.push("tml-" + e4);
              }
              l3.push(o3);
            }
            const u2 = e3.body[0].length;
            for (let e4 = 0; e4 < u2 - s3.length; e4++) l3.push(new k("mtd", [], [], t3));
            if (a2) {
              const r4 = e3.tags[i3];
              let n4;
              true === r4 ? n4 = new k("mtext", [new E(["tml-eqn"])]) : false === r4 ? n4 = new k("mtext", [], []) : (n4 = pe(r4[0].body, t3.withLevel(c2), true), n4 = le(n4), n4.classes = ["tml-tag"]), n4 && (l3.unshift(vt(e3)), l3.push(vt(e3)), e3.leqno ? l3[0].children.push(n4) : l3[l3.length - 1].children.push(n4));
            }
            const d2 = new k("mtr", l3, []), h2 = e3.labels.shift();
            h2 && e3.tags && e3.tags[i3] && (d2.setAttribute("id", h2), Array.isArray(e3.tags[i3]) && d2.classes.push("tml-tageqn")), 0 === i3 && o2[0].length > 0 && (2 === o2[0].length ? d2.children.forEach(((e4) => {
              e4.style.borderTop = "0.15em double";
            })) : d2.children.forEach(((e4) => {
              e4.style.borderTop = o2[0][0] ? "0.06em dashed" : "0.06em solid";
            }))), o2[i3 + 1].length > 0 && (2 === o2[i3 + 1].length ? d2.children.forEach(((e4) => {
              e4.style.borderBottom = "0.15em double";
            })) : d2.children.forEach(((e4) => {
              e4.style.borderBottom = o2[i3 + 1][0] ? "0.06em dashed" : "0.06em solid";
            })));
            let m2 = true;
            for (let e4 = 0; e4 < d2.children.length; e4++) {
              const t4 = d2.children[e4].children[0];
              if (!t4 || "mpadded" !== t4.type || "0px" !== t4.attributes.height) {
                m2 = false;
                break;
              }
            }
            if (m2) for (let e4 = 0; e4 < d2.children.length; e4++) d2.children[e4].style.display = "block", d2.children[e4].style.height = "0", d2.children[e4].style.paddingTop = "0", d2.children[e4].style.paddingBottom = "0";
            r3.push(d2);
          }
          if (e3.arraystretch && 1 !== e3.arraystretch) {
            const t4 = String(1.4 * e3.arraystretch - 0.8) + "ex";
            for (let e4 = 0; e4 < r3.length; e4++) for (let n4 = 0; n4 < r3[e4].children.length; n4++) r3[e4].children[n4].style.paddingTop = t4, r3[e4].children[n4].style.paddingBottom = t4;
          }
          let i2, s2;
          if (e3.envClasses.length > 0 && (i2 = e3.envClasses.includes("abut") || e3.envClasses.includes("cases") ? "0" : e3.envClasses.includes("small") ? "0.1389" : e3.envClasses.includes("cd") ? "0.25" : "0.4", s2 = "em"), e3.arraycolsep) {
            const r4 = qe(e3.arraycolsep, t3);
            i2 = r4.number.toFixed(4), s2 = r4.unit;
          }
          if (i2) {
            const t4 = 0 === r3.length ? 0 : r3[0].children.length, n4 = (r4, n5) => 0 === r4 && 0 === n5 || r4 === t4 - 1 && 1 === n5 ? "0" : "align" !== e3.envClasses[0] ? i2 : 1 === n5 ? "0" : a2 ? r4 % 2 ? "1" : "0" : r4 % 2 ? "0" : "1";
            for (let e4 = 0; e4 < r3.length; e4++) for (let t5 = 0; t5 < r3[e4].children.length; t5++) r3[e4].children[t5].style.paddingLeft = `${n4(t5, 0)}${s2}`, r3[e4].children[t5].style.paddingRight = `${n4(t5, 1)}${s2}`;
          }
          if (0 === e3.envClasses.length) for (let e4 = 0; e4 < r3.length; e4++) r3[e4].children[0].style.paddingLeft = "0em", r3[e4].children.length === r3[0].children.length && (r3[e4].children[r3[e4].children.length - 1].style.paddingRight = "0em");
          if (e3.envClasses.length > 0) {
            const t4 = e3.envClasses.includes("align") || e3.envClasses.includes("alignat");
            for (let n4 = 0; n4 < r3.length; n4++) {
              const o3 = r3[n4];
              if (t4) {
                for (let e4 = 0; e4 < o3.children.length; e4++) o3.children[e4].classes = ["tml-" + (e4 % 2 ? "left" : "right")];
                if (a2) {
                  const t5 = e3.leqno ? 0 : o3.children.length - 1;
                  o3.children[t5].classes = [];
                }
              }
              if (o3.children.length > 1 && e3.envClasses.includes("cases") && (o3.children[1].style.paddingLeft = "1em"), e3.envClasses.includes("cases") || e3.envClasses.includes("subarray")) for (const e4 of o3.children) e4.classes.push("tml-left");
            }
          }
          let l2 = new k("mtable", r3);
          if (e3.envClasses.length > 0 && (e3.envClasses.includes("jot") ? l2.classes.push("tml-jot") : e3.envClasses.includes("small") && l2.classes.push("tml-small")), "display" === e3.scriptLevel && l2.setAttribute("displaystyle", "true"), (e3.autoTag || e3.envClasses.includes("multline")) && (l2.style.width = "100%"), e3.cols && e3.cols.length > 0) {
            const t4 = e3.cols;
            let r4 = false, n4 = 0, o3 = t4.length;
            for (; "separator" === t4[n4].type; ) n4 += 1;
            for (; "separator" === t4[o3 - 1].type; ) o3 -= 1;
            if ("separator" === t4[0].type) {
              const e4 = "separator" === t4[1].type ? "0.15em double" : "|" === t4[0].separator ? "0.06em solid " : "0.06em dashed ";
              for (const t5 of l2.children) t5.children[0].style.borderLeft = e4;
            }
            let i3 = a2 ? 0 : -1;
            for (let e4 = n4; e4 < o3; e4++) if ("align" === t4[e4].type) {
              const n5 = yt[t4[e4].align];
              i3 += 1;
              for (const e5 of l2.children) "center" !== n5.trim() && i3 < e5.children.length && (e5.children[i3].classes = ["tml-" + n5.trim()]);
              r4 = true;
            } else if ("separator" === t4[e4].type) {
              if (r4) {
                const r5 = "separator" === t4[e4 + 1].type ? "0.15em double" : "|" === t4[e4].separator ? "0.06em solid" : "0.06em dashed";
                for (const e5 of l2.children) i3 < e5.children.length && (e5.children[i3].style.borderRight = r5);
              }
              r4 = false;
            }
            if ("separator" === t4[t4.length - 1].type) {
              const e4 = "separator" === t4[t4.length - 2].type ? "0.15em double" : "|" === t4[t4.length - 1].separator ? "0.06em solid" : "0.06em dashed";
              for (const t5 of l2.children) t5.children[t5.children.length - 1].style.borderRight = e4, t5.children[t5.children.length - 1].style.paddingRight = "0.4em";
            }
          }
          return e3.envClasses.includes("small") && (l2 = new k("mstyle", [l2]), l2.setAttribute("scriptlevel", "1")), l2;
        }, At = function(e3, r3) {
          -1 === e3.envName.indexOf("ed") && ht(e3);
          const n3 = "split" === e3.envName, o2 = [], a2 = bt(e3.parser, { cols: o2, emptySingleRow: true, autoTag: n3 ? void 0 : gt(e3.envName), envClasses: ["abut", "jot"], maxNumCols: "split" === e3.envName ? 2 : void 0, leqno: e3.parser.settings.leqno }, "display");
          let i2, s2 = 0;
          const l2 = e3.envName.indexOf("at") > -1;
          if (r3[0] && l2) {
            let e4 = "";
            for (let t3 = 0; t3 < r3[0].body.length; t3++) {
              e4 += $e(r3[0].body[t3], "textord").text;
            }
            if (isNaN(e4)) throw new t2("The alignat enviroment requires a numeric first argument.");
            i2 = Number(e4), s2 = 2 * i2;
          }
          a2.body.forEach((function(e4) {
            if (l2) {
              const r4 = e4.length / 2;
              if (i2 < r4) throw new t2(`Too many math in a row: expected ${i2}, but got ${r4}`, e4[0]);
            } else s2 < e4.length && (s2 = e4.length);
          }));
          for (let e4 = 0; e4 < s2; ++e4) {
            let t3 = "r";
            e4 % 2 == 1 && (t3 = "l"), o2[e4] = { type: "align", align: t3 };
          }
          return "split" === e3.envName || (l2 ? a2.envClasses.push("alignat") : a2.envClasses[0] = "align"), a2;
        };
        Be({ type: "array", names: ["array", "darray"], props: { numArgs: 1 }, handler(e3, r3) {
          const n3 = (Re(r3[0]) ? [r3[0]] : $e(r3[0], "ordgroup").body).map((function(e4) {
            const r4 = Ie(e4).text;
            if (-1 !== "lcr".indexOf(r4)) return { type: "align", align: r4 };
            if ("|" === r4) return { type: "separator", separator: "|" };
            if (":" === r4) return { type: "separator", separator: ":" };
            throw new t2("Unknown column alignment: " + r4, e4);
          })), [o2, a2] = pt(e3.parser.gullet.macros), i2 = { cols: n3, envClasses: ["array"], maxNumCols: n3.length, arraystretch: o2, arraycolsep: a2 };
          return bt(e3.parser, i2, xt(e3.envName));
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"], props: { numArgs: 0 }, handler(e3) {
          const r3 = { matrix: null, pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["\\{", "\\}"], vmatrix: ["|", "|"], Vmatrix: ["\\Vert", "\\Vert"] }[e3.envName.replace("*", "")];
          let n3 = "c";
          const o2 = { envClasses: [], cols: [] };
          if ("*" === e3.envName.charAt(e3.envName.length - 1)) {
            const r4 = e3.parser;
            if (r4.consumeSpaces(), "[" === r4.fetch().text) {
              if (r4.consume(), r4.consumeSpaces(), n3 = r4.fetch().text, -1 === "lcr".indexOf(n3)) throw new t2("Expected l or c or r", r4.nextToken);
              r4.consume(), r4.consumeSpaces(), r4.expect("]"), r4.consume(), o2.cols = [];
            }
          }
          const a2 = bt(e3.parser, o2, "text");
          a2.cols = a2.body.length > 0 ? new Array(a2.body[0].length).fill({ type: "align", align: n3 }) : [];
          const [i2, s2] = pt(e3.parser.gullet.macros);
          return a2.arraystretch = i2, !s2 || 6 === s2 && "pt" === s2 || (a2.arraycolsep = s2), r3 ? { type: "leftright", mode: e3.mode, body: [a2], left: r3[0], right: r3[1], rightColor: void 0 } : a2;
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["bordermatrix"], props: { numArgs: 0 }, handler(e3) {
          const t3 = bt(e3.parser, { cols: [], envClasses: ["bordermatrix"] }, "text");
          return t3.cols = t3.body.length > 0 ? new Array(t3.body[0].length).fill({ type: "align", align: "c" }) : [], t3.envClasses = [], t3.arraystretch = 1, "matrix" === e3.envName ? t3 : ((e4, t4) => {
            const r3 = e4.body;
            r3[0].shift();
            const n3 = new Array(r3.length - 1).fill().map((() => []));
            for (let e5 = 1; e5 < r3.length; e5++) {
              n3[e5 - 1].push(r3[e5].shift());
              const t5 = [];
              for (let n4 = 0; n4 < r3[e5].length; n4++) t5.push(r3[e5][n4]);
              n3[e5 - 1].push(He(t5, "vphantom"));
            }
            const o2 = new Array(r3.length).fill().map((() => []));
            for (let e5 = 0; e5 < r3[0].length; e5++) o2[0].push(r3[0][e5]);
            for (let e5 = 1; e5 < r3.length; e5++) for (let t5 = 0; t5 < r3[0].length; t5++) o2[e5].push(He(r3[e5][t5].body, "hphantom"));
            for (let e5 = 0; e5 < r3[0].length; e5++) r3[0][e5] = He(r3[0][e5].body, "hphantom");
            const a2 = { type: "array", mode: "math", body: n3, cols: [{ type: "align", align: "c" }], rowGaps: new Array(n3.length - 1).fill(null), hLinesBeforeRow: new Array(n3.length + 1).fill().map((() => [])), envClasses: [], scriptLevel: "text", arraystretch: 1, labels: new Array(n3.length).fill(""), arraycolsep: { number: 0.04, unit: "em" } }, i2 = { type: "styling", mode: "math", scriptLevel: "text", body: [{ type: "array", mode: "math", body: o2, cols: new Array(o2.length).fill({ type: "align", align: "c" }), rowGaps: new Array(o2.length - 1).fill(null), hLinesBeforeRow: new Array(o2.length + 1).fill().map((() => [])), envClasses: [], scriptLevel: "text", arraystretch: 1, labels: new Array(o2.length).fill(""), arraycolsep: null }] }, s2 = { type: "leftright", mode: "math", body: [e4], left: t4 ? t4[0] : "(", right: t4 ? t4[1] : ")", rightColor: void 0 };
            return ze([a2, { type: "supsub", mode: "math", stack: true, base: { type: "op", mode: "math", limits: true, alwaysHandleSupSub: true, parentIsSupSub: true, symbol: false, suppressBaseShift: true, body: [s2] }, sup: i2, sub: null }]);
          })(t3, e3.delimiters);
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["smallmatrix"], props: { numArgs: 0 }, handler: (e3) => bt(e3.parser, { envClasses: ["small"] }, "script"), mathmlBuilder: wt }), Be({ type: "array", names: ["subarray"], props: { numArgs: 1 }, handler(e3, r3) {
          const n3 = (Re(r3[0]) ? [r3[0]] : $e(r3[0], "ordgroup").body).map((function(e4) {
            const r4 = Ie(e4).text;
            if (-1 !== "lc".indexOf(r4)) return { type: "align", align: r4 };
            throw new t2("Unknown column alignment: " + r4, e4);
          }));
          if (n3.length > 1) throw new t2("{subarray} can contain only one column");
          let o2 = { cols: n3, envClasses: ["small"] };
          if (o2 = bt(e3.parser, o2, "script"), o2.body.length > 0 && o2.body[0].length > 1) throw new t2("{subarray} can contain only one column");
          return o2;
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["cases", "dcases", "rcases", "drcases"], props: { numArgs: 0 }, handler(e3) {
          const t3 = bt(e3.parser, { cols: [], envClasses: ["cases"] }, xt(e3.envName));
          return { type: "leftright", mode: e3.mode, body: [t3], left: e3.envName.indexOf("r") > -1 ? "." : "\\{", right: e3.envName.indexOf("r") > -1 ? "\\}" : ".", rightColor: void 0 };
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["align", "align*", "aligned", "split"], props: { numArgs: 0 }, handler: At, mathmlBuilder: wt }), Be({ type: "array", names: ["alignat", "alignat*", "alignedat"], props: { numArgs: 1 }, handler: At, mathmlBuilder: wt }), Be({ type: "array", names: ["gathered", "gather", "gather*"], props: { numArgs: 0 }, handler(e3) {
          "gathered" !== e3.envName && ht(e3);
          const t3 = { cols: [], envClasses: ["abut", "jot"], autoTag: gt(e3.envName), emptySingleRow: true, leqno: e3.parser.settings.leqno };
          return bt(e3.parser, t3, "display");
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["equation", "equation*"], props: { numArgs: 0 }, handler(e3) {
          ht(e3);
          const t3 = { autoTag: gt(e3.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1, envClasses: ["align"], leqno: e3.parser.settings.leqno };
          return bt(e3.parser, t3, "display");
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["multline", "multline*"], props: { numArgs: 0 }, handler(e3) {
          ht(e3);
          const t3 = { autoTag: "multline" === e3.envName, maxNumCols: 1, envClasses: ["jot", "multline"], leqno: e3.parser.settings.leqno };
          return bt(e3.parser, t3, "display");
        }, mathmlBuilder: wt }), Be({ type: "array", names: ["CD"], props: { numArgs: 0 }, handler: (e3) => (ht(e3), (function(e4) {
          const r3 = [];
          for (e4.gullet.beginGroup(), e4.gullet.macros.set("\\cr", "\\\\\\relax"), e4.gullet.beginGroup(); ; ) {
            r3.push(e4.parseExpression(false, "\\\\")), e4.gullet.endGroup(), e4.gullet.beginGroup();
            const n4 = e4.fetch().text;
            if ("&" !== n4 && "\\\\" !== n4) {
              if ("\\end" === n4) {
                0 === r3[r3.length - 1].length && r3.pop();
                break;
              }
              throw new t2("Expected \\\\ or \\cr or \\end", e4.nextToken);
            }
            e4.consume();
          }
          let n3 = [];
          const o2 = [n3];
          for (let s2 = 0; s2 < r3.length; s2++) {
            const l2 = r3[s2];
            let c2 = { type: "styling", body: [], mode: "math", scriptLevel: "display" };
            for (let r4 = 0; r4 < l2.length; r4++) if (Fe(l2[r4])) {
              n3.push(c2), r4 += 1;
              const o3 = Ie(l2[r4]).text, s3 = new Array(2);
              if (s3[0] = { type: "ordgroup", mode: "math", body: [] }, s3[1] = { type: "ordgroup", mode: "math", body: [] }, "=|.".indexOf(o3) > -1) ;
              else {
                if (!("<>AV".indexOf(o3) > -1)) throw new t2('Expected one of "<>AV=|." after @.');
                for (let e5 = 0; e5 < 2; e5++) {
                  let n4 = true;
                  for (let c3 = r4 + 1; c3 < l2.length; c3++) {
                    if (i2 = o3, ("mathord" === (a2 = l2[c3]).type || "atom" === a2.type) && a2.text === i2) {
                      n4 = false, r4 = c3;
                      break;
                    }
                    if (Fe(l2[c3])) throw new t2("Missing a " + o3 + " character to complete a CD arrow.", l2[c3]);
                    s3[e5].body.push(l2[c3]);
                  }
                  if (n4) throw new t2("Missing a " + o3 + " character to complete a CD arrow.", l2[r4]);
                }
              }
              const u2 = je(o3, s3, e4);
              n3.push(u2), c2 = { type: "styling", body: [], mode: "math", scriptLevel: "display" };
            } else c2.body.push(l2[r4]);
            s2 % 2 == 0 ? n3.push(c2) : n3.shift(), n3 = [], o2.push(n3);
          }
          var a2, i2;
          return o2.pop(), e4.gullet.endGroup(), e4.gullet.endGroup(), { type: "array", mode: "math", body: o2, tags: null, labels: new Array(o2.length + 1).fill(""), envClasses: ["jot", "cd"], cols: [], hLinesBeforeRow: new Array(o2.length + 1).fill([]) };
        })(e3.parser)), mathmlBuilder: wt }), f({ type: "text", names: ["\\hline", "\\hdashline"], props: { numArgs: 0, allowedInText: true, allowedInMath: true }, handler(e3, r3) {
          throw new t2(`${e3.funcName} valid only within array environment`);
        } });
        const Ct = De;
        f({ type: "bordermatrix", names: ["\\bordermatrix", "\\matrix"], props: { numArgs: 0, numOptionalArgs: 1 }, handler: ({ parser: e3, funcName: t3 }, r3, n3) => {
          let o2 = ["(", ")"];
          if ("\\bordermatrix" === t3 && n3[0] && n3[0].body) {
            const e4 = n3[0].body;
            2 === e4.length && "atom" === e4[0].type && "atom" === e4[1].type && "open" === e4[0].family && "close" === e4[1].family && (o2 = [e4[0].text, e4[1].text]);
          }
          e3.consumeSpaces(), e3.consume();
          const a2 = Ct.bordermatrix, i2 = { mode: e3.mode, envName: t3.slice(1), delimiters: o2, parser: e3 }, s2 = a2.handler(i2);
          return e3.expect("}", true), s2;
        } }), f({ type: "cancelto", names: ["\\cancelto"], props: { numArgs: 2 }, handler({ parser: e3 }, t3) {
          const r3 = t3[0], n3 = t3[1];
          return { type: "cancelto", mode: e3.mode, body: n3, to: r3, isCharacterBox: c(n3) };
        }, mathmlBuilder(e3, t3) {
          const r3 = new k("mrow", [fe(e3.body, t3)], ["ff-narrow"]), n3 = new k("mphantom", [fe(e3.body, t3)]), o2 = new k("mrow", [n3], ["tml-cancelto"]);
          e3.isCharacterBox && d.indexOf(e3.body.body[0].text) > -1 && (o2.style.left = "0.1em", o2.style.width = "90%");
          const a2 = new k("mrow", [r3, o2], ["menclose"]);
          if (!e3.isCharacterBox || /[f\u222b\u2211]/.test(e3.body.body[0].text)) n3.style.paddingRight = "0.2em";
          else {
            n3.style.padding = "0.5ex 0.1em 0 0";
            const e4 = new k("mspace", []);
            e4.setAttribute("height", "0.85em"), r3.children.push(e4);
          }
          let i2;
          if (e3.isCharacterBox) i2 = new k("mspace", []), i2.setAttribute("height", "1em");
          else {
            const r4 = fe(e3.body, t3), n4 = new k("mpadded", [r4]);
            n4.setAttribute("width", "0.1px"), i2 = new k("mphantom", [n4]);
          }
          const s2 = fe(e3.to, t3), l2 = new k("mpadded", [s2]);
          if (!e3.isCharacterBox || /[f\u222b\u2211]/.test(e3.body.body[0].text)) {
            const e4 = new k("mspace", []);
            e4.setAttribute("width", "0.2em"), l2.children.unshift(e4);
          }
          l2.setAttribute("width", "0.1px");
          const c2 = new k("mover", [i2, l2]), u2 = new k("mrow", [], ["ff-nudge-left"]);
          return q([ce([a2, c2]), u2]);
        } }), f({ type: "textord", names: ["\\@char"], props: { numArgs: 1, allowedInText: true }, handler({ parser: e3, token: r3 }, n3) {
          const o2 = $e(n3[0], "ordgroup").body;
          let a2 = "";
          for (let e4 = 0; e4 < o2.length; e4++) {
            a2 += $e(o2[e4], "textord").text;
          }
          const i2 = parseInt(a2);
          if (isNaN(i2)) throw new t2(`\\@char has non-numeric argument ${a2}`, r3);
          return { type: "textord", mode: e3.mode, text: String.fromCodePoint(i2) };
        } });
        const Et = /^(#[a-f0-9]{3}|#?[a-f0-9]{6})$/i, St = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i, _t = /^ *\d{1,3} *(?:, *\d{1,3} *){2}$/, Tt = /^ *[10](?:\.\d*)? *(?:, *[10](?:\.\d*)? *){2}$/, qt = /^[a-f0-9]{6}$/i, kt = (e3) => {
          let t3 = e3.toString(16);
          return 1 === t3.length && (t3 = "0" + t3), t3;
        }, Nt = JSON.parse('{\n  "Apricot": "#ffb484",\n  "Aquamarine": "#08b4bc",\n  "Bittersweet": "#c84c14",\n  "blue": "#0000FF",\n  "Blue": "#303494",\n  "BlueGreen": "#08b4bc",\n  "BlueViolet": "#503c94",\n  "BrickRed": "#b8341c",\n  "brown": "#BF8040",\n  "Brown": "#802404",\n  "BurntOrange": "#f8941c",\n  "CadetBlue": "#78749c",\n  "CarnationPink": "#f884b4",\n  "Cerulean": "#08a4e4",\n  "CornflowerBlue": "#40ace4",\n  "cyan": "#00FFFF",\n  "Cyan": "#08acec",\n  "Dandelion": "#ffbc44",\n  "darkgray": "#404040",\n  "DarkOrchid": "#a8548c",\n  "Emerald": "#08ac9c",\n  "ForestGreen": "#089c54",\n  "Fuchsia": "#90348c",\n  "Goldenrod": "#ffdc44",\n  "gray": "#808080",\n  "Gray": "#98949c",\n  "green": "#00FF00",\n  "Green": "#08a44c",\n  "GreenYellow": "#e0e474",\n  "JungleGreen": "#08ac9c",\n  "Lavender": "#f89cc4",\n  "lightgray": "#c0c0c0",\n  "lime": "#BFFF00",\n  "LimeGreen": "#90c43c",\n  "magenta": "#FF00FF",\n  "Magenta": "#f0048c",\n  "Mahogany": "#b0341c",\n  "Maroon": "#b03434",\n  "Melon": "#f89c7c",\n  "MidnightBlue": "#086494",\n  "Mulberry": "#b03c94",\n  "NavyBlue": "#086cbc",\n  "olive": "#7F7F00",\n  "OliveGreen": "#407c34",\n  "orange": "#FF8000",\n  "Orange": "#f8843c",\n  "OrangeRed": "#f0145c",\n  "Orchid": "#b074ac",\n  "Peach": "#f8945c",\n  "Periwinkle": "#8074bc",\n  "PineGreen": "#088c74",\n  "pink": "#ff7f7f",\n  "Plum": "#98248c",\n  "ProcessBlue": "#08b4ec",\n  "purple": "#BF0040",\n  "Purple": "#a0449c",\n  "RawSienna": "#983c04",\n  "red": "#ff0000",\n  "Red": "#f01c24",\n  "RedOrange": "#f86434",\n  "RedViolet": "#a0246c",\n  "Rhodamine": "#f0549c",\n  "Royallue": "#0874bc",\n  "RoyalPurple": "#683c9c",\n  "RubineRed": "#f0047c",\n  "Salmon": "#f8948c",\n  "SeaGreen": "#30bc9c",\n  "Sepia": "#701404",\n  "SkyBlue": "#48c4dc",\n  "SpringGreen": "#c8dc64",\n  "Tan": "#e09c74",\n  "teal": "#007F7F",\n  "TealBlue": "#08acb4",\n  "Thistle": "#d884b4",\n  "Turquoise": "#08b4cc",\n  "violet": "#800080",\n  "Violet": "#60449c",\n  "VioletRed": "#f054a4",\n  "WildStrawberry": "#f0246c",\n  "yellow": "#FFFF00",\n  "Yellow": "#fff404",\n  "YellowGreen": "#98cc6c",\n  "YellowOrange": "#ffa41c"\n}'), Lt = (e3, r3) => {
          let n3 = "";
          if ("HTML" === e3) {
            if (!Et.test(r3)) throw new t2("Invalid HTML input.");
            n3 = r3;
          } else if ("RGB" === e3) {
            if (!_t.test(r3)) throw new t2("Invalid RGB input.");
            r3.split(",").map(((e4) => {
              n3 += kt(Number(e4.trim()));
            }));
          } else {
            if (!Tt.test(r3)) throw new t2("Invalid rbg input.");
            r3.split(",").map(((e4) => {
              const r4 = Number(e4.trim());
              if (r4 > 1) throw new t2("Color rgb input must be < 1.");
              n3 += kt(Number((255 * r4).toFixed(0)));
            }));
          }
          return "#" !== n3.charAt(0) && (n3 = "#" + n3), n3;
        }, Ot = (e3, r3, n3) => {
          const o2 = `\\\\color@${e3}`;
          if (!St.exec(e3)) throw new t2("Invalid color: '" + e3 + "'", n3);
          return qt.test(e3) ? "#" + e3 : ("#" === e3.charAt(0) || (r3.has(o2) ? e3 = r3.get(o2).tokens[0].text : Nt[e3] && (e3 = Nt[e3])), e3);
        }, Mt = (e3, t3) => {
          let r3 = me(e3.body, t3.withColor(e3.color));
          return 0 === r3.length && r3.push(new k("mrow")), r3 = r3.map(((t4) => (t4.style.color = e3.color, t4))), q(r3);
        };
        f({ type: "color", names: ["\\textcolor"], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, argTypes: ["raw", "raw", "original"] }, handler({ parser: e3, token: t3 }, r3, n3) {
          const o2 = n3[0] && $e(n3[0], "raw").string;
          let a2 = "";
          if (o2) {
            const e4 = $e(r3[0], "raw").string;
            a2 = Lt(o2, e4);
          } else a2 = Ot($e(r3[0], "raw").string, e3.gullet.macros, t3);
          const i2 = r3[1];
          return { type: "color", mode: e3.mode, color: a2, isTextColor: true, body: x(i2) };
        }, mathmlBuilder: Mt }), f({ type: "color", names: ["\\color"], props: { numArgs: 1, numOptionalArgs: 1, allowedInText: true, argTypes: ["raw", "raw"] }, handler({ parser: e3, breakOnTokenText: t3, token: r3 }, n3, o2) {
          const a2 = o2[0] && $e(o2[0], "raw").string;
          let i2 = "";
          if (a2) {
            const e4 = $e(n3[0], "raw").string;
            i2 = Lt(a2, e4);
          } else i2 = Ot($e(n3[0], "raw").string, e3.gullet.macros, r3);
          const s2 = e3.parseExpression(true, t3, true);
          return { type: "color", mode: e3.mode, color: i2, isTextColor: false, body: s2 };
        }, mathmlBuilder: Mt }), f({ type: "color", names: ["\\definecolor"], props: { numArgs: 3, allowedInText: true, argTypes: ["raw", "raw", "raw"] }, handler({ parser: e3, funcName: r3, token: n3 }, o2) {
          const a2 = $e(o2[0], "raw").string;
          if (!/^[A-Za-z]+$/.test(a2)) throw new t2("Color name must be latin letters.", n3);
          const i2 = $e(o2[1], "raw").string;
          if (!["HTML", "RGB", "rgb"].includes(i2)) throw new t2("Color model must be HTML, RGB, or rgb.", n3);
          const s2 = $e(o2[2], "raw").string, l2 = Lt(i2, s2);
          return e3.gullet.macros.set(`\\\\color@${a2}`, { tokens: [{ text: l2 }], numArgs: 0 }), { type: "internal", mode: e3.mode };
        } }), f({ type: "cr", names: ["\\\\"], props: { numArgs: 0, numOptionalArgs: 0, allowedInText: true }, handler({ parser: e3 }, t3, r3) {
          const n3 = "[" === e3.gullet.future().text ? e3.parseSizeGroup(true) : null, o2 = !e3.settings.displayMode;
          return { type: "cr", mode: e3.mode, newLine: o2, size: n3 && $e(n3, "size").value };
        }, mathmlBuilder(e3, t3) {
          const r3 = new k("mo");
          if (e3.newLine && (r3.setAttribute("linebreak", "newline"), e3.size)) {
            const n3 = qe(e3.size, t3);
            r3.setAttribute("height", n3.number + n3.unit);
          }
          return r3;
        } });
        const Dt = { "\\global": "\\global", "\\long": "\\\\globallong", "\\\\globallong": "\\\\globallong", "\\def": "\\gdef", "\\gdef": "\\gdef", "\\edef": "\\xdef", "\\xdef": "\\xdef", "\\let": "\\\\globallet", "\\futurelet": "\\\\globalfuture" }, Bt = (e3) => {
          const r3 = e3.text;
          if (/^(?:[\\{}$&#^_]|EOF)$/.test(r3)) throw new t2("Expected a control sequence", e3);
          return r3;
        }, $t = (e3, t3, r3, n3) => {
          let o2 = e3.gullet.macros.get(r3.text);
          null == o2 && (r3.noexpand = true, o2 = { tokens: [r3], numArgs: 0, unexpandable: !e3.gullet.isExpandable(r3.text) }), e3.gullet.macros.set(t3, o2, n3);
        };
        f({ type: "internal", names: ["\\global", "\\long", "\\\\globallong"], props: { numArgs: 0, allowedInText: true }, handler({ parser: e3, funcName: r3 }) {
          e3.consumeSpaces();
          const n3 = e3.fetch();
          if (Dt[n3.text]) return "\\global" !== r3 && "\\\\globallong" !== r3 || (n3.text = Dt[n3.text]), $e(e3.parseFunction(), "internal");
          throw new t2("Invalid token after macro prefix", n3);
        } }), f({ type: "internal", names: ["\\def", "\\gdef", "\\edef", "\\xdef"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler({ parser: e3, funcName: r3 }) {
          let n3 = e3.gullet.popToken();
          const o2 = n3.text;
          if (/^(?:[\\{}$&#^_]|EOF)$/.test(o2)) throw new t2("Expected a control sequence", n3);
          let a2, i2 = 0;
          const s2 = [[]];
          for (; "{" !== e3.gullet.future().text; ) if (n3 = e3.gullet.popToken(), "#" === n3.text) {
            if ("{" === e3.gullet.future().text) {
              a2 = e3.gullet.future(), s2[i2].push("{");
              break;
            }
            if (n3 = e3.gullet.popToken(), !/^[1-9]$/.test(n3.text)) throw new t2(`Invalid argument number "${n3.text}"`);
            if (parseInt(n3.text) !== i2 + 1) throw new t2(`Argument number "${n3.text}" out of order`);
            i2++, s2.push([]);
          } else {
            if ("EOF" === n3.text) throw new t2("Expected a macro definition");
            s2[i2].push(n3.text);
          }
          let { tokens: l2 } = e3.gullet.consumeArg();
          if (a2 && l2.unshift(a2), "\\edef" === r3 || "\\xdef" === r3) {
            if (l2 = e3.gullet.expandTokens(l2), l2.length > e3.gullet.settings.maxExpand) throw new t2("Too many expansions in an " + r3);
            l2.reverse();
          }
          return e3.gullet.macros.set(o2, { tokens: l2, numArgs: i2, delimiters: s2 }, r3 === Dt[r3]), { type: "internal", mode: e3.mode };
        } }), f({ type: "internal", names: ["\\let", "\\\\globallet"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler({ parser: e3, funcName: t3 }) {
          const r3 = Bt(e3.gullet.popToken());
          e3.gullet.consumeSpaces();
          const n3 = ((e4) => {
            let t4 = e4.gullet.popToken();
            return "=" === t4.text && (t4 = e4.gullet.popToken(), " " === t4.text && (t4 = e4.gullet.popToken())), t4;
          })(e3);
          return $t(e3, r3, n3, "\\\\globallet" === t3), { type: "internal", mode: e3.mode };
        } }), f({ type: "internal", names: ["\\futurelet", "\\\\globalfuture"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler({ parser: e3, funcName: t3 }) {
          const r3 = Bt(e3.gullet.popToken()), n3 = e3.gullet.popToken(), o2 = e3.gullet.popToken();
          return $t(e3, r3, o2, "\\\\globalfuture" === t3), e3.gullet.pushToken(o2), e3.gullet.pushToken(n3), { type: "internal", mode: e3.mode };
        } }), f({ type: "internal", names: ["\\newcommand", "\\renewcommand", "\\providecommand"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler({ parser: e3, funcName: r3 }) {
          let n3 = "";
          const o2 = e3.gullet.popToken();
          "{" === o2.text ? (n3 = Bt(e3.gullet.popToken()), e3.gullet.popToken()) : n3 = Bt(o2);
          const a2 = e3.gullet.isDefined(n3);
          if (a2 && "\\newcommand" === r3) throw new t2(`\\newcommand{${n3}} attempting to redefine ${n3}; use \\renewcommand`);
          if (!a2 && "\\renewcommand" === r3) throw new t2(`\\renewcommand{${n3}} when command ${n3} does not yet exist; use \\newcommand`);
          let i2 = 0;
          if ("[" === e3.gullet.future().text) {
            let r4 = e3.gullet.popToken();
            if (r4 = e3.gullet.popToken(), !/^[0-9]$/.test(r4.text)) throw new t2(`Invalid number of arguments: "${r4.text}"`);
            if (i2 = parseInt(r4.text), r4 = e3.gullet.popToken(), "]" !== r4.text) throw new t2(`Invalid argument "${r4.text}"`);
          }
          const { tokens: s2 } = e3.gullet.consumeArg();
          return "\\providecommand" === r3 && e3.gullet.macros.has(n3) || e3.gullet.macros.set(n3, { tokens: s2, numArgs: i2 }), { type: "internal", mode: e3.mode };
        } });
        const It = { "\\bigl": { mclass: "mopen", size: 1 }, "\\Bigl": { mclass: "mopen", size: 2 }, "\\biggl": { mclass: "mopen", size: 3 }, "\\Biggl": { mclass: "mopen", size: 4 }, "\\bigr": { mclass: "mclose", size: 1 }, "\\Bigr": { mclass: "mclose", size: 2 }, "\\biggr": { mclass: "mclose", size: 3 }, "\\Biggr": { mclass: "mclose", size: 4 }, "\\bigm": { mclass: "mrel", size: 1 }, "\\Bigm": { mclass: "mrel", size: 2 }, "\\biggm": { mclass: "mrel", size: 3 }, "\\Biggm": { mclass: "mrel", size: 4 }, "\\big": { mclass: "mord", size: 1 }, "\\Big": { mclass: "mord", size: 2 }, "\\bigg": { mclass: "mord", size: 3 }, "\\Bigg": { mclass: "mord", size: 4 } }, Rt = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\u2987", "\\llparenthesis", "\u2988", "\\rrparenthesis", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lAngle", "\u27EA", "\\rAngle", "\u27EB", "\\llangle", "\u2989", "\\rrangle", "\u298A", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "\\llbracket", "\\rrbracket", "\u27E6", "\u27E6", "\\lBrace", "\\rBrace", "\u2983", "\u2984", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\u2016", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."], Pt = ["}", "\\left", "\\middle", "\\right"], Ft = (e3) => e3.length > 0 && (Rt.includes(e3) || It[e3] || Pt.includes(e3)), jt = [0, 1.2, 1.8, 2.4, 3];
        function zt(e3, r3) {
          "ordgroup" === e3.type && 1 === e3.body.length && (e3 = e3.body[0]);
          const n3 = Re(e3);
          if (n3 && Rt.includes(n3.text)) return ["<", "\\lt"].includes(n3.text) && (n3.text = "\u27E8"), [">", "\\gt"].includes(n3.text) && (n3.text = "\u27E9"), n3;
          throw new t2(n3 ? `Invalid delimiter '${n3.text}' after '${r3.funcName}'` : `Invalid delimiter type '${e3.type}'`, e3);
        }
        const Ht = ["/", "\\", "\\backslash", "\\vert", "|"];
        f({ type: "delimsizing", names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (e3, t3) => {
          const r3 = zt(t3[0], e3), n3 = { type: "delimsizing", mode: e3.parser.mode, size: It[e3.funcName].size, mclass: It[e3.funcName].mclass, delim: r3.text }, o2 = e3.parser.fetch().text;
          return "^" !== o2 && "_" !== o2 ? n3 : { type: "ordgroup", mode: "math", body: [n3, { type: "ordgroup", mode: "math", body: [] }] };
        }, mathmlBuilder: (e3) => {
          const t3 = [];
          "." === e3.delim && (e3.delim = ""), t3.push(ie(e3.delim, e3.mode));
          const r3 = new k("mo", t3);
          return "mopen" === e3.mclass || "mclose" === e3.mclass ? r3.setAttribute("fence", "true") : r3.setAttribute("fence", "false"), (Ht.includes(e3.delim) || e3.delim.indexOf("arrow") > -1) && r3.setAttribute("stretchy", "true"), r3.setAttribute("symmetric", "true"), r3.setAttribute("minsize", jt[e3.size] + "em"), r3.setAttribute("maxsize", jt[e3.size] + "em"), r3;
        } }), f({ type: "leftright-right", names: ["\\right"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (e3, t3) => ({ type: "leftright-right", mode: e3.parser.mode, delim: zt(t3[0], e3).text }) }), f({ type: "leftright", names: ["\\left"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (e3, r3) => {
          const n3 = zt(r3[0], e3), o2 = e3.parser;
          ++o2.leftrightDepth;
          let a2 = o2.parseExpression(false, null, true), i2 = o2.fetch();
          for (; "\\middle" === i2.text; ) {
            o2.consume();
            const e4 = o2.fetch().text;
            if (!P.math[e4]) throw new t2(`Invalid delimiter '${e4}' after '\\middle'`);
            zt({ type: "atom", mode: "math", text: e4 }, { funcName: "\\middle" }), a2.push({ type: "middle", mode: "math", delim: e4 }), o2.consume(), a2 = a2.concat(o2.parseExpression(false, null, true)), i2 = o2.fetch();
          }
          --o2.leftrightDepth, o2.expect("\\right", false);
          const s2 = $e(o2.parseFunction(), "leftright-right");
          return { type: "leftright", mode: o2.mode, body: a2, left: n3.text, right: s2.delim };
        }, mathmlBuilder: (e3, t3) => {
          !(function(e4) {
            if (!e4.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
          })(e3);
          const r3 = me(e3.body, t3);
          "." === e3.left && (e3.left = "");
          const n3 = new k("mo", [ie(e3.left, e3.mode)]);
          n3.setAttribute("fence", "true"), n3.setAttribute("form", "prefix"), ("/" === e3.left || "\\" === e3.left || e3.left.indexOf("arrow") > -1) && n3.setAttribute("stretchy", "true"), r3.unshift(n3), "." === e3.right && (e3.right = "");
          const o2 = new k("mo", [ie(e3.right, e3.mode)]);
          if (o2.setAttribute("fence", "true"), o2.setAttribute("form", "postfix"), ("\u2216" === e3.right || e3.right.indexOf("arrow") > -1) && o2.setAttribute("stretchy", "true"), e3.body.length > 0) {
            const t4 = e3.body[e3.body.length - 1];
            "color" !== t4.type || t4.isTextColor || o2.setAttribute("mathcolor", t4.color);
          }
          return r3.push(o2), ce(r3);
        } }), f({ type: "middle", names: ["\\middle"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (e3, r3) => {
          const n3 = zt(r3[0], e3);
          if (!e3.parser.leftrightDepth) throw new t2("\\middle without preceding \\left", n3);
          return { type: "middle", mode: e3.parser.mode, delim: n3.text };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = ie(e3.delim, e3.mode), n3 = new k("mo", [r3]);
          return n3.setAttribute("fence", "true"), e3.delim.indexOf("arrow") > -1 && n3.setAttribute("stretchy", "true"), n3.setAttribute("form", "prefix"), n3.setAttribute("lspace", "0.05em"), n3.setAttribute("rspace", "0.05em"), n3;
        } });
        const Ut = ["\\boxed", "\\fcolorbox", "\\colorbox"], Gt = (e3, t3) => {
          const r3 = Ut.includes(e3.label) ? "mrow" : "menclose", n3 = new k(r3, [fe(e3.body, t3)]);
          switch (e3.label) {
            case "\\overline":
              n3.setAttribute("notation", "top"), n3.classes.push("tml-overline");
              break;
            case "\\underline":
              n3.setAttribute("notation", "bottom"), n3.classes.push("tml-underline");
              break;
            case "\\cancel":
              n3.setAttribute("notation", "updiagonalstrike"), n3.children.push(new k("mrow", [], ["tml-cancel", "upstrike"]));
              break;
            case "\\bcancel":
              n3.setAttribute("notation", "downdiagonalstrike"), n3.children.push(new k("mrow", [], ["tml-cancel", "downstrike"]));
              break;
            case "\\sout":
              n3.setAttribute("notation", "horizontalstrike"), n3.children.push(new k("mrow", [], ["tml-cancel", "sout"]));
              break;
            case "\\xcancel":
              n3.setAttribute("notation", "updiagonalstrike downdiagonalstrike"), n3.classes.push("tml-xcancel");
              break;
            case "\\longdiv":
              n3.setAttribute("notation", "longdiv"), n3.classes.push("longdiv-top"), n3.children.push(new k("mrow", [], ["longdiv-arc"]));
              break;
            case "\\phase":
              n3.setAttribute("notation", "phasorangle"), n3.classes.push("phasor-bottom"), n3.children.push(new k("mrow", [], ["phasor-angle"]));
              break;
            case "\\textcircled":
              n3.setAttribute("notation", "circle"), n3.classes.push("circle-pad"), n3.children.push(new k("mrow", [], ["textcircle"]));
              break;
            case "\\angl":
              n3.setAttribute("notation", "actuarial"), n3.classes.push("actuarial");
              break;
            case "\\boxed":
              n3.style.padding = "3pt", n3.style.border = "1px solid", n3.setAttribute("scriptlevel", "0"), n3.setAttribute("displaystyle", "true");
              break;
            case "\\fbox":
              n3.setAttribute("notation", "box"), n3.classes.push("tml-fbox");
              break;
            case "\\fcolorbox":
            case "\\colorbox":
              n3.style.padding = "0.3em", "\\fcolorbox" === e3.label && (n3.style.border = "0.0667em solid " + String(e3.borderColor));
          }
          return e3.backgroundColor && n3.setAttribute("mathbackground", e3.backgroundColor), n3;
        };
        f({ type: "enclose", names: ["\\colorbox"], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, argTypes: ["raw", "raw", "text"] }, handler({ parser: e3, funcName: t3 }, r3, n3) {
          const o2 = n3[0] && $e(n3[0], "raw").string;
          let a2 = "";
          if (o2) {
            const e4 = $e(r3[0], "raw").string;
            a2 = Lt(o2, e4);
          } else a2 = Ot($e(r3[0], "raw").string, e3.gullet.macros);
          const i2 = r3[1];
          return { type: "enclose", mode: e3.mode, label: t3, backgroundColor: a2, body: i2 };
        }, mathmlBuilder: Gt }), f({ type: "enclose", names: ["\\fcolorbox"], props: { numArgs: 3, numOptionalArgs: 1, allowedInText: true, argTypes: ["raw", "raw", "raw", "text"] }, handler({ parser: e3, funcName: t3 }, r3, n3) {
          const o2 = n3[0] && $e(n3[0], "raw").string;
          let a2, i2 = "";
          if (o2) {
            const e4 = $e(r3[0], "raw").string, t4 = $e(r3[0], "raw").string;
            i2 = Lt(o2, e4), a2 = Lt(o2, t4);
          } else i2 = Ot($e(r3[0], "raw").string, e3.gullet.macros), a2 = Ot($e(r3[1], "raw").string, e3.gullet.macros);
          const s2 = r3[2];
          return { type: "enclose", mode: e3.mode, label: t3, backgroundColor: a2, borderColor: i2, body: s2 };
        }, mathmlBuilder: Gt }), f({ type: "enclose", names: ["\\fbox"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: true }, handler: ({ parser: e3 }, t3) => ({ type: "enclose", mode: e3.mode, label: "\\fbox", body: t3[0] }) }), f({ type: "enclose", names: ["\\angl", "\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\overline", "\\boxed", "\\longdiv", "\\phase"], props: { numArgs: 1 }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[0];
          return { type: "enclose", mode: e3.mode, label: t3, body: n3 };
        }, mathmlBuilder: Gt }), f({ type: "enclose", names: ["\\underline"], props: { numArgs: 1, allowedInText: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[0];
          return { type: "enclose", mode: e3.mode, label: t3, body: n3 };
        }, mathmlBuilder: Gt }), f({ type: "enclose", names: ["\\textcircled"], props: { numArgs: 1, argTypes: ["text"], allowedInArgument: true, allowedInText: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[0];
          return { type: "enclose", mode: e3.mode, label: t3, body: n3 };
        }, mathmlBuilder: Gt }), f({ type: "environment", names: ["\\begin", "\\end"], props: { numArgs: 1, argTypes: ["text"] }, handler({ parser: e3, funcName: r3 }, n3) {
          const o2 = n3[0];
          if ("ordgroup" !== o2.type) throw new t2("Invalid environment name", o2);
          let a2 = "";
          for (let e4 = 0; e4 < o2.body.length; ++e4) a2 += $e(o2.body[e4], "textord").text;
          if ("\\begin" === r3) {
            if (!Object.prototype.hasOwnProperty.call(Ct, a2)) throw new t2("No such environment: " + a2, o2);
            const r4 = Ct[a2], { args: n4, optArgs: i2 } = e3.parseArguments("\\begin{" + a2 + "}", r4), s2 = { mode: e3.mode, envName: a2, parser: e3 }, l2 = r4.handler(s2, n4, i2);
            e3.expect("\\end", false);
            const c2 = e3.nextToken, u2 = $e(e3.parseFunction(), "environment");
            if (u2.name !== a2) throw new t2(`Mismatch: \\begin{${a2}} matched by \\end{${u2.name}}`, c2);
            return l2;
          }
          return { type: "environment", mode: e3.mode, name: a2, nameGroup: o2 };
        } }), f({ type: "envTag", names: ["\\env@tag"], props: { numArgs: 1, argTypes: ["math"] }, handler: ({ parser: e3 }, t3) => ({ type: "envTag", mode: e3.mode, body: t3[0] }), mathmlBuilder: (e3, t3) => new k("mrow") }), f({ type: "noTag", names: ["\\env@notag"], props: { numArgs: 0 }, handler: ({ parser: e3 }) => ({ type: "noTag", mode: e3.mode }), mathmlBuilder: (e3, t3) => new k("mrow") });
        const Wt = (e3, t3) => {
          const r3 = e3.font, n3 = t3.withFont(r3), o2 = fe(e3.body, n3);
          if (0 === o2.children.length) return o2;
          if ("boldsymbol" === r3 && ["mo", "mpadded", "mrow"].includes(o2.type)) return o2.style.fontWeight = "bold", o2;
          if (((e4, t4) => {
            if ("mathrm" !== t4 || "ordgroup" !== e4.body.type || 1 === e4.body.body.length) return false;
            if ("mathord" !== e4.body.body[0].type) return false;
            for (let t5 = 1; t5 < e4.body.body.length; t5++) {
              const r4 = e4.body.body[t5].type;
              if ("mathord" !== r4 && ("textord" !== r4 || isNaN(e4.body.body[t5].text))) return false;
            }
            return true;
          })(e3, r3)) {
            const e4 = o2.children[0].children[0].children ? o2.children[0].children[0] : o2.children[0];
            delete e4.attributes.mathvariant;
            for (let t5 = 1; t5 < o2.children.length; t5++) e4.children[0].text += o2.children[t5].children[0].children ? o2.children[t5].children[0].children[0].text : o2.children[t5].children[0].text;
            const t4 = new k("mpadded", [e4]);
            return t4.setAttribute("lspace", "0"), t4;
          }
          let a2 = "mo" === o2.children[0].type;
          for (let e4 = 1; e4 < o2.children.length; e4++) {
            "mo" === o2.children[e4].type && "boldsymbol" === r3 && (o2.children[e4].style.fontWeight = "bold"), "mi" !== o2.children[e4].type && (a2 = false);
            "normal" !== (o2.children[e4].attributes && o2.children[e4].attributes.mathvariant || "") && (a2 = false);
          }
          if (!a2) return o2;
          const i2 = o2.children[0];
          for (let e4 = 1; e4 < o2.children.length; e4++) i2.children.push(o2.children[e4].children[0]);
          if (i2.attributes.mathvariant && "normal" === i2.attributes.mathvariant) {
            const e4 = new k("mtext", new N("\u200B"));
            return new k("mrow", [e4, i2]);
          }
          return i2;
        }, Vt = { "\\Bbb": "\\mathbb", "\\bold": "\\mathbf", "\\frak": "\\mathfrak", "\\bm": "\\boldsymbol" };
        f({ type: "font", names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\up@greek", "\\boldsymbol", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathsfit", "\\mathtt", "\\Bbb", "\\bm", "\\bold", "\\frak"], props: { numArgs: 1, allowedInArgument: true }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = b(r3[0]);
          let o2 = t3;
          return o2 in Vt && (o2 = Vt[o2]), { type: "font", mode: e3.mode, font: o2.slice(1), body: n3 };
        }, mathmlBuilder: Wt }), f({ type: "font", names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"], props: { numArgs: 0, allowedInText: true }, handler: ({ parser: e3, funcName: t3, breakOnTokenText: r3 }, n3) => {
          const { mode: o2 } = e3, a2 = e3.parseExpression(true, r3, true);
          return { type: "font", mode: o2, font: `math${t3.slice(1)}`, body: { type: "ordgroup", mode: e3.mode, body: a2 } };
        }, mathmlBuilder: Wt });
        const Xt = ["display", "text", "script", "scriptscript"], Jt = { auto: -1, display: 0, text: 0, script: 1, scriptscript: 2 }, Zt = (e3, t3) => {
          const r3 = "auto" === e3.scriptLevel ? t3.incrementLevel() : "display" === e3.scriptLevel ? t3.withLevel(Ve) : "text" === e3.scriptLevel ? t3.withLevel(Xe) : t3.withLevel(Je), n3 = fe(e3.numer, r3), o2 = fe(e3.denom, r3);
          3 === t3.level && (n3.style.mathDepth = "2", n3.setAttribute("scriptlevel", "2"), o2.style.mathDepth = "2", o2.setAttribute("scriptlevel", "2"));
          let a2 = new k("mfrac", [n3, o2]);
          if (e3.hasBarLine) {
            if (e3.barSize) {
              const r4 = qe(e3.barSize, t3);
              a2.setAttribute("linethickness", r4.number + r4.unit);
            }
          } else a2.setAttribute("linethickness", "0px");
          if (null != e3.leftDelim || null != e3.rightDelim) {
            const t4 = [];
            if (null != e3.leftDelim) {
              const r4 = new k("mo", [new N(e3.leftDelim.replace("\\", ""))]);
              r4.setAttribute("fence", "true"), t4.push(r4);
            }
            if (t4.push(a2), null != e3.rightDelim) {
              const r4 = new k("mo", [new N(e3.rightDelim.replace("\\", ""))]);
              r4.setAttribute("fence", "true"), t4.push(r4);
            }
            a2 = ce(t4);
          }
          return "auto" !== e3.scriptLevel && (a2 = new k("mstyle", [a2]), a2.setAttribute("displaystyle", String("display" === e3.scriptLevel)), a2.setAttribute("scriptlevel", Jt[e3.scriptLevel])), a2;
        };
        f({ type: "genfrac", names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"], props: { numArgs: 2, allowedInArgument: true }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = r3[0], o2 = r3[1];
          let a2 = false, i2 = null, s2 = null, l2 = "auto";
          switch (t3) {
            case "\\dfrac":
            case "\\frac":
            case "\\tfrac":
              a2 = true;
              break;
            case "\\\\atopfrac":
              a2 = false;
              break;
            case "\\dbinom":
            case "\\binom":
            case "\\tbinom":
              i2 = "(", s2 = ")";
              break;
            case "\\\\bracefrac":
              i2 = "\\{", s2 = "\\}";
              break;
            case "\\\\brackfrac":
              i2 = "[", s2 = "]";
              break;
            default:
              throw new Error("Unrecognized genfrac command");
          }
          switch (t3) {
            case "\\dfrac":
            case "\\dbinom":
              l2 = "display";
              break;
            case "\\tfrac":
            case "\\tbinom":
              l2 = "text";
          }
          return { type: "genfrac", mode: e3.mode, continued: false, numer: n3, denom: o2, hasBarLine: a2, leftDelim: i2, rightDelim: s2, scriptLevel: l2, barSize: null };
        }, mathmlBuilder: Zt }), f({ type: "genfrac", names: ["\\cfrac"], props: { numArgs: 2 }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = r3[0], o2 = r3[1];
          return { type: "genfrac", mode: e3.mode, continued: true, numer: n3, denom: o2, hasBarLine: true, leftDelim: null, rightDelim: null, scriptLevel: "display", barSize: null };
        } }), f({ type: "infix", names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"], props: { numArgs: 0, infix: true }, handler({ parser: e3, funcName: t3, token: r3 }) {
          let n3;
          switch (t3) {
            case "\\over":
              n3 = "\\frac";
              break;
            case "\\choose":
              n3 = "\\binom";
              break;
            case "\\atop":
              n3 = "\\\\atopfrac";
              break;
            case "\\brace":
              n3 = "\\\\bracefrac";
              break;
            case "\\brack":
              n3 = "\\\\brackfrac";
              break;
            default:
              throw new Error("Unrecognized infix genfrac command");
          }
          return { type: "infix", mode: e3.mode, replaceWith: n3, token: r3 };
        } });
        const Yt = function(e3) {
          let t3 = null;
          return e3.length > 0 && (t3 = e3, t3 = "." === t3 ? null : t3), t3;
        };
        f({ type: "genfrac", names: ["\\genfrac"], props: { numArgs: 6, allowedInArgument: true, argTypes: ["math", "math", "size", "text", "math", "math"] }, handler({ parser: e3 }, t3) {
          const r3 = t3[4], n3 = t3[5], o2 = b(t3[0]), a2 = "atom" === o2.type && "open" === o2.family ? Yt(o2.text) : null, i2 = b(t3[1]), s2 = "atom" === i2.type && "close" === i2.family ? Yt(i2.text) : null, l2 = $e(t3[2], "size");
          let c2, u2 = null;
          l2.isBlank ? c2 = true : (u2 = l2.value, c2 = u2.number > 0);
          let d2 = "auto", h2 = t3[3];
          if ("ordgroup" === h2.type) {
            if (h2.body.length > 0) {
              const e4 = $e(h2.body[0], "textord");
              d2 = Xt[Number(e4.text)];
            }
          } else h2 = $e(h2, "textord"), d2 = Xt[Number(h2.text)];
          return { type: "genfrac", mode: e3.mode, numer: r3, denom: n3, continued: false, hasBarLine: c2, barSize: u2, leftDelim: a2, rightDelim: s2, scriptLevel: d2 };
        }, mathmlBuilder: Zt }), f({ type: "infix", names: ["\\above"], props: { numArgs: 1, argTypes: ["size"], infix: true }, handler: ({ parser: e3, funcName: t3, token: r3 }, n3) => ({ type: "infix", mode: e3.mode, replaceWith: "\\\\abovefrac", barSize: $e(n3[0], "size").value, token: r3 }) }), f({ type: "genfrac", names: ["\\\\abovefrac"], props: { numArgs: 3, argTypes: ["math", "size", "math"] }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = r3[0], o2 = (function(e4) {
            if (!e4) throw new Error("Expected non-null, but got " + String(e4));
            return e4;
          })($e(r3[1], "infix").barSize), a2 = r3[2], i2 = o2.number > 0;
          return { type: "genfrac", mode: e3.mode, numer: n3, denom: a2, continued: false, hasBarLine: i2, barSize: o2, leftDelim: null, rightDelim: null, scriptLevel: "auto" };
        }, mathmlBuilder: Zt }), f({ type: "hbox", names: ["\\hbox"], props: { numArgs: 1, argTypes: ["hbox"], allowedInArgument: true, allowedInText: false }, handler: ({ parser: e3 }, t3) => ({ type: "hbox", mode: e3.mode, body: x(t3[0]) }), mathmlBuilder(e3, t3) {
          const r3 = t3.withLevel(Ve), n3 = pe(e3.body, r3);
          return le(n3);
        } });
        f({ type: "horizBracket", names: ["\\overbrace", "\\underbrace", "\\overbracket", "\\underbracket"], props: { numArgs: 1 }, handler: ({ parser: e3, funcName: t3 }, r3) => ({ type: "horizBracket", mode: e3.mode, label: t3, isOver: /^\\over/.test(t3), base: r3[0] }), mathmlBuilder: (e3, t3) => {
          const r3 = D(e3.label);
          return r3.style["math-depth"] = 0, new k(e3.isOver ? "mover" : "munder", [fe(e3.base, t3), r3]);
        } }), f({ type: "html", names: ["\\class", "\\id", "\\style", "\\data"], props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: true }, handler: ({ parser: e3, funcName: r3, token: n3 }, o2) => {
          const a2 = $e(o2[0], "raw").string, i2 = o2[1];
          if (e3.settings.strict) throw new t2(`Function "${r3}" is disabled in strict mode`, n3);
          let s2;
          const l2 = {};
          switch (r3) {
            case "\\class":
              l2.class = a2, s2 = { command: "\\class", class: a2 };
              break;
            case "\\id":
              l2.id = a2, s2 = { command: "\\id", id: a2 };
              break;
            case "\\style":
              l2.style = a2, s2 = { command: "\\style", style: a2 };
              break;
            case "\\data": {
              const e4 = a2.split(",");
              for (let r4 = 0; r4 < e4.length; r4++) {
                const n4 = e4[r4].split("=");
                if (2 !== n4.length) throw new t2("Error parsing key-value for \\data");
                l2["data-" + n4[0].trim()] = n4[1].trim();
              }
              s2 = { command: "\\data", attributes: l2 };
              break;
            }
            default:
              throw new Error("Unrecognized html command");
          }
          if (!e3.settings.isTrusted(s2)) throw new t2(`Function "${r3}" is not trusted`, n3);
          return { type: "html", mode: e3.mode, attributes: l2, body: x(i2) };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = pe(e3.body, t3), n3 = [];
          e3.attributes.class && n3.push(...e3.attributes.class.trim().split(/\s+/)), r3.classes = n3;
          for (const t4 in e3.attributes) "class" !== t4 && Object.prototype.hasOwnProperty.call(e3.attributes, t4) && r3.setAttribute(t4, e3.attributes[t4]);
          return r3;
        } });
        const Kt = function(e3) {
          if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e3)) return { number: +e3, unit: "bp" };
          {
            const r3 = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e3);
            if (!r3) throw new t2("Invalid size: '" + e3 + "' in \\includegraphics");
            const n3 = { number: +(r3[1] + r3[2]), unit: r3[3] };
            if (!_e(n3)) throw new t2("Invalid unit: '" + n3.unit + "' in \\includegraphics.");
            return n3;
          }
        };
        f({ type: "includegraphics", names: ["\\includegraphics"], props: { numArgs: 1, numOptionalArgs: 1, argTypes: ["raw", "url"], allowedInText: false }, handler: ({ parser: e3, token: r3 }, n3, o2) => {
          let a2 = { number: 0, unit: "em" }, i2 = { number: 0.9, unit: "em" }, s2 = { number: 0, unit: "em" }, l2 = "";
          if (o2[0]) {
            const e4 = $e(o2[0], "raw").string.split(",");
            for (let r4 = 0; r4 < e4.length; r4++) {
              const n4 = e4[r4].split("=");
              if (2 === n4.length) {
                const e5 = n4[1].trim();
                switch (n4[0].trim()) {
                  case "alt":
                    l2 = e5;
                    break;
                  case "width":
                    a2 = Kt(e5);
                    break;
                  case "height":
                    i2 = Kt(e5);
                    break;
                  case "totalheight":
                    s2 = Kt(e5);
                    break;
                  default:
                    throw new t2("Invalid key: '" + n4[0] + "' in \\includegraphics.");
                }
              }
            }
          }
          const c2 = $e(n3[0], "url").url;
          if ("" === l2 && (l2 = c2, l2 = l2.replace(/^.*[\\/]/, ""), l2 = l2.substring(0, l2.lastIndexOf("."))), !e3.settings.isTrusted({ command: "\\includegraphics", url: c2 })) throw new t2('Function "\\includegraphics" is not trusted', r3);
          return { type: "includegraphics", mode: e3.mode, alt: l2, width: a2, height: i2, totalheight: s2, src: c2 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = qe(e3.height, t3), n3 = { number: 0, unit: "em" };
          e3.totalheight.number > 0 && e3.totalheight.unit === r3.unit && e3.totalheight.number > r3.number && (n3.number = e3.totalheight.number - r3.number, n3.unit = r3.unit);
          let o2 = 0;
          e3.width.number > 0 && (o2 = qe(e3.width, t3));
          const a2 = { height: r3.number + n3.number + "em" };
          o2.number > 0 && (a2.width = o2.number + o2.unit), n3.number > 0 && (a2.verticalAlign = -n3.number + n3.unit);
          const i2 = new T(e3.src, e3.alt, a2);
          return i2.height = r3, i2.depth = n3, new k("mtext", [i2]);
        } }), f({ type: "kern", names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"], props: { numArgs: 1, argTypes: ["size"], primitive: true, allowedInText: true }, handler({ parser: e3, funcName: r3, token: n3 }, o2) {
          const a2 = $e(o2[0], "size");
          if (e3.settings.strict) {
            const o3 = "m" === r3[1], i2 = "mu" === a2.value.unit;
            if (o3) {
              if (!i2) throw new t2(`LaTeX's ${r3} supports only mu units, not ${a2.value.unit} units`, n3);
              if ("math" !== e3.mode) throw new t2(`LaTeX's ${r3} works only in math mode`, n3);
            } else if (i2) throw new t2(`LaTeX's ${r3} doesn't support mu units`, n3);
          }
          return { type: "kern", mode: e3.mode, dimension: a2.value };
        }, mathmlBuilder(e3, t3) {
          const r3 = qe(e3.dimension, t3), n3 = r3.number > 0 && "em" === r3.unit ? Qt(r3.number) : "";
          if ("text" === e3.mode && n3.length > 0) {
            const e4 = new N(n3);
            return new k("mtext", [e4]);
          }
          if (r3.number >= 0) {
            const e4 = new k("mspace");
            return e4.setAttribute("width", r3.number + r3.unit), e4;
          }
          {
            const e4 = new k("mrow");
            return e4.style.marginLeft = r3.number + r3.unit, e4;
          }
        } });
        const Qt = function(e3) {
          return e3 >= 0.05555 && e3 <= 0.05556 ? "\u200A" : e3 >= 0.1666 && e3 <= 0.1667 ? "\u2009" : e3 >= 0.2222 && e3 <= 0.2223 ? "\u2005" : e3 >= 0.2777 && e3 <= 0.2778 ? "\u2005\u200A" : "";
        }, er = /[^A-Za-z_0-9-]/g;
        f({ type: "label", names: ["\\label"], props: { numArgs: 1, argTypes: ["raw"] }, handler: ({ parser: e3 }, t3) => ({ type: "label", mode: e3.mode, string: t3[0].string.replace(er, "") }), mathmlBuilder(e3, t3) {
          const r3 = new k("mrow", [], ["tml-label"]);
          return e3.string.length > 0 && r3.setLabel(e3.string), r3;
        } });
        const tr = ["\\clap", "\\llap", "\\rlap"];
        f({ type: "lap", names: ["\\mathllap", "\\mathrlap", "\\mathclap", "\\clap", "\\llap", "\\rlap"], props: { numArgs: 1, allowedInText: true }, handler: ({ parser: e3, funcName: r3, token: n3 }, o2) => {
          if (tr.includes(r3)) {
            if (e3.settings.strict && "text" !== e3.mode) throw new t2(`{${r3}} can be used only in text mode.
 Try \\math${r3.slice(1)}`, n3);
            r3 = r3.slice(1);
          } else r3 = r3.slice(5);
          const a2 = o2[0];
          return { type: "lap", mode: e3.mode, alignment: r3, body: a2 };
        }, mathmlBuilder: (e3, t3) => {
          let r3;
          if ("llap" === e3.alignment) {
            const n4 = me(x(e3.body), t3), o3 = new k("mphantom", n4);
            r3 = new k("mpadded", [o3]), r3.setAttribute("width", "0.1px");
          }
          const n3 = fe(e3.body, t3);
          let o2;
          if ("llap" === e3.alignment ? (n3.style.position = "absolute", n3.style.right = "0", n3.style.bottom = "0", o2 = new k("mpadded", [r3, n3])) : o2 = new k("mpadded", [n3]), "rlap" === e3.alignment) e3.body.body.length > 0 && "genfrac" === e3.body.body[0].type && o2.setAttribute("lspace", "0.16667em");
          else {
            const t4 = "llap" === e3.alignment ? "-1" : "-0.5";
            o2.setAttribute("lspace", t4 + "width"), "llap" === e3.alignment ? o2.style.position = "relative" : (o2.style.display = "flex", o2.style.justifyContent = "center");
          }
          return o2.setAttribute("width", "0.1px"), o2;
        } }), f({ type: "ordgroup", names: ["\\(", "$"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler({ funcName: e3, parser: t3 }, r3) {
          const n3 = t3.mode;
          t3.switchMode("math");
          const o2 = "\\(" === e3 ? "\\)" : "$", a2 = t3.parseExpression(false, o2);
          return t3.expect(o2), t3.switchMode(n3), { type: "ordgroup", mode: t3.mode, body: a2 };
        } }), f({ type: "text", names: ["\\)", "\\]"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(e3, r3) {
          throw new t2(`Mismatched ${e3.funcName}`, r3);
        } });
        f({ type: "mathchoice", names: ["\\mathchoice"], props: { numArgs: 4, primitive: true }, handler: ({ parser: e3 }, t3) => ({ type: "mathchoice", mode: e3.mode, display: x(t3[0]), text: x(t3[1]), script: x(t3[2]), scriptscript: x(t3[3]) }), mathmlBuilder: (e3, t3) => {
          const r3 = ((e4, t4) => {
            switch (t4.level) {
              case We:
                return e4.display;
              case Ve:
                return e4.text;
              case Xe:
                return e4.script;
              case Je:
                return e4.scriptscript;
              default:
                return e4.text;
            }
          })(e3, t3);
          return pe(r3, t3);
        } });
        const rr = ["text", "textord", "mathord", "atom"];
        function nr(e3, t3) {
          let r3;
          const n3 = me(e3.body, t3);
          if ("minner" === e3.mclass) r3 = new k("mpadded", n3);
          else if ("mord" === e3.mclass) e3.isCharacterBox || "mathord" === n3[0].type ? (r3 = n3[0], r3.type = "mi", 1 === r3.children.length && r3.children[0].text && "\u2207" === r3.children[0].text && r3.setAttribute("mathvariant", "normal")) : r3 = new k("mi", n3);
          else {
            r3 = new k("mrow", n3), e3.mustPromote ? (r3 = n3[0], r3.type = "mo", e3.isCharacterBox && e3.body[0].text && /[A-Za-z]/.test(e3.body[0].text) && r3.setAttribute("mathvariant", "italic")) : r3 = new k("mrow", n3);
            const o2 = t3.level < 2;
            "mrow" === r3.type ? o2 && ("mbin" === e3.mclass ? (r3.children.unshift(ke(0.2222)), r3.children.push(ke(0.2222))) : "mrel" === e3.mclass ? (r3.children.unshift(ke(0.2778)), r3.children.push(ke(0.2778))) : "mpunct" === e3.mclass ? r3.children.push(ke(0.1667)) : "minner" === e3.mclass && (r3.children.unshift(ke(0.0556)), r3.children.push(ke(0.0556)))) : "mbin" === e3.mclass ? (r3.attributes.lspace = o2 ? "0.2222em" : "0", r3.attributes.rspace = o2 ? "0.2222em" : "0") : "mrel" === e3.mclass ? (r3.attributes.lspace = o2 ? "0.2778em" : "0", r3.attributes.rspace = o2 ? "0.2778em" : "0") : "mpunct" === e3.mclass ? (r3.attributes.lspace = "0em", r3.attributes.rspace = o2 ? "0.1667em" : "0") : "mopen" === e3.mclass || "mclose" === e3.mclass ? (r3.attributes.lspace = "0em", r3.attributes.rspace = "0em") : "minner" === e3.mclass && o2 && (r3.attributes.lspace = "0.0556em", r3.attributes.width = "+0.1111em"), "mopen" !== e3.mclass && "mclose" !== e3.mclass && (delete r3.attributes.stretchy, delete r3.attributes.form);
          }
          return r3;
        }
        f({ type: "mclass", names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], props: { numArgs: 1, primitive: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[0], o2 = c(n3);
          let a2 = true;
          const i2 = { type: "mathord", text: "", mode: e3.mode }, s2 = n3.body ? n3.body : [n3];
          for (const t4 of s2) {
            if (!rr.includes(t4.type)) {
              a2 = false;
              break;
            }
            P[e3.mode][t4.text] ? i2.text += P[e3.mode][t4.text].replace : t4.text ? i2.text += t4.text : t4.body && t4.body.map(((e4) => {
              i2.text += e4.text;
            }));
          }
          return a2 && "\\mathord" === t3 && "mathord" === i2.type && i2.text.length > 1 ? i2 : { type: "mclass", mode: e3.mode, mclass: "m" + t3.slice(5), body: x(a2 ? i2 : n3), isCharacterBox: o2, mustPromote: a2 };
        }, mathmlBuilder: nr });
        const or = (e3) => {
          const t3 = "ordgroup" === e3.type && e3.body.length && 1 === e3.body.length ? e3.body[0] : e3;
          return "atom" !== t3.type || "bin" !== t3.family && "rel" !== t3.family ? "mord" : "m" + t3.family;
        };
        f({ type: "mclass", names: ["\\@binrel"], props: { numArgs: 2 }, handler: ({ parser: e3 }, t3) => ({ type: "mclass", mode: e3.mode, mclass: or(t3[0]), body: x(t3[1]), isCharacterBox: c(t3[1]) }) }), f({ type: "mclass", names: ["\\stackrel", "\\overset", "\\underset"], props: { numArgs: 2 }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[1], o2 = r3[0];
          let a2;
          a2 = "\\stackrel" !== t3 ? or(n3) : "mrel";
          const i2 = { type: "mrel" === a2 || "mbin" === a2 ? "op" : "ordgroup", mode: n3.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: "\\stackrel" !== t3, body: x(n3) };
          return { type: "supsub", mode: o2.mode, stack: true, base: i2, sup: "\\underset" === t3 ? null : o2, sub: "\\underset" === t3 ? o2 : null };
        }, mathmlBuilder: nr });
        const ar = (e3, t3, r3) => {
          if (!e3) return r3;
          const n3 = fe(e3, t3);
          return "mrow" === n3.type && 0 === n3.children.length ? r3 : n3;
        };
        f({ type: "multiscript", names: ["\\sideset", "\\pres@cript"], props: { numArgs: 3 }, handler({ parser: e3, funcName: r3, token: n3 }, o2) {
          if (0 === o2[2].body.length) throw new t2(r3 + "cannot parse an empty base.");
          const a2 = o2[2].body[0];
          if (e3.settings.strict && "\\sideset" === r3 && !a2.symbol) throw new t2("The base of \\sideset must be a big operator. Try \\prescript.");
          if (o2[0].body.length > 0 && "supsub" !== o2[0].body[0].type || o2[1].body.length > 0 && "supsub" !== o2[1].body[0].type) throw new t2("\\sideset can parse only subscripts and superscripts in its first two arguments", n3);
          const i2 = o2[0].body.length > 0 ? o2[0].body[0] : null, s2 = o2[1].body.length > 0 ? o2[1].body[0] : null;
          return i2 || s2 ? i2 ? { type: "multiscript", mode: e3.mode, isSideset: "\\sideset" === r3, prescripts: i2, postscripts: s2, base: a2 } : { type: "styling", mode: e3.mode, scriptLevel: "text", body: [{ type: "supsub", mode: e3.mode, base: a2, sup: s2.sup, sub: s2.sub }] } : a2;
        }, mathmlBuilder(e3, t3) {
          const r3 = fe(e3.base, t3), n3 = new k("mprescripts"), o2 = new k("none");
          let a2 = [];
          const i2 = ar(e3.prescripts.sub, t3, o2), s2 = ar(e3.prescripts.sup, t3, o2);
          if (e3.isSideset && (i2.setAttribute("style", "text-align: left;"), s2.setAttribute("style", "text-align: left;")), e3.postscripts) {
            a2 = [r3, ar(e3.postscripts.sub, t3, o2), ar(e3.postscripts.sup, t3, o2), n3, i2, s2];
          } else a2 = [r3, n3, i2, s2];
          return new k("mmultiscripts", a2);
        } }), f({ type: "not", names: ["\\not"], props: { numArgs: 1, primitive: true, allowedInText: false }, handler({ parser: e3 }, t3) {
          const r3 = c(t3[0]);
          let n3;
          if (r3) n3 = x(t3[0]), "\\" === n3[0].text.charAt(0) && (n3[0].text = P.math[n3[0].text].replace), n3[0].text = n3[0].text.slice(0, 1) + "\u0338" + n3[0].text.slice(1);
          else {
            n3 = [{ type: "textord", mode: "math", text: "\u0338" }, { type: "kern", mode: "math", dimension: { number: -0.6, unit: "em" } }, t3[0]];
          }
          return { type: "not", mode: e3.mode, body: n3, isCharacterBox: r3 };
        }, mathmlBuilder(e3, t3) {
          if (e3.isCharacterBox) {
            return me(e3.body, t3, true)[0];
          }
          return pe(e3.body, t3);
        } });
        const ir = ["textord", "mathord", "atom"], sr = ["\\smallint"], lr = ["textord", "mathord", "ordgroup", "close", "leftright", "font"], cr = (e3) => {
          e3.attributes.lspace = "0.1667em", e3.attributes.rspace = "0.1667em";
        }, ur = (e3, t3) => {
          let r3;
          if (e3.symbol) r3 = new k("mo", [ie(e3.name, e3.mode)]), sr.includes(e3.name) ? r3.setAttribute("largeop", "false") : r3.setAttribute("movablelimits", "false"), e3.fromMathOp && cr(r3);
          else if (e3.body) r3 = new k("mo", me(e3.body, t3)), e3.fromMathOp && cr(r3);
          else if (r3 = new k("mi", [new N(e3.name.slice(1))]), !e3.parentIsSupSub) {
            const t4 = [r3, new k("mo", [ie("\u2061", "text")])];
            if (e3.needsLeadingSpace) {
              const e4 = new k("mspace");
              e4.setAttribute("width", "0.1667em"), t4.unshift(e4);
            }
            if (!e3.isFollowedByDelimiter) {
              const e4 = new k("mspace");
              e4.setAttribute("width", "0.1667em"), t4.push(e4);
            }
            r3 = new k("mrow", t4);
          }
          return r3;
        }, dr = { "\u220F": "\\prod", "\u2210": "\\coprod", "\u2211": "\\sum", "\u22C0": "\\bigwedge", "\u22C1": "\\bigvee", "\u22C2": "\\bigcap", "\u22C3": "\\bigcup", "\u2A00": "\\bigodot", "\u2A01": "\\bigoplus", "\u2A02": "\\bigotimes", "\u2A04": "\\biguplus", "\u2A05": "\\bigsqcap", "\u2A06": "\\bigsqcup", "\u2A03": "\\bigcupdot", "\u2A07": "\\bigdoublevee", "\u2A08": "\\bigdoublewedge", "\u2A09": "\\bigtimes" };
        f({ type: "op", names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcupplus", "\\bigcupdot", "\\bigcap", "\\bigcup", "\\bigdoublevee", "\\bigdoublewedge", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcap", "\\bigsqcup", "\\bigtimes", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A03", "\u2A04", "\u2A05", "\u2A06", "\u2A07", "\u2A08", "\u2A09"], props: { numArgs: 0 }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          let n3 = t3;
          return 1 === n3.length && (n3 = dr[n3]), { type: "op", mode: e3.mode, limits: true, parentIsSupSub: false, symbol: true, stack: false, name: n3 };
        }, mathmlBuilder: ur }), f({ type: "op", names: ["\\mathop"], props: { numArgs: 1, primitive: true }, handler: ({ parser: e3 }, t3) => {
          const r3 = t3[0], n3 = r3.body ? r3.body : [r3], o2 = 1 === n3.length && ir.includes(n3[0].type);
          return { type: "op", mode: e3.mode, limits: true, parentIsSupSub: false, symbol: o2, fromMathOp: true, stack: false, name: o2 ? n3[0].text : null, body: o2 ? null : x(r3) };
        }, mathmlBuilder: ur });
        const hr = { "\u222B": "\\int", "\u222C": "\\iint", "\u222D": "\\iiint", "\u222E": "\\oint", "\u222F": "\\oiint", "\u2230": "\\oiiint", "\u2231": "\\intclockwise", "\u2232": "\\varointclockwise", "\u2A0C": "\\iiiint", "\u2A0D": "\\intbar", "\u2A0E": "\\intBar", "\u2A0F": "\\fint", "\u2A12": "\\rppolint", "\u2A13": "\\scpolint", "\u2A15": "\\pointint", "\u2A16": "\\sqint", "\u2A17": "\\intlarhk", "\u2A18": "\\intx", "\u2A19": "\\intcap", "\u2A1A": "\\intcup" };
        f({ type: "op", names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\sgn", "\\tan", "\\tanh", "\\tg", "\\th"], props: { numArgs: 0 }, handler({ parser: e3, funcName: t3 }) {
          const r3 = e3.prevAtomType, n3 = e3.gullet.future().text;
          return { type: "op", mode: e3.mode, limits: false, parentIsSupSub: false, symbol: false, stack: false, isFollowedByDelimiter: Ft(n3), needsLeadingSpace: r3.length > 0 && lr.includes(r3), name: t3 };
        }, mathmlBuilder: ur }), f({ type: "op", names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"], props: { numArgs: 0 }, handler({ parser: e3, funcName: t3 }) {
          const r3 = e3.prevAtomType, n3 = e3.gullet.future().text;
          return { type: "op", mode: e3.mode, limits: true, parentIsSupSub: false, symbol: false, stack: false, isFollowedByDelimiter: Ft(n3), needsLeadingSpace: r3.length > 0 && lr.includes(r3), name: t3 };
        }, mathmlBuilder: ur }), f({ type: "op", names: ["\\int", "\\iint", "\\iiint", "\\iiiint", "\\oint", "\\oiint", "\\oiiint", "\\intclockwise", "\\varointclockwise", "\\intbar", "\\intBar", "\\fint", "\\rppolint", "\\scpolint", "\\pointint", "\\sqint", "\\intlarhk", "\\intx", "\\intcap", "\\intcup", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230", "\u2231", "\u2232", "\u2A0C", "\u2A0D", "\u2A0E", "\u2A0F", "\u2A12", "\u2A13", "\u2A15", "\u2A16", "\u2A17", "\u2A18", "\u2A19", "\u2A1A"], props: { numArgs: 0, allowedInArgument: true }, handler({ parser: e3, funcName: t3 }) {
          let r3 = t3;
          return 1 === r3.length && (r3 = hr[r3]), { type: "op", mode: e3.mode, limits: false, parentIsSupSub: false, symbol: true, stack: false, name: r3 };
        }, mathmlBuilder: ur });
        f({ type: "operatorname", names: ["\\operatorname@", "\\operatornamewithlimits"], props: { numArgs: 1, allowedInArgument: true }, handler: ({ parser: e3, funcName: t3 }, r3) => {
          const n3 = r3[0], o2 = e3.prevAtomType, a2 = e3.gullet.future().text;
          return { type: "operatorname", mode: e3.mode, body: x(n3), alwaysHandleSupSub: "\\operatornamewithlimits" === t3, limits: false, parentIsSupSub: false, isFollowedByDelimiter: Ft(a2), needsLeadingSpace: o2.length > 0 && lr.includes(o2) };
        }, mathmlBuilder: (e3, t3) => {
          let r3, n3 = me(e3.body, t3.withFont("mathrm")), o2 = true;
          for (let e4 = 0; e4 < n3.length; e4++) {
            let t4 = n3[e4];
            if (t4 instanceof k) switch (("mrow" === t4.type || "mpadded" === t4.type) && 1 === t4.children.length && t4.children[0] instanceof k && (t4 = t4.children[0]), t4.type) {
              case "mi":
              case "mn":
              case "ms":
              case "mtext":
                break;
              case "mspace":
                if (t4.attributes.width) {
                  const r4 = t4.attributes.width.replace("em", ""), a2 = Qt(Number(r4));
                  "" === a2 ? o2 = false : n3[e4] = new k("mtext", [new N(a2)]);
                }
                break;
              case "mo": {
                const e5 = t4.children[0];
                1 === t4.children.length && e5 instanceof N ? e5.text = e5.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : o2 = false;
                break;
              }
              default:
                o2 = false;
            }
            else o2 = false;
          }
          if (o2) {
            const e4 = n3.map(((e5) => e5.toText())).join("");
            n3 = [new N(e4)];
          } else if (1 === n3.length && ["mover", "munder"].includes(n3[0].type) && ("mi" === n3[0].children[0].type || "mtext" === n3[0].children[0].type)) {
            if (n3[0].children[0].type = "mi", e3.parentIsSupSub) return new k("mrow", n3);
            {
              const e4 = new k("mo", [ie("\u2061", "text")]);
              return q([n3[0], e4]);
            }
          }
          if (o2 ? (r3 = new k("mi", n3), 1 === n3[0].text.length && r3.setAttribute("mathvariant", "normal")) : r3 = new k("mrow", n3), !e3.parentIsSupSub) {
            const t4 = [r3, new k("mo", [ie("\u2061", "text")])];
            if (e3.needsLeadingSpace) {
              const e4 = new k("mspace");
              e4.setAttribute("width", "0.1667em"), t4.unshift(e4);
            }
            if (!e3.isFollowedByDelimiter) {
              const e4 = new k("mspace");
              e4.setAttribute("width", "0.1667em"), t4.push(e4);
            }
            return q(t4);
          }
          return r3;
        } }), Ye("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@"), g({ type: "ordgroup", mathmlBuilder: (e3, t3) => pe(e3.body, t3, e3.semisimple) }), f({ type: "phantom", names: ["\\phantom"], props: { numArgs: 1, allowedInText: true }, handler: ({ parser: e3 }, t3) => {
          const r3 = t3[0];
          return { type: "phantom", mode: e3.mode, body: x(r3) };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = me(e3.body, t3);
          return new k("mphantom", r3);
        } }), f({ type: "hphantom", names: ["\\hphantom"], props: { numArgs: 1, allowedInText: true }, handler: ({ parser: e3 }, t3) => {
          const r3 = t3[0];
          return { type: "hphantom", mode: e3.mode, body: r3 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = me(x(e3.body), t3), n3 = new k("mphantom", r3), o2 = new k("mpadded", [n3]);
          return o2.setAttribute("height", "0px"), o2.setAttribute("depth", "0px"), o2;
        } }), f({ type: "vphantom", names: ["\\vphantom"], props: { numArgs: 1, allowedInText: true }, handler: ({ parser: e3 }, t3) => {
          const r3 = t3[0];
          return { type: "vphantom", mode: e3.mode, body: r3 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = me(x(e3.body), t3), n3 = new k("mphantom", r3), o2 = new k("mpadded", [n3]);
          return o2.setAttribute("width", "0px"), o2;
        } }), f({ type: "pmb", names: ["\\pmb"], props: { numArgs: 1, allowedInText: true }, handler: ({ parser: e3 }, t3) => ({ type: "pmb", mode: e3.mode, body: x(t3[0]) }), mathmlBuilder(e3, t3) {
          const r3 = me(e3.body, t3), n3 = L(r3);
          return n3.setAttribute("style", "font-weight:bold"), n3;
        } });
        const mr = (e3, t3) => {
          const r3 = t3.withLevel(Ve), n3 = new k("mpadded", [fe(e3.body, r3)]), o2 = qe(e3.dy, t3);
          return n3.setAttribute("voffset", o2.number + o2.unit), o2.number > 0 ? n3.style.padding = o2.number + o2.unit + " 0 0 0" : n3.style.padding = "0 0 " + Math.abs(o2.number) + o2.unit + " 0", n3;
        };
        f({ type: "raise", names: ["\\raise", "\\lower"], props: { numArgs: 2, argTypes: ["size", "primitive"], primitive: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = $e(r3[0], "size").value;
          "\\lower" === t3 && (n3.number *= -1);
          const o2 = r3[1];
          return { type: "raise", mode: e3.mode, dy: n3, body: o2 };
        }, mathmlBuilder: mr }), f({ type: "raise", names: ["\\raisebox"], props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = $e(r3[0], "size").value, o2 = r3[1];
          return { type: "raise", mode: e3.mode, dy: n3, body: o2 };
        }, mathmlBuilder: mr }), f({ type: "ref", names: ["\\ref", "\\eqref"], props: { numArgs: 1, argTypes: ["raw"] }, handler: ({ parser: e3, funcName: t3 }, r3) => ({ type: "ref", mode: e3.mode, funcName: t3, string: r3[0].string.replace(er, "") }), mathmlBuilder(e3, t3) {
          const r3 = "\\ref" === e3.funcName ? ["tml-ref"] : ["tml-ref", "tml-eqref"];
          return new _("#" + e3.string, r3, null);
        } }), f({ type: "reflect", names: ["\\reflectbox"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: true }, handler: ({ parser: e3 }, t3) => ({ type: "reflect", mode: e3.mode, body: t3[0] }), mathmlBuilder(e3, t3) {
          const r3 = fe(e3.body, t3);
          return r3.style.transform = "scaleX(-1)", r3;
        } }), f({ type: "internal", names: ["\\relax"], props: { numArgs: 0, allowedInText: true, allowedInArgument: true }, handler: ({ parser: e3 }) => ({ type: "internal", mode: e3.mode }) }), f({ type: "rule", names: ["\\rule"], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["size", "size", "size"] }, handler({ parser: e3 }, t3, r3) {
          const n3 = r3[0], o2 = $e(t3[0], "size"), a2 = $e(t3[1], "size");
          return { type: "rule", mode: e3.mode, shift: n3 && $e(n3, "size").value, width: o2.value, height: a2.value };
        }, mathmlBuilder(e3, t3) {
          const r3 = qe(e3.width, t3), n3 = qe(e3.height, t3), o2 = e3.shift ? qe(e3.shift, t3) : { number: 0, unit: "em" }, a2 = t3.color && t3.getColor() || "black", i2 = new k("mspace");
          if (r3.number > 0 && n3.number > 0 && i2.setAttribute("mathbackground", a2), i2.setAttribute("width", r3.number + r3.unit), i2.setAttribute("height", n3.number + n3.unit), 0 === o2.number) return i2;
          const s2 = new k("mpadded", [i2]);
          return o2.number >= 0 ? s2.setAttribute("height", "+" + o2.number + o2.unit) : (s2.setAttribute("height", o2.number + o2.unit), s2.setAttribute("depth", "+" + -o2.number + o2.unit)), s2.setAttribute("voffset", o2.number + o2.unit), s2;
        } });
        const pr = /^[0-9]$/, fr = { 0: "\u2080", 1: "\u2081", 2: "\u2082", 3: "\u2083", 4: "\u2084", 5: "\u2085", 6: "\u2086", 7: "\u2087", 8: "\u2088", 9: "\u2089" }, gr = { 0: "\u2070", 1: "\xB9", 2: "\xB2", 3: "\xB3", 4: "\u2074", 5: "\u2075", 6: "\u2076", 7: "\u2077", 8: "\u2078", 9: "\u2079" };
        f({ type: "sfrac", names: ["\\sfrac"], props: { numArgs: 2, allowedInText: true, allowedInMath: true }, handler({ parser: e3 }, r3) {
          let n3 = "";
          for (const e4 of r3[0].body) {
            if ("textord" !== e4.type || !pr.test(e4.text)) throw new t2("Numerator must be an integer.", e4);
            n3 += e4.text;
          }
          let o2 = "";
          for (const e4 of r3[1].body) {
            if ("textord" !== e4.type || !pr.test(e4.text)) throw new t2("Denominator must be an integer.", e4);
            o2 += e4.text;
          }
          return { type: "sfrac", mode: e3.mode, numerator: n3, denominator: o2 };
        }, mathmlBuilder(e3, t3) {
          const r3 = e3.numerator.split("").map(((e4) => gr[e4])).join(""), n3 = e3.denominator.split("").map(((e4) => fr[e4])).join(""), o2 = new N(r3 + "\u2044" + n3, e3.mode, t3);
          return new k("mn", [o2], ["special-fraction"]);
        } });
        const br = { "\\tiny": 0.5, "\\sixptsize": 0.6, "\\Tiny": 0.6, "\\scriptsize": 0.7, "\\footnotesize": 0.8, "\\small": 0.9, "\\normalsize": 1, "\\large": 1.2, "\\Large": 1.44, "\\LARGE": 1.728, "\\huge": 2.074, "\\Huge": 2.488 };
        f({ type: "sizing", names: ["\\tiny", "\\sixptsize", "\\Tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], props: { numArgs: 0, allowedInText: true }, handler: ({ breakOnTokenText: e3, funcName: t3, parser: r3 }, n3) => {
          r3.settings.strict && "math" === r3.mode && console.log(`Temml strict-mode warning: Command ${t3} is invalid in math mode.`);
          const o2 = r3.parseExpression(false, e3, true);
          return { type: "sizing", mode: r3.mode, funcName: t3, body: o2 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = t3.withFontSize(br[e3.funcName]), n3 = me(e3.body, r3), o2 = L(n3), a2 = (br[e3.funcName] / t3.fontSize).toFixed(4);
          return o2.setAttribute("mathsize", a2 + "em"), o2;
        } }), f({ type: "smash", names: ["\\smash"], props: { numArgs: 1, numOptionalArgs: 1, allowedInText: true }, handler: ({ parser: e3 }, t3, r3) => {
          let n3 = false, o2 = false;
          const a2 = r3[0] && $e(r3[0], "ordgroup");
          if (a2) {
            let e4 = "";
            for (let t4 = 0; t4 < a2.body.length; ++t4) {
              if (e4 = a2.body[t4].text, "t" === e4) n3 = true;
              else {
                if ("b" !== e4) {
                  n3 = false, o2 = false;
                  break;
                }
                o2 = true;
              }
            }
          } else n3 = true, o2 = true;
          const i2 = t3[0];
          return { type: "smash", mode: e3.mode, body: i2, smashHeight: n3, smashDepth: o2 };
        }, mathmlBuilder: (e3, t3) => {
          const r3 = new k("mpadded", [fe(e3.body, t3)]);
          return e3.smashHeight && r3.setAttribute("height", "0px"), e3.smashDepth && r3.setAttribute("depth", "0px"), r3;
        } });
        const xr = ["a", "c", "e", "\u0131", "m", "n", "o", "r", "s", "u", "v", "w", "x", "z", "\u03B1", "\u03B5", "\u03B9", "\u03BA", "\u03BD", "\u03BF", "\u03C0", "\u03C3", "\u03C4", "\u03C5", "\u03C9", "\\alpha", "\\epsilon", "\\iota", "\\kappa", "\\nu", "\\omega", "\\pi", "\\tau", "\\omega"];
        f({ type: "sqrt", names: ["\\sqrt"], props: { numArgs: 1, numOptionalArgs: 1 }, handler({ parser: e3 }, t3, r3) {
          const n3 = r3[0], o2 = t3[0];
          return o2.body && 1 === o2.body.length && o2.body[0].text && xr.includes(o2.body[0].text) && o2.body.push({ type: "rule", mode: "math", shift: null, width: { number: 0, unit: "pt" }, height: { number: 0.5, unit: "em" } }), { type: "sqrt", mode: e3.mode, body: o2, index: n3 };
        }, mathmlBuilder(e3, t3) {
          const { body: r3, index: n3 } = e3;
          return n3 ? new k("mroot", [fe(r3, t3), fe(n3, t3.incrementLevel())]) : new k("msqrt", [fe(r3, t3)]);
        } });
        const yr = { display: 0, text: 1, script: 2, scriptscript: 3 }, vr = { display: ["0", "true"], text: ["0", "false"], script: ["1", "false"], scriptscript: ["2", "false"] };
        f({ type: "styling", names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler({ breakOnTokenText: e3, funcName: t3, parser: r3 }, n3) {
          const o2 = r3.parseExpression(true, e3, true), a2 = t3.slice(1, t3.length - 5);
          return { type: "styling", mode: r3.mode, scriptLevel: a2, body: o2 };
        }, mathmlBuilder(e3, t3) {
          const r3 = t3.withLevel(yr[e3.scriptLevel]), n3 = me(e3.body, r3), o2 = L(n3), a2 = vr[e3.scriptLevel];
          return o2.setAttribute("scriptlevel", a2[0]), o2.setAttribute("displaystyle", a2[1]), o2;
        } });
        const wr = /^m(over|under|underover)$/;
        g({ type: "supsub", mathmlBuilder(e3, t3) {
          let r3, n3, o2 = false, a2 = false, i2 = false, s2 = false;
          e3.base && "horizBracket" === e3.base.type && (n3 = !!e3.sup, n3 === e3.base.isOver && (o2 = true, r3 = e3.base.isOver)), !e3.base || e3.stack || "op" !== e3.base.type && "operatorname" !== e3.base.type || (e3.base.parentIsSupSub = true, a2 = !e3.base.symbol, i2 = a2 && !e3.isFollowedByDelimiter, s2 = e3.base.needsLeadingSpace);
          const l2 = e3.stack && 1 === e3.base.body.length ? [fe(e3.base.body[0], t3)] : [fe(e3.base, t3)], c2 = t3.inSubOrSup();
          if (e3.sub) {
            const r4 = fe(e3.sub, c2);
            3 === t3.level && r4.setAttribute("scriptlevel", "2"), l2.push(r4);
          }
          if (e3.sup) {
            const r4 = fe(e3.sup, c2);
            if (3 === t3.level && r4.setAttribute("scriptlevel", "2"), e3.base && e3.base.text && 1 === e3.base.text.length) {
              const t4 = e3.base.text;
              "DHKLUcegorsuvxyz\u03A0\u03A5\u03A8\u03B1\u03B4\u03B7\u03B9\u03BC\u03BD\u03BF\u03C4\u03C5\u03C7\u03F5".indexOf(t4) > -1 ? r4.classes.push("tml-sml-pad") : "BCEFGIMNOPQRSTXZlpqtw\u0393\u0398\u039E\u03A3\u03A6\u03A9\u03B2\u03B5\u03B6\u03B8\u03BE\u03C1\u03C2\u03C6\u03C8\u03D1\u03D5\u03F1".indexOf(t4) > -1 ? r4.classes.push("tml-med-pad") : "AJdf\u0394\u039B".indexOf(t4) > -1 && r4.classes.push("tml-lrg-pad");
            }
            l2.push(r4);
          }
          let u2;
          if (o2) u2 = r3 ? "mover" : "munder";
          else if (e3.sub) if (e3.sup) {
            const r4 = e3.base;
            u2 = r4 && ("op" === r4.type && r4.limits || "multiscript" === r4.type) && (t3.level === We || r4.alwaysHandleSupSub) || r4 && "operatorname" === r4.type && r4.alwaysHandleSupSub && (t3.level === We || r4.limits) ? "munderover" : "msubsup";
          } else {
            const r4 = e3.base;
            u2 = e3.stack || r4 && "op" === r4.type && r4.limits && (t3.level === We || r4.alwaysHandleSupSub) || r4 && "operatorname" === r4.type && r4.alwaysHandleSupSub && (r4.limits || t3.level === We) ? "munder" : "msub";
          }
          else {
            const r4 = e3.base;
            u2 = r4 && "op" === r4.type && r4.limits && (t3.level === We || r4.alwaysHandleSupSub) || r4 && "operatorname" === r4.type && r4.alwaysHandleSupSub && (r4.limits || t3.level === We) ? "mover" : "msup";
          }
          let d2 = new k(u2, l2);
          if (a2) {
            const e4 = new k("mo", [ie("\u2061", "text")]);
            if (s2) {
              const t4 = new k("mspace");
              t4.setAttribute("width", "0.1667em"), d2 = q([t4, d2, e4]);
            } else d2 = q([d2, e4]);
            if (i2) {
              const e5 = new k("mspace");
              e5.setAttribute("width", "0.1667em"), d2.children.push(e5);
            }
          } else wr.test(u2) && (d2 = new k("mrow", [d2]));
          return d2;
        } });
        const Ar = ["\\shortmid", "\\nshortmid", "\\shortparallel", "\\nshortparallel", "\\smallsetminus"], Cr = ["\\Rsh", "\\Lsh", "\\restriction"];
        g({ type: "atom", mathmlBuilder(e3, t3) {
          const r3 = new k("mo", [ie(e3.text, e3.mode)]);
          if ("punct" === e3.family) r3.setAttribute("separator", "true");
          else if ("open" === e3.family || "close" === e3.family) "open" === e3.family ? (r3.setAttribute("form", "prefix"), r3.setAttribute("stretchy", "false")) : "close" === e3.family && (r3.setAttribute("form", "postfix"), r3.setAttribute("stretchy", "false"));
          else if ("\\mid" === e3.text) r3.setAttribute("lspace", "0.22em"), r3.setAttribute("rspace", "0.22em"), r3.setAttribute("stretchy", "false");
          else if ("rel" === e3.family && ((e4) => {
            if (1 === e4.length) {
              const t4 = e4.codePointAt(0);
              return 8591 < t4 && t4 < 8704;
            }
            return e4.indexOf("arrow") > -1 || e4.indexOf("harpoon") > -1 || Cr.includes(e4);
          })(e3.text)) r3.setAttribute("stretchy", "false");
          else if (Ar.includes(e3.text)) r3.setAttribute("mathsize", "70%");
          else if (":" === e3.text) r3.attributes.lspace = "0.2222em", r3.attributes.rspace = "0.2222em";
          else if (e3.needsSpacing) return "bin" === e3.family ? new k("mrow", [ke(0.222), r3, ke(0.222)]) : new k("mrow", [ke(0.2778), r3, ke(0.2778)]);
          return r3;
        } });
        const Er = { mathbf: "bold", mathrm: "normal", textit: "italic", mathit: "italic", mathnormal: "italic", mathbb: "double-struck", mathcal: "script", mathfrak: "fraktur", mathscr: "script", mathsf: "sans-serif", mathtt: "monospace" }, Sr = function(e3, t3) {
          if ("texttt" === t3.fontFamily) return "monospace";
          if ("textsc" === t3.fontFamily) return "normal";
          if ("textsf" === t3.fontFamily) return "textit" === t3.fontShape && "textbf" === t3.fontWeight ? "sans-serif-bold-italic" : "textit" === t3.fontShape ? "sans-serif-italic" : "textbf" === t3.fontWeight ? "sans-serif-bold" : "sans-serif";
          if ("textit" === t3.fontShape && "textbf" === t3.fontWeight) return "bold-italic";
          if ("textit" === t3.fontShape) return "italic";
          if ("textbf" === t3.fontWeight) return "bold";
          const r3 = t3.font;
          if (!r3 || "mathnormal" === r3) return null;
          const n3 = e3.mode;
          switch (r3) {
            case "mathit":
            case "greekItalic":
              return "italic";
            case "mathrm": {
              const t4 = e3.text.codePointAt(0);
              return 939 < t4 && t4 < 975 ? "italic" : "normal";
            }
            case "up@greek":
              return "normal";
            case "boldsymbol":
            case "mathboldsymbol":
              return "bold-italic";
            case "mathbf":
              return "bold";
            case "mathbb":
              return "double-struck";
            case "mathfrak":
              return "fraktur";
            case "mathscr":
            case "mathcal":
              return "script";
            case "mathsf":
              return "sans-serif";
            case "mathsfit":
              return "sans-serif-italic";
            case "mathtt":
              return "monospace";
          }
          let o2 = e3.text;
          return P[n3][o2] && P[n3][o2].replace && (o2 = P[n3][o2].replace), Object.prototype.hasOwnProperty.call(Er, r3) ? Er[r3] : null;
        }, _r = Object.freeze({ B: 8426, E: 8427, F: 8427, H: 8387, I: 8391, L: 8390, M: 8422, R: 8393, e: 8394, g: 8355, o: 8389 }), Tr = Object.freeze({ C: 8426, H: 8388, I: 8392, R: 8394, Z: 8398 }), qr = Object.freeze({ C: 8383, H: 8389, N: 8391, P: 8393, Q: 8393, R: 8395, Z: 8394 }), kr = Object.freeze({ "\u03F5": 119527, \u03D1: 119564, \u03F0: 119534, \u03C6: 119577, \u03F1: 119535, \u03D6: 119563 }), Nr = Object.freeze({ "\u03F5": 119643, \u03D1: 119680, \u03F0: 119650, \u03C6: 119693, \u03F1: 119651, \u03D6: 119679 }), Lr = Object.freeze({ "\u03F5": 119701, \u03D1: 119738, \u03F0: 119708, \u03C6: 119751, \u03F1: 119709, \u03D6: 119737 }), Or = Object.freeze({ "\u03F5": 119759, \u03D1: 119796, \u03F0: 119766, \u03C6: 119809, \u03F1: 119767, \u03D6: 119795 }), Mr = Object.freeze({ upperCaseLatin: { normal: (e3) => 0, bold: (e3) => 119743, italic: (e3) => 119795, "bold-italic": (e3) => 119847, script: (e3) => _r[e3] || 119899, "script-bold": (e3) => 119951, fraktur: (e3) => Tr[e3] || 120003, "fraktur-bold": (e3) => 120107, "double-struck": (e3) => qr[e3] || 120055, "sans-serif": (e3) => 120159, "sans-serif-bold": (e3) => 120211, "sans-serif-italic": (e3) => 120263, "sans-serif-bold-italic": (e3) => 120380, monospace: (e3) => 120367 }, lowerCaseLatin: { normal: (e3) => 0, bold: (e3) => 119737, italic: (e3) => "h" === e3 ? 8358 : 119789, "bold-italic": (e3) => 119841, script: (e3) => _r[e3] || 119893, "script-bold": (e3) => 119945, fraktur: (e3) => 119997, "fraktur-bold": (e3) => 120101, "double-struck": (e3) => 120049, "sans-serif": (e3) => 120153, "sans-serif-bold": (e3) => 120205, "sans-serif-italic": (e3) => 120257, "sans-serif-bold-italic": (e3) => 120309, monospace: (e3) => 120361 }, upperCaseGreek: { normal: (e3) => 0, bold: (e3) => 119575, italic: (e3) => 119633, "bold-italic": (e3) => 119575, script: (e3) => 0, "script-bold": (e3) => 0, fraktur: (e3) => 0, "fraktur-bold": (e3) => 0, "double-struck": (e3) => 0, "sans-serif": (e3) => 119749, "sans-serif-bold": (e3) => 119749, "sans-serif-italic": (e3) => 0, "sans-serif-bold-italic": (e3) => 119807, monospace: (e3) => 0 }, lowerCaseGreek: { normal: (e3) => 0, bold: (e3) => 119569, italic: (e3) => 119627, "bold-italic": (e3) => "\u03D5" === e3 ? 119678 : 119685, script: (e3) => 0, "script-bold": (e3) => 0, fraktur: (e3) => 0, "fraktur-bold": (e3) => 0, "double-struck": (e3) => 0, "sans-serif": (e3) => 119743, "sans-serif-bold": (e3) => 119743, "sans-serif-italic": (e3) => 0, "sans-serif-bold-italic": (e3) => 119801, monospace: (e3) => 0 }, varGreek: { normal: (e3) => 0, bold: (e3) => kr[e3] || -51, italic: (e3) => 0, "bold-italic": (e3) => Nr[e3] || 58, script: (e3) => 0, "script-bold": (e3) => 0, fraktur: (e3) => 0, "fraktur-bold": (e3) => 0, "double-struck": (e3) => 0, "sans-serif": (e3) => Lr[e3] || 116, "sans-serif-bold": (e3) => Lr[e3] || 116, "sans-serif-italic": (e3) => 0, "sans-serif-bold-italic": (e3) => Or[e3] || 174, monospace: (e3) => 0 }, numeral: { normal: (e3) => 0, bold: (e3) => 120734, italic: (e3) => 0, "bold-italic": (e3) => 0, script: (e3) => 0, "script-bold": (e3) => 0, fraktur: (e3) => 0, "fraktur-bold": (e3) => 0, "double-struck": (e3) => 120744, "sans-serif": (e3) => 120754, "sans-serif-bold": (e3) => 120764, "sans-serif-italic": (e3) => 0, "sans-serif-bold-italic": (e3) => 0, monospace: (e3) => 120774 } }), Dr = (e3, t3) => {
          const r3 = e3.codePointAt(0), n3 = 64 < r3 && r3 < 91 ? "upperCaseLatin" : 96 < r3 && r3 < 123 ? "lowerCaseLatin" : 912 < r3 && r3 < 938 ? "upperCaseGreek" : 944 < r3 && r3 < 970 || "\u03D5" === e3 ? "lowerCaseGreek" : 120545 < r3 && r3 < 120572 || kr[e3] ? "varGreek" : 47 < r3 && r3 < 58 ? "numeral" : "other";
          return "other" === n3 ? e3 : String.fromCodePoint(r3 + Mr[n3][t3](e3));
        }, Br = Object.freeze({ a: "\u1D00", b: "\u0299", c: "\u1D04", d: "\u1D05", e: "\u1D07", f: "\uA730", g: "\u0262", h: "\u029C", i: "\u026A", j: "\u1D0A", k: "\u1D0B", l: "\u029F", m: "\u1D0D", n: "\u0274", o: "\u1D0F", p: "\u1D18", q: "\u01EB", r: "\u0280", s: "s", t: "\u1D1B", u: "\u1D1C", v: "\u1D20", w: "\u1D21", x: "x", y: "\u028F", z: "\u1D22" }), $r = /^\d(?:[\d,.]*\d)?$/, Ir = /[A-Ba-z]/, Rr = /* @__PURE__ */ new Set(["\\prime", "\\dprime", "\\trprime", "\\qprime", "\\backprime", "\\backdprime", "\\backtrprime"]);
        g({ type: "mathord", mathmlBuilder(e3, t3) {
          const r3 = ie(e3.text, e3.mode, t3), n3 = r3.text.codePointAt(0), o2 = 912 < n3 && n3 < 938 ? "normal" : "italic", a2 = Sr(e3, t3) || o2;
          if ("script" === a2) return r3.text = Dr(r3.text, a2), new k("mi", [r3], [t3.font]);
          "italic" !== a2 && (r3.text = Dr(r3.text, a2));
          let i2 = new k("mi", [r3]);
          return "normal" === a2 && (i2.setAttribute("mathvariant", "normal"), 1 === r3.text.length && (i2 = new k("mpadded", [i2]), i2.setAttribute("lspace", "0"))), i2;
        } }), g({ type: "textord", mathmlBuilder(e3, t3) {
          let r3 = e3.text;
          const n3 = r3.codePointAt(0);
          "textsc" === t3.fontFamily && 96 < n3 && n3 < 123 && (r3 = Br[r3]);
          const o2 = ie(r3, e3.mode, t3), a2 = Sr(e3, t3) || "normal";
          let i2;
          if ($r.test(e3.text)) {
            const t4 = "text" === e3.mode ? "mtext" : "mn";
            if ("italic" === a2 || "bold-italic" === a2) return ((e4, t5, r4) => {
              const n4 = new k(r4, [e4]), o3 = new k("mstyle", [n4]);
              return o3.style["font-style"] = "italic", o3.style["font-family"] = "Cambria, 'Times New Roman', serif", "bold-italic" === t5 && (o3.style["font-weight"] = "bold"), o3;
            })(o2, a2, t4);
            "normal" !== a2 && (o2.text = o2.text.split("").map(((e4) => Dr(e4, a2))).join("")), i2 = new k(t4, [o2]);
          } else if ("text" === e3.mode) "normal" !== a2 && (o2.text = Dr(o2.text, a2)), i2 = new k("mtext", [o2]);
          else if (Rr.has(e3.text)) i2 = new k("mo", [o2]), i2.classes.push("tml-prime");
          else {
            const e4 = o2.text;
            "italic" !== a2 && (o2.text = Dr(o2.text, a2)), i2 = new k("mi", [o2]), o2.text === e4 && Ir.test(e4) && i2.setAttribute("mathvariant", "italic");
          }
          return i2;
        } });
        const Pr = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" }, Fr = { " ": {}, "\\ ": {}, "~": { className: "nobreak" }, "\\space": {}, "\\nobreakspace": { className: "nobreak" } };
        g({ type: "spacing", mathmlBuilder(e3, r3) {
          let n3;
          if (Object.prototype.hasOwnProperty.call(Fr, e3.text)) n3 = new k("mtext", [new N("\xA0")]);
          else {
            if (!Object.prototype.hasOwnProperty.call(Pr, e3.text)) throw new t2(`Unknown type of space "${e3.text}"`);
            n3 = new k("mo"), "\\nobreak" === e3.text && n3.setAttribute("linebreak", "nobreak");
          }
          return n3;
        } }), g({ type: "tag" });
        const jr = { "\\text": void 0, "\\textrm": "textrm", "\\textsf": "textsf", "\\texttt": "texttt", "\\textnormal": "textrm", "\\textsc": "textsc" }, zr = { "\\textbf": "textbf", "\\textmd": "textmd" }, Hr = { "\\textit": "textit", "\\textup": "textup" };
        f({ type: "text", names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textsc", "\\textbf", "\\textmd", "\\textit", "\\textup", "\\emph"], props: { numArgs: 1, argTypes: ["text"], allowedInArgument: true, allowedInText: true }, handler({ parser: e3, funcName: t3 }, r3) {
          const n3 = r3[0];
          return { type: "text", mode: e3.mode, body: x(n3), font: t3 };
        }, mathmlBuilder(e3, t3) {
          const r3 = ((e4, t4) => {
            const r4 = e4.font;
            return r4 ? jr[r4] ? t4.withTextFontFamily(jr[r4]) : zr[r4] ? t4.withTextFontWeight(zr[r4]) : "\\emph" === r4 ? "textit" === t4.fontShape ? t4.withTextFontShape("textup") : t4.withTextFontShape("textit") : t4.withTextFontShape(Hr[r4]) : t4;
          })(e3, t3), n3 = pe(e3.body, r3);
          return le(n3);
        } }), f({ type: "vcenter", names: ["\\vcenter"], props: { numArgs: 1, argTypes: ["original"], allowedInText: false }, handler: ({ parser: e3 }, t3) => ({ type: "vcenter", mode: e3.mode, body: t3[0] }), mathmlBuilder(e3, t3) {
          const r3 = new k("mtd", [fe(e3.body, t3)]);
          r3.style.padding = "0";
          const n3 = new k("mtr", [r3]);
          return new k("mtable", [n3]);
        } }), f({ type: "verb", names: ["\\verb"], props: { numArgs: 0, allowedInText: true }, handler(e3, r3, n3) {
          throw new t2("\\verb ended by end of line instead of matching delimiter");
        }, mathmlBuilder(e3, t3) {
          const r3 = new N(Ur(e3)), n3 = new k("mtext", [r3]);
          return n3.setAttribute("mathvariant", "monospace"), n3;
        } });
        const Ur = (e3) => e3.body.replace(/ /g, e3.star ? "\u2423" : "\xA0"), Gr = m, Wr = "[ \r\n	]", Vr = `(\\\\[a-zA-Z@]+)${Wr}*`, Xr = "[\u0300-\u036F]", Jr = new RegExp(`${Xr}+$`), Zr = `(${Wr}+)|\\\\(
|[ \r	]+
?)[ \r	]*|([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]${Xr}*|[\uD800-\uDBFF][\uDC00-\uDFFF]${Xr}*|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|${Vr}|\\\\[^\uD800-\uDFFF])`;
        class Yr {
          constructor(e3, t3) {
            this.input = e3, this.settings = t3, this.tokenRegex = new RegExp(Zr, "g"), this.catcodes = { "%": 14, "~": 13 };
          }
          setCatcode(e3, t3) {
            this.catcodes[e3] = t3;
          }
          lex() {
            const e3 = this.input, r3 = this.tokenRegex.lastIndex;
            if (r3 === e3.length) return new Ge("EOF", new Ue(this, r3, r3));
            const n3 = this.tokenRegex.exec(e3);
            if (null === n3 || n3.index !== r3) throw new t2(`Unexpected character: '${e3[r3]}'`, new Ge(e3[r3], new Ue(this, r3, r3 + 1)));
            const o2 = n3[6] || n3[3] || (n3[2] ? "\\ " : " ");
            if (14 === this.catcodes[o2]) {
              const r4 = e3.indexOf("\n", this.tokenRegex.lastIndex);
              if (-1 === r4) {
                if (this.tokenRegex.lastIndex = e3.length, this.settings.strict) throw new t2("% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode");
              } else this.tokenRegex.lastIndex = r4 + 1;
              return this.lex();
            }
            return new Ge(o2, new Ue(this, r3, this.tokenRegex.lastIndex));
          }
        }
        class Kr {
          constructor(e3 = {}, t3 = {}) {
            this.current = t3, this.builtins = e3, this.undefStack = [];
          }
          beginGroup() {
            this.undefStack.push({});
          }
          endGroup() {
            if (0 === this.undefStack.length) throw new t2("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
            const e3 = this.undefStack.pop();
            for (const t3 in e3) Object.prototype.hasOwnProperty.call(e3, t3) && (void 0 === e3[t3] ? delete this.current[t3] : this.current[t3] = e3[t3]);
          }
          has(e3) {
            return Object.prototype.hasOwnProperty.call(this.current, e3) || Object.prototype.hasOwnProperty.call(this.builtins, e3);
          }
          get(e3) {
            return Object.prototype.hasOwnProperty.call(this.current, e3) ? this.current[e3] : this.builtins[e3];
          }
          set(e3, t3, r3 = false) {
            if (r3) {
              for (let t4 = 0; t4 < this.undefStack.length; t4++) delete this.undefStack[t4][e3];
              this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e3] = t3);
            } else {
              const t4 = this.undefStack[this.undefStack.length - 1];
              t4 && !Object.prototype.hasOwnProperty.call(t4, e3) && (t4[e3] = this.current[e3]);
            }
            this.current[e3] = t3;
          }
        }
        const Qr = { "^": true, _: true, "\\limits": true, "\\nolimits": true };
        class en {
          constructor(e3, t3, r3) {
            this.settings = t3, this.expansionCount = 0, this.feed(e3), this.macros = new Kr(Ke, t3.macros), this.mode = r3, this.stack = [];
          }
          feed(e3) {
            this.lexer = new Yr(e3, this.settings);
          }
          switchMode(e3) {
            this.mode = e3;
          }
          beginGroup() {
            this.macros.beginGroup();
          }
          endGroup() {
            this.macros.endGroup();
          }
          future() {
            return 0 === this.stack.length && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
          }
          popToken() {
            return this.future(), this.stack.pop();
          }
          pushToken(e3) {
            this.stack.push(e3);
          }
          pushTokens(e3) {
            this.stack.push(...e3);
          }
          scanArgument(e3) {
            let t3, r3, n3;
            if (e3) {
              if (this.consumeSpaces(), "[" !== this.future().text) return null;
              t3 = this.popToken(), { tokens: n3, end: r3 } = this.consumeArg(["]"]);
            } else ({ tokens: n3, start: t3, end: r3 } = this.consumeArg());
            return this.pushToken(new Ge("EOF", r3.loc)), this.pushTokens(n3), t3.range(r3, "");
          }
          consumeSpaces() {
            for (; ; ) {
              if (" " !== this.future().text) break;
              this.stack.pop();
            }
          }
          consumeArg(e3) {
            const r3 = [], n3 = e3 && e3.length > 0;
            n3 || this.consumeSpaces();
            const o2 = this.future();
            let a2, i2 = 0, s2 = 0;
            do {
              if (a2 = this.popToken(), r3.push(a2), "{" === a2.text) ++i2;
              else if ("}" === a2.text) {
                if (--i2, -1 === i2) throw new t2("Extra }", a2);
              } else if ("EOF" === a2.text) throw new t2("Unexpected end of input in a macro argument, expected '" + (e3 && n3 ? e3[s2] : "}") + "'", a2);
              if (e3 && n3) if ((0 === i2 || 1 === i2 && "{" === e3[s2]) && a2.text === e3[s2]) {
                if (++s2, s2 === e3.length) {
                  r3.splice(-s2, s2);
                  break;
                }
              } else s2 = 0;
            } while (0 !== i2 || n3);
            return "{" === o2.text && "}" === r3[r3.length - 1].text && (r3.pop(), r3.shift()), r3.reverse(), { tokens: r3, start: o2, end: a2 };
          }
          consumeArgs(e3, r3) {
            if (r3) {
              if (r3.length !== e3 + 1) throw new t2("The length of delimiters doesn't match the number of args!");
              const n4 = r3[0];
              for (let e4 = 0; e4 < n4.length; e4++) {
                const r4 = this.popToken();
                if (n4[e4] !== r4.text) throw new t2("Use of the macro doesn't match its definition", r4);
              }
            }
            const n3 = [];
            for (let t3 = 0; t3 < e3; t3++) n3.push(this.consumeArg(r3 && r3[t3 + 1]).tokens);
            return n3;
          }
          expandOnce(e3) {
            const r3 = this.popToken(), n3 = r3.text, o2 = r3.noexpand ? null : this._getExpansion(n3);
            if (null == o2 || e3 && o2.unexpandable) {
              if (e3 && null == o2 && "\\" === n3[0] && !this.isDefined(n3)) throw new t2("Undefined control sequence: " + n3);
              return this.pushToken(r3), false;
            }
            if (this.expansionCount++, this.expansionCount > this.settings.maxExpand) throw new t2("Too many expansions: infinite loop or need to increase maxExpand setting");
            let a2 = o2.tokens;
            const i2 = this.consumeArgs(o2.numArgs, o2.delimiters);
            if (o2.numArgs) {
              a2 = a2.slice();
              for (let e4 = a2.length - 1; e4 >= 0; --e4) {
                let r4 = a2[e4];
                if ("#" === r4.text) {
                  if (0 === e4) throw new t2("Incomplete placeholder at end of macro body", r4);
                  if (r4 = a2[--e4], "#" === r4.text) a2.splice(e4 + 1, 1);
                  else {
                    if (!/^[1-9]$/.test(r4.text)) throw new t2("Not a valid argument number", r4);
                    a2.splice(e4, 2, ...i2[+r4.text - 1]);
                  }
                }
              }
            }
            return this.pushTokens(a2), a2.length;
          }
          expandAfterFuture() {
            return this.expandOnce(), this.future();
          }
          expandNextToken() {
            for (; ; ) if (false === this.expandOnce()) {
              const e3 = this.stack.pop();
              return e3.treatAsRelax && (e3.text = "\\relax"), e3;
            }
            throw new Error();
          }
          expandMacro(e3) {
            return this.macros.has(e3) ? this.expandTokens([new Ge(e3)]) : void 0;
          }
          expandTokens(e3) {
            const t3 = [], r3 = this.stack.length;
            for (this.pushTokens(e3); this.stack.length > r3; ) if (false === this.expandOnce(true)) {
              const e4 = this.stack.pop();
              e4.treatAsRelax && (e4.noexpand = false, e4.treatAsRelax = false), t3.push(e4);
            }
            return t3;
          }
          expandMacroAsText(e3) {
            const t3 = this.expandMacro(e3);
            return t3 ? t3.map(((e4) => e4.text)).join("") : t3;
          }
          _getExpansion(e3) {
            const t3 = this.macros.get(e3);
            if (null == t3) return t3;
            if (1 === e3.length) {
              const t4 = this.lexer.catcodes[e3];
              if (null != t4 && 13 !== t4) return;
            }
            const r3 = "function" == typeof t3 ? t3(this) : t3;
            if ("string" == typeof r3) {
              let e4 = 0;
              if (-1 !== r3.indexOf("#")) {
                const t5 = r3.replace(/##/g, "");
                for (; -1 !== t5.indexOf("#" + (e4 + 1)); ) ++e4;
              }
              const t4 = new Yr(r3, this.settings), n3 = [];
              let o2 = t4.lex();
              for (; "EOF" !== o2.text; ) n3.push(o2), o2 = t4.lex();
              n3.reverse();
              return { tokens: n3, numArgs: e4 };
            }
            return r3;
          }
          isDefined(e3) {
            return this.macros.has(e3) || Object.prototype.hasOwnProperty.call(Gr, e3) || Object.prototype.hasOwnProperty.call(P.math, e3) || Object.prototype.hasOwnProperty.call(P.text, e3) || Object.prototype.hasOwnProperty.call(Qr, e3);
          }
          isExpandable(e3) {
            const t3 = this.macros.get(e3);
            return null != t3 ? "string" == typeof t3 || "function" == typeof t3 || !t3.unexpandable : Object.prototype.hasOwnProperty.call(Gr, e3) && !Gr[e3].primitive;
          }
        }
        const tn = /^[\u208a\u208b\u208c\u208d\u208e\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u2090\u2091\u2095\u1d62\u2c7c\u2096\u2097\u2098\u2099\u2092\u209a\u1d63\u209b\u209c\u1d64\u1d65\u2093\u1d66\u1d67\u1d68\u1d69\u1d6a]/, rn = Object.freeze({ "\u208A": "+", "\u208B": "-", "\u208C": "=", "\u208D": "(", "\u208E": ")", "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u2090": "a", "\u2091": "e", "\u2095": "h", "\u1D62": "i", "\u2C7C": "j", "\u2096": "k", "\u2097": "l", "\u2098": "m", "\u2099": "n", "\u2092": "o", "\u209A": "p", "\u1D63": "r", "\u209B": "s", "\u209C": "t", "\u1D64": "u", "\u1D65": "v", "\u2093": "x", "\u1D66": "\u03B2", "\u1D67": "\u03B3", "\u1D68": "\u03C1", "\u1D69": "\u03D5", "\u1D6A": "\u03C7", "\u207A": "+", "\u207B": "-", "\u207C": "=", "\u207D": "(", "\u207E": ")", "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u1D2C": "A", "\u1D2E": "B", "\u1D30": "D", "\u1D31": "E", "\u1D33": "G", "\u1D34": "H", "\u1D35": "I", "\u1D36": "J", "\u1D37": "K", "\u1D38": "L", "\u1D39": "M", "\u1D3A": "N", "\u1D3C": "O", "\u1D3E": "P", "\u1D3F": "R", "\u1D40": "T", "\u1D41": "U", "\u2C7D": "V", "\u1D42": "W", "\u1D43": "a", "\u1D47": "b", "\u1D9C": "c", "\u1D48": "d", "\u1D49": "e", "\u1DA0": "f", "\u1D4D": "g", \u02B0: "h", "\u2071": "i", \u02B2: "j", "\u1D4F": "k", \u02E1: "l", "\u1D50": "m", \u207F: "n", "\u1D52": "o", "\u1D56": "p", \u02B3: "r", \u02E2: "s", "\u1D57": "t", "\u1D58": "u", "\u1D5B": "v", \u02B7: "w", \u02E3: "x", \u02B8: "y", "\u1DBB": "z", "\u1D5D": "\u03B2", "\u1D5E": "\u03B3", "\u1D5F": "\u03B4", "\u1D60": "\u03D5", "\u1D61": "\u03C7", "\u1DBF": "\u03B8" }), nn = Object.freeze({ "\u{1D49C}": "A", \u212C: "B", "\u{1D49E}": "C", "\u{1D49F}": "D", \u2130: "E", \u2131: "F", "\u{1D4A2}": "G", \u210B: "H", \u2110: "I", "\u{1D4A5}": "J", "\u{1D4A6}": "K", \u2112: "L", \u2133: "M", "\u{1D4A9}": "N", "\u{1D4AA}": "O", "\u{1D4AB}": "P", "\u{1D4AC}": "Q", \u211B: "R", "\u{1D4AE}": "S", "\u{1D4AF}": "T", "\u{1D4B0}": "U", "\u{1D4B1}": "V", "\u{1D4B2}": "W", "\u{1D4B3}": "X", "\u{1D4B4}": "Y", "\u{1D4B5}": "Z" });
        var on = { "\u0301": { text: "\\'", math: "\\acute" }, "\u0300": { text: "\\`", math: "\\grave" }, "\u0308": { text: '\\"', math: "\\ddot" }, "\u0303": { text: "\\~", math: "\\tilde" }, "\u0304": { text: "\\=", math: "\\bar" }, "\u0306": { text: "\\u", math: "\\breve" }, "\u030C": { text: "\\v", math: "\\check" }, "\u0302": { text: "\\^", math: "\\hat" }, "\u0307": { text: "\\.", math: "\\dot" }, "\u030A": { text: "\\r", math: "\\mathring" }, "\u030B": { text: "\\H" }, "\u0327": { text: "\\c" } }, an = { \u00E1: "a\u0301", \u00E0: "a\u0300", \u00E4: "a\u0308", \u01DF: "a\u0308\u0304", \u00E3: "a\u0303", \u0101: "a\u0304", \u0103: "a\u0306", \u1EAF: "a\u0306\u0301", \u1EB1: "a\u0306\u0300", \u1EB5: "a\u0306\u0303", \u01CE: "a\u030C", \u00E2: "a\u0302", \u1EA5: "a\u0302\u0301", \u1EA7: "a\u0302\u0300", \u1EAB: "a\u0302\u0303", \u0227: "a\u0307", \u01E1: "a\u0307\u0304", \u00E5: "a\u030A", \u01FB: "a\u030A\u0301", \u1E03: "b\u0307", \u0107: "c\u0301", \u010D: "c\u030C", \u0109: "c\u0302", \u010B: "c\u0307", \u010F: "d\u030C", \u1E0B: "d\u0307", \u00E9: "e\u0301", \u00E8: "e\u0300", \u00EB: "e\u0308", \u1EBD: "e\u0303", \u0113: "e\u0304", \u1E17: "e\u0304\u0301", \u1E15: "e\u0304\u0300", \u0115: "e\u0306", \u011B: "e\u030C", \u00EA: "e\u0302", \u1EBF: "e\u0302\u0301", \u1EC1: "e\u0302\u0300", \u1EC5: "e\u0302\u0303", \u0117: "e\u0307", \u1E1F: "f\u0307", \u01F5: "g\u0301", \u1E21: "g\u0304", \u011F: "g\u0306", \u01E7: "g\u030C", \u011D: "g\u0302", \u0121: "g\u0307", \u1E27: "h\u0308", \u021F: "h\u030C", \u0125: "h\u0302", \u1E23: "h\u0307", \u00ED: "i\u0301", \u00EC: "i\u0300", \u00EF: "i\u0308", \u1E2F: "i\u0308\u0301", \u0129: "i\u0303", \u012B: "i\u0304", \u012D: "i\u0306", \u01D0: "i\u030C", \u00EE: "i\u0302", \u01F0: "j\u030C", \u0135: "j\u0302", \u1E31: "k\u0301", \u01E9: "k\u030C", \u013A: "l\u0301", \u013E: "l\u030C", \u1E3F: "m\u0301", \u1E41: "m\u0307", \u0144: "n\u0301", \u01F9: "n\u0300", \u00F1: "n\u0303", \u0148: "n\u030C", \u1E45: "n\u0307", \u00F3: "o\u0301", \u00F2: "o\u0300", \u00F6: "o\u0308", \u022B: "o\u0308\u0304", \u00F5: "o\u0303", \u1E4D: "o\u0303\u0301", \u1E4F: "o\u0303\u0308", \u022D: "o\u0303\u0304", \u014D: "o\u0304", \u1E53: "o\u0304\u0301", \u1E51: "o\u0304\u0300", \u014F: "o\u0306", \u01D2: "o\u030C", \u00F4: "o\u0302", \u1ED1: "o\u0302\u0301", \u1ED3: "o\u0302\u0300", \u1ED7: "o\u0302\u0303", \u022F: "o\u0307", \u0231: "o\u0307\u0304", \u0151: "o\u030B", \u1E55: "p\u0301", \u1E57: "p\u0307", \u0155: "r\u0301", \u0159: "r\u030C", \u1E59: "r\u0307", \u015B: "s\u0301", \u1E65: "s\u0301\u0307", \u0161: "s\u030C", \u1E67: "s\u030C\u0307", \u015D: "s\u0302", \u1E61: "s\u0307", \u1E97: "t\u0308", \u0165: "t\u030C", \u1E6B: "t\u0307", \u00FA: "u\u0301", \u00F9: "u\u0300", \u00FC: "u\u0308", \u01D8: "u\u0308\u0301", \u01DC: "u\u0308\u0300", \u01D6: "u\u0308\u0304", \u01DA: "u\u0308\u030C", \u0169: "u\u0303", \u1E79: "u\u0303\u0301", \u016B: "u\u0304", \u1E7B: "u\u0304\u0308", \u016D: "u\u0306", \u01D4: "u\u030C", \u00FB: "u\u0302", \u016F: "u\u030A", \u0171: "u\u030B", \u1E7D: "v\u0303", \u1E83: "w\u0301", \u1E81: "w\u0300", \u1E85: "w\u0308", \u0175: "w\u0302", \u1E87: "w\u0307", \u1E98: "w\u030A", \u1E8D: "x\u0308", \u1E8B: "x\u0307", \u00FD: "y\u0301", \u1EF3: "y\u0300", \u00FF: "y\u0308", \u1EF9: "y\u0303", \u0233: "y\u0304", \u0177: "y\u0302", \u1E8F: "y\u0307", \u1E99: "y\u030A", \u017A: "z\u0301", \u017E: "z\u030C", \u1E91: "z\u0302", \u017C: "z\u0307", \u00C1: "A\u0301", \u00C0: "A\u0300", \u00C4: "A\u0308", \u01DE: "A\u0308\u0304", \u00C3: "A\u0303", \u0100: "A\u0304", \u0102: "A\u0306", \u1EAE: "A\u0306\u0301", \u1EB0: "A\u0306\u0300", \u1EB4: "A\u0306\u0303", \u01CD: "A\u030C", \u00C2: "A\u0302", \u1EA4: "A\u0302\u0301", \u1EA6: "A\u0302\u0300", \u1EAA: "A\u0302\u0303", \u0226: "A\u0307", \u01E0: "A\u0307\u0304", \u00C5: "A\u030A", \u01FA: "A\u030A\u0301", \u1E02: "B\u0307", \u0106: "C\u0301", \u010C: "C\u030C", \u0108: "C\u0302", \u010A: "C\u0307", \u010E: "D\u030C", \u1E0A: "D\u0307", \u00C9: "E\u0301", \u00C8: "E\u0300", \u00CB: "E\u0308", \u1EBC: "E\u0303", \u0112: "E\u0304", \u1E16: "E\u0304\u0301", \u1E14: "E\u0304\u0300", \u0114: "E\u0306", \u011A: "E\u030C", \u00CA: "E\u0302", \u1EBE: "E\u0302\u0301", \u1EC0: "E\u0302\u0300", \u1EC4: "E\u0302\u0303", \u0116: "E\u0307", \u1E1E: "F\u0307", \u01F4: "G\u0301", \u1E20: "G\u0304", \u011E: "G\u0306", \u01E6: "G\u030C", \u011C: "G\u0302", \u0120: "G\u0307", \u1E26: "H\u0308", \u021E: "H\u030C", \u0124: "H\u0302", \u1E22: "H\u0307", \u00CD: "I\u0301", \u00CC: "I\u0300", \u00CF: "I\u0308", \u1E2E: "I\u0308\u0301", \u0128: "I\u0303", \u012A: "I\u0304", \u012C: "I\u0306", \u01CF: "I\u030C", \u00CE: "I\u0302", \u0130: "I\u0307", \u0134: "J\u0302", \u1E30: "K\u0301", \u01E8: "K\u030C", \u0139: "L\u0301", \u013D: "L\u030C", \u1E3E: "M\u0301", \u1E40: "M\u0307", \u0143: "N\u0301", \u01F8: "N\u0300", \u00D1: "N\u0303", \u0147: "N\u030C", \u1E44: "N\u0307", \u00D3: "O\u0301", \u00D2: "O\u0300", \u00D6: "O\u0308", \u022A: "O\u0308\u0304", \u00D5: "O\u0303", \u1E4C: "O\u0303\u0301", \u1E4E: "O\u0303\u0308", \u022C: "O\u0303\u0304", \u014C: "O\u0304", \u1E52: "O\u0304\u0301", \u1E50: "O\u0304\u0300", \u014E: "O\u0306", \u01D1: "O\u030C", \u00D4: "O\u0302", \u1ED0: "O\u0302\u0301", \u1ED2: "O\u0302\u0300", \u1ED6: "O\u0302\u0303", \u022E: "O\u0307", \u0230: "O\u0307\u0304", \u0150: "O\u030B", \u1E54: "P\u0301", \u1E56: "P\u0307", \u0154: "R\u0301", \u0158: "R\u030C", \u1E58: "R\u0307", \u015A: "S\u0301", \u1E64: "S\u0301\u0307", \u0160: "S\u030C", \u1E66: "S\u030C\u0307", \u015C: "S\u0302", \u1E60: "S\u0307", \u0164: "T\u030C", \u1E6A: "T\u0307", \u00DA: "U\u0301", \u00D9: "U\u0300", \u00DC: "U\u0308", \u01D7: "U\u0308\u0301", \u01DB: "U\u0308\u0300", \u01D5: "U\u0308\u0304", \u01D9: "U\u0308\u030C", \u0168: "U\u0303", \u1E78: "U\u0303\u0301", \u016A: "U\u0304", \u1E7A: "U\u0304\u0308", \u016C: "U\u0306", \u01D3: "U\u030C", \u00DB: "U\u0302", \u016E: "U\u030A", \u0170: "U\u030B", \u1E7C: "V\u0303", \u1E82: "W\u0301", \u1E80: "W\u0300", \u1E84: "W\u0308", \u0174: "W\u0302", \u1E86: "W\u0307", \u1E8C: "X\u0308", \u1E8A: "X\u0307", \u00DD: "Y\u0301", \u1EF2: "Y\u0300", \u0178: "Y\u0308", \u1EF8: "Y\u0303", \u0232: "Y\u0304", \u0176: "Y\u0302", \u1E8E: "Y\u0307", \u0179: "Z\u0301", \u017D: "Z\u030C", \u1E90: "Z\u0302", \u017B: "Z\u0307", \u03AC: "\u03B1\u0301", \u1F70: "\u03B1\u0300", \u1FB1: "\u03B1\u0304", \u1FB0: "\u03B1\u0306", \u03AD: "\u03B5\u0301", \u1F72: "\u03B5\u0300", \u03AE: "\u03B7\u0301", \u1F74: "\u03B7\u0300", \u03AF: "\u03B9\u0301", \u1F76: "\u03B9\u0300", \u03CA: "\u03B9\u0308", \u0390: "\u03B9\u0308\u0301", \u1FD2: "\u03B9\u0308\u0300", \u1FD1: "\u03B9\u0304", \u1FD0: "\u03B9\u0306", \u03CC: "\u03BF\u0301", \u1F78: "\u03BF\u0300", \u03CD: "\u03C5\u0301", \u1F7A: "\u03C5\u0300", \u03CB: "\u03C5\u0308", \u03B0: "\u03C5\u0308\u0301", \u1FE2: "\u03C5\u0308\u0300", \u1FE1: "\u03C5\u0304", \u1FE0: "\u03C5\u0306", \u03CE: "\u03C9\u0301", \u1F7C: "\u03C9\u0300", \u038E: "\u03A5\u0301", \u1FEA: "\u03A5\u0300", \u03AB: "\u03A5\u0308", \u1FE9: "\u03A5\u0304", \u1FE8: "\u03A5\u0306", \u038F: "\u03A9\u0301", \u1FFA: "\u03A9\u0300" };
        const sn = ["bin", "op", "open", "punct", "rel"], ln = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/, cn = /^ *\\text/;
        class un {
          constructor(e3, t3, r3 = false) {
            this.mode = "math", this.gullet = new en(e3, t3, this.mode), this.settings = t3, this.isPreamble = r3, this.leftrightDepth = 0, this.prevAtomType = "";
          }
          expect(e3, r3 = true) {
            if (this.fetch().text !== e3) throw new t2(`Expected '${e3}', got '${this.fetch().text}'`, this.fetch());
            r3 && this.consume();
          }
          consume() {
            this.nextToken = null;
          }
          fetch() {
            return null == this.nextToken && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
          }
          switchMode(e3) {
            this.mode = e3, this.gullet.switchMode(e3);
          }
          parse() {
            this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
            const e3 = this.parseExpression(false);
            if (this.expect("EOF"), this.isPreamble) {
              const e4 = /* @__PURE__ */ Object.create(null);
              return Object.entries(this.gullet.macros.current).forEach((([t4, r3]) => {
                e4[t4] = r3;
              })), this.gullet.endGroup(), e4;
            }
            const t3 = this.gullet.macros.get("\\df@tag");
            return this.gullet.endGroup(), t3 && (this.gullet.macros.current["\\df@tag"] = t3), e3;
          }
          static get endOfExpression() {
            return ["}", "\\endgroup", "\\end", "\\right", "\\endtoggle", "&"];
          }
          subparse(e3) {
            const t3 = this.nextToken;
            this.consume(), this.gullet.pushToken(new Ge("}")), this.gullet.pushTokens(e3);
            const r3 = this.parseExpression(false);
            return this.expect("}"), this.nextToken = t3, r3;
          }
          parseExpression(e3, t3, r3) {
            const n3 = [];
            for (this.prevAtomType = ""; ; ) {
              "math" === this.mode && this.consumeSpaces();
              const o2 = this.fetch();
              if (-1 !== un.endOfExpression.indexOf(o2.text)) break;
              if (t3 && o2.text === t3) break;
              if (r3 && "\\middle" === o2.text) break;
              if (e3 && Gr[o2.text] && Gr[o2.text].infix) break;
              const a2 = this.parseAtom(t3);
              if (!a2) break;
              "internal" !== a2.type && (n3.push(a2), this.prevAtomType = "atom" === a2.type ? a2.family : a2.type);
            }
            return "text" === this.mode && this.formLigatures(n3), this.handleInfixNodes(n3);
          }
          handleInfixNodes(e3) {
            let r3, n3 = -1;
            for (let o2 = 0; o2 < e3.length; o2++) if ("infix" === e3[o2].type) {
              if (-1 !== n3) throw new t2("only one infix operator per group", e3[o2].token);
              n3 = o2, r3 = e3[o2].replaceWith;
            }
            if (-1 !== n3 && r3) {
              let t3, o2;
              const a2 = e3.slice(0, n3), i2 = e3.slice(n3 + 1);
              let s2;
              return t3 = 1 === a2.length && "ordgroup" === a2[0].type ? a2[0] : { type: "ordgroup", mode: this.mode, body: a2 }, o2 = 1 === i2.length && "ordgroup" === i2[0].type ? i2[0] : { type: "ordgroup", mode: this.mode, body: i2 }, s2 = "\\\\abovefrac" === r3 ? this.callFunction(r3, [t3, e3[n3], o2], []) : this.callFunction(r3, [t3, o2], []), [s2];
            }
            return e3;
          }
          handleSupSubscript(e3) {
            const r3 = this.fetch(), n3 = r3.text;
            let o2;
            this.consume(), this.consumeSpaces();
            do {
              o2 = this.parseGroup(e3);
            } while (o2.type && "internal" === o2.type);
            if (!o2) throw new t2("Expected group after '" + n3 + "'", r3);
            return o2;
          }
          formatUnsupportedCmd(e3) {
            const t3 = [];
            for (let r4 = 0; r4 < e3.length; r4++) t3.push({ type: "textord", mode: "text", text: e3[r4] });
            const r3 = { type: "text", mode: this.mode, body: t3 };
            return { type: "color", mode: this.mode, color: this.settings.errorColor, body: [r3] };
          }
          parseAtom(e3) {
            const r3 = this.parseGroup("atom", e3);
            if (r3 && "internal" === r3.type) return r3;
            if ("text" === this.mode) return r3;
            let n3, o2;
            for (; ; ) {
              this.consumeSpaces();
              const e4 = this.fetch();
              if ("\\limits" === e4.text || "\\nolimits" === e4.text) {
                if (r3 && "op" === r3.type) {
                  const t3 = "\\limits" === e4.text;
                  r3.limits = t3, r3.alwaysHandleSupSub = true;
                } else {
                  if (!r3 || "operatorname" !== r3.type) throw new t2("Limit controls must follow a math operator", e4);
                  r3.alwaysHandleSupSub && (r3.limits = "\\limits" === e4.text);
                }
                this.consume();
              } else if ("^" === e4.text) {
                if (n3) throw new t2("Double superscript", e4);
                n3 = this.handleSupSubscript("superscript");
              } else if ("_" === e4.text) {
                if (o2) throw new t2("Double subscript", e4);
                o2 = this.handleSupSubscript("subscript");
              } else if ("'" === e4.text) {
                if (n3) throw new t2("Double superscript", e4);
                const r4 = { type: "textord", mode: this.mode, text: "\\prime" }, o3 = [r4];
                for (this.consume(); "'" === this.fetch().text; ) o3.push(r4), this.consume();
                "^" === this.fetch().text && o3.push(this.handleSupSubscript("superscript")), n3 = { type: "ordgroup", mode: this.mode, body: o3 };
              } else {
                if (!rn[e4.text]) break;
                {
                  const t3 = tn.test(e4.text), r4 = [];
                  for (r4.push(new Ge(rn[e4.text])), this.consume(); ; ) {
                    const e5 = this.fetch().text;
                    if (!rn[e5]) break;
                    if (tn.test(e5) !== t3) break;
                    r4.unshift(new Ge(rn[e5])), this.consume();
                  }
                  const a2 = this.subparse(r4);
                  t3 ? o2 = { type: "ordgroup", mode: "math", body: a2 } : n3 = { type: "ordgroup", mode: "math", body: a2 };
                }
              }
            }
            if (n3 || o2) {
              if (r3 && "multiscript" === r3.type && !r3.postscripts) return r3.postscripts = { sup: n3, sub: o2 }, r3;
              {
                const e4 = !r3 || "op" !== r3.type && "operatorname" !== r3.type ? void 0 : Ft(this.nextToken.text);
                return { type: "supsub", mode: this.mode, base: r3, sup: n3, sub: o2, isFollowedByDelimiter: e4 };
              }
            }
            return r3;
          }
          parseFunction(e3, r3) {
            const n3 = this.fetch(), o2 = n3.text, a2 = Gr[o2];
            if (!a2) return null;
            if (this.consume(), r3 && "atom" !== r3 && !a2.allowedInArgument) throw new t2("Got function '" + o2 + "' with no arguments" + (r3 ? " as " + r3 : ""), n3);
            if ("text" === this.mode && !a2.allowedInText) throw new t2("Can't use function '" + o2 + "' in text mode", n3);
            if ("math" === this.mode && false === a2.allowedInMath) throw new t2("Can't use function '" + o2 + "' in math mode", n3);
            const i2 = this.prevAtomType, { args: s2, optArgs: l2 } = this.parseArguments(o2, a2);
            return this.prevAtomType = i2, this.callFunction(o2, s2, l2, n3, e3);
          }
          callFunction(e3, r3, n3, o2, a2) {
            const i2 = { funcName: e3, parser: this, token: o2, breakOnTokenText: a2 }, s2 = Gr[e3];
            if (s2 && s2.handler) return s2.handler(i2, r3, n3);
            throw new t2(`No function handler for ${e3}`);
          }
          parseArguments(e3, r3) {
            const n3 = r3.numArgs + r3.numOptionalArgs;
            if (0 === n3) return { args: [], optArgs: [] };
            const o2 = [], a2 = [];
            for (let i2 = 0; i2 < n3; i2++) {
              let n4 = r3.argTypes && r3.argTypes[i2];
              const s2 = i2 < r3.numOptionalArgs;
              (r3.primitive && null == n4 || "sqrt" === r3.type && 1 === i2 && null == a2[0]) && (n4 = "primitive");
              const l2 = this.parseGroupOfType(`argument to '${e3}'`, n4, s2);
              if (s2) a2.push(l2);
              else {
                if (null == l2) throw new t2("Null argument, please report this as a bug");
                o2.push(l2);
              }
            }
            return { args: o2, optArgs: a2 };
          }
          parseGroupOfType(e3, r3, n3) {
            switch (r3) {
              case "size":
                return this.parseSizeGroup(n3);
              case "url":
                return this.parseUrlGroup(n3);
              case "math":
              case "text":
                return this.parseArgumentGroup(n3, r3);
              case "hbox": {
                const e4 = this.parseArgumentGroup(n3, "text");
                return null != e4 ? { type: "styling", mode: e4.mode, body: [e4], scriptLevel: "text" } : null;
              }
              case "raw": {
                const e4 = this.parseStringGroup("raw", n3);
                return null != e4 ? { type: "raw", mode: "text", string: e4.text } : null;
              }
              case "primitive": {
                if (n3) throw new t2("A primitive argument cannot be optional");
                const r4 = this.parseGroup(e3);
                if (null == r4) throw new t2("Expected group as " + e3, this.fetch());
                return r4;
              }
              case "original":
              case null:
              case void 0:
                return this.parseArgumentGroup(n3);
              default:
                throw new t2("Unknown group type as " + e3, this.fetch());
            }
          }
          consumeSpaces() {
            for (; ; ) {
              const e3 = this.fetch().text;
              if (" " !== e3 && "\xA0" !== e3 && "\uFE0E" !== e3) break;
              this.consume();
            }
          }
          parseStringGroup(e3, t3) {
            const r3 = this.gullet.scanArgument(t3);
            if (null == r3) return null;
            let n3, o2 = "";
            for (; "EOF" !== (n3 = this.fetch()).text; ) o2 += n3.text, this.consume();
            return this.consume(), r3.text = o2, r3;
          }
          parseRegexGroup(e3, r3) {
            const n3 = this.fetch();
            let o2, a2 = n3, i2 = "";
            for (; "EOF" !== (o2 = this.fetch()).text && e3.test(i2 + o2.text); ) a2 = o2, i2 += a2.text, this.consume();
            if ("" === i2) throw new t2("Invalid " + r3 + ": '" + n3.text + "'", n3);
            return n3.range(a2, i2);
          }
          parseSizeGroup(e3) {
            let r3, n3 = false;
            if (this.gullet.consumeSpaces(), r3 = e3 || "{" === this.gullet.future().text ? this.parseStringGroup("size", e3) : this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size"), !r3) return null;
            e3 || 0 !== r3.text.length || (r3.text = "0pt", n3 = true);
            const o2 = ln.exec(r3.text);
            if (!o2) throw new t2("Invalid size: '" + r3.text + "'", r3);
            const a2 = { number: +(o2[1] + o2[2]), unit: o2[3] };
            if (!_e(a2)) throw new t2("Invalid unit: '" + a2.unit + "'", r3);
            return { type: "size", mode: this.mode, value: a2, isBlank: n3 };
          }
          parseUrlGroup(e3) {
            this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
            const t3 = this.parseStringGroup("url", e3);
            if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), null == t3) return null;
            let r3 = t3.text.replace(/\\([#$%&~_^{}])/g, "$1");
            return r3 = t3.text.replace(/{\u2044}/g, "/"), { type: "url", mode: this.mode, url: r3 };
          }
          parseArgumentGroup(e3, t3) {
            const r3 = this.gullet.scanArgument(e3);
            if (null == r3) return null;
            const n3 = this.mode;
            t3 && this.switchMode(t3), this.gullet.beginGroup();
            const o2 = this.parseExpression(false, "EOF");
            this.expect("EOF"), this.gullet.endGroup();
            const a2 = { type: "ordgroup", mode: this.mode, loc: r3.loc, body: o2 };
            return t3 && this.switchMode(n3), a2;
          }
          parseGroup(e3, r3) {
            const n3 = this.fetch(), o2 = n3.text;
            let a2;
            if ("{" === o2 || "\\begingroup" === o2 || "\\toggle" === o2) {
              this.consume();
              const e4 = "{" === o2 ? "}" : "\\begingroup" === o2 ? "\\endgroup" : "\\endtoggle";
              this.gullet.beginGroup();
              const t3 = this.parseExpression(false, e4), r4 = this.fetch();
              this.expect(e4), this.gullet.endGroup(), a2 = { type: "\\endtoggle" === r4.text ? "toggle" : "ordgroup", mode: this.mode, loc: Ue.range(n3, r4), body: t3, semisimple: "\\begingroup" === o2 || void 0 };
            } else if (a2 = this.parseFunction(r3, e3) || this.parseSymbol(), null == a2 && "\\" === o2[0] && !Object.prototype.hasOwnProperty.call(Qr, o2)) {
              if (this.settings.throwOnError) throw new t2("Unsupported function name: " + o2, n3);
              a2 = this.formatUnsupportedCmd(o2), this.consume();
            }
            return a2;
          }
          formLigatures(e3) {
            let t3 = e3.length - 1;
            for (let r3 = 0; r3 < t3; ++r3) {
              const n3 = e3[r3], o2 = n3.text;
              "-" === o2 && "-" === e3[r3 + 1].text && (r3 + 1 < t3 && "-" === e3[r3 + 2].text ? (e3.splice(r3, 3, { type: "textord", mode: "text", loc: Ue.range(n3, e3[r3 + 2]), text: "---" }), t3 -= 2) : (e3.splice(r3, 2, { type: "textord", mode: "text", loc: Ue.range(n3, e3[r3 + 1]), text: "--" }), t3 -= 1)), "'" !== o2 && "`" !== o2 || e3[r3 + 1].text !== o2 || (e3.splice(r3, 2, { type: "textord", mode: "text", loc: Ue.range(n3, e3[r3 + 1]), text: o2 + o2 }), t3 -= 1);
            }
          }
          parseSymbol() {
            const e3 = this.fetch();
            let r3 = e3.text;
            if (/^\\verb[^a-zA-Z]/.test(r3)) {
              this.consume();
              let e4 = r3.slice(5);
              const n4 = "*" === e4.charAt(0);
              if (n4 && (e4 = e4.slice(1)), e4.length < 2 || e4.charAt(0) !== e4.slice(-1)) throw new t2("\\verb assertion failed --\n                    please report what input caused this bug");
              return e4 = e4.slice(1, -1), { type: "verb", mode: "text", body: e4, star: n4 };
            }
            if (Object.prototype.hasOwnProperty.call(an, r3[0]) && "math" === this.mode && !P[this.mode][r3[0]]) {
              if (this.settings.strict && "math" === this.mode) throw new t2(`Accented Unicode text character "${r3[0]}" used in math mode`, e3);
              r3 = an[r3[0]] + r3.slice(1);
            }
            const n3 = "math" === this.mode ? Jr.exec(r3) : null;
            let o2;
            if (n3 && (r3 = r3.substring(0, n3.index), "i" === r3 ? r3 = "\u0131" : "j" === r3 && (r3 = "\u0237")), P[this.mode][r3]) {
              let t3 = P[this.mode][r3].group;
              "bin" === t3 && sn.includes(this.prevAtomType) && (t3 = "open");
              const n4 = Ue.range(e3);
              let a2;
              if (Object.prototype.hasOwnProperty.call(I, t3)) {
                const e4 = t3;
                a2 = { type: "atom", mode: this.mode, family: e4, loc: n4, text: r3 }, "rel" !== e4 && "bin" !== e4 || "text" !== this.prevAtomType || cn.test(n4.lexer.input.slice(n4.end)) && (a2.needsSpacing = true);
              } else {
                if (nn[r3]) {
                  this.consume();
                  const e4 = this.fetch().text.charCodeAt(0), t4 = 65025 === e4 ? "mathscr" : "mathcal";
                  return 65024 !== e4 && 65025 !== e4 || this.consume(), { type: "font", mode: "math", font: t4, body: { type: "mathord", mode: "math", loc: n4, text: nn[r3] } };
                }
                a2 = { type: t3, mode: this.mode, loc: n4, text: r3 };
              }
              o2 = a2;
            } else {
              if (!(r3.charCodeAt(0) >= 128 || Jr.exec(r3))) return null;
              if (this.settings.strict && "math" === this.mode) throw new t2(`Unicode text character "${r3[0]}" used in math mode`, e3);
              o2 = { type: "textord", mode: "text", loc: Ue.range(e3), text: r3 };
            }
            if (this.consume(), n3) for (let r4 = 0; r4 < n3[0].length; r4++) {
              const a2 = n3[0][r4];
              if (!on[a2]) throw new t2(`Unknown accent ' ${a2}'`, e3);
              const i2 = on[a2][this.mode] || on[a2].text;
              if (!i2) throw new t2(`Accent ${a2} unsupported in ${this.mode} mode`, e3);
              o2 = { type: "accent", mode: this.mode, loc: Ue.range(e3), label: i2, isStretchy: false, base: o2 };
            }
            return o2;
          }
        }
        const dn = function(e3, r3) {
          if (!("string" == typeof e3 || e3 instanceof String)) throw new TypeError("Temml can only parse string typed expression");
          const n3 = new un(e3, r3);
          delete n3.gullet.macros.current["\\df@tag"];
          let o2 = n3.parse();
          if (!(o2.length > 0 && o2[0].type && "array" === o2[0].type && o2[0].addEqnNum) && n3.gullet.macros.get("\\df@tag")) {
            if (!r3.displayMode) throw new t2("\\tag works only in display mode");
            n3.gullet.feed("\\df@tag"), o2 = [{ type: "tag", mode: "text", body: o2, tag: n3.parse() }];
          }
          return o2;
        }, hn = [2, 2, 3, 3];
        class mn {
          constructor(e3) {
            this.level = e3.level, this.color = e3.color, this.font = e3.font || "", this.fontFamily = e3.fontFamily || "", this.fontSize = e3.fontSize || 1, this.fontWeight = e3.fontWeight || "", this.fontShape = e3.fontShape || "", this.maxSize = e3.maxSize;
          }
          extend(e3) {
            const t3 = { level: this.level, color: this.color, font: this.font, fontFamily: this.fontFamily, fontSize: this.fontSize, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize };
            for (const r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            return new mn(t3);
          }
          withLevel(e3) {
            return this.extend({ level: e3 });
          }
          incrementLevel() {
            return this.extend({ level: Math.min(this.level + 1, 3) });
          }
          inSubOrSup() {
            return this.extend({ level: hn[this.level] });
          }
          withColor(e3) {
            return this.extend({ color: e3 });
          }
          withFont(e3) {
            return this.extend({ font: e3 });
          }
          withTextFontFamily(e3) {
            return this.extend({ fontFamily: e3, font: "" });
          }
          withFontSize(e3) {
            return this.extend({ fontSize: e3 });
          }
          withTextFontWeight(e3) {
            return this.extend({ fontWeight: e3, font: "" });
          }
          withTextFontShape(e3) {
            return this.extend({ fontShape: e3, font: "" });
          }
          getColor() {
            return this.color;
          }
        }
        function pn(e3) {
          const t3 = {};
          let r3 = 0;
          const n3 = document.getElementsByClassName("tml-eqn");
          for (let e4 of n3) for (r3 += 1, e4.setAttribute("id", "tml-eqn-" + String(r3)); "mtable" !== e4.tagName; ) {
            if (e4.getElementsByClassName("tml-label").length > 0) {
              const n4 = e4.attributes.id.value;
              t3[n4] = String(r3);
              break;
            }
            e4 = e4.parentElement;
          }
          const o2 = document.getElementsByClassName("tml-tageqn");
          for (const e4 of o2) {
            if (e4.getElementsByClassName("tml-label").length > 0) {
              const r4 = e4.getElementsByClassName("tml-tag");
              if (r4.length > 0) {
                const n4 = e4.attributes.id.value;
                t3[n4] = r4[0].textContent;
              }
            }
          }
          [...e3.getElementsByClassName("tml-ref")].forEach(((e4) => {
            const r4 = e4.getAttribute("href");
            let n4 = t3[r4.slice(1)];
            -1 === e4.className.indexOf("tml-eqref") ? (n4 = n4.replace(/^\(/, ""), n4 = n4.replace(/\)$/, "")) : ("(" !== n4.charAt(0) && (n4 = "(" + n4), ")" !== n4.slice(-1) && (n4 += ")"));
            const o3 = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mtext");
            o3.appendChild(document.createTextNode(n4));
            const a2 = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
            a2.appendChild(o3), e4.textContent = "", e4.appendChild(a2);
          }));
        }
        const fn = function(e3, t3, r3) {
          let n3 = r3, o2 = 0;
          const a2 = e3.length;
          for (; n3 < t3.length; ) {
            const r4 = t3[n3];
            if (o2 <= 0 && t3.slice(n3, n3 + a2) === e3) return n3;
            "\\" === r4 ? n3++ : "{" === r4 ? o2++ : "}" === r4 && o2--, n3++;
          }
          return -1;
        }, gn = /^\\(?:begin|(?:eq)?ref){/, bn = [{ left: "$$", right: "$$", display: true }, { left: "\\(", right: "\\)", display: false }, { left: "\\begin{equation}", right: "\\end{equation}", display: true }, { left: "\\begin{equation*}", right: "\\end{equation*}", display: true }, { left: "\\begin{align}", right: "\\end{align}", display: true }, { left: "\\begin{align*}", right: "\\end{align*}", display: true }, { left: "\\begin{alignat}", right: "\\end{alignat}", display: true }, { left: "\\begin{alignat*}", right: "\\end{alignat*}", display: true }, { left: "\\begin{gather}", right: "\\end{gather}", display: true }, { left: "\\begin{gather*}", right: "\\end{gather*}", display: true }, { left: "\\begin{CD}", right: "\\end{CD}", display: true }, { left: "\\ref{", right: "}", display: false }, { left: "\\eqref{", right: "}", display: false }, { left: "\\[", right: "\\]", display: true }], xn = { $: [{ left: "$$", right: "$$", display: true }, { left: "$`", right: "`$", display: false }, { left: "$", right: "$", display: false }], "(": [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }] }, yn = [{ left: "\\begin{equation}", right: "\\end{equation}", display: true }, { left: "\\begin{equation*}", right: "\\end{equation*}", display: true }, { left: "\\begin{align}", right: "\\end{align}", display: true }, { left: "\\begin{align*}", right: "\\end{align*}", display: true }, { left: "\\begin{alignat}", right: "\\end{alignat}", display: true }, { left: "\\begin{alignat*}", right: "\\end{alignat*}", display: true }, { left: "\\begin{gather}", right: "\\end{gather}", display: true }, { left: "\\begin{gather*}", right: "\\end{gather*}", display: true }, { left: "\\begin{CD}", right: "\\end{CD}", display: true }, { left: "\\ref{", right: "}", display: false }, { left: "\\eqref{", right: "}", display: false }], vn = function(e3, r3) {
          const n3 = (function(e4, t3) {
            let r4;
            const n4 = [], o3 = new RegExp("(" + t3.map(((e5) => e5.left.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))).join("|") + ")");
            for (; r4 = e4.search(o3), -1 !== r4; ) {
              r4 > 0 && (n4.push({ type: "text", data: e4.slice(0, r4) }), e4 = e4.slice(r4));
              const o4 = t3.findIndex(((t4) => e4.startsWith(t4.left)));
              if (r4 = fn(t3[o4].right, e4, t3[o4].left.length), -1 === r4) break;
              const a2 = e4.slice(0, r4 + t3[o4].right.length), i2 = gn.test(a2) ? a2 : e4.slice(t3[o4].left.length, r4);
              n4.push({ type: "math", data: i2, rawData: a2, display: t3[o4].display }), e4 = e4.slice(r4 + t3[o4].right.length);
            }
            return "" !== e4 && n4.push({ type: "text", data: e4 }), n4;
          })(e3, r3.delimiters);
          if (1 === n3.length && "text" === n3[0].type) return null;
          const o2 = document.createDocumentFragment();
          for (let e4 = 0; e4 < n3.length; e4++) if ("text" === n3[e4].type) o2.appendChild(document.createTextNode(n3[e4].data));
          else {
            const a2 = document.createElement("span");
            let i2 = n3[e4].data;
            r3.displayMode = n3[e4].display;
            try {
              r3.preProcess && (i2 = r3.preProcess(i2)), temml.render(i2, a2, r3);
            } catch (a3) {
              if (!(a3 instanceof t2)) throw a3;
              r3.errorCallback("Temml auto-render: Failed to parse `" + n3[e4].data + "` with ", a3), o2.appendChild(document.createTextNode(n3[e4].rawData));
              continue;
            }
            o2.appendChild(a2);
          }
          return o2;
        }, wn = function(e3, t3) {
          for (let r3 = 0; r3 < e3.childNodes.length; r3++) {
            const n3 = e3.childNodes[r3];
            if (3 === n3.nodeType) {
              const o2 = vn(n3.textContent, t3);
              o2 && (r3 += o2.childNodes.length - 1, e3.replaceChild(o2, n3));
            } else if (1 === n3.nodeType) {
              const e4 = " " + n3.className + " ";
              -1 === t3.ignoredTags.indexOf(n3.nodeName.toLowerCase()) && t3.ignoredClasses.every(((t4) => -1 === e4.indexOf(" " + t4 + " "))) && wn(n3, t3);
            }
          }
        };
        let An = function(e3, t3, r3 = {}) {
          t3.textContent = "";
          const n3 = "math" === t3.tagName.toLowerCase();
          n3 && (r3.wrap = "none");
          const o2 = Cn(e3, r3);
          n3 || o2.children.length > 1 ? (t3.textContent = "", o2.children.forEach(((e4) => {
            t3.appendChild(e4.toNode());
          }))) : t3.appendChild(o2.toNode());
        };
        "undefined" != typeof document && "CSS1Compat" !== document.compatMode && ("undefined" != typeof console && console.warn("Warning: Temml doesn't work in quirks mode. Make sure your website has a suitable doctype."), An = function() {
          throw new t2("Temml doesn't work in quirks mode.");
        });
        const Cn = function(e3, r3) {
          const n3 = new h(r3);
          try {
            const t3 = dn(e3, n3);
            return ye(t3, e3, new mn({ level: n3.displayMode ? We : Ve, maxSize: n3.maxSize }), n3);
          } catch (r4) {
            return (function(e4, r5, n4) {
              if (n4.throwOnError || !(e4 instanceof t2)) throw e4;
              const o2 = new E(["temml-error"], [new S(r5 + "\n\n" + e4.toString())]);
              return o2.style.color = n4.errorColor, o2.style.whiteSpace = "pre-line", o2;
            })(r4, e3, n3);
          }
        };
        var En = { version: "0.13.01", render: An, renderToString: function(e3, t3) {
          return Cn(e3, t3).toMarkup();
        }, renderMathInElement: function(e3, t3) {
          if (!e3) throw new Error("No element provided to render");
          const r3 = {};
          for (const e4 in t3) Object.prototype.hasOwnProperty.call(t3, e4) && (r3[e4] = t3[e4]);
          r3.fences ? r3.delimiters = ((e4) => {
            if ("$" === e4 || "(" === e4) return xn[e4];
            if ("$+" === e4 || "(+" === e4) return xn[e4.slice(0, 1)].concat(yn);
            return "ams" === e4 ? yn : "all" === e4 ? xn["("].concat(xn.$).concat(yn) : bn;
          })(r3.fences) : r3.delimiters = r3.delimiters || bn, r3.ignoredTags = r3.ignoredTags || ["script", "noscript", "style", "textarea", "pre", "code", "option"], r3.ignoredClasses = r3.ignoredClasses || [], r3.errorCallback = r3.errorCallback || console.error, r3.macros = r3.macros || {}, wn(e3, r3), pn(e3);
        }, postProcess: pn, ParseError: t2, definePreamble: function(e3, t3) {
          const r3 = new h(t3);
          if (r3.macros = {}, !("string" == typeof e3 || e3 instanceof String)) throw new TypeError("Temml can only parse string typed expression");
          const n3 = new un(e3, r3, true);
          delete n3.gullet.macros.current["\\df@tag"];
          return n3.parse();
        }, __parse: function(e3, t3) {
          const r3 = new h(t3);
          return dn(e3, r3);
        }, __renderToMathMLTree: Cn, __defineSymbol: F, __defineMacro: Ye };
        e2.exports = En;
      } }, t = {};
      function r(n2) {
        var o = t[n2];
        if (void 0 !== o) return o.exports;
        var a = t[n2] = { exports: {} };
        return e[n2].call(a.exports, a, a.exports, r), a.exports;
      }
      r.d = (e2, t2) => {
        for (var n2 in t2) r.o(t2, n2) && !r.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
      }, r.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      };
      var n = r(98);
      return n = n.default;
    })()));
  }
});

// obsidian-plugin/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => XBookmarksSync
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_full = __toESM(require_index_full());
var VIEW_TYPE = "x-bookmarks-webview";
var BookmarkSelectionModal = class extends import_obsidian.Modal {
  constructor(app, plugin, bookmarks) {
    super(app);
    this.plugin = plugin;
    this.bookmarks = bookmarks;
    this.selectedIds = /* @__PURE__ */ new Set();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Select Bookmarks to Import" });
    const listContainer = contentEl.createDiv({ cls: "bookmark-list-container" });
    listContainer.style.maxHeight = "400px";
    listContainer.style.overflowY = "auto";
    listContainer.style.marginBottom = "20px";
    listContainer.style.paddingRight = "10px";
    let newCount = 0;
    this.bookmarks.forEach((bookmark) => {
      const isImported = this.plugin.isTweetImported(bookmark);
      const itemDiv = listContainer.createDiv({ cls: "bookmark-item" });
      itemDiv.style.display = "flex";
      itemDiv.style.alignItems = "flex-start";
      itemDiv.style.marginBottom = "10px";
      itemDiv.style.padding = "10px";
      itemDiv.style.border = "1px solid var(--background-modifier-border)";
      itemDiv.style.borderRadius = "5px";
      const checkbox = itemDiv.createEl("input", { type: "checkbox" });
      checkbox.style.marginTop = "4px";
      checkbox.style.marginRight = "10px";
      if (isImported) {
        checkbox.disabled = true;
        checkbox.checked = false;
        itemDiv.style.opacity = "0.5";
      } else {
        checkbox.checked = true;
        this.selectedIds.add(bookmark.id);
        newCount++;
      }
      checkbox.onchange = (e) => {
        if (e.target.checked) {
          this.selectedIds.add(bookmark.id);
        } else {
          this.selectedIds.delete(bookmark.id);
        }
        importBtn.innerText = `Import Selected (${this.selectedIds.size})`;
      };
      const textDiv = itemDiv.createDiv();
      const title = bookmark.text ? bookmark.text.substring(0, 80) + "..." : "No text";
      textDiv.createEl("strong", { text: `${bookmark.name} (${bookmark.username})` });
      textDiv.createEl("br");
      textDiv.createEl("span", { text: title, cls: "text-muted" });
      textDiv.style.fontSize = "0.9em";
      if (isImported) {
        textDiv.createEl("br");
        const badge = textDiv.createEl("span", { text: "Already imported" });
        badge.style.color = "var(--text-error)";
        badge.style.fontSize = "0.85em";
        badge.style.fontWeight = "bold";
      }
    });
    const btnContainer = contentEl.createDiv();
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "flex-end";
    btnContainer.style.gap = "10px";
    const cancelBtn = btnContainer.createEl("button", { text: "Cancel" });
    cancelBtn.onclick = () => this.close();
    const importBtn = btnContainer.createEl("button", { text: `Import Selected (${newCount})` });
    importBtn.style.backgroundColor = "var(--interactive-accent)";
    importBtn.style.color = "var(--text-on-accent)";
    importBtn.onclick = async () => {
      const toImport = this.bookmarks.filter((b) => this.selectedIds.has(b.id));
      this.close();
      if (toImport.length > 0) {
        await this.plugin.saveBookmarksToVault(toImport);
      } else {
        new import_obsidian.Notice("No bookmarks selected for import.");
      }
    };
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var XBookmarksView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.currentUrl = "https://twitter.com/i/bookmarks";
    this.plugin = plugin;
    this.webview = null;
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return "X Bookmarks";
  }
  getIcon() {
    return "twitter";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    const toolbar = container.createDiv({ cls: "x-bookmarks-toolbar" });
    toolbar.style.padding = "10px";
    toolbar.style.display = "flex";
    toolbar.style.justifyContent = "space-between";
    toolbar.style.alignItems = "center";
    toolbar.style.borderBottom = "1px solid var(--background-modifier-border)";
    toolbar.style.backgroundColor = "var(--background-secondary)";
    toolbar.createEl("span", { text: "Scroll to load, then click ->", cls: "text-muted" });
    const btnGroup = toolbar.createDiv();
    btnGroup.style.display = "flex";
    btnGroup.style.gap = "10px";
    this.copyBtn = btnGroup.createEl("button", { text: "Copy as MD" });
    this.copyBtn.style.backgroundColor = "var(--interactive-accent)";
    this.copyBtn.style.color = "var(--text-on-accent)";
    this.copyBtn.style.display = "none";
    this.copyBtn.onclick = async () => {
      await this.copyAsMarkdown();
    };
    this.extractBtn = btnGroup.createEl("button", { text: "Extract Bookmarks" });
    this.extractBtn.style.backgroundColor = "var(--interactive-accent)";
    this.extractBtn.style.color = "var(--text-on-accent)";
    this.extractBtn.onclick = async () => {
      if (this.currentUrl.includes("/bookmarks")) {
        await this.extractBookmarks();
      } else {
        this.loadUrl("https://twitter.com/i/bookmarks");
      }
    };
    this.closeBtn = btnGroup.createEl("button", { text: "Close" });
    this.closeBtn.onclick = () => {
      this.leaf.detach();
    };
    const webviewContainer = container.createDiv();
    webviewContainer.style.width = "100%";
    webviewContainer.style.height = "calc(100% - 50px)";
    webviewContainer.style.backgroundColor = "#fff";
    this.webview = document.createElement("webview");
    this.webview.setAttribute("src", this.currentUrl);
    this.webview.style.width = "100%";
    this.webview.style.height = "100%";
    this.webview.addEventListener("did-navigate", (e) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });
    this.webview.addEventListener("did-navigate-in-page", (e) => {
      this.currentUrl = e.url;
      this.updateToolbar();
    });
    this.webview.addEventListener("dom-ready", () => {
      this.webview.insertCSS(`
                header[role="banner"] { display: none !important; }
                div[data-testid="sidebarColumn"] { display: none !important; }
                main[role="main"] { align-items: center !important; }
            `);
    });
    webviewContainer.appendChild(this.webview);
  }
  updateToolbar() {
    if (this.currentUrl.includes("/bookmarks")) {
      this.extractBtn.innerText = "Extract Bookmarks";
      this.copyBtn.style.display = "none";
    } else {
      this.extractBtn.innerText = "Back to Bookmarks";
      this.copyBtn.style.display = "block";
    }
  }
  async copyAsMarkdown() {
    if (!this.webview) return;
    new import_obsidian.Notice("Extracting content with Defuddle...");
    try {
      const html = await this.webview.executeJavaScript("document.documentElement.outerHTML");
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const defuddle = new import_full.default(doc, {
        url: this.currentUrl,
        markdown: true,
        contentSelector: 'article[data-testid="tweet"]'
      });
      const result = await defuddle.parseAsync();
      if (result && result.content) {
        await navigator.clipboard.writeText(result.content);
        new import_obsidian.Notice("Copied to clipboard!");
      } else {
        new import_obsidian.Notice("Failed to extract content.");
      }
    } catch (err) {
      console.error(err);
      new import_obsidian.Notice("Error extracting content.");
    }
  }
  loadUrl(url) {
    this.currentUrl = url;
    if (this.webview) {
      this.webview.setAttribute("src", url);
    }
    this.updateToolbar();
  }
  async extractBookmarks() {
    if (!this.webview) return;
    new import_obsidian.Notice("Extracting bookmarks from current view...");
    const script = `
            (function() {
                try {
                    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
                    const results = [];
                    tweets.forEach(tweet => {
                        try {
                            const textEl = tweet.querySelector('[data-testid="tweetText"]');
                            const text = textEl ? textEl.innerText : '';

                            const userEl = tweet.querySelector('[data-testid="User-Name"]');
                            const userText = userEl ? userEl.innerText : '';
                            const userParts = userText.split('\\n');
                            const name = userParts[0] || 'Unknown';
                            const username = userParts[1] || 'unknown';

                            const linkEl = Array.from(tweet.querySelectorAll('a')).find(a => {
                                const href = typeof a.href === 'string' ? a.href : (a.getAttribute ? a.getAttribute('href') : '');
                                return href && href.includes('/status/');
                            });
                            const url = linkEl ? (typeof linkEl.href === 'string' ? linkEl.href : linkEl.getAttribute('href')) : '';
                            const idMatch = url ? url.match(/status\\/(\\d+)/) : null;
                            const id = idMatch ? idMatch[1] : Date.now().toString() + Math.random().toString().slice(2,5);

                            if (text || url) {
                                results.push({ id: String(id), name: String(name), username: String(username), text: String(text), url: String(url) });
                            }
                        } catch (e) {
                            // ignore individual tweet errors
                        }
                    });
                    return { success: true, data: results };
                } catch (e) {
                    return { success: false, error: e.toString() };
                }
            })();
        `;
    try {
      const result = await this.webview.executeJavaScript(script);
      if (result && result.success) {
        const bookmarks = result.data;
        if (bookmarks && bookmarks.length > 0) {
          new BookmarkSelectionModal(this.app, this.plugin, bookmarks).open();
        } else {
          new import_obsidian.Notice("No bookmarks found. Make sure you are on the bookmarks page and tweets are loaded.");
        }
      } else {
        console.error("Scraping error from webview:", result.error);
        new import_obsidian.Notice("Failed to extract bookmarks: " + result.error);
      }
    } catch (err) {
      console.error("Script execution error:", err);
      new import_obsidian.Notice("Failed to execute scraping script.");
    }
  }
};
var XBookmarksSync = class extends import_obsidian.Plugin {
  async onload() {
    this.registerView(VIEW_TYPE, (leaf) => new XBookmarksView(leaf, this));
    this.addRibbonIcon("twitter", "Open X Bookmarks", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-x-bookmarks",
      name: "Open X Bookmarks View",
      callback: () => {
        this.activateView();
      }
    });
    this.registerObsidianProtocolHandler("x-bookmarks", (params) => {
      if (params.url) {
        this.openUrlInWebview(params.url);
      }
    });
  }
  async openUrlInWebview(url) {
    await this.activateView();
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (leaves.length > 0) {
      const view = leaves[0].view;
      view.loadUrl(url);
    }
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      const rightLeaf = workspace.getRightLeaf(false);
      if (rightLeaf) {
        await rightLeaf.setViewState({ type: VIEW_TYPE, active: true });
        leaf = rightLeaf;
      }
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }
  getFileName(tweet) {
    const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const author = (tweet.name || "Unknown").replace(/[\\/:"*?<>|]/g, "").trim();
    let title = (tweet.text || "Bookmark").split("\n")[0].substring(0, 40);
    title = title.replace(/[\\/:"*?<>|]/g, "").trim();
    if (!title) title = "Bookmark";
    return `x-bookmarks/X-${date}-${author}-${title}.md`;
  }
  isTweetImported(tweet) {
    const oldFileName = `x-bookmarks/Tweet-${tweet.id}.md`;
    const newFileName = this.getFileName(tweet);
    return !!this.app.vault.getAbstractFileByPath(oldFileName) || !!this.app.vault.getAbstractFileByPath(newFileName);
  }
  async saveBookmarksToVault(bookmarks) {
    const targetFolder = "x-bookmarks";
    let folder = this.app.vault.getAbstractFileByPath(targetFolder);
    if (!folder) {
      await this.app.vault.createFolder(targetFolder);
    }
    let count = 0;
    for (const tweet of bookmarks) {
      const fileName = this.getFileName(tweet);
      const fileExists = this.app.vault.getAbstractFileByPath(fileName);
      if (!fileExists) {
        const content = this.formatTweet(tweet);
        await this.app.vault.create(fileName, content);
        count++;
      }
    }
    new import_obsidian.Notice(`Successfully saved ${count} new bookmarks!`);
  }
  formatTweet(tweet) {
    const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const safeId = `"${tweet.id}"`;
    const safeAuthor = `"${(tweet.name || "").replace(/"/g, '\\"')}"`;
    const safeUsername = `"${(tweet.username || "").replace(/"/g, '\\"')}"`;
    const safeUrl = `"${tweet.url}"`;
    return `---
id: ${safeId}
author: ${safeAuthor}
username: ${safeUsername}
scraped_date: ${date}
url: ${safeUrl}
tags: [twitter, bookmark]
---

# Tweet by ${tweet.name} (${tweet.username})

${tweet.text}

[View on X](${tweet.url}) | [Open in Obsidian Webview](obsidian://x-bookmarks?url=${encodeURIComponent(tweet.url)})
`;
  }
};
