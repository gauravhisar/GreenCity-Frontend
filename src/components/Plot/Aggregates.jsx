import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'

export default function Aggregates({rows}) {
  const [aggregates, setAggregates] = React.useState({
    total_plots: 0,
    total_area: 0,
    total_amount: 0,
    total_commission: 0,
    total_rebate: 0,
    total_interest_given: 0,
    total_amount_received: 0,
    total_balance: 0,
    total_payable_amount: 0
  })
  const providePadding = {
    padding: "0px 0px 0px 12px"
  }
  React.useEffect(()=>{
    let plot_list = [...rows]
    const new_aggregates = {
      total_plots: 0,
      total_area: 0,
      total_amount: 0,
      total_commission: 0,
      total_rebate: 0,
      total_interest_given: 0,
      total_amount_received: 0,
      total_balance: 0,
      total_payable_amount: 0
    }
    if (plot_list.length){
      plot_list.forEach((plot)=>{
        new_aggregates.total_plots += 1
        new_aggregates.total_area += plot.area
        new_aggregates.total_amount += plot.amount
        if (plot.deal){
          new_aggregates.total_commission += plot.deal.total_commission_paid
          new_aggregates.total_rebate += plot.deal.total_rebate
          new_aggregates.total_interest_given += plot.deal.total_interest_given
          new_aggregates.total_amount_received += plot.deal.total_amount_paid
          new_aggregates.total_balance += plot.deal.balance
          new_aggregates.total_payable_amount += plot.next_payable_amount
        }
      })
    }
    setAggregates(new_aggregates)
  }, [rows])
    return (
        <>
            <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}>
                    {`#${aggregates.total_plots}`}
                  </TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}>
                    {aggregates.total_area}
                  </TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}></TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}></TableCell>
                  <TableCell align = "left" padding = "none">
                    {aggregates.total_amount}
                  </TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}>
                    {aggregates.total_commission}
                  </TableCell>
                  <TableCell align = "left" padding = "none">
                    {aggregates.total_rebate}
                  </TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}>
                    {aggregates.total_interest_given}
                  </TableCell>
                  <TableCell align = "left" padding = "default" style = {{...providePadding}}>
                    {aggregates.total_amount_received}
                  </TableCell>
                  <TableCell align = "left" padding = "none" style = {{...providePadding}}>
                    {aggregates.total_balance}
                  </TableCell>
                  <TableCell align = "left" padding = "none"></TableCell>
                  <TableCell align = "left" padding = "none"></TableCell>
                  <TableCell align = "left" padding = "none" style = {{paddingRight: "30px"}}>
                    {aggregates.total_payable_amount}
                  </TableCell>
                </TableRow>
        </>
    )
}
