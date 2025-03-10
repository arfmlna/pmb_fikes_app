

export default function Item() {
  let date = new Date()
  console.log(`${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
  // render
  let data = []
  for (let i = 0; i < 20; i++) {
    data.push(i)
  }
  const render = data.map((data, i) => {
    return (
      <div key={i} className="item item-transition">
        <div className="p-10 rounded-md bg-cover animation shadow-sm text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt id officiis minus at, similique laudantium sit quisquam odio debitis atque iste quos quidem consectetur! Soluta magni quia consequatur ab excepturi possimus, et exercitationem reiciendis aspernatur, ipsam dolore cum, quaerat aut obcaecati. { data }</div>
      </div>
    )
  })
  return (
    <div className="item-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 m-5 justify-center mb-8">
      { render }
    </div>
  )
}
