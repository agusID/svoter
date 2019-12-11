<script>
  // import { navigateTo } from 'svero'
  // import { username, hasKey } from '@stores';
  // import { database } from '@config/firebase'
  import { fade } from 'svelte/transition'
  import { osFilter, getImageSource, cutText, sorted } from './utils'
  
  const crowns = ['gold.png', 'silver.png', 'bronze.png']
  let temp = []
  const MAX_NOMINEES = 3

  let nominess = [
    {
      name: 'NOMINEE 1',
      position: 'JABATAN',
      image: ''
    },
    {
      name: 'NOMINEE 2',
      position: 'JABATAN',
      image: ''
    },
    {
      name: 'NOMINEE 3',
      position: 'JABATAN',
      image: ''
    }
  ]

  let isModal = false
  let isVoted = true

  function handleVote() {
    isModal = true
  }

  function handleSubmit() {
    isModal = false
    isVoted = true
  }

  function handleClose() {
    isModal = false
  }

</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }
  
  .container {
    position: absolute;
    min-height: 100vh;
    color: white;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    line-height: 1.2;
  }

  .helmet {
    text-align: center;
    margin-top: 20px;
    font-size: 27.4px;
  }

  .armour {
    padding: 50px 35px;
  }

  .nominee__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }

  .nominee__item-picture-wrapper {
    width: 100px;
    height: 110px;
    position: relative;
  }

  .nominee__item-picture {
    display: block;
    background-color: #fff;
    border-radius: 50%;
    height: 100px;
    width: 100px;
  }

  .btn-vote {
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }

  .nominee__item-info {
    margin-left: 16px;
  }

  .nominee__item-name {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .nominee__item-position {
    font-size: 13px;
  }

  .background {
    position: absolute;
    top: 0;
  }

  .modal {
    background-color: rgba(255, 255, 255, 0.8);
    height: 100vh;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-popup {
    position: relative;
    text-align: center;
    width: 290.3px;
    height: 200px;
  }

  .modal-confirm {
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .modal-confirm__question {
    color: #f6921e;
    font-size: 13px;
    margin: 10px 0;
  }

  .modal-confirm__nominee {
    color: #be1e2d;
    font-size: 26px;
  }

  .btn-group {
    position: absolute;
    z-index: 1500;
    bottom: -50px;
    width: 100%;
  }

  .btn-group .btn {
    margin: 10px;
  }

  .popup-background {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
{#if !isVoted}
  <img class="background" src="{getImageSource('bg.svg').default}" alt="background" />
  <div class="container">
    <div class="helmet">
      RALALI UNSUNG HERO 2019 NOMINEE
    </div>
    <div class="armour">
      {#each nominess as {name, position, image}}
      <div class="nominee__item">
        <div class="nominee__item-picture-wrapper">
          <div class="nominee__item-picture"></div>
          <img on:click={handleVote} class="btn-vote" src="{getImageSource('btn-vote.png').default}" alt="vote" />
        </div>
        <div class="nominee__item-info">
          <div class="nominee__item-name">{name}</div>
          <div class="nominee__item-position">{position}</div>
        </div>
      </div>
      {/each}
    </div>
  </div>
{:else}
  <img class="background" src="{getImageSource('bg-voted.svg').default}" alt="background" />
  <div class="container">
  
  </div>
{/if}

{#if isModal}
  <div class="modal" transition:fade={{duration: 200}}>
    <div class="modal-popup">
      <div class="modal-confirm">
        <div class="modal-confirm__question">Apakah anda yakin ingin memillih</div>
        <div class="modal-confirm__nominee">NAMA NOMINEE</div>
        <div class="modal-confirm__question">sebagai unsung hero 2019?</div>
      </div>
      <div class="btn-group">
        <img on:click={handleSubmit} class="btn" src="{getImageSource('btn-yes.svg').default}" alt="bg-yes" />
        <img on:click={handleClose} class="btn" src="{getImageSource('btn-no.svg').default}" alt="bg-no" />
      </div>
      <img class="popup-background" src="{getImageSource('bg-popup.svg').default}" alt="bg-popup" />
    </div>
  </div>
{/if}

