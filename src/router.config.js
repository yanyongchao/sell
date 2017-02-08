import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'

export default {
    routes: [
        {path: '/goods', component: Goods},
        {path: '/ratings', component: Ratings},
        {path: '/seller', component: Seller},
        {path: '*', redirect: '/goods'}
    ]
}