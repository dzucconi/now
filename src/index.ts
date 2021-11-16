import { configure } from "queryparams";
import { cons, remap, toNode } from "./util";

const root = document.querySelector("#root") as HTMLDivElement;

const { params: CONFIG } = configure<{
  interval: number;
  amount: number;
  fadeDuration: number;
  padding: number;
  fontSize: number;
  backgroundColor: string;
  color: string;
  mode: "count" | "text" | "time";
  text: string;
  window: number;
}>({
  interval: 50,
  amount: 20,
  fadeDuration: 1000,
  padding: 15,
  fontSize: 5,
  backgroundColor: "black",
  color: "yellow",
  mode: "count",
  text: "now",
  window: 15,
});

const STATE = {
  count: 0,
  radius: 0,
  offset: 0,
  interval: 0,
};

document.body.style.color = CONFIG.color;
document.body.style.backgroundColor = CONFIG.backgroundColor;
document.body.style.fontSize = `min(${CONFIG.fontSize}vw, ${CONFIG.fontSize}vh)`;

const resize = () => {
  const longestDimension = Math.min(window.innerWidth, window.innerHeight);
  const padding = remap(
    CONFIG.padding,
    { min: 0, max: 100 },
    { min: 0, max: longestDimension }
  );

  STATE.radius = longestDimension / 2 - padding;
  STATE.offset = STATE.radius;

  root.style.width = `${STATE.radius * 2}px`;
  root.style.height = `${STATE.radius * 2}px`;
};

resize();
window.addEventListener("resize", resize);

const position = (degrees: number) => {
  const n = remap(degrees, { min: 0, max: 360 }, { min: 0, max: 1 });
  const angle = n * Math.PI * 2;

  const x = Math.cos(angle) * STATE.radius + STATE.offset;
  const y = Math.sin(angle) * STATE.radius + STATE.offset;

  return { x, y };
};

const string = CONFIG.text.split("");
const text = cons(string, Math.min(string.length, CONFIG.window));

const append = (degrees: number) => {
  if (STATE.count === Number.MAX_SAFE_INTEGER) {
    STATE.count = 0;
  } else {
    STATE.count = STATE.count + 1;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const deg = degrees * (360 / CONFIG.amount);
      const { x, y } = position(deg);

      const output = {
        count: STATE.count,
        text: text[STATE.count % text.length].join(""),
        time: new Date().toLocaleTimeString(),
      }[CONFIG.mode];

      const html = `
        <div style="
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          transform: translate(-50%, -50%) rotate(${deg}deg);
          white-space: nowrap;
        ">
          ${output}
        </div>
      `;

      const node = toNode(html);

      root.appendChild(node);

      const animation = node.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: CONFIG.fadeDuration,
        iterations: 1,
        easing: "linear",
      });

      animation.onfinish = () => {
        root.removeChild(node);
      };

      resolve(null);
    }, CONFIG.interval);
  });
};

const total = [...new Array(CONFIG.amount)].map((_, i) => i);

const cycle = () => {
  return total
    .reduce(async (previous, degrees) => {
      await previous;
      return append(degrees);
    }, Promise.resolve(null))
    .then(cycle);
};

cycle();
