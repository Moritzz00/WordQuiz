export default function Message({ text, className, button = null }) {
  return (
    <div className={className}>
      {
        text
      }
      {
        button
      }
    </div>
  )
}