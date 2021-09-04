const root = document.querySelector("#root") as HTMLDivElement;

type MinMax = { min: number; max: number };

const remapValue = (n: number, from: MinMax, to: MinMax) => {
  return ((n - from.min) * (to.max - to.min)) / (from.max - from.min) + to.min;
};

const STATE = {
  count: 0,
  radius: 0,
  offset: 0,
  amount: 0,
  interval: 0,
};

const size = () => {
  const longestDimension = Math.min(window.innerWidth, window.innerHeight);
  const padding = remapValue(
    15,
    { min: 0, max: 100 },
    { min: 0, max: longestDimension }
  );

  STATE.radius = longestDimension / 2 - padding;
  STATE.offset = STATE.radius;
  STATE.amount = 20;
  STATE.interval = (10 / STATE.amount) * 100;

  root.style.width = `${STATE.radius * 2}px`;
  root.style.height = `${STATE.radius * 2}px`;
};

size();
window.addEventListener("resize", size);

const calculate = (degrees: number) => {
  const n = remapValue(degrees, { min: 0, max: 360 }, { min: 0, max: 1 });
  const angle = n * Math.PI * 2;
  const x = Math.cos(angle) * STATE.radius + STATE.offset;
  const y = Math.sin(angle) * STATE.radius + STATE.offset;
  return { x, y };
};

const toNode = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").body
    .firstChild as HTMLElement;

const append = (degrees: number) => {
  if (STATE.count === Number.MAX_SAFE_INTEGER) {
    STATE.count = 0;
  } else {
    STATE.count = STATE.count + 1;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const deg = degrees * (360 / STATE.amount);
      const { x, y } = calculate(deg);

      const html = `
        <div style="
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          transform: translate(-50%, -50%) rotate(${deg}deg);
        ">
          ${STATE.count}
        </div>
      `;

      const node = toNode(html);

      root.appendChild(node);

      const animation = node.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        iterations: 1,
        easing: "linear",
      });

      animation.onfinish = () => {
        root.removeChild(node);
      };

      resolve(null);
    }, STATE.interval);
  });
};

const total = [...new Array(STATE.amount)].map((_, i) => i);

const cycle = () =>
  total
    .reduce(async (previous, degrees) => {
      await previous;
      return append(degrees);
    }, Promise.resolve(null))
    .then(cycle);

cycle();
