// Type declarations for CSS / SCSS modules used in this package.
// Placing this under `src/` ensures it's picked up by the package's tsconfig.json (which includes `src`).

declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}

// Allow plain SCSS imports (global styles)
declare module '*.scss';
declare module '*.css';
