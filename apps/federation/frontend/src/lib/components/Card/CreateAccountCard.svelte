<script lang="ts">
  import { isValidName, isValidEmail, isValidPassword } from '$lib/utils';
  import { Apps, Button, CHARACTERS, Input } from '@jeffrey-carr/frontend-common';
  import type { Character, RouteQuery } from '@jeffrey-carr/frontend-common';
  import CharacterButton from '../CharacterButton/CharacterButton.svelte';

  import styles from './CreateAccountCard.module.scss';
  import shared from './shared.module.scss';

  let {
    createAccount,
    backToLogin,
    query,
  }: {
    createAccount: (
      email: string,
      password: string,
      fName: string,
      lName: string,
      character: Character
    ) => Promise<boolean>;
    backToLogin: () => void;
    query?: RouteQuery;
  } = $props();
  let email = $state('');
  let emailErr = $state('');
  let password = $state('');
  let passwordErr = $state('');
  let fName = $state('');
  let fNameErr = $state('');
  let lName = $state('');
  let lNameErr = $state('');
  let chosenCharacter = $state<Character>('???');
  let creatingAccount = $state(false);
  let appName = $derived(query?.app ? Apps[query.app].friendlyName : null);

  const callCreateAccountShortcut = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    callCreateAccount();
  };

  const callCreateAccount = async () => {
    if (!validate()) {
      return;
    }

    creatingAccount = true;
    await createAccount(email, password, fName, lName, chosenCharacter);
    creatingAccount = false;
  };

  const validate = (): boolean => {
    emailErr = isValidEmail(email);
    passwordErr = isValidPassword(password);
    fNameErr = isValidName(fName);
    lNameErr = isValidName(lName);

    return [emailErr, passwordErr, fNameErr, lNameErr].every(errMessage => errMessage.length === 0);
  };

  const clearError = (field: 'email' | 'password' | 'fName' | 'lName') => {
    switch (field) {
      case 'email':
        emailErr = '';
        break;
      case 'password':
        passwordErr = '';
        break;
      case 'fName':
        fNameErr = '';
        break;
      case 'lName':
        lNameErr = '';
        break;
    }
  };

  const updateCharacter = (newCharacter: Character) => {
    chosenCharacter = newCharacter;
  };
</script>

<div class={shared.container}>
  <h1>Create Account</h1>

  <div class={shared.inputs}>
    <div class={shared.input}>
      <label class={shared.label} for="email">Email</label>
      <Input
        name="email"
        type="email"
        bind:value={email}
        placeholder="example@example.com"
        message={emailErr}
        onkeypress={() => clearError('email')}
      />
    </div>

    <div class={shared.input}>
      <label class={shared.label} for="password">Password</label>
      <Input
        type="password"
        name="email"
        bind:value={password}
        message={passwordErr}
        onkeypress={() => clearError('password')}
      />
    </div>

    <div class={styles.nameInputs}>
      <div class={shared.input}>
        <label class={shared.label} for="fName">First name</label>
        <Input
          type="text"
          name="fName"
          bind:value={fName}
          message={fNameErr}
          onkeypress={() => clearError('fName')}
        />
      </div>

      <div class={shared.input}>
        <label class={shared.label} for="lName">Last name</label>
        <Input
          type="text"
          name="fName"
          bind:value={lName}
          message={lNameErr}
          onkeypress={() => clearError('lName')}
        />
      </div>
    </div>

    <div class={styles.characterInput}>
      <h2 class={styles.title}>Choose your character</h2>
      <div class={styles.characters}>
        {#each CHARACTERS as character}
          <CharacterButton
            {character}
            choose={updateCharacter}
            chosen={chosenCharacter === character}
          />
        {/each}
      </div>
    </div>
  </div>

  {#if appName}
    <p>
      Once you create your account, you'll be brought back to <span class="app-highlight"
        >{appName}</span
      >
    </p>
  {/if}

  <div class={shared.buttons}>
    <Button onclick={callCreateAccount} loading={creatingAccount}>Create Account</Button>
    <Button variant="secondary" onclick={backToLogin}>Cancel</Button>
  </div>
</div>

<svelte:window onkeypress={callCreateAccountShortcut} />
