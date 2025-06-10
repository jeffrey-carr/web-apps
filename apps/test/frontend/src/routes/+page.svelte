<script lang="ts">
  import { ExpandButton, Button, type ButtonOptions, Modal } from '@jeffrey-carr/frontend-common';
  import { deleteLocalStorage, getLocalStorage, putLocalStorage } from '$lib/utils';
  import { onMount } from 'svelte';

  /* General */
  onMount(() => {
    loadInitialFont();
  });

  const validateHex = (hex: string): boolean => {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(hex);
  };

  /* Theme */
  type ThemeProperties = {
    background?: string;
    backgroundLight?: string;
    backgroundSurface?: string;
    backgroundOverlay?: string;

    primary?: string;
    secondary?: string;
    tertiary?: string;
    text?: string;
    textSecondary?: string;

    success?: string;
    successLight?: string;
    warning?: string;
    warningLight?: string;
    danger?: string;
    dangerLight?: string;
    subtle?: string;
    link?: string;

    font?: string;
  };
  type ThemePropertiesWithFont = ThemeProperties & { [THEME_FONT_URL_KEY]?: string };
  const THEME_DEFAULTS: ThemeProperties = {
    background: '#ffffff',
    primary: '#000000',
    secondary: '#ffffff',
    tertiary: '#c7c7c7',
    text: '#000000',
    textSecondary: '#ffffff',

    success: '#77DD77',
    successLight: '#346134',
    warning: '#FDFD96',
    warningLight: '#69693E',
    danger: '#FF6961',
    dangerLight: '#6e2d2a',
    subtle: '#838ba7',
    link: '#8CAAEE',

    font: '',
  };
  const THEME_PROPERTY_TO_KEY: Record<keyof ThemeProperties, string> = {
    background: '--bg-color',
    backgroundLight: '--bg-color-light',
    backgroundSurface: '--bg-color-surface',
    backgroundOverlay: '--bg-color-overlay',

    primary: '--app-theme-primary',
    secondary: '--app-theme-secondary',
    tertiary: '--app-theme-tertiary',
    text: '--app-theme-text',
    textSecondary: '--app-theme-text-secondary',

    success: '--app-theme-success',
    successLight: '--app-theme-success-light',
    warning: '--app-theme-warning',
    warningLight: '--app-theme-warning-light',
    danger: '--app-theme-danger',
    dangerLight: '--app-theme-danger-light',
    subtle: '--app-theme-subtle',
    link: '--app-theme-link',

    font: '--app-theme-font',
  };
  const THEME_FONT_URL_KEY = 'font-url';
  const getSavedThemeNameKey = (name: string): string => {
    return `saved-theme-${name}`;
  };
  const getSavedThemeListKey = (): string => {
    return 'all-saved-themes';
  };
  const getSavedThemes = (): string[] => {
    const names = getLocalStorage<string[]>(getSavedThemeListKey());
    if (names == null) {
      return [];
    }

    return names;
  };
  const getInitialThemeValues = (): ThemeProperties => {
    return Object.entries(THEME_DEFAULTS).reduce((props: ThemeProperties, [key, value]) => {
      const themeKey = key as keyof ThemeProperties;
      const storedValue = getLocalStorage<string>(key);
      if (storedValue == null) {
        props[themeKey] = value;
      } else {
        props[themeKey] = storedValue;
      }

      return props;
    }, {});
  };
  const saveTheme = () => {
    let name;
    let overwrite = false;
    do {
      name = prompt('enter a name');
      if (name == null) {
        return;
      }
      name = name.trim();
      if (savedThemes.includes(name)) {
        const ok = confirm('A theme with this name already exists. Overwrite?');
        if (!ok) {
          name = '';
          continue;
        }

        overwrite = true;
      }
    } while (name === '');

    if (!overwrite) {
      savedThemes.push(name);
    }

    // We need to add the font URL. We don't have to save that as part of the theme in the real app because
    // the link will already be included in the <head>. However, we need to save it so we can load it in
    const currentFontURL = getLocalStorage<string>(THEME_FONT_URL_KEY);
    let themeWithFontURL: ThemePropertiesWithFont = {
      ...themeProperties,
    };
    if (currentFontURL) {
      themeWithFontURL[THEME_FONT_URL_KEY] = currentFontURL;
    }
    putLocalStorage(getSavedThemeNameKey(name), themeWithFontURL);
    putLocalStorage(getSavedThemeListKey(), savedThemes);
  };
  const loadTheme = () => {
    if (selectedTheme === '') {
      return;
    }

    const theme = getLocalStorage<ThemePropertiesWithFont>(getSavedThemeNameKey(selectedTheme));
    if (theme == null) {
      alert('could not find theme');
      return;
    }

    themeProperties = theme;

    if (theme[THEME_FONT_URL_KEY] && theme.font) {
      setFont(theme.font, theme[THEME_FONT_URL_KEY]);
    }
  };
  const deleteTheme = () => {
    if (selectedTheme === '') {
      return;
    }

    const ok = confirm(
      `You are about to delete the theme "${selectedTheme}". You cannot undo this!`
    );
    if (!ok) {
      return;
    }

    savedThemes = savedThemes.filter(theme => theme !== selectedTheme);
    putLocalStorage(getSavedThemeListKey(), savedThemes);
    deleteLocalStorage(getSavedThemeNameKey(selectedTheme));
    selectedTheme = '';
  };
  const createThemeStr = (properties: ThemeProperties): string => {
    return Object.entries(properties)
      .map(([property, value]) => {
        let propertyName = property as keyof ThemeProperties;
        const key = THEME_PROPERTY_TO_KEY[propertyName];
        if (key == null) {
          return '';
        }

        // Make sure we have a valid value (simple color hex validation)
        if (!validateHex(value)) {
          value = THEME_DEFAULTS[propertyName]!;
        }

        return `${key}:${value}`;
      })
      .filter(item => item !== '')
      .join('; ');
  };
  const resetTheme = () => {
    themeProperties = THEME_DEFAULTS;
  };
  $effect(() => {
    for (const [key, value] of Object.entries(themeProperties)) {
      const property = key as keyof ThemeProperties;
      if (value === THEME_DEFAULTS[property]) {
        deleteLocalStorage(property);
      } else {
        putLocalStorage(property, value);
      }

      const cssKey = THEME_PROPERTY_TO_KEY[property];
      const root = document.documentElement;
      root.style.setProperty(cssKey, value);
    }
  });
  const setInputtedFont = () => {
    const cleanedURL = fontURL.trim();
    const cleanedName = fontName.trim();

    if (cleanedURL.length === 0 || cleanedName.length === 0) {
      alert('URL or name is blank!');
      return;
    }

    const ok = confirm(
      `You are about to set the page font to "${cleanedName} (${cleanedURL})." Continue?`
    );
    if (!ok) {
      return;
    }

    setFont(cleanedName, cleanedURL);
  };
  const setFont = (fontName: string, fontURL: string) => {
    if (fontURL === '' || fontName === '') {
      deleteLocalStorage('font');
      deleteLocalStorage(THEME_FONT_URL_KEY);
    } else {
      putLocalStorage('font', fontName);
      putLocalStorage(THEME_FONT_URL_KEY, fontURL);
    }

    loadFont(fontName, fontURL);
  };
  const loadFont = (fontName: string, fontURL: string) => {
    if (currentLink) {
      currentLink.remove();
      currentLink = undefined;
    }

    const root = document.documentElement;

    if (fontName === '' || fontURL === '') {
      root.style.removeProperty(THEME_PROPERTY_TO_KEY['font']);
      themeProperties['font'] = THEME_DEFAULTS['font'];
      return;
    }

    const link = document.createElement('link');
    link.href = fontURL;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    currentLink = link;
    root.style.setProperty(THEME_PROPERTY_TO_KEY['font'], fontName);
    themeProperties['font'] = fontName;
  };
  const resetFont = () => {
    fontURL = '';
    fontName = '';
    setFont('', '');
  };
  const loadInitialFont = () => {
    const savedFontName = getLocalStorage<string>('font');
    const savedFontURL = getLocalStorage<string>(THEME_FONT_URL_KEY);

    if (!savedFontName || !savedFontURL) {
      setFont('', '');
    } else {
      setFont(savedFontName, savedFontURL);
      fontName = savedFontName;
      fontURL = savedFontURL;
    }
  };
  let savedThemes = $state(getSavedThemes());
  let selectedTheme = $state('');
  let themeProperties = $state(getInitialThemeValues());
  let themeStr = $derived(createThemeStr(themeProperties));
  let fontURL = $state('');
  let fontName = $state('');
  let currentLink = $state<HTMLLinkElement>();

  /* Buttons */
  let buttonText = $state('Click me!');
  const spook = () => {
    alert('Boo!');
  };
  const stringifyButtonOptions = (options: ButtonOptions): string => {
    const str = Object.entries(options).map(([key, value]) => {
      // Special handling for some options
      switch (key) {
        case 'onclick':
          return 'onclick';
        default:
          return `${key}:${value}`;
      }
    });
    return str.join(' ');
  };
