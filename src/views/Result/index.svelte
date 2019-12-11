
<script>
  import { getImageSource } from '../Home/utils'
  import { fade } from 'svelte/transition'
  import { database } from '@config/firebase'

  let nominees = []
  let usersRef = database.ref('nominees')
  usersRef.on('value', function(snapshot) {
    nominees = []
    snapshot.forEach(function(childSnapshot) {
      let childData = childSnapshot.val()
      nominees = [...nominees, childData]
    })
  })

  let totalCount = [0, 0, 0]

  $: nominees.length > 0 && setInterval(counter, 500)

  function counter() {
    if (nominees[0].count > totalCount[0])
      totalCount[0] = totalCount[0] + 1
    if (nominees[1].count > totalCount[1])
      totalCount[1] = totalCount[1] + 1
    if (nominees[2].count > totalCount[2])
      totalCount[2] = totalCount[2] + 1
  }
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

</style>

<div class="container">
  <img class="background" src={getImageSource('bg-desktop-voted.svg')} alt="background" />
  <div class="content">
    <div class="helmet">
      RALALI UNSUNG HERO 2019 NOMINEE
    </div>
    <div class="armour" transition:fade={{duration: 200}}>      
      {#each nominees as item, index}
        <div class="nominee__item">
          <img src={item.image} alt={item.name} class="nominee__item-picture" />
          <div class="nominee__item-name">{item.name}</div>
          <div class="nominee__item-position">{item.position}</div>
          <div class="btn-group">
            <div class="vote-count">{totalCount[index]}</div>
            <img class="btn-vote" src="{getImageSource('btn-empty.png')}" alt="vote" />
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>