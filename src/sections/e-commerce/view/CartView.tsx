import { Helmet } from 'react-helmet-async'
import { Cart } from '../cart'

export default function CartView() {
  return (
    <>
    <Helmet>
        <title>Giỏ hàng</title>
    </Helmet>
    <Cart/>
        
    </>
  )
}
