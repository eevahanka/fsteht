import { useDispatch, useSelector } from "react-redux"


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notif = useSelector(state => state.notif)

  if (notif) {
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification