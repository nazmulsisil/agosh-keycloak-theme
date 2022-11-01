var t, e;
(t = this),
	(e = function (t) {
		var e,
			r,
			i =
				window.ShadowRoot &&
				(void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
				"adoptedStyleSheets" in Document.prototype &&
				"replace" in CSSStyleSheet.prototype,
			o = Symbol(),
			a = new Map(),
			s = class {
				constructor(t, e) {
					if (((this._$cssResult$ = !0), e !== o))
						throw Error(
							"CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
						);
					this.cssText = t;
				}
				get styleSheet() {
					let t = a.get(this.cssText);
					return (
						i &&
							void 0 === t &&
							(a.set(this.cssText, (t = new CSSStyleSheet())),
							t.replaceSync(this.cssText)),
						t
					);
				}
				toString() {
					return this.cssText;
				}
			},
			n = (t) => new s("string" == typeof t ? t : t + "", o),
			l = (t, ...e) => {
				const r =
					1 === t.length
						? t[0]
						: e.reduce(
								(e, r, i) =>
									e +
									((t) => {
										if (!0 === t._$cssResult$)
											return t.cssText;
										if ("number" == typeof t) return t;
										throw Error(
											"Value passed to 'css' function must be a 'css' function result: " +
												t +
												". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
										);
									})(r) +
									t[i + 1],
								t[0]
						  );
				return new s(r, o);
			},
			c = i
				? (t) => t
				: (t) =>
						t instanceof CSSStyleSheet
							? ((t) => {
									let e = "";
									for (const r of t.cssRules) e += r.cssText;
									return n(e);
							  })(t)
							: t,
			d = window.trustedTypes,
			h = d ? d.emptyScript : "",
			u = window.reactiveElementPolyfillSupport,
			f = {
				toAttribute(t, e) {
					switch (e) {
						case Boolean:
							t = t ? h : null;
							break;
						case Object:
						case Array:
							t = null == t ? t : JSON.stringify(t);
					}
					return t;
				},
				fromAttribute(t, e) {
					let r = t;
					switch (e) {
						case Boolean:
							r = null !== t;
							break;
						case Number:
							r = null === t ? null : Number(t);
							break;
						case Object:
						case Array:
							try {
								r = JSON.parse(t);
							} catch (t) {
								r = null;
							}
					}
					return r;
				},
			},
			p = (t, e) => e !== t && (e == e || t == t),
			m = {
				attribute: !0,
				type: String,
				converter: f,
				reflect: !1,
				hasChanged: p,
			},
			v = class extends HTMLElement {
				constructor() {
					super(),
						(this._$Et = new Map()),
						(this.isUpdatePending = !1),
						(this.hasUpdated = !1),
						(this._$Ei = null),
						this.o();
				}
				static addInitializer(t) {
					var e;
					(null !== (e = this.l) && void 0 !== e) || (this.l = []),
						this.l.push(t);
				}
				static get observedAttributes() {
					this.finalize();
					const t = [];
					return (
						this.elementProperties.forEach((e, r) => {
							const i = this._$Eh(r, e);
							void 0 !== i && (this._$Eu.set(i, r), t.push(i));
						}),
						t
					);
				}
				static createProperty(t, e = m) {
					if (
						(e.state && (e.attribute = !1),
						this.finalize(),
						this.elementProperties.set(t, e),
						!e.noAccessor && !this.prototype.hasOwnProperty(t))
					) {
						const r = "symbol" == typeof t ? Symbol() : "__" + t,
							i = this.getPropertyDescriptor(t, r, e);
						void 0 !== i &&
							Object.defineProperty(this.prototype, t, i);
					}
				}
				static getPropertyDescriptor(t, e, r) {
					return {
						get() {
							return this[e];
						},
						set(i) {
							const o = this[t];
							(this[e] = i), this.requestUpdate(t, o, r);
						},
						configurable: !0,
						enumerable: !0,
					};
				}
				static getPropertyOptions(t) {
					return this.elementProperties.get(t) || m;
				}
				static finalize() {
					if (this.hasOwnProperty("finalized")) return !1;
					this.finalized = !0;
					const t = Object.getPrototypeOf(this);
					if (
						(t.finalize(),
						(this.elementProperties = new Map(t.elementProperties)),
						(this._$Eu = new Map()),
						this.hasOwnProperty("properties"))
					) {
						const t = this.properties,
							e = [
								...Object.getOwnPropertyNames(t),
								...Object.getOwnPropertySymbols(t),
							];
						for (const r of e) this.createProperty(r, t[r]);
					}
					return (
						(this.elementStyles = this.finalizeStyles(this.styles)),
						!0
					);
				}
				static finalizeStyles(t) {
					const e = [];
					if (Array.isArray(t)) {
						const r = new Set(t.flat(1 / 0).reverse());
						for (const t of r) e.unshift(c(t));
					} else void 0 !== t && e.push(c(t));
					return e;
				}
				static _$Eh(t, e) {
					const r = e.attribute;
					return !1 === r
						? void 0
						: "string" == typeof r
						? r
						: "string" == typeof t
						? t.toLowerCase()
						: void 0;
				}
				o() {
					var t;
					(this._$Ep = new Promise((t) => (this.enableUpdating = t))),
						(this._$AL = new Map()),
						this._$Em(),
						this.requestUpdate(),
						null === (t = this.constructor.l) ||
							void 0 === t ||
							t.forEach((t) => t(this));
				}
				addController(t) {
					var e, r;
					(null !== (e = this._$Eg) && void 0 !== e
						? e
						: (this._$Eg = [])
					).push(t),
						void 0 !== this.renderRoot &&
							this.isConnected &&
							(null === (r = t.hostConnected) ||
								void 0 === r ||
								r.call(t));
				}
				removeController(t) {
					var e;
					null === (e = this._$Eg) ||
						void 0 === e ||
						e.splice(this._$Eg.indexOf(t) >>> 0, 1);
				}
				_$Em() {
					this.constructor.elementProperties.forEach((t, e) => {
						this.hasOwnProperty(e) &&
							(this._$Et.set(e, this[e]), delete this[e]);
					});
				}
				createRenderRoot() {
					var t;
					const e =
						null !== (t = this.shadowRoot) && void 0 !== t
							? t
							: this.attachShadow(
									this.constructor.shadowRootOptions
							  );
					return (
						(r = e),
						(o = this.constructor.elementStyles),
						i
							? (r.adoptedStyleSheets = o.map((t) =>
									t instanceof CSSStyleSheet
										? t
										: t.styleSheet
							  ))
							: o.forEach((t) => {
									const e = document.createElement("style"),
										i = window.litNonce;
									void 0 !== i && e.setAttribute("nonce", i),
										(e.textContent = t.cssText),
										r.appendChild(e);
							  }),
						e
					);
					var r, o;
				}
				connectedCallback() {
					var t;
					void 0 === this.renderRoot &&
						(this.renderRoot = this.createRenderRoot()),
						this.enableUpdating(!0),
						null === (t = this._$Eg) ||
							void 0 === t ||
							t.forEach((t) => {
								var e;
								return null === (e = t.hostConnected) ||
									void 0 === e
									? void 0
									: e.call(t);
							});
				}
				enableUpdating(t) {}
				disconnectedCallback() {
					var t;
					null === (t = this._$Eg) ||
						void 0 === t ||
						t.forEach((t) => {
							var e;
							return null === (e = t.hostDisconnected) ||
								void 0 === e
								? void 0
								: e.call(t);
						});
				}
				attributeChangedCallback(t, e, r) {
					this._$AK(t, r);
				}
				_$ES(t, e, r = m) {
					var i, o;
					const a = this.constructor._$Eh(t, r);
					if (void 0 !== a && !0 === r.reflect) {
						const s = (
							null !==
								(o =
									null === (i = r.converter) || void 0 === i
										? void 0
										: i.toAttribute) && void 0 !== o
								? o
								: f.toAttribute
						)(e, r.type);
						(this._$Ei = t),
							null == s
								? this.removeAttribute(a)
								: this.setAttribute(a, s),
							(this._$Ei = null);
					}
				}
				_$AK(t, e) {
					var r, i, o;
					const a = this.constructor,
						s = a._$Eu.get(t);
					if (void 0 !== s && this._$Ei !== s) {
						const t = a.getPropertyOptions(s),
							n = t.converter,
							l =
								null !==
									(o =
										null !==
											(i =
												null === (r = n) || void 0 === r
													? void 0
													: r.fromAttribute) &&
										void 0 !== i
											? i
											: "function" == typeof n
											? n
											: null) && void 0 !== o
									? o
									: f.fromAttribute;
						(this._$Ei = s),
							(this[s] = l(e, t.type)),
							(this._$Ei = null);
					}
				}
				requestUpdate(t, e, r) {
					let i = !0;
					void 0 !== t &&
						((
							(r = r || this.constructor.getPropertyOptions(t))
								.hasChanged || p
						)(this[t], e)
							? (this._$AL.has(t) || this._$AL.set(t, e),
							  !0 === r.reflect &&
									this._$Ei !== t &&
									(void 0 === this._$E_ &&
										(this._$E_ = new Map()),
									this._$E_.set(t, r)))
							: (i = !1)),
						!this.isUpdatePending && i && (this._$Ep = this._$EC());
				}
				async _$EC() {
					this.isUpdatePending = !0;
					try {
						await this._$Ep;
					} catch (t) {
						Promise.reject(t);
					}
					const t = this.scheduleUpdate();
					return null != t && (await t), !this.isUpdatePending;
				}
				scheduleUpdate() {
					return this.performUpdate();
				}
				performUpdate() {
					var t;
					if (!this.isUpdatePending) return;
					this.hasUpdated,
						this._$Et &&
							(this._$Et.forEach((t, e) => (this[e] = t)),
							(this._$Et = void 0));
					let e = !1;
					const r = this._$AL;
					try {
						(e = this.shouldUpdate(r)),
							e
								? (this.willUpdate(r),
								  null === (t = this._$Eg) ||
										void 0 === t ||
										t.forEach((t) => {
											var e;
											return null ===
												(e = t.hostUpdate) ||
												void 0 === e
												? void 0
												: e.call(t);
										}),
								  this.update(r))
								: this._$EU();
					} catch (t) {
						throw ((e = !1), this._$EU(), t);
					}
					e && this._$AE(r);
				}
				willUpdate(t) {}
				_$AE(t) {
					var e;
					null === (e = this._$Eg) ||
						void 0 === e ||
						e.forEach((t) => {
							var e;
							return null === (e = t.hostUpdated) || void 0 === e
								? void 0
								: e.call(t);
						}),
						this.hasUpdated ||
							((this.hasUpdated = !0), this.firstUpdated(t)),
						this.updated(t);
				}
				_$EU() {
					(this._$AL = new Map()), (this.isUpdatePending = !1);
				}
				get updateComplete() {
					return this.getUpdateComplete();
				}
				getUpdateComplete() {
					return this._$Ep;
				}
				shouldUpdate(t) {
					return !0;
				}
				update(t) {
					void 0 !== this._$E_ &&
						(this._$E_.forEach((t, e) => this._$ES(e, this[e], t)),
						(this._$E_ = void 0)),
						this._$EU();
				}
				updated(t) {}
				firstUpdated(t) {}
			};
		(v.finalized = !0),
			(v.elementProperties = new Map()),
			(v.elementStyles = []),
			(v.shadowRootOptions = { mode: "open" }),
			null == u || u({ ReactiveElement: v }),
			(null !== (e = globalThis.reactiveElementVersions) && void 0 !== e
				? e
				: (globalThis.reactiveElementVersions = [])
			).push("1.2.3");
		var b = globalThis.trustedTypes,
			g = b
				? b.createPolicy("lit-html", { createHTML: (t) => t })
				: void 0,
			y = `lit$${(Math.random() + "").slice(9)}$`,
			w = "?" + y,
			x = `<${w}>`,
			_ = document,
			$ = (t = "") => _.createComment(t),
			k = (t) =>
				null === t || ("object" != typeof t && "function" != typeof t),
			C = Array.isArray,
			z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
			B = /-->/g,
			O = />/g,
			S =
				/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
			L = /'/g,
			A = /"/g,
			M = /^(?:script|style|textarea|title)$/i,
			j = (
				(t) =>
				(e, ...r) => ({ _$litType$: t, strings: e, values: r })
			)(1),
			T = Symbol.for("lit-noChange"),
			I = Symbol.for("lit-nothing"),
			U = new WeakMap(),
			D = _.createTreeWalker(_, 129, null, !1),
			E = class {
				constructor({ strings: t, _$litType$: e }, r) {
					let i;
					this.parts = [];
					let o = 0,
						a = 0;
					const s = t.length - 1,
						n = this.parts,
						[l, c] = ((t, e) => {
							const r = t.length - 1,
								i = [];
							let o,
								a = 2 === e ? "<svg>" : "",
								s = z;
							for (let e = 0; e < r; e++) {
								const r = t[e];
								let n,
									l,
									c = -1,
									d = 0;
								for (
									;
									d < r.length &&
									((s.lastIndex = d),
									(l = s.exec(r)),
									null !== l);

								)
									(d = s.lastIndex),
										s === z
											? "!--" === l[1]
												? (s = B)
												: void 0 !== l[1]
												? (s = O)
												: void 0 !== l[2]
												? (M.test(l[2]) &&
														(o = RegExp(
															"</" + l[2],
															"g"
														)),
												  (s = S))
												: void 0 !== l[3] && (s = S)
											: s === S
											? ">" === l[0]
												? ((s = null != o ? o : z),
												  (c = -1))
												: void 0 === l[1]
												? (c = -2)
												: ((c =
														s.lastIndex -
														l[2].length),
												  (n = l[1]),
												  (s =
														void 0 === l[3]
															? S
															: '"' === l[3]
															? A
															: L))
											: s === A || s === L
											? (s = S)
											: s === B || s === O
											? (s = z)
											: ((s = S), (o = void 0));
								const h =
									s === S && t[e + 1].startsWith("/>")
										? " "
										: "";
								a +=
									s === z
										? r + x
										: c >= 0
										? (i.push(n),
										  r.slice(0, c) +
												"$lit$" +
												r.slice(c) +
												y +
												h)
										: r +
										  y +
										  (-2 === c ? (i.push(void 0), e) : h);
							}
							const n =
								a + (t[r] || "<?>") + (2 === e ? "</svg>" : "");
							if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
								throw Error("invalid template strings array");
							return [void 0 !== g ? g.createHTML(n) : n, i];
						})(t, e);
					if (
						((this.el = E.createElement(l, r)),
						(D.currentNode = this.el.content),
						2 === e)
					) {
						const t = this.el.content,
							e = t.firstChild;
						e.remove(), t.append(...e.childNodes);
					}
					for (; null !== (i = D.nextNode()) && n.length < s; ) {
						if (1 === i.nodeType) {
							if (i.hasAttributes()) {
								const t = [];
								for (const e of i.getAttributeNames())
									if (
										e.endsWith("$lit$") ||
										e.startsWith(y)
									) {
										const r = c[a++];
										if ((t.push(e), void 0 !== r)) {
											const t = i
													.getAttribute(
														r.toLowerCase() +
															"$lit$"
													)
													.split(y),
												e = /([.?@])?(.*)/.exec(r);
											n.push({
												type: 1,
												index: o,
												name: e[2],
												strings: t,
												ctor:
													"." === e[1]
														? V
														: "?" === e[1]
														? X
														: "@" === e[1]
														? q
														: P,
											});
										} else n.push({ type: 6, index: o });
									}
								for (const e of t) i.removeAttribute(e);
							}
							if (M.test(i.tagName)) {
								const t = i.textContent.split(y),
									e = t.length - 1;
								if (e > 0) {
									i.textContent = b ? b.emptyScript : "";
									for (let r = 0; r < e; r++)
										i.append(t[r], $()),
											D.nextNode(),
											n.push({ type: 2, index: ++o });
									i.append(t[e], $());
								}
							}
						} else if (8 === i.nodeType)
							if (i.data === w) n.push({ type: 2, index: o });
							else {
								let t = -1;
								for (; -1 !== (t = i.data.indexOf(y, t + 1)); )
									n.push({ type: 7, index: o }),
										(t += y.length - 1);
							}
						o++;
					}
				}
				static createElement(t, e) {
					const r = _.createElement("template");
					return (r.innerHTML = t), r;
				}
			};
		function F(t, e, r = t, i) {
			var o, a, s, n;
			if (e === T) return e;
			let l =
				void 0 !== i
					? null === (o = r._$Cl) || void 0 === o
						? void 0
						: o[i]
					: r._$Cu;
			const c = k(e) ? void 0 : e._$litDirective$;
			return (
				(null == l ? void 0 : l.constructor) !== c &&
					(null === (a = null == l ? void 0 : l._$AO) ||
						void 0 === a ||
						a.call(l, !1),
					void 0 === c
						? (l = void 0)
						: ((l = new c(t)), l._$AT(t, r, i)),
					void 0 !== i
						? ((null !== (s = (n = r)._$Cl) && void 0 !== s
								? s
								: (n._$Cl = []))[i] = l)
						: (r._$Cu = l)),
				void 0 !== l && (e = F(t, l._$AS(t, e.values), l, i)),
				e
			);
		}
		var R,
			H,
			N = class {
				constructor(t, e, r, i) {
					var o;
					(this.type = 2),
						(this._$AH = I),
						(this._$AN = void 0),
						(this._$AA = t),
						(this._$AB = e),
						(this._$AM = r),
						(this.options = i),
						(this._$Cg =
							null === (o = null == i ? void 0 : i.isConnected) ||
							void 0 === o ||
							o);
				}
				get _$AU() {
					var t, e;
					return null !==
						(e =
							null === (t = this._$AM) || void 0 === t
								? void 0
								: t._$AU) && void 0 !== e
						? e
						: this._$Cg;
				}
				get parentNode() {
					let t = this._$AA.parentNode;
					const e = this._$AM;
					return (
						void 0 !== e && 11 === t.nodeType && (t = e.parentNode),
						t
					);
				}
				get startNode() {
					return this._$AA;
				}
				get endNode() {
					return this._$AB;
				}
				_$AI(t, e = this) {
					(t = F(this, t, e)),
						k(t)
							? t === I || null == t || "" === t
								? (this._$AH !== I && this._$AR(),
								  (this._$AH = I))
								: t !== this._$AH && t !== T && this.$(t)
							: void 0 !== t._$litType$
							? this.T(t)
							: void 0 !== t.nodeType
							? this.S(t)
							: ((t) => {
									var e;
									return (
										C(t) ||
										"function" ==
											typeof (null === (e = t) ||
											void 0 === e
												? void 0
												: e[Symbol.iterator])
									);
							  })(t)
							? this.A(t)
							: this.$(t);
				}
				M(t, e = this._$AB) {
					return this._$AA.parentNode.insertBefore(t, e);
				}
				S(t) {
					this._$AH !== t && (this._$AR(), (this._$AH = this.M(t)));
				}
				$(t) {
					this._$AH !== I && k(this._$AH)
						? (this._$AA.nextSibling.data = t)
						: this.S(_.createTextNode(t)),
						(this._$AH = t);
				}
				T(t) {
					var e;
					const { values: r, _$litType$: i } = t,
						o =
							"number" == typeof i
								? this._$AC(t)
								: (void 0 === i.el &&
										(i.el = E.createElement(
											i.h,
											this.options
										)),
								  i);
					if (
						(null === (e = this._$AH) || void 0 === e
							? void 0
							: e._$AD) === o
					)
						this._$AH.m(r);
					else {
						const t = new (class {
								constructor(t, e) {
									(this.v = []),
										(this._$AN = void 0),
										(this._$AD = t),
										(this._$AM = e);
								}
								get parentNode() {
									return this._$AM.parentNode;
								}
								get _$AU() {
									return this._$AM._$AU;
								}
								p(t) {
									var e;
									const {
											el: { content: r },
											parts: i,
										} = this._$AD,
										o = (
											null !==
												(e =
													null == t
														? void 0
														: t.creationScope) &&
											void 0 !== e
												? e
												: _
										).importNode(r, !0);
									D.currentNode = o;
									let a = D.nextNode(),
										s = 0,
										n = 0,
										l = i[0];
									for (; void 0 !== l; ) {
										if (s === l.index) {
											let e;
											2 === l.type
												? (e = new N(
														a,
														a.nextSibling,
														this,
														t
												  ))
												: 1 === l.type
												? (e = new l.ctor(
														a,
														l.name,
														l.strings,
														this,
														t
												  ))
												: 6 === l.type &&
												  (e = new Y(a, this, t)),
												this.v.push(e),
												(l = i[++n]);
										}
										s !== (null == l ? void 0 : l.index) &&
											((a = D.nextNode()), s++);
									}
									return o;
								}
								m(t) {
									let e = 0;
									for (const r of this.v)
										void 0 !== r &&
											(void 0 !== r.strings
												? (r._$AI(t, r, e),
												  (e += r.strings.length - 2))
												: r._$AI(t[e])),
											e++;
								}
							})(o, this),
							e = t.p(this.options);
						t.m(r), this.S(e), (this._$AH = t);
					}
				}
				_$AC(t) {
					let e = U.get(t.strings);
					return void 0 === e && U.set(t.strings, (e = new E(t))), e;
				}
				A(t) {
					C(this._$AH) || ((this._$AH = []), this._$AR());
					const e = this._$AH;
					let r,
						i = 0;
					for (const o of t)
						i === e.length
							? e.push(
									(r = new N(
										this.M($()),
										this.M($()),
										this,
										this.options
									))
							  )
							: (r = e[i]),
							r._$AI(o),
							i++;
					i < e.length &&
						(this._$AR(r && r._$AB.nextSibling, i), (e.length = i));
				}
				_$AR(t = this._$AA.nextSibling, e) {
					var r;
					for (
						null === (r = this._$AP) ||
						void 0 === r ||
						r.call(this, !1, !0, e);
						t && t !== this._$AB;

					) {
						const e = t.nextSibling;
						t.remove(), (t = e);
					}
				}
				setConnected(t) {
					var e;
					void 0 === this._$AM &&
						((this._$Cg = t),
						null === (e = this._$AP) ||
							void 0 === e ||
							e.call(this, t));
				}
			},
			P = class {
				constructor(t, e, r, i, o) {
					(this.type = 1),
						(this._$AH = I),
						(this._$AN = void 0),
						(this.element = t),
						(this.name = e),
						(this._$AM = i),
						(this.options = o),
						r.length > 2 || "" !== r[0] || "" !== r[1]
							? ((this._$AH = Array(r.length - 1).fill(
									new String()
							  )),
							  (this.strings = r))
							: (this._$AH = I);
				}
				get tagName() {
					return this.element.tagName;
				}
				get _$AU() {
					return this._$AM._$AU;
				}
				_$AI(t, e = this, r, i) {
					const o = this.strings;
					let a = !1;
					if (void 0 === o)
						(t = F(this, t, e, 0)),
							(a = !k(t) || (t !== this._$AH && t !== T)),
							a && (this._$AH = t);
					else {
						const i = t;
						let s, n;
						for (t = o[0], s = 0; s < o.length - 1; s++)
							(n = F(this, i[r + s], e, s)),
								n === T && (n = this._$AH[s]),
								a || (a = !k(n) || n !== this._$AH[s]),
								n === I
									? (t = I)
									: t !== I &&
									  (t += (null != n ? n : "") + o[s + 1]),
								(this._$AH[s] = n);
					}
					a && !i && this.k(t);
				}
				k(t) {
					t === I
						? this.element.removeAttribute(this.name)
						: this.element.setAttribute(
								this.name,
								null != t ? t : ""
						  );
				}
			},
			V = class extends P {
				constructor() {
					super(...arguments), (this.type = 3);
				}
				k(t) {
					this.element[this.name] = t === I ? void 0 : t;
				}
			},
			Z = b ? b.emptyScript : "",
			X = class extends P {
				constructor() {
					super(...arguments), (this.type = 4);
				}
				k(t) {
					t && t !== I
						? this.element.setAttribute(this.name, Z)
						: this.element.removeAttribute(this.name);
				}
			},
			q = class extends P {
				constructor(t, e, r, i, o) {
					super(t, e, r, i, o), (this.type = 5);
				}
				_$AI(t, e = this) {
					var r;
					if (
						(t =
							null !== (r = F(this, t, e, 0)) && void 0 !== r
								? r
								: I) === T
					)
						return;
					const i = this._$AH,
						o =
							(t === I && i !== I) ||
							t.capture !== i.capture ||
							t.once !== i.once ||
							t.passive !== i.passive,
						a = t !== I && (i === I || o);
					o && this.element.removeEventListener(this.name, this, i),
						a && this.element.addEventListener(this.name, this, t),
						(this._$AH = t);
				}
				handleEvent(t) {
					var e, r;
					"function" == typeof this._$AH
						? this._$AH.call(
								null !==
									(r =
										null === (e = this.options) ||
										void 0 === e
											? void 0
											: e.host) && void 0 !== r
									? r
									: this.element,
								t
						  )
						: this._$AH.handleEvent(t);
				}
			},
			Y = class {
				constructor(t, e, r) {
					(this.element = t),
						(this.type = 6),
						(this._$AN = void 0),
						(this._$AM = e),
						(this.options = r);
				}
				get _$AU() {
					return this._$AM._$AU;
				}
				_$AI(t) {
					F(this, t);
				}
			},
			W = window.litHtmlPolyfillSupport;
		null == W || W(E, N),
			(null !== (r = globalThis.litHtmlVersions) && void 0 !== r
				? r
				: (globalThis.litHtmlVersions = [])
			).push("2.1.3");
		var G = class extends v {
			constructor() {
				super(...arguments),
					(this.renderOptions = { host: this }),
					(this._$Dt = void 0);
			}
			createRenderRoot() {
				var t, e;
				const r = super.createRenderRoot();
				return (
					(null !== (t = (e = this.renderOptions).renderBefore) &&
						void 0 !== t) ||
						(e.renderBefore = r.firstChild),
					r
				);
			}
			update(t) {
				const e = this.render();
				this.hasUpdated ||
					(this.renderOptions.isConnected = this.isConnected),
					super.update(t),
					(this._$Dt = ((t, e, r) => {
						var i, o;
						const a =
							null !==
								(i = null == r ? void 0 : r.renderBefore) &&
							void 0 !== i
								? i
								: e;
						let s = a._$litPart$;
						if (void 0 === s) {
							const t =
								null !==
									(o = null == r ? void 0 : r.renderBefore) &&
								void 0 !== o
									? o
									: null;
							a._$litPart$ = s = new N(
								e.insertBefore($(), t),
								t,
								void 0,
								null != r ? r : {}
							);
						}
						return s._$AI(t), s;
					})(e, this.renderRoot, this.renderOptions));
			}
			connectedCallback() {
				var t;
				super.connectedCallback(),
					null === (t = this._$Dt) ||
						void 0 === t ||
						t.setConnected(!0);
			}
			disconnectedCallback() {
				var t;
				super.disconnectedCallback(),
					null === (t = this._$Dt) ||
						void 0 === t ||
						t.setConnected(!1);
			}
			render() {
				return T;
			}
		};
		(G.finalized = !0),
			(G._$litElement$ = !0),
			null === (R = globalThis.litElementHydrateSupport) ||
				void 0 === R ||
				R.call(globalThis, { LitElement: G });
		var K = globalThis.litElementPolyfillSupport;
		null == K || K({ LitElement: G }),
			(null !== (H = globalThis.litElementVersions) && void 0 !== H
				? H
				: (globalThis.litElementVersions = [])
			).push("3.1.2");
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		/**
		 * @license
		 * Copyright 2019 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		var Q = l`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,
			J = l`
  ${Q}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,
			tt = 1,
			et = 2,
			rt = 3,
			it = 4,
			ot =
				(t) =>
				(...e) => ({ _$litDirective$: t, values: e }),
			at = class {
				constructor(t) {}
				get _$AU() {
					return this._$AM._$AU;
				}
				_$AT(t, e, r) {
					(this._$Ct = t), (this._$AM = e), (this._$Ci = r);
				}
				_$AS(t, e) {
					return this.update(t, e);
				}
				update(t, e) {
					return this.render(...e);
				}
			},
			st = ot(
				class extends at {
					constructor(t) {
						var e;
						if (
							(super(t),
							t.type !== tt ||
								"class" !== t.name ||
								(null === (e = t.strings) || void 0 === e
									? void 0
									: e.length) > 2)
						)
							throw Error(
								"`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
							);
					}
					render(t) {
						return (
							" " +
							Object.keys(t)
								.filter((e) => t[e])
								.join(" ") +
							" "
						);
					}
					update(t, [e]) {
						var r, i;
						if (void 0 === this.st) {
							(this.st = new Set()),
								void 0 !== t.strings &&
									(this.et = new Set(
										t.strings
											.join(" ")
											.split(/\s/)
											.filter((t) => "" !== t)
									));
							for (const t in e)
								e[t] &&
									!(null === (r = this.et) || void 0 === r
										? void 0
										: r.has(t)) &&
									this.st.add(t);
							return this.render(e);
						}
						const o = t.element.classList;
						this.st.forEach((t) => {
							t in e || (o.remove(t), this.st.delete(t));
						});
						for (const t in e) {
							const r = !!e[t];
							r === this.st.has(t) ||
								(null === (i = this.et) || void 0 === i
									? void 0
									: i.has(t)) ||
								(r
									? (o.add(t), this.st.add(t))
									: (o.remove(t), this.st.delete(t)));
						}
						return T;
					}
				}
			),
			nt = Object.defineProperty,
			lt = Object.defineProperties,
			ct = Object.getOwnPropertyDescriptor,
			dt = Object.getOwnPropertyDescriptors,
			ht = Object.getOwnPropertySymbols,
			ut = Object.prototype.hasOwnProperty,
			ft = Object.prototype.propertyIsEnumerable,
			pt = (t, e, r) =>
				e in t
					? nt(t, e, {
							enumerable: !0,
							configurable: !0,
							writable: !0,
							value: r,
					  })
					: (t[e] = r),
			mt = (t, e) => {
				for (var r in e || (e = {})) ut.call(e, r) && pt(t, r, e[r]);
				if (ht) for (var r of ht(e)) ft.call(e, r) && pt(t, r, e[r]);
				return t;
			},
			vt = (t, e) => lt(t, dt(e)),
			bt = (t, e) => {
				var r = {};
				for (var i in t)
					ut.call(t, i) && e.indexOf(i) < 0 && (r[i] = t[i]);
				if (null != t && ht)
					for (var i of ht(t))
						e.indexOf(i) < 0 && ft.call(t, i) && (r[i] = t[i]);
				return r;
			},
			gt = (t, e, r, i) => {
				for (
					var o,
						a = i > 1 ? void 0 : i ? ct(e, r) : e,
						s = t.length - 1;
					s >= 0;
					s--
				)
					(o = t[s]) && (a = (i ? o(e, r, a) : o(a)) || a);
				return i && a && nt(e, r, a), a;
			},
			yt = (t) => (e) =>
				"function" == typeof e
					? ((t, e) => (window.customElements.define(t, e), e))(t, e)
					: ((t, e) => {
							const { kind: r, elements: i } = e;
							return {
								kind: r,
								elements: i,
								finisher(e) {
									window.customElements.define(t, e);
								},
							};
					  })(t, e),
			wt = (t, e) =>
				"method" === e.kind &&
				e.descriptor &&
				!("value" in e.descriptor)
					? vt(mt({}, e), {
							finisher(r) {
								r.createProperty(e.key, t);
							},
					  })
					: {
							kind: "field",
							key: Symbol(),
							placement: "own",
							descriptor: {},
							originalKey: e.key,
							initializer() {
								"function" == typeof e.initializer &&
									(this[e.key] = e.initializer.call(this));
							},
							finisher(r) {
								r.createProperty(e.key, t);
							},
					  };
		function xt(t) {
			return (e, r) =>
				void 0 !== r
					? ((t, e, r) => {
							e.constructor.createProperty(r, t);
					  })(t, e, r)
					: wt(t, e);
		}
		function _t(t) {
			return xt(vt(mt({}, t), { state: !0 }));
		}
		var $t,
			kt =
				({ finisher: t, descriptor: e }) =>
				(r, i) => {
					var o;
					if (void 0 === i) {
						const i =
								null !== (o = r.originalKey) && void 0 !== o
									? o
									: r.key,
							a =
								null != e
									? {
											kind: "method",
											placement: "prototype",
											key: i,
											descriptor: e(r.key),
									  }
									: vt(mt({}, r), { key: i });
						return (
							null != t &&
								(a.finisher = function (e) {
									t(e, i);
								}),
							a
						);
					}
					{
						const o = r.constructor;
						void 0 !== e && Object.defineProperty(r, i, e(i)),
							null == t || t(o, i);
					}
				};
		function Ct(t, e) {
			return kt({
				descriptor: (r) => {
					const i = {
						get() {
							var e, r;
							return null !==
								(r =
									null === (e = this.renderRoot) ||
									void 0 === e
										? void 0
										: e.querySelector(t)) && void 0 !== r
								? r
								: null;
						},
						enumerable: !0,
						configurable: !0,
					};
					if (e) {
						const e = "symbol" == typeof r ? Symbol() : "__" + r;
						i.get = function () {
							var r, i;
							return (
								void 0 === this[e] &&
									(this[e] =
										null !==
											(i =
												null ===
													(r = this.renderRoot) ||
												void 0 === r
													? void 0
													: r.querySelector(t)) &&
										void 0 !== i
											? i
											: null),
								this[e]
							);
						};
					}
					return i;
				},
			});
		}
		null === ($t = window.HTMLSlotElement) ||
			void 0 === $t ||
			$t.prototype.assignedElements;
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		/**
		 * @license
		 * Copyright 2021 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		var zt = class extends G {
			constructor() {
				super(...arguments),
					(this.hasError = !1),
					(this.label = ""),
					(this.shape = "circle");
			}
			render() {
				return j`
      <div
        part="base"
        class=${st({
			avatar: !0,
			"avatar--circle": "circle" === this.shape,
			"avatar--rounded": "rounded" === this.shape,
			"avatar--square": "square" === this.shape,
		})}
        role="img"
        aria-label=${this.label}
      >
        ${
			this.initials
				? j` <div part="initials" class="avatar__initials">${this.initials}</div> `
				: j`
              <div part="icon" class="avatar__icon" aria-hidden="true">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `
		}
        ${
			"string" != typeof this.image || this.hasError
				? ""
				: j`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                alt=""
                @error="${() => (this.hasError = !0)}"
              />
            `
		}
      </div>
    `;
			}
		};
		(zt.styles = J),
			gt([_t()], zt.prototype, "hasError", 2),
			gt([xt()], zt.prototype, "image", 2),
			gt([xt()], zt.prototype, "label", 2),
			gt([xt()], zt.prototype, "initials", 2),
			gt([xt({ reflect: !0 })], zt.prototype, "shape", 2),
			(zt = gt([yt("sl-avatar")], zt));
		var Bt = "";
		function Ot(t) {
			Bt = t;
		}
		var St = [...document.getElementsByTagName("script")],
			Lt = St.find((t) => t.hasAttribute("data-shoelace"));
		if (Lt) Ot(Lt.getAttribute("data-shoelace"));
		else {
			const t = St.find((t) => /shoelace(\.min)?\.js($|\?)/.test(t.src));
			let e = "";
			t && (e = t.getAttribute("src")),
				Ot(e.split("/").slice(0, -1).join("/"));
		}
		var At = {
				"check-lg":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">\n      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>\n    </svg>\n  ',
				"chevron-down":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',
				"chevron-left":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',
				"chevron-right":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',
				eye: '\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',
				"eye-slash":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',
				eyedropper:
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',
				"grip-vertical":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>\n    </svg>\n  ',
				"person-fill":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',
				"play-fill":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',
				"pause-fill":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',
				"star-fill":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',
				x: '\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">\n      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',
				"x-circle-fill":
					'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  ',
			},
			Mt = [
				{
					name: "default",
					resolver: (t) =>
						`${Bt.replace(/\/$/, "")}/assets/icons/${t}.svg`,
				},
				{
					name: "system",
					resolver: (t) =>
						t in At
							? `data:image/svg+xml,${encodeURIComponent(At[t])}`
							: "",
				},
			],
			jt = [];
		function Tt(t) {
			return Mt.find((e) => e.name === t);
		}
		var It = new Map(),
			Ut = new Map();
		async function Dt(t) {
			if (Ut.has(t)) return Ut.get(t);
			const e = await (function (t, e = "cors") {
					if (It.has(t)) return It.get(t);
					const r = fetch(t, { mode: e }).then(async (t) => ({
						ok: t.ok,
						status: t.status,
						html: await t.text(),
					}));
					return It.set(t, r), r;
				})(t),
				r = { ok: e.ok, status: e.status, svg: null };
			if (e.ok) {
				const t = document.createElement("div");
				t.innerHTML = e.html;
				const i = t.firstElementChild;
				r.svg =
					"svg" === (null == i ? void 0 : i.tagName.toLowerCase())
						? i.outerHTML
						: "";
			}
			return Ut.set(t, r), r;
		}
		var Et = l`
  ${Q}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,
			Ft = (t) => (null != t ? t : I);
		/**
		 * @license
		 * Copyright 2018 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ function Rt(t, e) {
			const r = mt({ waitUntilFirstUpdate: !1 }, e);
			return (e, i) => {
				const { update: o } = e;
				if (t in e) {
					const a = t;
					e.update = function (t) {
						if (t.has(a)) {
							const e = t.get(a),
								o = this[a];
							e !== o &&
								((r.waitUntilFirstUpdate && !this.hasUpdated) ||
									this[i](e, o));
						}
						o.call(this, t);
					};
				}
			};
		}
		function Ht(t, e, r) {
			const i = new CustomEvent(
				e,
				mt({ bubbles: !0, cancelable: !1, composed: !0, detail: {} }, r)
			);
			return t.dispatchEvent(i), i;
		}
		function Nt(t, e) {
			return new Promise((r) => {
				t.addEventListener(e, function i(o) {
					o.target === t && (t.removeEventListener(e, i), r());
				});
			});
		}
		var Pt = class extends at {
			constructor(t) {
				if ((super(t), (this.it = I), t.type !== et))
					throw Error(
						this.constructor.directiveName +
							"() can only be used in child bindings"
					);
			}
			render(t) {
				if (t === I || null == t)
					return (this.vt = void 0), (this.it = t);
				if (t === T) return t;
				if ("string" != typeof t)
					throw Error(
						this.constructor.directiveName +
							"() called with a non-string value"
					);
				if (t === this.it) return this.vt;
				this.it = t;
				const e = [t];
				return (
					(e.raw = e),
					(this.vt = {
						_$litType$: this.constructor.resultType,
						strings: e,
						values: [],
					})
				);
			}
		};
		(Pt.directiveName = "unsafeHTML"), (Pt.resultType = 1);
		var Vt = ot(Pt),
			Zt = class extends Pt {};
		(Zt.directiveName = "unsafeSVG"), (Zt.resultType = 2);
		var Xt = ot(Zt),
			qt = new DOMParser(),
			Yt = class extends G {
				constructor() {
					super(...arguments),
						(this.svg = ""),
						(this.label = ""),
						(this.library = "default");
				}
				connectedCallback() {
					var t;
					super.connectedCallback(), (t = this), jt.push(t);
				}
				firstUpdated() {
					this.setIcon();
				}
				disconnectedCallback() {
					var t;
					super.disconnectedCallback(),
						(t = this),
						(jt = jt.filter((e) => e !== t));
				}
				getUrl() {
					const t = Tt(this.library);
					return this.name && t ? t.resolver(this.name) : this.src;
				}
				redraw() {
					this.setIcon();
				}
				async setIcon() {
					var t;
					const e = Tt(this.library),
						r = this.getUrl();
					if (r)
						try {
							const i = await Dt(r);
							if (r !== this.getUrl()) return;
							if (i.ok) {
								const r = qt
									.parseFromString(i.svg, "text/html")
									.body.querySelector("svg");
								null !== r
									? (null ==
											(t =
												null == e
													? void 0
													: e.mutator) ||
											t.call(e, r),
									  (this.svg = r.outerHTML),
									  Ht(this, "sl-load"))
									: ((this.svg = ""), Ht(this, "sl-error"));
							} else (this.svg = ""), Ht(this, "sl-error");
						} catch (t) {
							Ht(this, "sl-error");
						}
					else this.svg.length > 0 && (this.svg = "");
				}
				handleChange() {
					this.setIcon();
				}
				render() {
					const t =
						"string" == typeof this.label && this.label.length > 0;
					return j` <div
      part="base"
      class="icon"
      role=${Ft(t ? "img" : void 0)}
      aria-label=${Ft(t ? this.label : void 0)}
      aria-hidden=${Ft(t ? void 0 : "true")}
    >
      ${Xt(this.svg)}
    </div>`;
				}
			};
		(Yt.styles = Et),
			gt([_t()], Yt.prototype, "svg", 2),
			gt([xt()], Yt.prototype, "name", 2),
			gt([xt()], Yt.prototype, "src", 2),
			gt([xt()], Yt.prototype, "label", 2),
			gt([xt()], Yt.prototype, "library", 2),
			gt(
				[Rt("name"), Rt("src"), Rt("library")],
				Yt.prototype,
				"setIcon",
				1
			),
			(Yt = gt([yt("sl-icon")], Yt));
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		/**
		 * @license
		 * Copyright 2019 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		const Wt =
				window.ShadowRoot &&
				(void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
				"adoptedStyleSheets" in Document.prototype &&
				"replace" in CSSStyleSheet.prototype,
			Gt = Symbol(),
			Kt = new Map();
		class Qt {
			constructor(t, e) {
				if (((this._$cssResult$ = !0), e !== Gt))
					throw Error(
						"CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
					);
				this.cssText = t;
			}
			get styleSheet() {
				let t = Kt.get(this.cssText);
				return (
					Wt &&
						void 0 === t &&
						(Kt.set(this.cssText, (t = new CSSStyleSheet())),
						t.replaceSync(this.cssText)),
					t
				);
			}
			toString() {
				return this.cssText;
			}
		}
		const Jt = (t) => new Qt("string" == typeof t ? t : t + "", Gt),
			te = (t, ...e) => {
				const r =
					1 === t.length
						? t[0]
						: e.reduce(
								(e, r, i) =>
									e +
									((t) => {
										if (!0 === t._$cssResult$)
											return t.cssText;
										if ("number" == typeof t) return t;
										throw Error(
											"Value passed to 'css' function must be a 'css' function result: " +
												t +
												". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
										);
									})(r) +
									t[i + 1],
								t[0]
						  );
				return new Qt(r, Gt);
			},
			ee = Wt
				? (t) => t
				: (t) =>
						t instanceof CSSStyleSheet
							? ((t) => {
									let e = "";
									for (const r of t.cssRules) e += r.cssText;
									return Jt(e);
							  })(t)
							: t;
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ var re;
		const ie = window.trustedTypes,
			oe = ie ? ie.emptyScript : "",
			ae = window.reactiveElementPolyfillSupport,
			se = {
				toAttribute(t, e) {
					switch (e) {
						case Boolean:
							t = t ? oe : null;
							break;
						case Object:
						case Array:
							t = null == t ? t : JSON.stringify(t);
					}
					return t;
				},
				fromAttribute(t, e) {
					let r = t;
					switch (e) {
						case Boolean:
							r = null !== t;
							break;
						case Number:
							r = null === t ? null : Number(t);
							break;
						case Object:
						case Array:
							try {
								r = JSON.parse(t);
							} catch (t) {
								r = null;
							}
					}
					return r;
				},
			},
			ne = (t, e) => e !== t && (e == e || t == t),
			le = {
				attribute: !0,
				type: String,
				converter: se,
				reflect: !1,
				hasChanged: ne,
			};
		class ce extends HTMLElement {
			constructor() {
				super(),
					(this._$Et = new Map()),
					(this.isUpdatePending = !1),
					(this.hasUpdated = !1),
					(this._$Ei = null),
					this.o();
			}
			static addInitializer(t) {
				var e;
				(null !== (e = this.l) && void 0 !== e) || (this.l = []),
					this.l.push(t);
			}
			static get observedAttributes() {
				this.finalize();
				const t = [];
				return (
					this.elementProperties.forEach((e, r) => {
						const i = this._$Eh(r, e);
						void 0 !== i && (this._$Eu.set(i, r), t.push(i));
					}),
					t
				);
			}
			static createProperty(t, e = le) {
				if (
					(e.state && (e.attribute = !1),
					this.finalize(),
					this.elementProperties.set(t, e),
					!e.noAccessor && !this.prototype.hasOwnProperty(t))
				) {
					const r = "symbol" == typeof t ? Symbol() : "__" + t,
						i = this.getPropertyDescriptor(t, r, e);
					void 0 !== i && Object.defineProperty(this.prototype, t, i);
				}
			}
			static getPropertyDescriptor(t, e, r) {
				return {
					get() {
						return this[e];
					},
					set(i) {
						const o = this[t];
						(this[e] = i), this.requestUpdate(t, o, r);
					},
					configurable: !0,
					enumerable: !0,
				};
			}
			static getPropertyOptions(t) {
				return this.elementProperties.get(t) || le;
			}
			static finalize() {
				if (this.hasOwnProperty("finalized")) return !1;
				this.finalized = !0;
				const t = Object.getPrototypeOf(this);
				if (
					(t.finalize(),
					(this.elementProperties = new Map(t.elementProperties)),
					(this._$Eu = new Map()),
					this.hasOwnProperty("properties"))
				) {
					const t = this.properties,
						e = [
							...Object.getOwnPropertyNames(t),
							...Object.getOwnPropertySymbols(t),
						];
					for (const r of e) this.createProperty(r, t[r]);
				}
				return (
					(this.elementStyles = this.finalizeStyles(this.styles)), !0
				);
			}
			static finalizeStyles(t) {
				const e = [];
				if (Array.isArray(t)) {
					const r = new Set(t.flat(1 / 0).reverse());
					for (const t of r) e.unshift(ee(t));
				} else void 0 !== t && e.push(ee(t));
				return e;
			}
			static _$Eh(t, e) {
				const r = e.attribute;
				return !1 === r
					? void 0
					: "string" == typeof r
					? r
					: "string" == typeof t
					? t.toLowerCase()
					: void 0;
			}
			o() {
				var t;
				(this._$Ep = new Promise((t) => (this.enableUpdating = t))),
					(this._$AL = new Map()),
					this._$Em(),
					this.requestUpdate(),
					null === (t = this.constructor.l) ||
						void 0 === t ||
						t.forEach((t) => t(this));
			}
			addController(t) {
				var e, r;
				(null !== (e = this._$Eg) && void 0 !== e
					? e
					: (this._$Eg = [])
				).push(t),
					void 0 !== this.renderRoot &&
						this.isConnected &&
						(null === (r = t.hostConnected) ||
							void 0 === r ||
							r.call(t));
			}
			removeController(t) {
				var e;
				null === (e = this._$Eg) ||
					void 0 === e ||
					e.splice(this._$Eg.indexOf(t) >>> 0, 1);
			}
			_$Em() {
				this.constructor.elementProperties.forEach((t, e) => {
					this.hasOwnProperty(e) &&
						(this._$Et.set(e, this[e]), delete this[e]);
				});
			}
			createRenderRoot() {
				var t;
				const e =
					null !== (t = this.shadowRoot) && void 0 !== t
						? t
						: this.attachShadow(this.constructor.shadowRootOptions);
				return (
					((t, e) => {
						Wt
							? (t.adoptedStyleSheets = e.map((t) =>
									t instanceof CSSStyleSheet
										? t
										: t.styleSheet
							  ))
							: e.forEach((e) => {
									const r = document.createElement("style"),
										i = window.litNonce;
									void 0 !== i && r.setAttribute("nonce", i),
										(r.textContent = e.cssText),
										t.appendChild(r);
							  });
					})(e, this.constructor.elementStyles),
					e
				);
			}
			connectedCallback() {
				var t;
				void 0 === this.renderRoot &&
					(this.renderRoot = this.createRenderRoot()),
					this.enableUpdating(!0),
					null === (t = this._$Eg) ||
						void 0 === t ||
						t.forEach((t) => {
							var e;
							return null === (e = t.hostConnected) ||
								void 0 === e
								? void 0
								: e.call(t);
						});
			}
			enableUpdating(t) {}
			disconnectedCallback() {
				var t;
				null === (t = this._$Eg) ||
					void 0 === t ||
					t.forEach((t) => {
						var e;
						return null === (e = t.hostDisconnected) || void 0 === e
							? void 0
							: e.call(t);
					});
			}
			attributeChangedCallback(t, e, r) {
				this._$AK(t, r);
			}
			_$ES(t, e, r = le) {
				var i, o;
				const a = this.constructor._$Eh(t, r);
				if (void 0 !== a && !0 === r.reflect) {
					const s = (
						null !==
							(o =
								null === (i = r.converter) || void 0 === i
									? void 0
									: i.toAttribute) && void 0 !== o
							? o
							: se.toAttribute
					)(e, r.type);
					(this._$Ei = t),
						null == s
							? this.removeAttribute(a)
							: this.setAttribute(a, s),
						(this._$Ei = null);
				}
			}
			_$AK(t, e) {
				var r, i, o;
				const a = this.constructor,
					s = a._$Eu.get(t);
				if (void 0 !== s && this._$Ei !== s) {
					const t = a.getPropertyOptions(s),
						n = t.converter,
						l =
							null !==
								(o =
									null !==
										(i =
											null === (r = n) || void 0 === r
												? void 0
												: r.fromAttribute) &&
									void 0 !== i
										? i
										: "function" == typeof n
										? n
										: null) && void 0 !== o
								? o
								: se.fromAttribute;
					(this._$Ei = s),
						(this[s] = l(e, t.type)),
						(this._$Ei = null);
				}
			}
			requestUpdate(t, e, r) {
				let i = !0;
				void 0 !== t &&
					((
						(r = r || this.constructor.getPropertyOptions(t))
							.hasChanged || ne
					)(this[t], e)
						? (this._$AL.has(t) || this._$AL.set(t, e),
						  !0 === r.reflect &&
								this._$Ei !== t &&
								(void 0 === this._$EC &&
									(this._$EC = new Map()),
								this._$EC.set(t, r)))
						: (i = !1)),
					!this.isUpdatePending && i && (this._$Ep = this._$E_());
			}
			async _$E_() {
				this.isUpdatePending = !0;
				try {
					await this._$Ep;
				} catch (t) {
					Promise.reject(t);
				}
				const t = this.scheduleUpdate();
				return null != t && (await t), !this.isUpdatePending;
			}
			scheduleUpdate() {
				return this.performUpdate();
			}
			performUpdate() {
				var t;
				if (!this.isUpdatePending) return;
				this.hasUpdated,
					this._$Et &&
						(this._$Et.forEach((t, e) => (this[e] = t)),
						(this._$Et = void 0));
				let e = !1;
				const r = this._$AL;
				try {
					(e = this.shouldUpdate(r)),
						e
							? (this.willUpdate(r),
							  null === (t = this._$Eg) ||
									void 0 === t ||
									t.forEach((t) => {
										var e;
										return null === (e = t.hostUpdate) ||
											void 0 === e
											? void 0
											: e.call(t);
									}),
							  this.update(r))
							: this._$EU();
				} catch (t) {
					throw ((e = !1), this._$EU(), t);
				}
				e && this._$AE(r);
			}
			willUpdate(t) {}
			_$AE(t) {
				var e;
				null === (e = this._$Eg) ||
					void 0 === e ||
					e.forEach((t) => {
						var e;
						return null === (e = t.hostUpdated) || void 0 === e
							? void 0
							: e.call(t);
					}),
					this.hasUpdated ||
						((this.hasUpdated = !0), this.firstUpdated(t)),
					this.updated(t);
			}
			_$EU() {
				(this._$AL = new Map()), (this.isUpdatePending = !1);
			}
			get updateComplete() {
				return this.getUpdateComplete();
			}
			getUpdateComplete() {
				return this._$Ep;
			}
			shouldUpdate(t) {
				return !0;
			}
			update(t) {
				void 0 !== this._$EC &&
					(this._$EC.forEach((t, e) => this._$ES(e, this[e], t)),
					(this._$EC = void 0)),
					this._$EU();
			}
			updated(t) {}
			firstUpdated(t) {}
		}
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		var de;
		(ce.finalized = !0),
			(ce.elementProperties = new Map()),
			(ce.elementStyles = []),
			(ce.shadowRootOptions = { mode: "open" }),
			null == ae || ae({ ReactiveElement: ce }),
			(null !== (re = globalThis.reactiveElementVersions) && void 0 !== re
				? re
				: (globalThis.reactiveElementVersions = [])
			).push("1.3.1");
		const he = globalThis.trustedTypes,
			ue = he
				? he.createPolicy("lit-html", { createHTML: (t) => t })
				: void 0,
			fe = `lit$${(Math.random() + "").slice(9)}$`,
			pe = "?" + fe,
			me = `<${pe}>`,
			ve = document,
			be = (t = "") => ve.createComment(t),
			ge = (t) =>
				null === t || ("object" != typeof t && "function" != typeof t),
			ye = Array.isArray,
			we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
			xe = /-->/g,
			_e = />/g,
			$e =
				/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
			ke = /'/g,
			Ce = /"/g,
			ze = /^(?:script|style|textarea|title)$/i,
			Be = (
				(t) =>
				(e, ...r) => ({ _$litType$: t, strings: e, values: r })
			)(1),
			Oe = Symbol.for("lit-noChange"),
			Se = Symbol.for("lit-nothing"),
			Le = new WeakMap(),
			Ae = ve.createTreeWalker(ve, 129, null, !1),
			Me = (t, e) => {
				const r = t.length - 1,
					i = [];
				let o,
					a = 2 === e ? "<svg>" : "",
					s = we;
				for (let e = 0; e < r; e++) {
					const r = t[e];
					let n,
						l,
						c = -1,
						d = 0;
					for (
						;
						d < r.length &&
						((s.lastIndex = d), (l = s.exec(r)), null !== l);

					)
						(d = s.lastIndex),
							s === we
								? "!--" === l[1]
									? (s = xe)
									: void 0 !== l[1]
									? (s = _e)
									: void 0 !== l[2]
									? (ze.test(l[2]) &&
											(o = RegExp("</" + l[2], "g")),
									  (s = $e))
									: void 0 !== l[3] && (s = $e)
								: s === $e
								? ">" === l[0]
									? ((s = null != o ? o : we), (c = -1))
									: void 0 === l[1]
									? (c = -2)
									: ((c = s.lastIndex - l[2].length),
									  (n = l[1]),
									  (s =
											void 0 === l[3]
												? $e
												: '"' === l[3]
												? Ce
												: ke))
								: s === Ce || s === ke
								? (s = $e)
								: s === xe || s === _e
								? (s = we)
								: ((s = $e), (o = void 0));
					const h = s === $e && t[e + 1].startsWith("/>") ? " " : "";
					a +=
						s === we
							? r + me
							: c >= 0
							? (i.push(n),
							  r.slice(0, c) + "$lit$" + r.slice(c) + fe + h)
							: r + fe + (-2 === c ? (i.push(void 0), e) : h);
				}
				const n = a + (t[r] || "<?>") + (2 === e ? "</svg>" : "");
				if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
					throw Error("invalid template strings array");
				return [void 0 !== ue ? ue.createHTML(n) : n, i];
			};
		class je {
			constructor({ strings: t, _$litType$: e }, r) {
				let i;
				this.parts = [];
				let o = 0,
					a = 0;
				const s = t.length - 1,
					n = this.parts,
					[l, c] = Me(t, e);
				if (
					((this.el = je.createElement(l, r)),
					(Ae.currentNode = this.el.content),
					2 === e)
				) {
					const t = this.el.content,
						e = t.firstChild;
					e.remove(), t.append(...e.childNodes);
				}
				for (; null !== (i = Ae.nextNode()) && n.length < s; ) {
					if (1 === i.nodeType) {
						if (i.hasAttributes()) {
							const t = [];
							for (const e of i.getAttributeNames())
								if (e.endsWith("$lit$") || e.startsWith(fe)) {
									const r = c[a++];
									if ((t.push(e), void 0 !== r)) {
										const t = i
												.getAttribute(
													r.toLowerCase() + "$lit$"
												)
												.split(fe),
											e = /([.?@])?(.*)/.exec(r);
										n.push({
											type: 1,
											index: o,
											name: e[2],
											strings: t,
											ctor:
												"." === e[1]
													? Ee
													: "?" === e[1]
													? Re
													: "@" === e[1]
													? He
													: De,
										});
									} else n.push({ type: 6, index: o });
								}
							for (const e of t) i.removeAttribute(e);
						}
						if (ze.test(i.tagName)) {
							const t = i.textContent.split(fe),
								e = t.length - 1;
							if (e > 0) {
								i.textContent = he ? he.emptyScript : "";
								for (let r = 0; r < e; r++)
									i.append(t[r], be()),
										Ae.nextNode(),
										n.push({ type: 2, index: ++o });
								i.append(t[e], be());
							}
						}
					} else if (8 === i.nodeType)
						if (i.data === pe) n.push({ type: 2, index: o });
						else {
							let t = -1;
							for (; -1 !== (t = i.data.indexOf(fe, t + 1)); )
								n.push({ type: 7, index: o }),
									(t += fe.length - 1);
						}
					o++;
				}
			}
			static createElement(t, e) {
				const r = ve.createElement("template");
				return (r.innerHTML = t), r;
			}
		}
		function Te(t, e, r = t, i) {
			var o, a, s, n;
			if (e === Oe) return e;
			let l =
				void 0 !== i
					? null === (o = r._$Cl) || void 0 === o
						? void 0
						: o[i]
					: r._$Cu;
			const c = ge(e) ? void 0 : e._$litDirective$;
			return (
				(null == l ? void 0 : l.constructor) !== c &&
					(null === (a = null == l ? void 0 : l._$AO) ||
						void 0 === a ||
						a.call(l, !1),
					void 0 === c
						? (l = void 0)
						: ((l = new c(t)), l._$AT(t, r, i)),
					void 0 !== i
						? ((null !== (s = (n = r)._$Cl) && void 0 !== s
								? s
								: (n._$Cl = []))[i] = l)
						: (r._$Cu = l)),
				void 0 !== l && (e = Te(t, l._$AS(t, e.values), l, i)),
				e
			);
		}
		class Ie {
			constructor(t, e) {
				(this.v = []),
					(this._$AN = void 0),
					(this._$AD = t),
					(this._$AM = e);
			}
			get parentNode() {
				return this._$AM.parentNode;
			}
			get _$AU() {
				return this._$AM._$AU;
			}
			p(t) {
				var e;
				const {
						el: { content: r },
						parts: i,
					} = this._$AD,
					o = (
						null !== (e = null == t ? void 0 : t.creationScope) &&
						void 0 !== e
							? e
							: ve
					).importNode(r, !0);
				Ae.currentNode = o;
				let a = Ae.nextNode(),
					s = 0,
					n = 0,
					l = i[0];
				for (; void 0 !== l; ) {
					if (s === l.index) {
						let e;
						2 === l.type
							? (e = new Ue(a, a.nextSibling, this, t))
							: 1 === l.type
							? (e = new l.ctor(a, l.name, l.strings, this, t))
							: 6 === l.type && (e = new Ne(a, this, t)),
							this.v.push(e),
							(l = i[++n]);
					}
					s !== (null == l ? void 0 : l.index) &&
						((a = Ae.nextNode()), s++);
				}
				return o;
			}
			m(t) {
				let e = 0;
				for (const r of this.v)
					void 0 !== r &&
						(void 0 !== r.strings
							? (r._$AI(t, r, e), (e += r.strings.length - 2))
							: r._$AI(t[e])),
						e++;
			}
		}
		class Ue {
			constructor(t, e, r, i) {
				var o;
				(this.type = 2),
					(this._$AH = Se),
					(this._$AN = void 0),
					(this._$AA = t),
					(this._$AB = e),
					(this._$AM = r),
					(this.options = i),
					(this._$Cg =
						null === (o = null == i ? void 0 : i.isConnected) ||
						void 0 === o ||
						o);
			}
			get _$AU() {
				var t, e;
				return null !==
					(e =
						null === (t = this._$AM) || void 0 === t
							? void 0
							: t._$AU) && void 0 !== e
					? e
					: this._$Cg;
			}
			get parentNode() {
				let t = this._$AA.parentNode;
				const e = this._$AM;
				return (
					void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t
				);
			}
			get startNode() {
				return this._$AA;
			}
			get endNode() {
				return this._$AB;
			}
			_$AI(t, e = this) {
				(t = Te(this, t, e)),
					ge(t)
						? t === Se || null == t || "" === t
							? (this._$AH !== Se && this._$AR(),
							  (this._$AH = Se))
							: t !== this._$AH && t !== Oe && this.$(t)
						: void 0 !== t._$litType$
						? this.T(t)
						: void 0 !== t.nodeType
						? this.k(t)
						: ((t) => {
								var e;
								return (
									ye(t) ||
									"function" ==
										typeof (null === (e = t) || void 0 === e
											? void 0
											: e[Symbol.iterator])
								);
						  })(t)
						? this.S(t)
						: this.$(t);
			}
			A(t, e = this._$AB) {
				return this._$AA.parentNode.insertBefore(t, e);
			}
			k(t) {
				this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
			}
			$(t) {
				this._$AH !== Se && ge(this._$AH)
					? (this._$AA.nextSibling.data = t)
					: this.k(ve.createTextNode(t)),
					(this._$AH = t);
			}
			T(t) {
				var e;
				const { values: r, _$litType$: i } = t,
					o =
						"number" == typeof i
							? this._$AC(t)
							: (void 0 === i.el &&
									(i.el = je.createElement(
										i.h,
										this.options
									)),
							  i);
				if (
					(null === (e = this._$AH) || void 0 === e
						? void 0
						: e._$AD) === o
				)
					this._$AH.m(r);
				else {
					const t = new Ie(o, this),
						e = t.p(this.options);
					t.m(r), this.k(e), (this._$AH = t);
				}
			}
			_$AC(t) {
				let e = Le.get(t.strings);
				return void 0 === e && Le.set(t.strings, (e = new je(t))), e;
			}
			S(t) {
				ye(this._$AH) || ((this._$AH = []), this._$AR());
				const e = this._$AH;
				let r,
					i = 0;
				for (const o of t)
					i === e.length
						? e.push(
								(r = new Ue(
									this.A(be()),
									this.A(be()),
									this,
									this.options
								))
						  )
						: (r = e[i]),
						r._$AI(o),
						i++;
				i < e.length &&
					(this._$AR(r && r._$AB.nextSibling, i), (e.length = i));
			}
			_$AR(t = this._$AA.nextSibling, e) {
				var r;
				for (
					null === (r = this._$AP) ||
					void 0 === r ||
					r.call(this, !1, !0, e);
					t && t !== this._$AB;

				) {
					const e = t.nextSibling;
					t.remove(), (t = e);
				}
			}
			setConnected(t) {
				var e;
				void 0 === this._$AM &&
					((this._$Cg = t),
					null === (e = this._$AP) ||
						void 0 === e ||
						e.call(this, t));
			}
		}
		class De {
			constructor(t, e, r, i, o) {
				(this.type = 1),
					(this._$AH = Se),
					(this._$AN = void 0),
					(this.element = t),
					(this.name = e),
					(this._$AM = i),
					(this.options = o),
					r.length > 2 || "" !== r[0] || "" !== r[1]
						? ((this._$AH = Array(r.length - 1).fill(new String())),
						  (this.strings = r))
						: (this._$AH = Se);
			}
			get tagName() {
				return this.element.tagName;
			}
			get _$AU() {
				return this._$AM._$AU;
			}
			_$AI(t, e = this, r, i) {
				const o = this.strings;
				let a = !1;
				if (void 0 === o)
					(t = Te(this, t, e, 0)),
						(a = !ge(t) || (t !== this._$AH && t !== Oe)),
						a && (this._$AH = t);
				else {
					const i = t;
					let s, n;
					for (t = o[0], s = 0; s < o.length - 1; s++)
						(n = Te(this, i[r + s], e, s)),
							n === Oe && (n = this._$AH[s]),
							a || (a = !ge(n) || n !== this._$AH[s]),
							n === Se
								? (t = Se)
								: t !== Se &&
								  (t += (null != n ? n : "") + o[s + 1]),
							(this._$AH[s] = n);
				}
				a && !i && this.C(t);
			}
			C(t) {
				t === Se
					? this.element.removeAttribute(this.name)
					: this.element.setAttribute(this.name, null != t ? t : "");
			}
		}
		class Ee extends De {
			constructor() {
				super(...arguments), (this.type = 3);
			}
			C(t) {
				this.element[this.name] = t === Se ? void 0 : t;
			}
		}
		const Fe = he ? he.emptyScript : "";
		class Re extends De {
			constructor() {
				super(...arguments), (this.type = 4);
			}
			C(t) {
				t && t !== Se
					? this.element.setAttribute(this.name, Fe)
					: this.element.removeAttribute(this.name);
			}
		}
		class He extends De {
			constructor(t, e, r, i, o) {
				super(t, e, r, i, o), (this.type = 5);
			}
			_$AI(t, e = this) {
				var r;
				if (
					(t =
						null !== (r = Te(this, t, e, 0)) && void 0 !== r
							? r
							: Se) === Oe
				)
					return;
				const i = this._$AH,
					o =
						(t === Se && i !== Se) ||
						t.capture !== i.capture ||
						t.once !== i.once ||
						t.passive !== i.passive,
					a = t !== Se && (i === Se || o);
				o && this.element.removeEventListener(this.name, this, i),
					a && this.element.addEventListener(this.name, this, t),
					(this._$AH = t);
			}
			handleEvent(t) {
				var e, r;
				"function" == typeof this._$AH
					? this._$AH.call(
							null !==
								(r =
									null === (e = this.options) || void 0 === e
										? void 0
										: e.host) && void 0 !== r
								? r
								: this.element,
							t
					  )
					: this._$AH.handleEvent(t);
			}
		}
		class Ne {
			constructor(t, e, r) {
				(this.element = t),
					(this.type = 6),
					(this._$AN = void 0),
					(this._$AM = e),
					(this.options = r);
			}
			get _$AU() {
				return this._$AM._$AU;
			}
			_$AI(t) {
				Te(this, t);
			}
		}
		const Pe = window.litHtmlPolyfillSupport;
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		var Ve, Ze;
		null == Pe || Pe(je, Ue),
			(null !== (de = globalThis.litHtmlVersions) && void 0 !== de
				? de
				: (globalThis.litHtmlVersions = [])
			).push("2.2.1");
		class Xe extends ce {
			constructor() {
				super(...arguments),
					(this.renderOptions = { host: this }),
					(this._$Dt = void 0);
			}
			createRenderRoot() {
				var t, e;
				const r = super.createRenderRoot();
				return (
					(null !== (t = (e = this.renderOptions).renderBefore) &&
						void 0 !== t) ||
						(e.renderBefore = r.firstChild),
					r
				);
			}
			update(t) {
				const e = this.render();
				this.hasUpdated ||
					(this.renderOptions.isConnected = this.isConnected),
					super.update(t),
					(this._$Dt = ((t, e, r) => {
						var i, o;
						const a =
							null !==
								(i = null == r ? void 0 : r.renderBefore) &&
							void 0 !== i
								? i
								: e;
						let s = a._$litPart$;
						if (void 0 === s) {
							const t =
								null !==
									(o = null == r ? void 0 : r.renderBefore) &&
								void 0 !== o
									? o
									: null;
							a._$litPart$ = s = new Ue(
								e.insertBefore(be(), t),
								t,
								void 0,
								null != r ? r : {}
							);
						}
						return s._$AI(t), s;
					})(e, this.renderRoot, this.renderOptions));
			}
			connectedCallback() {
				var t;
				super.connectedCallback(),
					null === (t = this._$Dt) ||
						void 0 === t ||
						t.setConnected(!0);
			}
			disconnectedCallback() {
				var t;
				super.disconnectedCallback(),
					null === (t = this._$Dt) ||
						void 0 === t ||
						t.setConnected(!1);
			}
			render() {
				return Oe;
			}
		}
		(Xe.finalized = !0),
			(Xe._$litElement$ = !0),
			null === (Ve = globalThis.litElementHydrateSupport) ||
				void 0 === Ve ||
				Ve.call(globalThis, { LitElement: Xe });
		const qe = globalThis.litElementPolyfillSupport;
		null == qe || qe({ LitElement: Xe }),
			(null !== (Ze = globalThis.litElementVersions) && void 0 !== Ze
				? Ze
				: (globalThis.litElementVersions = [])
			).push("3.2.0");
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */
		const Ye = (t) => (e) =>
				"function" == typeof e
					? ((t, e) => (window.customElements.define(t, e), e))(t, e)
					: ((t, e) => {
							const { kind: r, elements: i } = e;
							return {
								kind: r,
								elements: i,
								finisher(e) {
									window.customElements.define(t, e);
								},
							};
					  })(t, e),
			/**
			 * @license
			 * Copyright 2017 Google LLC
			 * SPDX-License-Identifier: BSD-3-Clause
			 */ We = (t, e) =>
				"method" === e.kind &&
				e.descriptor &&
				!("value" in e.descriptor)
					? {
							...e,
							finisher(r) {
								r.createProperty(e.key, t);
							},
					  }
					: {
							kind: "field",
							key: Symbol(),
							placement: "own",
							descriptor: {},
							originalKey: e.key,
							initializer() {
								"function" == typeof e.initializer &&
									(this[e.key] = e.initializer.call(this));
							},
							finisher(r) {
								r.createProperty(e.key, t);
							},
					  };
		function Ge(t) {
			return (e, r) =>
				void 0 !== r
					? ((t, e, r) => {
							e.constructor.createProperty(r, t);
					  })(t, e, r)
					: We(t, e);
			/**
			 * @license
			 * Copyright 2017 Google LLC
			 * SPDX-License-Identifier: BSD-3-Clause
			 */
		}
		function Ke(t) {
			return Ge({ ...t, state: !0 });
		}
		/**
		 * @license
		 * Copyright 2021 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ var Qe;
		null === (Qe = window.HTMLSlotElement) ||
			void 0 === Qe ||
			Qe.prototype.assignedElements;
		var Je = te`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,
			tr = te`
  ${Je}

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      0deg,
      var(--messaging-avatar-bg),
      var(--messaging-avatar-bg)
    );
    border-radius: 50%;
  }

  ::part(base) {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--secondary);
  }

  .status-container {
    position: absolute;
  }

  .dot {
    position: absolute;
    border-radius: 50%;
  }

  .dot-bottomRight {
    right: 0;
    bottom: 0;
  }

  .dot-bottomLeft {
    left: 0;
    bottom: 0;
  }

  .dot-topRight {
    right: 0;
    top: 0;
  }

  .dot-topLeft {
    left: 0;
    top: 0;
  }
  //TODO: alter dot border color should change when alterBg true
  .alter--bg {
    background: linear-gradient(0deg, var(--surface31), var(--surface31)),
      var(--surface30);
  }

  .alter--bg {
    border-color: var(--primary-container);
  }
`;
		/**
		 * @license
		 * Copyright 2017 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ const er = 1,
			rr = 3,
			ir = 4,
			or =
				(t) =>
				(...e) => ({ _$litDirective$: t, values: e });
		class ar {
			constructor(t) {}
			get _$AU() {
				return this._$AM._$AU;
			}
			_$AT(t, e, r) {
				(this._$Ct = t), (this._$AM = e), (this._$Ci = r);
			}
			_$AS(t, e) {
				return this.update(t, e);
			}
			update(t, e) {
				return this.render(...e);
			}
		}
		/**
		 * @license
		 * Copyright 2018 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ const sr = or(
			class extends ar {
				constructor(t) {
					var e;
					if (
						(super(t),
						t.type !== er ||
							"class" !== t.name ||
							(null === (e = t.strings) || void 0 === e
								? void 0
								: e.length) > 2)
					)
						throw Error(
							"`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
						);
				}
				render(t) {
					return (
						" " +
						Object.keys(t)
							.filter((e) => t[e])
							.join(" ") +
						" "
					);
				}
				update(t, [e]) {
					var r, i;
					if (void 0 === this.et) {
						(this.et = new Set()),
							void 0 !== t.strings &&
								(this.st = new Set(
									t.strings
										.join(" ")
										.split(/\s/)
										.filter((t) => "" !== t)
								));
						for (const t in e)
							e[t] &&
								!(null === (r = this.st) || void 0 === r
									? void 0
									: r.has(t)) &&
								this.et.add(t);
						return this.render(e);
					}
					const o = t.element.classList;
					this.et.forEach((t) => {
						t in e || (o.remove(t), this.et.delete(t));
					});
					for (const t in e) {
						const r = !!e[t];
						r === this.et.has(t) ||
							(null === (i = this.st) || void 0 === i
								? void 0
								: i.has(t)) ||
							(r
								? (o.add(t), this.et.add(t))
								: (o.remove(t), this.et.delete(t)));
					}
					return Oe;
				}
			}
		);
		var nr = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let lr = class extends Xe {
			constructor() {
				super(...arguments),
					(this.dotColor = "#6dc852"),
					(this.alterBg = !1),
					(this.size = 3);
			}
			render() {
				const t = this.size ? `${this.size}rem` : "3rem",
					e = this.size / 6 + "rem",
					r = this.size - this.size / 12 + "rem",
					i = this.size / 30 + "rem";
				return Be`
      <div
        class=${sr({ wrapper: !0, "alter--bg": this.alterBg })}
        style="width:${t};height:${t};"
      >
        <sl-avatar
          initials=${this.imageUrl ? "" : this.initial}
          image=${this.imageUrl}
          style="--sl-border-radius-circle: 50%;--size:${t};"
        ></sl-avatar>
        <div
          class="status-container"
          style="
        width:${r};
        height:${r};"
        >
          ${
				this.dotPosition
					? Be`
                <div
                  class="dot dot-${this.dotPosition}"
                  style="
        background-color:${this.dotColor};
        width:${e};
        height:${e};
        border:${i} solid var(--white)"
                ></div>
              `
					: ""
			}
        </div>
      </div>
    `;
			}
		};
		(lr.styles = tr),
			nr([Ge()], lr.prototype, "initial", void 0),
			nr(
				[Ge({ reflect: !0, attribute: "image-url" })],
				lr.prototype,
				"imageUrl",
				void 0
			),
			nr(
				[Ge({ reflect: !0, attribute: "dot-position" })],
				lr.prototype,
				"dotPosition",
				void 0
			),
			nr(
				[Ge({ reflect: !0, attribute: "dot-color" })],
				lr.prototype,
				"dotColor",
				void 0
			),
			nr(
				[Ge({ reflect: !0, type: Boolean, attribute: "alter-bg" })],
				lr.prototype,
				"alterBg",
				void 0
			),
			nr([Ge({ type: Number })], lr.prototype, "size", void 0),
			(lr = nr([Ye("agosh-avatar")], lr));
		var cr = lr;
		function dr(t, e) {
			return `var(${t}-offset-x) var(${t}-offset-y) var(${t}-radius) ${
				e ? `var(${t}-spread) ` : " "
			}var(${t}-color)`;
		}
		var hr = te`
  ${Je}
  ::part(base) {
    padding: 1rem;
    width: 23.75rem;
    box-shadow: ${Jt(`${dr("--elevation11", !1)}, ${dr("--elevation10", !0)}`)};
    border-radius: var(--elevation50-radius);
    flex: 0 0 auto;
    order: 0;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-700);
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-top-style: none;
    border-top-color: initial;
    border-image: initial;
    border-top-width: 0rem;
  }

  ::part(icon) {
    display: flex;
    align-items: start;
    flex-direction: row;
    padding: 0.125rem 0.625rem 0.125rem 0.125rem;
  }

  .wrapper-primary::part(icon) {
    color: var(--primary);
  }

  .wrapper-success::part(icon) {
    color: var(--status-success);
  }

  .wrapper-warning::part(icon) {
    color: var(--status-warning);
  }

  .wrapper-danger::part(icon) {
    color: var(--error);
  }

  ::part(message) {
    display: flex;
    align-items: start;
    flex-direction: row;
    padding: 0;
  }

  .close {
    margin: 0.125rem 0.313rem;
  }

  .close svg {
    width: 13.18px;
    height: 13.18px;
  }

  .close:hover {
    cursor: pointer;
    color: green;
  }

  sl-alert::part(close-button__base) {
    padding: 0;
    color: var(--on-surface-variant);
  }

  .wrapper-primary::part(close-button__base):hover {
    color: var(--primary);
  }

  .wrapper-success::part(close-button__base):hover {
    color: var(--status-success);
  }

  .wrapper-warning::part(close-button__base):hover {
    color: var(--status-warning);
  }

  .wrapper-danger::part(close-button__base):hover {
    color: var(--error);
  }

  .wrapper-primary::part(base) {
    background: linear-gradient(0deg, var(--alert-bg), var(--alert-bg)),
      var(--primary);
  }

  .wrapper-success::part(base) {
    background: linear-gradient(0deg, var(--alert-bg), var(--alert-bg)),
      var(--status-success);
  }

  .wrapper-warning::part(base) {
    background: linear-gradient(0deg, var(--alert-bg), var(--alert-bg)),
      var(--status-warning);
  }

  .wrapper-danger::part(base) {
    background: linear-gradient(0deg, var(--alert-bg), var(--alert-bg)),
      var(--error);
  }

  ::part(close-button) {
    display: flex;
    align-items: start;
    flex-direction: row;
    margin-top: -0.125rem;
    font-size: 30px;
    padding: 0rem;
  }

  .icon::part(base) {
    padding: 0;
  }

  :host *,
  :host ::before,
  :host ::after {
    box-sizing: inherit;
    padding: 0 !important;
  }

  .alert_container .message {
    font-size: var(--m3-title-small-font-size);
    font-family: var(--m3-title-small-font-family);
    font-weight: var(--m3-title-small-font-weight);
    font-style: var(--m3-title-small-font-style);
    font-stretch: var(--m3-title-small-font-stretch);
    letter-spacing: var(--m3-title-small-letter-spacing);
    line-height: var(--m3-title-small-line-height);
    padding-top: 0.125rem !important;
  }

  .description {
    font-size: var(--m3-body-small-font-size);
    text-decoration: var(--m3-body-small-text-decoration);
    font-family: var(--m3-body-small-font-family);
    font-weight: var(--m3-body-small-font-weight);
    font-style: var(--m3-body-small-font-style);
    font-stretch: var(--m3-body-small-font-stretch);
    letter-spacing: var(--m3-body-small-letter-spacing);
    line-height: var(--m3-body-small-line-height);
    color: var(--on-surface-variant);
    margin-top: 0.5rem;
  }

  .primary {
    color: var(--primary);
  }

  .success {
    color: var(--status-success);
  }

  .warning {
    color: var(--status-warning);
  }

  .danger {
    color: var(--error);
  }
`;
		function ur(t, e, r) {
			return new Promise((i) => {
				if ((null == r ? void 0 : r.duration) === 1 / 0)
					throw new Error("Promise-based animations must be finite.");
				const o = t.animate(
					e,
					vt(mt({}, r), {
						duration: window.matchMedia(
							"(prefers-reduced-motion: reduce)"
						).matches
							? 0
							: r.duration,
					})
				);
				o.addEventListener("cancel", i, { once: !0 }),
					o.addEventListener("finish", i, { once: !0 });
			});
		}
		function fr(t) {
			return (t = t.toString().toLowerCase()).indexOf("ms") > -1
				? parseFloat(t)
				: t.indexOf("s") > -1
				? 1e3 * parseFloat(t)
				: parseFloat(t);
		}
		function pr(t) {
			return Promise.all(
				t.getAnimations().map(
					(t) =>
						new Promise((e) => {
							const r = requestAnimationFrame(e);
							t.addEventListener("cancel", () => r, { once: !0 }),
								t.addEventListener("finish", () => r, {
									once: !0,
								}),
								t.cancel();
						})
				)
			);
		}
		function mr(t, e) {
			return t.map((t) =>
				vt(mt({}, t), {
					height: "auto" === t.height ? `${e}px` : t.height,
				})
			);
		}
		var vr = new Map(),
			br = new WeakMap();
		function gr(t, e) {
			vr.set(
				t,
				(function (t) {
					return null != t
						? t
						: { keyframes: [], options: { duration: 0 } };
				})(e)
			);
		}
		function yr(t, e) {
			const r = br.get(t);
			if (null == r ? void 0 : r[e]) return r[e];
			const i = vr.get(e);
			return i || { keyframes: [], options: { duration: 0 } };
		}
		var wr = class {
			constructor(t, ...e) {
				(this.slotNames = []),
					(this.host = t).addController(this),
					(this.slotNames = e),
					(this.handleSlotChange = this.handleSlotChange.bind(this));
			}
			hasDefaultSlot() {
				return [...this.host.childNodes].some((t) => {
					if (
						t.nodeType === t.TEXT_NODE &&
						"" !== t.textContent.trim()
					)
						return !0;
					if (t.nodeType === t.ELEMENT_NODE) {
						const e = t;
						if ("sl-visually-hidden" === e.tagName.toLowerCase())
							return !1;
						if (!e.hasAttribute("slot")) return !0;
					}
					return !1;
				});
			}
			hasNamedSlot(t) {
				return (
					null !== this.host.querySelector(`:scope > [slot="${t}"]`)
				);
			}
			test(t) {
				return "[default]" === t
					? this.hasDefaultSlot()
					: this.hasNamedSlot(t);
			}
			hostConnected() {
				this.host.shadowRoot.addEventListener(
					"slotchange",
					this.handleSlotChange
				);
			}
			hostDisconnected() {
				this.host.shadowRoot.removeEventListener(
					"slotchange",
					this.handleSlotChange
				);
			}
			handleSlotChange(t) {
				const e = t.target;
				((this.slotNames.includes("[default]") && !e.name) ||
					(e.name && this.slotNames.includes(e.name))) &&
					this.host.requestUpdate();
			}
		};
		function xr(t) {
			if (!t) return "";
			const e = t.assignedNodes({ flatten: !0 });
			let r = "";
			return (
				[...e].forEach((t) => {
					t.nodeType === Node.TEXT_NODE && (r += t.textContent);
				}),
				r
			);
		}
		var _r = l`
  ${Q}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-left: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }
`,
			$r = Object.assign(document.createElement("div"), {
				className: "sl-toast-stack",
			}),
			kr = class extends G {
				constructor() {
					super(...arguments),
						(this.hasSlotController = new wr(
							this,
							"icon",
							"suffix"
						)),
						(this.open = !1),
						(this.closable = !1),
						(this.variant = "primary"),
						(this.duration = 1 / 0);
				}
				firstUpdated() {
					this.base.hidden = !this.open;
				}
				async show() {
					if (!this.open)
						return (this.open = !0), Nt(this, "sl-after-show");
				}
				async hide() {
					if (this.open)
						return (this.open = !1), Nt(this, "sl-after-hide");
				}
				async toast() {
					return new Promise((t) => {
						null === $r.parentElement && document.body.append($r),
							$r.appendChild(this),
							requestAnimationFrame(() => {
								this.clientWidth, this.show();
							}),
							this.addEventListener(
								"sl-after-hide",
								() => {
									$r.removeChild(this),
										t(),
										null === $r.querySelector("sl-alert") &&
											$r.remove();
								},
								{ once: !0 }
							);
					});
				}
				restartAutoHide() {
					clearTimeout(this.autoHideTimeout),
						this.open &&
							this.duration < 1 / 0 &&
							(this.autoHideTimeout = window.setTimeout(
								() => this.hide(),
								this.duration
							));
				}
				handleCloseClick() {
					this.hide();
				}
				handleMouseMove() {
					this.restartAutoHide();
				}
				async handleOpenChange() {
					if (this.open) {
						Ht(this, "sl-show"),
							this.duration < 1 / 0 && this.restartAutoHide(),
							await pr(this.base),
							(this.base.hidden = !1);
						const { keyframes: t, options: e } = yr(
							this,
							"alert.show"
						);
						await ur(this.base, t, e), Ht(this, "sl-after-show");
					} else {
						Ht(this, "sl-hide"),
							clearTimeout(this.autoHideTimeout),
							await pr(this.base);
						const { keyframes: t, options: e } = yr(
							this,
							"alert.hide"
						);
						await ur(this.base, t, e),
							(this.base.hidden = !0),
							Ht(this, "sl-after-hide");
					}
				}
				handleDurationChange() {
					this.restartAutoHide();
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			alert: !0,
			"alert--open": this.open,
			"alert--closable": this.closable,
			"alert--has-icon": this.hasSlotController.test("icon"),
			"alert--primary": "primary" === this.variant,
			"alert--success": "success" === this.variant,
			"alert--neutral": "neutral" === this.variant,
			"alert--warning": "warning" === this.variant,
			"alert--danger": "danger" === this.variant,
		})}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${
			this.closable
				? j`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x"
                library="system"
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `
				: ""
		}
      </div>
    `;
				}
			};
		(kr.styles = _r),
			gt([Ct('[part="base"]')], kr.prototype, "base", 2),
			gt([xt({ type: Boolean, reflect: !0 })], kr.prototype, "open", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				kr.prototype,
				"closable",
				2
			),
			gt([xt({ reflect: !0 })], kr.prototype, "variant", 2),
			gt([xt({ type: Number })], kr.prototype, "duration", 2),
			gt(
				[Rt("open", { waitUntilFirstUpdate: !0 })],
				kr.prototype,
				"handleOpenChange",
				1
			),
			gt([Rt("duration")], kr.prototype, "handleDurationChange", 1),
			(kr = gt([yt("sl-alert")], kr)),
			gr("alert.show", {
				keyframes: [
					{ opacity: 0, transform: "scale(0.8)" },
					{ opacity: 1, transform: "scale(1)" },
				],
				options: { duration: 250, easing: "ease" },
			}),
			gr("alert.hide", {
				keyframes: [
					{ opacity: 1, transform: "scale(1)" },
					{ opacity: 0, transform: "scale(0.8)" },
				],
				options: { duration: 250, easing: "ease" },
			});
		var Cr = (() => {
				const t = document.createElement("style");
				let e;
				try {
					document.head.appendChild(t),
						t.sheet.insertRule(":focus-visible { color: inherit }"),
						(e = !0);
				} catch (t) {
					e = !1;
				} finally {
					t.remove();
				}
				return e;
			})(),
			zr = n(Cr ? ":focus-visible" : ":focus"),
			Br = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${zr} {
    box-shadow: var(--sl-focus-ring);
  }
`,
			Or = class extends G {
				constructor() {
					super(...arguments),
						(this.label = ""),
						(this.disabled = !1);
				}
				render() {
					const t = !!this.href,
						e = j`
      <sl-icon
        name=${Ft(this.name)}
        library=${Ft(this.library)}
        src=${Ft(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;
					return t
						? j`
          <a
            part="base"
            class="icon-button"
            href=${Ft(this.href)}
            target=${Ft(this.target)}
            download=${Ft(this.download)}
            rel=${Ft(this.target ? "noreferrer noopener" : void 0)}
            role="button"
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-label="${this.label}"
            tabindex=${this.disabled ? "-1" : "0"}
          >
            ${e}
          </a>
        `
						: j`
          <button
            part="base"
            class=${st({
				"icon-button": !0,
				"icon-button--disabled": this.disabled,
			})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${e}
          </button>
        `;
				}
			};
		function Sr(t, e, r) {
			const i = new CustomEvent(e, {
				bubbles: !0,
				cancelable: !1,
				composed: !0,
				detail: {},
				...r,
			});
			return t.dispatchEvent(i), i;
		}
		(Or.styles = Br),
			gt([Ct(".icon-button")], Or.prototype, "button", 2),
			gt([xt()], Or.prototype, "name", 2),
			gt([xt()], Or.prototype, "library", 2),
			gt([xt()], Or.prototype, "src", 2),
			gt([xt()], Or.prototype, "href", 2),
			gt([xt()], Or.prototype, "target", 2),
			gt([xt()], Or.prototype, "download", 2),
			gt([xt()], Or.prototype, "label", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Or.prototype,
				"disabled",
				2
			),
			(Or = gt([yt("sl-icon-button")], Or));
		var Lr = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Ar = class extends Xe {
			constructor() {
				super(...arguments),
					(this.variantName = "primary"),
					(this.open = !1),
					(this.toggle = () => {
						(this.open = !this.open), this.requestUpdate();
					}),
					(this.show = () => {
						(this.open = !0), this.requestUpdate();
					}),
					(this.hide = () => {
						(this.open = !1), this.requestUpdate();
					});
			}
			handleShow() {
				Sr(this, "agosh-show");
			}
			handleHide() {
				Sr(this, "agosh-hide");
			}
			render() {
				return Be`
    <sl-alert  @sl-show=${this.handleShow} @sl-hide=${
					this.handleHide
				} variant=${this.variantName} class="wrapper-${
					this.variantName
				}" .open="${this.open}" closable>
    ${
		"primary" === this.variantName
			? Be`<svg
            slot="icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10ZM9 6C9 5.44772 9.44771 5 10 5C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7C9.44771 7 9 6.55228 9 6ZM10 15C10.55 15 11 14.55 11 14V10C11 9.45 10.55 9 10 9C9.45 9 9 9.45 9 10V14C9 14.55 9.45 15 10 15Z"
              fill="currentColor"
            />
          </svg>`
			: ""
	}
    ${
		"success" === this.variantName
			? Be`<svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
              fill="currentColor"
            />
            <path
              d="M9.38002 16.0101L7.00002 13.6101C6.61002 13.2201 6.61002 12.5901 7.00002 12.2001L7.07002 12.1301C7.46002 11.7401 8.10002 11.7401 8.49002 12.1301L10.1 13.7501L15.25 8.59011C15.64 8.20011 16.28 8.20011 16.67 8.59011L16.74 8.66011C17.13 9.05011 17.13 9.68011 16.74 10.0701L10.82 16.0101C10.41 16.4001 9.78002 16.4001 9.38002 16.0101Z"
              fill="white"
            />
          </svg> `
			: ""
	}
    ${
		"warning" === this.variantName
			? Be`<svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.47012 20.9999H19.5301C21.0701 20.9999 22.0301 19.3299 21.2601 17.9999L13.7301 4.98993C12.9601 3.65993 11.0401 3.65993 10.2701 4.98993L2.74012 17.9999C1.97012 19.3299 2.93012 20.9999 4.47012 20.9999ZM12.0001 13.9999C11.4501 13.9999 11.0001 13.5499 11.0001 12.9999V10.9999C11.0001 10.4499 11.4501 9.99993 12.0001 9.99993C12.5501 9.99993 13.0001 10.4499 13.0001 10.9999V12.9999C13.0001 13.5499 12.5501 13.9999 12.0001 13.9999ZM13.0001 16.9999C13.0001 17.5522 12.5524 17.9999 12.0001 17.9999V17.9999C11.4478 17.9999 11.0001 17.5522 11.0001 16.9999V16.9999C11.0001 16.4476 11.4478 15.9999 12.0001 15.9999V15.9999C12.5524 15.9999 13.0001 16.4476 13.0001 16.9999V16.9999Z"
              fill="currentColor"
            />
          </svg> `
			: ""
	}
    ${
		"danger" === this.variantName
			? Be`<svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12ZM12 7C11.45 7 11 7.45 11 8V12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12V8C13 7.45 12.55 7 12 7ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
              fill="currentColor"
            />
          </svg> `
			: ""
	}
    
    <div class="alert_container">
      <div class=${sr({
			message: !0,
			primary: "primary" === this.variantName,
			success: "success" === this.variantName,
			warning: "warning" === this.variantName,
			danger: "danger" === this.variantName,
		})}>${this.message}</div>
      <div class="description">
      <slot></slot>
      </div>
    </div>
</div>
  </sl-alert>
    `;
			}
		};
		(Ar.styles = hr),
			Lr(
				[Ge({ reflect: !0, attribute: "variant-name" })],
				Ar.prototype,
				"variantName",
				void 0
			),
			Lr([Ge()], Ar.prototype, "message", void 0),
			Lr(
				[Ge({ type: Boolean, reflect: !0 })],
				Ar.prototype,
				"open",
				void 0
			),
			(Ar = Lr([Ye("agosh-alert")], Ar));
		var Mr = Ar,
			jr = te`
  ${Je}

  .box {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    border-radius: 0.75rem;
    text-align: left;
  }

  .box--outlined {
    background-color: var(--surface);
    border: 1px solid var(--outline);
    box-shadow: none;
  }

  .box--raised {
    background-color: var(--surface);
    border: none;
    box-shadow: ${Jt(`${dr("--elevation21", !1)}, ${dr("--elevation20", !0)}`)};
  }

  .box--muted {
    background-color: var(--surface-variant);
    border: none;
    box-shadow: none;
  }
`,
			Tr = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ir = class extends Xe {
			constructor() {
				super(...arguments), (this.variant = "outlined");
			}
			render() {
				return Be`
      <div
        class=${sr({
			box: !0,
			"box--outlined": "outlined" === this.variant,
			"box--raised": "raised" === this.variant,
			"box--muted": "muted" === this.variant,
		})}
        .style=${this.style.cssText}
      >
        <slot></slot>
      </div>
    `;
			}
		};
		(Ir.styles = jr),
			Tr([Ge({ type: String })], Ir.prototype, "variant", void 0),
			(Ir = Tr([Ye("agosh-box")], Ir));
		var Ur = Ir,
			Dr = (t, ...e) => ({
				_$litStatic$: e.reduce(
					(e, r, i) =>
						e +
						((t) => {
							if (void 0 !== t._$litStatic$)
								return t._$litStatic$;
							throw Error(
								`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`
							);
						})(r) +
						t[i + 1],
					t[0]
				),
			}),
			Er = new Map(),
			Fr = (
				(t) =>
				(e, ...r) => {
					var i;
					const o = r.length;
					let a, s;
					const n = [],
						l = [];
					let c,
						d = 0,
						h = !1;
					for (; d < o; ) {
						for (
							c = e[d];
							d < o &&
							void 0 !==
								((s = r[d]),
								(a =
									null === (i = s) || void 0 === i
										? void 0
										: i._$litStatic$));

						)
							(c += a + e[++d]), (h = !0);
						l.push(s), n.push(c), d++;
					}
					if ((d === o && n.push(e[o]), h)) {
						const t = n.join("$$lit$$");
						void 0 === (e = Er.get(t)) &&
							((n.raw = n), Er.set(t, (e = n))),
							(r = l);
					}
					return t(e, ...r);
				}
			)(j),
			Rr = l`
  ${Q}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default${zr}:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary${zr}:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success${zr}:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral${zr}:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning${zr}:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger${zr}:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default${zr}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary${zr}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success${zr}:not(.button--disabled) {
    border-color: var(--sl-color-success-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral${zr}:not(.button--disabled) {
    border-color: var(--sl-color-neutral-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning${zr}:not(.button--disabled) {
    border-color: var(--sl-color-warning-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger${zr}:not(.button--disabled) {
    border-color: var(--sl-color-danger-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text${zr}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`,
			Hr = class extends Event {
				constructor(t) {
					super("formdata"), (this.formData = t);
				}
			},
			Nr = class extends FormData {
				constructor(t) {
					super(t), (this.form = t), t.dispatchEvent(new Hr(this));
				}
				append(t, e) {
					let r = this.form.elements[t];
					if (
						(r ||
							((r = document.createElement("input")),
							(r.type = "hidden"),
							(r.name = t),
							this.form.appendChild(r)),
						this.has(t))
					) {
						const i = this.getAll(t),
							o = i.indexOf(r.value);
						-1 !== o && i.splice(o, 1), i.push(e), this.set(t, i);
					} else super.append(t, e);
					r.value = e;
				}
			};
		function Pr() {
			window.FormData &&
				!(function () {
					const t = document.createElement("form");
					let e = !1;
					return (
						document.body.append(t),
						t.addEventListener("submit", (t) => {
							new FormData(t.target), t.preventDefault();
						}),
						t.addEventListener("formdata", () => (e = !0)),
						t.dispatchEvent(
							new Event("submit", { cancelable: !0 })
						),
						t.remove(),
						e
					);
				})() &&
				((window.FormData = Nr),
				window.addEventListener("submit", (t) => {
					t.defaultPrevented || new FormData(t.target);
				}));
		}
		"complete" === document.readyState
			? Pr()
			: window.addEventListener("DOMContentLoaded", () => Pr());
		var Vr = class {
				constructor(t, e) {
					(this.host = t).addController(this),
						(this.options = mt(
							{
								form: (t) => t.closest("form"),
								name: (t) => t.name,
								value: (t) => t.value,
								disabled: (t) => t.disabled,
								reportValidity: (t) =>
									"function" != typeof t.reportValidity ||
									t.reportValidity(),
							},
							e
						)),
						(this.handleFormData = this.handleFormData.bind(this)),
						(this.handleFormSubmit =
							this.handleFormSubmit.bind(this));
				}
				hostConnected() {
					(this.form = this.options.form(this.host)),
						this.form &&
							(this.form.addEventListener(
								"formdata",
								this.handleFormData
							),
							this.form.addEventListener(
								"submit",
								this.handleFormSubmit
							));
				}
				hostDisconnected() {
					this.form &&
						(this.form.removeEventListener(
							"formdata",
							this.handleFormData
						),
						this.form.removeEventListener(
							"submit",
							this.handleFormSubmit
						),
						(this.form = void 0));
				}
				handleFormData(t) {
					const e = this.options.disabled(this.host),
						r = this.options.name(this.host),
						i = this.options.value(this.host);
					e ||
						"string" != typeof r ||
						void 0 === i ||
						(Array.isArray(i)
							? i.forEach((e) => {
									t.formData.append(r, e.toString());
							  })
							: t.formData.append(r, i.toString()));
				}
				handleFormSubmit(t) {
					const e = this.options.disabled(this.host),
						r = this.options.reportValidity;
					!this.form ||
						this.form.noValidate ||
						e ||
						r(this.host) ||
						(t.preventDefault(), t.stopImmediatePropagation());
				}
				submit(t) {
					if (this.form) {
						const e = document.createElement("button");
						(e.type = "submit"),
							(e.style.position = "absolute"),
							(e.style.width = "0"),
							(e.style.height = "0"),
							(e.style.clip = "rect(0 0 0 0)"),
							(e.style.clipPath = "inset(50%)"),
							(e.style.overflow = "hidden"),
							(e.style.whiteSpace = "nowrap"),
							t &&
								[
									"formaction",
									"formmethod",
									"formnovalidate",
									"formtarget",
								].forEach((r) => {
									t.hasAttribute(r) &&
										e.setAttribute(r, t.getAttribute(r));
								}),
							this.form.append(e),
							e.click(),
							e.remove();
					}
				}
			},
			Zr = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this, {
							form: (t) => {
								if (t.hasAttribute("form")) {
									const e = t.getRootNode(),
										r = t.getAttribute("form");
									return e.getElementById(r);
								}
								return t.closest("form");
							},
						})),
						(this.hasSlotController = new wr(
							this,
							"[default]",
							"prefix",
							"suffix"
						)),
						(this.hasFocus = !1),
						(this.variant = "default"),
						(this.size = "medium"),
						(this.caret = !1),
						(this.disabled = !1),
						(this.loading = !1),
						(this.outline = !1),
						(this.pill = !1),
						(this.circle = !1),
						(this.type = "button");
				}
				click() {
					this.button.click();
				}
				focus(t) {
					this.button.focus(t);
				}
				blur() {
					this.button.blur();
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleClick(t) {
					if (this.disabled || this.loading)
						return t.preventDefault(), void t.stopPropagation();
					"submit" === this.type &&
						this.formSubmitController.submit(this);
				}
				render() {
					const t = !!this.href,
						e = t ? Dr`a` : Dr`button`;
					return Fr`
      <${e}
        part="base"
        class=${st({
			button: !0,
			"button--default": "default" === this.variant,
			"button--primary": "primary" === this.variant,
			"button--success": "success" === this.variant,
			"button--neutral": "neutral" === this.variant,
			"button--warning": "warning" === this.variant,
			"button--danger": "danger" === this.variant,
			"button--text": "text" === this.variant,
			"button--small": "small" === this.size,
			"button--medium": "medium" === this.size,
			"button--large": "large" === this.size,
			"button--caret": this.caret,
			"button--circle": this.circle,
			"button--disabled": this.disabled,
			"button--focused": this.hasFocus,
			"button--loading": this.loading,
			"button--standard": !this.outline,
			"button--outline": this.outline,
			"button--pill": this.pill,
			"button--has-label": this.hasSlotController.test("[default]"),
			"button--has-prefix": this.hasSlotController.test("prefix"),
			"button--has-suffix": this.hasSlotController.test("suffix"),
		})}
        ?disabled=${Ft(t ? void 0 : this.disabled)}
        type=${this.type}
        name=${Ft(t ? void 0 : this.name)}
        value=${Ft(t ? void 0 : this.value)}
        href=${Ft(this.href)}
        target=${Ft(this.target)}
        download=${Ft(this.download)}
        rel=${Ft(this.target ? "noreferrer noopener" : void 0)}
        role="button"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${
			this.caret
				? Fr`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `
				: ""
		}
        ${this.loading ? Fr`<sl-spinner></sl-spinner>` : ""}
      </${e}>
    `;
				}
			};
		(Zr.styles = Rr),
			gt([Ct(".button")], Zr.prototype, "button", 2),
			gt([_t()], Zr.prototype, "hasFocus", 2),
			gt([xt({ reflect: !0 })], Zr.prototype, "variant", 2),
			gt([xt({ reflect: !0 })], Zr.prototype, "size", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Zr.prototype, "caret", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Zr.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Zr.prototype,
				"loading",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Zr.prototype,
				"outline",
				2
			),
			gt([xt({ type: Boolean, reflect: !0 })], Zr.prototype, "pill", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Zr.prototype, "circle", 2),
			gt([xt()], Zr.prototype, "type", 2),
			gt([xt()], Zr.prototype, "name", 2),
			gt([xt()], Zr.prototype, "value", 2),
			gt([xt()], Zr.prototype, "href", 2),
			gt([xt()], Zr.prototype, "target", 2),
			gt([xt()], Zr.prototype, "download", 2),
			gt([xt()], Zr.prototype, "form", 2),
			gt(
				[xt({ attribute: "formaction" })],
				Zr.prototype,
				"formAction",
				2
			),
			gt(
				[xt({ attribute: "formmethod" })],
				Zr.prototype,
				"formMethod",
				2
			),
			gt(
				[xt({ attribute: "formnovalidate", type: Boolean })],
				Zr.prototype,
				"formNoValidate",
				2
			),
			gt(
				[xt({ attribute: "formtarget" })],
				Zr.prototype,
				"formTarget",
				2
			),
			(Zr = gt([yt("sl-button")], Zr));
		var Xr = l`
  ${Q}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,
			qr = class extends G {
				render() {
					return j`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
				}
			};
		(qr.styles = Xr), (qr = gt([yt("sl-spinner")], qr));
		var Yr = te`
  ${Je}
`,
			Wr = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Gr = class extends Xe {
			constructor() {
				super(...arguments),
					(this.size = "2.5em"),
					(this.trackWidth = "0.5rem"),
					(this.indicatorColor = "var(--primary)"),
					(this.trackColor = "var(--inverse-surface-opacity016)");
			}
			render() {
				return Be`
      <sl-spinner
        style="
          font-size: ${this.size};
          --track-width: ${this.trackWidth}; 
          --indicator-color: ${this.indicatorColor};  
          --track-color: ${this.trackColor};"
      ></sl-spinner>
    `;
			}
		};
		(Gr.styles = Yr),
			Wr([Ge({ type: String })], Gr.prototype, "size", void 0),
			Wr(
				[Ge({ type: String, attribute: "track-width" })],
				Gr.prototype,
				"trackWidth",
				void 0
			),
			Wr(
				[Ge({ type: String, attribute: "indicator-color" })],
				Gr.prototype,
				"indicatorColor",
				void 0
			),
			Wr(
				[Ge({ type: String, attribute: "track-color" })],
				Gr.prototype,
				"trackColor",
				void 0
			),
			(Gr = Wr([Ye("agosh-spinner")], Gr));
		var Kr = Gr;
		/**
		 * @license
		 * Copyright 2020 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ const Qr = new Map(),
			Jr = (
				(t) =>
				(e, ...r) => {
					var i;
					const o = r.length;
					let a, s;
					const n = [],
						l = [];
					let c,
						d = 0,
						h = !1;
					for (; d < o; ) {
						for (
							c = e[d];
							d < o &&
							void 0 !==
								((s = r[d]),
								(a =
									null === (i = s) || void 0 === i
										? void 0
										: i._$litStatic$));

						)
							(c += a + e[++d]), (h = !0);
						l.push(s), n.push(c), d++;
					}
					if ((d === o && n.push(e[o]), h)) {
						const t = n.join("$$lit$$");
						void 0 === (e = Qr.get(t)) &&
							((n.raw = n), Qr.set(t, (e = n))),
							(r = l);
					}
					return t(e, ...r);
				}
			)(Be),
			ti = (t, e) => Jt(t ? e : ""),
			ei = ({
				selector: t,
				color: e,
				bgColor: r,
				bgOpacity: i,
				borderColor: o,
				borderOpacity: a,
			}) => te`
  ${Jt(t)} {
    color: ${Jt(e)};
    box-shadow: none;
  }

  ${Jt(t)}::before {
    background-color: ${Jt(r)};
    opacity: ${i};
  }

  ${Jt(t)}::after {
    ${ti(!!o, `border: 1px solid ${o};`)};
    ${ti(!!a, `opacity: ${a};`)};
  }
`,
			ri = ({
				selector: t,
				defaultBg: e,
				hoverBg: r,
				hoverOpacity: i,
				focusBg: o,
				focusOpacity: a,
				activeBg: s,
				activeOpacity: n,
				hoverBg2: l,
				hoverOpacity2: c,
				focusBg2: d,
				focusOpacity2: h,
				activeBg2: u,
				activeOpacity2: f,
			}) => te`
  ${Jt(t)}::before {
    background-color: ${Jt(e)};
  }

  ${Jt(t)}:hover::before {
    background-color: ${Jt(r)};
    ${ti(void 0 !== i, `opacity: ${i};`)};
  }

  ${Jt(t)}:focus::before {
    background-color: ${Jt(o)};
    ${ti(void 0 !== a, `opacity: ${a};`)};
  }

  ${Jt(t)}:active::before {
    background-color: ${Jt(s)};
    ${ti(void 0 !== n, `opacity: ${n};`)};
  }

  ${Jt(t)}:hover::after {
    background-color: ${Jt(l)};
    ${ti(void 0 !== c, `opacity: ${c};`)};
  }

  ${Jt(t)}:focus::after {
    background-color: ${Jt(d)};
    ${ti(void 0 !== h, `opacity: ${h};`)};
  }

  ${Jt(t)}:active::after {
    background-color: ${Jt(u)};
    ${ti(void 0 !== f, `opacity: ${f};`)};
  }
`,
			ii = ({
				selector: t,
				hoverBoxShadow: e,
				nonHoverBoxShadow: r,
			}) => te`
  ${Jt(t)} {
    ${ti(!!r, `box-shadow: ${r}`)};
  }

  ${Jt(t)}:hover {
    ${ti(!!e, `box-shadow: ${e}`)};
  }

  ${Jt(t)}:active,
  ${Jt(t)}:focus {
    ${ti(!!r, `box-shadow: ${r}`)};
  }
`,
			oi = te`
  .button--filled::part(base) {
    color: var(--on-primary);
  }

  ${ei({
		selector: ".button--filled.button--disabled::part(base)",
		color: "var(--on-surface)",
		bgColor: "var(--disabled-bg)",
		bgOpacity: 0.12,
  })}

  ${ri({
		selector: ".button--filled::part(base)",
		defaultBg: "var(--primary)",
		hoverBg: "var(--primary)",
		focusBg: "var(--primary)",
		activeBg: "var(--primary)",
		hoverBg2: "var(--on-primary)",
		hoverOpacity2: 0.08,
		focusBg2: "var(--on-primary)",
		focusOpacity2: 0.12,
		activeBg2: "var(--on-primary)",
		activeOpacity2: 0.12,
  })}


${ii({
	selector: ".button--filled::part(base)",
	hoverBoxShadow: "var(--elevation1)!important",
})}
`,
			ai = te`
  .button--text::part(base) {
    color: var(--primary);
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ::part(prefix) {
    margin-right: 0.25rem;
    margin-left: -0.25rem;
  }

  ${ei({
		selector: ".button--text.button--disabled::part(base)",
		color: "var(--on-surface)",
		bgColor: "var(--transparent)",
		bgOpacity: 0,
  })}

  ${ri({
		selector: ".button--text::part(base)",
		defaultBg: "var(--transparent)",
		hoverBg: "var(--text-button-bg)",
		hoverOpacity: 0.08,
		focusBg: "var(--text-button-bg)",
		focusOpacity: 0.12,
		activeBg: "var(--text-button-bg)",
		activeOpacity: 0.12,
  })}
`,
			si = te`
  .button--elevated::part(base) {
    color: var(--primary);
    filter: var(--elevation-filter);
  }

  ${ei({
		selector: ".button--elevated.button--disabled::part(base)",
		color: "var(--on-surface)",
		bgColor: "var(--disabled-bg)",
		bgOpacity: 0.12,
  })}

  ${ii({
		selector: ".button--elevated::part(base)",
		nonHoverBoxShadow: "var(--elevation1)",
		hoverBoxShadow: "var(--elevation2)",
  })}

  ${ri({
		selector: ".button--elevated::part(base)",
		defaultBg: "var(--elevated-default-bg)",
		hoverBg: "var(--elevated-hover-bg)",
		focusBg: "var(--elevated-focus-bg)",
		activeBg: "var(--elevated-active-bg)",
  })}
`,
			ni = te`
  .button--tonal::part(base) {
    color: var(--on-secondary-container);
  }

  ${ei({
		selector: ".button--tonal.button--disabled::part(base)",
		color: "var(--on-surface)",
		bgColor: "var(--disabled-bg)",
		bgOpacity: 0.12,
  })}

  ${ri({
		selector: ".button--tonal::part(base)",
		defaultBg: "var(--secondary-container)",
		hoverBg2: "var(--tonal-hover-bg)",
		hoverOpacity2: 0.08,
		focusBg2: "var(--tonal-hover-bg)",
		focusOpacity2: 0.12,
		activeBg2: "var(--tonal-hover-bg)",
		activeOpacity2: 0.12,
  })}

  ${ii({
		selector: ".button--tonal::part(base)",
		hoverBoxShadow: "var(--elevation1)",
  })}
`,
			li = ({
				selector: t,
				defaultBorderColor: e,
				hoverBorderColor: r,
				focusBorderColor: i,
				activeBorderColor: o,
			}) => te`
  ${Jt(t)}:after {
    border: 1px solid ${Jt(e)};
  }

  ${Jt(t)}:hover:after {
    border: 1px solid ${Jt(r)};
  }

  ${Jt(t)}:focus:after {
    border: 1px solid ${Jt(i)};
  }

  ${Jt(t)}:active:after {
    border: 1px solid ${Jt(o)};
  }
`,
			ci = te`
  .button--outlined::part(base) {
    color: var(--primary);
  }

  ${ei({
		selector: ".button--outlined.button--disabled::part(base)",
		color: "var(--on-surface)",
		bgColor: "var(--transparent)",
		bgOpacity: 0.12,
		borderColor: "var(--disabled-border)",
		borderOpacity: 0.12,
  })}

  ${ri({
		selector: ".button--outlined::part(base)",
		defaultBg: "var(--transparent)",
		hoverBg: "var(--text-button-bg)",
		hoverOpacity: 0.08,
		focusBg: "var(--text-button-bg)",
		focusOpacity: 0.12,
		activeBg: "var(--text-button-bg)",
		activeOpacity: 0.12,
  })}

  ${li({
		selector: ".button--outlined::part(base)",
		defaultBorderColor: "var(--outline)",
		hoverBorderColor: "var(--outline)",
		focusBorderColor: "var(--primary)",
		activeBorderColor: "var(--outline)",
  })}

  ${li({
		selector: ".button--danger::part(base)",
		defaultBorderColor: "var(--error)",
		hoverBorderColor: "var(--error)",
		focusBorderColor: "var(--error)",
		activeBorderColor: "var(--error)",
  })}
`,
			di = te`
  .button--danger.button--outlined::part(base) {
    color: var(--error);
  }

  .button--danger.button--filled::part(base):after {
    background-color: var(--error);
  }

  .button--danger.button--filled::part(base):hover:before {
    background-color: var(--error);
  }

  .button--danger.button--filled::part(base):focus:before {
    background-color: var(--error);
  }
`,
			hi = te`
  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button__prefix {
    display: flex;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading agosh-spinner {
    position: absolute;
    top: calc(50%);
    left: calc(50%);
    transform: translate(-50%, -50%);
    display: flex;
  }

  .button--loading-text::part(label) {
    display: flex;
    align-items: center;
  }
  .button--loading-text::part(base) {
    padding-left: 1rem;
  }
  .button--loading-text agosh-spinner {
    display: flex;
    margin-right: 0.5rem;
  }
`,
			ui = te`
  :host {
    display: inline-block;
  }

  sl-button {
    cursor: auto;
  }

  ::part(label) {
    padding: 0;
    pointer-events: none;
  }

  ::part(prefix) {
    margin-right: 0.5rem;
    margin-left: -0.5rem;
    pointer-events: none;
  }

  ::part(base) {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    position: relative;
    text-transform: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    user-select: none;
    appearance: none;
    overflow: visible;
    vertical-align: middle;
    background: transparent;
    height: 2.5rem;
    padding: 0;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    border-radius: 10rem;
    z-index: 0;
    cursor: pointer;
  }

  ::part(base):after,
  ::part(base):before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
  }

  ::part(base):before {
    z-index: -20;
  }

  ::part(base):after {
    z-index: -10;
  }

  .button--disabled::part(base) {
    opacity: 1;
    pointer-events: none;
  }

  .button--disabled::part(label) {
    opacity: 0.38;
  }

  .button--disabled::part(prefix) {
    opacity: 0.38;
  }

  .button--fluid,
  .button--fluid::part(base) {
    width: 100%;
  }
`;
		var fi = te`
  ${Je}
  ${ui}
  ${hi}
  ${di}
  ${oi}
  ${ci}
  ${ai}
  ${si}
  ${ni}
`;
		class pi extends Event {
			constructor(t) {
				super("formdata"), (this.formData = t);
			}
		}
		class mi extends FormData {
			constructor(t) {
				super(t), (this.form = t), t.dispatchEvent(new pi(this));
			}
			append(t, e) {
				let r = this.form.elements[t];
				if (
					(r ||
						((r = document.createElement("input")),
						(r.type = "hidden"),
						(r.name = t),
						this.form.appendChild(r)),
					this.has(t))
				) {
					const i = this.getAll(t),
						o = i.indexOf(r.value);
					-1 !== o && i.splice(o, 1), i.push(e), this.set(t, i);
				} else super.append(t, e);
				r.value = e;
			}
		}
		function vi() {
			window.FormData &&
				!(function () {
					const t = document.createElement("form");
					let e = !1;
					return (
						document.body.append(t),
						t.addEventListener("submit", (t) => {
							new FormData(t.target), t.preventDefault();
						}),
						t.addEventListener("formdata", () => (e = !0)),
						t.dispatchEvent(
							new Event("submit", { cancelable: !0 })
						),
						t.remove(),
						e
					);
				})() &&
				((window.FormData = mi),
				window.addEventListener("submit", (t) => {
					t.defaultPrevented || new FormData(t.target);
				}));
		}
		"complete" === document.readyState
			? vi()
			: window.addEventListener("DOMContentLoaded", () => vi());
		class bi {
			constructor(t, e) {
				(this.host = t).addController(this),
					(this.options = {
						form: (t) => t.closest("form"),
						name: (t) => t.name,
						value: (t) => t.value,
						disabled: (t) => t.disabled,
						reportValidity: (t) =>
							"function" != typeof t.reportValidity ||
							t.reportValidity(),
						...e,
					}),
					(this.handleFormData = this.handleFormData.bind(this)),
					(this.handleFormSubmit = this.handleFormSubmit.bind(this));
			}
			hostConnected() {
				(this.form = this.options.form(this.host)),
					this.form &&
						(this.form.addEventListener(
							"formdata",
							this.handleFormData
						),
						this.form.addEventListener(
							"submit",
							this.handleFormSubmit
						));
			}
			hostDisconnected() {
				this.form &&
					(this.form.removeEventListener(
						"formdata",
						this.handleFormData
					),
					this.form.removeEventListener(
						"submit",
						this.handleFormSubmit
					),
					(this.form = void 0));
			}
			handleFormData(t) {
				const e = this.options.disabled(this.host),
					r = this.options.name(this.host),
					i = this.options.value(this.host);
				e ||
					"string" != typeof r ||
					void 0 === i ||
					(Array.isArray(i)
						? i.forEach((e) => {
								t.formData.append(r, e.toString());
						  })
						: t.formData.append(r, i.toString()));
			}
			handleFormSubmit(t) {
				const e = this.options.disabled(this.host),
					r = this.options.reportValidity;
				!this.form ||
					this.form.noValidate ||
					e ||
					r(this.host) ||
					(t.preventDefault(), t.stopImmediatePropagation());
			}
			submit(t) {
				if (this.form) {
					const e = document.createElement("button");
					(e.type = "submit"),
						(e.style.position = "absolute"),
						(e.style.width = "0"),
						(e.style.height = "0"),
						(e.style.clip = "rect(0 0 0 0)"),
						(e.style.clipPath = "inset(50%)"),
						(e.style.overflow = "hidden"),
						(e.style.whiteSpace = "nowrap"),
						t &&
							[
								"formaction",
								"formmethod",
								"formnovalidate",
								"formtarget",
							].forEach((r) => {
								t.hasAttribute(r) &&
									e.setAttribute(r, t.getAttribute(r));
							}),
						this.form.append(e),
						e.click(),
						e.remove();
				}
			}
		}
		var gi = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		const yi = Jr`<agosh-spinner
  size="1.25em"
  track-width="2px"
  indicator-color="white"
></agosh-spinner>`;
		let wi = class extends Xe {
			constructor() {
				super(...arguments),
					(this.formSubmitController = new bi(this, {
						form: (t) => {
							if (t.hasAttribute("form")) {
								const e = t.getRootNode(),
									r = t.getAttribute("form");
								return e.getElementById(r);
							}
							return t.closest("form");
						},
					})),
					(this.variant = "filled"),
					(this.fluid = !1),
					(this.danger = !1),
					(this.disabled = !1),
					(this.type = "button"),
					(this.loading = !1),
					(this.loadingText = "");
			}
			connectedCallback() {
				super.connectedCallback(),
					this.fluid && (this.style.width = "100%");
			}
			handleClick(t) {
				if (this.disabled || this.loading)
					return t.preventDefault(), void t.stopPropagation();
				"submit" === this.type &&
					this.formSubmitController.submit(this);
			}
			render() {
				return Jr`
      <sl-button
        class=${sr({
			"button--filled": "filled" === this.variant,
			"button--outlined": "outlined" === this.variant,
			"button--text": "text" === this.variant,
			"button--elevated": "elevated" === this.variant,
			"button--tonal": "tonal" === this.variant,
			"button--disabled": this.disabled,
			"button--fluid": this.fluid,
			"button--danger": this.danger,
			"button--loading": this.loading && !this.loadingText,
			"button--loading-text": !!this.loadingText,
		})}
        .disabled=${this.disabled}
        type=${this.type}
        @click=${this.handleClick}
      >
        ${
			this.loadingText
				? Jr`${yi} ${this.loadingText}`
				: Jr` <span class="button__prefix" slot="prefix">
                <slot name="prefix"></slot>
              </span>
              <span class="button__label">
                <slot></slot>
              </span>
              ${this.loading && !this.loadingText ? Jr`${yi}` : ""}`
		}
      </sl-button>
    `;
			}
		};
		(wi.styles = fi),
			gi([Ge({ reflect: !0 })], wi.prototype, "variant", void 0),
			gi([Ge({ type: Boolean })], wi.prototype, "fluid", void 0),
			gi([Ge({ type: Boolean })], wi.prototype, "danger", void 0),
			gi(
				[Ge({ type: Boolean, reflect: !0 })],
				wi.prototype,
				"disabled",
				void 0
			),
			gi([Ge()], wi.prototype, "type", void 0),
			gi(
				[Ge({ type: Boolean, reflect: !0 })],
				wi.prototype,
				"loading",
				void 0
			),
			gi(
				[Ge({ attribute: "loading-text" })],
				wi.prototype,
				"loadingText",
				void 0
			),
			(wi = gi([Ye("agosh-button")], wi));
		var xi = wi,
			_i = te`
  ${Je}

  .card--outlined {
    background-color: var(--surface);
    border: 1px solid var(--outline);
    box-shadow: none;
  }

  .card--raised {
    background-color: var(--surface);
    border: none;
    box-shadow: ${Jt(`${dr("--elevation21", !1)}, ${dr("--elevation20", !0)}`)};
  }

  .card--muted {
    background-color: var(--surface-variant);
    border: none;
    box-shadow: none;
  }

  .card {
    width: 22.5rem;
    border-radius: 0.75rem;
    box-sizing: border-box;
    overflow: hidden;
    text-align: left;
  }

  .card--headerOnly {
    width: 22rem;
    height: 5rem;
    box-sizing: border-box;
  }

  .card--headerOnly .header-right {
    height: 5rem;
    width: 5rem;
    margin-right: -1rem;
  }

  .card-header {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;
  }

  .avatar {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--surface);
    background-color: var(--primary);
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 99rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-wrapper {
    margin-left: 1rem;
    margin-right: auto;
  }

  .header-title {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--on-surface);
  }

  .header-sub-title {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface);
    margin-top: 0.25rem;
  }

  .header-right {
    height: 4.5rem;
    width: 4.5rem;
    color: var(--outline);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 0.25rem;
  }

  .header-right-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .card-img-wrapper {
    height: 11.75rem;
    width: 100%;
  }

  .center-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .card-content {
    padding: 1rem;
  }

  .title {
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
    color: var(--on-surface);
  }

  .subTitle {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface-variant);
  }

  .description {
    margin-top: 2rem;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface-variant);
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    column-gap: 0.5rem;
  }
`,
			$i = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let ki = class extends Xe {
			constructor() {
				super(...arguments),
					(this.variant = "outlined"),
					(this.headerOnly = !1),
					(this.headerTitle = ""),
					(this.headerSubtitle = ""),
					(this.imageSrc = ""),
					(this.imageAltText = ""),
					(this.imageTitle = ""),
					(this.imageSrcSet = ""),
					(this.headerAvatar = "");
			}
			render() {
				return Be`
      <div
        class=${sr({
			card: !0,
			"card--outlined": "outlined" === this.variant,
			"card--raised": "raised" === this.variant,
			"card--muted": "muted" === this.variant,
			"card--headerOnly": this.headerOnly,
		})}
      >
        <div class="card-header">
          <div class="avatar">
            <div class="header-avatar">${this.headerAvatar}</div>
          </div>
          <div class="text-wrapper">
            <div class="header-title">${this.headerTitle}</div>
            <div class="header-sub-title">${this.headerSubtitle}</div>
          </div>
          <div class="header-right">
            ${
				this.headerOnly
					? Be`
                  <img
                    class="header-right-image"
                    src=${this.imageSrc}
                    title=${this.imageTitle}
                    alt=${this.imageAltText}
                    srcset=${this.imageSrcSet}
                  />
                `
					: Be` <slot name="header-right-icon"></slot> `
			}
          </div>
        </div>

        ${
			this.headerOnly
				? ""
				: Be`
              <div class="card-img-wrapper">
                <img
                  class="center-img"
                  src=${this.imageSrc}
                  alt=${this.imageAltText}
                  title=${this.imageTitle}
                  srcset=${this.imageSrcSet}
                />
              </div>

              <div class="card-content">
                <div class="title">${this.title}</div>
                <div class="subTitle">${this.subtitle}</div>
                <div class="description">${this.description}</div>
              </div>

              <div class="card-actions">
                <slot name="action"></slot>
              </div>
            `
		}
      </div>
    `;
			}
		};
		(ki.styles = _i),
			$i([Ge()], ki.prototype, "variant", void 0),
			$i(
				[Ge({ type: Boolean, attribute: "header-only" })],
				ki.prototype,
				"headerOnly",
				void 0
			),
			$i(
				[Ge({ attribute: "header-title" })],
				ki.prototype,
				"headerTitle",
				void 0
			),
			$i(
				[Ge({ attribute: "header-subtitle" })],
				ki.prototype,
				"headerSubtitle",
				void 0
			),
			$i(
				[Ge({ attribute: "image-src" })],
				ki.prototype,
				"imageSrc",
				void 0
			),
			$i(
				[Ge({ attribute: "image-alt-text" })],
				ki.prototype,
				"imageAltText",
				void 0
			),
			$i(
				[Ge({ attribute: "image-title" })],
				ki.prototype,
				"imageTitle",
				void 0
			),
			$i(
				[Ge({ attribute: "image-src-set" })],
				ki.prototype,
				"imageSrcSet",
				void 0
			),
			$i(
				[Ge({ attribute: "header-avatar" })],
				ki.prototype,
				"headerAvatar",
				void 0
			),
			$i([Ge()], ki.prototype, "title", void 0),
			$i([Ge()], ki.prototype, "subtitle", void 0),
			$i([Ge()], ki.prototype, "description", void 0),
			(ki = $i([Ye("agosh-card")], ki));
		var Ci = ki,
			zi = {},
			Bi = ot(
				class extends at {
					constructor(t) {
						if (
							(super(t),
							t.type !== rt && t.type !== tt && t.type !== it)
						)
							throw Error(
								"The `live` directive is not allowed on child or event bindings"
							);
						if (!((t) => void 0 === t.strings)(t))
							throw Error(
								"`live` bindings can only contain a single expression"
							);
					}
					render(t) {
						return t;
					}
					update(t, [e]) {
						if (e === T || e === I) return e;
						const r = t.element,
							i = t.name;
						if (t.type === rt) {
							if (e === r[i]) return T;
						} else if (t.type === it) {
							if (!!e === r.hasAttribute(i)) return T;
						} else if (
							t.type === tt &&
							r.getAttribute(i) === e + ""
						)
							return T;
						return (
							((t, e = zi) => {
								t._$AH = e;
							})(t),
							e
						);
					}
				}
			),
			Oi = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled)
    .checkbox__input${zr}
    ~ .checkbox__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${zr} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled)
    .checkbox__input${zr}
    ~ .checkbox__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`,
			Si = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this, {
							value: (t) => (t.checked ? t.value : void 0),
						})),
						(this.hasFocus = !1),
						(this.disabled = !1),
						(this.required = !1),
						(this.checked = !1),
						(this.indeterminate = !1),
						(this.invalid = !1);
				}
				firstUpdated() {
					this.invalid = !this.input.checkValidity();
				}
				click() {
					this.input.click();
				}
				focus(t) {
					this.input.focus(t);
				}
				blur() {
					this.input.blur();
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				handleClick() {
					(this.checked = !this.checked),
						(this.indeterminate = !1),
						Ht(this, "sl-change");
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleDisabledChange() {
					(this.input.disabled = this.disabled),
						(this.invalid = !this.input.checkValidity());
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleStateChange() {
					this.invalid = !this.input.checkValidity();
				}
				render() {
					return j`
      <label
        part="base"
        class=${st({
			checkbox: !0,
			"checkbox--checked": this.checked,
			"checkbox--disabled": this.disabled,
			"checkbox--focused": this.hasFocus,
			"checkbox--indeterminate": this.indeterminate,
		})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          name=${Ft(this.name)}
          value=${Ft(this.value)}
          .indeterminate=${Bi(this.indeterminate)}
          .checked=${Bi(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${
				this.checked
					? j`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
					: ""
			}
          ${
				!this.checked && this.indeterminate
					? j`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
					: ""
			}
        </span>

        <span part="label" class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `;
				}
			};
		(Si.styles = Oi),
			gt([Ct('input[type="checkbox"]')], Si.prototype, "input", 2),
			gt([_t()], Si.prototype, "hasFocus", 2),
			gt([xt()], Si.prototype, "name", 2),
			gt([xt()], Si.prototype, "value", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Si.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Si.prototype,
				"required",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Si.prototype,
				"checked",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Si.prototype,
				"indeterminate",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Si.prototype,
				"invalid",
				2
			),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				Si.prototype,
				"handleDisabledChange",
				1
			),
			gt(
				[
					Rt("checked", { waitUntilFirstUpdate: !0 }),
					Rt("indeterminate", { waitUntilFirstUpdate: !0 }),
				],
				Si.prototype,
				"handleStateChange",
				1
			),
			(Si = gt([yt("sl-checkbox")], Si));
		var Li = te`
  ${Je}

  .main {
    --sl-input-border-width: 2px;
    --sl-input-border-color: var(--secondary);
  }

  ::part(base) {
    font-size: var(--m3-label-large-font-size);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-button-line-height);
    font-weight: var(--m3-label-large-font-weight);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    position: relative;
    color: var(--on-surface);
  }

  .check--checked::part(checked-icon) {
    display: none;
  }

  .check--disabled::part(control) {
    background-color: var(--secondary);
    border-color: var(--secondary);
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  .check--primary::part(control),
  .check--secondary::part(control),
  .check--disabled::part(control) {
    height: 1.125rem;
    width: 1.125rem;
  }

  .check--primary::part(control) {
    border-color: var(--primary);
  }

  .check--primary.check--checked[checked]::part(control) {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  .check--secondary.check--checked[checked]::part(control) {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }

  .check--primary::part(indeterminate-icon) {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  .check--secondary::part(indeterminate-icon) {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }

  ::part(control) {
    border-color: var(--secondary);
    background-color: transparent;
  }

  .svgcheck {
    left: 0.1875rem;
    position: absolute;
    top: 0.25rem;
    color: var(--surface);
  }

  .svgindeterminate {
    left: 0.25rem;
    position: absolute;
    top: 0.5rem;
    color: var(--surface);
  }
`;
		const Ai = (t, e) => {
			const r = t.path || (t.composedPath && t.composedPath());
			return null == r ? void 0 : r[e];
		};
		var Mi = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let ji = class extends Xe {
			constructor() {
				super(),
					(this.variant = "primary"),
					(this.value = ""),
					(this.disabled = !1),
					(this.checked = !1),
					(this.required = !1),
					(this.indeterminate = !1),
					new bi(this);
			}
			render() {
				return Be`
      <sl-checkbox
        class=${sr({
			main: !0,
			"check--primary": "primary" === this.variant,
			"check--secondary": "secondary" === this.variant,
			"check--disabled": this.disabled,
			"check--checked": this.checked,
			"check--indeterminate": this.indeterminate,
		})}
        name=${this.name}
        value=${this.value}
        ?required=${this.required}
        ?disabled=${this.disabled}
        ?checked=${this.checked}
        ?indeterminate=${this.indeterminate}
        @sl-change=${(t) => {
			Sr(this, "agosh-change");
			const e = Ai(t, 0),
				r = e.checked;
			this.checked = r;
			const i = e.indeterminate;
			(this.indeterminate = i), this.requestUpdate();
		}}
      >
        ${
			this.checked
				? Be`<svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="svgcheck"
            >
              <path
                d="M11.2854 2.70463C11.6749 2.31508 11.6757 1.68345 11.2875 1.29253C10.8974 0.899645 10.2619 0.898126 9.87038 1.28963L3.98999 7.17002L2.1146 5.3019C1.72483 4.91364 1.09402 4.91376 0.703633 5.3014C0.310404 5.69186 0.309041 6.32827 0.701378 6.71963L3.28288 9.29468C3.67355 9.68437 4.30603 9.68397 4.69621 9.29379L11.2854 2.70463Z"
                fill="currentColor"
              />
            </svg>`
				: ""
		}
        ${
			!this.checked && this.indeterminate
				? Be`<svg
              width="10"
              height="2"
              viewBox="0 0 10 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="svgindeterminate"
            >
              <path
                d="M0 1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1C10 1.55228 9.55229 2 9 2H1C0.447715 2 0 1.55228 0 1Z"
                fill="currentColor"
              />
            </svg> `
				: ""
		}
        <slot></slot>
      </sl-checkbox>
    `;
			}
		};
		(ji.styles = Li),
			Mi([Ge()], ji.prototype, "variant", void 0),
			Mi([Ge()], ji.prototype, "value", void 0),
			Mi([Ge()], ji.prototype, "name", void 0),
			Mi([Ge({ type: Boolean })], ji.prototype, "disabled", void 0),
			Mi([Ge({ type: Boolean })], ji.prototype, "checked", void 0),
			Mi([Ge({ type: Boolean })], ji.prototype, "required", void 0),
			Mi([Ge({ type: Boolean })], ji.prototype, "indeterminate", void 0),
			(ji = Mi([Ye("agosh-checkbox")], ji));
		var Ti = ji;
		function Ii(t) {
			const e = t.tagName.toLowerCase();
			return (
				"-1" !== t.getAttribute("tabindex") &&
				!t.hasAttribute("disabled") &&
				(!t.hasAttribute("aria-disabled") ||
					"false" === t.getAttribute("aria-disabled")) &&
				!(
					"input" === e &&
					"radio" === t.getAttribute("type") &&
					!t.hasAttribute("checked")
				) &&
				null !== t.offsetParent &&
				"hidden" !== window.getComputedStyle(t).visibility &&
				(!(
					("audio" !== e && "video" !== e) ||
					!t.hasAttribute("controls")
				) ||
					!!t.hasAttribute("tabindex") ||
					!(
						!t.hasAttribute("contenteditable") ||
						"false" === t.getAttribute("contenteditable")
					) ||
					[
						"button",
						"input",
						"select",
						"textarea",
						"a",
						"audio",
						"video",
						"summary",
					].includes(e))
			);
		}
		function Ui(t) {
			var e, r;
			const i = [];
			return (
				(function t(e) {
					e instanceof HTMLElement &&
						(i.push(e),
						null !== e.shadowRoot &&
							"open" === e.shadowRoot.mode &&
							t(e.shadowRoot)),
						[...e.querySelectorAll("*")].forEach((e) => t(e));
				})(t),
				{
					start: null != (e = i.find((t) => Ii(t))) ? e : null,
					end:
						null != (r = i.reverse().find((t) => Ii(t))) ? r : null,
				}
			);
		}
		var Di = [],
			Ei = new Set();
		function Fi(t) {
			Ei.add(t), document.body.classList.add("sl-scroll-lock");
		}
		function Ri(t) {
			Ei.delete(t),
				0 === Ei.size &&
					document.body.classList.remove("sl-scroll-lock");
		}
		function Hi(t, e, r = "vertical", i = "smooth") {
			const o = (function (t, e) {
					return {
						top: Math.round(
							t.getBoundingClientRect().top -
								e.getBoundingClientRect().top
						),
						left: Math.round(
							t.getBoundingClientRect().left -
								e.getBoundingClientRect().left
						),
					};
				})(t, e),
				a = o.top + e.scrollTop,
				s = o.left + e.scrollLeft,
				n = e.scrollLeft,
				l = e.scrollLeft + e.offsetWidth,
				c = e.scrollTop,
				d = e.scrollTop + e.offsetHeight;
			("horizontal" !== r && "both" !== r) ||
				(s < n
					? e.scrollTo({ left: s, behavior: i })
					: s + t.clientWidth > l &&
					  e.scrollTo({
							left: s - e.offsetWidth + t.clientWidth,
							behavior: i,
					  })),
				("vertical" !== r && "both" !== r) ||
					(a < c
						? e.scrollTo({ top: a, behavior: i })
						: a + t.clientHeight > d &&
						  e.scrollTo({
								top: a - e.offsetHeight + t.clientHeight,
								behavior: i,
						  }));
		}
		var Ni,
			Pi = new Set(),
			Vi = new MutationObserver(qi),
			Zi = new Map(),
			Xi = document.documentElement.lang || navigator.language;
		function qi() {
			(Xi = document.documentElement.lang || navigator.language),
				[...Pi.keys()].map((t) => {
					"function" == typeof t.requestUpdate && t.requestUpdate();
				});
		}
		Vi.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["lang"],
		});
		var Yi = class {
			constructor(t) {
				(this.host = t), this.host.addController(this);
			}
			hostConnected() {
				Pi.add(this.host);
			}
			hostDisconnected() {
				Pi.delete(this.host);
			}
			term(t, ...e) {
				return (function (t, e, ...r) {
					const i = t.toLowerCase().slice(0, 2),
						o = t.length > 2 ? t.toLowerCase() : "",
						a = Zi.get(o),
						s = Zi.get(i);
					let n;
					if (a && a[e]) n = a[e];
					else if (s && s[e]) n = s[e];
					else {
						if (!Ni || !Ni[e])
							return (
								console.error(`No translation found for: ${e}`),
								e
							);
						n = Ni[e];
					}
					return "function" == typeof n ? n(...r) : n;
				})(this.host.lang || Xi, t, ...e);
			}
			date(t, e) {
				return (function (t, e, r) {
					return (
						(e = new Date(e)),
						new Intl.DateTimeFormat(t, r).format(e)
					);
				})(this.host.lang || Xi, t, e);
			}
			number(t, e) {
				return (function (t, e, r) {
					return (
						(e = Number(e)),
						isNaN(e) ? "" : new Intl.NumberFormat(t, r).format(e)
					);
				})(this.host.lang || Xi, t, e);
			}
			relativeTime(t, e, r) {
				return (function (t, e, r, i) {
					return new Intl.RelativeTimeFormat(t, i).format(e, r);
				})(this.host.lang || Xi, t, e, r);
			}
		};
		!(function (...t) {
			t.map((t) => {
				const e = t.$code.toLowerCase();
				Zi.set(e, t), Ni || (Ni = t);
			}),
				qi();
		})({
			$code: "en",
			$name: "English",
			$dir: "ltr",
			close: "Close",
			copy: "Copy",
			currentValue: "Current value",
			progress: "Progress",
			remove: "Remove",
			resize: "Resize",
			scrollToEnd: "Scroll to end",
			scrollToStart: "Scroll to start",
			selectAColorFromTheScreen: "Select a color from the screen",
			toggleColorFormat: "Toggle color format",
		});
		var Wi = l`
  ${Q}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-left: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }
`,
			Gi = class extends G {
				constructor() {
					super(...arguments),
						(this.hasSlotController = new wr(this, "footer")),
						(this.localize = new Yi(this)),
						(this.open = !1),
						(this.label = ""),
						(this.noHeader = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.modal = new (class {
							constructor(t) {
								(this.tabDirection = "forward"),
									(this.element = t),
									(this.handleFocusIn =
										this.handleFocusIn.bind(this)),
									(this.handleKeyDown =
										this.handleKeyDown.bind(this)),
									(this.handleKeyUp =
										this.handleKeyUp.bind(this));
							}
							activate() {
								Di.push(this.element),
									document.addEventListener(
										"focusin",
										this.handleFocusIn
									),
									document.addEventListener(
										"keydown",
										this.handleKeyDown
									),
									document.addEventListener(
										"keyup",
										this.handleKeyUp
									);
							}
							deactivate() {
								(Di = Di.filter((t) => t !== this.element)),
									document.removeEventListener(
										"focusin",
										this.handleFocusIn
									),
									document.removeEventListener(
										"keydown",
										this.handleKeyDown
									),
									document.removeEventListener(
										"keyup",
										this.handleKeyUp
									);
							}
							isActive() {
								return Di[Di.length - 1] === this.element;
							}
							checkFocus() {
								if (
									this.isActive() &&
									!this.element.matches(":focus-within")
								) {
									const { start: t, end: e } = Ui(
											this.element
										),
										r =
											"forward" === this.tabDirection
												? t
												: e;
									"function" ==
										typeof (null == r ? void 0 : r.focus) &&
										r.focus({ preventScroll: !0 });
								}
							}
							handleFocusIn() {
								this.checkFocus();
							}
							handleKeyDown(t) {
								"Tab" === t.key &&
									t.shiftKey &&
									(this.tabDirection = "backward"),
									requestAnimationFrame(() =>
										this.checkFocus()
									);
							}
							handleKeyUp() {
								this.tabDirection = "forward";
							}
						})(this));
				}
				firstUpdated() {
					(this.dialog.hidden = !this.open),
						this.open && (this.modal.activate(), Fi(this));
				}
				disconnectedCallback() {
					super.disconnectedCallback(), Ri(this);
				}
				async show() {
					if (!this.open)
						return (this.open = !0), Nt(this, "sl-after-show");
				}
				async hide() {
					if (this.open)
						return (this.open = !1), Nt(this, "sl-after-hide");
				}
				requestClose(t) {
					if (
						Ht(this, "sl-request-close", {
							cancelable: !0,
							detail: { source: t },
						}).defaultPrevented
					) {
						const t = yr(this, "dialog.denyClose");
						ur(this.panel, t.keyframes, t.options);
					} else this.hide();
				}
				handleKeyDown(t) {
					"Escape" === t.key &&
						(t.stopPropagation(), this.requestClose("keyboard"));
				}
				async handleOpenChange() {
					if (this.open) {
						Ht(this, "sl-show"),
							(this.originalTrigger = document.activeElement),
							this.modal.activate(),
							Fi(this);
						const t = this.querySelector("[autofocus]");
						t && t.removeAttribute("autofocus"),
							await Promise.all([
								pr(this.dialog),
								pr(this.overlay),
							]),
							(this.dialog.hidden = !1),
							requestAnimationFrame(() => {
								Ht(this, "sl-initial-focus", { cancelable: !0 })
									.defaultPrevented ||
									(t
										? t.focus({ preventScroll: !0 })
										: this.panel.focus({
												preventScroll: !0,
										  })),
									t && t.setAttribute("autofocus", "");
							});
						const e = yr(this, "dialog.show"),
							r = yr(this, "dialog.overlay.show");
						await Promise.all([
							ur(this.panel, e.keyframes, e.options),
							ur(this.overlay, r.keyframes, r.options),
						]),
							Ht(this, "sl-after-show");
					} else {
						Ht(this, "sl-hide"),
							this.modal.deactivate(),
							await Promise.all([
								pr(this.dialog),
								pr(this.overlay),
							]);
						const t = yr(this, "dialog.hide"),
							e = yr(this, "dialog.overlay.hide");
						await Promise.all([
							ur(this.panel, t.keyframes, t.options),
							ur(this.overlay, e.keyframes, e.options),
						]),
							(this.dialog.hidden = !0),
							Ri(this);
						const r = this.originalTrigger;
						"function" == typeof (null == r ? void 0 : r.focus) &&
							setTimeout(() => r.focus()),
							Ht(this, "sl-after-hide");
					}
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			dialog: !0,
			"dialog--open": this.open,
			"dialog--has-footer": this.hasSlotController.test("footer"),
		})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${() =>
			this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${Ft(this.noHeader ? this.label : void 0)}
          aria-labelledby=${Ft(this.noHeader ? void 0 : "title")}
          tabindex="0"
        >
          ${
				this.noHeader
					? ""
					: j`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${
						this.label.length > 0
							? this.label
							: String.fromCharCode(65279)
					} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${() => this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              `
			}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
				}
			};
		(Gi.styles = Wi),
			gt([Ct(".dialog")], Gi.prototype, "dialog", 2),
			gt([Ct(".dialog__panel")], Gi.prototype, "panel", 2),
			gt([Ct(".dialog__overlay")], Gi.prototype, "overlay", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Gi.prototype, "open", 2),
			gt([xt({ reflect: !0 })], Gi.prototype, "label", 2),
			gt(
				[xt({ attribute: "no-header", type: Boolean, reflect: !0 })],
				Gi.prototype,
				"noHeader",
				2
			),
			gt(
				[Rt("open", { waitUntilFirstUpdate: !0 })],
				Gi.prototype,
				"handleOpenChange",
				1
			),
			(Gi = gt([yt("sl-dialog")], Gi)),
			gr("dialog.show", {
				keyframes: [
					{ opacity: 0, transform: "scale(0.8)" },
					{ opacity: 1, transform: "scale(1)" },
				],
				options: { duration: 250, easing: "ease" },
			}),
			gr("dialog.hide", {
				keyframes: [
					{ opacity: 1, transform: "scale(1)" },
					{ opacity: 0, transform: "scale(0.8)" },
				],
				options: { duration: 250, easing: "ease" },
			}),
			gr("dialog.denyClose", {
				keyframes: [
					{ transform: "scale(1)" },
					{ transform: "scale(1.02)" },
					{ transform: "scale(1)" },
				],
				options: { duration: 250 },
			}),
			gr("dialog.overlay.show", {
				keyframes: [{ opacity: 0 }, { opacity: 1 }],
				options: { duration: 250 },
			}),
			gr("dialog.overlay.hide", {
				keyframes: [{ opacity: 1 }, { opacity: 0 }],
				options: { duration: 250 },
			});
		var Ki = te`
  ${Je}

  sl-dialog {
    --sl-overlay-background-color: rgba(0, 0, 0, 0.5);
    --sl-z-index-dialog: 800;
  }

  ::part(panel) {
    border-radius: 1.75rem;
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--surface10);
    padding: 1.5rem;
  }

  .full-page::part(panel) {
    border-radius: 0;
    min-height: 100vh;
    padding: 1rem;
    width: 100vw;
  }

  ::part(body) {
    padding: 0;
    overflow: visible;
  }

  .icon-wrapper {
    color: var(--secondary);
    display: none;
    align-items: center;
    justify-content: center;
    margin-top: 0.125rem;
    margin-bottom: 1.25rem;
  }

  .icon-wrapper--has-icon {
    display: flex;
  }

  .dialog-title {
    font-size: var(--m3-headline-small-font-size);
    text-decoration: var(--m3-headline-small-text-decoration);
    font-family: var(--m3-headline-small-font-family);
    font-weight: var(--m3-headline-small-font-weight);
    font-style: var(--m3-headline-small-font-style);
    font-stretch: var(--m3-headline-small-font-stretch);
    letter-spacing: var(--m3-headline-small-letter-spacing);
    line-height: var(--m3-headline-small-line-height);
    color: var(--on-surface);
    margin-bottom: 1rem;
  }

  .hero-icon .dialog-title {
    text-align: center;
  }

  .description {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface-variant);
    margin-bottom: 1.5rem;
  }

  .hero-icon .description {
    margin-bottom: 1.75rem;
  }

  .content-wrapper {
    margin-bottom: 1.75rem;
    display: none;
  }

  .content-wrapper--has-content {
    display: block;
  }
`,
			Qi = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ji = class extends Xe {
			constructor() {
				super(...arguments),
					(this.width = "19.5rem"),
					(this.open = !1),
					(this.fullPage = !1),
					(this.checked = !1),
					(this.show = () => {
						const t = this.renderRoot.querySelector("sl-dialog");
						null == t || t.show();
					}),
					(this.hide = () => {
						const t = this.renderRoot.querySelector("sl-dialog");
						null == t || t.hide();
					});
			}
			_handleContentSlotChange() {
				(this.hasSlotContent = !0), this.requestUpdate();
			}
			_handleIconSlotChange() {
				(this.hasHeroIcon = !0), this.requestUpdate();
			}
			render() {
				return Be`
      <sl-dialog
        no-header
        ?open=${this.open}
        @sl-after-show=${(t) => {
			"SL-DIALOG" === t.target.nodeName && Sr(this, "agosh-show");
		}}
        @sl-after-hide=${(t) => {
			"SL-DIALOG" === t.target.nodeName && Sr(this, "agosh-hide");
		}}
        class=${sr({
			"hero-icon": this.hasHeroIcon,
			"full-page": this.fullPage,
		})}
        style="--width: ${this.width}"
      >
        <div>
          <div
            class=${sr({
				"icon-wrapper": !0,
				"icon-wrapper--has-icon": this.hasHeroIcon,
			})}
          >
            <slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>
          </div>

          ${this.title ? Be`<div class="dialog-title">${this.title}</div>` : ""}
        </div>

        ${
			this.description
				? Be`<div class="description">${this.description}</div>`
				: ""
		}

        <div
          class=${sr({
				"content-wrapper": !0,
				"content-wrapper--has-content": this.hasSlotContent,
			})}
        >
          <slot
            name="content"
            @slotchange=${this._handleContentSlotChange}
          ></slot>
        </div>

        <slot name="action"></slot>
      </sl-dialog>
    `;
			}
		};
		(Ji.styles = Ki),
			Qi([Ge()], Ji.prototype, "title", void 0),
			Qi([Ge()], Ji.prototype, "description", void 0),
			Qi([Ge({ type: String })], Ji.prototype, "width", void 0),
			Qi(
				[Ge({ type: Boolean, reflect: !0 })],
				Ji.prototype,
				"open",
				void 0
			),
			Qi(
				[Ge({ type: Boolean, attribute: "full-page" })],
				Ji.prototype,
				"fullPage",
				void 0
			),
			Qi([Ke()], Ji.prototype, "hasSlotContent", void 0),
			Qi([Ke()], Ji.prototype, "hasHeroIcon", void 0),
			Qi([Ke()], Ji.prototype, "checked", void 0),
			(Ji = Qi([Ye("agosh-dialog")], Ji));
		var to = Ji;
		const eo = (t, e) => Jt(t ? e : ""),
			ro = te`
  .fab--disabled::part(base) {
    background-color: transparent;
    pointer-events: none;
    opacity: 1;
  }

  .fab-icon--disabled {
    opacity: 1;
  }

  .fab--disabled::part(suffix) {
    color: var(--fab-disabled-text);
  }

  .fab--disabled::part(base) {
    opacity: 1;
  }

  .fab--disabled::part(base)::before {
    opacity: 0.38;
  }

  .fab--disabled::part(base) {
    color: var(--fab-disabled-text);
    box-shadow: none;
    filter: none;
  }

  .fab-icon--disabled {
    color: var(--fab-disabled-icons);
  }

  .fab--disabled::part(base):before {
    background-color: var(--transparent) !important;
  }

  .fab--disabled::part(base):after {
    background-color: var(--on-surface-opacity012);
  }
`,
			io = te`
  ::part(base) {
    box-shadow: ${Jt(dr("--elevation31", !0))};
    filter: drop-shadow(${Jt(dr("--elevation30"))});
  }

  ::part(base):hover {
    box-shadow: ${Jt(dr("--elevation41", !0))};
    filter: drop-shadow(${Jt(dr("--elevation40"))});
  }

  ::part(base):focus {
    box-shadow: ${Jt(dr("--elevation31", !0))};
    filter: drop-shadow(${Jt(dr("--elevation30"))});
  }

  ::part(base):active {
    box-shadow: ${Jt(dr("--elevation31", !0))};
    filter: drop-shadow(${Jt(dr("--elevation30"))});
  }
`,
			oo = te`
  :host {
    display: inline-block;
  }

  sl-button {
    cursor: auto;
  }

  ::slotted(*) {
    display: block;
  }

  ::part(base) {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    text-transform: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  ::part(label) {
    padding: 0;
  }

  ::part(base):after,
  ::part(base):before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
  }

  ::part(base):before {
    z-index: -20;
  }

  ::part(base):after {
    z-index: -10;
  }

  ::part(base):hover {
    background-color: var(--transparent);
  }

  ::part(base):active {
    background-color: var(--transparent);
  }

  ::part(base):focus {
    background-color: var(--transparent);
  }

  .fab-icon {
    pointer-events: none;
  }

  ${io}
  ${ro}
`,
			ao = te`
  .fab--normal::part(base) {
    border-radius: var(--fab-border-radius-default);
    height: var(--fab-height-default);
    width: var(--fab-width-default);
  }

  .fab-icon--normal {
    height: var(--fab-icon-size-normal);
    width: var(--fab-icon-size-normal);
  }
`,
			so = te`
  .fab--large::part(base) {
    border-radius: var(--fab-border-radius-large);
    height: var(--fab-height-large);
    width: var(--fab-width-large);
  }

  .fab-icon--large {
    height: var(--fab-icon-size-large);
    width: var(--fab-icon-size-large);
  }
`,
			no = te`
  .fab--extended::part(base) {
    border-radius: var(--fab-border-radius-default);
    height: var(--fab-height-default);
    padding-left: 1rem;
    padding-right: 1.25rem;
  }

  .fab-icon--extended {
    margin-right: 0.75rem;
    height: var(--fab-icon-size-normal);
    width: var(--fab-icon-size-normal);
  }
`,
			lo = ({
				selector: t,
				hoverBgWithOpacity: e,
				focusBgWithOpacity: r,
				activeBgWithOpacity: i,
				defaultGradient: o,
				defaultBg: a,
			}) => te`
  ${Jt(t)}:hover:after {
    background-color: ${Jt(e)};
  }

  ${Jt(t)}:focus:after {
    background-color: ${Jt(r)};
  }

  ${Jt(t)}:active:after {
    background-color: ${Jt(i)};
  }

  ${Jt(t)}:before {
    ${eo(!!a, `background-color: ${a}`)};

    ${eo(
		!!o,
		`background: linear-gradient(0deg,${null == o ? void 0 : o.color1},${
			null == o ? void 0 : o.color2
		}),${null == o ? void 0 : o.color3};`
	)};
  }
`,
			co = te`
  ${ao}
  ${so}
  ${no}
`,
			ho = te`
  .fab--surface::part(base) {
    color: var(--primary);
  }

  ${lo({
		selector: ".fab--surface::part(base)",
		hoverBgWithOpacity: "var(--primary-opacity008)",
		focusBgWithOpacity: "var(--primary-opacity012)",
		activeBgWithOpacity: "var(--fab-surface-active-bg)",
		defaultGradient: {
			color1: "var(--surface31)",
			color2: "var(--surface31)",
			color3: "var(--surface30)",
		},
  })}
`,
			uo = te`
  .fab--primary::part(base) {
    color: var(--on-primary-container);
  }

  ${lo({
		selector: ".fab--primary::part(base)",
		defaultBg: "var(--primary-container)",
		hoverBgWithOpacity: "var(--on-primary-container-opacity008)",
		focusBgWithOpacity: "var(--on-primary-container-opacity012)",
		activeBgWithOpacity: "var(--fab-primary-active-bg)",
  })}
`,
			fo = te`
  .fab--secondary::part(base) {
    color: var(--on-secondary-container);
  }

  ${lo({
		selector: ".fab--secondary::part(base)",
		defaultBg: "var(--secondary-container)",
		hoverBgWithOpacity: "var(--on-secondary-container-opacity008)",
		focusBgWithOpacity: "var(--on-secondary-container-opacity012)",
		activeBgWithOpacity: "var(--fab-secondary-active-bg)",
  })}
`,
			po = te`
  .fab--tertiary::part(base) {
    color: var(--on-tertiary-container);
  }

  ${lo({
		selector: ".fab--tertiary::part(base)",
		defaultBg: "var(--tertiary-container)",
		hoverBgWithOpacity: "var(--on-tertiary-container-opacity008)",
		focusBgWithOpacity: "var(--on-tertiary-container-opacity012)",
		activeBgWithOpacity: "var(--fab-tertiary-active-bg)",
  })}
`,
			mo = te`
  ${ho}
  ${uo}
  ${fo}
  ${po}
`;
		var vo = te`
  ${Je}
  ${oo}  
  ${co}
  ${mo}
`,
			bo = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let go = class extends Xe {
			constructor() {
				super(...arguments),
					(this.variant = "normal"),
					(this.background = "primary"),
					(this.disabled = !1);
			}
			render() {
				return Jr`
      <sl-button
        class=${sr({
			"fab--normal": "normal" === this.variant,
			"fab--large": "large" === this.variant,
			"fab--extended": "extended" === this.variant,
			"fab--surface": "surface" === this.background,
			"fab--primary": "primary" === this.background,
			"fab--secondary": "secondary" === this.background,
			"fab--tertiary": "tertiary" === this.background,
			"fab--disabled": this.disabled,
		})}
        .disabled=${this.disabled}
      >
        <div
          class=${sr({
				"fab-icon": !0,
				"fab-icon--normal": "normal" === this.variant,
				"fab-icon--large": "large" === this.variant,
				"fab-icon--extended": "extended" === this.variant,
				"fab-icon--disabled": this.disabled,
			})}
        >
          <slot></slot>
        </div>

        ${
			"extended" === this.variant
				? Jr`<slot name="label" slot="suffix"></slot>`
				: ""
		}
      </sl-button>
    `;
			}
		};
		(go.styles = vo),
			bo([Ge({ reflect: !0 })], go.prototype, "variant", void 0),
			bo([Ge({ reflect: !0 })], go.prototype, "background", void 0),
			bo(
				[Ge({ type: Boolean, reflect: !0 })],
				go.prototype,
				"disabled",
				void 0
			),
			(go = bo([Ye("agosh-fab")], go));
		var yo = go,
			wo = l`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`,
			xo = l`
  ${Q}
  ${wo}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`,
			_o = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this)),
						(this.hasSlotController = new wr(
							this,
							"help-text",
							"label"
						)),
						(this.hasFocus = !1),
						(this.isPasswordVisible = !1),
						(this.type = "text"),
						(this.size = "medium"),
						(this.value = ""),
						(this.filled = !1),
						(this.pill = !1),
						(this.label = ""),
						(this.helpText = ""),
						(this.clearable = !1),
						(this.togglePassword = !1),
						(this.disabled = !1),
						(this.readonly = !1),
						(this.required = !1),
						(this.invalid = !1);
				}
				get valueAsDate() {
					var t, e;
					return null !=
						(e = null == (t = this.input) ? void 0 : t.valueAsDate)
						? e
						: null;
				}
				set valueAsDate(t) {
					this.updateComplete.then(() => {
						(this.input.valueAsDate = t),
							(this.value = this.input.value);
					});
				}
				get valueAsNumber() {
					var t, e;
					return null !=
						(e =
							null == (t = this.input) ? void 0 : t.valueAsNumber)
						? e
						: parseFloat(this.value);
				}
				set valueAsNumber(t) {
					this.updateComplete.then(() => {
						(this.input.valueAsNumber = t),
							(this.value = this.input.value);
					});
				}
				firstUpdated() {
					this.invalid = !this.input.checkValidity();
				}
				focus(t) {
					this.input.focus(t);
				}
				blur() {
					this.input.blur();
				}
				select() {
					this.input.select();
				}
				setSelectionRange(t, e, r = "none") {
					this.input.setSelectionRange(t, e, r);
				}
				setRangeText(t, e, r, i = "preserve") {
					this.input.setRangeText(t, e, r, i),
						this.value !== this.input.value &&
							((this.value = this.input.value),
							Ht(this, "sl-input"),
							Ht(this, "sl-change"));
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleChange() {
					(this.value = this.input.value), Ht(this, "sl-change");
				}
				handleClearClick(t) {
					(this.value = ""),
						Ht(this, "sl-clear"),
						Ht(this, "sl-input"),
						Ht(this, "sl-change"),
						this.input.focus(),
						t.stopPropagation();
				}
				handleDisabledChange() {
					(this.input.disabled = this.disabled),
						(this.invalid = !this.input.checkValidity());
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleInput() {
					(this.value = this.input.value), Ht(this, "sl-input");
				}
				handleInvalid() {
					this.invalid = !0;
				}
				handleKeyDown(t) {
					const e = t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
					"Enter" !== t.key ||
						e ||
						this.formSubmitController.submit();
				}
				handlePasswordToggle() {
					this.isPasswordVisible = !this.isPasswordVisible;
				}
				handleValueChange() {
					this.invalid = !this.input.checkValidity();
				}
				render() {
					const t = this.hasSlotController.test("label"),
						e = this.hasSlotController.test("help-text"),
						r = !!this.label || !!t,
						i = !!this.helpText || !!e;
					return j`
      <div
        part="form-control"
        class=${st({
			"form-control": !0,
			"form-control--small": "small" === this.size,
			"form-control--medium": "medium" === this.size,
			"form-control--large": "large" === this.size,
			"form-control--has-label": r,
			"form-control--has-help-text": i,
		})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${st({
				input: !0,
				"input--small": "small" === this.size,
				"input--medium": "medium" === this.size,
				"input--large": "large" === this.size,
				"input--pill": this.pill,
				"input--standard": !this.filled,
				"input--filled": this.filled,
				"input--disabled": this.disabled,
				"input--focused": this.hasFocus,
				"input--empty": 0 === this.value.length,
				"input--invalid": this.invalid,
			})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${
					"password" === this.type && this.isPasswordVisible
						? "text"
						: this.type
				}
              name=${Ft(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Ft(this.placeholder)}
              minlength=${Ft(this.minlength)}
              maxlength=${Ft(this.maxlength)}
              min=${Ft(this.min)}
              max=${Ft(this.max)}
              step=${Ft(this.step)}
              .value=${Bi(this.value)}
              autocapitalize=${Ft(this.autocapitalize)}
              autocomplete=${Ft(this.autocomplete)}
              autocorrect=${Ft(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${Ft(this.spellcheck)}
              pattern=${Ft(this.pattern)}
              inputmode=${Ft(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid ? "true" : "false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${
				this.clearable && this.value.length > 0
					? j`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-hidden="true"
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `
					: ""
			}
            ${
				this.togglePassword
					? j`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-hidden="true"
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${
						this.isPasswordVisible
							? j`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `
							: j`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `
					}
                  </button>
                `
					: ""
			}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
				}
			};
		(_o.styles = xo),
			gt([Ct(".input__control")], _o.prototype, "input", 2),
			gt([_t()], _o.prototype, "hasFocus", 2),
			gt([_t()], _o.prototype, "isPasswordVisible", 2),
			gt([xt({ reflect: !0 })], _o.prototype, "type", 2),
			gt([xt({ reflect: !0 })], _o.prototype, "size", 2),
			gt([xt()], _o.prototype, "name", 2),
			gt([xt()], _o.prototype, "value", 2),
			gt([xt({ type: Boolean, reflect: !0 })], _o.prototype, "filled", 2),
			gt([xt({ type: Boolean, reflect: !0 })], _o.prototype, "pill", 2),
			gt([xt()], _o.prototype, "label", 2),
			gt([xt({ attribute: "help-text" })], _o.prototype, "helpText", 2),
			gt([xt({ type: Boolean })], _o.prototype, "clearable", 2),
			gt(
				[xt({ attribute: "toggle-password", type: Boolean })],
				_o.prototype,
				"togglePassword",
				2
			),
			gt([xt()], _o.prototype, "placeholder", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				_o.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				_o.prototype,
				"readonly",
				2
			),
			gt([xt({ type: Number })], _o.prototype, "minlength", 2),
			gt([xt({ type: Number })], _o.prototype, "maxlength", 2),
			gt([xt()], _o.prototype, "min", 2),
			gt([xt()], _o.prototype, "max", 2),
			gt([xt({ type: Number })], _o.prototype, "step", 2),
			gt([xt()], _o.prototype, "pattern", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				_o.prototype,
				"required",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				_o.prototype,
				"invalid",
				2
			),
			gt([xt()], _o.prototype, "autocapitalize", 2),
			gt([xt()], _o.prototype, "autocorrect", 2),
			gt([xt()], _o.prototype, "autocomplete", 2),
			gt([xt({ type: Boolean })], _o.prototype, "autofocus", 2),
			gt([xt({ type: Boolean })], _o.prototype, "spellcheck", 2),
			gt([xt()], _o.prototype, "inputmode", 2),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				_o.prototype,
				"handleDisabledChange",
				1
			),
			gt(
				[Rt("value", { waitUntilFirstUpdate: !0 })],
				_o.prototype,
				"handleValueChange",
				1
			),
			(_o = gt([yt("sl-input")], _o));
		var $o = te`
  ${Je}

  ::part(base) {
    --sl-input-spacing-medium: 1rem;
    border: 1px solid var(--outline);
    background-color: var(--surface);
    height: 3.5rem;
    border-radius: 0.5rem;
    transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  ::part(form-control) {
    position: relative;
  }

  ::part(form-control-label) {
    color: var(--outline);
    padding: 0;
    position: relative;
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    left: -1rem;
    top: -1rem;
    transform: translate(2rem, 2rem) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    z-index: 1;
    pointer-events: none;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  ::part(input) {
    height: 100%;
    background-color: var(--transparent);
    color: var(--on-surface);
    padding: 0 1rem;
  }

  .input--disabled::part(base) {
    border-color: var(--on-surface-opacity012);
  }

  .input--disabled::part(input) {
    color: var(--disabled-input-color);
  }

  ::part(input)::placeholder {
    color: var(--outline);
  }

  ::part(form-control-help-text) {
    display: flex;
    justify-content: flex-end;
    color: var(--error);
    width: ${Jt("100%")};
    margin-top: 0;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
  }

  .input--focused::part(base) {
    border-color: var(--primary);
    box-shadow: inset 0 0 0 1px var(--primary);
  }

  .input--has-prefix::part(form-control-label) {
    left: 1rem;
  }

  .input--has-suffix::part(form-control-label) {
    right: 1rem;
  }

  .input--shrink::part(form-control-label) {
    transform: translate(2rem, 1.4rem) scale(0.75);
    color: var(--primary);
    font-weight: var(--m3-label-medium-font-weight);
  }

  .input--hasValue::part(form-control-label) {
    transform: translate(2rem, 1.4rem) scale(0.75);
    color: var(--primary);
    font-weight: var(--m3-label-medium-font-weight);
  }

  .input--has-placeholder::part(form-control-label) {
    transform: translate(2rem, 1.4rem) scale(0.75);
    color: var(--primary);
    font-weight: var(--m3-label-medium-font-weight);
  }

  .input--disabled::part(base) {
    opacity: 1;
    pointer-events: none;
    background-color: var(--disabled-input-bg);
  }

  .input--has-help-text::part(base) {
    border-color: var(--error);
    box-shadow: inset 0 0 0 1px var(--error);
  }

  .input--one-digit::part(base) {
    width: 2.625rem;
  }

  .input--one-digit::part(input)::placeholder {
    text-align: center;
    font-size: 15px;
  }

  .input--disabled::part(form-control-label) {
    color: var(--disabled-input-color);
  }

  .input--has-help-text::part(form-control-label) {
    color: var(--error);
  }

  .input--has-prefix::part(prefix) {
    position: relative;
    top: 0.25rem;
    color: var(--primary);
    pointer-events: none;
  }

  .input--disabled::part(prefix) {
    opacity: 0.4;
  }

  .input--has-prefix::part(input) {
    padding-left: 0.5rem;
  }

  .input--has-suffix::part(suffix) {
    position: relative;
    top: 0.25rem;
    color: var(--primary);
    pointer-events: none;
  }

  .input--has-suffix::part(input) {
    padding-right: 0.5rem;
  }

  .input--has-label::part(input) {
    padding-top: 1rem;
  }

  .input--passwordIconWrapper {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }
`,
			ko = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		const Co = Be`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 0.999999 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
    fill="#635A70"
  />
</svg> `,
			zo = Be`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 5.99995C15.79 5.99995 19.17 8.12995 20.82 11.5C20.23 12.72 19.4 13.77 18.41 14.62L19.82 16.03C21.21 14.8 22.31 13.26 23 11.5C21.27 7.10995 17 3.99995 12 3.99995C10.73 3.99995 9.51 4.19995 8.36 4.56995L10.01 6.21995C10.66 6.08995 11.32 5.99995 12 5.99995ZM10.93 7.13995L13 9.20995C13.57 9.45995 14.03 9.91995 14.28 10.49L16.35 12.56C16.43 12.22 16.49 11.86 16.49 11.49C16.5 9.00995 14.48 6.99995 12 6.99995C11.63 6.99995 11.28 7.04995 10.93 7.13995ZM2.01 3.86995L4.69 6.54995C3.06 7.82995 1.77 9.52995 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.98 18.71 16.32 18.18L19.74 21.6L21.15 20.19L3.42 2.44995L2.01 3.86995ZM9.51 11.37L12.12 13.98C12.08 13.99 12.04 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 11.45 9.51 11.42 9.51 11.37ZM6.11 7.96995L7.86 9.71995C7.63 10.27 7.5 10.87 7.5 11.5C7.5 13.98 9.52 16 12 16C12.63 16 13.23 15.87 13.77 15.64L14.75 16.62C13.87 16.86 12.95 17 12 17C8.21 17 4.83 14.87 3.18 11.5C3.88 10.07 4.9 8.88995 6.11 7.96995Z"
    fill="#635A70"
  />
</svg> `;
		let Bo = class extends Xe {
			constructor() {
				super(...arguments),
					(this.formSubmitController = new bi(this)),
					(this.oneDigit = !1),
					(this.label = ""),
					(this.readonly = !1),
					(this.disabled = !1),
					(this.helpText = ""),
					(this.value = ""),
					(this.required = !1),
					(this.autofocus = !1),
					(this.eyeOpen = !1),
					(this.hasPrefix = !1),
					(this.hasSuffix = !1),
					(this.hasSlottedLabel = !1),
					(this.hasSlottedHelpText = !1),
					(this.shrink = !!this.value),
					(this.hasValue = !!this.value),
					(this.hasFocus = !!this.autofocus);
			}
			connectedCallback() {
				super.connectedCallback(),
					(this.shrink = !!this.value),
					(this.hasFocus = !!this.autofocus);
			}
			_handleFocus() {
				(this.hasFocus = !0),
					(this.shrink = !0),
					Sr(this, "agosh-focus"),
					this.requestUpdate();
			}
			_handleBlur() {
				var t;
				this.hasFocus = !1;
				const e =
					null === (t = this.renderRoot) || void 0 === t
						? void 0
						: t.querySelector("sl-input");
				if (!e) return;
				const r = e.value;
				(this.shrink = !!r),
					Sr(this, "agosh-blur"),
					this.requestUpdate();
			}
			_handlePrefixSlotChange() {
				(this.hasPrefix = !0), this.requestUpdate();
			}
			_handleSuffixSlotChange() {
				(this.hasSuffix = !0), this.requestUpdate();
			}
			_handleLabelSlotChange() {
				(this.hasSlottedLabel = !0), this.requestUpdate();
			}
			_handleHelpTextSlotChange(t) {
				var e, r, i, o;
				const a =
						"SLOT" ===
							(null === (e = Ai(t, 0)) || void 0 === e
								? void 0
								: e.tagName) &&
						(null === (r = Ai(t, 0)) || void 0 === r
							? void 0
							: r.textContent),
					s =
						"SLOT" ===
							(null === (i = Ai(t, 1)) || void 0 === i
								? void 0
								: i.tagName) &&
						(null === (o = Ai(t, 1)) || void 0 === o
							? void 0
							: o.textContent);
				(this.hasSlottedHelpText = Boolean(a || s)),
					this.requestUpdate();
			}
			_handleInput(t) {
				(this.value = Ai(t, 0).value),
					Sr(this, "agosh-input", { detail: this.value });
			}
			_handleKeyDown(t) {
				const e = t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
				"Enter" !== t.key || e || this.formSubmitController.submit();
			}
			_handleClickEye() {
				(this.eyeOpen = !this.eyeOpen),
					(this.type =
						"password" === this.type ? "text" : "password"),
					this.requestUpdate();
			}
			_handleChange() {
				Sr(this, "agosh-change", { detail: this.value });
			}
			_handleClear() {
				Sr(this, "agosh-clear");
			}
			updated(t) {
				t.forEach((t, e) => {
					"value" === e && (this.hasValue = !!this.value);
				});
			}
			render() {
				var t;
				const e = !!this.label || this.hasSlottedLabel,
					r = !!this.helpText || this.hasSlottedHelpText;
				return Be`<sl-input
      class=${sr({
			"input--has-label": e,
			"input--has-placeholder": !!(null === (t = this.placeholder) ||
			void 0 === t
				? void 0
				: t.trim()),
			"input--shrink": this.shrink,
			"input--hasValue": this.hasValue,
			"input--disabled": this.disabled,
			"input--has-help-text": r,
			"input--has-prefix": this.hasPrefix,
			"input--has-suffix": this.hasSuffix,
			"input--focused": this.hasFocus,
			"input--one-digit": this.oneDigit,
		})}
      placeholder=${this.placeholder}
      label=${this.label}
      .readonly=${this.readonly}
      .disabled=${this.disabled}
      help-text=${this.helpText}
      name=${this.name}
      value=${this.value}
      required=${this.required}
      ?autofocus=${this.autofocus}
      type=${this.type}
      @keydown=${this._handleKeyDown}
      @sl-change=${this._handleChange}
      @sl-clear=${this._handleClear}
      @sl-input=${this._handleInput}
      @sl-focus=${this._handleFocus}
      @sl-blur=${this._handleBlur}
    >
      <slot name="label" slot="label" @slotchange=${this._handleLabelSlotChange}
        >${this.label}</slot
      >
      <slot
        name="prefix"
        slot="prefix"
        @slotchange=${this._handlePrefixSlotChange}
      ></slot>
      <slot
        name="suffix"
        slot="suffix"
        @slotchange=${this._handleSuffixSlotChange}
      ></slot>
      <slot
        name="help-text"
        slot="help-text"
        @slotchange=${this._handleHelpTextSlotChange}
        >${this.helpText}</slot
      >
      ${
			"password" == this.type || "text" === this.type
				? Be`<div
            class="input--passwordIconWrapper"
            @click=${this._handleClickEye}
            slot="suffix"
          >
            ${this.eyeOpen ? Co : zo}
          </div>`
				: ""
		}
    </sl-input>`;
			}
		};
		(Bo.styles = $o),
			ko(
				[Ge({ type: Boolean, reflect: !0, attribute: "one-digit" })],
				Bo.prototype,
				"oneDigit",
				void 0
			),
			ko([Ge()], Bo.prototype, "placeholder", void 0),
			ko([Ge()], Bo.prototype, "label", void 0),
			ko(
				[Ge({ type: Boolean, reflect: !0 })],
				Bo.prototype,
				"readonly",
				void 0
			),
			ko(
				[Ge({ type: Boolean, reflect: !0 })],
				Bo.prototype,
				"disabled",
				void 0
			),
			ko(
				[Ge({ attribute: "help-text" })],
				Bo.prototype,
				"helpText",
				void 0
			),
			ko([Ge()], Bo.prototype, "name", void 0),
			ko([Ge()], Bo.prototype, "type", void 0),
			ko([Ge()], Bo.prototype, "value", void 0),
			ko(
				[Ge({ type: Boolean, reflect: !0 })],
				Bo.prototype,
				"required",
				void 0
			),
			ko([Ge({ type: Boolean })], Bo.prototype, "autofocus", void 0),
			ko([Ke()], Bo.prototype, "eyeOpen", void 0),
			ko([Ke()], Bo.prototype, "hasPrefix", void 0),
			ko([Ke()], Bo.prototype, "hasSuffix", void 0),
			ko([Ke()], Bo.prototype, "hasSlottedLabel", void 0),
			ko([Ke()], Bo.prototype, "hasSlottedHelpText", void 0),
			ko([Ke()], Bo.prototype, "shrink", void 0),
			ko([Ke()], Bo.prototype, "hasValue", void 0),
			ko([Ke()], Bo.prototype, "hasFocus", void 0),
			(Bo = ko([Ye("agosh-input")], Bo));
		var Oo = Bo,
			So = te`
  ${Je}

  .text {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--link-color);
  }

  .text-link-bold {
    font-weight: 600;
    line-height: 1.5rem;
  }

  .button {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    color: var(--link-button-color);
    max-width: 15rem;
    padding: 0.5rem 1.5rem 0.5rem 0.75rem;
    background: var(--white);
    box-shadow: var(--elevation2);
    border-radius: 1.5rem;
  }

  .button:hover {
    color: var(--link-button-hover-color);
  }

  .button-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
		/**
		 * @license
		 * Copyright 2018 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ const Lo = (t) => (null != t ? t : Se);
		var Ao = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Mo = class extends Xe {
			constructor() {
				super(...arguments),
					(this.referrerPolicy = ""),
					(this.textLinkBold = !1),
					(this.variant = "text");
			}
			render() {
				return Be`
      <a
        .style=${this.style.cssText}
        class=${sr({
			text: !0,
			"text-link-bold": "text" === this.variant && this.textLinkBold,
			button: "button" === this.variant,
		})}
        href=${Lo(this.href)}
        download=${Lo(this.download)}
        referrer-policy=${Lo(this.referrerPolicy)}
        rel=${Lo(this.rel)}
        target=${Lo(this.target)}
        type=${Lo(this.type)}
      >
        ${
			"button" === this.variant
				? Be` <slot name="prefix"></slot>
              <div class="button-text">
                <slot></slot>
              </div>`
				: ""
		}
        ${"text" === this.variant ? Be`<slot></slot> ` : ""}
      </a>
    `;
			}
		};
		(Mo.styles = So),
			Ao([Ge()], Mo.prototype, "href", void 0),
			Ao([Ge()], Mo.prototype, "download", void 0),
			Ao(
				[Ge({ reflect: !0, attribute: "referrer-policy" })],
				Mo.prototype,
				"referrerPolicy",
				void 0
			),
			Ao([Ge()], Mo.prototype, "rel", void 0),
			Ao([Ge()], Mo.prototype, "target", void 0),
			Ao([Ge()], Mo.prototype, "type", void 0),
			Ao(
				[
					Ge({
						reflect: !0,
						type: Boolean,
						attribute: "text-link-bold",
					}),
				],
				Mo.prototype,
				"textLinkBold",
				void 0
			),
			Ao([Ge({ reflect: !0 })], Mo.prototype, "variant", void 0),
			(Mo = Ao([Ye("agosh-link")], Mo));
		var jo = Mo,
			To = te`
  ${Je}

  .wrapper {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--secondary);
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 16.5rem;
    background-color: var(--transparent);
  }

  .alternate {
    background-color: var(--primary-container);
  }

  .alternate .text-wrapper {
    color: var(--on-primary-container);
  }

  .alternate .text-counter {
    background-color: var(--on-primary-container);
  }

  .alternate .text-icon-wrapper {
    color: var(--on-primary-container);
  }

  .text-wrapper {
    flex-grow: 1;
    margin-left: 1rem;
    color: var(--on-surface);
  }

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .text-name {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--on-surface);
  }

  .text-duration {
    font-size: var(--m3-label-medium-font-size);
    text-decoration: var(--m3-label-medium-text-decoration);
    font-family: var(--m3-label-medium-font-family);
    font-weight: var(--m3-label-medium-font-weight);
    font-style: var(--m3-label-medium-font-style);
    font-stretch: var(--m3-label-medium-font-stretch);
    letter-spacing: var(--m3-label-medium-letter-spacing);
    line-height: var(--m3-label-medium-line-height);
    color: var(--secondary);
  }

  .text-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.375rem;
  }

  .text-preview {
    font-size: var(--m3-body-small-font-size);
    text-decoration: var(--m3-body-small-text-decoration);
    font-family: var(--m3-body-small-font-family);
    font-weight: var(--m3-body-small-font-weight);
    font-style: var(--m3-body-small-font-style);
    font-stretch: var(--m3-body-small-font-stretch);
    letter-spacing: var(--m3-body-small-letter-spacing);
    line-height: var(--m3-body-small-line-height);
    margin-right: 0.25rem;
  }

  .text-icon-wrapper {
    /* //TODO: nh: didn't work tertiary */
    color: var(--tertiary);
    color: var(--m3-ref-tertiary-tertiary80);
  }

  .text-counter {
    font-size: var(--m3-label-medium-font-size);
    text-decoration: var(--m3-label-medium-text-decoration);
    font-family: var(--m3-label-medium-font-family);
    font-weight: var(--m3-label-medium-font-weight);
    font-style: var(--m3-label-medium-font-style);
    font-stretch: var(--m3-label-medium-font-stretch);
    letter-spacing: var(--m3-label-medium-letter-spacing);
    line-height: var(--m3-label-medium-line-height);
    width: 1.4375rem;
    height: 1.125rem;
    border-radius: 99rem;
    background-color: var(--primary);
    color: var(--on-primary);
    padding: 1px 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,
			Io = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Uo = class extends Xe {
			constructor() {
				super(...arguments), (this.alternate = !1);
			}
			render() {
				return Be` <div
      class=${sr({ wrapper: !0, alternate: this.alternate })}
    >
      <slot name="avatar"></slot>
      <div class="text-wrapper">
        <div class="text-top">
          <div class="text-name">${this.name}</div>
          <div class="text-duration">${this.duration}</div>
        </div>
        <div class="text-bottom">
          <div class="text-preview">${this.preview}</div>
          ${
				this.counter
					? ""
					: Be`
                <div class="text-icon-wrapper">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.975 4.725C12.6825 4.4325 12.21 4.4325 11.9175 4.725L7.68748 8.955L8.74498 10.0125L12.975 5.775C13.26 5.49 13.26 5.01 12.975 4.725ZM16.155 4.7175L8.74498 12.1275L6.13498 9.525C5.84248 9.2325 5.36998 9.2325 5.07748 9.525C4.78498 9.8175 4.78498 10.29 5.07748 10.5825L8.21248 13.7175C8.50498 14.01 8.97748 14.01 9.26998 13.7175L17.2125 5.7825C17.505 5.49 17.505 5.0175 17.2125 4.725H17.205C16.92 4.425 16.4475 4.425 16.155 4.7175ZM0.83998 10.59L3.97498 13.725C4.26748 14.0175 4.73998 14.0175 5.03248 13.725L5.55748 13.2L1.89748 9.525C1.60498 9.2325 1.13248 9.2325 0.83998 9.525C0.54748 9.8175 0.54748 10.2975 0.83998 10.59Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              `
			}
          ${
				this.counter
					? Be` <div class="text-counter">${this.counter}</div>`
					: ""
			}
        </div>
      </div>
    </div>`;
			}
		};
		(Uo.styles = To),
			Io([Ge()], Uo.prototype, "name", void 0),
			Io([Ge()], Uo.prototype, "counter", void 0),
			Io([Ge()], Uo.prototype, "preview", void 0),
			Io([Ge()], Uo.prototype, "duration", void 0),
			Io([Ge({ type: Boolean })], Uo.prototype, "alternate", void 0),
			(Uo = Io([Ye("agosh-messaging")], Uo));
		var Do = Uo,
			Eo = te`
  ${Je}

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 5rem;
    background-color: var(--surface);
    padding: 1rem 0.75rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 1px 1px #0002;
  }

  .nav--expanded {
    align-items: stretch;
    padding: 1rem;
    width: 16rem;
  }

  .nav--expanded > .header {
    gap: 0.25rem;
    margin-bottom: 2.5rem;
    margin-left: 0.5rem;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 3.25rem;
  }

  .menu-icon {
    display: flex;
    align-items: center;
    border-radius: 24px;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--secondary);
  }

  .menu-icon:hover {
    background-color: var(--secondary-container);
  }

  .nav__footer {
    margin-top: auto;
  }
`;
		const Fo = Be`<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4 8C3.44772 8 3 7.55228 3 7V7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7V7C21 7.55228 20.5523 8 20 8H4ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12V12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12V12ZM3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17V17Z"
    fill="currentColor"
  />
</svg> `,
			Ro = Be`
  <svg
    width="121"
    height="40"
    viewBox="0 0 121 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.632 0.0996523C18.7168 0.457605 18.8512 0.799994 18.6289 2.20586C18.3393 4.05788 17.6982 8.78388 17.269 10.0341C16.7515 11.5246 15.7768 12.8124 14.4847 13.7127C13.1926 14.613 11.6494 15.0796 10.0766 15.0455C8.82013 15.0455 3.95452 14.1428 2.12928 13.8523C1.2089 13.7018 0.288515 13.6603 0.0610057 14.5526C-0.244064 15.6576 0.660804 15.9844 1.31748 16.3009C1.97416 16.6173 2.64634 16.9908 3.3237 17.3384C5.99177 18.7184 9.22344 19.8804 10.5626 22.3134C12.6723 26.0797 11.39 28.5387 9.76636 31.698C9.06832 33.0468 8.38062 34.3697 7.69809 35.7392C7.36717 36.4085 6.88113 37.3422 7.5378 37.9751C8.33926 38.7429 9.11486 38.0426 9.54919 37.6016L12.6051 34.5357C14.7871 32.3517 16.5813 29.9394 20.5938 30.2662C22.1837 30.4112 23.6892 31.0494 24.9009 32.0923C25.8368 33.0001 30.5318 37.9285 31.0592 38.1775C31.2391 38.2723 31.4401 38.3194 31.6433 38.3141C31.8464 38.3089 32.0448 38.2515 32.2196 38.1474C32.3943 38.0434 32.5396 37.8962 32.6415 37.7198C32.7434 37.5434 32.7986 37.3438 32.8017 37.1399C32.8017 36.5848 30.1698 31.6358 29.8234 30.9147C29.0737 29.4102 28.3549 28.3208 28.3343 26.3028C28.3273 25.1221 28.5991 23.9565 29.1276 22.9015C29.656 21.8465 30.4261 20.9321 31.3746 20.2332C31.9932 19.8076 32.6471 19.4362 33.3291 19.123L39.3892 16.0104C39.5613 15.9125 39.7067 15.7737 39.8127 15.606C39.9186 15.4384 39.9818 15.2472 39.9966 15.0493C40.0114 14.8514 39.9774 14.6528 39.8977 14.4712C39.8179 14.2896 39.6947 14.1305 39.5391 14.0079C38.9238 13.5462 37.8483 13.899 37.052 14.0079L34.415 14.4281C32.8638 14.6719 30.5473 15.2011 28.9858 15.0247C27.4446 14.8535 25.9942 14.2074 24.834 13.1753C23.6738 12.1432 22.8608 10.7758 22.5069 9.26115C22.1398 7.61146 21.9278 5.68163 21.6537 3.98525C21.3797 2.28887 21.3642 -0.569563 19.632 0.0996523ZM8.58228 17.2969C12.0156 17.6549 14.2287 16.9442 16.3848 15.2582C18.7582 13.4061 19.3269 11.5334 20.0043 8.89283C20.418 12.7784 23.4583 15.9481 26.8968 17.0168C28.6652 17.5615 29.6373 17.4266 31.4677 17.3281C31.2112 17.5002 30.9454 17.6578 30.6714 17.8001C28.8082 18.9355 27.3744 20.6603 26.5955 22.703C25.8167 24.7458 25.7372 26.9903 26.3694 29.0834C26.5555 29.7474 26.8554 30.2506 27.0416 30.8265C26.5659 30.4633 26.2039 30.0587 25.6145 29.6541C24.1965 28.657 22.541 28.0536 20.8157 27.9051C19.0905 27.7566 17.3568 28.0683 15.7902 28.8085C15.0766 29.1457 13.2049 30.3648 12.9101 30.8835C12.9567 30.5827 13.4272 29.6074 13.5823 29.1353C14.1836 27.201 14.1761 25.1277 13.5608 23.1978C12.9455 21.2679 11.7524 19.5752 10.1438 18.35L8.58228 17.2969Z"
      fill="#5A3399"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.353 34.96C15.9663 35.8834 17.4451 40.7391 20.6405 39.9039C23.836 39.0686 22.5847 34.0729 19.353 34.96Z"
      fill="#DD1E5A"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.04329 23.5801C0.728885 24.1819 1.5717 29.1517 4.90162 28.6226C8.23154 28.0934 7.38354 22.9732 4.04329 23.5801Z"
      fill="#5A3399"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.8402 23.6622C34.1903 23.8477 33.6386 24.2811 33.3033 24.8697C32.9679 25.4582 32.8756 26.1551 33.046 26.8111C33.8733 30.0171 38.863 28.7773 37.9684 25.4727C37.8839 25.1463 37.7355 24.8401 37.5319 24.5718C37.3282 24.3035 37.0734 24.0786 36.7823 23.9101C36.4911 23.7416 36.1695 23.6329 35.8361 23.5903C35.5026 23.5478 35.1641 23.5722 34.8402 23.6622Z"
      fill="#FFB428"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.92267 5.30411C6.50486 6.1134 7.73031 11.0106 10.9878 10.3051C11.6383 10.1467 12.2023 9.74146 12.561 9.17448C12.9197 8.60751 13.0453 7.92304 12.9113 7.26507C12.7734 6.60786 12.3813 6.03235 11.821 5.66475C11.2608 5.29715 10.5781 5.16746 9.92267 5.30411V5.30411Z"
      fill="#00C8FF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.2356 5.30369C25.9212 5.82246 26.6037 10.9064 30.0888 10.341C30.7474 10.2114 31.3288 9.82687 31.7071 9.2706C32.0855 8.71433 32.2304 8.03101 32.1105 7.3684C32.0572 7.04329 31.9405 6.73192 31.767 6.45212C31.5936 6.17232 31.3669 5.92958 31.0999 5.7378C30.8328 5.54602 30.5307 5.40896 30.2108 5.33447C29.8909 5.25998 29.5595 5.24952 29.2356 5.30369V5.30369Z"
      fill="#6DC852"
    />
    <path
      d="M48 30L52.732 10.82H58.92L63.68 30H60.544L59.508 25.884H52.144L51.108 30H48ZM55.14 13.424L52.76 23.14H58.892L56.54 13.424H55.14Z"
      fill="currentColor"
    />
    <path
      d="M78.067 31.904C78.067 34.9653 75.855 36.496 71.431 36.496C69.303 36.496 67.7256 36.2067 66.699 35.628C65.6723 35.0493 65.159 33.9947 65.159 32.464C65.159 31.7733 65.327 31.176 65.663 30.672C65.999 30.1867 66.5403 29.6547 67.287 29.076C66.671 28.6653 66.363 27.984 66.363 27.032C66.363 26.6587 66.615 26.052 67.119 25.212L67.371 24.792C66.027 23.9893 65.355 22.5893 65.355 20.592C65.355 18.912 65.859 17.68 66.867 16.896C67.875 16.112 69.2376 15.72 70.955 15.72C71.7763 15.72 72.5883 15.8133 73.391 16L73.811 16.084L78.151 15.972V18.436L75.827 18.296C76.331 18.9493 76.583 19.7147 76.583 20.592C76.583 22.4213 76.1163 23.6907 75.183 24.4C74.2683 25.0907 72.831 25.436 70.871 25.436C70.3856 25.436 69.975 25.3987 69.639 25.324C69.3776 25.9587 69.247 26.4533 69.247 26.808C69.247 27.144 69.415 27.3773 69.751 27.508C70.1056 27.6387 70.9456 27.7133 72.271 27.732C74.4923 27.7507 76.0136 28.0493 76.835 28.628C77.6563 29.2067 78.067 30.2987 78.067 31.904ZM68.155 32.184C68.155 32.8373 68.4163 33.304 68.939 33.584C69.4616 33.864 70.3576 34.004 71.627 34.004C73.8856 34.004 75.015 33.36 75.015 32.072C75.015 31.344 74.8096 30.8773 74.399 30.672C74.007 30.4853 73.2136 30.3827 72.019 30.364L69.275 30.196C68.8643 30.532 68.575 30.84 68.407 31.12C68.239 31.4187 68.155 31.7733 68.155 32.184ZM68.379 20.592C68.379 21.4507 68.5843 22.0853 68.995 22.496C69.4056 22.888 70.0683 23.084 70.983 23.084C71.8976 23.084 72.551 22.888 72.943 22.496C73.3536 22.0853 73.559 21.4507 73.559 20.592C73.559 19.7333 73.3536 19.108 72.943 18.716C72.5323 18.3053 71.8696 18.1 70.955 18.1C69.2376 18.1 68.379 18.9307 68.379 20.592Z"
      fill="currentColor"
    />
    <path
      d="M81.2979 17.512C82.2686 16.2987 83.8739 15.692 86.1139 15.692C88.3539 15.692 89.9499 16.2987 90.9019 17.512C91.8726 18.7253 92.3579 20.5453 92.3579 22.972C92.3579 25.3987 91.8912 27.228 90.9579 28.46C90.0246 29.692 88.4099 30.308 86.1139 30.308C83.8179 30.308 82.2032 29.692 81.2699 28.46C80.3366 27.228 79.8699 25.3987 79.8699 22.972C79.8699 20.5453 80.3459 18.7253 81.2979 17.512ZM83.5939 26.612C84.0232 27.3587 84.8632 27.732 86.1139 27.732C87.3646 27.732 88.2046 27.3587 88.6339 26.612C89.0632 25.8653 89.2779 24.6427 89.2779 22.944C89.2779 21.2453 89.0446 20.0413 88.5779 19.332C88.1299 18.6227 87.3086 18.268 86.1139 18.268C84.9192 18.268 84.0886 18.6227 83.6219 19.332C83.1739 20.0413 82.9499 21.2453 82.9499 22.944C82.9499 24.6427 83.1646 25.8653 83.5939 26.612Z"
      fill="currentColor"
    />
    <path
      d="M105.106 18.884C102.903 18.5853 101.307 18.436 100.318 18.436C99.3282 18.436 98.6376 18.5573 98.2456 18.8C97.8722 19.024 97.6856 19.388 97.6856 19.892C97.6856 20.396 97.8909 20.7507 98.3016 20.956C98.7309 21.1613 99.7202 21.404 101.27 21.684C102.838 21.9453 103.948 22.3653 104.602 22.944C105.255 23.5227 105.582 24.5493 105.582 26.024C105.582 27.4987 105.106 28.5813 104.154 29.272C103.22 29.9627 101.848 30.308 100.038 30.308C98.8989 30.308 97.4616 30.1493 95.7256 29.832L94.8576 29.692L94.9696 27.144C97.2096 27.4427 98.8242 27.592 99.8136 27.592C100.803 27.592 101.503 27.4707 101.914 27.228C102.343 26.9853 102.558 26.584 102.558 26.024C102.558 25.464 102.352 25.0813 101.942 24.876C101.55 24.652 100.588 24.4187 99.0576 24.176C97.5456 23.9147 96.4349 23.5133 95.7256 22.972C95.0162 22.4307 94.6616 21.4413 94.6616 20.004C94.6616 18.5667 95.1469 17.4933 96.1176 16.784C97.1069 16.0747 98.3669 15.72 99.8976 15.72C101.092 15.72 102.558 15.8693 104.294 16.168L105.162 16.336L105.106 18.884Z"
      fill="currentColor"
    />
    <path
      d="M111.567 30H108.515V10.176H111.567V16.728C112.948 16.0373 114.227 15.692 115.403 15.692C117.269 15.692 118.539 16.224 119.211 17.288C119.901 18.3333 120.247 20.0693 120.247 22.496V30H117.195V22.58C117.195 21.068 117.036 19.9947 116.719 19.36C116.401 18.7253 115.729 18.408 114.703 18.408C113.807 18.408 112.911 18.5573 112.015 18.856L111.567 19.024V30Z"
      fill="currentColor"
    />
  </svg>
`,
			Ho = "nav-expanded";
		var No = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Po = class extends Xe {
			connectedCallback() {
				super.connectedCallback(),
					(this.expanded = this.open),
					this.requestUpdate();
			}
			handleToggleOpen() {
				(this.open = !this.open),
					this.open ? (this.expanded = !0) : (this.expanded = !1),
					this.updateExpandedAttr();
			}
			handleClickMenuIcon() {
				Sr(this, "agosh-toggle"),
					this.handleToggleOpen(),
					this.requestUpdate();
			}
			static get observedAttributes() {
				return ["open"];
			}
			attributeChangedCallback(t) {
				"open" === t && this.handleToggleOpen(), this.requestUpdate();
			}
			updateExpandedAttr() {
				this.navMenu &&
					(this.expanded
						? this.navMenu.setAttribute(Ho, "")
						: this.navMenu.removeAttribute(Ho));
			}
			handleSlotChange(t) {
				var e;
				const r = (
					null === (e = t.target) || void 0 === e
						? void 0
						: e.assignedNodes({ flatten: !0 })
				).find((t) => "AGOSH-NAV-MENU" === t.nodeName);
				r && (this.navMenu = r), this.updateExpandedAttr();
			}
			render() {
				return Be`
      <div
        class=${sr({ nav: !0, "nav--expanded": this.expanded })}
      >
        <div class="header">
          <div class="menu-icon" @click=${this.handleClickMenuIcon}>
            ${Fo}
          </div>

          ${this.expanded ? Ro : ""}
        </div>

        <slot @slotchange=${this.handleSlotChange}></slot>

        <div class="nav__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
			}
		};
		(Po.styles = Eo),
			No([Ge({ type: Boolean })], Po.prototype, "open", void 0),
			No([Ke()], Po.prototype, "expanded", void 0),
			No([Ke()], Po.prototype, "navMenu", void 0),
			(Po = No([Ye("agosh-nav-drawer")], Po));
		var Vo = Po,
			Zo = te`
  ${Je}

  .wrapper {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    display: flex;
    align-items: center;
    color: var(--secondary);
    padding: 1rem;
    width: 100%;
    max-width: 38rem;
  }

  .wrapper--alternate {
    border-radius: 1rem;
    background: linear-gradient(0deg, var(--surface31), var(--surface31)),
      var(--surface30);
  }

  .text-wrapper {
    flex-grow: 1;
    margin-left: 1rem;
  }

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .name {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--on-surface);
    margin-right: 0.25rem;
  }

  .time {
    font-size: var(--m3-label-medium-font-size);
    text-decoration: var(--m3-label-medium-text-decoration);
    font-family: var(--m3-label-medium-font-family);
    font-weight: var(--m3-label-medium-font-weight);
    font-style: var(--m3-label-medium-font-style);
    font-stretch: var(--m3-label-medium-font-stretch);
    letter-spacing: var(--m3-label-medium-letter-spacing);
    line-height: var(--m3-label-medium-line-height);
    color: var(--secondary);
  }

  .circle-text {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface-variant);
    margin-top: 0.25rem;
  }

  .verification {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    color: var(--primary);
    margin-left: 0.75rem;
  }

  .circle-text--active {
    font-weight: 600;
  }

  @media only screen and (max-width: 64rem) {
    .wrapper {
      padding: 0.25rem;
    }
    .text-wrapper {
      margin-left: 0.5rem;
    }

    .verification {
      margin-left: 0;
    }
  }
`,
			Xo = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let qo = class extends Xe {
			constructor() {
				super(...arguments), (this.alternate = !1), (this.active = !1);
			}
			render() {
				return Be`
      <div
        class=${sr({ wrapper: !0, "wrapper--alternate": this.alternate })}
      >
        <slot name="avatar"></slot>
        <div class="text-wrapper">
          <div class="text-top">
            <div class="name">${this.name}</div>
            <div class="time">${this.time}</div>
          </div>

          <div
            class=${sr({
				"circle-text": !0,
				"circle-text--active": this.active,
			})}
          >
            <span>There's a new Agosh Circles</span>
            <a href="#" class="verification">verification request</a>
          </div>
        </div>
      </div>
    `;
			}
		};
		(qo.styles = Zo),
			Xo([Ge()], qo.prototype, "name", void 0),
			Xo([Ge()], qo.prototype, "time", void 0),
			Xo([Ge({ type: Boolean })], qo.prototype, "alternate", void 0),
			Xo(
				[Ge({ type: Boolean, reflect: !0 })],
				qo.prototype,
				"active",
				void 0
			),
			(qo = Xo([Ye("agosh-notification")], qo));
		var Yo = qo,
			Wo = te`
  ${Je}

  .list-wrapper {
    font-size: var(--m3-title-large-font-size);
    text-decoration: var(--m3-title-large-text-decoration);
    font-family: var(--m3-title-large-font-family);
    font-weight: var(--m3-title-large-font-weight);
    font-style: var(--m3-title-large-font-style);
    font-stretch: var(--m3-title-large-font-stretch);
    letter-spacing: var(--m3-title-large-letter-spacing);
    line-height: var(--m3-title-large-line-height);
    padding: 1.5rem;
    border-radius: 1.5rem;
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--surface30);
    width: 100%;
    max-width: 41rem;
    margin: 0 auto;
  }

  .list-top {
    display: flex;
    align-items: center;
  }

  .list-notification-icon-wrapper {
    display: flex;
    align-items: center;
    color: var(--primary);
    margin-right: 0.5rem;
  }

  .list-close-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    color: var(--outline);
  }

  .list-content-wrapper {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }

  .list-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 64rem) {
    .list-wrapper {
      padding: 1rem 0.5rem;
    }

    .list-content-wrapper {
      row-gap: 1rem;
    }
  }
`,
			Go = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ko = class extends Xe {
			handledClickCloseIcon() {
				Sr(this, "close-notification");
			}
			handledClickMarkAllRead() {
				Sr(this, "mark-all-read");
			}
			render() {
				return Be`
      <div class="list-wrapper">
        <div class="list-top">
          <div class="list-notification-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2901 17.29L18.0001 16V11C18.0001 7.93 16.3601 5.36 13.5001 4.68V4C13.5001 3.17 12.8301 2.5 12.0001 2.5C11.1701 2.5 10.5001 3.17 10.5001 4V4.68C7.63005 5.36 6.00005 7.92 6.00005 11V16L4.71005 17.29C4.08005 17.92 4.52005 19 5.41005 19H18.5801C19.4801 19 19.9201 17.92 19.2901 17.29ZM16.0001 17H8.00005V11C8.00005 8.52 9.51005 6.5 12.0001 6.5C14.4901 6.5 16.0001 8.52 16.0001 11V17ZM12.0001 22C13.1001 22 14.0001 21.1 14.0001 20H10.0001C10.0001 21.1 10.8901 22 12.0001 22Z"
                fill="currentColor"
              />
            </svg>
          </div>
          Notifications
          <div class="list-close-wrapper" @click=${this.handledClickCloseIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2997 5.71C17.9097 5.32 17.2797 5.32 16.8897 5.71L11.9997 10.59L7.10973 5.7C6.71973 5.31 6.08973 5.31 5.69973 5.7C5.30973 6.09 5.30973 6.72 5.69973 7.11L10.5897 12L5.69973 16.89C5.30973 17.28 5.30973 17.91 5.69973 18.3C6.08973 18.69 6.71973 18.69 7.10973 18.3L11.9997 13.41L16.8897 18.3C17.2797 18.69 17.9097 18.69 18.2997 18.3C18.6897 17.91 18.6897 17.28 18.2997 16.89L13.4097 12L18.2997 7.11C18.6797 6.73 18.6797 6.09 18.2997 5.71Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div class="list-content-wrapper">
          <slot></slot>
        </div>
        <div class="list-button-wrapper">
          <agosh-button variant="text" @click=${this.handledClickMarkAllRead}
            >Mark all as read</agosh-button
          >
        </div>
      </div>
    `;
			}
		};
		(Ko.styles = Wo), (Ko = Go([Ye("agosh-notification-list")], Ko));
		var Qo = Ko,
			Jo = l`
  ${Q}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`,
			ta = ["sl-radio", "sl-radio-button"],
			ea = class extends G {
				constructor() {
					super(...arguments),
						(this.hasButtonGroup = !1),
						(this.label = ""),
						(this.fieldset = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						this.setAttribute("role", "radiogroup");
				}
				getAllRadios() {
					return [...this.querySelectorAll(ta.join(","))].filter(
						(t) => ta.includes(t.tagName.toLowerCase())
					);
				}
				handleRadioClick(t) {
					const e = t.target.closest(
						ta.map((t) => `${t}:not([disabled])`).join(",")
					);
					e &&
						this.getAllRadios().forEach((t) => {
							(t.checked = t === e),
								(t.input.tabIndex = t === e ? 0 : -1);
						});
				}
				handleKeyDown(t) {
					var e;
					if (
						[
							"ArrowUp",
							"ArrowDown",
							"ArrowLeft",
							"ArrowRight",
						].includes(t.key)
					) {
						const r = this.getAllRadios().filter(
								(t) => !t.disabled
							),
							i =
								null != (e = r.find((t) => t.checked))
									? e
									: r[0],
							o = ["ArrowUp", "ArrowLeft"].includes(t.key)
								? -1
								: 1;
						let a = r.indexOf(i) + o;
						a < 0 && (a = r.length - 1),
							a > r.length - 1 && (a = 0),
							this.getAllRadios().forEach((t) => {
								(t.checked = !1), (t.input.tabIndex = -1);
							}),
							r[a].focus(),
							(r[a].checked = !0),
							(r[a].input.tabIndex = 0),
							t.preventDefault();
					}
				}
				handleSlotChange() {
					const t = this.getAllRadios(),
						e = t.find((t) => t.checked);
					(this.hasButtonGroup = !!t.find(
						(t) => "sl-radio-button" === t.tagName.toLowerCase()
					)),
						t.forEach((t) => {
							t.setAttribute("role", "radio"),
								(t.input.tabIndex = -1);
						}),
						e
							? (e.input.tabIndex = 0)
							: t.length > 0 && (t[0].input.tabIndex = 0);
				}
				render() {
					const t = j`
      <slot @click=${this.handleRadioClick} @keydown=${this.handleKeyDown} @slotchange=${this.handleSlotChange}></slot>
    `;
					return j`
      <fieldset
        part="base"
        class=${st({
			"radio-group": !0,
			"radio-group--has-fieldset": this.fieldset,
		})}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        ${
			this.hasButtonGroup
				? j`<sl-button-group part="button-group">${t}</sl-button-group>`
				: t
		}
      </fieldset>
    `;
				}
			};
		(ea.styles = Jo),
			gt([Ct("slot:not([name])")], ea.prototype, "defaultSlot", 2),
			gt([_t()], ea.prototype, "hasButtonGroup", 2),
			gt([xt()], ea.prototype, "label", 2),
			gt(
				[xt({ type: Boolean, attribute: "fieldset" })],
				ea.prototype,
				"fieldset",
				2
			),
			(ea = gt([yt("sl-radio-group")], ea));
		var ra = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,
			ia = ["sl-button", "sl-radio-button"],
			oa = class extends G {
				constructor() {
					super(...arguments), (this.label = "");
				}
				handleFocus(t) {
					const e = aa(t.target);
					null == e ||
						e.classList.add("sl-button-group__button--focus");
				}
				handleBlur(t) {
					const e = aa(t.target);
					null == e ||
						e.classList.remove("sl-button-group__button--focus");
				}
				handleMouseOver(t) {
					const e = aa(t.target);
					null == e ||
						e.classList.add("sl-button-group__button--hover");
				}
				handleMouseOut(t) {
					const e = aa(t.target);
					null == e ||
						e.classList.remove("sl-button-group__button--hover");
				}
				handleSlotChange() {
					const t = [
						...this.defaultSlot.assignedElements({ flatten: !0 }),
					];
					t.forEach((e) => {
						const r = t.indexOf(e),
							i = aa(e);
						null !== i &&
							(i.classList.add("sl-button-group__button"),
							i.classList.toggle(
								"sl-button-group__button--first",
								0 === r
							),
							i.classList.toggle(
								"sl-button-group__button--inner",
								r > 0 && r < t.length - 1
							),
							i.classList.toggle(
								"sl-button-group__button--last",
								r === t.length - 1
							));
					});
				}
				render() {
					return j`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
				}
			};
		function aa(t) {
			return ia.includes(t.tagName.toLowerCase())
				? t
				: t.querySelector(ia.join(","));
		}
		(oa.styles = ra),
			gt([Ct("slot")], oa.prototype, "defaultSlot", 2),
			gt([xt()], oa.prototype, "label", 2),
			(oa = gt([yt("sl-button-group")], oa));
		var sa = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .radio__icon svg {
    width: 100%;
    height: 100%;
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__input${zr} ~ .radio__control {
    border-color: var(--sl-input-border-color-focus);
    background-color: var(--sl-input-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  .radio.radio--checked:not(.radio--disabled) .radio__input${zr} ~ .radio__control {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`,
			na = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this, {
							value: (t) => (t.checked ? t.value : void 0),
						})),
						(this.hasFocus = !1),
						(this.disabled = !1),
						(this.checked = !1),
						(this.invalid = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						this.setAttribute("role", "radio");
				}
				click() {
					this.input.click();
				}
				focus(t) {
					this.input.focus(t);
				}
				blur() {
					this.input.blur();
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleClick() {
					this.disabled || (this.checked = !0);
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleCheckedChange() {
					this.setAttribute(
						"aria-checked",
						this.checked ? "true" : "false"
					),
						this.hasUpdated && Ht(this, "sl-change");
				}
				handleDisabledChange() {
					this.setAttribute(
						"aria-disabled",
						this.disabled ? "true" : "false"
					),
						this.hasUpdated &&
							((this.input.disabled = this.disabled),
							(this.invalid = !this.input.checkValidity()));
				}
			};
		gt([Ct('input[type="radio"], button')], na.prototype, "input", 2),
			gt([_t()], na.prototype, "hasFocus", 2),
			gt([xt()], na.prototype, "name", 2),
			gt([xt()], na.prototype, "value", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				na.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				na.prototype,
				"checked",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				na.prototype,
				"invalid",
				2
			),
			gt([Rt("checked")], na.prototype, "handleCheckedChange", 1),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				na.prototype,
				"handleDisabledChange",
				1
			);
		var la = class extends na {
			render() {
				return j`
      <label
        part="base"
        class=${st({
			radio: !0,
			"radio--checked": this.checked,
			"radio--disabled": this.disabled,
			"radio--focused": this.hasFocus,
		})}
      >
        <input
          class="radio__input"
          type="radio"
          name=${Ft(this.name)}
          value=${Ft(this.value)}
          .checked=${Bi(this.checked)}
          .disabled=${this.disabled}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>

        <span part="label" class="radio__label">
          <slot></slot>
        </span>
      </label>
    `;
			}
		};
		(la.styles = sa), (la = gt([yt("sl-radio")], la));
		var ca = te`
  ${Je}

  .label-margin-bottom {
    margin-bottom: 1rem;
  }

  ::part(control) {
    color: var(--primary);
    background-color: var(--transparent);
    border: 0.125rem solid var(--primary);
    width: 1.125rem;
    height: 1.125rem;
  }

  ::part(base) {
    --sl-toggle-size: 1rem;
    position: relative;
  }

  ::part(label) {
    margin-left: 1rem;
    color: var(--on-surface-variant);
    text-decoration: var(--m3-body-large-text-decoration);
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  .check--secondary::part(control) {
    color: var(--secondary);
    background-color: var(--transparent);
    border-color: var(--secondary);
  }

  ::part(checked-icon) {
    display: none;
  }

  .svgcheck {
    display: none;
  }

  [checked],
  .check--primary[checked] .svgcheck,
  .check--secondary[checked] .svgcheck,
  .check--checked[checked] .svgcheck,
  .check--self[checked] .svgcheck {
    display: block;
  }

  .check--secondary .svgcheck {
    color: var(--secondary);
  }

  .svgcheck {
    left: 0.25rem;
    position: absolute;
    top: 0.45rem;
    color: var(--primary);
  }
`,
			da = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let ha = class extends Xe {
			constructor() {
				super(...arguments), (this.checked = !1), (this.disabled = !1);
			}
		};
		da([Ge({ type: Boolean })], ha.prototype, "checked", void 0),
			da([Ge({ type: Boolean })], ha.prototype, "disabled", void 0),
			da([Ge()], ha.prototype, "value", void 0),
			da([Ge()], ha.prototype, "name", void 0),
			(ha = da([Ye("agosh-radio")], ha));
		var ua = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let fa = class extends Xe {
			constructor() {
				super(...arguments),
					(this.label = ""),
					(this.disabled = !1),
					(this.value = ""),
					(this.radioItems = []);
			}
			connectedCallback() {
				super.connectedCallback(), this._createRadioItems();
			}
			firstUpdated() {
				var t, e;
				this.value ||
					(this.value =
						null ===
							(e =
								null ===
									(t = this.radioItems.filter(
										(t) => t.checked
									)) || void 0 === t
									? void 0
									: t[0]) || void 0 === e
							? void 0
							: e.value);
			}
			_createRadioItems() {
				const t = [...(this.childNodes || [])]
					.filter((t) => "AGOSH-RADIO" === t.nodeName)
					.map((t) => ({
						name: t.name,
						value: t.value,
						checked: t.checked,
						disabled: t.disabled,
						innerHTML: t.innerHTML,
					}));
				this.radioItems = t;
			}
			handleChange(t) {
				const e = Ai(t, 0);
				e.checked &&
					((this.selectedName = e.name),
					(this.selectedValue = e.value),
					Sr(this, "agosh-change"),
					(this.value = this.selectedValue));
			}
			render() {
				return Be`
      <sl-radio-group label=${this.label}>
        ${this.radioItems.map(
			(t, e) => Be`<sl-radio
              class=${sr({
					"check--primary": "primary" === this.variant,
					"check--secondary": "secondary" === this.variant,
					"check--checked": t.checked,
				})}
              ?checked=${t.checked}
              value=${null == t ? void 0 : t.value}
              name=${null == t ? void 0 : t.name}
              ?disabled=${null == t ? void 0 : t.disabled}
              @sl-change=${this.handleChange}
            >
              ${t.innerHTML}
              ${
					t.checked
						? Be`<svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svgcheck"
                  >
                    <path
                      d="M5 9.5C7.48528 9.5 9.5 7.48528 9.5 5C9.5 2.51472 7.48528 0.5 5 0.5C2.51472 0.5 0.5 2.51472 0.5 5C0.5 7.48528 2.51472 9.5 5 9.5Z"
                      fill="currentColor"
                    />
                  </svg>`
						: ""
				}

              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="svgcheck"
              >
                <path
                  d="M5 9.5C7.48528 9.5 9.5 7.48528 9.5 5C9.5 2.51472 7.48528 0.5 5 0.5C2.51472 0.5 0.5 2.51472 0.5 5C0.5 7.48528 2.51472 9.5 5 9.5Z"
                  fill="currentColor"
                />
              </svg>
            </sl-radio>
            ${
				this.radioItems.length - 1 !== e
					? Be` <div class="label-margin-bottom"></div>`
					: ""
			}`
		)}
      </sl-radio-group>
    `;
			}
		};
		(fa.styles = ca),
			ua([Ge()], fa.prototype, "label", void 0),
			ua(
				[Ge({ type: Boolean, reflect: !0 })],
				fa.prototype,
				"disabled",
				void 0
			),
			ua([Ge()], fa.prototype, "variant", void 0),
			ua([Ge()], fa.prototype, "value", void 0),
			ua([Ke()], fa.prototype, "radioItems", void 0),
			ua([Ke()], fa.prototype, "selectedName", void 0),
			ua([Ke()], fa.prototype, "selectedValue", void 0),
			(fa = ua([Ye("agosh-radio-group")], fa));
		var pa = fa,
			ma = l`
  ${Q}
  ${wo}

  :host {
    display: block;
  }

  .select {
    display: block;
  }

  .select__control {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .select__menu {
    max-height: 50vh;
    overflow: auto;
  }

  /* Standard selects */
  .select--standard .select__control {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    color: var(--sl-input-color);
  }

  .select--standard:not(.select--disabled) .select__control:hover {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
    color: var(--sl-input-color-hover);
  }

  .select--standard.select--focused:not(.select--disabled) .select__control {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    outline: none;
    color: var(--sl-input-color-focus);
  }

  .select--standard.select--disabled .select__control {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  /* Filled selects */
  .select--filled .select__control {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__control {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--focused:not(.select--disabled) .select__control {
    outline: none;
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .select--filled.select--disabled .select__control {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .select__label::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .select__clear {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    width: 1.25em;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: var(--sl-transition-medium) transform ease;
  }

  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color);
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: var(--sl-spacing-2x-small);
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /*
   * Size modifiers
   */

  /* Small */
  .select--small .select__control {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
  }

  .select--small .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .select--small .select__label {
    margin: 0 var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__icon {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__tags {
    padding-bottom: 2px;
  }

  .select--small .select__tags sl-tag {
    padding-top: 2px;
  }

  .select--small .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */
  .select--medium .select__control {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
  }

  .select--medium .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .select--medium .select__label {
    margin: 0 var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__icon {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__tags {
    padding-bottom: 3px;
  }

  .select--medium .select__tags sl-tag {
    padding-top: 3px;
  }

  .select--medium .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Large */
  .select--large .select__control {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
  }

  .select--large .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .select--large .select__label {
    margin: 0 var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__icon {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags sl-tag {
    padding-top: 4px;
  }

  .select--large .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--large.select--has-tags .select__label {
    margin-left: 0;
  }

  /*
   * Pill modifier
   */
  .select--pill.select--small .select__control {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__control {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__control {
    border-radius: var(--sl-input-height-large);
  }
`,
			va = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this)),
						(this.hasSlotController = new wr(
							this,
							"help-text",
							"label"
						)),
						(this.hasFocus = !1),
						(this.isOpen = !1),
						(this.displayLabel = ""),
						(this.displayTags = []),
						(this.multiple = !1),
						(this.maxTagsVisible = 3),
						(this.disabled = !1),
						(this.name = ""),
						(this.placeholder = ""),
						(this.size = "medium"),
						(this.hoist = !1),
						(this.value = ""),
						(this.filled = !1),
						(this.pill = !1),
						(this.label = ""),
						(this.placement = "bottom"),
						(this.helpText = ""),
						(this.required = !1),
						(this.clearable = !1),
						(this.invalid = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.handleMenuSlotChange =
							this.handleMenuSlotChange.bind(this)),
						(this.resizeObserver = new ResizeObserver(() =>
							this.resizeMenu()
						)),
						this.updateComplete.then(() => {
							this.resizeObserver.observe(this),
								this.syncItemsFromValue();
						});
				}
				firstUpdated() {
					this.invalid = !this.input.checkValidity();
				}
				disconnectedCallback() {
					super.disconnectedCallback(),
						this.resizeObserver.unobserve(this);
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				getItemLabel(t) {
					return xr(t.shadowRoot.querySelector("slot:not([name])"));
				}
				getItems() {
					return [...this.querySelectorAll("sl-menu-item")];
				}
				getValueAsArray() {
					return this.multiple && "" === this.value
						? []
						: Array.isArray(this.value)
						? this.value
						: [this.value];
				}
				focus(t) {
					this.control.focus(t);
				}
				blur() {
					this.control.blur();
				}
				handleBlur() {
					this.isOpen || ((this.hasFocus = !1), Ht(this, "sl-blur"));
				}
				handleClearClick(t) {
					t.stopPropagation(),
						(this.value = this.multiple ? [] : ""),
						Ht(this, "sl-clear"),
						this.syncItemsFromValue();
				}
				handleDisabledChange() {
					this.disabled && this.isOpen && this.dropdown.hide(),
						(this.input.disabled = this.disabled),
						(this.invalid = !this.input.checkValidity());
				}
				handleFocus() {
					this.hasFocus ||
						((this.hasFocus = !0), Ht(this, "sl-focus"));
				}
				handleKeyDown(t) {
					const e = t.target,
						r = this.getItems(),
						i = r[0],
						o = r[r.length - 1];
					if ("sl-tag" !== e.tagName.toLowerCase())
						if ("Tab" !== t.key) {
							if (["ArrowDown", "ArrowUp"].includes(t.key)) {
								if (
									(t.preventDefault(),
									this.isOpen || this.dropdown.show(),
									"ArrowDown" === t.key)
								)
									return (
										this.menu.setCurrentItem(i),
										void i.focus()
									);
								if ("ArrowUp" === t.key)
									return (
										this.menu.setCurrentItem(o),
										void o.focus()
									);
							}
							t.ctrlKey ||
								t.metaKey ||
								this.isOpen ||
								1 !== t.key.length ||
								(t.stopPropagation(),
								t.preventDefault(),
								this.dropdown.show(),
								this.menu.typeToSelect(t));
						} else this.isOpen && this.dropdown.hide();
				}
				handleLabelClick() {
					this.focus();
				}
				handleMenuSelect(t) {
					const e = t.detail.item;
					this.multiple
						? (this.value = this.value.includes(e.value)
								? this.value.filter((t) => t !== e.value)
								: [...this.value, e.value])
						: (this.value = e.value),
						this.syncItemsFromValue();
				}
				handleMenuShow() {
					this.resizeMenu(), (this.isOpen = !0);
				}
				handleMenuHide() {
					(this.isOpen = !1), this.control.focus();
				}
				handleMultipleChange() {
					var t;
					const e = this.getValueAsArray();
					(this.value = this.multiple
						? e
						: null != (t = e[0])
						? t
						: ""),
						this.syncItemsFromValue();
				}
				async handleMenuSlotChange() {
					const t = this.getItems(),
						e = [];
					t.forEach((t) => {
						e.includes(t.value) &&
							console.error(
								`Duplicate value found in <sl-select> menu item: '${t.value}'`,
								t
							),
							e.push(t.value);
					}),
						await Promise.all(t.map((t) => t.render)).then(() =>
							this.syncItemsFromValue()
						);
				}
				handleTagInteraction(t) {
					t
						.composedPath()
						.find(
							(t) =>
								t instanceof HTMLElement &&
								t.classList.contains("tag__remove")
						) && t.stopPropagation();
				}
				async handleValueChange() {
					this.syncItemsFromValue(),
						await this.updateComplete,
						(this.invalid = !this.input.checkValidity()),
						Ht(this, "sl-change");
				}
				resizeMenu() {
					(this.menu.style.width = `${this.control.clientWidth}px`),
						this.dropdown.reposition();
				}
				syncItemsFromValue() {
					const t = this.getItems(),
						e = this.getValueAsArray();
					if (
						(t.map((t) => (t.checked = e.includes(t.value))),
						this.multiple)
					) {
						const r = t.filter((t) => e.includes(t.value));
						if (
							((this.displayLabel =
								r.length > 0 ? this.getItemLabel(r[0]) : ""),
							(this.displayTags = r.map(
								(t) => j`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-remove=${(e) => {
				e.stopPropagation(),
					this.disabled ||
						((t.checked = !1), this.syncValueFromItems());
			}}
          >
            ${this.getItemLabel(t)}
          </sl-tag>
        `
							)),
							this.maxTagsVisible > 0 &&
								this.displayTags.length > this.maxTagsVisible)
						) {
							const t = this.displayTags.length;
							(this.displayLabel = ""),
								(this.displayTags = this.displayTags.slice(
									0,
									this.maxTagsVisible
								)),
								this.displayTags.push(j`
          <sl-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button
            "
            variant="neutral"
            size=${this.size}
          >
            +${t - this.maxTagsVisible}
          </sl-tag>
        `);
						}
					} else {
						const r = t.find((t) => t.value === e[0]);
						(this.displayLabel = r ? this.getItemLabel(r) : ""),
							(this.displayTags = []);
					}
				}
				syncValueFromItems() {
					const t = this.getItems()
						.filter((t) => t.checked)
						.map((t) => t.value);
					this.multiple
						? (this.value = this.value.filter((e) => t.includes(e)))
						: (this.value = t.length > 0 ? t[0] : "");
				}
				render() {
					const t = this.hasSlotController.test("label"),
						e = this.hasSlotController.test("help-text"),
						r = this.multiple
							? this.value.length > 0
							: "" !== this.value,
						i = !!this.label || !!t,
						o = !!this.helpText || !!e;
					return j`
      <div
        part="form-control"
        class=${st({
			"form-control": !0,
			"form-control--small": "small" === this.size,
			"form-control--medium": "medium" === this.size,
			"form-control--large": "large" === this.size,
			"form-control--has-label": i,
			"form-control--has-help-text": o,
		})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-dropdown
            part="base"
            .hoist=${this.hoist}
            .placement=${this.placement}
            .stayOpenOnSelect=${this.multiple}
            .containingElement=${this}
            ?disabled=${this.disabled}
            class=${st({
				select: !0,
				"select--open": this.isOpen,
				"select--empty": 0 === this.value.length,
				"select--focused": this.hasFocus,
				"select--clearable": this.clearable,
				"select--disabled": this.disabled,
				"select--multiple": this.multiple,
				"select--standard": !this.filled,
				"select--filled": this.filled,
				"select--has-tags":
					this.multiple && this.displayTags.length > 0,
				"select--placeholder-visible": "" === this.displayLabel,
				"select--small": "small" === this.size,
				"select--medium": "medium" === this.size,
				"select--large": "large" === this.size,
				"select--pill": this.pill,
				"select--invalid": this.invalid,
			})}
            @sl-show=${this.handleMenuShow}
            @sl-hide=${this.handleMenuHide}
          >
            <div
              part="control"
              slot="trigger"
              id="input"
              class="select__control"
              role="combobox"
              aria-describedby="help-text"
              aria-haspopup="true"
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-expanded=${this.isOpen ? "true" : "false"}
              aria-controls="menu"
              tabindex=${this.disabled ? "-1" : "0"}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            >
              <span part="prefix" class="select__prefix">
                <slot name="prefix"></slot>
              </span>

              <div part="display-label" class="select__label">
                ${
					this.displayTags.length > 0
						? j` <span part="tags" class="select__tags"> ${this.displayTags} </span> `
						: this.displayLabel.length > 0
						? this.displayLabel
						: this.placeholder
				}
              </div>

              ${
					this.clearable && r
						? j`
                    <button part="clear-button" class="select__clear" @click=${this.handleClearClick} tabindex="-1">
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `
						: ""
				}

              <span part="suffix" class="select__suffix">
                <slot name="suffix"></slot>
              </span>

              <span part="icon" class="select__icon" aria-hidden="true">
                <sl-icon name="chevron-down" library="system"></sl-icon>
              </span>

              <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
              instead of a select because, otherwise, iOS will show a list of options during validation. The focus
              handler is used to move focus to the primary control when it's marked invalid.  -->
              <input
                class="select__hidden-select"
                aria-hidden="true"
                ?required=${this.required}
                .value=${r ? "1" : ""}
                tabindex="-1"
                @focus=${() => this.control.focus()}
              />
            </div>

            <sl-menu part="menu" id="menu" class="select__menu" @sl-select=${
				this.handleMenuSelect
			}>
              <slot @slotchange=${this.handleMenuSlotChange}></slot>
            </sl-menu>
          </sl-dropdown>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
				}
			};
		(va.styles = ma),
			gt([Ct(".select")], va.prototype, "dropdown", 2),
			gt([Ct(".select__control")], va.prototype, "control", 2),
			gt([Ct(".select__hidden-select")], va.prototype, "input", 2),
			gt([Ct(".select__menu")], va.prototype, "menu", 2),
			gt([_t()], va.prototype, "hasFocus", 2),
			gt([_t()], va.prototype, "isOpen", 2),
			gt([_t()], va.prototype, "displayLabel", 2),
			gt([_t()], va.prototype, "displayTags", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				va.prototype,
				"multiple",
				2
			),
			gt(
				[xt({ attribute: "max-tags-visible", type: Number })],
				va.prototype,
				"maxTagsVisible",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				va.prototype,
				"disabled",
				2
			),
			gt([xt()], va.prototype, "name", 2),
			gt([xt()], va.prototype, "placeholder", 2),
			gt([xt()], va.prototype, "size", 2),
			gt([xt({ type: Boolean })], va.prototype, "hoist", 2),
			gt([xt()], va.prototype, "value", 2),
			gt([xt({ type: Boolean, reflect: !0 })], va.prototype, "filled", 2),
			gt([xt({ type: Boolean, reflect: !0 })], va.prototype, "pill", 2),
			gt([xt()], va.prototype, "label", 2),
			gt([xt()], va.prototype, "placement", 2),
			gt([xt({ attribute: "help-text" })], va.prototype, "helpText", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				va.prototype,
				"required",
				2
			),
			gt([xt({ type: Boolean })], va.prototype, "clearable", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				va.prototype,
				"invalid",
				2
			),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				va.prototype,
				"handleDisabledChange",
				1
			),
			gt([Rt("multiple")], va.prototype, "handleMultipleChange", 1),
			gt(
				[Rt("value", { waitUntilFirstUpdate: !0 })],
				va.prototype,
				"handleValueChange",
				1
			),
			(va = gt([yt("sl-select")], va));
		var ba = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    font-size: 1.4em;
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,
			ga = class extends G {
				constructor() {
					super(...arguments),
						(this.localize = new Yi(this)),
						(this.variant = "neutral"),
						(this.size = "medium"),
						(this.pill = !1),
						(this.removable = !1);
				}
				handleRemoveClick() {
					Ht(this, "sl-remove");
				}
				render() {
					return j`
      <span
        part="base"
        class=${st({
			tag: !0,
			"tag--primary": "primary" === this.variant,
			"tag--success": "success" === this.variant,
			"tag--neutral": "neutral" === this.variant,
			"tag--warning": "warning" === this.variant,
			"tag--danger": "danger" === this.variant,
			"tag--text": "text" === this.variant,
			"tag--small": "small" === this.size,
			"tag--medium": "medium" === this.size,
			"tag--large": "large" === this.size,
			"tag--pill": this.pill,
			"tag--removable": this.removable,
		})}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${
			this.removable
				? j`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            `
				: ""
		}
      </span>
    `;
				}
			};
		function ya(t) {
			return t.split("-")[0];
		}
		function wa(t) {
			return t.split("-")[1];
		}
		function xa(t) {
			return ["top", "bottom"].includes(ya(t)) ? "x" : "y";
		}
		function _a(t) {
			return "y" === t ? "height" : "width";
		}
		function $a(t, e, r) {
			let { reference: i, floating: o } = t;
			const a = i.x + i.width / 2 - o.width / 2,
				s = i.y + i.height / 2 - o.height / 2,
				n = xa(e),
				l = _a(n),
				c = i[l] / 2 - o[l] / 2,
				d = "x" === n;
			let h;
			switch (ya(e)) {
				case "top":
					h = { x: a, y: i.y - o.height };
					break;
				case "bottom":
					h = { x: a, y: i.y + i.height };
					break;
				case "right":
					h = { x: i.x + i.width, y: s };
					break;
				case "left":
					h = { x: i.x - o.width, y: s };
					break;
				default:
					h = { x: i.x, y: i.y };
			}
			switch (wa(e)) {
				case "start":
					h[n] -= c * (r && d ? -1 : 1);
					break;
				case "end":
					h[n] += c * (r && d ? -1 : 1);
			}
			return h;
		}
		function ka(t) {
			return "number" != typeof t
				? (function (t) {
						return mt({ top: 0, right: 0, bottom: 0, left: 0 }, t);
				  })(t)
				: { top: t, right: t, bottom: t, left: t };
		}
		function Ca(t) {
			return vt(mt({}, t), {
				top: t.y,
				left: t.x,
				right: t.x + t.width,
				bottom: t.y + t.height,
			});
		}
		async function za(t, e) {
			var r;
			void 0 === e && (e = {});
			const {
					x: i,
					y: o,
					platform: a,
					rects: s,
					elements: n,
					strategy: l,
				} = t,
				{
					boundary: c = "clippingAncestors",
					rootBoundary: d = "viewport",
					elementContext: h = "floating",
					altBoundary: u = !1,
					padding: f = 0,
				} = e,
				p = ka(f),
				m = n[u ? ("floating" === h ? "reference" : "floating") : h],
				v = Ca(
					await a.getClippingRect({
						element:
							null ==
								(r = await (null == a.isElement
									? void 0
									: a.isElement(m))) || r
								? m
								: m.contextElement ||
								  (await (null == a.getDocumentElement
										? void 0
										: a.getDocumentElement(n.floating))),
						boundary: c,
						rootBoundary: d,
					})
				),
				b = Ca(
					a.convertOffsetParentRelativeRectToViewportRelativeRect
						? await a.convertOffsetParentRelativeRectToViewportRelativeRect(
								{
									rect:
										"floating" === h
											? vt(mt({}, s.floating), {
													x: i,
													y: o,
											  })
											: s.reference,
									offsetParent: await (null ==
									a.getOffsetParent
										? void 0
										: a.getOffsetParent(n.floating)),
									strategy: l,
								}
						  )
						: s[h]
				);
			return {
				top: v.top - b.top + p.top,
				bottom: b.bottom - v.bottom + p.bottom,
				left: v.left - b.left + p.left,
				right: b.right - v.right + p.right,
			};
		}
		(ga.styles = ba),
			gt([xt({ reflect: !0 })], ga.prototype, "variant", 2),
			gt([xt({ reflect: !0 })], ga.prototype, "size", 2),
			gt([xt({ type: Boolean, reflect: !0 })], ga.prototype, "pill", 2),
			gt([xt({ type: Boolean })], ga.prototype, "removable", 2),
			(ga = gt([yt("sl-tag")], ga));
		var Ba = Math.min,
			Oa = Math.max;
		function Sa(t, e, r) {
			return Oa(t, Ba(e, r));
		}
		var La = { left: "right", right: "left", bottom: "top", top: "bottom" };
		function Aa(t) {
			return t.replace(/left|right|bottom|top/g, (t) => La[t]);
		}
		var Ma = { start: "end", end: "start" };
		function ja(t) {
			return t.replace(/start|end/g, (t) => Ma[t]);
		}
		var Ta = function (t) {
				return (
					void 0 === t && (t = {}),
					{
						name: "flip",
						options: t,
						async fn(e) {
							var r;
							const {
									placement: i,
									middlewareData: o,
									rects: a,
									initialPlacement: s,
									platform: n,
									elements: l,
								} = e,
								c = t,
								{
									mainAxis: d = !0,
									crossAxis: h = !0,
									fallbackPlacements: u,
									fallbackStrategy: f = "bestFit",
									flipAlignment: p = !0,
								} = c,
								m = bt(c, [
									"mainAxis",
									"crossAxis",
									"fallbackPlacements",
									"fallbackStrategy",
									"flipAlignment",
								]),
								v = ya(i),
								b = [
									s,
									...(u ||
										(v !== s && p
											? (function (t) {
													const e = Aa(t);
													return [ja(t), e, ja(e)];
											  })(s)
											: [Aa(s)])),
								],
								g = await za(e, m),
								y = [];
							let w =
								(null == (r = o.flip) ? void 0 : r.overflows) ||
								[];
							if ((d && y.push(g[v]), h)) {
								const { main: t, cross: e } = (function (
									t,
									e,
									r
								) {
									void 0 === r && (r = !1);
									const i = wa(t),
										o = xa(t),
										a = _a(o);
									let s =
										"x" === o
											? i === (r ? "end" : "start")
												? "right"
												: "left"
											: "start" === i
											? "bottom"
											: "top";
									return (
										e.reference[a] > e.floating[a] &&
											(s = Aa(s)),
										{ main: s, cross: Aa(s) }
									);
								})(
									i,
									a,
									await (null == n.isRTL
										? void 0
										: n.isRTL(l.floating))
								);
								y.push(g[t], g[e]);
							}
							if (
								((w = [...w, { placement: i, overflows: y }]),
								!y.every((t) => t <= 0))
							) {
								var x, _;
								const t =
										(null !=
										(x =
											null == (_ = o.flip)
												? void 0
												: _.index)
											? x
											: 0) + 1,
									e = b[t];
								if (e)
									return {
										data: { index: t, overflows: w },
										reset: { skip: !1, placement: e },
									};
								let r = "bottom";
								switch (f) {
									case "bestFit": {
										var $;
										const t =
											null ==
											($ = w
												.slice()
												.sort(
													(t, e) =>
														t.overflows
															.filter(
																(t) => t > 0
															)
															.reduce(
																(t, e) => t + e,
																0
															) -
														e.overflows
															.filter(
																(t) => t > 0
															)
															.reduce(
																(t, e) => t + e,
																0
															)
												)[0])
												? void 0
												: $.placement;
										t && (r = t);
										break;
									}
									case "initialPlacement":
										r = s;
								}
								return { reset: { placement: r } };
							}
							return {};
						},
					}
				);
			},
			Ia = function (t) {
				return (
					void 0 === t && (t = 0),
					{
						name: "offset",
						options: t,
						async fn(e) {
							const {
									x: r,
									y: i,
									placement: o,
									rects: a,
									platform: s,
									elements: n,
								} = e,
								l = (function (t, e, r, i) {
									void 0 === i && (i = !1);
									const o = ya(t),
										a = wa(t),
										s = "x" === xa(t),
										n = ["left", "top"].includes(o)
											? -1
											: 1;
									let l = 1;
									"end" === a && (l = -1),
										i && s && (l *= -1);
									const c =
											"function" == typeof r
												? r(
														vt(mt({}, e), {
															placement: t,
														})
												  )
												: r,
										{ mainAxis: d, crossAxis: h } =
											"number" == typeof c
												? { mainAxis: c, crossAxis: 0 }
												: mt(
														{
															mainAxis: 0,
															crossAxis: 0,
														},
														c
												  );
									return s
										? { x: h * l, y: d * n }
										: { x: d * n, y: h * l };
								})(
									o,
									a,
									t,
									await (null == s.isRTL
										? void 0
										: s.isRTL(n.floating))
								);
							return { x: r + l.x, y: i + l.y, data: l };
						},
					}
				);
			},
			Ua = function (t) {
				return (
					void 0 === t && (t = {}),
					{
						name: "shift",
						options: t,
						async fn(e) {
							const { x: r, y: i, placement: o } = e,
								a = t,
								{
									mainAxis: s = !0,
									crossAxis: n = !1,
									limiter: l = {
										fn: (t) => {
											let { x: e, y: r } = t;
											return { x: e, y: r };
										},
									},
								} = a,
								c = bt(a, ["mainAxis", "crossAxis", "limiter"]),
								d = { x: r, y: i },
								h = await za(e, c),
								u = xa(ya(o)),
								f = "x" === u ? "y" : "x";
							let p = d[u],
								m = d[f];
							if (s) {
								const t = "y" === u ? "bottom" : "right";
								p = Sa(
									p + h["y" === u ? "top" : "left"],
									p,
									p - h[t]
								);
							}
							if (n) {
								const t = "y" === f ? "bottom" : "right";
								m = Sa(
									m + h["y" === f ? "top" : "left"],
									m,
									m - h[t]
								);
							}
							const v = l.fn(vt(mt({}, e), { [u]: p, [f]: m }));
							return vt(mt({}, v), {
								data: { x: v.x - r, y: v.y - i },
							});
						},
					}
				);
			};
		function Da(t) {
			return "[object Window]" === (null == t ? void 0 : t.toString());
		}
		function Ea(t) {
			if (null == t) return window;
			if (!Da(t)) {
				const e = t.ownerDocument;
				return (e && e.defaultView) || window;
			}
			return t;
		}
		function Fa(t) {
			return Ea(t).getComputedStyle(t);
		}
		function Ra(t) {
			return Da(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
		}
		function Ha(t) {
			return t instanceof Ea(t).HTMLElement;
		}
		function Na(t) {
			return t instanceof Ea(t).Element;
		}
		function Pa(t) {
			return t instanceof Ea(t).ShadowRoot || t instanceof ShadowRoot;
		}
		function Va(t) {
			const { overflow: e, overflowX: r, overflowY: i } = Fa(t);
			return /auto|scroll|overlay|hidden/.test(e + i + r);
		}
		function Za(t) {
			return ["table", "td", "th"].includes(Ra(t));
		}
		function Xa(t) {
			const e = navigator.userAgent.toLowerCase().includes("firefox"),
				r = Fa(t);
			return (
				"none" !== r.transform ||
				"none" !== r.perspective ||
				"paint" === r.contain ||
				["transform", "perspective"].includes(r.willChange) ||
				(e && "filter" === r.willChange) ||
				(e && !!r.filter && "none" !== r.filter)
			);
		}
		var qa = Math.min,
			Ya = Math.max,
			Wa = Math.round;
		function Ga(t, e) {
			void 0 === e && (e = !1);
			const r = t.getBoundingClientRect();
			let i = 1,
				o = 1;
			return (
				e &&
					Ha(t) &&
					((i =
						(t.offsetWidth > 0 && Wa(r.width) / t.offsetWidth) ||
						1),
					(o =
						(t.offsetHeight > 0 && Wa(r.height) / t.offsetHeight) ||
						1)),
				{
					width: r.width / i,
					height: r.height / o,
					top: r.top / o,
					right: r.right / i,
					bottom: r.bottom / o,
					left: r.left / i,
					x: r.left / i,
					y: r.top / o,
				}
			);
		}
		function Ka(t) {
			return ((e = t),
			(e instanceof Ea(e).Node ? t.ownerDocument : t.document) ||
				window.document).documentElement;
			var e;
		}
		function Qa(t) {
			return Da(t)
				? { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
				: { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
		}
		function Ja(t) {
			return Ga(Ka(t)).left + Qa(t).scrollLeft;
		}
		function ts(t, e, r) {
			const i = Ha(e),
				o = Ka(e),
				a = Ga(
					t,
					i &&
						(function (t) {
							const e = Ga(t);
							return (
								Wa(e.width) !== t.offsetWidth ||
								Wa(e.height) !== t.offsetHeight
							);
						})(e)
				);
			let s = { scrollLeft: 0, scrollTop: 0 };
			const n = { x: 0, y: 0 };
			if (i || (!i && "fixed" !== r))
				if ((("body" !== Ra(e) || Va(o)) && (s = Qa(e)), Ha(e))) {
					const t = Ga(e, !0);
					(n.x = t.x + e.clientLeft), (n.y = t.y + e.clientTop);
				} else o && (n.x = Ja(o));
			return {
				x: a.left + s.scrollLeft - n.x,
				y: a.top + s.scrollTop - n.y,
				width: a.width,
				height: a.height,
			};
		}
		function es(t) {
			return "html" === Ra(t)
				? t
				: t.assignedSlot ||
						t.parentNode ||
						(Pa(t) ? t.host : null) ||
						Ka(t);
		}
		function rs(t) {
			return Ha(t) && "fixed" !== getComputedStyle(t).position
				? t.offsetParent
				: null;
		}
		function is(t) {
			const e = Ea(t);
			let r = rs(t);
			for (; r && Za(r) && "static" === getComputedStyle(r).position; )
				r = rs(r);
			return r &&
				("html" === Ra(r) ||
					("body" === Ra(r) &&
						"static" === getComputedStyle(r).position &&
						!Xa(r)))
				? e
				: r ||
						(function (t) {
							let e = es(t);
							for (
								Pa(e) && (e = e.host);
								Ha(e) && !["html", "body"].includes(Ra(e));

							) {
								if (Xa(e)) return e;
								e = e.parentNode;
							}
							return null;
						})(t) ||
						e;
		}
		function os(t) {
			if (Ha(t)) return { width: t.offsetWidth, height: t.offsetHeight };
			const e = Ga(t);
			return { width: e.width, height: e.height };
		}
		function as(t) {
			return ["html", "body", "#document"].includes(Ra(t))
				? t.ownerDocument.body
				: Ha(t) && Va(t)
				? t
				: as(es(t));
		}
		function ss(t, e) {
			var r;
			void 0 === e && (e = []);
			const i = as(t),
				o = i === (null == (r = t.ownerDocument) ? void 0 : r.body),
				a = Ea(i),
				s = o ? [a].concat(a.visualViewport || [], Va(i) ? i : []) : i,
				n = e.concat(s);
			return o ? n : n.concat(ss(es(s)));
		}
		function ns(t, e) {
			return "viewport" === e
				? Ca(
						(function (t) {
							const e = Ea(t),
								r = Ka(t),
								i = e.visualViewport;
							let o = r.clientWidth,
								a = r.clientHeight,
								s = 0,
								n = 0;
							return (
								i &&
									((o = i.width),
									(a = i.height),
									Math.abs(e.innerWidth / i.scale - i.width) <
										0.01 &&
										((s = i.offsetLeft),
										(n = i.offsetTop))),
								{ width: o, height: a, x: s, y: n }
							);
						})(t)
				  )
				: Na(e)
				? (function (t) {
						const e = Ga(t),
							r = e.top + t.clientTop,
							i = e.left + t.clientLeft;
						return {
							top: r,
							left: i,
							x: i,
							y: r,
							right: i + t.clientWidth,
							bottom: r + t.clientHeight,
							width: t.clientWidth,
							height: t.clientHeight,
						};
				  })(e)
				: Ca(
						(function (t) {
							var e;
							const r = Ka(t),
								i = Qa(t),
								o =
									null == (e = t.ownerDocument)
										? void 0
										: e.body,
								a = Ya(
									r.scrollWidth,
									r.clientWidth,
									o ? o.scrollWidth : 0,
									o ? o.clientWidth : 0
								),
								s = Ya(
									r.scrollHeight,
									r.clientHeight,
									o ? o.scrollHeight : 0,
									o ? o.clientHeight : 0
								);
							let n = -i.scrollLeft + Ja(t);
							const l = -i.scrollTop;
							return (
								"rtl" === Fa(o || r).direction &&
									(n +=
										Ya(
											r.clientWidth,
											o ? o.clientWidth : 0
										) - a),
								{ width: a, height: s, x: n, y: l }
							);
						})(Ka(t))
				  );
		}
		function ls(t) {
			const e = ss(es(t)),
				r =
					["absolute", "fixed"].includes(Fa(t).position) && Ha(t)
						? is(t)
						: t;
			return Na(r)
				? e.filter(
						(t) =>
							Na(t) &&
							(function (t, e) {
								const r =
									null == e.getRootNode
										? void 0
										: e.getRootNode();
								if (t.contains(e)) return !0;
								if (r && Pa(r)) {
									let r = e;
									do {
										if (r && t === r) return !0;
										r = r.parentNode || r.host;
									} while (r);
								}
								return !1;
							})(t, r) &&
							"body" !== Ra(t)
				  )
				: [];
		}
		var cs = {
			getClippingRect: function (t) {
				let { element: e, boundary: r, rootBoundary: i } = t;
				const o = [
						...("clippingAncestors" === r ? ls(e) : [].concat(r)),
						i,
					],
					a = o[0],
					s = o.reduce((t, r) => {
						const i = ns(e, r);
						return (
							(t.top = Ya(i.top, t.top)),
							(t.right = qa(i.right, t.right)),
							(t.bottom = qa(i.bottom, t.bottom)),
							(t.left = Ya(i.left, t.left)),
							t
						);
					}, ns(e, a));
				return {
					width: s.right - s.left,
					height: s.bottom - s.top,
					x: s.left,
					y: s.top,
				};
			},
			convertOffsetParentRelativeRectToViewportRelativeRect: function (
				t
			) {
				let { rect: e, offsetParent: r, strategy: i } = t;
				const o = Ha(r),
					a = Ka(r);
				if (r === a) return e;
				let s = { scrollLeft: 0, scrollTop: 0 };
				const n = { x: 0, y: 0 };
				if (
					(o || (!o && "fixed" !== i)) &&
					(("body" !== Ra(r) || Va(a)) && (s = Qa(r)), Ha(r))
				) {
					const t = Ga(r, !0);
					(n.x = t.x + r.clientLeft), (n.y = t.y + r.clientTop);
				}
				return vt(mt({}, e), {
					x: e.x - s.scrollLeft + n.x,
					y: e.y - s.scrollTop + n.y,
				});
			},
			isElement: Na,
			getDimensions: os,
			getOffsetParent: is,
			getDocumentElement: Ka,
			getElementRects: (t) => {
				let { reference: e, floating: r, strategy: i } = t;
				return {
					reference: ts(e, is(r), i),
					floating: vt(mt({}, os(r)), { x: 0, y: 0 }),
				};
			},
			getClientRects: (t) => Array.from(t.getClientRects()),
			isRTL: (t) => "rtl" === Fa(t).direction,
		};
		function ds(t, e, r, i) {
			void 0 === i && (i = {});
			const {
				ancestorScroll: o = !0,
				ancestorResize: a = !0,
				elementResize: s = !0,
				animationFrame: n = !1,
			} = i;
			let l = !1;
			const c = o && !n,
				d = a && !n,
				h = s && !n,
				u = c || d ? [...(Na(t) ? ss(t) : []), ...ss(e)] : [];
			u.forEach((t) => {
				c && t.addEventListener("scroll", r, { passive: !0 }),
					d && t.addEventListener("resize", r);
			});
			let f,
				p = null;
			h &&
				((p = new ResizeObserver(r)),
				Na(t) && p.observe(t),
				p.observe(e));
			let m = n ? Ga(t) : null;
			return (
				n &&
					(function e() {
						if (l) return;
						const i = Ga(t);
						!m ||
							(i.x === m.x &&
								i.y === m.y &&
								i.width === m.width &&
								i.height === m.height) ||
							r(),
							(m = i),
							(f = requestAnimationFrame(e));
					})(),
				() => {
					var t;
					(l = !0),
						u.forEach((t) => {
							c && t.removeEventListener("scroll", r),
								d && t.removeEventListener("resize", r);
						}),
						null == (t = p) || t.disconnect(),
						(p = null),
						n && cancelAnimationFrame(f);
				}
			);
		}
		var hs = (t, e, r) =>
				(async (t, e, r) => {
					const {
							placement: i = "bottom",
							strategy: o = "absolute",
							middleware: a = [],
							platform: s,
						} = r,
						n = await (null == s.isRTL ? void 0 : s.isRTL(e));
					let l = await s.getElementRects({
							reference: t,
							floating: e,
							strategy: o,
						}),
						{ x: c, y: d } = $a(l, i, n),
						h = i,
						u = {};
					const f = new Set();
					for (let r = 0; r < a.length; r++) {
						const { name: p, fn: m } = a[r];
						if (f.has(p)) continue;
						const {
							x: v,
							y: b,
							data: g,
							reset: y,
						} = await m({
							x: c,
							y: d,
							initialPlacement: i,
							placement: h,
							strategy: o,
							middlewareData: u,
							rects: l,
							platform: s,
							elements: { reference: t, floating: e },
						});
						(c = null != v ? v : c),
							(d = null != b ? b : d),
							(u = vt(mt({}, u), { [p]: mt(mt({}, u[p]), g) })),
							y &&
								("object" == typeof y &&
									(y.placement && (h = y.placement),
									y.rects &&
										(l =
											!0 === y.rects
												? await s.getElementRects({
														reference: t,
														floating: e,
														strategy: o,
												  })
												: y.rects),
									({ x: c, y: d } = $a(l, h, n)),
									!1 !== y.skip && f.add(p)),
								(r = -1));
					}
					return {
						x: c,
						y: d,
						placement: h,
						strategy: o,
						middlewareData: u,
					};
				})(t, e, mt({ platform: cs }, r)),
			us = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`,
			fs = class extends G {
				constructor() {
					super(...arguments),
						(this.open = !1),
						(this.placement = "bottom-start"),
						(this.disabled = !1),
						(this.stayOpenOnSelect = !1),
						(this.distance = 0),
						(this.skidding = 0),
						(this.hoist = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.handleMenuItemActivate =
							this.handleMenuItemActivate.bind(this)),
						(this.handlePanelSelect =
							this.handlePanelSelect.bind(this)),
						(this.handleDocumentKeyDown =
							this.handleDocumentKeyDown.bind(this)),
						(this.handleDocumentMouseDown =
							this.handleDocumentMouseDown.bind(this)),
						this.containingElement ||
							(this.containingElement = this);
				}
				async firstUpdated() {
					(this.panel.hidden = !this.open),
						this.open &&
							(await this.updateComplete, this.startPositioner());
				}
				disconnectedCallback() {
					super.disconnectedCallback(),
						this.hide(),
						this.stopPositioner();
				}
				focusOnTrigger() {
					const t = this.trigger
						.querySelector("slot")
						.assignedElements({ flatten: !0 })[0];
					"function" == typeof (null == t ? void 0 : t.focus) &&
						t.focus();
				}
				getMenu() {
					return this.panel
						.querySelector("slot")
						.assignedElements({ flatten: !0 })
						.find((t) => "sl-menu" === t.tagName.toLowerCase());
				}
				handleDocumentKeyDown(t) {
					var e;
					if ("Escape" === t.key)
						return this.hide(), void this.focusOnTrigger();
					if ("Tab" === t.key) {
						if (
							this.open &&
							"sl-menu-item" ===
								(null == (e = document.activeElement)
									? void 0
									: e.tagName.toLowerCase())
						)
							return (
								t.preventDefault(),
								this.hide(),
								void this.focusOnTrigger()
							);
						setTimeout(() => {
							var t, e, r;
							const i =
								(null == (t = this.containingElement)
									? void 0
									: t.getRootNode()) instanceof ShadowRoot
									? null ==
									  (r =
											null == (e = document.activeElement)
												? void 0
												: e.shadowRoot)
										? void 0
										: r.activeElement
									: document.activeElement;
							(this.containingElement &&
								(null == i
									? void 0
									: i.closest(
											this.containingElement.tagName.toLowerCase()
									  )) === this.containingElement) ||
								this.hide();
						});
					}
				}
				handleDocumentMouseDown(t) {
					const e = t.composedPath();
					this.containingElement &&
						!e.includes(this.containingElement) &&
						this.hide();
				}
				handleMenuItemActivate(t) {
					Hi(t.target, this.panel);
				}
				handlePanelSelect(t) {
					const e = t.target;
					this.stayOpenOnSelect ||
						"sl-menu" !== e.tagName.toLowerCase() ||
						(this.hide(), this.focusOnTrigger());
				}
				handlePopoverOptionsChange() {
					this.updatePositioner();
				}
				handleTriggerClick() {
					this.open ? this.hide() : this.show();
				}
				handleTriggerKeyDown(t) {
					const e = this.getMenu(),
						r = e.defaultSlot.assignedElements({ flatten: !0 }),
						i = r[0],
						o = r[r.length - 1];
					return "Escape" === t.key
						? (this.focusOnTrigger(), void this.hide())
						: [" ", "Enter"].includes(t.key)
						? (t.preventDefault(), void this.handleTriggerClick())
						: (["ArrowDown", "ArrowUp", "Home", "End"].includes(
								t.key
						  ) &&
								(t.preventDefault(),
								this.open || this.show(),
								requestAnimationFrame(() => {
									("ArrowDown" !== t.key &&
										"Home" !== t.key) ||
										(e.setCurrentItem(i), i.focus()),
										("ArrowUp" !== t.key &&
											"End" !== t.key) ||
											(e.setCurrentItem(o), o.focus());
								})),
						  void (
								this.open &&
								![
									"Tab",
									"Shift",
									"Meta",
									"Ctrl",
									"Alt",
								].includes(t.key) &&
								e.typeToSelect(t)
						  ));
				}
				handleTriggerKeyUp(t) {
					" " === t.key && t.preventDefault();
				}
				handleTriggerSlotChange() {
					this.updateAccessibleTrigger();
				}
				updateAccessibleTrigger() {
					const t = this.trigger
						.querySelector("slot")
						.assignedElements({ flatten: !0 })
						.find((t) => Ui(t).start);
					let e;
					if (t) {
						switch (t.tagName.toLowerCase()) {
							case "sl-button":
							case "sl-icon-button":
								e = t.button;
								break;
							default:
								e = t;
						}
						e.setAttribute("aria-haspopup", "true"),
							e.setAttribute(
								"aria-expanded",
								this.open ? "true" : "false"
							);
					}
				}
				async show() {
					if (!this.open)
						return (this.open = !0), Nt(this, "sl-after-show");
				}
				async hide() {
					if (this.open)
						return (this.open = !1), Nt(this, "sl-after-hide");
				}
				reposition() {
					this.updatePositioner();
				}
				async handleOpenChange() {
					if (this.disabled) this.open = !1;
					else if ((this.updateAccessibleTrigger(), this.open)) {
						Ht(this, "sl-show"),
							this.panel.addEventListener(
								"sl-activate",
								this.handleMenuItemActivate
							),
							this.panel.addEventListener(
								"sl-select",
								this.handlePanelSelect
							),
							document.addEventListener(
								"keydown",
								this.handleDocumentKeyDown
							),
							document.addEventListener(
								"mousedown",
								this.handleDocumentMouseDown
							),
							await pr(this),
							this.startPositioner(),
							(this.panel.hidden = !1);
						const { keyframes: t, options: e } = yr(
							this,
							"dropdown.show"
						);
						await ur(this.panel, t, e), Ht(this, "sl-after-show");
					} else {
						Ht(this, "sl-hide"),
							this.panel.removeEventListener(
								"sl-activate",
								this.handleMenuItemActivate
							),
							this.panel.removeEventListener(
								"sl-select",
								this.handlePanelSelect
							),
							document.removeEventListener(
								"keydown",
								this.handleDocumentKeyDown
							),
							document.removeEventListener(
								"mousedown",
								this.handleDocumentMouseDown
							),
							await pr(this);
						const { keyframes: t, options: e } = yr(
							this,
							"dropdown.hide"
						);
						await ur(this.panel, t, e),
							(this.panel.hidden = !0),
							this.stopPositioner(),
							Ht(this, "sl-after-hide");
					}
				}
				startPositioner() {
					this.stopPositioner(),
						this.updatePositioner(),
						(this.positionerCleanup = ds(
							this.trigger,
							this.positioner,
							this.updatePositioner.bind(this)
						));
				}
				updatePositioner() {
					var t;
					this.open &&
						this.trigger &&
						this.positioner &&
						hs(this.trigger, this.positioner, {
							placement: this.placement,
							middleware: [
								Ia({
									mainAxis: this.distance,
									crossAxis: this.skidding,
								}),
								Ta(),
								Ua(),
								((t = {
									apply: ({ width: t, height: e }) => {
										Object.assign(this.panel.style, {
											maxWidth: `${t}px`,
											maxHeight: `${e}px`,
										});
									},
									padding: 8,
								}),
								void 0 === t && (t = {}),
								{
									name: "size",
									options: t,
									async fn(e) {
										const {
												placement: r,
												rects: i,
												platform: o,
												elements: a,
											} = e,
											s = t,
											{ apply: n } = s,
											l = bt(s, ["apply"]),
											c = await za(e, l),
											d = ya(r),
											h = wa(r);
										let u, f;
										"top" === d || "bottom" === d
											? ((u = d),
											  (f =
													h ===
													((await (null == o.isRTL
														? void 0
														: o.isRTL(a.floating)))
														? "start"
														: "end")
														? "left"
														: "right"))
											: ((f = d),
											  (u =
													"end" === h
														? "top"
														: "bottom"));
										const p = Oa(c.left, 0),
											m = Oa(c.right, 0),
											v = Oa(c.top, 0),
											b = Oa(c.bottom, 0),
											g = {
												height:
													i.floating.height -
													(["left", "right"].includes(
														r
													)
														? 2 *
														  (0 !== v || 0 !== b
																? v + b
																: Oa(
																		c.top,
																		c.bottom
																  ))
														: c[u]),
												width:
													i.floating.width -
													(["top", "bottom"].includes(
														r
													)
														? 2 *
														  (0 !== p || 0 !== m
																? p + m
																: Oa(
																		c.left,
																		c.right
																  ))
														: c[f]),
											};
										return (
											null == n || n(mt(mt({}, g), i)),
											{ reset: { rects: !0 } }
										);
									},
								}),
							],
							strategy: this.hoist ? "fixed" : "absolute",
						}).then(({ x: t, y: e, placement: r }) => {
							this.positioner.setAttribute("data-placement", r),
								Object.assign(this.positioner.style, {
									position: this.hoist ? "fixed" : "absolute",
									left: `${t}px`,
									top: `${e}px`,
								});
						});
				}
				stopPositioner() {
					this.positionerCleanup &&
						(this.positionerCleanup(),
						(this.positionerCleanup = void 0),
						this.positioner.removeAttribute("data-placement"));
				}
				render() {
					return j`
      <div
        part="base"
        id="dropdown"
        class=${st({ dropdown: !0, "dropdown--open": this.open })}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${
				this.handleTriggerSlotChange
			}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open ? "false" : "true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
				}
			};
		(fs.styles = us),
			gt([Ct(".dropdown__trigger")], fs.prototype, "trigger", 2),
			gt([Ct(".dropdown__panel")], fs.prototype, "panel", 2),
			gt([Ct(".dropdown__positioner")], fs.prototype, "positioner", 2),
			gt([xt({ type: Boolean, reflect: !0 })], fs.prototype, "open", 2),
			gt([xt({ reflect: !0 })], fs.prototype, "placement", 2),
			gt([xt({ type: Boolean })], fs.prototype, "disabled", 2),
			gt(
				[
					xt({
						attribute: "stay-open-on-select",
						type: Boolean,
						reflect: !0,
					}),
				],
				fs.prototype,
				"stayOpenOnSelect",
				2
			),
			gt([xt({ attribute: !1 })], fs.prototype, "containingElement", 2),
			gt([xt({ type: Number })], fs.prototype, "distance", 2),
			gt([xt({ type: Number })], fs.prototype, "skidding", 2),
			gt([xt({ type: Boolean })], fs.prototype, "hoist", 2),
			gt(
				[Rt("distance"), Rt("hoist"), Rt("placement"), Rt("skidding")],
				fs.prototype,
				"handlePopoverOptionsChange",
				1
			),
			gt(
				[Rt("open", { waitUntilFirstUpdate: !0 })],
				fs.prototype,
				"handleOpenChange",
				1
			),
			(fs = gt([yt("sl-dropdown")], fs)),
			gr("dropdown.show", {
				keyframes: [
					{ opacity: 0, transform: "scale(0.9)" },
					{ opacity: 1, transform: "scale(1)" },
				],
				options: { duration: 100, easing: "ease" },
			}),
			gr("dropdown.hide", {
				keyframes: [
					{ opacity: 1, transform: "scale(1)" },
					{ opacity: 0, transform: "scale(0.9)" },
				],
				options: { duration: 100, easing: "ease" },
			});
		var ps = l`
  ${Q}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    text-align: left;
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${zr}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`,
			ms = class extends G {
				constructor() {
					super(...arguments),
						(this.checked = !1),
						(this.value = ""),
						(this.disabled = !1);
				}
				firstUpdated() {
					this.setAttribute("role", "menuitem");
				}
				handleCheckedChange() {
					this.setAttribute(
						"aria-checked",
						this.checked ? "true" : "false"
					);
				}
				handleDisabledChange() {
					this.setAttribute(
						"aria-disabled",
						this.disabled ? "true" : "false"
					);
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			"menu-item": !0,
			"menu-item--checked": this.checked,
			"menu-item--disabled": this.disabled,
			"menu-item--has-submenu": !1,
		})}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="default" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="default" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `;
				}
			};
		(ms.styles = ps),
			gt([Ct(".menu-item")], ms.prototype, "menuItem", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				ms.prototype,
				"checked",
				2
			),
			gt([xt()], ms.prototype, "value", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				ms.prototype,
				"disabled",
				2
			),
			gt([Rt("checked")], ms.prototype, "handleCheckedChange", 1),
			gt([Rt("disabled")], ms.prototype, "handleDisabledChange", 1),
			(ms = gt([yt("sl-menu-item")], ms));
		var vs = l`
  ${Q}

  :host {
    display: block;
  }

  .menu {
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,
			bs = class extends G {
				constructor() {
					super(...arguments), (this.typeToSelectString = "");
				}
				firstUpdated() {
					this.setAttribute("role", "menu");
				}
				getAllItems(t = { includeDisabled: !0 }) {
					return [
						...this.defaultSlot.assignedElements({ flatten: !0 }),
					].filter(
						(e) =>
							"menuitem" === e.getAttribute("role") &&
							!(!t.includeDisabled && e.disabled)
					);
				}
				getCurrentItem() {
					return this.getAllItems({ includeDisabled: !1 }).find(
						(t) => "0" === t.getAttribute("tabindex")
					);
				}
				setCurrentItem(t) {
					const e = this.getAllItems({ includeDisabled: !1 }),
						r = t.disabled ? e[0] : t;
					e.forEach((t) => {
						t.setAttribute("tabindex", t === r ? "0" : "-1");
					});
				}
				typeToSelect(t) {
					var e;
					const r = this.getAllItems({ includeDisabled: !1 });
					clearTimeout(this.typeToSelectTimeout),
						(this.typeToSelectTimeout = window.setTimeout(
							() => (this.typeToSelectString = ""),
							1e3
						)),
						"Backspace" === t.key
							? t.metaKey || t.ctrlKey
								? (this.typeToSelectString = "")
								: (this.typeToSelectString =
										this.typeToSelectString.slice(0, -1))
							: (this.typeToSelectString += t.key.toLowerCase()),
						Cr ||
							r.forEach((t) =>
								t.classList.remove("sl-focus-invisible")
							);
					for (const t of r)
						if (
							xr(
								null == (e = t.shadowRoot)
									? void 0
									: e.querySelector("slot:not([name])")
							)
								.toLowerCase()
								.trim()
								.startsWith(this.typeToSelectString)
						) {
							this.setCurrentItem(t), t.focus();
							break;
						}
				}
				handleClick(t) {
					const e = t.target.closest("sl-menu-item");
					!1 === (null == e ? void 0 : e.disabled) &&
						Ht(this, "sl-select", { detail: { item: e } });
				}
				handleKeyUp() {
					Cr ||
						this.getAllItems().forEach((t) => {
							t.classList.remove("sl-focus-invisible");
						});
				}
				handleKeyDown(t) {
					if ("Enter" === t.key) {
						const e = this.getCurrentItem();
						t.preventDefault(), null == e || e.click();
					}
					if (
						(" " === t.key && t.preventDefault(),
						["ArrowDown", "ArrowUp", "Home", "End"].includes(t.key))
					) {
						const e = this.getAllItems({ includeDisabled: !1 }),
							r = this.getCurrentItem();
						let i = r ? e.indexOf(r) : 0;
						if (e.length > 0)
							return (
								t.preventDefault(),
								"ArrowDown" === t.key
									? i++
									: "ArrowUp" === t.key
									? i--
									: "Home" === t.key
									? (i = 0)
									: "End" === t.key && (i = e.length - 1),
								i < 0 && (i = 0),
								i > e.length - 1 && (i = e.length - 1),
								this.setCurrentItem(e[i]),
								void e[i].focus()
							);
					}
					this.typeToSelect(t);
				}
				handleMouseDown(t) {
					const e = t.target;
					"menuitem" === e.getAttribute("role") &&
						(this.setCurrentItem(e),
						Cr || e.classList.add("sl-focus-invisible"));
				}
				handleSlotChange() {
					const t = this.getAllItems({ includeDisabled: !1 });
					t.length > 0 && this.setCurrentItem(t[0]);
				}
				render() {
					return j`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
				}
			};
		(bs.styles = vs),
			gt([Ct(".menu")], bs.prototype, "menu", 2),
			gt([Ct("slot")], bs.prototype, "defaultSlot", 2),
			(bs = gt([yt("sl-menu")], bs));
		const gs = te`
  .arrow-icon {
    position: absolute;
    top: 1rem;
    right: 0.75rem;
    pointer-events: none;
  }
`;
		var ys = te`
  ${Je}

  .wrapper {
    width: 100%;
    position: relative;
  }

  .wrapper--selected {
    position: relative;
    z-index: 10;
  }

  ${gs}

  ::part(base) {
    --sl-input-spacing-medium: 1rem;
    --sl-shadow-large: 0 2px 8px rgb(0 0 0 / 24%);
    --sl-spacing-2x-small: 0.25rem;
    --sl-transition-fast: 150ms;
    --sl-color-neutral-700: hsl(240 5.3% 26.1%);
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
    background-color: var(--surface);
    color: var(--on-surface);
  }

  ::part(base):hover {
    background-color: var(--secondary-container);
    color: var(--on-secondary-container);
  }

  sl-select::part(base) {
    width: 100%;
    color: var(--on-primary);
  }

  sl-select::part(base):hover {
    background-color: transparent;
    color: var(--on-surface);
  }

  ::part(form-control) {
    position: relative;
  }

  ::part(icon) {
    display: none;
  }

  ::part(control) {
    height: 3.5rem;
    box-shadow: none;
    border: 1px solid var(--outline);
    border-radius: 0.5rem;
    background-color: var(--surface);

    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  .select--focused::part(control) {
    border-color: var(--primary);
    box-shadow: inset 0 0 0 1px var(--primary);
    color: var(--on-surface);
  }
  .select--disabled::part(control) {
    opacity: 1;
    pointer-events: none;
    background-color: var(--m3-ref-neutral-neutral90);
  }

  .select--has-prefix::part(prefix) {
    position: relative;
    top: 0.2rem;
    color: var(--primary);
    pointer-events: none;
  }

  ::part(form-control-label) {
    color: var(--outline);
    padding: 0;
    position: relative;
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    left: -1rem;
    top: -1rem;
    transform: translate(2rem, 2rem) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    z-index: 1;
    pointer-events: none;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  .select--shrink::part(form-control-label) {
    transform: translate(2rem, 1.4rem) scale(0.75);
    color: var(--primary);
    font-weight: var(--m3-label-medium-font-weight);
  }

  .select--has-prefix::part(form-control-label) {
    left: 1.125rem;
  }

  .select--disabled::part(form-control-label) {
    color: var(--m3-ref-neutral-neutral50);
  }

  ::part(form-control-help-text) {
    display: flex;
    justify-content: flex-end;
    color: var(--error);
    width: 100%;
    margin-top: 0;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
  }

  ::part(control) {
    --sl-input-color: var(--on-surface);
    --sl-input-placeholder-color: var(--outline);
  }

  .select--has-help-text::part(control) {
    border-color: var(--error);
    box-shadow: inset 0 0 0 1px var(--error);
  }

  .select--has-help-text::part(form-control-label) {
    color: var(--error) !important;
  }

  .select--has-label::part(display-label) {
    padding-top: 1rem;
  }

  .select--has-prefix::part(display-label) {
    margin-left: 0.5625rem;
  }

  .select--disabled::part(display-label) {
    color: var(--m3-ref-neutral-neutral50);
  }

  sl-select::part(menu) {
    z-index: 1;
    position: relative;
  }

  sl-menu-item::part(label) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-shrink: 0;
    width: calc(100% - 2rem);
    flex-grow: 1;
  }
`,
			ws = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let xs = class extends Xe {
			constructor() {
				super(...arguments),
					(this.checked = !1),
					(this.value = ""),
					(this.disabled = !1);
			}
		};
		ws(
			[Ge({ type: Boolean, reflect: !0 })],
			xs.prototype,
			"checked",
			void 0
		),
			ws([Ge()], xs.prototype, "value", void 0),
			ws(
				[Ge({ type: Boolean, reflect: !0 })],
				xs.prototype,
				"disabled",
				void 0
			),
			(xs = ws([Ye("agosh-select-item")], xs));
		var _s = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let $s = class extends Xe {
			constructor() {
				super(),
					(this.label = ""),
					(this.disabled = !1),
					(this.value = ""),
					(this.helpText = ""),
					(this.required = !1),
					(this.autofocus = !1),
					(this.menuItems = []),
					(this.hasPrefix = !1),
					(this.hasSlottedLabel = !1),
					(this.hasSlottedHelpText = !1),
					(this.shrink = !!this.value),
					(this.hasFocus = this.autofocus),
					new bi(this);
			}
			connectedCallback() {
				super.connectedCallback(),
					(this.shrink = !!this.value),
					(this.hasFocus = !!this.autofocus),
					this._createMenuItems();
			}
			_createMenuItems() {
				const t = [...(this.childNodes || [])]
					.filter((t) => "AGOSH-SELECT-ITEM" === t.nodeName)
					.map((t) => ({
						value: t.value,
						checked: t.checked,
						disabled: t.disabled,
						innerHTML: t.innerHTML,
					}));
				this.menuItems = t;
			}
			_handleShrink() {
				var t;
				const e =
					null === (t = this.renderRoot) || void 0 === t
						? void 0
						: t.querySelector("sl-select");
				this.shrink = !!(null == e ? void 0 : e.value);
			}
			_handleFocus() {
				(this.hasFocus = !0),
					this._handleShrink(),
					this.requestUpdate();
			}
			_handleBlur() {
				(this.hasFocus = !1),
					this._handleShrink(),
					this.requestUpdate();
			}
			_handleChange(t) {
				const e = Ai(t, 0).value;
				(this.value = e), Sr(this, "agosh-change");
			}
			_handlePrefixSlotChange() {
				(this.hasPrefix = !0), this.requestUpdate();
			}
			_handleLabelSlotChange() {
				(this.hasSlottedLabel = !0), this.requestUpdate();
			}
			_handleHelpTextSlotChange(t) {
				var e, r, i, o;
				const a =
						"SLOT" ===
							(null === (e = Ai(t, 0)) || void 0 === e
								? void 0
								: e.tagName) &&
						(null === (r = Ai(t, 0)) || void 0 === r
							? void 0
							: r.textContent),
					s =
						"SLOT" ===
							(null === (i = Ai(t, 1)) || void 0 === i
								? void 0
								: i.tagName) &&
						(null === (o = Ai(t, 1)) || void 0 === o
							? void 0
							: o.textContent);
				(this.hasSlottedHelpText = Boolean(a || s)),
					console.log({ defaultSlot: a, slottedChild: s, event: t }),
					this.requestUpdate();
			}
			render() {
				const t = !!this.label || this.hasSlottedLabel,
					e = !!this.helpText || this.hasSlottedHelpText;
				return Be`
      <div
        class=${sr({ wrapper: !0, "wrapper--selected": this.hasFocus })}
      >
        <sl-select
          class=${sr({
				"select--has-prefix": this.hasPrefix,
				"select--has-label": t,
				"select--disabled": this.disabled,
				"select--has-help-text": e,
				"select--shrink": this.shrink || this.value,
				"select--focused": this.hasFocus,
			})}
          placeholder=${Lo(t ? void 0 : this.placeholder)}
          label=${this.label}
          .disabled=${this.disabled}
          .help-text=${this.helpText}
          .name=${this.name}
          value=${this.value}
          ?required=${this.required}
          .autofocus=${this.autofocus}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @sl-change=${this._handleChange}
        >
          <slot
            name="prefix"
            slot="prefix"
            @slotchange=${this._handlePrefixSlotChange}
          ></slot>

          <slot
            name="label"
            slot="label"
            @slotchange=${this._handleLabelSlotChange}
            >${this.label}</slot
          >

          <slot
            name="help-text"
            slot="help-text"
            @slotchange=${this._handleHelpTextSlotChange}
            >${this.helpText}</slot
          >

          ${this.menuItems.map(
				(t) => Be`<sl-menu-item
              ?checked=${null == t ? void 0 : t.checked}
              value=${null == t ? void 0 : t.value}
              ?disabled=${null == t ? void 0 : t.disabled}
              .innerHTML=${t.innerHTML}
            >
            </sl-menu-item>`
			)}
        </sl-select>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow-icon"
        >
          <path d="M7 10L12 15L17 10L7 10Z" fill="#7A757E" />
        </svg>
      </div>
    `;
			}
		};
		($s.styles = ys),
			_s([Ge()], $s.prototype, "placeholder", void 0),
			_s([Ge()], $s.prototype, "name", void 0),
			_s([Ge()], $s.prototype, "label", void 0),
			_s(
				[Ge({ type: Boolean, reflect: !0 })],
				$s.prototype,
				"disabled",
				void 0
			),
			_s([Ge()], $s.prototype, "value", void 0),
			_s(
				[Ge({ attribute: "help-text" })],
				$s.prototype,
				"helpText",
				void 0
			),
			_s(
				[Ge({ type: Boolean, reflect: !0 })],
				$s.prototype,
				"required",
				void 0
			),
			_s(
				[Ge({ type: Boolean, reflect: !0 })],
				$s.prototype,
				"autofocus",
				void 0
			),
			_s([Ke()], $s.prototype, "menuItems", void 0),
			_s([Ke()], $s.prototype, "hasPrefix", void 0),
			_s([Ke()], $s.prototype, "hasSlottedLabel", void 0),
			_s([Ke()], $s.prototype, "hasSlottedHelpText", void 0),
			_s([Ke()], $s.prototype, "shrink", void 0),
			_s([Ke()], $s.prototype, "hasFocus", void 0),
			($s = _s([Ye("agosh-select")], $s));
		var ks = $s,
			Cs = l`
  ${Q}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    transform: translateX(calc((var(--width) - var(--height)) / -2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input${zr} ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled)
    .switch__input${zr}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    transform: translateX(calc((var(--width) - var(--height)) / 2));
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input${zr} ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled)
    .switch__input${zr}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`,
			zs = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this, {
							value: (t) => (t.checked ? t.value : void 0),
						})),
						(this.hasFocus = !1),
						(this.disabled = !1),
						(this.required = !1),
						(this.checked = !1),
						(this.invalid = !1);
				}
				firstUpdated() {
					this.invalid = !this.input.checkValidity();
				}
				click() {
					this.input.click();
				}
				focus(t) {
					this.input.focus(t);
				}
				blur() {
					this.input.blur();
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleCheckedChange() {
					(this.input.checked = this.checked),
						(this.invalid = !this.input.checkValidity());
				}
				handleClick() {
					(this.checked = !this.checked), Ht(this, "sl-change");
				}
				handleDisabledChange() {
					(this.input.disabled = this.disabled),
						(this.invalid = !this.input.checkValidity());
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleKeyDown(t) {
					"ArrowLeft" === t.key &&
						(t.preventDefault(),
						(this.checked = !1),
						Ht(this, "sl-change")),
						"ArrowRight" === t.key &&
							(t.preventDefault(),
							(this.checked = !0),
							Ht(this, "sl-change"));
				}
				render() {
					return j`
      <label
        part="base"
        class=${st({
			switch: !0,
			"switch--checked": this.checked,
			"switch--disabled": this.disabled,
			"switch--focused": this.hasFocus,
		})}
      >
        <input
          class="switch__input"
          type="checkbox"
          name=${Ft(this.name)}
          value=${Ft(this.value)}
          .checked=${Bi(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" class="switch__label">
          <slot></slot>
        </span>
      </label>
    `;
				}
			};
		(zs.styles = Cs),
			gt([Ct('input[type="checkbox"]')], zs.prototype, "input", 2),
			gt([_t()], zs.prototype, "hasFocus", 2),
			gt([xt()], zs.prototype, "name", 2),
			gt([xt()], zs.prototype, "value", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				zs.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				zs.prototype,
				"required",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				zs.prototype,
				"checked",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				zs.prototype,
				"invalid",
				2
			),
			gt(
				[Rt("checked", { waitUntilFirstUpdate: !0 })],
				zs.prototype,
				"handleCheckedChange",
				1
			),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				zs.prototype,
				"handleDisabledChange",
				1
			),
			(zs = gt([yt("sl-switch")], zs));
		var Bs = te`
  ${Je}

  .main {
    --sl-toggle-size: 1rem;
    --sl-input-border-width: 1px;
    --sl-input-color: hsl(240 5.3% 26.1%);
    --sl-color-neutral-0: hsl(0, 0%, 100%);
    --sl-transition-fast: 150ms;
    --sl-color-neutral-400: hsl(240 5% 64.9%);
  }

  ::part(thumb) {
    border-color: var(--m3-ref-primary-primary100);
    box-shadow: ${Jt(`${dr("--elevation21", !0)}, ${dr("--elevation20", !0)}`)};
  }

  .switch--disabled::part(base) {
    opacity: 0.5;
    pointer-events: none;
  }

  .switch--disabled::part(thumb) {
    background-color: var(--m3-ref-neutral-neutral80);
    border-color: var(--m3-ref-neutral-neutral80);
  }

  ::part(control) {
    color: var(--m3-ref-secondary-secondary40);
    background-color: var(--m3-ref-secondary-secondary40);
    border-color: var(--m3-ref-secondary-secondary40);
    height: 14px;
    width: 34px;
  }

  .switch--checked::part(control) {
    background-color: var(--m3-ref-primary-primary90);
    border-color: var(--m3-ref-primary-primary90);
  }

  .switch--checked::part(thumb) {
    background-color: var(--m3-ref-primary-primary40);
    border-color: var(--m3-ref-primary-primary40);
  }

  .switch--secondary::part(control) {
    background-color: var(--m3-ref-secondary-secondary40);
    border-color: var(--m3-ref-secondary-secondary40);
  }

  .switch--secondary::part(thumb) {
    background-color: var(--m3-ref-neutral-neutral80);
    border-color: var(--m3-ref-neutral-neutral80);
  }
`,
			Os = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ss = class extends Xe {
			constructor() {
				super(),
					(this.disabled = !1),
					(this.checked = !1),
					(this._checked = !1),
					new bi(this);
			}
			connectedCallback() {
				super.connectedCallback(), (this._checked = this.checked);
			}
			handleToggle(t) {
				const e = Ai(t, 0).checked;
				(this._checked = e),
					Sr(this, "agosh-change"),
					this.requestUpdate();
			}
			render() {
				return Be`
      <sl-switch
        class=${sr({
			main: !0,
			"switch--primary": "primary" === this.variant,
			"switch--secondary": "secondary" === this.variant,
			"switch--disabled": this.disabled,
			"switch--checked": this._checked,
		})}
        ?disabled=${this.disabled}
        ?checked=${this.checked}
        @sl-change=${this.handleToggle}
      ></sl-switch>
    `;
			}
		};
		(Ss.styles = Bs),
			Os([Ge({ reflect: !0 })], Ss.prototype, "name", void 0),
			Os([Ge({ reflect: !0 })], Ss.prototype, "value", void 0),
			Os([Ge({ reflect: !0 })], Ss.prototype, "variant", void 0),
			Os(
				[Ge({ type: Boolean, reflect: !0 })],
				Ss.prototype,
				"disabled",
				void 0
			),
			Os(
				[Ge({ type: Boolean, reflect: !0 })],
				Ss.prototype,
				"checked",
				void 0
			),
			Os([Ke()], Ss.prototype, "_checked", void 0),
			(Ss = Os([Ye("agosh-switch")], Ss));
		var Ls = Ss,
			As = l`
  ${Q}

  :host {
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: block;
  }

  .tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
  }

  .tab-group .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid 2px var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid 2px var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-right: solid 2px var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid 2px var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,
			Ms = class extends G {
				constructor() {
					super(...arguments),
						(this.localize = new Yi(this)),
						(this.tabs = []),
						(this.panels = []),
						(this.hasScrollControls = !1),
						(this.placement = "top"),
						(this.activation = "auto"),
						(this.noScrollControls = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.resizeObserver = new ResizeObserver(() => {
							this.preventIndicatorTransition(),
								this.repositionIndicator(),
								this.updateScrollControls();
						})),
						(this.mutationObserver = new MutationObserver((t) => {
							t.some(
								(t) =>
									![
										"aria-labelledby",
										"aria-controls",
									].includes(t.attributeName)
							) && setTimeout(() => this.setAriaLabels()),
								t.some((t) => "disabled" === t.attributeName) &&
									this.syncTabsAndPanels();
						})),
						this.updateComplete.then(() => {
							this.syncTabsAndPanels(),
								this.mutationObserver.observe(this, {
									attributes: !0,
									childList: !0,
									subtree: !0,
								}),
								this.resizeObserver.observe(this.nav),
								new IntersectionObserver((t, e) => {
									var r;
									t[0].intersectionRatio > 0 &&
										(this.setAriaLabels(),
										this.setActiveTab(
											null != (r = this.getActiveTab())
												? r
												: this.tabs[0],
											{ emitEvents: !1 }
										),
										e.unobserve(t[0].target));
								}).observe(this.tabGroup);
						});
				}
				disconnectedCallback() {
					this.mutationObserver.disconnect(),
						this.resizeObserver.unobserve(this.nav);
				}
				show(t) {
					const e = this.tabs.find((e) => e.panel === t);
					e && this.setActiveTab(e, { scrollBehavior: "smooth" });
				}
				getAllTabs(t = !1) {
					return [
						...this.shadowRoot
							.querySelector('slot[name="nav"]')
							.assignedElements(),
					].filter((e) =>
						t
							? "sl-tab" === e.tagName.toLowerCase()
							: "sl-tab" === e.tagName.toLowerCase() &&
							  !e.disabled
					);
				}
				getAllPanels() {
					return [
						...this.body.querySelector("slot").assignedElements(),
					].filter((t) => "sl-tab-panel" === t.tagName.toLowerCase());
				}
				getActiveTab() {
					return this.tabs.find((t) => t.active);
				}
				handleClick(t) {
					const e = t.target.closest("sl-tab");
					(null == e ? void 0 : e.closest("sl-tab-group")) === this &&
						null !== e &&
						this.setActiveTab(e, { scrollBehavior: "smooth" });
				}
				handleKeyDown(t) {
					const e = t.target.closest("sl-tab");
					if (
						(null == e ? void 0 : e.closest("sl-tab-group")) ===
							this &&
						(["Enter", " "].includes(t.key) &&
							null !== e &&
							(this.setActiveTab(e, { scrollBehavior: "smooth" }),
							t.preventDefault()),
						[
							"ArrowLeft",
							"ArrowRight",
							"ArrowUp",
							"ArrowDown",
							"Home",
							"End",
						].includes(t.key))
					) {
						const e = document.activeElement;
						if (
							"sl-tab" ===
							(null == e ? void 0 : e.tagName.toLowerCase())
						) {
							let r = this.tabs.indexOf(e);
							"Home" === t.key
								? (r = 0)
								: "End" === t.key
								? (r = this.tabs.length - 1)
								: (["top", "bottom"].includes(this.placement) &&
										"ArrowLeft" === t.key) ||
								  (["start", "end"].includes(this.placement) &&
										"ArrowUp" === t.key)
								? (r = Math.max(0, r - 1))
								: ((["top", "bottom"].includes(
										this.placement
								  ) &&
										"ArrowRight" === t.key) ||
										(["start", "end"].includes(
											this.placement
										) &&
											"ArrowDown" === t.key)) &&
								  (r = Math.min(this.tabs.length - 1, r + 1)),
								this.tabs[r].focus({ preventScroll: !0 }),
								"auto" === this.activation &&
									this.setActiveTab(this.tabs[r], {
										scrollBehavior: "smooth",
									}),
								["top", "bottom"].includes(this.placement) &&
									Hi(this.tabs[r], this.nav, "horizontal"),
								t.preventDefault();
						}
					}
				}
				handleScrollToStart() {
					this.nav.scroll({
						left: this.nav.scrollLeft - this.nav.clientWidth,
						behavior: "smooth",
					});
				}
				handleScrollToEnd() {
					this.nav.scroll({
						left: this.nav.scrollLeft + this.nav.clientWidth,
						behavior: "smooth",
					});
				}
				updateScrollControls() {
					this.noScrollControls
						? (this.hasScrollControls = !1)
						: (this.hasScrollControls =
								["top", "bottom"].includes(this.placement) &&
								this.nav.scrollWidth > this.nav.clientWidth);
				}
				setActiveTab(t, e) {
					if (
						((e = mt(
							{ emitEvents: !0, scrollBehavior: "auto" },
							e
						)),
						t !== this.activeTab && !t.disabled)
					) {
						const r = this.activeTab;
						(this.activeTab = t),
							this.tabs.map(
								(t) => (t.active = t === this.activeTab)
							),
							this.panels.map((t) => {
								var e;
								return (t.active =
									t.name ===
									(null == (e = this.activeTab)
										? void 0
										: e.panel));
							}),
							this.syncIndicator(),
							["top", "bottom"].includes(this.placement) &&
								Hi(
									this.activeTab,
									this.nav,
									"horizontal",
									e.scrollBehavior
								),
							e.emitEvents &&
								(r &&
									Ht(this, "sl-tab-hide", {
										detail: { name: r.panel },
									}),
								Ht(this, "sl-tab-show", {
									detail: { name: this.activeTab.panel },
								}));
					}
				}
				setAriaLabels() {
					this.tabs.forEach((t) => {
						const e = this.panels.find((e) => e.name === t.panel);
						e &&
							(t.setAttribute(
								"aria-controls",
								e.getAttribute("id")
							),
							e.setAttribute(
								"aria-labelledby",
								t.getAttribute("id")
							));
					});
				}
				syncIndicator() {
					this.getActiveTab()
						? ((this.indicator.style.display = "block"),
						  this.repositionIndicator())
						: (this.indicator.style.display = "none");
				}
				repositionIndicator() {
					const t = this.getActiveTab();
					if (!t) return;
					const e = t.clientWidth,
						r = t.clientHeight,
						i = this.getAllTabs(!0),
						o = i
							.slice(0, i.indexOf(t))
							.reduce(
								(t, e) => ({
									left: t.left + e.clientWidth,
									top: t.top + e.clientHeight,
								}),
								{ left: 0, top: 0 }
							);
					switch (this.placement) {
						case "top":
						case "bottom":
							(this.indicator.style.width = `${e}px`),
								(this.indicator.style.height = "auto"),
								(this.indicator.style.transform = `translateX(${o.left}px)`);
							break;
						case "start":
						case "end":
							(this.indicator.style.width = "auto"),
								(this.indicator.style.height = `${r}px`),
								(this.indicator.style.transform = `translateY(${o.top}px)`);
					}
				}
				preventIndicatorTransition() {
					const t = this.indicator.style.transition;
					(this.indicator.style.transition = "none"),
						requestAnimationFrame(() => {
							this.indicator.style.transition = t;
						});
				}
				syncTabsAndPanels() {
					(this.tabs = this.getAllTabs()),
						(this.panels = this.getAllPanels()),
						this.syncIndicator();
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			"tab-group": !0,
			"tab-group--top": "top" === this.placement,
			"tab-group--bottom": "bottom" === this.placement,
			"tab-group--start": "start" === this.placement,
			"tab-group--end": "end" === this.placement,
			"tab-group--has-scroll-controls": this.hasScrollControls,
		})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${
				this.hasScrollControls
					? j`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name="chevron-left"
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `
					: ""
			}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${
				this.hasScrollControls
					? j`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name="chevron-right"
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `
					: ""
			}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
				}
			};
		(Ms.styles = As),
			gt([Ct(".tab-group")], Ms.prototype, "tabGroup", 2),
			gt([Ct(".tab-group__body")], Ms.prototype, "body", 2),
			gt([Ct(".tab-group__nav")], Ms.prototype, "nav", 2),
			gt([Ct(".tab-group__indicator")], Ms.prototype, "indicator", 2),
			gt([_t()], Ms.prototype, "hasScrollControls", 2),
			gt([xt()], Ms.prototype, "placement", 2),
			gt([xt()], Ms.prototype, "activation", 2),
			gt(
				[xt({ attribute: "no-scroll-controls", type: Boolean })],
				Ms.prototype,
				"noScrollControls",
				2
			),
			gt([xt()], Ms.prototype, "lang", 2),
			gt(
				[Rt("noScrollControls", { waitUntilFirstUpdate: !0 })],
				Ms.prototype,
				"updateScrollControls",
				1
			),
			gt(
				[Rt("placement", { waitUntilFirstUpdate: !0 })],
				Ms.prototype,
				"syncIndicator",
				1
			),
			(Ms = gt([yt("sl-tab-group")], Ms));
		var js = l`
  ${Q}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`,
			Ts = 0;
		function Is() {
			return ++Ts;
		}
		var Us = class extends G {
			constructor() {
				super(...arguments),
					(this.attrId = Is()),
					(this.componentId = `sl-tab-panel-${this.attrId}`),
					(this.name = ""),
					(this.active = !1);
			}
			connectedCallback() {
				super.connectedCallback(),
					(this.id = this.id.length > 0 ? this.id : this.componentId);
			}
			render() {
				return (
					(this.style.display = this.active ? "block" : "none"),
					j`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${
			this.active ? "false" : "true"
		}>
        <slot></slot>
      </div>
    `
				);
			}
		};
		(Us.styles = js),
			gt([xt({ reflect: !0 })], Us.prototype, "name", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Us.prototype, "active", 2),
			(Us = gt([yt("sl-tab-panel")], Us));
		var Ds = l`
  ${Q}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab${zr}:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
    box-shadow: inset var(--sl-focus-ring);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-right: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-large);
    margin-left: var(--sl-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }
`,
			Es = class extends G {
				constructor() {
					super(...arguments),
						(this.localize = new Yi(this)),
						(this.attrId = Is()),
						(this.componentId = `sl-tab-${this.attrId}`),
						(this.panel = ""),
						(this.active = !1),
						(this.closable = !1),
						(this.disabled = !1);
				}
				focus(t) {
					this.tab.focus(t);
				}
				blur() {
					this.tab.blur();
				}
				handleCloseClick() {
					Ht(this, "sl-close");
				}
				render() {
					return (
						(this.id =
							this.id.length > 0 ? this.id : this.componentId),
						j`
      <div
        part="base"
        class=${st({
			tab: !0,
			"tab--active": this.active,
			"tab--closable": this.closable,
			"tab--disabled": this.disabled,
		})}
        role="tab"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-selected=${this.active ? "true" : "false"}
        tabindex=${this.disabled || !this.active ? "-1" : "0"}
      >
        <slot></slot>
        ${
			this.closable
				? j`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `
				: ""
		}
      </div>
    `
					);
				}
			};
		(Es.styles = Ds),
			gt([Ct(".tab")], Es.prototype, "tab", 2),
			gt([xt({ reflect: !0 })], Es.prototype, "panel", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Es.prototype, "active", 2),
			gt([xt({ type: Boolean })], Es.prototype, "closable", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Es.prototype,
				"disabled",
				2
			),
			gt([xt()], Es.prototype, "lang", 2),
			(Es = gt([yt("sl-tab")], Es));
		var Fs = te`
  ${Je}

  sl-tab-group {
    --indicator-color: var(--primary);
    --track-color: var(--surface21);
  }

  sl-tab {
    color: var(--on-surface-variant);
    --sl-color-primary-600: var(--primary);
    --sl-spacing-medium: 0.75rem;
    --sl-spacing-large: 1rem;
  }

  sl-tab::part(base) {
    font-size: var(--m3-label-large-font-size);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-button-line-height);
    font-weight: var(--m3-label-large-font-weight);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
  }

  sl-tab-group::part(active-tab-indicator) {
    border-bottom: solid 0.25rem var(--indicator-color);
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    bottom: 0px;

    --sl-transition-fast: 150ms;
  }

  sl-tab-group::part(scroll-button) {
    display: none;
  }
`,
			Rs = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Hs = class extends Xe {
			constructor() {
				super(...arguments), (this.tabs = []), (this.tabPanels = []);
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				const t = [...(this.childNodes || [])]
					.filter((t) => "AGOSH-TAB" === t.nodeName)
					.map((t) => ({
						active: t.active,
						innerHTML: t.innerHTML,
						panel: t.panel,
						disabled: t.disabled,
					}));
				this.tabs = t;
				const e = [...(this.childNodes || [])]
					.filter((t) => "AGOSH-TAB-PANEL" === t.nodeName)
					.map(
						(t) => (
							console.log({ el: t }),
							{
								active: t.active,
								innerHTML: t.innerHTML,
								name: t.name,
							}
						)
					);
				this.tabPanels = e;
			}
			show(t) {
				const e = this.renderRoot.querySelector("sl-tab-group");
				null == e || e.show(t);
			}
			render() {
				return Be`
      <sl-tab-group
        @sl-tab-show=${(t) => {
			Sr(this, "agosh-tab-show", { detail: t.detail });
		}}
        @sl-tab-hide=${(t) => {
			Sr(this, "agosh-tab-hide", { detail: t.detail });
		}}
      >
        ${this.tabs.map(
			({ active: t, innerHTML: e, panel: r, disabled: i }) => Be`<sl-tab
            slot="nav"
            ?active=${t}
            ?disabled=${i}
            panel=${Lo(r)}
            .innerHTML=${e || ""}
          >
          </sl-tab> `
		)}
        ${this.tabPanels.map(
			({ active: t, innerHTML: e, name: r }) => Be`<sl-tab-panel
            ?active=${t}
            name=${Lo(r)}
            .innerHTML=${e || ""}
          >
          </sl-tab-panel> `
		)}
      </sl-tab-group>
    `;
			}
		};
		(Hs.styles = Fs),
			Rs([Ke()], Hs.prototype, "tabs", void 0),
			Rs([Ke()], Hs.prototype, "tabPanels", void 0),
			(Hs = Rs([Ye("agosh-tab-group")], Hs));
		var Ns = Hs,
			Ps = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Vs = class extends Xe {
			constructor() {
				super(...arguments), (this.active = !1);
			}
		};
		Ps(
			[Ge({ type: Boolean, reflect: !0 })],
			Vs.prototype,
			"active",
			void 0
		),
			Ps([Ge({ reflect: !0 })], Vs.prototype, "name", void 0),
			(Vs = Ps([Ye("agosh-tab-panel")], Vs));
		var Zs = Vs,
			Xs = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let qs = class extends Xe {
			constructor() {
				super(...arguments), (this.active = !1), (this.disabled = !1);
			}
		};
		Xs(
			[Ge({ type: Boolean, reflect: !0 })],
			qs.prototype,
			"active",
			void 0
		),
			Xs(
				[Ge({ type: Boolean, reflect: !0 })],
				qs.prototype,
				"disabled",
				void 0
			),
			Xs([Ge()], qs.prototype, "panel", void 0),
			(qs = Xs([Ye("agosh-tab")], qs));
		var Ys = qs,
			Ws = te`
  ${Je}

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem;
    border-radius: 1.5rem;
    width: fit-content;
    color: var(--secondary);
    background-color: var(--surface11);
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--surface20);
  }

  .wrapper-primary,
  .wrapper-secondary {
    padding-right: 6rem;
  }

  .wrapper-tertiary {
    align-items: center;
    padding: 1.25rem 3.813rem;
    background: linear-gradient(
        0deg,
        var(--primary-opacity008),
        var(--primary-opacity008)
      ),
      var(--surface10);
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--m3-ref-secondary-secondary30);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.25rem;
  }

  .error {
    color: var(--status-error);
  }

  .success {
    color: var(--status-success);
  }

  .warning {
    color: var(--status-warning);
  }

  .info {
    color: var(--status-info);
  }

  .label {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    color: var(--on-surface);
    margin: 0.25rem;
  }

  .value-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.25rem;
  }

  .value-sub-text {
    font-size: var(--m3-body1-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-display-small-font-family);
    font-weight: var(--m3-title-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-body1-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    padding-left: 0.625rem;
  }

  .value {
    text-decoration: var(--m3-display-small-text-decoration);
    font-family: var(--m3-display-small-font-family);
    font-weight: var(--m3-display-small-font-weight);
    font-style: var(--m3-display-small-font-style);
    font-stretch: var(--m3-display-small-font-stretch);
    letter-spacing: var(--m3-display-small-letter-spacing);
    line-height: var(--m3-headline2-line-height);
    color: var(--on-surface);
  }

  .value-primary,
  .value-secondary {
    font-size: var(--m3-headline2-font-size);
    color: var(--primary);
  }

  .value-tertiary {
    font-size: var(--m3-display-small-font-size);
    color: var(--on-background);
  }

  .description {
    font-size: var(--m3-subhead2-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-display-small-font-family);
    font-weight: var(--m3-title-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: 0.016rem;
    line-height: var(--m3-label-large-line-height);
    color: var(--on-surface-variant);
    margin: 0.25rem;
  }
`,
			Gs = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ks = class extends Xe {
			constructor() {
				super(...arguments),
					(this.variantName = "primary"),
					(this.secondaryValue = "");
			}
			render() {
				return Be`
      <div class="wrapper ${"wrapper-" + this.variantName}">
        ${
			"primary" !== this.variantName
				? Be`<div class="icon">
              <slot></slot>
            </div>`
				: ""
		}
        <div class="label">${this.label}</div>
        <div class="value-container">
          <div class="value ${"value-" + this.variantName}">${this.value}</div>
          ${
				"tertiary" !== this.variantName && this.secondaryValue
					? this.secondaryValueStatus
						? Be`<div class="${this.secondaryValueStatus} value-sub-text">
                  ${this.secondaryValue}
                </div>`
						: Be`<div
                  class=${sr({
						"value-sub-text": !0,
						success:
							parseFloat(this.secondaryValue) > 0 ||
							0 == parseFloat(this.secondaryValue),
						error: parseFloat(this.secondaryValue) < 0,
					})}
                >
                  ${this.secondaryValue}
                </div>`
					: ""
			}
        </div>
        ${
			"tertiary" === this.variantName && this.description
				? Be` <div class="description">${this.description}</div>`
				: ""
		}
      </div>
    `;
			}
		};
		(Ks.styles = Ws),
			Gs(
				[Ge({ reflect: !0, attribute: "variant-name" })],
				Ks.prototype,
				"variantName",
				void 0
			),
			Gs(
				[Ge({ reflect: !0, attribute: "secondary-value" })],
				Ks.prototype,
				"secondaryValue",
				void 0
			),
			Gs(
				[Ge({ reflect: !0, attribute: "secondary-value-status" })],
				Ks.prototype,
				"secondaryValueStatus",
				void 0
			),
			Gs([Ge()], Ks.prototype, "label", void 0),
			Gs([Ge()], Ks.prototype, "value", void 0),
			Gs([Ge()], Ks.prototype, "description", void 0),
			(Ks = Gs([Ye("agosh-kpi-card")], Ks));
		var Qs = Ks,
			Js = te`
  ${Je}
  .content {
    padding: 0.25rem 0.5rem;
    background: var(--tertiary);
    border-radius: 0.25rem;
    font-size: var(--m3-body-small-font-size);
    text-decoration: var(--m3-body-small-text-decoration);
    font-family: var(--m3-body-small-font-family);
    font-weight: var(--m3-body-small-font-weight);
    font-style: var(--m3-body-small-font-style);
    font-stretch: var(--m3-body-small-font-stretch);
    letter-spacing: var(--m3-body-small-letter-spacing);
    line-height: var(--m3-body-small-line-height);
    color: var(--on-primary);
  }
  .tooltip-area {
    width: fit-content;
  }
`,
			tn = l`
  ${Q}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-target {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip-positioner[data-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-placement^='right'] .tooltip {
    transform-origin: left;
  }

  .tooltip__content {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }

  .tooltip__arrow {
    position: absolute;
    background: var(--sl-tooltip-background-color);
    width: calc(var(--sl-tooltip-arrow-size) * 2);
    height: calc(var(--sl-tooltip-arrow-size) * 2);
    transform: rotate(45deg);
    z-index: -1;
  }
`,
			en = class extends G {
				constructor() {
					super(...arguments),
						(this.content = ""),
						(this.placement = "top"),
						(this.disabled = !1),
						(this.distance = 10),
						(this.open = !1),
						(this.skidding = 0),
						(this.trigger = "hover focus"),
						(this.hoist = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.handleBlur = this.handleBlur.bind(this)),
						(this.handleClick = this.handleClick.bind(this)),
						(this.handleFocus = this.handleFocus.bind(this)),
						(this.handleKeyDown = this.handleKeyDown.bind(this)),
						(this.handleMouseOver =
							this.handleMouseOver.bind(this)),
						(this.handleMouseOut = this.handleMouseOut.bind(this)),
						this.updateComplete.then(() => {
							this.addEventListener("blur", this.handleBlur, !0),
								this.addEventListener(
									"focus",
									this.handleFocus,
									!0
								),
								this.addEventListener(
									"click",
									this.handleClick
								),
								this.addEventListener(
									"keydown",
									this.handleKeyDown
								),
								this.addEventListener(
									"mouseover",
									this.handleMouseOver
								),
								this.addEventListener(
									"mouseout",
									this.handleMouseOut
								),
								(this.target = this.getTarget());
						});
				}
				async firstUpdated() {
					(this.tooltip.hidden = !this.open),
						this.open &&
							(await this.updateComplete,
							this.updatePositioner());
				}
				disconnectedCallback() {
					super.disconnectedCallback(),
						this.removeEventListener("blur", this.handleBlur, !0),
						this.removeEventListener("focus", this.handleFocus, !0),
						this.removeEventListener("click", this.handleClick),
						this.removeEventListener("keydown", this.handleKeyDown),
						this.removeEventListener(
							"mouseover",
							this.handleMouseOver
						),
						this.removeEventListener(
							"mouseout",
							this.handleMouseOut
						),
						this.stopPositioner();
				}
				async show() {
					if (!this.open)
						return (this.open = !0), Nt(this, "sl-after-show");
				}
				async hide() {
					if (this.open)
						return (this.open = !1), Nt(this, "sl-after-hide");
				}
				getTarget() {
					const t = [...this.children].find(
						(t) =>
							"style" !== t.tagName.toLowerCase() &&
							"content" !== t.getAttribute("slot")
					);
					if (!t)
						throw new Error(
							"Invalid tooltip target: no child element was found."
						);
					return t;
				}
				handleBlur() {
					this.hasTrigger("focus") && this.hide();
				}
				handleClick() {
					this.hasTrigger("click") &&
						(this.open ? this.hide() : this.show());
				}
				handleFocus() {
					this.hasTrigger("focus") && this.show();
				}
				handleKeyDown(t) {
					this.open &&
						"Escape" === t.key &&
						(t.stopPropagation(), this.hide());
				}
				handleMouseOver() {
					if (this.hasTrigger("hover")) {
						const t = fr(
							getComputedStyle(this).getPropertyValue(
								"--show-delay"
							)
						);
						clearTimeout(this.hoverTimeout),
							(this.hoverTimeout = window.setTimeout(() => {
								this.show();
							}, t));
					}
				}
				handleMouseOut() {
					if (this.hasTrigger("hover")) {
						const t = fr(
							getComputedStyle(this).getPropertyValue(
								"--hide-delay"
							)
						);
						clearTimeout(this.hoverTimeout),
							(this.hoverTimeout = window.setTimeout(() => {
								this.hide();
							}, t));
					}
				}
				async handleOpenChange() {
					if (!this.disabled)
						if (this.open) {
							Ht(this, "sl-show"),
								await pr(this.tooltip),
								this.startPositioner(),
								(this.tooltip.hidden = !1);
							const { keyframes: t, options: e } = yr(
								this,
								"tooltip.show"
							);
							await ur(this.tooltip, t, e),
								Ht(this, "sl-after-show");
						} else {
							Ht(this, "sl-hide"), await pr(this.tooltip);
							const { keyframes: t, options: e } = yr(
								this,
								"tooltip.hide"
							);
							await ur(this.tooltip, t, e),
								(this.tooltip.hidden = !0),
								this.stopPositioner(),
								Ht(this, "sl-after-hide");
						}
				}
				handleOptionsChange() {
					this.updatePositioner();
				}
				handleDisabledChange() {
					this.disabled && this.open && this.hide();
				}
				hasTrigger(t) {
					return this.trigger.split(" ").includes(t);
				}
				startPositioner() {
					this.stopPositioner(),
						this.updatePositioner(),
						(this.positionerCleanup = ds(
							this.target,
							this.positioner,
							this.updatePositioner.bind(this)
						));
				}
				updatePositioner() {
					var t;
					this.open &&
						this.target &&
						this.positioner &&
						hs(this.target, this.positioner, {
							placement: this.placement,
							middleware: [
								Ia({
									mainAxis: this.distance,
									crossAxis: this.skidding,
								}),
								Ta(),
								Ua(),
								((t = { element: this.arrow, padding: 10 }),
								{
									name: "arrow",
									options: t,
									async fn(e) {
										const { element: r, padding: i = 0 } =
												null != t ? t : {},
											{
												x: o,
												y: a,
												placement: s,
												rects: n,
												platform: l,
											} = e;
										if (null == r) return {};
										const c = ka(i),
											d = { x: o, y: a },
											h = xa(s),
											u = _a(h),
											f = await l.getDimensions(r),
											p = "y" === h ? "top" : "left",
											m = "y" === h ? "bottom" : "right",
											v =
												n.reference[u] +
												n.reference[h] -
												d[h] -
												n.floating[u],
											b = d[h] - n.reference[h],
											g = await (null == l.getOffsetParent
												? void 0
												: l.getOffsetParent(r)),
											y = g
												? "y" === h
													? g.clientHeight || 0
													: g.clientWidth || 0
												: 0,
											w = v / 2 - b / 2,
											x = c[p],
											_ = y - f[u] - c[m],
											$ = y / 2 - f[u] / 2 + w,
											k = Sa(x, $, _);
										return {
											data: {
												[h]: k,
												centerOffset: $ - k,
											},
										};
									},
								}),
							],
							strategy: this.hoist ? "fixed" : "absolute",
						}).then(
							({
								x: t,
								y: e,
								middlewareData: r,
								placement: i,
							}) => {
								const o = r.arrow.x,
									a = r.arrow.y,
									s = {
										top: "bottom",
										right: "left",
										bottom: "top",
										left: "right",
									}[i.split("-")[0]];
								this.positioner.setAttribute(
									"data-placement",
									i
								),
									Object.assign(this.positioner.style, {
										position: this.hoist
											? "fixed"
											: "absolute",
										left: `${t}px`,
										top: `${e}px`,
									}),
									Object.assign(this.arrow.style, {
										left:
											"number" == typeof o
												? `${o}px`
												: "",
										top:
											"number" == typeof a
												? `${a}px`
												: "",
										right: "",
										bottom: "",
										[s]: "calc(var(--sl-tooltip-arrow-size) * -1)",
									});
							}
						);
				}
				stopPositioner() {
					this.positionerCleanup &&
						(this.positionerCleanup(),
						(this.positionerCleanup = void 0),
						this.positioner.removeAttribute("data-placement"));
				}
				render() {
					return j`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${st({ tooltip: !0, "tooltip--open": this.open })}
          role="tooltip"
          aria-hidden=${this.open ? "false" : "true"}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content">
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `;
				}
			};
		(en.styles = tn),
			gt([Ct(".tooltip-positioner")], en.prototype, "positioner", 2),
			gt([Ct(".tooltip")], en.prototype, "tooltip", 2),
			gt([Ct(".tooltip__arrow")], en.prototype, "arrow", 2),
			gt([xt()], en.prototype, "content", 2),
			gt([xt()], en.prototype, "placement", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				en.prototype,
				"disabled",
				2
			),
			gt([xt({ type: Number })], en.prototype, "distance", 2),
			gt([xt({ type: Boolean, reflect: !0 })], en.prototype, "open", 2),
			gt([xt({ type: Number })], en.prototype, "skidding", 2),
			gt([xt()], en.prototype, "trigger", 2),
			gt([xt({ type: Boolean })], en.prototype, "hoist", 2),
			gt(
				[Rt("open", { waitUntilFirstUpdate: !0 })],
				en.prototype,
				"handleOpenChange",
				1
			),
			gt(
				[
					Rt("content"),
					Rt("distance"),
					Rt("hoist"),
					Rt("placement"),
					Rt("skidding"),
				],
				en.prototype,
				"handleOptionsChange",
				1
			),
			gt([Rt("disabled")], en.prototype, "handleDisabledChange", 1),
			(en = gt([yt("sl-tooltip")], en)),
			gr("tooltip.show", {
				keyframes: [
					{ opacity: 0, transform: "scale(0.8)" },
					{ opacity: 1, transform: "scale(1)" },
				],
				options: { duration: 150, easing: "ease" },
			}),
			gr("tooltip.hide", {
				keyframes: [
					{ opacity: 1, transform: "scale(1)" },
					{ opacity: 0, transform: "scale(0.8)" },
				],
				options: { duration: 150, easing: "ease" },
			});
		var rn = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let on = class extends Xe {
			constructor() {
				super(...arguments),
					(this.placement = "top"),
					(this.trigger = "hover"),
					(this.open = !1),
					(this.toggle = () => {
						(this.open = !this.open), this.requestUpdate();
					}),
					(this.show = () => {
						(this.open = !0), this.requestUpdate();
					}),
					(this.hide = () => {
						(this.open = !1), this.requestUpdate();
					});
			}
			handleShow() {
				Sr(this, "agosh-show");
			}
			handleHide() {
				Sr(this, "agosh-hide");
			}
			render() {
				return Be`
      <sl-tooltip
        placement=${this.placement}
        trigger=${this.trigger}
        .open=${this.open}
        @sl-show=${this.handleShow}
        @sl-hide=${this.handleHide}
      >
        <div class="content" slot="content">
          <slot name="content"></slot>
        </div>
        <div class="tooltip-area">
          <slot></slot>
        </div>
      </sl-tooltip>
    `;
			}
		};
		(on.styles = Js),
			rn([Ge({ reflect: !0 })], on.prototype, "placement", void 0),
			rn([Ge({ reflect: !0 })], on.prototype, "trigger", void 0),
			rn(
				[Ge({ type: Boolean, reflect: !0 })],
				on.prototype,
				"open",
				void 0
			),
			(on = rn([Ye("agosh-tooltip")], on));
		var an = on,
			sn = l`
  ${Q}

  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating${zr} {
    box-shadow: var(--sl-focus-ring);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) transform;
  }

  .rating__symbol--hover {
    transform: scale(1.2);
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    transform: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }
`,
			nn = ot(
				class extends at {
					constructor(t) {
						var e;
						if (
							(super(t),
							t.type !== tt ||
								"style" !== t.name ||
								(null === (e = t.strings) || void 0 === e
									? void 0
									: e.length) > 2)
						)
							throw Error(
								"The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."
							);
					}
					render(t) {
						return Object.keys(t).reduce((e, r) => {
							const i = t[r];
							return null == i
								? e
								: e +
										`${(r = r
											.replace(
												/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,
												"-$&"
											)
											.toLowerCase())}:${i};`;
						}, "");
					}
					update(t, [e]) {
						const { style: r } = t.element;
						if (void 0 === this.ct) {
							this.ct = new Set();
							for (const t in e) this.ct.add(t);
							return this.render(e);
						}
						this.ct.forEach((t) => {
							null == e[t] &&
								(this.ct.delete(t),
								t.includes("-")
									? r.removeProperty(t)
									: (r[t] = ""));
						});
						for (const t in e) {
							const i = e[t];
							null != i &&
								(this.ct.add(t),
								t.includes("-")
									? r.setProperty(t, i)
									: (r[t] = i));
						}
						return T;
					}
				}
			),
			ln = class extends G {
				constructor() {
					super(...arguments),
						(this.hoverValue = 0),
						(this.isHovering = !1),
						(this.value = 0),
						(this.max = 5),
						(this.precision = 1),
						(this.readonly = !1),
						(this.disabled = !1),
						(this.getSymbol = () =>
							'<sl-icon name="star-fill" library="system"></sl-icon>');
				}
				focus(t) {
					this.rating.focus(t);
				}
				blur() {
					this.rating.blur();
				}
				getValueFromMousePosition(t) {
					return this.getValueFromXCoordinate(t.clientX);
				}
				getValueFromTouchPosition(t) {
					return this.getValueFromXCoordinate(t.touches[0].clientX);
				}
				getValueFromXCoordinate(t) {
					const e = this.rating.getBoundingClientRect().left,
						r = this.rating.getBoundingClientRect().width;
					return (function (t, e, r) {
						return t < e ? e : t > r ? r : t;
					})(
						this.roundToPrecision(
							((t - e) / r) * this.max,
							this.precision
						),
						0,
						this.max
					);
				}
				handleClick(t) {
					this.setValue(this.getValueFromMousePosition(t));
				}
				setValue(t) {
					this.disabled ||
						this.readonly ||
						((this.value = t === this.value ? 0 : t),
						(this.isHovering = !1));
				}
				handleKeyDown(t) {
					if (!this.disabled && !this.readonly) {
						if ("ArrowLeft" === t.key) {
							const e = t.shiftKey ? 1 : this.precision;
							(this.value = Math.max(0, this.value - e)),
								t.preventDefault();
						}
						if ("ArrowRight" === t.key) {
							const e = t.shiftKey ? 1 : this.precision;
							(this.value = Math.min(this.max, this.value + e)),
								t.preventDefault();
						}
						"Home" === t.key &&
							((this.value = 0), t.preventDefault()),
							"End" === t.key &&
								((this.value = this.max), t.preventDefault());
					}
				}
				handleMouseEnter() {
					this.isHovering = !0;
				}
				handleMouseMove(t) {
					this.hoverValue = this.getValueFromMousePosition(t);
				}
				handleMouseLeave() {
					this.isHovering = !1;
				}
				handleTouchStart(t) {
					(this.hoverValue = this.getValueFromTouchPosition(t)),
						t.preventDefault();
				}
				handleTouchMove(t) {
					(this.isHovering = !0),
						(this.hoverValue = this.getValueFromTouchPosition(t));
				}
				handleTouchEnd(t) {
					(this.isHovering = !1),
						this.setValue(this.hoverValue),
						t.preventDefault();
				}
				handleValueChange() {
					Ht(this, "sl-change");
				}
				roundToPrecision(t, e = 0.5) {
					const r = 1 / e;
					return Math.ceil(t * r) / r;
				}
				render() {
					const t = Array.from(Array(this.max).keys());
					let e = 0;
					return (
						(e =
							this.disabled || this.readonly
								? this.value
								: this.isHovering
								? this.hoverValue
								: this.value),
						j`
      <div
        part="base"
        class=${st({
			rating: !0,
			"rating--readonly": this.readonly,
			"rating--disabled": this.disabled,
		})}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${t.map(
				(t) => j`
              <span
                class=${st({
					rating__symbol: !0,
					"rating__symbol--hover":
						this.isHovering && Math.ceil(e) === t + 1,
				})}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${Vt(this.getSymbol(t + 1))}
              </span>
            `
			)}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${t.map(
				(t) => j`
              <span
                class=${st({
					rating__symbol: !0,
					"rating__symbol--hover":
						this.isHovering && Math.ceil(e) === t + 1,
				})}
                style=${nn({
					clipPath:
						e > t + 1
							? "none"
							: `inset(0 ${100 - ((e - t) / 1) * 100}% 0 0)`,
				})}
                role="presentation"
              >
                ${Vt(this.getSymbol(t + 1))}
              </span>
            `
			)}
        </span>
      </div>
    `
					);
				}
			};
		(ln.styles = sn),
			gt([Ct(".rating")], ln.prototype, "rating", 2),
			gt([_t()], ln.prototype, "hoverValue", 2),
			gt([_t()], ln.prototype, "isHovering", 2),
			gt([xt({ type: Number })], ln.prototype, "value", 2),
			gt([xt({ type: Number })], ln.prototype, "max", 2),
			gt([xt({ type: Number })], ln.prototype, "precision", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				ln.prototype,
				"readonly",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				ln.prototype,
				"disabled",
				2
			),
			gt([xt()], ln.prototype, "getSymbol", 2),
			gt(
				[Rt("value", { waitUntilFirstUpdate: !0 })],
				ln.prototype,
				"handleValueChange",
				1
			),
			(ln = gt([yt("sl-rating")], ln));
		var cn = te`
  ${Je}

  .agosh-rating {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating__symbols--indicator {
    color: var(--symbol-color-active);
  }

  sl-rating {
    --symbol-color: transparent;
    --symbol-color-active: var(--star-rating);
  }
`,
			dn = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let hn = class extends Xe {
			constructor() {
				super(...arguments),
					(this.value = 0),
					(this.max = 5),
					(this.precision = 1),
					(this.readonly = !1),
					(this.disabled = !1);
			}
			render() {
				return Be`
      <div class="agosh-rating">
        <sl-rating
          class="rating-stars"
          @sl-change="${this.handleChange}"
          value=${this.value}
          max=${this.max}
          precision=${this.precision}
          .disabled=${this.disabled}
          .readonly=${this.readonly}
        ></sl-rating>
      </div>
    `;
			}
			handleChange(t) {
				(this.value = Ai(t, 0).value), Sr(this, "agosh-change");
			}
			firstUpdated() {
				const t = this.renderRoot.querySelector(".rating-stars");
				t &&
					(t.getSymbol = () =>
						'\n        <svg\n          width="16"\n          height="16"\n          viewBox="0 0 16 16"\n          fill="none"\n          xmlns="http://www.w3.org/2000/svg"\n        >\n          <path\n            d="M7.70464 11.7984L10.4713 13.4717C10.978 13.7784 11.598 13.3251 11.4646 12.7517L10.7313 9.60508L13.178 7.48508C13.6246 7.09841 13.3846 6.36508 12.798 6.31841L9.57797 6.04508L8.31797 3.07175C8.0913 2.53175 7.31797 2.53175 7.0913 3.07175L5.8313 6.03841L2.6113 6.31175C2.02464 6.35841 1.78464 7.09175 2.2313 7.47841L4.67797 9.59841L3.94464 12.7451C3.8113 13.3184 4.4313 13.7717 4.93797 13.4651L7.70464 11.7984Z"\n            fill="currentColor"\n          />\n\n          <path\n            d="M12.8046 6.31841L9.57797 6.03841L8.31797 3.07175C8.09131 2.53175 7.31797 2.53175 7.0913 3.07175L5.8313 6.04508L2.6113 6.31841C2.02464 6.36508 1.78464 7.09841 2.2313 7.48508L4.67797 9.60508L3.94464 12.7517C3.81131 13.3251 4.4313 13.7784 4.93797 13.4717L7.70464 11.8051L10.4713 13.4784C10.978 13.7851 11.598 13.3317 11.4646 12.7584L10.7313 9.60508L13.178 7.48508C13.6246 7.09841 13.3913 6.36508 12.8046 6.31841ZM7.70464 10.5584L5.19797 12.0717L5.86464 9.21841L3.65131 7.29841L6.57131 7.04508L7.70464 4.35841L8.84464 7.05175L11.7646 7.30508L9.55131 9.22508L10.218 12.0784L7.70464 10.5584Z"\n            fill="currentColor"\n            style="color: var(--star-rating)"\n          />\n        </svg>\n      ');
			}
		};
		(hn.styles = cn),
			dn([Ge({ type: Number })], hn.prototype, "value", void 0),
			dn([Ge({ type: Number })], hn.prototype, "max", void 0),
			dn([Ge({ type: Number })], hn.prototype, "precision", void 0),
			dn(
				[Ge({ type: Boolean, reflect: !0 })],
				hn.prototype,
				"readonly",
				void 0
			),
			dn(
				[Ge({ type: Boolean, reflect: !0 })],
				hn.prototype,
				"disabled",
				void 0
			),
			(hn = dn([Ye("agosh-rating")], hn));
		var un = hn,
			fn = l`
  ${Q}

  :host {
    display: contents;
  }
`,
			pn = {};
		((t, e) => {
			for (var r in e) nt(t, r, { get: e[r], enumerable: !0 });
		})(pn, {
			backInDown: () => Sn,
			backInLeft: () => Ln,
			backInRight: () => An,
			backInUp: () => Mn,
			backOutDown: () => jn,
			backOutLeft: () => Tn,
			backOutRight: () => In,
			backOutUp: () => Un,
			bounce: () => vn,
			bounceIn: () => Dn,
			bounceInDown: () => En,
			bounceInLeft: () => Fn,
			bounceInRight: () => Rn,
			bounceInUp: () => Hn,
			bounceOut: () => Nn,
			bounceOutDown: () => Pn,
			bounceOutLeft: () => Vn,
			bounceOutRight: () => Zn,
			bounceOutUp: () => Xn,
			easings: () => sc,
			fadeIn: () => qn,
			fadeInBottomLeft: () => Yn,
			fadeInBottomRight: () => Wn,
			fadeInDown: () => Gn,
			fadeInDownBig: () => Kn,
			fadeInLeft: () => Qn,
			fadeInLeftBig: () => Jn,
			fadeInRight: () => tl,
			fadeInRightBig: () => el,
			fadeInTopLeft: () => rl,
			fadeInTopRight: () => il,
			fadeInUp: () => ol,
			fadeInUpBig: () => al,
			fadeOut: () => sl,
			fadeOutBottomLeft: () => nl,
			fadeOutBottomRight: () => ll,
			fadeOutDown: () => cl,
			fadeOutDownBig: () => dl,
			fadeOutLeft: () => hl,
			fadeOutLeftBig: () => ul,
			fadeOutRight: () => fl,
			fadeOutRightBig: () => pl,
			fadeOutTopLeft: () => ml,
			fadeOutTopRight: () => vl,
			fadeOutUp: () => bl,
			fadeOutUpBig: () => gl,
			flash: () => bn,
			flip: () => yl,
			flipInX: () => wl,
			flipInY: () => xl,
			flipOutX: () => _l,
			flipOutY: () => $l,
			headShake: () => gn,
			heartBeat: () => yn,
			hinge: () => Xl,
			jackInTheBox: () => ql,
			jello: () => wn,
			lightSpeedInLeft: () => kl,
			lightSpeedInRight: () => Cl,
			lightSpeedOutLeft: () => zl,
			lightSpeedOutRight: () => Bl,
			pulse: () => xn,
			rollIn: () => Yl,
			rollOut: () => Wl,
			rotateIn: () => Ol,
			rotateInDownLeft: () => Sl,
			rotateInDownRight: () => Ll,
			rotateInUpLeft: () => Al,
			rotateInUpRight: () => Ml,
			rotateOut: () => jl,
			rotateOutDownLeft: () => Tl,
			rotateOutDownRight: () => Il,
			rotateOutUpLeft: () => Ul,
			rotateOutUpRight: () => Dl,
			rubberBand: () => _n,
			shake: () => $n,
			shakeX: () => kn,
			shakeY: () => Cn,
			slideInDown: () => El,
			slideInLeft: () => Fl,
			slideInRight: () => Rl,
			slideInUp: () => Hl,
			slideOutDown: () => Nl,
			slideOutLeft: () => Pl,
			slideOutRight: () => Vl,
			slideOutUp: () => Zl,
			swing: () => zn,
			tada: () => Bn,
			wobble: () => On,
			zoomIn: () => Gl,
			zoomInDown: () => Kl,
			zoomInLeft: () => Ql,
			zoomInRight: () => Jl,
			zoomInUp: () => tc,
			zoomOut: () => ec,
			zoomOutDown: () => rc,
			zoomOutLeft: () => ic,
			zoomOutRight: () => oc,
			zoomOutUp: () => ac,
		});
		var mn,
			vn = [
				{
					offset: 0,
					easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
					transform: "translate3d(0, 0, 0)",
				},
				{
					offset: 0.2,
					easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
					transform: "translate3d(0, 0, 0)",
				},
				{
					offset: 0.4,
					easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
					transform: "translate3d(0, -30px, 0) scaleY(1.1)",
				},
				{
					offset: 0.43,
					easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
					transform: "translate3d(0, -30px, 0) scaleY(1.1)",
				},
				{
					offset: 0.53,
					easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
					transform: "translate3d(0, 0, 0)",
				},
				{
					offset: 0.7,
					easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
					transform: "translate3d(0, -15px, 0) scaleY(1.05)",
				},
				{
					offset: 0.8,
					"transition-timing-function":
						"cubic-bezier(0.215, 0.61, 0.355, 1)",
					transform: "translate3d(0, 0, 0) scaleY(0.95)",
				},
				{
					offset: 0.9,
					transform: "translate3d(0, -4px, 0) scaleY(1.02)",
				},
				{
					offset: 1,
					easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
					transform: "translate3d(0, 0, 0)",
				},
			],
			bn = [
				{ offset: 0, opacity: "1" },
				{ offset: 0.25, opacity: "0" },
				{ offset: 0.5, opacity: "1" },
				{ offset: 0.75, opacity: "0" },
				{ offset: 1, opacity: "1" },
			],
			gn = [
				{ offset: 0, transform: "translateX(0)" },
				{ offset: 0.065, transform: "translateX(-6px) rotateY(-9deg)" },
				{ offset: 0.185, transform: "translateX(5px) rotateY(7deg)" },
				{ offset: 0.315, transform: "translateX(-3px) rotateY(-5deg)" },
				{ offset: 0.435, transform: "translateX(2px) rotateY(3deg)" },
				{ offset: 0.5, transform: "translateX(0)" },
			],
			yn = [
				{ offset: 0, transform: "scale(1)" },
				{ offset: 0.14, transform: "scale(1.3)" },
				{ offset: 0.28, transform: "scale(1)" },
				{ offset: 0.42, transform: "scale(1.3)" },
				{ offset: 0.7, transform: "scale(1)" },
			],
			wn = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{ offset: 0.111, transform: "translate3d(0, 0, 0)" },
				{ offset: 0.222, transform: "skewX(-12.5deg) skewY(-12.5deg)" },
				{
					offset: 0.33299999999999996,
					transform: "skewX(6.25deg) skewY(6.25deg)",
				},
				{
					offset: 0.444,
					transform: "skewX(-3.125deg) skewY(-3.125deg)",
				},
				{
					offset: 0.555,
					transform: "skewX(1.5625deg) skewY(1.5625deg)",
				},
				{
					offset: 0.6659999999999999,
					transform: "skewX(-0.78125deg) skewY(-0.78125deg)",
				},
				{
					offset: 0.777,
					transform: "skewX(0.390625deg) skewY(0.390625deg)",
				},
				{
					offset: 0.888,
					transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			xn = [
				{ offset: 0, transform: "scale3d(1, 1, 1)" },
				{ offset: 0.5, transform: "scale3d(1.05, 1.05, 1.05)" },
				{ offset: 1, transform: "scale3d(1, 1, 1)" },
			],
			_n = [
				{ offset: 0, transform: "scale3d(1, 1, 1)" },
				{ offset: 0.3, transform: "scale3d(1.25, 0.75, 1)" },
				{ offset: 0.4, transform: "scale3d(0.75, 1.25, 1)" },
				{ offset: 0.5, transform: "scale3d(1.15, 0.85, 1)" },
				{ offset: 0.65, transform: "scale3d(0.95, 1.05, 1)" },
				{ offset: 0.75, transform: "scale3d(1.05, 0.95, 1)" },
				{ offset: 1, transform: "scale3d(1, 1, 1)" },
			],
			$n = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{ offset: 0.1, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.2, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.3, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.4, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.5, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.6, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.7, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.8, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.9, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			kn = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{ offset: 0.1, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.2, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.3, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.4, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.5, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.6, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.7, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 0.8, transform: "translate3d(10px, 0, 0)" },
				{ offset: 0.9, transform: "translate3d(-10px, 0, 0)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Cn = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{ offset: 0.1, transform: "translate3d(0, -10px, 0)" },
				{ offset: 0.2, transform: "translate3d(0, 10px, 0)" },
				{ offset: 0.3, transform: "translate3d(0, -10px, 0)" },
				{ offset: 0.4, transform: "translate3d(0, 10px, 0)" },
				{ offset: 0.5, transform: "translate3d(0, -10px, 0)" },
				{ offset: 0.6, transform: "translate3d(0, 10px, 0)" },
				{ offset: 0.7, transform: "translate3d(0, -10px, 0)" },
				{ offset: 0.8, transform: "translate3d(0, 10px, 0)" },
				{ offset: 0.9, transform: "translate3d(0, -10px, 0)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			zn = [
				{ offset: 0.2, transform: "rotate3d(0, 0, 1, 15deg)" },
				{ offset: 0.4, transform: "rotate3d(0, 0, 1, -10deg)" },
				{ offset: 0.6, transform: "rotate3d(0, 0, 1, 5deg)" },
				{ offset: 0.8, transform: "rotate3d(0, 0, 1, -5deg)" },
				{ offset: 1, transform: "rotate3d(0, 0, 1, 0deg)" },
			],
			Bn = [
				{ offset: 0, transform: "scale3d(1, 1, 1)" },
				{
					offset: 0.1,
					transform:
						"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.2,
					transform:
						"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.3,
					transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
				},
				{
					offset: 0.4,
					transform:
						"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.5,
					transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
				},
				{
					offset: 0.6,
					transform:
						"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.7,
					transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
				},
				{
					offset: 0.8,
					transform:
						"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.9,
					transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
				},
				{ offset: 1, transform: "scale3d(1, 1, 1)" },
			],
			On = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{
					offset: 0.15,
					transform:
						"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)",
				},
				{
					offset: 0.3,
					transform: "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)",
				},
				{
					offset: 0.45,
					transform:
						"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)",
				},
				{
					offset: 0.6,
					transform: "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)",
				},
				{
					offset: 0.75,
					transform:
						"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Sn = [
				{
					offset: 0,
					transform: "translateY(-1200px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 0.8,
					transform: "translateY(0px) scale(0.7)",
					opacity: "0.7",
				},
				{ offset: 1, transform: "scale(1)", opacity: "1" },
			],
			Ln = [
				{
					offset: 0,
					transform: "translateX(-2000px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 0.8,
					transform: "translateX(0px) scale(0.7)",
					opacity: "0.7",
				},
				{ offset: 1, transform: "scale(1)", opacity: "1" },
			],
			An = [
				{
					offset: 0,
					transform: "translateX(2000px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 0.8,
					transform: "translateX(0px) scale(0.7)",
					opacity: "0.7",
				},
				{ offset: 1, transform: "scale(1)", opacity: "1" },
			],
			Mn = [
				{
					offset: 0,
					transform: "translateY(1200px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 0.8,
					transform: "translateY(0px) scale(0.7)",
					opacity: "0.7",
				},
				{ offset: 1, transform: "scale(1)", opacity: "1" },
			],
			jn = [
				{ offset: 0, transform: "scale(1)", opacity: "1" },
				{
					offset: 0.2,
					transform: "translateY(0px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 1,
					transform: "translateY(700px) scale(0.7)",
					opacity: "0.7",
				},
			],
			Tn = [
				{ offset: 0, transform: "scale(1)", opacity: "1" },
				{
					offset: 0.2,
					transform: "translateX(0px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 1,
					transform: "translateX(-2000px) scale(0.7)",
					opacity: "0.7",
				},
			],
			In = [
				{ offset: 0, transform: "scale(1)", opacity: "1" },
				{
					offset: 0.2,
					transform: "translateX(0px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 1,
					transform: "translateX(2000px) scale(0.7)",
					opacity: "0.7",
				},
			],
			Un = [
				{ offset: 0, transform: "scale(1)", opacity: "1" },
				{
					offset: 0.2,
					transform: "translateY(0px) scale(0.7)",
					opacity: "0.7",
				},
				{
					offset: 1,
					transform: "translateY(-700px) scale(0.7)",
					opacity: "0.7",
				},
			],
			Dn = [
				{
					offset: 0,
					opacity: "0",
					transform: "scale3d(0.3, 0.3, 0.3)",
				},
				{ offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 0.2, transform: "scale3d(1.1, 1.1, 1.1)" },
				{ offset: 0.2, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 0.4, transform: "scale3d(0.9, 0.9, 0.9)" },
				{ offset: 0.4, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.6,
					opacity: "1",
					transform: "scale3d(1.03, 1.03, 1.03)",
				},
				{ offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 0.8, transform: "scale3d(0.97, 0.97, 0.97)" },
				{ offset: 0.8, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 1, opacity: "1", transform: "scale3d(1, 1, 1)" },
				{ offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
			],
			En = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, -3000px, 0) scaleY(3)",
				},
				{ offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.6,
					opacity: "1",
					transform: "translate3d(0, 25px, 0) scaleY(0.9)",
				},
				{ offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.75,
					transform: "translate3d(0, -10px, 0) scaleY(0.95)",
				},
				{ offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.9,
					transform: "translate3d(0, 5px, 0) scaleY(0.985)",
				},
				{ offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
				{ offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
			],
			Fn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(-3000px, 0, 0) scaleX(3)",
				},
				{ offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.6,
					opacity: "1",
					transform: "translate3d(25px, 0, 0) scaleX(1)",
				},
				{ offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.75,
					transform: "translate3d(-10px, 0, 0) scaleX(0.98)",
				},
				{ offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.9,
					transform: "translate3d(5px, 0, 0) scaleX(0.995)",
				},
				{ offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
				{ offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
			],
			Rn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(3000px, 0, 0) scaleX(3)",
				},
				{ offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.6,
					opacity: "1",
					transform: "translate3d(-25px, 0, 0) scaleX(1)",
				},
				{ offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.75,
					transform: "translate3d(10px, 0, 0) scaleX(0.98)",
				},
				{ offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.9,
					transform: "translate3d(-5px, 0, 0) scaleX(0.995)",
				},
				{ offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
				{ offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
			],
			Hn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, 3000px, 0) scaleY(5)",
				},
				{ offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.6,
					opacity: "1",
					transform: "translate3d(0, -20px, 0) scaleY(0.9)",
				},
				{ offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.75,
					transform: "translate3d(0, 10px, 0) scaleY(0.95)",
				},
				{ offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{
					offset: 0.9,
					transform: "translate3d(0, -5px, 0) scaleY(0.985)",
				},
				{ offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
				{ offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
			],
			Nn = [
				{ offset: 0.2, transform: "scale3d(0.9, 0.9, 0.9)" },
				{
					offset: 0.5,
					opacity: "1",
					transform: "scale3d(1.1, 1.1, 1.1)",
				},
				{
					offset: 0.55,
					opacity: "1",
					transform: "scale3d(1.1, 1.1, 1.1)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "scale3d(0.3, 0.3, 0.3)",
				},
			],
			Pn = [
				{
					offset: 0.2,
					transform: "translate3d(0, 10px, 0) scaleY(0.985)",
				},
				{
					offset: 0.4,
					opacity: "1",
					transform: "translate3d(0, -20px, 0) scaleY(0.9)",
				},
				{
					offset: 0.45,
					opacity: "1",
					transform: "translate3d(0, -20px, 0) scaleY(0.9)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, 2000px, 0) scaleY(3)",
				},
			],
			Vn = [
				{
					offset: 0.2,
					opacity: "1",
					transform: "translate3d(20px, 0, 0) scaleX(0.9)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(-2000px, 0, 0) scaleX(2)",
				},
			],
			Zn = [
				{
					offset: 0.2,
					opacity: "1",
					transform: "translate3d(-20px, 0, 0) scaleX(0.9)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(2000px, 0, 0) scaleX(2)",
				},
			],
			Xn = [
				{
					offset: 0.2,
					transform: "translate3d(0, -10px, 0) scaleY(0.985)",
				},
				{
					offset: 0.4,
					opacity: "1",
					transform: "translate3d(0, 20px, 0) scaleY(0.9)",
				},
				{
					offset: 0.45,
					opacity: "1",
					transform: "translate3d(0, 20px, 0) scaleY(0.9)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, -2000px, 0) scaleY(3)",
				},
			],
			qn = [
				{ offset: 0, opacity: "0" },
				{ offset: 1, opacity: "1" },
			],
			Yn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(-100%, 100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Wn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(100%, 100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Gn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, -100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Kn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, -2000px, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Qn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(-100%, 0, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Jn = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(-2000px, 0, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			tl = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(100%, 0, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			el = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(2000px, 0, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			rl = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(-100%, -100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			il = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(100%, -100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			ol = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, 100%, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			al = [
				{
					offset: 0,
					opacity: "0",
					transform: "translate3d(0, 2000px, 0)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			sl = [
				{ offset: 0, opacity: "1" },
				{ offset: 1, opacity: "0" },
			],
			nl = [
				{ offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(-100%, 100%, 0)",
				},
			],
			ll = [
				{ offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(100%, 100%, 0)",
				},
			],
			cl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, 100%, 0)",
				},
			],
			dl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, 2000px, 0)",
				},
			],
			hl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(-100%, 0, 0)",
				},
			],
			ul = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(-2000px, 0, 0)",
				},
			],
			fl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(100%, 0, 0)",
				},
			],
			pl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(2000px, 0, 0)",
				},
			],
			ml = [
				{ offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(-100%, -100%, 0)",
				},
			],
			vl = [
				{ offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(100%, -100%, 0)",
				},
			],
			bl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, -100%, 0)",
				},
			],
			gl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform: "translate3d(0, -2000px, 0)",
				},
			],
			yl = [
				{
					offset: 0,
					transform:
						"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",
					easing: "ease-out",
				},
				{
					offset: 0.4,
					transform:
						"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg)",
					easing: "ease-out",
				},
				{
					offset: 0.5,
					transform:
						"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg)",
					easing: "ease-in",
				},
				{
					offset: 0.8,
					transform:
						"perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg)",
					easing: "ease-in",
				},
				{
					offset: 1,
					transform:
						"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",
					easing: "ease-in",
				},
			],
			wl = [
				{
					offset: 0,
					transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
					easing: "ease-in",
					opacity: "0",
				},
				{
					offset: 0.4,
					transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
					easing: "ease-in",
				},
				{
					offset: 0.6,
					transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)",
					opacity: "1",
				},
				{
					offset: 0.8,
					transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)",
				},
				{ offset: 1, transform: "perspective(400px)" },
			],
			xl = [
				{
					offset: 0,
					transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
					easing: "ease-in",
					opacity: "0",
				},
				{
					offset: 0.4,
					transform: "perspective(400px) rotate3d(0, 1, 0, -20deg)",
					easing: "ease-in",
				},
				{
					offset: 0.6,
					transform: "perspective(400px) rotate3d(0, 1, 0, 10deg)",
					opacity: "1",
				},
				{
					offset: 0.8,
					transform: "perspective(400px) rotate3d(0, 1, 0, -5deg)",
				},
				{ offset: 1, transform: "perspective(400px)" },
			],
			_l = [
				{ offset: 0, transform: "perspective(400px)" },
				{
					offset: 0.3,
					transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
					opacity: "1",
				},
				{
					offset: 1,
					transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
					opacity: "0",
				},
			],
			$l = [
				{ offset: 0, transform: "perspective(400px)" },
				{
					offset: 0.3,
					transform: "perspective(400px) rotate3d(0, 1, 0, -15deg)",
					opacity: "1",
				},
				{
					offset: 1,
					transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
					opacity: "0",
				},
			],
			kl = [
				{
					offset: 0,
					transform: "translate3d(-100%, 0, 0) skewX(30deg)",
					opacity: "0",
				},
				{ offset: 0.6, transform: "skewX(-20deg)", opacity: "1" },
				{ offset: 0.8, transform: "skewX(5deg)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Cl = [
				{
					offset: 0,
					transform: "translate3d(100%, 0, 0) skewX(-30deg)",
					opacity: "0",
				},
				{ offset: 0.6, transform: "skewX(20deg)", opacity: "1" },
				{ offset: 0.8, transform: "skewX(-5deg)" },
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			zl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "translate3d(-100%, 0, 0) skewX(-30deg)",
					opacity: "0",
				},
			],
			Bl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "translate3d(100%, 0, 0) skewX(30deg)",
					opacity: "0",
				},
			],
			Ol = [
				{
					offset: 0,
					transform: "rotate3d(0, 0, 1, -200deg)",
					opacity: "0",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" },
			],
			Sl = [
				{
					offset: 0,
					transform: "rotate3d(0, 0, 1, -45deg)",
					opacity: "0",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" },
			],
			Ll = [
				{
					offset: 0,
					transform: "rotate3d(0, 0, 1, 45deg)",
					opacity: "0",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" },
			],
			Al = [
				{
					offset: 0,
					transform: "rotate3d(0, 0, 1, 45deg)",
					opacity: "0",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" },
			],
			Ml = [
				{
					offset: 0,
					transform: "rotate3d(0, 0, 1, -90deg)",
					opacity: "0",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" },
			],
			jl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "rotate3d(0, 0, 1, 200deg)",
					opacity: "0",
				},
			],
			Tl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "rotate3d(0, 0, 1, 45deg)",
					opacity: "0",
				},
			],
			Il = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "rotate3d(0, 0, 1, -45deg)",
					opacity: "0",
				},
			],
			Ul = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "rotate3d(0, 0, 1, -45deg)",
					opacity: "0",
				},
			],
			Dl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					transform: "rotate3d(0, 0, 1, 90deg)",
					opacity: "0",
				},
			],
			El = [
				{
					offset: 0,
					transform: "translate3d(0, -100%, 0)",
					visibility: "visible",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Fl = [
				{
					offset: 0,
					transform: "translate3d(-100%, 0, 0)",
					visibility: "visible",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Rl = [
				{
					offset: 0,
					transform: "translate3d(100%, 0, 0)",
					visibility: "visible",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Hl = [
				{
					offset: 0,
					transform: "translate3d(0, 100%, 0)",
					visibility: "visible",
				},
				{ offset: 1, transform: "translate3d(0, 0, 0)" },
			],
			Nl = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					visibility: "hidden",
					transform: "translate3d(0, 100%, 0)",
				},
			],
			Pl = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					visibility: "hidden",
					transform: "translate3d(-100%, 0, 0)",
				},
			],
			Vl = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					visibility: "hidden",
					transform: "translate3d(100%, 0, 0)",
				},
			],
			Zl = [
				{ offset: 0, transform: "translate3d(0, 0, 0)" },
				{
					offset: 1,
					visibility: "hidden",
					transform: "translate3d(0, -100%, 0)",
				},
			],
			Xl = [
				{ offset: 0, easing: "ease-in-out" },
				{
					offset: 0.2,
					transform: "rotate3d(0, 0, 1, 80deg)",
					easing: "ease-in-out",
				},
				{
					offset: 0.4,
					transform: "rotate3d(0, 0, 1, 60deg)",
					easing: "ease-in-out",
					opacity: "1",
				},
				{
					offset: 0.6,
					transform: "rotate3d(0, 0, 1, 80deg)",
					easing: "ease-in-out",
				},
				{
					offset: 0.8,
					transform: "rotate3d(0, 0, 1, 60deg)",
					easing: "ease-in-out",
					opacity: "1",
				},
				{
					offset: 1,
					transform: "translate3d(0, 700px, 0)",
					opacity: "0",
				},
			],
			ql = [
				{
					offset: 0,
					opacity: "0",
					transform: "scale(0.1) rotate(30deg)",
					"transform-origin": "center bottom",
				},
				{ offset: 0.5, transform: "rotate(-10deg)" },
				{ offset: 0.7, transform: "rotate(3deg)" },
				{ offset: 1, opacity: "1", transform: "scale(1)" },
			],
			Yl = [
				{
					offset: 0,
					opacity: "0",
					transform:
						"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)",
				},
				{ offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" },
			],
			Wl = [
				{ offset: 0, opacity: "1" },
				{
					offset: 1,
					opacity: "0",
					transform:
						"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)",
				},
			],
			Gl = [
				{
					offset: 0,
					opacity: "0",
					transform: "scale3d(0.3, 0.3, 0.3)",
				},
				{ offset: 0.5, opacity: "1" },
			],
			Kl = [
				{
					offset: 0,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 0.6,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			Ql = [
				{
					offset: 0,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 0.6,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			Jl = [
				{
					offset: 0,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 0.6,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			tc = [
				{
					offset: 0,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 0.6,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			ec = [
				{ offset: 0, opacity: "1" },
				{
					offset: 0.5,
					opacity: "0",
					transform: "scale3d(0.3, 0.3, 0.3)",
				},
				{ offset: 1, opacity: "0" },
			],
			rc = [
				{
					offset: 0.4,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 1,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			ic = [
				{
					offset: 0.4,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "scale(0.1) translate3d(-2000px, 0, 0)",
				},
			],
			oc = [
				{
					offset: 0.4,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)",
				},
				{
					offset: 1,
					opacity: "0",
					transform: "scale(0.1) translate3d(2000px, 0, 0)",
				},
			],
			ac = [
				{
					offset: 0.4,
					opacity: "1",
					transform:
						"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
					easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				},
				{
					offset: 1,
					opacity: "0",
					transform:
						"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1)",
				},
			],
			sc = {
				linear: "linear",
				ease: "ease",
				easeIn: "ease-in",
				easeOut: "ease-out",
				easeInOut: "ease-in-out",
				easeInSine: "cubic-bezier(0.47, 0, 0.745, 0.715)",
				easeOutSine: "cubic-bezier(0.39, 0.575, 0.565, 1)",
				easeInOutSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
				easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
				easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
				easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
				easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
				easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
				easeInQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
				easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
				easeInOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
				easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
				easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
				easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
				easeInExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				easeOutExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
				easeInOutExpo: "cubic-bezier(1, 0, 0, 1)",
				easeInCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
				easeOutCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
				easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
				easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
				easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				easeInOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			},
			nc = class extends G {
				constructor() {
					super(...arguments),
						(this.hasStarted = !1),
						(this.name = "none"),
						(this.play = !1),
						(this.delay = 0),
						(this.direction = "normal"),
						(this.duration = 1e3),
						(this.easing = "linear"),
						(this.endDelay = 0),
						(this.fill = "auto"),
						(this.iterations = 1 / 0),
						(this.iterationStart = 0),
						(this.playbackRate = 1);
				}
				get currentTime() {
					var t, e;
					return null !=
						(e =
							null == (t = this.animation)
								? void 0
								: t.currentTime)
						? e
						: 0;
				}
				set currentTime(t) {
					this.animation && (this.animation.currentTime = t);
				}
				connectedCallback() {
					super.connectedCallback(),
						this.createAnimation(),
						(this.handleAnimationCancel =
							this.handleAnimationCancel.bind(this)),
						(this.handleAnimationFinish =
							this.handleAnimationFinish.bind(this));
				}
				disconnectedCallback() {
					super.disconnectedCallback(), this.destroyAnimation();
				}
				handleAnimationChange() {
					this.hasUpdated && this.createAnimation();
				}
				handleAnimationFinish() {
					(this.play = !1),
						(this.hasStarted = !1),
						Ht(this, "sl-finish");
				}
				handleAnimationCancel() {
					(this.play = !1),
						(this.hasStarted = !1),
						Ht(this, "sl-cancel");
				}
				handlePlayChange() {
					return (
						!!this.animation &&
						(this.play &&
							!this.hasStarted &&
							((this.hasStarted = !0), Ht(this, "sl-start")),
						this.play
							? this.animation.play()
							: this.animation.pause(),
						!0)
					);
				}
				handlePlaybackRateChange() {
					this.animation &&
						(this.animation.playbackRate = this.playbackRate);
				}
				handleSlotChange() {
					this.destroyAnimation(), this.createAnimation();
				}
				async createAnimation() {
					var t, e;
					const r =
							null != (t = pn.easings[this.easing])
								? t
								: this.easing,
						i = null != (e = this.keyframes) ? e : pn[this.name],
						o = (await this.defaultSlot).assignedElements()[0];
					return !(
						!o ||
						!i ||
						(this.destroyAnimation(),
						(this.animation = o.animate(i, {
							delay: this.delay,
							direction: this.direction,
							duration: this.duration,
							easing: r,
							endDelay: this.endDelay,
							fill: this.fill,
							iterationStart: this.iterationStart,
							iterations: this.iterations,
						})),
						(this.animation.playbackRate = this.playbackRate),
						this.animation.addEventListener(
							"cancel",
							this.handleAnimationCancel
						),
						this.animation.addEventListener(
							"finish",
							this.handleAnimationFinish
						),
						this.play
							? ((this.hasStarted = !0), Ht(this, "sl-start"))
							: this.animation.pause(),
						0)
					);
				}
				destroyAnimation() {
					this.animation &&
						(this.animation.cancel(),
						this.animation.removeEventListener(
							"cancel",
							this.handleAnimationCancel
						),
						this.animation.removeEventListener(
							"finish",
							this.handleAnimationFinish
						),
						(this.hasStarted = !1));
				}
				cancel() {
					var t;
					null == (t = this.animation) || t.cancel();
				}
				finish() {
					var t;
					null == (t = this.animation) || t.finish();
				}
				render() {
					return j` <slot @slotchange=${this.handleSlotChange}></slot> `;
				}
			};
		(nc.styles = fn),
			gt(
				[
					((mn = "slot"),
					kt({
						descriptor: (t) => ({
							async get() {
								var t;
								return (
									await this.updateComplete,
									null === (t = this.renderRoot) ||
									void 0 === t
										? void 0
										: t.querySelector(mn)
								);
							},
							enumerable: !0,
							configurable: !0,
						}),
					})),
				],
				nc.prototype,
				"defaultSlot",
				2
			),
			gt([xt()], nc.prototype, "name", 2),
			gt([xt({ type: Boolean, reflect: !0 })], nc.prototype, "play", 2),
			gt([xt({ type: Number })], nc.prototype, "delay", 2),
			gt([xt()], nc.prototype, "direction", 2),
			gt([xt({ type: Number })], nc.prototype, "duration", 2),
			gt([xt()], nc.prototype, "easing", 2),
			gt(
				[xt({ attribute: "end-delay", type: Number })],
				nc.prototype,
				"endDelay",
				2
			),
			gt([xt()], nc.prototype, "fill", 2),
			gt([xt({ type: Number })], nc.prototype, "iterations", 2),
			gt(
				[xt({ attribute: "iteration-start", type: Number })],
				nc.prototype,
				"iterationStart",
				2
			),
			gt([xt({ attribute: !1 })], nc.prototype, "keyframes", 2),
			gt(
				[xt({ attribute: "playback-rate", type: Number })],
				nc.prototype,
				"playbackRate",
				2
			),
			gt(
				[
					Rt("name"),
					Rt("delay"),
					Rt("direction"),
					Rt("duration"),
					Rt("easing"),
					Rt("endDelay"),
					Rt("fill"),
					Rt("iterations"),
					Rt("iterationsStart"),
					Rt("keyframes"),
				],
				nc.prototype,
				"handleAnimationChange",
				1
			),
			gt([Rt("play")], nc.prototype, "handlePlayChange", 1),
			gt(
				[Rt("playbackRate")],
				nc.prototype,
				"handlePlaybackRateChange",
				1
			),
			(nc = gt([yt("sl-animation")], nc));
		var lc = te`
  ${Je}
  .wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2rem;
    background: var(--chip-background);
    border: 0.063rem solid var(--chip-border-color);
    border-radius: 0.5rem;
    width: max-content;
    padding: 0.125rem;
  }

  .plain {
    border: none;
  }

  .only-text-wrapper {
    padding: 0.375rem 0.75rem;
  }

  .prefix-wrapper {
    padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  }

  .suffix-wrapper {
    padding: 0.375rem 0.672rem 0.375rem 0.75rem;
  }

  .full-wrapper {
    padding: 0.25rem 0.672rem 0.25rem 0.5rem;
  }

  .plain:hover:not([disabled]) {
    background: var(--chip-plain-hover-background);
    cursor: pointer;
  }

  .plain:focus:not([disabled]) {
    background: var(--chip-plain-focus-background);
    cursor: pointer;
    outline: none;
  }

  .outlined:hover:not([disabled]) {
    background: var(--chip-outlined-hover-background);
    cursor: pointer;
  }

  .outlined:focus:not([disabled]) {
    background: var(--chip-outlined-focus-background);
    cursor: pointer;
    border: 0.063rem solid var(--chip-border-color);
    outline: none;
  }

  .tonal {
    background: var(--chip-tonal-background);
    border: none;
  }

  .tonal:hover {
    background: var(--chip-tonal-hover-background);
    cursor: pointer;
  }

  .tonal:focus {
    background: var(--chip-tonal-focus-background);
    cursor: pointer;
  }

  .plain[disabled],
  .outlined[disabled],
  .tonal[disabled] {
    cursor: not-allowed;
    opacity: 0.38;
    box-shadow: none;
    color: var(--chip-disabled-color);
  }

  .outlined[disabled] {
    background: none;
  }

  .tonal[disabled] {
    background: none;
  }

  .wrapper-dragged {
    box-shadow: ${Jt(`${dr("--elevation31", !1)}, ${dr("--elevation30", !0)}`)};
    filter: var(--elevation-filter);
    background: var(--chip-dragged-background);
    border-radius: 0.5rem;
  }

  .text {
    font-size: var(--m3-label-large-font-size);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    display: flex;
    align-items: center;
    text-align: center;
    color: var(--chip-text-color);
    flex: none;
    order: 0;
    flex-grow: 0;
    justify-content: center;
  }

  .has-prefix {
    padding-left: 0.5rem;
  }

  .has-suffix {
    padding-right: 0.5rem;
  }

  .elevated {
    box-shadow: ${Jt(`${dr("--elevation20", !1)}, ${dr("--elevation11", !0)}`)};
  }

  .elevated[disabled] {
    background: var(--chip-elevated-disabled);
  }
`,
			cc = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let dc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.disabled = !1),
					(this.elevated = !1),
					(this.variant = "outlined"),
					(this.hasSlottedPrefix = !1),
					(this.hasSlottedSuffix = !1);
			}
			render() {
				return Be`
      <div
        draggable="true"
        ?elevated=${this.elevated}
        ?disabled=${this.disabled}
        class=${sr({
			wrapper: !0,
			plain: "plain" == this.variant,
			outlined: "outlined" == this.variant,
			tonal: "tonal" == this.variant,
			"only-text-wrapper": !(
				this.hasSlottedPrefix && this.hasSlottedSuffix
			),
			"prefix-wrapper": this.hasSlottedPrefix && !this.hasSlottedSuffix,
			"suffix-wrapper": !this.hasSlottedPrefix && this.hasSlottedSuffix,
			"full-wrapper": this.hasSlottedPrefix && this.hasSlottedSuffix,
			elevated: this.elevated,
		})}
        tabindex="0"
      >
        <slot name="prefix" @slotchange=${this._handlePrefixSlotChange}></slot>
        <div
          class=${sr({
				text: !0,
				"has-prefix": this.hasSlottedPrefix,
				"has-suffix": this.hasSlottedSuffix,
			})}
        >
          ${this.text}
        </div>
        <slot name="suffix" @slotchange=${this._handleSuffixSlotChange}></slot>
      </div>
    `;
			}
			_handlePrefixSlotChange() {
				(this.hasSlottedPrefix = !0), this.requestUpdate();
			}
			_handleSuffixSlotChange() {
				(this.hasSlottedSuffix = !0), this.requestUpdate();
			}
			firstUpdated() {
				const t = this.renderRoot.querySelector(".wrapper");
				if (!t) return;
				const e = t.classList;
				t.addEventListener("dragstart", () => {
					e.add("wrapper-dragged");
				}),
					t.addEventListener("dragend", () =>
						e.remove("wrapper-dragged")
					);
			}
		};
		(dc.styles = lc),
			cc([Ge()], dc.prototype, "text", void 0),
			cc(
				[Ge({ type: Boolean, reflect: !0 })],
				dc.prototype,
				"disabled",
				void 0
			),
			cc(
				[Ge({ type: Boolean, reflect: !0 })],
				dc.prototype,
				"elevated",
				void 0
			),
			cc([Ge({ reflect: !0 })], dc.prototype, "variant", void 0),
			cc([Ke()], dc.prototype, "hasSlottedPrefix", void 0),
			cc([Ke()], dc.prototype, "hasSlottedSuffix", void 0),
			(dc = cc([Ye("agosh-chip")], dc));
		var hc = dc,
			uc = te`
  ${Je}

  .box-with-background {
    padding: 1rem 0;
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--surface10);
    border-radius: 1rem;
    min-height: 3.5rem;
  }

  .wrapper-all-range {
    position: relative;
    height: ${1.5}rem;
  }

  /* for tooltip to appear on the trackball only use input[type='range']:hover .tooltip {...} */
  .wrapper-all-range:hover .tooltip {
    display: flex;
  }

  .range-wrapper {
    position: absolute;
    top: 0;
    left: ${0.75}rem;
    right: ${0.75}rem;
    pointer-events: none;
    z-index: 10;
  }

  input[type='range'] {
    width: calc(100% + ${1.5}rem);
    display: block;
    margin: 0;
    margin-left: -${0.75}rem;
    margin-right: -${0.75}rem;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    outline: none;
    display: block;
    pointer-events: none;
  }

  /* [START]: track ball */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    /* [START]: common styles between browsers */
    width: ${1.5}rem;
    height: ${1.5}rem;
    border: 0.125rem solid var(--surface);
    border-radius: ${1.5}rem;
    background: var(--primary);
    cursor: pointer;
    pointer-events: auto;
    /* [END]: common styles between browsers */
  }

  input[type='range']::-moz-range-thumb {
    /* [START]: common styles between browsers */
    width: ${1.5}rem;
    height: ${1.5}rem;
    border: 0.125rem solid var(--surface);
    border-radius: ${1.5}rem;
    background: var(--primary);
    cursor: pointer;
    pointer-events: auto;
    /* [END]: common styles between browsers */
  }
  /* [END]: track ball */

  .track {
    width: 100%;
    height: 0.25rem;
    border-radius: 0.3125rem;
    background-color: var(--m3-ref-secondary-secondary90);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }

  .highlighted-area {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: var(--primary);
    border-radius: 1rem;
  }

  .tooltip {
    /* [START]: typography */
    text-decoration: var(--m3-label-large-text-decoration);
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    /* [END]: typography */

    background: var(--primary);
    color: var(--surface);
    padding: 0 0.5rem;
    height: 2.25rem;
    min-width: 3rem;
    position: absolute;
    top: -1.625rem;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    display: none;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 50%;
    transform: translateX(-50%) rotate(315deg);
    border-color: transparent transparent var(--primary) var(--primary);
    border-style: solid;
    border-width: 0.5rem;
    height: 1rem;
    width: 1rem;
  }

  .label {
    /* [START]: typography */
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    /* [END]: typography */

    margin-bottom: 1.5rem;
    color: var(--on-surface-variant);
  }

  .scale {
    font-size: var(--m3-label-small-font-size);
    text-decoration: var(--m3-label-small-text-decoration);
    font-family: var(--m3-label-small-font-family);
    font-weight: var(--m3-label-small-font-weight);
    font-style: var(--m3-label-small-font-style);
    font-stretch: var(--m3-label-small-font-stretch);
    letter-spacing: var(--m3-label-small-letter-spacing);
    line-height: var(--m3-label-small-line-height);

    color: var(--m3-ref-secondary-secondary70);
    position: absolute;
    bottom: 0;
    left: ${0.75}rem;
    right: -${0.75}rem;
    top: 1rem;
    width: calc(100% + -${1.5}rem);
    display: flex;
    justify-content: space-between;
    z-index: 9;
  }

  .result {
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
    color: var(--on-surface);
    margin-bottom: 1rem;
    padding-left: ${0.75}rem;
  }
`;
		/**
		 * @license
		 * Copyright 2020 Google LLC
		 * SPDX-License-Identifier: BSD-3-Clause
		 */ const fc = {},
			pc = or(
				class extends ar {
					constructor(t) {
						if (
							(super(t),
							t.type !== rr && t.type !== er && t.type !== ir)
						)
							throw Error(
								"The `live` directive is not allowed on child or event bindings"
							);
						if (!((t) => void 0 === t.strings)(t))
							throw Error(
								"`live` bindings can only contain a single expression"
							);
					}
					render(t) {
						return t;
					}
					update(t, [e]) {
						if (e === Oe || e === Se) return e;
						const r = t.element,
							i = t.name;
						if (t.type === rr) {
							if (e === r[i]) return Oe;
						} else if (t.type === ir) {
							if (!!e === r.hasAttribute(i)) return Oe;
						} else if (
							t.type === er &&
							r.getAttribute(i) === e + ""
						)
							return Oe;
						return (
							((t, e = fc) => {
								t._$AH = e;
								/**
								 * @license
								 * Copyright 2020 Google LLC
								 * SPDX-License-Identifier: BSD-3-Clause
								 */
							})(t),
							e
						);
					}
				}
			);
		var mc = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let vc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.min = 0),
					(this.max = 100),
					(this.step = 1),
					(this.double = !1),
					(this.suffix = ""),
					(this.prefix = ""),
					(this.label = void 0),
					(this.scale = !1),
					(this.result = !1),
					(this.tooltip = !0),
					(this.tooltip1 = null),
					(this.tooltip2 = null),
					(this.highlightedArea = null),
					(this.format = (t) =>
						`${this.prefix || ""}${t}${this.suffix || ""}`);
			}
			firstUpdated() {
				void 0 === this.value1 && (this.value1 = this.min),
					void 0 === this.value2 &&
						this.double &&
						(this.value2 = this.max),
					(this.tooltip1 =
						this.renderRoot.querySelector(".tooltip--1")),
					(this.tooltip2 =
						this.renderRoot.querySelector(".tooltip--2")),
					(this.highlightedArea =
						this.renderRoot.querySelector(".highlighted-area")),
					this.handleChange(),
					this.requestUpdate();
			}
			handleChange() {
				this.tooltip1 &&
					(this.tooltip1.style.left = `${this.tooltipOneLeft}%`),
					this.tooltip2 &&
						(this.tooltip2.style.left = `${this.tooltipTwoLeft}%`),
					this.highlightedArea &&
						((this.highlightedArea.style.left = this.double
							? `${this.tooltipOneLeft}%`
							: "0%"),
						(this.highlightedArea.style.right = this.double
							? 100 - this.tooltipTwoLeft + "%"
							: 100 - this.tooltipOneLeft + "%")),
					Sr(this, "agosh-change", {
						detail: { value1: this.value1, value2: this.value2 },
					});
			}
			handleInput1(t) {
				const e = Ai(t, 0).value;
				(this.value1 = +e), this.handleChange(), this.requestUpdate();
			}
			handleInput2(t) {
				const e = Ai(t, 0).value;
				(this.value2 = +e), this.handleChange(), this.requestUpdate();
			}
			render() {
				var t, e;
				return (
					console.log("this.tooltip", this.tooltip),
					Be` <div>
      ${this.label ? Be`<div class="label">${this.label}</div>` : ""}

      <div class="box-with-background">
        ${this.result ? Be`<div class="result">${this.resultText}</div>` : ""}

        <div class="wrapper-all-range">
          <div class="range-wrapper">
            <div class="track"><div class="highlighted-area"></div></div>
            <input
              type="range"
              step=${Lo(this.step)}
              min=${Lo(this.min)}
              max=${Lo(this.max)}
              name=${Lo(this.name1)}
              .value=${pc(
					null === (t = void 0 === this.value1 ? "" : this.value1) ||
						void 0 === t
						? void 0
						: t.toString()
				)}
              @input=${this.handleInput1}
            />
            ${
				this.tooltip
					? Be`<div class="tooltip tooltip--1">${this.value1}</div>`
					: ""
			}
          </div>

          ${
				this.double
					? Be`<div class="range-wrapper">
                <input
                  type="range"
                  step=${Lo(this.step)}
                  min=${Lo(this.min)}
                  max=${Lo(this.max)}
                  name=${Lo(this.name2)}
                  .value=${pc(
						null ===
							(e = void 0 === this.value2 ? "" : this.value2) ||
							void 0 === e
							? void 0
							: e.toString()
					)}
                  @input=${this.handleInput2}
                />
                ${
					this.tooltip
						? Be`<div class="tooltip tooltip--2">${this.value2}</div>`
						: ""
				}
              </div>`
					: ""
			}
          ${
				this.scale
					? Be`<div class="scale">
                <div>${this.format(this.min)}</div>
                <div>${this.format(this.max)}</div>
              </div>`
					: ""
			}
        </div>
      </div>
    </div>`
				);
			}
			get rangeDomain() {
				return this.max - this.min;
			}
			get tooltipOneLeft() {
				return void 0 === this.value1
					? this.min
					: ((this.value1 - this.min) / this.rangeDomain) * 100;
			}
			get tooltipTwoLeft() {
				return void 0 === this.value2
					? this.max
					: ((this.value2 - this.min) / this.rangeDomain) * 100;
			}
			get resultText() {
				const t = [this.value1];
				return (
					this.double && t.push(this.value2),
					t
						.filter(Boolean)
						.map((t) => this.format(Number(t)))
						.join(" - ")
				);
			}
		};
		(vc.styles = uc),
			mc([Ge({ type: Number })], vc.prototype, "min", void 0),
			mc([Ge({ type: Number })], vc.prototype, "max", void 0),
			mc([Ge({ type: String })], vc.prototype, "name1", void 0),
			mc([Ge({ type: String })], vc.prototype, "name2", void 0),
			mc([Ge({ type: Number })], vc.prototype, "value1", void 0),
			mc([Ge({ type: Number })], vc.prototype, "value2", void 0),
			mc([Ge({ type: Number })], vc.prototype, "step", void 0),
			mc([Ge({ type: Boolean })], vc.prototype, "double", void 0),
			mc([Ge({ type: String })], vc.prototype, "suffix", void 0),
			mc([Ge({ type: String })], vc.prototype, "prefix", void 0),
			mc([Ge({ type: String })], vc.prototype, "label", void 0),
			mc([Ge({ type: Boolean })], vc.prototype, "scale", void 0),
			mc([Ge({ type: Boolean })], vc.prototype, "result", void 0),
			mc([Ge({ type: Boolean })], vc.prototype, "tooltip", void 0),
			mc([Ke()], vc.prototype, "tooltip1", void 0),
			mc([Ke()], vc.prototype, "tooltip2", void 0),
			mc([Ke()], vc.prototype, "highlightedArea", void 0),
			(vc = mc([Ye("agosh-range")], vc));
		var bc = vc,
			gc = te`
  ${Je}

  .wrapper {
    opacity: 1;
    transition: opacity 0.8s;
  }

  .horizontal-wrapper {
    position: relative;
    overflow: hidden;
    width: 34.5rem;
    height: 45.25rem;
    border-radius: 1.5rem;
  }

  .vertical-wrapper {
    position: relative;
    overflow: hidden;
    width: 29.25rem;
    height: 42rem;
  }

  .slider-image {
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    overflow: hidden;
  }

  .nav-button {
    position: absolute;
    width: 3rem;
    height: 3rem;
    bottom: 50%;
    cursor: pointer;
  }

  .vertical-wrapper .slider-image {
    border-radius: 0;
  }

  .nav-button-vertical {
    cursor: pointer;
  }

  .vertical-wrapper svg {
    height: 1.573rem;
  }

  .vertical-wrapper .thumb-nails {
    flex-direction: column;
    position: absolute;
    left: 1.313rem;
    gap: 0.5rem;
    height: 100%;
    top: 0;
  }

  .left-button {
    left: 0;
  }

  .right-button {
    right: 0;
  }

  .thumb-nails {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.438rem;
  }

  .horizontal-wrapper .thumb-nails {
    flex-direction: row;
    position: absolute;
    bottom: 1rem;
    gap: 0.438rem;
    width: 100%;
  }

  .thumb-nail {
    width: 2.5rem;
    height: 2.5rem;
    filter: drop-shadow(${Jt(dr("--elevation30"))});
    cursor: pointer;
  }

  .dot,
  .thumb-nail {
    box-sizing: border-box;
    border: 0.125rem solid var(--white);
    overflow: hidden;
    border-radius: 50%;
    flex-grow: 0;
    flex: none;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--white);
    box-shadow: ${Jt(dr("--elevation31", !0))};
  }

  .thumb-nail-active {
    width: 3rem;
    height: 3rem;
    filter: drop-shadow(${Jt(dr("--elevation30"))});
  }

  .thumb-nail-image {
    width: 100%;
  }

  .disabled-button {
    opacity: 0.2;
    pointer-events: none;
  }

  .fade-in {
    opacity: 0;
    transition: opacity 0.8s;
  }

  @media only screen and (max-width: 768px) {
    .horizontal-wrapper,
    .vertical-wrapper {
      width: 100%;
      height: 100%;
    }
  }
`,
			yc = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let wc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.orientation = "horizontal"),
					(this.loop = !1),
					(this.images = []),
					(this.activeIndex = 0);
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				const t = [...(this.childNodes || [])]
					.filter((t) => "IMG" === t.nodeName)
					.map((t, e) => ({
						index: e,
						position: e,
						src: t.src,
						innerHTML: t.innerHTML,
						alt: t.alt,
					}));
				(this.images = t), this.setThumbnails("fadeIn");
			}
			next() {
				(this.loop || this.activeIndex !== this.images.length - 1) &&
					(this.setThumbnails("fadeOut"),
					setTimeout(() => {
						(this.activeIndex =
							this.activeIndex == this.images.length - 1
								? 0
								: this.activeIndex + 1),
							this.setThumbnails(
								"horizontal" === this.orientation
									? "slideInRight"
									: "slideInDown"
							),
							Sr(this, "agosh-next", {
								detail: this.thumbnails.current,
							}),
							Sr(this, "agosh-change", {
								detail: this.thumbnails.current,
							});
					}, 200));
			}
			previous() {
				(this.loop || 0 !== this.activeIndex) &&
					(this.setThumbnails("fadeOut"),
					setTimeout(() => {
						(this.activeIndex =
							0 == this.activeIndex
								? this.images.length - 1
								: this.activeIndex - 1),
							this.setThumbnails(
								"horizontal" === this.orientation
									? "slideInLeft"
									: "slideInUp"
							),
							Sr(this, "agosh-previous", {
								detail: this.thumbnails.current,
							}),
							Sr(this, "agosh-change", {
								detail: this.thumbnails.current,
							});
					}, 200));
			}
			slide(t) {
				1 != t && (0 == t ? this.previous() : this.next());
			}
			setThumbnails(t) {
				(this.thumbnails = {
					previous: this.images.at(this.activeIndex - 1),
					current: this.images.at(this.activeIndex),
					next: this.images.at(
						this.activeIndex + 1 === this.images.length
							? 0
							: this.activeIndex + 1
					),
				}),
					this.animateSlide(t),
					this.requestUpdate();
			}
			animateSlide(t) {
				this.renderRoot
					.querySelectorAll("sl-animation")
					.forEach((e) => {
						e &&
							((e.fill = "auto"),
							(e.name = t),
							(e.easing = "easeInOutCubic"),
							(e.duration = 200),
							(e.play = !0));
					});
				const e = this.renderRoot.querySelector(".wrapper");
				e && e.classList.toggle("fade-in");
			}
			render() {
				return (
					this.activeIndex == this.images.length - 1 &&
						console.log(this.activeIndex),
					this.images.length > 0
						? Be`
          <div
            class=${sr({
				wrapper: !0,
				"horizontal-wrapper": "horizontal" === this.orientation,
				"vertical-wrapper": "vertical" === this.orientation,
			})}
          >
            ${
				this.thumbnails.current
					? Be`
                  <img
                    class="slider-image"
                    src=${Lo(this.thumbnails.current.src)}
                    alt=${Lo(this.thumbnails.current.alt)}
                  />
                `
					: ""
			}
            ${
				"horizontal" === this.orientation
					? Be`
                  <div
                    @click=${this.previous}
                    class=${sr({
						"nav-button": !0,
						"left-button": !0,
						"disabled-button": !this.loop && 0 === this.activeIndex,
					})}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.4209 13.42C28.6409 12.64 27.3809 12.64 26.6009 13.42L17.4209 22.6C16.6409 23.38 16.6409 24.64 17.4209 25.42L26.6009 34.6C27.3809 35.38 28.6409 35.38 29.4209 34.6C30.2009 33.82 30.2009 32.56 29.4209 31.78L21.6609 24L29.4209 16.24C30.2009 15.46 30.1809 14.18 29.4209 13.42V13.42Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div
                    @click=${this.next}
                    class=${sr({
						"nav-button": !0,
						"right-button": !0,
						"disabled-button":
							!this.loop &&
							this.activeIndex === this.images.length - 1,
					})}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5772 13.42C17.7972 14.2 17.7972 15.46 18.5772 16.24L26.3372 24L18.5772 31.76C17.7972 32.54 17.7972 33.8 18.5772 34.58C19.3572 35.36 20.6172 35.36 21.3972 34.58L30.5772 25.4C31.3572 24.62 31.3572 23.36 30.5772 22.58L21.3972 13.4C20.6372 12.64 19.3572 12.64 18.5772 13.42Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                `
					: ""
			}

            <div class="thumb-nails">
              ${
					"vertical" === this.orientation
						? Be`
                    <div
                      @click=${this.previous}
                      class=${sr({
							"nav-button-vertical": !0,
							"disabled-button":
								!this.loop && 0 === this.activeIndex,
						})}
                      class="nav-button-vertical"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2895 14.71C17.6795 14.32 17.6795 13.69 17.2895 13.3L12.6995 8.70998C12.3095 8.31998 11.6795 8.31998 11.2895 8.70998L6.69953 13.3C6.30953 13.69 6.30953 14.32 6.69953 14.71C7.08953 15.1 7.71953 15.1 8.10953 14.71L11.9995 10.83L15.8795 14.71C16.2695 15.1 16.9095 15.09 17.2895 14.71Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  `
						: ""
				}

              <div class="dot"></div>
              ${Object.entries(this.thumbnails).map(
					([t, e], r) => Be`<div
                  class=${sr({
						"thumb-nail": !0,
						"thumb-nail-active": "current" === t,
					})}
                  @click=${() => this.slide(r)}
                >
                  <sl-animation
                    name="fadeIn"
                    easing="easeInOutQuint"
                    iterations="1"
                    play
                  >
                    <img class="thumb-nail-image" src=${Lo(e.src)} />
                  </sl-animation>
                </div>`
				)}
              <div class="dot"></div>

              ${
					"vertical" === this.orientation
						? Be`
                    <div
                      @click=${this.next}
                      class=${sr({
							"nav-button-vertical": !0,
							"disabled-button":
								!this.loop &&
								this.activeIndex === this.images.length - 1,
						})}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2902 9.29006C16.9002 8.90006 16.2702 8.90006 15.8802 9.29006L12.0002 13.1701L8.12022 9.29006C7.73022 8.90006 7.10022 8.90006 6.71022 9.29006C6.32022 9.68006 6.32022 10.3101 6.71022 10.7001L11.3002 15.2901C11.6902 15.6801 12.3202 15.6801 12.7102 15.2901L17.3002 10.7001C17.6802 10.3201 17.6802 9.68006 17.2902 9.29006Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  `
						: ""
				}
            </div>
          </div>
        `
						: ""
				);
			}
		};
		(wc.styles = gc),
			yc([Ge({ reflect: !0 })], wc.prototype, "orientation", void 0),
			yc(
				[Ge({ type: Boolean, reflect: !0 })],
				wc.prototype,
				"loop",
				void 0
			),
			yc([Ke()], wc.prototype, "images", void 0),
			yc([Ke()], wc.prototype, "thumbnails", void 0),
			yc([Ke()], wc.prototype, "activeIndex", void 0),
			(wc = yc([Ye("agosh-image-slider")], wc));
		var xc = wc,
			_c = te`
  ${Je}
  ::part(base) {
    position: absolute;
    font-family: var(--m3-body-large-font-family);
    font-size: var(--m3-body-large-font-size);
    font-weight: var(--m3-body-large-font-weight);
    line-height: var(--m3-body-large-line-height);
    letter-spacing: var(--m3-body-large-letter-spacing);
    text-align: left;
    color: var(--on-surface);
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    padding: 1rem;
    order: 0;
    align-self: stretch;
    align-items: center;
    gap: 1rem;
    width: fit-content;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.25rem 0;
    box-shadow: ${Jt(`${dr("--elevation11", !1)}, ${dr("--elevation21", !0)}`)};
    background: linear-gradient(
        0deg,
        var(--primary-opacity008),
        var(--primary-opacity008)
      ),
      var(--chip-background);
    border-radius: 0.25rem;
  }

  .sub-menu {
    position: absolute;
    right: -0.5rem;
  }
`,
			$c = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let kc = class extends Xe {
			constructor() {
				super(...arguments), (this.menuItems = []);
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				this.menuItems = this._processChildren(this.childNodes);
			}
			_processChildren(t, e) {
				return [...(t || [])]
					.filter((t) => "AGOSH-MENU-ITEM" === t.nodeName)
					.map((t, r) => {
						const i = [...(t.childNodes || [])].filter(
							(t) => "AGOSH-MENU" === t.nodeName
						);
						return {
							index: r,
							id: t.id,
							dataCy: t.dataCy,
							parent: {
								id: null == e ? void 0 : e.id,
								dataCy: null == e ? void 0 : e.dataCy,
								element: e,
							},
							menuItems:
								i.length > 0
									? this._processChildren(i[0].childNodes, t)
									: [],
							element: this._getParentMenuElement(t),
						};
					});
			}
			_getParentMenuElement(t) {
				const e = t.querySelectorAll("agosh-menu");
				for (let r = 0; r < e.length; r++) t.removeChild(e[r]);
				return t;
			}
			render() {
				return this._renderMenus(this.menuItems, !1);
			}
			_renderMenus(t, e, r) {
				let i = 0;
				return (
					null != r && (i = r.element.getBoundingClientRect().height),
					Be`
      <sl-menu
        style="margin-top:-${i / 16}rem"
        class=${sr({ "sub-menu": e })}
      >
        ${t.map(
			(e) => Be` <div @click=${() => this._toggle(e, t)}>
              ${e.element}
            </div>
            ${
				1 == e.element.selected && e.menuItems.length > 0
					? this._renderMenus(e.menuItems, !0, e)
					: ""
			}`
		)}
      </sl-menu>
    `
				);
			}
			_toggle(t, e) {
				e.map((e) => {
					e.index === t.index
						? (e.element.toggle(), this._resetChildSelection(e))
						: e.element.unSelect();
				}),
					Sr(this, "agosh-menu-select", { detail: t }),
					this.requestUpdate();
			}
			_resetChildSelection(t) {
				t.menuItems.length > 0 &&
					t.menuItems.map((t) => {
						t.element.unSelect(), this._resetChildSelection(t);
					});
			}
		};
		(kc.styles = _c),
			$c([Ke()], kc.prototype, "menuItems", void 0),
			(kc = $c([Ye("agosh-menu")], kc));
		var Cc = kc,
			zc = te`
  ${Je}
  .menu-item {
    position: relative;
    font-family: var(--m3-body-large-font-family);
    font-size: var(--m3-body-large-font-size);
    font-weight: var(--m3-body-large-font-weight);
    line-height: var(--m3-body-large-line-height);
    letter-spacing: var(--m3-body-large-letter-spacing);
    text-align: left;
    color: var(--on-surface);
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    padding: 0.75rem;
    order: 0;
    align-self: stretch;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(
        0deg,
        var(--primary-opacity008),
        var(--primary-opacity008)
      ),
      var(--chip-background);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 17.5rem;
  }

  .prefix-content {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .menu-item:hover,
  .selected {
    background-color: var(--fab-surface-active-bg);
  }

  .compact {
    padding: 0.25rem;
  }
`,
			Bc = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Oc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.dataCy = ""),
					(this.selected = !1),
					(this.compact = !1),
					(this.hasPrefix = !1),
					(this.hasSuffix = !1),
					(this.toggle = () => {
						(this.selected = !this.selected), this.requestUpdate();
					}),
					(this.unSelect = () => {
						(this.selected = !1), this.requestUpdate();
					}),
					(this.select = () => {
						(this.selected = !0), this.requestUpdate();
					});
			}
			_handlePrefixSlotChange() {
				(this.hasPrefix = !0), this.requestUpdate();
			}
			_handleSuffixSlotChange() {
				(this.hasSuffix = !0), this.requestUpdate();
			}
			render() {
				return Be`<div
      class=${sr({
			"menu-item": !0,
			compact: this.compact,
			selected: this.selected,
		})}
    >
      <div class="prefix-content">
        <slot
          name="prefix"
          slot="prefix"
          @slotchange=${this._handlePrefixSlotChange}
        ></slot>
        <slot></slot>
      </div>
      <slot
        name="suffix"
        slot="suffix"
        @slotchange=${this._handleSuffixSlotChange}
      ></slot>
    </div>`;
			}
		};
		(Oc.styles = zc),
			Bc([Ge({ type: String })], Oc.prototype, "id", void 0),
			Bc([Ge({ attribute: "data-cy" })], Oc.prototype, "dataCy", void 0),
			Bc([Ge({ type: Boolean })], Oc.prototype, "selected", void 0),
			Bc([Ge({ type: Boolean })], Oc.prototype, "compact", void 0),
			Bc([Ke()], Oc.prototype, "hasPrefix", void 0),
			Bc([Ke()], Oc.prototype, "hasSuffix", void 0),
			(Oc = Bc([Ye("agosh-menu-item")], Oc));
		var Sc = Oc;
		const Lc = "100%";
		var Ac = te`
  ${Je}

  ::part(base) {
    --sl-textarea-spacing-medium: 1rem;
    border: 1px solid var(--outline);
    background-color: var(--surface);
    border-radius: 0.5rem;
    transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  ::part(form-control-label) {
    color: var(--outline);
    padding: 0;
    position: relative;
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    left: -1rem;
    top: -1rem;
    transform: translate(2rem, 2rem) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    z-index: 1;
    pointer-events: none;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
  }

  ::part(textarea) {
    height: ${Jt(Lc)};
    background-color: var(--transparent);
    color: var(--on-surface);
    padding: 1rem;
  }

  .textarea--disabled::part(textarea) {
    color: var(--m3-ref-neutral-neutral50);
  }

  ::part(textarea)::placeholder {
    color: var(--outline);
  }

  ::part(form-control-help-text) {
    display: flex;
    justify-content: flex-end;
    color: var(--on-surface);
    width: ${Jt(Lc)};
    margin-top: 0;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
  }

  .textarea--focused::part(base) {
    border-color: var(--primary);
    box-shadow: inset 0 0 0 1px var(--primary);
  }

  .textarea--disabled::part(base) {
    opacity: 1;
    pointer-events: none;
    background-color: var(--m3-ref-neutral-neutral90);
  }

  .textarea--shrink::part(form-control-label) {
    transform: translate(2rem, 1.4rem) scale(0.75);
    color: var(--primary);
    font-weight: var(--m3-label-medium-font-weight);
  }

  .textarea--focused::part(base) {
    border-color: var(--primary);
    box-shadow: inset 0 0 0 1px var(--primary);
  }

  .textarea--disabled::part(form-control-label) {
    color: var(--m3-ref-neutral-neutral50);
  }
`,
			Mc = l`
  ${Q}
  ${wo}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: var(--sl-focus-ring);
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    box-shadow: var(--sl-focus-ring);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }
`,
			jc = class extends G {
				constructor() {
					super(...arguments),
						(this.formSubmitController = new Vr(this)),
						(this.hasSlotController = new wr(
							this,
							"help-text",
							"label"
						)),
						(this.hasFocus = !1),
						(this.size = "medium"),
						(this.value = ""),
						(this.filled = !1),
						(this.label = ""),
						(this.helpText = ""),
						(this.rows = 4),
						(this.resize = "vertical"),
						(this.disabled = !1),
						(this.readonly = !1),
						(this.required = !1),
						(this.invalid = !1);
				}
				connectedCallback() {
					super.connectedCallback(),
						(this.resizeObserver = new ResizeObserver(() =>
							this.setTextareaHeight()
						)),
						this.updateComplete.then(() => {
							this.setTextareaHeight(),
								this.resizeObserver.observe(this.input);
						});
				}
				firstUpdated() {
					this.invalid = !this.input.checkValidity();
				}
				disconnectedCallback() {
					super.disconnectedCallback(),
						this.resizeObserver.unobserve(this.input);
				}
				focus(t) {
					this.input.focus(t);
				}
				blur() {
					this.input.blur();
				}
				select() {
					this.input.select();
				}
				scrollPosition(t) {
					return t
						? ("number" == typeof t.top &&
								(this.input.scrollTop = t.top),
						  void (
								"number" == typeof t.left &&
								(this.input.scrollLeft = t.left)
						  ))
						: {
								top: this.input.scrollTop,
								left: this.input.scrollTop,
						  };
				}
				setSelectionRange(t, e, r = "none") {
					this.input.setSelectionRange(t, e, r);
				}
				setRangeText(t, e, r, i = "preserve") {
					this.input.setRangeText(t, e, r, i),
						this.value !== this.input.value &&
							((this.value = this.input.value),
							Ht(this, "sl-input")),
						this.value !== this.input.value &&
							((this.value = this.input.value),
							this.setTextareaHeight(),
							Ht(this, "sl-input"),
							Ht(this, "sl-change"));
				}
				reportValidity() {
					return this.input.reportValidity();
				}
				setCustomValidity(t) {
					this.input.setCustomValidity(t),
						(this.invalid = !this.input.checkValidity());
				}
				handleBlur() {
					(this.hasFocus = !1), Ht(this, "sl-blur");
				}
				handleChange() {
					(this.value = this.input.value),
						this.setTextareaHeight(),
						Ht(this, "sl-change");
				}
				handleDisabledChange() {
					(this.input.disabled = this.disabled),
						(this.invalid = !this.input.checkValidity());
				}
				handleFocus() {
					(this.hasFocus = !0), Ht(this, "sl-focus");
				}
				handleInput() {
					(this.value = this.input.value),
						this.setTextareaHeight(),
						Ht(this, "sl-input");
				}
				handleRowsChange() {
					this.setTextareaHeight();
				}
				handleValueChange() {
					this.invalid = !this.input.checkValidity();
				}
				setTextareaHeight() {
					"auto" === this.resize
						? ((this.input.style.height = "auto"),
						  (this.input.style.height = `${this.input.scrollHeight}px`))
						: (this.input.style.height = void 0);
				}
				render() {
					const t = this.hasSlotController.test("label"),
						e = this.hasSlotController.test("help-text"),
						r = !!this.label || !!t,
						i = !!this.helpText || !!e;
					return j`
      <div
        part="form-control"
        class=${st({
			"form-control": !0,
			"form-control--small": "small" === this.size,
			"form-control--medium": "medium" === this.size,
			"form-control--large": "large" === this.size,
			"form-control--has-label": r,
			"form-control--has-help-text": i,
		})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${st({
				textarea: !0,
				"textarea--small": "small" === this.size,
				"textarea--medium": "medium" === this.size,
				"textarea--large": "large" === this.size,
				"textarea--standard": !this.filled,
				"textarea--filled": this.filled,
				"textarea--disabled": this.disabled,
				"textarea--focused": this.hasFocus,
				"textarea--empty": 0 === this.value.length,
				"textarea--invalid": this.invalid,
				"textarea--resize-none": "none" === this.resize,
				"textarea--resize-vertical": "vertical" === this.resize,
				"textarea--resize-auto": "auto" === this.resize,
			})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${Ft(this.name)}
              .value=${Bi(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Ft(this.placeholder)}
              rows=${Ft(this.rows)}
              minlength=${Ft(this.minlength)}
              maxlength=${Ft(this.maxlength)}
              autocapitalize=${Ft(this.autocapitalize)}
              autocorrect=${Ft(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${Ft(this.spellcheck)}
              inputmode=${Ft(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
				}
			};
		(jc.styles = Mc),
			gt([Ct(".textarea__control")], jc.prototype, "input", 2),
			gt([_t()], jc.prototype, "hasFocus", 2),
			gt([xt({ reflect: !0 })], jc.prototype, "size", 2),
			gt([xt()], jc.prototype, "name", 2),
			gt([xt()], jc.prototype, "value", 2),
			gt([xt({ type: Boolean, reflect: !0 })], jc.prototype, "filled", 2),
			gt([xt()], jc.prototype, "label", 2),
			gt([xt({ attribute: "help-text" })], jc.prototype, "helpText", 2),
			gt([xt()], jc.prototype, "placeholder", 2),
			gt([xt({ type: Number })], jc.prototype, "rows", 2),
			gt([xt()], jc.prototype, "resize", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				jc.prototype,
				"disabled",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				jc.prototype,
				"readonly",
				2
			),
			gt([xt({ type: Number })], jc.prototype, "minlength", 2),
			gt([xt({ type: Number })], jc.prototype, "maxlength", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				jc.prototype,
				"required",
				2
			),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				jc.prototype,
				"invalid",
				2
			),
			gt([xt()], jc.prototype, "autocapitalize", 2),
			gt([xt()], jc.prototype, "autocorrect", 2),
			gt([xt()], jc.prototype, "autocomplete", 2),
			gt([xt({ type: Boolean })], jc.prototype, "autofocus", 2),
			gt([xt({ type: Boolean })], jc.prototype, "spellcheck", 2),
			gt([xt()], jc.prototype, "inputmode", 2),
			gt(
				[Rt("disabled", { waitUntilFirstUpdate: !0 })],
				jc.prototype,
				"handleDisabledChange",
				1
			),
			gt(
				[Rt("rows", { waitUntilFirstUpdate: !0 })],
				jc.prototype,
				"handleRowsChange",
				1
			),
			gt(
				[Rt("value", { waitUntilFirstUpdate: !0 })],
				jc.prototype,
				"handleValueChange",
				1
			),
			(jc = gt([yt("sl-textarea")], jc));
		var Tc = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Ic = class extends Xe {
			constructor() {
				super(...arguments),
					(this.formSubmitController = new bi(this)),
					(this.value = ""),
					(this.helpText = ""),
					(this.rows = 3),
					(this.disabled = !1),
					(this.required = !1),
					(this.autofocus = !1),
					(this.hasFocus = this.autofocus),
					(this.hasSlottedHelpText = !1),
					(this.shrink = !!this.value);
			}
			connectedCallback() {
				super.connectedCallback(),
					(this.shrink = !!this.value),
					(this.hasFocus = !!this.autofocus);
			}
			_handleBlur() {
				var t;
				this.hasFocus = !1;
				const e =
					null === (t = this.renderRoot) || void 0 === t
						? void 0
						: t.querySelector("sl-textarea");
				if (!e) return;
				const r = e.value;
				(this.shrink = !!r),
					Sr(this, "agosh-blur"),
					this.requestUpdate();
			}
			_handleHelpTextSlotChange() {
				(this.hasSlottedHelpText = !0), this.requestUpdate();
			}
			_handleInput(t) {
				(this.value = Ai(t, 0).value),
					Sr(this, "agosh-textarea", {
						detail: { value: this.value },
					});
			}
			_handleKeyDown(t) {
				const e = t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
				"Enter" !== t.key || e || this.formSubmitController.submit();
			}
			_handleFocus() {
				(this.hasFocus = !0),
					(this.shrink = !0),
					Sr(this, "agosh-focus"),
					this.requestUpdate();
			}
			_handleChange() {
				Sr(this, "agosh-change", { detail: { value: this.value } });
			}
			_handleClear() {
				Sr(this, "agosh-clear");
			}
			render() {
				const t = !!this.helpText || this.hasSlottedHelpText;
				return Be`
      <sl-textarea
        class=${sr({
			"input--shrink": this.shrink,
			"textarea--disabled": this.disabled,
			"textarea--focused": this.hasFocus,
			"textarea--has-help-text": t,
		})}
        placeholder=${this.placeholder}
        value=${this.value}
        resize="none"
        help-text=${this.helpText}
        rows=${this.rows}
        .disabled=${this.disabled}
        required=${this.required}
        .autofocus=${this.autofocus}
        @sl-blur=${this._handleBlur}
        @keydown=${this._handleKeyDown}
        @sl-change=${this._handleChange}
        @sl-clear=${this._handleClear}
        @sl-input=${this._handleInput}
        @sl-focus=${this._handleFocus}
      >
        <slot
          name="help-text"
          slot="help-text"
          @slotchange=${this._handleHelpTextSlotChange}
          >${this.helpText}</slot
        >
      </sl-textarea>
    `;
			}
		};
		(Ic.styles = Ac),
			Tc([Ge()], Ic.prototype, "placeholder", void 0),
			Tc([Ge()], Ic.prototype, "value", void 0),
			Tc(
				[Ge({ attribute: "help-text" })],
				Ic.prototype,
				"helpText",
				void 0
			),
			Tc([Ge({ type: Number })], Ic.prototype, "rows", void 0),
			Tc(
				[Ge({ type: Boolean, reflect: !0 })],
				Ic.prototype,
				"disabled",
				void 0
			),
			Tc(
				[Ge({ type: Boolean, reflect: !0 })],
				Ic.prototype,
				"required",
				void 0
			),
			Tc(
				[Ge({ type: Boolean, reflect: !0 })],
				Ic.prototype,
				"autofocus",
				void 0
			),
			Tc([Ke()], Ic.prototype, "hasFocus", void 0),
			Tc([Ke()], Ic.prototype, "hasSlottedHelpText", void 0),
			Tc([Ke()], Ic.prototype, "shrink", void 0),
			(Ic = Tc([Ye("agosh-textarea")], Ic));
		var Uc = Ic,
			Dc = te`
  ${Je}

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }

  .details {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .wrapper-variant4 {
    padding: 1rem;
    min-width: 15.312rem;
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--chip-background);
    border-radius: 1rem;
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
  }

  .profile-name {
    display: flex;
    align-items: center;
    gap: 4.67px;
    height: 1.25rem;
  }

  .rating-section-variant1 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rating-section-variant2 {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .name {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    display: flex;
    align-items: center;
    color: var(--on-surface);
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .name-variant3 {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
    display: flex;
    align-items: center;
    color: var(--on-surface);
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .reviews {
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface-variant);
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }

  .rating-value {
    color: var(--on-surface-variant);
  }

  .rating-completion {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .completion-rate {
    font-size: var(--m3-body-small-font-size);
    text-decoration: var(--m3-body-small-text-decoration);
    font-family: var(--m3-body-small-font-family);
    font-weight: var(--m3-body-small-font-weight);
    font-style: var(--m3-body-small-font-style);
    font-stretch: var(--m3-body-small-font-stretch);
    letter-spacing: var(--m3-body-small-letter-spacing);
    line-height: var(--m3-body-small-line-height);
    color: var(--on-surface-variant);
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
`,
			Ec = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Fc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.iconPosition = "right"),
					(this.verified = !1),
					(this.rating = 0),
					(this.reviews = 0),
					(this.progress = 0),
					(this.variant = "variant1"),
					(this.hasIconSlot = !1),
					(this.hasProfileNameSlot = !1),
					(this.hasReviewInfoSlot = !1);
			}
			_handleIconSlotChange() {
				(this.hasIconSlot = !0), this.requestUpdate();
			}
			_handleProfileNameSlotChange() {
				(this.hasProfileNameSlot = !0), this.requestUpdate();
			}
			_handleReviewInfoSlotChange() {
				(this.hasReviewInfoSlot = !0), this.requestUpdate();
			}
			onClickProfilePic() {
				Sr(this, "agosh-profile-pic"), this.requestUpdate();
			}
			onClickProfile() {
				Sr(this, "agosh-profile"), this.requestUpdate();
			}
			render() {
				return Be`
      <div
        @click=${this.onClickProfile}
        style="justify-content:${
			"right" === this.iconPosition ? "space-between" : "flex-start"
		}"
        class=${sr({
			wrapper: !0,
			"wrapper-variant4": "variant4" === this.variant,
		})}
      >
        <div
          class="details"
          style="gap:${"variant3" === this.variant ? "1rem" : "0.5rem"}"
        >
          <div class="avatar" @click=${this.onClickProfilePic}>
            ${
				"variant3" === this.variant
					? Be`
                  <agosh-avatar
                    initial=${this.initial}
                    imageUrl=${this.imageUrl}
                    dotPosition="bottomRight"
                    size="4.25"
                  >
                  </agosh-avatar>
                `
					: Be`
                  <agosh-avatar
                    initial=${this.initial}
                    imageUrl=${this.imageUrl}
                    size="${"variant4" === this.variant ? 2.5 : 3}"
                  >
                  </agosh-avatar>
                `
			}
          </div>
          <div class="profile">
            <div class="profile-name">
              <slot
                name="profile-name"
                slot="profile-name"
                @slotchange=${this._handleProfileNameSlotChange}
              ></slot>
              ${
					this.hasProfileNameSlot
						? ""
						: Be`
                    <div
                      class=${sr({
							name: !0,
							"name-variant3": "variant3" === this.variant,
						})}
                    >
                      ${this.name}
                    </div>
                  `
				}
              ${
					this.verified
						? Be`
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3333 8L13.7066 6.14L13.9333 3.68L11.5266 3.13333L10.2666 1L7.99996 1.97333L5.73329 1L4.47329 3.12667L2.06663 3.66667L2.29329 6.13333L0.666626 8L2.29329 9.86L2.06663 12.3267L4.47329 12.8733L5.73329 15L7.99996 14.02L10.2666 14.9933L11.5266 12.8667L13.9333 12.32L13.7066 9.86L15.3333 8ZM6.25329 10.6733L4.66663 9.07333C4.40663 8.81333 4.40663 8.39333 4.66663 8.13333L4.71329 8.08667C4.97329 7.82667 5.39996 7.82667 5.65996 8.08667L6.73329 9.16667L10.1666 5.72667C10.4266 5.46667 10.8533 5.46667 11.1133 5.72667L11.16 5.77333C11.42 6.03333 11.42 6.45333 11.16 6.71333L7.21329 10.6733C6.93996 10.9333 6.51996 10.9333 6.25329 10.6733Z"
                        fill="#49AF90"
                      />
                      <path
                        d="M6.25335 10.6734L4.66668 9.0734C4.40668 8.8134 4.40668 8.3934 4.66668 8.1334L4.71335 8.08674C4.97335 7.82674 5.40001 7.82674 5.66001 8.08674L6.73335 9.16674L10.1667 5.72674C10.4267 5.46674 10.8533 5.46674 11.1133 5.72674L11.16 5.7734C11.42 6.0334 11.42 6.4534 11.16 6.7134L7.21335 10.6734C6.94001 10.9334 6.52001 10.9334 6.25335 10.6734Z"
                        fill="white"
                      />
                    </svg>
                  `
						: ""
				}
            </div>
            ${
				"variant1" === this.variant
					? Be`
                  <div class="rating-section-variant1">
                    <agosh-rating
                      value=${this.rating}
                      readonly
                      max="5"
                      precision="1"
                    ></agosh-rating>
                    <div class="reviews">
                      <slot
                        name="review-info"
                        @slotchange=${this._handleReviewInfoSlotChange}
                      ></slot>
                      ${
							this.hasReviewInfoSlot
								? ""
								: Be` ${this.reviews} reviews `
						}
                    </div>
                  </div>
                `
					: ""
			}
            ${
				"variant2" === this.variant || "variant3" === this.variant
					? Be`
                  <div
                    class="rating-completion"
                    style="flex-direction:${
						"variant3" === this.variant
							? "column-reverse"
							: "column"
					}"
                  >
                    <div class="rating-section-variant2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.70464 11.7984L10.4713 13.4717C10.978 13.7784 11.598 13.3251 11.4646 12.7517L10.7313 9.60508L13.178 7.48508C13.6246 7.09841 13.3846 6.36508 12.798 6.31841L9.57797 6.04508L8.31797 3.07175C8.0913 2.53175 7.31797 2.53175 7.0913 3.07175L5.8313 6.03841L2.6113 6.31175C2.02464 6.35841 1.78464 7.09175 2.2313 7.47841L4.67797 9.59841L3.94464 12.7451C3.8113 13.3184 4.4313 13.7717 4.93797 13.4651L7.70464 11.7984Z"
                          fill="#FFB428"
                        />
                      </svg>
                      <div class="name rating-value">${this.rating}</div>
                      <div class="reviews">
                        (
                        <slot
                          name="review-info"
                          @slotchange=${this._handleReviewInfoSlotChange}
                        ></slot>
                        ${
							this.hasReviewInfoSlot
								? ""
								: Be` ${this.reviews} reviews `
						}
                        )
                      </div>
                    </div>
                    <div class="completion-rate">
                      ${this.progress}% Completion rate
                    </div>
                  </div>
                `
					: ""
			}
          </div>
        </div>
        ${
			"variant1" === this.variant || "variant2" === this.variant
				? Be`
              <slot
                name="icon"
                slot="icon"
                @slotchange=${this._handleIconSlotChange}
              ></slot>
              ${
					this.hasIconSlot
						? ""
						: Be`
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
                        fill="var(--secondary)"
                      />
                    </svg>
                  `
				}
            `
				: ""
		}
      </div>
    `;
			}
		};
		(Fc.styles = Dc),
			Ec([Ge()], Fc.prototype, "initial", void 0),
			Ec([Ge()], Fc.prototype, "name", void 0),
			Ec([Ge()], Fc.prototype, "imageUrl", void 0),
			Ec([Ge()], Fc.prototype, "iconPosition", void 0),
			Ec(
				[Ge({ type: Boolean, reflect: !0 })],
				Fc.prototype,
				"verified",
				void 0
			),
			Ec([Ge({ type: Number })], Fc.prototype, "rating", void 0),
			Ec([Ge({ type: Number })], Fc.prototype, "reviews", void 0),
			Ec([Ge({ type: Number })], Fc.prototype, "progress", void 0),
			Ec([Ge({ reflect: !0 })], Fc.prototype, "variant", void 0),
			Ec([Ke()], Fc.prototype, "hasIconSlot", void 0),
			Ec([Ke()], Fc.prototype, "hasProfileNameSlot", void 0),
			Ec([Ke()], Fc.prototype, "hasReviewInfoSlot", void 0),
			(Fc = Ec([Ye("agosh-profile")], Fc));
		var Rc = Fc,
			Hc = te`
  ${Je}

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
  }

  ::part(header) {
    padding: 1.5rem 2.5rem;
    gap: 2.5rem;
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--chip-background);
    border-radius: 1rem;
    flex: 0 0 auto;
    order: 0;
    cursor: pointer;
    display: flex;
    align-items: start;
  }

  .summary {
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
    display: flex;
    align-items: center;
    color: var(--on-surface);
    width: 100%;
    justify-content: space-between;
  }

  ::part([slot='summary']) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .show {
    display: block;
  }
  .hide {
    display: none;
  }

  ::part(content) {
    padding: 0.5rem 2.5rem;
    gap: 0.625rem;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    color: var(--on-surface);
  }

  @media only screen and (max-width: 64rem) {
    ::part(header) {
      padding: 1rem 1rem 1.25rem 1rem;
    }
    ::part(content) {
      padding: 1rem;
    }
    .summary {
      font-size: var(--m3-body-medium-font-size);
      text-decoration: var(--m3-body-medium-text-decoration);
      font-family: var(--m3-body-medium-font-family);
      font-weight: var(--m3-body-medium-font-weight);
      font-style: var(--m3-body-medium-font-style);
      font-stretch: var(--m3-body-medium-font-stretch);
      letter-spacing: var(--m3-body-medium-letter-spacing);
      line-height: var(--m3-body-medium-line-height);
    }
  }
`,
			Nc = l`
  ${Q}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header${zr} {
    box-shadow: var(--sl-focus-ring);
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header${zr} {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`,
			Pc = class extends G {
				constructor() {
					super(...arguments), (this.open = !1), (this.disabled = !1);
				}
				firstUpdated() {
					(this.body.hidden = !this.open),
						(this.body.style.height = this.open ? "auto" : "0");
				}
				async show() {
					if (!this.open && !this.disabled)
						return (this.open = !0), Nt(this, "sl-after-show");
				}
				async hide() {
					if (this.open && !this.disabled)
						return (this.open = !1), Nt(this, "sl-after-hide");
				}
				handleSummaryClick() {
					this.disabled ||
						(this.open ? this.hide() : this.show(),
						this.header.focus());
				}
				handleSummaryKeyDown(t) {
					("Enter" !== t.key && " " !== t.key) ||
						(t.preventDefault(),
						this.open ? this.hide() : this.show()),
						("ArrowUp" !== t.key && "ArrowLeft" !== t.key) ||
							(t.preventDefault(), this.hide()),
						("ArrowDown" !== t.key && "ArrowRight" !== t.key) ||
							(t.preventDefault(), this.show());
				}
				async handleOpenChange() {
					if (this.open) {
						Ht(this, "sl-show"),
							await pr(this.body),
							(this.body.hidden = !1);
						const { keyframes: t, options: e } = yr(
							this,
							"details.show"
						);
						await ur(this.body, mr(t, this.body.scrollHeight), e),
							(this.body.style.height = "auto"),
							Ht(this, "sl-after-show");
					} else {
						Ht(this, "sl-hide"), await pr(this.body);
						const { keyframes: t, options: e } = yr(
							this,
							"details.hide"
						);
						await ur(this.body, mr(t, this.body.scrollHeight), e),
							(this.body.hidden = !0),
							(this.body.style.height = "auto"),
							Ht(this, "sl-after-hide");
					}
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			details: !0,
			"details--open": this.open,
			"details--disabled": this.disabled,
		})}
      >
        <header
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div part="content" id="content" class="details__content" role="region" aria-labelledby="header">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
				}
			};
		(Pc.styles = Nc),
			gt([Ct(".details")], Pc.prototype, "details", 2),
			gt([Ct(".details__header")], Pc.prototype, "header", 2),
			gt([Ct(".details__body")], Pc.prototype, "body", 2),
			gt([xt({ type: Boolean, reflect: !0 })], Pc.prototype, "open", 2),
			gt([xt()], Pc.prototype, "summary", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Pc.prototype,
				"disabled",
				2
			),
			gt(
				[Rt("open", { waitUntilFirstUpdate: !0 })],
				Pc.prototype,
				"handleOpenChange",
				1
			),
			(Pc = gt([yt("sl-details")], Pc)),
			gr("details.show", {
				keyframes: [
					{ height: "0", opacity: "0" },
					{ height: "auto", opacity: "1" },
				],
				options: { duration: 250, easing: "linear" },
			}),
			gr("details.hide", {
				keyframes: [
					{ height: "auto", opacity: "1" },
					{ height: "0", opacity: "0" },
				],
				options: { duration: 250, easing: "linear" },
			});
		var Vc = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Zc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.open = !1),
					(this.disabled = !1),
					(this.hasSummarySlot = !1),
					(this.hasOpenIconSlot = !1),
					(this.hasCloseIconSlot = !1),
					(this.show = () => {
						(this.open = !0), this.requestUpdate();
					}),
					(this.hide = () => {
						(this.open = !1), this.requestUpdate();
					});
			}
			_handleSummaryChange() {
				(this.hasSummarySlot = !0), this.requestUpdate();
			}
			_handleOpenIconChange() {
				(this.hasOpenIconSlot = !0), this.requestUpdate();
			}
			_handleCloseIconChange() {
				(this.hasCloseIconSlot = !0), this.requestUpdate();
			}
			_handleShow() {
				(this.open = !0),
					Sr(this, "agosh-show", {
						detail: { value: { open: this.open } },
					}),
					this.requestUpdate();
			}
			_handleHide() {
				(this.open = !1),
					Sr(this, "agosh-hide", {
						detail: { value: { open: this.open } },
					}),
					this.requestUpdate();
			}
			updated() {
				this._handleNativeIcons();
			}
			_handleNativeIcons() {
				if (this.hasOpenIconSlot && this.hasOpenIconSlot) {
					const t = this.renderRoot
						.querySelector("sl-details")
						.shadowRoot.querySelector(".details");
					if (t) {
						const e = t
							.querySelector("#header")
							.querySelector(".details__summary-icon");
						e && e.remove();
					}
				}
			}
			render() {
				return Be`
      <div class="wrapper">
        <sl-details
          ?open=${this.open}
          ?disabled=${this.disabled}
          @sl-after-show=${this._handleShow}
          @sl-after-hide=${this._handleHide}
        >
          <div
            class=${sr({
				summary: !0,
				"show-native-icons":
					this.hasOpenIconSlot && this.hasCloseIconSlot,
			})}
            slot="summary"
          >
            <div>
              <slot
                @slotchange=${this._handleSummaryChange}
                name="summary"
              ></slot>
              ${this.hasSummarySlot ? "" : this.summary}
            </div>

            <slot
              name="icon-close"
              class=${sr({ hide: this.open, show: !this.open })}
              @slotchange=${this._handleCloseIconChange}
            ></slot>
            <slot
              name="icon-open"
              class=${sr({ hide: !this.open, show: this.open })}
              @slotchange=${this._handleOpenIconChange}
            ></slot>
          </div>
          <slot></slot>
        </sl-details>
      </div>
    `;
			}
		};
		(Zc.styles = Hc),
			Vc([Ge()], Zc.prototype, "summary", void 0),
			Vc(
				[Ge({ type: Boolean, reflect: !0 })],
				Zc.prototype,
				"open",
				void 0
			),
			Vc(
				[Ge({ type: Boolean, reflect: !0 })],
				Zc.prototype,
				"disabled",
				void 0
			),
			Vc([Ke()], Zc.prototype, "hasSummarySlot", void 0),
			Vc([Ke()], Zc.prototype, "hasOpenIconSlot", void 0),
			Vc([Ke()], Zc.prototype, "hasCloseIconSlot", void 0),
			(Zc = Vc([Ye("agosh-accordian")], Zc));
		var Xc = Zc,
			qc = te`
  ${Je}

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: fit-content;
    gap: 0.75rem;
    align-items: center;
    cursor: pointer;
  }

  .icon-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.625rem;
    gap: 0.625rem;
    background-color: var(--surface31);
    background: linear-gradient(0deg, var(--surface31), var(--surface31)),
      var(--surface10);
    border-radius: 0.75rem;
    flex: none;
    order: 0;
    flex-grow: 0;
    width: 2.75rem;
    height: 2.75rem;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .info-primary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.125rem;
  }

  .info-secondary {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.125rem;
  }

  .info-normal {
    font-size: var(--m3-body-small-font-size);
    text-decoration: var(--m3-body-small-text-decoration);
    font-family: var(--m3-body-small-font-family);
    font-weight: var(--m3-body-small-font-weight);
    font-style: var(--m3-body-small-font-style);
    font-stretch: var(--m3-body-small-font-stretch);
    letter-spacing: var(--m3-body-small-letter-spacing);
    line-height: var(--m3-body-small-line-height);
    display: flex;
    align-items: center;
    color: var(--on-surface-variant);
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .info-bold {
    font-size: var(--m3-title-small-font-size);
    text-decoration: var(--m3-title-small-text-decoration);
    font-family: var(--m3-title-small-font-family);
    font-weight: var(--m3-title-small-font-weight);
    font-style: var(--m3-title-small-font-style);
    font-stretch: var(--m3-title-small-font-stretch);
    letter-spacing: var(--m3-title-small-letter-spacing);
    line-height: var(--m3-title-small-line-height);
    color: var(--on-surface);
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
`,
			Yc = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Wc = class extends Xe {
			constructor() {
				super(...arguments), (this.variant = "primary");
			}
			_onClick() {
				Sr(this, "agosh-click");
			}
			render() {
				return Be`<div @click=${this._onClick} class="wrapper">
      <div class="icon-section">
        <div class="icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="info-${this.variant}">
        <div class="info-normal">${this.normalText}</div>
        <div class="info-bold">${this.boldText}</div>
      </div>
    </div> `;
			}
		};
		(Wc.styles = qc),
			Yc([Ge()], Wc.prototype, "normalText", void 0),
			Yc([Ge()], Wc.prototype, "boldText", void 0),
			Yc([Ge({ reflect: !0 })], Wc.prototype, "variant", void 0),
			(Wc = Yc([Ye("agosh-info-icon")], Wc));
		var Gc = Wc,
			Kc = te`
  ${Je}
`,
			Qc = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Jc = class extends Xe {
			constructor() {
				super(...arguments),
					(this.disabled = !1),
					(this.open = !1),
					(this.placement = "bottom-start"),
					(this.skidding = 0),
					(this.distance = 0),
					(this.stayOpenOnSelect = !1),
					(this.show = () => {
						(this.open = !0), this.requestUpdate();
					}),
					(this.hide = () => {
						(this.open = !1), this.requestUpdate();
					});
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				(this.agoshTrigger = [...(this.childNodes || [])].filter(
					(t) => "AGOSH-TRIGGER" === t.nodeName
				)[0]),
					(this.agoshDropdownContent = [
						...(this.childNodes || []),
					].filter(
						(t) => "AGOSH-DROPDOWN-CONTENT" === t.nodeName
					)[0]);
			}
			_handleShow() {
				Sr(this, "agosh-show");
			}
			_handleHide() {
				Sr(this, "agosh-hide");
			}
			render() {
				return Be`
      <sl-dropdown
        hoist
        .disabled=${this.disabled}
        .open=${this.open}
        .stayOpenOnSelect=${this.stayOpenOnSelect}
        distance=${this.distance}
        placement=${this.placement}
        skidding=${this.skidding}
        @sl-after-show=${this._handleShow}
        @sl-after-hide=${this._handleHide}
      >
        <div slot="trigger">${this.agoshTrigger}</div>
        <sl-menu> ${this.agoshDropdownContent} </sl-menu>
      </sl-dropdown>
    `;
			}
		};
		(Jc.styles = Kc),
			Qc([Ge({ type: Boolean })], Jc.prototype, "disabled", void 0),
			Qc([Ge({ type: Boolean })], Jc.prototype, "open", void 0),
			Qc([Ge()], Jc.prototype, "placement", void 0),
			Qc([Ge({ type: Number })], Jc.prototype, "skidding", void 0),
			Qc([Ge({ type: Number })], Jc.prototype, "distance", void 0),
			Qc(
				[Ge({ type: Boolean })],
				Jc.prototype,
				"stayOpenOnSelect",
				void 0
			),
			Qc([Ke()], Jc.prototype, "agoshTrigger", void 0),
			Qc([Ke()], Jc.prototype, "agoshDropdownContent", void 0),
			(Jc = Qc([Ye("agosh-dropdown")], Jc));
		var td = Jc,
			ed = te`
  ${Je}
`,
			rd = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let id = class extends Xe {
			render() {
				return Be`<slot></slot>`;
			}
		};
		(id.styles = ed), (id = rd([Ye("agosh-dropdown-content")], id));
		var od = id,
			ad = te`
  ${Je}
`,
			sd = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let nd = class extends Xe {
			_onClick() {
				Sr(this, "agosh-click");
			}
			render() {
				return Be`<div @click=${this._onClick}>
      <slot></slot>
    </div> `;
			}
		};
		(nd.styles = ad), (nd = sd([Ye("agosh-trigger")], nd));
		var ld = nd,
			cd = te`
  ${Je}

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    gap: 0.5rem;
    padding: 1rem;
    align-items: center;
    background: var(--surface10);
  }

  .text-section {
    display: flex;
    gap: 0.5rem;
    font-size: var(--m3-body-large-font-size);
    text-decoration: var(--m3-body-large-text-decoration);
    font-family: var(--m3-body-large-font-family);
    font-weight: var(--m3-body-large-font-weight);
    font-style: var(--m3-body-large-font-style);
    font-stretch: var(--m3-body-large-font-stretch);
    letter-spacing: var(--m3-body-large-letter-spacing);
    line-height: var(--m3-body-large-line-height);
    display: flex;
    align-items: center;
    color: var(--on-surface-variant);
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }
  .progress-number {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
  }

  .bar-track {
    background: var(--secondary-container);
    width: 100%;
    height: 0.5rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 0.5rem;
  }

  .progress-step {
    background: var(--secondary-container);
    width: 10%;
    height: 0.5rem;
    border-radius: 0.625rem;
  }

  .progress-step-active {
    background: var(--m3-source-primary);
    width: 10%;
    height: 0.5rem;
    border-radius: 0.625rem;
  }
`,
			dd = l`
  ${Q}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 400ms width, 400ms background-color;
    user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }
`,
			hd = class extends G {
				constructor() {
					super(...arguments),
						(this.localize = new Yi(this)),
						(this.value = 0),
						(this.indeterminate = !1),
						(this.label = "");
				}
				render() {
					return j`
      <div
        part="base"
        class=${st({
			"progress-bar": !0,
			"progress-bar--indeterminate": this.indeterminate,
		})}
        role="progressbar"
        title=${Ft(this.title)}
        aria-label=${
			this.label.length > 0 ? this.label : this.localize.term("progress")
		}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${nn({
			width: `${this.value}%`,
		})}>
          ${
				this.indeterminate
					? ""
					: j`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              `
			}
        </div>
      </div>
    `;
				}
			};
		(hd.styles = dd),
			gt([xt({ type: Number, reflect: !0 })], hd.prototype, "value", 2),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				hd.prototype,
				"indeterminate",
				2
			),
			gt([xt()], hd.prototype, "label", 2),
			gt([xt()], hd.prototype, "lang", 2),
			(hd = gt([yt("sl-progress-bar")], hd));
		var ud = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let fd = class extends Xe {
			constructor() {
				super(...arguments),
					(this.value = 0),
					(this.text = ""),
					(this.steps = 10);
			}
			render() {
				return Be`<div class="wrapper">
      <div class="text-section">
        <div class="progress">
          <span class="progress-number">${this.value}</span>/${this.steps}
        </div>
        <div class="text">${this.text}</div>
      </div>
      <div class="bar-track">
        ${Array.apply(0, Array(this.steps)).map(
			(t, e) => Be`<div
            style="width:${100 / this.steps}%"
            class=${sr({
				"progress-step": !0,
				"progress-step-active": e < this.value,
			})}
          ></div>`
		)}
      </div>
    </div> `;
			}
		};
		(fd.styles = cd),
			ud([Ge({ type: Number })], fd.prototype, "value", void 0),
			ud([Ge({ type: String })], fd.prototype, "text", void 0),
			ud([Ge({ type: Number })], fd.prototype, "steps", void 0),
			(fd = ud([Ye("agosh-progress-bar")], fd));
		var pd = fd,
			md = te`
  ${Je}

  ::part(base) {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  ::part(prefix),
  ::part(suffix) {
    flex: 0 0 auto;
    align-items: center;
    display: none;
  }

  .default {
    color: var(--outline);
  }

  .primary {
    color: var(--primary);
  }

  .secondary {
    color: var(--on-background);
  }
`,
			vd = l`
  ${Q}

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,
			bd = class extends G {
				constructor() {
					super(...arguments), (this.label = "Breadcrumb");
				}
				getSeparator() {
					const t = this.separatorSlot
						.assignedElements({ flatten: !0 })[0]
						.cloneNode(!0);
					return (
						[t, ...t.querySelectorAll("[id]")].forEach((t) =>
							t.removeAttribute("id")
						),
						(t.slot = "separator"),
						t
					);
				}
				handleSlotChange() {
					const t = [
						...this.defaultSlot.assignedElements({ flatten: !0 }),
					].filter(
						(t) => "sl-breadcrumb-item" === t.tagName.toLowerCase()
					);
					t.forEach((e, r) => {
						null === e.querySelector('[slot="separator"]') &&
							e.append(this.getSeparator()),
							r === t.length - 1
								? e.setAttribute("aria-current", "page")
								: e.removeAttribute("aria-current");
					});
				}
				render() {
					return j`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <slot name="separator" hidden aria-hidden="true">
        <sl-icon name="chevron-right" library="system"></sl-icon>
      </slot>
    `;
				}
			};
		(bd.styles = vd),
			gt([Ct("slot")], bd.prototype, "defaultSlot", 2),
			gt(
				[Ct('slot[name="separator"]')],
				bd.prototype,
				"separatorSlot",
				2
			),
			gt([xt()], bd.prototype, "label", 2),
			(bd = gt([yt("sl-breadcrumb")], bd));
		var gd = l`
  ${Q}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label${zr} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-right: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
  }
`,
			yd = class extends G {
				constructor() {
					super(...arguments),
						(this.hasSlotController = new wr(
							this,
							"prefix",
							"suffix"
						)),
						(this.rel = "noreferrer noopener");
				}
				render() {
					const t = !!this.href;
					return j`
      <div
        part="base"
        class=${st({
			"breadcrumb-item": !0,
			"breadcrumb-item--has-prefix":
				this.hasSlotController.test("prefix"),
			"breadcrumb-item--has-suffix":
				this.hasSlotController.test("suffix"),
		})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${
			t
				? j`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${Ft(this.target ? this.target : void 0)}"
                rel=${Ft(this.target ? this.rel : void 0)}
              >
                <slot></slot>
              </a>
            `
				: j`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `
		}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
				}
			};
		(yd.styles = gd),
			gt([xt()], yd.prototype, "href", 2),
			gt([xt()], yd.prototype, "target", 2),
			gt([xt()], yd.prototype, "rel", 2),
			(yd = gt([yt("sl-breadcrumb-item")], yd));
		var wd = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let xd = class extends Xe {
			constructor() {
				super(...arguments),
					(this.variant = "default"),
					(this.items = []),
					(this.hasSlottedSeparator = !1);
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				this.items = [...(this.childNodes || [])].filter(
					(t) => "AGOSH-BREADCRUMB-ITEM" === t.nodeName
				);
			}
			_handleSeparatorSlotChange() {
				(this.hasSlottedSeparator = !0), this.requestUpdate();
			}
			render() {
				return Be` <sl-breadcrumb>
      <slot
        name="separator"
        slot="separator"
        @slotchange=${this._handleSeparatorSlotChange}
      ></slot>
      ${
			this.hasSlottedSeparator
				? ""
				: Be`
            <svg
              slot="separator"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.19329 4.47319C5.93329 4.73319 5.93329 5.15319 6.19329 5.41319L8.77996 7.99985L6.19329 10.5865C5.93329 10.8465 5.93329 11.2665 6.19329 11.5265C6.45329 11.7865 6.87329 11.7865 7.13329 11.5265L10.1933 8.46652C10.4533 8.20652 10.4533 7.78652 10.1933 7.52652L7.13329 4.46652C6.87996 4.21319 6.45329 4.21319 6.19329 4.47319Z"
                fill="currentColor"
              />
            </svg>
          `
		}
      ${Object.entries(this.items).map(
			([t, e], r) => (
				(e.variant = this.variant),
				(e.active = r === this.items.length - 1),
				e.reload(),
				Be`
          <sl-breadcrumb-item
            class=${sr({
				default: "default" === this.variant,
				primary: "primary" === this.variant,
				secondary: "secondary" === this.variant,
			})}
            >${e}</sl-breadcrumb-item
          >
        `
			)
		)}
    </sl-breadcrumb>`;
			}
		};
		(xd.styles = md),
			wd([Ge({ reflect: !0 })], xd.prototype, "variant", void 0),
			wd([Ke()], xd.prototype, "items", void 0),
			wd([Ke()], xd.prototype, "hasSlottedSeparator", void 0),
			(xd = wd([Ye("agosh-breadcrumb")], xd));
		var _d = xd,
			$d = te`
  ${Je}

  .item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: var(--m3-body-medium-font-size);
    text-decoration: var(--m3-body-medium-text-decoration);
    font-family: var(--m3-body-medium-font-family);
    font-weight: var(--m3-body-medium-font-weight);
    font-style: var(--m3-body-medium-font-style);
    font-stretch: var(--m3-body-medium-font-stretch);
    letter-spacing: var(--m3-body-medium-letter-spacing);
    line-height: var(--m3-body-medium-line-height);
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .active-item {
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
    font-family: 'Titillium Web';
    display: flex;
    align-items: center;
    text-align: center;
    color: var(--on-background);
    flex: none;
    order: 6;
    flex-grow: 0;
  }

  ::part(label) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    cursor: auto;
  }

  .has-href::part(label) {
    cursor: pointer;
  }

  .default:not(.active-item) {
    color: var(--outline);
  }

  .primary:not(.active-item) {
    color: var(--primary);
  }

  .secondary:not(.active-item) {
    color: var(--on-background);
  }
`,
			kd = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Cd = class extends Xe {
			constructor() {
				super(...arguments),
					(this.target = "_blank"),
					(this.rel = "noreferrer noopener"),
					(this.variant = "default"),
					(this.active = !1);
			}
			reload() {
				this.requestUpdate();
			}
			render() {
				return (
					console.log(this.active),
					Be` <sl-breadcrumb-item
      class=${sr({
			item: !0,
			"active-item": this.active,
			default: "default" === this.variant,
			primary: "primary" === this.variant,
			secondary: "secondary" === this.variant,
			"has-href": !!this.href,
		})}
      href=${this.href}
      target=${this.target}
      rel=${this.rel}
    >
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    </sl-breadcrumb-item>`
				);
			}
		};
		(Cd.styles = $d),
			kd([Ge()], Cd.prototype, "href", void 0),
			kd([Ge({ reflect: !0 })], Cd.prototype, "target", void 0),
			kd([Ge({ reflect: !0 })], Cd.prototype, "rel", void 0),
			kd([Ge({ reflect: !0 })], Cd.prototype, "variant", void 0),
			kd([Ge({ type: Boolean })], Cd.prototype, "active", void 0),
			(Cd = kd([Ye("agosh-breadcrumb-item")], Cd));
		var zd = Cd,
			Bd = te`
  ${Je}
  :host {
    box-sizing: border-box;
    width: 100%;
  }

  :host([vertical]) {
    height: 100%;
    width: auto;
  }
`,
			Od = l`
  ${Q}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,
			Sd = class extends G {
				constructor() {
					super(...arguments), (this.vertical = !1);
				}
				firstUpdated() {
					this.setAttribute("role", "separator");
				}
				handleVerticalChange() {
					this.setAttribute(
						"aria-orientation",
						this.vertical ? "vertical" : "horizontal"
					);
				}
			};
		(Sd.styles = Od),
			gt(
				[xt({ type: Boolean, reflect: !0 })],
				Sd.prototype,
				"vertical",
				2
			),
			gt([Rt("vertical")], Sd.prototype, "handleVerticalChange", 1),
			(Sd = gt([yt("sl-divider")], Sd));
		var Ld = function (t, e, r, i) {
			for (
				var o,
					a = arguments.length,
					s =
						a < 3
							? e
							: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i,
					n = t.length - 1;
				n >= 0;
				n--
			)
				(o = t[n]) &&
					(s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
			return a > 3 && s && Object.defineProperty(e, r, s), s;
		};
		let Ad = class extends Xe {
			constructor() {
				super(...arguments),
					(this.vertical = !1),
					(this.color = "var(--secondary-container)"),
					(this.width = 0.0625),
					(this.spacing = 0);
			}
			render() {
				return Be`<sl-divider
      class="agosh-divider"
      ?vertical=${this.vertical}
      style="
    --width: ${this.width}rem;
    --color: ${this.color};
   --spacing: ${this.spacing}rem;
    "
    ></sl-divider>`;
			}
		};
		(Ad.styles = Bd),
			Ld([Ge({ type: Boolean })], Ad.prototype, "vertical", void 0),
			Ld([Ge()], Ad.prototype, "color", void 0),
			Ld([Ge({ type: Number })], Ad.prototype, "width", void 0),
			Ld([Ge({ type: Number })], Ad.prototype, "spacing", void 0),
			(Ad = Ld([Ye("agosh-divider")], Ad));
		var Md = Ad,
			jd = te`
  ${Je}

  .toggle-group-primary {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0rem;
    gap: 2.5rem;
    width: fit-content;
  }

  .toggle-group-secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    gap: 1rem;
    width: fit-content;
  }

  .toggle-group-tertiary,
  .toggle-group-quaternary {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0rem;
    gap: 0.5rem;
    border-radius: 1.25rem;
    width: fit-content;
  }

  .toggle-group-quaternary {
    background: linear-gradient(0deg, var(--surface31), var(--surface31)),
      var(--surface30);
  }

  .toggle-group-quinary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    width: fit-content;
  }

  .toggle-primary {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem;
    border-radius: 1.5rem;
    color: var(--on-surface);
    gap: 0.625rem;
    width: fit-content;
    cursor: pointer;
    background-color: var(--surface11);
    background: linear-gradient(0deg, var(--surface11), var(--surface11)),
      var(--surface20);
    min-width: 9.5rem;
  }

  .toggle-secondary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 10.5rem;
    border-radius: 1rem;
    background: var(--secondary-container);
    color: var(--on-secondary-container);
    padding: 1.5rem;
    gap: 1.5rem;
    width: fit-content;
    cursor: pointer;
  }

  .toggle-tertiary,
  .toggle-quaternary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    min-width: 8.75rem;
    width: fit-content;
    padding: 0.625rem;
    border-radius: 6.25rem;
    background: transparent;
    color: var(--secondary);
    cursor: pointer;
    font-size: var(--m3-label-large-font-size);
    text-decoration: var(--m3-label-large-text-decoration);
    font-family: var(--m3-label-large-font-family);
    font-weight: var(--m3-label-large-font-weight);
    font-style: var(--m3-label-large-font-style);
    font-stretch: var(--m3-label-large-font-stretch);
    letter-spacing: var(--m3-label-large-letter-spacing);
    line-height: var(--m3-label-large-line-height);
  }

  .toggle-quinary {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    min-width: 16rem;
    border-radius: 0.5rem;
    padding: 1rem 2.5rem 1rem 2.5rem;
    gap: 0.5rem;
    width: 15.833rem;
    height: 3.5rem;
    background: var(--secondary-container);
    color: var(--on-secondary-container);
    border-radius: 0.5rem;
    cursor: pointer;
    flex: none;
    order: 1;
    flex-grow: 0;
    position: relative;
  }

  [checked].toggle-primary {
    background: var(--primary-container) !important;
    color: var(--on-primary-container);
  }

  [checked] .toggle-quinary {
    background: var(--primary) !important;
    color: var(--white);
  }

  .toggle-quinary .tick {
    position: absolute;
    left: 1rem;
  }

  [checked] {
    background: var(--primary);
    color: var(--white);
  }

  [disabled] {
    opacity: 0.3;
    color: var(--on-surface) !important;
    background-color: var(--fab-disabled-bg) !important;
    cursor: not-allowed;
  }

  .toggle-primary,
  .toggle-quinary .label {
    font-size: var(--m3-title-medium-font-size);
    text-decoration: var(--m3-title-medium-text-decoration);
    font-family: var(--m3-title-medium-font-family);
    font-weight: var(--m3-title-medium-font-weight);
    font-style: var(--m3-title-medium-font-style);
    font-stretch: var(--m3-title-medium-font-stretch);
    letter-spacing: var(--m3-title-medium-letter-spacing);
    line-height: var(--m3-title-medium-line-height);
  }

  .toggle-secondary .prefix {
    color: var(--primary);
    width: 7.5rem;
    height: 7.5rem;
  }

  [checked] .prefix {
    color: white;
  }

  .toggle-secondary .lable {
    font-size: var(--m3-title-large-font-size);
    text-decoration: var(--m3-title-large-text-decoration);
    font-family: var(--m3-title-large-font-family);
    font-weight: 700;
    font-style: var(--m3-title-large-font-style);
    font-stretch: var(--m3-title-large-font-stretch);
    letter-spacing: var(--m3-title-large-letter-spacing);
    line-height: var(--m3-title-large-line-height);
  }

  .indication {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--logo-honey-yellow);
    border-radius: 50%;
  }
`,
			Td = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Id = class extends Xe {
			constructor() {
				super(...arguments),
					(this.name = ""),
					(this.value = ""),
					(this.variant = "primary"),
					(this.customToggleItems = []);
			}
			firstUpdated() {
				this._createElements(), this.requestUpdate();
			}
			_createElements() {
				const t = this._getChildNodes(
						this.childNodes,
						"AGOSH-CUSTOM-TOGGLE"
					),
					e = this._getPrefixSuffix(this.childNodes),
					r = t.map((t) => {
						const r = this._getPrefixSuffix(t.childNodes);
						return {
							name: t.name,
							innerHTML: t.innerHTML,
							value: t.value || "",
							indication: t.indication,
							disabled: t.disabled,
							checked: this.value === t.value,
							prefix: (r["AGOSH-PREFIX"].length > 0
								? r["AGOSH-PREFIX"][0]
								: e["AGOSH-PREFIX"][0] || []
							).innerHTML,
							suffix: (r["AGOSH-SUFFIX"].length > 0
								? r["AGOSH-SUFFIX"][0]
								: e["AGOSH-SUFFIX"][0] || []
							).innerHTML,
						};
					});
				this.customToggleItems = r;
			}
			_getPrefixSuffix(t) {
				const e = {};
				return (
					["AGOSH-PREFIX", "AGOSH-SUFFIX"].forEach((r) => {
						e[r] = this._getChildNodes(t, r) || [];
					}),
					e
				);
			}
			_getChildNodes(t, e) {
				return [...(t || [])].filter((t) => t.nodeName === e);
			}
			render() {
				return Be`
      <div
        class=${sr({
			"toggle-group": !0,
			"toggle-group-primary": "primary" === this.variant,
			"toggle-group-secondary": "secondary" === this.variant,
			"toggle-group-tertiary": "tertiary" === this.variant,
			"toggle-group-quaternary": "quaternary" === this.variant,
			"toggle-group-quinary": "quinary" === this.variant,
		})}
      >
        ${this.customToggleItems.map((t, e) => this._renderItems(t, e))}
      </div>
    `;
			}
			_renderItems(t, e) {
				let r;
				switch (this.variant) {
					case "primary":
						r = this._primaryItem(t, e);
						break;
					case "secondary":
						r = this._secondaryItem(t, e);
						break;
					case "tertiary":
						r = this._tertiaryItem(t, e);
						break;
					case "quaternary":
						r = this._quaternaryItem(t, e);
						break;
					case "quinary":
						r = this._quinaryItem(t, e);
						break;
					default:
						r = "";
				}
				return r;
			}
			_primaryItem(t, e) {
				return Be`
      <div
        class="toggle-primary"
        @click=${() => this._toggle(e)}
        value=${t.value || ""}
        ?checked=${t.checked}
        ?disabled=${t.disabled}
      >
        <div class="label">${t.innerHTML}</div>
        ${t.suffix ? Be`<div .innerHTML=${t.suffix}></div>` : ""}
      </div>
    `;
			}
			_secondaryItem(t, e) {
				return Be`
      <div
        class="toggle-secondary"
        @click=${() => this._toggle(e)}
        value=${t.value || ""}
        ?disabled=${t.disabled}
        ?checked=${t.checked}
      >
        ${t.prefix ? Be`<div class="prefix" .innerHTML=${t.prefix}></div>` : ""}
        <div class="lable">${t.innerHTML}</div>
      </div>
    `;
			}
			_tertiaryItem(t, e) {
				return Be`
      <div
        class="toggle-tertiary"
        @click=${() => this._toggle(e)}
        value=${t.value || ""}
        ?disabled=${t.disabled}
        ?checked=${t.checked}
      >
        ${t.innerHTML}
        ${t.indication ? Be`<div class="indication"></div>` : ""}
      </div>
    `;
			}
			_quaternaryItem(t, e) {
				return Be`
      <div
        class="toggle-quaternary"
        @click=${() => this._toggle(e)}
        value=${t.value || ""}
        ?disabled=${t.disabled}
        ?checked=${t.checked}
      >
        ${t.innerHTML}
      </div>
    `;
			}
			_quinaryItem(t, e) {
				return Be`
      <div
        class="toggle-quinary"
        @click=${() => this._toggle(e)}
        value=${t.value || ""}
        ?disabled=${t.disabled}
        ?checked=${t.checked}
      >
        ${
			t.checked
				? Be`
              <div class="tick">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 6.99997L19.5899 5.58997L8.99991 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            `
				: ""
		}
        <div class="label">${t.innerHTML}</div>
      </div>
    `;
			}
			_toggle(t) {
				this.customToggleItems[t].disabled ||
					(this.customToggleItems.forEach((e, r) => {
						e.checked = t === r;
					}),
					(this.value = this.customToggleItems[t].value || ""),
					this.requestUpdate(),
					Sr(this, "agosh-change", {
						detail: { ...this.customToggleItems[t] },
					}));
			}
		};
		(Id.styles = jd),
			Td([Ge()], Id.prototype, "name", void 0),
			Td([Ge()], Id.prototype, "value", void 0),
			Td(
				[Ge({ reflect: !0, attribute: "variant-name" })],
				Id.prototype,
				"variant",
				void 0
			),
			Td([Ke()], Id.prototype, "customToggleItems", void 0),
			(Id = Td([Ye("agosh-custom-toggle-group")], Id));
		var Ud = Id,
			Dd = function (t, e, r, i) {
				for (
					var o,
						a = arguments.length,
						s =
							a < 3
								? e
								: null === i
								? (i = Object.getOwnPropertyDescriptor(e, r))
								: i,
						n = t.length - 1;
					n >= 0;
					n--
				)
					(o = t[n]) &&
						(s =
							(a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
				return a > 3 && s && Object.defineProperty(e, r, s), s;
			};
		let Ed = class extends Xe {
			constructor() {
				super(...arguments),
					(this.name = ""),
					(this.value = ""),
					(this.checked = !1),
					(this.disabled = !1),
					(this.indication = !1);
			}
		};
		Dd([Ge()], Ed.prototype, "name", void 0),
			Dd([Ge()], Ed.prototype, "value", void 0),
			Dd(
				[Ge({ type: Boolean, reflect: !0 })],
				Ed.prototype,
				"checked",
				void 0
			),
			Dd(
				[Ge({ type: Boolean, reflect: !0 })],
				Ed.prototype,
				"disabled",
				void 0
			),
			Dd(
				[Ge({ type: Boolean, reflect: !0 })],
				Ed.prototype,
				"indication",
				void 0
			),
			(Ed = Dd([Ye("agosh-custom-toggle")], Ed));
		var Fd = Ed;
		(t.AgoshAccordian = Xc),
			(t.AgoshAlert = Mr),
			(t.AgoshAvatar = cr),
			(t.AgoshBox = Ur),
			(t.AgoshBreadcrumb = _d),
			(t.AgoshBreadcrumbItem = zd),
			(t.AgoshButton = xi),
			(t.AgoshCard = Ci),
			(t.AgoshCheckbox = Ti),
			(t.AgoshChip = hc),
			(t.AgoshCustomToggle = Fd),
			(t.AgoshCustomToggleGroup = Ud),
			(t.AgoshDialog = to),
			(t.AgoshDivider = Md),
			(t.AgoshDropdown = td),
			(t.AgoshDropdownContent = od),
			(t.AgoshFab = yo),
			(t.AgoshImageSlider = xc),
			(t.AgoshInfoIcon = Gc),
			(t.AgoshInput = Oo),
			(t.AgoshKpiCard = Qs),
			(t.AgoshLink = jo),
			(t.AgoshMenu = Cc),
			(t.AgoshMenuItem = Sc),
			(t.AgoshMessaging = Do),
			(t.AgoshNavDrawer = Vo),
			(t.AgoshNotification = Yo),
			(t.AgoshNotificationList = Qo),
			(t.AgoshProfile = Rc),
			(t.AgoshProgressBar = pd),
			(t.AgoshRadioGroup = pa),
			(t.AgoshRange = bc),
			(t.AgoshRating = un),
			(t.AgoshSelect = ks),
			(t.AgoshSpinner = Kr),
			(t.AgoshSwitch = Ls),
			(t.AgoshTab = Ys),
			(t.AgoshTabGroup = Ns),
			(t.AgoshTabPanel = Zs),
			(t.AgoshTextarea = Uc),
			(t.AgoshTooltip = an),
			(t.AgoshTrigger = ld),
			Object.defineProperty(t, "t", { value: !0 });
	}),
	"object" == typeof exports && "undefined" != typeof module
		? e(exports)
		: "function" == typeof define && define.amd
		? define(["exports"], e)
		: e(
				((t =
					"undefined" != typeof globalThis ? globalThis : t || self)[
					"agosh-components"
				] = {})
		  );
