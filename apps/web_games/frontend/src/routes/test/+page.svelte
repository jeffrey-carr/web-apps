<script lang="ts">
  import { Button, Modal, MultiPageModal } from '@jeffrey-carr/frontend-common';

  let showModal = $state(false);
  let showMultiModal = $state(false);

  const toggleModal = () => {
    showModal = !showModal;
  };

  const toggleMultiModal = () => {
    showMultiModal = !showMultiModal;
  };

  const spook = () => {
    console.log('boo!');
  };
</script>

<main class="container">
  <h1>Test Page (H1)</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <h4>H4</h4>
  <h5>H5</h5>
  <h6>H6</h6>

  <p>This is a paragaph.</p>
  <ol>
    <li>This is an (ordered) list item</li>
    <li>This is another (ordered) list item</li>
  </ol>
  <ul>
    <li>This is an (unordered) list item</li>
    <li>This is another (unordered) list item</li>
  </ul>

  <Button onclick={toggleModal} size="medium">Toggle Modal</Button>
  <Button onclick={toggleMultiModal} size="medium">Toggle Multi-Page Modal</Button>

  <Modal bind:open={showModal}>
    <div class="modal-insides">
      <h1>Hello world!</h1>
      <p>This is my modal</p>
    </div>
  </Modal>
  <MultiPageModal
    bind:open={showMultiModal}
    currentPage={0}
    pages={[
      {
        title: 'First Page',
        content: () => {
          return `
            <p>This is the content of the first page</p>
          `;
        },
      },
    ]}
  />
</main>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;
  }

  .modal-insides {
    height: 50vh;
    width: 70vw;

    padding: 1rem;

    text-align: center;

    p {
      margin-top: 1rem;
    }
  }
</style>
