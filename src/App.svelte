<script>
  import { Router, Link, Route } from 'svelte-routing'
  import Home from '@views/Home'
  import Result from '@views/Result'

  export let url = ''
</script>

<Router {url}>
  <div>
    <Route path="/" component={Home} />
    <Route path="/result" component={Result} />
  </div>
</Router>
