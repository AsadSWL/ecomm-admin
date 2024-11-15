import React from 'react';
import RecentOrdersOne from './child/RecentOrdersOne'
import TransactionsOne from './child/TransactionsOne'
import TopSellingProductOne from './child/TopSellingProductOne'
import UnitCountOne from './child/UnitCountOne'

const DashBoardLayerThree = () => {
  
  return (
    <section className="row gy-4">

      <UnitCountOne />

      {/* RecentOrdersOne */}
      <RecentOrdersOne />

      {/* TransactionsOne */}
      <TransactionsOne />

      {/* TopSellingProductOne */}
      <TopSellingProductOne />

    </section>


  )
}

export default DashBoardLayerThree