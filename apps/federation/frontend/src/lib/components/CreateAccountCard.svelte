<script lang="ts">
  import { isValidName, isValidEmail, isValidPassword } from '$lib/utils';
  import { Button, CHARACTERS, Input } from '@jeffrey-carr/frontend-common';
  import type { Character } from '@jeffrey-carr/frontend-common';
  import CharacterButton from './CharacterButton.svelte';

  let {
    createAccount,
    backToLogin,
  }: {
    createAccount: (
      email: string,
      password: string,
      fName: string,
      lName: string,
      character: Character
    ) => Promise<boolean>;
    backToLogin: () => void;
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

<div class="container">
  <h1>Create Account</h1>

  <div class="inputs">
    <div class="input">
      <label class="label" for="email">Email</label>
      <Input
        name="email"
        type="email"
        bind:value={email}
        placeholder="example@example.com"
        message={emailErr}
        onkeypress={() => clearError('email')}
      />
    </div>

    <div class="input">
      <label class="label" for="password">Password</label>
      <Input
        type="password"
        name="email"
        bind:value={password}
        message={passwordErr}
        onkeypress={() => clearError('password')}
      />
    </div>

    <div class="input">
      <label class="label" for="fName">First name</label>
      <Input
        type="text"
        name="fName"
        bind:value={fName}
        message={fNameErr}
        onkeypress={() => clearError('fName')}
      />
    </div>

    <div class="input">
      <label class="label" for="lName">Last name</label>
      <Input
        type="text"
        name="fName"
        bind:value={lName}
        message={lNameErr}
        onkeypress={() => clearError('lName')}
      />
    </div>

    <div class="character-input">
      <h2 class="title">Choose your character</h2>
      <div class="characters">
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

  <div class="buttons">
    <Button size="medium" onclick={callCreateAccount} loading={creatingAccount}>
      Create Account
    </Button>
    <Button size="medium" type="secondary" onclick={backToLogin}>Cancel</Button>
  </div>
</div>

<svelte:window onkeypress={callCreateAccountShortcut} />

<style lang="scss">
  @import 'shared.scss';

  .character-input {
    .title {
      margin: 1rem 0;
    }
  }
  .characters {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
</style>
