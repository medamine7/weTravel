function generateColorClass(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const colors = {
  brand: {
    light: generateColorClass("--color-brand-light"),
    DEFAULT: generateColorClass("--color-brand"),
    dark: generateColorClass("--color-brand-dark"),
  },
};

const textColor = {
  primary: generateColorClass("--color-text-primary"),
  secondary: generateColorClass("--color-text-secondary"),
  tertiary: generateColorClass("--color-text-tertiary"),
};

const backgroundColor = {
  primary: generateColorClass("--color-primary"),
  secondary: generateColorClass("--color-secondary"),
  tertiary: generateColorClass("--color-tertiary"),
};

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "./formkit.theme.ts",
  ],
  theme: {
    extend: {
      colors,
      textColor,
      backgroundColor,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
