'use client'
import DisplayOrder from '@/components/order/DisplayOrder'
import React from 'react'
import Wrapper from '../../_components/Wrapper'

export default function page() {
  return (
    <Wrapper title={'Order History'} className={''}>
        <DisplayOrder />
    </Wrapper>
  )
}
