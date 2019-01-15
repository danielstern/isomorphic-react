describe("the question list",()=>{
  beforeAll(()=>{
    console.log("befaore all");
  })
  beforeEach(()=>{
    console.log("befaore each");
  })
  afterEach(()=>{
    console.log("after each");
  })
  afterAll(()=>{
    console.log("after all");
  })
  it.only ("should display a list of items",()=>{
    expect(2 + 2).toEqual(4);
  })
  it.skip ("should display a list of items",()=>{
    expect(2 + 2).toEqual(5);
  })
})
