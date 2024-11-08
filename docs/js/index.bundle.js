!(function () {
  var e,
    t = {
      564: function () {
        var e = 0;
        const t = document.querySelectorAll(".about__content"),
          n = document.querySelectorAll(".about__content1"),
          o = document.querySelectorAll(".about__image"),
          r = document.querySelectorAll(".about__image1");
        function c(e, t) {
          e.forEach((e, n) => {
            e.classList.toggle("active", n === t);
          });
        }
        function i(i) {
          "next" === i
            ? (e = (e + 1) % t.length)
            : "prev" === i && (e = (e - 1 + t.length) % t.length),
            c(t, e),
            c(n, e),
            c(o, e),
            c(r, e);
        }
        document
          .querySelector(".about__link")
          .addEventListener("click", (e) => {
            e.target.classList.contains("ri-arrow-left-line")
              ? i("prev")
              : e.target.classList.contains("ri-arrow-right-line") && i("next");
          }),
          c(t, e),
          c(n, e),
          c(o, e),
          c(r, e);
      },
      924: function () {
        document.addEventListener("DOMContentLoaded", function () {
          document
            .querySelectorAll(".footer__contacts .contacts .contact-item p")
            .forEach(function (e) {
              e.addEventListener("click", function () {
                this.parentElement.classList.toggle("active");
              });
            });
        });
      },
      903: function () {
        let e = document.querySelectorAll("label");
        e.forEach((t) => {
          t.addEventListener("click", () => {
            e.forEach((e) => {
              e.classList.remove("active");
            }),
              t.classList.add("active");
          });
        }),
          lightGallery(document.querySelector(".gallery__photos"));
        let t = document.querySelectorAll("img[data-src]"),
          n = new IntersectionObserver(
            function (e, t) {
              e.forEach(function (e) {
                if (e.isIntersecting) {
                  let n = e.target;
                  (n.src = n.dataset.src),
                    n.removeAttribute("data-src"),
                    t.unobserve(n);
                }
              });
            },
            { rootMargin: "0px", threshold: 0.1 }
          );
        t.forEach(function (e) {
          n.observe(e);
        });
      },
      244: function () {
        let e = document.getElementById("next"),
          t = document.getElementById("prev"),
          n = document.querySelector(".carousel"),
          o = n.querySelector(".carousel__list"),
          r = document.querySelector(".thumbnail"),
          c = r.querySelectorAll(".thumbnail__item");
        r.appendChild(c[0]);
        let i,
          l,
          a = 3e3,
          s = 1e4;
        const d = new IntersectionObserver(
          (n) => {
            n.forEach((n) => {
              n.isIntersecting
                ? u()
                : ((e.onclick = null), (t.onclick = null), clearTimeout(l));
            });
          },
          { root: null, rootMargin: "0px", threshold: 0.5 }
        );
        function u() {
          (e.onclick = function () {
            m("next");
          }),
            (t.onclick = function () {
              m("prev");
            }),
            (l = setTimeout(() => {
              next.click();
            }, s));
        }
        function m(e) {
          let t = o.querySelectorAll(".carousel__item"),
            c = document.querySelectorAll(".thumbnail__item");
          "next" === e
            ? (o.appendChild(t[0]),
              r.appendChild(c[0]),
              n.classList.add("next"))
            : (o.prepend(t[t.length - 1]),
              r.prepend(c[c.length - 1]),
              n.classList.add("prev")),
            clearTimeout(i),
            (i = setTimeout(() => {
              n.classList.remove("next"), n.classList.remove("prev");
            }, a)),
            clearTimeout(l),
            (l = setTimeout(() => {
              next.click();
            }, s));
        }
        u(), d.observe(n);
      },
      961: function () {
        const e = document.querySelectorAll(".modal"),
          t = document.querySelectorAll(".close");
        function n(e) {
          return new Promise((t) => setTimeout(t, e));
        }
        document.querySelectorAll(".info__modal-item").forEach((e) => {
          e.addEventListener("click", () => {
            const t = e.getAttribute("data-target"),
              o = document.getElementById(t);
            (o.style.display = "block"), n(10), (o.style.opacity = 1);
          });
        }),
          t.forEach((e) => {
            e.addEventListener("click", () => {
              const t = e.closest(".modal");
              (t.style.opacity = 0), n(400), (t.style.display = "none");
            });
          }),
          window.addEventListener("click", (t) => {
            e.forEach(async (e) => {
              t.target === e &&
                ((e.style.opacity = 0), n(400), (e.style.display = "none"));
            });
            const o = document.querySelectorAll(".modal__tabs h3"),
              r = document.querySelectorAll(".modal__tabs-content div");
            o.forEach((e, t) => {
              e.addEventListener("click", async () => {
                r.forEach((e) => {
                  e.classList.remove("active");
                }),
                  o.forEach((e) => {
                    e.classList.remove("active");
                  }),
                  r[t].classList.add("active"),
                  o[t].classList.add("active");
              });
            });
          }),
          document.querySelectorAll(".schedule-link").forEach((e) => {
            e.addEventListener("click", (e) => {
              e.preventDefault();
            });
          });
        const o = document.querySelectorAll(".schedule__item"),
          r = document.querySelectorAll(".info__modal-item");
        function c(e) {
          const t = e.getBoundingClientRect();
          return (
            t.top >= 0 &&
            t.left >= 0 &&
            t.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            t.right <=
              (window.innerWidth || document.documentElement.clientWidth)
          );
        }
        function i() {
          o.forEach((e) => {
            c(e) && e.classList.add("animate__animated", "animate__fadeInDown");
          });
        }
        function l() {
          r.forEach((e) => {
            c(e) && e.classList.add("animate__animated", "animate__fadeInUp");
          });
        }
        window.addEventListener("scroll", function () {
          i(), l();
        }),
          i(),
          l();
      },
      180: function () {
        const e = document.querySelector(".menu"),
          t = document.querySelector(".nav-open-menu"),
          n = document.querySelector(".menu-close-btn"),
          o = document.querySelector(".carousel");
        [t, n].forEach((t) => {
          t.addEventListener("click", () => {
            e.classList.toggle("open");
          });
        }),
          e.addEventListener("transitionend", function () {
            this.removeAttribute("style");
          }),
          e.querySelectorAll(".dropdown > i").forEach((e) => {
            e.addEventListener("click", function () {
              this.closest(".dropdown").classList.toggle("active");
            });
          }),
          window.addEventListener("scroll", () => {
            document
              .querySelector(".nav")
              .classList.toggle("sticky", window.scrollY > 0);
          }),
          window.addEventListener("click", function (n) {
            e.contains(n.target) ||
              n.target === t ||
              o.contains(n.target) ||
              e.classList.remove("open");
          });
        let r = document.querySelectorAll("section"),
          c = document.querySelectorAll(".menu ul li a");
        window.onscroll = () => {
          let e = window.scrollY;
          r.forEach((t) => {
            let n = t.offsetTop - 220,
              o = t.offsetHeight,
              r = t.getAttribute("id");
            if (e >= n && e < n + o) {
              let e = document.querySelector(`.menu ul li a[href*="${r}"]`);
              c.forEach((e) => e.classList.remove("active")),
                e && e.classList.add("active");
            }
          });
        };
      },
      970: function () {
        new Swiper(".mySwiper", {
          slidesPerView: 1,
          grid: { rows: 2 },
          spaceBetween: 20,
          pagination: { el: ".swiper-pagination", clickable: !0 },
        }),
          document.addEventListener("DOMContentLoaded", () => {
            const e = document.getElementById("offer");
            new IntersectionObserver(
              (e, t) => {
                e.forEach((e) => {
                  e.isIntersecting &&
                    (e.target.classList.remove("lazyload"),
                    e.target.classList.add("loaded"),
                    t.unobserve(e.target));
                });
              },
              { threshold: 0.1 }
            ).observe(e);
          });
      },
      420: function () {
        document.addEventListener("mousemove", function (e) {
          this.querySelectorAll(".layer").forEach((t) => {
            const n = t.getAttribute("data-speed"),
              o = (window.innerWidth - e.pageX * n) / 100,
              r = (window.innerHeight - e.pageY * n) / 100;
            t.style.transform = `translateX(${o}px) translateY(${r}px)`;
          });
        });
        const e = document.querySelector(".programs__wrapper"),
          t = document.querySelector(".programs__carousel"),
          n = document.querySelectorAll(".programs__wrapper i"),
          o = document.querySelector(".programs__card").offsetWidth,
          r = [...t.children];
        let c,
          i,
          l,
          a = !1,
          s = Math.round(t.offsetWidth / o);
        r
          .slice(-s)
          .reverse()
          .forEach((e) => {
            t.insertAdjacentHTML("afterbegin", e.outerHTML);
          }),
          r.slice(0, s).forEach((e) => {
            t.insertAdjacentHTML("beforeEnd", e.outerHTML);
          }),
          n.forEach((e) => {
            e.addEventListener("click", () => {
              t.scrollLeft += "left" === e.id ? -o : o;
            });
          });
        const d = () => {
          window.innerWidth < 800 ||
            (l = setTimeout(() => (t.scrollLeft += o), 2500));
        };
        d(),
          t.addEventListener("mousedown", (e) => {
            (a = !0),
              t.classList.add("dragging"),
              (c = e.pageX),
              (i = t.scrollLeft);
          }),
          t.addEventListener("mousemove", (e) => {
            a && (t.scrollLeft = i - (e.pageX - c));
          }),
          document.addEventListener("mouseup", () => {
            (a = !1), t.classList.remove("dragging");
          }),
          t.addEventListener("scroll", () => {
            0 === t.scrollLeft
              ? (t.classList.add("no-transition"),
                (t.scrollLeft = t.scrollWidth - 2 * t.offsetWidth),
                t.classList.remove("no-transition"))
              : Math.ceil(t.scrollLeft) === t.scrollWidth - t.offsetWidth &&
                (t.classList.add("no-transition"),
                (t.scrollLeft = t.offsetWidth),
                t.classList.remove("no-transition")),
              clearTimeout(l),
              e.matches(":hover") || d();
          }),
          e.addEventListener("mouseenter", () => clearTimeout(l)),
          e.addEventListener("mouseleave", d);
      },
      650: function () {
        let e = document.querySelector("#teachers__load-more"),
          t = 5;
        e.addEventListener("click", () => {
          let e = [
            ...document.querySelectorAll(
              ".container .teachers__cards .teachers__card"
            ),
          ];
          for (var n = t; n < t + 4; n++) e[n].style.display = "inline-block";
          t += 4;
        });
        let n = document.querySelector(".teachers__preview"),
          o = n.querySelectorAll(".preview");
        const r = document.querySelectorAll(".close");
        document.querySelectorAll(".teachers__card").forEach((e) => {
          e.addEventListener("click", () => {
            n.style.display = "flex";
            let t = e.getAttribute("data-name");
            o.forEach((e) => {
              let n = e.getAttribute("data-target");
              t == n && e.classList.add("active");
            });
          });
        }),
          r.forEach((e) => {
            e.addEventListener("click", () => {
              let t = e.closest(".preview");
              (n.style.display = "none"), (t.style.display = "none");
            });
          });
      },
    },
    n = {};
  function o(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var c = (n[e] = { exports: {} });
    return t[e](c, c.exports, o), c.exports;
  }
  (o.m = t),
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return o.d(t, { a: t }), t;
    }),
    (o.d = function (e, t) {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (o.f = {}),
    (o.e = function (e) {
      return Promise.all(
        Object.keys(o.f).reduce(function (t, n) {
          return o.f[n](e, t), t;
        }, [])
      );
    }),
    (o.u = function (e) {
      return e + ".bundle.js";
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (e = {}),
    (o.l = function (t, n, r, c) {
      if (e[t]) e[t].push(n);
      else {
        var i, l;
        if (void 0 !== r)
          for (
            var a = document.getElementsByTagName("script"), s = 0;
            s < a.length;
            s++
          ) {
            var d = a[s];
            if (d.getAttribute("src") == t) {
              i = d;
              break;
            }
          }
        i ||
          ((l = !0),
          ((i = document.createElement("script")).charset = "utf-8"),
          (i.timeout = 120),
          o.nc && i.setAttribute("nonce", o.nc),
          (i.src = t)),
          (e[t] = [n]);
        var u = function (n, o) {
            (i.onerror = i.onload = null), clearTimeout(m);
            var r = e[t];
            if (
              (delete e[t],
              i.parentNode && i.parentNode.removeChild(i),
              r &&
                r.forEach(function (e) {
                  return e(o);
                }),
              n)
            )
              return n(o);
          },
          m = setTimeout(
            u.bind(null, void 0, { type: "timeout", target: i }),
            12e4
          );
        (i.onerror = u.bind(null, i.onerror)),
          (i.onload = u.bind(null, i.onload)),
          l && document.head.appendChild(i);
      }
    }),
    (function () {
      var e;
      o.g.importScripts && (e = o.g.location + "");
      var t = o.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName("script");
        if (n.length)
          for (var r = n.length - 1; r > -1 && (!e || !/^http(s?):/.test(e)); )
            e = n[r--].src;
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (o.p = e);
    })(),
    (function () {
      var e = { 57: 0 };
      o.f.j = function (t, n) {
        var r = o.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else {
            var c = new Promise(function (n, o) {
              r = e[t] = [n, o];
            });
            n.push((r[2] = c));
            var i = o.p + o.u(t),
              l = new Error();
            o.l(
              i,
              function (n) {
                if (o.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                  var c = n && ("load" === n.type ? "missing" : n.type),
                    i = n && n.target && n.target.src;
                  (l.message =
                    "Loading chunk " + t + " failed.\n(" + c + ": " + i + ")"),
                    (l.name = "ChunkLoadError"),
                    (l.type = c),
                    (l.request = i),
                    r[1](l);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = function (t, n) {
          var r,
            c,
            i = n[0],
            l = n[1],
            a = n[2],
            s = 0;
          if (
            i.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (r in l) o.o(l, r) && (o.m[r] = l[r]);
            a && a(o);
          }
          for (t && t(n); s < i.length; s++)
            (c = i[s]), o.o(e, c) && e[c] && e[c][0](), (e[c] = 0);
        },
        n = (self.webpackChunk = self.webpackChunk || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    (function () {
      "use strict";
      o(180), o(244), o(564), o(961), o(970), o(650), o(420), o(903), o(924);
      const e = document.querySelector(".counter");
      window.addEventListener("scroll", async function t() {
        if (
          (function (e) {
            const t = e.getBoundingClientRect();
            return t.top <= window.innerHeight && t.bottom >= 0;
          })(e)
        )
          try {
            const { counter: e } = await o.e(73).then(o.bind(o, 73));
            e(), window.removeEventListener("scroll", t), console.log("Працює");
          } catch (e) {
            console.error(
              "Помилка під час динамічного імпорту модуля counter:",
              e
            );
          }
      }),
        (async function () {
          const { initializeSocial: e } = await o.e(526).then(o.bind(o, 526));
          e();
          const t = document.querySelector(".social__map");
          t &&
            t.addEventListener("click", () => {
              var e = L.map("map").setView(
                [50.728319090473846, 25.298594209031943],
                13
              );
              L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                { attribution: "© OpenStreetMap contributors" }
              ).addTo(e),
                L.marker([50.728319090473846, 25.298594209031943]).addTo(e);
            });
        })();
    })();
})();
