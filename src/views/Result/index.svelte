
<script>
  import { getImageSource } from '../Home/utils'
  import { fade, fly } from 'svelte/transition'
  import { database } from '@config/firebase'
  import { Loader } from '@components'

  let nominees = null
  let usersRef = database.ref('nominees')
  usersRef.on('value', function(snapshot) {
    nominees = []
    snapshot.forEach(function(childSnapshot) {
      let childData = childSnapshot.val()
      nominees = [...nominees, childData]
    })
  })

  let totalCount = ['?', '?', '?']
  let isStart = false
  let isCountOver = false

  function counter() {
    if (nominees[0].count > totalCount[0])
      totalCount[0] = totalCount[0] + 1
    if (nominees[1].count > totalCount[1])
      totalCount[1] = totalCount[1] + 1
    if (nominees[2].count > totalCount[2])
      totalCount[2] = totalCount[2] + 1

    if (
        nominees[0].count === totalCount[0] &&
        nominees[1].count === totalCount[1] &&
        nominees[2].count === totalCount[2]
      )
      isCountOver = true
  }

  database.ref('app/start_count').on('value', snapshot => {
    snapshot.forEach(function(childSnapshot) {
      let childData = childSnapshot.val()
      isStart = childData
      if (isStart) totalCount = [0, 0, 0]
    }) 
  })

  $: nominees && (isStart && (nominees.length > 0 && setInterval(counter, 500)))
</script>

<style>
  .container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    user-select: none;
    position: relative;
  }

  .background {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;
    width: 100%;
    height: 100vh;
  }

  .content .helmet {
    margin: 40px 0 0 0;
    font-size: 50px;
  }

  .content .armour {
    display: flex;
    justify-content: center;
  }

  .nominee__item {
    margin: 50px;
  }

  .armour .nominee__item-picture {
    border-radius: 50%;
    width: 236.5px;
    height: 236.5px;
    background-color: #ffffff;
  }

  .armour .nominee__item-name {
    margin-top: 15px;
    font-size: 28.2px;
    font-weight: 900;
  }

  .armour .nominee__item-position {
    font-size: 18px;
    margin-top: 5px;
  }

  .armour .btn-group {
    margin-top: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .armour .vote-count {
    font-size: 28px;
    position: absolute;
  }

  .loader-container { 
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    margin: 0 auto;
  }

  .zooming {
    animation: zooming 1s ease-out;
  }

  @keyframes zooming {
    from {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    to {
      transform: scale(1)
    }
  }
</style>
{#if !isCountOver}
  <div class="container">
    <img class="background" transition:fade={{duration:200}} src={getImageSource('bg-desktop-voted.svg')} alt="background" />
    <div class="content">
      <div class="helmet">
        RALALI UNSUNG HERO 2019 NOMINEE
      </div>
      {#if nominees}
        <div class="armour" transition:fade={{duration: 200}}>      
          {#each nominees as item, index}
            <div class="nominee__item">
              <img src={item.image} alt={item.name} class="nominee__item-picture" />
              <div class="nominee__item-name">{item.name}</div>
              <div class="nominee__item-position">{item.position}</div>
              <div class="btn-group">
                <div class="vote-count" class:zooming={nominees[index].count === totalCount[index]}>{totalCount[index]}</div>
                <img class="btn-vote" src="{getImageSource('btn-empty.png')}" alt="vote" />
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="loader-container">
          <Loader />
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="container">
    <img transition:fade class="background" src={getImageSource('bg-desktop-over.svg')} alt="background" />
    <div class="content">
      <div class="helmet" transition:fly={{y: 80}}>
        RALALI UNSUNG HERO 2019
      </div>
    </div>
  </div>
{/if}