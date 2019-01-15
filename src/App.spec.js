import delay from 'redux-saga'

it("async test 1", done=>{
  setTimeout(done,100)
})

it("async test2",()=>{
  return new Promise(resolve => setTimeout(resolve,100))
})

it("async test3", async()=>{
  async ()=> await delay(100)
})