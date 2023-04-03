async function test() {
  const invite = new window.referralSystem.ReferralSystem(
    'http://localhost:1633',
    'dd6f857e2f6915d73baf21636c1bf8f56cd6187f4697ae0693560ddbd6bd4329',
  )

  const count1 = await invite.getSlotItemsCount('inviter_1', '0x8fd379246834eac74B8419FfdA202CF8051F7A03')
  console.log('count1', count1)
}

test().then()