</script>

<main class="container" style={themeStr}>
  <h1>Welcome to the test page! Play with things to your heart's desire</h1>
  <div class="theme-container">
    {#snippet option(property: keyof ThemeProperties, disabled: boolean)}
      <div class="option">
        <span class="label">{property}</span>
        <div class="inputs">
          <input type="color" bind:value={themeProperties[property]} {disabled} />
          <input type="text" bind:value={themeProperties[property]} {disabled} />
        </div>
      </div>
    {/snippet}

    <h2>Theme</h2>
    <p>
      Customize the theme here to see how components look with a certain styling. Theme values
      should be hexadecimal.
    </p>
    <label for="fontURL">Font URL</label>
    <input name="fontURL" type="text" bind:value={fontURL} />
    <label for="fontName">Font Name</label>
    <input name="fontName" type="text" bind:value={fontName} />
    <button onclick={setInputtedFont}>Set font</button>
    <button onclick={resetFont}>Reset font</button>
    <div class="options">
      {#each Object.keys(THEME_PROPERTY_TO_KEY) as key}
        {@render option(key as keyof ThemeProperties, key === 'font')}
      {/each}
    </div>
    <div class="theme-buttons">
      <button class="theme-reset" onclick={resetTheme}>Reset Theme</button>
      <button onclick={saveTheme}>Save theme</button>
      <select bind:value={selectedTheme}>
        <option value=""></option>
        {#each savedThemes as theme}
          <option value={theme}>{theme}</option>
        {/each}
      </select>
      <button onclick={loadTheme} disabled={selectedTheme === ''}>Load theme</button>
      <button onclick={deleteTheme} disabled={selectedTheme === ''}>Delete theme</button>
    </div>
  </div>

  <h2>Buttons</h2>
  <div class="button-container">
    <div class="options">
      <span class="label">Button text</span>
      <input type="text" bind:value={buttonText} />
    </div>
    {#snippet button(options: ButtonOptions)}
      <div class="item">
        <span class="label">{stringifyButtonOptions(options)}</span>
        <Button {...options} onclick={spook}>{buttonText}</Button>
      </div>
    {/snippet}
    <div class="buttons">
      {@render button({ size: 'fit' })}
      {@render button({ size: 'small' })}
      {@render button({ size: 'medium' })}
      {@render button({ size: 'medium', shape: 'round' })}
      {@render button({ size: 'large' })}
      {@render button({ size: 'large', shape: 'round' })}
      {@render button({ type: 'secondary', size: 'medium' })}
      {@render button({ type: 'plain', size: 'medium' })}
      {@render button({ size: 'medium', disabled: true })}
      <!-- {@render button({ size: 'medium', loading: true })} -->
    </div>
    <div>
      <ExpandButton onclick={spook}>{buttonText}</ExpandButton>
    </div>
  </div>

  <h2>Modal</h2>
  <Modal open />
</main>

<style lang="scss">
  .container {
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;

    min-height: 100vh;
    width: 100vw;

    margin: 0;
    padding: 1rem;

    font-family: var(--app-theme-font);
    color: var(--app-theme-text);

    background-color: var(--bg-color);

    transition:
      color 100ms linear,
      background-color 100ms linear;

    button:hover {
      cursor: pointer;
    }
  }

  .theme-container {
    margin-bottom: 2rem;

    .option {
      .inputs {
        display: flex;
        gap: 0.2rem;
      }
    }

    .options {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;

      padding: 1rem;
    }

    .theme-buttons {
      margin-top: 1rem;

      select {
        min-width: 5rem;
      }
    }
  }

  .button-container {
    .options {
      margin-bottom: 1rem;
    }

    .buttons {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .label {
          max-width: 10rem;
          word-wrap: normal;
        }
      }
    }
  }
</style>
