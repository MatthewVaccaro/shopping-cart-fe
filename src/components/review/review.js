import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, List } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'
import { NavLink } from 'react-router-dom'

const ReviewMain = (props) => {
  const cartContents = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const increment = (id) => {
    dispatch(creators.increment(id))
  }
  const decrement = (id) => {
    dispatch(creators.decrement(id))
  }
  const removeItem = (item) => {
    dispatch(creators.subtractFromCart(item))
  }
  return (
    <div className='cover review'>
      <div className='store-top review-top'>
        <div className='review-text'>
          <Icon type='shopping-cart' style={{ fontSize: '3rem' }} />
          <div id='rev'>
            <h4>Review Your Order</h4>
            <p id='grey'>This is your chance to check your order before going to
              payments. Make it count.
            </p>
          </div>
          <div>
            <p>
              Got a question about your order?
              You can ask the seller on Whatsapp by clicking here.
            </p>
          </div>
        </div>
        <div className='content'>
          <List
            itemLayout='horizontal'
            dataSource={cartContents}
            renderItem={item => (
              <List.Item>
                <div className='controls'>
                  <div onClick={() => increment(item.productId)} className='clicks'>+</div>
                  <div className='clicks count'>{item.quantity}</div>
                  <div onClick={() => decrement(item.productId)} className='clicks'>-</div>
                </div>
                <List.Item.Meta
                  title={item.name}
                  description={item.price}
                />
                <div onClick={() => removeItem({ _id: item.productId })} className='cancel'>x</div>
              </List.Item>
            )}
          />
          <div className='button-body'>
            <NavLink to='/payment'>
              <div className='button'>Go to Checkout</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewMain