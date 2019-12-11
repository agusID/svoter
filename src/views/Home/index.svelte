<script>
  // import { username, hasKey } from '@stores';
  import { database } from '@config/firebase'
  import 'firebase/database'
  import { fade } from 'svelte/transition'
  import { osFilter, getImageSource, cutText, sorted } from './utils'
  
  const crowns = ['gold.png', 'silver.png', 'bronze.png']
  let temp = []
  const MAX_NOMINEES = 3

  let nominess = null

  let isModal = false
  let isVoted = false
  let nomineeSelected = {
    unique_id: null,
    name: null,
    image: null,
  }

  function handleVote(id, name, image) {
    isModal = true
    nomineeSelected.unique_id = id
    nomineeSelected.name = name
    nomineeSelected.image = image
  }

  function getCount(ref) {
    return ref.collection('nominees').get().then(snapshot => {
      let total_count = 0;
      snapshot.forEach(doc => {
        total_count += doc.data().count
      })

      return total_count
    })
  }

  function handleSubmit() {
    let currValue = null
    database.ref(`nominees/${nomineeSelected.unique_id}`)
      .on('value', function(snapshot) {
        currValue = snapshot.val().count + 1
      }, error => {
        console.log(`The read failed: ${error.code}`);
      })

    if (currValue) {
      database
        .ref()
        .child(`nominees/${nomineeSelected.unique_id}`)
        .update({ count: currValue })

      isModal = false
      isVoted = true
    }

  }

  function handleClose() {
    isModal = false
  }

  // retrieve data
  let usersRef = database.ref('nominees')
  usersRef.on('value', function(snapshot) {
    nominess = []
    snapshot.forEach(function(childSnapshot) {
      let childData = childSnapshot.val()
      nominess = [...nominess, childData]
    })
  })

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
    margin-top: 30px;
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

  .voted-info__wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .voted-info__picture {
    width: 229.4px;
    height: 229.4px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 20px 30px #f1c40f;
  }

  .voted-info-group {
    margin-top: -20px;
    position: relative;
    width: 100%;
    display: block;
  }

  .voted-info__name {
    font-size: 25px;
    position: absolute;
    z-index: 100;
    text-align: center;
    width: 100%;
    padding: 20px 0;
  }

  .btn-empty {
    position: absolute;
    left: 0;
    right: 0;
  }

  .voted-info__desc {
    text-align: center;
    margin-top: 80px;
  }
</style>
{#if !isVoted}
  <img class="background" src="{getImageSource('bg.svg')}" alt="background" />
  <div class="container">
    <div class="helmet">
      RALALI UNSUNG HERO 2019 NOMINEE
    </div>
    <div class="armour">
      {#if nominess}
        {#each nominess as {unique_id, name, position, image}}
          <div class="nominee__item">
            <div class="nominee__item-picture-wrapper">
              <img src={image} alt={name} class="nominee__item-picture" />
              <img on:click={() => handleVote(unique_id, name, image)} class="btn-vote" src="{getImageSource('btn-vote.png')}" alt="vote" />
            </div>
            <div class="nominee__item-info">
              <div class="nominee__item-name">{name}</div>
              <div class="nominee__item-position">{position}</div>
            </div>
          </div>
        {/each}
      {:else}
        Please wait...
      {/if}
    </div>
  </div>
{:else}
  <img class="background" src="{getImageSource('bg-voted.svg')}" alt="background" />
  <div class="container">
    <div class="helmet">
      RALALI<br />UNSUNG HERO<br/>2019
    </div>
    <div class="armour">
      <div class="voted-info">
        <div class="voted-info__wrapper">
          <img src={nomineeSelected.image} alt={nomineeSelected.name} class="voted-info__picture"/>
          <div class="voted-info-group">
            <div class="voted-info__name">{nomineeSelected.name}</div>
            <img class="btn-empty" src="{getImageSource('btn-empty.png')}" alt="vote" />
          </div>
          <div class="voted-info__desc">Thank you for choosing Ralali Unsung Hero 2019</div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isModal}
  <div class="modal" transition:fade={{duration: 200}}>
    <div class="modal-popup">
      <div class="modal-confirm">
        <div class="modal-confirm__question">Are you choosing</div>
        <div class="modal-confirm__nominee">{nomineeSelected.name}</div>
        <div class="modal-confirm__question">as unsung hero 2019?</div>
      </div>
      <div class="btn-group">
        <img on:click={handleSubmit} class="btn" src="{getImageSource('btn-yes.svg')}" alt="bg-yes" />
        <img on:click={handleClose} class="btn" src="{getImageSource('btn-no.svg')}" alt="bg-no" />
      </div>
      <img class="popup-background" src="{getImageSource('bg-popup.svg')}" alt="bg-popup" />
    </div>
  </div>
{/if}

