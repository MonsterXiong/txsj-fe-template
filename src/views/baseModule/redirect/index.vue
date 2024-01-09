<script>
import { routesConstant } from '@/router/routeConstant'
export default {
  name: routesConstant.REDIRECT.name,
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h()
  },
}
</script>
