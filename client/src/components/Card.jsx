const Card = (props) => {
  return (
    <div>
      <h2>{props.location}</h2>
      <h3>{props.date}</h3>
      <h3>{props.time}</h3>
      <h4>{props.host}</h4>
    </div>
  )
}

export default Card
