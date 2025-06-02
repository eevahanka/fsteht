import { useDispatch, useSelector } from "react-redux"
import { use } from "react"


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notifs = useSelector(state => state.notifs)

  if (notifs) {
    return (
      <div style={style}>
        {notifs}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification